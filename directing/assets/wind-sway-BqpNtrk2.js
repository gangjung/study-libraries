import{C as Y,V as st,M as O,P as ht,G as it,aE as rt,S as X,D as vt,c as mt,d as dt,f as $,v as pt,ah as yt,x as wt,aF as xt,F as bt,a as gt,p as Mt}from"./three.module-CEzfHhrp.js";import{m as At}from"./BufferGeometryUtils--Oh5Y0A9.js";import{m as It}from"./three-viewer-fx7lDL-0.js";import{m as Pt,a as Ft,b as H}from"./canvas-viewer-QtaWfmlz.js";import{c as lt}from"./fx-CIZ4XT9q.js";import{c as kt,t as S,l as St}from"./chart2d-DfgeckAJ.js";import{a as N}from"./extra-kit-c-FPjCbN4U.js";import{g as J,F as Tt,u as Ct,f as Wt}from"./env-kit-BSefkVuG.js";const U=16e3,Z=5,c=96,K=40,ft=-.3,Q=Math.cos(ft),V=Math.sin(ft),Nt=240,tt=`
uniform float uT, uA, uC, uL, uMode;
const vec2 W = vec2(${J(Q)}, ${J(V)});
float gust(float s) { float c = 0.5 + 0.5 * cos(6.2831853 * s / uL); c = c * c * c; return c * c; }
float windAlong(vec2 xz) {
  if (uMode < 0.5) return 0.0;
  if (uMode < 1.5) return uA * (0.35 + 0.65 * (0.5 + 0.5 * sin(1.6 * uT)));
  return uA * (0.35 + 0.65 * gust(dot(xz, W) - uC * uT));
}
float flutter(float ph) { return uMode > 1.5 ? uA * 0.12 * sin(5.0 * uT + ph) : 0.0; }
/** 풀잎 로컬 정점(y∈[0,1]) → 월드. 끝 변위 = W·d + 옆·떨림, 높이 비율²으로 휨 */
vec3 bladeWorld(vec3 lp, vec3 off, float h, float rot, float ph) {
  float c = cos(rot), s = sin(rot);
  vec3 p = vec3(lp.x * c, lp.y * h, lp.x * s);
  float y = lp.y;
  float b = y * y;
  float d = windAlong(off.xz);
  float f = flutter(ph);
  vec2 disp = (W * d + vec2(-W.y, W.x) * f) * b;
  float tip = length(W * d + vec2(-W.y, W.x) * f) / max(h, 0.05);
  p.y *= 1.0 - 0.3 * min(1.0, tip * tip) * b; // 길이 보존 근사 (수평 변위에는 영향 없음)
  return off + p + vec3(disp.x, 0.0, disp.y);
}
`,Lt=`
${tt}
attribute vec3 aOff;
attribute vec4 aInfo; // h, rot, phase, tint
varying float vY;
varying float vTint;
varying float vBend;
varying float vFog;
varying vec3 vN;
void main() {
  vec3 wp = bladeWorld(position, aOff, aInfo.x, aInfo.y, aInfo.z);
  vY = position.y;
  vTint = aInfo.w;
  vBend = uA > 0.0 ? windAlong(aOff.xz) / max(uA, 1e-3) : 0.0;
  vN = normalize(vec3(cos(aInfo.y + 1.5708), 0.6, sin(aInfo.y + 1.5708)));
  vec4 mv = viewMatrix * vec4(wp, 1.0);
  vFog = 1.0 - exp(-max(0.0, -mv.z - 8.0) * 0.025);
  gl_Position = projectionMatrix * mv;
}`,zt=`
uniform float uMode;
uniform vec3 uSun, uFog;
varying float vY;
varying float vTint;
varying float vBend;
varying float vFog;
varying vec3 vN;
void main() {
  vec3 base = mix(vec3(0.12, 0.26, 0.08), vec3(0.2, 0.32, 0.1), vTint);
  vec3 tip = mix(vec3(0.55, 0.72, 0.28), vec3(0.75, 0.78, 0.35), vTint);
  vec3 col = mix(base, tip, smoothstep(0.0, 1.0, vY));
  float l = 0.65 + 0.35 * abs(dot(normalize(vN), uSun));
  col *= l;
  // 바람에 눕은 풀 끝이 하늘빛을 받아 밝아짐 → 돌풍이 지나가는 "바람 물결"
  col += vec3(0.32, 0.34, 0.22) * pow(vY, 2.0) * smoothstep(0.4, 1.0, vBend) * step(1.5, uMode);
  col = mix(col, uFog, vFog);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Gt=`
