import{V as _,C as $,M as W,S as V,D as it,a as lt,b as rt,W as ct}from"./three.module-CEzfHhrp.js";import{m as ht}from"./three-viewer-fx7lDL-0.js";import{m as ut,b as X,s as ft}from"./canvas-viewer-QtaWfmlz.js";import{c as pt,t as Y,l as mt}from"./chart2d-DfgeckAJ.js";import{s as dt,h as vt,e as Mt,A as yt,p as B,r as I,a as bt}from"./anime-kit-C6AkWSFn.js";import{f as wt}from"./extra-kit-c-FPjCbN4U.js";const L=1.06,R={sx:L,sy:L,sz:L,front:1.02,tips:1.36,side:2,back:2.3,strands:22,phase:.5,segPhi:352},U=new _(0,1.5,5.6),D=new _(0,.15,0),x=Math.PI/180,xt=e=>.05*Math.sin(e*23)+.03*Math.sin(e*57+1),J=(e,n,i)=>{const t=Math.min(1,Math.max(0,(i-e)/(n-e)));return t*t*(3-2*t)};function at(e,n,i,t,u){const p=Math.acos(Math.max(-1,Math.min(1,n.y))),c=Math.atan2(n.x,n.z);let o=t.x+i.x,m=t.y+i.y,b=t.z+i.z;const v=Math.hypot(o,m,b)||1;o/=v,m/=v,b/=v;const d=n.x*t.x+n.y*t.y+n.z*t.z,f=J(-.1,.3,d),a=u.beta+xt(c);if(e==="blinn")return Math.pow(Math.max(0,n.x*o+n.y*m+n.z*b),u.shin)*f;if(e==="kk"){const z=Math.cos(p-a),r=z*Math.sin(c)*o-Math.sin(p-a)*m+z*Math.cos(c)*b;return Math.pow(Math.sqrt(Math.max(0,1-r*r)),u.shin)*f}const y=a+Math.atan2(o*Math.sin(c)+b*Math.cos(c),m),F=u.hw*(1+.3*Math.sin(c*40));return(Math.abs(p-y)<=F?1:0)*J(.05,.35,n.x*o+n.y*m+n.z*b)}const K={u:new _,V:new _,P:new _};function nt(e,n,i,t,u,p=0){return K.u.set(Math.sin(n)*Math.sin(p),Math.cos(n),Math.sin(n)*Math.cos(p)),K.P.copy(K.u).multiplyScalar(L),K.V.copy(i).sub(K.P).normalize(),at(e,K.u,K.V,t,u)}function Q(e,n,i,t,u=0){const o=R.tips;let m=-1,b=NaN,v=NaN,d=NaN;for(let f=0;f<=1e3;f++){const a=.02+(o-.02)*f/1e3,y=nt(e,a,n,i,t,u);e==="ring"?y>.5&&(Number.isFinite(v)||(v=a),d=a):y>m&&(m=y,b=a)}return e==="ring"?{th:(v+d)/2,width:d-v}:{th:m>.02?b:NaN,width:NaN}}const Nt=`
varying vec3 vLp;
varying vec3 vWp;
void main() {
  vLp = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,St=`
