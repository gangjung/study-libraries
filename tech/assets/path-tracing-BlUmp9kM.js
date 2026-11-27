import{r as m,N as F,au as G,k as D,g as z,aB as g,u as y}from"./three.module-BZgG6AUv.js";import{F as w}from"./Pass-By1_TgQk.js";import{m as H}from"./three-viewer-0rZIEDzf.js";import{Q as k}from"./glsl-DOwCk4-f.js";const W=`
uniform sampler2D prev; uniform float frame; uniform float mode; uniform float spp; uniform float bounces; uniform float outG;
uniform mat4 camWorld; uniform mat4 projInv; uniform vec3 camPos; uniform vec2 res;
varying vec2 vUv;
float seed;
float rnd(){ seed += 1.618; return fract(sin(dot(vec3(gl_FragCoord.xy, seed), vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
struct Hit { float t; vec3 n; int m; };
// 재질: 0 흰 벽, 1 빨강, 2 초록, 3 광원, 4 거울, 5 흰 공
void plane(vec3 ro, vec3 rd, vec3 n, float d, int m, inout Hit h, vec3 lo, vec3 hi){
  float dn = dot(rd, n); if (abs(dn) < 1e-5) return;
  float t = (d - dot(ro, n)) / dn;
  if (t < 1e-3 || t > h.t) return;
  vec3 p = ro + rd * t;
  if (any(lessThan(p, lo - 1e-3)) || any(greaterThan(p, hi + 1e-3))) return;
  h.t = t; h.n = dn < 0. ? n : -n; h.m = m;
}
void sphere(vec3 ro, vec3 rd, vec3 c, float r, int m, inout Hit h){
  vec3 oc = ro - c; float b = dot(oc, rd), q = dot(oc, oc) - r * r, d = b * b - q;
  if (d < 0.) return; float t = -b - sqrt(d); if (t < 1e-3 || t > h.t) return;
  h.t = t; h.n = normalize(ro + rd * t - c); h.m = m;
}
Hit trace(vec3 ro, vec3 rd){
  Hit h; h.t = 1e9; h.m = -1;
  vec3 lo = vec3(-1., 0., -1.), hi = vec3(1., 2., 3.);
  plane(ro, rd, vec3(0, 1, 0), 0., 0, h, lo, hi);
  plane(ro, rd, vec3(0, 1, 0), 2., 0, h, lo, hi);
  plane(ro, rd, vec3(0, 0, 1), -1., 0, h, lo, hi);
  plane(ro, rd, vec3(1, 0, 0), -1., 1, h, lo, hi);
  plane(ro, rd, vec3(1, 0, 0), 1., 2, h, lo, hi);
  plane(ro, rd, vec3(0, 1, 0), 1.995, 3, h, vec3(-.3, 1.9, -.3), vec3(.3, 2.1, .3));
  sphere(ro, rd, vec3(-.42, .4, -.3), .4, 5, h);
  sphere(ro, rd, vec3(.45, .35, .3), .35, 4, h);
  return h;
}
vec3 albedo(int m){ return m == 1 ? vec3(.75, .12, .1) : m == 2 ? vec3(.12, .6, .15) : vec3(.75); }
const vec3 LE = vec3(17., 15., 12.);
vec3 nee(vec3 p, vec3 n, vec3 alb){
  vec3 lp = vec3(-.3 + .6 * rnd(), 1.995, -.3 + .6 * rnd());
  vec3 d = lp - p; float dist = length(d); d /= dist;
  float cs = dot(n, d), cl = d.y; // 광원 법선은 아래(0,−1,0)
  if (cs <= 0. || cl <= 0.) return vec3(0.);
  Hit s = trace(p + n * 1e-3, d);
  if (s.m != 3) return vec3(0.);
  return alb / 3.14159 * LE * cs * cl * .36 / (dist * dist);
}
vec3 cosDir(vec3 n){
  float r1 = rnd(), r2 = rnd(); float ph = 6.2831853 * r1, sr = sqrt(r2);
  vec3 t = normalize(cross(abs(n.x) > .5 ? vec3(0, 1, 0) : vec3(1, 0, 0), n)), b = cross(n, t);
  return normalize(t * cos(ph) * sr + b * sin(ph) * sr + n * sqrt(1. - r2));
}
vec3 radiance(vec3 ro, vec3 rd){
  vec3 L = vec3(0.), thr = vec3(1.); bool spec = true;
  for (int b = 0; b < 8; b++){
    if (float(b) > bounces) break;
    Hit h = trace(ro, rd);
    if (h.m < 0) break;
    if (h.m == 3) { if (spec) L += thr * LE; break; }
    vec3 p = ro + rd * h.t;
    if (h.m == 4) { ro = p + h.n * 1e-3; rd = reflect(rd, h.n); thr *= .9; spec = true; continue; }
    vec3 alb = albedo(h.m);
    L += thr * nee(p, h.n, alb);
    if (mode < .5) break;
    ro = p + h.n * 1e-3; rd = cosDir(h.n); thr *= alb; spec = false;
    // 러시안 룰렛
    if (b > 2) { float q = max(thr.r, max(thr.g, thr.b)); if (rnd() > q) break; thr /= q; }
  }
  return L;
}
void main(){
  seed = frame * 7.31;
  vec2 jit = vec2(rnd(), rnd()) - .5;
  vec4 pp = projInv * vec4(((gl_FragCoord.xy + jit) / res) * 2. - 1., 1., 1.);
  vec3 rd = normalize((camWorld * vec4(normalize(pp.xyz / pp.w), 0.)).xyz);
  if (outG > .5) {
    // 디노이저용 G-버퍼: 첫 교차의 법선 + 깊이
    Hit h = trace(camPos, rd);
    gl_FragColor = vec4(h.n * .5 + .5, h.m < 0 ? 100. : h.t);
    return;
  }
  vec3 c = vec3(0.);
  for (int s = 0; s < 8; s++){ if (float(s) >= spp) break; c += radiance(camPos, rd); }
  c /= spp;
  vec3 p = texture2D(prev, vUv).rgb;
  gl_FragColor = vec4(mix(p, c, 1. / frame), 1.);
}`,q=`
uniform sampler2D tColor; uniform sampler2D tG; uniform vec2 texel; uniform float radius;
varying vec2 vUv;
void main(){
  vec4 g0 = texture2D(tG, vUv);
  vec3 sum = vec3(0.); float wsum = 0.;
  for (int y = -4; y <= 4; y++) for (int x = -4; x <= 4; x++){
    vec2 uv = vUv + vec2(x, y) * texel * radius;
    vec4 g = texture2D(tG, uv);
    // 법선·깊이가 비슷한 이웃만 섞는 교차 양방향 필터 (경계 보존)
    float wn = pow(max(dot(g.xyz * 2. - 1., g0.xyz * 2. - 1.), 0.), 32.);
    float wd = exp(-abs(g.w - g0.w) * 20.);
    float ws = exp(-float(x * x + y * y) / 18.);
    float w = wn * wd * ws;
    sum += texture2D(tColor, uv).rgb * w; wsum += w;
  }
  gl_FragColor = vec4(sum / max(wsum, 1e-4), 1.);
}`,I=`
uniform sampler2D t; varying vec2 vUv;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){ gl_FragColor = vec4(aces(texture2D(t, vUv).rgb * .6), 1.);
  #include <colorspace_fragment>
}`;function L(r,o){return H(r,{cam:[0,1,3.4],target:[0,1,0],fov:45,pixelScale:()=>2},({camera:c,renderer:a})=>{const v={type:G,minFilter:F,magFilter:F};let s=new m(1,1,v),n=new m(1,1,v);const u=new m(1,1,v),p=new m(1,1,v),e={prev:{value:s.texture},frame:{value:1},mode:{value:o==="direct"?0:1},spp:{value:1},bounces:{value:4},outG:{value:0},camWorld:{value:new g},projInv:{value:new g},camPos:{value:new z},res:{value:new D(1,1)}},f=new w(new y({uniforms:e,vertexShader:k,fragmentShader:W})),d=new w(new y({uniforms:{tColor:{value:null},tG:{value:u.texture},texel:{value:new D},radius:{value:1}},vertexShader:k,fragmentShader:q})),h=new w(new y({uniforms:{t:{value:null}},vertexShader:k,fragmentShader:I})),T=new g;let l=0,R="";return{update(){c.updateMatrixWorld();const t=`${r.params.num("bounces",4)}:${r.params.num("spp",1)}`;(!T.equals(c.matrixWorld)||t!==R)&&(T.copy(c.matrixWorld),R=t,l=0),l++;const i=o==="accum"||o==="direct";e.frame.value=i?l:1,e.spp.value=o==="denoise"?Math.max(2,r.params.num("spp",1)):r.params.num("spp",1),e.bounces.value=r.params.num("bounces",4),e.camWorld.value.copy(c.matrixWorld),e.projInv.value.copy(c.projectionMatrixInverse),e.camPos.value.copy(c.position),r.hud(o==="accum"||o==="direct"?`누적 ${l}프레임 × ${e.spp.value} spp = ${l*e.spp.value} 샘플/픽셀`:o==="noisy"?`매 프레임 ${e.spp.value} spp (누적 없음)`:`매 프레임 ${e.spp.value} spp + 법선·깊이 유도 필터`)},render(){e.prev.value=s.texture,e.outG.value=0,a.setRenderTarget(n),f.render(a);let t=n.texture;if(o==="denoise"){e.outG.value=1,a.setRenderTarget(u),f.render(a);const i=d.material;i.uniforms.tColor.value=n.texture,i.uniforms.radius.value=r.params.num("radius",1.5),a.setRenderTarget(p),d.render(a),t=p.texture}a.setRenderTarget(null),h.material.uniforms.t.value=t,h.render(a),[s,n]=[n,s]},resize(t,i,S){const x=Math.floor(t*S),b=Math.floor(i*S);for(const C of[s,n,u,p])C.setSize(x,b);e.res.value.set(x,b),d.material.uniforms.texel.value.set(1/x,1/b),l=0},dispose(){for(const t of[s,n,u,p])t.dispose();for(const t of[f,d,h])t.material.dispose(),t.dispose()}}})}const M=[{mode:"direct",title:"직접광만",kind:"before",caption:"광원에서 바로 오는 빛과 그림자만. 천장과 그늘이 새까맣고 벽 색이 번지지 않는다 — 전통적 래스터 렌더링의 한계."},{mode:"noisy",title:"경로 추적 1 spp",kind:"variant",caption:"픽셀당 경로 1개. 간접광·색 번짐·부드러운 그림자가 모두 있지만 몬테카를로 노이즈가 심하다. 실시간 RT 게임이 실제로 얻는 신호가 이 수준."},{mode:"accum",title:"프로그레시브 누적",kind:"after",caption:"프레임마다 새 샘플을 평균. 시간이 지나면 노이즈 없는 정답으로 수렴한다 (오프라인 렌더러). 카메라를 움직이면 리셋된다."},{mode:"denoise",title:"저샘플 + 디노이즈",kind:"variant",caption:"적은 샘플을 법선·깊이가 비슷한 이웃끼리만 블러해 경계를 지키며 노이즈 제거. 실시간 RT는 여기에 시간 누적까지 더한다 (SVGF, DLSS-RR)."}],_={layout:"variants",intro:"카메라에서 광선을 쏘아 표면에 부딪힐 때마다 <b>무작위 방향으로 튕기며</b> 광원까지 이르는 빛의 경로를 추적합니다. 이를 수없이 반복해 평균(몬테카를로 적분)을 내면 그림자·반사·간접광·색 번짐이 모두 물리적으로 정확한 <b>정답 이미지</b>가 나옵니다. 문제는 샘플이 적으면 노이즈가 심하다는 것이고, 실시간 패스 트레이싱의 핵심은 결국 <b>디노이징</b>입니다.",how:["픽셀마다 카메라 광선 → 가장 가까운 교차점을 찾는다 (BVH 가속 구조).","광원을 직접 샘플링(Next Event Estimation): 광원 위 무작위 점으로 그림자 광선을 쏴 직접광을 더한다.","코사인 가중 무작위 방향으로 튕겨 다음 교차점에서 반복. 처리량(throughput)에 알베도를 곱해 간다.","몇 번 튕긴 뒤엔 러시안 룰렛으로 확률적으로 종료(편향 없이 비용 절감).","여러 경로의 평균이 렌더링 방정식의 해로 수렴. 오차는 1/√N로 줄어 4배 샘플로 노이즈가 절반.","실시간: 1~2 spp + 시간 누적(재투영) + 공간 필터(SVGF, ReLAX) + ReSTIR 같은 샘플 재사용."],pros:["모든 빛 효과가 한 알고리즘에서 정확하게 나옴","아티스트가 가짜 조명을 덜 배치해도 됨","영화 VFX의 표준"],cons:["수렴이 느려 실시간엔 강력한 디노이저가 필수","광선 추적 하드웨어(RT 코어)와 BVH 갱신 비용","디노이저가 디테일을 뭉개거나 잔상(고스팅)을 남김"],usedIn:"Pixar RenderMan·Arnold·Cycles. 실시간: Quake II RTX, Minecraft RTX, Cyberpunk 2077 Overdrive, Portal RTX, Alan Wake 2.",controls:[{type:"range",key:"bounces",label:"최대 반사 횟수",min:1,max:7,step:1,value:4},{type:"range",key:"spp",label:"프레임당 샘플 (spp)",min:1,max:8,step:1,value:1},{type:"range",key:"radius",label:"디노이즈 필터 반경",min:.5,max:3,step:.25,value:1.5}],viewers:M.map(r=>({title:r.title,kind:r.kind,caption:r.caption,mount:o=>L(o,r.mode)}))};export{_ as default};
