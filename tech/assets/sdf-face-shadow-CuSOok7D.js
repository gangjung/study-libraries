import{p as N,u as V,g as P,M,aI as C,S as b,w as k,H as O,D as _}from"./three.module-BZgG6AUv.js";import{m as $}from"./three-viewer-0rZIEDzf.js";import{m as j}from"./canvas-viewer-Btf0JXdr.js";import{c as z,t as x,D as g}from"./chart2d-JzIgcti9.js";import{f as G}from"./face-sWqHSt7T.js";const R=`
float faceT(float u, float v){
  float base = acos(clamp(-(u - .1 * v * v + .05), -1., 1.));      // 볼 곡선을 따라 휩쓰는 기본 경계
  float dn = length(vec2((u + .08) / .07, (v + .16) / .13));        // 코 그림자 (빛 반대편 콧볼 옆 삼각형)
  float nose = .55 + 1.4 * max(dn - .35, 0.);
  float eye = .95 + 2.2 * max(length(vec2((u + .36) / .16, (v - .1) / .1)) - .4, 0.); // 눈두덩 그늘
  return min(base, min(nose, eye));
}`;function D(a,o){const e=Math.acos(Math.max(-1,Math.min(1,-(a-.1*o*o+.05)))),r=Math.hypot((a+.08)/.07,(o+.16)/.13),t=.55+1.4*Math.max(r-.35,0),i=.95+2.2*Math.max(Math.hypot((a+.36)/.16,(o-.1)/.1)-.4,0);return Math.min(e,t,i)}const U=`
varying vec3 vN; varying vec3 vO;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vO = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`,E=`
uniform float mode; uniform vec3 L; uniform float theta; uniform float side; uniform float soft;
varying vec3 vN; varying vec3 vO;
${R}
void main(){
  vec3 skin = vec3(1., .86, .78);
  vec3 shade = skin * vec3(.78, .56, .66);
  float lit;
  if (mode < .5) {
    float hl = dot(normalize(vN), L) * .5 + .5;
    lit = smoothstep(.5 - soft, .5 + soft, hl);
  } else {
    float u = vO.x * side;
    float v = vO.y / 1.1;
    float T = faceT(u, v);
    lit = smoothstep(theta - soft * 3., theta + soft * 3., T);
  }
  vec3 col = mix(shade, skin, lit);
  gl_FragColor = vec4(pow(col, vec3(2.2)), 1.);
  #include <colorspace_fragment>
}`,L=(a,o)=>a.params.bool("animate")?(Math.sin(o*.5)*.5+.5)*Math.PI*.95*(Math.sin(o*.25)>0?1:-1):a.params.num("angle",60)*Math.PI/180;function A(a,o){return o==="map"?B(a):$(a,{antialias:!0,cam:[.6,.15,3.6],target:[0,-.05,0]},({scene:e})=>{e.background=new N(14213870);const r=new V({uniforms:{mode:{value:o==="normal"?0:1},L:{value:new P},theta:{value:0},side:{value:1},soft:{value:.02}},vertexShader:U,fragmentShader:E}),t=new M(G(),r);e.add(t);const i=new C({color:4018058}),l=new M(new b(1.08,64,32,0,Math.PI*2,0,Math.PI*.42),i);l.position.y=.08,e.add(l);const n=new M(new b(1.06,48,32,Math.PI,Math.PI,0,Math.PI*.85),i);n.position.set(0,.02,-.08),e.add(n);const s=new k({color:2830165});for(const u of[-1,1]){const h=new M(new b(.12,24,16),s);h.position.set(u*.36,.1,.87),h.scale.set(.9,1.4,.4),e.add(h)}const m=new M(new b(.08,16,12),new k({color:16763213}));e.add(m);const f=new O(16777215,8947848,2),v=new _(16777215,1.5);return e.add(f,v),{update(u,h){const c=L(a,h),d=new P(Math.sin(c),.3,Math.cos(c)).normalize();r.uniforms.L.value.copy(d),r.uniforms.theta.value=Math.abs(c),r.uniforms.side.value=c>=0?1:-1,r.uniforms.soft.value=a.params.num("soft",.02),v.position.copy(d),m.position.copy(d).multiplyScalar(2.1),a.hud(`${o==="normal"?"법선 기반 (N·L 임계값)":"SDF 임계값 맵"} · 광원 ${Math.round(c*180/Math.PI)}°`)},dispose(){i.dispose(),s.dispose()}}})}function B(a){return j(a,()=>{let o=0;const e=160,r=document.createElement("canvas");r.width=r.height=e;{const t=r.getContext("2d"),i=t.createImageData(e,e);for(let l=0;l<e;l++)for(let n=0;n<e;n++){const s=n/e*2-1,m=1-l/e*2,f=s*s+m*m<1?D(s,m)/Math.PI*255:20;i.data.set([f,f,f,255],(l*e+n)*4)}t.putImageData(i,0,0)}return{step(t){o+=t},draw(t,i,l){z(t,i,l);const n=Math.max(40,Math.min(i/2-20,l-40)),s=14,m=(l-n)/2;t.drawImage(r,s,m,n,n);const f=L(a,o),v=Math.abs(f),u=64,h=n/u;t.fillStyle="rgba(230,108,255,0.45)";for(let y=0;y<u;y++)for(let w=0;w<u;w++){const S=(w+.5)/u*2-1,I=1-(y+.5)/u*2;S*S+I*I<1&&D(S*(f>=0?1:-1),I)<v&&t.fillRect(s+w*h,m+y*h,h+.5,h+.5)}x(t,"임계값 맵 (밝을수록 늦게 그늘짐)",s,m-6,g,9),x(t,"보라 = 지금 각도에서 그늘",s,m+n+14,"#e66cff",9);const c=s+n+(i-s-n)/2,d=l/2,p=Math.max(10,Math.min((i-s-n)/2-20,l/2-30));t.strokeStyle="#334155",t.beginPath(),t.arc(c,d,p,0,Math.PI*2),t.stroke(),t.fillStyle="#ffe0cc",t.beginPath(),t.ellipse(c,d,p*.3,p*.34,0,0,Math.PI*2),t.fill(),t.fillStyle="#2b2f55",t.fillRect(c-2,d-p*.34-8,4,8),x(t,"얼굴 정면 ↑",c,d-p-8,g,9,"center");const T=c+Math.sin(f)*p,F=d-Math.cos(f)*p;t.fillStyle="#ffc94d",t.beginPath(),t.arc(T,F,7,0,Math.PI*2),t.fill(),x(t,`${Math.round(f*180/Math.PI)}°`,c,d+p+16,"#e2e8f0",11,"center"),a.hud('픽셀마다 "몇 도부터 그늘인지"를 저장. 셰이더는 광원 각도와 비교만 한다')}}})}const q=[{mode:"normal",title:"법선 기반 그늘",kind:"before",caption:"얼굴의 실제 법선(눈두덩·광대·코)으로 N·L 임계값을 쓰면 그늘이 얼룩덜룩 조각나고, 빛이 조금만 움직여도 모양이 요동친다. 애니 원화에서는 절대 그리지 않는 그림자."},{mode:"sdf",title:"SDF 임계값 맵",kind:"after",caption:"광원의 수평 각도와 텍스처에 저장된 임계값만 비교. 볼을 따라 매끈하게 휩쓰는 경계와 코 옆 삼각형 그림자처럼 원화가 의도한 모양만 나온다. 빛이 반대쪽이면 텍스처를 좌우 반전."},{mode:"map",title:"임계값 맵과 광원 각도",kind:"info",caption:"실제 게임에서는 아티스트가 0°~180° 여러 각도의 그림자 모양을 그리고, 이를 SDF로 변환·합성해 이런 한 장의 그레이스케일 텍스처를 만든다. 보라색이 현재 각도에서 그늘로 판정되는 영역.",wide:!0}],Z={layout:"compare",intro:'애니풍 캐릭터에서 가장 눈에 띄는 곳은 <b>얼굴</b>입니다. 얼굴 메시의 법선으로 조명을 계산하면 눈두덩·코·광대 때문에 그늘이 지저분하게 갈라집니다. 원신(2020) 이후 널리 알려진 <b>SDF 얼굴 그림자</b>는 법선을 아예 쓰지 않고, "이 픽셀은 빛이 몇 도 돌아갔을 때부터 그늘인가"를 저장한 <b>임계값 텍스처</b>와 광원 각도를 비교합니다.',how:["아티스트가 광원 각도별(예: 0°, 15°, …, 180°) 얼굴 그림자 모양을 흑백으로 그림.","각 이미지를 SDF(경계까지 거리)로 변환하고 이웃 각도 사이를 보간해 하나의 임계값 맵으로 합성.","런타임: 머리의 앞·오른쪽 벡터로 광원의 수평 각도 θ를 구함. 광원이 왼쪽이면 UV.x를 반전.","그늘 = smoothstep(θ − ε, θ + ε, T(uv)) — 텍스처 한 번 읽고 비교 한 번.","결과는 램프 셰이딩의 밝기 값으로 쓰여 몸과 같은 색감으로 합쳐짐. 위·아래 각도는 무시하거나 별도 처리."],pros:["원화와 같은 깔끔한 그림자 모양을 보장","빛이 움직여도 모양이 부드럽게 변함","셰이더 비용이 극히 낮음"],cons:["수평 각도만 반영(위에서 비추는 빛 등은 표현 못함)","캐릭터마다 텍스처 제작 필요","얼굴이 표정으로 크게 변형되면 맞지 않음","그림자 맵 그림자(모자 등)와 별도 합성 필요"],usedIn:"원신(얼굴 그림자 맵, 2020 — 커뮤니티 분석으로 널리 알려짐), 이후의 애니풍 3D 게임들(붕괴 스타레일·명조 등에서도 비슷한 방식이 분석됨), VRChat·Unity·UE 커뮤니티 툰 셰이더의 SDF 얼굴 그림자 옵션.",controls:[{type:"toggle",key:"animate",label:"광원 자동 회전",value:!0},{type:"range",key:"angle",label:"광원 각도 (자동 회전 끄면)",min:-170,max:170,step:1,value:60},{type:"range",key:"soft",label:"경계 부드러움",min:.005,max:.08,step:.005,value:.02}],viewers:q.map(a=>({title:a.title,kind:a.kind,caption:a.caption,wide:a.wide,mount:o=>A(o,a.mode)}))};export{Z as default};
