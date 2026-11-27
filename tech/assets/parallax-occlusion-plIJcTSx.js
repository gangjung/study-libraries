import{p as c,g as v,M as s,P as d,u as p,S as f,w as h}from"./three.module-BZgG6AUv.js";import{m as y}from"./three-viewer-0rZIEDzf.js";import{b as g}from"./bricks-CKErwS-H.js";const w=`
varying vec2 vUv; varying vec3 vW; varying mat3 vTBN;
void main(){
  vUv = uv * vec2(2., 1.5);
  vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz;
  vec3 T = normalize(mat3(modelMatrix) * vec3(1, 0, 0)), B = normalize(mat3(modelMatrix) * vec3(0, 1, 0)), N = normalize(mat3(modelMatrix) * vec3(0, 0, 1));
  vTBN = mat3(T, B, N);
  gl_Position = projectionMatrix * viewMatrix * w;
}`,V=`
uniform sampler2D hMap; uniform sampler2D nMap; uniform sampler2D cMap; uniform vec3 camP; uniform vec3 lightP;
uniform float mode; uniform float scale; uniform float layers; uniform float selfShadow;
varying vec2 vUv; varying vec3 vW; varying mat3 vTBN;
float depthAt(vec2 uv){ return 1. - texture2D(hMap, uv).r; }
void main(){
  // 접선 공간 시선 벡터
  vec3 V = normalize(transpose(vTBN) * (camP - vW));
  vec2 uv = vUv;
  float layerDepth = 1. / layers;
  if (mode > .5 && mode < 1.5) {
    // 단순 시차: 현재 높이만큼 시선 방향으로 UV를 한 번 밀기
    uv -= V.xy / V.z * depthAt(uv) * scale;
  } else if (mode > 1.5) {
    // 가파른 시차: 높이 층을 따라 광선을 진행해 표면 아래로 들어가는 첫 층 찾기
    vec2 dUV = V.xy / V.z * scale / layers;
    float cur = 0., d = depthAt(uv);
    vec2 prevUV = uv;
    for (int i = 0; i < 64; i++){
      if (float(i) >= layers || cur >= d) break;
      prevUV = uv; uv -= dUV; cur += layerDepth; d = depthAt(uv);
    }
    if (mode > 2.5) {
      // POM: 마지막 두 층 사이를 선형 보간해 계단을 없앰
      float after = d - cur, before = depthAt(prevUV) - (cur - layerDepth);
      float w = after / (after - before);
      uv = mix(uv, prevUV, w);
    }
  }
  vec3 n = normalize(texture2D(nMap, uv).xyz * 2. - 1.);
  vec3 Lw = lightP - vW;
  vec3 L = normalize(transpose(vTBN) * Lw);
  float sh = 1.;
  if (selfShadow > .5 && mode > 2.5) {
    // 광원 쪽으로 다시 높이장을 진행해 가려지면 그림자
    float h0 = depthAt(uv);
    vec2 sUV = uv; float sd = h0;
    vec2 step = L.xy / L.z * scale / 24.;
    for (int i = 0; i < 24; i++){ sUV += step; sd -= 1. / 24.; if (sd <= 0.) break; if (depthAt(sUV) < sd - .02) { sh = .25; break; } }
  }
  vec3 alb = texture2D(cMap, uv).rgb;
  float diff = max(dot(n, L), 0.);
  float att = 4. / (1. + dot(Lw, Lw));
  gl_FragColor = vec4(alb * (diff * sh * att + .08), 1.);
  #include <colorspace_fragment>
}`;function x(e,t){return y(e,{antialias:!0,cam:[-1.8,1.4,2.4],target:[0,1,0]},({scene:o,camera:u})=>{o.background=new c(856086);const r=g(),a={hMap:{value:r.height},nMap:{value:r.normal},cMap:{value:r.color},camP:{value:new v},lightP:{value:new v},mode:{value:t},scale:{value:.08},layers:{value:24},selfShadow:{value:1}},l=new s(new d(4,3),new p({uniforms:a,vertexShader:w,fragmentShader:V}));l.position.y=1.5,o.add(l);const i=new s(new f(.04,12,8),new h({color:16777215}));return o.add(i),{update(b,m){a.scale.value=e.params.num("scale",.08),a.layers.value=e.params.num("layers",24),a.selfShadow.value=e.params.bool("shadow")?1:0,a.camP.value.copy(u.position);const n=e.params.bool("animate")?m*.7:.5;a.lightP.value.set(Math.cos(n)*1.5,1.5+Math.sin(n*.6)*.8,.6),i.position.copy(a.lightP.value),e.hud(["노멀 맵만 (UV 그대로)","UV −= V.xy/V.z × 깊이 (1회)",`높이 층 ${a.layers.value}개를 따라 탐색`,`탐색 + 층 사이 보간${a.selfShadow.value?" + 자기 그림자":""}`][t])}}})}const M=[{mode:0,title:"노멀 매핑만",kind:"before",caption:"음영은 있지만 비스듬히 보면 벽돌이 납작한 그림임이 드러난다. 줄눈이 벽돌 뒤로 숨지 않는다."},{mode:1,title:"단순 시차 매핑",kind:"variant",caption:"현재 높이 하나로 UV를 한 번 밀어 깊이감을 흉내. 싸지만 스치는 각도에서 텍스처가 찢어지고 미끄러진다."},{mode:2,title:"가파른 시차 매핑",kind:"variant",caption:"높이를 여러 층으로 나눠 광선이 표면 아래로 들어가는 층을 찾는다. 가림이 생기지만 층 수가 적으면 계단 줄무늬가 보인다."},{mode:3,title:"시차 오클루전 매핑 (POM)",kind:"after",caption:"마지막 두 층 사이를 보간해 계단을 없애고, 광원 쪽으로 다시 추적해 자기 그림자까지. 벽돌이 실제로 튀어나온 것처럼 서로를 가린다."}],z={layout:"variants",intro:"노멀 매핑은 음영만 바꿀 뿐 <b>보는 각도에 따른 깊이(시차)</b>는 없습니다. 시차 매핑은 픽셀 셰이더 안에서 높이맵을 따라 <b>시선 광선을 진행</b>해, 실제로 보여야 할 텍스처 좌표를 찾습니다. 높은 부분이 낮은 부분을 가리고 그림자까지 드리워, 평면 하나가 입체 벽처럼 보입니다. 카메라를 벽에 비스듬히 돌려 보세요.",how:["시선 벡터를 접선 공간으로 옮긴다. V.xy/V.z가 깊이 1당 UV가 밀리는 양.","높이(깊이)를 N개 층으로 나누고, 층마다 UV를 dUV만큼 이동하며 높이맵 깊이와 광선 깊이를 비교한다.","광선이 처음으로 표면보다 깊어진 층에서 멈추고, 직전 층과 선형 보간해 정확한 교차 UV를 구한다.","그 UV로 색·노멀을 샘플한다. 자기 그림자는 교차점에서 광원 방향으로 같은 탐색을 한 번 더.","스치는 각도일수록 층 수를 늘리고(적응형), 실루엣은 여전히 평면이다."],pros:["삼각형 추가 없이 깊은 요철과 가림","바닥 돌길·벽돌·타일에 매우 효과적"],cons:["픽셀당 텍스처 샘플 수십 번 → 비쌈","실루엣·다른 물체와의 교차는 평면 그대로","깊이를 깊게 하면 왜곡과 텍스처 늘어짐"],usedIn:"Crysis(CryEngine 2) 시절부터 AAA 바닥·벽 재질에 널리 쓰임. UE의 ParallaxOcclusionMapping 머티리얼 함수, Unity HDRP Lit의 Pixel Displacement가 같은 기법.",controls:[{type:"range",key:"scale",label:"깊이 스케일",min:0,max:.2,step:.005,value:.08},{type:"range",key:"layers",label:"높이 층 수",min:4,max:64,step:1,value:24},{type:"toggle",key:"shadow",label:"자기 그림자 (POM)",value:!0},{type:"toggle",key:"animate",label:"광원 이동",value:!0}],viewers:M.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>x(t,e.mode)}))};export{z as default};
