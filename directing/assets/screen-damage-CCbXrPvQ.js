import{W as et,k as W,V as ot,C as z,K as rt,H as at,u as st,M as N,P as ct,g as O,a as nt,c as it,G as lt}from"./three.module-CEzfHhrp.js";import{m as ut}from"./three-viewer-fx7lDL-0.js";import{m as ft,s as Q,a as Z,b as R}from"./canvas-viewer-QtaWfmlz.js";import{c as dt,t as w,l as q}from"./chart2d-DfgeckAJ.js";import{R as B}from"./fx-CIZ4XT9q.js";import{h as pt,P as ht,N as mt,p as D,f as U,b as vt,c as xt}from"./extra-kit-c-FPjCbN4U.js";import{m as yt}from"./cam-kit2-DamJRS7e.js";import{P as bt,H as kt,a as Mt,s as wt,c as Ct,b as X}from"./postfx-kit-b-mDqSKWWr.js";const C=128,g=80,_=32,Y=.09,A=4.5,J=[[.62,.58],[.34,.45],[.55,.32],[.28,.66]],gt=(e,r)=>1-2*Math.min(Math.min(e,1-e),Math.min(r,1-r)),Pt=(e,r)=>.65*gt(e,r)+.35*(2.2*(vt(e*6,r*6,.5)-.5)+.5),Ft=(()=>{const e=Z(99),r=new Float32Array(4096);for(let d=0;d<r.length;d++)r[d]=Pt(e(),e());return r.sort(),r})(),j=e=>1-xt(Ft,1-e),St=`
uniform sampler2D tSrc;
uniform vec2 uCss;
uniform float uMode, uFrostT, uTime, uProbe;
uniform vec3 uDrops[${_}];
uniform int uNDrops;
uniform vec2 uImp;
uniform float uCrackR, uShift, uCrackA;
varying vec2 vUv;
${mt}
${kt}
float frostV(vec2 uv) {
  float e = 1.0 - 2.0 * min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
  return 0.65 * e + 0.35 * (2.2 * (xk_fbm(vec3(uv * 6.0, 0.5)) - 0.5) + 0.5);
}
// 물방울: 덮임(0/1)과 굴절 UV
float drops(vec2 uv, out vec2 ruv, out float rim) {
  float asp = uCss.x / max(uCss.y, 1.0);
  float m = 0.0;
  ruv = uv;
  rim = 0.0;
  for (int i = 0; i < ${_}; i++) {
    if (i >= uNDrops) break;
    vec3 d = uDrops[i];
    vec2 q = (uv - d.xy) * vec2(asp, 1.0);
    float r = length(q);
    if (r < d.z) {
      m = 1.0;
      float k = r / d.z;
      // 뒤집힌 볼록렌즈: 방울 안에 주변 풍경이 거꾸로, 작게 비침
      vec2 o = -q * (2.2 + 1.5 * k * k) ;
      ruv = d.xy + o / vec2(asp, 1.0);
      rim = smoothstep(0.7, 1.0, k);
    }
  }
  return m;
}
// 로그-극좌표 보로노이: x = F2 − F1, id = 가장 가까운 칸
vec2 crackCell(vec2 px, out vec2 id, out float scale) {
  vec2 v = px - uImp * uCss;
  float r = max(length(v), 1.0);
  float a = atan(v.y, v.x) / 6.2831853 + 0.5;
  const float K1 = 2.6;
  const float K2 = 11.0;
  vec2 p = vec2(log(r / 6.0) * K1, a * K2);
  scale = K1 / r;
  vec2 ip = floor(p);
  float f1 = 9.0, f2 = 9.0;
  id = ip;
  for (int y = -1; y <= 1; y++)
    for (int x = -1; x <= 1; x++) {
      vec2 c = ip + vec2(float(x), float(y));
      vec2 cw = vec2(c.x, mod(c.y, K2));
      vec2 fp = c + 0.15 + 0.7 * pk_h22(cw + 7.0);
      float d = length(p - fp);
      if (d < f1) { f2 = f1; f1 = d; id = cw; }
      else if (d < f2) f2 = d;
    }
  return vec2(f2 - f1, r);
}
void main() {
  vec2 uv = vUv;
  vec3 c;
  float frost = 0.0, dm = 0.0, crack = 0.0;
  if (uMode > 1.5) {
    vec2 id; float sc;
    vec2 px = uv * uCss;
    vec2 cr = crackCell(px, id, sc);
    float inside = 1.0 - smoothstep(uCrackR * 0.92, uCrackR, cr.y + 14.0 * (pk_h21(id) - 0.5));
    float w = 0.9 * sc;
    crack = inside * (1.0 - smoothstep(w * 0.6, w * 1.4, cr.x));
    crack = max(crack, (1.0 - smoothstep(4.0, 7.0, cr.y)) * step(0.01, uCrackR));
    vec2 off = (pk_h22(id + 3.1) - 0.5) * uShift * inside / uCss;
    if (uProbe > 0.5) { gl_FragColor = vec4(crack, 0.0, 0.0, 1.0); return; }
    c = texture2D(tSrc, clamp(uv + off, 0.0, 1.0)).rgb;
    c *= 1.0 + inside * (pk_h21(id + 9.0) - 0.5) * 0.35;
    // 균열: 밝은 선 + 한쪽 그림자
    float fade = 0.45 + 0.55 * exp(-cr.y / 160.0);
    // 선 바로 옆 어두운 그림자 (유리 단면) + 밝은 선
    float shadow = inside * (1.0 - smoothstep(w * 1.4, w * 3.0, cr.x)) * (1.0 - crack);
    c *= 1.0 - shadow * 0.35 * uCrackA;
    c = mix(c, vec3(0.92, 0.96, 1.0), crack * fade * uCrackA);
  } else if (uMode > 0.5) {
    float v = frostV(uv);
    frost = smoothstep(uFrostT, uFrostT + 0.025, v);
    vec2 ruv; float rim;
    dm = drops(uv, ruv, rim);
    if (uProbe > 0.5) {
      gl_FragColor = vec4(step(uFrostT, v), dm, 0.0, 1.0);
      return;
    }
    // 서리 안쪽: 미세 노이즈로 흩어진(뿌연) 장면 + 결정 무늬
    vec2 j = (pk_h22(floor(uv * uCss * 0.5)) - 0.5) * 10.0 / uCss;
    vec3 blurC = (texture2D(tSrc, uv + j).rgb + texture2D(tSrc, uv - j * 1.7).rgb + texture2D(tSrc, uv + j.yx * 2.3).rgb) / 3.0;
    c = texture2D(tSrc, dm > 0.5 ? clamp(ruv, 0.0, 1.0) : uv).rgb;
    if (dm > 0.5) c = c * (1.0 - rim * 0.55) + rim * 0.06;
    float cryst = abs(sin(xk_fbm(vec3(uv * 26.0, 1.7)) * 48.0));
    vec3 ice = mix(blurC * 0.8 + vec3(0.16, 0.2, 0.26), vec3(0.85, 0.93, 1.0), 0.12 + 0.5 * pow(cryst, 6.0));
    float front = smoothstep(uFrostT, uFrostT + 0.012, v) - smoothstep(uFrostT + 0.012, uFrostT + 0.05, v);
    c = mix(c, ice, frost * 0.9 * (1.0 - dm * 0.7));
    c += front * vec3(0.35, 0.45, 0.55) * (1.0 - dm);
  } else {
    if (uProbe > 0.5) { gl_FragColor = vec4(0.0); return; }
    c = texture2D(tSrc, uv).rgb;
  }
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,E=.05,Tt=(e,r,d)=>{for(e.t+=r,e.acc+=d*r;e.acc>=1;){if(e.acc-=1,e.drops.length>=_){let t=0;for(let s=1;s<e.drops.length;s++)e.drops[s].r<e.drops[t].r&&(t=s);e.drops.splice(t,1)}e.drops.push({x:.04+e.rnd()*.92,y:.08+e.rnd()*.9,r:.018+e.rnd()*.026,vy:0,life:6+e.rnd()*6,ph:e.rnd()*6})}for(const t of e.drops)t.life-=r,t.r>E?(t.vy=Math.min(.6,.05+(t.r-E)*12),t.y-=t.vy*r,t.x+=Math.sin(e.t*3+t.ph)*.02*r):(t.r+=.0015*r,t.life<0&&(t.r-=.01*r));for(let t=0;t<e.drops.length;t++)for(let s=0;s<e.drops.length;s++){if(t===s)continue;const p=e.drops[t],l=e.drops[s];!p||!l||p.r<l.r||Math.hypot((p.x-l.x)*e.asp,p.y-l.y)<p.r+l.r&&(p.r=Math.sqrt(p.r*p.r+l.r*l.r),e.drops.splice(s,1),s--,s<t&&t--)}e.drops=e.drops.filter(t=>t.y>-t.r&&t.r>.004)},Rt=(e,r)=>Q(e.shared,"sdClock",r,()=>({t:0}),(d,t)=>d.t+=t);function Dt(e){e.background=new z(7176089),e.fog=new rt(7176089,18,60),e.add(new at(13031150,3814960,1.1));const r=new st(16777215,1.2);r.position.set(-5,10,6),e.add(r);const d=Ct("#59606c","#4b515c",8);d.repeat.set(12,12);const t=new N(new ct(80,80),new O({map:d,roughness:.6,metalness:.1}));t.rotation.x=-Math.PI/2,e.add(t);const s=[d,...X(e,{z:-14,x0:-24,x1:24,seed:41,hMin:6,hMax:16,emissive:.5})],p=X(e,{z:0,x0:-30,x1:-12,seed:42,hMin:5,hMax:10,emissive:.5});s.push(...p);const l=new nt(.07,.07,4,8),k=new it(.2,10,8),u=new O({color:2895926,metalness:.6,roughness:.4}),x=new lt({color:new z(16773320).multiplyScalar(2.5)});for(let c=-3;c<=3;c++){const i=new N(l,u);i.position.set(c*4,2,-6);const m=new N(k,x);m.position.set(c*4,4.1,-6),e.add(i,m)}const n=[],a=[13650506,4885200,14725184];for(let c=0;c<3;c++){const i=yt(a[c],2237998);e.add(i.group),n.push(i)}return{animate:c=>{n.forEach((i,m)=>{const b=((c*(.9+m*.3)+m*5)%16+16)%16-8;i.group.position.set(m%2?-b:b,0,-3-m*1.4),i.group.rotation.y=m%2?Math.PI/2:-Math.PI/2,i.pose(c*1.3+m,.8)})},texs:s,geos:[l,k]}}function L(e){return r=>ut(r,{antialias:!1,orbit:!1,fov:50,cam:[0,1.8,8],target:[0,2,-6],far:120},({scene:d,camera:t,renderer:s})=>{const{animate:p,texs:l,geos:k}=Dt(d),u=new et(4,4,{type:pt(s),samples:4}),x=new bt(C,g),n=new ht(St,{tSrc:{value:u.texture},uCss:{value:new W(300,200)},uMode:{value:e==="clean"?0:e==="weather"?1:2},uFrostT:{value:1},uTime:{value:0},uProbe:{value:0},uDrops:{value:Array.from({length:_},()=>new ot)},uNDrops:{value:0},uImp:{value:new W(.5,.5)},uCrackR:{value:0},uShift:{value:4},uCrackA:{value:1}}),a=r.shared.get("sd-meas")??{f:0,frostMeas:NaN,dropMeas:NaN,dropTh:0,hist:[],dm:new B(150),dt:new B(150)};r.shared.set("sd-meas",a);let P=0,c=300,i=200,m=0,b=0;return{resize(o,h,v){const f=Math.min(v,1.5);wt(u,o*f,h*f),c=Math.max(1,o),i=Math.max(1,h),n.u.uCss.value.set(c,i)},update(o,h,v){const f=Rt(r,v),M=r.params;p(f.t);const S=M.bool("drift",!0)?Math.sin(f.t*.2):0;if(t.position.set(S*1.2,1.8+Math.sin(f.t*.7)*.03,8),t.lookAt(S*.5,2,-6),t.updateMatrixWorld(),n.u.uTime.value=f.t,e==="clean"){r.hud(`깨끗한 렌즈 · 손상 없음
화면 너머가 "그냥 보이는 것" — 카메라의 존재감 0`);return}if(e==="weather"){const T=M.num("frost",.42);let F=T;if(M.bool("auto",!0)){const y=f.t%14;F=y<7?T*y/7:y<10?T:T*(1-(y-10)/4)}a.f=F,n.u.uFrostT.value=1-F;const I=Q(r.shared,"sdSim",v,()=>({t:0,drops:[],acc:0,rnd:Z(13),asp:c/i}),(y,G)=>{y.asp=c/i,Tt(y,G,M.num("rain",3))}),tt=n.u.uDrops.value;let V=0;I.drops.forEach((y,G)=>{tt[G].set(y.x,y.y,y.r),V+=Math.PI*y.r*y.r}),n.u.uNDrops.value=I.drops.length,a.dropTh=V/(c/i),r.hud([`서리 f=${F.toFixed(2)} → 덮임 측정 ${D(a.frostMeas)} / 이론 1−CDF(1−f) ${D(j(F))}`,`물방울 ${I.drops.length}개 덮임 측정 ${D(a.dropMeas)} / 이론 Σπr²/A ${D(a.dropTh)}`,`r > ${E} 이면 미끄러짐 · 닿으면 합쳐짐`].join(`
`));return}const H=Math.floor(f.t/A),$=f.t-H*A,K=J[H%J.length];n.u.uImp.value.set(K[0],K[1]),b=M.num("crackR",.45)*Math.hypot(c,i)*(1-Math.exp(-$/Y)),n.u.uCrackR.value=b,n.u.uShift.value=M.num("shift",5),n.u.uCrackA.value=1-Mt(A-.5,A,$),r.hud([`R(t) = Rmax·(1 − e^(−t/${Y}))  t=${$.toFixed(2)}s`,`균열 끝 반경 측정 ${U(m)}px / 이론 ${U(b)}px`,`조각마다 굴절 오프셋 ±${U(M.num("shift",5)/2)}px`].join(`
`))},render(){if(s.setRenderTarget(u),s.render(d,t),e!=="clean"&&P%8===0)if(n.u.uProbe.value=1,n.render(s,x.rt),n.u.uProbe.value=0,x.read(s),e==="weather"){let o=0,h=0;for(let v=0;v<g;v++)for(let f=0;f<C;f++)o+=x.at(f,v,0)>.5?1:0,h+=x.at(f,v,1)>.5?1:0;a.frostMeas=o/(C*g),a.dropMeas=h/(C*g),a.hist.push({f:a.f,m:a.frostMeas}),a.hist.length>60&&a.hist.shift(),a.dm.push(a.dropMeas),a.dt.push(a.dropTh)}else{const o=n.u.uImp.value;let h=0;for(let v=0;v<g;v++)for(let f=0;f<C;f++){if(x.at(f,v,0)<.5)continue;const M=((f+.5)/C-o.x)*c,S=((v+.5)/g-o.y)*i;h=Math.max(h,Math.hypot(M,S))}m=h}P++,n.render(s,null)},dispose(){u.dispose(),x.dispose(),n.dispose(),l.forEach(o=>o.dispose()),k.forEach(o=>o.dispose())}}})}function At(e){const r=new Float32Array(150),d=new Float32Array(150);return ft(e,()=>({draw(t,s,p){dt(t,s,p);const l=e.shared.get("sd-meas");if(!l)return;const k=s/2,u={x:38,y:24,w:R(k-50,20),h:R(p-56,20)},x=o=>u.x+o*u.w,n=o=>u.y+u.h-Math.max(0,Math.min(1,o))*u.h;t.strokeStyle="#1c2230",t.strokeRect(u.x+.5,u.y+.5,u.w,u.h);for(const o of[0,.5,1])w(t,o.toFixed(1),x(o),u.y+u.h+12,"#7d8799",9,"center"),w(t,`${o*100}%`,u.x-4,n(o)+3,"#7d8799",9,"right");t.strokeStyle="#5b9cff",t.lineWidth=1.8,t.beginPath();for(let o=0;o<=80;o++){const h=o/80;o?t.lineTo(x(h),n(j(h))):t.moveTo(x(h),n(j(h)))}t.stroke(),t.lineWidth=1,l.hist.forEach((o,h)=>{Number.isFinite(o.m)&&(t.fillStyle=h===l.hist.length-1?"#ff9a3c":"rgba(255,154,60,0.35)",t.beginPath(),t.arc(x(o.f),n(o.m),h===l.hist.length-1?4:2.5,0,Math.PI*2),t.fill())}),w(t,"서리량 f → / 덮인 넓이",6,14,"#c8d0dc",10),q(t,[{label:"1−CDF(1−f)",color:"#5b9cff"},{label:"GPU 측정",color:"#ff9a3c"}],u.x,p-6,9);const a={x:k+30,y:24,w:R(k-42,20),h:R(p-56,20)};l.dm.ordered(r),l.dt.ordered(d);const P=l.dm.count;let c=.05;for(let o=0;o<150;o++)c=Math.max(c,r[o]*1.2,d[o]*1.2);const i=o=>a.x+o/149*a.w,m=o=>a.y+a.h-Math.min(o,c)/c*a.h;t.strokeStyle="#1c2230",t.strokeRect(a.x+.5,a.y+.5,a.w,a.h),w(t,`${(c*100).toFixed(0)}%`,a.x-4,a.y+6,"#7d8799",9,"right"),w(t,"0",a.x-4,a.y+a.h,"#7d8799",9,"right");const b=150-P;t.strokeStyle="#4ade80",t.lineWidth=1.6,t.beginPath();for(let o=b;o<150;o++)o>b?t.lineTo(i(o),m(d[o])):t.moveTo(i(o),m(d[o]));t.stroke(),t.lineWidth=1,t.fillStyle="#ff9a3c";for(let o=b;o<150;o+=2)t.beginPath(),t.arc(i(o),m(r[o]),1.8,0,Math.PI*2),t.fill();w(t,"물방울 덮임 (시간 →)",k+6,14,"#c8d0dc",10),q(t,[{label:"Σπr²/A",color:"#4ade80"},{label:"측정",color:"#ff9a3c"}],a.x,p-6,9)}}))}const Ht={layout:"variants",intro:'<b>화면 손상 연출</b>은 장면이 아니라 <b>카메라(렌즈·헬멧 유리) 자체</b>에 무언가 맺히게 해서, 플레이어가 "장비 너머로 보고 있다"는 현장감과 상태(추위, 비, 피격)를 느끼게 합니다. 세 가지 대표 형태가 있습니다 — 가장자리부터 번지는 <b>서리</b>, 맺혔다 흘러내리며 풍경을 거꾸로 비추는 <b>물방울</b>, 피격점에서 순식간에 퍼지는 <b>금</b>. 세 뷰어는 같은 거리를 <b>깨끗한 화면 / 서리 + 물방울 / 금(피격)</b>으로 보여 줍니다.',how:["서리: 값 <code>v = 0.65·e + 0.35·노이즈</code> (e = 화면 가장자리에 가까울수록 1). 문턱 <code>θ = 1 − f</code>를 내리면 가장자리부터 안쪽으로, 노이즈 모양을 따라 들쭉날쭉 얼어 들어온다. 덮인 넓이는 <code>P(v > θ) = 1 − CDF(θ)</code>.","서리 안쪽은 장면을 미세 노이즈 방향으로 흩어 읽어(뿌연 굴절) 흰 얼음색과 섞고, 결정 무늬와 밝은 성장 경계선을 더한다.","물방울: CPU가 방울을 시뮬레이션한다 — 무작위로 맺혀 응결로 자라다가 반지름이 문턱을 넘으면 미끄러지고, 닿은 방울은 넓이를 보존하며 합쳐진다. 셰이더는 방울 안을 뒤집힌 볼록렌즈처럼 <code>uv = 중심 − q·(2.2 + 1.5(r/R)²)</code>로 읽어 주변 풍경을 작고 거꾸로 비춘다.","금: 피격점 기준 <b>로그-극좌표</b> <code>(log r, θ)</code>에서 보로노이를 만들면 가운데는 잘게, 바깥은 크게 깨진 유리가 저절로 생긴다. 선 굵기는 <code>w·K1/r</code>로 보정해 화면에서 일정하게. 조각마다 다른 UV 오프셋(굴절)과 밝기. 반경은 <code>R(t) = Rmax(1 − e^(−t/τ))</code>로 순식간에 퍼진다.","HUD 측정: 같은 셰이더를 측정 모드로 128×80 타깃에 그려 서리·방울·균열 마스크를 읽는다. 서리 덮임은 CPU가 같은 노이즈로 구한 CDF와, 방울 덮임은 Σπr²/화면넓이와, 균열 끝 반경은 R(t)와 비교한다."],pros:["장면을 바꾸지 않고 화면 한 겹만으로 날씨·체온·피해 상태를 전달한다. HUD 숫자보다 직관적이다.","서리 문턱·방울 수·균열 반경 같은 한두 개의 값으로 강도를 조절할 수 있어 게임 상태(체온, 체력)에 바로 연결하기 좋다.",'1인칭·레이싱 카메라에서 "카메라가 물리적으로 존재한다"는 느낌을 줘 몰입을 높인다.'],cons:["화면 중앙을 가리면 플레이가 불가능해진다 — 서리는 가장자리부터, 금은 짧게 유지하고 사라지게 한다.",'3인칭에서 렌즈 효과를 남발하면 "누가 찍고 있나?"라는 이질감이 생긴다. 영화적 카메라를 의도할 때만.',"방울 수만큼 셰이더 루프가 돌아 많아지면 비싸다 — 실제 게임은 방울을 법선 텍스처에 그려 두고 한 번만 읽는다."],usedIn:"〈배틀필드〉 시리즈의 렌즈 물방울·흙 묻음, 〈프로스트펑크〉의 추위를 알리는 서리 테두리, 비 오는 레이싱 게임의 범퍼 카메라 빗방울, 여러 FPS·생존 게임의 피격·추위 화면 연출 등.",tips:["화면 중앙 30~40%는 비워 둔다. 서리는 가장자리 가중치 e를 크게(이 페이지 0.65), 금은 0.1초 안에 퍼지고 2~4초 안에 사라지게 한다.",'체온·체력 같은 상태값에 바로 묶지 말고 1~2초 시상수로 따라가게 하면 서리가 "자라고 녹는" 느낌이 난다. 회복할 때는 자랄 때보다 빠르게 녹이는 편이 답답하지 않다.',"물방울이 많아지면 셰이더 루프 대신, 방울을 작은 법선맵(또는 굴절 오프셋) 텍스처에 그려 두고 화면에서 한 번만 읽는다. 흘러내린 자국은 그 텍스처에 남겨 서서히 지운다.",'렌즈 효과는 1인칭이나 "카메라가 있다"는 설정과 같이 쓴다. 3인칭이라면 피격·추위 같은 짧은 순간으로 한정한다.'],related:["low-health","damage-direction","hit-flash","heat-haze","chromatic-pulse"],controls:[{type:"range",key:"frost",label:"서리량 최대 f (문턱 θ = 1 − f)",min:0,max:1,step:.01,value:.42},{type:"toggle",key:"auto",label:"서리 자람 → 녹음 자동 반복",value:!0},{type:"range",key:"rain",label:"물방울 맺힘 (개/초)",min:0,max:12,step:.5,value:3},{type:"range",key:"crackR",label:"균열 최대 반경 (화면 대각 비율)",min:.1,max:.8,step:.01,value:.45},{type:"range",key:"shift",label:"조각 굴절 오프셋 (px)",min:0,max:16,step:.5,value:5},{type:"toggle",key:"drift",label:"카메라 천천히 이동",value:!0}],viewers:[{title:"깨끗한 화면",kind:"before",caption:'렌즈에 아무것도 없습니다. 거리가 그대로 보이지만 "카메라 너머"라는 감각은 없습니다.',mount:L("clean")},{title:"서리 + 물방울",kind:"variant",caption:"가장자리부터 서리가 들쭉날쭉 얼어 들어오고, 물방울이 맺혔다 커지면 흘러내립니다. 방울 안에 거리가 거꾸로 비칩니다.",mount:L("weather")},{title:"금 (피격)",kind:"after",caption:"4.5초마다 다른 곳에 맞습니다. 피격점은 잘게, 바깥은 크게 깨지고, 조각마다 풍경이 조금씩 어긋나 보입니다.",mount:L("crack")},{title:"덮인 넓이: 이론 vs 측정",kind:"info",caption:"왼쪽: 서리량 f에 따른 덮임(파랑 = 노이즈 CDF로 구한 이론, 주황 = GPU 측정 궤적). 오른쪽: 물방울 덮임의 시간 변화(초록 = Σπr²/A, 주황 = 측정).",mount:At}]};export{Ht as default};
