import{V as $,am as ke,an as Se,W,L as ue,j as Q,k as Ce,C as Le,h as U,R as Fe,D as ce,aa as ie,y as pe,a as Ge,b as fe,c as ve,M as De}from"./three.module-CEzfHhrp.js";import{m as Ue}from"./three-viewer-fx7lDL-0.js";import{m as Ie,b as Z,s as Re}from"./canvas-viewer-QtaWfmlz.js";import{c as Ae,t as A,l as _e}from"./chart2d-DfgeckAJ.js";import{h as ze,P as me,a as V,f as Ve}from"./extra-kit-c-FPjCbN4U.js";import{S as $e,m as Ne,P as he,b as Be,a as Ee,u as q}from"./light-kit-a-xvZjz87Q.js";const g=new $(0,7.5,-1),w=4,ae=3.93,ne=.9,de=.84,xe=.13,ye=1,se=3,ge=2,be=40,ee=[[.5,.72],[.5,.48],[.46,.26]],re=1,je=`
uniform sampler2D tDepth, tHist;
uniform mat4 uInvVP, uPrevVP;
uniform vec3 uCamPos;
uniform float uSig, uK, uG, uSteps, uJit, uFrame, uBlend, uProbe;
uniform vec2 uPUV[3];
varying vec2 vUv;
${he}
${Be}
vec3 worldAt(vec2 uv) {
  float d = texture2D(tDepth, uv).r;
  vec4 p = uInvVP * vec4(uv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  return p.xyz / p.w;
}
float hg(float c) { float g2 = uG * uG; return (1.0 - g2) / (12.566371 * pow(max(1.0 + g2 - 2.0 * uG * c, 1e-4), 1.5)); }
// rgb = 내산란, a = 투과율
vec4 march(vec3 ro, vec3 p, float jit) {
  vec3 rd = p - ro;
  float len = length(rd);
  rd /= max(len, 1e-4);
  float dt = len / uSteps;
  float T = 1.0;
  vec3 L = vec3(0.0);
  for (int i = 0; i < 48; i++) {
    if (float(i) >= uSteps) break;
    vec3 x = ro + rd * ((float(i) + jit) * dt);
    float sig = uSig * exp(-uK * x.y);
    vec3 lv = x - uSpPos;
    float d2 = max(dot(lv, lv), 1e-3);
    vec3 wi = lv * inversesqrt(d2);
    float c = spCone(dot(wi, uSpDir));
    if (c > 0.0) {
      float sh = spShadowTap(x, 0.04, 1);
      L += T * sig * hg(dot(wi, -rd)) * c * sh * uSpI / d2 * dt * uSpCol;
    }
    T *= exp(-sig * dt);
  }
  return vec4(L, T);
}
void main() {
  if (uProbe > 0.5) {
    int i = int(floor(vUv.x * 8.0));
    int k = i / 2;
    vec2 uv = k == 0 ? uPUV[0] : (k == 1 ? uPUV[1] : uPUV[2]);
    vec3 p = worldAt(uv);
    if (i - k * 2 == 1 || i >= 6) { gl_FragColor = vec4(lkPack(length(p - uCamPos) / ${be.toFixed(1)}), 0.0, 1.0); return; }
    // 판독: 지터 8위상 평균 (= 시간 누적이 수렴하는 값). 지터 끔이면 중점 하나.
    vec4 r = vec4(0.0);
    if (uJit > 0.5) {
      float j0 = fract(lkHash(vec2(float(k) * 7.1, 3.3)) + uFrame * 0.618034);
      for (int m = 0; m < 8; m++) r += march(uCamPos, p, fract(j0 + float(m) * 0.125));
      r *= 0.125;
    } else r = march(uCamPos, p, 0.5);
    gl_FragColor = vec4(lkPack(dot(r.rgb, vec3(0.2126, 0.7152, 0.0722)) / ${ge.toFixed(1)}), lkPack(r.a));
    return;
  }
  vec3 p = worldAt(vUv);
  float jit = uJit > 0.5 ? fract(lkHash(gl_FragCoord.xy) + uFrame * 0.618034) : 0.5;
  vec4 cur = march(uCamPos, p, jit);
  vec4 pc = uPrevVP * vec4(p, 1.0);
  vec2 puv = pc.xy / pc.w * 0.5 + 0.5;
  float ok = step(0.0, puv.x) * step(puv.x, 1.0) * step(0.0, puv.y) * step(puv.y, 1.0);
  vec4 hist = texture2D(tHist, puv);
  gl_FragColor = mix(cur, hist, uBlend * ok);
}`,He=`
uniform sampler2D tScene, tDepth, tFog;
uniform mat4 uInvVP;
uniform vec3 uCamPos;
uniform float uMode, uSig, uK, uExpo;
uniform vec3 uFogCol;
varying vec2 vUv;
${he}
float tau(vec3 o, vec3 p) {
  vec3 r = p - o;
  float s = length(r);
  float ry = r.y / max(s, 1e-4);
  float a = uK * ry;
  float base = uSig * exp(-uK * o.y);
  return abs(a) < 1e-4 ? base * s : base * (1.0 - exp(-a * s)) / a;
}
void main() {
  vec3 c = texture2D(tScene, vUv).rgb;
  if (uMode > 0.5) {
    float d = texture2D(tDepth, vUv).r;
    vec4 p = uInvVP * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
    float T = exp(-tau(uCamPos, p.xyz / p.w));
    if (uMode < 1.5) c = mix(uFogCol, c, T);
    else c = c * T + texture2D(tFog, vUv).rgb;
  }
  gl_FragColor = vec4(lkAces(c * uExpo), 1.0);
  #include <colorspace_fragment>
}`,Ke=(s,e)=>Re(s.shared,"vfClock",e,()=>({t:0,fan:0}),(o,r)=>{o.t+=r,o.fan+=r*s.params.num("fan",.6)});function We(s,e){const o=(v,d,x,C,N,y=s)=>{const L=new De(v,d);return L.position.set(x,C,N),y.add(L),L},r=e.get(7301731,1,.03);o(new U(11,.2,13),e.get(8024168,4,.2),0,-.1,0),o(new U(.2,w,13),r,-5.5,w/2,0),o(new U(.2,w,13),r,5.5,w/2,0),o(new U(11,w,.2),r,0,w/2,-6.5),o(new U(11,w,.2),r,0,w/2,6.5);const u=new Fe(ne,9,96,1);u.rotateX(Math.PI/2);const t=e.get(5920080,1,.02);t.side=ce,o(u,t,g.x,w,g.z);const a=new ie;a.position.set(g.x,ae,g.z);const f=e.get(3816512,0,.5);f.side=ce;for(let v=0;v<se;v++){const d=new pe(de,16,v*2*Math.PI/se,ye);d.rotateX(-Math.PI/2),o(d,f,0,0,0,a)}const P=new pe(xe,24);P.rotateX(-Math.PI/2),o(P,f,0,0,0,a),s.add(a);const c=e.get(8217152,3,.1);o(new U(1,1,1),c,-3.2,.5,-3.5),o(new U(.8,.8,.8),c,-2.3,.4,-4.4),o(new U(.7,.7,.7),c,-3.1,1.35,-3.6),o(new Ge(.25,.25,w,18),e.get(8419952,1,.05),3.2,w/2,-3.2);const p=e.get(7158587,0,.1),S=e.get(13805186,0,.3),b=new ie;return o(new fe(.22,.7,6,14),p,0,.95,0,b),o(new ve(.16,20,14),S,0,1.62,0,b),o(new fe(.09,.55,4,8),e.get(2894900,0,.1),0,.38,0,b),b.position.set(1.55,0,-.7),b.rotation.y=-.8,s.add(b),o(new U(6,.2,6),e.get(2762790,1,0),g.x,8.2,g.z).layers.set(re),o(new ve(.12,16,10),e.get(0,0,0,16773584),g.x,g.y+.05,g.z).layers.set(re),{fan:a}}function Oe(s,e){const o=g;if(s.y>=ae)return 1;const r=c=>{const p=(c-s.y)/(o.y-s.y);return[s.x+(o.x-s.x)*p-o.x,s.z+(o.z-s.z)*p-o.z]},[u,t]=r(w);if(u*u+t*t>ne*ne)return 0;const[a,f]=r(ae),P=Math.hypot(a,f);if(P<xe)return 0;if(P<de){const c=Math.atan2(-f,a)-e,p=2*Math.PI/se;if((c%p+p)%p<ye)return 0}return 1}const te=1500;function oe(s){return e=>Ue(e,{antialias:!1,orbit:!1,fov:55,near:.1,far:40,cam:[.5,1.7,5.5],background:0},({scene:o,camera:r,renderer:u})=>{r.layers.enable(re);const t=new $e(1024,.5,14),a=Ne();a.uTone.value=0,a.uAmbTop.value.setRGB(.08,.088,.11),a.uAmbBot.value.setRGB(.05,.044,.038),t.u.uSpCol.value.setRGB(1,.9,.74);const f=Ee(t,a),{fan:P}=We(o,f),c=ze(u),p=new ke(4,4);p.type=Se;const S=new W(4,4,{type:c,depthTexture:p}),b={type:c,minFilter:ue,magFilter:ue,depthBuffer:!1};let h=new W(4,4,b),n=new W(4,4,b);const v=new W(8,1,{depthBuffer:!1}),d=new Uint8Array(8*4),x=new Q,C=new Q,N=new Q,y=new me(je,{...t.u,tDepth:{value:p},tHist:{value:n.texture},uInvVP:{value:x},uPrevVP:{value:C},uCamPos:{value:r.position},uSig:{value:.12},uK:{value:.15},uG:{value:.5},uSteps:{value:32},uJit:{value:1},uFrame:{value:0},uBlend:{value:.85},uProbe:{value:0},uPUV:{value:ee.map(([m,F])=>new Ce(m,F))}}),L=new me(He,{tScene:{value:S.texture},tDepth:{value:p},tFog:{value:h.texture},uInvVP:{value:x},uCamPos:{value:r.position},uMode:{value:s==="none"?0:s==="uniform"?1:2},uSig:{value:.12},uK:{value:.15},uExpo:{value:1.25},uFogCol:{value:new Le(.05,.055,.07)}}),B={ok:!1,probes:ee.map(()=>({lMe:NaN,tMe:NaN,lTh:NaN,tTh:NaN,s:NaN,curveL:new Float32Array(64),curveT:new Float32Array(64)}))};s==="ray"&&e.shared.set("vf-ray",B);let O=0,H=!0,J=0;const X=new $,Y=new $,K=new $,E=new $,we=(m,F,R,M,l)=>{const i=t.I,_=l*l,G=F/te;let T=1,I=0;for(let k=0;k<te;k++){K.copy(X).addScaledVector(Y,(k+.5)*G);const D=R*Math.exp(-M*K.y);E.copy(K).sub(t.pos);const z=Math.max(E.lengthSq(),.001);E.multiplyScalar(1/Math.sqrt(z));const j=t.cone(E.dot(t.dir));if(j>0){const Me=-E.dot(Y),Te=(1-_)/(4*Math.PI*Math.pow(Math.max(1+_-2*l*Me,1e-4),1.5));I+=T*D*Te*j*Oe(K,J)*(i/z)*G}T*=Math.exp(-D*G);const le=Math.floor((k+1)/te*63.999);m.curveL[le]=I,m.curveT[le]=T}return{L:I,T}},Pe=()=>{y.u.uProbe.value=1,y.render(u,v),y.u.uProbe.value=0,u.readRenderTargetPixels(v,0,0,8,1,d),u.setRenderTarget(null);const m=e.params,F=.2126*1+.7152*.9+.0722*.74;X.setFromMatrixPosition(r.matrixWorld),ee.forEach(([R,M],l)=>{const i=B.probes[l],_=q(d,l*8,ge),G=q(d,l*8+2,1),T=q(d,l*8+4,be);Y.set(R*2-1,M*2-1,.5).unproject(r).sub(X).normalize();const I=we(i,T,m.num("sigma",.12),m.num("falloff",.15),m.num("g",.5)),k=H?1:m.bool("temporal",!0)?.25:1,D=(z,j)=>Number.isFinite(z)?z+(j-z)*k:j;i.lMe=D(i.lMe,_),i.tMe=D(i.tMe,G),i.lTh=D(i.lTh,I.L*F),i.tTh=D(i.tTh,I.T),i.s=T}),H=!1,B.ok=!0};return{resize(m,F,R){const M=Math.min(R,1.5),l=Math.max(1,Math.floor(m*M)),i=Math.max(1,Math.floor(F*M));S.setSize(l,i),h.setSize(Math.max(1,l>>1),Math.max(1,i>>1)),n.setSize(Math.max(1,l>>1),Math.max(1,i>>1)),H=!0},update(m,F,R){const M=Ke(e,R),l=e.params,i=.35*Math.sin(M.t*.12);r.position.set(g.x+6.3*Math.sin(i),1.55+.15*Math.sin(M.t*.17),g.z+6.3*Math.cos(i)),r.lookAt(g.x,2,g.z),r.updateMatrixWorld(),J=M.fan,P.rotation.y=J,P.updateMatrixWorld();const _=new $(.05*Math.sin(M.t*.3),-1,0).normalize();t.set(g,_,l.num("cone",21),l.num("cone",21)-4,l.num("power",140)),a.uTime.value=F;const G=l.num("sigma",.12),T=l.num("falloff",.15);if(y.u.uSig.value=G,y.u.uK.value=T,y.u.uG.value=l.num("g",.5),y.u.uSteps.value=Math.round(l.num("steps",32)),y.u.uJit.value=l.bool("jitter",!0)?1:0,y.u.uBlend.value=l.bool("temporal",!0)&&!H?.85:0,L.u.uSig.value=G,L.u.uK.value=T,s==="none"){e.hud(`안개 없음: 화면 = 표면 색 그대로
빛 원뿔은 바닥에 닿은 웅덩이로만 보인다`);return}if(s==="uniform"){e.hud(`균일 안개: 색 = mix(안개색, 표면, T)
T = e^(−∫σ) · σ₀ ${V(G)} · k ${V(T)}
빛과 무관해 빛줄기가 생기지 않는다`);return}if(!B.ok){e.hud("측정 준비 중…");return}const I=B.probes.map((k,D)=>`#${D+1} L 측정 ${V(k.lMe)} / 이론 ${V(k.lTh)} · T ${V(k.tMe)} / ${V(k.tTh)}`);e.hud([`N=${Math.round(l.num("steps",32))}스텝 · 반해상도${l.bool("jitter",!0)?" · 지터":""}${l.bool("temporal",!0)?" · 시간 누적":""}`,...I].join(`
`))},render(){if(t.renderShadow(u,o),u.setRenderTarget(S),u.render(o,r),N.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),x.copy(N).invert(),s==="ray"){y.u.uFrame.value=O%64,y.u.tHist.value=n.texture,y.render(u,h),O%8===0&&Pe(),L.u.tFog.value=h.texture;const m=h;h=n,n=m}O++,L.render(u,null),C.copy(N)},dispose(){t.dispose(),p.dispose(),S.dispose(),h.dispose(),n.dispose(),v.dispose(),y.dispose(),L.dispose(),f.all().forEach(m=>m.dispose())}}})}function Je(s){return Ie(s,()=>({draw(e,o,r){Ae(e,o,r);const u=s.shared.get("vf-ray"),t={x:34,y:26,w:Z(o*.62-40,20),h:Z(r-58,20)},a={x:t.x+t.w+26,y:26,w:Z(o-t.x-t.w-36,20),h:t.h};if(e.strokeStyle="#1c2230",e.strokeRect(t.x+.5,t.y+.5,t.w,t.h),e.strokeRect(a.x+.5,a.y+.5,a.w,a.h),A(e,"광선 #2: L(s) · T(s)",t.x,16,"#c8d0dc",10),A(e,"3점 L 측정/이론",a.x,16,"#c8d0dc",10),!(u!=null&&u.ok)){s.hud("");return}const f=u.probes[1],P=.2126+.7152*.9+.0722*.74;let c=.05;for(const n of u.probes)c=Math.max(c,n.lTh,n.lMe);for(let n=0;n<64;n++)c=Math.max(c,f.curveL[n]*P);c*=1.15;const p=n=>t.x+(n+1)/64*t.w,S=(n,v,d)=>{e.strokeStyle=v,e.setLineDash(d),e.lineWidth=1.6,e.beginPath();for(let x=0;x<64;x++){const C=t.y+t.h-Math.min(1,n(x))*t.h;x?e.lineTo(p(x),C):e.moveTo(p(x),C)}e.stroke(),e.setLineDash([]),e.lineWidth=1};S(n=>f.curveL[n]*P/c,"#facc15",[]),S(n=>f.curveT[n],"#5b9cff",[4,3]);const b=t.x+t.w;e.fillStyle="#ff9a3c",e.beginPath(),e.arc(b,t.y+t.h-f.lMe/c*t.h,4,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(b,t.y+t.h-f.tMe*t.h,4,0,Math.PI*2),e.fill(),A(e,"0",t.x,t.y+t.h+11,"#7d8799",9,"center"),A(e,`s = ${Ve(f.s)} m`,b,t.y+t.h+11,"#7d8799",9,"right"),A(e,`L ${c.toFixed(2)} · T 1`,t.x-3,t.y+8,"#7d8799",9,"right");const h=a.w/3;u.probes.forEach((n,v)=>{const d=a.x+v*h+h*.15,x=n.lTh/c*a.h,C=n.lMe/c*a.h;e.fillStyle="rgba(255,255,255,0.35)",e.fillRect(d,a.y+a.h-x,h*.32,x),e.fillStyle="#ff9a3c",e.fillRect(d+h*.36,a.y+a.h-C,h*.32,C),A(e,`#${v+1}`,d+h*.34,a.y+a.h+11,"#7d8799",9,"center")}),_e(e,[{label:"CPU 적분 L(s)",color:"#facc15"},{label:"T(s)",color:"#5b9cff"},{label:"GPU 측정",color:"#ff9a3c"},{label:"CPU 이론",color:"#9aa3b2"}],t.x,r-4,9),A(e,`오차 ${u.probes.map((n,v)=>`#${v+1} ${n.lTh>0?((n.lMe/n.lTh-1)*100).toFixed(1):"--"}%`).join(" ")}`,a.x+a.w,a.y+12,"#c8d0dc",9,"right"),s.hud("")}}))}const tt={layout:"variants",intro:'<b>볼류메트릭 포그</b>는 공기 중 먼지·수증기가 빛을 산란시키는 현상을 계산해, 조명 원뿔이 <b>공기 속에서 기둥처럼 보이게</b> 하는 연출입니다. 천장의 팬이 빛을 썰어 내는 회전하는 빛줄기처럼, 빛이 "어디서 와서 어디로 가는지"가 공간에 그려지고 장면의 깊이와 분위기가 단숨에 살아납니다. 실제 게임은 적은 스텝으로 생기는 띠·노이즈를 <b>시간 지터 + 누적 평균</b>으로 지웁니다. 여기서는 안개 없음 / 균일한 색 안개 / 레이 마칭 내산란을 비교합니다.',how:["장면을 HDR 타깃에 깊이 텍스처와 함께 그린다. 반해상도 패스에서 픽셀마다 카메라 → 표면까지 N(≤48)스텝을 걷는다.","스텝마다 <code>L += T·σ(x)·HG(g,cosφ)·I·cone·shadow/d²·Δs</code>, <code>T *= e^(−σΔs)</code>. 그림자는 스포트라이트 1024² 깊이 맵을 한 번 조회 – 팬이 돌면 빛줄기도 실시간으로 바뀐다.","밀도는 높이에 따라 <code>σ(y) = σ₀e^(−k·y)</code> (바닥에 깔리는 안개). 표면 감쇠는 닫힌 식 <code>T = exp(−σ₀e^(−k·o_y)(1 − e^(−k·r_y·s))/(k·r_y))</code>를 전체 해상도로 계산한다.","띠 무늬 제거: 시작 위치를 픽셀·프레임마다 다르게(지터, 황금비 수열) 하고, 이전 프레임 결과를 재투영해 85% 섞는다(시간 누적) → 적은 스텝으로 매끈한 결과.","균일 안개는 같은 T로 <code>mix(안개색, 표면, T)</code>만 한다 – 빛과 무관하므로 빛줄기가 생기지 않는다.","HUD 측정: 같은 패스를 판독 모드로 그려 화면 3점의 L·T·광선 길이를 읽는다 (지터 8위상 평균 = 시간 누적이 수렴하는 값). CPU가 같은 상수로 1500스텝 수치 적분(천장 구멍·팬 날개는 해석적 그림자)한 값과 비교 – N을 줄이거나 지터를 끄면 차이(이산화 오차)가 커진다."],pros:["빛의 방향과 공기의 밀도가 눈에 보여 공간감·분위기가 크게 좋아진다 (성당, 숲, 먼지 낀 창고).","그림자 맵을 그대로 쓰므로 움직이는 가림막(팬, 나뭇잎, 캐릭터)이 빛줄기를 실시간으로 바꾼다.","지터 + 시간 누적으로 스텝 수를 크게 줄일 수 있고, 반해상도로 비용을 1/4로 낮춘다."],cons:["픽셀당 수십 번의 그림자 조회 – 여전히 비싼 효과라 반해상도나 프록셀(화면에 맞춘 저해상도 3D 격자) 등으로 나눠 계산한다.","시간 누적은 빠르게 움직이는 빛줄기에서 잔상(고스팅)을 남긴다.","저해상도 결과를 키울 때 물체 윤곽에서 안개가 번진다 – 깊이 인식 업샘플이 필요하다."],usedIn:"〈레드 데드 리뎀션 2〉, 〈인사이드〉(빛줄기 연출), 〈킬존: 섀도우 폴〉(레이 마칭 볼류메트릭 라이트), 〈어쌔신 크리드 4: 블랙 플래그〉(프록셀 볼류메트릭 포그를 널리 알린 2014년 발표), 언리얼 Volumetric Fog, 〈리프트브레이커〉 등.",tips:["밀도 감 잡기: 투과율이 5%로 떨어지는 거리 ≈ 3/σ다. σ₀ = 0.12/m면 약 25m 앞이 거의 안 보인다. 실내 먼지는 0.02~0.1/m에서 시작한다.","전방 산란 g는 먼지·안개에서 0.3~0.7이 흔하다. g가 클수록 빛을 마주 볼 때 빛줄기가 강하고 등지면 흐려진다 – 연출하려는 카메라 방향에 맞춰 고른다.","지터 + 시간 누적이면 16~32스텝으로 충분하다. 빛·가림막이 빠르게 움직이면 누적 비율(여기선 85%)을 낮추거나 이웃 색으로 클램프해 잔상을 줄인다.","반해상도 결과는 깊이를 보며 업샘플(깊이가 비슷한 이웃만 섞기)해야 물체 윤곽에 안개 테두리가 생기지 않는다."],related:["god-rays","light-cookie","flashlight","atmospheric-perspective","sky-scattering"],controls:[{type:"range",key:"sigma",label:"안개 밀도 σ₀ (/m)",min:.02,max:.35,step:.01,value:.12},{type:"range",key:"falloff",label:"높이 감쇠 k (/m)",min:0,max:.6,step:.05,value:.15},{type:"range",key:"g",label:"전방 산란 g (HG)",min:-.3,max:.9,step:.05,value:.5},{type:"range",key:"steps",label:"레이 마칭 스텝 N",min:8,max:48,step:1,value:32},{type:"range",key:"fan",label:"팬 속도 (rad/s)",min:0,max:3,step:.1,value:.6},{type:"range",key:"cone",label:"조명 반각 (°)",min:12,max:30,step:1,value:21},{type:"range",key:"power",label:"세기 I",min:40,max:300,step:10,value:140},{type:"toggle",key:"jitter",label:"지터",value:!0},{type:"toggle",key:"temporal",label:"시간 누적",value:!0}],viewers:[{title:"안개 없음",kind:"before",caption:"천장 구멍으로 들어온 빛은 바닥의 밝은 웅덩이와 팬 그림자로만 보입니다. 공기는 완전히 투명해 빛이 어디서 오는지 알기 어렵습니다.",mount:oe("none")},{title:"균일 색 안개",kind:"variant",caption:"거리에 따라 같은 안개색을 섞는 고전 포그입니다. 깊이감은 생기지만 빛과 무관해 빛기둥이 없고 전체가 뿌옇게 됩니다.",mount:oe("uniform")},{title:"레이 마칭 내산란",kind:"after",caption:"공기 중 각 지점이 받은 빛을 카메라 쪽으로 산란시켜 더했습니다. 팬이 썰어 낸 빛줄기가 공중에 떠 회전합니다.",mount:oe("ray")},{title:"광선 위 적분 (GPU vs CPU)",kind:"info",caption:"가운데 광선의 CPU 수치 적분: 누적 내산란 L(s)(노랑)과 투과율 T(s)(파랑 점선), 주황 점 = GPU 패스가 광선 끝에서 낸 값(지수 이동 평균). 오른쪽 막대 = 3점 비교.",mount:Je}]};export{tt as default};
