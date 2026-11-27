import{p,u as g,g as l,aI as k,M as i,S as m,C as T,as as w,w as M,H as b,D as H}from"./three.module-BZgG6AUv.js";import{m as x}from"./three-viewer-0rZIEDzf.js";const z=`
varying vec3 vN; varying vec3 vW; varying vec3 vO;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz; vO = position;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,K=`
uniform float mode; uniform vec3 L; uniform vec3 camP; uniform vec3 base; uniform float gloss; uniform float shiftAmt; uniform float tilt;
varying vec3 vN; varying vec3 vW; varying vec3 vO;
float h11(float x){ return fract(sin(x * 127.1) * 43758.5453); }
float strand(float a){ float i = floor(a); float f = fract(a); return mix(h11(i), h11(i + 1.), smoothstep(0., 1., f)); }
// Kajiya-Kay: 머리카락 = 가는 원기둥. 하이라이트는 접선 T와 H가 수직일 때 최대
float kk(vec3 T, vec3 H, float n){ float th = dot(T, H); return pow(sqrt(max(0., 1. - th * th)), n); }
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW), H = normalize(L + V);
  // 머리카락 방향 = 정수리(+Y) 쪽으로 흐르는 접선 (표면에 투영)
  vec3 Y = normalize(vec3(0., 1., tilt));
  vec3 T = normalize(Y - dot(Y, N) * N);
  float az = atan(vO.z, vO.x) * 24.;      // 가닥 단위 변화 (방위각 기준)
  float s = strand(az) - .5;
  float ndl = dot(N, L);
  float lit = smoothstep(-.05, .05, ndl);
  vec3 col = base * mix(vec3(.55, .58, .8), vec3(1.), lit);  // 2단 툰 바탕
  vec3 spec = vec3(0.);
  if (mode < .5) {
    spec = vec3(pow(max(dot(N, H), 0.), gloss)) * .9;
  } else if (mode < 1.5) {
    spec = vec3(kk(T, H, gloss)) * .8;
  } else if (mode < 2.5) {
    // 두 로브: 1차(흰색, 끝 쪽으로 이동) + 2차(머리색, 뿌리 쪽, 넓고 반짝이 노이즈)
    vec3 T1 = normalize(T + N * (shiftAmt + s * .25));
    vec3 T2 = normalize(T + N * (-shiftAmt * 1.6 + s * .25));
    float sparkle = .5 + .5 * strand(az * 3.7 + vO.y * 20.);
    spec = vec3(kk(T1, H, gloss * 1.5)) * .75 + base * 1.4 * kk(T2, H, gloss * .5) * sparkle * .8;
  } else {
    // 애니풍 엔젤 링: Kajiya 값을 가닥마다 다른 임계값으로 잘라 톱니 모양의 선명한 띠
    float k = kk(normalize(T + N * shiftAmt), H, gloss * .35);
    float th = .86 + s * .24;
    spec = vec3(smoothstep(th, th + .02, k)) * .85;
  }
  col += spec * lit;
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function N(a,s){return x(a,{antialias:!0,cam:[.5,.7,4.3],target:[0,-.1,0]},({scene:o,camera:h})=>{o.background=new p(14015718);const n=new g({uniforms:{mode:{value:["blinn","kajiya","dual","anime"].indexOf(s)},L:{value:new l},camP:{value:new l},base:{value:new p(3821465).convertSRGBToLinear()},gloss:{value:80},shiftAmt:{value:.15},tilt:{value:0}},vertexShader:z,fragmentShader:K}),c=new k({color:16768203}),v=new i(new m(.9,64,48),c);v.scale.set(1,1.08,.97),o.add(v);const r=new i(new m(1,128,64,0,Math.PI*2,0,Math.PI*.52),n);r.scale.set(1.01,1.08,1.02),r.position.y=.04,o.add(r);const f=new i(new T(.98,.8,1.4,96,8,!0,Math.PI*.24,Math.PI*1.52),n);f.position.set(0,-.62,-.02),o.add(f);for(let e=-3;e<=3;e++){const t=new i(new w(.16,.6,24),n);t.position.set(e*.17,.25-Math.abs(e)*.03,.86-Math.abs(e)*.07),t.rotation.set(Math.PI+.35,0,e*.1),o.add(t)}const d=new M({color:2830165});for(const e of[-1,1]){const t=new i(new m(.1,24,16),d);t.position.set(e*.32,-.02,.83),t.scale.set(.9,1.4,.4),o.add(t)}return o.add(new b(16777215,7829367,2.2),new H(16777215,1)),{update(e,t){const u=a.params.bool("animate")?Math.sin(t*.4)*.9:.4,y=new l(Math.sin(u),.75,Math.cos(u)).normalize();n.uniforms.L.value.copy(y),n.uniforms.camP.value.copy(h.position),n.uniforms.gloss.value=a.params.num("gloss",80),n.uniforms.shiftAmt.value=a.params.num("shift",.15),a.hud({blinn:"블린-퐁 (N·H)ⁿ: 둥근 점",kajiya:"Kajiya-Kay: 접선 T 기준 → 머리를 감싸는 띠",dual:"두 로브(흰색 + 머리색) + 가닥별 이동",anime:"임계값으로 자른 톱니 띠 (애니풍 엔젤 링)"}[s])},dispose(){c.dispose(),d.dispose()}}})}const S=[{mode:"blinn",title:"블린-퐁",kind:"before",caption:"일반 재질용 하이라이트를 쓰면 매끈한 공처럼 둥근 점이 생긴다. 머리카락은 수많은 가는 원기둥이라 빛이 결 방향으로 길게 퍼져야 한다."},{mode:"kajiya",title:"Kajiya-Kay",kind:"variant",caption:"법선 대신 머리카락 방향(접선 T)으로 계산: sin(T, H)ⁿ. 하이라이트가 결과 직각으로 늘어나 머리를 감싸는 띠가 된다. 카메라를 위아래로 돌리면 띠가 이동."},{mode:"dual",title:"두 로브 + 가닥 이동",kind:"variant",caption:"실제 머리카락처럼 표면 반사(흰색, 날카로움)와 내부를 지나 뒷면에서 반사된 빛(머리색, 넓음)의 두 하이라이트가 결을 따라 서로 다른 위치로 밀린다. 가닥마다 접선을 조금씩 흔들어 띠가 들쭉날쭉해진다(Scheuermann 2004)."},{mode:"anime",title:"애니풍 엔젤 링",kind:"after",caption:"Kajiya 값을 가닥마다 다른 임계값으로 잘라 선명한 톱니 모양 띠로. 시점에 따라 움직이지만 모양은 셀화처럼 또렷하다. 실제 게임은 이 모양을 마스크 텍스처로 직접 그리기도 한다."}],I={layout:"variants",intro:"애니 캐릭터의 머리카락에는 정수리를 둘러싸는 반짝이는 띠, 이른바 <b>엔젤 링(천사의 고리)</b>이 있습니다. 머리카락은 가는 원기둥의 다발이라 일반적인 둥근 하이라이트가 아니라 <b>결 방향과 직각으로 길게 늘어난 하이라이트</b>가 생기는데, 이를 계산하는 고전 모델이 <b>Kajiya-Kay</b>이고, 애니풍 게임은 이를 임계값이나 마스크로 잘라 또렷한 모양으로 만듭니다.",how:["접선 T: 머리카락이 흐르는 방향. 메시 UV 방향(탄젠트)이나 플로우 맵으로 지정.","Kajiya-Kay: spec = sin(T, H)ⁿ = √(1 − (T·H)²)ⁿ. T와 H가 수직인 곳(띠)에서 최대.","접선 이동(shift): T += N × offset. offset을 노이즈 텍스처로 가닥마다 다르게 → 들쭉날쭉한 띠, 두 로브 위치 분리.","물리 기반 버전: Marschner 모델(R, TT, TRT 세 경로) — 실사 게임 헤어 셰이더(UE Hair Strands).","애니풍: 결과를 smoothstep으로 자르거나, 하이라이트 모양을 마스크 텍스처(ILM 계열 텍스처의 한 채널 등)로 그려 시점에 따라 UV를 밀어 이동."],pros:["적은 계산으로 머리카락다운 광택","임계값·마스크로 원화 스타일에 맞추기 쉬움","카드(판) 메시에도 적용 가능"],cons:["접선 방향 데이터(UV 정렬·플로우 맵)를 메시마다 준비해야 함","경험적 모델이라 에너지 보존 X","실사 수준에는 Marschner·스트랜드 렌더링 필요"],usedIn:"Kajiya & Kay(SIGGRAPH 1989), ATI Ruby 데모의 헤어 셰이딩(Scheuermann 2004), Marschner 외(2003) 물리 모델, UE Hair 셰이딩 모델·Hair Strands(Marschner 계열), AMD TressFX(2013 Tomb Raider), 애니풍 게임의 마스크·임계값 엔젤 링(게임별 구현은 비공개).",controls:[{type:"range",key:"gloss",label:"광택 지수 n",min:10,max:300,step:5,value:80},{type:"range",key:"shift",label:"접선 이동량",min:-.5,max:.5,step:.01,value:.15},{type:"toggle",key:"animate",label:"광원 흔들기",value:!0}],viewers:S.map(a=>({title:a.title,kind:a.kind,caption:a.caption,mount:s=>N(s,a.mode)}))};export{I as default};
