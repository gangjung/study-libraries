import{H as Me,D as ke,a6 as Re,M as p,P as R,w as Pe,ao as Fe,C as Q,b as P,p as Ce,b4 as Ue,u as q,a8 as _e,k as A,ad as Le,aN as re,r as $,L as j,s as de,o as ue,a2 as qe,b5 as Ae,b6 as Ee,b7 as E,b8 as $e,ae as ve,n as pe}from"./three.module-BZgG6AUv.js";import{m as je}from"./three-viewer-0rZIEDzf.js";import{c as ze}from"./postscene-jOAKHM8g.js";import{G as me,Q as Be}from"./glsl-DOwCk4-f.js";import{b as He}from"./figure-GCHR3crq.js";const J=`
uniform vec2 uSize;
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 c = modelViewMatrix * vec4(0., 0., 0., 1.);
  c.xy += position.xy * uSize;
  gl_Position = projectionMatrix * c;
}`,Ge=`
uniform float uTime; uniform float uSeed;
varying vec2 vUv;
${me}
void main(){
  vec2 q = vUv;
  float n = fbm2(vec2(q.x * 3.5 + uSeed, q.y * 2.5 - uTime * 2.2 + uSeed));
  float w = (1. - q.y) * .42 + .04;
  float edge = abs(q.x - .5 + (n - .5) * .3 * q.y);
  float f = smoothstep(w, w * .25, edge) * smoothstep(1., .45, q.y + (n - .5) * .6) * smoothstep(0., .08, q.y);
  vec3 col = mix(vec3(1., .22, .02), vec3(1., .85, .45), f * f) * f * 2.6;
  gl_FragColor = vec4(col, 1.);
}`,he=`
uniform sampler2D uDepth; uniform vec2 uRes; uniform float uDepthTest; uniform float uStrength;
varying vec2 vUv;
${me}
// 깊이 검사: 이 왜곡 스프라이트 조각이 장면(기둥·캐릭터) 뒤에 가려지면 버림
void depthTest(){
  if (uDepthTest > .5 && texture2D(uDepth, gl_FragCoord.xy / uRes).r < gl_FragCoord.z) discard;
}
void writeDist(vec2 off, float m){
  off.x *= uRes.y / uRes.x;            // 화면 비율 보정 (원형 오프셋)
  gl_FragColor = vec4(off, m, 1. - gl_FragCoord.z);
}`,Ie=`
${he}
uniform float uTime; uniform float uSpeed; uniform float uScale; uniform float uSeed; uniform float uFade;
float n3(vec2 p){ return vnoise(p) * .6 + vnoise(p * 2.1 + 5.3) * .3 + vnoise(p * 4.3 + 1.7) * .1; }
void main(){
  vec2 q = vUv * 2. - 1.;
  float m = smoothstep(1., .2, length(q)) * uFade;
  if (m < .002) discard;
  depthTest();
  vec2 p = vUv * uScale * 2.5 + vec2(uSeed, uSeed * 1.7) - vec2(0., uTime * uSpeed * 1.6);
  float e = .05;
  vec2 g = vec2(n3(p + vec2(e, 0.)) - n3(p - vec2(e, 0.)), n3(p + vec2(0., e)) - n3(p - vec2(0., e))) / (2. * e);
  writeDist(g * .026 * uStrength * m, m);
}`,Ve=`
${he}
uniform float uAge;
void main(){
  vec2 q = vUv * 2. - 1.;
  float r = length(q);
  float ring = exp(-pow((r - .72) / .12, 2.)) * (1. - uAge) * smoothstep(0., .08, uAge);
  if (ring < .003) discard;
  depthTest();
  writeDist(q / max(r, 1e-3) * ring * .07 * uStrength, ring);
}`,Oe=`
uniform sampler2D uScene; uniform sampler2D uDepth; uniform sampler2D uDist;
uniform vec2 uRes; uniform float uPr;
uniform float uMode; uniform float uReject; uniform float uLeakShow; uniform float uPip; uniform float uStats;
varying vec2 vUv;

vec2 suv; float isD; float leak; float rej; vec4 dd;
void evalPix(vec2 uv){
  dd = texture2D(uDist, uv);
  vec2 off = dd.rg;
  isD = step(.5, length(off * uRes));          // 0.5 px 이상 밀린 픽셀
  suv = clamp(uv + off, vec2(.001), vec2(.999));
  leak = 0.; rej = 0.;
  if (isD > .5) {
    float distZ = 1. - dd.a;                    // 이 픽셀을 덮은 가장 가까운 왜곡의 깊이
    float sz = texture2D(uDepth, suv).r;        // 읽어 올 곳의 장면 깊이
    if (sz < distZ - 1e-6) {                    // 읽을 곳이 왜곡보다 앞(앞 물체)
      if (uReject > .5) { suv = uv; rej = 1.; } else leak = 1.;
    }
  }
}
vec3 hue(float h){ return clamp(abs(fract(h + vec3(0., 2., 1.) / 3.) * 6. - 3.) - 1., 0., 1.); }
float hatch(float s){ return step(.5, fract((gl_FragCoord.x + gl_FragCoord.y) / (s * uPr))); }
vec3 bufViz(vec2 uv){
  evalPix(uv);
  vec3 sc = texture2D(uScene, uv).rgb;
  vec3 col = vec3(dot(sc, vec3(.3, .59, .11)) * .22);
  vec2 opx = dd.rg * uRes / uPr;               // CSS 픽셀 단위 오프셋
  float L = length(opx);
  float mag = clamp(L / 10., 0., 1.);
  col += vec3(.06, .07, .1) * clamp(dd.b * 2., 0., 1.);
  if (L > .01) col = mix(col, hue(atan(opx.y, opx.x) / 6.283), mag);
  if (leak > .5) col = mix(vec3(1., .1, .2), vec3(1.), hatch(6.));
  if (rej > .5) col = vec3(.35 + .25 * hatch(6.));
  return col;
}
void main(){
  if (uStats > .5) {
    evalPix(vUv);
    gl_FragColor = vec4(isD, leak, rej, clamp(length(dd.rg * uRes / uPr) / 40., 0., 1.));
    return;
  }
  vec3 col;
  if (uMode < .5) col = texture2D(uScene, vUv).rgb;
  else if (uMode > 1.5) col = bufViz(vUv);
  else {
    evalPix(vUv);
    col = texture2D(uScene, suv).rgb;
    if (uLeakShow > .5 && leak > .5) col = mix(col, vec3(1., 0., 1.), .75);
    if (uLeakShow > .5 && rej > .5) col = mix(col, vec3(0., 1., .6), .35);
  }
  // 작은 창: 이 뷰어의 왜곡 버퍼
  if (uPip > .5 && uMode > .5 && uMode < 1.5) {
    vec2 o = vec2(.62, .03), s = vec2(.35, .35);
    vec2 r = (vUv - o) / s;
    if (r.x > 0. && r.x < 1. && r.y > 0. && r.y < 1.) {
      vec2 bpx = (vUv - o) * uRes / uPr, spx = s * uRes / uPr;
      float border = min(min(bpx.x, bpx.y), min(spx.x - bpx.x, spx.y - bpx.y));
      col = border < 1.5 ? vec3(1.) : bufViz(r);
    }
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function We(){const a=document.createElement("canvas");a.width=1024,a.height=512;const t=a.getContext("2d");t.fillStyle="#20283a",t.fillRect(0,0,1024,512);for(let l=0;l<16;l++){const i=l*32,F=l%2?32:0;for(let m=-64;m<1024;m+=64){const C=(l*7+Math.floor(m/64)*3)%5;t.fillStyle=["#3a4562","#2f3a55","#46506e","#344060","#3c4a68"][C],t.fillRect(m+F+2,i+2,60,28)}}t.strokeStyle="#e8ecf4",t.lineWidth=2;for(let l=0;l<=1024;l+=128)t.beginPath(),t.moveTo(l,0),t.lineTo(l,512),t.stroke();t.fillStyle="#ffe9a8",t.font='700 64px "Noto Sans KR", sans-serif',t.fillText("HEAT HAZE  열기 아지랑이",120,150),t.font="700 40px monospace",t.fillStyle="#9fe0ff",t.fillText("||||| 0123456789 ||||| ABCDEFG",150,300);const n=new ve(a);return n.colorSpace=pe,n.anisotropy=4,n}function Ne(){const a=document.createElement("canvas");a.width=64,a.height=256;const t=a.getContext("2d");for(let l=0;l<16;l++)t.fillStyle=l%2?"#f2f2f2":"#1b4fd8",t.fillRect(0,l*16,64,16);const n=new ve(a);return n.colorSpace=pe,n}function ce(a,t){return new $(a,t,{type:de,minFilter:j,magFilter:j,generateMipmaps:!1,depthBuffer:!0})}const fe=7,Ke=2.4,Ze=1.5;function Qe(a,t){return je(a,{cam:[.15,1.8,6.2],target:[0,1.65,0],background:790294},({scene:n,camera:l,renderer:i})=>{n.add(new Me(13162239,3154968,.9));const F=new ke(11584767,.8);F.position.set(-3,6,5),n.add(F);const m=new Re(16747066,9,0,1.6);m.position.set(0,.8,.3),n.add(m);const C=We(),X=new p(new R(16,8),new Pe({map:C,color:14211288}));X.position.set(0,3.2,-3.2),n.add(X);const z=ze(8,1711914,9080728);z.repeat.set(12,12);const Y=new p(new R(16,16),new Fe({map:z}));Y.rotation.x=-Math.PI/2,n.add(Y);for(let e=0;e<7;e++){const o=new p(new Q(.05,.05,3.6,10),new P({color:new Ce().setHSL(.08+e/7,.85,.55),roughness:.5}));o.position.set(-1.5+e*.5,1.8,-1.6),n.add(o)}const ge=new P({color:4860952,roughness:.9});for(let e=0;e<3;e++){const o=new p(new Q(.08,.09,.9,10),ge);o.rotation.set(Math.PI/2-.25,e/3*Math.PI,0),o.position.set(0,.12,-.1),n.add(o)}const xe=new P({color:7039856,roughness:1});for(let e=0;e<9;e++){const o=new p(new Ue(.12,0),xe),s=e/9*Math.PI*2;o.position.set(Math.cos(s)*.55,.07,-.1+Math.sin(s)*.55),n.add(o)}const ee=[];[[0,.05,1,1.8,0],[-.18,.05,.6,1,3.1],[.2,.05,.6,1.15,7.7]].forEach(([e,o,s,v,x])=>{const b=new q({uniforms:{uSize:{value:new A(s,v)},uTime:{value:0},uSeed:{value:x}},vertexShader:J,fragmentShader:Ge,blending:_e,transparent:!0,depthWrite:!1}),r=new R(1,1);r.translate(0,.5,0);const S=new p(r,b);S.position.set(e,o,-.1),S.frustumCulled=!1,n.add(S),ee.push(b)});const M=Ne();M.wrapS=M.wrapT=Le,M.repeat.set(1,2);const te=new p(new Q(.22,.24,3,24),new P({map:M,roughness:.6}));te.position.set(.52,1.5,1.8),n.add(te);const B=He(n,(e,o)=>new P({color:o,roughness:.55}));B.root.position.set(-.62,0,1.4),B.root.scale.setScalar(.9),B.root.rotation.y=.35;const Se=e=>{for(const o of ee)o.uniforms.uTime.value=e;m.intensity=8+Math.sin(e*13)*.8+Math.sin(e*7.3)*.6},we=()=>{C.dispose(),z.dispose(),M.dispose()};let c=ce(2,2);c.depthTexture=new re(2,2);const U=new $(2,2,{type:de,minFilter:j,magFilter:j,depthBuffer:!1,generateMipmaps:!1});let k=new $(2,2,{depthBuffer:!1}),T=new Uint8Array(16);const H=new q({uniforms:{uScene:{value:null},uDepth:{value:null},uDist:{value:null},uRes:{value:new A(2,2)},uPr:{value:1},uMode:{value:t===9?2:t===0?0:1},uReject:{value:0},uLeakShow:{value:0},uPip:{value:0},uStats:{value:0}},vertexShader:Be,fragmentShader:Oe,depthTest:!1,depthWrite:!1}),G=new ue,I=new p(new R(2,2),H);I.frustumCulled=!1,G.add(I);const oe=new qe(-1,1,1,-1,0,1),V=new ue,ae=e=>(e.blending=Ae,e.blendEquation=Ee,e.blendSrc=E,e.blendDst=E,e.blendEquationAlpha=$e,e.blendSrcAlpha=E,e.blendDstAlpha=E,e.transparent=!0,e.depthTest=!1,e.depthWrite=!1,e),se=()=>({uDepth:{value:null},uRes:{value:new A(2,2)},uDepthTest:{value:0},uStrength:{value:1},uSize:{value:new A(1,1)}}),O=new R(1,1),W=[];for(let e=0;e<fe;e++){const o=ae(new q({uniforms:{...se(),uTime:{value:0},uSpeed:{value:1},uScale:{value:1.5},uSeed:{value:e*13.7},uFade:{value:0}},vertexShader:J,fragmentShader:Ie})),s=new p(O,o);s.frustumCulled=!1,V.add(s),W.push({mesh:s,mat:o,seed:e*2.39})}const _=ae(new q({uniforms:{...se(),uAge:{value:1}},vertexShader:J,fragmentShader:Ve})),w=new p(O,_);w.frustumCulled=!1,w.position.set(0,1.1,-.1),w.visible=!1,V.add(w);const L=[...W.map(e=>e.mat),_];let ne=0,le=-99;const be=a.params.on(e=>{e==="shock"&&(le=ne)});let h=2,g=2,N=1,y=1,D=1,Te=0,f={dPct:0,leak:0,rej:0,maxPx:0};const d=H.uniforms,ye=()=>{d.uStats.value=1,i.setRenderTarget(k),i.render(G,oe),i.setRenderTarget(null),d.uStats.value=0,i.readRenderTargetPixels(k,0,0,y,D,T);let e=0,o=0,s=0,v=0;for(let r=0;r<y*D;r++)e+=T[r*4]>127?1:0,o+=T[r*4+1]>127?1:0,s+=T[r*4+2]>127?1:0,v=Math.max(v,T[r*4+3]);const x=y*D,b=h*g/(N*N)/x;f={dPct:e/x*100,leak:Math.round(o*b),rej:Math.round(s*b),maxPx:v/255*40}};return{resize(e,o,s){var v;h=Math.max(2,Math.floor(e*s)),g=Math.max(2,Math.floor(o*s)),N=s,(v=c.depthTexture)==null||v.dispose(),c.dispose(),c=ce(h,g),c.depthTexture=new re(h,g),U.setSize(h,g),y=Math.max(1,Math.ceil(h/4)),D=Math.max(1,Math.ceil(g/4)),k.dispose(),k=new $(y,D,{depthBuffer:!1}),T=new Uint8Array(y*D*4),d.uRes.value.set(h,g),d.uPr.value=s;for(const x of L)x.uniforms.uRes.value.set(h,g)},update(e,o){ne=o,Se(o);const s=a.params,v=s.num("strength",1),x=s.num("speed",1),b=s.num("nscale",1.5),r=t===2||t===9?s.bool("depthTest",!0):!1;d.uReject.value=r?1:0,d.uLeakShow.value=s.bool("leakShow",!1)?1:0,d.uPip.value=s.bool("showBuf",!1)?1:0;for(const u of L)u.uniforms.uDepthTest.value=r?1:0,u.uniforms.uStrength.value=v;W.forEach((u,De)=>{const Z=(o/Ke+De/fe)%1,ie=.9+Z*1.7;u.mesh.position.set(Math.sin(o*.7+u.seed)*.22,.75+Z*3,-.1),u.mat.uniforms.uSize.value.set(ie,ie*1.15),u.mat.uniforms.uFade.value=Math.sin(Math.PI*Z)**.7,u.mat.uniforms.uTime.value=o,u.mat.uniforms.uSpeed.value=x,u.mat.uniforms.uScale.value=b});const S=(o-le)/Ze;if(w.visible=S>=0&&S<1,w.visible){const u=.4+S*7.5;_.uniforms.uSize.value.set(u,u),_.uniforms.uAge.value=S}if(t===0){a.hud("왜곡 없음 · 왜곡 픽셀 0% · 누출 0 px · 패스: 장면 → 출력");return}const K=w.visible?" · 충격파 진행 중":"";t===1?a.hud(`왜곡 픽셀 ${f.dPct.toFixed(1)}% · 누출 ≈ ${f.leak} px (앞 물체를 비틀어 읽음) · 최대 오프셋 ≈ ${f.maxPx.toFixed(0)} px${K}`):t===2?a.hud(r?`왜곡 픽셀 ${f.dPct.toFixed(1)}% · 누출 ${f.leak} px · 깊이로 거부한 샘플 ≈ ${f.rej} px${K}`:`깊이 검사 꺼짐 → 왜곡 ${f.dPct.toFixed(1)}% · 누출 ≈ ${f.leak} px${K}`):a.hud(`색 = 오프셋 방향 · 밝기 = 크기 · 빨강 빗금 = 누출 ${f.leak} px · 회색 빗금 = 거부 ${f.rej} px · 깊이 검사 ${r?"켬":"끔"}`)},render(){if(i.setRenderTarget(c),i.render(n,l),d.uScene.value=c.texture,d.uDepth.value=c.depthTexture,t!==0){for(const e of L)e.uniforms.uDepth.value=c.depthTexture;i.setRenderTarget(U),i.setClearColor(0,0),i.clear(!0,!1,!1),i.render(V,l),d.uDist.value=U.texture}i.setRenderTarget(null),i.render(G,oe),t!==0&&Te++%10===0&&ye()},dispose(){var e;be(),(e=c.depthTexture)==null||e.dispose(),c.dispose(),U.dispose(),k.dispose(),H.dispose(),I.geometry.dispose();for(const o of L)o.dispose();O.dispose(),we()}}})}const Je=[{mode:0,title:"왜곡 없음",kind:"before",caption:"같은 장면을 그대로 출력. 불꽃은 있지만 그 위의 공기가 흔들리지 않아 벽의 흰 세로줄과 글자가 곧게 보인다. 뜨거운 느낌이 약하다."},{mode:1,title:"단순 왜곡 (깊이 무시)",kind:"variant",caption:"왜곡 스프라이트를 깊이와 상관없이 버퍼에 그리고 그대로 UV를 민다. 불 뒤의 벽은 아지랑이처럼 흔들리지만, 불보다 앞에 선 줄무늬 기둥과 캐릭터까지 일렁이고 가장자리에서 배경색과 앞 물체 색이 서로 번진다(누출)."},{mode:2,title:"깊이 인식 왜곡 + 충격파",kind:"after",caption:'① 왜곡 스프라이트를 장면 깊이로 검사해 앞 물체에 가려진 부분은 버퍼에 쓰지 않고, ② 밀어서 읽을 곳이 왜곡보다 앞에 있는 물체면 샘플을 버리고 원래 UV를 쓴다. 기둥·캐릭터는 또렷하고 뒤 배경만 흔들린다. "충격파" 버튼으로 고리 모양 왜곡도 확인.'},{mode:9,title:"왜곡 버퍼 (디버그)",kind:"info",caption:'왜곡 벡터 버퍼를 색으로 본 것. 색상 = 오프셋 방향, 밝기 = 크기. "깊이 검사"를 끄면 기둥·캐릭터 위에도 벡터가 덮이고 빨강 빗금(누출)이 생긴다. 켜면 앞 물체 모양대로 구멍이 뚫리고, 가장자리의 회색 빗금은 깊이로 거부한 샘플.'}],at={layout:"compare",intro:'불꽃 위 아지랑이, 제트 배기, 폭발 충격파는 "화면이 일렁이는" 효과입니다. 장면을 다 그린 뒤 <b>왜곡 버퍼</b>라는 별도 렌더 타깃에 파티클·메시가 <b>"이 픽셀을 어느 방향으로 얼마나 밀지"</b>(RG 오프셋)를 그리고, 마지막에 장면 색을 그 오프셋만큼 밀린 위치에서 읽어 옵니다. 단순하게 하면 <b>열원보다 앞에 있는 물체까지 일렁이고 색이 번지는 누출</b>이 생기므로, 장면 깊이로 왜곡을 가리고 앞 물체의 색을 읽지 않도록 거부합니다.',how:["1패스: 불투명·반투명 장면을 렌더 타깃에 그린다(색 + 깊이 텍스처).","2패스: 왜곡 파티클(열기 스프라이트, 충격파 고리)을 별도 버퍼에 그린다. 흘러가는 노이즈의 기울기 = 노멀 → RG 오프셋. 여러 장은 더해서 쌓는다.","깊이 검사: 왜곡 스프라이트의 깊이가 장면 깊이보다 뒤면(앞 물체에 가려짐) 그 조각은 버린다.","합성: uv′ = uv + 오프셋으로 장면 색을 읽는다. 읽을 위치의 깊이가 왜곡보다 앞이면(앞 물체) 원래 uv로 되돌린다.","충격파: 퍼지는 고리 모양으로 바깥 방향 오프셋을 그리고 시간이 지나면 약하게 만든다."],pros:["장면 복사 1회 + 작은 오프셋 버퍼로 아지랑이·충격파·물결·투명 위장 효과를 모두 처리","파티클 시스템을 그대로 써서 수명·크기·세기를 아티스트가 조절","왜곡 버퍼는 절반 해상도로도 충분히 부드러움"],cons:["화면 밖·앞 물체에 가린 곳의 색은 복사본에 없어서 가장자리가 끊기거나 그대로 남음","깊이 거부 경계에 왜곡이 갑자기 사라지는 얇은 선이 보일 수 있음","왜곡 뒤의 반투명(다른 불꽃·연기)은 이미 장면에 섞여 있어 같이 흔들림","전체 화면 패스 + 렌더 타깃 전환 비용(모바일 타일 GPU에서 특히)"],usedIn:"UE의 Refraction/Distortion 머티리얼(반투명 굴절 패스), Unity URP·HDRP의 장면 색 텍스처를 쓰는 왜곡 셰이더와 HDRP Distortion, 각종 액션 게임의 모닥불·엔진 배기·폭발 충격파·투명 위장.",controls:[{type:"range",key:"strength",label:"왜곡 세기",min:0,max:3,step:.05,value:1},{type:"range",key:"speed",label:"노이즈 속도",min:0,max:3,step:.05,value:1},{type:"range",key:"nscale",label:"노이즈 촘촘함",min:.5,max:4,step:.05,value:1.5},{type:"toggle",key:"depthTest",label:"깊이 검사 (앞 물체 보호)",value:!0},{type:"toggle",key:"leakShow",label:"누출 픽셀 강조",value:!1},{type:"toggle",key:"showBuf",label:"버퍼 보기 (작은 창)",value:!1},{type:"button",key:"shock",label:"충격파"}],viewers:Je.map(a=>({title:a.title,kind:a.kind,caption:a.caption,mount:t=>Qe(t,a.mode)}))};export{at as default};
