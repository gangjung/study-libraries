import{m as i}from"./frag-jY9xgSE6.js";import"./three.module-BZgG6AUv.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const m=`
uniform float mode; uniform vec3 sunDir; uniform float mieK; uniform float rayK; uniform float exposure;
const float RP = 6360., RA = 6420., HR = 8., HM = 1.2;
const vec3 BR = vec3(5.8e-3, 13.5e-3, 33.1e-3);
const float BM = 21e-3;
vec2 raySphere(vec3 ro, vec3 rd, float r){ float b = dot(ro, rd), c = dot(ro, ro) - r * r, h = b * b - c; if (h < 0.) return vec2(-1.); h = sqrt(h); return vec2(-b - h, -b + h); }
// 단일 산란 적분: 시선 광선을 따라 각 점에서 태양까지의 광학 깊이를 구해 산란광을 더함
vec3 scatter(vec3 ro, vec3 rd, float tmax, out vec3 trans){
  vec2 at = raySphere(ro, rd, RA);
  float t1 = min(at.y, tmax);
  const int N = 20, NL = 8;
  float dt = t1 / float(N);
  vec3 sumR = vec3(0.), sumM = vec3(0.);
  float odR = 0., odM = 0.;
  float mu = dot(rd, sunDir);
  float phR = 3. / (16. * 3.14159) * (1. + mu * mu);
  float g = .76;
  float phM = 3. / (8. * 3.14159) * ((1. - g * g) * (1. + mu * mu)) / ((2. + g * g) * pow(1. + g * g - 2. * g * mu, 1.5));
  for (int i = 0; i < N; i++){
    vec3 p = ro + rd * (float(i) + .5) * dt;
    float h = length(p) - RP;
    float hr = exp(-h / HR) * dt, hm = exp(-h / HM) * dt;
    odR += hr; odM += hm;
    vec2 ls = raySphere(p, sunDir, RA);
    float dl = ls.y / float(NL), lR = 0., lM = 0.;
    bool blocked = raySphere(p, sunDir, RP).x > 0.;
    for (int j = 0; j < NL; j++){ vec3 q = p + sunDir * (float(j) + .5) * dl; float hh = length(q) - RP; lR += exp(-hh / HR) * dl; lM += exp(-hh / HM) * dl; }
    if (blocked) continue;
    vec3 tau = BR * rayK * (odR + lR) + BM * mieK * 1.1 * (odM + lM);
    vec3 att = exp(-tau);
    sumR += att * hr; sumM += att * hm;
  }
  trans = exp(-(BR * rayK * odR + BM * mieK * 1.1 * odM));
  return 20. * (sumR * BR * rayK * phR + sumM * BM * mieK * phM);
}
void main(){
  vec3 rd = rayDir();
  vec3 ro = vec3(0., RP + .2, 0.);
  vec3 col;
  // 멀리 있는 산맥 실루엣 (방위각에 따라 높이·거리가 다름)
  float az = atan(rd.z, rd.x);
  float mh = .015 + .05 * fbm2(vec2(az * 2.5, 1.3));
  float mdist = 6. + 60. * vnoise(vec2(az * 3.1, 7.));
  bool mountain = rd.y < mh;
  if (mode < .5) {
    // 단순 그라데이션 하늘
    col = mix(vec3(.75, .8, .85), vec3(.25, .45, .85), clamp(rd.y * 2., 0., 1.));
    col += vec3(1., .9, .7) * pow(max(dot(rd, sunDir), 0.), 400.) * 8.;
    if (mountain) col = vec3(.18, .2, .17) * max(sunDir.y, .1) * 2.;
  } else {
    vec3 tr;
    float tmax = 1e9;
    if (mountain) tmax = mdist;
    if (raySphere(ro, rd, RP).x > 0.) tmax = min(tmax, raySphere(ro, rd, RP).x);
    vec3 sky = scatter(ro, rd, tmax, tr);
    if (mountain) {
      // 산의 지면 색: 태양광이 대기를 지나며 붉어진 투과율로 비춤
      vec3 trSun; scatter(ro + rd * tmax, sunDir, 1e9, trSun);
      vec3 ground = vec3(.08, .1, .07) * (max(sunDir.y, 0.) * 8. * trSun + .05);
      col = mode > 2.5 ? ground * tr + sky : ground * 1.6;
    } else {
      col = sky;
      // 태양 원반
      col += tr * vec3(1.) * smoothstep(.9997, .9999, dot(rd, sunDir)) * 40.;
    }
  }
  gl_FragColor = vec4(acesTone(col * exposure), 1.);
  #include <colorspace_fragment>
}`;function s(e,t){return i(e,{cam:[0,0,.01],target:[0,.12,-1],fov:70,pixelScale:()=>2,frag:m,uniforms:{mode:{value:t},sunDir:{value:[0,.2,-1]},mieK:{value:1},rayK:{value:1},exposure:{value:1}},update(a,c,l){const r=e.params.bool("animate")?-6+(Math.sin(l*.15)*.5+.5)*50:e.params.num("sunEl",8),o=r*Math.PI/180,n=e.params.num("sunAz",0)*Math.PI/180;a.sunDir.value=[Math.sin(n)*Math.cos(o),Math.sin(o),-Math.cos(n)*Math.cos(o)],a.mieK.value=t===1?0:e.params.num("mie",1),a.rayK.value=e.params.num("rayleigh",1),a.exposure.value=e.params.num("exposure",1),e.hud(`태양 고도 ${r.toFixed(1)}°${t===1?" · 미 산란 끔":""}`)}})}const u=[{mode:0,title:"그라데이션 하늘",kind:"before",caption:"위아래 두 색을 섞은 하늘. 태양 고도가 바뀌어도 색이 변하지 않고, 먼 산도 가까운 산과 같은 색이다."},{mode:1,title:"레일리 산란만",kind:"variant",caption:"공기 분자가 짧은 파장(파랑)을 강하게 산란 → 낮에는 파란 하늘. 태양이 지평선에 가까우면 긴 대기층을 통과하며 파랑이 빠져 노을이 붉어진다."},{mode:2,title:"레일리 + 미 산란",kind:"variant",caption:"먼지·수증기(에어로졸)는 모든 파장을 앞쪽으로 강하게 산란 → 태양 주변의 하얀 후광과 지평선의 뿌연 띠."},{mode:3,title:"+ 공중 원근 (Aerial Perspective)",kind:"after",caption:"산까지의 공기층도 같은 식으로 적분해 산의 색에 투과율을 곱하고 산란광을 더한다. 먼 산일수록 푸르고 흐려진다."}],f={layout:"variants",intro:"하늘이 파랗고 노을이 붉은 이유는 대기 중 입자가 햇빛을 <b>산란</b>하기 때문입니다. 공기 분자의 <b>레일리 산란</b>은 파장의 4제곱에 반비례해 파랑을 많이 흩뿌리고, 먼지의 <b>미 산란</b>은 파장과 무관하게 앞으로 산란합니다. 시선 광선을 따라 이 두 산란을 적분하면 시간대에 따라 변하는 사실적인 하늘이 됩니다. 드래그로 하늘을 둘러보세요.",how:["행성(반지름 6360km)과 대기층(60km)을 구로 모델링하고, 밀도는 높이에 따라 지수 감소 (레일리 8km, 미 1.2km 척도).","시선 광선을 대기 안에서 N등분해 각 점의 밀도를 누적(광학 깊이)한다.","각 점에서 태양 방향으로 다시 광학 깊이를 구해, 태양빛이 그 점까지 오며 감쇠된 양 exp(−τ)를 계산한다.","산란광 = Σ 감쇠된 태양빛 × 밀도 × 산란 계수 × 위상 함수. 레일리 위상 (1+cos²θ), 미 위상은 Cornette-Shanks (g≈0.76).","실전은 투과율·다중 산란을 2D/3D LUT로 미리 계산해 픽셀당 몇 번의 텍스처 조회로 끝낸다 (Bruneton 2008, Hillaire 2020)."],pros:["시간대·날씨·고도에 따라 물리적으로 일관된 하늘과 안개","공중 원근으로 거대한 스케일감","행성 밖에서 보는 장면까지 하나의 모델로"],cons:["직접 적분은 비싸서 LUT 사전 계산이 필요","단일 산란만으로는 해 진 뒤 하늘이 너무 어두움 → 다중 산란 근사"],usedIn:"Nishita 1993, Bruneton 2008, UE Sky Atmosphere(Hillaire 2020), Unity HDRP Physically Based Sky, Godot PhysicalSkyMaterial, three.js Sky(Preetham 근사).",controls:[{type:"toggle",key:"animate",label:"해 뜨고 지기 자동",value:!0},{type:"range",key:"sunEl",label:"태양 고도 (°) (자동 끔일 때)",min:-6,max:60,step:.5,value:8},{type:"range",key:"sunAz",label:"태양 방위 (°)",min:-90,max:90,step:1,value:0},{type:"range",key:"rayleigh",label:"레일리 계수 배율",min:0,max:3,step:.05,value:1},{type:"range",key:"mie",label:"미(에어로졸) 계수 배율",min:0,max:10,step:.1,value:1},{type:"range",key:"exposure",label:"노출",min:.2,max:4,step:.05,value:1}],viewers:u.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>s(t,e.mode)}))};export{f as default};
