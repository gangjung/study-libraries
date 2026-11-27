import{ac as xe,aE as he,aF as Re,ag as ye,ah as ge,ad as Be,L as ke,aG as Ge,n as Me,aH as we,p as be,g as ie,B as Ae,C as Ce,M as pe,r as Fe,u as Oe,k as Se}from"./three.module-BZgG6AUv.js";import{m as ze}from"./three-viewer-0rZIEDzf.js";import{m as Te}from"./canvas-viewer-Btf0JXdr.js";import{c as De,t as _,F as le}from"./chart2d-JzIgcti9.js";const g=256;let ae=null;function re(e,o){let l=e*374761393+o*668265263|0;return l=Math.imul(l^l>>>13,1274126177),((l^l>>>16)>>>0)/4294967296}function ee(e,o){const l=Math.floor(e),i=Math.floor(o),r=e-l,x=o-i,B=r*r*(3-2*r),f=x*x*(3-2*x),a=re(l,i),t=re(l+1,i),n=re(l,i+1),h=re(l+1,i+1);return a+(t-a)*B+(n-a)*f+(a-t-n+h)*B*f}function se(e,o){let l=0,i=.5;for(let r=0;r<4;r++)l+=i*ee(e,o),e=e*2.03+17.1,o=o*2.03+5.3,i*=.5;return l}const te=e=>e<0?0:e>1?1:e,ne=(e,o,l)=>{const i=te((l-e)/(o-e));return i*i*(3-2*i)},K=e=>e<=.0031308?e*12.92:1.055*Math.pow(e,1/2.4)-.055,me=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4),I=e=>Math.round(te(e)*255);function Ee(e,o,l,i,r,x){return Math.min(e-l,r-e,o-i,x-o)}const Ne=[[.045,.045,.026],[.955,.045,.026],[.045,.955,.026],[.955,.955,.026],[.31,.39,.016],[.69,.39,.016],[.31,.75,.016],[.69,.75,.016]];function Pe(e,o){const i=Math.min(e,1-e,o,1-o);let r=.3,x="recess";i<.09?(r=1,x="frame"):i<.09+.03&&(r=1-.7*((i-.09)/.03),x="frame");const B=Ee(e,o,.28,.36,.72,.78);B>0&&(r=.3+.4*ne(0,.025,B),x="plate");let f=0;if(e>.2&&e<.8&&o>.13&&o<.29){const a=(o-.13)/.04,t=a-Math.floor(a),n=Math.min(e-.2,.8-e);if(t>.25&&t<.75){const h=Math.min(t-.25,.75-t)*.04;r=.3-.22*ne(0,.006,Math.min(h,n)),x="slot",f=ne(.004,.012,Math.min(h,n))*(.85+.15*Math.sin(e*40))}}for(const[a,t,n]of Ne){const h=Math.hypot(e-a,o-t);h<n&&(r=Math.max(r,(x==="plate"?.7:1)+.12*Math.sqrt(1-h*h/(n*n))),x="bolt")}return{h:r,region:x,glow:f,d:i}}function $e(e){const o=new Uint8Array(new ArrayBuffer(e.length)),l=[0,0,0],i=[0,0,0],r=new Float32Array(16*3);for(let B=0;B<g;B+=4)for(let f=0;f<g;f+=4){let a=0,t=0,n=0;for(let b=0;b<16;b++){const M=((B+(b>>2))*g+f+(b&3))*4;r[b*3]=e[M],r[b*3+1]=e[M+1],r[b*3+2]=e[M+2],a+=e[M],t+=e[M+1],n+=e[M+2]}a/=16,t/=16,n/=16;let h=0,d=0,c=0,k=0,u=0,G=0;for(let b=0;b<16;b++){const M=r[b*3]-a,S=r[b*3+1]-t,T=r[b*3+2]-n;h+=M*M,d+=M*S,c+=M*T,k+=S*S,u+=S*T,G+=T*T}let w=1,R=1,p=1;for(let b=0;b<6;b++){const M=h*w+d*R+c*p,S=d*w+k*R+u*p,T=c*w+u*R+G*p,C=Math.hypot(M,S,T)||1;w=M/C,R=S/C,p=T/C}let m=1/0,s=-1/0;for(let b=0;b<16;b++){const M=(r[b*3]-a)*w+(r[b*3+1]-t)*R+(r[b*3+2]-n)*p;M<m&&(m=M),M>s&&(s=M)}const v=(b,M)=>{const S=(1<<M)-1;return Math.round(te(b/255)*S)/S*255},y=[v(a+w*m,5),v(t+R*m,6),v(n+p*m,5)],z=[v(a+w*s,5),v(t+R*s,6),v(n+p*s,5)],E=[0,1/3,2/3,1].map(b=>[y[0]+(z[0]-y[0])*b,y[1]+(z[1]-y[1])*b,y[2]+(z[2]-y[2])*b]);for(let b=0;b<16;b++){let M=0,S=1/0;for(let C=0;C<4;C++){const N=r[b*3]-E[C][0],L=r[b*3+1]-E[C][1],F=r[b*3+2]-E[C][2],O=N*N+L*L+F*F;O<S&&(S=O,M=C)}const T=((B+(b>>2))*g+f+(b&3))*4;for(let C=0;C<3;C++){const N=Math.round(E[M][C]);o[T+C]=N;const L=Math.abs(N-r[b*3+C]);l[C]+=L,L>i[C]&&(i[C]=L)}o[T+3]=255}}const x=g*g;return{out:o,mean:[l[0]/x,l[1]/x,l[2]/x],max:[i[0],i[1],i[2]]}}function de(){if(ae)return ae;const e=g*g,o=new Float32Array(e),l=new Array(e);for(let p=0;p<g;p++)for(let m=0;m<g;m++){const s=Pe((m+.5)/g,(p+.5)/g);l[p*g+m]=s,o[p*g+m]=s.h}const i=(p,m)=>o[Math.min(g-1,Math.max(0,m))*g+Math.min(g-1,Math.max(0,p))],r=7,x=new Float32Array(e);{const p=new Float32Array(e);for(let m=0;m<g;m++)for(let s=0;s<g;s++){let v=0;for(let y=-r;y<=r;y++)v+=i(s+y,m);p[m*g+s]=v/(2*r+1)}for(let m=0;m<g;m++)for(let s=0;s<g;s++){let v=0;for(let y=-r;y<=r;y++)v+=p[Math.min(g-1,Math.max(0,m+y))*g+s];x[m*g+s]=v/(2*r+1)}}const B=[.15,.85,1],f=p=>new Uint8Array(new ArrayBuffer(e*p)),a=f(4),t=f(4),n=f(1),h=f(1),d=f(1),c=f(4),k=f(4),u=f(4),G=f(2),w=4;for(let p=0;p<g;p++)for(let m=0;m<g;m++){const s=p*g+m,v=(m+.5)/g,y=(p+.5)/g,z=l[s],E=(i(m+1,p)-i(m-1,p))*w,b=(i(m,p+1)-i(m,p-1))*w,M=Math.hypot(E,b),S=1/Math.sqrt(E*E+b*b+1),T=-E*S,C=-b*S,N=se(v*18,y*18),L=ee(v*3,y*140)*.6+ee(v*7,y*260)*.4,O=z.region==="frame"&&(M>.3||z.d<.016)&&se(v*40,y*40)>.6;let A,D,$;z.region==="bolt"?(A=[.62,.63,.65],$=1,D=.32+.1*N):z.region==="plate"?(A=[.75,.76,.78],$=1,D=.16+.22*L):z.region==="slot"?(A=[.03,.03,.035],$=0,D=.85):z.region==="recess"?(A=[.07,.085,.1],$=0,D=.62+.2*(N-.5)):(A=y>.91&&y<.985&&v>.12&&v<.88&&Math.floor((v+y)*22)%2===0?[.02,.02,.02]:[.75,.33,.04],$=0,D=.48+.18*(N-.5),O&&(A=[.7,.71,.73],$=1,D=.5));const U=ne(.55,.75,se(v*6+3,y*6));$<.5&&(A=A.map(oe=>oe*(1-.35*U)),D=Math.min(1,D+.15*U)),z.region!=="slot"&&z.region!=="plate"&&(D=te(D+.22*(ee(v*64,y*64)-.5)));const J=Math.max(0,x[s]-z.h),W=te(1-7*J)*(z.region==="slot"?.55:1)*(.86+.14*ee(v*70+9,y*70)),V=z.glow;a.set([I(K(A[0])),I(K(A[1])),I(K(A[2])),255],s*4),t.set([I(T*.5+.5),I(C*.5+.5),I(S*.5+.5),255],s*4),n[s]=I(W),h[s]=I(D),d[s]=I($),c.set([I(K(B[0]*V)),I(K(B[1]*V)),I(K(B[2]*V)),255],s*4),k.set([a[s*4],a[s*4+1],a[s*4+2],I(V)],s*4),u.set([n[s],h[s],d[s],255],s*4),G.set([t[s*4],t[s*4+1]],s*2)}const R=$e(u);return ae={albedo:a,normal:t,ao:n,rough:h,metal:d,emissive:c,albE:k,orm:u,ormBC1:R.out,nrmRG:G,emiColor:B,bc1Err:{mean:R.mean,max:R.max}},ae}function H(e,o,l=!1){const i=o===1?he:o===2?Re:ye,r=new xe(e,g,g,i,ge);return r.wrapS=r.wrapT=Be,r.magFilter=ke,r.minFilter=Ge,r.generateMipmaps=!0,r.anisotropy=4,r.colorSpace=l?Me:we,r.needsUpdate=!0,r}const Ie=2048*2048*4/3/(1024*1024),X={unpacked:{tex:6,samples:6,raw:15,bc:.5+1+.5*3+.5,rawFmt:"RGBA8×3 + R8×3",bcFmt:"BC1 알베도 · BC7 노멀 · BC4×3 · BC1 발광"},"orm-rg":{tex:3,samples:3,raw:10,bc:3,rawFmt:"RGBA8×2 + RG8",bcFmt:"BC7 알베도+A · BC7 ORM · BC5 노멀"},"orm-rgb":{tex:4,samples:4,raw:4*4,bc:.5+1+1+.5,rawFmt:"RGBA8×4",bcFmt:"BC1 알베도 · BC7 ORM · BC7 노멀 · BC1 발광"}},q=e=>e*Ie,ue=e=>e>=20?e.toFixed(0):e.toFixed(1),He=`
attribute vec4 tangent;
varying vec3 vWP; varying vec3 vN; varying vec4 vT; varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.);
  vWP = wp.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  vT = vec4(normalize(mat3(modelMatrix) * tangent.xyz), tangent.w);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Le=`
