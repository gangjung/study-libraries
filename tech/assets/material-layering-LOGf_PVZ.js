import{B as Et,aM as Bt,ac as Pt,ag as Vt,ah as _t,ad as Wt,ai as qt,L as It,aG as Gt,n as Ht,aH as jt,g as G,p as Ot,k as mt,u as ft,M as ot,aQ as Nt,P as Mt,o as Yt,bl as Qt,ab as Xt,m as wt}from"./three.module-BZgG6AUv.js";import{m as Zt}from"./three-viewer-0rZIEDzf.js";import{F as Tt,W as Jt}from"./shade-CcOaBxDj.js";import{Q as Kt}from"./glsl-DOwCk4-f.js";const J=512,ht=256,te=2,K=256,gt=20;function R(t,e,r){let i=Math.imul(t,374761393)^Math.imul(e,668265263)^Math.imul(r,1442695041);return i=Math.imul(i^i>>>13,1274126177),i^=i>>>16,(i>>>0)/4294967296}const O=t=>t*t*(3-2*t);function ee(t,e,r,i,n){const a=t*r,s=e*i,l=Math.floor(a),o=Math.floor(s),c=O(a-l),u=O(s-o),m=(l%r+r)%r,v=(o%i+i)%i,y=(m+1)%r,w=(v+1)%i,L=R(m,v,n),D=R(y,v,n),k=R(m,w,n),F=R(y,w,n);return L+(D-L)*c+(k-L)*u+(L-D-k+F)*c*u}function $(t,e,r,i,n,a=r){let s=0,l=.5,o=0;for(let c=0;c<i;c++)s+=l*ee(t,e,r<<c,a<<c,n+c*31),o+=l,l*=.5;return s/o}const z=t=>t<0?0:t>1?1:t,P=(t,e,r)=>O(z((r-t)/(e-t))),S=(t,e,r)=>t+(e-t)*r;function yt(t,e,r,i,n){const a=(s,l)=>(n?(s=(s+e)%e,l=(l+e)%e):(s=s<0?0:s>=e?e-1:s,l=l<0?0:l>=e?e-1:l),t[l*e+s]);for(let s=0;s<e;s++)for(let l=0;l<e;l++){const o=(a(l+1,s)-a(l-1,s))*.5*r,c=(a(l,s+1)-a(l,s-1))*.5*r,u=1/Math.hypot(o,c,1),m=(s*e+l)*4;i[m]=Math.round((-o*u*.5+.5)*255),i[m+1]=Math.round((-c*u*.5+.5)*255)}}function Q(t,e,r,i){const n=new Float32Array(t.length),a=new Float32Array(t.length),s=o=>o<0?0:o>=e?e-1:o,l=1/(2*r+1);for(let o=0;o<e;o++)for(let c=0;c<e;c++){let u=0;for(let m=-r;m<=r;m++)u+=t[o*e+s(c+m)];n[o*e+c]=u*l}for(let o=0;o<e;o++)for(let c=0;c<e;c++){let u=0;for(let m=-r;m<=r;m++)u+=n[s(o+m)*e+c];a[o*e+c]=u*l}return a}function X(t,e){const r=t.getContext("2d").getImageData(0,0,e,e).data,i=new Float32Array(e*e);for(let n=0;n<e;n++)for(let a=0;a<e;a++)i[n*e+a]=r[((e-1-n)*e+a)*4]/255;return i}function rt(t){const e=document.createElement("canvas");return e.width=e.height=t,e}function oe(){const t=J,e=34,r=6.5,i=rt(t),n=i.getContext("2d"),a=d=>`rgb(${d},${d},${d})`;n.fillStyle=a(200),n.fillRect(0,0,t,t),n.fillStyle=a(105),n.fillRect(e,e,t-e*2,t-e*2),n.fillStyle=a(185),n.fillRect(e,t/2-15,t-e*2,30);const s=[];for(let d=0;d<=10;d++){const b=e/2+(t-e)*d/10;s.push([b,e/2],[b,t-e/2]),d>0&&d<10&&s.push([e/2,b],[t-e/2,b])}for(let d=1;d<8;d++)s.push([e+(t-2*e)*d/8,t/2]);const l=X(i,t);let o=Q(Q(l,t,2,!1),t,2);for(const[d,b]of s){const N=t-b;for(let p=Math.floor(N-r-1);p<=N+r+1;p++)for(let h=Math.floor(d-r-1);h<=d+r+1;h++){if(h<0||p<0||h>=t||p>=t)continue;const V=Math.hypot(h+.5-d,p+.5-N)/r;V<1&&(o[p*t+h]=Math.max(o[p*t+h],.8+.2*Math.sqrt(1-V*V)))}}const c=[[.3,.72,.09,.06],[.68,.28,.12,.05],[.8,.8,.06,.04]];for(let d=0;d<t;d++)for(let b=0;b<t;b++){const N=(b+.5)/t,p=(d+.5)/t;let h=0;for(const[V,W,A,B]of c)h+=B*Math.exp(-((N-V)**2+(p-W)**2)/(A*A));o[d*t+b]+=-h+($(N,p,16,3,7)-.5)*.02}const u=Q(Q(o,t,8,!1),t,8),m=rt(t),v=m.getContext("2d");v.fillStyle="#000",v.fillRect(0,0,t,t),v.fillStyle="#fff",v.textAlign="center",v.textBaseline="middle",v.font='bold 88px "Arial Black", Impact, sans-serif',v.fillText("ML-07",t/2,150),v.font="bold 26px sans-serif",v.fillText("취급 주의 · 12 kg",t/2,210),v.fillRect(t/2-150,360,300,10),v.fillRect(t/2-150,400,300,10);const y=X(m,t),w=rt(t),L=w.getContext("2d");L.fillStyle="#000",L.fillRect(0,0,t,t);for(let d=0;d<s.length;d++){const[b,N]=s[d];if(R(d,3,9)<.45)continue;const p=30+R(d,5,9)*80,h=L.createLinearGradient(0,N,0,N+p);h.addColorStop(0,"rgba(255,255,255,0.9)"),h.addColorStop(1,"rgba(255,255,255,0)"),L.fillStyle=h,L.fillRect(b-3,N,6,p)}const D=Q(X(w,t),t,1),k=new Uint8Array(t*t*4),F=new Uint8Array(t*t*4);yt(o,t,9,F,!1);for(let d=0;d<t;d++)for(let b=0;b<t;b++){const N=d*t+b,p=N*4,h=(b+.5)/t,V=(d+.5)/t,W=$(h,V,8,4,21),A=$(h,V,32,3,22),B=Math.min(b,t-1-b,d,t-1-d),Y=(1-P(0,16,B))*.9+P(.9,.97,o[N])*.5+(A-.5)*.9+(W-.5)*.4,H=P(.42,.5,Y),q=y[N]*P(.25,.4,A+W*.3);let U=58,C=92,E=84;const f=.9+W*.2;U*=f,C*=f,E*=f,U=S(U,214,q),C=S(C,190,q),E=S(E,96,q);const g=D[N]*(.5+.5*A);U=S(U,120,g*.65),C=S(C,60,g*.65),E=S(E,30,g*.65);const x=z(1-(u[N]-o[N])*3.5);U*=x,C*=x,E*=x;const M=150+A*50;U=S(U,M,H),C=S(C,M,H),E=S(E,M+6,H),k[p]=U,k[p+1]=C,k[p+2]=E,k[p+3]=z(o[N])*255;const T=S(S(.55+(A-.5)*.1,.62,q),.82,g*.7);F[p+2]=S(T,.3+A*.06,H)*255,F[p+3]=y[N]*255}return{A:k,N:F}}function at(t,e){const r=ht,i=new Uint8Array(r*r*4),n=new Uint8Array(r*r*4),a=new Float32Array(r*r);for(let s=0;s<r;s++)for(let l=0;l<r;l++){const o=t((l+.5)/r,(s+.5)/r),c=s*r+l,u=c*4;a[c]=o.h,i[u]=z(o.r)*255,i[u+1]=z(o.g)*255,i[u+2]=z(o.b)*255,i[u+3]=z(o.hb)*255,n[u+2]=z(o.rough)*255,n[u+3]=255}return yt(a,r,e,n,!0),{a:i,n}}function ae(){const t=at((n,a)=>{const s=$(n,a,2,3,41,96),l=$(n,a,16,3,42),o=.74+(s-.5)*.12+(l-.5)*.05;return{h:s*.6+l*.2,r:o,g:o,b:o*1.03,rough:.26+(s-.5)*.18,hb:l}},2.5),e=at((n,a)=>{const s=$(n,a,4,4,51),l=$(n,a,48,2,52),o=.92+(s-.5)*.18;return{h:l*.3,r:.23*o,g:.36*o,b:.33*o,rough:.5+(l-.5)*.12,hb:$(n,a,6,5,53)*.75+l*.25}},1.5),r=at((n,a)=>{const s=$(n,a,6,5,61),l=$(n,a,24,4,62),o=P(.62,.72,$(n,a,40,2,63)),c=P(.3,.7,s+(l-.5)*.5);return{h:l*.8+s*.4-o*.25,r:S(.26,.62,c)*(1-o*.45),g:S(.1,.28,c)*(1-o*.5),b:S(.05,.1,c)*(1-o*.5),rough:.82+l*.15,hb:s*.6+l*.4}},7),i=at((n,a)=>{const s=$(n,a,10,4,71),l=$(n,a,64,2,72),o=z(s*1.3-.15);return{h:Math.pow(s,1.5)*.9+l*.35,r:S(.15,.38,o)*(.85+l*.3),g:S(.22,.47,o)*(.85+l*.3),b:S(.05,.12,o),rough:.95,hb:s*.8+l*.2}},6);return[t,e,r,i]}function ne(){const t=K,e=rt(t),r=e.getContext("2d");r.fillStyle="#000",r.fillRect(0,0,t,t),r.lineCap="round";const i=c=>{for(let u=-t;u<=t;u+=t)for(let m=-t;m<=t;m+=t)c(m,u)};for(let c=0;c<70;c++){const u=R(c,1,5)*t,m=R(c,2,5)*t,v=(R(c,3,5)-.5)*1.1+(c%3===0?1.4:.15),y=15+R(c,4,5)*110;r.strokeStyle=`rgba(255,255,255,${.35+R(c,6,5)*.65})`,r.lineWidth=.7+R(c,7,5)*1.2,i((w,L)=>{r.beginPath(),r.moveTo(u+w,m+L),r.lineTo(u+w+Math.cos(v)*y,m+L+Math.sin(v)*y),r.stroke()})}const n=X(e,t);r.fillStyle="#000",r.fillRect(0,0,t,t),r.fillStyle="#fff";for(let c=0;c<260;c++){const u=R(c,11,5)*t,m=R(c,12,5)*t,v=.6+R(c,13,5)*1.6;i((y,w)=>{r.beginPath(),r.arc(u+y,m+w,v,0,Math.PI*2),r.fill()})}const a=X(e,t),s=new Float32Array(t*t),l=new Uint8Array(t*t*4),o=new Uint8Array(t*t*4);for(let c=0;c<t;c++)for(let u=0;u<t;u++){const m=c*t+u,v=m*4,y=$((u+.5)/t,(c+.5)/t,32,3,81)-.5;s[m]=.5-n[m]*.3-a[m]*.35+y*.25;const w=z(.5+n[m]*.13-a[m]*.16+y*.12);l[v]=l[v+1]=l[v+2]=w*255,l[v+3]=255,o[v+2]=z(.5+n[m]*.35+a[m]*.2)*255,o[v+3]=255}return yt(s,t,3.2,o,!0),{A:l,N:o}}let nt=null;function le(){if(nt)return nt;const t=oe(),e=ne();return nt={macroA:t.A,macroN:t.N,layers:ae(),detA:e.A,detN:e.N},nt}function re(t){const e=le(),r=Math.min(8,t.capabilities.getMaxAnisotropy()),i=[],n=(a,s,l,o)=>{const c=new Pt(a,s,s,Vt,_t);return c.wrapS=c.wrapT=o?Wt:qt,c.magFilter=It,c.minFilter=Gt,c.generateMipmaps=!0,c.anisotropy=r,c.colorSpace=l?Ht:jt,c.needsUpdate=!0,i.push(c),c};return{macroA:n(e.macroA,J,!0,!1),macroN:n(e.macroN,J,!1,!1),layers:e.layers.map(a=>({a:n(a.a,ht,!0,!0),n:n(a.n,ht,!1,!0)})),detA:n(e.detA,K,!1,!0),detN:n(e.detN,K,!1,!0),all:i}}function vt(t,e,r,i){const n=Math.floor(t),a=Math.floor(e),s=Math.floor(r),l=O(t-n),o=O(e-a),c=O(r-s),u=(D,k,F)=>R(D+Math.imul(F,977),k,i),m=(D,k,F)=>D+(k-D)*F,v=m(u(n,a,s),u(n+1,a,s),l),y=m(u(n,a+1,s),u(n+1,a+1,s),l),w=m(u(n,a,s+1),u(n+1,a,s+1),l),L=m(u(n,a+1,s+1),u(n+1,a+1,s+1),l);return m(m(v,y,o),m(w,L,o),c)}function se(){const t=new Et(1,1,1,24,24,24),e=t.getAttribute("position"),r=t.getAttribute("normal"),i=new Float32Array(e.count*3);for(let n=0;n<e.count;n++){const a=e.getX(n),s=e.getY(n),l=e.getZ(n),o=Math.abs(r.getX(n)),c=Math.abs(r.getY(n)),u=o>.5?0:c>.5?1:2,m=[a,s,l];let v=1;for(let D=0;D<3;D++)D!==u&&(v=Math.min(v,.5-Math.abs(m[D])));let y=(1-P(0,.17,v))*(.55+.6*vt(a*6,s*6,l*6,1));y+=.3*(1-P(0,.14,s+.5));let w=(1-P(-.5,.2,s))*(.55+.7*vt(a*3+7,s*3,l*3,2));u===1&&s>0&&(w+=.55*(1-P(.05,.38,Math.hypot(a+.08,l-.05))));const L=vt(a*2.3+13,s*2.3,l*2.3,3)*.7+(u===1&&s>0?.25:0);i[n*3]=z(y),i[n*3+1]=z(w),i[n*3+2]=z(L)}return t.setAttribute("color",new Bt(i,3)),t.computeTangents(),t}const Lt=[.094,.948,.5],Dt=new G(.42,.3,1).normalize(),st=2.6,Z=4.5,xt=.055,dt=[1.5,3.5],At={lin:"선형 평균",udn:"UDN",wo:"화이트아웃",rnm:"RNM"},St={lin:0,udn:1,wo:2,rnm:3},ce=`
attribute vec4 tangent; attribute vec3 color;
varying vec3 vN; varying vec3 vW; varying vec2 vUv; varying vec4 vT; varying vec3 vC;
void main(){
  vUv = uv; vC = color;
  vN = normalize(mat3(modelMatrix) * normal);
  vT = vec4(normalize(mat3(modelMatrix) * tangent.xyz), tangent.w);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,kt=`
