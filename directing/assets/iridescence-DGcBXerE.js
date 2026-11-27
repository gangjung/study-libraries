import{V as z,q as ft,M as N,c as at,S as J,B as vt,y as ht,g as Q,H as bt,u as wt,aa as Mt,a as X,z as xt,D as yt,al as gt,ag as kt,at as St,C as Rt}from"./three.module-CEzfHhrp.js";import{m as Nt}from"./three-viewer-fx7lDL-0.js";import{m as Ft}from"./canvas-viewer-QtaWfmlz.js";import{c as Bt,t as nt,l as Gt}from"./chart2d-DfgeckAJ.js";import{e as st,p as $t,r as _t}from"./anime-kit-C6AkWSFn.js";import{N as Ct,a as Tt,b as zt}from"./extra-kit-c-FPjCbN4U.js";import{E as dt,P as Dt,u as Lt,o as Pt,r as Wt,s as Et,a as rt,d as it}from"./shader-kit-a-CYybgKL4.js";const Y=.75,j=new z(0,.95,0),A=[650,532,450],q=3,At=`
float airy1(float c1, float n2, float n3, float d, float lam) {
  float s1 = 1.0 - c1 * c1;
  float c2 = sqrt(max(0.0, 1.0 - s1 / (n2 * n2)));
  float c3 = sqrt(max(0.0, 1.0 - s1 / (n3 * n3)));
  float as = (c1 - n2 * c2) / (c1 + n2 * c2);
  float ap = (n2 * c1 - c2) / (n2 * c1 + c2);
  float bs = (n2 * c2 - n3 * c3) / (n2 * c2 + n3 * c3);
  float bp = (n3 * c2 - n2 * c3) / (n3 * c2 + n2 * c3);
  float cd = cos(12.566370614 * n2 * d * c2 / lam);
  float Rs = (as * as + bs * bs + 2.0 * as * bs * cd) / (1.0 + as * as * bs * bs + 2.0 * as * bs * cd);
  float Rp = (ap * ap + bp * bp + 2.0 * ap * bp * cd) / (1.0 + ap * ap * bp * bp + 2.0 * ap * bp * cd);
  return 0.5 * (Rs + Rp);
}
vec3 filmRGB(float c1, float n2, float n3, float d) {
  return vec3(airy1(c1, n2, n3, d, ${A[0]}.0), airy1(c1, n2, n3, d, ${A[1]}.0), airy1(c1, n2, n3, d, ${A[2]}.0));
}`,ct=`
varying vec3 vWp;
varying vec3 vN;
varying vec3 vOn;
void main() {
  vOn = normal;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,lt=`
