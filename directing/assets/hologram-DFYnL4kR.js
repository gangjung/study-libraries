import{V as k,H as ft,i as mt,M as j,y as yt,S as V,a as $,g as xt,T as A,G as et,C as L,D as wt,ag as ot,aa as at,c as Mt,b as D,P as bt,O as gt,at as Pt}from"./three.module-CEzfHhrp.js";import{m as kt}from"./three-viewer-fx7lDL-0.js";import{m as Nt}from"./canvas-viewer-QtaWfmlz.js";import{c as Tt,l as Ct}from"./chart2d-DfgeckAJ.js";import{p as nt,r as St}from"./anime-kit-C6AkWSFn.js";import{f as E,a as B}from"./extra-kit-c-FPjCbN4U.js";import{P as zt,H as st,r as Gt,u as Wt,o as Ht,s as Rt,a as it,c as Ut,d as I}from"./shader-kit-a-CYybgKL4.js";const Y=.3,lt=1.78,c={x:1.15,y:1.45,z:.15,w:.95,h:1.25},_=new k(.45,1.4,0),rt=`
uniform float uMode, uTime, uGl, uOut;
varying vec3 vWp;
varying vec3 vN;
varying vec2 vUv;
float hh(float n) { return fract(sin(n * 12.9898 + 4.1) * 43758.5453); }
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  if (uMode > 1.5 && uOut < 0.5 && uGl > 0.0) {
    float tk = floor(uTime * 14.0);
    float band = floor(wp.y * 7.0);
    float on = step(1.0 - 0.45 * uGl, hh(band * 3.7 + tk));
    wp.x += on * (hh(band + tk * 1.3) - 0.5) * 0.32 * uGl;
  }
  vWp = wp.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,ct=`
