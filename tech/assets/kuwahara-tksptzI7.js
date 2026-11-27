import{M as q,S as Fe,w as De,az as Ae,ai as $e,p as re,e as Pe,H as Ee,D as Ie,P as le,b as E,I as ae,aq as qe,al as _e,C as Oe,G as Ge,g as ie,am as ce,B as ue,ae as Le,n as Ue,ad as Ne,r as j,s as fe,L as ve,N as me,k as B,o as je,a2 as Be,u as We}from"./three.module-BZgG6AUv.js";import{m as Ze}from"./three-viewer-0rZIEDzf.js";import{Q as Ve}from"./glsl-DOwCk4-f.js";import{b as He}from"./figure-GCHR3crq.js";function we(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let o=t;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296}}const de=new Map;function _(e,t,o,l){let a=de.get(e);return a||(a=document.createElement("canvas"),a.width=t,a.height=o,l(a.getContext("2d"),we(e.length*7919+e.charCodeAt(0))),de.set(e,a)),a}function J(e,t,o){return`hsl(${e.toFixed(0)},${(t*100).toFixed(0)}%,${(o*100).toFixed(0)}%)`}const Qe=()=>_("sky",512,256,(e,t)=>{const o=e.createLinearGradient(0,0,0,256);o.addColorStop(0,"#1d4fb8"),o.addColorStop(.3,"#3f86e0"),o.addColorStop(.44,"#86bdf0"),o.addColorStop(.49,"#f6d6a4"),o.addColorStop(.52,"#c9d8c0"),o.addColorStop(1,"#6d8f5a"),e.fillStyle=o,e.fillRect(0,0,512,256);for(let l=0;l<12;l++){const a=t()*512,m=80+t()*32;for(let u=0;u<7;u++){const x=4+t()*9;e.fillStyle=`rgba(255,255,255,${.5+t()*.4})`,e.beginPath(),e.ellipse(a+(t()-.5)*50,m+(t()-.5)*12,x*1.6,x,0,0,Math.PI*2),e.fill()}}}),Ke=()=>_("grass",512,512,(e,t)=>{e.fillStyle="#4f7f2e",e.fillRect(0,0,512,512);for(let o=0;o<40;o++)e.fillStyle=J(75+t()*40,.5,.25+t()*.2),e.globalAlpha=.5,e.beginPath(),e.arc(t()*512,t()*512,20+t()*50,0,Math.PI*2),e.fill();e.globalAlpha=1;for(let o=0;o<6e3;o++){const l=t()*512,a=t()*512,m=8+t()*16,u=-Math.PI/2+(t()-.5)*.9;e.strokeStyle=J(65+t()*55,.45+t()*.4,.2+t()*.4),e.lineWidth=1.5+t()*2.5,e.beginPath(),e.moveTo(l,a),e.lineTo(l+Math.cos(u)*m,a+Math.sin(u)*m),e.stroke()}for(let o=0;o<60;o++)e.fillStyle=`rgba(110,80,40,${.25+t()*.3})`,e.beginPath(),e.arc(t()*512,t()*512,2+t()*6,0,Math.PI*2),e.fill()}),Xe=()=>_("rock",256,256,(e,t)=>{e.fillStyle="#7d7a74",e.fillRect(0,0,256,256);for(let o=0;o<2600;o++){const l=70+t()*110;e.fillStyle=`rgb(${l},${l-4},${l-10})`,e.fillRect(t()*256,t()*256,1+t()*3,1+t()*3)}for(let o=0;o<40;o++)e.fillStyle=J(85+t()*30,.5,.25+t()*.15),e.beginPath(),e.arc(t()*256,t()*256,3+t()*12,0,Math.PI*2),e.fill();e.strokeStyle="rgba(30,28,25,0.8)";for(let o=0;o<14;o++){e.lineWidth=1+t()*2,e.beginPath();let l=t()*256,a=t()*256;e.moveTo(l,a);for(let m=0;m<5;m++)l+=(t()-.5)*50,a+=(t()-.5)*50,e.lineTo(l,a);e.stroke()}}),Ye=()=>_("bark",128,256,(e,t)=>{e.fillStyle="#5a3d26",e.fillRect(0,0,128,256);for(let o=0;o<90;o++){e.strokeStyle=t()<.5?"rgba(30,18,10,0.8)":"rgba(140,105,70,0.6)",e.lineWidth=1+t()*3;const l=t()*128;e.beginPath(),e.moveTo(l,0),e.bezierCurveTo(l+(t()-.5)*20,90,l+(t()-.5)*20,170,l+(t()-.5)*10,256),e.stroke()}}),Je=()=>_("leafblob",256,256,(e,t)=>{e.fillStyle="#2f5e22",e.fillRect(0,0,256,256);for(let o=0;o<1400;o++)e.fillStyle=J(80+t()*45,.5+t()*.3,.18+t()*.32),e.beginPath(),e.ellipse(t()*256,t()*256,3+t()*4,1.5+t()*2,t()*Math.PI,0,Math.PI*2),e.fill()}),et=()=>_("leafcard",64,64,e=>{e.fillStyle="#ffffff",e.beginPath(),e.ellipse(32,32,28,13,Math.PI/4,0,Math.PI*2),e.fill(),e.strokeStyle="rgba(120,120,120,1)",e.lineWidth=2,e.beginPath(),e.moveTo(12,52),e.lineTo(52,12),e.stroke()}),tt=()=>_("sign",512,256,e=>{e.fillStyle="#d9b77c",e.fillRect(0,0,512,256),e.strokeStyle="rgba(120,80,40,0.5)";for(let t=8;t<256;t+=14)e.lineWidth=1+t%3,e.beginPath(),e.moveTo(0,t),e.bezierCurveTo(170,t+6,340,t-6,512,t+2),e.stroke();e.fillStyle="#2a1a10",e.font='900 92px "Noto Sans KR", sans-serif',e.fillText("PAINT",40,110),e.font='700 58px "Noto Sans KR", sans-serif',e.fillText("쿠와하라 필터",40,190),e.fillStyle="#c0392b",e.fillRect(40,214,432,14),e.strokeStyle="#2a1a10",e.lineWidth=10,e.strokeRect(5,5,502,246)}),ot=()=>_("plaid",128,128,e=>{e.fillStyle="#b8384a",e.fillRect(0,0,128,128),e.fillStyle="rgba(30,30,60,0.55)";for(let t=0;t<128;t+=32)e.fillRect(t,0,12,128),e.fillRect(0,t,128,12);e.fillStyle="rgba(255,230,160,0.9)";for(let t=20;t<128;t+=32)e.fillRect(t,0,3,128),e.fillRect(0,t,128,3)});function I(e,t=1,o){const l=new Le(e);return l.colorSpace=Ue,l.wrapS=l.wrapT=Ne,l.repeat.set(t,t),l.anisotropy=4,o.push(l),l}function at(e,t,o){const l=[],a=we(1234),m=new q(new Fe(60,32,16),new De({map:I(Qe(),1,l),side:Ae,fog:!1}));m.material.map.wrapT=$e,m.material.map.repeat.set(2,1),e.add(m),e.background=new re(8369903),t.shadowMap.enabled=!0,t.shadowMap.type=Pe,e.add(new Ee(13624063,5917232,1.3));const u=new Ie(16773334,2.8);u.position.set(5,8,4),u.castShadow=!0,u.shadow.mapSize.set(o?512:1024,o?512:1024);const x=u.shadow.camera;x.left=-7,x.right=7,x.top=7,x.bottom=-7,x.near=1,x.far=25,u.shadow.bias=-8e-4,e.add(u);const b=new q(new le(50,50),new E({map:I(Ke(),7,l),roughness:.95}));b.rotation.x=-Math.PI/2,b.receiveShadow=!0,e.add(b);const G=I(Xe(),1.5,l),V=new E({map:G,roughness:.9,flatShading:!0}),H=[[1.6,0,1.4,.55],[2.3,0,.6,.35],[-2.6,0,1.6,.45],[-1.2,0,-1.6,.7],[3.4,0,-1.8,.9],[.6,0,2.6,.22]];for(const[s,,r,i]of H){const v=new ae(1,1),h=v.attributes.position,T=a()*100;for(let w=0;w<h.count;w++){const n=h.getX(w),z=h.getY(w),S=h.getZ(w),P=Math.sin(n*12.9898+z*78.233+S*37.719+T)*43758.5453,Z=.75+(P-Math.floor(P))*.45;h.setXYZ(w,n*Z,z*Z*.7,S*Z)}v.computeVertexNormals();const y=new q(v,V);y.scale.setScalar(i),y.position.set(s,i*.35,r),y.rotation.y=a()*6,y.castShadow=y.receiveShadow=!0,e.add(y)}const g=new E({map:I(Ye(),1,l),roughness:.9}),C=new E({map:I(Je(),2,l),roughness:.8,flatShading:!0}),F=new E({map:I(et(),1,l),alphaTest:.5,side:qe,roughness:.7}),R=new le(.28,.28),Q=[],k=[[-2.4,-2.6,1.1],[2.8,-3.6,1.3],[-5.2,-6,1.5],[.6,-7.5,1.4],[5.8,-6.5,1.2]],f=new _e,L=new re;for(const[s,r,i]of k){const v=new q(new Oe(.12*i,.2*i,2.2*i,10),g);v.position.set(s,1.1*i,r),v.castShadow=v.receiveShadow=!0,e.add(v);const h=new Ge;h.position.set(s,2.4*i,r),e.add(h),Q.push({g:h,ph:a()*6});const T=[];for(let n=0;n<6;n++){const z=new ie((a()-.5)*1.3,(a()-.3)*.9,(a()-.5)*1.3).multiplyScalar(i),S=new q(new ae((.55+a()*.3)*i,1),C);S.position.copy(z),S.castShadow=S.receiveShadow=!0,h.add(S),T.push(z)}const y=o?160:260,w=new ce(R,F,y);for(let n=0;n<y;n++){const z=T[n%T.length],S=new ie(a()-.5,a()-.4,a()-.5).normalize();f.position.copy(z).addScaledVector(S,(.6+a()*.35)*i),f.rotation.set(a()*6,a()*6,a()*6),f.scale.setScalar(.8+a()*.8),f.updateMatrix(),w.setMatrixAt(n,f.matrix),w.setColorAt(n,L.setHSL(.2+a()*.12,.55+a()*.3,.25+a()*.3))}w.castShadow=!0,h.add(w)}const p=o?260:420,U=new ce(new ae(.06,0),new E({roughness:.6}),p),N=[16731501,16765503,16777215,11623679,16747586,5097983];for(let s=0;s<p;s++){const r=a()*Math.PI*2,i=1+Math.sqrt(a())*6;f.position.set(Math.cos(r)*i,.06+a()*.08,Math.sin(r)*i*.9-.5),f.rotation.set(0,0,0),f.scale.setScalar(.7+a()*.9),f.updateMatrix(),U.setMatrixAt(s,f.matrix),U.setColorAt(s,L.set(N[Math.floor(a()*N.length)]))}e.add(U);const D=new q(new ue(.08,1.3,.08),g);D.position.set(-1.7,.65,.9),D.castShadow=!0,e.add(D);const A=new q(new ue(1.2,.6,.05),[g,g,g,g,new E({map:I(tt(),1,l),roughness:.8}),g]);A.position.set(-1.7,1.3,.95),A.rotation.y=.35,A.castShadow=!0,e.add(A);const K=I(ot(),3,l),$=He(e,(s,r)=>new E({color:s==="cloth2"?16777215:r,map:s==="cloth2"?K:null,roughness:s==="eye"?.2:.6}));return $.root.position.set(.15,0,.4),$.root.rotation.y=-.25,$.root.traverse(s=>{s.isMesh&&(s.castShadow=s.receiveShadow=!0)}),{tick(s){for(const r of Q)r.g.rotation.z=Math.sin(s*1.3+r.ph)*.03,r.g.rotation.x=Math.sin(s*.9+r.ph*2)*.02;$.head.rotation.y=Math.sin(s*.6)*.25},dispose(){l.forEach(s=>s.dispose())}}}const W=typeof window<"u"&&window.innerWidth<700,be=W?6:10,O=`
precision highp float;
varying vec2 vUv;
`,lt=`${O}
uniform sampler2D tSrc;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){
  vec3 c = aces(texture2D(tSrc, vUv).rgb * 1.1);
  gl_FragColor = vec4(pow(c, vec3(1. / 2.2)), 1.);
}`,xe=`${O}
uniform sampler2D tSrc; uniform vec2 uDir; uniform int uR;
void main(){
  float sig = max(float(uR) * .5, .5);
  vec3 s = vec3(0.); float ws = 0.;
  for (int i = -uR; i <= uR; i++) {
    float w = exp(-float(i * i) / (2. * sig * sig));
    s += texture2D(tSrc, vUv + uDir * float(i)).rgb * w; ws += w;
  }
  gl_FragColor = vec4(s / ws, 1.);
}`,ye=`
vec3 kuwaClassic(sampler2D src, vec2 uv, vec2 texel, int R, out int best){
  vec3 m0 = vec3(0.), m1 = vec3(0.), m2 = vec3(0.), m3 = vec3(0.);
  vec3 s0 = vec3(0.), s1 = vec3(0.), s2 = vec3(0.), s3 = vec3(0.);
  for (int j = -R; j <= R; j++) for (int i = -R; i <= R; i++) {
    vec3 c = texture2D(src, uv + vec2(i, j) * texel).rgb; vec3 c2 = c * c;
    if (i <= 0 && j >= 0) { m0 += c; s0 += c2; }
    if (i >= 0 && j >= 0) { m1 += c; s1 += c2; }
    if (i <= 0 && j <= 0) { m2 += c; s2 += c2; }
    if (i >= 0 && j <= 0) { m3 += c; s3 += c2; }
  }
  float n = float((R + 1) * (R + 1));
  m0 /= n; m1 /= n; m2 /= n; m3 /= n;
  vec3 v0 = abs(s0 / n - m0 * m0), v1 = abs(s1 / n - m1 * m1), v2 = abs(s2 / n - m2 * m2), v3 = abs(s3 / n - m3 * m3);
  float e0 = v0.r + v0.g + v0.b, e1 = v1.r + v1.g + v1.b, e2 = v2.r + v2.g + v2.b, e3 = v3.r + v3.g + v3.b;
  vec3 col = m0; float e = e0; best = 0;
  if (e1 < e) { e = e1; col = m1; best = 1; }
  if (e2 < e) { e = e2; col = m2; best = 2; }
  if (e3 < e) { e = e3; col = m3; best = 3; }
  return col;
}`,st=`${O}
uniform sampler2D tSrc; uniform vec2 uTexel; uniform int uR;
${ye}
void main(){ int b; gl_FragColor = vec4(kuwaClassic(tSrc, vUv, uTexel, uR, b), 1.); }`,nt=`${O}
uniform sampler2D tSrc; uniform vec2 uTexel;
vec3 T(float x, float y){ return texture2D(tSrc, vUv + vec2(x, y) * uTexel).rgb; }
void main(){
  vec3 tl = T(-1., 1.), t = T(0., 1.), tr = T(1., 1.), l = T(-1., 0.), r = T(1., 0.), bl = T(-1., -1.), b = T(0., -1.), br = T(1., -1.);
  vec3 fx = (tr + 2. * r + br - tl - 2. * l - bl) * .25;
  vec3 fy = (tl + 2. * t + tr - bl - 2. * b - br) * .25;
  gl_FragColor = vec4(dot(fx, fx), dot(fx, fy), dot(fy, fy), 1.);
}`,pe=`${O}
uniform sampler2D tSrc; uniform vec2 uDir; uniform float uEigen;
void main(){
  vec3 s = vec3(0.); float ws = 0.;
  for (int i = -4; i <= 4; i++) {
    float w = exp(-float(i * i) / 8.);
    s += texture2D(tSrc, vUv + uDir * float(i)).rgb * w; ws += w;
  }
  s /= ws;
  if (uEigen < .5) { gl_FragColor = vec4(s, 1.); return; }
  float E = s.x, F = s.y, G = s.z;
  float D = sqrt((E - G) * (E - G) + 4. * F * F);
  float l1 = .5 * (E + G + D), l2 = .5 * (E + G - D);
  vec2 t = vec2(l1 - E, -F);
  t = length(t) > 1e-8 ? normalize(t) : vec2(0., 1.);
  // 분모의 작은 상수: 거의 평탄한 곳(하늘 등)에서 미세한 기울기만으로 A≈1이 되는 것을 막아 원형 커널로 되돌림
  float A = (l1 - l2) / (l1 + l2 + .002);
  gl_FragColor = vec4(t, A, sqrt(l1));
}`,Se=`
vec2 ellipseAxes(float r, float A, float k){
  float f = clamp(1. + k * A, 1., 2.);
  return vec2(r * f, r / f);
}`,rt=`${O}
uniform sampler2D tSrc; uniform sampler2D tTfm; uniform vec2 uTexel; uniform int uR; uniform float uAniso; uniform float uQ;
${Se}
void main(){
  vec4 tf = texture2D(tTfm, vUv);
  vec2 t = tf.xy; float A = tf.z;
  float r = float(uR);
  vec2 ab = ellipseAxes(r, A, uAniso);
  float a = ab.x, b = ab.y;
  int mx = int(floor(sqrt(a * a * t.x * t.x + b * b * t.y * t.y)));
  int my = int(floor(sqrt(a * a * t.y * t.y + b * b * t.x * t.x)));
  float zeta = 1. / r;
  float zc = .58; float sz = sin(zc);
  float eta = (zeta + cos(zc)) / (sz * sz);
  vec4 m[8]; vec3 sq[8];
  for (int k = 0; k < 8; k++) { m[k] = vec4(0.); sq[k] = vec3(0.); }
  vec2 n = vec2(-t.y, t.x);
  for (int j = -my; j <= my; j++) for (int i = -mx; i <= mx; i++) {
    vec2 d = vec2(float(i), float(j));
    // 화면 오프셋 → 타원 좌표 (반지름 0.5 원으로 정규화)
    vec2 v = vec2(dot(d, t), dot(d, n)) / vec2(2. * a, 2. * b);
    float vv = dot(v, v);
    if (vv > .25) continue;
    vec3 c = texture2D(tSrc, vUv + d * uTexel).rgb;
    float w[8]; float sum = 0.;
    float vxx = zeta - eta * v.x * v.x, vyy = zeta - eta * v.y * v.y, z;
    z = max(0., v.y + vxx); w[0] = z * z;
    z = max(0., -v.x + vyy); w[2] = z * z;
    z = max(0., -v.y + vxx); w[4] = z * z;
    z = max(0., v.x + vyy); w[6] = z * z;
    vec2 u = .70710678 * vec2(v.x - v.y, v.x + v.y);
    vxx = zeta - eta * u.x * u.x; vyy = zeta - eta * u.y * u.y;
    z = max(0., u.y + vxx); w[1] = z * z;
    z = max(0., -u.x + vyy); w[3] = z * z;
    z = max(0., -u.y + vxx); w[5] = z * z;
    z = max(0., u.x + vyy); w[7] = z * z;
    for (int k = 0; k < 8; k++) sum += w[k];
    float g = exp(-3.125 * vv) / max(sum, 1e-8);
    for (int k = 0; k < 8; k++) { float wk = w[k] * g; m[k] += vec4(c * wk, wk); sq[k] += c * c * wk; }
  }
  // 섹터별 표준편차가 작을수록 큰 가중치: 1 / (1 + (h·σ)^q)
  vec4 o = vec4(0.);
  for (int k = 0; k < 8; k++) {
    if (m[k].w < 1e-6) continue;
    vec3 mu = m[k].rgb / m[k].w;
    vec3 vr = abs(sq[k] / m[k].w - mu * mu);
    float sd = sqrt(vr.r + vr.g + vr.b);
    float wk = 1. / (1. + pow(89. * sd, uQ));
    o += vec4(mu * wk, wk);
  }
  gl_FragColor = vec4(o.w > 1e-30 ? o.rgb / o.w : texture2D(tSrc, vUv).rgb, 1.);
}`,it=`${O}
uniform sampler2D tOut; uniform sampler2D tOrig; uniform float uSplit; uniform float uZoom; uniform vec2 uRes;
void main(){
  vec2 uv = .5 + (vUv - .5) / uZoom;
  vec3 c = texture2D(tOut, uv).rgb;
  if (uSplit > .5) {
    if (vUv.x < .5) c = texture2D(tOrig, uv).rgb;
    if (abs(gl_FragCoord.x - uRes.x * .5) < 1.) c = vec3(1., .9, .3);
  }
  gl_FragColor = vec4(c, 1.);
}`,ct=`${O}
uniform sampler2D tOrig; uniform sampler2D tTfm; uniform vec2 uTexel; uniform vec2 uFRes; uniform vec2 uRes;
uniform int uR; uniform float uAniso; uniform float uMode; uniform float uZoom;
${ye}
${Se}
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 hsv(float h, float s, float v){ vec3 k = clamp(abs(fract(h + vec3(0., 2., 1.) / 3.) * 6. - 3.) - 1., 0., 1.); return v * mix(vec3(1.), k, s); }
float luma(vec3 c){ return dot(c, vec3(.299, .587, .114)); }
void main(){
  vec2 uv = .5 + (vUv - .5) / uZoom;
  vec3 orig = texture2D(tOrig, uv).rgb;
  vec4 tf = texture2D(tTfm, uv);
  vec3 col;
  if (uMode < .5) {
    // 선 적분 컨볼루션(LIC): 방향장을 따라 노이즈를 평균 → 흐름선
    float acc = 0., cnt = 0.;
    for (int sgn = 0; sgn < 2; sgn++) {
      vec2 p = uv; vec2 prev = tf.xy * (sgn == 0 ? 1. : -1.);
      for (int i = 0; i < 12; i++) {
        vec2 tt = texture2D(tTfm, p).xy;
        if (dot(tt, prev) < 0.) tt = -tt;
        prev = tt; p += tt * uTexel;
        acc += h12(floor(p * uFRes)); cnt += 1.;
      }
    }
    float lic = clamp((acc / cnt - .5) * 3. + .5, 0., 1.);
    float hue = fract(atan(tf.y, tf.x) / 3.14159265 + 1.);
    float strength = smoothstep(.01, .12, tf.w);
    col = hsv(hue, .15 + .75 * tf.z, (.2 + .9 * lic) * (.35 + .65 * strength));
    // 범례: 오른쪽 아래 반원 = 경계 방향 각도별 색 (0°~180°)
    float R = .16 * uRes.y;
    vec2 lc = vec2(uRes.x - R - 10., 10.);
    vec2 ld = gl_FragCoord.xy - lc;
    float lr = length(ld);
    if (ld.y >= 0. && lr < R + 3.) {
      col = vec3(.08);
      if (lr < R && lr > R * .35) col = hsv(atan(ld.y, ld.x) / 3.14159265, .9, 1.);
      float ang = atan(ld.y, ld.x);
      if (lr < R * .35 && fract(ang / 3.14159265 * 4. + .5) < .06) col = vec3(.9);
    }
  } else if (uMode < 1.5) {
    // 격자마다 그 위치의 커널 타원을 그림 (점선 사각형 = 고전 쿠와하라 창)
    col = mix(vec3(luma(orig)), orig, .35) * .55;
    float r = float(uR);
    float S = max(4. * r, 16.);
    vec2 p = uv * uFRes;
    vec2 cell = floor(p / S);
    float pxPerTexel = uRes.x * uZoom / uFRes.x;
    float ring = 0.; float box = 0.; float aSel = 0.;
    for (int oy = -1; oy <= 1; oy++) for (int ox = -1; ox <= 1; ox++) {
      vec2 c = floor((cell + vec2(ox, oy) + .5) * S) + .5;
      vec4 f = texture2D(tTfm, c / uFRes);
      vec2 ab = ellipseAxes(r, f.z, uAniso);
      vec2 d = p - c;
      vec2 l = vec2(dot(d, f.xy), dot(d, vec2(-f.y, f.x)));
      vec2 q = l / ab;
      float e = length(q);
      float g = length(l / (ab * ab)) / max(e, 1e-4);
      float dist = abs(e - 1.) / max(g, 1e-4) * pxPerTexel;
      float rr = 1. - smoothstep(.6, 1.6, dist);
      if (rr > ring) { ring = rr; aSel = f.z; }
      ring = max(ring, 1. - smoothstep(1., 2.5, length(d) * pxPerTexel));
      if (ox == 0 && oy == 0) {
        vec2 bd = abs(d);
        float edge = abs(max(bd.x, bd.y) - r) * pxPerTexel;
        float dash = step(.5, fract((d.x + d.y) * .25));
        box = (1. - smoothstep(.5, 1.2, edge)) * dash * .6;
      }
    }
    col = mix(col, vec3(.85), box);
    col = mix(col, mix(vec3(.3, .85, 1.), vec3(1., .85, .2), aSel), ring);
  } else if (uMode < 2.5) {
    int b; kuwaClassic(tOrig, uv, uTexel, uR, b);
    vec3 qc = b == 0 ? vec3(1., .3, .3) : b == 1 ? vec3(.3, .9, .3) : b == 2 ? vec3(.3, .55, 1.) : vec3(1., .85, .2);
    col = mix(vec3(luma(orig)), qc, .6);
  } else {
    float A = tf.z;
    vec3 heat = clamp(vec3(1.5 * A - .2, 1.8 * A * (1. - A) + .05, 1. - 1.4 * A + .2), 0., 1.);
    col = mix(heat, vec3(luma(orig)), .25);
  }
  gl_FragColor = vec4(col, 1.);
}`;function ut(e,t){return e==="gauss"?2*(2*t+1):e==="classic"||e==="info"?(2*t+1)**2:26+Math.round(Math.PI*t*t)}const he={gauss:1,classic:1.3,aniso:3.2,info:1.3},ft=15e8;function vt(e,t){return Ze(e,{cam:[1.6,1.75,5.4],target:[-.1,1.05,0],antialias:!1,fov:42,far:150},({scene:o,camera:l,renderer:a})=>{const m=at(o,a,W),u={depthBuffer:!1,minFilter:ve,magFilter:ve},x=new j(1,1,{type:fe,samples:W?0:4}),b=new j(1,1,u),G=new j(1,1,u),V=new j(1,1,u),H=t==="aniso"||t==="info",g={...u,type:fe},C=H?new j(1,1,g):null,F=H?new j(1,1,g):null,R=H?new j(1,1,{...g,minFilter:me,magFilter:me}):null,Q=[x,b,G,V,C,F,R].filter(Boolean),k=new B(1,1),f=new B(1,1),L=new B(1,1),p=(c,M)=>new We({vertexShader:Ve,fragmentShader:c,uniforms:M,depthTest:!1,depthWrite:!1}),U=p(lt,{tSrc:{value:x.texture}}),N=p(xe,{tSrc:{value:b.texture},uDir:{value:new B},uR:{value:4}}),D=p(xe,{tSrc:{value:V.texture},uDir:{value:new B},uR:{value:4}}),A=p(st,{tSrc:{value:b.texture},uTexel:{value:k},uR:{value:4}}),K=p(nt,{tSrc:{value:b.texture},uTexel:{value:k}}),$=p(pe,{tSrc:{value:(C==null?void 0:C.texture)??null},uDir:{value:new B},uEigen:{value:0}}),s=p(pe,{tSrc:{value:(F==null?void 0:F.texture)??null},uDir:{value:new B},uEigen:{value:1}}),r=p(rt,{tSrc:{value:b.texture},tTfm:{value:(R==null?void 0:R.texture)??null},uTexel:{value:k},uR:{value:4},uAniso:{value:1},uQ:{value:8}}),i=p(it,{tOut:{value:G.texture},tOrig:{value:b.texture},uSplit:{value:0},uZoom:{value:1},uRes:{value:L}}),v=p(ct,{tOrig:{value:b.texture},tTfm:{value:(R==null?void 0:R.texture)??null},uTexel:{value:k},uFRes:{value:f},uRes:{value:L},uR:{value:4},uAniso:{value:1},uMode:{value:0},uZoom:{value:1}}),h=[U,N,D,A,K,$,s,r,i,v],T=new q(new le(2,2),U);T.frustumCulled=!1;const y=new je;y.add(T);const w=new Be(-1,1,1,-1,0,1),n=(c,M)=>{T.material=c,a.setRenderTarget(M),a.render(y,w)};let z=1,S=1,P=-1;const Z=()=>{const c=parseFloat(e.params.str("res",W?"0.75":"1"));return c>0&&c<=1?c:1},se=()=>{P=Z();const c=Math.max(8,Math.floor(z*P)),M=Math.max(8,Math.floor(S*P));Q.forEach(d=>d.setSize(c,M)),f.set(c,M),k.set(1/c,1/M)},ge=["방향장: 색 = 경계 방향, 채도 = 이방성 A, 밝기 = 경계 세기, 무늬 = 흐름선(LIC)","커널 타원: 시안 = 등방(A≈0), 노랑 = 강한 이방성 · 점선 = 고전 정사각 창","고전 쿠와하라가 고른 사분면 (빨 좌상 · 초 우상 · 파 좌하 · 노 우하)","이방성 A = (λ1−λ2)/(λ1+λ2+ε): 파랑 0(평탄·모서리) → 빨강 1(직선 경계)"];return{update(c,M){m.tick(M);const d=Math.min(be,Math.round(e.params.num("radius",W?4:6))),ne=e.params.num("q",8),ee=e.params.num("aniso",1),Re=e.params.num("zoom",1);N.uniforms.uR.value=D.uniforms.uR.value=d,A.uniforms.uR.value=d,r.uniforms.uR.value=d,r.uniforms.uQ.value=ne,r.uniforms.uAniso.value=ee,v.uniforms.uR.value=d,v.uniforms.uAniso.value=ee;const te=["flow","ellipse","quad","aniso"].indexOf(e.params.str("debug","flow"));v.uniforms.uMode.value=Math.max(0,te),v.uniforms.uZoom.value=i.uniforms.uZoom.value=Re,i.uniforms.uSplit.value=e.params.bool("split",!1)?1:0;const X=f.x,Y=f.y,ke=Math.round(P*100);if(t==="info"){const Ce=te===2?`
이 보기만 고전 쿠와하라를 다시 계산 ((2r+1)² = ${(2*d+1)**2} 샘플)`:"";e.hud(`${ge[Math.max(0,te)]}
텐서: 소벨 8탭 + σ=2 평활 2×9탭 · ${X}×${Y}${Ce}`);return}const oe=ut(t,d),Me=oe*X*Y/1e6,Te=oe*he[t]*X*Y/ft*1e3,ze=t==="gauss"?`가우시안 r=${d} (σ=${(d/2).toFixed(1)}) · 분리형 2패스`:t==="classic"?`고전 쿠와하라 r=${d} · 사분면 4개 (${d+1}×${d+1})`:`이방성 쿠와하라 r=${d} · 섹터 8 · q=${ne} · 1/α=${ee.toFixed(1)}`;e.hud(`${ze}
샘플/픽셀 ${oe} · 필터 ${X}×${Y} (${ke}%) = ${Me.toFixed(1)}M 샘플/프레임
모바일 추정 ≈ ${Te.toFixed(1)} ms (1.5G 샘플/s 가정 · 연산 ×${he[t]})`)},resize(c,M){z=c,S=M,se(),L.set(a.domElement.width,a.domElement.height)},render(){Z()!==P&&se(),L.set(a.domElement.width,a.domElement.height),a.setRenderTarget(x),a.render(o,l),n(U,b),t==="gauss"?(N.uniforms.uDir.value.set(k.x,0),D.uniforms.uDir.value.set(0,k.y),n(N,V),n(D,G)):t==="classic"?n(A,G):C&&F&&R&&($.uniforms.uDir.value.set(k.x,0),s.uniforms.uDir.value.set(0,k.y),n(K,C),n($,F),n(s,R),t==="aniso"&&n(r,G)),n(t==="info"?v:i,null)},dispose(){m.dispose(),Q.forEach(c=>c.dispose()),h.forEach(c=>c.dispose()),T.geometry.dispose()}}})}const mt=[{kind:"gauss",title:"가우시안 블러 (같은 반경)",vk:"before",caption:"주변을 거리 가중 평균. 풀·잎의 잔무늬는 사라지지만 캐릭터 실루엣·글자·그림자 경계도 똑같이 번져 초점이 나간 사진처럼 보인다."},{kind:"classic",title:"고전 쿠와하라 (사분면 4개)",vk:"variant",caption:"주변을 정사각 사분면 4개로 나눠 분산이 가장 작은 쪽의 평균을 고른다. 경계를 넘지 않는 사분면이 뽑혀 경계는 선명하고 면은 납작한 물감 덩어리가 되지만, 정사각형 블록 무늬가 생긴다."},{kind:"aniso",title:"이방성 쿠와하라 (타원 · 섹터 8)",vk:"after",caption:"구조 텐서로 구한 경계 방향을 따라 늘인 타원 커널, 8개 섹터를 부드러운 가중으로 섞는다. 붓 자국이 형태의 결을 따라 흐르고 블록 무늬가 사라진다."},{kind:"info",title:"내부 보기: 구조 텐서 · 커널",vk:"info",caption:'필터가 실제로 쓰는 중간 데이터. "디버그 보기"로 방향장(흐름선), 픽셀마다 달라지는 타원 커널, 고전 쿠와하라의 사분면 선택, 이방성 크기를 바꿔 볼 수 있다.'}],wt={layout:"compare",intro:'<b>쿠와하라 필터</b>는 주변 픽셀을 몇 개의 구역으로 나누고, 그중 <b>가장 고른(분산이 작은) 구역의 평균</b>을 출력하는 비선형 필터입니다. 경계를 가로지르는 구역은 분산이 커서 선택되지 않으므로, 면은 물감처럼 뭉개지면서 경계는 남습니다. 같은 반경의 가우시안 블러와 나란히 두면 "흐린 사진"과 "그림"의 차이가 바로 보입니다. <b>이방성 쿠와하라</b>는 구역을 경계 방향으로 늘인 타원으로 바꿔 붓 자국이 형태의 결을 따라 흐르게 합니다.',how:["장면을 렌더 타깃에 그리고 톤 매핑·감마까지 적용한 표시 공간 이미지를 만든다 (분산을 지각적으로 고른 값에서 재기 위해).","고전: 반경 r의 정사각 창을 (r+1)×(r+1) 사분면 4개로 나눠 각각 평균 m과 분산 σ² = E[c²] − m²를 구하고, σ²가 최소인 사분면의 m을 출력.","이방성 1단계: 소벨 미분으로 구조 텐서 (fx², fx·fy, fy²)를 만들고 가우시안으로 평활 → 고유값 λ1, λ2와 경계 방향 t, 이방성 A = (λ1−λ2)/(λ1+λ2).","이방성 2단계: 반축 a = r·(1+A/α), b = r/(1+A/α)인 타원을 t 방향으로 회전, 그 안을 8개 섹터로 나누되 다항식 가중으로 겹치게 해서 섹터별 가중 평균·표준편차를 누적.","출력 = Σ wₖ·mₖ / Σ wₖ, wₖ = 1 / (1 + (h·σₖ)^q). q가 크면 가장 고른 섹터만, 작으면 여러 섹터가 섞여 부드럽다.","비용은 반경의 제곱에 비례하므로 모바일에서는 낮은 해상도에서 필터를 돌리고 반경을 제한한다."],pros:['블러와 달리 경계·실루엣이 살아 있는 "그림" 느낌',"셰이더 몇 패스로 어떤 3D 장면이든 페인터리 룩","이방성 버전은 붓질이 형태를 따라가 수작업 느낌이 강함"],cons:["비용이 반경² × 섹터 수에 비례 (가우시안처럼 분리 불가)","고전 버전은 정사각 블록 아티팩트, 노이즈가 많으면 얼룩","움직이는 화면에서 선택이 바뀌며 깜빡일 수 있음 (시간적 안정성)"],usedIn:'사진·영상 편집기의 "유화" 필터, 비사실적 렌더링(NPR) 연구, 일부 스타일라이즈드 게임과 데모의 수채·유화 후처리 (게임별 구현은 공개 자료가 적어 일반론으로만 기술).',controls:[{type:"range",key:"radius",label:"커널 반경 r",min:2,max:be,step:1,value:W?4:6},{type:"range",key:"q",label:"날카로움 q",min:1,max:16,step:1,value:8},{type:"range",key:"aniso",label:"이방성 1/α",min:0,max:3,step:.1,value:1},{type:"select",key:"debug",label:"디버그 보기",options:[{label:"방향장 (흐름선)",value:"flow"},{label:"커널 타원",value:"ellipse"},{label:"고전 사분면 선택",value:"quad"},{label:"이방성 A",value:"aniso"}],value:"flow"},{type:"select",key:"res",label:"필터 해상도",options:[{label:"100% (화면 픽셀)",value:"1"},{label:"75% (모바일 기본)",value:"0.75"},{label:"50%",value:"0.5"}],value:W?"0.75":"1"},{type:"range",key:"zoom",label:"픽셀 확대",min:1,max:4,step:.5,value:1},{type:"toggle",key:"split",label:"왼쪽 절반 원본 비교",value:!1}],viewers:mt.map(e=>({title:e.title,kind:e.vk,caption:e.caption,mount:t=>vt(t,e.kind)}))};export{wt as default};