uniform vec3 uL;
uniform float uMode, uBeta, uHW, uShin, uMeas, uStr;
uniform vec3 uLit, uShade, uSpec;
varying vec3 vLp;
varying vec3 vWp;
void main() {
  if (!gl_FrontFacing) {
    if (uMeas > 0.5) { gl_FragColor = vec4(0.0); return; }
    gl_FragColor = vec4(uShade * 0.6, 1.0);
    #include <colorspace_fragment>
    return;
  }
  vec3 u = normalize(vLp);
  float th = acos(clamp(u.y, -1.0, 1.0));
  float ps = atan(u.x, u.z);
  vec3 V = normalize(cameraPosition - vWp);
  vec3 H = normalize(uL + V);
  float ndl = dot(u, uL);
  float m = smoothstep(-0.1, 0.3, ndl);
  float b = uBeta + 0.05 * sin(ps * 23.0) + 0.03 * sin(ps * 57.0 + 1.0);
  float spec;
  if (uMode < 0.5) {
    spec = pow(max(dot(u, H), 0.0), uShin) * m;
  } else if (uMode < 1.5) {
    float c = cos(th - b);
    vec3 Ts = vec3(c * sin(ps), -sin(th - b), c * cos(ps));
    float t = dot(Ts, H);
    spec = pow(sqrt(max(0.0, 1.0 - t * t)), uShin) * m;
  } else {
    float tc = b + atan(H.x * sin(ps) + H.z * cos(ps), H.y);
    float hw = uHW * (1.0 + 0.3 * sin(ps * 40.0));
    spec = step(abs(th - tc), hw) * smoothstep(0.05, 0.35, dot(u, H));
  }
  if (uMeas > 0.5) { gl_FragColor = vec4(clamp(spec, 0.0, 1.0), 1.0, 0.0, 1.0); return; }
  // 가닥 결: ψ 방향 줄무늬로 바탕을 살짝 흔든다
  float strand = 0.5 + 0.5 * sin(ps * 90.0 + sin(th * 7.0) * 2.0);
  vec3 col = mix(uShade, uLit, smoothstep(-0.04, 0.04, ndl));
  col *= mix(0.92, 1.05, strand * uStr);
  if (uMode > 1.5) {
    // 단색 띠 + 가운데 밝은 심
    float tc = b + atan(H.x * sin(ps) + H.z * cos(ps), H.y);
    float core = step(abs(th - tc), uHW * 0.35);
    col = mix(col, uSpec, spec * 0.85);
    col = mix(col, vec3(1.0), spec * core * 0.5);
  } else {
    col += uSpec * spec * (uMode < 0.5 ? 1.0 : 0.75);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Z=`
varying vec3 vN;
varying vec3 vLp;
void main() { vN = normalize(mat3(modelMatrix) * normal); vLp = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,tt=`
uniform vec3 uL, uLit, uShade;
uniform float uFace;
varying vec3 vN;
varying vec3 vLp;
${yt}
void main() {
  float lit = smoothstep(-0.03, 0.03, dot(normalize(vN), uL));
  vec3 col = mix(uShade, uLit, lit);
  if (uFace > 0.5 && vLp.z > 0.0) { vec4 f = animeFace(vLp.xy, lit); col = mix(col, f.rgb, f.a * smoothstep(0.25, 0.5, vLp.z)); }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,gt=(e,n)=>ft(e.shared,"arClock",n,()=>({t:0,el:50}),(i,t)=>{i.t+=t,i.el=e.params.bool("auto",!0)?48+22*Math.sin(i.t*.45):e.params.num("elev",50)}),Tt=(e,n,i)=>i.set(Math.sin(n*x)*Math.cos(e*x),Math.sin(e*x),Math.cos(n*x)*Math.cos(e*x)),et=e=>({beta:e.params.num("beta",-14)*x,hw:e.params.num("ringW",7)/2*x,shin:e.params.num("shin",60)});function E(e){return n=>ht(n,{antialias:!0,orbit:!1,fov:32,cam:[U.x,U.y,U.z],target:[D.x,D.y,D.z],far:120},({scene:i,camera:t,renderer:u})=>{i.background=null,i.add(dt(16507860,10994928));const p={value:new _(0,.7,.7)},c={uL:p,uMode:{value:e==="blinn"?0:e==="kk"?1:2},uBeta:{value:0},uHW:{value:.06},uShin:{value:60},uMeas:{value:0},uStr:{value:e==="blinn"?.3:1},uLit:{value:new $(5916304)},uShade:{value:new $(2760773)},uSpec:{value:new $(e==="ring"?13220095:14208255)}},o=new W(vt(R),new V({vertexShader:Nt,fragmentShader:St,uniforms:c,side:it}));o.layers.enable(3),i.add(o);const m=P=>new V({vertexShader:Z,fragmentShader:tt,uniforms:{uL:p,uFace:{value:P?1:0},uLit:{value:new $(16770776)},uShade:{value:new $(14852779)}}});i.add(new W(Mt(1,1,.98),m(!0)));const b=new W(new lt(.32,.36,.8,24),m(!1));b.position.set(0,-1.2,-.1),i.add(b);const v=new W(new rt(.6,1.8,8,24),new V({vertexShader:Z,fragmentShader:tt,uniforms:{uL:p,uFace:{value:0},uLit:{value:new $(15921402)},uShade:{value:new $(10856136)}}}));v.rotation.z=Math.PI/2,v.position.set(0,-1.95,-.2),i.add(v);let d=null,f=1,a=1,y=new Uint8Array(4),F=new Uint8Array(4);const l={th:NaN,thTh:NaN,w:NaN,wTh:NaN,frac:NaN,fracTh:NaN};n.shared.set(`ar-meas-${e}`,l);let z=0;const r=new _,T=new _,j=new _,C=new _,G=(P,k)=>{B(t,P,k,f,a,r,T);const w=I(r,T,j.set(0,0,0),L);if(w<0)return NaN;const M=r.addScaledVector(T,w).divideScalar(L);return Math.acos(Math.max(-1,Math.min(1,M.y)))},ot=(P,k)=>{let w=0,M=0;for(let h=0;h<f;h++){B(t,h,P,f,a,r,T);const A=I(r,T,j.set(0,0,0),L);if(A<0)continue;const N=r.clone().addScaledVector(T,A),s=N.clone().divideScalar(L);if(Math.acos(Math.max(-1,Math.min(1,s.y)))>bt(R,Math.atan2(s.x,s.z)))continue;w++;const S=C.clone().sub(N).normalize();at(e,s,S,p.value,k)>.5&&M++}return w?M/w:NaN},st=P=>{if(!d)return;c.uMeas.value=1,t.layers.set(3),u.setRenderTarget(d),u.setClearColor(0,0),u.clear(),u.render(i,t),t.layers.set(0),c.uMeas.value=0;const k=f>>1;u.readRenderTargetPixels(d,k,0,1,a,y);let w=0;for(let s=0;s<a;s++)y[s*4+1]>127&&(w=Math.max(w,y[s*4]));let M=NaN,h=-1,A=-1;if(e==="ring"){for(let s=0;s<a;s++)y[s*4+1]>127&&y[s*4]>127&&(h<0&&(h=s),A=s);h>=0&&(M=(h+A)/2)}else if(w>8){let s=0,g=0;for(let S=0;S<a;S++){const H=y[S*4];y[S*4+1]>127&&H>=w*.9&&(s+=H,g+=H*S)}M=g/s}l.th=Number.isFinite(M)?G(k,M):NaN,l.w=e==="ring"&&h>=0?Math.abs(G(k,h-.5)-G(k,A+.5)):NaN;const N=Number.isFinite(M)?Math.round(M):-1;if(N>=0&&N<a){u.readRenderTargetPixels(d,0,N,f,1,F);let s=0,g=0;for(let S=0;S<f;S++)F[S*4+1]<128||(s++,F[S*4]>127&&g++);l.frac=s?g/s:NaN,l.fracTh=ot(N,P)}else l.frac=NaN,l.fracTh=NaN;u.setRenderTarget(null)};let O=et(n);return{resize(P,k,w){const M=Math.min(w,1.5);f=Math.max(1,Math.floor(P*M)),a=Math.max(1,Math.floor(k*M)),d==null||d.dispose(),d=new ct(f,a),y=new Uint8Array(a*4),F=new Uint8Array(f*4)},update(P,k,w){const M=gt(n,w),h=et(n);Tt(M.el,n.params.num("az",25),p.value),c.uBeta.value=h.beta,c.uHW.value=h.hw,c.uShin.value=e==="kk"?h.shin*1.5:h.shin,t.updateMatrixWorld(),C.setFromMatrixPosition(t.matrixWorld);const A=e==="kk"?{...h,shin:h.shin*1.5}:h;let N=Q(e,C,p.value,A);if(Number.isFinite(N.th)){j.set(0,Math.cos(N.th),Math.sin(N.th)).multiplyScalar(L).project(t);const H=(j.y+1)/2*a-.5;B(t,f>>1,H,f,a,r,T);const q=I(r,T,j.set(0,0,0),L);q>0&&(r.addScaledVector(T,q),N=Q(e,C,p.value,A,Math.atan2(r.x,r.z)))}l.thTh=N.th,l.wTh=N.width,O=A,n.shared.set("ar-light",{el:M.el,L:p.value.clone(),cam:C.clone(),sh:h});const s=H=>Number.isFinite(H)?`${(H/x).toFixed(1)}°`:"--",g=H=>Number.isFinite(H)?`${(H*100).toFixed(0)}%`:"--",S=e==="blinn"?[`Blinn (n·H)^${h.shin.toFixed(0)} · 빛 고도 ${M.el.toFixed(0)}°`,`하이라이트 θ 측정 ${s(l.th)} / 이론 ${s(l.thTh)}`,`가로 폭 측정 ${g(l.frac)} / 이론 ${g(l.fracTh)}`]:e==="kk"?[`T′ = T(θ−β), β = ${wt(h.beta/x)}°`,`띠 θ 측정 ${s(l.th)} / 이론 ${s(l.thTh)}`,`가로 폭 측정 ${g(l.frac)} / 이론 ${g(l.fracTh)}`]:["θc = β + atan2(H·ê_ψ, H_y)",`링 중심 θ 측정 ${s(l.th)} / 이론 ${s(l.thTh)}`,`링 두께 측정 ${s(l.w)} / 이론 ${s(l.wTh)} (w ${(2*h.hw/x).toFixed(1)}°)`,`가로 폭 측정 ${g(l.frac)} / 이론 ${g(l.fracTh)}`];n.hud(S.join(`
`))},render(){z++%6===0&&st(O),u.setRenderTarget(null),u.render(i,t)},dispose(){d==null||d.dispose()}}})}function kt(e){const i={blinn:new Float32Array(160),kk:new Float32Array(160),ring:new Float32Array(160)};return ut(e,()=>({draw(t,u,p){pt(t,u,p);const c=e.shared.get("ar-light");if(!c)return;const o={x:36,y:24,w:X(u-52,20),h:X(p-54,20)},m=0,b=R.tips/x,v=a=>o.x+(a-m)/(b-m)*o.w,d=a=>o.y+o.h-Math.min(1,Math.max(0,a))*o.h;t.strokeStyle="#1c2230",t.strokeRect(o.x+.5,o.y+.5,o.w,o.h);const f=[{m:"blinn",col:"#9aa3b2",label:"Blinn"},{m:"kk",col:"#5b9cff",label:"Kajiya-Kay"},{m:"ring",col:"#ff9a3c",label:"양식화 링"}];for(const{m:a,col:y}of f){const F=i[a],l=a==="kk"?{...c.sh,shin:c.sh.shin*1.5}:c.sh;for(let r=0;r<160;r++)F[r]=nt(a,(m+(b-m)*r/159)*x,c.cam,c.L,l);t.strokeStyle=y,t.lineWidth=a==="ring"?2:1.5,t.beginPath();for(let r=0;r<160;r++){const T=v(m+(b-m)*r/159);r?t.lineTo(T,d(F[r])):t.moveTo(T,d(F[r]))}t.stroke(),t.lineWidth=1;const z=e.shared.get(`ar-meas-${a}`);z&&Number.isFinite(z.th)&&(t.fillStyle=y,t.beginPath(),t.moveTo(v(z.th/x),o.y+o.h+1),t.lineTo(v(z.th/x)-4,o.y+o.h+8),t.lineTo(v(z.th/x)+4,o.y+o.h+8),t.fill())}for(const a of[0,30,60])Y(t,`${a}°`,v(a),o.y+o.h+18,"#7d8799",9,"center");Y(t,`정면 세로줄 위 spec(θ) · 빛 고도 ${c.el.toFixed(0)}° (▲ = GPU 측정 중심)`,o.x,14,"#c8d0dc",10),mt(t,f.map(a=>({label:a.label,color:a.col})),o.x+o.w*.35,p-4,9),e.hud("")}}))}const _t={layout:"compare",intro:"애니메이션 캐릭터의 머리카락에는 정수리를 따라 한 바퀴 도는 <b>띠 모양 반사광</b>(일명 <b>천사 링</b>)이 그려집니다. 실제 머리카락은 가는 원기둥 다발이라 빛을 <b>가닥과 직각 방향</b>으로 길게 반사하기 때문입니다. 같은 머리를 <b>Blinn 반사</b>(둥근 점) / <b>Kajiya-Kay 가닥 반사</b>(접선 기반 띠) / <b>양식화 링</b>(같은 수학으로 위치만 구한 단색 띠)으로 비교하고, 띠의 위치를 half 벡터 수식과 맞춰 봅니다.",how:["가닥 방향 접선 T를 정수리에서 아래로 흐르는 경선 방향으로 잡는다: <code>T(θ,ψ) = (cosθ sinψ, −sinθ, cosθ cosψ)</code>.",'Kajiya-Kay: 반사 세기 <code>(√(1 − (T·H)²))^s</code> – T가 H와 직각인 곳 전체가 밝아 경선마다 한 점씩, 머리를 한 바퀴 도는 띠가 된다. 접선을 법선 쪽으로 기울이면(<code>T′ = T + tanβ·n = T(θ−β)</code>) 띠가 위아래로 이동한다 – "시프트 텍스처".',"띠 중심의 닫힌 식: <code>T′·H = 0 ⇔ θ = β + atan2(Hₓ sinψ + H_z cosψ, H_y)</code>. 양식화 링은 이 θc 주변 ±w/2를 단색으로 칠하고, 가닥마다 폭·시프트를 흔들어 톱니 모양 끝을 만든다.","측정: 머리카락만 spec 값으로 그려 화면 중앙 세로줄(ψ ≈ 0)을 GPU에서 읽어 피크(링은 띠 중심) 행을 찾고, 광선-구 교차로 θ로 바꾼다. 띠가 지나는 행도 읽어 머리 폭 대비 밝은 비율을 잰다. 이론은 같은 식을 CPU로 계산한 값."],pros:['띠 하나로 "윤기 나는 머리카락"과 머리의 둥근 볼륨이 동시에 읽힌다 – 애니메이션 원화의 약속을 그대로 재현.',"KK는 접선 하나만 있으면 되어 싸고, 시프트·지터로 가닥 결을 흉내 낼 수 있다.","양식화 링은 위치는 물리 수식, 모양은 아트 디렉션(폭·색·톱니)으로 분리되어 조절이 쉽다."],cons:["접선 방향이 메시(머리카락 카드·UV)의 흐름에 의존해, 모델링 단계에서 흐름을 정리하지 않으면 띠가 끊기거나 뒤틀린다.","Blinn처럼 빛을 따라 움직이므로 컷신에서 띠가 이마로 내려오면 어색하다 – 위치를 고정하거나 범위를 제한하는 경우가 많다.","양식화 링을 텍스처로 직접 그리는 방식은 빛 방향과 무관해 밤 장면에서도 빛나는 등 조명과 어긋날 수 있다."],usedIn:"〈원신〉을 비롯한 애니풍 3D 게임 전반에서 머리카락 띠 하이라이트가 쓰이고, 방식(텍스처로 그린 링, 시프트된 접선 반사, 뷰 공간 매트캡 등)은 게임·셰이더마다 다릅니다. Kajiya-Kay 모델(1989)과 시프트 접선(2004년 무렵 GDC 머리카락 셰이딩 발표로 널리 퍼짐)은 실사 렌더링의 머리카락 셰이딩에서 출발했습니다.",tips:["실사풍 KK는 로브를 두 개 쓴다: 빛 색 그대로인 주 반사와, 반대쪽으로 더 시프트하고 머리색으로 물들인 넓은 보조 반사. 두 β는 보통 0.1~0.3rad 정도 벌린다.","시프트 텍스처(가닥 방향으로 늘인 노이즈)로 텍셀마다 β를 흔들면 띠 끝이 가닥 결을 따라 톱니처럼 끊겨 훨씬 머리카락답다.","KK 띠는 같은 지수에서도 Blinn보다 훨씬 넓다. 광택 지수를 Blinn보다 높게(이 페이지는 1.5배) 잡아야 비슷한 날카로움이 된다.","컷신·UI 초상화처럼 링이 늘 같은 자리에 있어야 하면 실제 빛 대신 카메라에 붙은 가상 빛으로 H를 만들어 위치를 고정한다."],related:["cel-shading","face-sdf-shadow","rim-light","pbr-material","iridescence"],controls:[{type:"toggle",key:"auto",label:"빛 고도 자동으로 움직이기",value:!0},{type:"range",key:"elev",label:"빛 고도 (°, 자동 끔일 때)",min:10,max:80,step:1,value:50},{type:"range",key:"az",label:"빛 방위각 (°)",min:-60,max:60,step:1,value:25},{type:"range",key:"beta",label:"접선 시프트 β (°)",min:-30,max:15,step:1,value:-14},{type:"range",key:"ringW",label:"링 두께 w (°)",min:2,max:16,step:.5,value:7},{type:"range",key:"shin",label:"광택 지수 s",min:10,max:200,step:5,value:60}],viewers:[{title:"Blinn 반사 (n·H)",kind:"before",caption:'플라스틱 공처럼 이마 쪽에 둥근 점 하나가 생깁니다. 가로로 차지하는 폭이 좁아 "머리카락"으로 읽히지 않습니다.',mount:E("blinn")},{title:"Kajiya-Kay 가닥 반사",kind:"variant",caption:"가닥 접선과 H가 직각인 곳이 밝아 머리를 가로지르는 띠가 생깁니다. 띠 중심이 θ = β + atan2(H·ê_ψ, H_y)와 일치합니다.",mount:E("kk")},{title:"양식화 천사 링",kind:"after",caption:"같은 수식으로 위치만 구하고, 단색 띠 + 밝은 심 + 톱니 끝으로 칠했습니다. 측정 두께는 이론과 맞고, 설정 w보다 살짝 얇습니다(세로줄을 따라 H가 변해 θc도 조금 움직이기 때문).",mount:E("ring")},{title:"정면 세로줄 반사 프로파일",kind:"info",caption:"가로축은 정수리에서 잰 각 θ. Blinn은 뾰족한 봉우리, KK는 넓은 띠, 링은 계단 모양입니다. 아래 ▲가 GPU에서 측정한 중심.",mount:kt}]};export{_t as default};
