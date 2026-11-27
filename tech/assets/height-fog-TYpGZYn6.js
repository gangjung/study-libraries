import{g as O,P as ut,M as U,S as Pt,u as Ct,az as Wt,q as zt}from"./three.module-BZgG6AUv.js";import{m as Rt}from"./three-viewer-0rZIEDzf.js";import{m as Et}from"./canvas-viewer-Btf0JXdr.js";import{m as _t}from"./noise-QBBaQyUX.js";import{G as bt}from"./glsl-DOwCk4-f.js";const F=2e3,b=221,N=1.5,st=32*Math.sin(-30/120+.4),it=-30,B=100,_=5e3,K=(o,e,i)=>{const n=Math.min(1,Math.max(0,(i-o)/(e-o)));return n*n*(3-2*n)};let J=null;function At(){if(J)return J;const o=_t(7),e=(n,s)=>{const r=32*Math.sin(s/120+.4),t=K(10,140,Math.abs(n-r));let h=5+t*t*(12+70*o.fbm(n/260+3,s/260+7,4,.5,2));h+=(o.fbm(n/45,s/45,3,.5,2)-.5)*6*(.25+t);const d=Math.hypot((n-st)*.8,s-it)*(.75+.5*o.perlin(n/40+2,s/40+9));h-=13*(1-K(25,80,d));const S=Math.hypot(n*.9,s+80),M=(C,v)=>Math.sqrt(C*C+v),m=1-M(2*o.perlin(n/210+11,s/210+5)-1,.004),f=1-M(2*o.perlin(n/75+3,s/75+21)-1,.02),g=Math.hypot(n,s),D=K(300,470,S)*(1-K(780,940,g));return h+=D*(60+190*m*m+55*f*f*(.3+m)),h*(1-K(900,990,g))},i=new Float32Array(b*b);for(let n=0;n<b;n++)for(let s=0;s<b;s++)i[n*b+s]=e(-F/2+s/(b-1)*F,-F/2+n/(b-1)*F);return J=i,i}function V(o,e){const i=At(),n=(o+F/2)/F*(b-1),s=(e+F/2)/F*(b-1);if(n<0||s<0||n>=b-1||s>=b-1)return 0;const r=Math.floor(n),t=Math.floor(s),h=n-r,d=s-t,S=i[t*b+r],M=i[t*b+r+1],m=i[(t+1)*b+r],f=i[(t+1)*b+r+1];return(S*(1-h)+M*h)*(1-d)+(m*(1-h)+f*h)*d}function Mt(o,e){return Math.abs(o-st)<B&&Math.abs(e-it)<B}function pt(o,e){const i=V(o,e);return Mt(o,e)?Math.max(i,N):i}function Tt(o,e){e.d0=.0035*o.num("dens",1),e.k=o.num("falloff",.03),e.h0=o.num("h0",15),e.start=.1/e.d0,e.end=2.2/e.d0,e.inscat=o.num("inscat",1);const i=o.num("sunEl",9)*Math.PI/180,n=o.num("sunAz",15)*Math.PI/180;return e.sun.set(Math.sin(n)*Math.cos(i),Math.sin(i),-Math.cos(n)*Math.cos(i)),e}const kt=()=>({d0:0,k:0,h0:0,start:0,end:1,inscat:1,sun:new O});function et(o,e,i,n,s){if(o===0){const d=Math.min(1,Math.max(0,(s-e.start)/(e.end-e.start)));return-Math.log(Math.max(1-d,1e-4))}if(o===1)return e.d0*s;const r=e.d0*Math.exp(Math.min(60,Math.max(-60,-e.k*(i-e.h0)))),t=Math.min(60,Math.max(-60,e.k*n*s)),h=Math.abs(t)>.001?(1-Math.exp(-t))/t:1-.5*t;return r*s*h}const Q=(o,e)=>o.d0*Math.exp(Math.min(60,-o.k*(e-o.h0)));function ot(o,e){let i=.5,n=0;for(;i<_;){const s=o.x+e.x*i,r=o.y+e.y*i,t=o.z+e.z*i;if((Math.abs(s)>F/2||Math.abs(t)>F/2)&&e.y>=0)break;if(r<pt(s,t)){let h=n,d=i;for(let S=0;S<8;S++){const M=(h+d)/2;o.y+e.y*M<pt(o.x+e.x*M,o.z+e.z*M)?d=M:h=M}return{L:d,sky:!1,far:!1,y:o.y+e.y*d}}n=i,i+=Math.max(1.5,i*.012)}return e.y<0?{L:Math.min(o.y/-e.y,_),sky:!1,far:!0,y:0}:{L:_,sky:!0,far:!1,y:o.y+e.y*_}}function nt(o,e,i,n,s){return s.sky&&o!==2?0:et(o,e,i.y,n.y,s.L)}const lt=`
uniform float fogMode, fogD0, fogK, fogH0, fogStart, fogEnd, inscat, dbg, time;
uniform vec3 sunDir;
vec3 sunColor(){ return vec3(1.7, 1.2, .8) * smoothstep(-.03, .08, sunDir.y); }
vec3 skyCol(vec3 rd){
  float y = max(rd.y, 0.);
  vec3 c = mix(vec3(.62, .64, .68), vec3(.10, .22, .52), pow(y, .5));
  float s = max(dot(rd, sunDir), 0.);
  c += vec3(1., .55, .25) * (pow(s, 6.) * .55 + pow(s, 64.) * .9) * (1. - .7 * y);
  return c;
}
// 광학 깊이 τ. 선형 안개는 T = 1 − f 를 τ = −ln(T) 로 환산해서 같은 틀로 다룬다
float fogTau(vec3 ro, vec3 rd, float L){
  if (fogMode < .5){ float f = clamp((L - fogStart) / (fogEnd - fogStart), 0., 1.); return -log(max(1. - f, 1e-4)); }
  if (fogMode < 1.5) return fogD0 * L;
  // 지수 높이 안개: ∫₀ᴸ d0·e^(−k(ro.y + t·rd.y − h0)) dt 의 해석해
  float a = fogD0 * exp(clamp(-fogK * (ro.y - fogH0), -60., 60.));
  float b = clamp(fogK * rd.y * L, -60., 60.);
  float s = abs(b) > 1e-3 ? (1. - exp(-b)) / b : 1. - .5 * b;
  return a * L * s;
}
vec3 fogColor(vec3 rd){
  if (fogMode < 1.5) return vec3(.5, .53, .56);
  // 방향성 산란: 태양 쪽을 볼수록 따뜻한 색, 반대쪽은 차가운 하늘빛
  float s = max(dot(rd, sunDir), 0.);
  return vec3(.36, .44, .58) + vec3(.85, .38, .08) * inscat * pow(s, 8.) * smoothstep(-.03, .08, sunDir.y);
}
vec3 dbgRamp(float f){
  vec3 c = mix(vec3(.03, .04, .12), vec3(.12, .45, .95), smoothstep(0., .45, f));
  c = mix(c, vec3(1., .9, .4), smoothstep(.45, 1., f));
  return c * (1. - .35 * step(.9, fract(f * 10.)));
}
vec3 fogged(vec3 col, vec3 ro, vec3 rd, float L){
  float T = exp(-fogTau(ro, rd, L));
  return mix(fogColor(rd), col, T);
}
vec3 applyFog(vec3 col, vec3 wp){
  vec3 d = wp - cameraPosition; float L = length(d); vec3 rd = d / L;
  float T = exp(-fogTau(cameraPosition, rd, L));
  if (dbg > .5) return dbgRamp(1. - T);
  return mix(fogColor(rd), col, T);
}
// 하늘 (아래쪽 반구는 높이맵 밖의 먼 땅). 거리 안개 모드는 하늘에 안개를 적용하지 않는다
vec3 skyFinal(vec3 ro, vec3 rd, out float T){
  T = 1.;
  if (rd.y < 0.) {
    float L = min(ro.y / max(-rd.y, 1e-4), ${_.toFixed(1)});
    vec3 g = vec3(.08, .1, .05) * (sunColor() * max(sunDir.y, 0.) + vec3(.25, .32, .45));
    T = exp(-fogTau(ro, rd, L));
    return mix(fogColor(rd), g, T);
  }
  vec3 c = skyCol(rd) + sunColor() * smoothstep(.9994, .9997, dot(rd, sunDir)) * 6.;
  if (fogMode > 1.5) { T = exp(-fogTau(ro, rd, ${_.toFixed(1)})); c = mix(fogColor(rd), c, T); }
  return c;
}
`,Ht=`varying vec3 vW; varying vec3 vN;
void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }`,It=`${bt}${lt}
varying vec3 vW; varying vec3 vN;
void main(){
  vec3 n = normalize(vN);
  float slope = 1. - n.y;
  float h = vW.y;
  float nz = vnoise(vW.xz * .05) * .6 + vnoise(vW.xz * .23) * .4;
  vec3 grass = mix(vec3(.06, .12, .03), vec3(.13, .17, .05), nz);
  vec3 rock = mix(vec3(.15, .13, .11), vec3(.27, .24, .21), nz);
  vec3 alb = mix(grass, rock, smoothstep(.22, .45, slope + (h - 90.) * .002));
  alb = mix(alb, vec3(.3, .27, .2), 1. - smoothstep(2., 4.2, h));
  alb = mix(alb, vec3(.78, .8, .85), smoothstep(150., 190., h + nz * 30.) * smoothstep(.6, .3, slope));
  float ndl = max(dot(n, sunDir), 0.);
  vec3 amb = mix(vec3(.1, .09, .07), vec3(.22, .29, .42), n.y * .5 + .5);
  vec3 col = alb * (sunColor() * ndl + amb);
  gl_FragColor = vec4(applyFog(col, vW), 1.);
  #include <colorspace_fragment>
}`,Nt=`${bt}${lt}
varying vec3 vW; varying vec3 vN;
void main(){
  vec2 q = vW.xz * .25;
  vec3 n = normalize(vec3((vnoise(q + time * .4) - .5) * .25 + (vnoise(q * 3.1 - time) - .5) * .12, 1., (vnoise(q.yx * 1.3 - time * .3) - .5) * .25));
  vec3 v = normalize(vW - cameraPosition);
  vec3 r = reflect(v, n);
  r.y = abs(r.y);
  float fr = .02 + .6 * pow(1. - max(dot(-v, n), 0.), 5.);
  float tr;
  vec3 col = vec3(.01, .035, .045) + skyFinal(vW, r, tr) * fr + sunColor() * pow(max(dot(r, sunDir), 0.), 300.) * 3.;
  gl_FragColor = vec4(applyFog(col, vW), 1.);
  #include <colorspace_fragment>
}`,Gt=`${lt}
varying vec3 vW; varying vec3 vN;
void main(){
  vec3 rd = normalize(vW - cameraPosition);
  float T;
  vec3 col = skyFinal(cameraPosition, rd, T);
  if (dbg > .5) col = dbgRamp(1. - T);
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,St=[0,28,160],Lt=[0,22,-100];function xt(o,e,i){const n=V(o.position.x,o.position.z),r=Math.max(i,n+3,N+2)-o.position.y;Math.abs(r)<1e-4||(o.position.y+=r,e.y+=r)}const Kt=o=>6+160*(.5-.5*Math.cos(o*25e-5)),at=["선형","지수","높이 지수"];function Ot(o,e){return Rt(o,{antialias:!0,cam:St,target:Lt,fov:55,near:.5,far:9e3},({scene:i,camera:n,controls:s})=>{const r=kt(),t={fogMode:{value:e},fogD0:{value:0},fogK:{value:0},fogH0:{value:0},fogStart:{value:0},fogEnd:{value:1},inscat:{value:1},dbg:{value:0},time:{value:0},sunDir:{value:new O}},h=(v,T={})=>new Ct({uniforms:t,vertexShader:Ht,fragmentShader:v,...T}),d=new ut(F,F,b-1,b-1);d.rotateX(-Math.PI/2);const S=d.attributes.position;for(let v=0;v<S.count;v++)S.setY(v,V(S.getX(v),S.getZ(v)));d.computeVertexNormals(),i.add(new U(d,h(It)));const M=new U(new ut(B*2,B*2).rotateX(-Math.PI/2),h(Nt));M.position.set(st,N,it),i.add(M);const m=new U(new Pt(4e3,32,16),h(Gt,{side:Wt,depthWrite:!1}));m.renderOrder=-1,m.frustumCulled=!1,i.add(m),o.shared.set("hfCam",n);const f=o.params.on((v,T)=>{v==="camH"&&!o.params.bool("fly")&&xt(n,s.target,T)}),g=new O,D=new O;let C=0;return{update(v,T,P){if(Tt(o.params,r),t.fogD0.value=r.d0,t.fogK.value=r.k,t.fogH0.value=r.h0,t.fogStart.value=r.start,t.fogEnd.value=r.end,t.inscat.value=r.inscat,t.sunDir.value.copy(r.sun),t.dbg.value=o.params.str("view","final")==="debug"?1:0,t.time.value=T,o.params.bool("fly")&&xt(n,s.target,Kt(P)),m.position.copy(n.position),C++%3===0){n.getWorldDirection(g);const W=ot(n.position,g),R=nt(e,r,n.position,g,W),w=Math.exp(-R),rt=W.sky?e===2?"하늘(안개 적분)":"하늘 · 안개 미적용":W.far?`먼 땅 ${W.L.toFixed(0)} m`:`${W.L.toFixed(0)} m 앞 · 높이 ${W.y.toFixed(0)} m`;D.set(0,.5,.5).unproject(n).sub(n.position).normalize();const c=ot(n.position,D),p=Math.exp(-nt(e,r,n.position,D,c)),k=c.sky?"하늘":`높이 ${c.y.toFixed(0)} m`;o.hud(`${at[e]} · 중앙 투과율 T ${w.toFixed(2)} · 광학 깊이 τ ${R.toFixed(2)} (${rt})
화면 위 1/4 지점 T ${p.toFixed(2)} (${k}) · 카메라 ${n.position.y.toFixed(0)} m`)}},dispose(){f(),o.shared.get("hfCam")===n&&o.shared.delete("hfCam")}}})}const tt=["#f0a050","#5cc8f0","#7ee08a"];function qt(o){return Et(o,()=>{const e=kt(),i=new zt;i.position.set(...St),i.lookAt(...Lt);const n=new O;let s=900,r=0;return{draw(t,h,d){Tt(o.params,e);const S=o.shared.get("hfCam")??i,M=["linear","exp","height"].indexOf(o.params.str("diagType","height")),m=M<0?2:M;S.getWorldDirection(n);const f=S.position,g=Math.hypot(n.x,n.z),D=g>1e-4?n.x/g:0,C=g>1e-4?n.z/g:-1,v=Math.max(g,.001),T=ot(f,n),P=Math.min(T.L,_)*v,W=Math.min(1600,Math.max(320,(T.sky?1100:P)*1.15));s+=(W-s)*.08,t.fillStyle="#0d1118",t.fillRect(0,0,h,d);const R=h<520,w=(a,l=!1)=>`${l?"700 ":""}${a}px "Noto Sans KR", sans-serif`,c=(R?54:74)+6,p=h-10,k=22,$=Math.round(d*.6),A=$+22,q=d-18,z=-15,E=Math.max(260,f.y+60),x=a=>c+a/s*(p-c),y=a=>$-(a-z)/(E-z)*($-k);if(m===2){const a=t.createLinearGradient(0,y(E),0,y(z));for(let l=0;l<=12;l++){const u=E-(E-z)*l/12,L=Math.min(.85,Q(e,u)/.0035*.45);a.addColorStop(l/12,`rgba(150,175,210,${L.toFixed(3)})`)}t.fillStyle=a,t.fillRect(c,k,p-c,$-k)}else m===1&&(t.fillStyle=`rgba(150,175,210,${Math.min(.85,e.d0/.0035*.45).toFixed(3)})`,t.fillRect(c,k,p-c,$-k));t.beginPath(),t.moveTo(c,$);const H=220,Y=[];for(let a=0;a<=H;a++){const l=a/H*s,u=V(f.x+D*l,f.z+C*l);Y.push(u),t.lineTo(x(l),y(u))}t.lineTo(p,$),t.closePath(),t.fillStyle="#2b3524",t.fill(),t.strokeStyle="#6f8a5a",t.lineWidth=1.2,t.beginPath(),Y.forEach((a,l)=>(l?t.lineTo:t.moveTo).call(t,x(l/H*s),y(a))),t.stroke(),t.fillStyle="rgba(60,120,200,.8)";for(let a=0;a<H;a++){const l=a/H*s,u=f.x+D*l,L=f.z+C*l;Mt(u,L)&&Y[a]<N&&t.fillRect(x(l),y(N),x(s/H)-c+1,y(Y[a])-y(N))}if(m===0){t.save(),t.beginPath(),t.rect(c,k,p-c,$-k),t.clip(),t.strokeStyle="rgba(240,160,80,.7)",t.setLineDash([4,4]);for(const a of[e.start,e.end]){t.beginPath();const l=a/s*(p-c),u=a/(E-z)*($-k);t.ellipse(x(0),y(f.y),l,u,0,-Math.PI/2,Math.PI/2),t.stroke()}t.setLineDash([]),t.fillStyle="rgba(240,160,80,.9)",t.font=w(10),t.fillText("시작",x(0)+e.start/s*(p-c)+3,y(f.y)-3),t.fillText("끝 (완전 안개)",Math.min(p-70,x(0)+e.end/s*(p-c)+3),y(f.y)-18),t.restore()}t.strokeStyle="rgba(126,224,138,.6)",t.setLineDash([5,4]),t.beginPath(),t.moveTo(c,y(e.h0)),t.lineTo(p,y(e.h0)),t.stroke(),t.setLineDash([]),t.fillStyle="rgba(126,224,138,.9)",t.font=w(10),t.fillText(`기준 높이 h₀ = ${e.h0.toFixed(0)} m`,p-120,y(e.h0)-4);const X=90,ct=Math.min(T.L,s/v);for(let a=0;a<X;a++){const l=a/X*ct,u=(a+1)/X*ct,L=Math.exp(-et(m,e,f.y,n.y,u));t.strokeStyle=`rgba(255,225,140,${(.15+.85*L).toFixed(3)})`,t.lineWidth=2.5,t.beginPath(),t.moveTo(x(l*v),y(f.y+n.y*l)),t.lineTo(x(u*v),y(f.y+n.y*u)),t.stroke()}!T.sky&&P<=s&&(t.fillStyle="#ffe08c",t.beginPath(),t.arc(x(P),y(T.y),4,0,Math.PI*2),t.fill()),t.fillStyle="#ffffff",t.beginPath(),t.moveTo(x(0)+8,y(f.y)),t.lineTo(x(0)-4,y(f.y)-6),t.lineTo(x(0)-4,y(f.y)+6),t.closePath(),t.fill();const ft=e.sun.x*D+e.sun.z*C,gt=Math.asin(e.sun.y)*180/Math.PI;t.fillStyle="#ffc870",t.font=w(10);const yt=`태양 ${gt.toFixed(0)}° · ${ft>.3?"시선 앞쪽":ft<-.3?"시선 뒤쪽":"옆쪽"}`;t.fillText(yt,p-t.measureText(yt).width,k-6),t.strokeStyle="rgba(255,255,255,.15)",t.fillStyle="rgba(255,255,255,.55)",t.font=w(9);for(let a=0;a<=E;a+=50)t.beginPath(),t.moveTo(c-3,y(a)),t.lineTo(c,y(a)),t.stroke(),t.fillText(`${a}`,c-22,y(a)+3);const G=4,ht=c-26;t.strokeStyle="rgba(255,255,255,.2)",t.strokeRect(G,k,ht-G,$-k);const Ft=Q(e,z)||1,dt=(a,l,u)=>{t.strokeStyle=l,t.lineWidth=u,t.beginPath();for(let L=0;L<=60;L++){const Z=z+(E-z)*L/60,Dt=Math.min(1,a(Z)),vt=G+2+Dt*(ht-G-4);L?t.lineTo(vt,y(Z)):t.moveTo(vt,y(Z))}t.stroke()};dt(()=>.35,"rgba(92,200,240,.6)",m===1?2:1),dt(a=>Q(e,a)/Ft,"#7ee08a",m===2?2.2:1.2),t.fillStyle="rgba(255,255,255,.7)",t.font=w(9,!0),t.fillText("밀도(h)",G+2,k-6);const j=a=>q-a*(q-A);t.strokeStyle="rgba(255,255,255,.18)",t.lineWidth=1,t.strokeRect(c,A,p-c,q-A),t.fillStyle="rgba(255,255,255,.55)",t.font=w(9),t.fillText("T=1",c-24,j(1)+4),t.fillText("0",c-12,j(0)),t.fillText("광선 투과율 T(거리)",c+4,A-6);const wt=T.sky?s:Math.min(s,P);for(const a of[0,1,2]){t.strokeStyle=tt[a],t.lineWidth=a===m?2.6:1.2,t.globalAlpha=a===m?1:.6,t.beginPath();for(let l=0;l<=100;l++){const u=l/100*wt,L=Math.exp(-et(a,e,f.y,n.y,u/v));l?t.lineTo(x(u),j(L)):t.moveTo(x(u),j(L))}t.stroke(),t.globalAlpha=1}!T.sky&&P<=s&&(t.strokeStyle="rgba(255,224,140,.6)",t.setLineDash([3,3]),t.beginPath(),t.moveTo(x(P),k),t.lineTo(x(P),q),t.stroke(),t.setLineDash([])),t.font=w(R?9:10,!0);let mt=c+(R?4:130);const $t=A-6,I=[0,1,2].map(a=>nt(a,e,f,n,T));if(R)[0,1,2].forEach((a,l)=>{t.fillStyle=tt[a],t.fillText(`${at[a]} T ${Math.exp(-I[a]).toFixed(2)}`,p-96,A+12+l*12)});else for(const a of[0,1,2]){t.fillStyle=tt[a];const l=`${at[a]} τ ${I[a].toFixed(2)} · T ${Math.exp(-I[a]).toFixed(2)}`;t.fillText(l,mt,$t),mt+=t.measureText(l).width+14}if(t.fillStyle="rgba(255,255,255,.45)",t.font=w(9),t.fillText(`수평 거리 → ${s.toFixed(0)} m`,p-100,d-5),r++%6===0){const a=T.sky?"하늘":`거리 ${T.L.toFixed(0)} m`;o.hud(`중앙 광선 · ${a} · 높이 안개 τ ${I[2].toFixed(2)} vs 지수 ${I[1].toFixed(2)} vs 선형 ${I[0].toFixed(2)}`)}}}})}const Yt=[{mode:0,title:"선형 거리 안개 (시작~끝)",kind:"before",caption:"카메라에서의 거리만으로 0→1 섞는다. 같은 거리라면 골짜기 바닥도 산꼭대기도 똑같이 흐려지고, 먼 산은 평평한 회색 벽이 된다. 하늘에는 안개가 없어 지평선에 어색한 띠가 생긴다."},{mode:1,title:"지수 거리 안개 (e^−d·거리)",kind:"variant",caption:"투과율 T = e^(−밀도·거리). 경계가 부드러워졌지만 여전히 높이를 모른다 — 산 정상도 계곡과 같은 양의 안개를 받는다."},{mode:2,title:"지수 높이 안개 + 태양 쪽 산란",kind:"after",caption:"밀도 = d0·e^(−감쇠·(높이−h₀))를 시선 광선을 따라 해석적으로 적분. 안개가 골짜기와 호수에 고이고 봉우리가 위로 솟는다. 태양 쪽은 따뜻하게, 반대쪽은 차갑게 물들고 하늘 지평선도 같은 식이라 이음매가 없다."}],Ut={layout:"variants",intro:'안개는 단순히 "멀수록 회색"이 아닙니다. 실제 대기의 습기·먼지는 <b>낮은 곳에 짙고 위로 갈수록 지수적으로 옅어지기</b> 때문에, 아침 안개는 골짜기에 고이고 산봉우리는 그 위로 솟아 보입니다. <b>지수 높이 안개</b>는 밀도를 높이의 지수 함수로 두고, 카메라에서 픽셀까지의 시선 광선을 따라 밀도를 <b>해석적으로 적분</b>해 투과율을 구합니다. 여기에 태양 쪽을 볼 때만 따뜻해지는 <b>방향성 산란</b>을 더하면 거리감과 시간대 분위기를 한 번에 잡습니다. 볼류메트릭 안개나 대기 산란 시뮬레이션보다 훨씬 싸서, 거의 모든 실외 장면의 기본 안개 패스로 쓰입니다.',how:["픽셀의 월드 위치와 카메라 위치로 시선 방향 rd와 거리 L을 구한다 (포스트 패스라면 깊이 버퍼에서 복원).","선형 안개: f = clamp((L − 시작)/(끝 − 시작)). 지수 안개: T = e^(−d·L). 둘 다 높이를 보지 않는다.","높이 안개: 밀도 σ(y) = d0·e^(−k(y−h₀)). 광선 y(t) = y_cam + t·rd.y를 대입하면 ∫σ dt가 닫힌 식이 된다 → τ = d0·e^(−k(y_cam−h₀))·L·(1 − e^(−k·rd.y·L))/(k·rd.y).","투과율 T = e^(−τ). 최종색 = 장면색·T + 안개색·(1 − T). rd.y≈0이면 극한값 L을 쓴다.","안개색 = 하늘빛(차가운 색) + 태양색 · 세기 · max(rd·태양, 0)^지수 → 태양 쪽만 따뜻하게 빛난다 (방향성 산란 로브).","하늘 픽셀에도 L→∞ 로 같은 식을 적용하면 지평선 근처가 자동으로 안개색이 되어 먼 산과 하늘이 이어진다."],pros:["픽셀당 exp 몇 번 — 매우 싸다 (모바일도 가능)","골짜기·호수에 고이는 안개, 산이 솟는 공중 원근감","하늘과 지형이 같은 식이라 지평선 이음매가 없다","포워드 셰이더 안에서도, 깊이 기반 후처리로도 구현 가능"],cons:["밀도가 높이만의 함수 — 구름 덩어리·국지 안개·빛줄기 그림자는 표현 못 함 (볼류메트릭 안개 필요)","안개 속 산란이 그림자를 모른다 (산 뒤 그늘진 계곡의 안개도 똑같이 밝음)","반투명 물체는 각자 셰이더에서 안개를 따로 적용해야 함"],usedIn:"Unreal Engine Exponential Height Fog (Fog Density, Fog Height Falloff, Directional Inscattering), Unity HDRP Fog(Base Height·Maximum Height), 대부분의 오픈월드 게임의 기본 대기 안개. 볼류메트릭 안개는 그 위에 얹는 형태가 흔하다.",controls:[{type:"select",key:"view",label:"표시",options:[{label:"최종 화면",value:"final"},{label:"안개량 (1−T) 디버그",value:"debug"}],value:"final"},{type:"range",key:"dens",label:"안개 농도",min:.2,max:3,step:.05,value:1},{type:"range",key:"falloff",label:"높이 감쇠",min:.005,max:.12,step:.005,value:.03},{type:"range",key:"h0",label:"안개 기준 높이",min:-20,max:120,step:1,value:15},{type:"range",key:"sunEl",label:"태양 고도",min:1,max:40,step:1,value:9},{type:"range",key:"sunAz",label:"태양 방위",min:-180,max:180,step:1,value:15},{type:"range",key:"inscat",label:"산란 세기",min:0,max:2,step:.05,value:1},{type:"range",key:"camH",label:"카메라 높이",min:4,max:260,step:1,value:28},{type:"toggle",key:"fly",label:"자동 비행 (안개층 통과)",value:!1},{type:"select",key:"diagType",label:"단면도 안개 종류",options:[{label:"선형",value:"linear"},{label:"지수",value:"exp"},{label:"높이 지수",value:"height"}],value:"height"}],viewers:[...Yt.map(o=>({title:o.title,kind:o.kind,caption:o.caption,mount:e=>Ot(e,o.mode)})),{title:"단면도: 높이별 밀도 · 중앙 광선의 투과율",kind:"info",wide:!0,caption:"시선 방향으로 자른 지형 단면. 배경의 푸른 농도가 안개 밀도, 노란 선이 화면 중앙 광선(흐려질수록 투과율이 떨어짐)이다. 아래 그래프는 광선을 따라 누적된 투과율 — 주황 선형, 파랑 지수, 초록 높이 지수.",mount:qt}]};export{Ut as default};
