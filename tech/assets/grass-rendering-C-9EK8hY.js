import{u as V,aq as K,p as j,g as T,M as I,P as X,S as dt,b as vt,D as ft,H as mt,aQ as J,b1 as Q,b2 as Z,aP as pt,b0 as ht,aB as xt,ac as gt,L as Y,r as bt,k as wt,b3 as yt,a4 as Ct,m as tt,a8 as Mt,ap as Wt,ae as St,n as Lt}from"./three.module-BZgG6AUv.js";import{a as Dt}from"./BufferGeometryUtils-CSZ6nkm7.js";import{m as et}from"./three-viewer-0rZIEDzf.js";import{m as Tt,a as q}from"./canvas-viewer-Btf0JXdr.js";import{G as N}from"./glsl-DOwCk4-f.js";import{B as Ot,t as O,D as $,F as zt}from"./chart2d-JzIgcti9.js";const z=8,D=7,P=z*D/2,ot=40,F=ot*D*D,nt=[4,2,1],E=nt.map(t=>2*t-1),Pt=["#4ade80","#facc15","#ff9a3c"],G=8,k=6,at=new wt(1,.35).normalize(),st=new j(.55,.66,.78),At=t=>t<=10?1:Math.max(.12,Math.pow(10/t,1.5)),$t=t=>t<14?0:t<30?1:2;function kt(t,o){return o.set(5.5*Math.sin(t*.31),.42+.04*Math.abs(Math.sin(t*5)),2+4.5*Math.sin(t*.47+1))}const U=`
const vec3 SUN = normalize(vec3(.35, .5, -.8));
const vec3 SKYC = vec3(.62, .74, .86);
const vec3 FOGC = vec3(.55, .66, .78);
float gustAt(vec2 p, vec2 W, float time){ return smoothstep(.3, .8, vnoise(p * .13 - W * time * 1.6)); }
vec3 fogIt(vec3 c, vec3 cam, vec3 w){ return mix(c, FOGC, 1. - exp(-max(length(cam - w) - 10., 0.) * .016)); }
`,Rt=`
attribute vec4 aBlade; // x, z, 순번(0~1, 무작위 순서), 높이
uniform float uTime, uWind, uLodOn, uDens, uInteract, uLodLevel;
uniform vec2 uWindDir; uniform vec3 uCamPos; uniform sampler2D uTrail; uniform vec3 uTrailRect;
varying float vT; varying vec3 vN; varying vec3 vW; varying float vR; varying float vP;
${N}
${U}
void main(){
  vP = 0.;
  vec3 root = vec3(aBlade.x, 0., aBlade.y);
  float u = aBlade.z, h = aBlade.w;
  float r = hash12(root.xz * 17.3);
  // 거리 LOD: 멀수록 순번이 큰 블레이드부터 빼고, 남은 블레이드는 넓혀 덮는 면적을 유지
  float d = distance(root, uCamPos);
  float keep = uLodOn > .5 ? clamp(pow(10. / max(d, 10.), 1.5), .12, 1.) : 1.;
  float lim = uDens * keep;
  if (u > lim) { gl_Position = vec4(2., 2., 2., 1.); return; }
  float fade = smoothstep(lim, lim * .85, u); // 경계 블레이드는 가늘어지며 사라짐 → 팝핑 완화
  float wMul = uLodOn > .5 ? min(inversesqrt(keep), 2.6) : 1.;
  float t = position.y;
  float ang = r * 6.2832;
  vec2 f = vec2(cos(ang), sin(ang));
  vec3 s3 = vec3(-f.y, 0., f.x);
  float lean = .2 + .45 * hash12(root.xz * 3.1 + 7.);
  // 바람: 바람 방향으로 흘러가는 돌풍 노이즈 + 블레이드별 위상의 잔떨림
  float gust = gustAt(root.xz, uWindDir, uTime);
  float sway = sin(uTime * 2.4 + r * 6.2832 + dot(root.xz, uWindDir) * .7);
  vec2 bend = f * lean + uWindDir * uWind * (.15 + .75 * gust + .18 * sway * (.4 + gust));
  // 상호작용: 밀어내기 텍스처 (RG = 밀 방향, B = 눌림 세기)
  if (uInteract > .5) {
    vec2 tuv = (root.xz - uTrailRect.xy) / uTrailRect.z;
    if (tuv.x > 0. && tuv.x < 1. && tuv.y > 0. && tuv.y < 1.) {
      vec4 tr = texture2D(uTrail, tuv);
      bend = mix(bend, (tr.xy * 2. - 1.) * 2.4, tr.z);
      vP = tr.z;
    }
  }
  // 일정 곡률의 호로 굽힘 → 블레이드 길이가 보존됨
  float bl = length(bend);
  vec2 bd = bl > 1e-4 ? bend / bl : f;
  float A = clamp(bl, .001, 1.5);
  float hor = h * (1. - cos(A * t)) / A;
  float ver = h * sin(A * t) / A;
  vec3 tang = vec3(bd.x * sin(A * t), cos(A * t), bd.y * sin(A * t));
  float w = .05 * wMul * fade * (1. - .75 * t);
  vec3 p = root + vec3(bd.x * hor, ver, bd.y * hor) + s3 * position.x * w;
  vec3 n = normalize(cross(s3, tang));
  n = normalize(n + s3 * position.x * .7); // 둥근 법선: 납작한 띠가 원통처럼 음영
  vT = t; vN = n; vW = p; vR = r;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.);
}`,Ft=`
uniform float uLodCol, uLodLevel, uOver; uniform vec4 uOverCol; uniform vec3 uCamPos;
varying float vT; varying vec3 vN; varying vec3 vW; varying float vR; varying float vP;
${N}
${U}
void main(){
  if (uOver > .5) { gl_FragColor = uOverCol; return; }
  vec3 V = normalize(uCamPos - vW);
  vec3 N = normalize(vN); if (dot(N, V) < 0.) N = -N;
  float patchy = vnoise(vW.xz * .16);
  vec3 rootC = vec3(.015, .045, .01);
  vec3 tipC = mix(vec3(.16, .42, .04), vec3(.5, .55, .1), patchy * .85 + vR * .25);
  vec3 alb = mix(rootC, tipC, smoothstep(0., 1., vT));
  alb = mix(alb, vec3(.42, .5, .16) * (.4 + .6 * vT), vP * .6); // 눌린 풀은 밝은 뒷면이 드러남
  float dif = clamp(dot(N, SUN) * .65 + .35, 0., 1.);
  float back = pow(clamp(dot(-V, SUN), 0., 1.), 3.) * vT;   // 역광 투과(가짜 SSS)
  float spec = pow(max(dot(N, normalize(SUN + V)), 0.), 48.) * .35 * vT;
  float ao = mix(.3, 1., vT);                                // 뿌리 쪽 가림
  vec3 c = alb * (vec3(1., .93, .8) * dif * 1.5 + SKYC * .35) * ao + vec3(.35, .6, .06) * back * 1.2 + vec3(1., .95, .8) * spec;
  if (uLodCol > .5) c = (uLodLevel < .5 ? vec3(.29, .87, .5) : uLodLevel < 1.5 ? vec3(.98, .8, .08) : vec3(1., .6, .24)) * (.3 + .7 * vT);
  gl_FragColor = vec4(fogIt(c, uCamPos, vW), 1.);
  #include <colorspace_fragment>
}`,Nt=`
attribute vec4 aCard; // x, z, 난수, 크기
uniform float uTime, uWind; uniform vec2 uWindDir;
varying vec2 vUv; varying vec3 vW;
${N}
${U}
void main(){
  float a = aCard.z * 6.2832;
  vec3 p = position * aCard.w;
  p = vec3(cos(a) * p.x - sin(a) * p.z, p.y, sin(a) * p.x + cos(a) * p.z);
  vec2 root = aCard.xy;
  float gust = gustAt(root, uWindDir, uTime);
  float sway = sin(uTime * 2.4 + aCard.z * 6.2832);
  // 카드 전체가 한 장의 판으로 기움 (윗변 정점만 밀기)
  p.xz += uWindDir * uWind * (.1 + .35 * gust + .06 * sway) * uv.y * uv.y * aCard.w;
  p += vec3(root.x, 0., root.y);
  vUv = uv; vW = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.);
}`,Ut=`
uniform sampler2D uTex; uniform float uOver; uniform vec4 uOverCol; uniform vec3 uCamPos;
varying vec2 vUv; varying vec3 vW;
${N}
${U}
void main(){
  // 투명 부분도 픽셀 셰이더는 실행된 뒤 버려진다 → 오버드로에 포함
  if (uOver > .5) { gl_FragColor = uOverCol; return; }
  vec4 tx = texture2D(uTex, vUv);
  if (tx.a < .5) discard;
  // 카드 법선 = 위쪽 고정 (판 방향 음영을 숨기려는 흔한 트릭) → 평평한 조명
  vec3 c = tx.rgb * (vec3(1., .93, .8) * SUN.y * 1.5 + SKYC * .35) * mix(.45, 1., vUv.y);
  gl_FragColor = vec4(fogIt(c, uCamPos, vW), 1.);
  #include <colorspace_fragment>
}`,Gt="varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",It=`
uniform vec3 uCamPos; varying vec3 vW;
${N}
${U}
void main(){
  float n = vnoise(vW.xz * .5) * .5 + vnoise(vW.xz * 2.3) * .5;
  float inField = step(abs(vW.x), ${P.toFixed(1)}) * step(abs(vW.z), ${P.toFixed(1)});
  vec3 c = mix(vec3(.09, .07, .04), vec3(.035, .075, .018), inField) * (.65 + .7 * n);
  gl_FragColor = vec4(fogIt(c, uCamPos, vW), 1.);
  #include <colorspace_fragment>
}`;function it(t){t.background=st.clone();const o={uCamPos:{value:new T}},e=new I(new X(220,220),new V({uniforms:o,vertexShader:Gt,fragmentShader:It}));e.rotation.x=-Math.PI/2;const c=new I(new dt(.42,24,16),new vt({color:14700604,roughness:.5})),a=new ft(16773853,2.2);a.position.set(3.5,5,-8),t.add(e,c,a,new mt(12375276,2241297,1.2));const l=new T;return{ground:e,char:c,cp:l,update(i,w){o.uCamPos.value.copy(w),kt(i,l),c.position.copy(l)}}}function _t(t){const o=[],e=[];for(let c=0;c<t;c++)o.push(-1,c/t,0,1,c/t,0);o.push(0,1,0);for(let c=0;c<t-1;c++){const a=2*c;e.push(a,a+1,a+3,a,a+3,a+2)}return e.push(2*(t-1),2*(t-1)+1,2*t),{pos:new Ct(o,3),index:new yt(e,1)}}const rt=(t,o)=>.72+.4*(.5+.5*Math.sin(t*.23+Math.cos(o*.19)*2));function Bt(){return{uTime:{value:0},uWind:{value:1},uWindDir:{value:at.clone()},uLodOn:{value:1},uDens:{value:.5},uCamPos:{value:new T},uInteract:{value:0},uTrail:{value:null},uTrailRect:{value:new T(-16,-16,32)},uLodLevel:{value:0},uLodCol:{value:0},uOver:{value:0},uOverCol:{value:new J}}}function Et(t,o,e){const c=nt.map(_t),a=[];for(let r=0;r<z;r++)for(let v=0;v<z;v++){const n=q(1e3+r*z+v),g=-P+v*D,y=-P+r*D,s=new Float32Array(F*4);for(let m=0;m<F;m++){const p=g+n()*D,f=y+n()*D;s[m*4]=p,s[m*4+1]=f,s[m*4+2]=m/F,s[m*4+3]=(.42+.38*n())*rt(p,f)}const d=new Q(s,4),u=c.map(m=>{const p=new Z;return p.setIndex(m.index),p.setAttribute("position",m.pos),p.setAttribute("aBlade",d),p.instanceCount=0,p}),b=new I(u[0],o);b.frustumCulled=!1;const M={mesh:b,geos:u,box:new pt(new T(g-.8,0,y-.8),new T(g+D+.8,1.2,y+D+.8)),center:new T(g+D/2,.4,y+D/2),lod:0,culled:!1,count:0};b.onBeforeRender=()=>{e.uLodLevel.value=M.lod,o.uniformsNeedUpdate=!0},t.add(b),a.push(M)}const l=new ht,i=new xt;return{chunks:a,update:(r,v,n,g)=>{r.updateMatrixWorld(),i.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),l.setFromProjectionMatrix(i);const y=r.position,s={submitted:0,total:0,tris:0,calls:0,culled:0,lodN:[0,0,0],ringWith:new Array(k).fill(0),ringWithout:new Array(k).fill(0),trisWith:0,trisWithout:0,instWith:0,instWithout:0},d=Math.ceil(F*v);for(const u of a){u.culled=!l.intersectsBox(u.box);const b=u.box.distanceToPoint(y),M=Math.ceil(F*v*At(b)),m=$t(b);u.lod=n?m:0,u.count=n?M:d,s.total+=d,u.culled&&s.culled++;const p=!(g&&u.culled)&&u.count>0;if(u.mesh.visible=p,p&&(u.mesh.geometry=u.geos[u.lod],u.geos[u.lod].instanceCount=u.count,s.submitted+=u.count,s.tris+=u.count*E[u.lod],s.calls++,s.lodN[u.lod]++),!u.culled){const f=Math.min(k-1,Math.floor(u.center.distanceTo(y)/G));s.ringWith[f]+=M,s.ringWithout[f]+=d,s.instWith+=M,s.instWithout+=d,s.trisWith+=M*E[m],s.trisWithout+=d*E[0]}}return s},dispose:()=>{for(const r of a)r.geos.forEach(v=>v.dispose())}}}function lt(t){let e=100;const c=new bt(160,e,{depthBuffer:!1});let a=new Uint8Array(160*e*4);const l={avg:0,max:0},i=(x,r,v)=>{for(const n of x)n.uniforms.uOver.value=r?1:0,n.uniforms.uOverCol.value.set(...v),n.blending=r?Mt:Wt,n.depthTest=!r,n.depthWrite=!r};return{res:l,sample:(x,r,v,n,g,y)=>{const s=Math.max(40,Math.min(200,Math.round(160/r.aspect)));s!==e&&(e=s,c.setSize(160,e),a=new Uint8Array(160*e*4));const d=x.background;x.background=null;const u=n.map(f=>f.visible);n.forEach(f=>f.visible=!1),i(v,!0,[1/255,0,0,1]);const b=t.getClearColor(new j),M=t.getClearAlpha();t.setClearColor(0,1),t.setRenderTarget(c),t.clear(),t.render(x,r),t.readRenderTargetPixels(c,0,0,160,e,a),t.setRenderTarget(null),t.setClearColor(b,M),i(v,g,y),n.forEach((f,C)=>f.visible=u[C]),x.background=d;let m=0,p=0;for(let f=0;f<160*e;f++){const C=a[f*4];m+=C,C>p&&(p=C)}l.avg=m/(160*e),l.max=p},setMode:i,dispose:()=>c.dispose()}}const _=[.06,.03,.012,1],ct={antialias:!0,cam:[0,3.4,12.5],target:[0,.2,1.5],fov:50,far:160};function ut(t,o,e){t.background=e?new j(0):st.clone(),o.visible=!e}const R=t=>t>=1e4?(t/1e3).toFixed(1)+"k":t.toLocaleString();function Vt(){const t=document.createElement("canvas");t.width=t.height=128;const o=t.getContext("2d"),e=q(7);for(let a=0;a<13;a++){const l=12+e()*104,i=l+(e()-.5)*50,w=6+e()*40,x=3+e()*3,r=o.createLinearGradient(0,128,0,w);r.addColorStop(0,"#1e3a10"),r.addColorStop(1,e()<.5?"#9cbf45":"#7fae38"),o.fillStyle=r,o.beginPath(),o.moveTo(l-x,128),o.quadraticCurveTo(l+(i-l)*.2-x*.5,70,i,w),o.quadraticCurveTo(l+(i-l)*.2+x*.5,70,l+x,128),o.fill()}const c=new St(t);return c.colorSpace=Lt,c}function jt(t){return et(t,ct,({scene:o,camera:e,renderer:c})=>{const a=it(o),l=Vt(),i=new X(1,1).translate(0,.5,0),w=i.clone().rotateY(Math.PI/2),x=Dt([i,w]);i.dispose(),w.dispose();const r={uTime:{value:0},uWind:{value:1},uWindDir:{value:at.clone()},uTex:{value:l},uOver:{value:0},uOverCol:{value:new J},uCamPos:{value:new T}},v=new V({uniforms:r,vertexShader:Nt,fragmentShader:Ut,side:K});let n=null,g=null,y=0;const s=()=>{g&&o.remove(g),n==null||n.dispose();const p=t.params.num("dens",20);y=Math.round(p/8*(2*P)**2);const f=q(42),C=new Float32Array(y*4);for(let h=0;h<y;h++){const A=(f()*2-1)*P,S=(f()*2-1)*P;C.set([A,S,f(),(.75+.45*f())*rt(A,S)*.75],h*4)}n=new Z,n.setIndex(x.index),n.setAttribute("position",x.attributes.position),n.setAttribute("uv",x.attributes.uv),n.setAttribute("aCard",new Q(C,4)),n.instanceCount=y,g=new I(n,v),g.frustumCulled=!1,o.add(g)};s();const d=lt(c);let u=!1;const b=()=>{u=t.params.bool("over"),ut(o,a.ground,u),d.setMode([v],u,_)};b();const M=t.params.on(p=>{p==="dens"&&s(),p==="over"&&b()});let m=0;return{update(p,f,C){const h=C/1e3;a.update(h,e.position),r.uTime.value=h,r.uWind.value=t.params.num("wind",1),r.uCamPos.value.copy(e.position),m++%30===0&&d.sample(o,e,[v],[a.ground,a.char],u,_),t.hud(`알파 카드 ${y.toLocaleString()}장 (교차 쿼드 2장)
삼각형 ${R(y*4)} · 드로우 콜 1 · 컬링 없음
오버드로 평균 ${d.res.avg.toFixed(2)}층 · 최대 ${d.res.max}층
(투명 텍셀도 셰이딩 후 discard)`)},dispose(){M(),d.dispose(),n==null||n.dispose(),x.dispose(),l.dispose()}}})}const W=128,L={x0:-16,z0:-16,size:32};function qt(){const t=new Float32Array(W*W),o=new Float32Array(W*W),e=new Float32Array(W*W),c=new Uint8Array(W*W*4),a=new gt(c,W,W);a.magFilter=Y,a.minFilter=Y,a.needsUpdate=!0;const l=L.size/W,i=1.3;let w=0;return{tex:a,s:t,step:(r,v,n,g)=>{const y=Math.exp(-r/3);for(let s=0;s<t.length;s++)t[s]*=y;if(g){const s=(v-L.x0)/l,d=(n-L.z0)/l,u=Math.ceil(i/l)+1;for(let b=Math.max(0,Math.floor(d-u));b<Math.min(W,d+u);b++)for(let M=Math.max(0,Math.floor(s-u));M<Math.min(W,s+u);M++){const m=L.x0+(M+.5)*l-v,p=L.z0+(b+.5)*l-n,f=Math.hypot(m,p),C=1-tt.smoothstep(f,.6,i),h=b*W+M;C>t[h]&&(t[h]=C,o[h]=f>.001?m/f:0,e[h]=f>.001?p/f:0)}}w=0;for(let s=0;s<t.length;s++)t[s]>.3&&w++,c[s*4]=(o[s]*.5+.5)*255,c[s*4+1]=(e[s]*.5+.5)*255,c[s*4+2]=t[s]*255,c[s*4+3]=255;a.needsUpdate=!0},pressedArea:()=>w*l*l}}function Yt(t){const o=document.createElement("canvas");o.style.cssText="position:absolute;right:6px;bottom:6px;border-radius:6px;pointer-events:none;z-index:2;border:1px solid rgba(255,255,255,.15)",t.appendChild(o);const e=o.getContext("2d"),c=document.createElement("canvas");c.width=c.height=W;const a=c.getContext("2d"),l=a.createImageData(W,W),i=P+4,w=new T;return{draw:(r,v,n,g,y)=>{const s=t.clientWidth,d=Math.round(Math.max(84,Math.min(150,s*.3))),u=Math.min(window.devicePixelRatio||1,2);o.width!==d*u&&(o.width=o.height=d*u,o.style.width=o.style.height=d+"px"),e.setTransform(u,0,0,u,0,0);const b=h=>(h+i)/(2*i)*d;e.fillStyle="rgba(8,10,16,.82)",e.fillRect(0,0,d,d);const M=D/(2*i)*d;for(const h of r){const A=b(h.box.min.x+.8),S=b(h.box.min.z+.8);e.fillStyle=h.culled?y?"#1a1e27":"#3a2230":Pt[h.lod],e.globalAlpha=h.culled?1:.55,e.fillRect(A+.5,S+.5,M-1,M-1)}if(e.globalAlpha=1,g){for(let h=0;h<W*W;h++)l.data[h*4]=l.data[h*4+1]=l.data[h*4+2]=255,l.data[h*4+3]=g[h]*255;a.putImageData(l,0,0),e.drawImage(c,b(L.x0),b(L.z0),L.size/(2*i)*d,L.size/(2*i)*d),e.strokeStyle="rgba(255,255,255,.25)",e.setLineDash([2,2]),e.strokeRect(b(L.x0),b(L.z0),L.size/(2*i)*d,L.size/(2*i)*d),e.setLineDash([])}v.getWorldDirection(w);const m=Math.atan2(w.z,w.x),p=Math.atan(Math.tan(tt.degToRad(v.fov/2))*v.aspect),f=b(v.position.x),C=b(v.position.z);e.strokeStyle="#e6ebf2",e.lineWidth=1,e.beginPath(),e.moveTo(f+Math.cos(m-p)*d,C+Math.sin(m-p)*d),e.lineTo(f,C),e.lineTo(f+Math.cos(m+p)*d,C+Math.sin(m+p)*d),e.stroke(),e.fillStyle="#e6ebf2",e.beginPath(),e.arc(f,C,2.5,0,Math.PI*2),e.fill(),e.fillStyle="#ff5a46",e.beginPath(),e.arc(b(n.x),b(n.z),2.5,0,Math.PI*2),e.fill()},dispose:()=>o.remove()}}function H(t,o){return et(t,ct,({scene:e,camera:c,renderer:a})=>{const l=it(e),i=Bt(),w=new V({uniforms:i,vertexShader:Rt,fragmentShader:Ft,side:K}),x=Et(e,w,i),r=o?qt():null;r&&(i.uTrail.value=r.tex);const v=o?Yt(t.body):null,n=lt(a);let g=!1;const y=()=>{g=t.params.bool("over"),ut(e,l.ground,g),n.setMode([w],g,_)};y();const s=t.params.on(u=>u==="over"&&y());let d=0;return{update(u,b,M){const m=t.params,p=M/1e3;l.update(p,c.position);const f=m.bool("lod",!0),C=m.bool("cull",!0),h=o&&m.bool("interact",!0),A=m.num("dens",20)/ot;i.uTime.value=p,i.uWind.value=m.num("wind",1),i.uLodOn.value=f?1:0,i.uDens.value=A,i.uCamPos.value.copy(c.position),i.uInteract.value=h?1:0,i.uLodCol.value=m.bool("lodcol")?1:0;const S=x.update(c,A,f,C);if(o||t.shared.set("grassStats",S),r&&r.step(u,l.cp.x,l.cp.z,h),v==null||v.draw(x.chunks,c,l.cp,h&&r?r.s:null,C),r){t.hud(`블레이드 ${S.submitted.toLocaleString()} · 삼각형 ${R(S.tris)}
시야 밖 청크 ${S.culled}/${z*z}${C?" 생략":" (그래도 그림)"}
`+(h?`눌린 풀 ${r.pressedArea().toFixed(1)} m² (회복 τ≈3초)`:"상호작용 꺼짐"));return}d++%30===0&&n.sample(e,c,[w],[l.ground,l.char],g,_);let B=`블레이드 ${S.submitted.toLocaleString()} 제출 (전체 ${S.total.toLocaleString()})
삼각형 ${R(S.tris)} · 드로우 콜 ${S.calls} (청크당 1)
청크 ${z*z}개 중 시야 밖 ${S.culled}${C?" → 생략":" (그래도 그림)"}
`;f&&(B+=`LOD0 ${S.lodN[0]} · LOD1 ${S.lodN[1]} · LOD2 ${S.lodN[2]} 청크
`),B+=`오버드로 평균 ${n.res.avg.toFixed(2)}층 · 최대 ${n.res.max}층`,t.hud(B)},dispose(){s(),n.dispose(),x.dispose(),r==null||r.tex.dispose(),v==null||v.dispose(),o||t.shared.delete("grassStats")}}})}function Ht(t){return Tt(t,()=>({draw(o,e,c){o.fillStyle=Ot,o.fillRect(0,0,e,c);const a=t.shared.get("grassStats");if(!a){O(o,'"GPU 블레이드 메시" 뷰어가 화면에 보일 때 갱신됩니다',12,24,$,11);return}const l=58,i=c-34,w=14,x=(e-w*2)/k,r=Math.max(1,...a.ringWithout),v=a.instWithout?Math.round((1-a.instWith/a.instWithout)*100):0;O(o,`시야 안 블레이드  ${a.instWithout.toLocaleString()} → ${a.instWith.toLocaleString()}  (−${v}%)`,12,18,"#e6ebf2",12,"left","bold"),O(o,`삼각형  ${R(a.trisWithout)} → ${R(a.trisWith)}   (LOD 없음 → LOD)`,12,36,$,11),o.fillStyle="#5b6474",o.fillRect(e-170,44,9,9),O(o,"LOD 없음",e-157,52,$,10),o.fillStyle="#4ade80",o.fillRect(e-95,44,9,9),O(o,"LOD 적용",e-82,52,$,10);for(let n=0;n<k;n++){const g=w+n*x,y=(i-l)*a.ringWithout[n]/r,s=(i-l)*a.ringWith[n]/r,d=x*.36;o.fillStyle="#5b6474",o.fillRect(g+x*.1,i-y,d,y),o.fillStyle="#4ade80",o.fillRect(g+x*.1+d+2,i-s,d,s),a.ringWithout[n]>0&&O(o,R(a.ringWith[n]),g+x*.1+d*1.5+2,i-s-4,"#4ade80",9,"center"),O(o,n===k-1?`${n*G}m+`:`${n*G}–${(n+1)*G}m`,g+x/2,i+14,$,10,"center")}o.strokeStyle="#2a3140",o.beginPath(),o.moveTo(w,i+.5),o.lineTo(e-w,i+.5),o.stroke(),o.font=`10px ${zt}`,O(o,"카메라에서 청크 중심까지 거리 (시야 안 청크만)",e/2,c-6,$,10,"center")}}))}const ee={layout:"compare",intro:"넓은 들판의 풀은 수십만 포기입니다. 예전 방식은 풀 몇 가닥이 그려진 반투명 텍스처 판(<b>알파 카드</b>)을 엇갈려 꽂는 것이었지만, 위에서 보면 납작하고 투명한 부분까지 픽셀 셰이더가 돌아 <b>오버드로</b>가 큽니다. 요즘 오픈월드는 풀 한 가닥 한 가닥을 몇 개의 삼각형으로 된 <b>블레이드 메시</b>로 GPU에서 대량 생성하고, 바람·색·굽힘을 정점 셰이더에서 계산하며, <b>청크 컬링</b>과 <b>거리 LOD</b>(먼 곳은 개수를 솎고 블레이드를 넓힘)로 예산을 지킵니다. 카메라를 돌리고 내려다보며 세 뷰어를 비교해 보세요.",how:['필드를 청크(여기서는 7m × 7m, 8×8개)로 나누고 청크마다 블레이드 위치·높이를 인스턴스 버퍼에 담는다. 버퍼 순서를 무작위로 두면 "앞에서 n개만 그리기"가 곧 고른 솎아내기가 된다.',"청크 박스를 카메라 절두체와 비교해 시야 밖 청크는 드로우 자체를 생략(청크 컬링).","카메라와의 거리로 LOD 결정: 가까우면 4마디(삼각형 7개), 중간 2마디(3개), 멀면 1마디(1개). 밀도는 거리에 따라 줄이고, 남은 블레이드는 그만큼 넓혀 땅이 비어 보이지 않게.","정점 셰이더: 블레이드마다 해시로 방향·기울기·색을 정하고, 바람 방향으로 흘러가는 노이즈(돌풍)와 블레이드별 위상의 떨림으로 굽힘. 일정 곡률의 호로 굽혀 길이를 보존.","픽셀 셰이더: 뿌리(어둡게) → 끝(밝게) 색 그라데이션, 둥근 법선으로 원통처럼 음영, 역광일 때 끝부분이 비쳐 보이는 가짜 투과, 반사 하이라이트.","상호작용: 캐릭터가 지나간 자리를 작은 텍스처(밀 방향 + 눌림 세기)에 찍고 매 프레임 서서히 감쇠 → 정점 셰이더가 읽어 풀을 눕혔다가 다시 일으킨다."],pros:["한 가닥씩 실루엣이 살아 있어 위·옆 어느 각도에서도 입체적","투명 텍셀이 없어 오버드로·알파 테스트 비용이 작음","바람·상호작용·색 변화를 블레이드 단위로 제어","LOD·컬링과 결합하면 화면당 블레이드 수를 예산 안에 고정"],cons:["정점 수가 많아 정점 셰이더 비용 증가 (특히 LOD 없이)","먼 곳은 블레이드가 픽셀보다 가늘어져 반짝임 → 넓히기·솎기·지형 색 혼합 필요","그림자·충돌·물리와는 별도 처리","LOD 경계에서 팝핑 주의"],usedIn:'Ghost of Tsushima(GDC 2021 "Procedural Grass in Ghost of Tsushima": GPU에서 블레이드 생성, 바람, 블레이드 수 LOD), 젤다 야숨·원신처럼 풀 들판이 화면의 큰 비중을 차지하는 오픈월드(구체적 구현은 게임마다 다르고 공개 자료가 제한적), Unity·Unreal의 GPU 인스턴싱 기반 풀(UE Grass/Foliage 인스턴싱). 알파 카드는 여전히 덤불·고사리·원거리용으로 널리 쓰임.',controls:[{type:"range",key:"dens",label:"밀도 (포기/m²)",min:4,max:40,step:2,value:20},{type:"range",key:"wind",label:"바람 세기",min:0,max:3,step:.05,value:1},{type:"toggle",key:"lod",label:"LOD 사용",value:!0},{type:"toggle",key:"cull",label:"청크 컬링",value:!0},{type:"toggle",key:"interact",label:"상호작용 (밀어내기)",value:!0},{type:"toggle",key:"lodcol",label:"LOD 색 표시",value:!1},{type:"toggle",key:"over",label:"오버드로 보기",value:!1}],viewers:[{title:"알파 카드 (빌보드 다발)",kind:"before",caption:"풀 그림이 있는 텍스처 판 두 장을 엇갈려 꽂은 카드. 옆에서는 그럴듯하지만 카메라를 내려다보게 돌리면 X자 판이 드러나고, 위를 향한 고정 법선 탓에 음영이 평평하다. 투명 부분도 픽셀 셰이더가 돈 뒤 버려져 오버드로가 크다.",mount:jt},{title:"GPU 블레이드 메시",kind:"after",caption:"풀 한 가닥 = 삼각형 몇 개. 블레이드별 해시로 방향·높이·색, 돌풍 노이즈로 바람, 역광 투과와 하이라이트. 청크 컬링 + 거리 LOD로 제출 블레이드 수를 전체의 일부로 줄인다. 빨간 공은 풀을 그냥 통과한다.",mount:t=>H(t,!1)},{title:"상호작용 · 컬링",kind:"variant",caption:"공이 지나간 자리를 밀어내기 텍스처(오른쪽 아래 미니맵의 흰 자국)에 찍어 풀을 눕히고, 몇 초에 걸쳐 다시 일어선다. 미니맵: 초록·노랑·주황 = LOD0/1/2 청크, 어두운 칸 = 시야 밖이라 생략된 청크, 흰 선 = 카메라 시야.",mount:t=>H(t,!0)},{title:"거리별 블레이드 수 (LOD 유무)",kind:"info",caption:'"GPU 블레이드 메시" 뷰어의 시야 안 청크를 카메라 거리 고리로 묶어, LOD 없이 그릴 블레이드 수(회색)와 LOD 적용 후(초록)를 비교. 멀수록 면적은 넓어지지만 화면에서 차지하는 픽셀은 적으므로 대부분 솎아낸다.',mount:Ht}]};export{ee as default};
