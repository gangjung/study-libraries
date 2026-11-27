import{p as b,H as h,D as y,u as g,az as w,M as u,P as x,ao as k,aM as M,aI as S}from"./three.module-BZgG6AUv.js";import{m as W}from"./three-viewer-0rZIEDzf.js";import{b as z}from"./figure-GCHR3crq.js";const L=`
attribute float oW; uniform float mode; uniform float base; uniform float pr;
varying float vW;
void main(){
  vec4 vp = modelViewMatrix * vec4(position, 1.);
  vec3 n = normalize(normalMatrix * normal);
  float d = -vp.z;
  float off;
  if (mode < .5) off = base * .006;                       // 월드 단위 고정 두께
  else if (mode < 1.5) off = d * base * .0016;              // 화면 픽셀 고정 (거리 비례로 밀기)
  else {
    // 거리 보정 곡선: 가까우면 화면 두께 유지, 멀어질수록 화면 두께를 줄임 + 정점 색 마스크
    float px = base * .0016 / (1. + d * .12);
    off = d * px * oW;
  }
  vW = oW;
  vp.xyz += n * off;
  gl_Position = projectionMatrix * vp;
}`,B=`
uniform float mode; varying float vW;
void main(){
  vec3 c = vec3(.09, .06, .12);
  if (mode > 2.5) c = mix(vec3(1., .2, .3), vec3(.2, 1., .4), vW); // 마스크 시각화
  gl_FragColor = vec4(c, 1.);
}`;function A(o,t){const e=o.geometry,s=e.attributes.position;e.computeBoundingBox();const a=e.boundingBox,r=new Float32Array(s.count);for(let n=0;n<s.count;n++){let m=1;t==="eye"?m=0:t==="skin"&&a.max.y-a.min.y>.5&&e.type==="SphereGeometry"?m=.6:t==="hair"&&e.type==="ConeGeometry"&&(m=1-(s.getY(n)-a.min.y)/(a.max.y-a.min.y)*.9),r[n]=m}e.setAttribute("oW",new M(r,1))}function C(o,t){return W(o,{antialias:!0,cam:[1.4,1.7,6.2],target:[0,1.1,-4],far:80},({scene:e,renderer:s})=>{e.background=new b(13621734),e.add(new h(16777215,8949920,2.2));const a=new y(16777215,1.2);a.position.set(2,3,2),e.add(a);const r=new g({uniforms:{mode:{value:["world","screen","curve","mask"].indexOf(t)},base:{value:4},pr:{value:1}},vertexShader:L,fragmentShader:B,side:w}),n=new Map;[2.4,-3,-11,-26].forEach((p,c)=>{const d=z(e,(i,f)=>(n.has(i)||n.set(i,new S({color:f})),n.get(i)));d.root.position.set((c%2?-1:1)*.5*c,0,p),d.root.rotation.y=-.3;for(const{mesh:i,part:f}of d.meshes){A(i,f);const v=new u(i.geometry,r);i.add(v)}});const l=new u(new x(60,60),new k({color:10135450}));return l.rotation.x=-Math.PI/2,e.add(l),{update(){r.uniforms.base.value=o.params.num("base",4),r.uniforms.pr.value=s.getPixelRatio(),o.hud({world:"월드 단위 고정: 가까우면 굵고, 멀면 사라짐",screen:"화면 픽셀 고정: 먼 캐릭터가 검은 덩어리",curve:"거리 보정 곡선 + 정점 색 마스크",mask:"초록 = 두께 100%, 빨강 = 0% (눈은 외곽선 없음, 머리카락 끝은 가늘게)"}[t])}}})}const F=[{mode:"world",title:"월드 고정 두께",kind:"before",caption:"법선 방향으로 항상 같은 거리(월드 단위)만큼 부풀림. 카메라에 바짝 붙은 캐릭터는 외곽선이 두껍고 무거워지며, 먼 캐릭터는 선이 거의 사라진다."},{mode:"screen",title:"화면 고정 두께",kind:"variant",caption:"뷰 공간 깊이에 비례해 밀어 화면에서 항상 같은 픽셀 두께. 가까울 땐 좋지만 먼 캐릭터는 몸 크기에 비해 선이 너무 두꺼워 검은 실루엣 덩어리가 된다."},{mode:"curve",title:"거리 보정 + 부위 마스크",kind:"after",caption:"가까울 땐 화면 두께를 유지하고 멀어질수록 서서히 줄이는 곡선을 적용. 정점 색에 칠한 부위별 가중치로 눈은 선 없음, 얼굴은 얇게, 머리카락 끝은 붓처럼 가늘게."},{mode:"mask",title:"정점 색 두께 마스크",kind:"info",caption:"아티스트가 정점 색(보통 A 채널)에 칠해 두는 외곽선 두께 값. 손그림 선처럼 굵기에 강약이 생긴다."}],V={layout:"compare",intro:'역면 확장 외곽선은 "얼마나 부풀릴지"가 품질을 좌우합니다. 월드 단위로 고정하면 거리마다 선 굵기가 들쭉날쭉하고, 화면 픽셀로 고정하면 먼 캐릭터가 검은 덩어리가 됩니다. 실제 게임은 <b>거리에 따른 보정 곡선</b>에 <b>정점 색 마스크</b>로 부위별 굵기를 더해 손그림 같은 선을 만듭니다.',how:["정점을 뷰 공간으로 변환 → 뷰 공간 법선 방향으로 offset만큼 이동 → 투영. 뒷면만 그리고 앞면은 컬링.","화면 두께 고정: offset ∝ 깊이(−z) × 픽셀 크기. 투영 행렬의 FOV도 반영.","거리 보정: 화면 두께에 f(거리)를 곱함 (예: 1 / (1 + k·d), 또는 최소·최대 클램프).","정점 색 A 채널: 부위별 두께 가중치. 눈·입 안쪽 0, 턱선·머리카락 끝 가늘게.","Z 오프셋: 외곽선을 뷰 깊이 방향으로 살짝 밀어 안쪽 면을 뚫고 나오는 선을 숨김.","외곽선 색은 검정이 아니라 재질 색을 어둡게 한 색(머리카락은 진한 남색 등)이 일반적."],pros:["손그림 같은 굵기 변화","거리·카메라 줌에 관계없이 안정된 인상","정점 셰이더만 수정하면 됨"],cons:["정점 색 채널을 마스크에 써야 함 (다른 용도와 경쟁)","날카로운 모서리는 평균 법선이 필요","곡선 파라미터를 캐릭터·카메라마다 조정"],usedIn:"길티기어 Xrd(GDC 2015: 정점 색으로 선 굵기 조절), 원신·붕괴 스타레일 등 애니풍 게임(거리 보정 + 마스크로 분석됨), Unity-Chan Toon Shader의 외곽선 두께·거리 감쇠 설정, Blender Solidify 외곽선 관행.",controls:[{type:"range",key:"base",label:"기본 두께",min:1,max:10,step:.5,value:4}],viewers:F.map(o=>({title:o.title,kind:o.kind,caption:o.caption,mount:t=>C(t,o.mode)}))};export{V as default};
