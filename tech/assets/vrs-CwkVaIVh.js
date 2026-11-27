import{r as y,aN as D,s as b,k as M,u as S}from"./three.module-BZgG6AUv.js";import{F as T}from"./Pass-By1_TgQk.js";import{m as k}from"./three-viewer-0rZIEDzf.js";import{Q as V}from"./glsl-DOwCk4-f.js";import{b as w}from"./postscene-jOAKHM8g.js";const R=`
uniform sampler2D tColor; uniform sampler2D tDepth; uniform vec2 res; uniform float mode; uniform float showMap; uniform float thr;
varying vec2 vUv;
float lum(vec3 c){ return dot(c, vec3(.299, .587, .114)); }
float rateAt(vec2 px){
  if (mode < .5) return 1.;
  if (mode < 1.5) return 2.;
  vec2 tile = floor(px / 16.) * 16. + 8.;
  if (mode < 2.5) {
    // 포비티드: 화면 중심(시선)에서 멀수록 거칠게
    float d = length((tile / res - .5) * vec2(res.x / res.y, 1.));
    return d < .18 ? 1. : d < .36 ? 2. : 4.;
  }
  // 콘텐츠 적응: 타일 안 밝기 변화(대비)가 작으면 거칠게
  float mn = 1e9, mx = -1e9;
  for (int y = 0; y < 4; y++) for (int x = 0; x < 4; x++){ float l = lum(texture2D(tColor, (tile + vec2(x, y) * 4. - 6.) / res).rgb); mn = min(mn, l); mx = max(mx, l); }
  float c = mx - mn;
  return c > thr ? 1. : c > thr * .35 ? 2. : 4.;
}
void main(){
  vec2 px = vUv * res;
  float r = rateAt(px);
  vec2 rep = (floor(px / r) * r + r * .5) / res;
  vec3 own = texture2D(tColor, vUv).rgb;
  vec3 c = texture2D(tColor, rep).rgb;
  float d0 = texture2D(tDepth, vUv).x, d1 = texture2D(tDepth, rep).x;
  if (abs(d0 - d1) > .0008) c = own;
  if (showMap > .5 && mode > .5) c = mix(c, r < 1.5 ? vec3(.2, 1., .3) : r < 2.5 ? vec3(1., .85, .2) : vec3(1., .25, .2), .28);
  gl_FragColor = vec4(c, 1.);
  #include <colorspace_fragment>
}`;function C(e,a){return k(e,{antialias:!1,cam:[0,1.8,7],target:[0,1.2,-4],fov:55},({scene:c,camera:h,renderer:i})=>{const x=w(c),n=new y(1,1,{type:b,depthTexture:new D(1,1)}),l={tColor:{value:n.texture},tDepth:{value:n.depthTexture},res:{value:new M},mode:{value:a},showMap:{value:1},thr:{value:.12}},f=new T(new S({uniforms:l,vertexShader:V,fragmentShader:R})),p=["100%","25% (4픽셀당 1회)","약 30~40%","장면에 따라 30~70%"],g=(r,t)=>{let o=0,s=0;for(let u=8;u<t;u+=16)for(let m=8;m<r;m+=16){const d=Math.hypot((m/r-.5)*(r/t),u/t-.5),v=d<.18?1:d<.36?2:4;o+=1/(v*v),s++}return s?o/s:1};return{update(r,t){x(t),l.showMap.value=e.params.bool("map")?1:0,l.thr.value=e.params.num("thr",.12),e.hud(`픽셀 셰이더 실행 ≈ ${p[a]}${e.params.bool("map")&&a?" · 초록 1×1 / 노랑 2×2 / 빨강 4×4":""}`)},render(){i.setRenderTarget(n),i.render(c,h),i.setRenderTarget(null),f.render(i)},resize(r,t,o){n.setSize(Math.floor(r*o),Math.floor(t*o)),l.res.value.set(Math.floor(r*o),Math.floor(t*o)),a===2&&(p[2]=`${Math.round(g(l.res.value.x,l.res.value.y)*100)}% (타일 레이트로 계산)`)},dispose(){n.dispose(),f.dispose()}}})}const F=[{mode:0,title:"전체 해상도 셰이딩",kind:"before",caption:"모든 픽셀마다 픽셀 셰이더를 실행. 하늘·바닥처럼 단조로운 곳도 똑같은 비용."},{mode:1,title:"균일 2×2 레이트",kind:"variant",caption:"화면 전체를 4픽셀당 한 번 셰이딩. 비용은 1/4이지만 간판 글자와 체커 무늬가 뭉개진다. 물체 윤곽은 여전히 픽셀 단위(커버리지는 유지)."},{mode:2,title:"포비티드 (시선 중심)",kind:"variant",caption:"시선이 머무는 중앙은 1×1, 주변으로 갈수록 2×2, 4×4. VR 헤드셋의 시선 추적과 결합하면 사용자는 차이를 못 느낀다."},{mode:3,title:"콘텐츠 적응형",kind:"after",caption:"16×16 타일마다 지난 프레임의 밝기 대비를 보고, 단조로운 타일은 거칠게, 디테일한 타일은 정밀하게. 화질 손실을 최소화하며 비용 절감."}],I={layout:"variants",intro:"가변 셰이딩 레이트(VRS)는 화면 영역마다 <b>픽셀 셰이더를 실행하는 빈도</b>를 다르게 합니다. 하나의 셰이더 결과를 2×2, 4×4 픽셀이 나눠 쓰되, 깊이·커버리지는 픽셀 단위로 유지해 물체 윤곽은 선명합니다. 하늘·어두운 곳·흐린 곳·시야 가장자리에서 비용을 아끼는 하드웨어 기능입니다. 레이트 맵 표시를 켜고 비교해 보세요.",how:["Tier 1: 드로우 콜 단위로 레이트 지정 (예: 먼 지형은 2×2).",'Tier 2: 화면을 8×8~16×16 타일로 나눈 "레이트 이미지"로 영역별 지정 + 프리미티브 단위 지정.',"레이트 이미지는 이전 프레임의 밝기 대비·모션 블러량·DoF 흐림 정도·시선 위치로 컴퓨트 셰이더가 생성.","래스터라이저는 블록당 1회 셰이딩 후 결과를 블록 내 커버된 샘플에 복제한다."],pros:["픽셀 셰이딩이 병목일 때 보이는 품질 대비 비용 절감 (프레임 전체 이득은 장면에 따라 수~수십 %)","포비티드 렌더링(VR)의 핵심","엔진 변경이 비교적 적음"],cons:["DX12 Ultimate·Vulkan 확장 등 하드웨어 지원 필요 (WebGL 불가 — 여기선 시뮬레이션)","고주파 텍스처·텍스트가 흐려질 위험","후처리·화면 공간 효과와 상호작용 튜닝"],usedIn:"Gears 5·Gears Tactics(The Coalition), Wolfenstein: Youngblood(NVIDIA Adaptive Shading), Call of Duty: Modern Warfare의 소프트웨어 VRS(Drobot 2020), VR 기기의 포비티드 렌더링(구현 방식은 기기별로 다름).",controls:[{type:"toggle",key:"map",label:"레이트 맵 표시",value:!0},{type:"range",key:"thr",label:"적응형 대비 임계값",min:.02,max:.4,step:.01,value:.12}],viewers:F.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:a=>C(a,e.mode)}))};export{I as default};