varying vec3 vWP; varying vec3 vN; varying vec4 vT; varying vec2 vUv;
uniform vec3 uLight; uniform vec3 uEmiColor; uniform float uEmiI;
uniform float uSwap; uniform float uNoZ;
uniform int uChan; uniform float uGain;
#define PI 3.14159265
// PATH 0 = 분리 6장, 1 = ORM + RG 노멀 (+ 알베도 A = 발광 마스크), 2 = ORM + RGB 노멀 + 발광 별도
// DIFF 1 = 기준(분리) 경로도 함께 계산해 차이를 출력 (디버그용: 이때만 샘플이 늘어남)
#if PATH == 0 || PATH == 2 || DIFF == 1
uniform sampler2D tAlb; uniform sampler2D tNrm; uniform sampler2D tEmi;
#endif
#if PATH == 0 || DIFF == 1
uniform sampler2D tAO; uniform sampler2D tRgh; uniform sampler2D tMtl;
#endif
#if PATH >= 1
uniform sampler2D tORM;
#endif
#if PATH == 1
uniform sampler2D tAlbE; uniform sampler2D tNrmRG;
#endif

struct S { vec3 alb; vec3 n; float ao; float r; float m; vec3 e; };

// 알베도·발광은 sRGB 텍스처(SRGB8_ALPHA8)라 하드웨어가 필터링 전에 선형으로 디코딩해 준다.
vec3 l2s(vec3 c){ c = clamp(c, 0., 1.); return mix(c * 12.92, 1.055 * pow(c, vec3(1. / 2.4)) - .055, step(.0031308, c)); }
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }

