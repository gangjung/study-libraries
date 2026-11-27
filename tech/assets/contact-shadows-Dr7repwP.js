import{e as M,r as w,aN as C,s as g,k as j,g as T,aB as S,u as x,p as z,H as F,D as U,M as p,P as I,b as m,S as y,B as V,C as b}from"./three.module-BZgG6AUv.js";import{F as k}from"./Pass-By1_TgQk.js";import{m as _}from"./three-viewer-0rZIEDzf.js";import{a as P}from"./canvas-viewer-Btf0JXdr.js";import{Q as D}from"./glsl-DOwCk4-f.js";const G=`
uniform sampler2D tColor; uniform sampler2D tDepth; uniform mat4 proj; uniform mat4 projInv; uniform vec3 lightV;
uniform float len; uniform float steps; uniform float thick; uniform float mode; uniform vec2 res;
varying vec2 vUv;
vec3 vpos(vec2 uv){ float d = texture2D(tDepth, uv).x; vec4 p = projInv * vec4(uv * 2. - 1., d * 2. - 1., 1.); return p.xyz / p.w; }
float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(.06711056, .00583715)))); }
void main(){
  vec3 col = texture2D(tColor, vUv).rgb;
  float d0 = texture2D(tDepth, vUv).x;
  float occ = 0.;
  if (d0 < 1. && mode > .5) {
    vec3 P = vpos(vUv);
    // 광원 방향으로 짧게 전진하며 깊이 버퍼보다 뒤로 들어가면(가려지면) 그림자
    float stepLen = len / steps;
    float j = ign(gl_FragCoord.xy);
    for (int i = 1; i <= 32; i++){
      if (float(i) > steps) break;
      vec3 Q = P + lightV * stepLen * (float(i) - j);
      vec4 c = proj * vec4(Q, 1.);
      vec2 uv = c.xy / c.w * .5 + .5;
      if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) break;
      float sz = vpos(uv).z;
      float diff = sz - Q.z;
      if (diff > .002 && diff < thick) { occ = 1. - float(i) / (steps + 1.) * .5; break; }
    }
  }
  if (mode > 2.5) { gl_FragColor = vec4(vec3(1. - occ), 1.); return; }
  gl_FragColor = vec4(col * (1. - occ * .75), 1.);
}`,Q=`uniform sampler2D t; varying vec2 vUv; void main(){ gl_FragColor = texture2D(t, vUv);
  #include <colorspace_fragment>
}`;function R(e){e.background=new z(11056324),e.add(new F(14674175,6314056,1.1));const t=new U(16773853,3);t.position.set(-4,3.2,2.5),t.castShadow=!0,t.shadow.mapSize.set(256,256),Object.assign(t.shadow.camera,{left:-4,right:4,top:4,bottom:-4,near:.5,far:20}),t.shadow.bias=-.002,t.shadow.normalBias=.03,e.add(t);const c=new p(new I(12,12),new m({color:12103840,roughness:.9}));c.rotation.x=-Math.PI/2,c.receiveShadow=!0,e.add(c);const s=P(4),n=new m({color:8029846,roughness:.6});for(let o=0;o<26;o++){const l=.04+s()*.08,a=new p(new y(l,16,8),n);a.scale.y=.6,a.position.set(-1.8+s()*3.6,l*.5,-1+s()*2.4),a.castShadow=a.receiveShadow=!0,e.add(a)}const f=new m({color:10119744,roughness:.7}),d=new p(new V(.8,.06,.8),f);d.position.set(1.4,.6,-.6),e.add(d);for(const[o,l]of[[1.07,-.93],[1.73,-.93],[1.07,-.27],[1.73,-.27]]){const a=new p(new b(.025,.025,.6,8),f);a.position.set(o,.3,l),a.castShadow=!0,e.add(a)}d.castShadow=!0;const r=new p(new b(.12,.1,.25,24),new m({color:13656144}));r.position.set(-1,.125,.8),r.castShadow=r.receiveShadow=!0,e.add(r);const i=new p(new y(.3,32,16),new m({color:6003967}));return i.castShadow=i.receiveShadow=!0,e.add(i),{sun:t,tick:o=>i.position.set(-.2+Math.sin(o*.5)*.6,.3,-.6)}}function B(e,t){return _(e,{antialias:!1,cam:[.6,1.6,2.8],target:[0,.15,-.2]},({scene:c,camera:s,renderer:n})=>{n.shadowMap.enabled=t==="map"||t==="both",n.shadowMap.type=M;const{sun:f,tick:d}=R(c),r=new w(1,1,{type:g,depthTexture:new C(1,1)}),i=new w(1,1,{type:g}),o={tColor:{value:r.texture},tDepth:{value:r.depthTexture},proj:{value:new S},projInv:{value:new S},lightV:{value:new T},len:{value:.25},steps:{value:16},thick:{value:.1},mode:{value:t==="map"?0:t==="mask"?3:1},res:{value:new j}},l=new k(new x({uniforms:o,vertexShader:D,fragmentShader:G})),a=new k(new x({uniforms:{t:{value:i.texture}},vertexShader:D,fragmentShader:Q}));return{update(h,v){d(v),s.updateMatrixWorld(),o.proj.value.copy(s.projectionMatrix),o.projInv.value.copy(s.projectionMatrixInverse),o.lightV.value.copy(f.position).normalize().transformDirection(s.matrixWorldInverse),o.len.value=e.params.num("len",.25),o.steps.value=e.params.num("steps",16),o.thick.value=e.params.num("thick",.1),e.hud(t==="map"?"섀도 맵 256² (넓은 영역을 덮음)":t==="contact"?`화면 공간 레이마칭 ${o.steps.value}스텝 · 길이 ${o.len.value}m`:t==="both"?"섀도 맵 + 접촉 그림자":"접촉 그림자 마스크")},render(){n.setRenderTarget(r),n.render(c,s),n.setRenderTarget(i),l.render(n),n.setRenderTarget(null),a.render(n)},resize(h,v,u){r.setSize(Math.floor(h*u),Math.floor(v*u)),i.setSize(Math.floor(h*u),Math.floor(v*u)),o.res.value.set(h*u,v*u)},dispose(){r.dispose(),i.dispose(),l.dispose(),a.dispose()}}})}const L=[{mode:"map",title:"섀도 맵만",kind:"before",caption:"넓은 범위를 담느라 텍셀이 커서, 자갈·컵 바닥·의자 다리 끝 같은 작은 접촉부 그림자가 뭉개지거나 사라지고 물체가 떠 보인다."},{mode:"contact",title:"접촉 그림자만",kind:"variant",caption:"픽셀에서 광원 쪽으로 짧게 깊이 버퍼를 따라가 가려지는지 본다. 작은 디테일의 그림자는 정확하지만 길이가 짧아 큰 그림자는 표현 못 한다."},{mode:"both",title:"섀도 맵 + 접촉 그림자",kind:"after",caption:"큰 그림자는 섀도 맵, 접지 부분은 접촉 그림자가 맡는다. 자갈과 컵이 바닥에 단단히 붙어 보인다."},{mode:"mask",title:"접촉 그림자 마스크",kind:"info",caption:"화면 공간에서 찾은 가림. 화면 밖이나 깊이 버퍼에 없는 뒷면은 모르기 때문에 길이를 짧게 제한한다."}],O={layout:"compare",intro:"섀도 맵은 넓은 영역을 담느라 해상도가 부족해서 <b>물체가 바닥에 닿는 부분</b>의 작은 그림자를 놓치기 쉽습니다. 접촉 그림자는 이미 있는 <b>깊이 버퍼</b>를 이용해 각 픽셀에서 광원 방향으로 몇 cm만 레이마칭해 가려짐을 찾습니다. 비용이 작고 접지감이 크게 좋아져 섀도 맵의 보조로 널리 쓰입니다.",how:["깊이 버퍼에서 픽셀의 뷰 공간 위치를 복원한다.","광원 방향(뷰 공간)으로 정해진 짧은 거리를 N스텝으로 나눠 전진한다. 스텝마다 디더로 시작점을 흔든다.","각 점을 화면에 투영해 깊이 버퍼와 비교, 그 점이 표면 뒤(두께 이내)에 있으면 가려진 것.","결과를 섀도 맵 그림자와 곱하고, TAA가 디더 노이즈를 평균 낸다."],pros:["광원 하나당 저렴한 고정 비용","섀도 맵 해상도와 무관하게 작은 접촉부가 선명","캐릭터 얼굴·손가락 같은 세밀한 자기 그림자에도 효과적"],cons:["화면 밖·깊이 버퍼에 없는 물체는 무시","두께를 모르므로 얇은 물체 뒤로 그림자가 길게 끌림","광원 방향이 카메라와 반대일수록 정확도 하락"],usedIn:"UE4/5 Contact Shadows(광원 옵션), Unity HDRP Contact Shadows, Days Gone(Bend Studio의 화면 공간 그림자).",controls:[{type:"range",key:"len",label:"레이 길이 (m)",min:.05,max:1,step:.05,value:.25},{type:"range",key:"steps",label:"스텝 수",min:2,max:32,step:1,value:16},{type:"range",key:"thick",label:"두께 허용치",min:.01,max:.5,step:.01,value:.1}],viewers:L.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>B(t,e.mode)}))};export{O as default};
