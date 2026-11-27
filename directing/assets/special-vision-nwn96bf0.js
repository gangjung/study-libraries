import{W as X,k as q,V as C,C as ot,H as ut,u as ct,M as N,P as vt,g as D,p as dt,a as O,c as mt,G as ht,i as ft,aa as pt,h as J,S as xt,D as bt}from"./three.module-CEzfHhrp.js";import{m as wt}from"./three-viewer-fx7lDL-0.js";import{m as gt,b as K,s as Mt,a as yt}from"./canvas-viewer-QtaWfmlz.js";import{c as Tt,t as U,l as at}from"./chart2d-DfgeckAJ.js";import{h as Lt,P as nt,f as Pt,a as Y}from"./extra-kit-c-FPjCbN4U.js";import{m as st}from"./cam-kit2-DamJRS7e.js";import{P as rt,H as it,s as Q,b as $t}from"./postfx-kit-b-mDqSKWWr.js";const P=-10,E=50,kt=6,V=[[0,0,0,.02],[.18,.12,0,.42],[.4,.62,0,.55],[.6,.95,.28,.05],[.8,1,.78,.1],[1,1,1,.92]],lt=a=>{a=Math.min(1,Math.max(0,a));for(let t=1;t<V.length;t++)if(a<=V[t][0]){const i=V[t-1],r=V[t],n=(a-i[0])/(r[0]-i[0]);return[i[1]+(r[1]-i[1])*n,i[2]+(r[2]-i[2])*n,i[3]+(r[3]-i[3])*n]}return[1,1,.92]},Z=Array.from({length:256},(a,t)=>lt(t/255)),St=`
vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  ${V.slice(1).map((a,t)=>{const i=V[t];return`if (t <= ${a[0].toFixed(3)}) return mix(vec3(${i[1].toFixed(3)}, ${i[2].toFixed(3)}, ${i[3].toFixed(3)}), vec3(${a[1].toFixed(3)}, ${a[2].toFixed(3)}, ${a[3].toFixed(3)}), (t - ${i[0].toFixed(3)}) / ${(a[0]-i[0]).toFixed(3)});`}).join(`
  `)}
  return vec3(1.0, 1.0, 0.92);
}`,g=8,M=[{label:"인물 몸통",temp:34},{label:"자동차 보닛",temp:46},{label:"자동차 문",temp:18},{label:"건물 벽",temp:9},{label:"바닥",temp:4}],Ft=`
varying vec3 vN, vV;
varying float vY;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vY = wp.y;
  vN = normalize(mat3(modelMatrix) * normal);
  vV = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Rt=`