vec3 toWorld(vec3 t){
  vec3 Nn = normalize(vN);
  vec3 T = normalize(vT.xyz - Nn * dot(Nn, vT.xyz));
  vec3 B = cross(Nn, T) * vT.w;
  return normalize(T * t.x + B * t.y + Nn * t.z);
}

#if PATH == 0 || DIFF == 1
S fetchRef(){
  S s;
  s.alb = texture2D(tAlb, vUv).rgb;
  s.n = toWorld(texture2D(tNrm, vUv).rgb * 2. - 1.);
  s.ao = texture2D(tAO, vUv).r;
  s.r = texture2D(tRgh, vUv).r;
  s.m = texture2D(tMtl, vUv).r;
  s.e = texture2D(tEmi, vUv).rgb * uEmiI;
  return s;
}
#endif

#if PATH >= 1
S fetchPk(){
  S s;
  vec3 orm = texture2D(tORM, vUv).rgb;      // 한 번의 샘플로 세 값
  // 실수 "sRGB로 읽음"은 같은 데이터를 sRGB 텍스처로 올려 바인딩하는 것으로 재현 (하드웨어가 디코딩)
  s.ao = orm.r;
  s.r = mix(orm.g, orm.b, uSwap);            // 실수: 채널 순서 착각 (금속을 G에서 읽음)
  s.m = mix(orm.b, orm.g, uSwap);
#if PATH == 1
  vec4 ae = texture2D(tAlbE, vUv);
  s.alb = ae.rgb;                            // RGB는 sRGB 디코딩, A는 항상 선형
  s.e = uEmiColor * ae.a * uEmiI;
  vec3 t = texture2D(tNrmRG, vUv).rgb;      // RG 텍스처: b는 항상 0
  vec3 tn;
  if (uNoZ > .5) tn = t * 2. - 1.;          // 실수: RGB 노멀처럼 읽음 → z = -1
  else { vec2 xy = t.xy * 2. - 1.; tn = vec3(xy, sqrt(max(0., 1. - dot(xy, xy)))); }
  s.n = toWorld(tn);
#else
  s.alb = texture2D(tAlb, vUv).rgb;
  s.n = toWorld(texture2D(tNrm, vUv).rgb * 2. - 1.);
  s.e = texture2D(tEmi, vUv).rgb * uEmiI;
#endif
  return s;
}
#endif

// 간단한 해석적 환경광: 하늘·바닥 그라데이션 + 소프트박스 하나 (거칠기에 따라 넓어짐)
vec3 env(vec3 d, float r){
  vec3 c = mix(vec3(.05, .045, .04), vec3(.32, .38, .48), smoothstep(-.35, .7, d.y));
  float e = mix(600., 3., sqrt(r));
  float box = pow(max(dot(d, normalize(vec3(-.45, .75, .5))), 0.), e) * mix(9., .5, sqrt(r));
  float rim = pow(max(dot(d, normalize(vec3(.8, .2, -.6))), 0.), e * .5) * mix(3., .2, sqrt(r));
  // 카메라 뒤쪽의 띠 조명: 매끈해지면(거칠기 ↓) 정면 패널에 선명한 반사 띠가 생김
  vec3 fd = normalize(vec3(.25, .3, 1.));
  float band = pow(max(dot(normalize(vec3(d.x, d.y * 2.5, d.z)), fd), 0.), e * .6) * mix(4., .25, sqrt(r));
  return c + vec3(1., .97, .92) * box + vec3(.6, .75, 1.) * rim + vec3(1., .92, .85) * band;
}

