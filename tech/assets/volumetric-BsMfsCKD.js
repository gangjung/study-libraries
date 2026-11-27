import{m as r}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const s=`
uniform float mode; uniform float density; uniform float steps; uniform vec3 sunDir; uniform float aniso; uniform float heightFall;
float sdBox(vec3 p, vec3 b){ vec3 q = abs(p) - b; return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.); }
float map(vec3 p){
  float d = p.y; // 바닥
  // 창문 3개가 뚫린 벽 (z = -4)
  float wall = sdBox(p - vec3(0., 3., -4.), vec3(8., 3., .2));
  for (int i = 0; i < 3; i++) wall = max(wall, -sdBox(p - vec3(-3. + float(i) * 3., 3.3, -4.), vec3(.6, 1.1, .5)));
  d = min(d, wall);
  // 기둥과 물체
  for (int i = 0; i < 4; i++) d = min(d, sdBox(p - vec3(-4.5 + float(i) * 3., 1.5, 1.), vec3(.25, 1.5, .25)));
  d = min(d, length(p - vec3(1.2, .8, -1.)) - .8);
  return d;
}
vec3 calcN(vec3 p){ vec2 e = vec2(.002, 0.); return normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx))); }
// 최소 걸음을 작게 둬야 구·기둥 윤곽을 스치는 광선이 물체를 건너뛰어 그림자 속에 밝은 선이 생기지 않는다
float shadow(vec3 o, vec3 d){ float t = .05; for (int i = 0; i < 64; i++){ float h = map(o + d * t); if (h < .002) return 0.; t += clamp(h, .004, .5); if (t > 20.) break; } return 1.; }
float shadowFast(vec3 o, vec3 d){ float t = .05; for (int i = 0; i < 20; i++){ float h = map(o + d * t); if (h < .01) return 0.; t += max(h, .15); if (t > 14.) break; } return 1.; }
float hg(float c, float g){ float g2 = g * g; return (1. - g2) / (4. * 3.14159 * pow(1. + g2 - 2. * g * c, 1.5)); }
float dens(vec3 p){ return density * (mode > 1.5 ? exp(-max(p.y, 0.) * heightFall) : 1.); }
void main(){
  vec3 ro = uCamPos, rd = rayDir();
  float t = 0.; bool hit = false;
  for (int i = 0; i < 160; i++){ float h = map(ro + rd * t); if (h < .001) { hit = true; break; } t += h; if (t > 40.) break; }
  vec3 sunCol = vec3(6., 5.2, 4.);
  vec3 col = vec3(.02, .025, .035); // 실내 어둠 (벽 너머는 해가 비침)
  if (hit) {
    vec3 p = ro + rd * t, n = calcN(p);
    float sh = shadow(p + n * .01, sunDir);
    vec3 alb = p.y < .01 ? vec3(.5) : vec3(.6, .55, .5);
    col = alb * (sunCol * max(dot(n, sunDir), 0.) * sh + vec3(.04, .05, .07));
  } else t = 40.;
  if (mode > .5 && mode < 1.5) {
    // 거리 안개: 깊이만으로 일정한 색을 섞음 (빛줄기 없음)
    float f = 1. - exp(-density * 2. * t);
    col = mix(col, vec3(.25, .27, .3), f);
  } else if (mode > 1.5) {
    // 볼류메트릭: 광선을 따라 매질을 샘플하며 각 점에서 태양 그림자 광선 → 산란 적분
    float n = steps, dt = min(t, 25.) / n;
    float jitter = hash12(gl_FragCoord.xy + fract(uTime) * 61.);
    vec3 acc = vec3(0.); float T = 1.;
    float ph = hg(dot(rd, sunDir), aniso);
    for (int i = 0; i < 96; i++){
      if (float(i) >= n) break;
      vec3 q = ro + rd * (float(i) + jitter) * dt;
      float sig = dens(q);
      float vis = mode > 2.5 ? shadowFast(q, sunDir) : 1.;
      acc += T * sig * dt * sunCol * ph * vis * 4.;
      T *= exp(-sig * dt);
    }
    col = col * T + acc;
  }
  gl_FragColor = vec4(acesTone(col), 1.);
  #include <colorspace_fragment>
}`;function c(e,a){return r(e,{cam:[0,1.8,7],target:[0,2,-2],fov:60,pixelScale:()=>2,frag:s,uniforms:{mode:{value:a},density:{value:.08},steps:{value:48},sunDir:{value:[0,.4,-1]},aniso:{value:.6},heightFall:{value:.3}},update(t,p,l){t.density.value=e.params.num("density",.08),t.steps.value=e.params.num("steps",48),t.aniso.value=e.params.num("aniso",.6);const i=e.params.bool("animate")?Math.sin(l*.3)*.5:.2,o=e.params.num("sunEl",22)*(Math.PI/180),n=[Math.sin(i)*Math.cos(o),Math.sin(o),-Math.cos(i)*Math.cos(o)];t.sunDir.value=n,e.hud(["매질 없음","깊이 기반 지수 안개","균일 산란 (그림자 무시)",`레이마칭 ${t.steps.value}스텝 × 그림자 광선`][a])}})}const m=[{mode:0,title:"매질 없음",kind:"before",caption:"창문으로 해가 들어오지만 공기가 완전히 투명해 빛줄기가 보이지 않는다."},{mode:1,title:"거리 안개",kind:"variant",caption:"거리에 따라 회색을 섞는 고전 안개. 공간감은 생기지만 빛과 그림자를 모른다."},{mode:2,title:"산란만 (그림자 없음)",kind:"variant",caption:"광선을 따라 매질에서 산란되는 빛을 적분. 햇빛 쪽을 보면 밝아지지만(위상 함수) 벽에 가려진 공기까지 빛나 빛줄기가 없다."},{mode:3,title:"볼류메트릭 라이팅",kind:"after",caption:"각 샘플 점에서 태양까지 그림자 광선을 쏴 가려진 공기는 어둡게. 창문으로 들어오는 빛줄기와 기둥 그림자가 공기 중에 생긴다."}],h={layout:"variants",intro:"안개·먼지·연기 같은 <b>참여 매질</b>에서는 빛이 공기 중의 입자에 부딪혀 눈으로 산란됩니다. 볼류메트릭 라이팅은 시선 광선을 따라 공간을 여러 점에서 샘플하며, 각 점이 광원에서 받는 빛(그림자 포함)과 흡수를 적분합니다. 창문으로 쏟아지는 빛줄기(갓 레이)가 공기 중에 실제로 그려집니다.",how:["카메라 광선을 따라 N개 지점을 전진하며(레이마칭) 각 지점의 밀도 σ를 구한다 (균일·높이 감쇠·노이즈).","각 지점에서 광원 방향 그림자를 확인한다 (섀도 맵 조회 또는 그림자 광선).","산란광 += 투과율 T × σ × 광원 색 × 위상 함수(Henyey-Greenstein) × 그림자 × Δt, 그리고 T *= exp(−σΔt).","최종 = 표면 색 × T + 산란광. 스텝마다 지터를 주고 TAA로 평균해 적은 스텝으로도 매끈하게.","실전은 카메라 절두체에 맞춘 3D 텍스처(프록셀(froxel) 볼륨, 160×90×64 등)에 산란을 미리 계산해 재사용한다."],pros:["빛줄기·안개 속 그림자로 분위기와 깊이감이 크게 향상","광원마다 자연스럽게 동작 (스포트라이트 원뿔 등)"],cons:["샘플 × 그림자 조회 비용이 큼","스텝이 적으면 줄무늬 → 지터 + 시간 누적 필수","얇은 빛줄기는 해상도 한계로 번짐"],usedIn:"Killzone Shadow Fall, AC4 Black Flag(프록셀(froxel) 볼륨, Wronski 2014), Red Dead Redemption 2, UE Volumetric Fog, Unity HDRP.",controls:[{type:"range",key:"density",label:"매질 밀도 σ",min:.01,max:.3,step:.005,value:.08},{type:"range",key:"steps",label:"레이마칭 스텝",min:4,max:96,step:4,value:48},{type:"range",key:"aniso",label:"전방 산란 g (HG)",min:-.5,max:.95,step:.05,value:.6},{type:"range",key:"sunEl",label:"태양 고도 (°)",min:5,max:60,step:1,value:22},{type:"toggle",key:"animate",label:"태양 이동",value:!0}],viewers:m.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:a=>c(a,e.mode)}))};export{h as default};