uniform float uTemp, uHead;
varying vec3 vN, vV;
varying float vY;
void main() {
  float nv = clamp(abs(dot(normalize(vN), normalize(vV))), 0.0, 1.0);
  float T = uTemp;
  // 사람(둥근 몸): 가장자리는 식어 보임, 머리는 +2°C
  if (uHead > 0.5) {
    T -= ${kt.toFixed(1)} * (1.0 - nv) * (1.0 - nv);
    if (vY > 1.55) T += 2.0;
  }
  gl_FragColor = vec4((T - ${P.toFixed(1)}) / ${(E-P).toFixed(1)}, 0.0, 0.0, 1.0);
}`,Gt=`
uniform sampler2D tSrc, tBloom;
uniform vec2 uRes, uTexel;
uniform float uGain, uGrain, uTime, uProbe, uStage, uBloom;
varying vec2 vUv;
${it}
float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
float amp(vec2 uv) { return 1.0 - exp(-uGain * lum(texture2D(tSrc, uv).rgb)); }
void main() {
  if (uProbe > 0.5) {
    vec2 uv = (floor(vUv * ${g}.0) + 0.5) / ${g}.0;
    float L = lum(texture2D(tSrc, uv).rgb);
    gl_FragColor = vec4(sqrt(clamp(L, 0.0, 1.0)), amp(uv), 0.0, 1.0);
    return;
  }
  if (uStage < 0.5) {
    // 블룸 원천: 1/4 해상도, 밝은 부분만
    float a = amp(vUv);
    gl_FragColor = vec4(vec3(max(a - 0.75, 0.0) * 4.0), 1.0);
    return;
  }
  float a = amp(vUv);
  // 블룸: 저해상도 텍스처를 넓게 13탭
  float b = 0.0;
  for (int i = -3; i <= 3; i++) {
    b += texture2D(tBloom, vUv + vec2(float(i) * 2.5, 0.0) * uTexel).r * 0.08;
    b += texture2D(tBloom, vUv + vec2(0.0, float(i) * 2.5) * uTexel).r * 0.08;
  }
  float n = (pk_h21(floor(vUv * uRes) + fract(uTime * 7.31) * 113.0) - 0.5) * uGrain * (0.35 + sqrt(a));
  float v = clamp(a + n + b * uBloom, 0.0, 1.5);
  vec3 c = v * vec3(0.28, 1.0, 0.36);
  // 고글 비네트 (원형 두 개가 겹친 모양)
  vec2 q = (vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float d = min(length(q - vec2(-0.16, 0.0)), length(q - vec2(0.16, 0.0)));
  c *= smoothstep(0.62, 0.42, d);
  // 주사선
  c *= 0.92 + 0.08 * sin(vUv.y * uRes.y * 1.6);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,Nt=`
uniform sampler2D tHeat;
uniform vec2 uRes;
uniform float uTime, uNoise, uProbe;
uniform vec2 uPts[${M.length}];
varying vec2 vUv;
${it}
${St}
void main() {
  if (uProbe > 0.5) {
    int i = int(floor(vUv.x * ${M.length}.0));
    vec2 uv = uPts[0];
    for (int k = 0; k < ${M.length}; k++) if (k == i) uv = uPts[k];
    gl_FragColor = vec4(ramp(texture2D(tHeat, uv).r), 1.0);
    return;
  }
  float t = texture2D(tHeat, vUv).r;
  t += (pk_h21(floor(vUv * uRes * 0.5) + fract(uTime * 5.7) * 91.0) - 0.5) * uNoise;
  vec3 c = ramp(t);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,Ct=(a,t)=>Mt(a.shared,"svClock",t,()=>({t:0}),(i,r)=>i.t+=r);function Ht(a){a.background=new ot(329485),a.add(new ut(3820144,657414,.12));const t=new ct(9085183,.25);t.position.set(-6,10,4),a.add(t);const i=new Map,r=(c,v,e=!1)=>{c.traverse(o=>{o.isMesh&&(i.set(o,v),o.userData.head=e)})},n=[],R=[],u=new N(new vt(80,80),new D({color:3816772,roughness:.95}));u.rotation.x=-Math.PI/2,a.add(u),r(u,4);const $=a.children.length;R.push(...$t(a,{z:-11,x0:-20,x1:20,seed:21,hMin:4,hMax:10,emissive:.35}));for(let c=$;c<a.children.length;c++)r(a.children[c],9);const k=yt(5),G=new dt(1,1),l=new O(.12,.16,1.6,6);n.push(G,l);for(const[c,v]of[[-7,-5],[-5.5,-7],[6.5,-6],[8,-4],[-9,-2]]){const e=new N(G,new D({color:3103280,roughness:.9,flatShading:!0}));e.position.set(c,2.2+k()*.4,v),e.scale.setScalar(1+k()*.4);const o=new N(l,new D({color:4863008}));o.position.set(c,.8,v),a.add(e,o),r(e,11),r(o,12)}const S=new N(new O(.06,.08,3.6,8),new D({color:5593696,metalness:.6,roughness:.4}));S.position.set(-3.6,1.8,-2);const s=new N(new mt(.18,12,8),new ht({color:new ot(16767392).multiplyScalar(4)}));s.position.set(-3.6,3.6,-2),a.add(S,s),r(S,14),r(s,70);const m=new ft(16763008,5,12,1.6);m.position.copy(s.position),a.add(m);const h=new pt,y=new D({color:6957610,roughness:.4,metalness:.4}),p=new N(new J(1.5,.7,1.4),y);p.position.set(-.4,.6,0);const b=new N(new J(1.1,.75,1.4),y);b.position.set(.9,.62,0);const H=new N(new J(1.3,.5,1.3),new D({color:1382946,roughness:.2,metalness:.6}));H.position.set(-.4,1.2,0),h.add(p,b,H);for(const[c,v]of[[-.8,.7],[1.15,.7],[-.8,-.7],[1.15,-.7]]){const e=new N(new O(.28,.28,.2,12),new D({color:1118481}));e.rotation.x=Math.PI/2,e.position.set(c,.28,v),h.add(e),r(e,30)}h.position.set(3.4,0,-1.5),h.rotation.y=-.35,a.add(h),r(p,18),r(b,46),r(H,12);const W=[],z=[3829416,9079354,8014474];for(let c=0;c<3;c++){const v=st(z[c],2106412);a.add(v.group),r(v.group,34,!0),W.push({r:v,rad:1.6+c*.9,ph:c*2.1,sp:.35-c*.07,cx:-.6+c*.4,cz:.5-c*.6})}const d=st(4876874,2106412);d.group.position.set(1,0,1.6),d.group.rotation.y=Math.PI,a.add(d.group),r(d.group,34,!0);const A=c=>{for(const v of W){const e=v.ph+c*v.sp;v.r.group.position.set(v.cx+Math.cos(e)*v.rad,0,v.cz+Math.sin(e)*v.rad*.6),v.r.group.rotation.y=-e+Math.PI,v.r.pose(c*1.1+v.ph,.6)}d.pose(0,0)},F=[new C(1,1.22,1.6+.22),b.localToWorld(new C(-.25,0,.71)),p.localToWorld(new C(0,0,.71)),new C(-1.2,3,-10.5),new C(0,0,5.5)];return h.updateMatrixWorld(!0),F[1]=b.localToWorld(new C(-.25,0,.71)),F[2]=p.localToWorld(new C(0,0,.71)),{heat:i,animate:A,geos:n,texs:R,pts:F}}function tt(a){return t=>wt(t,{antialias:!1,orbit:!1,fov:50,cam:[0,2.4,10],target:[0,1.6,0],far:100},({scene:i,camera:r,renderer:n})=>{const{heat:R,animate:u,geos:$,texs:k,pts:G}=Ht(i),l=Lt(n),S=new X(4,4,{type:l,samples:a==="nv"?4:0}),s=new X(4,4,{type:l}),m=new X(4,4,{type:l}),h=new rt(g,g),y=new rt(M.length,1),p=new nt(Gt,{tSrc:{value:S.texture},tBloom:{value:s.texture},uRes:{value:new q(300,200)},uTexel:{value:new q(.01,.01)},uGain:{value:12},uGrain:{value:.15},uTime:{value:0},uProbe:{value:0},uStage:{value:1},uBloom:{value:1}}),b=new nt(Nt,{tHeat:{value:m.texture},uRes:{value:new q(300,200)},uTime:{value:0},uNoise:{value:.02},uProbe:{value:0},uPts:{value:M.map(()=>new q)}}),H=new Map,W=(e,o)=>{const x=`${e}|${o}`;let f=H.get(x);return f||(f=new xt({vertexShader:Ft,fragmentShader:Rt,uniforms:{uTemp:{value:e},uHead:{value:o?1:0}},side:bt}),H.set(x,f)),f},z=new Map,d=t.shared.get("sv-meas")??{gain:12,Lin:new Float32Array(g*g),Lout:new Float32Array(g*g),idxMeas:M.map(()=>NaN),vis:M.map(()=>!1),hasNV:!1,hasTH:!1};t.shared.set("sv-meas",d);let A=0;const F=new C,c=i.background,v=()=>{R.forEach((o,x)=>{z.set(x,x.material),x.material=W(o,!!x.userData.head)});const e=[];i.traverse(o=>{o.isPoints&&o.visible&&e.push(o)}),e.forEach(o=>o.visible=!1),i.background=null,n.setRenderTarget(m),n.setClearColor(0,1),n.clear(),n.render(i,r),i.background=c,e.forEach(o=>o.visible=!0),z.forEach((o,x)=>x.material=o),z.clear()};return{resize(e,o,x){const f=Math.min(x,1.5);Q(S,e*f,o*f),Q(s,e*f/4,o*f/4),Q(m,e/3,o/3),p.u.uRes.value.set(Math.max(1,e*f),Math.max(1,o*f)),p.u.uTexel.value.set(4/Math.max(1,e*f),4/Math.max(1,o*f)),b.u.uRes.value.set(Math.max(1,e),Math.max(1,o))},update(e,o,x){const f=Ct(t,x),_=t.params;u(f.t);const I=_.bool("drift",!0)?Math.sin(f.t*.18):0;r.position.set(I*1.6,2.4,10),r.lookAt(I*.4,1.6,0),r.updateMatrixWorld();const T=_.num("gain",12);if(p.u.uGain.value=T,p.u.uGrain.value=_.num("grain",.15),p.u.uTime.value=f.t,b.u.uTime.value=f.t,b.u.uNoise.value=_.num("grain",.15)*.15,G.forEach((L,w)=>{F.copy(L).project(r),d.vis[w]=Math.abs(F.x)<.97&&Math.abs(F.y)<.97&&F.z<1,b.u.uPts.value[w].set(F.x*.5+.5,F.y*.5+.5)}),a==="normal")t.hud(`맨눈 · 달빛 + 가로등 하나
인물 4명·자동차가 어둠에 묻혀 잘 안 보임`);else if(a==="nv"){d.gain=T,d.hasNV=!0;let L=0,w=0;for(let j=0;j<d.Lin.length;j++){const et=d.Lin[j];et>=.999||(L+=Math.abs(d.Lout[j]-(1-Math.exp(-T*et))),w++)}const B=(g>>1)*g+(g>>1);t.hud([`L' = 1 − e^(−g·L),  g = ${Pt(T)}`,`중앙 칸 L=${d.Lin[B].toFixed(3)} → 측정 ${Y(d.Lout[B])} / 이론 ${Y(1-Math.exp(-T*d.Lin[B]))}`,`격자 ${w}칸 평균 오차 ${(w?L/w:NaN).toFixed(3)} · 그레인 ∝ √L'`].join(`
`))}else{d.hasTH=!0;const L=w=>{const B=(M[w].temp-P)/(E-P);return d.vis[w]?`${M[w].label} ${M[w].temp}°C idx 측정 ${Y(d.idxMeas[w])} / 이론 ${Y(B)}`:`${M[w].label} (화면 밖)`};t.hud([`idx = (T − ${P}) / ${E-P}`,L(0),L(1),L(3)].join(`
`))}},render(){if(a==="normal"){n.setRenderTarget(null),n.render(i,r);return}if(a==="nv"){if(n.setRenderTarget(S),n.render(i,r),p.u.uStage.value=0,p.render(n,s),p.u.uStage.value=1,A%8===0){p.u.uProbe.value=1,p.render(n,h.rt),p.u.uProbe.value=0,h.read(n);for(let e=0;e<g;e++)for(let o=0;o<g;o++){const x=e*g+o;d.Lin[x]=h.at(o,e,0)**2,d.Lout[x]=h.at(o,e,1)}}A++,p.render(n,null);return}if(v(),A%8===0){b.u.uProbe.value=1,b.render(n,y.rt),b.u.uProbe.value=0,y.read(n);for(let e=0;e<M.length;e++){const o=y.at(e,0,0),x=y.at(e,0,1),f=y.at(e,0,2);let _=0,I=1e9;for(let T=0;T<256;T++){const L=(Z[T][0]-o)**2+(Z[T][1]-x)**2+(Z[T][2]-f)**2;L<I&&(I=L,_=T)}d.idxMeas[e]=_/255}}A++,b.render(n,null)},dispose(){S.dispose(),s.dispose(),m.dispose(),h.dispose(),y.dispose(),p.dispose(),b.dispose(),H.forEach(e=>e.dispose()),$.forEach(e=>e.dispose()),k.forEach(e=>e.dispose())}}})}function _t(a){return gt(a,()=>({draw(t,i,r){Tt(t,i,r);const n=a.shared.get("sv-meas");if(!n)return;const R=i/2,u={x:38,y:24,w:K(R-52,20),h:K(r-58,20)},$=Math.min(1,Math.max(.05,4/Math.max(1,n.gain))),k=s=>u.x+Math.min(s,$)/$*u.w,G=s=>u.y+u.h-Math.max(0,Math.min(1,s))*u.h;t.strokeStyle="#1c2230",t.strokeRect(u.x+.5,u.y+.5,u.w,u.h),U(t,"0",u.x,u.y+u.h+12,"#7d8799",9,"center"),U(t,$.toFixed(2),u.x+u.w,u.y+u.h+12,"#7d8799",9,"right"),U(t,"1",u.x-4,u.y+6,"#7d8799",9,"right"),t.strokeStyle="#4ade80",t.lineWidth=1.8,t.beginPath();for(let s=0;s<=60;s++){const m=s/60*$,h=G(1-Math.exp(-n.gain*m));s?t.lineTo(k(m),h):t.moveTo(k(m),h)}if(t.stroke(),t.strokeStyle="#7d8799",t.setLineDash([3,3]),t.lineWidth=1,t.beginPath(),t.moveTo(k(0),G(0)),t.lineTo(k(Math.min($,1/n.gain)),G(1)),t.stroke(),t.setLineDash([]),t.fillStyle="#ff9a3c",n.hasNV)for(let s=0;s<n.Lin.length;s++)n.Lin[s]>$||(t.beginPath(),t.arc(k(n.Lin[s]),G(n.Lout[s]),2.6,0,Math.PI*2),t.fill());U(t,"야간 투시: 입력 L → 출력 L'",6,14,"#c8d0dc",10),at(t,[{label:"1−e^(−gL)",color:"#4ade80"},{label:"g·L (선형)",color:"#7d8799"},{label:"측정",color:"#ff9a3c"}],u.x,r-6,9);const l={x:R+16,y:40,w:K(R-30,20),h:22};for(let s=0;s<l.w;s++){const m=lt(s/l.w);t.fillStyle=`rgb(${Math.round(Math.pow(m[0],1/2.2)*255)},${Math.round(Math.pow(m[1],1/2.2)*255)},${Math.round(Math.pow(m[2],1/2.2)*255)})`,t.fillRect(l.x+s,l.y,1,l.h)}for(const s of[P,10,30,E])U(t,`${s}°`,l.x+(s-P)/(E-P)*l.w,l.y+l.h+11,"#7d8799",9,"center");U(t,"열화상: 온도 → 팔레트 index",R+6,14,"#c8d0dc",10);const S=Math.max(12,Math.min(20,(r-l.y-l.h-40)/M.length));M.forEach((s,m)=>{const h=l.y+l.h+26+m*S,y=l.x+(s.temp-P)/(E-P)*l.w;t.strokeStyle="#5b9cff",t.beginPath(),t.moveTo(y,h-5),t.lineTo(y,h+5),t.stroke(),n.hasTH&&n.vis[m]&&Number.isFinite(n.idxMeas[m])&&(t.fillStyle="#ff9a3c",t.beginPath(),t.arc(l.x+n.idxMeas[m]*l.w,h,3.2,0,Math.PI*2),t.fill()),U(t,`${s.label} ${s.temp}°`,l.x,h+3,"#c8d0dc",9)}),at(t,[{label:"설정 온도",color:"#5b9cff"},{label:"화면색→index",color:"#ff9a3c"}],l.x,r-6,9)}}))}const Bt={layout:"variants",intro:'<b>특수 시야</b>는 화면 전체의 색 규칙을 바꿔 "장비를 쓰고 본다"는 감각을 줍니다. <b>야간 투시경</b>은 아주 어두운 빛을 증폭관으로 키워 녹색 단색으로 보여 주고(밝은 곳은 포화, 어두운 곳은 노이즈), <b>열화상</b>은 빛이 아니라 <b>온도</b>를 보여 주므로 어둠 속 사람·엔진은 밝게, 차가운 벽·바닥은 어둡게 뜹니다. 세 뷰어는 같은 밤 골목을 <b>맨눈 / 야간 투시 / 열화상</b>으로 보여 줍니다.',how:["야간 투시: 장면 휘도 L을 증폭관처럼 포화시키며 키운다 <code>L' = 1 − exp(−g·L)</code> — 어두운 곳은 거의 g배, 가로등 근처는 1에 붙어 하얗게 탄다.","단색 녹색(사람 눈이 가장 민감하고 오래 봐도 덜 피로한 색)으로 매핑하고, 그레인(진폭 ∝ 0.35 + √L' — 산탄 잡음처럼 절대량은 밝을수록 커지지만 신호 대비로는 어두운 곳이 더 거칠다), 밝은 곳의 블룸(1/4 해상도 블러), 고글 모양 비네트와 주사선을 더한다.",'열화상: 같은 장면을 물체별 "온도 재질"로 한 번 더 그린다. 평평한 물체는 온도 T 그대로, 사람(둥근 몸)은 가장자리를 조금 식게 <code>−ΔT·(1−n·v)²</code>, 머리는 +2°C. 결과를 1/3 해상도에 기록해 센서처럼 뭉개지게 한다.',"팔레트: <code>index = (T − Tmin)/(Tmax − Tmin)</code>, 검정→남색→자홍→주황→노랑→흰색(아이언보우풍) 램프. 범위 밖은 끝 색에 붙는다 (가로등 70°C → 흰색).","HUD 측정: NV는 8×8 격자에서 같은 셰이더로 입력 L(√ 인코딩)과 출력 L'을 읽어 이론 곡선에 찍는다. 열화상은 표본 지점의 화면색을 읽어 CPU 팔레트 표에서 가장 가까운 index를 찾고, 설정 온도의 index와 비교한다 (인물은 몸통 정면 중심이라 n·v≈1, 가장자리 냉각이 거의 0이라는 근사. 표본 지점이 걷는 사람에 가려지면 순간적으로 어긋난다)."],pros:['화면 규칙이 통째로 바뀌어 "모드 전환"이 즉시 읽힌다. 스텔스·저격 게임에서 정보와 긴장을 함께 준다.',"열화상은 숨은 적·최근에 움직인 차량(엔진 열)을 드러내는 게임플레이 정보가 된다.",'NV의 포화 곡선 덕분에 섬광탄·조명이 켜지면 화면이 하얗게 타는 "역효과" 연출도 자연스럽게 나온다.'],cons:["색 정보가 사라져 팀 구분·아이템 색 같은 정보가 안 보인다 — 아군 표시는 별도 UI로 그려야 한다.","열화상은 물체마다 온도를 지정해야 해서 아트 작업이 늘고, 재질 교체 패스만큼 그리기 비용이 든다.","그레인·주사선이 과하면 피로하다. 장비를 쓰는 짧은 구간에만."],usedIn:"〈스플린터 셀〉의 야간·열 고글, 〈콜 오브 듀티 4〉의 AC-130 열화상과 시리즈의 열화상 조준경, 〈메트로〉 시리즈 야간 투시경, 〈크라이시스 2〉의 열 감지 시야, 영화 〈프레데터〉의 열 시야 등.",tips:['증폭 g는 장면 평균 휘도가 0.1~0.3쯤 되게 잡는다. 섬광탄·조명이 켜질 때는 g를 순간적으로 낮춘 뒤 1~2초에 걸쳐 되돌리면 "자동 이득 조절"처럼 보인다.',"열화상 온도는 재질 ID나 정점 색에 저장해 두면 같은 메시를 온도 패스로 한 번 더 그리기만 하면 된다. 1/2~1/3 해상도로 그려야 센서 느낌이 난다.","팔레트는 아이언보우(이 페이지) 외에 흰색=뜨거움/검정=뜨거움 흑백도 흔하다. 대비가 필요한 게임플레이라면 흑백이 더 잘 읽힌다.",'전환 순간 0.1~0.2초 하얗게 번쩍이거나 노이즈를 넣고 장비 켜는 소리를 붙이면 "장비를 썼다"는 감각이 확실해진다.'],related:["xray-silhouette","elemental-sight","scan-pulse","status-overlay","crt-tv"],controls:[{type:"range",key:"gain",label:"야간 투시 증폭 g (배)",min:1,max:40,step:.5,value:12},{type:"range",key:"grain",label:"그레인 세기 (0~0.5)",min:0,max:.5,step:.01,value:.15},{type:"toggle",key:"drift",label:"카메라 천천히 이동",value:!0}],viewers:[{title:"맨눈",kind:"before",caption:"달빛과 가로등 하나뿐인 밤입니다. 걸어 다니는 사람들과 자동차가 어둠에 묻혀 거의 보이지 않습니다.",mount:tt("normal")},{title:"야간 투시경",kind:"variant",caption:"빛을 증폭해 녹색으로 보여 줍니다. 형태는 다 보이지만 가로등 근처는 하얗게 타고 어두운 곳엔 그레인이 낍니다.",mount:tt("nv")},{title:"열화상",kind:"after",caption:"온도를 색으로 보여 줍니다. 사람(34°C)과 엔진 보닛(46°C)이 밝게, 바닥과 벽은 어둡게 뜹니다. 빛이 없어도 상관없습니다.",mount:tt("thermal")},{title:"증폭 곡선 · 온도 팔레트",kind:"info",caption:"왼쪽: NV 출력이 초록 이론 곡선을 따라 포화되는지 (주황 = 격자 측정). 오른쪽: 각 물체의 설정 온도(파란 눈금)와 화면색에서 역으로 찾은 팔레트 위치(주황 점).",mount:_t}]};export{Bt as default};