vec3 shade(S s){
  vec3 V = normalize(cameraPosition - vWP);
  vec3 L = normalize(uLight);
  vec3 H = normalize(L + V);
  float NL = max(dot(s.n, L), 0.), NV = max(dot(s.n, V), 1e-3), NH = max(dot(s.n, H), 0.), VH = max(dot(V, H), 0.);
  float a = max(s.r * s.r, .002), a2 = a * a;
  float dd = NH * NH * (a2 - 1.) + 1.;
  float D = a2 / (PI * dd * dd);
  float k = (s.r + 1.) * (s.r + 1.) / 8.;
  float Vis = 1. / ((NL * (1. - k) + k) * (NV * (1. - k) + k) * 4.);
  vec3 F0 = mix(vec3(.04), s.alb, s.m);
  vec3 F = F0 + (1. - F0) * pow(1. - VH, 5.);
  vec3 kd = (1. - F) * (1. - s.m);
  vec3 direct = (kd * s.alb / PI + D * Vis * F) * NL * vec3(1., .95, .88) * 3.2;
  vec3 R = reflect(-V, s.n);
  vec3 Fa = F0 + (max(vec3(1. - s.r), F0) - F0) * pow(1. - NV, 5.);
  vec3 amb = (env(s.n, 1.) * s.alb * (1. - s.m) * (1. - Fa) + env(R, s.r) * Fa) * s.ao;
  return direct + amb + s.e;
}

vec3 display(S s){
  if (uChan == 0) return l2s(aces(shade(s)));
  if (uChan == 1) return l2s(s.alb);
  if (uChan == 2) return s.n * .5 + .5;
  if (uChan == 3) return vec3(s.ao);      // 마스크는 저장값 그대로 화면에 (0.5 = 중간 회색)
  if (uChan == 4) return vec3(s.r);
  if (uChan == 5) return vec3(s.m);
  return l2s(s.e / uEmiI);
}

