import{p,u as d,g as s}from"./three.module-BZgG6AUv.js";import{m as f}from"./three-viewer-0rZIEDzf.js";import{b as v,l as k,F as y,W as h}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const g=`
${y}
uniform float mode; uniform vec3 L; uniform float density; uniform vec3 camP; uniform vec3 tint; uniform float pr;
// 화면 공간에서 각도 a의 평행선 (두께는 밝기에 따라)
float lines(vec2 p, float a, float w){
  vec2 d = vec2(cos(a), sin(a));
  float v = abs(fract(dot(p, d) * density) - .5) * 2.;
  float aa = fwidth(dot(p, d) * density) * 2.;
  return smoothstep(w + aa, w - aa, v);
}
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(camP - vW);
  float lum = clamp(max(dot(N, L), 0.) * .9 + .1, 0., 1.);
  // 기기 픽셀 비율로 나눠 고해상도 폰에서도 CSS 픽셀 기준으로 같은 선 간격 유지
  vec2 sp = gl_FragCoord.xy / (4. * pr);
  vec3 col;
  if (mode < .5) col = tint * lum;
  else if (mode < 2.5) {
    // 톤 아트 맵: 어두울수록 다른 방향의 선을 한 겹씩 추가
    float ink = 0.;
    ink = max(ink, lines(sp, .8, .15) * step(lum, .85));
    if (mode > 1.5) {
      ink = max(ink, lines(sp, -.8, .18) * step(lum, .6));
      ink = max(ink, lines(sp, 0., .22) * step(lum, .38));
      ink = max(ink, lines(sp + .5, .3, .35) * step(lum, .18));
    } else {
      ink = max(ink, lines(sp, .8, .2 + (1. - lum) * .7) * step(lum, .85));
    }
    vec3 paper = vec3(.96, .93, .86);
    col = mix(paper, vec3(.12, .1, .1), ink);
    // 실루엣 근처를 진하게 (N·V가 작은 곳)
    if (mode > 1.5) col *= smoothstep(.0, .22, abs(dot(N, V))) * .7 + .3;
  } else {
    // 하프톤: 밝기에 반비례하는 크기의 점
    vec2 a = vec2(cos(.6), sin(.6));
    vec2 q = mat2(a.x, -a.y, a.y, a.x) * sp * density * 1.4;
    float d = length(fract(q) - .5);
    float r = sqrt(1. - lum) * .6;
    col = mix(vec3(.98, .95, .88), tint * .6, smoothstep(r + .05, r - .05, d));
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function x(e,a){return f(e,{antialias:!0,cam:[0,2.6,5.2],target:[0,.8,0]},({scene:n,camera:m,renderer:r})=>{n.background=new p(15920352);const i=[],{tick:c}=v(n,l=>{const t=new d({uniforms:{mode:{value:a},L:{value:new s},density:{value:.5},camP:{value:new s},tint:{value:l.clone()},pr:{value:1}},vertexShader:h,fragmentShader:g});return i.push(t),t});return{update(l,t){const u=k(t,e.params.bool("animate"),45);for(const o of i)o.uniforms.L.value.copy(u),o.uniforms.density.value=e.params.num("density",.5),o.uniforms.camP.value.copy(m.position),o.uniforms.pr.value=r.getPixelRatio();c(t),e.hud(["N·L 램버트","한 방향 선, 굵기로 톤","밝기 단계별로 선 방향을 겹침","밝기 → 점 크기"][a])}}})}const b=[{mode:0,title:"램버트 셰이딩",kind:"before",caption:"일반적인 연속 음영."},{mode:1,title:"단일 해칭 (굵기 변조)",kind:"variant",caption:"한 방향의 선을 어두운 곳일수록 굵게. 판화 같은 느낌이지만 톤 범위가 좁다."},{mode:2,title:"크로스 해칭 (톤 아트 맵)",kind:"after",caption:"밝기 구간마다 다른 각도의 선 층을 하나씩 겹친다. 펜 드로잉처럼 보이고, 실루엣 근처를 진하게 해 형태를 강조."},{mode:3,title:"하프톤",kind:"variant",caption:"인쇄물처럼 밝기를 점의 크기로 표현. 만화·팝아트 스타일."}],P={layout:"variants",intro:"사실적인 음영 대신 <b>선과 점</b>으로 밝기를 표현해 손그림·판화·인쇄물 느낌을 내는 비사실적 렌더링(NPR)입니다. 계산한 조명 밝기를 그대로 색으로 쓰지 않고, 그 값으로 <b>어떤 선 패턴을 얼마나 겹칠지</b> 고릅니다. 광원을 돌리면 선의 밀도가 부드럽게 바뀝니다.",how:["평소처럼 조명 밝기 (N·L 등)를 계산한다.","톤 아트 맵(TAM): 밝기 단계별 선 텍스처를 미리 만들어 두고 밝기에 따라 섞는다. 어두운 단계는 밝은 단계의 선을 모두 포함해 전환이 자연스럽다.",'선 좌표: 화면 공간(안정적이지만 물체에 붙지 않음, "샤워 도어" 효과) vs UV 공간(물체에 붙지만 원근에 따라 밀도 변화).',"외곽선·종이 질감·떨리는 선을 더하면 손그림 느낌이 강해진다."],pros:["독특한 아트 스타일을 셰이더만으로","조명 계산은 그대로라 동적 광원과 호환"],cons:["화면 공간 패턴은 카메라가 움직이면 표면 위를 미끄러짐","선 밀도가 해상도·거리에 따라 깜빡일 수 있어 밉 처리 필요"],usedIn:'Return of the Obra Dinn(1비트 디더, 같은 "톤을 패턴으로" 계열), Hi-Fi Rush의 하프톤풍 그림체, 펜 드로잉·판화풍 인디 게임. 기반 논문은 Praun et al. "Real-Time Hatching"(SIGGRAPH 2001).',controls:[{type:"range",key:"density",label:"선/점 밀도",min:.2,max:1.2,step:.05,value:.5},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:b.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:a=>x(a,e.mode)}))};export{P as default};
