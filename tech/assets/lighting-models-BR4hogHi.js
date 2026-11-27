import{u,g as i}from"./three.module-BZgG6AUv.js";import{m as p}from"./three-viewer-0rZIEDzf.js";import{b as d,l as f,F as v,W as h}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const b=`
${v}
uniform vec3 L; uniform vec3 albedo; uniform float shin; uniform float mode; uniform float specK; uniform vec3 camP;
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(camP - vW);
  float ndl = dot(N, L);
  vec3 col;
  float spec = 0.;
  if (mode < .5) {
    col = albedo * max(ndl, 0.);
  } else if (mode < 1.5) {
    // Half-Lambert (Valve): 어두운 면도 형태가 보이도록 -1~1을 0~1로 재매핑
    float h = ndl * .5 + .5;
    col = albedo * h * h;
  } else if (mode < 2.5) {
    vec3 R = reflect(-L, N);
    spec = pow(max(dot(R, V), 0.), shin);
    col = albedo * max(ndl, 0.);
  } else {
    vec3 H = normalize(L + V);
    // 같은 하이라이트 크기를 얻으려면 블린-퐁 지수가 약 4배 필요
    spec = pow(max(dot(N, H), 0.), shin * 4.);
    col = albedo * max(ndl, 0.);
  }
  col += vec3(spec) * specK * step(0., ndl);
  col += albedo * .04;
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function L(e,o){return p(e,{antialias:!0,cam:[0,2.6,5.2],target:[0,.8,0]},({scene:m,camera:r})=>{const l=[],{tick:s}=d(m,t=>{const a=new u({uniforms:{L:{value:new i},albedo:{value:t.clone().convertSRGBToLinear()},shin:{value:32},mode:{value:o},specK:{value:1},camP:{value:new i}},vertexShader:h,fragmentShader:b});return l.push(a),a});return{update(t,a){const c=f(a,e.params.bool("animate"),e.params.num("elev",35));for(const n of l)n.uniforms.L.value.copy(c),n.uniforms.shin.value=e.params.num("shin",32),n.uniforms.specK.value=e.params.num("specK",.8),n.uniforms.camP.value.copy(r.position);s(a),e.hud(["max(N·L, 0)","(N·L·0.5 + 0.5)²",`확산 + (R·V)^${e.params.num("shin",32)}`,`확산 + (N·H)^${e.params.num("shin",32)*4}`][o])}}})}const g=[{mode:0,title:"램버트 (확산만)",kind:"before",caption:"표면이 빛을 모든 방향으로 고르게 흩뿌린다고 가정. 보는 방향과 무관해서 무광 플라스틱·분필처럼 보인다. 그늘진 쪽은 완전히 검다."},{mode:1,title:"하프 램버트",kind:"variant",caption:"그늘 쪽까지 밝기를 펴서 형태가 보이게 한 비물리적 트릭. Half-Life의 캐릭터 셰이딩."},{mode:2,title:"퐁 (Phong)",kind:"variant",caption:"반사 벡터 R과 시선 V의 각도로 하이라이트. 스치는 각도에서 하이라이트가 잘려 둥글게만 보인다."},{mode:3,title:"블린-퐁 (Blinn-Phong)",kind:"after",caption:"하프 벡터 H = normalize(L+V)와 법선의 각도를 사용. 계산이 싸고 스치는 각도에서 실제처럼 하이라이트가 길게 늘어난다."}],y={layout:"variants",intro:"PBR 이전 수십 년간 게임 조명의 기본이었던 고전 모델들입니다. 빛을 <b>확산(diffuse)</b>과 <b>정반사(specular)</b> 두 성분으로 나눠 각각 간단한 코사인 식으로 계산합니다. 지금도 모바일·스타일라이즈드 게임에서 쓰이고, PBR을 이해하는 출발점이 됩니다. 광원을 낮게 내려 하이라이트 모양을 비교해 보세요.",how:["램버트 확산: I = albedo × max(N·L, 0). 빛이 비스듬히 들어올수록 단위 면적당 받는 빛이 cosθ로 줄어든다.","퐁 정반사: R = reflect(−L, N), I = (R·V)^n. 지수 n이 클수록 작고 날카로운 하이라이트 (매끈한 표면).","블린-퐁: H = normalize(L + V), I = (N·H)^n. 방향광 + 먼 시점이면 H가 상수라 고정 파이프라인 시절 더 쌌고, 측정된 재질에도 퐁보다 잘 맞는다.","최종 = 앰비언트 + 확산 + 정반사. 에너지 보존이 안 되어 지수를 바꾸면 전체 밝기가 같이 변한다 → PBR에서 정규화로 해결."],pros:["계산이 매우 싸서 저사양·모바일에 적합","파라미터가 직관적"],cons:["에너지 보존이 안 돼 조명 환경마다 재질을 다시 조정해야 함","금속·거친 표면을 일관되게 표현 못 함 → 마이크로패싯 BRDF로 대체"],usedIn:"OpenGL·Direct3D 고정 파이프라인(블린-퐁), Half-Life(하프 램버트), PBR 이전 세대 게임 대부분, 현재도 모바일·툰 게임의 경량 셰이더.",controls:[{type:"range",key:"shin",label:"광택 지수 n",min:2,max:256,step:2,value:32},{type:"range",key:"specK",label:"정반사 세기",min:0,max:2,step:.05,value:.8},{type:"range",key:"elev",label:"광원 높이 (°)",min:3,max:85,step:1,value:35},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:g.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>L(o,e.mode)}))};export{y as default};
