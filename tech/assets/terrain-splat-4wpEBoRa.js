import{p as c,M as s,u as m,P as l}from"./three.module-BZgG6AUv.js";import{m as p}from"./three-viewer-0rZIEDzf.js";import{F as v,W as d}from"./shade-CcOaBxDj.js";import{m as u}from"./noise-QBBaQyUX.js";import"./glsl-DOwCk4-f.js";import"./canvas-viewer-Btf0JXdr.js";const b=`
${v}
uniform float mode; uniform float blendDepth; uniform float tile;
// 절차적 지형 텍스처: 색 + 높이(블렌딩용)
vec4 sand(vec2 p){ float r = .5 + .5 * sin(p.x * 9. + vnoise(p * 2.) * 4.); return vec4(vec3(.78, .68, .48) * (.85 + .15 * r), r * .6); }
vec4 grass(vec2 p){ float n = fbm2(p * 3.); return vec4(mix(vec3(.18, .36, .1), vec3(.38, .55, .18), n), n); }
vec4 rock(vec2 p){ float n = fbm2(p * 1.6), c = smoothstep(.02, 0., abs(vnoise(p * 4.) - .5)); return vec4(mix(vec3(.38, .36, .34), vec3(.58, .56, .53), n) * (1. - c * .5), n * (1. - c)); }
vec4 snow(vec2 p){ float n = vnoise(p * 5.); return vec4(vec3(.92, .94, .98) * (.92 + .08 * n), .3 + n * .3); }
void main(){
  vec3 N = normalize(vN);
  vec2 p = vW.xz * tile;
  float n = fbm2(vW.xz * .35);
  // 스플랫 가중치: 높이·경사·노이즈로 자동 생성 (실전에서는 아티스트가 칠한 RGBA 텍스처)
  vec4 w;
  w.x = smoothstep(.55, .15, vW.y + (n - .5) * .5);                 // 모래 (낮은 곳)
  w.z = smoothstep(.82, .65, N.y);                                  // 바위 (경사)
  w.w = smoothstep(1.7, 2.2, vW.y + (n - .5) * .8) * (1. - w.z * .7); // 눈 (높은 곳)
  w.y = max(0., 1. - w.x - w.z - w.w);                              // 풀 (나머지)
  w /= dot(w, vec4(1.));
  vec4 s = sand(p), g = grass(p), r = rock(p * .7), o = snow(p);
  vec3 col;
  if (mode < .5) col = w.x * vec3(1., .85, .3) + w.y * vec3(.2, .9, .2) + w.z * vec3(.55) + w.w * vec3(.5, .8, 1.);
  else if (mode < 1.5) col = g.rgb;
  else if (mode < 2.5) col = s.rgb * w.x + g.rgb * w.y + r.rgb * w.z + o.rgb * w.w;
  else {
    // 높이 기반 블렌딩: 가중치 + 각 텍스처의 높이 → 가장 높은 것 근처만 남김
    vec4 h = vec4(s.a, g.a, r.a, o.a) + w;
    float mx = max(max(h.x, h.y), max(h.z, h.w)) - blendDepth;
    vec4 b = max(h - mx, 0.);
    b /= dot(b, vec4(1.)) + 1e-5;
    col = s.rgb * b.x + g.rgb * b.y + r.rgb * b.z + o.rgb * b.w;
  }
  vec3 L = normalize(vec3(.5, .7, .3));
  gl_FragColor = vec4(col * (max(dot(N, L), 0.) * .9 + .25), 1.);
  #include <colorspace_fragment>
}`;function w(){const e=u(12),o=new l(12,12,200,200);o.rotateX(-Math.PI/2);const n=o.getAttribute("position");for(let t=0;t<n.count;t++){const a=n.getX(t),r=n.getZ(t),i=Math.exp(-((a+1)**2+(r+1.5)**2)/10)*2.6;n.setY(t,(e.fbm(a*.18,r*.18,5,.5,2)-.5)*2.4+i)}return o.computeVertexNormals(),o}function f(e,o){return p(e,{antialias:!0,cam:[5,5,7],target:[0,.5,0]},({scene:n})=>{n.background=new c(10467540);const t={mode:{value:o},blendDepth:{value:.2},tile:{value:1}};return n.add(new s(w(),new m({uniforms:t,vertexShader:d,fragmentShader:b}))),{update(){t.blendDepth.value=e.params.num("depth",.2),t.tile.value=e.params.num("tile",1),e.hud(["노랑 = 모래, 초록 = 풀, 회색 = 바위, 하늘 = 눈","풀 텍스처 하나만","가중치로 선형 보간",`높이 블렌딩 · 깊이 ${t.blendDepth.value}`][o])}}})}const g=[{mode:1,title:"텍스처 하나",kind:"before",caption:"지형 전체에 풀 텍스처 하나. 산꼭대기와 절벽까지 풀로 덮여 부자연스럽다."},{mode:0,title:"스플랫 맵 (가중치)",kind:"info",caption:"지점마다 네 재질의 비율. 실제로는 RGBA 텍스처 한 장에 아티스트가 칠하거나 높이·경사 규칙으로 생성한다."},{mode:2,title:"선형 블렌딩",kind:"variant",caption:"가중치대로 색을 섞는다. 경계가 넓게 번져 흐릿하고 두 재질이 반투명하게 겹친 것처럼 보인다."},{mode:3,title:"높이 기반 블렌딩",kind:"after",caption:'각 텍스처의 높이 맵을 가중치에 더해 더 "솟은" 재질이 이긴다. 모래가 바위 틈새를 채우고 풀이 돌 사이로 자라는 듯한 날카롭고 자연스러운 경계.'}],D={layout:"variants",intro:"넓은 지형은 텍스처 한 장으로 덮을 수 없습니다. <b>스플래팅</b>은 풀·흙·바위·눈 같은 반복 텍스처 여러 장을 <b>가중치 맵(스플랫 맵)</b>에 따라 지점마다 섞습니다. 단순 선형 보간은 경계가 뿌옇게 번지므로, 각 재질의 <b>높이 맵</b>을 이용해 실제로 높은 쪽이 보이게 하는 높이 블렌딩이 표준이 되었습니다.",how:["스플랫 맵: RGBA 텍스처 한 장 = 재질 4개의 가중치 (더 많으면 여러 장 또는 인덱스 맵).","선형: Σ texᵢ × wᵢ. 계산은 싸지만 경계가 흐리다.","높이 블렌딩: hᵢ = 높이ᵢ + wᵢ, 최대값에서 블렌드 깊이 d 이내인 것만 남겨 다시 정규화.","먼 곳의 반복 무늬를 숨기려 다른 스케일로 한 번 더 샘플해 섞거나, 랜덤 회전 타일링을 쓴다.","가파른 곳은 트라이플래너로 늘어짐을 막는다."],pros:["작은 텍스처 몇 장으로 거대한 지형을 다양하게","높이 블렌딩은 비용 거의 그대로 경계 품질 대폭 향상"],cons:["재질 수만큼 텍스처 샘플 (노멀·러프니스 포함하면 수십 번)","재질이 많으면 가상 텍스처링 등으로 미리 합성"],usedIn:"Unity Terrain Layer·UE Landscape 레이어(LB Height Blend), Frostbite의 절차적 셰이더 스플래팅(SIGGRAPH 2007), 가상 텍스처와 결합한 Battlefield 3·Far Cry 4 지형. 높이 블렌딩은 Andrey Mishkinis의 2013년 글로 널리 알려짐.",controls:[{type:"range",key:"depth",label:"블렌드 깊이",min:.01,max:1,step:.01,value:.2},{type:"range",key:"tile",label:"텍스처 타일링",min:.3,max:3,step:.05,value:1}],viewers:g.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>f(o,e.mode)}))};export{D as default};
