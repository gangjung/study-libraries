import{P as h,T as w,G as g,u as L,p as m,M as x}from"./three.module-BZgG6AUv.js";import{m as T}from"./three-viewer-0rZIEDzf.js";import{G as k}from"./glsl-DOwCk4-f.js";const b=`
uniform float uLayer; uniform float uLen; uniform float uTime; uniform float uWind; uniform float uFlat;
varying vec2 vUv; varying vec3 vN; varying vec3 vW;
void main(){
  vUv = uv;
  vec3 n = normalize(normal);
  // 층마다 법선 방향으로 조금씩 부풀림 + 바깥 층일수록 바람·중력으로 휘어짐 (끝이 더 많이 휨)
  float h = uLayer;
  vec3 p = position + n * h * uLen;
  vec3 wp = (modelMatrix * vec4(p, 1.)).xyz;
  float sway = sin(uTime * 1.7 + wp.x * .6 + wp.z * .4) + .4 * sin(uTime * 3.1 + wp.x * 1.3);
  wp += vec3(sway * .6, -.5 * uFlat, sway * .25) * uWind * h * h * uLen;
  vW = wp; vN = normalize(mat3(modelMatrix) * n);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.);
}`,S=`
uniform float uLayer; uniform float uDensity; uniform vec3 uRoot; uniform vec3 uTip; uniform float uShowLayer; uniform float uTaper;
varying vec2 vUv; varying vec3 vN; varying vec3 vW;
${k}
void main(){
  vec2 cell = vUv * uDensity;
  vec2 id = floor(cell);
  float rnd = hash12(id);
  // 한 칸 = 털 한 가닥. 가닥 높이는 무작위, 층이 그보다 높으면 버림
  float hgt = .4 + .6 * rnd;
  vec2 lc = fract(cell) * 2. - 1.;
  float r = length(lc);
  // 가닥 굵기: 위로 갈수록 가늘어짐 (원뿔)
  float thick = uTaper > .5 ? (1. - uLayer / hgt) : 1.;
  if (uLayer > 0. && (uLayer > hgt || r > thick)) discard;
  vec3 L = normalize(vec3(.5, .8, .3));
  float diff = clamp(dot(normalize(vN), L) * .5 + .5, 0., 1.);
  // 셀프 섀도우 근사: 뿌리 쪽 층일수록 어둡게 (아래층은 위층에 가려짐)
  float ao = mix(.25, 1., uLayer);
  vec3 c = mix(uRoot, uTip, uLayer) * (.3 + .9 * diff) * ao * (.85 + .3 * rnd);
  if (uShowLayer > .5) c = mix(c, vec3(fract(uLayer * 7.3), fract(uLayer * 3.1 + .3), fract(uLayer * 5.7 + .6)), .6);
  gl_FragColor = vec4(c, 1.);
  #include <colorspace_fragment>
}`;function M(e,t){const a=t==="grass";return T(e,{cam:a?[0,3.2,7]:[0,1.2,4.2],target:a?[0,0,0]:[0,.2,0],antialias:!0},({scene:p})=>{const c=a?new h(14,14,40,40).rotateX(-Math.PI/2):new w(.75,.32,160,24),l=new g;p.add(l);const i=[];let v=-1;const d=o=>{l.clear(),i.forEach(n=>n.dispose()),i.length=0;for(let n=0;n<o;n++){const r=new L({vertexShader:b,fragmentShader:S,uniforms:{uLayer:{value:o>1?n/(o-1):0},uLen:{value:0},uTime:{value:0},uWind:{value:0},uFlat:{value:a?0:1},uDensity:{value:0},uRoot:{value:a?new m(1323020):new m(2758152)},uTip:{value:a?new m(10145866):new m(14723178)},uShowLayer:{value:t==="layers"?1:0},uTaper:{value:1}}});i.push(r);const s=new x(c,r);s.renderOrder=n,l.add(s)}v=o};return{update(o,n){var f;const r=t==="few"?6:t==="layers"?Math.min(12,e.params.num("shells",48)):e.params.num("shells",48);r!==v&&d(r);const s=e.params.num("len",.12)*(a?3:1),y=e.params.num("density",260)*(a?3:1);for(const u of i)u.uniforms.uLen.value=s,u.uniforms.uTime.value=n,u.uniforms.uWind.value=e.params.num("wind",.5),u.uniforms.uDensity.value=y,u.uniforms.uTaper.value=e.params.bool("taper",!0)?1:0;a||(l.rotation.y=n*.25),e.hud(t==="few"?"셸 6겹 · 틈 사이로 층이 보임 (계단)":t==="layers"?`셸 ${r}겹 · 층마다 다른 색 — 같은 메시를 법선 방향으로 부풀린 것`:`셸 ${r}겹 · 드로우 ${r}회 · 삼각형 ${((((f=c.index)==null?void 0:f.count)??0)/3*r/1e3).toFixed(0)}k`)},dispose(){i.forEach(o=>o.dispose()),c.dispose()}}})}const G=[{mode:"few",title:"셸 6겹",kind:"before",caption:"층이 적으면 비스듬히 볼 때 가닥이 끊긴 판 조각으로 보인다. 털 길이에 비해 층 간격이 너무 넓다."},{mode:"many",title:"셸 여러 겹 (털)",kind:"after",caption:'층을 촘촘히 쌓으면 가닥이 연속적으로 보인다. 각 층은 노이즈 칸마다 "이 가닥이 이 높이까지 오는가"로 픽셀을 버린다. 뿌리 쪽을 어둡게 해서 깊이감.'},{mode:"grass",title:"같은 기법으로 풀밭",kind:"variant",caption:"평면에 셸을 쌓고 바깥 층일수록 바람에 더 휘게 하면 풀밭이 된다. 수백만 개의 풀잎 메시 없이 층 수만큼만 그린다."},{mode:"layers",title:"층 시각화",kind:"info",caption:"층마다 색을 다르게 칠했다. 모두 같은 메시이고, 정점 셰이더가 법선 방향으로 조금씩 밀어낸 것뿐."}],F={layout:"variants",intro:"셸 텍스처링은 같은 메시를 <b>법선 방향으로 조금씩 부풀린 껍질(셸)</b>로 여러 번 그리고, 각 층에서 노이즈로 픽셀을 잘라내 털·풀·이끼를 표현합니다. 아래층부터 위층까지 남은 픽셀이 이어지면 가닥처럼 보입니다. 가닥 하나하나를 메시로 만들지 않아도 되어 매우 싸고, 바람·중력으로 층을 휘게 하면 움직임도 쉽게 줍니다.",how:["셸 N개: 층 높이 h = i/(N−1), 정점 = 원래 위치 + 법선 × h × 털 길이.","UV × 밀도로 격자를 만들고 칸마다 해시로 가닥 높이를 정한다.","프래그먼트: h > 가닥 높이이거나 칸 중심에서 거리 > 굵기(위로 갈수록 가늘게)면 discard.","뿌리 쪽 층을 어둡게 해 셀프 섀도우 근사, 끝 쪽 색을 밝게.","물리: 바깥 층일수록 바람·중력 오프셋을 h²에 비례해 더함. 실루엣 보완을 위해 핀(fin)을 추가하기도."],pros:["구현이 단순하고 저렴","밀도·길이 조절이 쉬움","바람·쓸림 표현 간단"],cons:["층 수만큼 오버드로우 (모바일 부담)","비스듬히 보면 층이 보이는 계단 현상","긴 털·곱슬에는 부적합 (가닥 기반 헤어 필요)"],usedIn:"초기 대표 사례로 자주 언급되는 스타폭스 어드벤처(GameCube) 털·풀, 쉐도우 오브 콜로서스(PS2) 거상 털. 이후 짧은 동물 털·카펫·이끼·짧은 잔디에 널리 쓰임 (Lengyel 외, I3D 2001 셸+핀).",controls:[{type:"range",key:"shells",label:"셸 수",min:8,max:96,step:4,value:48},{type:"range",key:"len",label:"털 길이",min:.03,max:.3,step:.01,value:.12},{type:"range",key:"density",label:"가닥 밀도",min:60,max:600,step:20,value:260},{type:"range",key:"wind",label:"바람",min:0,max:2,step:.1,value:.5},{type:"toggle",key:"taper",label:"가닥 끝 가늘게",value:!0}],viewers:G.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>M(t,e.mode)}))};export{F as default};
