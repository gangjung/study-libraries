import{V as j,q as yt,C as G,M as L,P as rt,S as st,ak as St,g as B,h as ct,G as it,a as lt,c as Mt,d as $t,f as D,ay as Ft,i as Nt}from"./three.module-CEzfHhrp.js";import{m as Lt}from"./three-viewer-fx7lDL-0.js";import{m as Pt,a as ft}from"./canvas-viewer-QtaWfmlz.js";import{c as Rt,l as Ct}from"./chart2d-DfgeckAJ.js";import{N as Gt,P as Wt,p as O,a as $,c as dt,b as At}from"./extra-kit-c-FPjCbN4U.js";import{S as Tt,P as _t,H as V,u as Ht,o as zt,s as Et,a as ut,c as W,d as K,b as pt}from"./shader-kit-a-CYybgKL4.js";const v=64,m={x0:-3.5,z0:-2.6,span:7},F=.5,R=.25,ht=.028,I=.45,X=-3,U=t=>.17+.3*Math.max(0,(t-.25)/.75),vt=[{c:[-1.6,1.72],h:[1.25,.12],col:[3.2,.45,1.7]},{c:[1.35,2.35],h:[.12,.75],col:[.35,2.2,3.2]},{c:[.7,1.15],h:[1.1,.07],col:[3.2,1.6,.35]},{c:[-3.4,3.3],h:[.32,.45],col:[.9,.55,.25]},{c:[-.4,3.4],h:[.32,.45],col:[.9,.55,.25]},{c:[2.9,3.3],h:[.32,.45],col:[.5,.6,.9]}],A=new j(2.45,2.55,.3),jt=new j(0,.7,-1.1),mt=`
${Tt}
${Gt}
float wsCobble(vec2 p, out float phi, out float r0, out vec3 alb) {
  float iy = floor(p.y / ${R});
  float off = mod(iy, 2.0) * ${F*.5};
  float ix = floor((p.x + off) / ${F});
  vec2 lc = vec2(p.x + off - ix * ${F}, p.y - iy * ${R});
  float ed = min(min(lc.x, ${F} - lc.x), min(lc.y, ${R} - lc.y));
  float g = step(ed, ${ht});
  float h1 = skHash(ivec2(int(ix), int(iy)));
  float h2 = skHash(ivec2(int(ix) + 101, int(iy) - 57));
  phi = mix(0.2 + 0.3 * h1, 0.9, g);
  r0 = mix(0.5 + 0.25 * h2, 0.92, g);
  alb = mix(vec3(0.34, 0.33, 0.36) * (0.7 + 0.6 * h1), vec3(0.2, 0.16, 0.13), g);
  return g;
}
float wsHeight(vec2 p) {
  float d = (p.y + 0.4) / 1.3;
  return xk_fbm(vec3(p.x * ${I}, 0.0, p.y * ${I})) - 0.09 * exp(-d * d);
}
float wsTau(float w) { return 0.17 + 0.3 * max(0.0, (w - 0.25) / 0.75); }
// k = 알베도 배율, r = 거칠기, pud = 웅덩이
float wsWet(vec2 p, float w, float mode, out float k, out float r, out float pud, out vec3 alb) {
  float phi, r0;
  float g = wsCobble(p, phi, r0, alb);
  float ph = mode < 1.5 ? 0.6 : phi;
  k = 1.0 - 0.65 * ph * w;
  r = mix(r0, 0.08, w * (1.0 - 0.6 * ph));
  pud = 0.0;
  if (mode > 1.5) {
    float hg = wsHeight(p);
    float tau = wsTau(w);
    pud = smoothstep(tau + 0.012, tau - 0.012, hg);
    k = mix(k, 0.3, pud);
    r = mix(r, 0.03, pud);
  }
  return g;
}`,It=`
varying vec3 vWp;
void main() { vec4 wp = modelMatrix * vec4(position, 1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,P=t=>`vec2(${t[0].toFixed(3)}, ${t[1].toFixed(3)})`,Ut=`
uniform float uW, uMode, uTime;
uniform vec3 uLampP, uLampC, uN1P, uN1C, uN2P, uN2C;
varying vec3 vWp;
${mt}
float softRect(vec2 p, vec2 c, vec2 h, float b) {
  vec2 d = abs(p - c) - h;
  float o = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  return (1.0 - smoothstep(-b, b, o)) * (h.x * h.y) / ((h.x + b) * (h.y + b));
}
vec3 envRefl(vec3 P, vec3 R, float rough) {
  vec3 c = mix(vec3(0.02, 0.025, 0.05), vec3(0.06, 0.07, 0.13), clamp(R.y, 0.0, 1.0));
  if (R.z < -0.01) {
    float t = (${X.toFixed(2)} - P.z) / R.z;
    vec3 H = P + R * t;
    float b = 0.02 + rough * rough * t * 1.2;
    if (H.y < 4.5) c = vec3(0.035, 0.03, 0.04);
    ${vt.map(t=>`c += vec3(${t.col.map(o=>o.toFixed(2)).join(", ")}) * (softRect(H.xy, ${P(t.c)}, ${P(t.h)}, b) + 0.1 * softRect(H.xy, ${P(t.c)}, ${P(t.h)} + 0.4, b + 0.3) + 0.06 * softRect(H.xy, ${P(t.c)}, ${P(t.h)} + 1.2, b + 0.9));`).join(`
    `)}
  }
  // 가로등 갓 (반사로 보이는 밝은 원)
  vec3 toL = normalize(uLampP - P);
  float cl = dot(R, toL);
  float lb = 0.004 + rough * rough * 0.35;
  c += uLampC * 0.08 * smoothstep(1.0 - lb * 2.0, 1.0 - lb * 0.2, cl) * 0.004 / lb;
  return c;
}
vec3 pointL(vec3 P, vec3 n, vec3 v, vec3 alb, float rough, float F0, vec3 Lp, vec3 Lc) {
  vec3 L = Lp - P;
  float d2 = dot(L, L);
  L *= inversesqrt(d2);
  float att = 1.0 / (1.0 + d2);
  vec3 h = normalize(L + v);
  float nl = max(dot(n, L), 0.0), nh = max(dot(n, h), 0.0), nv = max(dot(n, v), 1e-3);
  float a = max(rough * rough, 0.002), a2 = a * a;
  float dd = nh * nh * (a2 - 1.0) + 1.0;
  float D = a2 / (3.14159 * dd * dd);
  float kk = (rough + 1.0) * (rough + 1.0) / 8.0;
  float G = nl / (nl * (1.0 - kk) + kk) * nv / (nv * (1.0 - kk) + kk);
  float F = F0 + (1.0 - F0) * pow(1.0 - max(dot(h, v), 0.0), 5.0);
  return (alb / 3.14159 * (1.0 - F) + vec3(D * G * F / max(4.0 * nl * nv, 1e-3))) * Lc * nl * att;
}
vec2 ripples(vec2 p, float t) {
  vec2 g = vec2(0.0);
  for (int j = 0; j < 2; j++) {
    vec2 q = p * 2.4 + float(j) * 0.37;
    ivec2 c = ivec2(floor(q));
    vec2 f = fract(q) - 0.5;
    float h = skHash(c + ivec2(j * 31, 7));
    vec2 o = vec2(skHash(c + ivec2(7, 3)), skHash(c + ivec2(13, 11))) - 0.5;
    vec2 d = f - o * 0.5;
    float ph = fract(t * 0.8 + h);
    float dist = length(d);
    float x = (dist - ph * 0.45) * 38.0;
    g += d / max(dist, 1e-3) * sin(x) * exp(-x * x * 0.12) * (1.0 - ph) * (1.0 - ph) * 0.07;
  }
  return g;
}
void main() {
  vec2 p = vWp.xz;
  float k, r, pud;
  vec3 alb;
  wsWet(p, uW, uMode, k, r, pud, alb);
  vec3 n = vec3(0.0, 1.0, 0.0);
  if (pud > 0.01 && uW > 0.0) {
    vec2 gr = ripples(p, uTime) * pud * smoothstep(0.2, 0.6, uW);
    n = normalize(vec3(-gr.x, 1.0, -gr.y));
  }
  vec3 v = normalize(cameraPosition - vWp);
  vec3 a2 = alb * k;
  float F0 = mix(0.04, 0.02, pud);
  vec3 col = a2 * vec3(0.05, 0.055, 0.08);
  col += pointL(vWp, n, v, a2, r, F0, uLampP, uLampC);
  col += pointL(vWp, n, v, a2, r, F0, uN1P, uN1C);
  col += pointL(vWp, n, v, a2, r, F0, uN2P, uN2C);
  float nv = max(dot(n, v), 0.0);
  float Fe = F0 + (1.0 - F0) * pow(1.0 - nv, 5.0);
  vec3 R = reflect(-v, n);
  col += envRefl(vWp, R, r) * Fe * pow(1.0 - r, 2.0) * mix(1.6, 3.0, pud);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,qt=`
uniform float uW, uMode;
varying vec2 vUv;
${mt}
void main() {
  vec2 p = vec2(${m.x0.toFixed(2)}, ${m.z0.toFixed(2)}) + vUv * ${m.span.toFixed(2)};
  float k, r, pud;
  vec3 alb;
  wsWet(p, uW, uMode, k, r, pud, alb);
  gl_FragColor = vec4(k, r, pud, 1.0);
}`,Bt=`
uniform float uTime, uW;
attribute float aSeed;
attribute float aEnd;
varying float vA;
void main() {
  vec3 p = position;
  float y = mod(p.y - uTime * (8.0 + 3.0 * aSeed), 6.0);
  p.y = y - aEnd * 0.32;
  p.x -= aEnd * 0.05;
  vA = step(aSeed, uW) * (0.25 + 0.3 * aSeed) * (1.0 - aEnd * 0.6);
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,Dt=`
varying float vA;
void main() { if (vA < 0.01) discard; gl_FragColor = vec4(0.7, 0.78, 0.9, vA); }`,Ot=(t,o,n)=>{const d=Math.max(0,Math.min(1,(n-t)/(o-t)));return d*d*(3-2*d)};function xt(t,o){const n=Math.floor(o/R),d=(n%2+2)%2*F*.5,c=Math.floor((t+d)/F),x=t+d-c*F,a=o-n*R,i=Math.min(x,F-x,a,R-a)<=ht?1:0,h=pt(c,n),l=pt(c+101,n-57);return{g:i,phi:i?.9:.2+.3*h,r0:i?.92:.5+.25*l}}function Z(t,o){const n=(o+.4)/1.3;return At(t*I,0,o*I)-.09*Math.exp(-n*n)}function Vt(t,o,n,d){const c=xt(t,o),x=c.phi;let a=1-.65*x*n,p=c.r0+(.08-c.r0)*(n*(1-.6*x)),i=0;{const h=Z(t,o),l=U(n);i=Ot(l+.012,l-.012,h),a=a+(.3-a)*i,p=p+(.03-p)*i}return{k:a,r:p,pud:i,...c}}let E=null;function wt(){if(E)return E;const t=ft(31),o=2e4,n=new Float32Array(o);for(let a=0;a<o;a++)n[a]=Z(m.x0+t()*m.span,m.z0+t()*m.span);n.sort();const d=U(1)+.03;let c={i:-1,phi:9,r0:0},x={i:-1,phi:0,r0:0};for(let a=8;a<v-8;a++)for(let p=8;p<v-8;p++){const i=m.x0+(p+.5)/v*m.span,h=m.z0+(a+.5)/v*m.span;if(Z(i,h)<d)continue;const l=xt(i,h);!l.g&&l.phi<c.phi&&(c={i:a*v+p,phi:l.phi,r0:l.r0}),l.g&&x.i<0&&(x={i:a*v+p,phi:l.phi,r0:l.r0})}return E={sorted:n,stone:c,grout:x},E}function J(t){return o=>Lt(o,{antialias:!0,orbit:!1,fov:42,cam:[0,1.6,7],target:[0,.8,-.8],far:60,background:329228},({scene:n,camera:d,renderer:c})=>{c.toneMapping=yt,c.toneMappingExposure=1.1;const a={uW:{value:0},uMode:{value:t==="dry"?0:t==="uniform"?1:2},uTime:{value:0},uLampP:{value:A.clone()},uLampC:{value:new G(1,.72,.42).multiplyScalar(14)},uN1P:{value:new j(-1.5,1.75,-2.5)},uN1C:{value:new G(1,.15,.55).multiplyScalar(6)},uN2P:{value:new j(1.35,2.4,-2.5)},uN2C:{value:new G(.1,.7,1).multiplyScalar(6)}},p=new L(new rt(16,12),new st({vertexShader:It,fragmentShader:Ut,uniforms:a}));p.rotation.x=-Math.PI/2,p.position.z=1.5,n.add(p),n.add(new St(3159626,.6));const i=(e,s)=>{const b=new Nt(s.clone().multiplyScalar(1/Math.max(s.r,s.g,s.b)),Math.max(s.r,s.g,s.b)*.9,0,2);b.position.copy(e),n.add(b)};i(A,a.uLampC.value),i(a.uN1P.value,a.uN1C.value),i(a.uN2P.value,a.uN2C.value);const h=new B({color:3814464,roughness:.8}),l=new B({color:2369068,roughness:.5,metalness:.7}),S=new B({color:5914410,roughness:.75}),w=new L(new ct(16,4.5,.3),h);w.position.set(0,2.25,X-.15),n.add(w);for(const e of vt){const s=new L(new rt(e.h[0]*2,e.h[1]*2),new it({color:new G(e.col[0],e.col[1],e.col[2]).multiplyScalar(.6)}));s.position.set(e.c[0],e.c[1],X+.02),n.add(s)}const Q=new L(new lt(.05,.07,2.6,12),l);Q.position.set(A.x,1.3,A.z),n.add(Q);const Y=new L(new Mt(.13,16,12),new it({color:new G(1.6,1.15,.7)}));Y.position.copy(A),n.add(Y);const C=(e,s,b,M,N,f,k=0)=>{const u=new L(new ct(e,s,b),f);u.position.set(M,s/2,N),u.rotation.y=k,n.add(u)};C(.6,.6,.6,-2.4,-2.2,S,.2),C(.45,.45,.45,-1.8,-2.4,S,-.3),C(.4,.4,.4,-3,-1.9,S,.6),C(1.4,.08,.4,.4,-2.3,S);for(const e of[-.6,.6])C(.06,.42,.36,.4+e*.9,-2.3,l);for(let e=0;e<4;e++){const s=new L(new lt(.08,.08,.6,12),l);s.position.set(-3+e*.9,.3,2.8),n.add(s)}const T=900,tt=new Float32Array(T*6),ot=new Float32Array(T*2),et=new Float32Array(T*2),_=ft(8);for(let e=0;e<T;e++){const s=(_()-.5)*10,b=_()*6,M=(_()-.5)*8-.5,N=_();for(let f=0;f<2;f++)tt.set([s,b,M],(e*2+f)*3),ot[e*2+f]=N,et[e*2+f]=f}const H=new $t;H.setAttribute("position",new D(tt,3)),H.setAttribute("aSeed",new D(ot,1)),H.setAttribute("aEnd",new D(et,1));const at=new Ft(H,new st({vertexShader:Bt,fragmentShader:Dt,uniforms:{uTime:a.uTime,uW:a.uW},transparent:!0,depthWrite:!1}));at.frustumCulled=!1,n.add(at);const nt=new Wt(qt,{uW:a.uW,uMode:a.uMode}),q=new _t(v,v,!1),g=wt(),r=o.shared.get("wet-meas")??{w:0,kS:NaN,kG:NaN,rS:NaN,rG:NaN,pud:NaN,pudTh:NaN,rmsK:NaN,rmsR:NaN,hk:new V(150),hr:new V(150),hp:new V(150)};t==="porous"&&o.shared.set("wet-meas",r);let bt=0;const gt=e=>{nt.render(c,q.rt);const s=q.read(c);c.setRenderTarget(null);let b=0,M=0,N=0,f=0;for(let k=0;k<v;k++)for(let u=0;u<v;u++){const y=(k*v+u)*4;if(b+=s[y+2]/255,!(u&3)&&!(k&3)){const z=Vt(m.x0+(u+.5)/v*m.span,m.z0+(k+.5)/v*m.span,e);M+=(s[y]/255-z.k)**2,N+=(s[y+1]/255-z.r)**2,f++}}r.w=e,r.pud=b/(v*v),r.pudTh=dt(g.sorted,U(e)),r.rmsK=Math.sqrt(M/f),r.rmsR=Math.sqrt(N/f),r.kS=s[g.stone.i*4]/255,r.rS=s[g.stone.i*4+1]/255,r.kG=s[g.grout.i*4]/255,r.rG=s[g.grout.i*4+1]/255,r.hk.push(e,r.kS),r.hk.push(e,r.kG),r.hr.push(e,r.rS),r.hr.push(e,r.rG),r.hp.push(e,r.pud)};return{update(e,s,b){const M=o.params,f=Ht(o,"wetClock",b).t,k=M.bool("auto",!0)?.5-.5*Math.cos(f/26*Math.PI*2):M.num("w",.7),u=t==="dry"?0:k;a.uW.value=u,a.uTime.value=f,h.roughness=.85-.5*u,S.roughness=.75-.45*u,zt(d,jt,.3*Math.sin(f*.07),.4,6.2),t==="porous"&&bt++%8===0&&gt(u);const y=[];if(t==="dry")y.push(`건조 (비 ${O(k)}를 무시)`);else if(t==="uniform")y.push(`균일 젖음 φ = 0.6 · w ${$(u)}`,`k = 1 − 0.39w = ${$(1-.39*u)}`);else{const z=1-.65*g.stone.phi*u,kt=1-.65*g.grout.phi*u;y.push(`비 w ${$(u)} · 웅덩이 측정 ${O(r.pud)} / 이론 F(τ) ${O(r.pudTh)}`),y.push(`알베도 k 돌 ${$(r.kS)}/${$(z)} · 줄눈 ${$(r.kG)}/${$(kt)}`),y.push(`거칠기 r 돌 ${$(r.rS)}/${$(g.stone.r0+(.08-g.stone.r0)*u*(1-.6*g.stone.phi))} · RMS k ${r.rmsK.toFixed(3)} r ${r.rmsR.toFixed(3)}`)}o.hud(y.join(`
`))},dispose(){nt.dispose(),q.dispose()}}})}function Kt(t){return Pt(t,()=>({draw(o,n,d){Rt(o,n,d);const c=t.shared.get("wet-meas");if(!c)return;const x=wt(),[a,p]=Et(n,d),i={...a,x0:0,x1:1,y0:0,y1:1};ut(o,i,"알베도 배율 k · 거칠기 r","비 w",[0,.5,1],[0,.5,1]);const h=x.stone,l=x.grout;W(o,i,w=>1-.65*h.phi*w,"#5b9cff"),W(o,i,w=>1-.65*l.phi*w,"#e66cff"),W(o,i,w=>h.r0+(.08-h.r0)*w*(1-.6*h.phi),"#5b9cff",1.4,[4,3]),W(o,i,w=>l.r0+(.08-l.r0)*w*(1-.6*l.phi),"#e66cff",1.4,[4,3]),K(o,i,c.hk.data,"#ffffff",1.8),K(o,i,c.hr.data,"#facc15",1.8);const S={...p,x0:0,x1:1,y0:0,y1:.8};ut(o,S,"웅덩이 넓이 = F(τ(w))","비 w",[0,.5,1],[0,.4,.8],w=>`${Math.round(w*100)}%`),W(o,S,w=>dt(x.sorted,U(w)),"#c8d0dc",1.8),K(o,S,c.hp.data,"#38d9d9",2.2),Ct(o,[{label:`돌 φ${h.phi.toFixed(2)}`,color:"#5b9cff"},{label:`줄눈 φ${l.phi.toFixed(2)}`,color:"#e66cff"},{label:"측정 k",color:"#ffffff"},{label:"측정 r",color:"#facc15"},{label:"측정 웅덩이",color:"#38d9d9"}],8,d-4,9),t.hud("")}}))}const oo={layout:"compare",intro:"비 오는 밤거리가 멋진 이유는 <b>바닥이 거울처럼 네온을 비추기</b> 때문입니다. 젖은 표면은 물을 머금어 <b>색이 어두워지고</b>(다공성), 표면에 남은 물막 때문에 <b>매끈해져</b> 반사가 선명해지며, 낮은 곳에는 <b>웅덩이</b>가 고여 빗방울 파문이 생깁니다. 같은 골목을 건조 / 균일하게 젖음 / 다공성 + 웅덩이로 비교합니다.",how:["재질마다 다공성 φ를 둔다(돌 0.2~0.5, 줄눈 0.9). 비의 양 w에 대해 알베도를 <code>k = 1 − 0.65·φ·w</code>배로 – 물을 잘 먹는 줄눈이 더 어두워진다.","거칠기는 <code>r = mix(r₀, 0.08, w·(1 − 0.6φ))</code>: 물이 표면에 남는 매끈한 돌일수록 광택이 빨리 생긴다. 반사는 GGX 점광원 + 벽 평면과의 교차로 구한 네온 반사(거칠기만큼 흐림).","웅덩이는 높이 h(노이즈 + 가운데가 살짝 낮은 지면)가 수위 τ(w)보다 낮은 곳: 비가 25% 아래면 가장 낮은 곳에만 고이고, 넘으면 수위가 올라 웅덩이가 넓어진다. 덮인 넓이는 노이즈 분포의 CDF <code>F(τ)</code>.","웅덩이 안은 거칠기 0.03, 법선은 칸마다 무작위 시각에 퍼지는 동심원 파문으로 흔든다 → 네온 반사가 일렁인다.","측정: 같은 GLSL 함수를 바닥 64×64 격자에서 GPU로 평가해 (k, r, 웅덩이)를 읽고, k·r은 같은 해시의 CPU 복제와, 웅덩이 넓이는 무작위 2만 점으로 구한 F(τ)와 비교."],pros:["텍스처 추가 없이 날씨 값 하나로 모든 바닥을 점진적으로 적실 수 있다.","다공성 차이 덕분에 줄눈·돌 무늬가 젖을수록 오히려 또렷해지는 사실적 변화.","웅덩이를 노이즈 문턱으로 정하면 수위만 올려도 자연스럽게 번진다."],cons:["반사 품질은 결국 반사 기법(SSR, 평면 반사, 큐브맵)에 달렸다. 이 데모는 벽 평면 하나만 해석적으로 반사한다.","웅덩이는 실제 높이(오목한 곳)와 맞춰야 한다. 노이즈만 쓰면 언덕 위에 물이 고일 수 있다.","물이 빠지는(마르는) 과정은 젖는 과정과 속도가 달라 별도 상태가 필요하다."],usedIn:"〈사이버펑크 2077〉, 〈GTA V〉의 비 오는 밤거리처럼 다공성 어두워짐 + 거칠기 감소 + 웅덩이 마스크 조합은 현세대 날씨 렌더링에서 널리 쓰입니다(세바스티앙 라가르드의 젖은 표면 연구가 자주 인용됨). 실제 수치는 게임마다 다릅니다.",tips:["금속·유리·플라스틱처럼 물을 먹지 않는 표면은 어두워지지 않고 거칠기만 줄인다. 다공성이 큰 흙·줄눈은 알베도가 절반 안팎까지 떨어진다 (이 페이지 최대 0.42배).","웅덩이는 물의 F0 ≈ 0.02(굴절률 1.33)를 쓴다. 정면에선 거의 안 비치고 낮은 시선각에서만 강하게 비친다 – 카메라를 낮출수록 비 오는 밤 느낌이 산다.","반사가 핵심이므로 SSR이나 평면 반사와 짝지어야 한다. 반사할 밝은 네온·가로등이 화면 위쪽에 없으면 젖은 바닥이 그냥 검게 보인다.","빗방울 파문 법선은 웅덩이 안에만 적용하고, 비의 세기로 파문 밀도·속도를 올린다. 비가 그치면 파문을 먼저 끄고 젖음은 더 천천히 줄인다."],related:["ssr","pbr-material","stylized-water","snow-accumulation","caustics"],controls:[{type:"toggle",key:"auto",label:"비가 내렸다 그쳤다 (자동)",value:!0},{type:"range",key:"w",label:"비의 양 w (자동 끔일 때)",min:0,max:1,step:.01,value:.7}],viewers:[{title:"건조",kind:"before",caption:"같은 조명의 마른 돌바닥입니다. 거칠어서 네온은 바닥에 뿌연 빛 얼룩으로만 번집니다.",mount:J("dry")},{title:"균일하게 젖음",kind:"variant",caption:"모든 곳을 같은 φ로 어둡게, 매끈하게 했습니다. 반사는 생기지만 바닥 전체가 플라스틱처럼 고르게 번들거립니다.",mount:J("uniform")},{title:"다공성 + 웅덩이",kind:"after",caption:"줄눈은 더 어둡고 덜 번들거리고, 낮은 곳에 고인 웅덩이는 거울처럼 네온을 비추며 빗방울 파문으로 일렁입니다.",mount:J("porous")},{title:"재질 값 · 웅덩이 측정",kind:"info",caption:"왼쪽: 돌·줄눈 텍셀에서 GPU로 읽은 k(흰 점)·r(노란 점)과 공식(실선 k, 점선 r). 오른쪽: 웅덩이 넓이(점)와 노이즈 CDF F(τ(w))(선).",mount:Kt}]};export{oo as default};