uniform float uMode, uTime, uPeriod, uSpeed, uPow, uFlick, uOut, uPanel;
uniform vec3 uCol;
varying vec3 vWp;
varying vec3 vN;
varying vec2 vUv;
float hh(float n) { return fract(sin(n * 12.9898 + 4.1) * 43758.5453); }
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(cameraPosition - vWp);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  float fres = pow(1.0 - ndv, uPow);
  float ph = vWp.y / uPeriod - uTime * uSpeed;
  float s = 0.5 + 0.5 * cos(6.2831853 * ph);
  if (uOut > 0.5) { gl_FragColor = vec4(s, fres, 1.0, 1.0); return; }
  vec3 col;
  float a = 1.0;
  if (uMode < 0.5) {
    vec3 L = normalize(vec3(0.5, 0.8, 0.6));
    col = uCol * (0.12 + 0.55 * max(dot(n, L), 0.0)) + uCol * 0.08;
  } else if (uMode < 1.5) {
    col = uCol * (0.05 + 1.7 * fres);
  } else {
    float line = pow(s, 5.0);
    float band = smoothstep(0.0, 0.05, fract(vWp.y * 0.35 - uTime * 0.18)) * (1.0 - smoothstep(0.05, 0.16, fract(vWp.y * 0.35 - uTime * 0.18)));
    float tk = floor(uTime * 24.0);
    float fl = 1.0 - uFlick * (0.35 * hh(tk) + 0.65 * step(0.93, hh(tk * 0.37 + 1.0)));
    col = uCol * (0.05 + 1.6 * fres) + uCol * (0.15 + 0.6 * line) * (0.35 + 0.65 * (1.0 - fres)) + vec3(0.6, 1.0, 1.0) * band * 0.25;
    if (uPanel > 0.5) {
      vec2 q = abs(vUv * 2.0 - 1.0);
      float frame = step(0.94, max(q.x, q.y)) * step(max(q.x, q.y), 0.975);
      float rows = step(0.6, fract(vUv.y * 7.0)) * step(0.12, vUv.x) * step(vUv.x, 0.12 + 0.75 * hh(floor(vUv.y * 7.0) + floor(uTime * 1.5)));
      float ring = abs(length(vUv - vec2(0.75, 0.82)) - 0.09);
      float gauge = (1.0 - smoothstep(0.006, 0.014, ring)) * step(atan(vUv.y - 0.82, vUv.x - 0.75), -3.14 + mod(uTime * 2.0, 6.28));
      col += uCol * (frame * 1.4 + rows * 0.55 * step(vUv.y, 0.66) + gauge * 1.2);
    }
    col *= fl;
  }
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}`,Ft=`
varying vec3 vWp;
void main() {
  vec2 g = abs(fract(vWp.xz * 2.0) - 0.5);
  float line = 1.0 - smoothstep(0.0, 0.03, min(g.x, g.y));
  float r = length(vWp.xz);
  vec3 c = mix(vec3(0.05, 0.06, 0.09), vec3(0.02, 0.025, 0.04), smoothstep(0.5, 7.0, r));
  c += vec3(0.1, 0.35, 0.45) * line * exp(-r * 0.45) * 0.5;
  c += vec3(0.1, 0.55, 0.7) * exp(-r * r * 2.2) * 0.35;
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,jt=`
varying vec3 vWp;
void main() { vec4 wp = modelMatrix * vec4(position, 1.0); vWp = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }`,d={o:new k,d:new k,p:new k};function J(e){return t=>kt(t,{antialias:!0,orbit:!1,fov:35,cam:[.5,1.8,5.6],target:[_.x,_.y,_.z],far:80,background:329483},({scene:n,camera:l,renderer:o})=>{n.add(new ft(7048447,657938,.6));const f=new mt(4251903,6,6,2);f.position.set(.1,.5,.4),n.add(f);const N=new j(new yt(14,64),new V({vertexShader:jt,fragmentShader:Ft}));N.rotation.x=-Math.PI/2,n.add(N);const T=new j(new $(.62,.75,.22,48),new xt({color:2765120,metalness:.7,roughness:.35}));T.position.y=.11,n.add(T);const b=new j(new A(.5,.025,8,64),new et({color:new L(.4,1.6,2)}));b.rotation.x=Math.PI/2,b.position.y=.225,n.add(b);const W=new j(new $(.75,.48,2.4,48,1,!0),new et({color:new L(.05,.25,.32),transparent:!0,opacity:.35,blending:ot,depthWrite:!1,side:wt}));W.position.y=1.42,W.visible=e!=="opaque",n.add(W);const u={uMode:{value:e==="opaque"?0:e==="fres"?1:2},uTime:{value:0},uGl:{value:0},uOut:{value:0},uPeriod:{value:.06},uSpeed:{value:.6},uPow:{value:2.5},uFlick:{value:.35},uPanel:{value:0},uCol:{value:new L(.25,.85,1)}},m=e!=="opaque",G=p=>new V({vertexShader:rt,fragmentShader:ct,uniforms:{...u,uPanel:{value:p?1:0}},transparent:m,blending:m?ot:Pt,depthWrite:!m}),g=G(!1),K=G(!0),Q=new V({vertexShader:rt,fragmentShader:ct,uniforms:{...u,uOut:{value:1}}}),H=new at;n.add(H);const O=new at;H.add(O);const X=[],M=(p,h,P,v,S=0,i=g,y=O)=>{const s=new j(p,i);return s.position.set(h,P,v),s.rotation.z=S,y.add(s),X.push(s),s},pt=M(new Mt(Y,64,40),0,lt,0);M(new A(.34,.025,8,48),0,lt+.13,0,0).rotation.x=1.25,M(new D(.3,.55,8,32),0,1.12,0),M(new $(.09,.11,.2,16),0,1.5,0);for(const p of[-1,1])M(new D(.075,.5,6,16),p*.4,1.12,.03,p*.22),M(new D(.1,.32,6,16),p*.14,.62,0);M(new A(.42,.012,6,64),0,.95,0).rotation.x=Math.PI/2,M(new bt(c.w,c.h),c.x,c.y,c.z,0,K,H);const Z=M(new gt(.11,0),-.95,1.6,.1,0,g,H),R=new zt(1,1);let C=1,w=1,dt=0;const q=new k,a=t.shared.get(`holo-${e}`)??{rim:[],rimTh:NaN,rimMe:NaN,rimNdv:NaN,rms:NaN,spMe:NaN,spTh:NaN,spHist:new st(90),thHist:new st(90),p:2.5,t:0};t.shared.set(`holo-${e}`,a);const ht=()=>{const p=q.clone().project(l),h=Math.floor((p.y+1)/2*w);if(h<0||h>=w)return;const P=R.readRow(o,h),v=u.uPow.value;a.rim.length=0;let S=0,i=0,y=9;for(let s=0;s<C;s++){if(P[s*4+2]<128)continue;nt(l,s,h,C,w,d.o,d.d);const z=St(d.o,d.d,q,Y);if(z<0)continue;d.p.copy(d.o).addScaledVector(d.d,z).sub(q).divideScalar(Y);const x=Math.max(0,-d.p.dot(d.d)),U=Math.pow(1-x,v),r=P[s*4+1]/255;x<.08||(S+=(r-U)**2,i++,a.rim.push(x,r),Math.abs(x-.35)<y&&(y=Math.abs(x-.35),a.rimNdv=x,a.rimMe=r,a.rimTh=U))}a.rms=i?Math.sqrt(S/i):NaN,a.p=v},vt=()=>{const p=new k(c.x,c.y,c.z).project(l),h=Math.floor((p.x+1)/2*C);if(h<0||h>=C)return;const P=new k(c.x,c.y+c.h*.42,c.z).project(l),v=new k(c.x,c.y-c.h*.42,c.z).project(l),S=Math.max(0,Math.floor((v.y+1)/2*w)),i=Math.min(w-1,Math.floor((P.y+1)/2*w)),y=R.readCol(o,h),s=[];for(let r=S;r<i;r++){if(y[r*4+2]<128||y[(r+1)*4+2]<128)continue;const F=y[r*4],tt=y[(r+1)*4];F<128&&tt>=128&&s.push(r+(127.5-F)/Math.max(1,tt-F))}a.spMe=s.length>=3?(s[s.length-1]-s[0])/(s.length-1):NaN;const z=Math.floor((p.y+1)/2*w),x=r=>{nt(l,h,r,C,w,d.o,d.d);const F=(c.z-d.o.z)/d.d.z;return d.o.y+d.d.y*F},U=(x(z+4)-x(z-4))/8;a.spTh=u.uPeriod.value/Math.abs(U),a.spHist.push(a.t,a.spMe),a.thHist.push(a.t,a.spTh)};return{resize(p,h){C=Math.max(1,Math.floor(p)),w=Math.max(1,Math.floor(h)),R.resize(C,w)},update(p,h,P){const v=t.params,i=Wt(t,"holoClock",P).t,y=v.bool("dolly",!0)?5.6+1.6*Math.sin(i*.23):5.6;Ht(l,_,.28*Math.sin(i*.17),.1,y),u.uTime.value=i,u.uPeriod.value=v.num("period",.06),u.uSpeed.value=v.num("speed",.6),u.uPow.value=v.num("pow",2.5),u.uFlick.value=v.num("flick",.35);const s=Math.floor(i/.9),z=Math.abs(Math.sin(s*91.7))*43758.5%1,x=i-s*.9;u.uGl.value=z>.55&&x<.22?v.num("glitch",.5):0,O.rotation.y=.5*Math.sin(i*.4),H.position.y=.03*Math.sin(i*1.3),Z.position.set(-.95,1.6+.1*Math.sin(i*1.7),.1),Z.rotation.set(i*.9,i*1.3,0),n.updateMatrixWorld(),pt.getWorldPosition(q),a.t=i;const r=[e==="opaque"?"불투명 램버트 (가산·프레넬 없음)":e==="fres"?`가산 + 프레넬 (1−N·V)^${E(u.uPow.value)}`:`프레넬 + 주사선 P ${u.uPeriod.value.toFixed(3)} · 깜빡임 · 글리치`];e!=="opaque"&&r.push(`림 N·V ${B(a.rimNdv)}: 측정 ${B(a.rimMe)} / 이론 ${B(a.rimTh)} · RMS ${a.rms.toFixed(3)}`),e==="full"&&r.push(`주사선 간격 측정 ${E(a.spMe)} / 이론 ${E(a.spTh)} px`),t.hud(r.join(`
`))},render(){o.setRenderTarget(null),o.render(n,l),e!=="opaque"&&dt++%8===0&&(Gt(o,n,l,R.rt,X,Q),ht(),e==="full"&&vt(),o.setRenderTarget(null))},dispose(){R.dispose(),Q.dispose(),K.dispose()}}})}function qt(e){return Nt(e,()=>({draw(t,n,l){Tt(t,n,l);const o=e.shared.get("holo-full"),f=e.shared.get("holo-fres");if(!o)return;const[N,T]=Rt(n,l),b={...N,x0:0,x1:1,y0:0,y1:1};it(t,b,"림 세기 (1 − N·V)^p","N·V",[0,.5,1],[0,.5,1]);const W=o.p;Ut(t,b,g=>Math.pow(1-g,W),"#c8d0dc",1.6),f&&I(t,b,ut(f.rim,40),"#5b9cff",2.2,!0),I(t,b,ut(o.rim,40),"#38d9d9",2.2);const u=o.t,m={...T,x0:Math.max(0,u-24),x1:Math.max(24,u),y0:0,y1:1};let G=4;for(let g=1;g<o.thHist.data.length;g+=2)G=Math.max(G,o.thHist.data[g]*1.25);m.y1=Math.ceil(G),it(t,m,"주사선 화면 간격 (px)","시간 (s)",[Math.round(m.x0),Math.round(m.x1)],[0,Math.round(m.y1/2),m.y1]),_t(t,m,o.thHist.data,"#c8d0dc"),I(t,m,o.spHist.data,"#ff9a3c",2.2),Ct(t,[{label:"이론",color:"#c8d0dc"},{label:"측정(전체)",color:"#38d9d9"},{label:"측정(프레넬)",color:"#5b9cff"},{label:"측정 간격",color:"#ff9a3c"}],8,l-4,9),e.hud("")}}))}function ut(e,t){const n=Math.max(1,Math.floor(e.length/2/t)),l=[];for(let o=0;o+1<e.length;o+=2*n)l.push(e[o],e[o+1]);return l}function _t(e,t,n,l){e.strokeStyle=l,e.lineWidth=1.5,e.beginPath();let o=!1;for(let f=0;f+1<n.length;f+=2){if(!Number.isFinite(n[f+1])||n[f]<t.x0){o=!1;continue}const N=t.x+(n[f]-t.x0)/(t.x1-t.x0)*t.w,T=t.y+t.h-Math.min(n[f+1],t.y1)/t.y1*t.h;o?e.lineTo(N,T):e.moveTo(N,T),o=!0}e.stroke()}const Bt={layout:"compare",intro:'SF 게임의 홀로그램은 "빛으로 만든 물체"처럼 보여야 합니다. 그래서 불투명하게 칠하지 않고 <b>가산 블렌딩</b>으로 뒤가 비치게 하고, 윤곽이 밝은 <b>프레넬</b>, 월드 높이를 따라 흐르는 <b>주사선</b>, 전원이 불안한 듯한 <b>깜빡임</b>과 <b>글리치 밀림</b>을 겹칩니다. 같은 안내원 홀로그램을 불투명 / 프레넬만 / 전체 효과로 비교합니다.',how:["가산 블렌딩(<code>src + dst</code>)과 깊이 쓰기 끔: 검은색은 투명, 밝은 곳만 빛나 보인다. 겹친 부분은 더 밝아져 부피감이 생긴다.","프레넬 <code>(1 − N·V)^p</code>: 시선과 직각인 윤곽일수록 1에 가깝다. p가 클수록 테두리가 얇아진다. 얇은 막(빛의 껍질)처럼 보이는 핵심.","주사선은 화면이 아니라 <b>월드 y</b>로 계산한다: <code>s = ½ + ½cos(2π(y/P − t·v))</code>. 그래서 물체에 붙어 함께 움직이고, 카메라가 멀어지면 화면 간격이 <code>P / |dy/dj|</code>로 줄어든다.","깜빡임은 시간을 초당 24단계로 끊은 해시로 밝기를 흔들고(가끔 크게 꺼짐), 글리치는 정점 셰이더에서 월드 y 띠(1/7m)마다 해시가 걸린 곳만 x로 밀어 짧게 찢는다. 위로 천천히 흐르는 밝은 띠 하나를 더해 스캔 느낌을 준다.",'측정: 홀로그램만 "측정 출력"(R = 주사선 s, G = 프레넬)으로 다시 그려, 머리 중심 행(프레넬)과 패널 중심 열(주사선 간격)을 GPU에서 읽는다. 이론은 같은 픽셀에서 CPU 광선-구 · 광선-평면 교차로 구한 값.'],pros:["셰이더 하나로 끝나고 텍스처가 필요 없다. 어떤 메시든 바로 홀로그램이 된다.",'월드 공간 주사선은 물체를 따라 움직여 "투사된 빛"이라는 설득력이 있다.',"가산이라 정렬 순서에 관계없이 결과가 같다(덧셈은 교환법칙)."],cons:["가산 블렌딩은 밝은 배경 위에서는 거의 안 보인다. 어두운 장면용.","프레넬은 법선에 의존해서 평평한 패널은 테두리가 생기지 않는다. 패널은 UV로 테두리를 따로 그려야 한다.","주사선 간격이 픽셀보다 작아지면(멀리서) 모아레가 생긴다. 거리에 따라 P를 키우거나 페이드해야 한다."],usedIn:"〈헤일로〉 시리즈의 AI 홀로그램, 〈사이버펑크 2077〉의 광고·통화 홀로그램, 〈스타워즈〉 영화의 푸른 통신 홀로그램 같은 연출이 이런 프레넬·주사선·깜빡임 조합으로 흔히 재현됩니다. 실제 게임의 셰이더 세부는 게임마다 다릅니다.",tips:["프레넬 지수 p는 2~4가 무난하다. 1에 가까우면 몸 전체가 뿌옇게 빛나고, 5 이상이면 테두리가 실처럼 얇아져 멀리서 사라진다.","주사선 화면 간격은 최소 3px 이상으로 유지한다 (2px 아래는 모아레). 카메라 거리로 P를 키우거나 주사선 세기를 줄여 페이드한다.","가산 블렌딩은 몸 안쪽 뒷면까지 겹쳐 보인다. 깊이만 먼저 쓰는 패스를 한 번 그리면 가장 앞면만 남아 덜 지저분하다.",'블룸과 함께 써야 "빛으로 된 물체"가 산다. 프레넬 테두리를 HDR 1 이상으로 올리고, 같은 깜빡임 값으로 주변 조명 세기도 흔들면 설득력이 커진다.'],related:["rim-light","glitch","bloom","shield-ripple","xray-silhouette"],controls:[{type:"range",key:"pow",label:"프레넬 지수 p",min:1,max:6,step:.1,value:2.5},{type:"range",key:"period",label:"주사선 월드 주기 P (m)",min:.03,max:.2,step:.005,value:.06},{type:"range",key:"speed",label:"주사선 흐름 속도 v (주기/s)",min:0,max:2,step:.05,value:.6},{type:"range",key:"flick",label:"깜빡임 세기",min:0,max:1,step:.05,value:.35},{type:"range",key:"glitch",label:"글리치 세기",min:0,max:1,step:.05,value:.5},{type:"toggle",key:"dolly",label:"카메라 앞뒤로 이동 (간격 변화)",value:!0}],viewers:[{title:"불투명 셰이딩",kind:"before",caption:"같은 색으로 램버트 셰이딩만 했습니다. 단단한 플라스틱 인형처럼 보이고 뒤가 비치지 않습니다.",mount:J("opaque")},{title:"가산 + 프레넬만",kind:"variant",caption:'윤곽이 빛나고 가운데는 비쳐 "빛의 껍질" 느낌이 납니다. 다만 정지해 있어 투사되는 느낌은 약합니다.',mount:J("fres")},{title:"전체 홀로그램",kind:"after",caption:"월드 높이를 따라 흐르는 주사선, 깜빡임, 짧은 글리치가 더해져 불안정하게 투사되는 빛처럼 보입니다.",mount:J("full")},{title:"프레넬 · 주사선 측정",kind:"info",caption:"왼쪽: 머리 중심 행 픽셀의 프레넬 값(점)과 (1 − N·V)^p(선). 오른쪽: 카메라가 앞뒤로 움직일 때 패널의 주사선 화면 간격(점)과 P / |dy/dj|(선).",mount:qt}]};export{Bt as default};
