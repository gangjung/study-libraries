import{p,g as l,u,M as c,P as f,S as d}from"./three.module-BZgG6AUv.js";import{m as v}from"./three-viewer-0rZIEDzf.js";import{F as x,W as h}from"./shade-CcOaBxDj.js";import{m}from"./noise-QBBaQyUX.js";import"./glsl-DOwCk4-f.js";import"./canvas-viewer-Btf0JXdr.js";const b=`
${x}
uniform float mode; uniform float scale; uniform float sharp; uniform vec3 L;
// 방향을 알 수 있는 절차적 "텍스처": 벽돌 + 글자 같은 줄무늬
vec3 tex(vec2 uv){
  vec2 b = uv * vec2(1., 2.);
  b.x += step(1., mod(b.y, 2.)) * .5;
  vec2 f = fract(b);
  float mortar = step(.06, f.x) * step(.1, f.y);
  float n = vnoise(uv * 8.) * .25;
  vec3 brick = mix(vec3(.55, .22, .15), vec3(.75, .35, .22), hash12(floor(b))) - n * .3;
  return mix(vec3(.82, .8, .75), brick, mortar);
}
void main(){
  vec3 N = normalize(vN);
  vec3 p = vW * scale;
  vec3 col;
  if (mode < .5) col = tex(p.xz);
  else if (mode < 1.5) col = tex(vUv * vec2(8., 4.));
  else {
    // 법선 성분의 거듭제곱으로 세 축 투영을 섞음 (가파를수록 해당 축이 지배)
    vec3 w = pow(abs(N), vec3(sharp));
    w /= (w.x + w.y + w.z);
    if (mode > 2.5) col = w;
    else col = tex(p.zy) * w.x + tex(p.xz) * w.y + tex(p.xy) * w.z;
  }
  float diff = max(dot(N, L), 0.) * .85 + .25;
  gl_FragColor = vec4(col * (mode > 2.5 ? 1. : diff), 1.);
  #include <colorspace_fragment>
}`;function y(){const t=m(3),o=new f(8,8,120,120);o.rotateX(-Math.PI/2);const a=o.getAttribute("position");for(let e=0;e<a.count;e++){const r=a.getX(e),n=a.getZ(e),s=(t.fbm(r*.25,n*.25,4,.5,2)-.5)*4.4,i=Math.max(0,Math.min(1,(r+Math.sin(n*.7)*.8-.5)*2.5))*1.6;a.setY(e,s+i)}return o.computeVertexNormals(),o}function w(){const t=m(8),o=new d(1,96,64),a=o.getAttribute("position"),e=new l;for(let r=0;r<a.count;r++){e.fromBufferAttribute(a,r);const n=1+(t.fbm(e.x*1.4+5,e.y*1.4+e.z*.7,4,.5,2)-.5)*1.2;e.multiplyScalar(n),e.y*=.8,a.setXYZ(r,e.x,e.y,e.z)}return o.computeVertexNormals(),o}function k(t,o){return v(t,{antialias:!0,cam:[4.2,4.2,6],target:[0,1,0]},({scene:a})=>{a.background=new p(10466248);const e={mode:{value:o},scale:{value:1},sharp:{value:4},L:{value:new l(.5,.8,.35).normalize()}},r=new u({uniforms:e,vertexShader:h,fragmentShader:b});a.add(new c(y(),r));const n=new c(w(),r);return n.position.set(-1.6,1.6,1.6),a.add(n),{update(s,i){e.scale.value=t.params.num("scale",1),e.sharp.value=t.params.num("sharp",4),n.rotation.y=t.params.bool("spin")?i*.3:0,t.hud(["UV = 월드 XZ (위에서 투영)","메시 자체 UV (구의 위경도)",`세 축 투영 블렌딩 · 날카로움 ${e.sharp.value}`,"빨강 = X축 투영, 초록 = Y축, 파랑 = Z축"][o])}}})}const g=[{mode:0,title:"위에서 평면 투영 UV",kind:"before",caption:"지형에 흔히 쓰는 XZ 좌표 UV. 평지는 좋지만 절벽과 바위 옆면에서 벽돌이 세로로 길게 늘어난다."},{mode:1,title:"메시 UV (구면 펼침)",kind:"variant",caption:"바위의 원래 UV. 극점에서 텍스처가 한 점으로 모이고, 형태를 변형해 텍셀 밀도가 고르지 않다."},{mode:2,title:"트라이플래너 매핑",kind:"after",caption:"X·Y·Z 세 방향에서 투영한 텍스처를 법선 방향에 따라 섞는다. 어떤 면도 늘어나지 않고 UV가 필요 없다."},{mode:3,title:"블렌딩 가중치",kind:"info",caption:"각 축 투영이 차지하는 비율. 날카로움을 올리면 혼합 구간이 좁아져 흐릿한 겹침이 줄어든다."}],X={layout:"variants",intro:"지형의 절벽이나 절차적으로 만든 바위에는 깔끔한 UV를 만들기 어렵습니다. <b>트라이플래너 매핑</b>은 UV 대신 <b>월드 좌표</b>로 X·Y·Z 세 방향에서 텍스처를 투영하고, 표면 법선이 향하는 축일수록 큰 가중치로 섞습니다. 늘어짐과 이음새 없이 어떤 형태에도 텍스처를 입힐 수 있습니다.",how:["월드 위치 p로 세 번 샘플: X축 투영 tex(p.zy), Y축 tex(p.xz), Z축 tex(p.xy).","가중치 w = |N|^k 를 정규화. k가 클수록 경계가 날카로워진다.","결과 = Σ 텍스처 × 가중치. 노멀 맵은 축마다 접선 공간이 달라 별도 변환(Whiteout/RNM 블렌딩)이 필요하다.","비용을 줄이려면 가중치가 아주 작은 축은 샘플을 생략한다(Biplanar: 큰 두 축만)."],pros:["UV 없이 어떤 형태에도 균일한 텍셀 밀도","절벽·동굴·절차적 메시·복셀 지형에 적합","이음새 없음"],cons:["텍스처 샘플 3배 (노멀·러프니스까지 하면 크게 증가)","혼합 구간에서 두 텍스처가 겹쳐 흐릿하게 보임","월드 고정이라 움직이는 물체에선 텍스처가 미끄러짐 (로컬 좌표로 해결)"],usedIn:"마칭 큐브 등 스무스 복셀 지형·절차적 행성(No Man's Sky가 자주 예로 언급됨), UE의 WorldAlignedTexture, Unity Shader Graph의 Triplanar 노드, 지형 절벽 재질, Substance의 Tri-planar 투영.",controls:[{type:"range",key:"scale",label:"텍스처 스케일",min:.3,max:3,step:.05,value:1},{type:"range",key:"sharp",label:"블렌딩 날카로움 k",min:1,max:32,step:1,value:4},{type:"toggle",key:"spin",label:"바위 회전",value:!1}],viewers:g.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:o=>k(o,t.mode)}))};export{X as default};
