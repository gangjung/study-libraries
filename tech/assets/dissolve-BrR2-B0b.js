import{p as d,u as c,F as u,aq as f,g as p}from"./three.module-BZgG6AUv.js";import{m as v}from"./three-viewer-0rZIEDzf.js";import{b as h,F as b,W as g}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const y=`
${b}
uniform float mode; uniform float thr; uniform float edge; uniform float nscale; uniform vec3 albedo; uniform float isFloor; uniform vec3 objPos;
void main(){
  vec3 N = normalize(vN);
  vec3 L = normalize(vec3(.5, .8, .4));
  vec3 col = albedo * (max(dot(N, L), 0.) * .85 + .2);
  float a = 1.;
  if (isFloor < .5) {
    // fbm은 0.5 근처(대략 0.2~0.78)에 몰리므로 0~1로 재정규화해야 임계값 전 구간이 고르게 쓰인다
    float n = clamp((fbm3((vW - objPos) * nscale) - .2) / .58, 0., 1.);
    if (mode < .5) a = 1. - thr;
    else {
      float v = n;
      // 방향성: 아래(바닥)에서 위로 타 올라가도록 높이를 섞음
      if (mode > 2.5) v = n * .35 + clamp(1. - (vW.y - objPos.y + 1.) / 2.2, 0., 1.) * .65;
      if (v < thr) discard;
      if (mode > 1.5) {
        // 임계값 바로 위의 띠를 뜨거운 색으로 발광
        float band = 1. - smoothstep(0., edge, v - thr);
        vec3 hot = mix(vec3(1., .25, .02), vec3(1., .9, .4), band);
        col = mix(col, hot * 4., band * step(.001, thr));
      }
    }
  }
  gl_FragColor = vec4(acesTone(col), a);
  #include <colorspace_fragment>
}`;function k(e,a){return v(e,{antialias:!0,cam:[0,2.6,5.2],target:[0,.8,0]},({scene:l})=>{l.background=new d(921880);const n=[],{items:s,tick:m}=h(l,(r,o)=>{const t=new c({uniforms:{mode:{value:a},thr:{value:0},edge:{value:.05},nscale:{value:2},albedo:{value:r.clone().convertSRGBToLinear()},isFloor:{value:o===3?1:0},objPos:{value:new p}},vertexShader:g,fragmentShader:y,transparent:a===0&&o!==3,side:a===0?u:f});return n.push(t),t});return s.forEach((r,o)=>n[o].uniforms.objPos.value.copy(r.position)),{update(r,o){const t=e.params.bool("auto")?(1-Math.cos(o*.8))/2:e.params.num("thr",.4);for(const i of n)i.uniforms.thr.value=t,i.uniforms.edge.value=e.params.num("edge",.06),i.uniforms.nscale.value=e.params.num("nscale",2);m(o),e.hud(`임계값 ${t.toFixed(2)}${a===0?" · 불투명도 = 1 − 임계값":" · noise < 임계값이면 discard"}`)}}})}const S=[{mode:0,title:"알파 페이드",kind:"before",caption:"물체 전체가 균일하게 투명해진다. 반투명 정렬 문제가 생기고 사라지는 연출이 밋밋하다."},{mode:1,title:"노이즈 디졸브",kind:"variant",caption:"픽셀마다 노이즈 값이 임계값보다 작으면 discard. 불규칙한 구멍이 번지며 사라진다. 불투명 그대로라 정렬 문제가 없다."},{mode:2,title:"디졸브 + 불타는 가장자리",kind:"after",caption:"임계값 바로 위의 얇은 띠를 발광색으로 칠해 타들어가는 느낌. 띠 폭이 가장자리 두께."},{mode:3,title:"방향성 디졸브",kind:"variant",caption:"노이즈에 높이 그래디언트를 섞어 아래에서 위로 소멸. 순간이동·소환·재 연출에 쓰인다."}],D={layout:"variants",intro:"물체가 불타거나 순간이동하며 <b>사라지는 연출</b>의 정석입니다. 표면 위치마다 노이즈 값을 매기고, 그 값이 <b>임계값</b>보다 작은 픽셀을 버립니다(discard). 임계값을 0→1로 올리면 노이즈 모양대로 구멍이 퍼지고, 임계값 근처를 발광시키면 타들어가는 가장자리가 됩니다.",how:["픽셀 셰이더에서 노이즈(텍스처 또는 절차적 fBm)를 월드/로컬 좌표나 UV로 샘플한다.","noise < threshold 이면 discard (알파 테스트). 불투명 패스에서 그려 정렬이 필요 없다.","threshold < noise < threshold + 폭 인 영역을 HDR 발광색으로 → 블룸과 함께 불꽃처럼 보인다.","높이·거리 그래디언트를 노이즈에 섞으면 방향성 소멸, 충돌 지점 거리를 섞으면 맞은 곳부터 녹아내림."],pros:["구현이 셰이더 몇 줄","불투명 렌더링이라 반투명 정렬 문제 없음","노이즈 텍스처만 바꿔 다양한 스타일"],cons:["discard는 Early-Z를 방해해 오버드로가 늘 수 있음","구멍 경계가 앨리어싱 (알파 투 커버리지나 TAA로 완화)"],usedIn:"적 사망·소환 연출(Destiny의 적 소멸이 자주 예로 언급됨), 카드 게임의 카드 파괴 연출, 대부분의 액션 게임 스폰/디스폰 효과, Unity Shader Graph·UE 머티리얼 입문 예제의 단골.",controls:[{type:"toggle",key:"auto",label:"임계값 자동 왕복",value:!0},{type:"range",key:"thr",label:"임계값 (자동 끔일 때)",min:0,max:1,step:.01,value:.4},{type:"range",key:"edge",label:"가장자리 폭",min:.005,max:.2,step:.005,value:.06},{type:"range",key:"nscale",label:"노이즈 스케일",min:.5,max:6,step:.1,value:2}],viewers:S.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:a=>k(a,e.mode)}))};export{D as default};