${tt}
attribute vec3 color;
attribute vec2 aTree; // y/H, 잎 여부
varying vec3 vC;
varying vec3 vN;
varying float vFog;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vec2 base = modelMatrix[3].xz;
  float b = aTree.x * aTree.x;
  vec2 d = W * windAlong(base) * 0.3 * b;
  d += aTree.y * vec2(sin(uT * 6.0 + w.x * 2.1), cos(uT * 5.3 + w.z * 1.7)) * 0.04 * uA * step(0.5, uMode);
  w.xz += d;
  vC = color;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 mv = viewMatrix * w;
  vFog = 1.0 - exp(-max(0.0, -mv.z - 8.0) * 0.025);
  gl_Position = projectionMatrix * mv;
}`,Et=`
uniform vec3 uSun, uFog;
varying vec3 vC;
varying vec3 vN;
varying float vFog;
void main() {
  vec3 col = vC * (0.45 + 0.6 * max(dot(normalize(vN), uSun), 0.0));
  gl_FragColor = vec4(mix(col, uFog, vFog), 1.0);
  #include <colorspace_fragment>
}`,$t=`
${tt}
attribute vec3 aOff;
attribute vec4 aInfo;
attribute float aIdx;
uniform float uEnc;
varying float vD;
void main() {
  vec3 tipW = bladeWorld(vec3(0.0, 1.0, 0.0), aOff, aInfo.x, aInfo.y, aInfo.z);
  vec3 rest = aOff + vec3(0.0, aInfo.x, 0.0);
  vD = dot((tipW - rest).xz, W) * uEnc;
  gl_Position = vec4((aIdx + 0.5) / ${J(c)} * 2.0 - 1.0, 0.0, 0.0, 1.0);
  gl_PointSize = 1.0;
}`,_t=`
varying float vD;
void main() { gl_FragColor = vec4(vD, 0.0, 0.0, 1.0); }`,Bt=(a,t)=>Math.pow(.5+.5*Math.cos(2*Math.PI*a/t),6);function Rt(a,t,v,f,e,m,l){return a==="static"?0:a==="sine"?e*(.35+.65*(.5+.5*Math.sin(1.6*f))):e*(.35+.65*Bt(t*Q+v*V-m*f,l))}const ct=a=>-K/2+K*(a+.5)/c;function Dt(){const a=[],t=[];for(let f=0;f<=Z;f++){const e=f/Z,m=.06*(1-e*.85);a.push(-m,e,0,m,e,0)}for(let f=0;f<Z;f++){const e=f*2;t.push(e,e+1,e+2,e+1,e+3,e+2)}const v=new xt;return v.setAttribute("position",new bt(a,3)),v.setIndex(t),v}function Ot(a,t){const v=[],f=(l,d,o)=>{const s=l.attributes.position.count,g=new Float32Array(s*3),M=new Float32Array(s*2);for(let b=0;b<s;b++)g.set([d.r,d.g,d.b],b*3),M[b*2]=lt(l.attributes.position.getY(b)/t,0,1.2),M[b*2+1]=o;return l.setAttribute("color",new $(g,3)),l.setAttribute("aTree",new $(M,2)),l.index?l.toNonIndexed():l},e=new gt(.12,.28,t*.75,8,6);e.translate(0,t*.375,0),v.push(f(e,new Y(5914154),0));for(let l=0;l<6;l++){const d=.9+a()*.7,o=new Mt(d,1);o.translate((a()-.5)*1.8,t*(.62+a()*.3),(a()-.5)*1.8),v.push(f(o,new Y().setHSL(.26+a()*.06,.45,.28+a()*.08),1))}const m=At(v.map(l=>l.index?l.toNonIndexed():l));return m.computeVertexNormals(),v.forEach(l=>l.dispose()),e.dispose(),m}function q(a){return t=>It(t,{antialias:!0,orbit:!1,fov:55,cam:[0,2.4,10],far:200,background:12113132},({scene:v,camera:f,renderer:e})=>{const m=new Y(12113132),l=new st(.4,.8,.3).normalize(),d={uT:{value:0},uA:{value:.4},uC:{value:6},uL:{value:10},uMode:{value:a==="static"?0:a==="sine"?1:2},uSun:{value:l},uFog:{value:new st(m.r,m.g,m.b)}},o=Ft(11),s=new O(new ht(200,200),new it({color:4019492}));s.rotation.x=-Math.PI/2,v.add(s);const g=Dt(),M=new Float32Array(U*3),b=new Float32Array(U*4);for(let i=0;i<U;i++){const h=(o()-.5)*44,T=7-o()*42;M.set([h,0,T],i*3),b.set([.55+o()*.45,o()*Math.PI*2,o()*Math.PI*2,o()],i*4)}g.setAttribute("aOff",new rt(M,3)),g.setAttribute("aInfo",new rt(b,4)),g.instanceCount=U;const _=new O(g,new X({vertexShader:Lt,fragmentShader:zt,uniforms:d,side:vt}));_.frustumCulled=!1,v.add(_);const R=new X({vertexShader:Gt,fragmentShader:Et,uniforms:d});for(const[i,h,T]of[[-7,-9,6],[6,-16,7.5],[-14,-24,8],[13,-6,5]]){const A=new O(Ot(o,T),R);A.position.set(i,0,h),v.add(A)}for(let i=0;i<5;i++){const h=new O(new mt(18+o()*10,24,12),new it({color:new Y(9416872).lerp(m,.35)}));h.position.set(-60+i*30,-12,-80-o()*20),h.scale.y=.5,v.add(h)}const y=new Tt(e,c,1,2),w=new dt,r=new Float32Array(c*3),k=new Float32Array(c*4),L=new Float32Array(c);for(let i=0;i<c;i++){const h=ct(i);r.set([h*Q,0,-8+h*V],i*3),k.set([.55+o()*.45,o()*Math.PI*2,o()*Math.PI*2,0],i*4),L[i]=i}w.setAttribute("position",new $(new Float32Array(c*3),3)),w.setAttribute("aOff",new $(r,3)),w.setAttribute("aInfo",new $(k,4)),w.setAttribute("aIdx",new $(L,1));const z=new pt,G=new yt(w,new X({vertexShader:$t,fragmentShader:_t,uniforms:{...d,uEnc:{value:y.enc}},depthTest:!1,depthWrite:!1}));G.frustumCulled=!1,z.add(G);const p=new wt(-1,1,1,-1,0,1),n={meas:new Float32Array(c),theo:new Float32Array(c),ht:[],hs:[],speed:NaN,ok:!1,lastPhase:NaN,unwrap:0};a!=="static"&&t.shared.set(`ws-${a}`,n);let et=0,ot=0,nt=10,at=6;const ut=i=>{const h=t.params,T=h.num("amp",.4),A=h.num("speed",6),P=h.num("len",10);for(let u=0;u<c;u++){const j=r[u*3],D=r[u*3+2];n.theo[u]=Rt(a,j,D,i,T,A,P)}if(a!=="gust")return;(P!==nt||A!==at)&&(n.ht.length=0,n.hs.length=0,n.lastPhase=NaN,nt=P,at=A);let C=0;for(let u=0;u<c;u++)C+=n.meas[u];C/=c;let F=0,W=0;const B=-8*V;for(let u=0;u<c;u++){const j=ct(u)+B,D=2*Math.PI*j/P;F+=(n.meas[u]-C)*Math.cos(D),W+=(n.meas[u]-C)*Math.sin(D)}if(Math.hypot(F,W)<1e-4)return;const E=Math.atan2(W,F);if(Number.isNaN(n.lastPhase))n.unwrap=E;else{let u=E-n.lastPhase;u>Math.PI&&(u-=2*Math.PI),u<-Math.PI&&(u+=2*Math.PI),n.unwrap+=u}n.lastPhase=E,n.ht.push(i),n.hs.push(n.unwrap*P/(2*Math.PI)),n.ht.length>Nt&&(n.ht.shift(),n.hs.shift());let I=n.ht.length-1;for(;I>0&&i-n.ht[I-1]<3;)I--;const x=n.ht.length-I;x>=4&&(n.speed=Wt(n.ht.slice(I),n.hs.slice(I),x).b)};return{update(i,h,T){const A=Ct(t,"windClock",T,"run"),P=t.params;ot=A.t,d.uT.value=A.t,d.uA.value=P.num("amp",.4),d.uC.value=P.num("speed",6),d.uL.value=P.num("len",10);const C=Math.sin(A.t*.07)*3;if(f.position.set(C,2.3,10),f.lookAt(C*.5,.6,-8),a==="static"){t.hud(`변위 0 · 모든 풀잎이 그대로 서 있음
끝 변위 이론 0.00 m`);return}if(!n.ok){t.hud("측정 준비 중…");return}let F=0,W=0;for(let x=0;x<c;x++)W+=n.meas[x];W/=c;for(let x=0;x<c;x++)F+=(n.meas[x]-W)**2;F=Math.sqrt(F/c);let B=0;for(let x=0;x<c;x++)B=Math.max(B,Math.abs(n.meas[x]-n.theo[x]));const E=c>>1,I=[`끝 변위 d = A·(0.35 + 0.65·${a==="sine"?"(½+½sin1.6t)":"g(s)"}) · y²`,`중앙 풀잎 끝 측정 ${N(n.meas[E])} / 이론 ${N(n.theo[E])} m (최대오차 ${(B*1e3).toFixed(1)} mm)`];a==="sine"?I.push(`위치별 표준편차 ${N(F)} m → 들판 전체가 한 덩어리로 흔들림`):I.push(`돌풍 속도 측정 ${N(n.speed)} / 설정 ${N(d.uC.value)} m/s · 위치별 편차 ${N(F)} m`),t.hud(I.join(`
`))},render(){if(et++,a!=="static"&&et%6===1){e.setRenderTarget(y.rt),e.setClearColor(0,1),e.clear(),e.render(z,p);const i=y.read(e);for(let h=0;h<c;h++)n.meas[h]=i[h*4];ut(ot),n.ok=!0}e.setRenderTarget(null),e.render(v,f)},dispose(){y.dispose(),w.dispose(),G.material.dispose()}}})}function Ut(a){return Pt(a,()=>({draw(t,v,f){kt(t,v,f);const e=a.shared.get("ws-gust"),m=a.shared.get("ws-sine"),l=a.params.num("amp",.4),d=a.params.num("speed",6),o={x:36,y:22,w:H(v-48,20),h:H(f*.5-40,20)},s={x:36,y:o.y+o.h+34,w:o.w,h:H(f-(o.y+o.h+34)-26,20)},g=Math.max(.05,l*1.1),M=y=>o.x+(y+.5)/c*o.w,b=y=>o.y+o.h-lt(y,0,g)/g*o.h;t.strokeStyle="#1c2230",t.strokeRect(o.x+.5,o.y+.5,o.w,o.h);const _=(y,w)=>{t.strokeStyle=w,t.lineWidth=1.4,t.beginPath();for(let r=0;r<c;r++)r?t.lineTo(M(r),b(y[r])):t.moveTo(M(r),b(y[r]));t.stroke(),t.lineWidth=1},R=(y,w)=>{t.fillStyle=w;for(let r=0;r<c;r+=2)t.beginPath(),t.arc(M(r),b(y[r]),2.2,0,Math.PI*2),t.fill()};if(m!=null&&m.ok&&(_(m.theo,"rgba(255,154,60,0.6)"),R(m.meas,"#ff9a3c")),e!=null&&e.ok&&(_(e.theo,"#ffffff"),R(e.meas,"#a3e635")),S(t,`${g.toFixed(2)} m`,o.x-3,o.y+8,"#7d8799",9,"right"),S(t,"0",o.x-3,o.y+o.h,"#7d8799",9,"right"),S(t,`풀잎 끝 변위 (바람 방향 직선 ${K} m)`,o.x,14,"#c8d0dc",10),St(t,[{label:"이동 돌풍 측정",color:"#a3e635"},{label:"균일 사인 측정",color:"#ff9a3c"},{label:"이론(선)",color:"#ffffff"}],o.x,o.y+o.h+14,9),t.strokeStyle="#1c2230",t.strokeRect(s.x+.5,s.y+.5,s.w,s.h),S(t,"돌풍 앞머리 위치 s(t) — 기울기 = 속도",s.x,s.y-6,"#c8d0dc",10),e&&e.ht.length>2){const y=e.ht[e.ht.length-1],w=y-6;let r=1/0,k=-1/0;for(let p=0;p<e.ht.length;p++)e.ht[p]>=w&&(r=Math.min(r,e.hs[p]),k=Math.max(k,e.hs[p]));k-r<1&&(k=r+1);const L=p=>s.x+(p-w)/6*s.w,z=p=>s.y+s.h-(p-r)/(k-r)*s.h,G=e.hs[e.hs.length-1];t.strokeStyle="#ffffff",t.setLineDash([4,4]),t.beginPath(),t.moveTo(L(w),z(G-d*6)),t.lineTo(L(y),z(G)),t.stroke(),t.setLineDash([]),t.fillStyle="#a3e635";for(let p=0;p<e.ht.length;p++)e.ht[p]<w||(t.beginPath(),t.arc(L(e.ht[p]),z(e.hs[p]),2,0,Math.PI*2),t.fill());S(t,`측정 ${N(e.speed)} m/s · 설정 ${d.toFixed(1)} m/s (흰 점선)`,s.x+s.w-4,s.y+12,"#c8d0dc",9,"right"),S(t,"6초 전",s.x,s.y+s.h+11,"#7d8799",9),S(t,"지금",s.x+s.w,s.y+s.h+11,"#7d8799",9,"right")}else S(t,"바람 움직임을 켜면 기록됩니다",s.x+8,s.y+20,"#7d8799",9);a.hud("")}}))}const Kt={layout:"variants",intro:'<b>바람 흔들림</b>은 수만 개의 풀잎과 나무를 물리 시뮬레이션 없이 <b>정점 셰이더 한 줄</b>로 살아 움직이게 하는 연출입니다. 뿌리는 고정하고 높이의 제곱에 비례해 끝을 밀면 휘어진 모양이 되고, 바람 세기를 위치에 따라 지나가는 <b>파동</b>으로 주면 들판 위로 돌풍이 쓸고 지나가는 "바람 물결"이 보입니다. 〈고스트 오브 쓰시마〉처럼 바람 자체를 길잡이·분위기로 쓰는 게임의 기반입니다. 정지 / 균일 사인 / 이동 돌풍을 같은 들판으로 비교합니다.',how:["풀잎은 5마디 띠 하나를 1만 6천 번 인스턴싱한다. 인스턴스마다 위치·높이·방향·위상·색 변화를 속성으로 준다.","정점 셰이더: 높이 비율 y∈[0,1]에 대해 <code>변위 = W · d(x,t) · y²</code>. 뿌리(y=0)는 움직이지 않고 끝이 가장 많이 휜다. 휘는 만큼 높이를 살짝 낮춰 길이가 늘어나 보이지 않게 한다.","균일 사인: <code>d = A(0.35 + 0.65(½+½ sin 1.6t))</code> – 모든 풀잎이 같은 순간 같은 만큼 눕는다.","이동 돌풍: <code>s = x·W − c·t</code>, <code>g(s) = (½+½ cos 2πs/L)⁶</code>, <code>d = A(0.35 + 0.65 g)</code>. 6제곱으로 돌풍 앞머리를 좁게 만들고, s가 시간에 따라 c로 흘러 파동이 들판을 지나간다. 풀잎마다 위상이 다른 옆 떨림 0.12A·sin(5t+φᵢ)을 더한다.","누운 풀 끝을 밝게 칠해(하늘 반사) 돌풍이 지나가는 자리가 밝은 물결로 보이게 한다. 나무는 같은 바람을 0.3배로 줄기에, 빠른 떨림을 잎에 준다.","HUD 측정: 바람 방향 직선 위 96개 탐침 풀잎의 끝 정점을 같은 GLSL 변환으로 96×1 실수 타깃에 그려 끝 변위를 읽는다. 속도는 측정 프로파일의 위상(파장 L 성분)으로 돌풍 위치를 구해 시간에 대해 직선 맞춤한 기울기."],pros:["CPU 비용 0, 정점당 사인 몇 개 – 풀 수십만 포기도 감당한다.",'바람이 "위치의 함수"라 들판·나무·깃발·머리카락이 같은 바람장으로 일관되게 움직인다.',"돌풍 방향을 목적지 쪽으로 돌리면 UI 없이 길을 안내하는 연출(〈고스트 오브 쓰시마〉 길잡이 바람)이 된다."],cons:['충돌·접촉이 없다 – 캐릭터가 지나가며 풀을 누르는 효과는 따로 "상호작용 텍스처"를 써야 한다.',"y² 휨은 수평 이동 근사라 크게 휘면 잎이 늘어나 보인다(길이 보존 근사로 줄일 뿐).","모두 같은 위상이면 즉시 가짜 티가 난다 – 위치 파동 + 개체별 위상이 필수."],usedIn:"〈고스트 오브 쓰시마〉 억새밭·길잡이 바람, 〈젤다의 전설 야생의 숨결〉 초원, 〈크라이시스〉 정글(GPU Gems 3에 정점 굽힘 방식이 공개됨), 언리얼의 SimpleGrassWind 머티리얼 함수, 유니티 터레인의 Wind Zone 등.",tips:["굽힘 강도(뿌리 0 → 끝 1)와 위상 오프셋을 정점 색에 구워 두면 메시마다 셰이더를 바꾸지 않고 조절할 수 있다 – 〈크라이시스〉가 쓴 방식이다.","돌풍 속도 c는 3~10 m/s, 간격 L은 풀 높이의 수십 배(5~20m)가 자연스럽다. L이 짧으면 물결이 아니라 잔물결처럼 떨린다.","그림자 패스에도 같은 정점 변환을 넣어야 한다. 빠뜨리면 풀은 흔들리는데 그림자는 가만히 있다.","돌풍 함수 대신 월드 좌표로 흘러가는 노이즈 텍스처를 바람장으로 읽으면 패턴 반복이 덜하고, 같은 텍스처를 나무·천·파티클이 함께 쓸 수 있다."],related:["guiding-wind","secondary-motion","spring-motion","snow-accumulation","stylized-water"],controls:[{type:"range",key:"amp",label:"바람 세기 A (끝 변위 m)",min:.05,max:.7,step:.01,value:.4},{type:"range",key:"speed",label:"돌풍 속도 c (m/s)",min:1,max:14,step:.5,value:6},{type:"range",key:"len",label:"돌풍 간격 L (m)",min:5,max:20,step:.5,value:10},{type:"toggle",key:"run",label:"시간 흐름",value:!0}],viewers:[{title:"정지",kind:"before",caption:"1만 6천 포기의 풀과 나무가 그림처럼 서 있어, 장면이 사진처럼 죽어 보입니다.",mount:q("static")},{title:"균일 사인",kind:"variant",caption:"모든 풀잎이 같은 위상으로 흔들립니다. 움직이긴 하지만 들판 전체가 한 장의 판처럼 눕고 일어나 기계적입니다.",mount:q("sine")},{title:"이동 돌풍 + 개체 위상",kind:"after",caption:"돌풍 파동이 속도 c로 들판을 쓸고 지나가며 누운 풀 끝이 밝게 빛납니다. 풀잎마다 다른 떨림이 더해져 살아 있는 초원이 됩니다.",mount:q("gust")},{title:"끝 변위 · 돌풍 속도",kind:"info",caption:"위: 바람 방향 직선 위 풀잎 끝 변위 (선 = CPU 식, 점 = GPU 탐침). 아래: 측정 프로파일로 찾은 돌풍 앞머리 위치의 시간 기록 – 기울기가 설정 속도(흰 점선)와 같습니다.",mount:Ut}]};export{Kt as default};
