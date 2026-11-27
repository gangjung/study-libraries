import{p as u,u as n,az as f,M as v,g as l}from"./three.module-BZgG6AUv.js";import{m as h}from"./three-viewer-0rZIEDzf.js";import{b as g,l as b,F as x,W as k}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const w=`
${x}
uniform float mode; uniform vec3 L; uniform vec3 albedo; uniform vec3 camP; uniform float steps; uniform float rimK;
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW), H = normalize(L + V);
  float ndl = dot(N, L);
  vec3 col;
  if (mode < .5) col = albedo * (max(ndl, 0.) * .9 + .15);
  else {
    // 밝기를 계단으로 양자화 (경계는 fwidth로 살짝 부드럽게)
    float d = ndl * .5 + .5;
    float q = floor(d * steps) / (steps - 1.);
    float e = fwidth(d * steps);
    float f = fract(d * steps);
    q = (floor(d * steps) + smoothstep(1. - e, 1., f)) / steps;
    vec3 shadeCol = albedo * mix(vec3(.35, .3, .5), vec3(1.), q); // 그늘은 푸르스름하게 (손그림 관례)
    col = shadeCol;
    if (mode > 1.5) {
      // 날카로운 하이라이트 점
      float s = pow(max(dot(N, H), 0.), 60.);
      col += vec3(smoothstep(.45, .5, s)) * .7;
    }
    if (mode > 2.5) {
      // 림 라이트: 실루엣 가장자리 밝게 (빛 쪽만)
      float rim = smoothstep(.62, .68, 1. - max(dot(N, V), 0.)) * smoothstep(-.2, .3, ndl);
      col += rim * rimK;
    }
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,S="void main(){ vec4 vp = modelViewMatrix * vec4(position, 1.); vp.xyz += normalize(normalMatrix * normal) * (-vp.z) * .012; gl_Position = projectionMatrix * vp; }";function y(e,a){return h(e,{antialias:!0,cam:[0,2.6,5.2],target:[0,.8,0]},({scene:r,camera:m})=>{r.background=new u(12375270);const s=[],{items:d,tick:c}=g(r,t=>{const o=new n({uniforms:{mode:{value:a},L:{value:new l},albedo:{value:t.clone()},camP:{value:new l},steps:{value:3},rimK:{value:.5}},vertexShader:k,fragmentShader:w});return s.push(o),o});if(a===3){const t=new n({vertexShader:S,fragmentShader:"void main(){ gl_FragColor = vec4(.08, .06, .1, 1.); }",side:f});d.slice(0,3).forEach(o=>o.add(new v(o.geometry,t)))}return{update(t,o){const p=b(o,e.params.bool("animate"),40);for(const i of s)i.uniforms.L.value.copy(p),i.uniforms.camP.value.copy(m.position),i.uniforms.steps.value=e.params.num("steps",3),i.uniforms.rimK.value=e.params.num("rim",.5);c(o),e.hud(["연속 램버트",`${e.params.num("steps",3)}단계 양자화`,"+ 하이라이트 점","+ 림 라이트 + 외곽선"][a])}}})}const L=[{mode:0,title:"일반 셰이딩",kind:"before",caption:"부드러운 연속 음영. 사실적이지만 애니메이션 셀화와는 거리가 멀다."},{mode:1,title:"계단 양자화",kind:"variant",caption:"N·L을 몇 단계로 끊어 밝은 면/그늘 두세 덩어리로. 그늘색을 푸르스름하게 바꾸는 것도 셀 애니메이션의 관례."},{mode:2,title:"+ 날카로운 하이라이트",kind:"variant",caption:"정반사도 임계값으로 잘라 또렷한 점·띠 모양으로. 머리카락·금속 표현에 쓰인다."},{mode:3,title:"+ 림 라이트 + 외곽선",kind:"after",caption:"실루엣 가장자리를 밝게 하는 림 라이트와 역면 확장 외곽선까지 더해 완성된 툰 룩."}],P={layout:"variants",intro:"툰(셀) 셰이딩은 셀 애니메이션처럼 <b>평평한 색 덩어리</b>로 음영을 표현합니다. 조명 계산은 그대로 하되 결과를 <b>몇 단계로 양자화</b>하고, 그늘색·하이라이트 모양·림 라이트·외곽선을 아티스트가 직접 제어합니다. 사실성보다 스타일을 위한 비사실적 렌더링(NPR)의 대표 기법입니다.",how:["밝기 = N·L (하프 램버트 등으로 재매핑) → 단계 수로 floor, 또는 1D 램프 텍스처로 매핑.","그늘색을 단순히 어둡게 하지 않고 색조를 바꾼다 (램프 텍스처나 그늘 전용 색).","하이라이트: (N·H)ⁿ를 smoothstep으로 잘라 또렷한 모양.","림 라이트: (1 − N·V)가 임계값을 넘는 실루엣 근처에 밝은 띠.","외곽선: 역면 확장 또는 후처리 에지 검출. 얼굴은 법선을 직접 편집해 그림자 모양을 조각한다."],pros:["강한 아트 스타일, 시간이 지나도 낡아 보이지 않음","계산이 가볍다"],cons:["자동 조명에서는 그림자 모양이 지저분하게 나옴 → 법선·그림자 편집 수작업","사실적 조명 기능(GI, PBR)과 섞기 까다로움"],usedIn:"젤다 바람의 지휘봉·야숨, 원신, 길티기어 Xrd, 페르소나 5, Hi-Fi Rush, Borderlands.",controls:[{type:"range",key:"steps",label:"음영 단계 수",min:2,max:6,step:1,value:3},{type:"range",key:"rim",label:"림 라이트 세기",min:0,max:1,step:.05,value:.5},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:L.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:a=>y(a,e.mode)}))};export{P as default};
