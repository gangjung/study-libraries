import{V as z,W as T,G as se,k as V,C as re,ar as ie,M as b,c as ce,S as Y,B as le,H as ue,u as j,P as H,ag as de,g as F,a as K,h as G,p as fe,m as ve}from"./three.module-CEzfHhrp.js";import{m as Z}from"./BufferGeometryUtils--Oh5Y0A9.js";import{m as pe}from"./three-viewer-fx7lDL-0.js";import{m as me,b as X,s as he,a as ye}from"./canvas-viewer-QtaWfmlz.js";import{c as ee}from"./fx-CIZ4XT9q.js";import{c as ge,t as N,l as xe}from"./chart2d-DfgeckAJ.js";import{h as we,P as q,a as J}from"./extra-kit-c-FPjCbN4U.js";const U=64,te=3/U,d=256,L=new z(0,13,-70),Q=40,oe=[.15,.3,.5],$=2,ne=3,be=`
varying vec3 vDir;
void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,ke=`
uniform vec3 uSunDir;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y * 2.2 + 0.08, 0.0, 1.0);
  vec3 col = mix(vec3(0.95, 0.52, 0.32), vec3(0.16, 0.18, 0.36), pow(h, 0.7));
  col += vec3(1.0, 0.6, 0.3) * pow(max(dot(d, uSunDir), 0.0), 12.0) * 0.8;
  gl_FragColor = vec4(col, 1.0);
}`,Me=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Se=`
uniform float uOcc;
varying vec2 vUv;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float disk = 1.0 - smoothstep(0.1, 0.115, r);
  float halo = exp(-r * 7.0) * (1.0 - smoothstep(0.7, 1.0, r));
  if (uOcc > 0.5) { float v = min(1.0, disk + halo * 0.5); gl_FragColor = vec4(v, v, v, 1.0); return; }
  vec3 c = disk * vec3(9.0, 7.0, 4.5) + halo * vec3(1.6, 0.95, 0.5);
  gl_FragColor = vec4(c, 1.0);
}`,De=`
uniform sampler2D tOcc;
uniform vec2 uL, uE;
uniform float uDensity, uDecay, uWeight, uExpo, uProbe;
varying vec2 vUv;
vec3 scatter(vec2 uv) {
  vec2 d = (uv - uL) * uDensity / float(${U});
  vec2 p = uv;
  float il = 1.0;
  vec3 s = vec3(0.0);
  for (int i = 0; i < ${U}; i++) {
    s += texture2D(tOcc, p).rgb * il * uWeight;
    il *= uDecay;
    p -= d;
  }
  return s * uExpo;
}
void main() {
  if (uProbe > 0.5) {
    vec2 uv = uL + (uE - uL) * vUv.x;
    gl_FragColor = vec4(scatter(uv).r * 0.5, texture2D(tOcc, uv).r, 0.0, 1.0);
    return;
  }
  gl_FragColor = vec4(scatter(vUv), 1.0);
}`,Pe=`
uniform sampler2D tScene, tRays;
uniform float uOn;
uniform vec3 uTint;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tScene, vUv).rgb + texture2D(tRays, vUv).rgb * uTint * uOn;
  c = (c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14);
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
  #include <colorspace_fragment>
}`;function Re(o){o.background=new re(3813189),o.fog=new ie(5916256,.022);const t=L.clone().normalize(),c=new b(new ce(300,32,16),new Y({vertexShader:be,fragmentShader:ke,side:le,depthWrite:!1,fog:!1,uniforms:{uSunDir:{value:t}}}));c.layers.set(ne),c.renderOrder=-10,o.add(c),o.add(new ue(8219296,2760728,.7));const s=new j(16756848,2.2);s.position.copy(L),o.add(s);const e=new j(8425727,.35);e.position.set(4,6,10),o.add(e);const y={uOcc:{value:0}},i=new b(new H(Q,Q),new Y({vertexShader:Me,fragmentShader:Se,uniforms:y,transparent:!0,depthWrite:!1,blending:de,fog:!1}));i.position.copy(L),i.layers.set($),o.add(i);const m=new b(new H(200,200),new F({color:3879976,roughness:1}));m.rotation.x=-Math.PI/2,o.add(m);const a=ye(31),h=new F({color:9076600,roughness:.9}),l=-20;for(let f=-4;f<=4;f++){const g=f===2||f===-3?3+a()*2:8,k=new b(new K(.45,.55,g,16),h);k.position.set(f*2.5,g/2,l),o.add(k);const x=new b(new G(1.3,.35,1.3),h);x.position.set(f*2.5,g+.17,l),o.add(x)}const n=new b(new G(11,.8,1.4),h);n.position.set(-5.6,8.75,l),o.add(n);const p=new b(new G(4,.8,1.4),h);p.position.set(8.2,8.75,l),p.rotation.z=-.12,o.add(p);const S=new F({color:2760728,roughness:1}),M=[],r=[];for(let f=0;f<46;f++){const v=(a()-.5)*50,g=-6-a()*40;if(Math.abs(g-l)<2.5||Math.abs(v)<4&&g>l)continue;const k=6+a()*7,x=new K(.12+a()*.1,.3+a()*.15,k,8);x.translate(v,k/2,g),r.push(x);for(let O=0;O<4;O++){const _=new fe(1.2+a()*1.4,1);_.translate(v+(a()-.5)*3,k-.5+a()*2.5,g+(a()-.5)*3),M.push(_.toNonIndexed()),_.dispose()}}o.add(new b(Z(r),S)),o.add(new b(Z(M),new F({color:2371615,roughness:1,flatShading:!0}))),r.forEach(f=>f.dispose()),M.forEach(f=>f.dispose());for(let f=0;f<8;f++){const v=new b(new ve(.4+a()*.7,0),h);v.position.set((a()-.5)*14,.2,-2-a()*14),v.rotation.set(a()*3,a()*3,0),o.add(v)}return{sun:i,sunU:y}}const Ee=(o,t)=>he(o.shared,"grClock",t,()=>({t:0}),(c,s)=>{o.params.bool("pan",!0)&&(c.t+=s)});function Ue(o,t,c,s,e){let y=0,i=1;for(let m=0;m<U;m++){const a=o*(1-m*e/U),h=ee(a*d-.5,0,d-1),l=Math.min(d-2,Math.floor(h)),n=h-l;y+=(t[l]*(1-n)+t[l+1]*n)*i*te,i*=s}return y*c}function W(o){return t=>pe(t,{antialias:!1,orbit:!1,fov:55,cam:[0,2,8],far:400},({scene:c,camera:s,renderer:e})=>{const{sun:y,sunU:i}=Re(c),m=1|1<<$|1<<ne;s.layers.mask=m;const a=we(e),h=new T(4,4,{type:a,samples:4}),l=new T(4,4),n=new T(4,4,{type:a}),p=new T(d,1),S=new Uint8Array(d*4),M=new se({color:0,fog:!1}),r=new q(De,{tOcc:{value:l.texture},uL:{value:new V(.5,.7)},uE:{value:new V(.3,.03)},uDensity:{value:.85},uDecay:{value:.965},uWeight:{value:te},uExpo:{value:.8},uProbe:{value:0}}),f=new q(Pe,{tScene:{value:h.texture},tRays:{value:n.texture},uOn:{value:o==="none"?0:1},uTint:{value:new z(1,.78,.5).multiplyScalar(1.3)}}),v={meas:new Float32Array(d),theo:new Float32Array(d),occ:new Float32Array(d),ok:!1};o!=="none"&&t.shared.set(`gr-${o}`,v);let g=0,k=!1;const x=new z,O=w=>{const P=c.background;c.background=null,e.setRenderTarget(l),e.setClearColor(0,1),e.clear(),e.autoClear=!1,w&&(c.overrideMaterial=M,s.layers.set(0),e.render(c,s),c.overrideMaterial=null),i.uOcc.value=1,s.layers.set($),e.render(c,s),i.uOcc.value=0,e.autoClear=!0,s.layers.mask=m,c.background=P},_=()=>{r.u.uProbe.value=1,r.render(e,p),r.u.uProbe.value=0,e.readRenderTargetPixels(p,0,0,d,1,S),e.setRenderTarget(null);const w=t.params;for(let u=0;u<d;u++)v.meas[u]=S[u*4]/255*2,v.occ[u]=S[u*4+1]/255;const P=r.u.uExpo.value,A=w.num("decay",.965),D=w.num("density",.85);for(let u=0;u<d;u++)v.theo[u]=Ue((u+.5)/d,v.occ,P,A,D);v.ok=!0};return{resize(w,P,A){const D=Math.min(A,1.5),u=Math.max(1,Math.floor(w*D)),R=Math.max(1,Math.floor(P*D));h.setSize(u,R),l.setSize(Math.max(1,u>>1),Math.max(1,R>>1)),n.setSize(Math.max(1,u>>1),Math.max(1,R>>1))},update(w,P,A){const D=Ee(t,A),u=t.params,R=Math.sin(D.t*.22)*2.6;s.position.set(R,2+Math.sin(D.t*.13)*.3,8),s.lookAt(R*.4,7.5,-60),s.updateMatrixWorld(),y.lookAt(s.position),x.copy(L).project(s);const E=r.u.uL.value;if(E.set((x.x+1)/2,(x.y+1)/2),k=x.z<1&&E.x>-.2&&E.x<1.2&&E.y>-.2&&E.y<1.2,r.u.uE.value.set(ee(E.x-.28,.02,.98),.03),r.u.uDensity.value=u.num("density",.85),r.u.uDecay.value=u.num("decay",.965),r.u.uExpo.value=k?u.num("expo",.8):0,!v.ok){t.hud("측정 준비 중…");return}const B=C=>Math.min(d-1,Math.floor(C*d)),I=oe.map(C=>`t${C.toFixed(2)} 측정 ${J(v.meas[B(C)])} / 이론 ${J(v.theo[B(C)])}`),ae=u.num("decay",.965);o==="none"?t.hud(["후처리 없음 · 가산 0",`켜면 ${I[1]}`].join(`
`)):t.hud([`I=E·w·Σ decayⁱ·occ (decay ${ae.toFixed(3)}, N=${U})`,...I].join(`
`))},render(){e.setRenderTarget(h),e.render(c,s);const w=g++%6===0;(o!=="none"||w)&&(O(o!=="bare"),o!=="none"&&r.render(e,n),w&&_()),f.render(e,null)},dispose(){h.dispose(),l.dispose(),n.dispose(),p.dispose(),M.dispose(),r.dispose(),f.dispose()}}})}function _e(o){return me(o,()=>({draw(t,c,s){ge(t,c,s);const e={x:34,y:24,w:X(c-46,20),h:X(s-52,20)},y=o.shared.get("gr-bare"),i=o.shared.get("gr-occ");let m=.2;for(const n of[y,i])if(n!=null&&n.ok)for(let p=0;p<d;p++)m=Math.max(m,n.meas[p],n.theo[p]);m*=1.1;const a=n=>e.x+(n+.5)/d*e.w,h=n=>e.y+e.h-Math.min(n,m)/m*e.h;if(i!=null&&i.ok){t.fillStyle="rgba(154,163,178,0.18)";for(let n=0;n<d;n++){const p=i.occ[n]*e.h;t.fillRect(a(n)-e.w/d/2,e.y+e.h-p,e.w/d+.5,p)}}t.strokeStyle="#1c2230",t.strokeRect(e.x+.5,e.y+.5,e.w,e.h);const l=(n,p,S,M)=>{t.strokeStyle=p,t.lineWidth=M,t.setLineDash(S),t.beginPath();for(let r=0;r<d;r++)r?t.lineTo(a(r),h(n[r])):t.moveTo(a(r),h(n[r]));t.stroke(),t.setLineDash([]),t.lineWidth=1};y!=null&&y.ok&&(l(y.meas,"#5b9cff",[],1.8),l(y.theo,"#ffffff",[3,3],1)),i!=null&&i.ok&&(l(i.meas,"#ff9a3c",[],1.8),l(i.theo,"#ffffff",[3,3],1));for(const n of oe)N(t,n.toFixed(2),e.x+n*e.w,e.y+e.h+11,"#7d8799",9,"center");N(t,`${m.toFixed(2)}`,e.x-3,e.y+8,"#7d8799",9,"right"),N(t,"해(t=0) → 화면 아래 직선 위 산란 세기 I(t)",e.x,14,"#c8d0dc",10),xe(t,[{label:"가림 없음",color:"#5b9cff"},{label:"가림 있음",color:"#ff9a3c"},{label:"이론(흰 점선)",color:"#ffffff"},{label:"가림 버퍼",color:"#9aa3b2"}],e.x,s-4,9),o.hud("")}}))}const Ne={layout:"variants",intro:"<b>빛줄기(갓 레이)</b>는 광원 앞의 나뭇잎·기둥·창살 사이로 빛이 <b>줄기 모양으로 새어 나오는</b> 연출입니다. 공기 중 먼지·안개가 빛을 산란시키는 현상을 흉내 내어 공간의 깊이와 공기의 밀도를 보여 주고, 줄기들이 모두 한 점(광원)으로 모이므로 <b>시선을 그쪽으로 끌어당기는</b> 화살표 역할도 합니다. 여기서는 가장 널리 쓰이는 <b>화면 공간 방사형 블러</b>(GPU Gems 3) 방식을 없음 / 가림 무시 / 가림 반영으로 비교합니다.",how:['반해상도 "가림 버퍼"를 그린다: 해(원판 + 후광)만 밝게, 나머지 물체는 모두 검게 (override material). 하늘은 그리지 않는다.',"산란 패스: 픽셀 x에서 해의 화면 위치 L 쪽으로 <code>Δ = (L − x)·ρ/N</code>씩 N = 64번 걸으며 <code>Σ decayⁱ · w · occ</code>를 더한다. 해가 가려진 방향은 0이 더해져 그림자 줄기가 생긴다.","감쇠 <code>decayⁱ</code>는 표본이 멀수록 지수적으로 줄어 빛줄기 끝이 부드럽게 사라지게 한다. 가림이 없으면(원판 하나) 합이 등비급수 <code>w(decay^i₀ − decay^N)/(1 − decay)</code>가 되어 해에서 멀수록 지수적으로 어두워진다.","산란 결과를 장면 위에 따뜻한 색으로 더하고 ACES 톤 매핑으로 합성한다. 해가 화면 밖으로 나가면 세기를 0으로 줄인다.","HUD 측정: 해 → 화면 아래 직선 위 256점의 산란값과 가림값을 같은 셰이더로 256×1 타깃에 그려 읽는다. 이론은 CPU가 그 가림값으로 위 합을 직접 계산한 값."],pros:["후처리 2패스(반해상도)로 볼류메트릭 조명 같은 인상을 싸게 얻는다.","빛줄기가 모두 광원으로 수렴해, 출구·목표·보스 등장 지점으로 시선을 강하게 유도한다.",'감쇠·밀도·세기 세 값으로 "먼지 낀 성당"부터 "안개 낀 숲"까지 분위기를 조절하기 쉽다.'],cons:["광원이 화면 밖이나 카메라 뒤로 가면 원리상 사라진다 – 화면 가장자리에서 자연스럽게 페이드해야 한다.","화면 공간이라 광원과 카메라 사이의 실제 3D 부피가 아니고, 측면에서 보는 빛기둥은 표현하지 못한다 (그럴 땐 볼류메트릭 포그·레이 마칭).","표본 수가 적으면 줄무늬(밴딩)가 보이고, 많으면 비싸다 – 지터·반해상도·블러로 숨긴다."],usedIn:"〈인사이드〉(창살 사이 빛), 〈저니〉의 사막 신전, 〈갓 오브 워〉(2018) 숲, 〈스카이림 스페셜 에디션〉·〈폴아웃 4〉의 갓 레이 옵션, 〈크라이시스〉(초기 화면 공간 선 샤프트 구현의 대표), 〈하프라이프: 알릭스〉의 먼지 빛줄기 등.",tips:["표본 수 N은 반해상도에서 32~64개, decay는 0.95~0.98, ρ는 0.7~1.0이 흔한 출발점이다. N을 줄일 땐 픽셀마다 시작 위치를 무작위로 밀고(지터) TAA나 블러로 섞으면 줄무늬가 사라진다.","해가 화면 가장자리에 다가가면 세기를 smoothstep으로 0까지 줄이고, 카메라가 해를 등지면(시선과 해 방향의 내적 < 0) 끈다.","가림 버퍼의 해 원판은 실제보다 2~3배 크게, 후광을 부드럽게 그려야 줄기가 풍성해진다. 하늘의 밝은 구름도 약하게 넣으면 자연스럽다.","줄기 색은 해 색보다 살짝 따뜻하게, 세기는 장면 밝기의 10~30% 정도로 더한다. 과하면 화면 전체가 뿌옇게 떠 보인다."],related:["volumetric-fog","radial-blur","lens-flare","bloom","guiding-light"],controls:[{type:"range",key:"decay",label:"감쇠 decay (표본당)",min:.9,max:.995,step:.001,value:.965},{type:"range",key:"density",label:"표본 거리 ρ (해까지 거리 대비)",min:.3,max:1,step:.01,value:.85},{type:"range",key:"expo",label:"세기 E (배)",min:.2,max:1.5,step:.05,value:.8},{type:"toggle",key:"pan",label:"카메라 좌우 이동",value:!0}],viewers:[{title:"빛줄기 없음",kind:"before",caption:"해와 열주·숲이 있지만 공기가 비어 있는 듯 평평합니다. 해가 기둥 사이에 있어도 그냥 밝은 점일 뿐입니다.",mount:W("none")},{title:"방사형 블러 (가림 무시)",kind:"variant",caption:"가림 버퍼에 해만 그리고 방사형으로 번지게 했습니다. 후광은 생기지만 기둥이 빛을 막지 않아 줄기 없이 뿌옇게 번집니다.",mount:W("bare")},{title:"빛줄기 (가림 반영)",kind:"after",caption:"기둥·나뭇잎을 검게 그린 가림 버퍼를 같은 방식으로 번지게 하면, 틈으로 새어 나온 빛줄기와 그림자 줄기가 해로 모입니다.",mount:W("occ")},{title:"빛줄기 세기 프로파일",kind:"info",caption:"해에서 화면 아래로 그은 직선 위의 산란 세기입니다. 가림 없음(파랑)은 지수적으로 줄고, 가림 있음(주황)은 기둥 그림자에서 움푹 꺼집니다. 흰 점선 = 이론 합.",mount:_e}]};export{Ne as default};
