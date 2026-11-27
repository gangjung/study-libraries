import{g as xt,r as bt,aN as qt,N as Mt,a3 as mt,aM as z,w as Wt,aq as Dt,o as wt,M as nt,a2 as At,aB as jt,u as pt,P as Nt,p as Xt,a5 as Ht,ac as Zt,ag as Kt,au as Jt,at as Qt,bG as te,k as yt,a_ as ee,S as Pt,C as Ot,az as oe}from"./three.module-BZgG6AUv.js";import{m as ae}from"./three-viewer-0rZIEDzf.js";const E=192,St=E/16,U={panel:{id:"panel",label:"자동차 패널 이음새",hero:"메탈릭 블루 차체",cam:[.75,1.05,1.45],target:[.22,.8,-.3],center:[0,.7,-.2],radius:1.45},alcove:{id:"alcove",label:"벽감 속 황동 꽃병",hero:"황동 꽃병·구슬, 검은 대리석 선반",cam:[.95,1.2,2.45],target:[.12,.72,-.1],center:[0,.95,-.15],radius:1.45},folds:{id:"folds",label:"광택 패딩 조끼 퀼팅",hero:"남색 광택 나일론",cam:[.75,1.25,1.55],target:[0,.95,-.2],center:[0,.75,-.25],radius:.95}};function $t(t,e=[0,0,0]){const a=1-(2*t+1)/E,c=Math.sqrt(Math.max(0,1-a*a)),o=t*2.399963229728653;return e[0]=c*Math.cos(o),e[1]=a,e[2]=c*Math.sin(o),e}const H=(t,e,a)=>{const c=Math.min(1,Math.max(0,(a-t)/(e-t)));return c*c*(3-2*c)};function Z(t,e,a,c,o,i){const f=[t];let s=t;for(;s<e-1e-6;){let p=1/0;for(const u of o)p=Math.min(p,Math.abs(s-u));s=Math.min(e,s+c+(a-c)*H(0,i,p)),f.push(s)}return f}function dt(t,e,a){const c=t.length,o=e.length,i=new Float32Array(c*o*3);let f=0;for(let u=0;u<o;u++)for(let n=0;n<c;n++){const l=a(t[n],e[u]);i[f++]=l[0],i[f++]=l[1],i[f++]=l[2]}const s=[];for(let u=0;u<o-1;u++)for(let n=0;n<c-1;n++){const l=u*c+n;s.push(l,l+1,l+c,l+1,l+c+1,l+c)}const p=new mt;return p.setAttribute("position",new z(i,3)),p.setIndex(s),p.computeVertexNormals(),p}const ot=(t,e,a,c)=>-c*(1-H(e-a,e+a,t));function ht(t,e,a,c){const o=[],i=[];for(let s=t;s<=e+1e-6;s+=.1)o.push(s);for(let s=a;s<=c+1e-6;s+=.1)i.push(-s);return{geo:dt(Z(-12,12,1.5,.05,o,1.2),Z(-12,12,1.5,.05,i,1.2),(s,p)=>[s,0,-p]),alb:[.07,.07,.075],rough:.3,metal:0,hero:!1,occ:!1}}function ne(){const c=[.56,.95],o=[.17,.065],i=Z(-1.1,1.1,.022,.003,[.1-.02,.1+.02,c[0]-o[0],c[0]+o[0]],.03),f=Z(.12,1.4,.02,.003,[.4-.02,.4+.02,1.24-.02,1.24+.02,c[1]-o[1],c[1]+o[1],.8],.03),s=(n,l)=>.16*(1-(n/1.15)**2)+.1*(1-((l-.75)/.75)**2)-.42*l,p=dt(i,f,(n,l)=>{let m=Math.min(ot(Math.abs(n-.1),.019,.007,.1),ot(Math.abs(l-.4),.019,.007,.1),ot(Math.abs(l-1.24),.019,.007,.1));const g=Math.hypot((n-c[0])/o[0],(l-c[1])/o[1]);return m=Math.min(m,-.06*(1-H(.86,1.08,g))*(.75+.25*Math.sqrt(Math.max(0,1-g*g)))),m+=.01*(1-H(0,.022,Math.abs(l-.8))),[n,l,s(n,l)+m]}),u=new Qt(.017,.24,6,24);return u.rotateZ(Math.PI/2),u.translate(c[0],c[1]+.004,s(c[0],c[1])-.004),[{geo:p,alb:[.16,.24,.5],rough:.15,metal:1,hero:!0},{geo:u,alb:[.9,.9,.92],rough:.06,metal:1,hero:!1},ht(-1.3,1.3,-.8,.6)]}function se(){const t=[],e={alb:[.62,.58,.52],rough:.9,metal:0,hero:!1},a=1.2,c=2.2,o=-.45,i=.45,f=.5,s=1.55,p=.55,u=(T,Y,K,j)=>new Nt(T,Y,Math.max(1,Math.round(T/K)),Math.max(1,Math.round(Y/j))),n=.035,l=u(a+o,c,n,n);l.translate((-a+o)/2,c/2,0);const m=u(a-i,c,n,n);m.translate((a+i)/2,c/2,0);const g=u(i-o,c-s,n,n);g.translate(0,(c+s)/2,0);const b=u(i-o,f,n,n);b.translate(0,f/2,0);for(const T of[l,m,g,b])t.push({geo:T,...e});const M=u(i-o,s-f,n*.8,n*.8);M.translate(0,(f+s)/2,-p);const h=u(p,s-f,n*.8,n*.8);h.rotateY(Math.PI/2),h.translate(o,(f+s)/2,-p/2);const A=u(p,s-f,n*.8,n*.8);A.rotateY(-Math.PI/2),A.translate(i,(f+s)/2,-p/2);const y=u(i-o,p,n*.8,n*.8);y.rotateX(Math.PI/2),y.translate(0,s,-p/2);for(const T of[M,h,A,y])t.push({geo:T,...e});const w=u(i-o,p,n*.6,n*.6);w.rotateX(-Math.PI/2),w.translate(0,f,-p/2),t.push({geo:w,alb:[.03,.03,.035],rough:.15,metal:0,hero:!0});const S=[],N=[[.001,0],[.085,0],[.1,.02],[.155,.12],[.172,.22],[.15,.34],[.09,.47],[.058,.55],[.062,.62],[.088,.67],[.082,.685],[.05,.64]],V=new te(N.map(([T,Y])=>new yt(T,Y)));for(const T of V.getSpacedPoints(70))S.push(new yt(Math.max(.001,T.x),T.y));const $=new ee(S,72);$.translate(0,f+.001,-.3);const P=[.95,.68,.32];t.push({geo:$,alb:P,rough:.15,metal:1,hero:!0});const R=new Pt(.17,64,32);return R.translate(.72,.17,.32),t.push({geo:R,alb:P,rough:.15,metal:1,hero:!0}),t.push(ht(-1.3,1.3,-.7,1)),t}function re(){const a=[];for(let n=.56;n<=1.46;n+=.105)a.push(n);const c=.42,o=Z(-.74,.74,.018,.004,[-.009,.009],.03),i=Z(.56,1.45,.015,.003,a,.025),f=.05,s=dt(o,i,(n,l)=>{const m=(l-.56)/.105%1;let g=f*(Math.pow(Math.sin(Math.PI*m),.35)-1);g=Math.min(g,ot(Math.abs(n),.008,.004,.035)-.004);const b=1+.08*H(.6,1.1,l)-.5*H(1.18,1.45,l)**1.5,M=n/c;return[Math.sin(M)*(.4*b+g),l,Math.cos(M)*(.24*b+g)-.24]}),p=new Ot(.022,.022,.62,16,8);p.translate(0,.31,-.24);const u=new Ot(.2,.22,.03,40,1);return u.translate(0,.015,-.24),[{geo:s,alb:[.018,.022,.045],rough:.2,metal:0,hero:!0},{geo:p,alb:[.85,.85,.87],rough:.2,metal:1,hero:!1},{geo:u,alb:[.85,.85,.87],rough:.2,metal:1,hero:!1},ht(-.8,.8,-.8,.4)]}function ce(t){const e=t==="panel"?ne():t==="alcove"?se():re();let a=0,c=0;for(const m of e)m.geo.attributes.normal||m.geo.computeVertexNormals(),a+=m.geo.attributes.position.count,c+=m.geo.index?m.geo.index.count:m.geo.attributes.position.count;const o=new Float32Array(a*3),i=new Float32Array(a*3),f=new Float32Array(a*3),s=new Float32Array(a*3),p=new Uint32Array(c),u=[];let n=0,l=0;for(const m of e){const g=m.geo.attributes.position,b=m.geo.attributes.normal;for(let M=0;M<g.count;M++){const h=(n+M)*3;o[h]=g.getX(M),o[h+1]=g.getY(M),o[h+2]=g.getZ(M),i[h]=b.getX(M),i[h+1]=b.getY(M),i[h+2]=b.getZ(M),f[h]=m.alb[0],f[h+1]=m.alb[1],f[h+2]=m.alb[2],s[h]=m.rough,s[h+1]=m.metal,s[h+2]=m.hero?1:0}if(m.geo.index){const M=m.geo.index;for(let h=0;h<M.count;h++)p[l++]=M.getX(h)+n,m.occ!==!1&&u.push(M.getX(h)+n)}n+=g.count,m.geo.dispose()}return{pos:o,nrm:i,alb:f,mat:s,index:p,occIndex:new Uint32Array(u),count:a}}const le=`
uniform sampler2D posTex, nrmTex, dep0, dep1, dep2, dep3;
uniform mat4 m0, m1, m2, m3; uniform vec3 d0, d1, d2, d3; uniform float texel, bias;
float vis(sampler2D dep, mat4 m, vec3 d, vec3 p, vec3 n){
  float c = dot(n, d);
  if (c <= 0.) return 0.;
  vec3 q = p + n * texel * (1.5 + 3. * (1. - c)) + d * texel; // 비스듬한 방향일수록 법선 오프셋을 키워 자기 그림자(acne) 방지
  vec4 l = m * vec4(q, 1.);
  vec2 uv = l.xy * .5 + .5;
  if (any(lessThan(uv, vec2(0.))) || any(greaterThan(uv, vec2(1.)))) return 1.;
  float z = l.z * .5 + .5;
  return z - bias > texture2D(dep, uv).r ? 0. : 1.;
}
void main(){
  ivec2 t = ivec2(gl_FragCoord.xy);
  vec3 p = texelFetch(posTex, t, 0).xyz;
  vec3 n = normalize(texelFetch(nrmTex, t, 0).xyz);
  gl_FragColor = vec4(vis(dep0, m0, d0, p, n), vis(dep1, m1, d1, p, n), vis(dep2, m2, d2, p, n), vis(dep3, m3, d3, p, n));
}`;function ie(t,e,a){const c=performance.now(),o=e.count,i=256,f=Math.ceil(o/i),s=r=>{const d=new Float32Array(i*f*4);for(let v=0;v<o;v++)d[v*4]=r[v*3],d[v*4+1]=r[v*3+1],d[v*4+2]=r[v*3+2],d[v*4+3]=1;const x=new Zt(d,i,f,Kt,Jt);return x.needsUpdate=!0,x},p=s(e.pos),u=s(e.nrm),n=1024,l=a.radius,m=new xt(...a.center),g=[0,1,2,3].map(()=>{const r=new bt(n,n,{depthBuffer:!0});return r.depthTexture=new qt(n,n),r.depthTexture.minFilter=r.depthTexture.magFilter=Mt,r}),b=new mt;b.setAttribute("position",new z(e.pos,3)),b.setIndex(new z(e.occIndex,1));const M=new Wt({side:Dt,colorWrite:!1}),h=new wt,A=new nt(b,M);A.frustumCulled=!1,h.add(A);const y=[0,1,2,3].map(()=>new At(-l,l,l,-l,.05,l*6)),w=new bt(i,f,{depthBuffer:!1});w.texture.minFilter=w.texture.magFilter=Mt;const S={posTex:{value:p},nrmTex:{value:u},texel:{value:2*l/n},bias:{value:.003/(l*6)}};for(let r=0;r<4;r++)S["dep"+r]={value:g[r].depthTexture},S["m"+r]={value:new jt},S["d"+r]={value:new xt};const N=new pt({uniforms:S,vertexShader:"void main(){ gl_Position = vec4(position.xy, 0., 1.); }",fragmentShader:le,depthTest:!1,depthWrite:!1}),V=new nt(new Nt(2,2),N);V.frustumCulled=!1;const $=new wt;$.add(V);const P=new At,R=t.getRenderTarget(),T=t.getClearColor(new Xt),Y=t.getClearAlpha(),K=t.toneMapping;t.toneMapping=Ht,t.setClearColor(0,0);const j=new Float32Array(o),X=new Float32Array(o),F=new Float32Array(o*3),I=new Float32Array(o*St),gt=new Uint8Array(i*f*4),st=[];for(let r=0;r<E;r++)st.push($t(r,[0,0,0]));for(let r=0;r<E;r+=4){for(let d=0;d<4;d++){const x=st[r+d],v=y[d];v.position.set(m.x+x[0]*l*3,m.y+x[1]*l*3,m.z+x[2]*l*3),v.up.set(Math.abs(x[1])>.98?1:0,Math.abs(x[1])>.98?0:1,0),v.lookAt(m),v.updateMatrixWorld(),t.setRenderTarget(g[d]),t.clear(!0,!0,!1),t.render(h,v),S["m"+d].value.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),S["d"+d].value.set(x[0],x[1],x[2])}t.setRenderTarget(w),t.clear(!0,!1,!1),t.render($,P),t.readRenderTargetPixels(w,0,0,i,f,gt);for(let d=0;d<4;d++){const x=r+d,v=st[x],D=x>>4,tt=1<<(x&15);for(let O=0;O<o;O++){const _=e.nrm[O*3]*v[0]+e.nrm[O*3+1]*v[1]+e.nrm[O*3+2]*v[2];_<=0||(X[O]+=_,gt[O*4+d]>127&&(j[O]+=_,F[O*3]+=v[0],F[O*3+1]+=v[1],F[O*3+2]+=v[2],I[O*St+D]+=tt))}}}t.setRenderTarget(R),t.setClearColor(T,Y),t.toneMapping=K;const B=new Float32Array(o);for(let r=0;r<o;r++){B[r]=X[r]>0?j[r]/X[r]:1;let d=F[r*3],x=F[r*3+1],v=F[r*3+2],D=Math.hypot(d,x,v);D<1e-4&&(d=e.nrm[r*3],x=e.nrm[r*3+1],v=e.nrm[r*3+2],D=Math.hypot(d,x,v)||1),F[r*3]=d/D,F[r*3+1]=x/D,F[r*3+2]=v/D}const Q=Array.from({length:o},()=>[]);for(let r=0;r<e.index.length;r+=3){const d=e.index[r],x=e.index[r+1],v=e.index[r+2];Q[d].push(x,v),Q[x].push(d,v),Q[v].push(d,x)}for(let r=0;r<2;r++){const d=B.slice(),x=F.slice();for(let v=0;v<o;v++){const D=Q[v];if(!D.length)continue;let tt=0,O=0,_=0,J=0;for(const et of D)tt+=d[et],O+=x[et*3],_+=x[et*3+1],J+=x[et*3+2];B[v]=.5*d[v]+.5*tt/D.length,O=.5*x[v*3]+.5*O/D.length,_=.5*x[v*3+1]+.5*_/D.length,J=.5*x[v*3+2]+.5*J/D.length;const it=Math.hypot(O,_,J)||1;F[v*3]=O/it,F[v*3+1]=_/it,F[v*3+2]=J/it}}const G=[];for(let r=0;r<o;r++)e.mat[r*3+2]>.5&&G.push(r);G.sort((r,d)=>B[r]-B[d]);let rt=G.filter(r=>B[r]<.35);rt.length<40&&(rt=G.slice(0,Math.max(1,Math.floor(G.length*.08))));const Ut=G.filter(r=>B[r]>.4&&B[r]<.85);let ct=G.filter(r=>B[r]>.85);ct.length<40&&(ct=G.slice(Math.floor(G.length*.75)));const lt=(r,d)=>r.length<=d?r:r.filter((x,v)=>v%Math.ceil(r.length/d)===0);return p.dispose(),u.dispose(),g.forEach(r=>{var d;(d=r.depthTexture)==null||d.dispose(),r.dispose()}),w.dispose(),b.dispose(),M.dispose(),N.dispose(),V.geometry.dispose(),{...e,ao:B,bent:F,vis:I,crevice:lt(rt,400),mid:lt(Ut,400),open:lt(ct,400),ms:performance.now()-c}}const Ft=new Map;function ue(t,e){let a=Ft.get(e);return a||(a=ie(t,ce(e),U[e]),Ft.set(e,a)),a}const zt=[.42,.6,1.05],ft=[1.45,1.45,1.4],Bt=[.15,.15,.15],kt=[.84,.94,1.2],Gt=[.2,.19,.18],vt=[.7,.72,.76],C=[[.55,.25,.05,1.2,6],[1,-.3,.14,.25,5]],at=.85,k=t=>`vec3(${t.map(e=>e.toFixed(4)).join(",")})`,Rt=t=>[Math.cos(t[0])*Math.sin(t[1]),Math.sin(t[0]),Math.cos(t[0])*Math.cos(t[1])],Tt=t=>t[4]*(2*t[2])*(2*t[3])/Math.PI,_t=`
#define PI 3.14159265
vec3 grad(vec3 d){
  return d.y > 0. ? mix(${k(ft)}, ${k(zt)}, pow(d.y, .5)) : mix(${k(ft)} * .35, ${k(Bt)}, clamp(-d.y * 6., 0., 1.));
}
vec3 gradIrr(vec3 n){
  return n.y > 0. ? mix(${k(vt)}, ${k(kt)}, n.y) : mix(${k(vt)}, ${k(Gt)}, -n.y);
}
float lin(float x, float h, float s){ return clamp((h + s - x) / (2. * s), 0., 1.); }
float strip(vec3 d, vec4 s, float soft){
  float el = asin(clamp(d.y, -1., 1.));
  float az = atan(d.x, d.z);
  float da = abs(mod(az - s.y + PI, 2. * PI) - PI) * cos(el);
  return lin(abs(el - s.x), s.z, soft) * lin(da, s.w, soft);
}
const vec4 S0 = vec4(${C[0].slice(0,4).join(",")}); const float I0 = ${C[0][4].toFixed(2)};
const vec4 S1 = vec4(${C[1].slice(0,4).join(",")}); const float I1 = ${C[1][4].toFixed(2)};
/* 거칠기별 사전 필터 큐브맵 대용: 그라디언트는 조도 쪽으로 흐려지고, 띠 조명은 가장자리가 넓어짐 */
vec3 envSpec(vec3 d, float r){
  float soft = .006 + .9 * r * r + .05 * r;
  vec3 c = mix(grad(d), gradIrr(d), clamp(r * r * 1.5, 0., 1.));
  return c + vec3(1., .97, .92) * (I0 * strip(d, S0, soft) + I1 * strip(d, S1, soft));
}
vec3 envIrr(vec3 n){
  return gradIrr(n) + vec3(1., .97, .92) * (${Tt(C[0]).toFixed(4)} * max(dot(n, ${k(Rt(C[0]))}), 0.) + ${Tt(C[1]).toFixed(4)} * max(dot(n, ${k(Rt(C[1]))}), 0.));
}
vec3 acesTone(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
`,W=t=>.2126*t[0]+.7152*t[1]+.0722*t[2],pe=W(zt),Vt=W(ft),fe=W(Bt),ve=W(kt),me=W(Gt),It=W(vt),L=(t,e,a)=>t+(e-t)*a,q=t=>Math.min(1,Math.max(0,t));function de(t,e){const a=t[1]>0?L(Vt,pe,Math.sqrt(t[1])):L(Vt*.35,fe,q(-t[1]*6)),c=t[1]>0?L(It,ve,t[1]):L(It,me,-t[1]),o=.006+.9*e*e+.05*e,i=Math.asin(Math.max(-1,Math.min(1,t[1]))),f=Math.atan2(t[0],t[2]);let s=0;for(const p of C){let u=(f-p[1]+Math.PI)%(2*Math.PI);u<0&&(u+=2*Math.PI),u=Math.abs(u-Math.PI)*Math.cos(i);const n=(l,m)=>q((m+o-l)/(2*o));s+=p[4]*n(Math.abs(i-p[0]),p[2])*n(u,p[3])}return L(a,c,q(e*e*1.5))+.975*s}function he(t,e){const a=[t*-1+1,t*-.0275+.0425,t*-.572+1.04,t*.022-.04],c=Math.min(a[0]*a[0],Math.pow(2,-9.28*e))*a[0]+a[1];return[-1.04*c+a[2],1.04*c+a[3]]}const ge=(t,e,a)=>q(Math.pow(t+e,Math.pow(2,-16*a-1))-1+e);function xe(t){const e=2/Math.max(t**4,1e-6)-2;return Math.min(1.4,Math.max(.12,Math.acos(Math.pow(.1,1/(e+1)))))}function be(t,e,a,c){const o=Math.acos(q(Math.sqrt(1-a))),i=xe(c),f=Math.acos(Math.max(-1,Math.min(1,t[0]*e[0]+t[1]*e[1]+t[2]*e[2]))),s=Math.min(o,i),p=Math.max(o,i),u=1-Math.cos(s);let n;if(f<=p-s)n=u;else if(f>=o+i)n=0;else{const l=1-q((f-(p-s))/(o+i-(p-s)));n=u*l*l*(3-2*l)}return q(n/(1-Math.cos(i)))}const Me=Array.from({length:E},(t,e)=>$t(e)),we=t=>{const e=Math.max(t*t,.001);return Math.min(40,Math.max(1,2/(e*e)-2))};function Ae(t,e,a,c,o){const i=we(o);let f=0,s=0;for(let p=0;p<E;p++){const u=Me[p],n=a[0]*u[0]+a[1]*u[1]+a[2]*u[2];if(n<=0)continue;const l=n*Math.pow(Math.max(0,c[0]*u[0]+c[1]*u[1]+c[2]*u[2]),i);f+=l,t.vis[e*12+(p>>4)]>>(p&15)&1&&(s+=l)}return f>1e-9?s/f:1}const ye=`
attribute vec3 aAlb; attribute vec3 aMat; attribute float aAO; attribute vec3 aBent; attribute vec3 aProbe;
attribute vec4 aV0; attribute vec4 aV1; attribute vec4 aV2;
uniform float uRough, uNeedGT;
varying vec3 vN, vW, vAlb, vBent; varying float vAO, vRough, vMetal, vGT; varying vec3 vProbe;
vec3 fibDir(int k){
  float z = 1. - (2. * float(k) + 1.) / ${E}.;
  float r = sqrt(max(0., 1. - z * z));
  float ph = float(k) * 2.399963229728653;
  return vec3(r * cos(ph), z, r * sin(ph));
}
/* 참값: 베이크한 ${E}개 방향의 가시성 비트를 반사 로브(퐁 근사, 방향 간격 때문에 폭 하한)로 가중 평균 */
float gtVis(vec3 N, vec3 R, float r){
  float a = max(r * r, 1e-3);
  float n = clamp(2. / (a * a) - 2., 1., 40.);
  float words[12] = float[12](aV0.x, aV0.y, aV0.z, aV0.w, aV1.x, aV1.y, aV1.z, aV1.w, aV2.x, aV2.y, aV2.z, aV2.w);
  float sw = 0., sv = 0.;
  for (int w = 0; w < 12; w++) {
    uint bits = uint(words[w] + .5);
    for (int b = 0; b < 16; b++) {
      vec3 d = fibDir(w * 16 + b);
      float c = dot(N, d);
      if (c <= 0.) continue;
      float wt = c * pow(max(dot(R, d), 0.), n);
      sw += wt;
      sv += wt * float((bits >> uint(b)) & 1u);
    }
  }
  return sw > 1e-9 ? sv / sw : 1.;
}
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  vN = normalize(normal);
  vAlb = aAlb; vAO = aAO; vBent = aBent; vMetal = aMat.y; vProbe = aProbe;
  vRough = aMat.z > .5 ? uRough : aMat.x;
  vGT = 1.;
  if (uNeedGT > .5) {
    vec3 V = normalize(cameraPosition - w.xyz);
    vGT = gtVis(vN, reflect(-V, vN), vRough);
  }
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Oe=`
${_t}
uniform float uView, uMethod, uBent, uDebug, uAOStr;
varying vec3 vN, vW, vAlb, vBent; varying float vAO, vRough, vMetal, vGT; varying vec3 vProbe;
vec2 envBRDF(float r, float NoV){ // Karis 모바일 근사 (split-sum LUT 대용)
  vec4 r4 = r * vec4(-1., -.0275, -.572, .022) + vec4(1., .0425, 1.04, -.04);
  float a004 = min(r4.x * r4.x, exp2(-9.28 * NoV)) * r4.x + r4.y;
  return vec2(-1.04, 1.04) * a004 + r4.zw;
}
/* Lagarde & de Rousiers 2014 (Frostbite) — 여기선 거칠기 입력으로 α = r² 사용 */
float lagardeSO(float NoV, float ao, float alpha){ return clamp(pow(NoV + ao, exp2(-16. * alpha - 1.)) - 1. + ao, 0., 1.); }
float specAngle(float r){ float n = 2. / max(pow(r, 4.), 1e-6) - 2.; return clamp(acos(pow(.1, 1. / (n + 1.))), .12, 1.4); }
/* 가시 원뿔(축 = 벤트 노멀, 각 = AO에서) ∩ 반사 원뿔(축 = R, 각 = 거칠기에서) 입체각 비율 */
float coneSO(vec3 ax, vec3 R, float ao, float r){
  float av = acos(clamp(sqrt(1. - ao), 0., 1.));
  float sa = specAngle(r);
  float dd = acos(clamp(dot(ax, R), -1., 1.));
  float rmin = min(av, sa), rmax = max(av, sa);
  float full = 1. - cos(rmin);
  float inter;
  if (dd <= rmax - rmin) inter = full;
  else if (dd >= av + sa) inter = 0.;
  else inter = full * smoothstep(0., 1., 1. - clamp((dd - (rmax - rmin)) / (av + sa - (rmax - rmin)), 0., 1.));
  return clamp(inter / (1. - cos(sa)), 0., 1.);
}
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
vec3 dbg(float v){ return vec3(pow(clamp(v, 0., 1.), 2.2)); }
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  float NoV = clamp(dot(N, V), 1e-3, 1.);
  vec3 R = reflect(-V, N);
  float ao = mix(1., vAO, uAOStr);
  vec3 B = normalize(mix(N, normalize(vBent), uAOStr));
  bool useBent = uBent > .5 && uView > 1.5;
  float r = vRough;
  vec3 irr = envIrr(useBent ? B : N);
  vec3 diff = vAlb * (1. - vMetal) * irr * ao;
  vec3 F0 = mix(vec3(.04), vAlb, vMetal);
  vec2 ab = envBRDF(r, NoV);
  vec3 spec = envSpec(R, r) * (F0 * ab.x + ab.y);
  float gt = mix(1., vGT, uAOStr);
  float so = uMethod < .5 ? lagardeSO(NoV, ao, r * r) : uMethod < 1.5 ? coneSO(uBent > .5 ? B : N, R, ao, r) : gt;
  float occ = uView < .5 ? 1. : uView < 1.5 ? ao : so;
  vec3 col = acesTone((diff + spec * occ) * ${at.toFixed(3)});
  if (uView > 2.5) {
    if (uDebug < .5) col = dbg(ao);
    else if (uDebug < 1.5) col = pow(B * .5 + .5, vec3(2.2));
    else if (uDebug < 2.5) col = dbg(so);
    else if (uDebug < 3.5) col = dbg(gt);
    else if (uDebug < 4.5) {
      // 새는 반사: "확산에만 AO"가 그리는 반사 중 실제로는 막혀 있어야 할 몫
      float base = lum(acesTone((diff + spec * gt) * ${at.toFixed(3)}));
      float leak = lum(spec * (1. - gt)) * ${at.toFixed(3)};
      col = vec3(pow(base * .55, 2.2)) + vec3(1., .12, .05) * clamp(leak * 2.5, 0., 1.);
    } else {
      col = dbg(.15 + .55 * ao);
      col = mix(col, vec3(1., .08, .05), smoothstep(.2, .5, vProbe.x));
      col = mix(col, vec3(1., .8, .1), smoothstep(.2, .5, vProbe.y));
      col = mix(col, vec3(.1, .9, .2), smoothstep(.2, .5, vProbe.z));
    }
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,Se="varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",Fe=`
${_t}
varying vec3 vD;
void main(){
  gl_FragColor = vec4(acesTone(envSpec(normalize(vD), .25) * ${at.toFixed(3)}), 1.);
  #include <colorspace_fragment>
}`,Ct=["lagarde","cone","gt"],Lt=["Lagarde 근사","벤트 콘 교차","참값(방향별 가시성)"],Et=["ao","bent","so","gt","leak","probe"],Yt=["AO (베이크)","벤트 노멀 (월드 XYZ → RGB)","SO 항","참값 반사 가시성","새는 반사 (빨강)","측정 프로브 (빨강 틈새·노랑 반쯤·초록 열린)"];function Re(t){const e=new mt;e.setAttribute("position",new z(t.pos,3)),e.setAttribute("normal",new z(t.nrm,3)),e.setAttribute("aAlb",new z(t.alb,3)),e.setAttribute("aMat",new z(t.mat,3)),e.setAttribute("aAO",new z(t.ao,1)),e.setAttribute("aBent",new z(t.bent,3));const a=new Float32Array(t.count*3);for(const o of t.crevice)a[o*3]=1;for(const o of t.mid)a[o*3+1]=1;for(const o of t.open)a[o*3+2]=1;e.setAttribute("aProbe",new z(a,3));const c=[0,1,2].map(()=>new Float32Array(t.count*4));for(let o=0;o<t.count;o++)for(let i=0;i<12;i++)c[i>>2][o*4+(i&3)]=t.vis[o*12+i];return c.forEach((o,i)=>e.setAttribute("aV"+i,new z(o,4))),e.setIndex(new z(t.index,1)),e}function ut(t,e,a,c,o,i,f,s){let p=0,u=0,n=0,l=0,m=0;const g=[0,0,0],b=[0,0,0],M=[0,0,0],h=[0,0,0];for(const y of e){const w=y*3;g[0]=t.nrm[w],g[1]=t.nrm[w+1],g[2]=t.nrm[w+2],b[0]=a.x-t.pos[w],b[1]=a.y-t.pos[w+1],b[2]=a.z-t.pos[w+2];const S=Math.hypot(b[0],b[1],b[2]);b[0]/=S,b[1]/=S,b[2]/=S;const N=g[0]*b[0]+g[1]*b[1]+g[2]*b[2];if(N<.05)continue;for(let I=0;I<3;I++)M[I]=2*N*g[I]-b[I];const V=t.mat[w+2]>.5?f:t.mat[w],$=L(1,t.ao[y],s);for(let I=0;I<3;I++)h[I]=L(g[I],t.bent[w+I],s);const P=Math.hypot(h[0],h[1],h[2])||1;h[0]/=P,h[1]/=P,h[2]/=P;const R=L(1,Ae(t,y,g,M,V),s),T=o===0?ge(N,$,V*V):o===1?be(i?h:g,M,$,V):R,Y=c===0?1:c===1?$:T,K=t.mat[w+1],j=L(.04,W([t.alb[w],t.alb[w+1],t.alb[w+2]]),K),X=he(V,Math.max(N,.001)),F=de(M,V)*(j*X[0]+X[1]);p+=F*Y,u+=F*R,n+=$,l+=T,m++}const A=Math.max(m,1);return{e:p/A,gt:u/A,ao:n/A,so:l/A,n:m}}const Te=(t,e)=>{if(e<.01)return t<.012?"≈ 참값":"참값 ≈ 0인데 빛남";const a=t/e;return a>=1.15?`${a.toFixed(1)}배 과다`:a<=.87?`${Math.round((1-a)*100)}% 부족`:"≈ 참값"};function Ve(t,e){const a=t.params.str("scene","panel");return ae(t,{antialias:!0,cam:U[a].cam,target:U[a].target,near:.05,far:100},({scene:c,camera:o,renderer:i,controls:f})=>{const s={uRough:{value:.15},uAOStr:{value:1},uView:{value:e},uMethod:{value:0},uBent:{value:1},uDebug:{value:0},uNeedGT:{value:0}},p=new pt({uniforms:s,vertexShader:ye,fragmentShader:Oe,side:Dt}),u=new nt(new Pt(40,48,24),new pt({vertexShader:Se,fragmentShader:Fe,side:oe,depthWrite:!1}));u.renderOrder=-1,c.add(u),c.background=null;let n=null,l,m=a;const g=(A,y)=>{m=A,l=ue(i,A),n&&(c.remove(n),n.geometry.dispose()),n=new nt(Re(l),p),n.frustumCulled=!1,c.add(n),y&&(o.position.set(...U[A].cam),f.target.set(...U[A].target),f.update())};g(a,!1);const b=()=>{s.uRough.value=t.params.num("rough",.15),s.uAOStr.value=t.params.num("aoStr",1),s.uMethod.value=Math.max(0,Ct.indexOf(t.params.str("method","lagarde"))),s.uBent.value=t.params.bool("bent",!0)?1:0,s.uDebug.value=Math.max(0,Et.indexOf(t.params.str("debug","ao")));const A=s.uDebug.value;s.uNeedGT.value=e===2&&s.uMethod.value===2||e===3&&(A===3||A===4||A===2&&s.uMethod.value===2)?1:0};b();const M=t.params.on(A=>{if(A==="scene"){const y=t.params.str("scene","panel");y!==m&&g(y,!0)}b()});let h=1;return{update(A){if(h+=A,h<.25)return;h=0;const y=s.uMethod.value,w=s.uBent.value>.5,S=s.uRough.value,N=s.uAOStr.value,V=[["틈새",ut(l,l.crevice,o.position,e,y,w,S,N)],["반쯤 가림",ut(l,l.mid,o.position,e,y,w,S,N)],["열린 면",ut(l,l.open,o.position,e,y,w,S,N)]],$=e===0?"반사 가림 없음":e===1?"반사 × AO":`SO: ${Lt[y]}${y===1?w?" · 축=벤트":" · 축=노멀":""}`;e===3?t.hud(`${Yt[s.uDebug.value]}
`+V.map(([P,R])=>`${P}: AO ${R.ao.toFixed(2)} · SO ${R.so.toFixed(2)}`).join(`
`)+` · 베이크 ${E}방향 ${l.ms.toFixed(0)}ms`):t.hud(`${$} — 반사 E / 참값
`+V.map(([P,R])=>R.n?`${P}: ${R.e.toFixed(3)} / ${R.gt.toFixed(3)} · ${Te(R.e,R.gt)}`:`${P}: (안 보임)`).join(`
`))},dispose(){M(),n&&n.geometry.dispose(),p.dispose()}}})}const Ie=[{view:0,title:"AO → 확산에만",kind:"before",caption:"틈 바닥·벽감 안쪽의 확산광은 AO로 어두워졌지만 하늘·띠 조명의 반사는 그대로. 패널 이음새와 손잡이 홈이 반사로 메워져 흐려지고, 벽감 속 꽃병·검은 선반은 바깥에 놓인 듯 하늘을 비춰 붙여 넣은 것처럼 뜬다. HUD의 틈새 반사가 참값의 몇 배~수십 배."},{view:1,title:"AO → 확산·반사 둘 다 곱",kind:"variant",caption:"틈은 어두워지지만 방향을 모르는 균일한 감쇠. AO 0.2인 틈에도 반사가 20% 남아 희뿌옇고, 반대로 밖을 향한 반사(벽감 속 꽃병 정면)까지 AO만큼 깎여 칙칙해진다. 반쯤 가린 곳은 여전히 참값보다 밝거나 어둡게 틀린다."},{view:2,title:"스페큘러 오클루전",kind:"after",caption:'Lagarde 근사: 매끈한 면을 정면에서 보면 AO보다 덜, 비스듬히 보면 더 가린다. 패널 틈·손잡이 홈의 반사가 꺼지고 열린 면은 그대로. "SO 방식"을 벤트 콘 교차로 바꾸면 꽃병 정면은 살고 옆면은 꺼진다. 패딩 조끼에선 이음새를 따라 빠져나가는 반사까지 지나치게 가린다.'},{view:3,title:"디버그: AO · SO 항 · 벤트 노멀",kind:"info",caption:'"디버그 보기"로 내부 값을 확인. AO(확산 가림), SO 항(반사 가림), 벤트 노멀(가장 덜 막힌 방향), 참값 반사 가시성, 확산에만 AO일 때 새는 반사량(빨강), HUD가 재는 프로브 위치.'}],Pe={layout:"compare",intro:"AO를 <b>확산광에만</b> 곱하면 틈새·옷 주름·벽감 안쪽에서 하늘과 조명의 <b>반사가 그대로 빛나</b> 물체가 붙여 넣은 듯 뜹니다. 그렇다고 반사에도 AO를 그냥 곱하면 열린 면까지 칙칙해집니다. <b>스페큘러 오클루전</b>은 AO에 시선 각도와 거칠기를 더해, 반사 방향이 실제로 막혔을 법한 곳만 가립니다. 벤트 노멀(가장 덜 막힌 방향)을 쓰면 더 정확해집니다.",how:["오프라인 베이크(또는 GTAO 같은 실시간 AO)로 점마다 AO 값과 벤트 노멀을 얻는다. 이 페이지는 192개 방향의 그림자 맵으로 정점마다 굽는다.","확산 IBL: 조도 × 알베도 × AO. 벤트 노멀이 있으면 조도를 노멀 대신 벤트 노멀 방향으로 조회한다.","정반사 IBL: 사전 필터 환경맵(R, 거칠기) × split-sum 항 × SO. 반사에 AO를 그대로 곱하지 않는다.","SO 근사 ①(Lagarde 2014): SO = saturate((N·V + AO)^(2^(−16α−1)) − 1 + AO). 매끈하고 정면이면 AO보다 덜, 비스듬하면 더 가리고, 거칠면 AO에 수렴.","SO 근사 ②(벤트 콘): AO로 가시 원뿔(축 = 벤트 노멀)을, 거칠기로 반사 로브 원뿔(축 = R)을 만들고 두 원뿔의 교차 입체각 비율을 SO로 쓴다 (GTAO 논문이 다룬 방식)."],pros:["텍스처 한 장(AO, 선택적으로 벤트 노멀)과 몇 줄의 ALU로 반사 새는 문제를 크게 줄임","열린 면의 반사는 지켜서 재질이 칙칙해지지 않음","모바일에서도 부담이 작음"],cons:["AO는 방향 정보를 잃은 스칼라라서 근사 — 홈처럼 한 방향(홈을 따라)으로만 열린 틈에서는 지나치게 가리고, 한쪽만 막힌 곳에서는 덜 가림","벤트 노멀은 추가 텍스처·베이크 비용","화면 공간 AO에서 얻으면 화면 밖 가림막은 반영 못 함"],usedIn:'Frostbite(Lagarde & de Rousiers 2014 "Moving Frostbite to PBR"), GTAO(Jimenez 외 2016, Call of Duty)의 벤트 노멀 기반 반사 가림, UE·Unity HDRP의 Specular Occlusion 옵션.',controls:[{type:"select",key:"scene",label:"장면",value:"panel",options:Object.keys(U).map(t=>({label:U[t].label,value:t}))},{type:"range",key:"rough",label:"거칠기",min:.03,max:.8,step:.01,value:.15},{type:"range",key:"aoStr",label:"AO 세기",min:0,max:1,step:.05,value:1},{type:"select",key:"method",label:"SO 방식",value:"lagarde",options:Ct.map((t,e)=>({label:Lt[e],value:t}))},{type:"toggle",key:"bent",label:"벤트 노멀",value:!0},{type:"select",key:"debug",label:"디버그 보기",value:"ao",options:Et.map((t,e)=>({label:Yt[e].replace(/ \(.*\)$/,""),value:t}))}],viewers:Ie.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:e=>Ve(e,t.view)}))};export{Pe as default};
