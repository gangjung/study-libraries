import{p as h,g as S,a2 as M,r as z,aN as C,au as b,w as k,P as D,B as x,C as F,S as T,aB as g,u as R,M as A}from"./three.module-BZgG6AUv.js";import{m as N}from"./three-viewer-0rZIEDzf.js";const n=2048,V=`
uniform mat4 lightVP;
varying vec3 vN; varying vec4 vL;
void main(){ vec4 w = modelMatrix * vec4(position, 1.); vN = normalize(mat3(modelMatrix) * normal); vL = lightVP * w; gl_Position = projectionMatrix * viewMatrix * w; }`,G=`
uniform sampler2D shadowMap; uniform vec3 lightDir; uniform vec3 albedo; uniform float mode; uniform float lightSize; uniform float pcfR; uniform float texel;
varying vec3 vN; varying vec4 vL;
// 16개 포아송 디스크 샘플
const vec2 PD[16] = vec2[](vec2(-.94,-.40),vec2(.95,-.77),vec2(-.09,-.93),vec2(.34,.29),vec2(-.92,.46),vec2(-.82,-.88),vec2(-.38,.28),vec2(.97,.76),vec2(.44,-.97),vec2(.54,-.47),vec2(-.26,-.42),vec2(-.03,.90),vec2(.79,.19),vec2(-.71,-.24),vec2(-.33,.75),vec2(.31,.65));
float depthAt(vec2 uv){ return texture2D(shadowMap, uv).x; }
float pcf(vec2 uv, float z, float r){ float s = 0.; for (int i = 0; i < 16; i++) s += step(z, depthAt(uv + PD[i] * r)); return s / 16.; }
void main(){
  vec3 N = normalize(vN);
  vec3 p = vL.xyz / vL.w * .5 + .5;
  float z = p.z - .0015;
  float vis = 1.; float pen = 0.;
  if (p.x > 0. && p.x < 1. && p.y > 0. && p.y < 1.) {
    if (mode < .5) vis = step(z, depthAt(p.xy));
    else if (mode < 1.5) vis = pcf(p.xy, z, pcfR * texel);
    else {
      // 1) 차폐물 탐색: 광원 크기만큼의 영역에서 수신면보다 가까운 깊이들의 평균
      float search = lightSize * texel * 60.;
      float sum = 0., n = 0.;
      for (int i = 0; i < 16; i++){ float d = depthAt(p.xy + PD[i] * search); if (d < z) { sum += d; n += 1.; } }
      if (n > 0.) {
        float blocker = sum / n;
        // 2) 반그림자 폭 = (수신 깊이 − 차폐 깊이) × 광원 크기  (닮은 삼각형)
        pen = (z - blocker) * lightSize * 400.;
        // 3) 그 폭으로 PCF
        vis = pcf(p.xy, z, max(pen, 1.) * texel);
      }
    }
  }
  vec3 c = albedo * (max(dot(N, -lightDir), 0.) * vis * 2.2 + .35);
  if (mode > 2.5) c = mix(vec3(.15), vec3(1., .6, .1), clamp(pen / 12., 0., 1.)) * (.4 + .6 * vis);
  gl_FragColor = vec4(c, 1.);
  #include <colorspace_fragment>
}`;function I(e,l){return N(e,{antialias:!0,cam:[5,4.5,6],target:[0,.8,0]},({scene:a,camera:w,renderer:s})=>{a.background=new h(1711654);const u=new S(-.35,-1,-.25).normalize(),o=new M(-7,7,7,-7,.1,30),c=new z(n,n,{depthTexture:new C(n,n,b)}),y=t=>({shadowMap:{value:c.depthTexture},lightVP:{value:new g},lightDir:{value:u},albedo:{value:new h(t).convertSRGBToLinear()},mode:{value:l},lightSize:{value:1},pcfR:{value:2},texel:{value:1/n}}),d=[],f=new k({colorWrite:!1}),r=(t,p,v)=>{const i=new R({uniforms:y(p),vertexShader:V,fragmentShader:G});d.push(i);const m=new A(t,i);return m.position.set(...v),a.add(m),m};r(new D(14,14).rotateX(-Math.PI/2),11579560,[0,0,0]),r(new x(.8,.8,.8),6003967,[-2,.4,1]),r(new x(2,.1,1.2),16761165,[1.5,2.6,.5]);for(let t=0;t<5;t++)r(new F(.06,.06,3,12),14540253,[-1.6+t*.5,1.5,-1.8]);const P=r(new T(.4,32,16),16734810,[0,1.5,1.5]);return{update(t,p){P.position.y=.4+Math.abs(Math.sin(p*.8))*2.4,o.position.copy(u).multiplyScalar(-14),o.lookAt(0,0,0),o.updateMatrixWorld();const v=new g().multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse);for(const i of d)i.uniforms.lightVP.value.copy(v),i.uniforms.lightSize.value=e.params.num("size",1),i.uniforms.pcfR.value=e.params.num("pcf",3);e.hud(["하드 섀도: 비교 1회",`PCF: 고정 반경 ${e.params.num("pcf",3)}텍셀, 16샘플`,`PCSS: 차폐물 탐색 16 + PCF 16 · 광원 크기 ${e.params.num("size",1)}`,"주황 = 넓은 반그림자"][l])},render(){a.overrideMaterial=f,s.setRenderTarget(c),s.render(a,o),s.setRenderTarget(null),a.overrideMaterial=null,s.render(a,w)},dispose:()=>{c.dispose(),f.dispose()}}})}const L=[{mode:0,title:"하드 섀도",kind:"before",caption:"점광원처럼 경계가 칼같이 날카롭고 계단이 보인다."},{mode:1,title:"PCF (고정 반경)",kind:"variant",caption:"모든 그림자 경계가 같은 폭으로 흐려진다. 바닥에 닿은 상자도, 높이 뜬 판도 똑같이 부드러워 거리감이 없다."},{mode:2,title:"PCSS",kind:"after",caption:"차폐물이 수신면에서 멀수록 반그림자가 넓어진다. 상자 밑동은 선명하고, 떠 있는 판과 공의 그림자는 퍼진다. 공이 튀어 오를수록 그림자가 흐려진다."},{mode:3,title:"반그림자 폭 시각화",kind:"info",caption:"PCSS가 픽셀마다 추정한 반그림자 크기. 차폐물과의 거리에 비례한다."}],_={layout:"variants",intro:"실제 광원은 크기가 있어서 그림자 경계에 <b>반그림자(penumbra)</b>가 생기고, 그 폭은 <b>차폐물과 그림자가 드리운 면 사이 거리</b>에 비례합니다. 연필을 종이에 대면 끝은 선명하고 위쪽은 흐린 것과 같습니다. PCSS는 섀도 맵에서 차폐물 깊이를 찾아 이 폭을 추정하고, 그만큼 PCF 반경을 바꿉니다. 광원 크기를 키워 보세요.",how:["일반 섀도 맵을 렌더링한다.","차폐물 탐색: 수신점 주변(광원 크기에 비례한 영역)에서 수신점보다 가까운 깊이들의 평균 = 평균 차폐물 깊이.","반그림자 폭 = (수신 깊이 − 차폐 깊이) / 차폐 깊이 × 광원 크기 (방향광은 거리 차에 비례).","그 폭을 반경으로 PCF 필터링해 가시성을 구한다.","샘플 수가 많아 노이즈·비용 문제 → 회전 포아송 디스크 + TAA, 또는 레이 트레이싱 그림자로 대체."],pros:["접촉부는 선명하고 멀수록 흐린 물리적으로 그럴듯한 그림자","섀도 맵 파이프라인을 그대로 활용"],cons:["픽셀당 수십 번 샘플 → 비쌈","겹친 차폐물에서 평균 깊이가 틀려 부정확","큰 반그림자는 섀도 맵 해상도·필터 한계"],usedIn:"Fernando(NVIDIA, 2005) 발표. NVIDIA GameWorks 소프트 섀도 옵션을 넣은 일부 PC 게임, Unity HDRP의 High 섀도 필터링, three.js PCSS 예제.",controls:[{type:"range",key:"size",label:"광원 크기",min:.1,max:4,step:.1,value:1},{type:"range",key:"pcf",label:"PCF 고정 반경 (텍셀)",min:.5,max:12,step:.5,value:3}],viewers:L.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:l=>I(l,e.mode)}))};export{_ as default};
