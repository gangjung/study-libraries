import{m as a}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const n=`
uniform float mode; uniform float k; uniform float maxSteps; uniform float sliceY;
float sdBox(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float smin(float a, float b, float k){ float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float scene(vec3 p){
  float t = uTime;
  float s1 = length(p - vec3(sin(t * .7) * .9, .9, 0.)) - .55;
  float s2 = length(p - vec3(-sin(t * .7) * .9, .9 + sin(t * 1.3) * .25, 0.)) - .45;
  float bx = sdBox(p - vec3(0., .9, 0.), vec3(.35)) - .05;
  float d = mode < 1.5 ? min(min(s1, s2), bx) : smin(smin(s1, s2, k), bx, k);
  vec3 q = p - vec3(1.9, .45, -.6); q.xz = mat2(cos(t), -sin(t), sin(t), cos(t)) * q.xz;
  d = min(d, sdTorus(q.xzy, vec2(.4, .14)));
  // 반복(도메인 반복)으로 무한 기둥
  vec3 r = p; r.x = mod(r.x + 1.5, 3.) - 1.5;
  d = min(d, sdBox(r - vec3(0., 1., -3.), vec3(.2, 1., .2)));
  return min(d, p.y);
}
vec3 nrm(vec3 p){ vec2 e = vec2(.001, 0.); return normalize(vec3(scene(p + e.xyy) - scene(p - e.xyy), scene(p + e.yxy) - scene(p - e.yxy), scene(p + e.yyx) - scene(p - e.yyx))); }
float softShadow(vec3 o, vec3 d){ float res = 1., t = .02; for (int i = 0; i < 48; i++){ float h = scene(o + d * t); res = min(res, 10. * h / t); t += clamp(h, .02, .3); if (res < .001 || t > 8.) break; } return clamp(res, 0., 1.); }
float ao(vec3 p, vec3 n){ float o = 0., s = 1.; for (int i = 1; i <= 5; i++){ float h = .06 * float(i); o += (h - scene(p + n * h)) * s; s *= .6; } return clamp(1. - 2.5 * o, 0., 1.); }
vec3 heat(float x){ return clamp(vec3(1.5 - abs(4. * x - 3.), 1.5 - abs(4. * x - 2.), 1.5 - abs(4. * x - 1.)), 0., 1.); }
void main(){
  vec3 ro = uCamPos, rd = rayDir();
  float t = 0.; int steps = 0; bool hit = false;
  for (int i = 0; i < 256; i++){
    if (float(i) >= maxSteps) break;
    float h = scene(ro + rd * t);
    steps = i;
    if (h < .0005 * t) { hit = true; break; }
    t += h; // 구 추적: 이 거리만큼은 무엇과도 부딪히지 않음이 보장됨
    if (t > 30.) break;
  }
  vec3 col;
  if (mode < .5) {
    // 스텝 수 열지도
    col = heat(float(steps) / maxSteps);
  } else if (mode > 2.5) {
    // 수평 단면의 거리장: 등고선
    float tp = (sliceY - ro.y) / rd.y;
    if (tp < 0. || (hit && t < tp)) { col = vec3(.05); }
    else {
      vec3 p = ro + rd * tp; float d = scene(p);
      col = d > 0. ? vec3(.9, .6, .3) : vec3(.4, .6, .95);
      col *= 1. - exp(-6. * abs(d));
      col *= .8 + .2 * cos(60. * d);
      col = mix(col, vec3(1.), 1. - smoothstep(0., .01, abs(d)));
    }
  } else {
    vec3 L = normalize(vec3(.6, .8, .4));
    if (hit) {
      vec3 p = ro + rd * t, n = nrm(p);
      vec3 alb = p.y < .002 ? vec3(.12 + .14 * mod(floor(p.x) + floor(p.z), 2.)) : vec3(.8, .3, .18);
      float sh = softShadow(p + n * .002, L);
      col = alb * (max(dot(n, L), 0.) * sh * 1.2 + .3 * ao(p, n) * (.5 + .5 * n.y));
      col = mix(col, vec3(.35, .45, .6), 1. - exp(-.003 * t * t));
    } else col = vec3(.35, .45, .6);
  }
  gl_FragColor = vec4(mode > .5 && mode < 2.5 ? acesTone(col * 1.1) : col, 1.);
  #include <colorspace_fragment>
}`;function s(e,o){return a(e,{cam:[2.5,2.4,4.5],target:[0,.8,0],fov:50,frag:n,uniforms:{mode:{value:o},k:{value:.4},maxSteps:{value:128},sliceY:{value:.9}},update(t){t.k.value=e.params.num("k",.4),t.maxSteps.value=e.params.num("steps",128),t.sliceY.value=e.params.num("slice",.9),e.hud(["색 = 픽셀당 스텝 수 (파랑 적음 → 빨강 많음)","min()으로 합집합",`smin(k=${t.k.value}) 부드러운 합집합 + 그림자 + AO`,`y=${t.sliceY.value} 단면의 거리 값 (주황 = 바깥, 파랑 = 안쪽)`][o])}})}const i=[{mode:1,title:"하드 합집합 + 셰이딩",kind:"before",caption:"구 두 개와 상자를 min()으로 합친 장면. 메시·삼각형이 하나도 없이 함수만으로 그렸다. 경계가 각지게 만난다."},{mode:2,title:"스무스 유니온 + 부드러운 그림자·AO",kind:"after",caption:"smin으로 형태가 액체처럼 녹아 붙는다. 거리장 덕분에 그림자 반경(페넘브라)과 AO도 몇 번의 추가 샘플로 공짜에 가깝게 얻는다."},{mode:0,title:"구 추적 스텝 수",kind:"info",caption:"광선이 표면을 스칠 때(물체 가장자리) 거리가 조금씩만 줄어 스텝이 많아진다. 최대 스텝을 줄이면 가장자리가 먼저 깨진다."},{mode:3,title:"거리장 단면",kind:"info",caption:"수평 단면의 SDF 값. 등고선 간격이 일정 = 실제 거리. 0인 흰 선이 표면이다."}],p={layout:"variants",intro:"부호 있는 거리 함수(SDF)는 공간의 임의 점에서 <b>가장 가까운 표면까지의 거리</b>를 돌려주는 함수입니다(안쪽은 음수). 이 거리만큼은 어느 방향으로 가도 부딪히지 않으므로, 광선을 그 거리씩 성큼성큼 전진시키는 <b>구 추적(sphere tracing)</b>으로 표면을 빠르게 찾습니다. 도형 합성·변형·반복이 함수 연산 몇 개로 끝나 셰이더 아트와 절차적 형태에 많이 쓰입니다.",how:["기본 도형의 거리 함수: 구 length(p)−r, 상자, 토러스 등 (Inigo Quilez 목록).","합집합 min(a,b), 교집합 max(a,b), 차집합 max(a,−b), 부드러운 합집합 smin. 좌표를 mod로 접으면 무한 반복.","구 추적: t += scene(ro + rd·t). 거리가 충분히 작으면 교차, 최대 거리·스텝을 넘으면 실패.","법선 = 거리장의 기울기 (중앙 차분 6번 또는 사면체 4번).","부드러운 그림자: 광원 방향으로 추적하며 min(k·h/t)를 기록 → 표면에 얼마나 가깝게 스쳤는지가 반그림자. AO도 법선 방향 거리 샘플 몇 개."],pros:["메시 없이 부드러운 블렌딩·무한 반복·불리언이 간단","그림자·AO·충돌 검사에 거리장 재활용","무한 디테일 (해상도 제한 없음)"],cons:["픽셀마다 수십~수백 번 함수 평가 → 복잡한 장면은 비쌈","애니메이션·텍스처링이 래스터보다 까다로움","거리 함수가 정확하지 않으면(Lipschitz 위반) 표면을 뚫음"],usedIn:"Shadertoy 데모, Dreams(PS4, SDF 모델링), Claybook, UE의 Mesh Distance Field(그림자·AO·Lumen), 폰트 렌더링(SDF 텍스처).",controls:[{type:"range",key:"k",label:"스무스 유니온 반경 k",min:.01,max:1,step:.01,value:.4},{type:"range",key:"steps",label:"최대 스텝",min:8,max:256,step:8,value:128},{type:"range",key:"slice",label:"단면 높이",min:.05,max:2,step:.05,value:.9}],viewers:i.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>s(o,e.mode)}))};export{p as default};
