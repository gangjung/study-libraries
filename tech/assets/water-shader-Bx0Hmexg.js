import{$ as h,p as w,g as p,P as d,M as f,ao as k,H as P,D as b,u as z}from"./three.module-BZgG6AUv.js";import{m as T}from"./three-viewer-0rZIEDzf.js";import{G as M}from"./glsl-DOwCk4-f.js";const u=`
float seabed(vec2 p){ float r = length(p - vec2(4., -3.)); return -2.2 + 3. * exp(-r * r / 18.) + .3 * sin(p.x * .4) * cos(p.y * .3); }`,W=`
uniform float time; uniform float mode; uniform float amp; uniform float steep;
varying vec3 vW; varying vec3 vN;
${u}
// 게르스트너 파: 정점을 원운동시켜 마루는 뾰족, 골은 완만하게
void gerstner(vec2 dir, float L, float A, float Q, vec2 p, inout vec3 P, inout vec3 T, inout vec3 B){
  float k = 6.2831853 / L, c = sqrt(9.8 / k), f = k * (dot(dir, p) - c * time);
  float qa = Q * A;
  P.x += qa * dir.x * cos(f); P.z += qa * dir.y * cos(f); P.y += A * sin(f);
  T += vec3(-qa * dir.x * dir.x * k * sin(f), A * k * dir.x * cos(f), -qa * dir.x * dir.y * k * sin(f));
  B += vec3(-qa * dir.x * dir.y * k * sin(f), A * k * dir.y * cos(f), -qa * dir.y * dir.y * k * sin(f));
}
void main(){
  vec3 w = (modelMatrix * vec4(position, 1.)).xyz;
  vec3 P = w; vec3 T = vec3(1., 0., 0.), B = vec3(0., 0., 1.);
  if (mode < .5) {
    float k = 6.2831853 / 6., f = k * (w.x - 3. * time);
    P.y += amp * .6 * sin(f);
    T = vec3(1., amp * .6 * k * cos(f), 0.);
  } else {
    gerstner(normalize(vec2(1., .3)), 9., .35 * amp, steep, w.xz, P, T, B);
    gerstner(normalize(vec2(-.4, 1.)), 5.3, .2 * amp, steep, w.xz, P, T, B);
    gerstner(normalize(vec2(.7, -.6)), 3.1, .1 * amp, steep, w.xz, P, T, B);
    gerstner(normalize(vec2(-.9, -.2)), 1.7, .05 * amp, steep, w.xz, P, T, B);
  }
  vW = P; vN = normalize(cross(B, T));
  gl_Position = projectionMatrix * viewMatrix * vec4(P, 1.);
}`,A=`
uniform float mode; uniform vec3 camP; uniform float time; uniform vec3 sunDir;
varying vec3 vW; varying vec3 vN;
${M}
${u}
vec3 sky(vec3 d){ return mix(vec3(.75, .82, .9), vec3(.25, .45, .8), clamp(d.y * 1.5, 0., 1.)) + vec3(1., .9, .7) * pow(max(dot(d, sunDir), 0.), 600.) * 30.; }
void main(){
  vec3 N = normalize(vN);
  // 잔물결: 노이즈로 법선 교란
  vec2 q = vW.xz * 1.8 + time * .4;
  N = normalize(N + vec3(vnoise(q) - .5, 0., vnoise(q + 31.) - .5) * .25);
  vec3 V = normalize(camP - vW);
  vec3 deep = vec3(.01, .07, .12), shallow = vec3(.05, .35, .38);
  vec3 col;
  if (mode < 1.5) {
    col = deep * 4. * (max(dot(N, sunDir), 0.) * .8 + .3);
  } else {
    float F = .02 + .98 * pow(1. - max(dot(N, V), 0.), 5.);
    vec3 refl = sky(reflect(-V, N));
    vec3 body = deep;
    if (mode > 2.5) {
      // 수심 = 수면 높이 − 해저 높이 → 얕을수록 해저가 비치고, 해안선에 거품
      float depth = vW.y - seabed(vW.xz);
      float clarity = exp(-depth * 1.4);
      vec3 sand = vec3(.75, .65, .45) * (.6 + .4 * max(sunDir.y, 0.));
      body = mix(mix(deep, shallow, exp(-depth * .5)), sand * shallow * 3., clarity);
      float foam = smoothstep(.35, 0., depth) * step(.45, vnoise(vW.xz * 6. + time));
      foam += smoothstep(.5, .85, (vW.y + .2) / .6) * step(.6, vnoise(vW.xz * 8. - time)) * .6;
      body = mix(body, vec3(1.), clamp(foam, 0., 1.));
    }
    col = mix(body, refl, F);
  }
  gl_FragColor = vec4(col, 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function N(e,i){return T(e,{antialias:!0,cam:[-6,3.5,9],target:[2,0,-2],fov:50},({scene:o,camera:x,renderer:y})=>{y.toneMapping=h,o.background=new w(10468056);const c=new p(-.4,.35,-.85).normalize(),n=new d(60,60,120,120);n.rotateX(-Math.PI/2);const r=n.getAttribute("position");for(let t=0;t<r.count;t++){const s=r.getX(t),l=r.getZ(t),v=Math.hypot(s-4,l+3);r.setY(t,-2.2+3*Math.exp(-v*v/18)+.3*Math.sin(s*.4)*Math.cos(l*.3))}n.computeVertexNormals(),o.add(new f(n,new k({color:13153418}))),o.add(new P(13623551,6969920,1.4));const m=new b(16772829,2);m.position.copy(c),o.add(m);const a={time:{value:0},mode:{value:i},amp:{value:1},steep:{value:.7},camP:{value:new p},sunDir:{value:c}},g=new f(new d(60,60,256,256).rotateX(-Math.PI/2),new z({uniforms:a,vertexShader:W,fragmentShader:A}));return o.add(g),{update(t,s){a.time.value=s,a.amp.value=e.params.num("amp",1),a.steep.value=e.params.num("steep",.7),a.camP.value.copy(x.position),e.hud(["단일 사인파 (정점 높이만)","게르스트너 파 4개 합성","+ 프레넬 하늘 반사·태양 하이라이트","+ 수심 색·해저 투과·거품"][i])}}})}const S=[{mode:0,title:"사인파 높이",kind:"before",caption:"정점 높이를 사인 함수로 움직인 것. 규칙적인 골판지처럼 보이고 물의 질감이 없다."},{mode:1,title:"게르스트너 파",kind:"variant",caption:"정점을 원운동시켜 마루는 뾰족하고 골은 넓은 실제 파도 모양. 방향·파장이 다른 4개를 합쳐 자연스러운 불규칙성."},{mode:2,title:"+ 프레넬 반사",kind:"variant",caption:"멀리 볼수록 하늘을 반사하고 가까운 곳은 물빛. 태양 반사 하이라이트가 반짝인다."},{mode:3,title:"+ 수심 페이드·거품",kind:"after",caption:"해저까지의 깊이로 색을 바꿔 섬 주변 얕은 물은 청록색으로 바닥이 비치고, 해안선과 파도 마루에 거품."}],L={layout:"variants",intro:"게임의 물은 여러 셰이더 기법의 조합입니다. 정점 셰이더의 <b>게르스트너 파</b>로 형태를 만들고, 픽셀 셰이더에서 <b>프레넬</b>로 반사와 투과를 섞고, <b>수심</b>에 따라 색과 투명도를 바꾸며, 얕은 곳과 마루에 <b>거품</b>을 얹습니다. 단계별로 하나씩 더해 봅니다.",how:["게르스트너 파: 위치 P = p + Σ (Q·A·D·cos f, A·sin f), f = k(D·p − c·t). 분산 관계 c = √(g/k)로 긴 파도가 더 빠르다.","접선·종접선을 해석적으로 미분해 법선을 구하고, 노멀 맵(또는 노이즈)으로 잔물결을 덧입힌다.","프레넬 F로 반사(하늘·SSR·평면 반사)와 투과(굴절된 바닥색) 비율을 정한다.","수심 = 수면 깊이 − 장면 깊이 버퍼(여기서는 해저 함수). 깊을수록 흡수되어 어두운 청색, 얕으면 바닥이 비친다.","거품: 수심이 얕은 곳 + 파도 높이·접힘(야코비안)이 큰 곳에 노이즈 텍스처를 마스킹."],pros:["정점 + 픽셀 셰이더만으로 큰 바다를 저렴하게","파라미터로 잔잔한 호수부터 폭풍까지 조절"],cons:["정점 밀도가 부족하면 먼 파도가 깨짐 → 투영 격자·LOD 필요","게르스트너는 넓은 바다의 스펙트럼 표현에 한계 → FFT 바다(Tessendorf)","물체와의 상호작용(파문·항적)은 별도 시뮬레이션"],usedIn:"오픈월드·해양 게임의 바다·호수 셰이더 대부분(사실적인 대양은 FFT 바다와 조합, Sea of Thieves 등), UE Water 플러그인, Unity URP 샘플(Boat Attack). 게르스트너 파는 GPU Gems 1권(2004) 1장의 고전.",controls:[{type:"range",key:"amp",label:"파고",min:0,max:2.5,step:.05,value:1},{type:"range",key:"steep",label:"가파름 Q",min:0,max:1,step:.05,value:.7}],viewers:S.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:i=>N(i,e.mode)}))};export{L as default};
