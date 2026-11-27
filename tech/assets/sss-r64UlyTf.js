import{p as v,S as u,C as b,at as h,T as y,M as f,w as S,g as l,u as k}from"./three.module-BZgG6AUv.js";import{m as g}from"./three-viewer-0rZIEDzf.js";import{F as x,W as L}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const P=`
${x}
uniform float mode; uniform vec3 lp; uniform vec3 camP; uniform vec3 albedo; uniform float thick; uniform float wrap; uniform float power; uniform float distortion;
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW);
  vec3 Lv = lp - vW; float d = length(Lv); vec3 L = Lv / d;
  float att = 6. / (1. + d * d);
  float ndl = dot(N, L);
  vec3 sssCol = vec3(1., .25, .12); // 피부 속 혈색
  vec3 col;
  if (mode < .5) col = albedo * max(ndl, 0.) * att;
  else {
    // 랩 조명: 빛이 표면 아래로 번져 명암 경계가 넓고 붉게
    float w = max((ndl + wrap) / (1. + wrap), 0.);
    vec3 diff = albedo * mix(sssCol * w, vec3(max(ndl, 0.)), max(ndl, 0.));
    col = diff * att;
    if (mode > 1.5) {
      // 투과: 광원 반대편에서 볼 때 얇은 부분이 빛남 (Barré-Brisebois 2011)
      vec3 H = normalize(L + N * distortion);
      float VdH = pow(clamp(dot(V, -H), 0., 1.), power);
      float trans = VdH * exp(-thick * 3.);
      col += sssCol * albedo * trans * att * 3.;
    }
    if (mode > 2.5) col = vec3(exp(-thick * 3.)) * .8;
  }
  col += albedo * .03;
  gl_FragColor = vec4(acesTone(col * 1.5), 1.);
  #include <colorspace_fragment>
}`;function C(e,n){return g(e,{antialias:!0,cam:[0,1.2,4],target:[0,1,0]},({scene:s,camera:w})=>{s.background=new v(460811);const c=[],r=(a,m,i)=>{const t=new k({uniforms:{mode:{value:n},lp:{value:new l},camP:{value:new l},albedo:{value:new l(.85,.62,.52)},thick:{value:m},wrap:{value:.5},power:{value:4},distortion:{value:.3}},vertexShader:L,fragmentShader:P});c.push(t);const o=new f(a,t);return o.position.set(...i),s.add(o),o};r(new u(.6,64,32),1.1,[0,1.1,0]);const d=r(new b(.28,.22,.04,48),.05,[.68,1.15,-.05]);d.rotation.set(0,0,Math.PI/2),d.scale.set(1,1,1.4);for(let a=0;a<4;a++)r(new h(.07,.45,8,16),.15,[-1.3+a*.18,.6,.3]);r(new y(.25,.08,120,16),.2,[1.3,.6,.4]);const p=new f(new u(.06,12,8),new S({color:16772829}));return s.add(p),{update(a,m){const i=e.params.bool("animate")?m*.5:2.6,t=new l(Math.sin(i)*2.2,1.4,Math.cos(i)*2.2-.3);p.position.copy(t);for(const o of c)o.uniforms.lp.value.copy(t),o.uniforms.camP.value.copy(w.position),o.uniforms.wrap.value=e.params.num("wrap",.5),o.uniforms.power.value=e.params.num("power",4);e.hud(["램버트: 빛이 표면에서만 반사",`랩 조명 (wrap ${e.params.num("wrap",.5)})`,"랩 + 두께 기반 투과","두께 맵 (밝을수록 얇음)"][n])}}})}const M=[{mode:0,title:"표면 반사만 (램버트)",kind:"before",caption:"빛이 피부 표면에서 바로 반사된다고 보면 명암 경계가 딱딱하고 플라스틱·밀랍 인형처럼 보인다. 광원이 뒤에 있으면 그냥 검다."},{mode:1,title:"랩 조명 (확산 근사)",kind:"variant",caption:'빛이 피부 속으로 들어가 퍼진 뒤 나오는 효과를 "명암 경계를 감싸듯 넓히고 붉게" 근사. 가장 싸고 흔한 피부 트릭.'},{mode:2,title:"+ 두께 기반 투과",kind:"after",caption:"광원이 뒤로 돌아가면 얇은 귀와 손가락이 붉게 빛난다(역광의 귀). 시선이 광원 쪽을 볼수록, 두께가 얇을수록 강하다."},{mode:3,title:"두께 맵",kind:"info",caption:"투과 계산에 쓰는 두께. 실전에서는 메시를 뒤집어 AO를 굽는 식으로 정점/텍스처에 저장한다(여기선 물체별 상수)."}],H={layout:"compare",intro:"피부·대리석·우유·나뭇잎은 빛이 표면에서 바로 튕기지 않고 <b>내부로 들어가 산란한 뒤</b> 다른 곳으로 나옵니다. 그래서 명암 경계가 부드럽고 붉으며, 역광에서 귀와 손가락이 빛납니다. 실시간에서는 확산을 넓히는 근사와 두께 기반 투과로 이 느낌을 냅니다. 광원이 물체 뒤를 돌아가는 순간을 보세요.",how:["랩 조명: max((N·L + w)/(1 + w), 0)에 피부 산란색을 섞어 그늘 경계를 넓히고 붉게 만든다.","화면 공간 SSS: 조명 결과를 깊이 인식 블러(분리형 프로필 커널)로 퍼뜨린다 (Jimenez 2015).","사전 적분 SSS: 곡률과 N·L을 두 축으로 한 LUT에서 산란 결과를 읽는다 (Penner 2011).","투과: 광원 반대편에서 (V·−(L + N·d))^p × 두께 감쇠. 두께는 반전 AO로 미리 굽는다."],pros:["캐릭터 피부의 생동감을 크게 높임","근사 기법은 비용이 매우 작음"],cons:["정확한 확산은 비싼 블러·레이 트레이싱 필요","두께 맵은 정적이라 변형에 부정확","과하면 고무·밀랍처럼 보임"],usedIn:"2010년대 이후 AAA 캐릭터 피부의 기본 요소. UE Subsurface Profile·Preintegrated Skin, Unity HDRP Diffusion Profile, 두께 기반 투과 근사는 Barré-Brisebois & Bouchard(EA)의 GDC 2011 발표로 널리 퍼짐.",controls:[{type:"range",key:"wrap",label:"랩 정도",min:0,max:1,step:.05,value:.5},{type:"range",key:"power",label:"투과 집중도",min:1,max:12,step:.5,value:4},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:M.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:n=>C(n,e.mode)}))};export{H as default};
