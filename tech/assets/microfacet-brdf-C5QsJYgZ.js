import{u,g as i}from"./three.module-BZgG6AUv.js";import{m as v}from"./three-viewer-0rZIEDzf.js";import{b as f,l as p,F,W as h}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const k=`
${F}
uniform vec3 L; uniform vec3 albedo; uniform float rough; uniform float metal; uniform float mode; uniform vec3 camP;
const float PI = 3.14159265;
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW), H = normalize(L + V);
  float NdL = max(dot(N, L), 0.), NdV = max(dot(N, V), 1e-3), NdH = max(dot(N, H), 0.), VdH = max(dot(V, H), 0.);
  float r = max(rough, .03), a = r * r, a2 = a * a;
  // D: GGX 법선 분포 — 하프 벡터 방향을 향한 미세면의 비율
  float dd = NdH * NdH * (a2 - 1.) + 1.;
  float D = a2 / (PI * dd * dd);
  // G: Smith-Schlick-GGX — 미세면끼리 가리고(그림자) 막는(마스킹) 비율
  float k = (r + 1.) * (r + 1.) / 8.;
  float G = (NdL / (NdL * (1. - k) + k)) * (NdV / (NdV * (1. - k) + k));
  // F: Schlick 프레넬 — 금속은 F0가 알베도 색, 비금속은 약 4%
  vec3 F0 = mix(vec3(.04), albedo, metal);
  vec3 F = F0 + (1. - F0) * pow(1. - VdH, 5.);
  vec3 spec = D * G * F / (4. * NdL * NdV + 1e-4);
  vec3 kd = (1. - F) * (1. - metal);
  vec3 col;
  if (mode < .5) col = vec3(D * NdL * .5);
  else if (mode < 1.5) col = vec3(G);
  else if (mode < 2.5) col = F;
  else if (mode < 3.5) {
    vec3 R = reflect(-V, N);
    vec3 env = mix(skyEnv(R), vec3(.35, .4, .48), clamp(r * 1.3, 0., 1.));
    vec3 Fe = F0 + (max(vec3(1. - r), F0) - F0) * pow(1. - NdV, 5.);
    col = (kd * albedo / PI + spec) * NdL * 3.5 + env * Fe * .6 + albedo * (1. - metal) * .06;
  } else {
    // 비교: 정규화 없는 블린-퐁 (거칠기를 대략 지수로 환산)
    float n = 2. / max(a2, 1e-3) - 2.;
    col = albedo * NdL + vec3(pow(NdH, n)) * NdL;
  }
  gl_FragColor = vec4(mode > 2.5 ? acesTone(col) : col, 1.);
  #include <colorspace_fragment>
}`;function N(e,t){return v(e,{antialias:!0,cam:[0,2.6,5.2],target:[0,.8,0]},({scene:c,camera:d})=>{const n=[],{tick:s}=f(c,(m,l)=>{const a=new u({uniforms:{L:{value:new i},albedo:{value:m.clone().convertSRGBToLinear()},rough:{value:.4},metal:{value:0},mode:{value:t},camP:{value:new i}},vertexShader:h,fragmentShader:k});return a.userData.floor=l===3,n.push(a),a});return{update(m,l){const a=p(l,e.params.bool("animate"),e.params.num("elev",30)),r=e.params.num("rough",.35);for(const o of n)o.uniforms.L.value.copy(a),o.uniforms.rough.value=o.userData.floor?Math.max(.5,r):r,o.uniforms.metal.value=o.userData.floor?0:e.params.bool("metal")?1:0,o.uniforms.camP.value.copy(d.position);s(l),e.hud([`D(h) · GGX α=${(r*r).toFixed(3)}`,"G(l,v) · 흰색 = 가림 없음",`F(v,h) · F0=${e.params.bool("metal")?"알베도(금속)":"0.04(비금속)"}`,"D·G·F / (4·NdL·NdV) + 확산","블린-퐁 (정규화 없음)"][t])}}})}const b=[{mode:4,title:"비교: 블린-퐁",kind:"before",caption:"거칠기를 올리면 하이라이트가 커지면서 전체가 같이 밝아진다. 에너지가 보존되지 않는다."},{mode:0,title:"D — 법선 분포 (GGX)",kind:"variant",caption:"미세면 중 하프 벡터를 향한 비율. 거칠수록 넓고 낮게, 매끈할수록 좁고 높게 — 총 에너지는 일정하다. GGX는 긴 꼬리가 있어 하이라이트 주변 번짐이 사실적."},{mode:1,title:"G — 기하 감쇠 (Smith)",kind:"variant",caption:"미세면이 서로를 가려 빛이 빠져나가지 못하는 비율. 가장자리(스치는 각도)와 거친 표면에서 어두워진다."},{mode:2,title:"F — 프레넬 (Schlick)",kind:"variant",caption:"정면에서는 F0(비금속 4%), 스치는 각도로 갈수록 100% 반사. 금속 토글을 켜면 F0가 색을 가진다."},{mode:3,title:"Cook-Torrance 합성",kind:"after",caption:"세 항을 곱하고 4·NdL·NdV로 나눈 정반사 + (1−F)만큼의 확산. 거칠기·금속성 두 값만으로 플라스틱부터 금속까지 일관되게 표현된다."}],V={layout:"variants",intro:"PBR의 핵심인 <b>마이크로패싯 이론</b>: 표면은 눈에 보이지 않는 작은 거울(미세면)들의 집합이고, 거칠기는 그 미세면 방향이 얼마나 흩어져 있는지를 뜻합니다. Cook-Torrance BRDF는 정반사를 <b>D</b>(분포) × <b>G</b>(가림) × <b>F</b>(프레넬) 세 항으로 나눕니다. 각 항을 따로 시각화하고 합성 결과와 비교합니다.",how:["f_spec = D(h)·G(l,v)·F(v,h) / (4·(n·l)·(n·v)). h는 빛과 시선의 하프 벡터.","D(GGX): α²/(π((n·h)²(α²−1)+1)²), α = 거칠기². 아티스트 거칠기를 제곱해 지각적으로 고르게 만든다.","G(Smith): 빛 방향과 시선 방향 각각의 가림 확률을 곱한다. k = (r+1)²/8 (직접광용 UE4 근사).","F(Schlick): F0 + (1−F0)(1−v·h)⁵. 비금속 F0 ≈ 0.04, 금속은 F0 = 베이스 컬러이고 확산이 없다.","확산은 (1−F)(1−metal)·albedo/π. 정반사로 나간 에너지만큼 확산을 줄여 총 에너지를 보존한다."],pros:["물리적으로 그럴듯하고 모든 조명 환경에서 일관된 결과","아티스트 파라미터가 2개(거칠기, 금속성)로 단순","측정된 실제 재질과 잘 맞음"],cons:["블린-퐁보다 연산이 많음","다중 산란을 무시해 거친 금속이 너무 어두움 → 에너지 보상 항(Kulla-Conty) 추가"],usedIn:"Disney BRDF(2012), UE4(2013) 이후 모든 PBR 엔진: Unreal, Unity HDRP/URP, Frostbite, glTF 표준 재질.",controls:[{type:"range",key:"rough",label:"거칠기 (roughness)",min:.03,max:1,step:.01,value:.35},{type:"toggle",key:"metal",label:"금속 (metallic = 1)",value:!1},{type:"range",key:"elev",label:"광원 높이 (°)",min:3,max:85,step:1,value:30},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:b.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>N(t,e.mode)}))};export{V as default};
