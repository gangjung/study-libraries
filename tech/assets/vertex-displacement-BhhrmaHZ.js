import{p as y,g as v,u as s,M as p,P as w}from"./three.module-BZgG6AUv.js";import{m as z}from"./three-viewer-0rZIEDzf.js";const W=`
uniform float uTime; uniform float amp;
const int NW = 4;
vec2 K[NW]; float A[NW]; float W[NW];
void initW(){
  K[0] = vec2(1.3, .4); A[0] = .30; W[0] = 1.1;
  K[1] = vec2(-.5, 1.7); A[1] = .18; W[1] = 1.6;
  K[2] = vec2(2.6, -1.9); A[2] = .07; W[2] = 2.3;
  K[3] = vec2(-3.7, -2.8); A[3] = .035; W[3] = 3.1;
}
float height(vec2 p){ float h = 0.; for (int i = 0; i < NW; i++) h += A[i] * sin(dot(K[i], p) + W[i] * uTime); return h * amp; }
vec2 grad(vec2 p){ vec2 g = vec2(0.); for (int i = 0; i < NW; i++) g += A[i] * K[i] * cos(dot(K[i], p) + W[i] * uTime); return g * amp; }
`,f=`
${W}
uniform float mode;
varying vec3 vN; varying vec3 vW;
void main(){
  initW();
  vec3 p = position;            // 평면 (x, 0, z)
  p.y = height(p.xz);
  vec3 n = normal;              // 0) 원래 법선 그대로 = (0,1,0)
  if (mode > .5 && mode < 1.5) {
    // 1) 유한 차분: 이웃 두 점의 높이를 더 계산해 접선 → 외적
    float e = .02;
    vec3 px = vec3(p.x + e, height(p.xz + vec2(e, 0.)), p.z);
    vec3 pz = vec3(p.x, height(p.xz + vec2(0., e)), p.z + e);
    n = normalize(cross(pz - p, px - p));
  } else if (mode > 1.5 && mode < 2.5) {
    // 2) 해석적 미분: h의 기울기 → n = (−∂h/∂x, 1, −∂h/∂z)
    vec2 g = grad(p.xz);
    n = normalize(vec3(-g.x, 1., -g.y));
  }
  vN = normalize(mat3(modelMatrix) * n);
  vec4 w = modelMatrix * vec4(p, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,N=`
