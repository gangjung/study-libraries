import{k as J}from"./three.module-CEzfHhrp.js";import{a as O,s as K}from"./canvas-viewer-QtaWfmlz.js";import{m as j}from"./fx-CIZ4XT9q.js";import{a as X}from"./cinematic-kit-Df64PW3M.js";import"./three-viewer-fx7lDL-0.js";const Z=24;let B=null;function tt(){if(B)return B;const e=960,a=540,o=document.createElement("canvas");o.width=e,o.height=a;const t=o.getContext("2d"),i=O(31),g=t.createLinearGradient(0,0,0,a*.62);g.addColorStop(0,"#5e8fd0"),g.addColorStop(.7,"#a9c4e0"),g.addColorStop(1,"#f2d2a2"),t.fillStyle=g,t.fillRect(0,0,e,a),t.fillStyle="#fff1c8",t.beginPath(),t.arc(e*.2,a*.42,34,0,Math.PI*2),t.fill(),t.fillStyle="rgba(255,255,255,0.75)";for(const[l,n,c]of[[.62,.26,1],[.84,.34,.7],[.4,.36,.6]])for(let r=0;r<4;r++)t.beginPath(),t.ellipse(e*l+(r-1.5)*34*c,a*n-r%2*10*c,40*c,18*c,0,0,Math.PI*2),t.fill();const y=(l,n,c,r)=>{t.fillStyle=c,t.beginPath(),t.moveTo(0,a);for(let m=0;m<=e;m+=8)t.lineTo(m,a*l+Math.sin(m*r+l*9)*n+Math.sin(m*r*2.7)*n*.4);t.lineTo(e,a),t.fill()};y(.6,18,"#7d92a8",.006),y(.68,14,"#5f8a5a",.009),y(.78,10,"#4a7a3e",.013),t.fillStyle="#4a3222",t.fillRect(e*.72-9,a*.48,18,a*.3),t.fillStyle="#2f6a34";for(let l=0;l<9;l++)t.beginPath(),t.arc(e*.72+(i()-.5)*140,a*.44+(i()-.5)*70,40+i()*26,0,Math.PI*2),t.fill();const v=e*.42,s=a*.82;t.fillStyle="#9b2f2f",t.beginPath(),t.moveTo(v-22,s),t.lineTo(v+22,s),t.lineTo(v+12,s-80),t.lineTo(v-12,s-80),t.fill(),t.fillStyle="#e8c9a8",t.beginPath(),t.arc(v,s-94,15,0,Math.PI*2),t.fill(),t.fillStyle="#2a2018",t.beginPath(),t.ellipse(v,s-104,34,7,0,0,Math.PI*2),t.fill();for(let l=0;l<260;l++){const n=i()*e,c=a*(.8+i()*.2);t.strokeStyle=i()<.5?"#6ea050":"#3f6e30",t.lineWidth=2,t.beginPath(),t.moveTo(n,c),t.lineTo(n+(i()-.5)*12,c-14-i()*20),t.stroke()}const u=["#e8506a","#f5c542","#ffffff","#c86ad8"];for(let l=0;l<70;l++)t.fillStyle=u[l%u.length],t.beginPath(),t.arc(i()*e,a*(.82+i()*.17),3+i()*3,0,Math.PI*2),t.fill();return B=o,o}const et=`
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uSize;
uniform float uTexAspect;
uniform float uGrain;
uniform float uVig;
uniform float uBW;
uniform vec2 uWeave;
uniform float uFlick;
uniform float uFrame;
uniform float uScratch;
uniform float uTime;
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  float va = uSize.x / uSize.y;
  vec2 tuv = vUv;
  // cover 맞춤
  if (va > uTexAspect) tuv.y = (vUv.y - 0.5) * uTexAspect / va + 0.5;
  else tuv.x = (vUv.x - 0.5) * va / uTexAspect + 0.5;
  // 바람에 흔들리는 풀 (아래 20%)
  float gr = smoothstep(0.22, 0.0, tuv.y);
  tuv.x += sin(tuv.y * 60.0 + uTime * 2.2) * 0.0025 * gr;
  // 게이트 위브: 필름이 영사기 게이트에서 미세하게 흔들림 (uv 단위로 전달)
  tuv += uWeave;
  vec3 c = texture2D(uTex, clamp(tuv, 0.001, 0.999)).rgb;
  if (uBW > 0.5) c = vec3(dot(c, vec3(0.299, 0.587, 0.114)));
  c *= uFlick;
  // 비네트: 1 − v·r²  (r = 화면 모서리에서 1)
  vec2 q = vUv - 0.5;
  q.x *= va;
  float r2 = dot(q, q) / (0.25 * (va * va + 1.0));
  c *= 1.0 - uVig * r2;
  if (uScratch > 0.5) {
    // 세로 스크래치 1줄 + 먼지
    float sx = hash12(vec2(uFrame, 3.1));
    float on = step(0.45, hash12(vec2(uFrame, 9.7)));
    float d = abs(vUv.x - sx) * uSize.x;
    c = mix(c, vec3(0.92), on * smoothstep(1.2, 0.0, d) * 0.55);
    vec2 cell = floor(vUv * uSize / 3.0);
    float dust = step(0.9997, hash12(cell + uFrame * 7.0));
    c *= 1.0 - dust * 0.8;
  }
  // 그레인: 필름 프레임마다 새로 뽑는 균등 잡음 [−g, g] → 표준편차 g/√3
  float n = hash12(floor(gl_FragCoord.xy) + vec2(uFrame * 37.0, uFrame * 11.0)) - 0.5;
  c += n * 2.0 * uGrain;
  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`,at=(e,a)=>K(e.shared,"film",a,()=>({t:0}),(o,t)=>o.t+=t);function R(e){return a=>{const o={uGrain:{value:0},uVig:{value:0},uBW:{value:e==="bw"?1:0},uWeave:{value:new J},uFlick:{value:1},uFrame:{value:0},uScratch:{value:e==="bw"?1:0},uTime:{value:0}},t=j(5),i=j(9),g=O(77);let y=-1,v=1;const s=new Uint8Array(16*16*4),u=[];let l=0,n={std:0,sat:0,ratio:0,flick:0},c=0;return X(a,tt(),et,o,{update(r,m,S,w,p){const f=at(a,S),h=a.params,F=e==="bw"?1.4:1,U=h.bool("film24",!0),d=Math.floor(U?f.t*Z:f.t*60);if(o.uTime.value=f.t,o.uFrame.value=d%997,o.uGrain.value=e==="clean"?0:h.num("grain",.08)*F,o.uVig.value=e==="clean"?0:Math.min(.95,h.num("vig",.5)*(e==="bw"?1.2:1)),d!==y){y=d,v=e==="bw"?1+(g()*2-1)*h.num("flick",.06):1;const b=e==="bw"?h.num("weave",1.2):0,T=t(d*.37)*b,P=i(d*.29)*b*.6;c=Math.hypot(T,P),o.uWeave.value.set(T/Math.max(1,w),P/Math.max(1,p))}o.uFlick.value=v},afterRender(r,m,S,w){if(l++%3!==0)return;const p=Math.floor(m*w),f=Math.floor(S*w);if(p<40||f<40)return;const h=(x,M)=>{r.readPixels(Math.max(0,Math.min(p-16,x)),Math.max(0,Math.min(f-16,M)),16,16,r.RGBA,r.UNSIGNED_BYTE,s);let L=0,E=0,N=0;for(let k=0;k<256;k++){const q=s[k*4],W=s[k*4+1],V=s[k*4+2],z=.299*q+.587*W+.114*V;L+=z,E+=z*z;const A=Math.max(q,W,V);N+=A>0?(A-Math.min(q,W,V))/A:0}const $=L/256;return{mean:$,std:Math.sqrt(Math.max(0,E/256-$*$)),sat:N/256}},F=h(Math.floor(p/2-8),Math.floor(f*.88-8)),U=h(Math.floor(p/2-8),Math.floor(f/2-8)),d=h(4,f-20);u.push(F.mean),u.length>48&&u.shift();const b=u.reduce((x,M)=>x+M,0)/u.length,T=Math.sqrt(u.reduce((x,M)=>x+(M-b)*(M-b),0)/u.length);n={std:F.std,sat:F.sat,ratio:d.mean/Math.max(1,U.mean),flick:T/Math.max(1,b)},a.shared.set(`film-${e}`,n);const P=a.params,Q=o.uGrain.value,C=o.uVig.value,G=m/S,_=(12/p-.5)*G,D=12/f-.5,Y=(_*_+D*D)/(.25*(G*G+1)),H=a.shared.get("film-clean"),I=[`그레인 σ 측정 ${n.std.toFixed(1)} · 이론 ${(Q*255/Math.sqrt(3)).toFixed(1)} (단위 0–255)`,`채도(하늘) ${(n.sat*100).toFixed(0)}%`,`모서리/중앙 밝기 ${n.ratio.toFixed(2)}`+(H&&e!=="clean"?` · 이론 ${(H.ratio*(1-C*Y)).toFixed(2)}`:""),`비네트 1−${C.toFixed(2)}·r² → 모서리 ×${(1-C).toFixed(2)}`];if(e==="bw"){const x=P.num("flick",.06);I.push(`플리커 σ 측정 ${(n.flick*100).toFixed(1)}% · 이론 ${(x/Math.sqrt(3)*100).toFixed(1)}%`),I.push(`게이트 위브 ${c.toFixed(1)}px`)}a.hud(I.join(`
`))}})}}const rt={layout:"variants",intro:'디지털 렌더링은 너무 깨끗해서 "영상"보다 "CG"처럼 보이기 쉽습니다. <b>필름 그레인</b>(프레임마다 바뀌는 미세한 잡음), <b>비네트</b>(가장자리 어둡게), <b>흑백</b>, 그리고 영사기의 <b>게이트 위브</b>(프레임 흔들림)·<b>플리커</b>(밝기 깜빡임)·스크래치를 얹으면 옛 영화 질감이 납니다. 모두 전체화면 셰이더 한 패스(픽셀당 몇 줄의 계산)로 처리되어 폰에서도 가볍습니다. HUD의 숫자는 실제로 렌더된 픽셀을 <code>readPixels</code>로 읽어 측정한 값입니다.',how:["그레인: 픽셀 좌표 + 필름 프레임 번호로 해시를 뽑아 <code>c += (n − 0.5) · 2g</code>. 균등 분포라 표준편차는 <code>g/√3</code>.",'그레인은 24fps 필름 프레임마다만 바꾼다 – 60fps마다 바꾸면 "TV 노이즈"처럼 지글거린다.',"비네트: 화면 중심 거리 r(모서리=1)에 대해 <code>c *= 1 − v·r²</code>. 시선을 중앙으로 모은다.","흑백: 휘도 <code>0.299R + 0.587G + 0.114B</code>로 채도를 0으로.","게이트 위브는 프레임마다 1~2px 연속 노이즈로 uv를 밀고, 플리커는 프레임마다 밝기를 ±몇 % 곱한다. 스크래치·먼지는 드물게 나타나는 세로선/점."],pros:['모델·텍스처를 바꾸지 않고 화면 전체의 "시대감"과 분위기를 한 번에 바꾼다.',"그레인은 밴딩(색 계단)을 가리고 저해상도 디테일을 그럴듯하게 만든다.","셰이더 한 패스라 비용이 매우 싸다."],cons:["과하면 화질이 나빠 보이고 압축(스트리밍·영상 캡처)에서 그레인이 뭉개진다 – 끄는 옵션이 흔히 요구된다.","흑백은 색으로 구분하던 게임 정보(적·아이템)를 잃는다 → UI는 따로 그려야 한다.","플리커·위브는 장시간 플레이에서 눈의 피로를 줄 수 있다."],usedIn:'고스트 오브 쓰시마는 구로사와 아키라 감독에게 바친 "구로사와 모드"로 흑백·필름 그레인·옛 영화풍 연출을 게임 전체에 적용했다. 매스 이펙트는 SF 영화 같은 질감을 위해 필름 그레인 필터를 썼고, 옵션에서 끌 수 있다. 공포 게임에서도 그레인·비네트는 표준적인 분위기 필터다.',tips:["컬러 게임에서 은은하게 쓰려면 그레인 g 0.02~0.05, 비네트 v 0.2~0.4에서 시작한다. 이 페이지 기본값(0.08, 0.5)은 차이를 잘 보이게 하려고 일부러 강하게 잡은 값이다.","실제 필름 그레인은 중간 밝기에서 가장 잘 보이고 아주 밝거나 어두운 곳에서는 약하다. 그레인 세기에 <code>4·L·(1−L)</code> 같은 밝기 가중치를 곱하면 훨씬 자연스럽다.","그레인은 톤매핑 뒤, UI 앞에 넣고 렌더 해상도가 아니라 출력 해상도로 뽑는다. 업스케일 전에 넣으면 알갱이가 뭉개져 얼룩처럼 보인다.","플리커는 ±5% 안으로 둔다. 화면 전체 밝기가 크게 깜빡이면 눈의 피로와 광과민성 문제가 생긴다."],related:["lut-grading","letterbox","shutter-angle","crt-tv","tonemapping"],controls:[{type:"range",key:"grain",label:"그레인 세기 g (밝기 ±비율)",min:0,max:.2,step:.005,value:.08},{type:"range",key:"vig",label:"비네트 v (모서리 감광 비율)",min:0,max:.8,step:.02,value:.5},{type:"range",key:"weave",label:"게이트 위브 (px)",min:0,max:4,step:.1,value:1.2},{type:"range",key:"flick",label:"플리커 (밝기 ±비율)",min:0,max:.2,step:.01,value:.06},{type:"toggle",key:"film24",label:"그레인 24fps로 갱신",value:!0}],viewers:[{title:"원본 (깨끗한 렌더)",kind:"before",caption:'그레인 σ≈0, 가장자리 밝기도 그대로입니다. 선명하지만 "CG 화면" 같은 인상입니다.',mount:R("clean")},{title:"컬러 필름 (그레인 + 비네트)",kind:"after",caption:"HUD의 그레인 σ 측정값이 이론 g·255/√3과 맞고, 모서리/중앙 밝기 비가 비네트 공식대로 떨어져 시선이 인물 쪽으로 모입니다.",mount:R("color")},{title:"흑백 + 위브 + 플리커 + 스크래치",kind:"variant",caption:"채도 0%에 그레인·비네트를 조금 더 강하게 걸고, 24fps 프레임마다 밝기(플리커)와 위치(게이트 위브)가 미세하게 떨리며 가끔 세로 스크래치가 지나가 옛 영사기로 튼 필름 같습니다.",mount:R("bw")}]};export{rt as default};
