import{u as x,az as g,M as h,r as w,aN as M,z as b,k as D,p as y,H as S,D as k,T,B as z,S as _,C,P as G,aI as U}from"./three.module-BZgG6AUv.js";import{F as R}from"./Pass-By1_TgQk.js";import{m as F}from"./three-viewer-0rZIEDzf.js";import{Q as N}from"./glsl-DOwCk4-f.js";const I=`
uniform float thick;
void main(){
  // 법선 방향으로 부풀린 뒤 앞면을 컬링해 뒷면만 검게 그림 → 테두리처럼 보임
  vec4 vp = modelViewMatrix * vec4(position, 1.);
  vec3 n = normalize(normalMatrix * normal);
  vp.xyz += n * thick * (-vp.z) * .02; // 거리에 비례 → 화면에서 일정한 두께
  gl_Position = projectionMatrix * vp;
}`,L=`
uniform sampler2D tColor; uniform sampler2D tDepth; uniform sampler2D tNormal; uniform vec2 texel; uniform float near; uniform float far; uniform float mode; uniform float width;
varying vec2 vUv;
float lin(float d){ float z = d * 2. - 1.; return 2. * near * far / (far + near - z * (far - near)); }
void main(){
  vec2 o = texel * width;
  float rc = texture2D(tDepth, vUv).x;
  float dc = lin(rc);
  // 깊이: 이웃과의 차이를 거리로 정규화 (멀수록 허용치 증가)
  float dd = 0.; vec3 nc = texture2D(tNormal, vUv).xyz; float nd = 0.;
  vec2 offs[4]; offs[0] = vec2(o.x, 0.); offs[1] = vec2(-o.x, 0.); offs[2] = vec2(0., o.y); offs[3] = vec2(0., -o.y);
  for (int i = 0; i < 4; i++){
    float rn = texture2D(tDepth, vUv + offs[i]).x;
    dd += abs(lin(rn) - dc);
    // 배경(깊이 1)의 법선 버퍼에는 배경색이 들어 있으므로 법선 비교에서 제외 (실루엣은 깊이 항이 잡음)
    if (rc < .99999 && rn < .99999) nd += 1. - dot(texture2D(tNormal, vUv + offs[i]).xyz * 2. - 1., nc * 2. - 1.);
  }
  float e = max(step(.08 * dc, dd), step(.6, nd));
  vec3 col = texture2D(tColor, vUv).rgb;
  if (mode > .5) gl_FragColor = vec4(vec3(1. - e), 1.);
  else gl_FragColor = vec4(mix(col, vec3(.05, .04, .06), e), 1.);
  #include <colorspace_fragment>
}`;function V(e){e.background=new y(15261903),e.add(new S(16777215,9075296,1.5));const r=new k(16777215,2);r.position.set(3,5,2),e.add(r);const l=a=>new U({color:a}),s=[],t=(a,n,d,v,c)=>{const f=new h(a,l(n));return f.position.set(d,v,c),e.add(f),s.push(f),f};t(new T(.5,.18,160,24),16743001,-1.4,1,0),t(new z(1,1,1),6003967,.4,.5,.3),t(new _(.55,48,24),4906624,1.8,.55,-.4),t(new C(.3,.3,1.6,6),16761165,.2,.8,-1.4);const m=new h(new G(10,10),l(13616816));return m.rotation.x=-Math.PI/2,e.add(m),{objs:s,tick:a=>s.forEach((n,d)=>n.rotation.y=a*.4+d)}}function B(e,r){return F(e,{antialias:!0,cam:[3,2.6,4.5],target:[0,.6,0]},({scene:l,camera:s,renderer:t})=>{const{objs:m,tick:a}=V(l);if(r==="none")return{update:(u,i)=>(a(i),e.hud("툰 셰이딩만"))};if(r==="hull"){const u=new x({uniforms:{thick:{value:1}},vertexShader:I,fragmentShader:"void main(){ gl_FragColor = vec4(.05, .04, .06, 1.); }",side:g}),i=m.map(o=>{const p=new h(o.geometry,u);return o.add(p),p});return{update(o,p){a(p),u.uniforms.thick.value=e.params.num("width",1.5),e.hud(`역면 확장 · 메시 ${i.length}개를 한 번 더 그림`)}}}const n=new w(1,1,{samples:4,depthTexture:new M(1,1)}),d=new w(1,1),v=new b,c={tColor:{value:n.texture},tDepth:{value:n.depthTexture},tNormal:{value:d.texture},texel:{value:new D},near:{value:s.near},far:{value:s.far},mode:{value:r==="buffer"?1:0},width:{value:1}},f=new R(new x({uniforms:c,vertexShader:N,fragmentShader:L}));return{update(u,i){a(i),c.width.value=e.params.num("width",1.5),e.hud(r==="edge"?"깊이·법선 불연속을 화면 공간에서 검출":"에지 버퍼 (검정 = 외곽선)")},render(){t.setRenderTarget(n),t.render(l,s),l.overrideMaterial=v,t.setRenderTarget(d),t.render(l,s),l.overrideMaterial=null,t.setRenderTarget(null),f.render(t)},resize(u,i,o){n.setSize(Math.floor(u*o),Math.floor(i*o)),d.setSize(Math.floor(u*o),Math.floor(i*o)),c.texel.value.set(1/(u*o),1/(i*o))},dispose(){n.dispose(),d.dispose(),v.dispose(),f.dispose()}}})}const H=[{mode:"none",title:"외곽선 없음",kind:"before",caption:"툰 셰이딩만으로는 비슷한 색의 물체끼리, 물체와 배경이 섞여 보인다."},{mode:"hull",title:"역면 확장 (Inverted Hull)",kind:"variant",caption:"메시를 법선 방향으로 부풀려 뒷면만 검게 그린다. 실루엣이 선명하고 두께를 정점별로 조절 가능. 상자처럼 법선이 갈라진 모서리에서는 선이 끊긴다."},{mode:"edge",title:"깊이·법선 에지 검출",kind:"after",caption:"후처리로 이웃 픽셀과 깊이 또는 법선이 크게 다른 곳을 선으로. 모든 물체에 일괄 적용되고 안쪽 주름선까지 잡지만, 선 두께가 화면 픽셀 단위로 고정된다."},{mode:"buffer",title:"에지 버퍼",kind:"info",caption:"검출된 에지만 표시. 깊이 차(실루엣)와 법선 차(모서리·주름)가 함께 잡힌다."}],Q={layout:"variants",intro:"만화·셀 애니메이션 느낌을 내려면 물체의 <b>외곽선</b>이 필요합니다. 메시를 한 번 더 부풀려 그리는 <b>역면 확장</b>과, 렌더링된 화면에서 깊이·법선이 끊기는 곳을 찾는 <b>후처리 에지 검출</b>이 대표적인 두 방식입니다. 둘의 결과 차이를 비교합니다.",how:["역면 확장: 같은 메시를 정점 셰이더에서 법선 방향으로 밀어내고, 앞면 컬링 + 단색으로 그린다. 원래 메시가 앞에서 가려 테두리만 남는다.","하드 엣지 메시는 부드러운 법선을 따로 구워(정점 컬러 등에) 확장 방향으로 써야 선이 끊기지 않는다.","에지 검출: 깊이 버퍼와 법선 버퍼에 Sobel/Roberts 필터를 적용해 기울기가 임계값을 넘는 픽셀을 선으로.","깊이 임계값은 거리에 비례하게 해야 비스듬한 바닥에서 거짓 에지가 생기지 않는다.","물체 ID 버퍼를 추가하면 같은 깊이의 서로 다른 물체 경계도 잡을 수 있다."],pros:["역면 확장: 단순, 선 두께·색을 메시별로 제어, MSAA 지원","에지 검출: 장면 전체에 한 번, 내부 주름선까지 검출"],cons:["역면 확장: 드로우 콜 2배, 하드 엣지에서 끊김, 내부 선 없음","에지 검출: 픽셀 두께 고정·앨리어싱, 임계값 튜닝이 장면마다 필요"],usedIn:"Guilty Gear Xrd(역면 확장 + 정점 컬러 두께, GDC 2015 발표)와 여러 애니풍 모바일 게임, Borderlands 시리즈(후처리 에지 검출로 자주 언급), 엔진의 선택 하이라이트 외곽선.",controls:[{type:"range",key:"width",label:"선 두께",min:.5,max:4,step:.25,value:1.5}],viewers:H.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:r=>B(r,e.mode)}))};export{Q as default};
