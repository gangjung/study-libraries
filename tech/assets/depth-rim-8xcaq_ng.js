import{p as x,r as b,aN as y,w as k,k as c,g as f,u as M,aq as z}from"./three.module-BZgG6AUv.js";import{m as N}from"./three-viewer-0rZIEDzf.js";import{b as T}from"./figure-GCHR3crq.js";const L=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,S=`
#include <packing>
uniform float mode; uniform vec3 L; uniform vec3 camP; uniform vec3 albedo;
uniform sampler2D depthTex; uniform vec2 res; uniform float cNear; uniform float cFar; uniform vec2 Ls; uniform float width; uniform float fres;
varying vec3 vN; varying vec3 vW;
float viewZ(float d){ return -perspectiveDepthToViewZ(d, cNear, cFar); }
void main(){
  vec3 N = normalize(vN), V = normalize(camP - vW);
  float ndl = dot(N, L);
  float lit = smoothstep(-.02, .02, ndl);
  vec3 col = albedo * mix(vec3(.62, .58, .8), vec3(1.), lit);
  // 프레넬 림: 표면이 시선과 비스듬할수록
  float fr = smoothstep(fres, fres + .03, 1. - max(dot(N, V), 0.)) * smoothstep(-.3, .2, ndl);
  // 깊이 림: 빛 방향(화면 공간)으로 일정 픽셀 옆의 깊이가 훨씬 멀면 = 실루엣 가장자리
  vec2 uv = gl_FragCoord.xy / res;
  float self = viewZ(gl_FragCoord.z);
  float other = viewZ(texture2D(depthTex, uv + Ls * width / res).x);
  float dr = step(.25, other - self) * smoothstep(-.4, .1, ndl);
  if (mode > 0.5 && mode < 1.5) col += fr * .55;
  if (mode > 1.5 && mode < 2.5) col += dr * .55;
  if (mode > 2.5) col = vec3(.08) + vec3(fr, dr, 0.) * .9;
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function V(e,s){return N(e,{antialias:!0,cam:[1.6,1.55,3.4],target:[0,1.15,0],near:.1,far:30},({scene:o,camera:r,renderer:n})=>{o.background=new x(s==="mask"?329482:2765648);const m=new b(4,4,{depthTexture:new y(4,4),depthBuffer:!0}),p=new k,h=[],w=T(o,(t,i)=>{const a=new M({uniforms:{mode:{value:["none","fresnel","depth","mask"].indexOf(s)},L:{value:new f},camP:{value:new f},albedo:{value:i.convertSRGBToLinear()},depthTex:{value:m.depthTexture},res:{value:new c(1,1)},cNear:{value:r.near},cFar:{value:r.far},Ls:{value:new c},width:{value:6},fres:{value:.62}},vertexShader:L,fragmentShader:S,side:z});return h.push(a),a}),d=new c(1,1),v=new f;return{resize(t,i,a){d.set(Math.floor(t*a),Math.floor(i*a)),m.setSize(d.x,d.y)},update(t,i){const a=e.params.bool("animate")?i*.5:2.4,g=new f(Math.cos(a),.45,Math.sin(a)-.6).normalize();v.copy(g).transformDirection(r.matrixWorldInverse);const u=new c(v.x,v.y);u.lengthSq()<1e-4&&u.set(1,0),u.normalize();for(const l of h)l.uniforms.L.value.copy(g),l.uniforms.camP.value.copy(r.position),l.uniforms.res.value.copy(d),l.uniforms.Ls.value.copy(u),l.uniforms.width.value=e.params.num("width",6)*n.getPixelRatio(),l.uniforms.fres.value=e.params.num("fres",.62);w.root.rotation.y=Math.sin(i*.3)*.4,e.hud({none:"림 라이트 없음",fresnel:"프레넬 림 (1 − N·V 임계값)",depth:`깊이 오프셋 림 (${e.params.num("width",6)}px 옆 깊이 비교)`,mask:"빨강 = 프레넬 림 · 초록 = 깊이 림 · 노랑 = 둘 다"}[s])},render(){const t=o.background;o.background=null,o.overrideMaterial=p,n.setRenderTarget(m),n.clear(),n.render(o,r),o.overrideMaterial=null,o.background=t,n.setRenderTarget(null),n.render(o,r)},dispose(){var t;(t=m.depthTexture)==null||t.dispose(),m.dispose(),p.dispose()}}})}const D=[{mode:"none",title:"림 라이트 없음",kind:"before",caption:"어두운 배경 앞에서 캐릭터 윤곽이 배경에 묻힌다. 애니메이션 원화는 역광 쪽 실루엣에 밝은 선을 넣어 캐릭터를 띄운다."},{mode:"fresnel",title:"프레넬 림",kind:"variant",caption:"시선과 표면이 비스듬한 곳을 밝힌다. 구처럼 둥근 곳은 얇게, 치마·팔처럼 넓게 기운 면은 두꺼운 덩어리로 칠해져 두께가 들쭉날쭉하고, 실루엣이 아닌 안쪽에도 생긴다."},{mode:"depth",title:"깊이 기반 림",kind:"after",caption:"깊이 버퍼에서 빛 방향으로 몇 픽셀 옆을 읽어, 그곳이 훨씬 멀면(배경) 가장자리로 판정. 화면에서 항상 같은 두께, 실제 실루엣에만, 빛이 오는 쪽에만 생긴다. 원신이 대표적인 예로 자주 거론된다."},{mode:"mask",title:"두 림 마스크 비교",kind:"info",caption:"빨강은 프레넬, 초록은 깊이 림. 프레넬은 면 안쪽에 넓게 퍼지고, 깊이 림은 외곽을 따라 일정한 선이다."}],_={layout:"compare",intro:"<b>림 라이트</b>는 실루엣 가장자리를 밝혀 캐릭터를 배경에서 떼어 내는 연출입니다. 흔한 프레넬(1 − N·V) 방식은 표면 곡률에 따라 두께가 들쭉날쭉합니다. 원신 등에서 쓰이는 것으로 알려진 <b>화면 공간 깊이 림</b>은 깊이 버퍼를 빛 방향으로 일정 픽셀만큼 옆에서 읽어, 깊이 차이가 크면 가장자리로 판정해 <b>일정한 두께의 선</b>을 그립니다.",how:["먼저 깊이 프리패스(또는 디퍼드의 깊이 버퍼)를 준비.","캐릭터 셰이더에서 화면 좌표 uv와 자신의 선형 깊이 z를 구함.","빛 방향을 뷰 공간으로 변환해 화면 2D 방향으로 → uv + 방향 × 폭(px) 위치의 깊이 z′ 샘플.","z′ − z > 임계값이면 림. 폭은 카메라 거리로 보정해 원근에 따라 자연스럽게.","빛을 향한 면에서만 켜고, 결과에 램프·환경색을 곱해 장면 조명과 맞춤."],pros:["화면에서 두께가 일정해 셀화 같은 선","실제 실루엣에만 생김","깊이 버퍼만 있으면 됨 (샘플 1회)"],cons:["깊이 프리패스 필요","화면 밖·가려진 부분 정보가 없어 가장자리에서 끊김","앞에 다른 물체가 있으면 잘못된 림 발생"],usedIn:"원신(화면 공간 깊이 림 — 커뮤니티 분석으로 알려짐)과 이를 따르는 애니풍 3D 게임들, 원신 스타일을 재현한 Unity URP·UE 커뮤니티 툰 셰이더의 Screen Space Rim 옵션.",controls:[{type:"range",key:"width",label:"깊이 림 두께 (px)",min:1,max:16,step:1,value:6},{type:"range",key:"fres",label:"프레넬 임계값",min:.3,max:.9,step:.01,value:.62},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:D.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:s=>V(s,e.mode)}))};export{_ as default};
