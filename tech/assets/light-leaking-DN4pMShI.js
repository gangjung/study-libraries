import{p as _t,k as yt,aQ as At,g as nt,u as wt,M as st,B as Wt,P as zt,w as Mt,a3 as Lt,a4 as Nt,aq as Rt,a8 as Bt,S as Gt,am as Xt,aB as Et,ac as kt,ag as Tt,au as Ht,N as Ut,aw as jt,s as Vt,L as qt}from"./three.module-BZgG6AUv.js";import{m as gt}from"./canvas-viewer-Btf0JXdr.js";import{m as Kt}from"./three-viewer-0rZIEDzf.js";const c={x0:-4,x1:4,y0:0,y1:2.4,z0:-2.5,z1:2.5},Q=.3,lt=Math.hypot(.3,-.6,1),j=[.3/lt,-.6/lt,1/lt],It=[6,3.4,1.3],I={x0:-2.6,x1:-.6,y0:.5,y1:1.9,e:[3.2,1.9,.8]},it={x0:1.4,x1:3,y0:.7,y1:1.7,e:[.1,.17,.4]},Zt=[.36,.22,.09],St=[.008,.012,.025],Yt=[.72,.68,.62],Qt=[.78,.78,.78],ot=12,H=ot+2,tt={t:0,nx:0,ny:0,nz:0,back:!1};function pt(t,o,s,n,a,i,l,r){let f=1/0,d=0,v=0,e=0;if(i>1e-9){const p=(c.x1-s)/i;p<f&&(f=p,d=-1,v=0,e=0)}else if(i<-1e-9){const p=(c.x0-s)/i;p<f&&(f=p,d=1,v=0,e=0)}if(l>1e-9){const p=(c.y1-n)/l;p<f&&(f=p,d=0,v=-1,e=0)}else if(l<-1e-9){const p=(c.y0-n)/l;p<f&&(f=p,d=0,v=1,e=0)}if(r>1e-9){const p=(c.z1-a)/r;p<f&&(f=p,d=0,v=0,e=-1)}else if(r<-1e-9){const p=(c.z0-a)/r;p<f&&(f=p,d=0,v=0,e=1)}let y=!1;if(s>t&&s<o){const p=i>1e-9?(o-s)/i:i<-1e-9?(t-s)/i:1/0;p<f&&(f=p,d=i>0?-1:1,v=0,e=0),y=!0}else if(s<=t&&i>1e-9){const p=(t-s)/i;p<f&&(f=p,d=-1,v=0,e=0)}else if(s>=o&&i<-1e-9){const p=(o-s)/i;p<f&&(f=p,d=1,v=0,e=0)}return tt.t=f,tt.nx=d,tt.ny=v,tt.nz=e,tt.back=y,tt}function Jt(t,o,s,n,a,i,l){if(o>t+.001)return 0;const r=-(a*j[0]+i*j[1]+l*j[2]);if(r<=0)return 0;const f=(n-c.z0)/j[2],d=o-f*j[0],v=s-f*j[1];return d<I.x0||d>I.x1||v<I.y0||v>I.y1?0:r}function $t(t,o,s,n,a,i,l){if(l[0]=l[1]=l[2]=0,i.back)return;if(i.nz>.5&&a<c.z0+.001){for(const v of[I,it])if(s>v.x0&&s<v.x1&&n>v.y0&&n<v.y1){l[0]=v.e[0],l[1]=v.e[1],l[2]=v.e[2];return}}const r=i.ny>.5?Yt:Qt,f=Jt(t,s,n,a,i.nx,i.ny,i.nz),d=s<=t+.001?Zt:(s>=o-.001,St);for(let v=0;v<3;v++)l[v]=r[v]*(It[v]*f+d[v])}function te(t){const o=new Float32Array(t*3),s=Math.PI*(3-Math.sqrt(5));for(let n=0;n<t;n++){const a=1-(n+.5)/t*2,i=Math.sqrt(1-a*a);o[n*3]=Math.cos(s*n)*i,o[n*3+1]=a,o[n*3+2]=Math.sin(s*n)*i}return o}const Z=te(160);function ee(t,o,s){t>1?(t=2-t,o=-o):t<-1&&(t=-2-t,o=-o),o>1?(o=2-o,t=-t):o<-1&&(o=-2-o,t=-t);let n=t,a=o;const i=1-Math.abs(t)-Math.abs(o);i<0&&(n=(1-Math.abs(o))*(t>=0?1:-1),a=(1-Math.abs(t))*(o>=0?1:-1));const l=Math.hypot(n,a,i);s[0]=n/l,s[1]=a/l,s[2]=i/l}function oe(t,o,s,n){const a=Math.abs(t)+Math.abs(o)+Math.abs(s);let i=t/a,l=o/a;if(s<0){const r=i;i=(1-Math.abs(l))*(r>=0?1:-1),l=(1-Math.abs(r))*(l>=0?1:-1)}n[0]=i,n[1]=l}const at=(()=>{const t=new Float32Array(H*H*5*3),o=[0,0,0],s=[[0,0],[.4,.4],[-.4,.4],[.4,-.4],[-.4,-.4]];for(let n=0;n<H;n++)for(let a=0;a<H;a++)s.forEach(([i,l],r)=>{const f=(a-1+.5+i)/ot*2-1,d=(n-1+.5+l)/ot*2-1;ee(f,d,o);const v=((n*H+a)*5+r)*3;t[v]=o[0],t[v+1]=o[1],t[v+2]=o[2]});return t})();function ne(t){const o=t.sp,s=Q-t.off*o,n=Math.floor((c.x0+.1-s)/o),a=Math.ceil((c.x1-.1-s)/o);let i=s+n*o,l=a-n+1;for(;i<c.x0+.05;)i+=o,l--;for(;i+(l-1)*o>c.x1-.05;)l--;const r=Math.max(2,Math.round(2.2/o)+1),f=Math.max(2,Math.round(4.8/o)+1);return{n:[l,r,f],min:[i,.1,-2.4],spc:[o,2.2/(r-1),4.8/(f-1)]}}function se(t){const o=performance.now(),s=Q-t.th/2,n=Q+t.th/2,{n:a,min:i,spc:l}=ne(t),r=a[0]*a[1]*a[2],f=new Float32Array(r*7*4),d=Math.ceil(Math.sqrt(r)),v=Math.ceil(r/d),e=d*H,y=v*H,p=new Float32Array(e*y*4),k=[0,0,0],x=new Float64Array(24);let A=0,S=0;for(let C=0;C<a[2];C++)for(let W=0;W<a[1];W++)for(let w=0;w<a[0];w++){const h=w+a[0]*(W+a[1]*C);let M=i[0]+w*l[0];const $=i[1]+W*l[1],b=i[2]+C*l[2];let m=0;if(t.reloc&&M>s&&M<n){const D=Math.min(.12,l[0]*.2),T=M-s<n-M?s-D:n+D,P=l[0]*.45;m=Math.max(-P,Math.min(P,T-M)),M+=m,S++}const _=M>s&&M<n;_&&A++,x.fill(0);for(let D=0;D<Z.length/3;D++){const T=Z[D*3],P=Z[D*3+1],L=Z[D*3+2],G=pt(s,n,M,$,b,T,P,L);$t(s,n,M+T*G.t,$+P*G.t,b+L*G.t,G,k);const N=[T,-T,P,-P,L,-L];for(let O=0;O<6;O++){const X=N[O];X<=0||(x[O*3]+=k[0]*X,x[O*3+1]+=k[1]*X,x[O*3+2]+=k[2]*X,x[18+O]+=X)}}const R=h*28;for(let D=0;D<6;D++)for(let T=0;T<3;T++)f[R+D*4+T]=x[D*3+T]/Math.max(1e-6,x[18+D]);f[R+24]=m,f[R+27]=_?0:1;const U=h%d*H,q=Math.floor(h/d)*H;for(let D=0;D<H;D++)for(let T=0;T<H;T++){let P=0,L=0;for(let N=0;N<5;N++){const O=((D*H+T)*5+N)*3,X=pt(s,n,M,$,b,at[O],at[O+1],at[O+2]),g=X.back?X.t*.2:X.t;P+=g,L+=g*g}const G=((q+D)*e+U+T)*4;p[G]=P/5,p[G+1]=L/5}}return{cfg:t,wl:s,wr:n,n:a,min:i,spc:l,count:r,probe:f,depth:p,tilesX:d,atlasW:e,atlasH:y,inside:A,moved:S,ms:performance.now()-o}}function ie(t,o,s,n,a,i){const l=o*28,r=l+(s>=0?0:4),f=l+(n>=0?8:12),d=l+(a>=0?16:20),v=s*s,e=n*n,y=a*a;for(let p=0;p<3;p++)i[p]=v*t.probe[r+p]+e*t.probe[f+p]+y*t.probe[d+p]}const rt=[0,0];function ce(t,o,s,n,a,i){oe(s,n,a,rt);const l=o%t.tilesX*H,r=Math.floor(o/t.tilesX)*H,f=l+1+(rt[0]*.5+.5)*ot-.5,d=r+1+(rt[1]*.5+.5)*ot-.5,v=Math.floor(f),e=Math.floor(d),y=f-v,p=d-e;i[0]=i[1]=0;for(let k=0;k<2;k++)for(let x=0;x<2;x++){const A=(x?y:1-y)*(k?p:1-p),S=((e+k)*t.atlasW+v+x)*4;i[0]+=t.depth[S]*A,i[1]+=t.depth[S+1]*A}}function le(t){return .3*.75*Math.min(t.spc[0],t.spc[1],t.spc[2])}const Y=[0,0,0],et=[0,0];function ht(t,o,s,n,a,i,l,r,f,d){const v=o.cheb?le(t):0,e=s+i*v,y=n+l*v,p=a+r*v,k=[(e-t.min[0])/t.spc[0],(y-t.min[1])/t.spc[1],(p-t.min[2])/t.spc[2]];for(let h=0;h<3;h++)k[h]=Math.max(0,Math.min(t.n[h]-1.001,k[h]));const x=[Math.floor(k[0]),Math.floor(k[1]),Math.floor(k[2])],A=[k[0]-x[0],k[1]-x[1],k[2]-x[2]];let S=0,C=0,W=0,w=0;d&&(d.length=0);for(let h=0;h<8;h++){const M=h&1,$=h>>1&1,b=h>>2&1,m=x[0]+M,_=x[1]+$,R=x[2]+b,U=m+t.n[0]*(_+t.n[1]*R),q=U*28,D=t.probe[q+27]>.5,T=t.min[0]+m*t.spc[0]+t.probe[q+24],P=t.min[1]+_*t.spc[1],L=t.min[2]+R*t.spc[2],G=(M?A[0]:1-A[0])*($?A[1]:1-A[1])*(b?A[2]:1-A[2]);let N=1,O=1;if(o.cls&&!D)N=0;else if(o.cheb){let g=T-s,J=P-n,u=L-a;const z=Math.hypot(g,J,u)||1;g/=z,J/=z,u/=z;const F=(g*i+J*l+u*r+1)*.5;N=F*F+.2;const B=e-T,E=y-P,V=p-L,K=Math.hypot(B,E,V)||1e-4;if(ce(t,U,B/K,E/K,V/K,et),K>et[0]){const dt=Math.abs(et[0]*et[0]-et[1]),bt=K-et[0];O=dt/(dt+bt*bt),O=Math.max(O*O*O,0)}N*=Math.max(.05,O),N=Math.max(1e-6,N),N<.2&&(N*=N*N/.04)}ie(t,U,i,l,r,Y);const X=G*N;S+=Y[0]*X,C+=Y[1]*X,W+=Y[2]*X,w+=X,d&&d.push({idx:U,ix:m,iy:_,iz:R,x:T,y:P,z:L,tri:G,vis:N,cheb:O,active:D,irr:[Y[0],Y[1],Y[2]]})}return w>0?(f[0]=S/w,f[1]=C/w,f[2]=W/w):f[0]=f[1]=f[2]=0,w}function Dt(t,o,s,n,a,i,l,r,f){let d=0,v=0,e=0,y=0;const p=[0,0,0],k=s+i*.001,x=n+l*.001,A=a+r*.001;for(let S=0;S<Z.length/3;S++){const C=Z[S*3],W=Z[S*3+1],w=Z[S*3+2],h=C*i+W*l+w*r;if(h<=0)continue;const M=pt(t,o,k,x,A,C,W,w);$t(t,o,k+C*M.t,x+W*M.t,A+w*M.t,M,p),d+=p[0]*h,v+=p[1]*h,e+=p[2]*h,y+=h}f[0]=d/y,f[1]=v/y,f[2]=e/y}const mt=t=>.2126*t[0]+.7152*t[1]+.0722*t[2];function ae(t){const o=Q-t/2,s=Q+t/2,n=[],a=[0,0,0],i=(l,r,f)=>{Dt(o,s,l[0],l[1],l[2],r[0],r[1],r[2],a),n.push({p:l,n:r,dark:f,truth:mt(a)})};for(let l=-2.4;l<=2.41;l+=.2){for(let r=s+.05;r<c.x1-.05;r+=.2)i([r,0,l],[0,1,0],!0);for(let r=.1;r<2.35;r+=.2)i([s,r,l],[1,0,0],!0);for(let r=o-.05;r>o-1.5;r-=.2)i([r,0,l],[0,1,0],!1);for(let r=.1;r<2.35;r+=.2)i([o,r,l],[-1,0,0],!1)}return n}function re(t,o,s){const n=[0,0,0],a=[];let i=0,l=0,r=0,f=0;for(const d of s){ht(t,o,d.p[0],d.p[1],d.p[2],d.n[0],d.n[1],d.n[2],n,a);const v=mt(n);d.dark?i+=Math.max(0,v-d.truth)*.04:l+=Math.max(0,d.truth-v)*.04;for(const e of a)e.tri<.001||(f++,e.vis<.1&&r++)}return{leak:i,halo:l,rejected:f?r/f:0}}const Ct=2.2;function Ot(t,o){let s=t.num("th",.1),n=t.num("sp",1.2);const a=t.num("off",.25);let i=!1,l={cheb:!1,cls:!1};if(o==="ddgi"&&(l={cheb:!0,cls:!1}),o==="fix"){const f=t.str("fix","thick");f==="reloc"&&(i=!0),f==="cls"&&(l={cheb:!1,cls:!0}),f==="thick"&&(s=Math.max(s,n*1.1),l={cheb:!1,cls:!0}),f==="dense"&&(n=Math.max(.5,n/2)),f==="all"&&(i=!0,l={cheb:!0,cls:!0})}return{cfg:{th:s,sp:n,off:a,reloc:i},mode:l,key:`${s.toFixed(3)}|${n.toFixed(3)}|${a.toFixed(3)}|${i?1:0}`}}function vt(t,o,s,n){let a=t.get(o);a||(a=new Map,t.set(o,a));let i=a.get(s);return i===void 0&&(i=n(),a.set(s,i),a.size>10&&a.delete(a.keys().next().value)),i}const ct=(t,o)=>vt(t,"ll-probes",o.key,()=>se(o.cfg)),fe=(t,o)=>vt(t,"ll-samples",o.toFixed(3),()=>ae(o)),xe=(t,o)=>vt(t,"ll-metrics",`${o.key}|${+o.mode.cheb}${+o.mode.cls}`,()=>re(ct(t,o),o.mode,fe(t,o.cfg.th)));function ut(t){let o=t.get("ll-pick");return o||(o={x:Q+.45,z:.9},t.set("ll-pick",o)),o}function Ft(t,o,s){t.x>o-.04&&t.x<s+.04&&(t.x=t.x-o<s-t.x?o-.05:s+.05)}const pe=`
uniform sampler2D probeTex; uniform sampler2D depthTex;
uniform vec3 gMin; uniform vec3 gSp; uniform vec3 gN;
uniform int tilesX; uniform vec2 atlasSize;
uniform float useCheb; uniform float useCls; uniform float bias;
vec3 cubeIrr(int idx, vec3 n){
  vec3 n2 = n * n;
  vec3 cx = texelFetch(probeTex, ivec2(n.x >= 0. ? 0 : 1, idx), 0).rgb;
  vec3 cy = texelFetch(probeTex, ivec2(n.y >= 0. ? 2 : 3, idx), 0).rgb;
  vec3 cz = texelFetch(probeTex, ivec2(n.z >= 0. ? 4 : 5, idx), 0).rgb;
  return n2.x * cx + n2.y * cy + n2.z * cz;
}
vec2 octEnc(vec3 d){
  d /= abs(d.x) + abs(d.y) + abs(d.z);
  vec2 p = d.xy;
  if (d.z < 0.) p = (1. - abs(p.yx)) * vec2(p.x >= 0. ? 1. : -1., p.y >= 0. ? 1. : -1.);
  return p;
}
vec2 moments(int idx, vec3 dir){
  vec2 o = octEnc(dir) * .5 + .5;
  vec2 tile = vec2(float(idx % tilesX), float(idx / tilesX)) * ${H.toFixed(1)};
  vec2 px = tile + 1. + o * ${ot.toFixed(1)};
  return texture(depthTex, px / atlasSize).rg;
}
vec3 probeGI(vec3 p, vec3 n){
  vec3 pb = p + n * bias;
  vec3 g = clamp((pb - gMin) / gSp, vec3(0.), gN - 1.001);
  vec3 b = floor(g); vec3 a = g - b;
  vec3 s = vec3(0.); float ws = 0.;
  for (int i = 0; i < 8; i++){
    vec3 o = vec3(float(i & 1), float((i >> 1) & 1), float((i >> 2) & 1));
    vec3 c = b + o;
    int idx = int(c.x + gN.x * (c.y + gN.y * c.z) + .5);
    vec4 st = texelFetch(probeTex, ivec2(6, idx), 0);
    vec3 P = gMin + c * gSp + vec3(st.x, 0., 0.);
    vec3 t3 = mix(1. - a, a, o);
    float vw = 1.;
    if (useCls > .5 && st.w < .5) vw = 0.;
    else if (useCheb > .5) {
      // 뒷면 가중
      vec3 toP = normalize(P - p);
      float bf = (dot(toP, n) + 1.) * .5;
      vw = bf * bf + .2;
      // 체비쇼프 가시성: 프로브가 이 방향으로 기록한 거리 분포보다 점이 멀면 가려진 것
      vec3 d = pb - P; float r = max(length(d), 1e-4);
      vec2 m = moments(idx, d / r);
      float ch = 1.;
      if (r > m.x) { float v = abs(m.x * m.x - m.y); float dd = r - m.x; ch = v / (v + dd * dd); ch = max(ch * ch * ch, 0.); }
      vw *= max(.05, ch);
      vw = max(1e-6, vw);
      if (vw < .2) vw *= vw * vw / .04;
    }
    float w = t3.x * t3.y * t3.z * vw;
    s += cubeIrr(idx, n) * w; ws += w;
  }
  return ws > 0. ? s / ws : vec3(0.);
}`,he=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,ue=`
${pe}
uniform float wl; uniform float wr; uniform vec3 sunD; uniform vec3 sunC; uniform vec4 winO; uniform float exposure; uniform vec2 pick;
varying vec3 vN; varying vec3 vW;
float sunAt(vec3 p, vec3 n){
  if (p.x > wl + 1e-3) return 0.;
  float ndl = -dot(n, sunD);
  if (ndl <= 0.) return 0.;
  float t = (p.z - (${c.z0.toFixed(2)})) / sunD.z;
  vec2 w = p.xy - t * sunD.xy;
  if (w.x < winO.x || w.x > winO.y || w.y < winO.z || w.y > winO.w) return 0.;
  return ndl;
}
void main(){
  vec3 n = normalize(vN);
  vec3 p = vW;
  vec3 col;
  bool sec = (n.y > .5 && p.y > ${(c.y1-.01).toFixed(2)}) || (n.z > .5 && p.z > ${(c.z1-.01).toFixed(2)});
  if (sec) {
    // 벽 단면 (두께가 보이도록 빗금)
    float h = step(.5, fract((p.x + p.y + p.z) * 7.));
    col = vec3(.035, .038, .045) + h * .02;
  } else {
    vec3 alb = vec3(.78);
    if (n.y > .5) {
      float ck = mod(floor(p.x * 2.) + floor(p.z * 2.), 2.);
      alb = vec3(.72, .68, .62) * (.92 + ck * .08);
    }
    vec3 ind = probeGI(p, n);
    col = alb * (sunC * sunAt(p, n) + ind);
    col = 1. - exp(-col * exposure);
    if (n.y > .5) {
      // 선택 지점 표시
      float d = length(p.xz - pick);
      col = mix(col, vec3(1., .2, .9), smoothstep(.03, .0, abs(d - .1)) * .9);
    }
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,me=`
uniform sampler2D probeTex; uniform float exposure; uniform float useCls;
varying vec3 vC;
void main(){
  int idx = gl_InstanceID;
  vec3 n = normalize(normal);
  vec3 n2 = n * n;
  vec3 c = n2.x * texelFetch(probeTex, ivec2(n.x >= 0. ? 0 : 1, idx), 0).rgb
         + n2.y * texelFetch(probeTex, ivec2(n.y >= 0. ? 2 : 3, idx), 0).rgb
         + n2.z * texelFetch(probeTex, ivec2(n.z >= 0. ? 4 : 5, idx), 0).rgb;
  c = 1. - exp(-c * exposure * 1.6);
  vec4 st = texelFetch(probeTex, ivec2(6, idx), 0);
  // 벽 속 프로브: 빨강 (분류로 꺼졌으면 어두운 빨강)
  if (st.w < .5) c = useCls > .5 ? vec3(.3, .05, .05) : vec3(1., .1, .1);
  vC = c;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.);
}`,ve=`
varying vec3 vC;
void main(){
  gl_FragColor = vec4(vC, 1.);
  #include <colorspace_fragment>
}`,Pt=new WeakMap;function de(t){const o=new kt(t.probe,7,t.count,Tt,Ht);o.minFilter=o.magFilter=Ut,o.needsUpdate=!0;let s=Pt.get(t);if(!s){s=new Uint16Array(t.depth.length);for(let a=0;a<t.depth.length;a++)s[a]=jt.toHalfFloat(t.depth[a]);Pt.set(t,s)}const n=new kt(s,t.atlasW,t.atlasH,Tt,Vt);return n.minFilter=n.magFilter=qt,n.needsUpdate=!0,{probeTex:o,depthTex:n}}const be={reloc:"프로브 재배치",cls:"프로브 분류(벽 속 비활성화)",thick:"두꺼운 벽(≥ 간격) + 분류",dense:"프로브 2배 촘촘히",all:"재배치 + 분류 + 체비쇼프"};function ye(t,o){return Kt(t,{antialias:!0,cam:[.6,7.6,7.4],target:[.3,.2,.15],fov:42},({scene:s})=>{s.background=new _t(461069);const n={probeTex:{value:null},depthTex:{value:null},gMin:{value:new nt},gSp:{value:new nt(1,1,1)},gN:{value:new nt(2,2,2)},tilesX:{value:1},atlasSize:{value:new yt(1,1)},useCheb:{value:0},useCls:{value:0},bias:{value:0},wl:{value:0},wr:{value:0},sunD:{value:new nt(...j)},sunC:{value:new nt(...It)},winO:{value:new At(I.x0,I.x1,I.y0,I.y1)},exposure:{value:Ct},pick:{value:new yt}},a=new wt({uniforms:n,vertexShader:he,fragmentShader:ue}),i=c.x1-c.x0,l=c.z1-c.z0,r=c.y1,f=(w,h,M,$,b=0)=>{const m=new st(new zt(w,h),a);m.position.set(...M),m.rotation.set(b,$,0,"YXZ"),s.add(m)};f(i,l,[0,0,0],0,-Math.PI/2),f(i,r,[0,r/2,c.z0],0),f(i,r,[0,r/2,c.z1],Math.PI),f(l,r,[c.x0,r/2,0],Math.PI/2),f(l,r,[c.x1,r/2,0],-Math.PI/2);const d=new st(new Wt(1,r,l),a);d.position.set(Q,r/2,0),s.add(d);for(const[w,h]of[[I,16760944],[it,3822728]]){const M=new st(new zt(w.x1-w.x0,w.y1-w.y0),new Mt({color:h}));M.position.set((w.x0+w.x1)/2,(w.y0+w.y1)/2,c.z0+.004),s.add(M)}{const w=[],h=(m,_)=>{const R=-_/j[1];return[m+R*j[0],.002,c.z0+R*j[2]]},M=[[I.x0,I.y0],[I.x1,I.y0],[I.x1,I.y1],[I.x0,I.y1]];for(let m=0;m<4;m++){const[_,R]=M[m],[U,q]=M[(m+1)%4],D=[_,R,c.z0+.01],T=[U,q,c.z0+.01],P=h(U,q),L=h(_,R);w.push(...D,...T,...P,...D,...P,...L)}const $=new Lt;$.setAttribute("position",new Nt(w,3));const b=new st($,new Mt({color:16756832,transparent:!0,opacity:.07,blending:Bt,depthWrite:!1,side:Rt}));s.add(b)}const v=new wt({uniforms:{probeTex:n.probeTex,exposure:n.exposure,useCls:n.useCls},vertexShader:me,fragmentShader:ve,depthTest:!1,depthWrite:!1}),e=new Gt(.05,12,8);let y=null,p="",k="",x=0,A=null,S=null,C=null;const W=w=>{const h=ct(t.shared,w);A=h,C=w,S==null||S.probeTex.dispose(),S==null||S.depthTex.dispose(),S=de(h),n.probeTex.value=S.probeTex,n.depthTex.value=S.depthTex,n.gMin.value.set(...h.min),n.gSp.value.set(...h.spc),n.gN.value.set(...h.n),n.tilesX.value=h.tilesX,n.atlasSize.value.set(h.atlasW,h.atlasH),n.useCheb.value=w.mode.cheb?1:0,n.useCls.value=w.mode.cls?1:0,n.bias.value=w.mode.cheb?.3*.75*Math.min(...h.spc):0,n.wl.value=h.wl,n.wr.value=h.wr,d.scale.x=w.cfg.th,y&&(s.remove(y),y.dispose()),y=new Xt(e,v,h.count),y.renderOrder=10,y.frustumCulled=!1;const M=new Et;for(let $=0;$<h.n[2];$++)for(let b=0;b<h.n[1];b++)for(let m=0;m<h.n[0];m++){const _=m+h.n[0]*(b+h.n[1]*$);M.makeTranslation(h.min[0]+m*h.spc[0]+h.probe[_*28+24],h.min[1]+b*h.spc[1],h.min[2]+$*h.spc[2]),y.setMatrixAt(_,M)}y.instanceMatrix.needsUpdate=!0,s.add(y),p=w.key+(o==="fix"?t.params.str("fix","thick"):"")};return{update(w,h){const M=Ot(t.params,o),$=M.key+(o==="fix"?t.params.str("fix","thick"):"");$!==p&&(p?$!==k?(k=$,x=h):h-x>.15&&W(M):W(M)),y&&(y.visible=t.params.bool("probes",!0));const b=ut(t.shared);if(n.pick.value.set(b.x,b.z),!A||!C)return;const m=C,_=A,R=xe(t.shared,m),U=o==="fix"?`${be[t.params.str("fix","thick")]}
`:"";t.hud(`${U}누출 Σ ${R.leak.toFixed(2)} · 어두운 테 Σ ${R.halo.toFixed(2)} · 거부 ${(R.rejected*100).toFixed(0)}%
프로브 ${_.count} (벽 속 ${_.inside}${_.moved?`, 이동 ${_.moved}`:""}) · 벽 ${m.cfg.th.toFixed(2)}m · 간격 ${m.cfg.sp.toFixed(2)}m · 굽기 ${_.ms.toFixed(0)}ms`)},dispose(){S==null||S.probeTex.dispose(),S==null||S.depthTex.dispose(),y==null||y.dispose(),e.dispose(),v.dispose()}}})}const ft=t=>Math.round(255*Math.pow(1-Math.exp(-t*Ct),1/2.2)),xt=(t,o=1)=>`rgb(${ft(t[0]*o)},${ft(t[1]*o)},${ft(t[2]*o)})`;function we(t){return gt(t,()=>{let o={s:1,ox:0,oy:0},s=!1;const n=(e,y)=>({x:c.x0+(e-o.ox)/o.s,z:c.z0+(y-o.oy)/o.s}),a=(e,y,p)=>{const k=n(e,y);if(k.x<c.x0-.3||k.x>c.x1+.3||k.z<c.z0-.3||k.z>c.z1+.3)return!1;const x=ut(t.shared);return x.x=Math.max(c.x0+.05,Math.min(c.x1-.05,k.x)),x.z=Math.max(c.z0+.05,Math.min(c.z1-.05,k.z)),Ft(x,p.wl,p.wr),!0};let i=null;const l=[],r=[],f=[0,0,0],d=[0,0,0],v=[0,0,0];return{pointer(e){i&&(e.type==="down"?s=a(e.x,e.y,i):e.type==="move"&&s?a(e.x,e.y,i):(e.type==="up"||e.type==="leave")&&(s=!1))},draw(e,y,p){const k=Ot(t.params,"naive"),x=ct(t.shared,k);i=x;const A=t.params.str("fix","thick"),S=A==="reloc"||A==="all"?ct(t.shared,{...k,cfg:{...k.cfg,reloc:!0},key:k.key.slice(0,-1)+"1"}):null,C=ut(t.shared);Ft(C,x.wl,x.wr),e.fillStyle="#0b0e14",e.fillRect(0,0,y,p);const W=y/p>1.6,w=W?y*.58:y,h=W?p:p-50,M=10,$=Math.min((w-M*2)/(c.x1-c.x0),(h-M*2-12)/(c.z1-c.z0));o={s:$,ox:(w-$*(c.x1-c.x0))/2,oy:M+12+(h-M*2-12-$*(c.z1-c.z0))/2};const b=u=>o.ox+(u-c.x0)*$,m=u=>o.oy+(u-c.z0)*$;e.fillStyle="#2a2118",e.fillRect(b(c.x0),m(c.z0),b(x.wl)-b(c.x0),m(c.z1)-m(c.z0)),e.fillStyle="#111824",e.fillRect(b(x.wr),m(c.z0),b(c.x1)-b(x.wr),m(c.z1)-m(c.z0)),e.save(),e.beginPath(),e.rect(b(c.x0),m(c.z0),b(x.wl)-b(c.x0),m(c.z1)-m(c.z0)),e.clip(),e.fillStyle="rgba(255,170,80,0.45)",e.beginPath(),[[I.x0,I.y0],[I.x1,I.y0],[I.x1,I.y1],[I.x0,I.y1]].forEach(([u,z],F)=>{const B=-z/j[1],E=b(u+B*j[0]),V=m(c.z0+B*j[2]);F?e.lineTo(E,V):e.moveTo(E,V)}),e.fill(),e.restore(),e.lineWidth=4,e.strokeStyle="#ffc070",e.beginPath(),e.moveTo(b(I.x0),m(c.z0)-2),e.lineTo(b(I.x1),m(c.z0)-2),e.stroke(),e.strokeStyle="#5a78b0",e.beginPath(),e.moveTo(b(it.x0),m(c.z0)-2),e.lineTo(b(it.x1),m(c.z0)-2),e.stroke(),e.fillStyle="#8a8f99",e.fillRect(b(x.wl),m(c.z0),Math.max(1.5,b(x.wr)-b(x.wl)),m(c.z1)-m(c.z0)),e.strokeStyle="#3a404c",e.lineWidth=1,e.strokeRect(b(c.x0),m(c.z0),b(c.x1)-b(c.x0),m(c.z1)-m(c.z0)),e.strokeStyle="rgba(125,211,252,0.12)";for(let u=0;u<x.n[0];u++){const z=b(x.min[0]+u*x.spc[0]);e.beginPath(),e.moveTo(z,m(c.z0)),e.lineTo(z,m(c.z1)),e.stroke()}for(let u=0;u<x.n[2];u++){const z=m(x.min[2]+u*x.spc[2]);e.beginPath(),e.moveTo(b(c.x0),z),e.lineTo(b(c.x1),z),e.stroke()}ht(x,{cheb:!1,cls:!1},C.x,0,C.z,0,1,0,f,l);const _=ht(x,{cheb:!0,cls:!1},C.x,0,C.z,0,1,0,d,r);Dt(x.wl,x.wr,C.x,0,C.z,0,1,0,v);const R=b(C.x),U=m(C.z);for(let u=0;u<8;u++){if(u&2)continue;const z=r[u],F=r[u|2],B=z.tri+F.tri;if(B<.001)continue;const E=(z.tri*z.vis+F.tri*F.vis)/_,V=z.tri*(z.vis>=.1?1:0)+F.tri*(F.vis>=.1?1:0)>=B*.5;e.strokeStyle=V?"rgba(74,222,128,0.9)":"rgba(248,113,113,0.9)",e.lineWidth=1+E*7,e.setLineDash(V?[]:[4,3]),e.beginPath(),e.moveTo(R,U),e.lineTo(b(z.x),m(z.z)),e.stroke(),e.setLineDash([])}const q=Math.max(3,Math.min(7,$*.12)),D=u=>[x.probe[u*28+8],x.probe[u*28+9],x.probe[u*28+10]];for(let u=0;u<x.n[2];u++)for(let z=0;z<x.n[0];z++){const F=z+x.n[0]*u*x.n[1],B=b(x.min[0]+z*x.spc[0]),E=m(x.min[2]+u*x.spc[2]),V=x.probe[F*28+27]<.5;if(e.beginPath(),e.arc(B,E,q,0,Math.PI*2),e.fillStyle=V?"#000":xt(D(F),1.6),e.fill(),e.lineWidth=V?2:1,e.strokeStyle=V?"#f87171":"rgba(255,255,255,0.35)",e.stroke(),S){const K=S.probe[F*28+24];K&&(e.strokeStyle="#fbbf24",e.lineWidth=1.5,e.beginPath(),e.moveTo(B,E),e.lineTo(b(x.min[0]+z*x.spc[0]+K),E),e.stroke(),e.beginPath(),e.arc(b(x.min[0]+z*x.spc[0]+K),E,q*.6,0,Math.PI*2),e.fillStyle="#fbbf24",e.fill())}}e.strokeStyle="#ff40e0",e.lineWidth=2,e.beginPath(),e.arc(R,U,6,0,Math.PI*2),e.stroke(),e.fillStyle="#e6e9ef",e.font="11px system-ui, sans-serif",e.textBaseline="top",e.fillText("위에서 본 평면 · 분홍 지점을 드래그",o.ox,4),e.fillStyle="rgba(255,190,120,0.9)",e.fillText("밝은 방",b(c.x0)+4,m(c.z1)-15),e.fillStyle="rgba(150,180,230,0.9)",e.fillText("어두운 방",b(x.wr)+4,m(c.z1)-15);const T=W?w+6:8;let P=W?8:h+2;const L=W?y-w-12:y-16,G=W?Math.max(11,Math.min(16,(p-50)/9)):Math.max(11,Math.min(15,(p-h-26)/2));e.font=`${Math.max(9,Math.min(11,G-3))}px system-ui, sans-serif`;const N=(u,z,F,B,E)=>{e.fillStyle=xt(z,1.6),e.fillRect(F,B,13,13),e.strokeStyle="rgba(255,255,255,0.3)",e.strokeRect(F+.5,B+.5,12,12),e.fillStyle="#c9cfda",e.fillText(`${u} ${mt(z).toFixed(3)}`,F+17,B+1,E-20)},O=L/3;N("정답",v,T,P,O),N("삼선형",f,T+O,P,O),N("체비쇼프",d,T+O*2,P,O),P+=19;const X=r.slice().sort((u,z)=>z.tri-u.tri),g=(u,z,F)=>{e.fillStyle=u.tri<.001?"#555":u.vis>=.1?"#4ade80":"#f87171",e.beginPath(),e.arc(z+4,F+G*.4,3.5,0,Math.PI*2),e.fill(),e.fillStyle=xt(u.irr,1.6),e.fillRect(z+11,F+G*.4-4,8,8),e.fillStyle=u.tri<.001?"#666":"#d6dbe4"},J=u=>`${(u.tri*u.vis/_*100).toFixed(0)}%`;if(W)e.fillStyle="#8b93a3",e.fillText("프로브(x,y,z)",T,P),e.fillText("삼선형",T+L*.42,P),e.fillText("가시성",T+L*.6,P),e.fillText("최종",T+L*.8,P),P+=G,X.forEach((u,z)=>{const F=P+z*G;g(u,T,F),e.fillText(`${u.ix},${u.iy},${u.iz}${u.active?"":" 벽속"}`,T+23,F),e.fillText(`${(u.tri*100).toFixed(0)}%`,T+L*.42,F),e.fillText(u.vis>=.995?"1":u.vis.toFixed(2),T+L*.6,F),e.fillText(J(u),T+L*.8,F)});else{const u=L/4;X.forEach((z,F)=>{const B=T+F%4*u,E=P+Math.floor(F/4)*G;g(z,B,E),e.fillText(`${(z.tri*100).toFixed(0)}→${J(z)}`,B+22,E,u-24)})}t.hud("")}}})}const ze=[{which:"naive",title:"단순 삼선형 보간",kind:"before",caption:"프로브 간격(1.2m)보다 얇은 벽(10cm). 벽 양쪽 프로브를 거리만 보고 섞으므로 주황빛이 벽을 넘어 어두운 방 바닥·벽면에 번지고, 반대로 밝은 방 벽 쪽은 어두운 프로브 때문에 거뭇해진다."},{which:"ddgi",title:"DDGI식 거리 가시성 (체비쇼프)",kind:"after",caption:"프로브마다 방향별 평균 거리·거리²을 저장한다. 표면 점이 그 방향으로 기록된 거리보다 멀면(= 사이에 벽) 체비쇼프 부등식으로 가중치를 0 가까이 낮춘다. 법선 바이어스·뒷면 가중을 함께 쓴다."},{which:"fix",title:"다른 해결책 (선택)",kind:"variant",caption:'"해결책" 선택: 재배치는 벽 속 프로브를 밖으로 밀고, 분류는 벽 속 프로브를 끈다. 둘 다 벽 속 프로브가 있을 때만 효과가 있다("격자 위치"를 0 근처로). 두꺼운 벽 + 분류, 프로브 2배 촘촘히, 전부 조합도 비교해 보자.'},{which:"info",title:"프로브 기여 디버그 (위에서 본 평면)",kind:"info",wide:!0,caption:'가장 아래층 프로브(색 = 위쪽 조도, 빨간 테 = 벽 속). 분홍 원 = 선택 지점(3D 뷰어 바닥에도 표시). 선 = 지점을 둘러싼 프로브 셀의 기여: 초록 실선은 신뢰, 빨간 점선은 체비쇼프 판정으로 거부. 노란 화살표 = 재배치(해결책이 재배치일 때). 표는 8개 프로브의 삼선형 → 최종 가중치(좁은 화면은 "삼선형%→최종%").'}],Se={layout:"compare",intro:"라이트 프로브·DDGI·라이트맵 같은 간접광 캐시는 공간을 <b>성기게</b> 샘플링한 뒤 보간합니다. 그런데 보간은 벽을 모릅니다. 프로브 간격보다 얇은 벽이 있으면 벽 반대편 프로브의 빛이 그대로 섞여 들어와 <b>빛 누출(light leaking)</b>이 생기고, 벽 속에 박힌 검은 프로브는 반대로 <b>어두운 얼룩(dark leak)</b>을 만듭니다. 이 페이지는 해가 드는 방과 어두운 방을 10cm 벽으로 나누고, CPU 레이 트레이싱으로 프로브를 구워 같은 데이터로 보간 방식만 바꿔 비교합니다.",how:["프로브마다 사방으로 광선을 쏴 방향별 조도(앰비언트 큐브)를 저장한다 — 여기까지는 일반 라이트 프로브.","같은 광선으로 방향별 맞은 거리의 평균 μ와 거리² 평균을 팔면체(octahedral) 맵에 저장한다 (DDGI의 거리 모멘트).","셰이딩 점은 주변 8개 프로브를 삼선형 가중으로 섞는다. 단순 방식은 여기서 끝 → 벽 너머 프로브도 그대로 섞여 누출.","체비쇼프 가시성: 프로브→점 거리 r이 μ보다 크면 가중치 = σ²/(σ² + (r−μ)²)의 세제곱. 벽에 막힌 프로브는 0 가까이.","법선 방향으로 점을 살짝 띄우고(법선 바이어스), 표면 뒤쪽 프로브의 가중을 낮춰(뒷면 가중) 자기 그림자·경계 오차를 줄인다.",'벽 속에 박힌 프로브는 밖으로 옮기거나(재배치) 꺼 버린다(분류). 레벨 디자인 규칙으로 "벽 두께 ≥ 프로브 간격"을 지키기도 한다.'],pros:["체비쇼프 가시성은 프로브당 작은 거리 맵만 추가하면 됨 (기존 보간 구조 유지)","재배치·분류는 굽는 시점에 한 번만 계산","얇은 벽·바닥이 많은 실내에서 품질 차이가 큼"],cons:["거리 맵 메모리와 셰이딩 시 텍스처 샘플이 늘어남","바이어스 값이 크면 얇은 틈에서 다른 오차가 생김","프로브 간격보다 작은 형태는 여전히 표현 불가 (AO 등으로 보완)"],usedIn:"DDGI / NVIDIA RTXGI(거리 모멘트 + 재배치 + 분류), 여러 엔진의 구운 프로브 볼륨에서 프로브 무효화(벽 속 프로브 끄기) 기능, 라이트맵의 텍셀 패딩·누출 방지 설정.",controls:[{type:"range",key:"th",label:"벽 두께 (m)",min:.05,max:1.2,step:.05,value:.1},{type:"range",key:"sp",label:"프로브 간격 (m)",min:.6,max:2,step:.1,value:1.2},{type:"range",key:"off",label:"격자 위치 (벽 기준)",min:0,max:.95,step:.05,value:.25},{type:"select",key:"fix",label:"해결책",options:[{label:"두꺼운 벽(≥ 간격) + 분류",value:"thick"},{label:"프로브 재배치",value:"reloc"},{label:"프로브 분류(벽 속 끄기)",value:"cls"},{label:"프로브 2배 촘촘히",value:"dense"},{label:"재배치 + 분류 + 체비쇼프",value:"all"}],value:"thick"},{type:"toggle",key:"probes",label:"프로브 표시",value:!0}],viewers:ze.map(t=>({title:t.title,kind:t.kind,caption:t.caption,wide:t.wide,mount:o=>t.which==="info"?we(o):ye(o,t.which)}))};export{Se as default};
