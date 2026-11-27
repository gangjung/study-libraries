import{V as N,am as Ge,W as F,a7 as pe,k as P,ai as Pe,C as he,M as V,c as Re,S as Ue,B as Ae,y as Fe,G as Ve,u as $e,H as Ce,P as Be,g as oe,a as je,h as se,e as He}from"./three.module-CEzfHhrp.js";import{m as Ie}from"./three-viewer-fx7lDL-0.js";import{m as Ee,b as L,a as Le}from"./canvas-viewer-QtaWfmlz.js";import{c as Ne,t as B,l as We}from"./chart2d-DfgeckAJ.js";import{h as ze,P as I,p as de,f as xe}from"./extra-kit-c-FPjCbN4U.js";import{T as ie,u as qe,p as Ke,r as Oe}from"./postfx-kit-a-Cs4wZdGb.js";const $=[-.45,.55,1,1.5,2.2],ye=[[1,.75,.4],[.4,1,.6],[.55,.65,1],[1,.45,.8],[.5,.9,1]],W=new N(-.15,.1,-1).normalize(),we=150,Se=3.2,Ye=6,be=12,Je=`
varying vec3 vDir;
void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Qe=`
uniform vec3 uSunDir;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float h = clamp(d.y, 0.0, 1.0);
  vec3 c = mix(vec3(1.9, 1.25, 0.8), vec3(0.35, 0.6, 1.25), pow(h, 0.5));
  float m = max(dot(d, uSunDir), 0.0);
  c += vec3(1.6, 1.0, 0.5) * pow(m, 40.0) + vec3(0.5, 0.35, 0.2) * pow(m, 6.0);
  gl_FragColor = vec4(c, 1.0);
}`,Xe=`
${ie}
uniform sampler2D tDepth;
uniform vec2 uSun, uR;
void main() {
  float n = 0.0, v = 0.0;
  for (int j = -2; j <= 2; j++)
    for (int i = -2; i <= 2; i++) {
      if (i * i + j * j > 5) continue;
      vec2 uv = uSun + vec2(float(i), float(j)) * 0.5 * uR;
      n += 1.0;
      if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) continue;
      v += texture2D(tDepth, uv).r >= 0.99999 ? 1.0 : 0.0;
    }
  gl_FragColor = vec4(pfxPack(v / n), 0.0, 1.0);
}`,Ze=`
uniform sampler2D tSrc;
uniform vec2 uTexel;
varying vec2 vUv;
vec3 thr(vec2 uv) {
  vec3 c = texture2D(tSrc, uv).rgb;
  float b = max(c.r, max(c.g, c.b));
  return c * max(b - ${Ye.toFixed(1)}, 0.0) / max(b, 1e-4);
}
void main() {
  // 쌍선형 4탭 = 원본 4×4 텍셀 평균 → 작은 해가 1/4 해상도 텍셀 사이를 움직여도 무게중심이 매끄럽다
  vec3 s = thr(vUv + vec2(-1.0, -1.0) * uTexel) + thr(vUv + vec2(1.0, -1.0) * uTexel) + thr(vUv + vec2(-1.0, 1.0) * uTexel) + thr(vUv + vec2(1.0, 1.0) * uTexel);
  gl_FragColor = vec4(s * 0.25, 1.0);
}`,et=`
uniform sampler2D tSrc;
uniform vec2 uStep;
uniform float uDecay;
uniform int uMode;
varying vec2 vUv;
void main() {
  vec3 s = vec3(0.0);
  float ws = 0.0;
  for (int k = -16; k <= 16; k++) {
    float fk = float(k);
    float w = uMode == 0 ? exp(-0.5 * fk * fk / 4.0) : exp(-abs(fk) * uDecay);
    if (uMode == 0 && abs(k) > 5) continue;
    s += texture2D(tSrc, vUv + uStep * fk).rgb * w;
    ws += w;
  }
  gl_FragColor = vec4(uMode == 0 ? s / ws : s / ws * 6.0, 1.0);
}`,ge=`const float GK[5] = float[5](${$.map(t=>t.toFixed(3)).join(", ")});
const vec3 GT[5] = vec3[5](${ye.map(t=>`vec3(${t.map(e=>e.toFixed(2)).join(", ")})`).join(", ")});`,tt=`
${ie}
uniform sampler2D tBright;
uniform float uAspect;
uniform int uMeas; // 0: 보통, 1: 고스트 0~3을 RGBA 채널에 따로, 2: 고스트 4를 R에
varying vec2 vUv;
${ge}
void main() {
  vec2 c = vec2(0.5);
  vec3 col = vec3(0.0);
  vec4 sep = vec4(0.0);
  for (int i = 0; i < 5; i++) {
    vec2 s = c - (vUv - c) / GK[i];
    if (s.x < 0.0 || s.x > 1.0 || s.y < 0.0 || s.y > 1.0) continue;
    float fade = 1.0 - smoothstep(0.35, 0.75, length((s - c) * vec2(uAspect, 1.0)));
    vec3 g = texture2D(tBright, s).rgb * GT[i] * fade * 1.4;
    col += g;
    float l = min(pfxLum(g) * 0.1, 1.0);
    if (uMeas == 1 && i < 4) sep[i] = l;
    if (uMeas == 2 && i == 4) sep.r = l;
  }
  if (uMeas > 0) { gl_FragColor = sep; return; }
  // 헤일로: 화면 중심 기준으로 뒤집은 좌표에서 중심 쪽으로 일정 거리 떨어진 곳을 읽는다
  vec2 f = 1.0 - vUv;
  vec2 hv = normalize((c - f) * vec2(uAspect, 1.0) + 1e-5) / vec2(uAspect, 1.0) * 0.32;
  vec2 hs = f + hv;
  if (hs.x > 0.0 && hs.x < 1.0 && hs.y > 0.0 && hs.y < 1.0) {
    float hw = 1.0 - smoothstep(0.0, 0.5, length((hs - c) * vec2(uAspect, 1.0)));
    col += texture2D(tBright, hs).rgb * vec3(0.7, 0.85, 1.0) * hw * 0.25;
  }
  gl_FragColor = vec4(col, 1.0);
}`,ot=`
${ie}
uniform sampler2D tScene, tGhost, tStreak, tVis;
uniform int uMode;
uniform vec2 uSun;
uniform float uAspect, uStr, uExpo, uSunR;
varying vec2 vUv;
${ge}
float hexd(vec2 d) { vec2 q = abs(d); return max(q.x * 0.866 + q.y * 0.5, q.y); }
void main() {
  vec3 col = texture2D(tScene, vUv).rgb;
  vec2 c = vec2(0.5);
  if (uMode == 1) {
    vec4 vv = texelFetch(tVis, ivec2(0), 0);
    float V = vv.r + vv.g / 255.0;
    vec3 fl = vec3(0.0);
    for (int i = 0; i < 5; i++) {
      vec2 p = c + GK[i] * (c - uSun);
      float r = 0.025 + 0.022 * abs(GK[i]);
      float d = hexd((vUv - p) * vec2(uAspect, 1.0));
      float disc = 1.0 - smoothstep(r * 0.82, r, d);
      float rim = exp(-pow((d - r * 0.9) / (r * 0.08), 2.0));
      fl += GT[i] * (disc * 0.35 + rim * 0.25);
    }
    vec2 ds = (vUv - uSun) * vec2(uAspect, 1.0);
    float ls = length(ds);
    // 헤일로(무지개 테), 가로 줄무늬(아나모픽), 빛살, 해 주변 번짐
    vec3 rainbow = 0.5 + 0.5 * cos(6.2832 * (ls * 3.0 + vec3(0.0, 0.33, 0.67)));
    fl += rainbow * exp(-pow((ls - 0.3) / 0.018, 2.0)) * 0.25;
    fl += vec3(0.45, 0.7, 1.3) * exp(-abs(ds.y) * 260.0) * exp(-abs(ds.x) * 2.2) * 2.2;
    float ang = atan(ds.y, ds.x);
    fl += vec3(1.0, 0.85, 0.6) * pow(abs(cos(ang * 6.0)), 40.0) * exp(-ls * 9.0) * 1.5;
    fl += vec3(1.0, 0.8, 0.55) * exp(-ls * 14.0) * 2.0;
    col += fl * V * uStr;
  } else if (uMode == 2) {
    col += (texture2D(tGhost, vUv).rgb + texture2D(tStreak, vUv).rgb * vec3(0.45, 0.7, 1.3)) * uStr;
  }
  gl_FragColor = vec4(pfxTone(col * uExpo, 3), 1.0);
  #include <colorspace_fragment>
}`;function st(t){t.background=new he(0);const e=new V(new Re(180,24,12),new Ue({vertexShader:Je,fragmentShader:Qe,uniforms:{uSunDir:{value:W}},side:Ae,depthWrite:!1}));e.renderOrder=-2,t.add(e);const m=new V(new Fe(Se,32),new Ve({color:new he(1,.85,.6).multiplyScalar(40),depthWrite:!1}));m.position.copy(W).multiplyScalar(we),m.lookAt(0,0,0),m.renderOrder=-1,t.add(m);const u=new $e(16767400,3.5);u.position.copy(W).multiplyScalar(40),t.add(u),t.add(new Ce(10139880,5916208,.9));const o=new V(new Be(200,200),new oe({color:12033140,roughness:1}));o.rotation.x=-Math.PI/2,t.add(o);const h=new oe({color:14208440,roughness:.85}),n=[];for(let y=-5;y<=5;y++){const a=new V(new je(.32,.38,6,14),h);a.position.set(y*3.4-1.5,3,-7),t.add(a),n.push(a);const w=new V(new se(1,.3,1),h);w.position.set(a.position.x,6.15,-7),t.add(w),n.push(w)}const f=new V(new se(38,.6,1.2),h);f.position.set(-1.5,6.6,-7),t.add(f),n.push(f);const c=Le(5),s=new oe({color:4877107,roughness:1,flatShading:!0});for(let y=0;y<18;y++){const a=new V(new He(1+c(),4+c()*3,7),s);a.position.set(-30+c()*60,2.2,-25-c()*30),t.add(a),n.push(a)}const k=new V(new se(2.4,3.2,2.4),h);return k.position.set(4,1.6,0),t.add(k),n.push(k),{occluders:n,sunPos:m.position.clone()}}const ae=[];for(let t=-2;t<=2;t++)for(let e=-2;e<=2;e++)e*e+t*t<=5&&ae.push([e*.5,t*.5]);function me(t,e,m,u){let o=0,h=0,n=0;for(let f=0;f<m;f++)for(let c=0;c<e;c++){const s=t[(f*e+c)*4+u];s<2||(o+=(c+.5)*s,h+=(f+.5)*s,n+=s)}return n>255?{x:o/n/e,y:h/n/m}:null}function ne(t){return e=>Ie(e,{antialias:!1,orbit:!1,fov:55,cam:[0,1.7,8],far:400},({scene:m,camera:u,renderer:o})=>{const{occluders:h,sunPos:n}=st(m),f=ze(o),c=new Ge(1,1),s=new F(1,1,{type:f,depthTexture:c}),k=new F(1,1,{depthBuffer:!1,minFilter:pe,magFilter:pe}),y=new F(1,1,{type:f,depthBuffer:!1}),a=new F(1,1,{type:f,depthBuffer:!1}),w=new F(1,1,{type:f,depthBuffer:!1}),i=new F(1,1,{type:f,depthBuffer:!1}),r=new F(1,1,{type:f,depthBuffer:!1}),S=new F(1,1,{depthBuffer:!1}),b=new I(Xe,{tDepth:{value:c},uSun:{value:new P},uR:{value:new P}}),v=new I(Ze,{tSrc:{value:s.texture},uTexel:{value:new P}}),l=new I(et,{tSrc:{value:null},uStep:{value:new P},uDecay:{value:.12},uMode:{value:0}}),D=new I(tt,{tBright:{value:w.texture},uAspect:{value:1},uMeas:{value:0}}),R=new I(ot,{tScene:{value:s.texture},tGhost:{value:i.texture},tStreak:{value:r.texture},tVis:{value:k.texture},uMode:{value:t==="off"?0:t==="sprite"?1:2},uSun:{value:new P},uAspect:{value:1},uStr:{value:1},uExpo:{value:1},uSunR:{value:.01}});let g=1,_=1,z=1,q=0,K=0;const O=new Uint8Array(4);let Y=new Uint8Array(4),J=new Uint8Array(4);const Q=new Pe,ce=new P,T=new P,E=new P,U=new N;let j=NaN,X=NaN;const d={sun:new P,gsun:new P,ghosts:$.map(()=>null),visHist:[],aspect:1};e.shared.set(`lf-${t}`,d);const Me=()=>{let p=0;for(const[G,A]of ae){const M=T.x+G*E.x,x=T.y+A*E.y;if(M<0||M>1||x<0||x>1)continue;const C=(Math.min(s.width-1,Math.floor(M*s.width))+.5)/s.width,Z=(Math.min(s.height-1,Math.floor(x*s.height))+.5)/s.height;ce.set(C*2-1,Z*2-1),Q.setFromCamera(ce,u),Q.far=we,Q.intersectObjects(h,!1).length===0&&p++}return p/ae.length};return{resize(p,G,A){const{W:M,H:x}=Oe(p,G,A,1.25);s.setSize(M,x),v.u.uTexel.value.set(1/M,1/x),g=Math.max(1,M>>2),_=Math.max(1,x>>2);for(const C of[y,a,w,i,r,S])C.setSize(g,_);Y=new Uint8Array(g*_*4),J=new Uint8Array(g*_*4),R.u.uAspect.value=p/Math.max(1,G),D.u.uAspect.value=p/Math.max(1,G),d.aspect=p/Math.max(1,G),z=p},update(p,G,A){const M=Ke(e,"lfClock",A).t;K=M;const x=e.params,C=Math.sin(M*.22)*3.2;u.position.set(C,1.7,8);const Z=Math.sin(M*.13+1)*.42;U.copy(W).applyAxisAngle(new N(0,1,0),Z),u.lookAt(C+U.x*10,1.7+1.1,8+U.z*10),u.updateMatrixWorld(),U.copy(n).project(u),T.set(U.x*.5+.5,U.y*.5+.5);const ke=new N().setFromMatrixColumn(u.matrixWorld,0);U.copy(n).addScaledVector(ke,Se).project(u);const re=Math.abs(U.x*.5+.5-T.x);E.set(re,re*d.aspect),b.u.uSun.value.copy(T),b.u.uR.value.copy(E),R.u.uSun.value.copy(T),R.u.uStr.value=x.num("str",1),R.u.uExpo.value=Math.pow(2,x.num("ev",0)),l.u.uDecay.value=.08/Math.max(.2,x.num("streak",1)),d.sun.copy(T);const le="p_i = c + k_i(c − s), k = "+$.join(", ");if(t==="off")e.hud(`플레어 없음
해 화면 위치 s = (${T.x.toFixed(2)}, ${T.y.toFixed(2)})
${le}`);else if(t==="sprite")e.hud(["스프라이트 플레어 × 가시율 V",`V 측정(깊이 21표본) ${de(j)} / 이론(광선 21개) ${de(X)}`,`${le}`].join(`
`));else{const ue=[];let ve=0,H=0;$.forEach((ee,Te)=>{const te=d.ghosts[Te];if(!te)return;const De=.5+ee*(.5-d.gsun.x),_e=.5+ee*(.5-d.gsun.y),fe=Math.hypot((te.x-De)*z,(te.y-_e)*(z/d.aspect));ve+=fe,H++,ue.push(`k${ee}:${xe(fe)}`)}),e.hud(["이미지 기반: s_i(p) = c − (p − c)/k_i 에서 밝은 부분을 읽음",`고스트 ${H}/${$.length}개 측정 · 무게중심 vs 식 평균 오차 ${H?xe(ve/H):"--"}px`,H?ue.join(" "):"(해가 다 보일 때만 측정)"].join(`
`))}},render(){if(o.setRenderTarget(s),o.render(m,u),(t==="sprite"||q%6===0)&&b.render(o,k),t==="image"&&(v.render(o,y),l.u.uMode.value=0,l.u.tSrc.value=y.texture,l.u.uStep.value.set(1/g,0),l.render(o,a),l.u.uMode.value=1,l.u.tSrc.value=a.texture,l.u.uStep.value.set(3/g,0),l.render(o,r),l.u.uMode.value=0,l.u.tSrc.value=a.texture,l.u.uStep.value.set(0,1/_),l.render(o,w),D.render(o,i)),q%6===0&&t!=="off"){for(o.readRenderTargetPixels(k,0,0,1,1,O),j=qe(O[0],O[1]),X=Me(),d.visHist.push({t:K,gpu:j,ray:X});d.visHist.length&&d.visHist[0].t<K-be;)d.visHist.shift();t==="image"&&(d.gsun.copy(T),j>.99&&(D.u.uMeas.value=1,D.render(o,S),o.readRenderTargetPixels(S,0,0,g,_,Y),D.u.uMeas.value=2,D.render(o,S),o.readRenderTargetPixels(S,0,0,g,_,J),D.u.uMeas.value=0),d.ghosts=$.map((p,G)=>{const A=.5+p*(.5-T.x),M=.5+p*(.5-T.y),x=.04+.02*Math.abs(p);return j<=.99||A<x||A>1-x||M<x*d.aspect||M>1-x*d.aspect?null:G<4?me(Y,g,_,G):me(J,g,_,0)}))}q++,R.render(o,null)},dispose(){for(const p of[s,k,y,a,w,i,r,S])p.dispose();c.dispose();for(const p of[b,v,l,D,R])p.dispose()}}})}function nt(t){return Ee(t,()=>({draw(e,m,u){Ne(e,m,u);const o=t.shared.get("lf-image"),h=t.shared.get("lf-sprite"),n={x:10,y:20,w:L(m-20,20),h:L(u*.55-24,20)},f=(o==null?void 0:o.aspect)??1.6;let c=n.w,s=c/f;s>n.h&&(s=n.h,c=s*f);const k=n.x+(n.w-c)/2,y=n.y,a=r=>k+r*c,w=r=>y+(1-r)*s;if(e.strokeStyle="#334155",e.strokeRect(k+.5,y+.5,c,s),B(e,"이미지 방식 화면 도식: ○ 식 p_i,  ● GPU 고스트 무게중심",6,13,"#c8d0dc",10),o){const r=o.gsun;e.strokeStyle="#475569",e.setLineDash([3,3]),e.beginPath();const S=b=>[a(.5+b*(.5-r.x)),w(.5+b*(.5-r.y))];e.moveTo(...S(-1.2)),e.lineTo(...S(2.6)),e.stroke(),e.setLineDash([]),e.save(),e.beginPath(),e.rect(k,y,c,s),e.clip(),e.fillStyle="#facc15",e.beginPath(),e.arc(a(r.x),w(r.y),6,0,Math.PI*2),e.fill(),e.fillStyle="#e5e7eb",e.beginPath(),e.arc(a(.5),w(.5),2.5,0,Math.PI*2),e.fill(),$.forEach((b,v)=>{const l=`rgb(${ye[v].map(_=>Math.round(80+_*175)).join(",")})`,[D,R]=S(b);e.strokeStyle=l,e.lineWidth=1.5,e.beginPath(),e.arc(D,R,7,0,Math.PI*2),e.stroke(),e.lineWidth=1;const g=o.ghosts[v];g&&(e.fillStyle=l,e.beginPath(),e.arc(a(g.x),w(g.y),3,0,Math.PI*2),e.fill()),B(e,`k=${b}`,D-8,R+(v%2?18:-10),l,9)}),e.restore(),B(e,"s",a(r.x)+8,w(r.y)-6,"#facc15",10),B(e,"c",a(.5)+5,w(.5)-4,"#e5e7eb",10)}const i={x:40,y:u*.55+14,w:L(m-52,20),h:L(u*.45-36,10)};e.strokeStyle="#1c2230",e.strokeRect(i.x+.5,i.y+.5,i.w,i.h),B(e,"가시율 V",4,i.y+10,"#c8d0dc",9);for(const r of[0,.5,1])B(e,r.toFixed(1),i.x-4,i.y+i.h-r*i.h+3,"#7d8799",9,"right");if(h&&h.visHist.length>1){const r=h.visHist[h.visHist.length-1].t,S=v=>i.x+i.w-(r-v)/be*i.w,b=v=>i.y+i.h-v*i.h;e.strokeStyle="#5b9cff",e.lineWidth=1.8,e.beginPath(),h.visHist.forEach((v,l)=>l?e.lineTo(S(v.t),b(v.ray)):e.moveTo(S(v.t),b(v.ray))),e.stroke(),e.lineWidth=1,e.fillStyle="#ff9a3c";for(const v of h.visHist)e.beginPath(),e.arc(S(v.t),b(v.gpu),2.2,0,Math.PI*2),e.fill()}We(e,[{label:"광선 판정(이론)",color:"#5b9cff"},{label:"깊이 21표본(GPU)",color:"#ff9a3c"}],i.x,u-3,9),t.hud("")}}))}const vt={layout:"variants",intro:'<b>렌즈 플레어</b>는 강한 빛이 카메라 렌즈 안의 여러 유리면 사이에서 반사되며 생기는 고스트·헤일로·줄무늬입니다. 렌즈는 광축(화면 중심)에 대해 대칭이므로 고스트는 <b>해와 화면 중심을 잇는 직선 위</b>에 늘어서고, 해가 움직이면 반대쪽에서 거울처럼 따라 움직입니다. "카메라로 찍고 있다"는 감각과 태양의 눈부심을 동시에 전합니다. 세 뷰어는 기둥 회랑 너머의 낮은 해를 <b>플레어 없음 / 스프라이트 방식(가림 판정) / 이미지 기반 방식</b>으로 보여 줍니다. 기둥이 해를 가리면 플레어가 사라지는 것을 보세요.',how:["고스트 위치: 해의 화면 좌표 s, 화면 중심 c에 대해 <code>p_i = c + k_i (c − s)</code>. k가 양수면 중심 반대편, 음수면 해와 같은 편. 해가 중심에 오면 모든 고스트가 중심에 겹친다.","<b>스프라이트 방식</b>: 위 식의 위치에 육각(조리개 모양) 원판, 해 둘레 무지개 헤일로, 가로로 긴 아나모픽 줄무늬, 빛살을 셰이더로 직접 그린다. 싸고 아트 조절이 쉽다.",'가림 판정: 해 원판 안 21점에서 깊이 텍스처를 읽어 "하늘(깊이 = 1)"인 비율 V를 1×1 타깃에 쓰고, 플레어 전체에 V를 곱한다. 기둥이 해를 반쯤 가리면 플레어도 반쯤 흐려진다.',"<b>이미지 기반 방식</b>: 임계값(HDR 6) 넘는 부분만 1/4 해상도로 뽑고 살짝 흐린 뒤, 픽셀 p마다 <code>s_i(p) = c − (p − c)/k_i</code>에서 읽어 더한다. 밝은 점이 어디 있든 저절로 p_i에 고스트가 생기고, 가림도 자동으로 반영된다(가려진 해는 애초에 밝지 않다).","아나모픽 줄무늬: 밝은 이미지를 가로로만 33탭 지수 감쇠 블러. 영화의 아나모픽 렌즈가 만드는 푸른 가로선을 흉내 낸다.","측정: ① GPU 가시율(깊이 21표본) vs CPU 광선 21개(기둥·나무와 교차 판정). 광선은 GPU가 읽는 깊이 텍셀의 중심으로 쏴서 래스터화 규칙(픽셀 중심 판정)과 맞춘다. ② 이미지 방식 고스트 패스를 고스트마다 다른 색 채널에 따로 그려 읽고(겹쳐도 분리된다), 채널별 무게중심과 식 p_i의 거리(px)를 잰다. 해가 다 보이고 고스트가 화면 안에 다 들어올 때만 잰다. 밝은 부분 추출은 원본 4×4 평균(쌍선형 4탭)이라 해가 텍셀 사이를 움직여도 무게중심이 매끄럽다. 남는 오차는 1/4 해상도 양자화로 k에 비례한다."],pros:['태양·조명이 "카메라에 직접 들어왔다"는 강한 시각 신호 – 눈부심, 영화적 분위기, 시선 유도에 좋다.',"스프라이트 방식은 아주 싸고 모양·색을 아트가 완전히 통제한다. 가림 판정만 붙이면 기둥 사이로 해가 깜빡이는 연출이 된다.","이미지 기반 방식은 광원 수와 무관하게 폭발·헤드라이트·네온 모두에 자동으로 플레어가 생긴다."],cons:['"카메라가 있다"는 걸 전제하므로, 1인칭 "눈" 시점이나 판타지 세계관에선 몰입을 깨기도 한다. 과하면 화면을 가린다(〈스타 트렉〉 2009의 논쟁).',"스프라이트 방식은 가림을 따로 판정해야 하고, 깊이 표본 수가 적으면 경계에서 깜빡인다(그래서 보통 몇 프레임에 걸쳐 V를 부드럽게 보간).","이미지 기반 방식은 해상도·임계값에 민감해 밝은 흰 벽에도 고스트가 생길 수 있고, 화면 밖 광원은 플레어를 만들지 못한다."],usedIn:"영화 〈스타 트렉〉(2009) 등 J.J. 에이브럼스 영화의 아나모픽 플레어, 강한 태양 플레어로 유명한 〈배틀필드 3〉, 역광을 자주 연출하는 레이싱 게임, 언리얼 엔진의 이미지 기반 Lens Flare 후처리.",tips:["가시율 V는 그대로 쓰지 말고 0.1~0.2초 시상수로 부드럽게 따라가게 한다. 깊이 표본이 적을 때 기둥 경계에서 생기는 깜빡임이 사라진다.","고스트는 4~8개, k를 등간격이 아니게(예: −0.45, 0.55, 1.0, 1.5, 2.2) 흩고 크기·색을 다르게 주면 실제 렌즈처럼 보인다. 화면 가장자리로 갈수록 서서히 줄여 잘린 모양이 드러나지 않게 한다.",'렌즈 먼지(더트) 텍스처를 플레어·블룸에 곱하면 "카메라 렌즈" 느낌이 크게 산다. 대신 1인칭 "눈" 시점이면 빼는 편이 낫다.',"이미지 기반 방식은 블룸용 축소 이미지를 재활용하면 거의 공짜다. 흰 벽에 고스트가 생기면 추출 임계값을 해·조명 값 근처(이 페이지는 HDR 6)로 올린다."],related:["bloom","god-rays","film-look","eye-adaptation","letterbox"],controls:[{type:"range",key:"str",label:"플레어 세기 (배)",min:0,max:2.5,step:.05,value:1},{type:"range",key:"streak",label:"줄무늬 길이 (배, 이미지 방식)",min:.3,max:3,step:.05,value:1},{type:"range",key:"ev",label:"노출 EV (2^EV배)",min:-2,max:2,step:.1,value:0}],viewers:[{title:"플레어 없음",kind:"before",caption:"해는 밝게 빛나지만 그저 하늘의 흰 점입니다. 기둥 사이로 지나가도 화면에는 변화가 거의 없습니다.",mount:ne("off")},{title:"스프라이트 플레어 + 가림 판정",kind:"variant",caption:"해와 중심을 잇는 선 위에 육각 고스트가 늘어서고, 헤일로와 푸른 가로 줄무늬가 붙습니다. 기둥이 해를 가리면 깊이 표본 비율만큼 사라집니다.",mount:ne("sprite")},{title:"이미지 기반 플레어",kind:"after",caption:"밝은 부분을 화면 중심에 대해 뒤집고 늘려 읽어 고스트를 만듭니다. 해가 반쯤 가려지면 고스트 모양도 함께 잘립니다.",mount:ne("image")},{title:"고스트 위치 · 가시율",kind:"info",caption:"위: 식 p_i = c + k_i(c − s)의 위치(○)와 GPU 고스트 무게중심(●). 아래: 깊이 표본 가시율(주황)과 CPU 광선 판정(파랑).",mount:nt}]};export{vt as default};
