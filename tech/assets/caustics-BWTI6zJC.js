import{m as a}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const r=`
uniform float mode; uniform float depth; uniform float wave; uniform float ior; uniform float cstr;
float height(vec2 p){
  float t = uTime;
  float h = sin(dot(p, vec2(.9, .4)) * 2.1 + t * 1.3) * .5
          + sin(dot(p, vec2(-.5, .8)) * 2.9 + t * 1.7) * .3
          + sin(dot(p, vec2(.2, -1.)) * 4.3 + t * 2.1) * .18
          + (vnoise(p * 3. + t * .4) - .5) * .5
          + sin(dot(p, vec2(.7, .7)) * 7.3 + t * 2.6) * .12 + sin(dot(p, vec2(-.8, .5)) * 9.1 + t * 3.1) * .1;
  return h * .07 * wave;
}
vec3 waterN(vec2 p){
  float e = .01;
  float hx = height(p + vec2(e, 0.)) - height(p - vec2(e, 0.));
  float hz = height(p + vec2(0., e)) - height(p - vec2(0., e));
  return normalize(vec3(-hx / (2. * e), 1., -hz / (2. * e)));
}
// 수면 점 q에서 꺾인 빛이 바닥에 닿는 곳
vec2 hitFloor(vec2 q, vec3 L){
  vec3 n = waterN(q);
  vec3 r = refract(-L, n, 1. / ior);
  return q + r.xz * (depth / max(-r.y, .05));
}
// 커스틱: 빛 다발이 모이는 정도 = 면적 축소율의 역수 (야코비안)
float caustic(vec2 x, vec3 L){
  float e = .02;
  vec2 c = hitFloor(x, L);
  vec2 a = hitFloor(x + vec2(e, 0.), L) - c;
  vec2 b = hitFloor(x + vec2(0., e), L) - c;
  float area = abs(a.x * b.y - a.y * b.x) / (e * e);
  float k = 1. / max(area, .02);
  return clamp(k * k, 0., 16.); // 제곱으로 대비 강조
}
vec3 tiles(vec2 p){
  vec2 g = fract(p * 2.);
  float line = step(.94, max(g.x, g.y));
  float chk = mod(floor(p.x * 2.) + floor(p.y * 2.), 2.);
  vec3 c = mix(vec3(.42, .62, .7), vec3(.34, .54, .66), chk);
  return mix(c, vec3(.15, .3, .4), line);
}
void main(){
  vec3 ro = uCamPos, rd = rayDir();
  vec3 L = normalize(vec3(.3, 1., .2));
  vec3 col = vec3(.1, .12, .16);
  if (rd.y < 0.) {
    float ts = -ro.y / rd.y;           // 수면 y = 0
    vec3 ps = ro + rd * ts;
    bool inPool = abs(ps.x) < 3. && abs(ps.z) < 3.;
    if (inPool) {
      vec3 n = (mode > .5 && mode < 1.5) || mode > 2.5 ? waterN(ps.xz) : vec3(0, 1, 0);
      vec3 rr = refract(rd, n, 1. / ior);
      float tf = depth / max(-rr.y, .05);
      vec2 pf = ps.xz + rr.xz * tf;  // 바닥에 닿는 점 (꺾인 시선)
      vec3 fc = tiles(pf);
      float lit = .55 + .45 * dot(vec3(0, 1, 0), L);
      if (mode > 1.5) lit *= .3 + cstr * .7 * caustic(pf, L);
      // 물을 지나며 붉은빛이 먼저 흡수됨
      vec3 absorb = exp(-vec3(.45, .12, .08) * (tf + depth));
      col = fc * lit * absorb;
      if (mode > 2.5) {
        // 수면 반사 (프레넬)
        vec3 refl = reflect(rd, waterN(ps.xz));
        float F = .02 + .98 * pow(1. - max(dot(-rd, waterN(ps.xz)), 0.), 5.);
        vec3 sky = mix(vec3(.6, .7, .8), vec3(.3, .5, .8), refl.y) + vec3(4.) * pow(max(dot(refl, L), 0.), 300.);
        col = mix(col, sky, F);
      }
    } else {
      // 풀 테두리 데크
      col = vec3(.5, .45, .4) * (.6 + .4 * vnoise(ps.xz * 6.));
    }
  } else col = mix(vec3(.6, .7, .8), vec3(.3, .5, .8), rd.y);
  gl_FragColor = vec4(acesTone(col * 1.1), 1.);
  #include <colorspace_fragment>
}`;function c(e,t){return a(e,{cam:[0,3.6,4.2],target:[0,-.5,0],frag:r,uniforms:{mode:{value:t},depth:{value:1},wave:{value:1},ior:{value:1.33},cstr:{value:1}},update(o){o.depth.value=e.params.num("depth",1),o.wave.value=e.params.num("wave",1),o.ior.value=e.params.num("ior",1.33),o.cstr.value=e.params.num("cstr",1),e.hud(["물 효과 없음","굴절만 (시선이 꺾임)","커스틱만 (빛이 모임)","굴절 + 커스틱 + 반사"][t])}})}const l=[{mode:0,title:"물 없음",kind:"before",caption:"바닥 타일을 그대로 그린 것. 물이 있다는 단서가 색 감쇠뿐이다."},{mode:1,title:"굴절",kind:"variant",caption:"시선이 물결치는 수면에서 스넬의 법칙으로 꺾여 바닥 타일 줄이 일렁인다. 각도에 따라 바닥이 실제보다 얕아 보인다."},{mode:2,title:"커스틱",kind:"variant",caption:"태양빛도 수면에서 꺾이는데, 볼록한 곳은 빛을 모으고 오목한 곳은 흩는다. 빛 다발이 좁은 면적에 모인 곳이 밝은 그물 무늬. 밝기 = 면적 축소율의 역수."},{mode:3,title:"굴절 + 커스틱 + 반사",kind:"after",caption:"둘을 합치고 수면 프레넬 반사를 더하면 수영장이 된다. 비스듬히 볼수록 반사가 강해져 바닥이 덜 보인다."}],m={layout:"compare",intro:'빛이 물·유리 같은 투명 표면을 지날 때 <b>굴절</b>로 방향이 꺾이면서, 곡면이 빛을 렌즈처럼 모아 바닥에 밝은 그물 무늬를 만드는 것이 <b>커스틱</b>입니다. 정확히 하려면 광선 추적이 필요하지만, 게임에서는 "수면 점이 빛을 어디로 보내는가"의 면적 변화를 계산하거나 애니메이션 텍스처를 투영해 흉내 냅니다.',how:["굴절: 시선 광선이 수면 법선 n에서 refract(d, n, 1/1.33)로 꺾인 뒤 바닥과 교차한 위치의 색을 쓴다. 래스터 방식은 화면 공간에서 법선만큼 UV를 밀어 배경 텍스처를 샘플링.","커스틱: 수면 격자의 각 점을 빛 방향으로 굴절시켜 바닥에 투영 → 변형된 격자의 삼각형 면적이 줄어든 만큼 밝게(원래 면적/새 면적).","실시간 근사: 위 결과를 텍스처로 구워 바닥에 투영(조명 쿠키)하거나, 이 데모처럼 야코비안을 셰이더에서 바로 계산.","흡수: 물속 거리만큼 빨강→초록→파랑 순으로 감쇠 (비어 법칙).","수면 반사는 프레넬로 섞는다 — 내려다보면 투명, 수평으로 보면 거울."],pros:["물·유리의 존재감이 크게 향상","근사 방식은 비용이 작음","조명 쿠키 방식은 어떤 바닥에도 적용"],cons:["정확한 커스틱은 광자 매핑·경로 추적 필요","화면 공간 굴절은 화면 밖 정보가 없음","여러 번 꺾이는 경로(물병 속 등)는 어려움"],usedIn:"수중·수영장·수족관 장면 전반(대개 애니메이션 커스틱 텍스처 투영), CryEngine 계열 물의 커스틱 옵션, Evan Wallace WebGL Water(2011, 실시간 면적 계산 데모).",controls:[{type:"range",key:"depth",label:"물 깊이",min:.2,max:2.5,step:.05,value:1},{type:"range",key:"wave",label:"물결 세기",min:0,max:3,step:.1,value:1},{type:"range",key:"ior",label:"굴절률",min:1,max:1.8,step:.01,value:1.33},{type:"range",key:"cstr",label:"커스틱 세기",min:0,max:2,step:.05,value:1}],viewers:l.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>c(t,e.mode)}))};export{m as default};
