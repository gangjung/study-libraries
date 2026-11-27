import{p,g as h,u as b,G as y,M as v,C as w,aI as x,aq as g,at as M,H as k,k as N,a_ as V}from"./three.module-BZgG6AUv.js";import{m as C}from"./three-viewer-0rZIEDzf.js";import{m as z}from"./canvas-viewer-Btf0JXdr.js";import{c as P,l as G,t as f,D as u,a as L}from"./chart2d-JzIgcti9.js";function S(){const o=[[0,0],[.06,.02],[.065,.12],[.1,.35],[.108,.42],[.085,.58],[.092,.64],[.13,.85],[.15,1.05],[.155,1.2]].map(([a,i])=>new N(a,i));return new V(o,64)}const T=`
varying vec3 vN; varying vec3 vW; varying float vY;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz; vY = position.y;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,_=`
uniform float mode; uniform vec3 L; uniform vec3 camP; uniform float denier; uniform vec3 fabric;
varying vec3 vN; varying vec3 vW; varying float vY;
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW);
  float lit = smoothstep(.45, .55, dot(N, L) * .5 + .5);
  vec3 skin = vec3(1., .82, .72) * mix(vec3(.8, .6, .68), vec3(1.), lit);
  vec3 fab = fabric * mix(.55, 1., lit);
  vec3 col;
  float ndv = max(dot(N, V), .04);
  if (mode < .5) col = fab;                                  // 단색
  else if (mode < 1.5) col = mix(skin, fab, .55);            // 고정 알파
  else {
    // 천 밀도: 시선이 비스듬할수록 실을 많이 통과 → 투과율 exp(−σ / cosθ)
    float sigma = -log(1. - denier);
    float dens = 1. - exp(-sigma / ndv);
    col = mix(skin, fab, dens);
    // 결 방향 은은한 광택 (나일론 반사)
    vec3 T = vec3(0., 1., 0.);
    vec3 H = normalize(L + V);
    float th = dot(T, H);
    col += vec3(.18) * pow(sqrt(max(0., 1. - th * th)), 30.) * lit;
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function D(o,a){return a==="chart"?I(o):C(o,{antialias:!0,cam:[.9,.9,2.3],target:[0,.65,0]},({scene:i,camera:c})=>{i.background=new p(14278632);const n={mode:{value:["solid","alpha","denier"].indexOf(a)},L:{value:new h(.5,.8,.6).normalize()},camP:{value:new h},denier:{value:.35},fabric:{value:new p(1381660)}},s=new b({uniforms:n,vertexShader:T,fragmentShader:_}),m=S(),e=new y;for(const l of[-1,1]){const t=new v(m,s);t.position.x=l*.13,t.rotation.z=l*.03,e.add(t)}const r=new v(new w(.3,.42,.35,48,1,!0),new x({color:9121340,side:g}));r.position.y=1.3;const d=new x({color:3811876});for(const l of[-1,1]){const t=new v(new M(.07,.14,8,16),d);t.rotation.x=Math.PI/2,t.position.set(l*.13,.03,.06),e.add(t)}return e.add(r),i.add(e,new k(16777215,8947848,2)),{update(l,t){e.rotation.y=o.params.bool("animate")?Math.sin(t*.4)*1.2:.3,n.camP.value.copy(c.position),n.denier.value=o.params.num("denier",.35),n.fabric.value.set(o.params.str("color","#15151c")),o.hud({solid:"단색 천: 페인트처럼 평평함",alpha:"고정 비율로 피부와 섞음: 어디서나 같은 회색",denier:`시선 각도 기반 밀도 (정면 투과 ${(100-n.denier.value*100).toFixed(0)}%) + 결 광택`}[a])},dispose(){d.dispose()}}})}function I(o){return z(o,()=>({draw(a,i,c){P(a,i,c);const n=90,s=r=>Array.from({length:n+1},(d,l)=>{const t=l/n*(Math.PI/2)*.98;return(1-Math.exp(Math.log(1-r)/Math.cos(t)))*100}),m=o.params.num("denier",.35),e={x:36,y:14,w:i-50,h:c-54};G(a,e,[{data:s(.15),color:"#94a3b8",width:1.4},{data:s(m),color:"#e66cff",width:2.4},{data:s(.7),color:"#5b9cff",width:1.4}],0,100,{xs:n});for(const r of[0,50,100])f(a,`${r}%`,e.x-4,e.y+e.h-r/100*e.h+3,u,9,"right");f(a,"정면 (0°)",e.x,e.y+e.h+14,u,9),f(a,"윤곽 (90°)",e.x+e.w,e.y+e.h+14,u,9,"right"),L(a,[{label:"얇음 15%",color:"#94a3b8"},{label:`현재 ${(m*100).toFixed(0)}%`,color:"#e66cff"},{label:"두꺼움 70%",color:"#5b9cff"}],e.x,c-8,10),o.hud("시선과 표면이 이루는 각도별 천 불투명도: 1 − (1 − 정면밀도)^(1/cosθ)")}}))}const F=[{mode:"solid",title:"단색",kind:"before",caption:'스타킹을 검정 단색으로 칠하면 바지나 페인트처럼 보인다. 얇은 천의 핵심은 "비침"인데 그게 없다.'},{mode:"alpha",title:"고정 비율 섞기",kind:"variant",caption:"피부색과 천 색을 항상 같은 비율로 섞으면 어디서나 균일한 회색이 되어 입체감이 사라진다."},{mode:"denier",title:"시선 각도 기반 밀도",kind:"after",caption:"정면으로 보는 곳은 실 한 겹만 통과해 피부가 비치고, 다리 윤곽처럼 비스듬한 곳은 여러 겹을 통과해 진해진다. 결 방향 은은한 광택까지 더하면 나일론 느낌."},{mode:"chart",title:"각도별 불투명도",kind:"info",caption:"실 층을 비스듬히 통과하는 거리는 1/cosθ로 늘어난다. 정면 밀도(데니어)를 바꾸면 곡선 전체가 오르내린다."}],q={layout:"compare",intro:"스타킹·시스루 소매 같은 <b>얇은 반투명 천</b>은 보는 각도에 따라 비침이 달라집니다. 정면에서는 실 한 겹만 보여 피부가 비치고, 윤곽 쪽은 시선이 천을 비스듬히 지나며 여러 겹이 겹쳐 진해집니다. 이를 <b>N·V(시선과 법선의 각도)로 천 밀도를 계산</b>해 표현하면, 텍스처 한 장 없이도 그럴듯한 데니어 느낌이 납니다.",how:["정면 밀도 d (얇은 스타킹 0.1~0.3, 두꺼운 타이츠 0.7~0.9) 를 파라미터로.","투과율 T = (1 − d)^(1/cosθ), cosθ = max(N·V, ε). 밀도 = 1 − T.","최종 = mix(피부 셰이딩, 천 색, 밀도). 피부 쪽도 램프·그늘을 그대로 계산해야 자연스러움.","광택: 다리 길이 방향을 접선으로 한 비등방 하이라이트(머리카락과 같은 Kajiya-Kay) 약하게.","무늬(망사·니트)는 텍스처 마스크로 밀도를 곱해 표현."],pros:["계산 몇 줄로 사실감이 크게 오름","데니어·색을 파라미터로 쉽게 변형","피부와 천을 한 메시로 처리 (알파 정렬 문제 없음)"],cons:["피부 셰이딩을 천 셰이더 안에서 함께 계산해야 함","윤곽에서 지나치게 진해지지 않도록 클램프 필요","실제 투과(뒤쪽 다리가 비침)는 표현 안 됨"],usedIn:"애니풍 게임 캐릭터의 스타킹 표현(정면 비침 + 윤곽 진함이 흔히 관찰됨, 게임별 수식은 대부분 비공개), VRChat·MMD용 툰 셰이더와 커뮤니티 스타킹 셰이더 예제(림·프레넬 항으로 천 밀도 조절).",controls:[{type:"range",key:"denier",label:"정면 밀도 (데니어)",min:.05,max:.9,step:.01,value:.35},{type:"select",key:"color",label:"천 색",options:[{label:"검정",value:"#15151c"},{label:"남색",value:"#1e2a55"},{label:"흰색",value:"#f2f2f5"}],value:"#15151c"},{type:"toggle",key:"animate",label:"회전",value:!0}],viewers:F.map(o=>({title:o.title,kind:o.kind,caption:o.caption,mount:a=>D(a,o.mode)}))};export{q as default};