uniform float mode; uniform vec3 L; uniform vec3 camP; uniform float wire;
varying vec3 vN; varying vec3 vW;
void main(){
  vec3 N = normalize(vN);
  // 3) 화면 공간 미분: 이웃 픽셀과의 위치 차이로 면 법선 (각진 로우폴리 느낌)
  if (mode > 2.5) N = normalize(cross(dFdx(vW), dFdy(vW)));
  vec3 V = normalize(camP - vW), H = normalize(L + V);
  float d = max(dot(N, L), 0.);
  float s = pow(max(dot(N, H), 0.), 120.);
  float f = pow(1. - max(dot(N, V), 0.), 4.);
  vec3 deep = vec3(.02, .1, .2), shallow = vec3(.05, .35, .5);
  vec3 col = mix(deep, shallow, d) + vec3(s) * 1.5 + vec3(.5, .7, .9) * f * .5;
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function b(e,i){return z(e,{antialias:!0,cam:[5.5,3.2,6.5],target:[0,0,0]},({scene:r,camera:u})=>{r.background=new y(10467535);let o=e.params.num("res",96);const a={uTime:{value:0},amp:{value:1},mode:{value:["stale","fd","analytic","deriv"].indexOf(i)},L:{value:new v(.3,.5,-.8).normalize()},camP:{value:new v},wire:{value:0}},g=new s({uniforms:a,vertexShader:f,fragmentShader:N}),l=()=>new w(10,10,o,o).rotateX(-Math.PI/2),t=new p(l(),g);r.add(t);const c=new s({uniforms:a,vertexShader:f,fragmentShader:"void main(){ gl_FragColor = vec4(1., 1., 1., .25); }",wireframe:!0,transparent:!0}),n=new p(t.geometry,c);r.add(n);const h=e.params.on(d=>{d==="res"&&(o=e.params.num("res",96),t.geometry.dispose(),t.geometry=l(),n.geometry=t.geometry)});return{update(d,x){a.uTime.value=x,a.amp.value=e.params.num("amp",1),a.camP.value.copy(u.position),n.visible=e.params.bool("wire");const m=(o+1)*(o+1);e.hud({stale:`높이만 바꾸고 법선은 (0,1,0) 그대로 · 정점 ${m.toLocaleString()}`,fd:`유한 차분: 정점마다 높이 함수 3회 평가 · 정점 ${m.toLocaleString()}`,analytic:`해석적 미분: 높이 1회 + 기울기 1회 · 정점 ${m.toLocaleString()}`,deriv:"픽셀 셰이더 dFdx/dFdy로 면 법선 (보간 없음 → 각진 면)"}[i])},dispose(){h(),c.dispose()}}})}const F=[{mode:"stale",title:"법선 갱신 안 함",kind:"before",caption:"정점 셰이더에서 높이만 바꾸면 법선은 여전히 평면의 위쪽. 모양은 출렁이는데 빛은 평평한 바닥처럼 받아 물결이 보이지 않는다(실루엣만 움직임)."},{mode:"fd",title:"유한 차분 법선",kind:"variant",caption:"정점 셰이더는 이웃 정점을 모르므로, 옆으로 조금 떨어진 두 점의 높이를 직접 다시 계산해 접선을 만들고 외적. 어떤 높이 함수에도 쓸 수 있지만 계산이 세 배."},{mode:"analytic",title:"해석적 미분",kind:"after",caption:"높이 함수를 미분할 수 있으면(사인 합·게르스트너 파) 기울기를 바로 계산: n = normalize(−∂h/∂x, 1, −∂h/∂z). 가장 정확하고 빠르다."},{mode:"deriv",title:"화면 공간 미분",kind:"variant",caption:"픽셀 셰이더에서 dFdx/dFdy로 이웃 픽셀과의 위치 차이를 외적하면 삼각형마다 면 법선. 데이터 없이 동작하지만 각진 로우폴리 모양이 된다(일부러 이 스타일로 쓰기도)."}],k={layout:"variants",intro:"정점 셰이더로 표면을 움직이는 <b>정점 변위</b>는 물결·깃발·지형·풀잎 흔들림의 기본입니다. 함정은 <b>법선</b>입니다. 위치만 바꾸고 법선을 그대로 두면 조명이 변하지 않아 움직임이 보이지 않습니다. 정점 셰이더는 이웃 정점을 볼 수 없으므로 법선을 <b>직접 다시 계산</b>해야 합니다.",how:["변위: p′ = p + n × h(p, t) (평면이면 y = h(x, z, t)). h는 사인 합, 노이즈, 높이맵 텍스처 등.","유한 차분: h를 (x+ε), (z+ε)에서 더 평가 → 두 접선 벡터 → 외적이 새 법선.","해석적: h의 편미분을 직접 계산. 게르스트너 파는 수평 이동까지 포함한 닫힌 형태 법선이 있음.","높이맵 텍스처: 이웃 텍셀 샘플(소벨 필터) 또는 미리 구운 노멀맵을 함께 사용.","화면 공간 미분(dFdx/dFdy): 픽셀 셰이더에서 면 법선 — 플랫 셰이딩 스타일.","그림자·충돌 메시도 같은 변위를 적용해야 일관됨(CPU 쪽 같은 공식)."],pros:["CPU 개입 없이 대규모 메시를 애니메이션","해석적 법선이면 정확하고 저렴","테셀레이션과 결합해 디테일 증가"],cons:["정점 밀도보다 작은 물결은 표현 불가(→ 노멀맵)","바운딩 박스가 변위만큼 커져야 컬링이 맞음","물리(부력)용으로 CPU에서도 같은 계산 필요"],usedIn:"바다·호수 셰이더(게르스트너 파: GPU Gems 1권 1장, FFT 바다: Tessendorf), 깃발·천·초목 흔들림, Unreal World Position Offset, Unity Shader Graph Vertex 블록, Godot vertex(), 지형 높이맵, 로우폴리 스타일 게임(플랫 셰이딩).",controls:[{type:"range",key:"amp",label:"물결 높이",min:0,max:2,step:.05,value:1},{type:"range",key:"res",label:"격자 분할 수",min:8,max:200,step:4,value:96},{type:"toggle",key:"wire",label:"와이어프레임",value:!1}],viewers:F.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:i=>b(i,e.mode)}))};export{k as default};
