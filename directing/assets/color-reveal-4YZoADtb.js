import{V as Y,W as V,k as H,M as v,P as Z,S as ee,v as te,x as oe,C as ae,K as ne,y as se,g,R as re,h as le,e as ie,c as E,a as B}from"./three.module-CEzfHhrp.js";import{m as ue}from"./three-viewer-fx7lDL-0.js";import{m as ce,a as de}from"./canvas-viewer-QtaWfmlz.js";import{c as me,a as pe,l as he,t as fe}from"./chart2d-DfgeckAJ.js";import{R as j,c as q}from"./fx-CIZ4XT9q.js";import{s as K,a as ve,u as ge}from"./unique-kit-D48oO2QI.js";const R=["global","wave","glow"],we={global:0,wave:1,glow:2},S=new Y(1.2,.8,.5),O=1,N=1.6,J=.8,Me=e=>O+e.num("dur",3)+N+J;function xe(e,o){return ge(e,"crClock",o,()=>Me(e.params))}function ye(e,o){const a=o.num("dur",3);return{prog:q((e-O)/a,0,1),fade:q((e-O-a-N)/J,0,1)}}function be(e,o,a,t,l){if(a<=0)return 0;const i=Math.max(0,e-a),p=Math.min(t,e+a);if(p<=i)return 0;const m=400,f=(p-i)/m;let r=0;for(let u=0;u<m;u++){const n=i+(u+.5)*f,c=Math.sqrt(Math.max(0,a*a-(n-e)*(n-e)));r+=Math.max(0,Math.min(l,o+c)-Math.max(0,o-c))*f}return r}const Re=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,ke=`
uniform sampler2D tScene;
uniform vec2 uRes;      // 렌더 타깃 픽셀
uniform vec2 uCenter;   // 퍼짐 중심 (픽셀, 아래가 0)
uniform float uRadius;  // 픽셀
uniform float uEdge;    // 가장자리 반폭 (픽셀)
uniform float uSat;     // 전체 채도 (global)
uniform float uFade;    // 1 = 다시 흑백
uniform int uMode;
uniform int uMaskOnly;
uniform float uTime;
varying vec2 vUv;

float maskAt(float d) {
  if (uMode == 0) return uSat;
  return 1.0 - smoothstep(uRadius - uEdge, uRadius + uEdge, d);
}

void main() {
  vec2 px = vUv * uRes;
  vec2 dv = px - uCenter;
  float d = length(dv);
  float m = maskAt(d) * (1.0 - uFade);
  if (uMaskOnly == 1) { gl_FragColor = vec4(m, m, m, 1.0); return; }

  vec2 uv = vUv;
  float ring = 0.0;
  if (uMode == 2) {
    // 파동 고리: 빛나는 테두리 + 굴절(충격파처럼 바깥으로 밀린 샘플링)
    float k = (d - uRadius) / max(4.0, uEdge * 1.6);
    ring = exp(-k * k) * (1.0 - uFade) * step(0.5, uRadius);
    uv += (dv / max(d, 1.0)) * ring * (6.0 / uRes) * min(uRes.x, uRes.y) / 200.0;
  }
  vec3 c = texture2D(tScene, uv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  vec3 gray = vec3(l) * vec3(1.0, 0.96, 0.9) * 0.85;
  vec3 col = c;
  if (uMode == 2) {
    // 테두리 근처는 채도를 살짝 넘치게 → 색이 "솟아나는" 느낌
    vec3 boosted = mix(vec3(l), c, 1.0 + 0.8 * ring);
    col = boosted;
  }
  vec3 outc = mix(gray, col, m);
  if (uMode == 2) outc += vec3(1.0, 0.78, 0.35) * ring * 0.85 + vec3(1.0, 0.95, 0.8) * pow(ring, 6.0) * 0.6;
  gl_FragColor = vec4(outc, 1.0);
  #include <colorspace_fragment>
}`;function Se(e){e.background=new ae(8894696),e.fog=new ne(8894696,18,45),ve(e,16777215,5601092);const o=new v(new se(30,48),new g({color:6271308,roughness:1}));o.rotation.x=-Math.PI/2,e.add(o);const a=new v(new re(3.2,4,48),new g({color:14266991,roughness:1}));a.rotation.x=-Math.PI/2,a.position.y=.01,e.add(a);const t=de(31),l=[16032353,15320170,15858414,11066076,16757922],i=[15087942,1914199,10166822,6966419,2792847];for(let n=0;n<9;n++){const c=n/9*Math.PI*2+t()*.3,h=6+t()*3,s=1.2+t()*1.2,d=new v(new le(1.6,s,1.4),new g({color:l[n%5],roughness:.8}));d.position.set(Math.cos(c)*h,s/2,Math.sin(c)*h),d.rotation.y=-c;const M=new v(new ie(1.3,1,4),new g({color:i[n*3%5],roughness:.7}));M.position.set(d.position.x,s+.5,d.position.z),M.rotation.y=-c+Math.PI/4,e.add(d,M)}const p=[2976335,4231532,9819570,16758531];for(let n=0;n<16;n++){const c=t()*Math.PI*2,h=4.5+t()*9,s=new v(new E(.5+t()*.4,10,8),new g({color:p[n%4],roughness:.9}));s.position.set(Math.cos(c)*h,1.1,Math.sin(c)*h);const d=new v(new B(.08,.1,.8,6),new g({color:8344889}));d.position.set(s.position.x,.4,s.position.z),e.add(s,d)}const m=[16711790,16760331,8599788,3835647,16471559],f=new E(.12,8,6);for(let n=0;n<40;n++){const c=t()*Math.PI*2,h=1+t()*3,s=new v(f,new g({color:m[n%5],roughness:.6}));s.position.set(Math.cos(c)*h,.12,Math.sin(c)*h),e.add(s)}const r=new v(new E(.35,20,14),new g({color:16777215,emissive:16765286,emissiveIntensity:1.5}));r.position.copy(S);const u=new v(new B(.3,.45,.45,12),new g({color:12368049}));u.position.set(S.x,.22,S.z),e.add(r,u)}function A(e){return o=>ue(o,{antialias:!0,orbit:!1,fov:50,cam:[0,6,12],far:80},({scene:a,camera:t,renderer:l})=>{Se(a);const i=new V(1,1,{samples:4}),p=128,m=80,f=new V(p,m),r=new Uint8Array(p*m*4),u={tScene:{value:i.texture},uRes:{value:new H(1,1)},uCenter:{value:new H},uRadius:{value:0},uEdge:{value:10},uSat:{value:0},uFade:{value:0},uMode:{value:we[e]},uMaskOnly:{value:0},uTime:{value:0}},n=new v(new Z(2,2),new ee({uniforms:u,vertexShader:Re,fragmentShader:ke,depthTest:!1,depthWrite:!1})),c=new te;c.add(n);const h=new oe(-1,1,1,-1,0,1);let s=1,d=1,M=1,I=0,C=0,F=0,U=0,k=0;return{resize(D,_,b){s=Math.max(1,Math.floor(D*b)),d=Math.max(1,Math.floor(_*b)),M=b,i.setSize(s,d),u.uRes.value.set(s,d)},update(D,_,b){const P=xe(o,b),G=o.params,$=G.bool("orbit",!0)?P.t*.12:.4;t.position.set(Math.sin($)*11,6.5,Math.cos($)*11),t.lookAt(0,.5,0),t.updateMatrixWorld();const w=ye(P.local,G),W=S.clone().project(t),x=(W.x*.5+.5)*s,y=(W.y*.5+.5)*d,Q=Math.max(Math.hypot(x,y),Math.hypot(s-x,y),Math.hypot(x,d-y),Math.hypot(s-x,d-y)),z=G.num("edge",16)*M;if(k=w.prog*(Q+z),u.uCenter.value.set(x,y),u.uRadius.value=k,u.uEdge.value=z,u.uSat.value=K(0,1,w.prog),u.uFade.value=w.fade,u.uTime.value=P.t,U=(e==="global"?K(0,1,w.prog):be(x,y,k,s,d)/(s*d))*(1-w.fade),I++,I%6===0){u.uMaskOnly.value=1,l.setRenderTarget(f),l.render(c,h),l.readRenderTargetPixels(f,0,0,p,m,r),l.setRenderTarget(null),u.uMaskOnly.value=0;let L=0;for(let T=0;T<r.length;T+=4)L+=r[T];C=L/(255*p*m),F=U,o.shared.set(`cr-${e}`,{meas:C,theo:F})}const X=k/M;o.hud([`착색 측정 ${(C*100).toFixed(1)}% (이론 ${(F*100).toFixed(1)}%)`,e==="global"?`전체 채도 ${(u.uSat.value*100).toFixed(0)}% = smoothstep(진행)`:`반경 ${X.toFixed(0)}px · 이론 πr²∩화면/면적`,`진행 ${(w.prog*100).toFixed(0)}%${w.fade>0?` · 흑백 복귀 ${(w.fade*100).toFixed(0)}%`:""}`].join(`
`))},render(){l.setRenderTarget(i),l.render(a,t),l.setRenderTarget(null),l.render(c,h)},dispose(){i.dispose(),f.dispose(),n.geometry.dispose(),n.material.dispose()}}})}function Ce(e){const o=R.map(()=>({m:new j(240),t:new j(240)})),a=R.map(()=>({m:new Float32Array(240),t:new Float32Array(240)}));return ce(e,()=>({step(){R.forEach((t,l)=>{const i=e.shared.get(`cr-${t}`);i&&(o[l].m.push(i.meas),o[l].t.push(i.theo))})},draw(t,l,i){me(t,l,i);const p={x:10,y:26,w:Math.max(10,l-20),h:Math.max(10,i-44)};R.forEach((f,r)=>{o[r].m.ordered(a[r].m),o[r].t.ordered(a[r].t)});const m=["#9aa3b2","#5b9cff","#facc15"];pe(t,p,R.flatMap((f,r)=>[{data:a[r].t,color:m[r],width:1,dash:[3,3]},{data:a[r].m,color:m[r],width:1.8}]),0,1),he(t,[{label:"전체 페이드",color:m[0]},{label:"원형 파동",color:m[1]},{label:"빛나는 파동",color:m[2]}],10,16),fe(t,"착색 비율: 실선 = GPU 측정, 점선 = 이론 · 최근 4초",10,i-6,"#7d8799",10),e.hud("")}}))}const Ie={layout:"variants",intro:'흑백 → 색 복원은 색을 잃은 세계에 <b>한 점에서 원형 파동처럼 색이 퍼져 나가며</b> 생명이 돌아오는 연출입니다. 보스를 쓰러뜨리거나 정화 의식을 마쳤을 때 "내가 세상을 바꿨다"는 보상을 화면 전체로 보여줍니다. 같은 마을을 렌더 타깃에 그린 뒤, 후처리 셰이더 하나로 세 가지 방식의 색 복원을 비교합니다.',how:["장면을 렌더 타깃에 그리고, 전체 화면 사각형의 프래그먼트 셰이더에서 휘도 <code>l = dot(c, (0.2126, 0.7152, 0.0722))</code>로 흑백을 만든다.",'<b>전체 페이드</b>: <code>mix(흑백, 원색, s)</code>에서 s를 시간에 따라 올린다. 어디서 시작됐는지가 없어 "필터를 껐다" 정도로 느껴진다.',"<b>원형 파동</b>: 근원(빛나는 구슬)을 화면에 투영한 점에서의 픽셀 거리 d로 <code>m = 1 − smoothstep(r − e, r + e, d)</code>. 반경 r을 일정 속도로 키운다.",'<b>빛나는 파동</b>: 같은 마스크에 테두리 고리 <code>exp(−((d−r)/w)²)</code>를 더해 빛·채도 과포화·굴절(샘플링 좌표를 바깥으로 밀기)을 준다. 경계가 "살아 있는" 파도가 된다.',"측정: 같은 셰이더로 마스크만 128×80 타깃에 그려 GPU에서 읽은 평균이 착색 비율이다. 이론값은 원과 화면 사각형의 교집합 넓이 ÷ 화면 넓이 (원이 화면 안이면 πr²/면적)."],pros:["색이라는 가장 강한 시각 신호를 보상으로 쓰므로 대사 없이도 감정이 크게 움직인다.","후처리 한 패스라 장면·애셋을 건드리지 않고 어떤 장면에도 얹을 수 있다.",'근원 지점이 있어 "무엇이 세상을 바꿨는지" 인과가 화면에 그려진다.'],cons:["화면 공간 원은 카메라가 움직이면 월드와 어긋난다 – 월드 공간(깊이 버퍼로 위치 복원) 거리로 바꾸면 더 자연스럽지만 비용이 든다.","흑백 상태에서는 게임플레이 정보(적·아이템 색 구분)를 잃기 쉬워 실루엣·밝기 대비로 보완해야 한다.","빛나는 고리와 굴절은 큰 화면에서 번쩍임이 강해 접근성 옵션이 필요하다."],usedIn:"〈오카미〉(大神)에서 저주받은 땅이 되살아나며 색과 꽃이 번지는 연출, 〈GRIS〉의 장마다 색이 하나씩 돌아오는 연출, 〈de Blob〉의 회색 도시에 페인트가 퍼지는 연출이 대표적입니다. 영화 〈플레전트빌〉의 흑백 세계에 색이 번지는 장면도 같은 발상입니다.",tips:["퍼지는 시간은 2~4초가 감정적으로 가장 잘 먹힌다. 1초 이하면 번쩍임으로, 6초 이상이면 기다림으로 느껴진다.",'반경 r을 시간에 선형으로 키우면 넓이(r²)가 뒤로 갈수록 빨리 늘어난다. 초반에 r에 ease-out을 걸면 "근원에서 터져 나오는" 느낌이 산다.',"흑백 상태라도 채도를 0이 아닌 0.1~0.2로 살짝 남기거나 대비를 올려, 적·아이템 실루엣이 묻히지 않게 한다.","카메라가 움직이는 장면이면 깊이 버퍼로 월드 위치를 복원해 월드 공간 거리로 원을 그린다. 화면 공간 원은 고정 카메라 컷신에서만 쓴다."],related:["scan-pulse","lut-grading","flashback","paint-splash","shockwave"],controls:[{type:"range",key:"dur",label:"퍼지는 시간 (초)",min:1.5,max:6,step:.1,value:3},{type:"range",key:"edge",label:"가장자리 반폭 (px)",min:2,max:60,step:1,value:16},{type:"toggle",key:"orbit",label:"카메라 선회",value:!0}],viewers:[{title:"전체 채도 페이드",kind:"before",caption:'화면 전체가 한꺼번에 서서히 물듭니다. 측정 비율 = 채도 값으로 단순하지만, 색이 "어디서" 왔는지는 보이지 않습니다.',mount:A("global")},{title:"원형 파동",kind:"variant",caption:"구슬에서 원이 퍼지며 색이 돌아옵니다. GPU에서 읽은 착색 비율이 원∩화면 넓이의 이론값과 1% 안쪽으로 일치합니다.",mount:A("wave")},{title:"빛나는 파동 (고리 + 굴절)",kind:"after",caption:"같은 원형 마스크에 금빛 고리, 경계의 채도 과포화, 바깥으로 밀리는 굴절을 더했습니다. 착색 비율은 그대로인데 체감은 완전히 다릅니다.",mount:A("glow")},{title:"착색 비율: 측정 vs 이론",kind:"info",caption:"실선(GPU 측정)이 점선(이론) 위에 겹칩니다. 원형 파동은 처음엔 천천히(넓이 ∝ r²), 원이 화면 밖으로 잘리기 시작하면 다시 느려지는 S자 곡선입니다.",mount:Ce}]};export{Ie as default};
