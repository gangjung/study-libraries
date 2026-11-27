import{V as $,K as re,aj as ie,q as ue,H as ce,u as le,P as me,h as k,a as V,e as de,c as fe,T as pe,d as ve,f as O,ah as he,S as we,M as Se,g as ge,p as ye}from"./three.module-CEzfHhrp.js";import{m as Me}from"./three-viewer-fx7lDL-0.js";import{m as be,a as X}from"./canvas-viewer-QtaWfmlz.js";import{c as xe,l as ke}from"./chart2d-DfgeckAJ.js";import{P as Pe,N as A,a as Y,p as E,v as _e}from"./extra-kit-c-FPjCbN4U.js";import{P as Ce,H as Ne,u as Te,o as Ge,a as Ee,c as Z,d as J}from"./shader-kit-a-CYybgKL4.js";const Fe=.04,ze=.16,Q=.55,h=new $(1.9,1.05,.9),P=new $(0,.75,0),w=64,L=a=>1.12-2*a,ee=a=>Math.max(0,Math.min(1,(1-L(a))/2)),R=`
uniform float uMode, uS, uTh, uE, uK, uNs, uDepth, uTime;
float snowMask(vec3 n, vec3 wp) {
  if (uMode < 0.5) return 0.0;
  if (uMode < 1.5) return uS;
  float nu = xk_fbm(wp * uNs);
  return smoothstep(uTh - uE, uTh + uE, n.y + uK * (nu - 0.5));
}`,Ae=`
float snHash(vec3 c) { return fract(sin(dot(c, vec3(127.1, 311.7, 74.7))) * 43758.5453); }`;function v(a,n,s,u=!1){const e=new ge({color:a,roughness:n,flatShading:u});return e.onBeforeCompile=t=>{Object.assign(t.uniforms,s),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
${A}
${R}
varying vec3 vSnN;
varying vec3 vSnP;`).replace("#include <begin_vertex>",`#include <begin_vertex>
  vec3 snWn = normalize(mat3(modelMatrix) * objectNormal);
  vec3 snWp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  float snM = uMode > 1.5 ? snowMask(snWn, snWp) : 0.0;
  transformed += objectNormal * uDepth * uS * snM;
  vSnN = snWn;
  vSnP = snWp;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
${A}
${R}
${Ae}
varying vec3 vSnN;
varying vec3 vSnP;`).replace("#include <color_fragment>",`#include <color_fragment>
  float snM = snowMask(normalize(vSnN), vSnP);
  vec3 snCol = vec3(0.92, 0.95, 1.0);
  if (uMode > 0.5 && uMode < 1.5) snCol *= 0.8 + 0.2 * xk_fbm(vSnP * 6.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, snCol, snM);`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
  roughnessFactor = mix(roughnessFactor, 0.55, snM);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  if (uMode > 1.5) {
    float h = snHash(floor(vSnP * 55.0));
    float tw = fract(h * 91.0 + dot(normalize(cameraPosition - vSnP), vec3(3.1, 1.7, 2.3)) * 1.5);
    totalEmissiveRadiance += vec3(0.9, 0.95, 1.0) * step(0.985, h) * smoothstep(0.75, 1.0, tw) * 2.5 * snM;
    totalEmissiveRadiance += vec3(0.05, 0.08, 0.14) * snM * (1.0 - snM) * 2.0;
  }`)},e}const Le=`
uniform float uTime;
attribute float aSeed;
void main() {
  vec3 p = position;
  p.y = mod(p.y - uTime * (0.6 + 0.4 * aSeed), 7.0) - 0.3;
  p.x += 0.25 * sin(uTime * 0.8 + aSeed * 30.0);
  p.z += 0.25 * cos(uTime * 0.7 + aSeed * 21.0);
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(42.0 / -mv.z, 1.2, 4.5);
}`,Re=`
void main() {
  vec2 q = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.1, length(q));
  gl_FragColor = vec4(vec3(0.95, 0.97, 1.0), a * 0.9);
}`,$e=`
${A}
${R}
uniform vec3 uC;
uniform float uRad;
varying vec2 vUv;
void main() {
  float phi = vUv.x * 6.2831853;
  float y = vUv.y * 2.0 - 1.0;
  float rr = sqrt(max(0.0, 1.0 - y * y));
  vec3 n = vec3(rr * cos(phi), y, rr * sin(phi));
  float m = snowMask(n, uC + uRad * n);
  gl_FragColor = vec4(m, 0.0, 0.0, 1.0);
}`;function F(a,n){const s=new ye(n,2),u=s.attributes.position,e=new $;for(let t=0;t<u.count;t++){e.fromBufferAttribute(u,t);const c=.75+.5*_e(e.x*2.2+a,e.y*2.2,e.z*2.2);e.multiplyScalar(c),e.y*=.7,u.setXYZ(t,e.x,e.y,e.z)}return s.computeVertexNormals(),s}function z(a){return n=>Me(n,{antialias:!0,orbit:!1,fov:38,cam:[5,4,8],target:[P.x,P.y,P.z],far:80,background:9280950},({scene:s,camera:u,renderer:e})=>{s.fog=new re(9280950,9,26),e.shadowMap.enabled=!0,e.shadowMap.type=ie,e.shadowMap.autoUpdate=!1,e.toneMapping=ue,e.toneMappingExposure=1.05,s.add(new ce(12900095,3817544,1.1));const t=new le(16773341,2);t.position.set(-4,7,3),t.castShadow=!0,t.shadow.mapSize.set(1024,1024);const c=t.shadow.camera;c.left=-6,c.right=6,c.top=6,c.bottom=-6,c.near=1,c.far=20,t.shadow.bias=-8e-4,s.add(t);const r={uMode:{value:a==="none"?0:a==="blend"?1:2},uS:{value:0},uTh:{value:1.12},uE:{value:Fe},uK:{value:ze},uNs:{value:1.6},uDepth:{value:.09},uTime:{value:0}},i=(o,g,l,m,B,y=0,x=0)=>{const p=new Se(o,g);return p.position.set(l,m,B),p.rotation.set(0,y,x),p.castShadow=!0,p.receiveShadow=!0,s.add(p),p},U=i(new me(30,30,1,1),v(4872764,.95,r),0,0,0);U.rotation.x=-Math.PI/2,U.castShadow=!1;const W=v(7031347,.85,r),te=v(8007466,.7,r);i(new k(1.8,1.1,1.4),W,-1.4,.55,-.8);for(const o of[-1,1])i(new k(2.1,.08,1),te,-1.4,1.38,-.8+o*.38,0,0).rotation.x=o*.62;i(new k(.35,.6,.06),v(3811872,.8,r),-1.1,.3,-.08);const S=v(7171184,.9,r,!0);i(F(1,.6),S,.6,.25,-1.6,.4),i(F(5,.4),S,1.4,.15,-.9,1.2),i(F(9,.35),S,-.4,.12,1.3,2.1);const oe=v(2902578,.8,r),ae=v(4862758,.9,r),ne=X(4);for(const[o,g,l]of[[-3.2,-2.2,1.1],[-2.6,1.6,.85],[2.9,-2.4,1.2],[3.4,1.2,.9],[.2,-3.4,1]]){i(new V(.08*l,.1*l,.5*l,8),ae,o,.25*l,g);for(let m=0;m<3;m++)i(new de((.75-m*.18)*l,.8*l,12),oe,o,(.75+m*.45)*l,g,ne()*3)}i(new V(.35,.42,.5,20),S,h.x,.25,h.z),i(new fe(Q,64,40),v(9080730,.6,r),h.x,h.y,h.z);for(let o=0;o<3;o++)i(new k(.8,.14,.32),S,.1+o*0,.07+o*.14,.9-o*.32);i(new pe(.32,.07,10,32),W,-.6,.08,2.2).rotation.x=Math.PI/2;const _=1100,M=new Float32Array(_*3),H=new Float32Array(_),b=X(12);for(let o=0;o<_;o++)M[o*3]=(b()-.5)*14,M[o*3+1]=b()*7,M[o*3+2]=(b()-.5)*14,H[o]=b();const C=new ve;C.setAttribute("position",new O(M,3)),C.setAttribute("aSeed",new O(H,1));const K=new he(C,new we({vertexShader:Le,fragmentShader:Re,uniforms:{uTime:r.uTime},transparent:!0,depthWrite:!1}));K.frustumCulled=!1,s.add(K);const D=new Pe($e,{...r,uC:{value:h.clone()},uRad:{value:Q}}),N=new Ce(w,w,!1),f=n.shared.get("snow-meas")??{s:0,me:NaN,th:NaN,hist:new Ne(160)};a==="masked"&&n.shared.set("snow-meas",f);let T=0,j=-1;return{update(o,g,l){const m=n.params,y=Te(n,"snowClock",l).t,x=18,p=y%x/x,d=m.bool("auto",!0)?Math.min(1,p/.8):m.num("s",.5);if(m.bool("auto",!0)&&d<j&&f.hist.clear(),j=d,r.uS.value=d,r.uTh.value=L(d),r.uDepth.value=m.num("depth",.09),r.uTime.value=y,Ge(u,P,.55+.35*Math.sin(y*.09),.36,8.8),a==="masked"&&T%10===0){D.render(e,N.rt);const se=N.read(e);e.setRenderTarget(null);let q=0;for(let G=0;G<w*w;G++)q+=se[G*4];f.me=q/(w*w*255),f.th=ee(d),f.s=d,f.hist.push(d,f.me)}const I=[a==="none"?`눈 내림만 · 쌓임 s ${Y(d)} (표면 변화 없음)`:a==="blend"?`전체 텍스처 섞기 · 섞는 비율 = s = ${E(d)}`:`θ = 1.12 − 2s = ${Y(L(d))} · 두께 ${(r.uDepth.value*d).toFixed(3)}`];a==="masked"&&I.push(`구 덮인 넓이 측정 ${E(f.me)} / 이론 (1−θ)/2 ${E(f.th)}`),n.hud(I.join(`
`))},render(){e.shadowMap.needsUpdate=T%2===0,T++,e.setRenderTarget(null),e.render(s,u)},dispose(){D.dispose(),N.dispose()}}})}function Ue(a){return be(a,()=>({draw(n,s,u){xe(n,s,u);const e=a.shared.get("snow-meas");if(!e)return;const t={x:44,y:24,w:Math.max(20,s-64),h:Math.max(20,u-64),x0:0,x1:1,y0:0,y1:1};Ee(n,t,"구 표면 중 눈 덮인 넓이 비율","쌓인 정도 s",[0,.25,.5,.75,1],[0,.5,1],c=>`${Math.round(c*100)}%`),Z(n,t,c=>c,"#ff9a3c",1.2,[4,3]),Z(n,t,ee,"#c8d0dc",1.8),J(n,t,e.hist.data,"#38d9d9",2.4),Number.isFinite(e.me)&&J(n,t,[e.s,e.me],"#ffffff",4,!0),ke(n,[{label:"이론 (1−θ)/2",color:"#c8d0dc"},{label:"측정 (GPU 마스크)",color:"#38d9d9"},{label:"전체 섞기 = s",color:"#ff9a3c"}],8,u-4,9),a.hud("")}}))}const qe={layout:"compare",intro:'눈이 "쌓이는" 겨울은 하늘에서 눈송이를 뿌리는 것만으로는 안 됩니다. 눈은 <b>위를 향한 면</b>에 먼저 내려앉고, 지붕과 바위 윗면부터 하얘지며, 시간이 지나면 <b>두께</b>가 생깁니다. 같은 눈 오는 마을을 쌓임 없음 / 전체 텍스처 섞기 / 법선 마스크 + 두께로 비교합니다.',how:["월드 법선의 위 성분 N_y(= N·up)로 마스크를 만든다: <code>m = smoothstep(θ − e, θ + e, N_y + k·(노이즈 − ½))</code>. 쌓인 정도 s가 커질수록 문턱 θ = 1.12 − 2s가 내려가 옆면까지 덮인다.","노이즈 항은 경계를 들쭉날쭉하게 만들어 자연스러운 눈 가장자리를 만든다. 아래를 향한 면(처마 밑, 나무 아래)은 끝까지 덮이지 않는다.","정점 셰이더에서 같은 마스크로 정점을 법선 방향으로 <code>depth·s·m</code> 만큼 밀어 실루엣이 부풀어 오르게 하고, 거칠기를 바꾸고, 해시로 반짝이는 결정(sparkle)을 시선에 따라 깜빡이게 한다.","이론: 구 표면에서 N_y는 넓이에 대해 균등분포(아르키메데스의 모자 정리) → 덮인 넓이 = <code>(1 − θ)/2</code>. 측정: 같은 GLSL 마스크를 구 표면의 등넓이 64×64 격자에서 GPU로 평가해 읽은 평균."],pros:["텍스처 없이 셰이더 한 줄 규칙으로 모든 메시에 일관되게 쌓인다.","시간에 따라 θ만 바꾸면 되므로 날씨 시스템과 연결이 쉽다.",'두께(정점 밀기)가 실루엣을 바꿔 "얹힌" 느낌을 준다.'],cons:["지붕 아래·나무 아래처럼 가려진 곳도 위를 향하면 덮인다 – 실제 게임은 위에서 내려다본 깊이 맵(눈 가림 맵)으로 가린 곳을 뺀다.","정점 밀기는 메시 해상도에 의존한다. 저폴리 바닥은 두께가 안 보여 테셀레이션이나 시차 매핑이 필요하다.","그림자 패스는 밀린 정점을 모르므로(이 데모도 그렇다) 두꺼울수록 그림자가 어긋난다."],usedIn:"〈레드 데드 리뎀션 2〉의 쌓이는 눈과 발자국, 〈갓 오브 워〉(2018)의 눈 덮인 지형처럼 법선 방향 마스크 + 두께 표현은 겨울 장면의 기본 기법으로 알려져 있습니다. 실제 게임은 가림 맵·변형 텍스처 등을 더 씁니다.",tips:["경계 폭 e는 0.03~0.1, 노이즈 세기 k는 0.1~0.3에서 시작한다. k가 경계 폭보다 충분히 커야 눈 가장자리가 직선 띠가 아니라 얼룩처럼 끊긴다.","마스크에 노멀맵을 반영한 픽셀 법선을 조금 섞으면 돌 틈·나무껍질 홈에 눈이 끼어 훨씬 자연스럽다. 정점 밀기에는 매끈한 정점 법선을 그대로 쓴다.","녹는 연출은 s를 거꾸로 줄이면 된다 – 같은 식이라 옆면부터 녹고 윗면이 마지막까지 남는다.","눈 알베도는 순백(1.0)보다 0.8~0.9로 두고 그늘에 파란 기를 살짝 더한다. 순백은 톤 매핑 후 하얗게 날아가 형태가 사라진다."],related:["wet-surface","wind-sway","pbr-material","status-overlay","environmental-storytelling"],controls:[{type:"toggle",key:"auto",label:"시간에 따라 쌓이기 (자동)",value:!0},{type:"range",key:"s",label:"쌓인 정도 s (자동 끔일 때)",min:0,max:1,step:.01,value:.5},{type:"range",key:"depth",label:"최대 두께 (정점 밀기, m)",min:0,max:.2,step:.005,value:.09}],viewers:[{title:"쌓임 없음",kind:"before",caption:"눈송이만 내립니다. 땅과 지붕이 그대로라 눈이 화면 위에 덧칠된 효과처럼 따로 놉니다.",mount:z("none")},{title:"전체 텍스처 섞기",kind:"variant",caption:'모든 표면에 눈 색을 같은 비율 s로 섞었습니다. 벽 옆면과 처마 밑까지 똑같이 희뿌옇게 되어 "쌓였다"기보다 "바랬다"처럼 보입니다.',mount:z("blend")},{title:"법선 마스크 + 두께",kind:"after",caption:"위를 향한 면부터 덮이고, 시간이 지나면 옆면까지 내려옵니다. 정점이 부풀어 두께가 생기고 결정이 반짝입니다.",mount:z("masked")},{title:"덮인 넓이 비율",kind:"info",caption:"석상 구 표면 중 눈 덮인 비율. 점은 같은 GLSL 마스크를 등넓이 격자에서 GPU로 읽은 값, 선은 (1 − θ)/2. 양 끝(θ ± (e + k/2)가 ±1 밖)에서는 근사가 조금 벗어납니다.",mount:Ue}]};export{qe as default};