vec3 unpackN(vec2 rg){ vec2 xy = rg * 2. - 1.; return vec3(xy, sqrt(max(1e-4, 1. - dot(xy, xy)))); }
vec3 blendN(vec3 a, vec3 b, float m){
  if (m < .5) return normalize(a + b);                                  // 선형 평균: 두 기울기가 반씩 깎임
  if (m < 1.5) return normalize(vec3(a.xy + b.xy, a.z));                // UDN: 베이스 z 유지
  if (m < 2.5) return normalize(vec3(a.xy + b.xy, a.z * b.z));          // 화이트아웃
  vec3 t = a + vec3(0., 0., 1.), u = b * vec3(-1., -1., 1.);            // RNM: 디테일을 베이스 방향으로 회전
  return normalize(t * dot(t, u) / t.z - u);
}`,ie=`
${Tt}
varying vec4 vT; varying vec3 vC;
uniform sampler2D tMacA; uniform sampler2D tMacN; uniform sampler2D tDetA; uniform sampler2D tDetN;
uniform sampler2D tL0A; uniform sampler2D tL0N; uniform sampler2D tL1A; uniform sampler2D tL1N;
uniform sampler2D tL2A; uniform sampler2D tL2N; uniform sampler2D tL3A; uniform sampler2D tL3N;
uniform float uMode; uniform float uDetail; uniform float uBlend; uniform float uAge; uniform vec3 uLayers;
uniform float uDebug; uniform vec3 uLight; uniform float uPxScale; uniform vec2 uFade;
#define PI 3.14159265
${kt}
// 높이 기반 블렌드: 마스크 점수 s가 문턱 thr을 넘는 곳, 경계는 층의 높이 h로 울퉁불퉁하게
float n2o(vec3 p){ return vnoise3(p) * .65 + vnoise3(p * 2.9 + 5.) * .35; }
float hb(float s, float thr, float h){ return smoothstep(-.05, .05, s - thr + (h - .5) * .45); }
vec3 heatCol(float l){
  vec3 c = mix(vec3(.85, .12, .1), vec3(.95, .75, .12), smoothstep(-4., -2., l));
  c = mix(c, vec3(.2, .8, .3), smoothstep(-2., 0., l));
  return mix(c, vec3(.2, .45, 1.), smoothstep(0., 3., l));
}
// 화면 1픽셀당 텍셀 수 히트맵 + 확대 구간에서는 텍셀 경계선
vec3 density(vec2 tc, float lam){
  vec2 dx = dFdx(tc), dy = dFdy(tc);
  float rho = max(length(dx), length(dy)) * uPxScale;
  vec3 c = heatCol(log2(max(rho, 1e-4))) * lam;
  vec2 fw = fwidth(tc);
  vec2 e = (.5 - abs(fract(tc) - .5)) / max(fw, vec2(1e-5));
  float line = 1. - clamp(min(e.x, e.y), 0., 1.);
  return mix(c, vec3(0.), line * smoothstep(.35, .12, rho) * .85);
}
vec3 shade(vec3 alb, float rough, float metal, vec3 N, vec3 Ng, vec3 V){
  vec3 L = uLight, H = normalize(L + V);
  float NL = max(dot(N, L), 0.), NV = max(dot(N, V), 1e-3), NH = max(dot(N, H), 0.), VH = max(dot(V, H), 0.);
  float al = max(rough * rough, .003), a2 = al * al;
  float dd = NH * NH * (a2 - 1.) + 1.;
  float D = a2 / (PI * dd * dd);
  float k = (rough + 1.) * (rough + 1.) / 8.;
  float G = NL / (NL * (1. - k) + k) * NV / (NV * (1. - k) + k);
  vec3 F0 = mix(vec3(.04), alb, metal);
  vec3 F = F0 + (1. - F0) * pow(1. - VH, 5.);
  vec3 spec = D * G * F / max(4. * NL * NV, 1e-3);
  float sh = smoothstep(-.05, .15, dot(Ng, L));   // 기하 법선 뒤쪽은 노멀 맵이 있어도 빛이 안 들게
  vec3 direct = ((1. - F) * (1. - metal) * alb / PI + spec) * NL * 3.4 * sh;
  vec3 hemi = mix(vec3(.09, .08, .07), vec3(.3, .34, .4), N.y * .5 + .5);
  vec3 Fv = F0 + (max(vec3(1. - rough), F0) - F0) * pow(1. - NV, 5.);
  vec3 env = skyEnv(reflect(-V, N)) * Fv * mix(.9, .06, rough) * .5;
  return direct + hemi * alb * (1. - metal * .7) + env;
}
void main(){
  vec3 Ng = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  float dist = length(cameraPosition - vW);
  vec4 mA = texture2D(tMacA, vUv);
  vec4 mN = texture2D(tMacN, vUv);
  vec3 nMac = unpackN(mN.rg);
  vec3 alb, nT; float rough, metal, dS;
  float wP = 0., wR = 0., wM = 0.;
  if (uMode < 1.5) {
    // 베이스 텍스처 한 장: 페인트·마모가 이미 구워진 512 texel/m
    alb = mA.rgb; rough = mN.b; metal = smoothstep(.42, .34, rough); nT = nMac;
    dS = mix(.6, 1., metal);
  } else {
    // 레이어 스택: 금속 → 페인트 → 녹 → 이끼 (각 층 알베도+높이, 노멀+거칠기 = 샘플 2개)
    vec2 uvL = vUv * ${te.toFixed(1)};
    float hm = mA.a;
    vec4 a0 = texture2D(tL0A, uvL), n0 = texture2D(tL0N, uvL);
    alb = a0.rgb; rough = n0.b; metal = 1.; dS = 1.;
    vec2 nrg = n0.rg;
    float age = uAge;
    if (uLayers.x > .5) {
      vec4 a1 = texture2D(tL1A, uvL), n1 = texture2D(tL1N, uvL);
      // 버텍스 R(모서리) + 튀어나온 곳 + 노이즈 → 벗겨질 점수. 도막이 얇은(높이 낮은) 곳부터
      float s = vC.r * .8 + (hm - .55) * .5 + (n2o(vW * 3.1) - .5) * 1.1;
      wP = 1. - hb(s, 1.35 - age * 1.25, 1. - a1.a);
      vec3 pc = mix(a1.rgb, vec3(.68, .52, .12), mN.a * .9);
      alb = mix(alb, pc, wP); rough = mix(rough, mix(n1.b, .6, mN.a), wP); metal *= 1. - wP;
      nrg = mix(nrg, n1.rg, wP); dS = mix(dS, .55, wP);
    }
    if (uLayers.y > .5) {
      vec4 a2 = texture2D(tL2A, uvL), n2 = texture2D(tL2N, uvL);
      // 버텍스 G(습기) + 드러난 금속 → 녹
      float s = vC.g * .85 + (1. - wP) * .45 + (n2o(vW * 3.7 + 11.) - .5) * 1.;
      wR = hb(s, 1.75 - age * 1.4, a2.a);
      alb = mix(alb, a2.rgb, wR); rough = mix(rough, n2.b, wR); metal = mix(metal, .05, wR);
      nrg = mix(nrg, n2.rg, wR); dS = mix(dS, .45, wR);
    }
    if (uLayers.z > .5) {
      vec4 a3 = texture2D(tL3A, uvL), n3 = texture2D(tL3N, uvL);
      // 월드 위(N.y) + 버텍스 B(때) + 낮은 곳 → 이끼
      float up = smoothstep(.3, .85, Ng.y);
      float s = up + vC.b * .35 + (.5 - hm) * .6 + (n2o(vW * 2.7 + 29.) - .5) * .9;
      wM = hb(s, 2.05 - age * 1.35, a3.a);
      alb = mix(alb, a3.rgb, wM); rough = mix(rough, n3.b, wM); metal *= 1. - wM;
      nrg = mix(nrg, n3.rg, wM); dS = mix(dS, .12, wM);
    }
    alb *= mix(.75, 1., smoothstep(.35, .5, hm));
    nT = blendN(nMac, unpackN(nrg), uBlend);
  }
  float fade = 1. - smoothstep(uFade.x, uFade.y, dist);
  if (uDetail > .5) {
    // 디테일: 5cm마다 반복, 거리에 따라 세기를 줄여 멀리서 반복 무늬·반짝임을 숨김
    vec2 uvD = vUv * ${gt.toFixed(1)};
    vec4 dA = texture2D(tDetA, uvD), dN = texture2D(tDetN, uvD);
    float k = dS * fade;
    vec3 nd = unpackN(dN.rg);
    nd = normalize(vec3(nd.xy * k, nd.z));
    nT = blendN(nT, nd, uBlend);
    alb *= mix(1., dA.r * 2., k);
    rough = clamp(rough + (dN.b - .5) * .4 * k, .04, 1.);
  }
  vec3 T = normalize(vT.xyz - Ng * dot(Ng, vT.xyz));
  vec3 B = cross(Ng, T) * vT.w;
  vec3 N = normalize(T * nT.x + B * nT.y + Ng * nT.z);
  if (uDebug > .5) {
    float lam = max(dot(N, uLight), 0.) * .55 + .45;
    vec3 c;
    if (uDebug < 1.5) c = vec3(vC.r, vC.g, smoothstep(.3, .85, Ng.y)) * lam;
    else if (uDebug < 2.5) {
      c = vec3(.5);
      c = mix(c, vec3(.15, .4, .95), wP);
      c = mix(c, vec3(.95, .42, .08), wR);
      c = mix(c, vec3(.35, .9, .2), wM);
      c *= lam;
    } else if (uDebug < 3.5) c = density(vUv * ${J.toFixed(1)}, lam);
    else c = density(vUv * ${(gt*K).toFixed(1)}, lam);
    gl_FragColor = vec4(c, 1.);
    return;
  }
  gl_FragColor = vec4(acesTone(shade(alb, rough, metal, N, Ng, V)), 1.);
  #include <colorspace_fragment>
}`,ue=`
${Tt}
uniform vec3 uLight; uniform vec4 uBox0; uniform vec4 uBox1;
float boxD(vec2 p, vec4 b){ vec2 q = p - b.xy; float c = cos(b.z), s = sin(b.z); q = vec2(c * q.x - s * q.y, s * q.x + c * q.y); vec2 d = abs(q) - .5; return length(max(d, 0.)) + min(max(d.x, d.y), 0.); }
void main(){
  float n = fbm2(vW.xz * 2.5);
  vec3 c = vec3(.26, .25, .23) * (.8 + .4 * n);
  float ao = smoothstep(-.02, .45, min(boxD(vW.xz, uBox0), boxD(vW.xz, uBox1)));
  float l = max(uLight.y, 0.) * 1.0 + .25;
  gl_FragColor = vec4(acesTone(c * l * (.35 + .65 * ao)), 1.);
  #include <colorspace_fragment>
}`,me=`
uniform sampler2D tDetN; uniform float uRight; uniform vec3 uL; varying vec2 vUv;
${kt}
void main(){
  float side = step(.5, vUv.x);
  vec2 q = vec2(fract(vUv.x * 2.), vUv.y);
  vec2 c = fract(q * 2.) * 2. - 1.;
  float r2 = dot(c, c);
  vec3 nb = r2 < .81 ? normalize(vec3(c * .85, sqrt(.81 - r2))) : vec3(0., 0., 1.);
  vec3 nd = unpackN(texture2D(tDetN, q * 1.2).rg);
  nd = normalize(vec3(nd.xy * 1.8, nd.z));
  vec3 n = blendN(nb, nd, side < .5 ? 0. : uRight);
  vec3 H = normalize(uL + vec3(0., 0., 1.));
  float l = max(dot(n, uL), 0.);
  vec3 col = vec3(.78, .74, .68) * l * .9 + .05 + pow(max(dot(n, H), 0.), 40.) * .35;
  col = mix(col, vec3(1.), smoothstep(.006, 0., abs(vUv.x - .5)));
  gl_FragColor = vec4(pow(col, vec3(1. / 2.2)), 1.);
}`;function fe(t,e,r){const i=t.bool("light",!0)?e*45e-5:.9;return r.set(Math.sin(i)*.95,.5+.25*Math.cos(i*.7),.55+.25*Math.cos(i)).normalize()}const Rt=t=>t<.01?`${(t*1e3).toFixed(t<.001?2:1)}mm`:t<1?`${(t*100).toFixed(t<.1?1:0)}cm`:`${t.toFixed(2)}m`,pt=t=>t<.1?t.toFixed(3):t<10?t.toFixed(2):t.toFixed(0);function lt(t,e){return e<.95?`${t}1 texel = ${(1/e).toFixed(1)}px${e<.3?" (뿌옇게)":""}`:e<=1.05?`${t}1 texel ≈ 1px`:`${t}${pt(e)} texel/px (밉 ${Math.log2(e).toFixed(1)})`}function Ft(t){const e=(r,i,n)=>{const a=Math.min(1,Math.max(0,(n-r)/(i-r)));return a*a*(3-2*a)};return e(.06,.44,t)-e(.56,.94,t)}const ve=t=>Math.exp(Math.log(Z)+(Math.log(xt)-Math.log(Z))*t);function de(t,e){const r=new G(...Lt).addScaledVector(Dt,t.params.num("dist",st));return Zt(t,{antialias:!0,cam:[r.x,r.y,r.z],target:Lt,near:.004,far:60,fov:45},({scene:i,camera:n,renderer:a,controls:s})=>{i.background=new Ot(1448482),s.minDistance=.03,s.maxDistance=9;const l=re(a),o={tMacA:{value:l.macroA},tMacN:{value:l.macroN},tDetA:{value:l.detA},tDetN:{value:l.detN},tL0A:{value:l.layers[0].a},tL0N:{value:l.layers[0].n},tL1A:{value:l.layers[1].a},tL1N:{value:l.layers[1].n},tL2A:{value:l.layers[2].a},tL2N:{value:l.layers[2].n},tL3A:{value:l.layers[3].a},tL3N:{value:l.layers[3].n},uMode:{value:e==="base"?0:e==="detail"?1:2},uDetail:{value:0},uBlend:{value:3},uAge:{value:.55},uLayers:{value:new G(1,1,1)},uDebug:{value:0},uLight:{value:new G(0,1,0)},uPxScale:{value:1},uFade:{value:new mt(...dt)}},c=new ft({uniforms:o,vertexShader:ce,fragmentShader:ie}),u=se(),m=new ot(u,c);m.position.set(0,.5,0);const v=new ot(u,c);v.position.set(-1.3,.5,-.65),v.rotation.y=.5,i.add(m,v);const y={uLight:o.uLight,uBox0:{value:new Nt(0,0,0,0)},uBox1:{value:new Nt(-1.3,-.65,.5,0)}},w=new ot(new Mt(14,14),new ft({uniforms:y,vertexShader:Jt,fragmentShader:ue}));w.rotation.x=-Math.PI/2,i.add(w);let L=NaN;const D=new G,k=()=>{const f=t.params.num("dist",st);f!==L&&(L=f,D.subVectors(n.position,s.target),D.lengthSq()<1e-12&&D.copy(Dt),D.normalize(),n.position.copy(s.target).addScaledVector(D,f),s.update())},F=a.domElement,d=()=>{t.params.bool("auto",!0)&&t.params.set("auto",!1)},b=f=>{f.touches.length>=2&&d()};F.addEventListener("wheel",d,{passive:!0}),F.addEventListener("touchstart",b,{passive:!0});const N=[],p=(f,g="")=>{const x=document.createElement("div");return x.style.cssText="position:absolute;pointer-events:none;font:600 10px/1.3 system-ui,sans-serif;color:#e8ecf2;background:rgba(10,12,18,.72);padding:2px 5px;border-radius:3px;white-space:nowrap;"+f,x.textContent=g,t.body.appendChild(x),N.push(x),x};let h=null;if(e==="detail"){const f={tDetN:{value:l.detN},uRight:{value:3},uL:{value:new G(.6,.3,.75)}},g=new Yt,x=new ot(new Mt(2,2),new ft({uniforms:f,vertexShader:Kt,fragmentShader:me,depthTest:!1,depthWrite:!1}));x.frustumCulled=!1,g.add(x),h={scene:g,cam:new Qt,U:f,lL:p(""),lR:p("")}}const W=e==="info"?["입력 마스크 R·G·B","층 가중치","베이스 밀도 (512/m)","디테일 밀도 (5120/m)"].map(f=>p("max-width:48%;overflow:hidden;text-overflow:ellipsis;",f)):[];e==="info"&&(W.forEach((f,g)=>{f.style.left=g%2?"calc(50% + 4px)":"4px",f.style.top=g<2?"calc(50% - 20px)":"auto",g>=2&&(f.style.bottom="4px")}),p("left:50%;top:0;bottom:0;width:1px;padding:0;background:rgba(255,255,255,.35);border-radius:0;"),p("top:50%;left:0;right:0;height:1px;padding:0;background:rgba(255,255,255,.35);border-radius:0;"));let A=1,B=1;const Y=new Xt,H=new mt(0,0),q=new G,U=new mt;let C=0;const E=()=>{const f=o.uDetail.value>.5?2:0;if(e==="base"||e==="detail")return{n:2+f,txt:""};const g=o.uLayers.value,x=1+g.x+g.y+g.z;return{n:2+2*x+f,txt:`매크로 2 + 층 ${x}×2${f?" + 디테일 2":""}`}};return{resize(f,g){A=f,B=g,o.uPxScale.value=e==="info"?.5:1},update(f,g,x){const M=t.params;k(),fe(M,x,o.uLight.value),o.uDetail.value=e==="base"?0:M.bool("detail",!0)?1:0;const T=M.str("blend","rnm");if(o.uBlend.value=St[T]??3,o.uAge.value=M.num("age",.65),o.uLayers.value.set(M.bool("lPaint",!0)?1:0,M.bool("lRust",!0)?1:0,M.bool("lMoss",!0)?1:0),h){const _=x*.0011;h.U.uL.value.set(Math.cos(_)*.85,Math.sin(_)*.85,.3).normalize();const et=T==="lin"?"rnm":T;h.U.uRight.value=St[et];const ut=Math.round(A*.46),Ct=Math.round(ut/2);h.lL.style.left=`${A-ut-3}px`,h.lR.style.left=`${A-ut/2-3}px`,h.lL.style.bottom=h.lR.style.bottom=`${Ct+8}px`,h.lL.textContent="선형 평균",h.lR.textContent=At[et]+(T==="lin"?" (참고)":"");const Ut=o.uDetail.value>.5;h.lL.style.display=h.lR.style.display=Ut?"":"none"}if(C-=f,C>0)return;C=.2,i.updateMatrixWorld(),n.updateMatrixWorld(),Y.setFromCamera(H,n);const j=Y.intersectObjects([m,v],!1)[0];a.getDrawingBufferSize(U);const I=E();if(!j){t.hud(`화면 중앙에 상자 없음 · 샘플/픽셀 ${I.n}`);return}q.copy(j.face.normal).transformDirection(j.object.matrixWorld);const $t=Math.max(.2,Math.abs(q.dot(Y.ray.direction))),ct=2*j.distance*Math.tan(wt.degToRad(n.fov/2))/U.y/$t,tt=ct*J,bt=ct*K*gt,zt=1-wt.smoothstep(j.distance,dt[0],dt[1]),it=`표면 ${Rt(j.distance)} · 1px = ${Rt(ct)}`;if(e==="base")t.hud(`${it}
베이스 5.1 texel/cm: ${lt("",tt)}
샘플/픽셀 ${I.n}`);else if(e==="detail"){const _=o.uDetail.value>.5;t.hud(`${it}
${lt("베이스 ",tt)}`+(_?` · ${lt("디테일 ",bt)}
디테일 세기 ${Math.round(zt*100)}% · ${At[T]} · 샘플/픽셀 ${I.n}`:`
디테일 꺼짐 (=①) · 샘플/픽셀 ${I.n}`))}else if(e==="layer"){const _=o.uLayers.value,et=["금속",_.x?"페인트":"",_.y?"녹":"",_.z?"이끼":""].filter(Boolean).join("→");t.hud(`${it} · 노화 ${o.uAge.value.toFixed(2)}
${et} · ${lt("",tt)}
샘플/픽셀 ${I.n} = ${I.txt}`)}else t.hud(`중앙 texel/px: 베이스 ${pt(tt)} · 디테일 ${pt(bt)}
패널 4개 × 샘플 ${I.n}`)},render(){if(e==="info"){const f=Math.floor(A/2),g=Math.floor(B/2);a.setScissorTest(!0);for(let x=0;x<4;x++){const M=x%2*f,T=x<2?B-g:0;a.setViewport(M,T,f,g),a.setScissor(M,T,f,g),o.uDebug.value=x+1,a.render(i,n)}a.setScissorTest(!1),a.setViewport(0,0,A,B);return}if(a.setViewport(0,0,A,B),a.render(i,n),h&&o.uDetail.value>.5){const f=Math.round(A*.46),g=Math.round(f/2),x=A-f-6,M=6;a.setScissorTest(!0),a.setViewport(x,M,f,g),a.setScissor(x,M,f,g);const T=a.autoClear;a.autoClear=!1,a.render(h.scene,h.cam),a.autoClear=T,a.setScissorTest(!1),a.setViewport(0,0,A,B)}},dispose(){F.removeEventListener("wheel",d),F.removeEventListener("touchstart",b),N.forEach(f=>f.remove()),l.all.forEach(f=>f.dispose()),h==null||h.scene.traverse(f=>{var x,M,T;const g=f;(x=g.geometry)==null||x.dispose(),(T=(M=g.material)==null?void 0:M.dispose)==null||T.call(M)})}}})}const he=[{mode:"base",title:"① 베이스 텍스처 한 장",kind:"before",caption:"페인트·마모·리벳을 구운 512 texel/m(5.1 texel/cm) 텍스처 한 장. 멀리서는 충분하지만 카메라가 수 cm까지 다가가면 텍셀 하나가 화면 수십 px로 늘어나 뿌옇게 번진다."},{mode:"detail",title:"② + 디테일 맵 (거리 페이드)",kind:"after",caption:"5cm마다 반복되는 흠집·모공 디테일(51 texel/cm)을 알베도는 ×2 곱, 노멀은 선택한 방식으로 합성. 1.5~3.5m에서 서서히 꺼진다. 오른쪽 아래 인셋: 돔 위 디테일을 선형 평균(왼쪽)과 비교."},{mode:"layer",title:"③ 레이어드 머티리얼",kind:"variant",caption:'금속 → 페인트 → 녹 → 이끼. 층마다 알베도·거칠기·금속성·노멀이 따로 있고, 버텍스 컬러·월드 위 방향·노이즈로 만든 마스크를 각 층의 높이로 깎아 섞는다. "노화 (마모)"로 세월을 돌린다.'},{mode:"info",title:"④ 레이어 마스크 · 텍셀 밀도",kind:"info",wide:!0,caption:"같은 카메라·같은 셰이더의 디버그 출력 4개. 왼쪽 위: 입력 마스크(R 모서리 마모·G 습기 = 버텍스 컬러, B = 월드 위 N·y). 오른쪽 위: 높이 블렌드 뒤 층 가중치(회색 금속·파랑 페인트·주황 녹·초록 이끼). 아래: 화면 1px당 텍셀 수(빨강 = 확대, 텍셀 격자 표시 · 초록 ≈ 1 · 파랑 = 축소·밉)."}],be={layout:"compare",intro:"텍스처 해상도는 유한해서, 카메라가 표면에 바짝 다가가면 텍셀 하나가 화면 수십 픽셀을 덮어 뿌옇게 뭉개집니다. 그렇다고 고유 텍스처 해상도를 계속 올릴 수는 없으니, 큰 형태는 고유 텍스처가 맡고 <b>미세한 질감은 촘촘히 반복되는 디테일 맵</b>이 맡도록 나눕니다. 한 걸음 더 나가면 재질 자체를 <b>층(레이어)</b>으로 쪼개 금속·페인트·녹·이끼를 각각 반복 텍스처로 두고 <b>마스크</b>로 섞습니다. 카메라가 5m에서 5cm까지 자동으로 다가갔다 멀어지니 ①과 ②의 차이, 그리고 HUD의 텍셀 밀도를 보세요.",how:["텍셀 밀도 = 텍스처 해상도 ÷ 표면 크기. 512²를 1m 면에 쓰면 5.12 texel/cm. 화면 1px이 덮는 표면 폭 × 밀도 = 픽셀당 텍셀 수(1보다 작으면 확대 → 흐림).","디테일 맵: 5cm 같은 짧은 주기로 반복되는 고주파 알베도·노멀. 알베도는 회색(0.5) 중심 텍스처를 ×2로 곱하고, 노멀은 RNM·화이트아웃·UDN 중 하나로 베이스 노멀 위에 얹는다.","거리 페이드: 멀어지면 디테일 세기를 0으로. 반복 무늬가 보이거나 밉이 뭉개진 노이즈로 반짝이는 것을 막고, 아예 샘플을 건너뛸 수도 있다.","레이어드 머티리얼: 층마다 [알베도+높이, 노멀+거칠기] 텍스처 세트 + 금속성 값. 마스크(버텍스 컬러, 월드 위 방향, 노이즈) 점수가 문턱을 넘는 곳에 층을 덮고, 경계는 층의 높이 맵으로 울퉁불퉁하게 깎는다.","노화 슬라이더 하나로 각 층의 문턱을 동시에 낮춰 페인트 벗겨짐 → 녹 번짐 → 이끼 덮임이 순서대로 진행된다."],pros:["작은 반복 텍스처 몇 장으로 극근접까지 선명","마스크만 바꾸면 같은 층으로 새것·낡은 것 변형을 무한히","층 텍스처를 여러 에셋이 공유해 메모리 절약"],cons:["층·디테일마다 샘플이 늘어 픽셀 셰이더가 무거워짐(여기선 최대 12회)","노멀을 잘못 합치면(선형 평균) 요철이 납작해짐","층이 많으면 셰이더 조합 폭발 → 엔진은 층 수 제한이나 미리 굽기로 대응"],usedIn:'UE의 Detail Texturing·Material Layers(Material Layer/Blend 에셋), Unity HDRP의 Detail Map·LayeredLit(최대 4층). 디테일 노멀 합성은 Barré-Brisebois & Hill의 "Blending in Detail"(2012, RNM)이 자주 인용됨.',controls:[{type:"range",key:"dist",label:"카메라 거리 (m)",min:.05,max:5,step:.01,value:st},{type:"toggle",key:"auto",label:"자동 돌리 (멀리↔극근접)",value:!0},{type:"toggle",key:"detail",label:"디테일 맵",value:!0},{type:"select",key:"blend",label:"노멀 블렌드",value:"rnm",options:[{label:"선형 평균",value:"lin"},{label:"UDN",value:"udn"},{label:"화이트아웃",value:"wo"},{label:"RNM",value:"rnm"}]},{type:"range",key:"age",label:"노화 (마모)",min:0,max:1,step:.01,value:.65},{type:"toggle",key:"lPaint",label:"페인트 층",value:!0},{type:"toggle",key:"lRust",label:"녹 층",value:!0},{type:"toggle",key:"lMoss",label:"이끼 층",value:!0},{type:"toggle",key:"light",label:"광원 회전",value:!0}],viewers:he.map(t=>({title:t.title,kind:t.kind,caption:t.caption,wide:t.wide,mount:e=>de(e,t.mode)})),setup(t){let e=0,r=0,i=performance.now(),n=!1;const a=()=>{const o=t.num("dist",st),c=(Math.log(Z)-Math.log(Math.min(Z,Math.max(xt,o))))/(Math.log(Z)-Math.log(xt));let u=.06,m=.44;for(let v=0;v<30;v++){const y=(u+m)/2;Ft(y)<c?u=y:m=y}r=u};a();const s=t.on(o=>{o==="dist"&&!n&&t.bool("auto",!0)&&t.set("auto",!1),o==="auto"&&t.bool("auto",!0)&&a()}),l=o=>{e=requestAnimationFrame(l);const c=Math.min(.1,(o-i)/1e3);i=o,t.bool("auto",!0)&&(r=(r+c/16)%1,n=!0,t.set("dist",Math.round(ve(Ft(r))*1e3)/1e3),n=!1)};return e=requestAnimationFrame(l),()=>{cancelAnimationFrame(e),s()}}};export{be as default};
