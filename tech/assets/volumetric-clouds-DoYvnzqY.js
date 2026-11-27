import{m as a}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const r=`
uniform float mode; uniform float coverage; uniform float absorb; uniform float steps; uniform float sunElev; uniform float wind;
const float BOT = 3.0, TOP = 7.0;
vec3 sunDir(){ float e = radians(sunElev); return normalize(vec3(cos(e) * .8, sin(e), cos(e) * -.6)); }
float density(vec3 p){
  vec3 q = p * .16 + vec3(uTime * .02 * wind, 0., uTime * .01 * wind);
  float h = clamp((p.y - BOT) / (TOP - BOT), 0., 1.);
  // 높이 프로파일: 아래는 평평하게 잘리고 위로 갈수록 둥글게 줄어듦 (적운 모양)
  float shape = smoothstep(0., .15, h) * smoothstep(1., .45, h);
  float base = fbm3(q);
  float det = fbm3(q * 3.1 + 7.) * .25;
  return clamp((base - det * h - (1. - coverage)) * shape * 3., 0., 1.);
}
// 광원 마칭용 저렴한 밀도 (세부 침식 생략)
float densityLo(vec3 p){
  vec3 q = p * .16 + vec3(uTime * .02 * wind, 0., uTime * .01 * wind);
  float h = clamp((p.y - BOT) / (TOP - BOT), 0., 1.);
  return clamp((fbm3(q) - (1. - coverage)) * smoothstep(0., .15, h) * smoothstep(1., .45, h) * 3., 0., 1.);
}
// 광원 쪽으로 몇 걸음 더 마칭해 빛이 얼마나 가려지는지 (비어-램버트)
float lightMarch(vec3 p){
  vec3 L = sunDir(); float s = 0.;
  for (int i = 0; i < 6; i++){ p += L * .45; s += densityLo(p) * .45; }
  return s;
}
float hg(float c, float g){ float g2 = g * g; return (1. - g2) / (4. * 3.14159 * pow(1. + g2 - 2. * g * c, 1.5)); }
vec3 sky(vec3 rd){
  vec3 L = sunDir();
  vec3 c = mix(vec3(.55, .7, .9), vec3(.18, .35, .7), clamp(rd.y * 1.4, 0., 1.));
  c += vec3(1., .85, .6) * pow(max(dot(rd, L), 0.), 400.) * 20.;
  c += vec3(1., .7, .4) * pow(max(dot(rd, L), 0.), 8.) * .25;
  return c;
}
void main(){
  vec3 ro = uCamPos, rd = rayDir();
  vec3 col = sky(rd);
  if (rd.y < 0.) { col = mix(vec3(.12, .14, .1), vec3(.3, .35, .4), exp(rd.y * 8.)); }
  else {
    float t0 = (BOT - ro.y) / rd.y, t1 = (TOP - ro.y) / rd.y;
    t0 = max(t0, 0.); t1 = min(t1, 80.);
    int N = mode < .5 ? 48 : (mode < 2.5 ? int(steps) : 64);
    float dt = (t1 - t0) / float(N);
    // 지터: 픽셀마다 시작점을 무작위로 밀어 계단 무늬를 노이즈로 바꿈
    float jit = (mode > 1.5 && mode < 2.5) ? hash12(gl_FragCoord.xy + fract(uTime) * 91.) : (mode > 2.5 ? hash12(gl_FragCoord.xy) : .5);
    float t = t0 + dt * jit;
    float T = 1.; vec3 L = vec3(0.);
    vec3 S = sunDir();
    float cosT = dot(rd, S);
    float phase = mix(hg(cosT, .6), hg(cosT, -.25), .3) * 4. * 3.14159;
    for (int i = 0; i < 128; i++){
      if (i >= N || T < .01) break;
      vec3 p = ro + rd * t;
      float d = density(p);
      if (d > .001) {
        float ext = d * absorb;
        if (mode < .5) {
          // 조명 없음: 밀도를 흰색으로 누적만
          L += T * ext * dt * vec3(.85);
        } else {
          float sh = exp(-lightMarch(p) * absorb);
          // 파우더 효과: 두꺼운 곳 가장자리가 어두워지는 현상 근사
          float powder = mode > 2.5 ? 1. - exp(-d * absorb * 4.) : 1.;
          vec3 sun = vec3(1., .93, .8) * 3. * sh * phase * powder;
          vec3 amb = mix(vec3(.35, .42, .55), vec3(.8, .85, .95), (p.y - BOT) / (TOP - BOT)) * .9;
          // 에너지 보존 적분: (S − S·e^{−σΔt}) / σ
          float tr = exp(-ext * dt);
          L += T * (sun + amb) * (1. - tr) ;
          T *= tr;
          t += dt; continue;
        }
        T *= exp(-ext * dt);
      }
      t += dt;
    }
    col = col * T + L;
    // 원경 대기 원근
    col = mix(col, sky(rd), clamp(t0 / 90., 0., 1.));
  }
  gl_FragColor = vec4(acesTone(col * .9), 1.);
  #include <colorspace_fragment>
}`;function i(e,t){return a(e,{cam:[0,.6,0],pixelScale:()=>Math.min(window.devicePixelRatio||1,2),target:[.2,1.1,-3],frag:r,uniforms:{mode:{value:t},coverage:{value:.5},absorb:{value:1.2},steps:{value:12},sunElev:{value:20},wind:{value:1}},update(o){o.coverage.value=e.params.num("coverage",.5),o.absorb.value=e.params.num("absorb",1.2),o.steps.value=e.params.num("steps",12),o.sunElev.value=e.params.num("sun",20),o.wind.value=e.params.num("wind",1),e.hud(t===0?"밀도 누적만 (48스텝)":t===3?"64스텝 + 광원 마칭 + HG 위상 + 파우더":`${e.params.num("steps",12)}스텝 + 광원 마칭`+(t===2?" + 지터":""))}})}const l=[{mode:0,title:"밀도만 (조명 없음)",kind:"before",caption:"노이즈 밀도를 광선 따라 더하기만 하면 솜 뭉치처럼 평평하다. 빛이 구름을 통과하며 줄어드는 것을 계산하지 않았다."},{mode:1,title:"적은 스텝 + 광원 감쇠",kind:"variant",caption:"샘플마다 태양 쪽으로 몇 걸음 더 가서 가림을 계산(비어 법칙) — 아래쪽이 어둡고 입체감이 생긴다. 스텝이 적으면 층층이 계단 무늬(밴딩)가 보인다."},{mode:2,title:"적은 스텝 + 지터",kind:"variant",caption:"같은 스텝 수지만 픽셀마다 시작점을 무작위로 민다. 계단이 미세한 노이즈로 바뀌고, 실제 게임에선 TAA가 이 노이즈를 시간에 걸쳐 평균낸다."},{mode:3,title:"고품질 (위상 함수 + 파우더)",kind:"after",caption:"헤니-그린스타인 위상 함수로 태양 쪽을 볼 때 가장자리가 빛나는 은빛 테두리, 파우더 항으로 두꺼운 곳의 어두운 주름. 태양 고도를 낮춰 보자."}],d={layout:"variants",intro:"볼류메트릭 구름은 하늘에 <b>3D 노이즈 밀도장</b>을 두고 화면 픽셀마다 광선을 따라 레이마칭하며, 각 지점에서 태양빛이 구름을 뚫고 얼마나 도달하는지(비어-램버트 감쇠)와 산란 방향(위상 함수)을 계산합니다. 날씨 맵으로 구름 양을 바꾸고 바람으로 흘려 보내 시간대·날씨 시스템과 자연스럽게 연결됩니다.",how:["구름 층(예: 1.5~4km)과 광선의 교차 구간을 구한다.","구간을 N스텝으로 나눠 밀도 = 저주파 펄린-월리 노이즈 − 고주파 침식 노이즈, × 높이 프로파일 × 날씨 맵.","밀도가 있는 곳에서 태양 방향으로 짧게 마칭 → 투과율 e^{−σ·광학 깊이}.","산란 = 태양빛 × 투과율 × 위상 함수(HG, 앞쪽 산란) + 주변광. 시선 방향 투과율 T를 곱해 누적, T≈0이면 중단.","비용 절감: 1/4 해상도 + 시간적 재투영(프레임마다 일부 픽셀만 갱신), 지터 + TAA, 빈 공간 큰 걸음."],pros:["시간·날씨·고도에 따라 자연스럽게 변화","비행 중 구름 속 진입도 가능","실사 수준 빛 산란"],cons:["픽셀당 수십~수백 샘플로 매우 비쌈","저해상도·재투영의 잔상","아티스트가 원하는 모양을 직접 그리기 어려움"],usedIn:"Horizon Zero Dawn(Schneider, SIGGRAPH 2015), Frostbite(Hillaire 2016), Red Dead Redemption 2, Microsoft Flight Simulator, UE Volumetric Cloud, Unity HDRP Volumetric Clouds.",controls:[{type:"range",key:"coverage",label:"구름 양",min:.2,max:.9,step:.02,value:.5},{type:"range",key:"absorb",label:"흡수 계수",min:.2,max:4,step:.1,value:1.2},{type:"range",key:"steps",label:"스텝 수 (가운데 두 뷰어)",min:4,max:64,step:2,value:12},{type:"range",key:"sun",label:"태양 고도 (°)",min:2,max:80,step:1,value:20},{type:"range",key:"wind",label:"바람",min:0,max:6,step:.5,value:1}],viewers:l.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>i(t,e.mode)}))};export{d as default};
