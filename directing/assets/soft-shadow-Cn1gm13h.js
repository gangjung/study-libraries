import{W as U,a7 as O,J as lt,j as dt,S as at,V as x,C as E,P as Z,h as G,a as ut,c as ft,M as J,G as vt,D as mt}from"./three.module-CEzfHhrp.js";import{m as pt}from"./three-viewer-fx7lDL-0.js";import{m as ht,b as K}from"./canvas-viewer-QtaWfmlz.js";import{c as wt,t as xt,l as Pt}from"./chart2d-DfgeckAJ.js";import{P as Ct,a as W}from"./extra-kit-c-FPjCbN4U.js";import{A as Lt,P as bt,p as St,a as gt,b as q,d as Ft}from"./gfx-kit-d-CaswdL74.js";const M=-2.2,u=6,A=0,I=.9,H=10,Q=3,tt=1024,P=256,z=1.3,st=-.1,y=[{h:.4,z:-2.4},{h:1.4,z:0},{h:2.6,z:2.4}],S=7,yt=2,nt=`
uniform sampler2D tShadow;
uniform mat4 uLightVP;
uniform float uL, uMode, uPcfR, uBias;
float smD(vec2 uv) { vec4 p = texture2D(tShadow, uv); return dot(p.rgb, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0)) * ${H.toFixed(1)}; }
float shadowAt(vec3 W) {
  vec4 c = uLightVP * vec4(W, 1.0);
  vec2 uv = c.xy / c.w * 0.5 + 0.5;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 1.0;
  float dr = ${u.toFixed(1)} - W.y;
  float Wd = 2.0 * dr * ${I.toFixed(2)};
  if (uMode < 0.5) return smD(uv) < dr - uBias ? 0.0 : 1.0;
  float r;
  if (uMode < 1.5) {
    r = uPcfR / Wd;
  } else {
    float sr = 0.5 * uL * (dr - ${Q.toFixed(1)}) / (dr * 2.0 * ${Q.toFixed(1)} * ${I.toFixed(2)});
    float sum = 0.0, n = 0.0;
    for (int j = 0; j < 6; j++) for (int i = 0; i < 6; i++) {
      vec2 o = ((vec2(float(i), float(j)) + 0.5) / 6.0 * 2.0 - 1.0) * sr;
      float d = smD(uv + o);
      if (d < dr - uBias) { sum += d; n += 1.0; }
    }
    if (n < 0.5) return 1.0;
    float db = sum / n;
    float w = (dr - db) * uL / db;
    r = 0.5 * w / Wd;
  }
  float s = 0.0;
  for (int j = 0; j < ${S}; j++) for (int i = 0; i < ${S}; i++) {
    vec2 o = ((vec2(float(i), float(j)) + 0.5) / float(${S}) * 2.0 - 1.0) * r;
    s += smD(uv + o) < dr - uBias ? 0.0 : 1.0;
  }
  return s / float(${S*S});
}`,Mt=`
varying vec3 vW, vN;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`,At=`
uniform vec3 uColor;
varying vec3 vW, vN;
${nt}
${Lt}
void main() {
  vec3 N = normalize(vN);
  vec3 Lp = vec3(${M.toFixed(2)}, ${u.toFixed(1)}, ${A.toFixed(1)});
  vec3 L = normalize(Lp - vW);
  float sh = shadowAt(vW + N * 0.01);
  float diff = max(dot(N, L), 0.0);
  vec3 amb = uColor * mix(vec3(0.10, 0.09, 0.11), vec3(0.22, 0.26, 0.36), N.y * 0.5 + 0.5);
  vec3 col = amb + uColor * vec3(1.0, 0.93, 0.82) * diff * sh * 1.6;
  gl_FragColor = vec4(acesTone(col * 1.2), 1.0);
  #include <colorspace_fragment>
}`,$t=`
varying float vY;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vY = w.y;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,_t=`
varying float vY;
${bt}
void main() { gl_FragColor = packUnit((${u.toFixed(1)} - vY) / ${H.toFixed(1)}); }`,Nt=`
uniform vec3 uA[3];
uniform vec3 uB[3];
varying vec2 vUv;
${nt}
void main() {
  int row = int(gl_FragCoord.y);
  vec3 W = mix(uA[row], uB[row], (floor(gl_FragCoord.x) + 0.5) / float(${P}));
  float s = shadowAt(W);
  gl_FragColor = vec4(s, s, s, 1.0);
}`,ot=t=>M+(st-M)*u/(u-t),et=t=>A+(t.z-A)*u/(u-t.h),Y=(t,e)=>t*e/(u-e);function Rt(t,e){t.background=new E(856088);const f=i=>new at({vertexShader:Mt,fragmentShader:At,uniforms:{...e,uColor:{value:new E(i)}}}),a=(i,v,h,w,g)=>{const o=new J(i,f(v));return o.position.set(h,w,g),t.add(o),o},s=a(new Z(16,16),12103842,1,0,.5);s.rotation.x=-Math.PI/2;const p=[9414600,13146738,10272906];y.forEach((i,v)=>a(new G(1.5,.08,1.2),p[v],st-.75,i.h-.04,i.z)),a(new ut(.07,.07,3.2,20),14209220,1.5,1.6,-1.4);const n=a(new G(.12,2.6,.12),14731408,.6,1.1,1.3);n.rotation.z=-.5,a(new ft(.35,32,20),13662826,2.6,.35,.9),a(new G(.6,.6,.6),9209528,3,.3,-2.4);const c=new J(new Z(1,1),new vt({color:new E(4,3.7,3.2),side:mt}));return c.rotation.x=Math.PI/2,c.position.set(M,u,A),c.layers.set(yt),t.add(c),c}function V(t){return e=>pt(e,{antialias:!0,orbit:!1,fov:45,cam:[6,6,9],near:.1,far:60},({scene:f,camera:a,renderer:s})=>{a.layers.enableAll();const p=new U(tt,tt,{minFilter:O,magFilter:O,generateMipmaps:!1}),n=new lt(2*Math.atan(I)*180/Math.PI,1,.5,H);n.position.set(M,u,A),n.up.set(0,0,-1),n.lookAt(M,0,A),n.updateMatrixWorld(),n.updateProjectionMatrix();const c=new dt().multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),i={tShadow:{value:p.texture},uLightVP:{value:c},uL:{value:.8},uMode:{value:t==="hard"?0:t==="pcf"?1:2},uPcfR:{value:.2},uBias:{value:.03}},v=Rt(f,i),h=new at({vertexShader:$t,fragmentShader:_t}),w=new U(P,3),g=new Uint8Array(P*3*4),o=new Ct(Nt,{...i,uA:{value:[new x,new x,new x]},uB:{value:[new x,new x,new x]}}),r={w:[NaN,NaN,NaN],px:[NaN,NaN,NaN],prof:y.map(()=>new Float32Array(P)),ok:!1};e.shared.set(`pcss-${t}`,r);let C=!0,D=0,$=1,X=1;const T=new x,j=new x,rt=()=>{f.overrideMaterial=h,n.layers.set(0),s.setRenderTarget(p),s.setClearColor(16777215,1),s.clear(),s.render(f,n),s.setRenderTarget(null),s.setClearColor(0,1),f.overrideMaterial=null,C=!1},ct=()=>{const _=o.u.uA.value,N=o.u.uB.value;y.forEach((m,l)=>{const d=ot(m.h),L=et(m);_[l].set(d-z,0,L),N[l].set(d+z,0,L)}),o.render(s,w),s.readRenderTargetPixels(w,0,0,P,3,g),s.setRenderTarget(null);const B=2*z/P,R=t==="hard"?1:1-1/(S*S);y.forEach((m,l)=>{let d=0;for(let b=0;b<P;b++){const F=g[(l*P+b)*4]/255;r.prof[l][b]=F,d+=F*(1-F)*B}r.w[l]=6*d/R;const L=ot(m.h),k=et(m);T.set(L-.5,0,k).project(a),j.set(L+.5,0,k).project(a),r.px[l]=r.w[l]*Math.hypot((j.x-T.x)*$/2,(j.y-T.y)*X/2)}),r.ok=!0};return{resize(_,N){$=_,X=N},update(_,N,B){const R=St(e,"pcssClock",B),m=e.params,l=Math.sin(R.t*.15);a.position.set(6.2+l*1.6,5.8+Math.sin(R.t*.1)*.4,8.6-l*1.2),a.lookAt(.9,.4,.3),a.updateMatrixWorld();const d=m.num("L",.8);if(i.uL.value=d,i.uPcfR.value=m.num("pcf",.2),v.scale.set(d,d,1),!r.ok){e.hud("측정 준비 중…");return}const L=y.map((b,F)=>{const it=t==="pcss"?Y(d,b.h):t==="pcf"?2*m.num("pcf",.2):0;return`h=${b.h.toFixed(1)}m 폭 측정 ${W(r.w[F])}m (${Math.round(r.px[F])}px) / ${t==="pcss"?"이론":"설정"} ${W(it)}m`}),k=t==="hard"?"탭 1개 · 반그림자 없음 (텍셀 계단만)":t==="pcf"?`고정 PCF 7×7 · 폭 2r = ${W(2*m.num("pcf",.2))}m (높이 무관)`:`PCSS · w = (d_r − d_b)·L/d_b · L ${W(d)}m`;e.hud([k,...L].join(`
`))},render(){C&&rt(),D++%10===0&&ct(),s.setRenderTarget(null),s.render(f,a)},dispose(){p.dispose(),w.dispose(),h.dispose(),o.dispose()}}})}function kt(t){return ht(t,()=>({draw(e,f,a){wt(e,f,a);const s=t.params.num("L",.8),p=t.params.num("pcf",.2),n={x:40,y:26,w:K(f-54,20),h:K(a-58,20)},c=Math.max(.6,Y(s,3)*1.05,2*p*1.2),i=[0,c/4,c/2,3*c/4,c],{X:v,Y:h}=gt(e,n,[0,3],[0,c],[0,.5,1,1.5,2,2.5,3],i,o=>`${o}m`,o=>o.toFixed(2)),w=[];for(let o=0;o<=100;o++){const r=o/100*3;w.push([v(r),h(Y(s,r))])}q(e,w,"#ffffff",1.2,[3,3]),q(e,[[v(0),h(2*p)],[v(3),h(2*p)]],"#5b9cff",1,[2,4]);const g=[["hard","#9aa3b2"],["pcf","#5b9cff"],["pcss","#ff9a3c"]];for(const[o,r]of g){const C=t.shared.get(`pcss-${o}`);C!=null&&C.ok&&y.forEach((D,$)=>Ft(e,v(D.h),h(C.w[$]),r,o==="pcss"?4:3,o==="pcf"))}xt(e,`판 높이 h_b → 반그림자 폭 w (광원 L ${s.toFixed(2)}m, 높이 ${u}m)`,n.x,14,"#c8d0dc",10),Pt(e,[{label:"PCSS 측정",color:"#ff9a3c"},{label:"고정 PCF",color:"#5b9cff"},{label:"하드",color:"#9aa3b2"},{label:"이론 L·h/(LY−h)",color:"#ffffff"}],n.x,a-4,9),t.hud("")}}))}const Gt={layout:"variants",intro:"실제 그림자는 <b>물체에 닿은 곳은 선명하고 멀어질수록 흐려집니다</b>(접촉 경화). 광원이 점이 아니라 면이라서, 가림막과 바닥 사이가 멀수록 광원의 일부만 가려지는 반그림자 띠가 넓어지기 때문입니다. <b>PCSS</b>는 그림자 맵에서 차단물까지의 거리를 찾아 그 폭을 닮은 삼각형으로 계산하고, 그만큼 필터를 키워 이 현상을 재현합니다. 하드 그림자 / 고정 PCF / PCSS를 같은 면광원·장면에서 비교하고 반그림자 폭을 이론과 맞춰 봅니다.",how:["광원에서 아래를 보는 원근 카메라로 그림자 맵(1024²)을 그린다. 각 텍셀에 광원 평면까지의 거리 <code>d = LY − y</code>를 RGBA8 세 채널에 나눠 담는다.","하드: 수신점의 d_r과 맵 값 한 개를 비교 → 계단진 칼 같은 경계. 고정 PCF: 7×7 탭의 평균 → 모든 곳이 같은 폭으로 흐려져 접촉부까지 뭉개진다.","PCSS ① 차단물 탐색: 수신점에서 광원을 향한 원뿔이 덮는 맵 영역(6×6 탭)에서 d_r보다 가까운 텍셀의 평균 거리 d_b를 구한다.","PCSS ② 닮은 삼각형: 광원 폭 L, 차단물–수신점 거리 (d_r − d_b)로 <code>w = (d_r − d_b)·L / d_b</code>. 평행한 모서리와 사각 광원이면 이 값이 물리적인 반그림자 폭과 같다.","PCSS ③ 폭 w에 맞춘 7×7 격자 PCF. 격자 상자 필터라 모서리 그림자가 폭 w의 선형 경사가 된다.","측정: 판 세 개(높이 0.4·1.4·2.6m)의 모서리 그림자를 가로지르는 바닥 선 256점에서 같은 그림자 함수를 계산해 읽고, <code>w = 6∫s(1−s)dx</code>(선형 경사의 성질, 7단 계단 보정 1/(1−1/49))로 폭을 잰다."],pros:["하나의 그림자 맵으로 접촉 경화 + 거리에 따른 흐림을 얻어 그림자가 훨씬 사실적이다.",'광원 크기 L 하나로 "정오의 선명한 그림자"부터 "흐린 날 창가의 부드러운 그림자"까지 조절한다.',"그림자 맵 파이프라인을 그대로 쓰므로 기존 엔진에 넣기 쉽다."],cons:["픽셀마다 탐색 + 큰 PCF라 고정 PCF보다 2~4배 비싸다 – 탭 수를 줄이고 회전 노이즈 + 시간 누적으로 보완한다.","차단물 깊이를 평균 한 개로 보므로 여러 층의 가림막이 겹치면 폭이 틀린다.","반그림자가 그림자 맵 밖이나 넓은 영역을 필요로 하면 탐색 범위가 커져 비용·누수가 늘어난다."],usedIn:"NVIDIA PCSS(Fernando 2005)와 이를 그래픽 옵션으로 넣은 〈파 크라이 4〉 같은 PC 게임, 〈GTA V〉 PC판의 소프트 섀도 옵션(NVIDIA PCSS · AMD CHS), 언리얼 엔진 5 가상 그림자 맵의 접촉 경화 소프트 섀도 등.",tips:["해는 각지름이 약 0.53°라 반그림자 폭 ≈ 0.009 × (차단물–바닥 거리)다. 1m 위 물체는 약 1cm, 10m 위 나뭇가지는 약 9cm로 퍼진다 – 광원 크기를 이 값에서 시작해 맞춘다.","탭 수는 차단물 탐색 16개 안팎, PCF 16~32개를 포아송 원반으로 뿌리고 픽셀마다 회전시킨 뒤 TAA로 노이즈를 지우는 조합이 흔하다.","탐색 반경은 광원 크기와 수신 거리에 비례해 키운다 (이 페이지의 sr 식). 너무 작으면 넓은 반그림자에서 차단물을 못 찾아 그림자 가장자리가 잘린다.","필터가 넓어질수록 자기 그림자 얼룩(섀도 애크니)이 커진다. 기울기 비례 바이어스나 법선 방향 오프셋을 함께 키운다."],related:["ssao","three-point-lighting","gi-bleed","flashlight","light-cookie"],controls:[{type:"range",key:"L",label:"면광원 크기 L (m)",min:.1,max:1.5,step:.05,value:.8},{type:"range",key:"pcf",label:"고정 PCF 반지름 r (m)",min:.02,max:.5,step:.01,value:.2},{type:"toggle",key:"pan",label:"카메라 이동",value:!0}],viewers:[{title:"하드 그림자 (탭 1개)",kind:"before",caption:"광원 크기와 상관없이 모든 그림자가 칼처럼 선명하고 텍셀 계단이 보입니다. 높이 떠 있는 판의 그림자도 접촉한 기둥과 똑같이 날카롭습니다.",mount:V("hard")},{title:"고정 PCF (7×7)",kind:"variant",caption:"모든 그림자를 같은 폭으로 흐렸습니다. 계단은 사라지지만 기둥 발밑의 접촉 그림자까지 뭉개지고, 높이 뜬 판의 그림자는 오히려 너무 선명합니다.",mount:V("pcf")},{title:"PCSS (차단물 탐색 → 가변 PCF)",kind:"after",caption:"낮은 판·기둥 발밑은 선명하고, 높은 판일수록 반그림자가 넓어집니다. 기울어진 막대의 그림자가 바닥에 닿은 끝에서 멀어질수록 퍼지는 것을 보세요. HUD = 판별 측정/이론 폭.",mount:V("pcss")},{title:"반그림자 폭 vs 판 높이",kind:"info",caption:"흰 점선 = 이론 w = L·h/(LY − h). 주황 = PCSS 측정(곡선을 따름), 파란 고리 = 고정 PCF(높이와 무관하게 2r), 회색 = 하드(≈0). 광원 크기 L을 바꾸면 곡선과 점이 함께 움직입니다.",mount:kt}]};export{Gt as default,Y as penumbra};