void main(){
#if PATH == 0
  S s = fetchRef();
#else
  S s = fetchPk();
#endif
  vec3 c = display(s);
#if DIFF == 1
  c = abs(c - display(fetchRef())) * uGain;
#endif
  gl_FragColor = vec4(c, 1.);
}`,Ue={final:0,albedo:1,normal:2,ao:3,rough:4,metal:5,emissive:6};function Ve(e,o){const i=(e.params.num("light",40)+(e.params.bool("spin",!0)?o*30:0))*Math.PI/180;return new ie(Math.cos(i),.75,Math.sin(i)).normalize()}function We(e,o){const l=e.properties.get(o).currentProgram;if(!l)return-1;const i=e.getContext(),r=i.getProgramParameter(l.program,i.ACTIVE_UNIFORMS);let x=0;for(let B=0;B<r;B++){const f=i.getActiveUniform(l.program,B);f&&f.type===i.SAMPLER_2D&&x++}return x}const qe=(e,o)=>{switch(e){case"srgb":return`거칠기 0.50→${me(.5).toFixed(2)}, AO 0.60→${me(.6).toFixed(2)}로 읽힘`;case"swap":return"G를 금속, B를 거칠기로 읽음 → 도장이 거울로";case"noz":return"RG 텍스처의 B=0을 그대로 → z = −1 (안쪽)";case"bc1":{const l=o.bc1Err;return`인덱스 공유 → 평균 오차 AO ${l.mean[0].toFixed(1)} · 거칠기 ${l.mean[1].toFixed(1)} · 금속 ${l.mean[2].toFixed(1)} /255`}default:return'"패킹" 뷰어와 같은 결과'}};function ce(e,o){return ze(e,{antialias:!0,cam:[.3,1.55,4],target:[.05,.7,0],fov:42},({scene:l,camera:i,renderer:r})=>{const x=new be(1053723),B=new be(0);l.background=x;const f=de(),a={tAlb:H(f.albedo,4,!0),tNrm:H(f.normal,4),tAO:H(f.ao,1),tRgh:H(f.rough,1),tMtl:H(f.metal,1),tEmi:H(f.emissive,4,!0),tAlbE:H(f.albE,4,!0),tORM:H(f.orm,4),tNrmRG:H(f.nrmRG,2)},t=H(f.ormBC1,4),n=H(f.orm,4,!0),h=a.tORM,d={uLight:{value:new ie(1,1,1)},uEmiColor:{value:new ie(...f.emiColor)},uEmiI:{value:3},uSwap:{value:0},uNoZ:{value:0},uChan:{value:0},uGain:{value:10}};for(const[F,O]of Object.entries(a))d[F]={value:O};const c=()=>o==="ref"?0:o==="mistake"?1:e.params.str("pack","orm-rg")==="orm-rgb"?2:1,k=(F,O)=>new Oe({uniforms:d,vertexShader:He,fragmentShader:Le,defines:{PATH:F,DIFF:O}});let u=c(),G=k(u,0),w=k(u,1);const R=new Ae(1.3,1.3,1.3);R.computeTangents();const p=new Ce(.5,.5,1.5,48,1),m=p.getAttribute("uv");for(let F=0;F<m.count;F++)m.setX(F,m.getX(F)*2);p.computeTangents();const s=new pe(R,G);s.position.set(-.8,.65,0),s.rotation.y=.55;const v=new pe(p,G);v.position.set(.95,.75,.15),v.rotation.y=-.4,l.add(s,v);const y=[s,v],z=F=>y.forEach(O=>O.material=F),E=new Fe(160,100);let b=new Uint8Array(160*100*4),M=-1,S=0,T=0;const C=()=>{const F=r.getDrawingBufferSize(new Se),O=Math.max(64,Math.min(480,Math.round(F.x))),A=Math.max(40,Math.round(O/i.aspect));(E.width!==O||E.height!==A)&&(E.setSize(O,A),b=new Uint8Array(O*A*4)),z(w);const D=d.uGain.value;d.uGain.value=1,l.background=B,r.setRenderTarget(E),r.render(l,i),r.setRenderTarget(null),r.readRenderTargetPixels(E,0,0,O,A,b),d.uGain.value=D;let $=0,U=0,J=0;for(let W=0;W<O*A;W++){const V=Math.max(b[W*4],b[W*4+1],b[W*4+2]);V>$&&($=V),V>4&&U++,J++}M=$,S=U/J*100};let N=-1;const L=e.params.on(F=>{if(F==="pack"&&o==="packed"){const O=c();O!==u&&(u=O,G.dispose(),w.dispose(),G=k(u,0),w=k(u,1),N=-1)}T=0});return{update(F,O){d.uLight.value.copy(Ve(e,O)),d.uChan.value=Ue[e.params.str("chan","final")]??0;const A=o==="mistake"?e.params.str("mistake","srgb"):"none";d.uSwap.value=A==="swap"?1:0,d.uNoZ.value=A==="noz"?1:0,d.tORM.value=A==="bc1"?t:A==="srgb"?n:h,o!=="ref"&&(T-=F,T<=0&&(C(),T=.4));const D=o!=="ref"&&e.params.bool("diff",!1);z(D?w:G),l.background=D?B:x,N<0&&(N=We(r,G));const U=X[o==="ref"?"unpacked":o==="mistake"?"orm-rg":u===2?"orm-rgb":"orm-rg"],W=`${o==="ref"?"분리 6장":u===2?"ORM+RGB노멀 4장":"ORM+RG노멀 3장"} · 샘플 ${U.samples}/px · 텍스처 유닛 ${N<0?"…":N} (실측)`,V=`메모리 2048²+밉: 무압축 ${ue(q(U.raw))} · BC ${ue(q(U.bc))} MB`,oe=M<0?"측정 중":`${M}/255`,fe=o==="ref"?"기준 이미지 (오차 0)":`기준 대비 최대 오차 ${oe} · 4 초과 ${S.toFixed(1)}%${D?" · 차이×10":""}`;o==="mistake"?e.hud(`실수: ${ve[A]??A} · 샘플 ${U.samples}/px
${qe(A,f)}
${fe}`):e.hud(`${W}
${V}
${fe}`)},dispose(){L(),Object.values(a).forEach(F=>F.dispose()),t.dispose(),n.dispose(),G.dispose(),w.dispose(),E.dispose()}}})}const ve={srgb:"마스크를 sRGB로 읽음",swap:"채널 뒤바뀜 (금속↔거칠기)",noz:"노멀 Z 복원 생략",bc1:"BC1 압축 크로스토크",none:"실수 없음"};function _e(e){const l=document.createElement("canvas");l.width=l.height=128;const i=l.getContext("2d"),r=i.createImageData(128,128),x=g/128;for(let B=0;B<128;B++)for(let f=0;f<128;f++){const a=Math.floor((127-B)*x+x/2),t=Math.floor(f*x+x/2),[n,h,d]=e(a*g+t),c=(B*128+f)*4;r.data[c]=n,r.data[c+1]=h,r.data[c+2]=d,r.data[c+3]=255}return i.putImageData(r,0,0),l}const Z="#ff6b6b",j="#4ade80",Q="#5b9cff",P="#c8d0dc",Y="#facc15";function Ze(e){const o=(t,n,h)=>d=>{const c=t[d*n+h];return[c,c,c]},l=t=>n=>[t[n*4],t[n*4+1],t[n*4+2]],i=t=>{const n=e.nrmRG[t*2]/255*2-1,h=e.nrmRG[t*2+1]/255*2-1,d=Math.sqrt(Math.max(0,1-n*n-h*h)),c=Math.round((d*.5+.5)*255);return[c,c,c]},r=[{key:"albedo",label:"알베도 RGB",color:P,px:l(e.albedo)},{key:"normal",label:"노멀 R=x",color:Z,px:o(e.normal,4,0)},{key:"normal",label:"노멀 G=y",color:j,px:o(e.normal,4,1)},{key:"normal",label:"노멀 B=z",color:Q,px:o(e.normal,4,2)},{key:"ao",label:"AO (R8)",color:P,px:o(e.ao,1,0)},{key:"rough",label:"거칠기 (R8)",color:P,px:o(e.rough,1,0)},{key:"metal",label:"금속 (R8)",color:P,px:o(e.metal,1,0)},{key:"emissive",label:"발광 RGB",color:P,px:l(e.emissive)}],x=[{key:"albedo",label:"①RGB 알베도",color:P,px:l(e.albE)},{key:"emissive",label:"①A 발광",color:P,px:o(e.albE,4,3)},{key:"ao",label:"②R AO",color:Z,px:o(e.orm,4,0)},{key:"rough",label:"②G 거칠기",color:j,px:o(e.orm,4,1)},{key:"metal",label:"②B 금속",color:Q,px:o(e.orm,4,2)},{key:"normal",label:"③R 노멀 x",color:Z,px:o(e.nrmRG,2,0)},{key:"normal",label:"③G 노멀 y",color:j,px:o(e.nrmRG,2,1)},{key:"normal",label:"z 계산",color:Y,px:i,dashed:!0}],B=t=>Math.round(me(t/255)*255),f=t=>{const n=Math.min(1,t/24);return[Math.round(255*Math.min(1,n*2)),Math.round(255*Math.max(0,n*2-1)),30]},a={srgb:[{key:"rough",label:"G 저장값",color:j,px:o(e.orm,4,1)},{key:"rough",label:"G sRGB로 읽힘",color:Z,px:t=>{const n=B(e.orm[t*4+1]);return[n,n,n]}},{key:"ao",label:"R 저장값",color:Z,px:o(e.orm,4,0)},{key:"ao",label:"R sRGB로 읽힘",color:Z,px:t=>{const n=B(e.orm[t*4]);return[n,n,n]}}],swap:[{key:"metal",label:"금속 ← G",color:j,px:o(e.orm,4,1)},{key:"rough",label:"거칠기 ← B",color:Q,px:o(e.orm,4,2)},{key:"metal",label:"올바른 금속",color:P,px:o(e.orm,4,2)},{key:"rough",label:"올바른 거칠기",color:P,px:o(e.orm,4,1)}],noz:[{key:"normal",label:"RG의 B = 0",color:Q,px:()=>[0,0,0]},{key:"normal",label:"복원된 z",color:Y,px:i},{key:"normal",label:"RG를 색으로",color:P,px:t=>[e.nrmRG[t*2],e.nrmRG[t*2+1],0]},{key:"normal",label:"RGB 노멀",color:P,px:l(e.normal)}],bc1:[{key:"ao",label:"BC1 R AO",color:Z,px:o(e.ormBC1,4,0)},{key:"rough",label:"BC1 G 거칠기",color:j,px:o(e.ormBC1,4,1)},{key:"metal",label:"BC1 B 금속",color:Q,px:o(e.ormBC1,4,2)},{key:"ao",label:"AO 오차",color:Y,px:t=>f(Math.abs(e.ormBC1[t*4]-e.orm[t*4]))},{key:"rough",label:"거칠기 오차",color:Y,px:t=>f(Math.abs(e.ormBC1[t*4+1]-e.orm[t*4+1]))},{key:"metal",label:"금속 오차",color:Y,px:t=>f(Math.abs(e.ormBC1[t*4+2]-e.orm[t*4+2]))}],none:[{key:"ao",label:"ORM을 RGB로",color:P,px:l(e.orm)},{key:"normal",label:"RG 노멀 색",color:P,px:t=>[e.nrmRG[t*2],e.nrmRG[t*2+1],0]},{key:"albedo",label:"① RGBA",color:P,px:l(e.albE)}]};return{unpacked:r,packed:x,mist:a}}function Ke(e){return Te(e,()=>{const o=de(),l=Ze(o),i=a=>a.cv??(a.cv=_e(a.px)),r=(a,t,n,h,d,c,k,u,G)=>{_(a,t,h,d+G,"#e6ebf2",G,"left","bold");const w=d+G+4;return n.forEach((R,p)=>{const m=h+p*(c+k);a.imageSmoothingEnabled=!0,a.drawImage(i(R),m,w,c,c),a.lineWidth=u===R.key?2:1,a.strokeStyle=u===R.key?"#ffffff":R.color,a.setLineDash(R.dashed?[3,3]:[]),a.strokeRect(m+.5,w+.5,c-1,c-1),a.setLineDash([]),a.font=`${Math.max(8,G-2)}px ${le}`;let s=R.label;for(a.measureText(s).width>c+k-2&&(s=s.replace(/ \(.*\)$/,""));s.length>2&&a.measureText(s).width>c+k-2;)s=s.slice(0,-1);_(a,s,m,w+c+G-1,R.color,Math.max(8,G-2))}),w+c+G+4},x=[{label:"분리 6장 · 무압축",v:q(X.unpacked.raw),s:6,c:"#7d8799"},{label:"분리 6장 · BC1/BC4/BC7",v:q(X.unpacked.bc),s:6,c:"#5b9cff"},{label:"ORM+RG 3장 · 무압축",v:q(X["orm-rg"].raw),s:3,c:"#7d8799"},{label:"ORM+RG 3장 · BC7/BC7/BC5",v:q(X["orm-rg"].bc),s:3,c:"#4ade80"},{label:"ORM을 BC1로 (크로스토크)",v:q(.5+1+1),s:3,c:"#f87171"},{label:"ORM+RGB 4장 · BC",v:q(X["orm-rgb"].bc),s:4,c:"#ff9a3c"}],B=(a,t,n,h,d,c)=>{_(a,"텍스처 메모리 추정 (2048² + 밉, MB) · 픽셀당 샘플",t,n+c,"#e6ebf2",c,"left","bold");const k=n+c+6,u=Math.max(c+4,(d-(k-n))/x.length),G=Math.min(h*.5,c*13.5),w=Math.max(...x.map(R=>R.v));x.forEach((R,p)=>{const m=k+p*u,s=Math.max(4,u*.5);a.font=`${c-1}px ${le}`;let v=R.label;for(;v.length>2&&a.measureText(v).width>G-4;)v=v.slice(0,-1);_(a,v,t,m+s*.5+c*.35,"#c8d0dc",c-1);const y=(h-G-c*7)*R.v/w;a.fillStyle=R.c,a.fillRect(t+G,m,Math.max(2,y),s),_(a,`${ue(R.v)} MB · ${R.s}샘플`,t+G+y+4,m+s*.5+c*.35,"#e6ebf2",c-1)})},f=(a,t,n,h,d,c)=>{_(a,"셰이더에서 읽는 법 (패킹 세트)",t,n+d,"#e6ebf2",d,"left","bold");const k=[["vec3 orm = texture(tORM, uv).rgb;   // 1샘플로 3값","#c8d0dc"],["float ao = orm.r, rough = orm.g, metal = orm.b;","#c8d0dc"],["vec2 xy = texture(tNrm, uv).rg * 2.0 - 1.0;","#c8d0dc"],["float z = sqrt(saturate(1.0 - dot(xy, xy)));","#c8d0dc"]],u="#f87171";c==="srgb"&&k.splice(0,1,["vec3 orm = texture(tORM, uv).rgb;   // 틀림: tORM이 sRGB",u],["//  → 하드웨어가 디코딩: 0.5가 0.21로",u]),c==="swap"&&k.splice(1,1,["float ao = orm.r, rough = orm.b, metal = orm.g; // 틀림",u]),c==="noz"&&k.splice(2,2,["vec3 n = texture(tNrm, uv).rgb * 2.0 - 1.0; // 틀림",u],["//  → RG 텍스처의 b = 0 이라 z = -1",u]),c==="bc1"&&k.push(["// tORM = BC1: 4×4 블록의 16텍셀이 끝점 2색 사이",u],["//  4단계 중 하나 → 세 채널이 함께 움직임",u]);const G=d+3;a.font=`${d-1}px ${le}`,k.forEach(([w,R],p)=>{let m=w;for(;m.length>4&&a.measureText(m).width>h;)m=m.slice(0,-1);_(a,m,t,n+d+8+(p+1)*G,R,d-1)})};return{draw(a,t,n){De(a,t,n);const h=e.params.str("chan","final"),d=e.params.str("mistake","srgb"),c=t<640,k=c?9:11,u=c?6:10,G=c?t-u*2:t*.6-u*2,w=c?k+10+x.length*(k+5):n-u*2,R=c?n-w-u*2:n-u*2,p=c?3:6,m=k*2+10,s=Math.max(18,Math.min((G-p*7)/8,(R-m*3)/3));let v=u;if(v=r(a,"분리 세트 · 6장 · 샘플 6",l.unpacked,u,v,s,p,h,k),v=r(a,"패킹 세트 · ①알베도+발광 ②ORM ③RG 노멀 · 샘플 3",l.packed,u,v,s,p,h,k),r(a,`실수 미리보기: ${ve[d]??d}`,l.mist[d]??l.mist.none,u,v,s,p,h,k),c)B(a,u,n-w-u,t-u*2,w,k);else{const y=Math.min(n*.56,240);B(a,t*.6+u,u,t*.4-u*2,y,k),n-y>110&&f(a,t*.6+u,u+y+8,t*.4-u*2,k,d)}}}})}const Ye={layout:"compare",intro:'PBR 재질 하나에는 알베도·노멀·AO·거칠기·금속성·발광 등 맵이 여러 장 필요합니다. 흑백 마스크를 각각 따로 두면 텍스처 바인딩과 샘플(fetch)이 맵 수만큼 늘어납니다. <b>채널 패킹</b>은 흑백 마스크 셋을 한 텍스처의 R·G·B에 넣고(glTF식 <b>ORM</b>: R=AO, G=거칠기, B=금속성), 노멀은 x·y 두 채널만 저장해 z를 셰이더에서 복원합니다. 같은 그림을 더 적은 샘플로 그린다는 것을 "차이 ×10"으로 확인하고, 패킹할 때 흔히 저지르는 실수가 화면에 어떻게 나타나는지 보세요.',how:["흑백 마스크(AO·거칠기·금속성)는 각각 한 채널이면 충분 → 한 RGBA 텍스처의 R·G·B(·A)에 나눠 담는다.","셰이더는 한 번 샘플해 swizzle: ao = t.r, roughness = t.g, metallic = t.b.","노멀은 단위 벡터이고 탄젠트 공간 z ≥ 0 → x, y만 저장(BC5 등 2채널 형식), z = √(1 − x² − y²).","패킹 마스크는 반드시 선형(sRGB 끔). 색 텍스처(알베도·발광)만 sRGB.","남는 채널(알베도 A 등)에 발광 마스크·불투명도·디테일 마스크를 넣기도 한다."],pros:["샘플·텍스처 바인딩 수 감소 (6 → 3)","파일·스트리밍 요청·머티리얼 슬롯이 줄어 관리가 쉬움","블록 압축에서 2채널 노멀(BC5)은 RGB 압축보다 품질이 좋음"],cons:["채널 순서 규약이 엔진·툴마다 달라 뒤바뀌기 쉬움","패킹한 채널을 한 블록 압축(BC1)에 넣으면 채널끼리 오차가 번짐","맵마다 해상도를 다르게 줄 수 없음 (한 텍스처는 한 해상도)"],usedIn:"glTF 2.0 (occlusion R, metallicRoughness G·B — 같은 이미지를 ORM으로 공유 가능), Substance Painter의 엔진별 패킹 내보내기 프리셋, Unity HDRP Mask Map(R 금속·G AO·B 디테일 마스크·A 매끄러움), UE 프로젝트에서 흔한 ORM/RMA 관례.",controls:[{type:"select",key:"pack",label:"패킹 방식",value:"orm-rg",options:[{label:"ORM + 2채널 노멀 (3장)",value:"orm-rg"},{label:"ORM + RGB 노멀 (4장)",value:"orm-rgb"}]},{type:"select",key:"mistake",label:"흔한 실수",value:"srgb",options:[{label:"마스크를 sRGB로 읽음",value:"srgb"},{label:"채널 뒤바뀜 (금속↔거칠기)",value:"swap"},{label:"노멀 Z 복원 생략",value:"noz"},{label:"BC1 압축 크로스토크",value:"bc1"},{label:"실수 없음",value:"none"}]},{type:"select",key:"chan",label:"채널 보기",value:"final",options:[{label:"최종 셰이딩",value:"final"},{label:"알베도",value:"albedo"},{label:"노멀 (월드)",value:"normal"},{label:"AO",value:"ao"},{label:"거칠기",value:"rough"},{label:"금속성",value:"metal"},{label:"발광",value:"emissive"}]},{type:"toggle",key:"diff",label:"차이 ×10 보기",value:!1},{type:"range",key:"light",label:"광원 회전 (°)",min:0,max:360,step:1,value:40},{type:"toggle",key:"spin",label:"광원 자동 회전",value:!0}],viewers:[{title:"분리: 맵 6장 (기준)",kind:"before",caption:'알베도·노멀(RGB)·AO·거칠기·금속성·발광을 각각 다른 텍스처로. 픽셀마다 6번 샘플하고 텍스처 유닛 6개를 묶는다. 다른 뷰어의 "차이"는 이 그림과 비교한 값.',mount:e=>ce(e,"ref")},{title:"패킹: ORM + 2채널 노멀",kind:"after",caption:'같은 데이터를 ORM(R=AO, G=거칠기, B=금속성) 한 장, 노멀 x·y 한 장(z는 계산), 알베도 A에 발광 마스크로. 샘플 3번. "차이 ×10 보기"를 켜면 거의 검은색: 4/255를 넘는 픽셀이 거의 없고, 남는 차이는 필터링된 x·y로 z를 복원할 때의 미세한 법선 차이.',mount:e=>ce(e,"packed")},{title:"흔한 실수",kind:"variant",caption:"패킹 세트를 잘못 읽었을 때. sRGB로 읽으면 거칠기가 작아져 도장이 반짝이고 AO가 짙어진다. 채널이 바뀌면 도장이 거울이 되고, Z 복원을 빼면 법선이 뒤집혀 어두워진다. BC1은 세 채널이 같은 인덱스를 써서 서로 번진다.",mount:e=>ce(e,"mistake")},{title:"텍스처 세트 채널 · 메모리",kind:"info",wide:!0,caption:'각 텍스처를 채널별 타일로 펼친 모습(흰 테두리 = "채널 보기"에서 고른 맵). 아래 줄은 고른 실수가 데이터에 어떤 영향을 주는지. 막대는 2048² 기준 메모리 추정: 무압축에선 R8 마스크가 이미 작아 패킹 이득이 주로 샘플 수에서 나오고, BC에선 BC4 ×3(1.5 B/px)을 BC7 한 장(1 B/px)으로 줄인다.',mount:e=>Ke(e)}]};export{Ye as default};