uniform float uMode, uN2, uN3, uD, uSwirl, uTime, uBubble, uOut, uVar;
uniform vec3 uBase;
uniform vec3 uL;
varying vec3 vWp;
varying vec3 vN;
varying vec3 vOn;
${Ct}
${dt}
${At}
float thick(vec3 on) {
  if (uBubble > 0.5) {
    float d = uD * (1.0 + 0.45 * (-on.y));
    d += uSwirl * uD * 0.5 * (xk_fbm(on * 2.2 + vec3(0.0, 0.12 * uTime, 0.0)) - 0.5);
    return d;
  }
  return uD * (1.0 + uVar * (xk_fbm(on * 3.0) - 0.5));
}
vec3 hue(float x) { return 0.5 + 0.5 * cos(6.2831853 * (x + vec3(0.0, 0.33, 0.67))); }
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(cameraPosition - vWp);
  bool back = !gl_FrontFacing;
  if (back) n = -n;
  float c1 = clamp(dot(n, v), 1e-3, 1.0);
  vec3 on = normalize(vOn);
  if (uOut > 0.5) {
    vec3 Rf = filmRGB(c1, uN2, uN3, thick(on));
    gl_FragColor = vec4(clamp(Rf * ${q}.0, 0.0, 1.0), 1.0);
    return;
  }
  vec3 R = reflect(-v, n);
  vec3 env = skEnv(R, vec3(3.2));
  vec3 h = normalize(uL + v);
  float spec = pow(max(dot(n, h), 0.0), 180.0) * 18.0;
  float diff = max(dot(n, uL), 0.0);
  float fs = 0.04 + 0.96 * pow(1.0 - c1, 5.0);
  vec3 F;
  if (uMode < 0.5) F = vec3(fs);
  else if (uMode < 1.5) F = hue(1.4 * (1.0 - c1) + 0.15) * (0.25 + 0.75 * fs) * 1.2;
  else F = filmRGB(c1, uN2, uN3, thick(on));
  vec3 col;
  if (uBubble > 0.5) {
    col = F * (env + spec) * 2.4;
    if (back) col *= 0.5;
  } else {
    col = uBase * (diff * 0.9 + 0.12) * (1.0 - F) + F * (env + spec);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Vt=`
varying vec3 vWp;
${dt}
void main() {
  vec3 d = normalize(vWp - vec3(0.0, 1.0, 0.0));
  vec3 c = skEnv(d, vec3(3.2)) * 0.4;
  gl_FragColor = vec4(c, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Ot=`
varying vec3 vWp;
void main() { vec4 wp = modelMatrix * vec4(position, 1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`;function ut(s,o,a,f,e){const h=1-s*s,c=Math.sqrt(Math.max(0,1-h/(o*o))),n=Math.sqrt(Math.max(0,1-h/(a*a))),g=(s-o*c)/(s+o*c),v=(o*s-c)/(o*s+c),m=(o*c-a*n)/(o*c+a*n),l=(a*c-o*n)/(a*c+o*n),d=Math.cos(4*Math.PI*o*f*c/e),t=(g*g+m*m+2*g*m*d)/(1+g*g*m*m+2*g*m*d),b=(v*v+l*l+2*v*l*d)/(1+v*v*l*l+2*v*l*d);return .5*(t+b)}function It(s,o,a,f,e,h){let c=f*(1+.45*-o);return c+=e*f*.5*(zt(s*2.2,o*2.2+.12*h,a*2.2)-.5),c}const x={o:new z,d:new z,p:new z};function Z(s){return o=>Nt(o,{antialias:!0,orbit:!1,fov:36,cam:[0,1.6,6.5],target:[j.x,j.y,j.z],far:80},({scene:a,camera:f,renderer:e})=>{e.toneMapping=ft,e.toneMappingExposure=1,a.background=null;const h=new N(new at(30,32,16),new J({vertexShader:Ot,fragmentShader:Vt,side:vt,depthWrite:!1}));a.add(h);const c=new N(new ht(8,64),new Q({color:1053208,roughness:.35,metalness:.2}));c.rotation.x=-Math.PI/2,a.add(c),a.add(new bt(8425664,1052688,.6));const n=new wt(16777215,1.5);n.position.set(3,4,3),a.add(n);const g={value:new z(.6,.55,.6).normalize()},v={uMode:{value:s==="plain"?0:s==="fake"?1:2},uTime:{value:0},uSwirl:{value:1},uOut:{value:0},uL:g},m=r=>new J({vertexShader:ct,fragmentShader:lt,uniforms:{...v,uN2:{value:r.n2},uN3:{value:r.n3},uD:{value:r.d},uVar:{value:r.vary??.3},uBubble:{value:r.bubble?1:0},uBase:{value:new Rt(r.base)}},transparent:!!r.bubble,blending:r.bubble?kt:St,depthWrite:!r.bubble,side:r.bubble?yt:gt}),l=m({n2:1.33,n3:1,d:380,base:0,bubble:!0}),d=new N(new at(Y,72,48),l);d.renderOrder=3,a.add(d);const t=new J({vertexShader:ct,fragmentShader:lt,uniforms:{...l.uniforms,uOut:{value:1}}}),b=new Mt;b.position.set(.15,.32,-.6),a.add(b);const D=m({n2:1.56,n3:1,d:410,base:727568,vary:.4}),H=new N(st(.42,.3,.62),D);b.add(H);const V=m({n2:1.56,n3:1,d:330,base:658706,vary:.2}),i=new N(st(.22,.16,.2),V);i.position.set(0,-.02,.66),b.add(i);const w=new Q({color:1382172,roughness:.4,metalness:.5});for(const r of[-1,1])for(let p=0;p<3;p++){const M=new N(new X(.02,.025,.45,6),w);M.position.set(r*.45,-.17,-.3+p*.32),M.rotation.z=r*1,b.add(M)}for(const r of[-1,1]){const p=new N(new X(.01,.012,.42,6),w);p.position.set(r*.12,.08,.95),p.rotation.set(1,0,-r*.5),b.add(p)}const y=new N(new X(.75,.85,.04,48),new Q({color:2237742,roughness:.5}));y.position.set(.15,.02,-.6),a.add(y);const u=m({n2:1.5,n3:2.2,d:560,base:3806800,vary:.6}),L=new N(new xt(.42,.15,160,24),u);L.position.set(1.75,.95,.1),a.add(L);const F=new Dt(1,1);let _=1,P=1,mt=0;const O=new z,k=o.shared.get(`irid-${s}`)??{pts:[],rms:NaN,d0:380,n2:1.33,probe:{th:NaN,me:[0,0,0],tv:[0,0,0],d:NaN}};o.shared.set(`irid-${s}`,k);const pt=()=>{Wt(e,a,f,F.rt,[d],t);const r=O.clone().project(f),p=Math.floor((r.y+1)/2*P);if(p<0||p>=P)return;const M=F.readRow(e,p),S=l.uniforms.uN2.value,U=l.uniforms.uD.value,B=v.uSwirl.value,G=v.uTime.value;k.pts.length=0;let C=0,$=0,tt=99;for(let R=0;R<_;R++){$t(f,R,p,_,P,x.o,x.d);const et=_t(x.o,x.d,O,Y);if(et<0)continue;x.p.copy(x.o).addScaledVector(x.d,et).sub(O).divideScalar(Y);const K=-x.p.dot(x.d);if(K<.12)continue;const ot=It(x.p.x,x.p.y,x.p.z,U,B,G),W=A.map(T=>ut(K,S,1,ot,T)),E=[M[R*4]/255/q,M[R*4+1]/255/q,M[R*4+2]/255/q];if(Math.max(M[R*4],M[R*4+1],M[R*4+2])>=254)continue;const I=Math.acos(Math.min(1,K))*180/Math.PI;k.pts.push(I,E[0],E[1],E[2],W[0],W[1],W[2]);for(let T=0;T<3;T++)C+=(E[T]-W[T])**2;$+=3,Math.abs(I-45)<tt&&(tt=Math.abs(I-45),k.probe={th:I,me:E,tv:W,d:ot})}k.rms=$?Math.sqrt(C/$):NaN,k.d0=U,k.n2=S};return{resize(r,p){_=Math.max(1,Math.floor(r)),P=Math.max(1,Math.floor(p)),F.resize(_,P)},update(r,p,M){const S=o.params,B=Lt(o,"iridClock",M).t;Pt(f,j,S.bool("orbit",!0)?.55*Math.sin(B*.12):0,.18,6.4),v.uTime.value=B,v.uSwirl.value=S.bool("swirl",!0)?1:0,l.uniforms.uD.value=S.num("d",380),l.uniforms.uN2.value=S.num("n2",1.33),d.position.set(-1.65,1.25+.08*Math.sin(B*.9),.2),L.rotation.set(B*.15,B*.22,0),b.rotation.y=.6+.4*Math.sin(B*.3),a.updateMatrixWorld(),O.copy(d.position);const G=k.probe,C=[s==="plain"?"흰 반사 (슐릭 프레넬만)":s==="fake"?"프레넬 → 무지개 색상표 (가짜)":`박막 Airy · n₂ ${Tt(S.num("n2",1.33))} · d₀ ${Math.round(S.num("d",380))} nm`];s==="film"&&Number.isFinite(G.th)&&(C.push(`θ ${G.th.toFixed(0)}° d ${Math.round(G.d)}nm 측정 RGB ${G.me.map($=>$.toFixed(3)).join(" ")}`),C.push(`이론 RGB ${G.tv.map($=>$.toFixed(3)).join(" ")} · RMS ${k.rms.toFixed(4)}`)),o.hud(C.join(`
`))},render(){e.setRenderTarget(null),e.render(a,f),s==="film"&&mt++%8===0&&pt()},dispose(){F.dispose(),t.dispose()}}})}function jt(s){const o=document.createElement("canvas");let a="";const f=e=>{const h=Math.max(0,Math.min(1,e));return Math.round(255*(h<=.0031308?12.92*h:1.055*Math.pow(h,1/2.4)-.055))};return Ft(s,()=>({draw(e,h,c){Bt(e,h,c);const n=s.shared.get("irid-film");if(!n)return;const[g,v]=Et(h,c);let m=.05;for(let i=0;i<n.pts.length;i+=7)for(let w=4;w<7;w++)m=Math.max(m,n.pts[i+w]);const l={...g,x0:0,x1:90,y0:0,y1:Math.min(.34,Math.ceil(m*1.15*50)/50)};rt(e,l,`반사율 vs θ · RMS ${Number.isFinite(n.rms)?n.rms.toFixed(4):"--"}`,"θ (°)",[0,45,90],[0,+(l.y1/2).toFixed(3),l.y1],i=>i.toFixed(2));const d=["#ff5a5a","#4ade80","#5b9cff"];for(let i=0;i<3;i++){const w=[],y=[];for(let u=0;u<n.pts.length;u+=7)w.push(n.pts[u],n.pts[u+4+i]),y.push(n.pts[u],n.pts[u+1+i]);it(e,l,w,d[i]+"55",3.2),it(e,l,y,d[i],1.3)}const t={...v,x0:0,x1:1e3,y0:0,y1:1},b=`${Math.round(t.w)}|${n.n2.toFixed(3)}`;if(b!==a){a=b;const i=Math.max(1,Math.round(t.w));o.width=i,o.height=1;const w=o.getContext("2d"),y=w.createImageData(i,1);for(let u=0;u<i;u++){const L=u/(i-1)*1e3,F=A.map(_=>ut(1,n.n2,1,L,_)*6);y.data[u*4]=f(F[0]),y.data[u*4+1]=f(F[1]),y.data[u*4+2]=f(F[2]),y.data[u*4+3]=255}w.putImageData(y,0,0)}e.imageSmoothingEnabled=!1,e.drawImage(o,t.x,t.y+t.h*.25,t.w,t.h*.5),rt(e,t,"두께별 색 (θ=0 ×6)","d (nm)",[0,500,1e3],[]);const D=t.x+n.d0/1e3*t.w,H=t.x+n.d0*1.45/1e3*t.w,V=t.x+n.d0*.55/1e3*t.w;e.fillStyle="#ffffff22",e.fillRect(V,t.y+t.h*.2,Math.max(1,H-V),t.h*.6),e.strokeStyle="#fff",e.beginPath(),e.moveTo(D,t.y+t.h*.15),e.lineTo(D,t.y+t.h*.85),e.stroke(),nt(e,`d₀ ${Math.round(n.d0)}`,D,t.y+t.h*.12,"#e6e9ef",9,"center"),nt(e,"꼭대기 0.55d₀ ~ 바닥 1.45d₀",t.x+t.w/2,t.y+t.h*.95,"#7d8799",9,"center"),Gt(e,[{label:"이론 (큰 점)",color:"#c8d0dc"},{label:"측정 (작은 점)",color:"#e6e9ef"},{label:"R 650",color:d[0]},{label:"G 532",color:d[1]},{label:"B 450nm",color:d[2]}],8,c-4,9),s.hud("")}}))}const Yt={layout:"compare",intro:"비눗방울, 딱정벌레 껍질, 펄 도장이 보는 각도마다 색이 바뀌는 건 색소가 아니라 <b>얇은 막에서 반사된 두 빛의 간섭</b> 때문입니다. 막 윗면과 아랫면에서 반사된 빛의 경로 차가 파장에 따라 보강·상쇄되어 특정 색만 남습니다. 같은 세 물체를 흰 반사 / 프레넬로 고른 가짜 무지개 / 물리 박막 간섭으로 비교합니다.",how:["빛이 막(굴절률 n₂, 두께 d)에 들어가면 꺾여 <code>cosθ₂ = √(1 − sin²θ₁/n₂²)</code>. 윗면·아랫면 반사의 위상차는 <code>δ = 4π n₂ d cosθ₂ / λ</code>.","두 경계의 프레넬 진폭 계수 r₁₂, r₂₃(s·p 편광)로 다중 반사를 모두 더한 Airy 식: <code>R = (r₁₂² + r₂₃² + 2r₁₂r₂₃cosδ) / (1 + r₁₂²r₂₃² + 2r₁₂r₂₃cosδ)</code>. RGB는 650·532·450 nm 세 파장에서 따로 계산한다.","각도가 커지면 cosθ₂가 작아져 δ가 줄어든다 → 같은 두께라도 가장자리로 갈수록 색이 짧은 파장 쪽으로 이동. 비눗방울은 중력으로 막이 아래로 흘러 위는 얇고 아래는 두껍다 – 두께에 따라 색이 바뀌므로 색 띠가 위아래로 층을 이룬다.","가짜 방식은 1 − N·V를 색상표에 그대로 넣는다: 싸지만 두께·굴절률 개념이 없어 모든 물체가 같은 무지개 테두리가 된다.",'측정: 비눗방울만 "반사율 × 3"으로 다시 그려 중심 행을 읽고, 같은 픽셀에서 CPU 광선-구 교차로 θ와 두께 d(셰이더와 같은 노이즈 식의 CPU 복제)를 구해 Airy 식과 비교한다.'],pros:["각도·두께·굴절률이 바뀌면 색이 물리적으로 맞게 이동해, 같은 셰이더로 비눗방울·벌레·도장을 모두 표현한다.","두께 맵 하나(노이즈·흐름)만 바꿔도 소용돌이·흘러내림 같은 생생한 변화.","수식이 닫힌 형태라 실시간에 충분히 싸다(파장 3개 × cos 몇 번)."],cons:["파장 3개만 쓰면 두꺼운 막(> 1 µm)에서 색이 지나치게 선명해진다. 실제 백색광은 스펙트럼 적분으로 색이 흐려진다.","반사율이 작아(비눗방울 수 %) 밝은 환경이 없으면 거의 안 보인다 – 환경 반사 품질이 중요.","실제 딱정벌레·나비는 다층막·구조색이라 단일 막 모델은 근사다."],usedIn:"언리얼 엔진·유니티 HDRP의 박막(thin film) 이리데선스 옵션, 레이싱 게임의 펄·카멜레온 도장, 판타지 게임의 비눗방울·곤충 갑각 표현에 박막 간섭 모델이 쓰입니다. 구현 세부(파장 수, 스펙트럼 적분)는 엔진마다 다릅니다.",tips:["굴절률은 비누막 ≈ 1.33(물), 딱정벌레 껍질의 키틴 ≈ 1.56 정도에서 시작한다. 두께는 수백 nm(100~1000nm)일 때 색이 가장 뚜렷하다.","공기/막/공기(비눗방울)는 두 경계의 반사 부호가 반대라 두께가 0에 가까우면 반사가 상쇄돼 막이 검게 보인다. 터지기 직전 꼭대기가 검어지는 연출에 쓸 수 있다.","두께가 1µm를 넘으면 실제로는 색이 섞여 흐려진다. 파장 3개 근사를 쓸 때는 두께가 클수록 채도를 줄이거나 파장 표본을 늘린다.","반사율이 몇 %뿐이라 밝은 HDR 환경 반사가 없으면 효과가 안 보인다. 어두운 장면에서는 환경맵이나 하이라이트를 일부러 둔다."],related:["pbr-material","rim-light","hologram","wet-surface"],controls:[{type:"range",key:"d",label:"비눗방울 기준 두께 d₀ (nm)",min:100,max:900,step:5,value:380},{type:"range",key:"n2",label:"막 굴절률 n₂ (비눗방울)",min:1.2,max:1.8,step:.01,value:1.33},{type:"toggle",key:"swirl",label:"두께 소용돌이",value:!0},{type:"toggle",key:"orbit",label:"카메라 좌우 이동",value:!0}],viewers:[{title:"흰 반사 (프레넬만)",kind:"before",caption:"슐릭 프레넬로 환경을 흰색으로 반사합니다. 비눗방울은 유리구슬, 딱정벌레와 도장은 그냥 검은 플라스틱처럼 보입니다.",mount:Z("plain")},{title:"프레넬 → 무지개 (가짜)",kind:"variant",caption:"1 − N·V로 색상표를 골랐습니다. 화려하지만 세 물체가 똑같은 무지개 테두리라 재질 차이가 없고, 두께 흐름도 없습니다.",mount:Z("fake")},{title:"물리 박막 간섭",kind:"after",caption:"두께·굴절률·각도로 계산한 간섭색입니다. 비눗방울은 위가 얇고 아래가 두꺼워 색 띠가 층을 이루며 소용돌이치고, 딱정벌레는 초록-보라, 도장은 각도에 따라 색이 넘어갑니다.",mount:Z("film")},{title:"반사율 측정 · 두께 색 띠",kind:"info",caption:"왼쪽: 비눗방울 중심 행 각 픽셀의 GPU 반사율(작은 점)과 같은 θ·d의 CPU Airy 값(큰 점). 오른쪽: 수직 입사에서 두께별 간섭색(×6 확대)과 현재 비눗방울의 두께 범위.",mount:jt}]};export{Yt as default};
