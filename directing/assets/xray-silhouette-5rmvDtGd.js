import{V as ee,S as $,G as te,M as _,h as oe,aa as ae,C as j,B as se,al as ne,ag as re,aG as ie}from"./three.module-CEzfHhrp.js";import{m as ce}from"./three-viewer-fx7lDL-0.js";import{m as le,b as q,s as ve}from"./canvas-viewer-QtaWfmlz.js";import{c as ue,t as U,l as fe}from"./chart2d-DfgeckAJ.js";import{s as de}from"./anime-kit-C6AkWSFn.js";import{g as me,P as pe,c as he,T as be,C as xe,M as D,i as T}from"./shader-kit-b-CX5DRTZo.js";import{p as ge}from"./extra-kit-c-FPjCbN4U.js";import"./BufferGeometryUtils--Oh5Y0A9.js";const X=160,ye=4892927,we=16734810,Me=`
uniform float uPush;
varying vec3 vNw;
varying vec3 vWp;
void main() {
  vec3 p = position + normal * uPush;
  vNw = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,ke=`
uniform vec3 uTeam;
uniform float uHull, uTime, uMask;
varying vec3 vNw;
varying vec3 vWp;
void main() {
  if (uMask > 0.5) { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); return; }
  if (uHull > 0.5) { gl_FragColor = vec4(uTeam * 0.95, 1.0); return; }
  vec3 n = normalize(vNw);
  vec3 v = normalize(cameraPosition - vWp);
  float fr = pow(1.0 - abs(dot(n, v)), 2.0);
  float scan = 0.5 + 0.5 * sin(vWp.y * 40.0 - uTime * 6.0);
  vec3 c = uTeam * (0.12 + 0.55 * fr + 0.06 * scan);
  gl_FragColor = vec4(c, 1.0);
}`,Se=`
uniform vec3 uL;
uniform float uMask;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
varying vec3 vCol;
varying float vPart;
${be}
void main() {
  if (uMask > 0.5) { gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); return; }
  vec3 n = normalize(vNw);
  vec3 v = normalize(cameraPosition - vWp);
  gl_FragColor = vec4(toonShade(vCol, n, uL, v), 1.0);
  #include <colorspace_fragment>
}`,Ne=`
uniform vec3 uL;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
void main() {
  vec3 n = normalize(vNw);
  vec2 q = abs(n.x) > 0.5 ? vWp.zy : vWp.xy;
  q.x += step(1.0, mod(floor(q.y / 0.25), 2.0)) * 0.25;
  vec2 b = abs(fract(q / vec2(0.5, 0.25)) - 0.5);
  float mortar = 1.0 - smoothstep(0.42, 0.47, max(b.x, b.y * 1.0));
  vec3 alb = mix(vec3(0.33, 0.31, 0.36), vec3(0.62, 0.55, 0.5), mortar);
  float d = max(dot(n, uL), 0.0);
  vec3 c = alb * (0.35 + 0.75 * d) + alb * vec3(0.06, 0.08, 0.14) * max(n.y, 0.0);
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,Z=t=>{const e=(t%1+1)%1;return 1-Math.abs(2*e-1)};function Ce(t,e){return t===0?[-3.4+6.8*Z(e*.06),-1.5]:t===1?[3.6-7.2*Z(e*.05+.3),-2.5]:t===2?[2*Math.cos(e*.33),-.5+1.7*Math.sin(e*.33)]:[-2.6+1.6*Math.sin(e*.21),1.6]}const Te=(t,e)=>ve(t.shared,"xrayClock",e,()=>({t:3}),(l,f)=>{l.t+=f*t.params.num("speed",1)});function B(t){return e=>ce(e,{antialias:!0,orbit:!1,fov:40,cam:[.6,3.4,7.6],target:[0,.8,-.6]},({scene:l,camera:f,renderer:a})=>{const M=de(1185316,3423324,50);l.add(M);const k=me(14,3948882,1316639);l.add(k);const S={value:new ee(.45,.8,.4).normalize()},E={value:0},R=new $({vertexShader:pe,fragmentShader:Ne,uniforms:{uL:S}}),d=new te({color:0}),O=[];for(const[n,g,v]of[[-2.7,2.2,1.9],[0,1.8,2.3],[2.6,2,1.7]]){const s=new _(new oe(g,v,.35),R);s.position.set(n,v/2,0),l.add(s),O.push(s)}const z=[...O,k],L=he({cloth:16777215,pants:3159370}),W=t==="top",w=[],N=[];for(let n=0;n<4;n++){const g=n%2===0?ye:we,v=new ae;l.add(v);const s=L.clone(),G=s.attributes.color,C=s.attributes.part,m=new j(g).multiplyScalar(.85);for(let b=0;b<G.count;b++)C.getX(b)===1&&G.setXYZ(b,m.r,m.g,m.b);const x=new _(s,new $({vertexShader:xe,fragmentShader:Se,uniforms:{uL:S,uMask:{value:0}}}));x.renderOrder=2,v.add(x);const i=(b,o)=>{const r=new $({vertexShader:Me,fragmentShader:ke,uniforms:{uTeam:{value:new j(g)},uHull:{value:b?1:0},uTime:E,uMask:{value:o?1:0},uPush:{value:b?.035:0}},depthWrite:!1,side:b?se:ne});return o||(r.blending=re),W?r.depthTest=!1:r.depthFunc=ie,N.push(r),r},p=new _(s,i(!1,!1)),h=new _(s,i(!0,!1)),u=new _(s,i(!1,!0));p.renderOrder=h.renderOrder=u.renderOrder=W?3:1;const y=t!=="none";p.visible=h.visible=y,u.visible=!1,v.add(h,p,u),w.push({body:x,xray:p,hull:h,maskX:u,px:0,pz:0})}const A=new D(!0),H=new D(!0),Y=new D(!0),c={C:NaN,V:NaN,O:NaN,S:NaN,over:NaN,miss:NaN,hist:[]};e.shared.set(`xray-meas-${t}`,c);let J=0;const F=(n,g,v)=>{const s=n.ensure(X,g);return v(),a.setRenderTarget(s),a.setClearColor(0,1),a.clear(),a.render(l,f),n.read(a)},K=()=>{const n=Math.max(8,Math.round(X/Math.max(.2,f.aspect))),g=l.background;l.background=null,M.visible=!1;const v=o=>w.forEach(r=>r.body.material.uniforms.uMask.value=o),s=o=>z.forEach(r=>(r.visible=o,r.material=d)),G=o=>w.forEach(r=>(r.xray.visible=!1,r.hull.visible=!1,r.maskX.visible=o)),C=F(A,n,()=>{v(1),s(!1),G(!1)}),m=F(H,n,()=>s(!0));let x=null;t!=="none"&&(x=F(Y,n,()=>G(!0))),a.setRenderTarget(null),l.background=g,M.visible=!0,v(0),w.forEach(o=>{o.body.visible=!0,o.maskX.visible=!1,o.xray.visible=o.hull.visible=t!=="none"}),O.forEach(o=>o.material=R),k.material=Q;let i=0,p=0,h=0,u=0,y=0,b=0;for(let o=0;o<X*n;o++){const r=C[o*4+1]>127,V=m[o*4+1]>127,P=x?x[o*4+2]>127:!1;r&&i++,V&&p++;const I=r&&!V;I&&h++,P&&u++,P&&V&&y++,I&&!P&&b++}Object.assign(c,{C:i,V:p,O:h,S:u,over:y,miss:b}),c.hist.push({o:i?h/i:0,s:i?u/i:0,over:i?y/i:0}),c.hist.length>120&&c.hist.shift()},Q=k.material;return{update(n,g,v){const s=Te(e,v);E.value=s.t,w.forEach((m,x)=>{const[i,p]=Ce(x,s.t),h=m.body.parent,u=i-m.px,y=p-m.pz;u*u+y*y>1e-8&&n>0&&(h.rotation.y=Math.atan2(u,y)),m.px=i,m.pz=p,h.position.set(i,.012+Math.abs(Math.sin(s.t*7+x))*.03,p)}),f.position.set(.6+1.2*Math.sin(s.t*.12),3.4,7.6),f.lookAt(0,.8,-.6);const C=[t==="none"?"실루엣 없음":t==="top"?"깊이 테스트 끔 · 맨 마지막":"depthFunc GREATER · 벽 다음 · 캐릭터 전",`캐릭터 ${T(c.C)}px · 보임 ${T(c.V)} · 가려짐 O ${T(c.O)}`];t!=="none"?C.push(`실루엣 측정 S ${T(c.S)}px / 이론(가려진 O) ${T(c.O)}px`,`보이는 곳 겹침 ${T(c.over)}px · 놓침 ${T(c.miss)}px`):C.push(`가려진 비율 ${ge(c.C?c.O/c.C:NaN)} → 정보 없음`),e.hud(C.join(`
`))},render(){J++%8===0&&K(),a.render(l,f)},dispose(){A.dispose(),H.dispose(),Y.dispose(),N.forEach(n=>n.dispose()),d.dispose(),L.dispose()}}})}function Ee(t){return le(t,()=>({draw(e,l,f){ue(e,l,f);const a={x:38,y:22,w:q(l-52,20),h:q(f-52,20)},M=d=>a.y+a.h-Math.max(0,Math.min(1,d))*a.h;e.strokeStyle="#1c2230",e.strokeRect(a.x+.5,a.y+.5,a.w,a.h);for(const d of[0,.5,1])U(e,`${d*100}%`,a.x-4,M(d)+3,"#7d8799",9,"right");const k=120,S=(d,O,z,L=[],W=1.6)=>{if(d.length<2)return;const w=N=>a.x+(N+k-d.length)/(k-1)*a.w;e.strokeStyle=z,e.lineWidth=W,e.setLineDash(L),e.beginPath(),d.forEach((N,A)=>A?e.lineTo(w(A),M(N[O])):e.moveTo(w(A),M(N[O]))),e.stroke(),e.setLineDash([]),e.lineWidth=1},E=t.shared.get("xray-meas-top"),R=t.shared.get("xray-meas-behind");E&&(S(E.hist,"s","#ff9a3c"),S(E.hist,"over","#f87171",[2,2])),R&&(S(R.hist,"s","#4ade80",[],3),S(R.hist,"o","#e6e9ef",[4,3],1.2)),U(e,"캐릭터 픽셀 대비 비율 (실루엣 S · 가려짐 O)",a.x,13,"#c8d0dc",10),fe(e,[{label:"S 뒤에만",color:"#4ade80"},{label:"O 가려짐(이론)",color:"#e6e9ef"},{label:"S 항상 위",color:"#ff9a3c"},{label:"겹침(오답)",color:"#f87171"}],a.x,f-4,9),t.hud("")}}))}const Fe={layout:"compare",intro:'팀 게임·잠입 게임은 벽 뒤에 있는 아군·적의 위치를 <b>윤곽 실루엣</b>으로 보여 줍니다. 핵심은 "가려진 부분에만" 그리는 것 – 캐릭터를 한 번 더 그리되 <b>깊이 테스트를 반대로(GREATER)</b> 걸어, 이미 그려진 벽보다 멀리 있을 때만 통과시킵니다. 같은 장면을 실루엣 없음 / 깊이 테스트를 끈 "항상 위"(흔한 오답) / 뒤에만 그리는 실루엣으로 비교하고, 실루엣 픽셀이 가려진 픽셀과 정확히 같은지 GPU에서 셉니다.',how:["그리는 순서: 벽·바닥(불투명, 깊이 씀) → 실루엣 패스(<code>depthFunc = GREATER</code>, 깊이 안 씀, 가산 블렌딩) → 캐릭터 본체(보통 깊이 테스트). three.js에서는 renderOrder 0 → 1 → 2로 정한다.",'GREATER는 "프래그먼트가 버퍼의 깊이보다 멀다" = 벽에 가려졌다는 뜻. 캐릭터 본체는 아직 깊이를 안 썼으므로 자기 팔에 가려진 몸통 같은 자기 가림은 실루엣이 생기지 않는다.',"실루엣 = 팀 색 × 프레넬(1 − |N·V|)² + 흐르는 주사선, 윤곽선 = 법선 방향으로 3.5cm 부풀린 뒷면 껍데기를 같은 GREATER로 단색 출력.",'"항상 위"는 실루엣을 깊이 테스트 없이 맨 마지막에 그려 보이는 캐릭터까지 팀 색으로 덮는다 → 셰이딩·얼굴이 사라진다.',"측정: 160px 폭 타깃에 ① 캐릭터만(C) ② 벽+캐릭터(보임 V) ③ 화면과 같은 순서로 벽 → 실루엣(파랑) → 캐릭터(초록)를 그려 최종 버퍼에 파랑으로 남은 실루엣(S)을 센다. 가려진 픽셀 O = C − V가 이론값이고, 올바른 실루엣은 S = O, 보이는 곳 겹침 = 0이어야 한다."],pros:["패스 하나 + 깊이 함수 하나로 끝난다. 스텐실·후처리 없이도 정확히 가려진 부분만 칠해진다.","자기 가림이 섞이지 않게 순서만 지키면 캐릭터 본체 셰이딩은 그대로다.","팀 색·두께·주사선으로 아군/적/목표물 정보를 바로 실을 수 있다."],cons:["캐릭터를 두세 번 더 그린다(실루엣 + 윤곽 껍데기) → 인원이 많으면 드로 콜이 늘어난다.","다른 캐릭터에 가려진 경우는 잡히지 않는다(벽 깊이만 기준). 캐릭터끼리도 원하면 스텐실·ID 버퍼가 필요하다.","반투명 물체(유리·연기)는 깊이를 안 쓰므로 그 뒤 캐릭터에는 실루엣이 생기지 않는다."],usedIn:'〈오버워치〉의 아군·표적 윤곽, 〈라스트 오브 어스〉의 리슨 모드, 〈디아블로〉 시리즈의 벽 뒤 캐릭터 실루엣, 〈레프트 4 데드〉의 아군 윤곽 등 많은 게임이 "가려진 부분만 보이는" 실루엣을 씁니다. 구현은 깊이 함수 반전, 스텐실, 후처리 윤곽 등 게임마다 다릅니다.',tips:["실루엣 채움은 10~20% 정도로 낮게, 프레넬 테두리를 밝게 둔다. 채움이 진하면 벽 자체가 안 보여 공간 판단이 어려워진다.","아군/적 구분을 색만으로 하지 않는다. 빨강·초록은 색각 이상 플레이어에게 비슷해 보이므로 파랑/주황 같은 조합에 윤곽 두께·무늬 차이를 함께 준다.",'캐릭터끼리 가린 경우까지 잡으려면 캐릭터 본체가 스텐실에 ID를 쓰고, 실루엣 패스가 "다른 ID"일 때 통과하도록 한다.',"모든 대상을 항상 보여 주면 정보가 넘친다. 거리·팀·상태(표적 지정, 소리를 낸 적)로 켜는 대상을 고르고, 켜고 끌 때 0.2초쯤 페이드한다."],related:["camera-dither-fade","rim-light","edge-outline","special-vision","hologram"],controls:[{type:"range",key:"speed",label:"걷는 속도 (배)",min:0,max:3,step:.1,value:1}],viewers:[{title:"실루엣 없음",kind:"before",caption:"벽 뒤로 들어간 캐릭터는 그냥 사라집니다. 아군·적이 어디 있는지 알 수 없습니다.",mount:B("none")},{title:"항상 위 (깊이 테스트 끔)",kind:"variant",caption:"보이는 캐릭터까지 팀 색이 덮여 얼굴·옷 셰이딩이 지워집니다. 실루엣 픽셀이 가려진 픽셀보다 훨씬 많습니다(겹침).",mount:B("top")},{title:"뒤에만 (GREATER + 윤곽)",kind:"after",caption:"벽에 가려진 부분만 팀 색 실루엣과 윤곽선이 생기고, 보이는 부분은 원래 셰이딩 그대로입니다. 실루엣 픽셀(윤곽선 제외) = 가려진 픽셀, 겹침 0.",mount:B("behind")},{title:"실루엣 vs 가려진 픽셀",kind:"info",caption:"초록 굵은 선(뒤에만 실루엣)이 흰 점선(가려진 비율, 이론)에 정확히 겹칩니다. 주황(항상 위)은 늘 100%이고 빨간 점선만큼 보이는 곳을 덮습니다.",mount:Ee}]};export{Fe as default};
