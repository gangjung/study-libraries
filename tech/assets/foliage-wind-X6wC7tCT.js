import{p as P,k as T,u as k,aq as S,M as x,ar as C,ao as G,H as F,C as M,g as l,Q as A,aM as b,P as I}from"./three.module-BZgG6AUv.js";import{a as V}from"./BufferGeometryUtils-CSZ6nkm7.js";import{m as N}from"./three-viewer-0rZIEDzf.js";import{a as U}from"./canvas-viewer-Btf0JXdr.js";const f=3.2;function L(){const t=U(3),s=[],d=(e,o,a,i)=>{const r=e.attributes.position.count,n=new Float32Array(r*3),u=new Float32Array(r*3),p=new Float32Array(r*4),v=new l;for(let c=0;c<r;c++)v.fromBufferAttribute(e.attributes.position,c),n.set([o.x,o.y,o.z],c*3),u.set([a.x,a.y,a.z],c*3),p.set(i(v),c*4);return e.setAttribute("aPivot",new b(n,3)),e.setAttribute("aDir",new b(u,3)),e.setAttribute("aInfo",new b(p,4)),e.index?e.toNonIndexed():e},g=new M(.1,.2,f,10,12).translate(0,f/2,0);s.push(d(g,new l,new l(0,1,0),()=>[0,0,0,0]));const m=(e,o,a,i,r)=>{const n=new I(.42,.42);n.rotateX(t()*3),n.rotateY(t()*6.28),n.translate(e.x,e.y,e.z);const u=t()*6.28;s.push(d(n,o,a,()=>[2,i,r,u]))},h=7;for(let e=0;e<h;e++){const o=1.3+e/(h-1)*1.6,a=e*2.4+t()*.5,i=1.35-e/h*.6,r=new l(Math.cos(a),.75,Math.sin(a)).normalize(),n=new l(0,o,0),u=t()*6.28,p=new M(.025,.06,i,6,6).translate(0,i/2,0);p.applyQuaternion(new A().setFromUnitVectors(new l(0,1,0),r)),p.translate(n.x,n.y,n.z),s.push(d(p,n,r,v=>[1,Math.max(0,v.clone().sub(n).dot(r)/i),u,0]));for(let v=0;v<16;v++){const c=.35+t()*.7,z=n.clone().addScaledVector(r,c*i).add(new l(t()-.5,t()-.3,t()-.5).multiplyScalar(.55));m(z,n,r,Math.min(1,c),u)}}const w=new l(0,f,0);for(let e=0;e<26;e++){const o=w.clone().add(new l(t()-.5,t()*.8-.2,t()-.5).multiplyScalar(1.1));m(o,new l(0,f-.4,0),new l(0,1,0),.8,t()*6.28)}const y=V(s.map(e=>(e.deleteAttribute("uv"),e)));return s.forEach(e=>e.dispose()),y}const W=`
attribute vec3 aPivot; attribute vec3 aDir; attribute vec4 aInfo;
uniform float uTime; uniform float mode; uniform vec2 wind; uniform float strength;
varying vec3 vN; varying vec3 vCol; varying float vLevel;
void main(){
  vec3 p = position;
  vec3 root = modelMatrix[3].xyz;
  vec3 W = normalize(vec3(wind.x, 0., wind.y));
  float level = aInfo.x, along = aInfo.y, phase = aInfo.z, lph = aInfo.w;
  // 돌풍: 바람 방향으로 흘러가는 큰 파동 (나무마다 다른 시각에 도착)
  float gust = .55 + .45 * sin(dot(root.xz, wind) * .35 - uTime * 1.3);
  if (mode < .5) {
    // 모든 정점이 같은 박자로 높이에 비례해 기울어짐 (고무처럼)
    p += W * sin(uTime * 1.6) * .35 * strength * (p.y / ${f.toFixed(1)});
  } else {
    // 1) 가지: 자기 피벗 기준, 자기 위상·주기로 흔들림 (가지 끝일수록 크게)
    if (level > .5) {
      float bs = sin(uTime * 2.7 + phase) * .6 + sin(uTime * 4.3 + phase * 1.7) * .3;
      vec3 side = normalize(cross(aDir, vec3(0., 1., 0.)) + 1e-4);
      p += (W * (.6 + .4 * gust) + side * .35 + vec3(0., .25, 0.)) * bs * .16 * strength * along * along;
    }
    // 2) 잎: 높은 주파수 떨림 (잎마다 다른 위상)
    if (level > 1.5 && mode > 1.5) {
      p += normal * sin(uTime * 11. + lph * 3.) * .045 * strength * (.5 + gust);
      p.y += sin(uTime * 7. + lph * 5.) * .02 * strength;
    }
    // 3) 줄기: 뿌리 기준 굽힘 (높이² 가중), 돌풍에 따라 크기 변화. 길이 보존을 위해 살짝 내려감
    float h = p.y / ${f.toFixed(1)};
    float bend = (.12 + .25 * gust * (mode > 1.5 ? 1. : .4)) * strength * (1. + .25 * sin(uTime * .9));
    vec3 off = W * bend * h * h;
    p += off;
    p.y -= dot(off, off) * .4;
  }
  vN = normalize(mat3(modelMatrix) * normal);
  vLevel = level;
  vCol = vec3(level < .5 ? position.y / ${f.toFixed(1)} : 0., level > .5 && level < 1.5 ? along : (level > 1.5 ? along * .5 : 0.), level > 1.5 ? fract(lph / 6.2832) : 0.);
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.);
}`,_=`
uniform float mode;
varying vec3 vN; varying vec3 vCol; varying float vLevel;
void main(){
  vec3 N = normalize(vN) * (gl_FrontFacing ? 1. : -1.);
  float d = max(dot(N, normalize(vec3(.4, .8, .3))), 0.) * .7 + .35;
  vec3 c = vLevel < .5 ? vec3(.38, .26, .17) : vLevel < 1.5 ? vec3(.33, .23, .15) : vec3(.3, .55, .2);
  if (mode > 2.5) c = vCol + vec3(.05);
  gl_FragColor = vec4(c * (mode > 2.5 ? 1. : d), 1.);
  #include <colorspace_fragment>
}`;function B(t,s){return N(t,{antialias:!0,cam:[6,3.5,9],target:[0,1.8,0]},({scene:d})=>{d.background=new P(11980256);const g=L(),m={uTime:{value:0},mode:{value:["rigid","hier","full","debug"].indexOf(s)},wind:{value:new T(1,0)},strength:{value:1}},h=new k({uniforms:m,vertexShader:W,fragmentShader:_,side:S}),w=s==="debug"?[[0,0,1]]:[[0,0,1],[-3.2,-1.5,.9],[3.1,-2,1.05],[-1.6,-4,.85],[2,2.2,.8],[-4.5,2,1.1],[4.6,1.2,.95]];for(const[e,o,a]of w){const i=new x(g,h);i.position.set(e,0,o),i.scale.setScalar(a),i.frustumCulled=!1,d.add(i)}const y=new x(new C(9,48),new G({color:6126149}));return y.rotation.x=-Math.PI/2,d.add(y,new F(16777215,4478259,2)),{update(e,o){m.uTime.value=o;const a=t.params.num("dir",0)*Math.PI/180;m.wind.value.set(Math.cos(a),Math.sin(a)),m.strength.value=t.params.num("strength",1),t.hud({rigid:"모든 정점이 같은 사인파 (높이 비례)",hier:"줄기(뿌리 기준) + 가지(각자 피벗·위상)",full:"+ 잎 떨림 + 바람 방향으로 흐르는 돌풍",debug:"정점 데이터: R = 줄기 높이, G = 가지 위치, B = 잎 위상"}[s])},dispose(){g.dispose()}}})}const D=[{mode:"rigid",title:"단일 사인 흔들림",kind:"before",caption:"높이에 비례해 모든 정점을 같은 박자로 밀면 나무 전체가 고무 막대처럼 휜다. 숲 전체가 동시에 같은 방향으로 끄덕여 기계적이다."},{mode:"hier",title:"계층: 줄기 + 가지",kind:"variant",caption:"줄기는 뿌리 기준으로 천천히, 가지는 각자의 붙은 점(피벗)을 기준으로 다른 위상·주기로. 정점에 피벗과 가지 방향이 저장돼 있어야 가능."},{mode:"full",title:"+ 잎 떨림 + 돌풍",kind:"after",caption:"잎은 빠른 주파수로 파르르, 바람 방향으로 흘러가는 돌풍 파동이 나무마다 다른 시각에 도착. 모두 정점 셰이더 계산이라 숲 전체 비용이 작다."},{mode:"debug",title:"정점에 구운 계층 데이터",kind:"info",caption:"나무를 만들 때 정점 색·UV에 줄기 높이(R), 가지 위 위치(G), 잎 위상(B), 피벗 위치를 굽는다. Crytek 방식(정점 색) · Unreal Pivot Painter(텍스처에 피벗)."}],$={layout:"variants",intro:"오픈월드의 숲을 살아 있게 만드는 바람은 거의 전부 <b>정점 셰이더</b>에서 계산됩니다. 수만 그루를 물리로 시뮬레이션할 수는 없기 때문입니다. 핵심은 나무의 <b>계층(줄기 → 가지 → 잎)</b>을 정점 데이터에 미리 구워 두고, 각 단계를 자기 피벗·주기·위상으로 따로 흔드는 것입니다.",how:["제작 시: 정점 색·추가 UV·텍스처에 계층 정보 저장 (줄기 굽힘 가중치, 가지 피벗 위치·방향, 잎 위상, 가지 강성).","줄기: 뿌리 기준 굽힘, 가중치 = (높이/전체 높이)². 길이 보존을 위해 굽은 만큼 아래로 보정.","가지: 자기 피벗 기준 회전, 위상은 가지마다 다르게 → 엇박자로 흔들림.","잎: 법선 방향 고주파 떨림. 정점 색 채널로 잎 가장자리만 크게.","돌풍: 월드 위치 기반 노이즈를 시간에 따라 이동 → 바람이 숲을 지나가는 물결.","그림자·충돌에는 같은 변위를 적용하거나 생략. 바운딩 박스를 변위만큼 확장."],pros:["수만 그루도 GPU 비용만으로 애니메이션","계층 데이터 덕에 자연스러운 엇박자 움직임","바람 방향·세기를 전역 파라미터로 제어"],cons:["제작 파이프라인(SpeedTree·Pivot Painter) 필요","진짜 물리가 아니라 캐릭터와 상호작용(밀기)은 별도 처리","극단적 바람에서 늘어남·관통"],usedIn:"Crysis(GPU Gems 3 16장 “Vegetation Procedural Animation and Shading in Crysis”), SpeedTree Wind, Unreal Pivot Painter 2·SimpleGrassWind, Unity Wind Zone, Ghost of Tsushima의 바람(풀·나무·옷·파티클이 같은 바람장), 대부분의 오픈월드 게임 초목.",controls:[{type:"range",key:"strength",label:"바람 세기",min:0,max:3,step:.05,value:1},{type:"range",key:"dir",label:"바람 방향 (°)",min:0,max:360,step:5,value:0}],viewers:D.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:s=>B(s,t.mode)}))};export{$ as default};
