import{V,a as lt,M as Y,l as mt,m as vt,H as pt,S as B,C as bt,n as yt,Z as Mt,o as xt,A as kt,p as Ct}from"./three.module-CEzfHhrp.js";import{m as wt}from"./BufferGeometryUtils--Oh5Y0A9.js";import{m as At}from"./three-viewer-fx7lDL-0.js";import{m as Nt,b as W,s as gt}from"./canvas-viewer-QtaWfmlz.js";import{c as Tt,t as D,l as Lt}from"./chart2d-DfgeckAJ.js";import{s as Rt}from"./anime-kit-C6AkWSFn.js";import{g as _t,T as St,C as X,c as Ot,M as I,P as $t}from"./shader-kit-b-CX5DRTZo.js";import{P as Pt,p as T}from"./extra-kit-c-FPjCbN4U.js";const ct=["none","alpha","dither"],it=4,Ft=5.25,Z=160,O=33,ut=`
float bayerThr(vec2 fc, float lv) {
  ivec2 p = ivec2(floor(fc));
  int L = int(lv);
  int v = 0;
  for (int i = 0; i < 3; i++) {
    if (i >= L) break;
    int bx = (p.x >> i) & 1;
    int by = (p.y >> i) & 1;
    v += (((bx ^ by) << 1) | by) << (2 * (L - 1 - i));
  }
  float n = float(1 << (2 * L));
  return (float(v) + 0.5) / n;
}`,J=(s,t)=>{const o=t*t;return Math.min(o,Math.max(0,Math.floor(s*o-.5)+1))/o},Gt=`
uniform vec3 uCam, uTgt, uL, uAlb;
uniform float uR0, uR1, uMode, uLv, uOut, uAmin;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
${ut}
float fadeA() {
  vec3 ab = uTgt - uCam;
  float len = length(ab);
  vec3 dir = ab / max(len, 1e-4);
  vec3 ap = vWp - uCam;
  float s = dot(ap, dir);
  if (s <= 0.0 || s >= len) return 1.0;
  float d = length(ap - dir * s);
  return mix(uAmin, 1.0, smoothstep(uR0, uR1, d));
}
void main() {
  float a = uMode > 0.5 ? fadeA() : 1.0;
  if (uMode > 1.5 && uOut < 2.5 && a < bayerThr(gl_FragCoord.xy, uLv)) discard;
  if (uOut > 2.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, a); return; }   // 투과율 이론 (곱셈)
  if (uOut > 0.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, uMode > 0.5 && uMode < 1.5 ? a : 1.0); return; }
  vec3 n = normalize(vNw);
  if (!gl_FrontFacing) n = -n;
  float nl = dot(n, uL);
  vec3 col = uAlb * (0.35 + 0.75 * smoothstep(-0.1, 0.4, nl)) + uAlb * vec3(0.08, 0.1, 0.16) * max(n.y, 0.0);
  col *= 0.85 + 0.15 * sin(vOp.y * 9.0 + vOp.x * 3.0);
  gl_FragColor = vec4(col, uMode > 0.5 && uMode < 1.5 ? a : 1.0);
  #include <colorspace_fragment>
}`,j=`
uniform vec3 uL;
uniform float uOut;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
varying vec3 vCol;
varying float vPart;
${St}
void main() {
  if (uOut > 0.5) { gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); return; }
  vec3 n = normalize(vNw);
  vec3 v = normalize(cameraPosition - vWp);
  gl_FragColor = vec4(toonShade(vCol, n, uL, v), 1.0);
  #include <colorspace_fragment>
}`,Wt=`
uniform float uLv;
varying vec2 vUv;
${ut}
void main() {
  float a = floor(gl_FragCoord.x / 8.0) / ${(O-1).toFixed(1)};
  if (a < bayerThr(gl_FragCoord.xy, uLv)) discard;
  gl_FragColor = vec4(1.0);
}`;function Dt(){const s=[],t=new lt(.16,.22,1.6,12);t.translate(0,.8,0),s.push(t);for(const[o,h,i,g]of[[0,2,0,.75],[.35,2.5,.1,.55],[-.3,2.45,-.15,.5]]){const c=new Ct(g,2);c.translate(o,h,i),s.push(c)}return wt(s.map(o=>o.index?o.toNonIndexed():o))}const Et=(s,t)=>gt(s.shared,"ditherClock",t,()=>({t:0,ang:.15}),(o,h)=>{o.t+=h,o.ang+=h*.22*s.params.num("speed",1)});function K(s){return t=>At(t,{antialias:!1,orbit:!1,fov:50,cam:[0,3,8],target:[0,1,0]},({scene:o,camera:h,renderer:i})=>{const g=Rt(1712176,4016746,50);o.add(g);const c=_t(16,4018240,1449240);o.add(c);const x={value:new V(.4,.8,.35).normalize()},L={value:new V},l={value:new V},k={value:.4},A={value:1.2},R={value:2},a={value:.3},d=[],N=(n,f)=>{const r=new B({vertexShader:$t,fragmentShader:Gt,uniforms:{uCam:L,uTgt:l,uL:x,uR0:k,uR1:A,uLv:R,uAmin:a,uAlb:{value:new bt(n)},uMode:{value:ct.indexOf(s)},uOut:{value:f}}});return s==="alpha"&&f<2.5&&(r.transparent=!0,r.depthWrite=!0),f>2.5&&(r.transparent=!0,r.depthWrite=!1,r.blending=yt,r.blendSrc=Mt,r.blendDst=xt,r.blendEquation=kt),d.push(r),r},b=[],y=new lt(.38,.42,3.2,20);y.translate(0,1.6,0);const C=Dt();for(let n=0;n<12;n++){const f=n/12*Math.PI*2+.2,r=n%2===1,M=r?5216850:12168600,w=[N(M,0),N(M,1),N(M,3)],m=new Y(r?C:y,w[0]),v=Ft+n%3*.35;m.position.set(Math.cos(f)*v,0,Math.sin(f)*v),m.rotation.y=n,o.add(m),b.push({mesh:m,mats:w})}const ht=new mt({color:7040890});for(let n=0;n<6;n++){const f=new Y(new vt(.35+n%2*.15),ht),r=n/6*Math.PI*2;f.position.set(Math.cos(r)*1.8,.2,Math.sin(r)*1.8),o.add(f)}o.add(new pt(13623551,3158058,1.6));const Q=new B({vertexShader:X,fragmentShader:j,uniforms:{uL:x,uOut:{value:0}}}),tt=new B({vertexShader:X,fragmentShader:j,uniforms:{uL:x,uOut:{value:1}}}),et=new B({vertexShader:X,fragmentShader:j,uniforms:{uL:x,uOut:{value:1}},colorWrite:!1}),p=new Y(Ot(),Q);o.add(p);const ot=new I(!0),at=new I(!0),nt=new I(!0),q=new I(!1),st=new Pt(Wt,{uLv:R}),u={me:NaN,th:NaN,blocked:NaN,hist:[],cal:[],n:4};t.shared.set(`dither-meas-${s}`,u);let dt=0;const rt=[g,c],H=(n,f,r,M)=>{const w=n.ensure(Z,f);return M(),i.setRenderTarget(w),i.setClearColor(r,1),i.clear(),i.render(o,h),n.read(i)},ft=()=>{const n=Math.max(8,Math.round(Z/Math.max(.2,h.aspect))),f=o.background;o.background=null;for(const e of rt)e.visible=!1;const r=o.children.filter(e=>e!==p&&!b.some(E=>E.mesh===e)&&e.type==="Mesh"&&e.visible);for(const e of r)e.visible=!1;const M=H(ot,n,0,()=>{p.material=tt;for(const e of b)e.mesh.visible=!1}),w=H(at,n,0,()=>{for(const e of b)e.mesh.visible=!0,e.mesh.material=e.mats[1]}),m=H(nt,n,16777215,()=>{p.material=et;for(const e of b)e.mesh.material=e.mats[2]});i.setRenderTarget(null),p.material=Q;for(const e of b)e.mesh.material=e.mats[0];for(const e of rt)e.visible=!0;for(const e of r)e.visible=!0;o.background=f;let v=0,$=0,P=0,F=0;for(let e=0;e<Z*n;e++)M[e*4+1]<128||(v++,$+=w[e*4+1]/255,P+=m[e*4]/255,m[e*4]<250&&F++);if(u.me=v?$/v:NaN,u.th=v?P/v:NaN,u.blocked=v?F/v:NaN,u.hist.push({me:u.me,th:u.th}),u.hist.length>120&&u.hist.shift(),s==="dither"){const e=q.ensure(8*O,8);i.setRenderTarget(e),i.setClearColor(0,1),i.clear(),st.render(i,e);const E=q.read(i);i.setRenderTarget(null);const S=[];for(let _=0;_<O;_++){let z=0;for(let G=0;G<8;G++)for(let U=0;U<8;U++)E[(G*8*O+_*8+U)*4]>127&&z++;S.push(z/64)}u.cal=S}};return{update(n,f,r){const M=Et(t,r),w=t.params,m=M.ang;p.position.set(Math.cos(m)*it,0,Math.sin(m)*it);const v=-Math.sin(m),$=Math.cos(m);p.rotation.y=Math.atan2(v,$),p.position.y=Math.abs(Math.sin(M.t*6))*.04;const P=3,F=1.9+.5*Math.sin(M.t*.3);h.position.set(p.position.x-v*P+Math.cos(m)*F,2.1,p.position.z-$*P+Math.sin(m)*F),l.value.set(p.position.x,.95,p.position.z),h.lookAt(l.value.x,1,l.value.z),h.updateMatrixWorld(),L.value.copy(h.position),A.value=w.num("r1",1.2),k.value=Math.min(A.value-.05,.35),a.value=w.num("amin",.3);const e=Number(w.str("bayer","4"));R.value=e===8?3:2,u.n=e;const S=[s==="none"?"가림막 그대로 (불투명)":s==="alpha"?"반투명 + 깊이 쓰기 · 정렬 의존":`베이어 ${e}×${e} · ${e*e}단계 (k/${e*e})`,`캐릭터 보이는 비율 측정 ${T(u.me)} / 이론 ${T(u.th)}`,`가림막과 겹친 캐릭터 픽셀 ${T(u.blocked)}`];if(s==="none"&&(S[1]=`캐릭터 보이는 비율 측정 ${T(u.me)} / 이론(불투명) ${T(u.th)}`),s==="dither"&&u.cal.length){let _=0;u.cal.forEach((z,G)=>_=Math.max(_,Math.abs(z-J(G/(O-1),e)))),S.push(`계단 보정 최대 오차 ${T(_)} · 가운데 투과 1−round(a_min·${e*e})/${e*e} = ${T(1-J(a.value,e))} (연속 ${T(1-a.value)})`)}t.hud(S.join(`
`))},render(){dt++%8===0&&ft(),i.render(o,h)},dispose(){ot.dispose(),at.dispose(),nt.dispose(),q.dispose(),st.dispose(),d.forEach(n=>n.dispose()),tt.dispose(),et.dispose(),y.dispose(),C.dispose()}}})}function zt(s){return Nt(s,()=>({draw(t,o,h){Tt(t,o,h);const i=Number(s.params.str("bayer","4")),g=W(Math.floor(o/2)-10,40),c={x:34,y:22,w:W(g-40,20),h:W(h-52,20)},x=a=>c.y+c.h-Math.max(0,Math.min(1,a))*c.h;t.strokeStyle="#1c2230",t.strokeRect(c.x+.5,c.y+.5,c.w,c.h);for(const a of[0,.5,1])D(t,`${a*100}%`,c.x-4,x(a)+3,"#7d8799",9,"right");const L={none:"#f87171",alpha:"#ff9a3c",dither:"#5b9cff"};for(const a of ct){const d=s.shared.get(`dither-meas-${a}`);if(!d||d.hist.length<2)continue;const N=120,b=y=>c.x+(y+N-d.hist.length)/(N-1)*c.w;t.strokeStyle=L[a],t.lineWidth=1.6,t.beginPath(),d.hist.forEach((y,C)=>C?t.lineTo(b(C),x(y.me)):t.moveTo(b(C),x(y.me))),t.stroke(),(a==="dither"||a==="alpha")&&(t.setLineDash([3,3]),t.strokeStyle="#e6e9ef",t.lineWidth=1,t.beginPath(),d.hist.forEach((y,C)=>C?t.lineTo(b(C),x(y.th)):t.moveTo(b(C),x(y.th))),t.stroke(),t.setLineDash([]))}t.lineWidth=1,D(t,"보이는 비율 (점선 이론)",c.x,13,"#c8d0dc",10);const l={x:g+34,y:22,w:W(o-g-46,20),h:W(h-52,20)},k=a=>l.x+a*l.w,A=a=>l.y+l.h-a*l.h;t.strokeStyle="#1c2230",t.strokeRect(l.x+.5,l.y+.5,l.w,l.h),t.strokeStyle="#3a4458",t.setLineDash([3,3]),t.beginPath(),t.moveTo(k(0),A(0)),t.lineTo(k(1),A(1)),t.stroke(),t.setLineDash([]),t.strokeStyle="#5b9cff",t.lineWidth=1.6,t.beginPath();for(let a=0;a<=400;a++){const d=a/400,N=J(d,i);a?t.lineTo(k(d),A(N)):t.moveTo(k(d),A(N))}t.stroke(),t.lineWidth=1;const R=s.shared.get("dither-meas-dither");R&&R.n===i&&R.cal.forEach((a,d)=>{t.fillStyle="#facc15",t.beginPath(),t.arc(k(d/(O-1)),A(a),2.6,0,Math.PI*2),t.fill()}),D(t,`디더 덮임 vs a (${i}×${i})`,l.x,13,"#c8d0dc",10),D(t,"0",k(0),l.y+l.h+11,"#7d8799",9,"center"),D(t,"a = 1",k(1),l.y+l.h+11,"#7d8799",9,"right"),Lt(t,[{label:"그대로",color:L.none},{label:"알파",color:L.alpha},{label:"디더",color:L.dither},{label:"GPU 계단",color:"#facc15"}],c.x,h-4,9),s.hud("")}}))}const Zt={layout:"compare",intro:"3인칭 카메라가 캐릭터를 따라가다 보면 기둥·나무가 사이에 끼어 캐릭터를 가립니다. 가린 물체를 지우는 가장 쉬운 방법은 반투명인데, 반투명은 <b>정렬</b>이 필요하고 깊이를 쓰면 뒤가 사라지는 문제가 생깁니다. <b>디더 페이드</b>는 불투명 패스 그대로 픽셀을 <b>베이어 행렬 무늬로 듬성듬성 버려</b> 반투명처럼 보이게 합니다. 같은 카메라 경로에서 그대로 / 알파 블렌딩 / 디더를 비교하고, 캐릭터가 보이는 비율을 GPU에서 셉니다.",how:["가림 판정: 카메라 → 캐릭터 가슴 선분까지 픽셀의 거리 d를 구해, 선분 사이에 있으면 <code>a = mix(a_min, 1, smoothstep(R₀, R₁, d))</code> (여기선 R₀ = 0.35m). 캐릭터 둘레만 옅어지고 먼 기둥은 그대로다. a_min을 0보다 크게 두면 가림막의 존재가 흐릿하게 남는다.","디더: 화면 좌표의 베이어 N×N 값 v로 임계값 <code>(v + ½)/N²</code>을 만들고 <code>a &lt; 임계값</code>이면 discard. N×N 칸에서 남는 픽셀 수는 <code>round(a·N²)</code> → 4×4는 16단계, 8×8은 64단계로 양자화된다.","알파 블렌딩은 반투명 큐로 옮겨져 물체 중심 거리로 정렬되고, 깊이를 쓰면 먼저 그린 반투명 면이 뒤쪽 반투명 면을 지워 버린다(나무 잎 덩어리 안쪽이 사라짐). 깊이를 안 쓰면 이번엔 순서가 틀린 곳이 엉뚱하게 섞인다.","측정: 160px 폭 타깃에 ① 캐릭터만 그려 픽셀 집합을 얻고 ② 실제 처리대로 가림막을 검게 덮어 남은 캐릭터 밝기 평균(보이는 비율)을 잰다. 이론 ③ 은 캐릭터 깊이만 쓴 뒤 가림막을 <code>dst·(1 − a)</code> 곱셈으로 모두 쌓은 연속 투과율 평균.","디더 계단: 8px 블록마다 a = k/32를 넣고 discard 뒤 남은 비율을 GPU에서 읽어 <code>round(a·N²)/N²</code>와 비교한다."],pros:["불투명 패스·깊이 쓰기를 그대로 써서 정렬 문제·그림자·SSAO 등 후처리와 충돌이 없다.","셰이더 몇 줄과 거리 계산뿐이라 싸고, 물체 단위가 아니라 픽셀 단위라 큰 벽도 캐릭터 둘레만 뚫린다.","TAA가 있으면 무늬가 시간적으로 섞여 거의 진짜 반투명처럼 보인다."],cons:["TAA 없이 해상도가 낮으면 체크 무늬가 그대로 보인다(모바일). 무늬 크기·노이즈 디더로 완화한다.","불투명도가 N² 단계로 양자화된다. 4×4면 16단계라 느린 페이드가 계단처럼 끊겨 보일 수 있다.","카메라-캐릭터 선분 하나만 보므로 큰 캐릭터·여럿일 때는 원기둥 반지름이나 대상 점을 늘려야 한다."],usedIn:"〈젤다의 전설 야생의 숨결〉처럼 카메라에 너무 가깝거나 캐릭터를 가리는 물체를 디더 무늬로 지우는 3인칭 게임이 많고, 언리얼의 DitherTemporalAA 노드·유니티 URP 커뮤니티 셰이더로도 흔히 만듭니다. 판정 기준(원기둥·구·물체 단위)은 게임마다 다릅니다.",tips:["페이드 반지름 R₁은 캐릭터 폭의 1.5~2배가 무난하다. 물체 단위로 페이드할 때는 a를 0.1~0.2초에 걸쳐 보간해야 들어오고 나갈 때 툭 끊기지 않는다.","그림자 패스에서는 디더를 끄는 경우가 많다. 기둥이 옅어져도 그림자는 남아 공간이 비어 보이지 않는다.","TAA가 없으면 베이어 대신 블루 노이즈 텍스처로 임계값을 읽어 무늬를 덜 눈에 띄게 하고, 프레임마다 임계값을 조금씩 돌려 시간적으로 섞는다.","느린 페이드에는 8×8(64단계)이 낫다. 4×4는 16단계라 a가 천천히 변하면 한 칸씩 끊기는 게 보인다."],related:["dither-dissolve","camera-collision","xray-silhouette","over-shoulder","dissolve-death"],controls:[{type:"select",key:"bayer",label:"베이어 크기",value:"4",options:[{label:"4×4 (16단계)",value:"4"},{label:"8×8 (64단계)",value:"8"}]},{type:"range",key:"amin",label:"가운데 최소 불투명도 a_min",min:0,max:.9,step:.01,value:.3},{type:"range",key:"r1",label:"페이드 원기둥 반지름 R₁ (m)",min:.5,max:2.5,step:.05,value:1.2},{type:"range",key:"speed",label:"걷는 속도 (배)",min:0,max:3,step:.1,value:1}],viewers:[{title:"그대로 (가려짐)",kind:"before",caption:"기둥·나무가 지나갈 때마다 캐릭터가 통째로 사라집니다. 보이는 비율이 뚝 떨어지는 구간이 가림입니다.",mount:K("none")},{title:"알파 블렌딩",kind:"variant",caption:"반투명으로 지웠지만 깊이를 쓰는 탓에 잎 덩어리끼리 서로를 지워 뒤가 뻥 뚫리거나 순서가 뒤바뀝니다. 측정값이 연속 투과율 이론보다 커지는 것이 그 흔적입니다.",mount:K("alpha")},{title:"디더 페이드",kind:"after",caption:"불투명 그대로 픽셀을 베이어 무늬로 버립니다. 정렬 문제 없이 보이는 비율이 연속 투과율 이론을 따라갑니다.",mount:K("dither")},{title:"보이는 비율 · 디더 계단",kind:"info",caption:"왼쪽: 세 뷰에서 잰 캐릭터 보이는 비율(점선 = 투과율 이론). 오른쪽: 디더 덮임이 a에 대해 N² 단계 계단(파랑)이고 GPU 값(노랑)이 정확히 올라앉습니다.",mount:zt}]};export{Zt as default};
