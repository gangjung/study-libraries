import{q as $t,aj as Pt,W as Bt,L as dt,Q as Lt,V as X,M as B,c as wt,S as Ft,B as Ht,u as Gt,H as Ut,y as At,g as U,h as Dt,e as ct,a as mt,b as It,T as _t}from"./three.module-CEzfHhrp.js";import{m as zt}from"./three-viewer-fx7lDL-0.js";import{m as Et,b as Y,a as Ct}from"./canvas-viewer-QtaWfmlz.js";import{c as C}from"./fx-CIZ4XT9q.js";import{c as Ot,t as I,l as vt}from"./chart2d-DfgeckAJ.js";import{h as Vt,P as Mt,a as v}from"./extra-kit-c-FPjCbN4U.js";import{g,F as jt}from"./env-kit-BSefkVuG.js";const Z=6360,et=6420,K=8,Q=1.2,st=.2,q=[.0058,.0135,.0331],ft=.021,at=ft/.9,_=.76,bt=20,nt=24,Rt=8,lt=32,H=.35,Nt=192,qt=108,F=8,xt=[680,550,440],ot=q[2]/q[0],St=`
const float R0 = ${g(Z)};
const float RA = ${g(et)};
const vec3 BR = vec3(${q.map(g).join(", ")});
const float BM = ${g(ft)};
const float BME = ${g(at)};
const float PI = 3.14159265;
uniform float uMie;
float farSphere(vec3 p, vec3 d, float r) {
  float b = dot(p, d);
  float c = dot(p, p) - r * r;
  float disc = max(b * b - c, 0.0);
  return -b + sqrt(disc);
}
float groundHit(vec3 p, vec3 d) {
  float b = dot(p, d);
  float c = dot(p, p) - R0 * R0;
  float disc = b * b - c;
  if (disc < 0.0) return -1.0;
  return -b - sqrt(disc);
}
vec2 odepth(vec3 p, vec3 d, float len, int n) {
  float ds = len / float(n);
  vec2 od = vec2(0.0);
  for (int j = 0; j < ${lt}; j++) {
    if (j >= n) break;
    vec3 q = p + d * ((float(j) + 0.5) * ds);
    float h = length(q) - R0;
    od += vec2(exp(-h / ${g(K)}), exp(-h / ${g(Q)})) * ds;
  }
  return od;
}
vec3 transmit(vec3 p, vec3 d) {
  if (groundHit(p, d) > 0.0) return vec3(0.0);
  vec2 od = odepth(p, d, farSphere(p, d, RA), ${lt});
  return exp(-(BR * od.x + uMie * BME * od.y));
}
vec3 atmo(vec3 ro, vec3 rd, vec3 sd) {
  float tMax = farSphere(ro, rd, RA);
  float tg = groundHit(ro, rd);
  if (tg > 0.0) tMax = tg;
  float ds = tMax / ${g(nt)};
  vec2 odV = vec2(0.0);
  vec3 sR = vec3(0.0);
  vec3 sM = vec3(0.0);
  for (int i = 0; i < ${nt}; i++) {
    vec3 p = ro + rd * ((float(i) + 0.5) * ds);
    float h = length(p) - R0;
    vec2 dd = vec2(exp(-h / ${g(K)}), exp(-h / ${g(Q)})) * ds;
    odV += dd;
    if (groundHit(p, sd) > 0.0) continue;
    vec2 odL = odepth(p, sd, farSphere(p, sd, RA), ${Rt});
    vec3 att = exp(-(BR * (odV.x + odL.x) + uMie * BME * (odV.y + odL.y)));
    sR += att * dd.x;
    sM += att * dd.y;
  }
  float mu = dot(rd, sd);
  float pR = 3.0 / (16.0 * PI) * (1.0 + mu * mu);
  float g = ${g(_)};
  float pM = 3.0 / (8.0 * PI) * (1.0 - g * g) * (1.0 + mu * mu) / ((2.0 + g * g) * pow(1.0 + g * g - 2.0 * g * mu, 1.5));
  return ${g(bt)} * (sR * BR * pR + uMie * sM * BM * pM);
}
const vec3 RO = vec3(0.0, R0 + ${g(st)}, 0.0);
`,Wt=`
${St}
uniform vec3 uSun;
varying vec2 vUv;
void main() {
  float phi = (vUv.x - 0.5) * 2.0 * PI;
  float s = vUv.y * 2.0 - 1.0;
  float el = sign(s) * s * s * PI * 0.5;
  vec3 d = vec3(cos(el) * cos(phi), sin(el), cos(el) * sin(phi));
  gl_FragColor = vec4(atmo(RO, d, uSun), 1.0);
}`,Yt=`
${St}
uniform vec3 uSun;
uniform vec3 uDirs[${F}];
uniform float uEnc;
void main() {
  int i = int(gl_FragCoord.x);
  vec3 c = i == ${F-1} ? transmit(RO, uSun) : atmo(RO, normalize(uDirs[i]), uSun);
  gl_FragColor = vec4(c * uEnc, 1.0);
}`,Zt=`
varying vec3 vDir;
void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Kt=`
uniform sampler2D tLut;
uniform vec3 uSun, uSunT, uFlatH, uFlatZ;
uniform float uMode;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  vec3 col;
  if (uMode < 0.5) {
    col = mix(uFlatH, uFlatZ, pow(clamp(d.y, 0.0, 1.0), 0.6));
    if (d.y < 0.0) col = uFlatH * 0.6;
  } else {
    float el = asin(clamp(d.y, -1.0, 1.0));
    float v = 0.5 + 0.5 * sign(el) * sqrt(abs(el) / 1.5707963);
    float u = atan(d.z, d.x) / 6.2831853 + 0.5;
    col = texture2D(tLut, vec2(u, v)).rgb;
    if (uMode > 1.5) {
      float c = dot(d, uSun);
      float r = acos(clamp(c, -1.0, 1.0)) / 0.02;
      float disk = 1.0 - smoothstep(0.85, 1.0, r);
      float limb = 0.6 + 0.4 * sqrt(max(0.0, 1.0 - r * r));
      col += uSunT * disk * limb * 60.0;
    }
  }
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,J=(o,e)=>o[0]*e[0]+o[1]*e[1]+o[2]*e[2];function it(o,e,t){const a=J(o,e),c=J(o,o)-t*t;return-a+Math.sqrt(Math.max(a*a-c,0))}function ut(o,e){const t=J(o,e),a=J(o,o)-Z*Z,c=t*t-a;return c<0?-1:-t-Math.sqrt(c)}function gt(o,e,t,a){const c=t/a;let i=0,y=0;for(let M=0;M<a;M++){const w=(M+.5)*c,s=Math.hypot(o[0]+e[0]*w,o[1]+e[1]*w,o[2]+e[2]*w)-Z;i+=Math.exp(-s/K)*c,y+=Math.exp(-s/Q)*c}return[i,y]}const E=[0,Z+st,0];function kt(o,e){if(ut(E,o)>0)return[0,0,0];const[t,a]=gt(E,o,it(E,o,et),lt);return[0,1,2].map(c=>Math.exp(-(q[c]*t+e*at*a)))}function N(o,e,t){let a=it(E,o,et);const c=ut(E,o);c>0&&(a=c);const i=a/nt;let y=0,M=0;const w=[0,0,0],s=[0,0,0];for(let u=0;u<nt;u++){const r=(u+.5)*i,h=[E[0]+o[0]*r,E[1]+o[1]*r,E[2]+o[2]*r],f=Math.hypot(h[0],h[1],h[2])-Z,x=Math.exp(-f/K)*i,R=Math.exp(-f/Q)*i;if(y+=x,M+=R,ut(h,e)>0)continue;const[k,G]=gt(h,e,it(h,e,et),Rt);for(let m=0;m<3;m++){const A=Math.exp(-(q[m]*(y+k)+t*at*(M+G)));w[m]+=A*x,s[m]+=A*R}}const l=J(o,e),L=3/(16*Math.PI)*(1+l*l),b=3/(8*Math.PI)*(1-_*_)*(1+l*l)/((2+_*_)*Math.pow(1+_*_-2*_*l,1.5));return[0,1,2].map(u=>bt*(w[u]*q[u]*L+t*s[u]*ft*b))}function Tt(o,e){if(o<-.5)return[0,0,0];const t=Math.max(o,-.5),a=1/(Math.sin(t*Math.PI/180)+.50572*Math.pow(t+6.07995,-1.6364)),c=K*Math.exp(-st/K),i=Q*Math.exp(-st/Q);return[0,1,2].map(y=>Math.exp(-(q[y]*c+e*at*i)*a))}const ht=o=>{const e=o*Math.PI/180;return[Math.cos(e)*Math.sin(H),Math.sin(e),-Math.cos(e)*Math.cos(H)]},z=(o,e)=>{const t=o*Math.PI/180;return[Math.cos(t)*Math.sin(e),Math.sin(t),-Math.cos(t)*Math.cos(e)]},Qt=o=>[[0,1,0],z(2,H),z(2,H+Math.PI),z(30,H),z(30,H+Math.PI/2),z(10,H),z(Math.max(-1,o+5),H)],yt=o=>.2126*o[0]+.7152*o[1]+.0722*o[2],$=o=>o[2]/Math.max(1e-6,o[0]);function Xt(o,e){if(!o.params.bool("auto",!0))return o.params.num("elev",6);const t=e*.045%1,a=.5-.5*Math.cos(t*Math.PI*2);return-5+65*Math.pow(1-a,1.8)}const pt=o=>{let e=o.shared.get("sky");return e||(e={t:0,last:-1,elev:6,meas:{}},o.shared.set("sky",e)),e};function Jt(o,e){const t=pt(o);if(t.last!==e){const a=t.last<0?.016666666666666666:Math.min(.05,Math.max(0,(e-t.last)/1e3));t.last=e,t.t+=a,t.elev=Xt(o,t.t)}return t}function to(o){const e=Ct(7),t=new B(new At(160,48),new U({color:9214570,roughness:1}));t.rotation.x=-Math.PI/2,t.receiveShadow=!0,o.add(t);const a=new U({color:15261904,roughness:.9}),c=[11818300,5205928,8018490].map(u=>new U({color:u,roughness:.8})),i=u=>(u.castShadow=!0,u.receiveShadow=!0,o.add(u),u);for(let u=0;u<9;u++){const r=-14+u*3.6+(e()-.5)*1.2,h=-10-e()*16,f=1.8+e()*1.4,x=1.6+e()*1.6;i(new B(new Dt(f,x,f*1.1),a)).position.set(r,x/2,h);const k=i(new B(new ct(f*.85,1.2,4),c[u%3]));k.position.set(r,x+.6,h),k.rotation.y=Math.PI/4}i(new B(new mt(.9,1.3,9,16),new U({color:13616821,roughness:.85}))).position.set(7,4.5,-18),i(new B(new ct(1.3,1.6,16),c[0])).position.set(7,9.8,-18);const w=new U({color:4156218,roughness:1,flatShading:!0}),s=new U({color:5914672,roughness:1});for(let u=0;u<16;u++){const r=(e()-.5)*36,h=-3-e()*26;if(Math.abs(r-7)<2.5&&Math.abs(h+18)<2.5)continue;const f=.7+e()*.7;i(new B(new mt(.1*f,.16*f,1.2*f,6),s)).position.set(r,.6*f,h),i(new B(new ct(.8*f,2.2*f,7),w)).position.set(r,2.1*f,h)}i(new B(new It(.28,.8,4,12),new U({color:3820154,roughness:.7}))).position.set(-1.2,.7,4),i(new B(new wt(.24,20,14),new U({color:15780008,roughness:.6}))).position.set(-1.2,1.55,4);const b=i(new B(new _t(.22,.07,8,16),new U({color:13777980,roughness:.8})));b.position.set(-1.2,1.3,4),b.rotation.x=Math.PI/2}function rt(o){return e=>zt(e,{antialias:!0,orbit:!1,fov:62,cam:[0,1.7,12],far:600},({scene:t,camera:a,renderer:c})=>{c.toneMapping=$t,c.shadowMap.enabled=!0,c.shadowMap.type=Pt,c.shadowMap.autoUpdate=!1,t.background=null,to(t);const i=o==="full"?1:0,y=new Bt(Nt,qt,{type:Vt(c),depthBuffer:!1,wrapS:Lt,minFilter:dt,magFilter:dt}),M=new X,w=new Mt(Wt,{uSun:{value:M},uMie:{value:i}}),s=new jt(c,F,1,4),l=Array.from({length:F},()=>new X(0,1,0)),L=new Mt(Yt,{uSun:{value:M},uMie:{value:i},uDirs:{value:l},uEnc:{value:s.enc}}),b={tLut:{value:y.texture},uSun:{value:M},uSunT:{value:new X},uFlatH:{value:new X(.62,.74,.95)},uFlatZ:{value:new X(.16,.34,.78)},uMode:{value:o==="flat"?0:o==="ray"?1:2}},u=new B(new wt(400,48,24),new Ft({vertexShader:Zt,fragmentShader:Kt,uniforms:b,side:Ht,depthWrite:!1,toneMapped:!0}));u.renderOrder=-10,u.frustumCulled=!1,t.add(u);const r=new Gt(16777215,3);r.castShadow=!0,r.shadow.mapSize.set(1024,1024);const h=r.shadow.camera;h.left=-26,h.right=26,h.top=26,h.bottom=-26,h.near=1,h.far=120,r.shadow.bias=-6e-4,r.shadow.normalBias=.03,t.add(r,r.target),r.target.position.set(0,0,-10);const f=new Ut(8952268,3815978,1);t.add(f);let x=0,R=NaN,k=null,G=[],m=[1,1,1];const A=n=>{const d=ht(n);M.set(d[0],d[1],d[2]);const S=Qt(n);S.forEach((p,P)=>l[P].set(p[0],p[1],p[2])),m=kt(d,o==="flat"?1:i),G=[...S.map(p=>N(p,d,i)),m],b.uSunT.value.set(m[0],m[1],m[2]),r.position.set(30*d[0],Math.max(.5,30*d[1]),-10+30*d[2]);const O=C((n+4)/10,0,1);if(o==="flat"){const p=.04+.96*O;b.uFlatH.value.set(.62,.74,.95).multiplyScalar(p),b.uFlatZ.value.set(.16,.34,.78).multiplyScalar(p),r.color.setRGB(1,.97,.92),r.intensity=3.2*C(n/6,0,1),f.color.setRGB(.55,.65,.9),f.intensity=1.2*p,c.toneMappingExposure=1}else{r.color.setRGB(m[0],m[1],m[2]),r.intensity=3.2;const p=G[0],P=Math.max(1e-4,yt(p));f.color.setRGB(p[0]/P,p[1]/P,p[2]/P),f.intensity=C(P*7,.03,1.6);const V=yt(N([0,1,0],d,1));c.toneMappingExposure=C(.65/Math.pow(Math.max(V,1e-4),.55),.6,9)*e.params.num("expo",1)}c.shadowMap.needsUpdate=!0};return{update(n,d,S){const O=Jt(e,S),p=O.elev;(p!==R&&x%2===0||x%30===0||Number.isNaN(R))&&(A(p),R=p);const P=Math.sin(O.t*.12)*.32+.12;a.position.set(Math.sin(O.t*.12)*1.5,1.7,12),a.lookAt(a.position.x+Math.sin(P)*10,1.7+10*Math.tan(.24),a.position.z-Math.cos(P)*10);const V=ht(p),T=[`해 고도 ${p.toFixed(1)}°`];if(o==="flat"){const W=b.uFlatZ.value,D=b.uFlatH.value;T.push(`고정 그라데이션 · 천정 B/R ${v(W.z/Math.max(1e-6,W.x))} · 지평 B/R ${v(D.z/Math.max(1e-6,D.x))} (해 고도와 무관)`);const j=N([0,1,0],V,1),tt=N(z(2,H),V,1);T.push(`산란이라면: 천정 ${v($(j))} · 해 쪽 지평 ${v($(tt))}`)}else if(!k)T.push("측정 준비 중…");else{const W=k,D=G;T.push(`천정 B/R 측정 ${v($(W[0]))} / 이론 ${v($(D[0]))}  (얇은 한계 λ⁻⁴ ${v(ot)})`),T.push(`해 쪽 지평 B/R 측정 ${v($(W[1]))} / 이론 ${v($(D[1]))}`);const j=W[F-1];if(o==="full"){const tt=Tt(p,1);T.push(`태양 투과 T_B 측정 ${v(j[2])} / e^(−τ·m) ${v(tt[2])} · T_R ${v(j[0])} / ${v(tt[0])}`)}else T.push(`태양 투과 RGB 측정 ${v(j[0])} ${v(j[1])} ${v(j[2])} / 이론 ${v(D[F-1][0])} ${v(D[F-1][1])} ${v(D[F-1][2])}`)}e.hud(T.join(`
`))},render(){if(x++,o!=="flat"&&w.render(c,y),o!=="flat"&&x%8===1){L.render(c,s.rt);const n=s.read(c);k=Array.from({length:F},(d,S)=>[n[S*4],n[S*4+1],n[S*4+2]]),pt(e).meas[o]=k}c.setRenderTarget(null),c.render(t,a)},dispose(){y.dispose(),w.dispose(),L.dispose(),s.dispose()}}})}function oo(){const o=[];for(let t=-2;t<=60.001;t+=1.5)o.push(t);const e={key:"",els:o,zen:[],hor:[],zenR:[],T:[],KY:[]};for(const t of o){const a=ht(t);e.zen.push($(N([0,1,0],a,1))),e.hor.push($(N(z(2,H),a,1))),e.zenR.push($(N([0,1,0],a,0))),e.T.push(kt(a,1)),e.KY.push(Tt(t,1))}return e}function eo(o){const e=oo();return Et(o,()=>({draw(t,a,c){Ot(t,a,c);const i=pt(o),y=a>=560,M=y?(a-30)/2:a,w=y?c:c/2,s={x:40,y:22,w:Y(M-52,20),h:Y(w-50,20)},l=y?{x:M+40,y:22,w:Y(M-52,20),h:Y(w-50,20)}:{x:40,y:w+22,w:Y(M-52,20),h:Y(w-50,20)},L=(n,d)=>n.x+(d+2)/62*n.w,b=Math.log(.05),u=Math.log(12),r=n=>s.y+s.h-(Math.log(C(n,.05,12))-b)/(u-b)*s.h;t.strokeStyle="#1c2230",t.strokeRect(s.x+.5,s.y+.5,s.w,s.h);for(const n of[.1,1,10])t.beginPath(),t.moveTo(s.x,r(n)),t.lineTo(s.x+s.w,r(n)),t.stroke(),I(t,String(n),s.x-3,r(n)+3,"#7d8799",9,"right");const h=(n,d,S,O,p=[],P=1.6)=>{t.strokeStyle=O,t.lineWidth=P,t.setLineDash(p),t.beginPath(),e.els.forEach((V,T)=>T?t.lineTo(L(n,V),S(d[T])):t.moveTo(L(n,V),S(d[T]))),t.stroke(),t.setLineDash([]),t.lineWidth=1};t.strokeStyle="#e66cff",t.setLineDash([5,4]),t.beginPath(),t.moveTo(s.x,r(ot)),t.lineTo(s.x+s.w,r(ot)),t.stroke(),t.setLineDash([]),I(t,`λ⁻⁴: (680/440)⁴ = ${((xt[0]/xt[2])**4).toFixed(2)}`,s.x+s.w-2,r(ot)-4,"#e66cff",9,"right"),h(s,e.zenR,r,"#9aa3b2",[3,3],1),h(s,e.zen,r,"#5b9cff"),h(s,e.hor,r,"#ff9a3c");const f=L(s,C(i.elev,-2,60));t.strokeStyle="rgba(255,255,255,0.25)",t.beginPath(),t.moveTo(f,s.y),t.lineTo(f,s.y+s.h),t.stroke();const x=(n,d,S)=>{t.fillStyle=S,t.beginPath(),t.arc(n,d,3.5,0,Math.PI*2),t.fill(),t.strokeStyle="#fff",t.stroke()},R=i.meas.full,k=i.meas.ray;R&&(x(f,r($(R[0])),"#5b9cff"),x(f,r($(R[1])),"#ff9a3c")),k&&x(f,r($(k[0])),"#9aa3b2"),I(t,"하늘 색 B/R 비 vs 해 고도",s.x,14,"#c8d0dc",10),I(t,"−2°",s.x,s.y+s.h+11,"#7d8799",9),I(t,"해 고도 60°",s.x+s.w,s.y+s.h+11,"#7d8799",9,"right"),vt(t,[{label:"천정",color:"#5b9cff"},{label:"해 쪽 지평",color:"#ff9a3c"},{label:"천정(레일리만)",color:"#9aa3b2"},{label:"GPU 측정 ●",color:"#ffffff"}],s.x,s.y+s.h+24,9);const G=n=>l.y+l.h-C(n,0,1)*l.h;t.strokeStyle="#1c2230",t.strokeRect(l.x+.5,l.y+.5,l.w,l.h);const m=["#f87171","#4ade80","#5b9cff"];for(let n=0;n<3;n++)h(l,e.T.map(d=>d[n]),G,m[n]),h(l,e.KY.map(d=>d[n]),G,m[n],[2,3],1);const A=L(l,C(i.elev,-2,60));if(t.strokeStyle="rgba(255,255,255,0.25)",t.beginPath(),t.moveTo(A,l.y),t.lineTo(A,l.y+l.h),t.stroke(),R)for(let n=0;n<3;n++)x(A,G(R[F-1][n]),m[n]);I(t,"1",l.x-3,l.y+8,"#7d8799",9,"right"),I(t,"0",l.x-3,l.y+l.h,"#7d8799",9,"right"),I(t,"태양 투과율 T(λ) — 실선 수치적분 · 점선 e^(−τ·m)",l.x,l.y-8,"#c8d0dc",10),vt(t,[{label:"R 680",color:m[0]},{label:"G 550",color:m[1]},{label:"B 440 nm",color:m[2]}],l.x,l.y+l.h+24,9),o.hud("")}}))}const uo={layout:"variants",intro:'<b>하늘 산란</b>은 "왜 낮 하늘은 파랗고 노을은 붉은가"를 그대로 계산해 하늘과 햇빛 색을 만드는 연출입니다. 공기 분자는 짧은 파장(파랑)을 λ⁻⁴ 비율로 훨씬 많이 흩뜨리고(<b>레일리 산란</b>), 먼지·물방울은 파장과 거의 무관하게 앞쪽으로 흩뜨립니다(<b>미 산란</b> → 해 주변 흰 후광). 해가 낮아지면 햇빛이 두꺼운 대기를 지나며 파랑을 잃어 <b>주황빛 햇살과 붉은 지평선</b>이 됩니다. 시간대 하나로 장면 전체의 감정이 바뀌는 이유입니다. 여기서는 고정 그라데이션 / 레일리만 / 레일리+미+해 원반을 같은 마을, 같은 해 고도로 비교합니다.',how:["하늘을 반지름 6360 km 행성 + 60 km 대기로 둔다. 밀도는 고도 h에 따라 <code>ρ(h) = e^{−h/H}</code> (공기 분자 H = 8 km, 에어로졸 H = 1.2 km).","시선 방향으로 24점을 걸으며, 점마다 해 쪽으로 8점을 더 걸어 광학 깊이 τ를 구한다. 그 점이 받은 햇빛 <code>e^{−τ(해→p)}</code>가 산란되고 다시 <code>e^{−τ(p→눈)}</code>만큼 줄어 눈에 온다.","레일리 계수 <code>βR = (5.8, 13.5, 33.1)×10⁻³/km</code> (680·550·440 nm, ∝ λ⁻⁴), 위상 함수 <code>3/(16π)(1+μ²)</code>. 미는 <code>βM = 21×10⁻³/km</code>(소멸은 그 1/0.9배), 코넷–섕크스 위상(헤니–그린스타인을 고친 식, g = 0.76)이라 해 주변으로 몰린다.",'이 적분을 매 프레임 192×108 "하늘 시야 LUT"(방위 × 고도, 지평선 근처를 촘촘히)에 계산하고, 하늘 돔은 LUT만 읽는다 → 화면 픽셀마다 적분하지 않아 싸다.',"태양 원반 색 = 투과율 <code>T = e^{−τ}</code> (해 방향 32점 적분). 같은 T로 방향광 색을, 천정 하늘색으로 반구광 색을 정해 장면 조명도 하늘과 맞춘다.","HUD 측정: 같은 GLSL 함수로 천정·지평선·해 근처 방향과 태양 투과율을 8×1 실수 타깃에 그려 읽는다. 이론 = 같은 적분의 CPU 계산 + 얇은 대기 한계 βB/βR = (680/440)⁴ ≈ 5.7, 투과 e^{−τ·m} (τ = 연직 광학 깊이, m = Kasten–Young 공기질량 경험식 – 해가 지평선에 닿으면 수치 적분과 조금 어긋난다)."],pros:["해 고도 하나만 바꾸면 하늘색·햇빛색·그림자 길이·노을이 물리적으로 일관되게 따라온다 – 낮밤 순환과 시간대 연출이 거의 공짜.","LUT에 미리 적분하면 픽셀당 비용은 텍스처 한 번 읽기. 산란 계수·밀도만 바꿔 외계 행성·오염된 도시·먼지 폭풍 하늘도 만든다.","같은 투과율 함수로 먼 산의 대기 원근(공중 원근감)까지 이어서 계산할 수 있다."],cons:["단일 산란만이라 해가 진 뒤의 푸른 시간(다중 산란)이 너무 어둡게 나온다 – 실전은 다중 산란 LUT(Hillaire 2020)나 보정 항을 더한다.","표본 수가 적으면 해 질 녘 지평선에 띠가 생긴다. 고도 축을 비선형으로 잡아 지평선 쪽을 촘촘히 하는 이유.",'"물리적으로 맞는" 하늘이 항상 "원하는 분위기"는 아니다 – 아트 디렉션용 색 보정·노출 커브를 위에 얹어야 한다.'],usedIn:"언리얼 엔진 Sky Atmosphere(Hillaire 2020), 유니티 HDRP Physically Based Sky, 프로스트바이트 엔진의 물리 기반 하늘(Hillaire 2016), 〈레드 데드 리뎀션 2〉의 대기·노을, 〈마이크로소프트 플라이트 시뮬레이터〉 등 낮밤이 도는 오픈월드 게임 전반.",tips:["하늘색은 해 고도 0~10°(골든 아워)에서 가장 빠르게 변한다. 낮밤 순환은 이 구간을 천천히, 한낮은 빠르게 흘려야 노을을 오래 볼 수 있다 (이 페이지의 자동 순환도 그렇게 돈다).","LUT는 고도 축을 비선형(√)으로 잡아 지평선 근처에 표본을 몰아준다. 해가 움직일 때만 다시 굽거나 몇 프레임에 나눠 구우면 비용이 거의 사라진다.","방향광 색 = 태양 투과율, 반구광 색 = 천정 하늘색으로 묶어 둔다. 하늘만 붉고 지면은 하얀 어긋남이 없어진다.","해가 지면 하늘 휘도가 크게 떨어진다. 자동 노출(눈 순응)과 톤 매핑을 함께 써야 해 질 녘 색이 검게 묻히지 않는다."],related:["atmospheric-perspective","color-script","eye-adaptation","volumetric-fog","tonemapping"],controls:[{type:"toggle",key:"auto",label:"하루 자동 순환",value:!0},{type:"range",key:"elev",label:"해 고도 (°, 자동 끔일 때)",min:-5,max:70,step:.5,value:4},{type:"range",key:"expo",label:"노출 보정 (배)",min:.4,max:2.5,step:.05,value:1}],viewers:[{title:"고정 그라데이션 하늘",kind:"before",caption:"위는 파랑, 아래는 연파랑인 흔한 그라데이션. 해가 져도 밝기만 줄 뿐 노을이 없고, 햇빛도 흰색 그대로라 시간대 느낌이 나지 않습니다.",mount:rt("flat")},{title:"레일리 산란만",kind:"variant",caption:"공기 분자 산란만 계산. 낮엔 천정이 짙은 파랑, 해가 낮아지면 지평선이 주황으로 물듭니다. 다만 먼지가 없어 해 주변 후광이 없고 하늘이 지나치게 맑습니다.",mount:rt("ray")},{title:"레일리 + 미 + 해 원반",kind:"after",caption:"에어로졸(미) 산란이 해 주변에 흰 후광을, 지평선엔 옅은 연무를 더합니다. 태양 원반과 방향광 색이 같은 투과율이라, 노을 때 마을 전체가 주황빛으로 물듭니다.",mount:rt("full")},{title:"색 비율 · 투과율 vs 해 고도",kind:"info",caption:"왼쪽: 천정은 해가 높을 때 B/R ≈ 3 안팎(레일리만이면 4 안팎) – λ⁻⁴ 한계 5.7보다 낮은 것은 파랑이 오는 길에 다시 산란돼 줄기 때문입니다. 해 쪽 지평선은 해가 낮아질수록 B/R이 1보다 훨씬 아래로(5°에서 ≈ 0.07) 떨어져 붉어집니다. 오른쪽: 해가 낮을수록 파랑부터 투과율이 무너집니다. ● = GPU 측정.",mount:eo}]};export{uo as default};
