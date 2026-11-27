import{m as a}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const l=`
uniform float mode; uniform vec3 lightP; uniform float lightR; uniform float spp;
struct Hit { float t; vec3 n; int m; };
void sph(vec3 ro, vec3 rd, vec3 c, float r, int m, inout Hit h){ vec3 oc = ro - c; float b = dot(oc, rd), q = dot(oc, oc) - r * r, d = b * b - q; if (d < 0.) return; float t = -b - sqrt(d); if (t > 1e-3 && t < h.t){ h.t = t; h.n = normalize(ro + rd * t - c); h.m = m; } }
void box(vec3 ro, vec3 rd, vec3 c, vec3 s, int m, inout Hit h){ vec3 inv = 1. / rd, t0 = (c - s - ro) * inv, t1 = (c + s - ro) * inv; vec3 mn = min(t0, t1), mx = max(t0, t1); float tn = max(max(mn.x, mn.y), mn.z), tf = min(min(mx.x, mx.y), mx.z); if (tn > tf || tf < 1e-3 || tn > h.t || tn < 1e-3) return; h.t = tn; h.n = -sign(rd) * step(mn.yzx, mn) * step(mn.zxy, mn); h.m = m; }
Hit scene(vec3 ro, vec3 rd){
  Hit h; h.t = 1e9; h.m = -1;
  if (rd.y < 0.) { float t = -ro.y / rd.y; if (t > 1e-3) { h.t = t; h.n = vec3(0, 1, 0); h.m = 0; } }
  sph(ro, rd, vec3(-1.2, .7, 0.), .7, 1, h);     // 거울 구
  sph(ro, rd, vec3(.9, .5, .9), .5, 2, h);       // 주황 구
  box(ro, rd, vec3(.6, .8, -1.2), vec3(.5, .8, .5), 3, h); // 상자
  return h;
}
vec3 albedo(int m, vec3 p){ if (m == 0) return mix(vec3(.25), vec3(.7), mod(floor(p.x) + floor(p.z), 2.)); return m == 2 ? vec3(.95, .45, .15) : m == 3 ? vec3(.3, .5, .9) : vec3(.9); }
vec3 sky(vec3 d){ return mix(vec3(.6, .7, .85), vec3(.2, .35, .7), clamp(d.y, 0., 1.)); }
float seed;
float rnd(){ seed += 1.37; return fract(sin(dot(vec3(gl_FragCoord.xy, seed), vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
// 직접광: 래스터는 그림자 없이, RT는 면광원에 그림자 광선
vec3 direct(vec3 p, vec3 n, vec3 alb, bool rtShadow){
  vec3 L = lightP - p; float d = length(L); L /= d;
  float vis = 1.;
  if (rtShadow) {
    vis = 0.;
    for (int i = 0; i < 8; i++){
      if (float(i) >= spp) break;
      vec3 jit = (vec3(rnd(), rnd(), rnd()) - .5) * 2. * lightR;
      vec3 Ls = normalize(lightP + jit - p);
      Hit s = scene(p + n * 1e-3, Ls);
      vis += s.m < 0 || s.t > length(lightP + jit - p) ? 1. : 0.;
    }
    vis /= spp;
  }
  return alb * max(dot(n, L), 0.) * vis * 18. / (d * d);
}
vec3 shade(vec3 ro, vec3 rd, int depth){
  Hit h = scene(ro, rd);
  if (h.m < 0) return sky(rd);
  vec3 p = ro + rd * h.t, n = h.n, alb = albedo(h.m, p);
  bool rtS = mode > .5;
  vec3 c = direct(p, n, alb, rtS);
  // 앰비언트: 래스터는 상수, RT GI 모드는 반구 광선으로 차폐 계산
  float ao = 1.;
  if (mode > 2.5 && depth == 0) {
    ao = 0.;
    for (int i = 0; i < 8; i++){
      if (float(i) >= spp) break;
      vec3 r = normalize(n + (vec3(rnd(), rnd(), rnd()) * 2. - 1.));
      Hit o = scene(p + n * 1e-3, r);
      ao += o.m < 0 || o.t > 1.2 ? 1. : 0.;
    }
    ao /= spp;
  }
  c += alb * sky(n) * .25 * ao;
  return c;
}
void main(){
  seed = fract(uTime * 7.3) * 100.;
  vec3 ro = uCamPos, rd = rayDir();
  Hit h = scene(ro, rd);
  vec3 col;
  if (h.m < 0) col = sky(rd);
  else {
    vec3 p = ro + rd * h.t;
    col = shade(ro, rd, 0);
    float refl = h.m == 1 ? .9 : h.m == 0 ? .3 : 0.;
    if (refl > 0.) {
      vec3 R = reflect(rd, h.n);
      vec3 rc;
      if (mode > 1.5) rc = shade(p + h.n * 1e-3, R, 1);   // 반사 광선: 화면 밖·뒷면도 정확
      else rc = sky(R) * .8;                               // 래스터: 미리 구운 환경맵 근사
      col = mix(col, rc * (h.m == 1 ? vec3(.95, .9, .85) : vec3(1.)), refl);
    }
  }
  // 광원 표시
  vec3 lp = lightP - ro; float tl = dot(lp, rd);
  if (tl > 0. && tl < h.t && length(lp - rd * tl) < lightR) col = vec3(6.);
  gl_FragColor = vec4(acesTone(col), 1.);
  #include <colorspace_fragment>
}`;function d(e,o){return a(e,{cam:[3.2,2.4,4.4],target:[0,.6,0],fov:50,pixelScale:()=>1.5,frag:l,uniforms:{mode:{value:o},lightP:{value:[0,3,1]},lightR:{value:.3},spp:{value:4}},update(r,v,c){const i=e.params.bool("animate")?c*.5:.8;r.lightP.value=[Math.cos(i)*2,2.6,Math.sin(i)*2],r.lightR.value=e.params.num("lightR",.3),r.spp.value=e.params.num("spp",4);const t=r.spp.value,n=[0,t,t+1+t,t+1+t+t][o];e.hud(["래스터: 그림자 없음, 반사 = 환경맵 · 2차 광선 0개/픽셀",`+ 그림자 광선 ${t}개/픽셀 (면광원)`,`+ 반사 광선 1개 (+반사 지점 그림자 ${t}개) · 최대 ${n}개/픽셀`,`+ AO 광선 ${t}개/픽셀 · 최대 ${n}개/픽셀`][o])}})}const m=[{mode:0,title:"래스터 근사만",kind:"before",caption:"1차 가시성은 래스터와 같다. 그림자가 없고, 거울 구와 바닥에는 미리 구운 하늘만 비쳐 주변 물체가 반사되지 않는다."},{mode:1,title:"+ 레이 트레이싱 그림자",kind:"variant",caption:"픽셀마다 면광원 위 무작위 점으로 그림자 광선. 접촉부는 날카롭고 멀어질수록 퍼지는 정확한 소프트 섀도. 샘플이 적으면 노이즈."},{mode:2,title:"+ 레이 트레이싱 반사",kind:"variant",caption:"반사 방향으로 광선을 쏴 실제 장면을 셰이딩. 거울 구에 상자와 다른 구가, 바닥에 물체들이 정확히 비친다 (SSR과 달리 화면 밖도 OK)."},{mode:3,title:"+ 레이 트레이싱 AO",kind:"after",caption:"반구로 짧은 광선을 쏴 주변 차폐까지. 실제 하이브리드 렌더러는 이렇게 효과별로 광선을 고르고 디노이저로 노이즈를 지운다."}],u={layout:"variants",intro:"하이브리드 렌더링은 <b>1차 가시성(눈에 보이는 표면)은 래스터화</b>로 빠르게 구하고, 래스터가 잘 못하는 <b>그림자·반사·AO·GI만 레이 트레이싱</b>으로 계산합니다. G-버퍼의 각 픽셀에서 필요한 효과용 광선만 쏘므로, 완전한 패스 트레이싱보다 훨씬 적은 광선으로 큰 품질 향상을 얻습니다. 효과를 하나씩 켜 봅니다.",how:["래스터로 G-버퍼(위치·법선·재질)를 만든다.","하드웨어 가속 구조(BLAS/TLAS)를 매 프레임 갱신한다.","그림자: 픽셀 → 광원(면 위 무작위 점)으로 광선 1개 이상. 맞으면 그림자.","반사: 거칠기에 따라 지터링한 반사 광선 1개, 맞은 곳을 간단히 셰이딩.","AO/GI: 반구 방향 짧은 광선. 모든 결과를 시공간 디노이저(SVGF·NRD)로 정리해 합성."],pros:["SSR·섀도 맵의 화면 공간·해상도 한계를 정확한 결과로 대체","효과별로 선택적으로 켜 성능 조절 가능","기존 래스터 파이프라인과 콘텐츠를 그대로 활용"],cons:["RT 하드웨어와 BVH 갱신 비용","저샘플 노이즈 → 강력한 디노이저 필수","두 파이프라인을 모두 유지하는 복잡성"],usedIn:"Battlefield V(RT 반사, 2018), Control, Metro Exodus(RTGI), Cyberpunk 2077, Spider-Man Remastered(RT 반사).",controls:[{type:"range",key:"spp",label:"픽셀당 광선 수",min:1,max:8,step:1,value:4},{type:"range",key:"lightR",label:"면광원 반경",min:.02,max:.8,step:.02,value:.3},{type:"toggle",key:"animate",label:"광원 이동",value:!0}],viewers:m.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>d(o,e.mode)}))};export{u as default};
