import{V as T,k as j,M as D,P as me,S as q,y as pe,aa as fe,c as ae,b as J,a as he,C as I,al as xe,D as we,W as ne,am as ye}from"./three.module-CEzfHhrp.js";import{m as be}from"./three-viewer-fx7lDL-0.js";import{m as Me,b as re,s as ge}from"./canvas-viewer-QtaWfmlz.js";import{c as Fe,t as H,l as Ne}from"./chart2d-DfgeckAJ.js";import{h as Le,A as Re,p as Ce,r as ke}from"./anime-kit-C6AkWSFn.js";import{P as ze,a as Q,f as A}from"./extra-kit-c-FPjCbN4U.js";const G=.5,ie=1.75,le=.16,Z=.1,B=60,De=`
varying vec3 vNw;
varying vec3 vNv;
varying vec3 vWp;
varying vec3 vLp;
void main() {
  vNw = normalize(mat3(modelMatrix) * normal);
  vNv = normalize(normalMatrix * normal);
  vLp = position;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,$e=`
uniform vec3 uL, uLit, uShade, uFill;
uniform vec2 uDir;
uniform float uFres, uFresOn, uFace, uGlow;
varying vec3 vNw;
varying vec3 vNv;
varying vec3 vWp;
varying vec3 vLp;
${Re}
void main() {
  vec3 n = normalize(vNw);
  if (!gl_FrontFacing) n = -n;
  vec3 v = normalize(cameraPosition - vWp);
  float d = dot(n, uL);
  float lit = smoothstep(-0.03, 0.03, d);
  vec3 col = mix(uShade, uLit, lit);
  col += uFill * max(dot(n, normalize(vec3(-0.3, 0.4, 1.0))), 0.0) * 0.25;
  col += uGlow * vec3(0.35, 0.8, 1.0) * 0.6;
  if (uFace > 0.5 && vLp.z > 0.0) {
    vec4 f = animeFace(vLp.xy / ${G.toFixed(3)}, lit);
    col = mix(col, f.rgb, f.a * smoothstep(0.2, 0.45, vLp.z / ${G.toFixed(3)}));
  }
  float a = 1.0;
  if (uFresOn > 0.5) {
    vec3 nv = normalize(vNv);
    float side = dot(nv.xy, uDir);
    if (1.0 - dot(n, v) > uFres && side > 0.0) a = 0.6;
  }
  gl_FragColor = vec4(col, a);
}`,se=`
varying vec3 vWp;
varying vec2 vUv;
void main() { vUv = uv; vec4 wp = modelMatrix * vec4(position, 1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,Se=`
uniform vec2 uMoon;
varying vec2 vUv;
varying vec3 vWp;
float h1(float x) { return fract(sin(x * 127.1) * 43758.5453); }
void main() {
  vec2 p = vWp.xy;
  vec3 sky = mix(vec3(0.05, 0.06, 0.14), vec3(0.18, 0.12, 0.3), smoothstep(-1.0, 7.0, p.y));
  float md = length(p - uMoon);
  sky += vec3(1.0, 0.75, 0.5) * (exp(-md * 0.55) * 0.35 + smoothstep(0.75, 0.68, md));
  // 건물 실루엣 + 창문
  float bx = floor(p.x / 1.3);
  float bh = 1.2 + h1(bx) * 3.5;
  if (p.y < bh) {
    sky = vec3(0.04, 0.045, 0.09);
    vec2 cell = vec2(fract(p.x / 0.32), fract(p.y / 0.42));
    float on = step(0.62, h1(bx * 7.0 + floor(p.y / 0.42) * 3.1 + floor(p.x / 0.32) * 0.7));
    sky += on * vec3(1.0, 0.78, 0.42) * 0.45 * step(0.25, cell.x) * step(cell.x, 0.75) * step(0.3, cell.y) * step(cell.y, 0.8);
  }
  gl_FragColor = vec4(sky, 0.0);
}`,_e=`
varying vec3 vWp;
void main() {
  float r = length(vWp.xz);
  vec3 c = mix(vec3(0.16, 0.15, 0.24), vec3(0.05, 0.05, 0.1), smoothstep(0.5, 6.0, r));
  gl_FragColor = vec4(c, 0.0);
}`,Ge=`
uniform sampler2D tColor, tDepth;
uniform vec2 uRes, uOff;
uniform float uMode, uThr, uOut;
uniform vec3 uRimCol;
varying vec2 vUv;
float lin(float d) { return ${Z.toFixed(3)} * ${B.toFixed(1)} / (${B.toFixed(1)} - d * (${B.toFixed(1)} - ${Z.toFixed(3)})); }
void main() {
  vec4 c = texture2D(tColor, vUv);
  float ch = step(0.3, c.a);
  float rim = 0.0;
  if (uMode > 1.5) {
    float d0 = lin(texture2D(tDepth, vUv).r);
    float d1 = lin(texture2D(tDepth, vUv + uOff / uRes).r);
    rim = ch * step(uThr, d1 - d0);
  } else if (uMode > 0.5) {
    rim = ch * step(c.a, 0.8);
  }
  vec3 col = c.rgb + rim * uRimCol;
  if (uOut > 0.5) { gl_FragColor = vec4(rim, ch, dot(col, vec3(0.2126, 0.7152, 0.0722)), 1.0); return; }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Te=(a,e)=>ge(a.shared,"rimClock",e,()=>({t:0,az:55}),(i,l)=>{i.t+=l,i.az=a.params.bool("auto",!0)?60*Math.sin(i.t*.22+1.2):a.params.num("az",55)}),b={o:new T,d:new T,p:new T};function Oe(a,e,i,l,n,u,p,o,d,s,$){const m=l.clone().project(a),f=Math.floor((m.y+1)/2*i),M=Math.floor((m.x+1)/2*e),c=(t,r)=>t<0||t>=e||r<0||r>=i?-1:(Ce(a,t,r,e,i,b.o,b.d),ke(b.o,b.d,l,n));if(c(M,f)<0)return{n:NaN,jc:f,ic:M};let g=M;for(;c(g+p,f)>0;)g+=p;if(u==="none")return{n:0,jc:f,ic:M};let x=0;for(let t=g;c(t,f)>0;t-=p){let r;if(u==="depth")r=c(Math.floor(t+.5+o),Math.floor(f+.5+d))<0;else{const L=c(t,f);b.p.copy(b.o).addScaledVector(b.d,L).sub(l).divideScalar(n),r=1+b.p.dot(b.d)>s,b.p.transformDirection(a.matrixWorldInverse),b.p.x*$.x+b.p.y*$.y<=0&&(r=!1)}if(!r)break;x++}return{n:x,jc:f,ic:M}}function Pe(a,e,i,l){if(i<0||i>=e||a[i*4+1]<128)return{n:NaN,dL:NaN};let n=i;for(;n+l>=0&&n+l<e&&a[(n+l)*4+1]>127;)n+=l;let u=0;for(let s=n;s>=0&&s<e&&a[s*4+1]>127&&a[s*4]>127;s-=l)u++;const p=s=>a[Math.min(e-1,Math.max(0,s))*4+2]/255,o=(p(n)+p(n-l))/2,d=(p(n+l)+p(n+2*l))/2;return{n:u,dL:o-d}}function X(a){return e=>be(e,{antialias:!1,orbit:!1,fov:30,cam:[.3,1.5,7.6],target:[.25,1.25,0],near:Z,far:B},({scene:i,camera:l,renderer:n})=>{i.background=null;const u={value:new T(.7,.45,-.6)},p={value:new j(1,0)},o={value:.6},d=(v,h,w=!1,_=0,S=xe)=>new q({vertexShader:De,fragmentShader:$e,side:S,uniforms:{uL:u,uDir:p,uFres:o,uFresOn:{value:a==="fres"?1:0},uFace:{value:w?1:0},uGlow:{value:_},uLit:{value:new I(v)},uShade:{value:new I(h)},uFill:{value:new I(7108808)}}}),s=new D(new me(40,18),new q({vertexShader:se,fragmentShader:Se,uniforms:{uMoon:{value:new j(3,4)}}}));s.position.set(0,6,-8),i.add(s);const $=new D(new pe(16,48),new q({vertexShader:se,fragmentShader:_e}));$.rotation.x=-Math.PI/2,i.add($);const m=new fe;i.add(m);const f=new D(new ae(G,72,48),d(16769228,10122640,!0));f.position.y=ie,m.add(f);const M=new D(Le({sx:G*1.07,sy:G*1.07,sz:G*1.09,front:.88,tips:1.18,side:1.3,back:1.62,strands:20}),d(6969512,2892616,!1,0,we));M.position.y=ie,m.add(M);const c=new D(new J(.42,.75,8,32),d(7312096,3095148));c.position.y=.98,m.add(c);const g=new D(new he(.13,.15,.3,16),d(16769228,10122640));g.position.y=1.42,m.add(g);for(const v of[-1,1]){const h=new D(new J(.1,.62,6,16),d(7312096,3095148));h.position.set(v*.5,1.05,.02),h.rotation.z=v*.16,m.add(h);const w=new D(new J(.14,.42,6,16),d(3881554,1907756));w.position.set(v*.18,.32,0),m.add(w)}const x=new D(new ae(le,48,32),d(12578815,5078952,!1,.4));i.add(x);let t=null,r=null,L=1,E=1,k=1,Y=new Uint8Array(4);const R=new ze(Ge,{tColor:{value:null},tDepth:{value:null},uRes:{value:new j(1,1)},uOff:{value:new j(0,0)},uMode:{value:a==="none"?0:a==="fres"?1:2},uThr:{value:.5},uOut:{value:0},uRimCol:{value:new I(1,.78,.52)}}),F={head:{me:NaN,th:NaN},orb:{me:NaN,th:NaN},dL:NaN,w:4,dir:[1,0]};e.shared.set(`rim-meas-${a}`,F);let ce=0,U={s:1,ox:0,oy:0,c:.6};const K=new T,W=new T,ee=new T,ue=(v,h)=>{var w;(w=t==null?void 0:t.depthTexture)==null||w.dispose(),t==null||t.dispose(),r==null||r.dispose(),t=new ne(v,h),t.depthTexture=new ye(v,h),r=new ne(v,h),R.u.tColor.value=t.texture,R.u.tDepth.value=t.depthTexture,R.u.uRes.value.set(v,h),Y=new Uint8Array(v*4)},de=(v,h,w,_)=>{if(!r)return;R.u.uOut.value=1,R.render(n,r),R.u.uOut.value=0;let S=0,O=0;const y=(C,V,N)=>{const z=Oe(l,L,E,C,V,a,v,h,w,_,p.value);if(N.th=z.n/k,z.jc<0||z.jc>=E){N.me=NaN;return}n.readRenderTargetPixels(r,0,z.jc,L,1,Y);const P=Pe(Y,L,z.ic,v);N.me=P.n/k,Number.isFinite(P.dL)&&(S+=P.dL,O++)};y(W,G,F.head),y(ee,le,F.orb),F.dL=O?S/O:NaN,n.setRenderTarget(null)};return{resize(v,h,w){k=Math.min(w,1.5),L=Math.max(1,Math.floor(v*k)),E=Math.max(1,Math.floor(h*k)),ue(L,E)},update(v,h,w){const _=Te(e,w),S=e.params,O=_.az*Math.PI/180;u.value.set(Math.sin(O),.55,-Math.cos(O)).normalize(),m.position.y=.03*Math.sin(_.t*2),x.position.set(1.25,.92+.08*Math.sin(_.t*1.3),.3),l.updateMatrixWorld(),i.updateMatrixWorld(),f.getWorldPosition(W),ee.copy(x.position),K.copy(u.value).transformDirection(l.matrixWorldInverse);let y=K.x,C=K.y;const V=Math.hypot(y,C);V<.001?(y=1,C=0):(y/=V,C/=V),p.value.set(y,C);const N=S.num("width",4),z=S.num("fres",.6);o.value=z,R.u.uOff.value.set(y*N*k,C*N*k),R.u.uThr.value=S.num("thr",.5),F.w=N,F.dir=[y,C];const P=u.value.z<-.05?(-8-W.z)/u.value.z:30;s.material.uniforms.uMoon.value.set(Math.max(-9,Math.min(9,W.x+u.value.x*P)),Math.max(3.5,Math.min(9,W.y+u.value.y*P)));const te=y>=0?1:-1;U={s:te,ox:y*N*k,oy:C*N*k,c:z};const oe=te>0?"오른쪽":"왼쪽",ve=a==="none"?`림 없음 · 역광 ${oe}`:a==="fres"?`프레넬 1−N·V > ${z.toFixed(2)} · ${oe}`:`w ${N.toFixed(1)}px · d (${Q(y)}, ${Q(C)}) → w·|dₓ| ${A(N*Math.abs(y))}px`;e.hud([ve,`머리 림 측정 ${A(F.head.me)} / 이론 ${A(F.head.th)}px`,`작은 공 측정 ${A(F.orb.me)} / 이론 ${A(F.orb.th)}px`,`윤곽 밝기 차 ΔL ${Q(F.dL)}`].join(`
`))},render(){n.setRenderTarget(t),n.setClearColor(0,0),n.clear(),n.render(i,l),ce++%6===0&&de(U.s,U.ox,U.oy,U.c),R.render(n,null)},dispose(){var v;(v=t==null?void 0:t.depthTexture)==null||v.dispose(),t==null||t.dispose(),r==null||r.dispose(),R.dispose()}}})}function Ae(a){return Me(a,()=>({draw(e,i,l){Fe(e,i,l);const n=a.shared.get("rim-meas-fres"),u=a.shared.get("rim-meas-depth");if(!n||!u)return;const p=[{label:"프레넬",m:n,col:"#5b9cff"},{label:"깊이 림",m:u,col:"#ff9a3c"}],o={x:40,y:26,w:re(i-56,20),h:re(l-58,20)};let d=4;for(const c of p)for(const g of[c.m.head,c.m.orb])for(const x of[g.me,g.th])Number.isFinite(x)&&(d=Math.max(d,x*1.25));d=Math.max(d,u.w*Math.abs(u.dir[0])*1.3);const s=c=>o.y+o.h-Math.min(c,d)/d*o.h;e.strokeStyle="#1c2230",e.strokeRect(o.x+.5,o.y+.5,o.w,o.h);for(const c of[0,d/2,d])H(e,`${c.toFixed(1)}`,o.x-4,s(c)+3,"#7d8799",9,"right");const $=o.w/4,m=Math.max(4,$*.28);let f=0;for(const c of p)for(const[g,x]of[["머리",c.m.head],["공",c.m.orb]]){const t=o.x+$*(f+.5),r=Number.isFinite(x.me)?x.me:0,L=Number.isFinite(x.th)?x.th:0;e.fillStyle=c.col,e.fillRect(t-m-1,s(r),m,o.y+o.h-s(r)),e.fillStyle="#c8d0dc66",e.fillRect(t+1,s(L),m,o.y+o.h-s(L)),H(e,`${c.label}·${g}`,t,o.y+o.h+12,"#c8d0dc",9,"center"),H(e,A(r),t-m/2,s(r)-3,"#e6e9ef",9,"center"),f++}const M=u.w*Math.abs(u.dir[0]);e.strokeStyle="#4ade80",e.setLineDash([4,3]),e.beginPath(),e.moveTo(o.x,s(M)),e.lineTo(o.x+o.w,s(M)),e.stroke(),e.setLineDash([]),H(e,"중심 행 가로 림 두께 (px)",o.x,14,"#c8d0dc",10),Ne(e,[{label:"측정 (색 막대)",color:"#ff9a3c"},{label:"이론 (회색)",color:"#c8d0dc"},{label:"w·|dₓ|",color:"#4ade80"}],o.x,l-4,9),a.hud("")}}))}const He={layout:"compare",intro:"애니풍 게임은 어두운 배경에서도 캐릭터가 또렷해야 합니다. <b>림라이트</b>는 윤곽에 얇은 빛 테두리를 둘러 실루엣을 배경에서 떼어 냅니다. 고전적인 <b>프레넬 림</b>(1 − N·V)은 물체가 크면 두껍고 작으면 사라지지만, <b>화면 공간 깊이 림</b>은 빛 쪽으로 w 픽셀 떨어진 깊이를 비교해 <b>어느 물체든 같은 픽셀 두께</b>의 선을 그립니다. 같은 역광 장면을 림 없음 / 프레넬 / 깊이 림으로 비교합니다.",how:['캐릭터를 색(α = 1)과 깊이 텍스처로 렌더 타깃에 그린다. 배경·바닥은 α = 0 → 후처리에서 "캐릭터 픽셀"만 골라낼 수 있다.',"빛 방향을 뷰 공간으로 옮겨 화면 방향 d = normalize(Lᵥ.xy)를 구하고, 각 캐릭터 픽셀에서 <code>uv + w·d / 해상도</code>의 깊이를 읽는다. 선형 깊이 차가 임계값보다 크면(뒤가 배경이거나 훨씬 멀면) 림.","그래서 수직 윤곽에서 가로 두께는 정확히 <code>w·|dₓ|</code> 픽셀 – 큰 머리든 작은 공이든 같다. 프레넬은 구에서 <code>R·(1 − √(1−(1−c)²))</code>로 화면 크기에 비례한다.",'측정: 같은 후처리를 "림·캐릭터·밝기" 마스크로 그려 머리·공 중심 행을 GPU에서 읽고, 윤곽부터 안쪽으로 이어진 림 픽셀을 센다. 이론은 CPU 광선-구 교차로 같은 픽셀 격자에서 같은 판정을 한 값.'],pros:['두께를 픽셀로 정확히 지정 → 원화의 "선 굵기"를 화면 크기·카메라 거리와 무관하게 유지.',"법선이 이상한 부위(머리카락 껍데기, 저폴리 소품)에도 실루엣만 있으면 깨끗한 림이 생긴다.",'빛 방향 쪽 윤곽에만 생기므로 "역광"이라는 조명 논리가 화면에 그대로 읽힌다.'],cons:["깊이 텍스처와 후처리 패스가 필요하고, 화면 가장자리·반투명 물체(머리카락 카드, 이펙트)에서는 깊이가 없어 끊긴다.","오프셋이 픽셀 단위라 해상도가 바뀌면(모바일 동적 해상도) 실제 두께가 함께 변한다 – 해상도 비율로 보정해야 한다.","앞뒤로 겹친 부위(팔과 몸) 사이에도 림이 생겨, 임계값을 잘못 잡으면 몸 안쪽에 선이 지저분하게 생긴다."],usedIn:"〈원신〉 같은 애니풍 3D 게임이 깊이 버퍼 기반 화면 공간 림라이트를 쓰는 것으로 분석되어 널리 알려졌고, 애니풍 렌더링 강연·툰 셰이더 에셋에서도 프레넬 대신 많이 소개되는 방식입니다. 게임마다 오프셋 방향·마스크 처리는 다릅니다.",tips:["w는 1080p 기준 2~6px가 무난하다. 동적 해상도·모바일에서는 <code>w × (화면 높이 / 1080)</code>처럼 해상도 비율을 곱해 화면상 굵기를 유지한다.","깊이 차 임계값은 몸통 두께보다 작게(0.1~0.5m) 잡는다. 너무 작으면 팔과 몸이 겹친 곳에 선이 생기고, 너무 크면 바닥이 가까운 발 주변처럼 뒤 배경이 가까운 곳의 림이 사라진다.","깊이 림에 빛 쪽 마스크(N·L 또는 약한 프레넬)를 곱하면 몸 안쪽 겹침 부위의 잘못된 림을 줄일 수 있다. 림 색은 광원 색을 더하기(additive)로 넣는다.","외곽선(edge-outline)과 같이 쓰면 깊이 텍스처를 한 번만 읽어 두 효과를 함께 계산할 수 있다."],related:["edge-outline","cel-shading","face-sdf-shadow","silhouette","three-point-lighting"],controls:[{type:"range",key:"width",label:"깊이 림 두께 w (px)",min:1,max:12,step:.5,value:4},{type:"range",key:"thr",label:"깊이 차 임계값 (m)",min:.05,max:2,step:.05,value:.5},{type:"range",key:"fres",label:"프레넬 경계 c (1−N·V > c)",min:.3,max:.95,step:.01,value:.6},{type:"toggle",key:"auto",label:"역광 방향 자동으로 흔들기",value:!0},{type:"range",key:"az",label:"역광 방위각 (°, 자동 끔일 때)",min:-80,max:80,step:1,value:55}],viewers:[{title:"림 없음",kind:"before",caption:"역광 툰 셰이딩만 했습니다. 캐릭터의 그늘 쪽이 밤 배경과 비슷한 밝기라 실루엣이 묻힙니다. HUD의 ΔL은 윤곽 안쪽과 바로 바깥 배경의 밝기 차로, 0에 가까울수록 실루엣이 안 보입니다.",mount:X("none")},{title:"프레넬 림 (1 − N·V)",kind:"variant",caption:"법선이 시선과 직각에 가까운 곳을 밝혔습니다. 큰 머리는 두껍고 작은 공은 거의 사라져, 두께가 물체 크기를 따라갑니다.",mount:X("fres")},{title:"화면 공간 깊이 림",kind:"after",caption:"빛 쪽으로 w px 떨어진 깊이가 훨씬 멀면 림입니다. 머리와 작은 공의 림 두께가 똑같이 w·|dₓ| px입니다.",mount:X("depth")},{title:"림 두께 비교",kind:"info",caption:"머리·작은 공 중심 행에서 잰 림 두께(색 막대 = 측정, 회색 = 이론)입니다. 깊이 림은 두 물체 모두 초록 선(w·|dₓ|)에 붙고, 프레넬은 물체 크기에 따라 달라집니다.",mount:Ae}]};export{He as default};
