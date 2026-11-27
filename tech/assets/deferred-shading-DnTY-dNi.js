import{p as f,a6 as M,r as F,N as w,s as N,g,u as x,M as b,P,S as A,B as L,b as z,aS as _}from"./three.module-BZgG6AUv.js";import{F as T}from"./Pass-By1_TgQk.js";import{m as R}from"./three-viewer-0rZIEDzf.js";import{a as S}from"./canvas-viewer-Btf0JXdr.js";import{Q as k}from"./glsl-DOwCk4-f.js";const v=256,D=`
out vec3 vN; out vec3 vW;
void main(){ vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,U=`
uniform vec3 albedo;
in vec3 vN; in vec3 vW;
layout(location = 0) out vec4 gAlbedo;
layout(location = 1) out vec4 gNormal;
layout(location = 2) out vec4 gPos;
void main(){ gAlbedo = vec4(albedo, 1.); gNormal = vec4(normalize(vN), 1.); gPos = vec4(vW, 1.); }`,V=`
uniform sampler2D gAlbedo; uniform sampler2D gNormal; uniform sampler2D gPos;
uniform vec3 lp[${v}]; uniform vec3 lc[${v}]; uniform int count; uniform float radius; uniform float view; uniform vec3 camP;
varying vec2 vUv;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){
  vec4 A = texture2D(gAlbedo, vUv);
  if (A.a < .5) { gl_FragColor = vec4(.02, .02, .03, 1.); return; }
  vec3 N = texture2D(gNormal, vUv).xyz, P = texture2D(gPos, vUv).xyz;
  if (view > .5 && view < 1.5) { gl_FragColor = vec4(A.rgb, 1.); return; }
  if (view > 1.5) { gl_FragColor = vec4(N * .5 + .5, 1.); return; }
  vec3 V = normalize(camP - P);
  vec3 c = A.rgb * .03;
  for (int i = 0; i < ${v}; i++){
    if (i >= count) break;
    vec3 L = lp[i] - P; float d = length(L);
    if (d > radius) continue; // 광원 영향 반경 밖은 건너뜀
    L /= d;
    float x = clamp(1. - pow(d / radius, 4.), 0., 1.);
    float att = x * x / (d * d + 1.);
    vec3 H = normalize(L + V);
    c += lc[i] * att * (A.rgb * max(dot(N, L), 0.) + .3 * pow(max(dot(N, H), 0.), 48.));
  }
  gl_FragColor = vec4(aces(c * 1.5), 1.);
  #include <colorspace_fragment>
}`;function B(){const e=S(31),r=[],i=[],l=[];for(let n=0;n<v;n++){r.push(new g);const a=e();i.push(new g(.5+.5*Math.cos(6.28*a),.5+.5*Math.cos(6.28*(a-.33)),.5+.5*Math.cos(6.28*(a-.66))).multiplyScalar(2.5)),l.push({r:.5+e()*1.5,s:(e()-.5)*1.6,p:e()*6.28,y:.25+e()*.8,cx:(e()-.5)*14,cz:(e()-.5)*10})}return{pos:r,col:i,orbit:l}}function y(e,r){const i=new b(new P(16,12),r(new f(.6,.6,.6)));i.rotation.x=-Math.PI/2,e.add(i);const l=S(7);for(let n=0;n<40;n++){const a=new f().setHSL(l(),.3,.6),m=n%3===0?new A(.35,24,12):new L(.4,.6+l()*1.4,.4),s=new b(m,r(a));s.position.set((l()-.5)*14,n%3===0?.35:m.parameters.height/2,(l()-.5)*10),e.add(s)}}function C(e,r){return R(e,{antialias:!1,cam:[0,6,9],target:[0,0,0]},({scene:i,camera:l,renderer:n})=>{i.background=new f(329226);const a=B(),m=(c,u)=>{for(let o=0;o<u;o++){const t=a.orbit[o];a.pos[o].set(t.cx+Math.cos(c*t.s+t.p)*t.r,t.y,t.cz+Math.sin(c*t.s+t.p)*t.r)}};if(r==="forward"){y(i,o=>new z({color:o,roughness:.5}));const u=Array.from({length:16},(o,t)=>{const d=new M(new f(a.col[t].x,a.col[t].y,a.col[t].z),3,e.params.num("radius",3),2);return i.add(d),d});return{update(o,t){m(t,16),u.forEach((d,G)=>{d.position.copy(a.pos[G]),d.distance=e.params.num("radius",3)}),e.hud(`포워드: 광원 16개를 모든 물체 셰이더가 매 픽셀 계산
물체 41개 × 광원 16개 (광원을 늘리면 셰이더 재컴파일)`)}}}y(i,c=>new x({glslVersion:_,uniforms:{albedo:{value:c.clone().convertSRGBToLinear()}},vertexShader:D,fragmentShader:U}));const s=new F(1,1,{count:3,type:N,minFilter:w,magFilter:w}),p={gAlbedo:{value:s.textures[0]},gNormal:{value:s.textures[1]},gPos:{value:s.textures[2]},lp:{value:a.pos},lc:{value:a.col},count:{value:64},radius:{value:3},view:{value:r==="albedo"?1:r==="normal"?2:0},camP:{value:new g}},h=new T(new x({uniforms:p,vertexShader:k,fragmentShader:V}));return{update(c,u){const o=e.params.num("lights",64);m(u,o),p.count.value=o,p.radius.value=e.params.num("radius",3),p.camP.value.copy(l.position),e.hud(r==="deferred"?`디퍼드: G-버퍼 1회 + 화면 픽셀마다 광원 ${o}개
물체 수와 광원 수가 곱해지지 않음`:r==="albedo"?"G-버퍼 0: 알베도 (MRT 동시 기록)":"G-버퍼 1: 월드 법선")},render(){n.setRenderTarget(s),n.render(i,l),n.setRenderTarget(null),h.render(n)},resize(c,u,o){s.setSize(Math.floor(c*o),Math.floor(u*o))},dispose(){s.dispose(),h.dispose()}}})}const H=[{mode:"forward",title:"포워드 렌더링 (광원 16개)",kind:"before",caption:"물체를 그릴 때 그 셰이더가 모든 광원을 계산한다. 비용 ∝ 물체 픽셀(오버드로 포함) × 광원 수. three.js는 광원 수만큼 셰이더를 다시 만들어 많이 쓸 수 없다."},{mode:"albedo",title:"G-버퍼: 알베도",kind:"info",caption:"1단계: 조명 없이 표면의 색만 기록. MRT로 법선·위치 버퍼와 한 번에 동시 기록한다."},{mode:"normal",title:"G-버퍼: 법선",kind:"info",caption:"같은 패스에서 기록된 월드 법선. 화면 픽셀 하나당 가장 가까운 표면 하나의 정보만 남는다."},{mode:"deferred",title:"디퍼드 조명 (광원 수 조절)",kind:"after",caption:"2단계: 화면 픽셀마다 G-버퍼를 읽어 광원을 계산. 가려진 표면은 이미 사라져 오버드로 낭비가 없다. 광원을 256개까지 늘려 보자. (데모는 단순화를 위해 전체 화면 패스에서 반경 밖 광원을 건너뛰기만 한다. 실제 엔진은 광원 볼륨·타일로 아예 걸러 낸다.)"}],E={layout:"variants",intro:"디퍼드 셰이딩은 렌더링을 두 단계로 나눕니다. 먼저 <b>지오메트리 패스</b>에서 모든 물체의 색·법선·깊이를 화면 크기의 버퍼들(<b>G-버퍼</b>)에 기록하고, 그다음 <b>조명 패스</b>에서 화면 픽셀마다 G-버퍼를 읽어 광원을 계산합니다. 물체 수와 광원 수가 곱해지지 않아 수백 개의 동적 광원을 쓸 수 있습니다.",how:["지오메트리 패스: MRT로 알베도·법선·거칠기/금속성·(깊이)를 동시에 기록. 이때 깊이 테스트로 보이는 표면만 남는다.","조명 패스: 광원마다 영향 범위(구·원뿔 볼륨)만 그리거나, 타일 단위로 광원 목록을 만들어 해당 픽셀에서만 계산한다.","각 픽셀은 G-버퍼에서 표면 정보를 복원해 BRDF를 평가하고 결과를 누적한다.","반투명은 G-버퍼에 담을 수 없어 별도 포워드 패스로 그린다."],pros:["광원 수에 강함 (수백~수천 개)","오버드로가 셰이딩 비용에 영향 없음","SSAO·SSR·데칼 등 화면 공간 기법이 G-버퍼를 재사용"],cons:["G-버퍼 메모리·대역폭이 큼 (특히 고해상도)","하드웨어 MSAA와 궁합이 나쁨","반투명 불가, 재질 종류가 G-버퍼 형식에 묶임"],usedIn:"Killzone 2, StarCraft II, Battlefield 3, GTA V, UE4 기본 렌더러, Unity HDRP(디퍼드 옵션).",controls:[{type:"range",key:"lights",label:"디퍼드 광원 수",min:1,max:v,step:1,value:64},{type:"range",key:"radius",label:"광원 반경",min:.5,max:6,step:.1,value:3}],viewers:H.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:r=>C(r,e.mode)}))};export{E as default};
