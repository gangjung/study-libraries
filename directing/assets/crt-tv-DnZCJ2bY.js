import{N as Te,L as ie,ab as Me,ac as Re,k as Se,W as we}from"./three.module-CEzfHhrp.js";import{m as Ne}from"./three-viewer-fx7lDL-0.js";import{m as ke,b as q,s as Pe,a as Ce}from"./canvas-viewer-QtaWfmlz.js";import{c as Be,t as Q,l as Le}from"./chart2d-DfgeckAJ.js";import{R as ce}from"./fx-CIZ4XT9q.js";import{P as qe,f as D}from"./extra-kit-c-FPjCbN4U.js";const y=3,F=2,me=y*F,M=96,V=72,K=.1,re=e=>Math.min(46,e*.2);function fe(e,n,o){const l=.03*Math.min(e,n),s=Math.max(1,(e-2*l)/y),t=Math.max(1,(n-2*l-o)/F),a=.035*Math.min(s,t),u=Math.max(.5,s/2-a),c=Math.max(.5,t/2-a),m=.1*Math.min(u,c);return{m:l,cw:s,ch:t,tvx:u,tvy:c,shx:Math.max(.5,u-m),shy:Math.max(.5,c-m)}}function ue(e,n){const o=n%y,l=F-1-Math.floor(n/y);return{x:e.m+(o+.5)*e.cw,y:e.m+(l+.5)*e.ch}}function ve(e){let n=1;for(let o=0;o<30;o++)n-=(n+2*e*n*n*n-1)/(1+6*e*n*n);return n}const Fe=`
uniform sampler2D tC;
uniform vec2 uRes;
uniform float uK, uN, uScan, uMaskS, uBleed, uTime, uSel, uCRT, uMeas, uPR, uTop;
uniform vec4 uTr; // x: 전환 타일, y: 경과(s), z: T, w: 켜짐
varying vec2 vUv;
const float COLS = ${y.toFixed(1)}, ROWS = ${F.toFixed(1)};
float hash(vec2 p) { p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
float sdRound(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
void main() {
  vec2 f = gl_FragCoord.xy;
  float m = 0.03 * min(uRes.x, uRes.y);
  float cw = max(1.0, (uRes.x - 2.0 * m) / COLS);
  float chh = max(1.0, (uRes.y - 2.0 * m - uTop) / ROWS);
  float gap = 0.035 * min(cw, chh);
  vec2 tv = max(vec2(0.5), vec2(cw, chh) * 0.5 - gap);
  float bez = 0.1 * min(tv.x, tv.y);
  vec2 sh = max(vec2(0.5), tv - bez);
  float col = clamp(floor((f.x - m) / cw), 0.0, COLS - 1.0);
  float rowB = clamp(floor((f.y - m) / chh), 0.0, ROWS - 1.0);
  float rowT = ROWS - 1.0 - rowB;
  float idx = rowT * COLS + col;
  vec2 ctr = vec2(m + (col + 0.5) * cw, m + (rowB + 0.5) * chh);
  vec2 lp = f - ctr;
  bool sel = abs(idx - uSel) < 0.5;
  bool trans = uTr.w > 0.5 && abs(idx - uTr.x) < 0.5 && uTr.y < uTr.z;
  // 배경 (방 벽)
  vec3 bg = mix(vec3(0.05, 0.04, 0.08), vec3(0.11, 0.08, 0.16), vUv.y);
  float body = sdRound(lp, tv, 0.14 * min(tv.x, tv.y));
  if (uCRT < 0.5) {
    // 평면 타일: 테두리 + 내용 그대로, 전환은 즉시 컷
    vec2 q = lp / tv;
    if (max(abs(q.x), abs(q.y)) > 1.0) { gl_FragColor = vec4(pow(bg, vec3(2.2)), 1.0);
      #include <colorspace_fragment>
      return; }
    vec2 uv = q * 0.5 + 0.5;
    vec2 tc = vec2((col + uv.x) / COLS, 1.0 - (rowT + 1.0 - uv.y) / ROWS);
    vec3 c = texture2D(tC, tc).rgb * (sel ? 1.0 : 0.62);
    float edge = max(abs(q.x), abs(q.y));
    if (sel && edge > 1.0 - 4.0 * uPR / min(tv.x, tv.y)) c = vec3(1.0, 0.85, 0.3);
    gl_FragColor = vec4(pow(c, vec3(2.2)), 1.0);
    #include <colorspace_fragment>
    return;
  }
  vec2 q = lp / sh;
  vec2 cc = q * (1.0 + uK * dot(q, q));
  bool inside = max(abs(cc.x), abs(cc.y)) <= 1.0;
  vec2 uv = cc * 0.5 + 0.5;
  float scanB = 0.5 - 0.5 * cos(6.2831853 * uv.y * uN);
  // 내용 (색 번짐: R·B를 가로로 엇갈려)
  vec3 c = vec3(0.0);
  float pre = 0.0;
  if (inside) {
    float bl = uBleed / ${M.toFixed(1)};
    vec2 tc = vec2((col + uv.x) / COLS, 1.0 - (rowT + 1.0 - uv.y) / ROWS);
    float lo = col / COLS + 0.5 / ${(M*y).toFixed(1)};
    float hi = (col + 1.0) / COLS - 0.5 / ${(M*y).toFixed(1)};
    c.r = texture2D(tC, vec2(clamp(tc.x + bl / COLS, lo, hi), tc.y)).r;
    c.g = texture2D(tC, tc).g;
    c.b = texture2D(tC, vec2(clamp(tc.x - bl / COLS, lo, hi), tc.y)).b;
    c = mix(c, texture2D(tC, vec2(clamp(tc.x - 1.5 / ${(M*y).toFixed(1)}, lo, hi), tc.y)).rgb, 0.25);
    if (uTr.w > 0.5 && abs(idx - uTr.x) < 0.5) {
      float e = uTr.y;
      if (e < uTr.z) {
        // 정지 화면 노이즈 + 굴러가는 밝은 띠
        float n = hash(floor(f) + mod(floor(uTime * 60.0), 97.0) * vec2(13.1, 7.7));
        float bar = smoothstep(0.85, 1.0, fract(uv.y * 0.7 - e * 2.3));
        c = vec3(0.12 + 0.88 * n) * (0.8 + 0.35 * bar);
      } else {
        // 켜지는 순간 살짝 밝게 튀었다가 가라앉음
        c *= 1.0 + 0.6 * exp(-(e - uTr.z) * 18.0);
      }
    }
    if (!sel && !trans) c *= 0.62;
    pre = dot(c, vec3(0.2126, 0.7152, 0.0722));
  }
  if (uMeas > 0.5) { gl_FragColor = vec4(scanB, inside ? 1.0 : 0.0, clamp(pre, 0.0, 1.0), 1.0); return; }
  vec3 o;
  float glass = sdRound(lp, sh, 0.18 * min(sh.x, sh.y));
  if (body > 0.0) {
    o = bg;
    // 선택된 TV 주변 빛
    if (sel) o += vec3(1.0, 0.7, 0.3) * 0.25 * exp(-body / (0.08 * min(tv.x, tv.y)));
  } else if (glass > 0.0) {
    // 플라스틱 테두리
    vec3 plast = sel ? vec3(0.85, 0.62, 0.3) : vec3(0.32, 0.3, 0.36);
    o = plast * (0.75 + 0.35 * (lp.y / tv.y)) * (1.0 - 0.4 * smoothstep(-3.0 * uPR, 0.0, body));
    o += 0.15 * smoothstep(0.0, -2.0 * uPR, glass + 2.0 * uPR) * (1.0 - smoothstep(-2.0 * uPR, -5.0 * uPR, glass));
  } else if (!inside) {
    o = vec3(0.02, 0.025, 0.03);
  } else {
    o = c * mix(1.0 - uScan, 1.0, scanB) * (1.0 + uScan * 0.6);
    float px = mod(floor(f.x / max(1.0, floor(uPR + 0.5))), 3.0);
    vec3 mk = px < 0.5 ? vec3(1.0, 1.0 - uMaskS, 1.0 - uMaskS) : px < 1.5 ? vec3(1.0 - uMaskS, 1.0, 1.0 - uMaskS) : vec3(1.0 - uMaskS, 1.0 - uMaskS, 1.0);
    o *= mk / (1.0 - uMaskS * 2.0 / 3.0);
    float r2 = dot(cc, cc);
    o *= 1.0 - 0.28 * r2 * r2;
    o *= 0.97 + 0.03 * sin(uTime * 47.0 + idx);
  }
  // 유리 반사광 (곡면 느낌)
  if (glass <= 0.0) {
    vec2 g = q - vec2(-0.45, 0.55);
    o += vec3(0.9, 0.95, 1.0) * 0.07 * exp(-dot(g, g) * 3.0);
    o *= 1.0 - 0.5 * smoothstep(-6.0 * uPR, 0.0, glass);
  }
  gl_FragColor = vec4(pow(max(o, 0.0), vec3(2.2)), 1.0);
  #include <colorspace_fragment>
}`,Oe=["#24406b","#4a2a5e","#5b2330","#264f3a","#5a4a1e","#1f4a55"],$e=["B1 복도","B1 보물","B2 적","B2 계단","B3 상점","B3 출구"];function We(e,n,o,l){e.save(),e.translate(n%y*M,Math.floor(n/y)*V),e.beginPath(),e.rect(0,0,M,V),e.clip(),e.fillStyle=Oe[n],e.fillRect(0,0,M,V),e.strokeStyle="#ffffff22",e.lineWidth=1;for(let t=0;t<=6;t++)e.beginPath(),e.moveTo(M/2+(t-3)*6,34),e.lineTo(M/2+(t-3)*30,V),e.stroke();for(const t of[40,48,58,70])e.beginPath(),e.moveTo(0,t),e.lineTo(M,t),e.stroke();const s=M/2;if(n===0)e.fillStyle="#0d1b33",e.fillRect(s-9,18,18,18),e.fillStyle="#7fb2ff",e.fillRect(s-7,20,14,16),e.fillStyle="#ffd166",e.fillRect(s+3,28,2,2);else if(n===1){const t=40+Math.sin(o*3)*2;e.fillStyle="#8a5a22",e.fillRect(s-12,t,24,14),e.fillStyle="#ffcf4a",e.fillRect(s-12,t+5,24,2),e.fillRect(s-2,t+3,4,6);for(let a=0;a<4;a++){const u=o*2+a*1.6;e.fillStyle="#fff6b0",e.fillRect(s+Math.cos(u)*18,t-4+Math.sin(u*1.3)*6,2,2)}}else if(n===2){const t=1+Math.sin(o*4)*.08;e.fillStyle="#ff5d73",e.beginPath(),e.ellipse(s,46,16*t,13/t,0,Math.PI,0),e.lineTo(s+16*t,50),e.lineTo(s-16*t,50),e.fill(),e.fillStyle="#ffffff",e.fillRect(s-8,38,5,5),e.fillRect(s+3,38,5,5),e.fillStyle="#1a0a10",e.fillRect(s-6+Math.sin(o)*1.5,40,2,2),e.fillRect(s+5+Math.sin(o)*1.5,40,2,2)}else if(n===3){e.fillStyle="#9ee6b8";for(let a=0;a<5;a++)e.fillRect(s-20+a*8,54-a*6,8,6+a*6);e.fillStyle="#ffffff";const t=22+Math.sin(o*4)*2;e.beginPath(),e.moveTo(s+18,t),e.lineTo(s+24,t+7),e.lineTo(s+12,t+7),e.fill()}else if(n===4)e.fillStyle="#f2c9a0",e.beginPath(),e.arc(s-10,42,8,0,Math.PI*2),e.fill(),e.fillStyle="#3a2a1a",e.fillRect(s-18,32,16,5),e.fillStyle="#ffffff",e.fillRect(s+2,24,22,12),e.fillStyle="#5a4a1e",e.fillRect(s+11,26,3,6),e.fillRect(s+11,33,3,2);else for(let t=0;t<5;t++)e.strokeStyle=t%2?"#8af3ff":"#d6a6ff",e.lineWidth=2,e.beginPath(),e.ellipse(s,40,4+t*4+Math.sin(o*3+t)*1.5,3+t*3,o*.8+t,0,Math.PI*2),e.stroke();if(l){const t=22+o*14%(M-44),a=54+Math.abs(Math.sin(o*8))*-3;e.fillStyle="#ffe66d",e.beginPath(),e.moveTo(t,a-14),e.lineTo(t+5,a-9),e.lineTo(t,a-4),e.lineTo(t-5,a-9),e.fill(),e.fillStyle="#ffffff",e.fillRect(t-3,a-4,6,8),e.fillStyle="#ffe66d",e.fillRect(t-4,a+4,3,4),e.fillRect(t+1,a+4,3,4)}e.fillStyle="#00000088",e.fillRect(0,0,M,11),e.fillStyle=l?"#ffe66d":"#d8e0ee",e.font="8px monospace",e.textAlign="left",e.fillText(`CH${n+1} ${$e[n]}`,3,8),e.restore()}const Ae=(e,n)=>Pe(e.shared,"crtState",n,()=>({t:0,sel:0,t0:-10,tid:0,nextAuto:1.2,userUntil:-1,rnd:Ce(2024)}),(o,l)=>{o.t+=l;const s=u=>{u===o.sel||u<0||u>=me||(o.sel=u,o.t0=o.t,o.tid++)},t=e.shared.get("crtHover"),a=e.shared.get("crtHoverSeen")??0;if(t&&t.seq!==a&&(e.shared.set("crtHoverSeen",t.seq),o.userUntil=o.t+3,s(t.idx)),e.params.bool("auto",!0)&&o.t>o.nextAuto&&o.t>o.userUntil){const u=o.sel%y,c=Math.floor(o.sel/y),m=[];u>0&&m.push(o.sel-1),u<y-1&&m.push(o.sel+1),c>0&&m.push(o.sel-y),c<F-1&&m.push(o.sel+y),s(m[Math.floor(o.rnd()*m.length)%m.length]),o.nextAuto=o.t+2.4}});function he(e){return n=>Ne(n,{antialias:!1,orbit:!1,cam:[0,0,5]},({renderer:o})=>{const l=document.createElement("canvas");l.width=M*y,l.height=V*F;const s=l.getContext("2d"),t=new Te(l);t.minFilter=ie,t.magFilter=ie,t.generateMipmaps=!1,t.colorSpace=Me;const a=new qe(Fe,{tC:{value:t},uRes:{value:new Se(1,1)},uK:{value:.12},uN:{value:30},uScan:{value:.55},uMaskS:{value:.3},uBleed:{value:1},uTime:{value:0},uSel:{value:0},uCRT:{value:e?1:0},uMeas:{value:0},uPR:{value:1},uTop:{value:0},uTr:{value:new Re(0,9,.45,0)}});let u=1,c=1,m=1,f=null,b=new Uint8Array(4),T=new Uint8Array(4),C=new Uint8Array(4),h=0;const i={lines:NaN,pxPerLine:NaN,corner:[NaN,NaN],cornerTh:[NaN,NaN],durs:[],E:new ce(240),on:new ce(240),T:.45,k:.12};e&&n.shared.set("crt-meas",i);let R={tid:-1,on:NaN,off:NaN},G=0,j=0,Z=0,g=-10;const $=o.domElement;let de=0;const H=N=>{const r=$.getBoundingClientRect();if(r.width<2||r.height<2)return;const x=fe(r.width,r.height,re(r.height)),v=N.clientX-r.left,k=r.height-(N.clientY-r.top),P=Math.floor((v-x.m)/x.cw),S=Math.floor((k-x.m)/x.ch);if(P<0||P>=y||S<0||S>=F)return;const B=(F-1-S)*y+P,p=n.shared.get("crtHover");p&&p.idx===B&&N.type==="pointermove"||n.shared.set("crtHover",{idx:B,seq:((p==null?void 0:p.seq)??0)+ ++de})};$.addEventListener("pointermove",H),$.addEventListener("pointerdown",H);const Y=(N,r,x,v)=>{f&&(f.scissor.set(N,r,x,v),f.scissorTest=!0,a.u.uMeas.value=1,a.render(o,f),a.u.uMeas.value=0)},xe=N=>{if(!f)return;const r=fe(u,c,a.u.uTop.value),x=ue(r,Z),v=Math.max(0,Math.floor(x.x-r.shx*.8)),k=Math.min(u,Math.ceil(x.x+r.shx*.8)),P=Math.min(c-1,Math.max(0,Math.floor(x.y))),S=Math.max(1,k-v);b.length<S*4&&(b=new Uint8Array(S*4)),Y(v,P,S,1),o.readRenderTargetPixels(f,v,P,S,1,b);let B=0,p=0;for(let d=0;d+1<S;d++)b[d*4+1]<128||b[(d+1)*4+1]<128||(B+=Math.abs(b[d*4+2]-b[(d+1)*4+2])/255,p++);const W=p?B/p:0;if(i.E.push(W),i.on.push(G-g<i.T?1:0),R.tid!==j&&(R={tid:j,on:NaN,off:NaN}),W>K&&!Number.isFinite(R.on)&&(R.on=G),Number.isFinite(R.on)&&!Number.isFinite(R.off)&&W<K&&(R.off=G,i.durs.push(R.off-R.on),i.durs.length>6&&i.durs.shift()),!N)return;const w=ue(r,0),ee=Math.min(u-1,Math.max(0,Math.floor(w.x))),X=Math.max(0,Math.floor(w.y-r.shy)),ye=Math.min(c,Math.ceil(w.y+r.shy)),A=Math.max(1,ye-X);T.length<A*4&&(T=new Uint8Array(A*4)),Y(ee,X,1,A),o.readRenderTargetPixels(f,ee,X,1,A,T);let te=0,z=!1,I=-1,le=-1;for(let d=0;d<A;d++){if(T[d*4+1]<128)continue;I<0&&(I=d),le=d;const L=T[d*4];!z&&L>.7*255?(z=!0,te++):z&&L<.3*255&&(z=!1)}i.lines=te,i.pxPerLine=I>=0?(le-I+1)/Math.max(1,a.u.uN.value):NaN;const E=Math.max(0,Math.floor(w.x+r.shx*.55)),U=Math.max(0,Math.floor(w.y+r.shy*.55)),pe=Math.min(u,Math.ceil(w.x+r.shx+2)),be=Math.min(c,Math.ceil(w.y+r.shy+2)),O=Math.max(1,pe-E),_=Math.max(1,be-U);C.length<O*_*4&&(C=new Uint8Array(O*_*4)),Y(E,U,O,_),o.readRenderTargetPixels(f,E,U,O,_,C);let oe=-1e9,J=-1,ae=-1;for(let d=0;d<_;d++)for(let L=0;L<O;L++){if(C[(d*O+L)*4+1]<128)continue;const ne=(E+L+.5-w.x)/r.shx+(U+d+.5-w.y)/r.shy;ne>oe&&(oe=ne,J=E+L,ae=U+d)}i.corner=J>=0?[(w.x+r.shx-(J+1))/m,(w.y+r.shy-(ae+1))/m]:[NaN,NaN];const se=ve(a.u.uK.value);i.cornerTh=[(1-se)*r.shx/m,(1-se)*r.shy/m],o.setRenderTarget(null)};return{resize(N,r,x){m=x,u=Math.max(1,Math.floor(N*x)),c=Math.max(1,Math.floor(r*x)),a.u.uRes.value.set(u,c),a.u.uPR.value=x,a.u.uTop.value=re(r)*x,f==null||f.dispose(),f=new we(u,c)},update(N,r,x){const v=Ae(n,x),k=n.params;G=v.t,j=v.tid,Z=v.sel,g=v.t0;const P=k.num("dur",.45);i.T=P,i.k=k.num("curve",.12);for(let p=0;p<me;p++)We(s,p,v.t+p*.7,p===v.sel);if(t.needsUpdate=!0,a.u.uTime.value=v.t,a.u.uSel.value=v.sel,a.u.uK.value=i.k,a.u.uN.value=Math.round(k.num("lines",30)),a.u.uMaskS.value=k.bool("mask",!0)?.32:0,a.u.uBleed.value=k.bool("bleed",!0)?1.2:0,a.u.uScan.value=k.num("scan",.55),a.u.uTr.value.set(v.sel,v.t-v.t0,P,e?1:0),!e){n.hud(["평면 타일 (CRT 없음)","전환: 즉시 컷 0.00s",`선택 CH${v.sel+1} · 전환 ${v.tid}회`].join(`
`));return}const S=a.u.uN.value,B=i.durs.length?i.durs.reduce((p,W)=>p+W,0)/i.durs.length:NaN;n.hud([`주사선 측정 ${Number.isFinite(i.lines)?i.lines:"--"} / 설정 ${S}줄 (${D(i.pxPerLine)}장치px/줄)`,`모서리 이동 측정 (${D(i.corner[0])}, ${D(i.corner[1])}) / 이론 (${D(i.cornerTh[0])}, ${D(i.cornerTh[1])})px`,`전환 측정 ${Number.isFinite(B)?B.toFixed(2):"--"}s / 설정 ${P.toFixed(2)}s (${i.durs.length}회 평균)`,`c = q(1 + ${i.k.toFixed(2)}|q|²) · 주사선 ${i.pxPerLine<3.5?"해상도 부족 – N을 줄이세요":"분해 OK"}`].join(`
`))},render(){a.render(o,null),e&&xe(h++%15===0)},dispose(){$.removeEventListener("pointermove",H),$.removeEventListener("pointerdown",H),f==null||f.dispose(),t.dispose(),a.dispose()}}})}function Ee(e){const n=new Float32Array(240),o=new Float32Array(240);return ke(e,()=>({draw(l,s,t){Be(l,s,t);const a=e.shared.get("crt-meas");if(!a)return;const u=s>420,c=u?{x:30,y:24,w:q(s*.58-40,20),h:q(t-52,20)}:{x:30,y:24,w:q(s-40,20),h:q(t*.5-40,20)};a.E.ordered(n),a.on.ordered(o);const m=h=>c.y+c.h-Math.min(1,h/.4)*c.h;l.fillStyle="rgba(255,154,60,0.15)";for(let h=0;h<240;h++)o[h]>.5&&l.fillRect(c.x+h/239*c.w,c.y,c.w/239+.5,c.h);l.strokeStyle="#1c2230",l.strokeRect(c.x+.5,c.y+.5,c.w,c.h),l.strokeStyle="#4ade80",l.setLineDash([3,3]),l.beginPath(),l.moveTo(c.x,m(K)),l.lineTo(c.x+c.w,m(K)),l.stroke(),l.setLineDash([]),l.strokeStyle="#e6e9ef",l.lineWidth=1.4,l.beginPath();for(let h=0;h<240;h++){const i=c.x+h/239*c.w;h?l.lineTo(i,m(n[h])):l.moveTo(i,m(n[h]))}l.stroke(),l.lineWidth=1,Q(l,"전환 타일 중앙 행의 노이즈 에너지 (최근 240프레임)",c.x,14,"#c8d0dc",10);const f=u?{x:s*.58+24,y:24,w:q(s*.42-36,20),h:q(t-52,20)}:{x:30,y:t*.5+10,w:q(s-40,20),h:q(t*.5-34,20)},b=h=>f.x+h*f.w,T=h=>f.y+f.h-h/1.4*f.h;l.strokeStyle="#1c2230",l.strokeRect(f.x+.5,f.y+.5,f.w,f.h),l.strokeStyle="#5a6272",l.setLineDash([3,3]),l.beginPath(),l.moveTo(b(0),T(1)),l.lineTo(b(1),T(1)),l.moveTo(b(0),T(0)),l.lineTo(b(1),T(1)),l.stroke(),l.setLineDash([]),l.strokeStyle="#5b9cff",l.lineWidth=1.8,l.beginPath();for(let h=0;h<=60;h++){const i=h/60,R=i*(1+2*a.k*i*i);h?l.lineTo(b(i),T(R)):l.moveTo(b(i),T(R))}l.stroke(),l.lineWidth=1;const C=ve(a.k);l.fillStyle="#ff9a3c",l.beginPath(),l.arc(b(C),T(1),4,0,Math.PI*2),l.fill(),Q(l,`s = ${C.toFixed(3)}`,b(C)-4,T(1)-7,"#ff9a3c",9,"right"),Q(l,"대각선 q → 내용 c",f.x,f.y+f.h+12,"#7d8799",9),Le(l,[{label:"에너지",color:"#e6e9ef"},{label:"임계값",color:"#4ade80"},{label:"설정 전환 구간",color:"#ff9a3c"}],c.x,t-4,9),e.hud("")}}))}const ze={layout:"simulation",intro:'맵을 평범한 미니맵 대신 <b>브라운관 TV 여러 대</b>로 보여 주면, 탐색 자체가 "채널을 돌리며 화면을 들여다보는" 레트로 체험이 됩니다. CRT 느낌은 몇 가지 단순한 규칙의 합입니다: 볼록한 유리(<b>배럴 왜곡</b>), 가로 <b>주사선</b>, 형광체의 <b>RGB 줄무늬</b>, 아날로그 신호의 <b>색 번짐</b>, 그리고 채널을 바꿀 때의 <b>지직 노이즈</b>. 커서(자동 또는 마우스·터치)가 다른 TV로 옮겨 갈 때마다 그 TV가 정지 화면 노이즈를 보여 준 뒤 새 화면으로 켜집니다.',how:["타일 내용은 96×72 저해상도 캔버스에 그려 텍스처로 올리고, 화면 전체를 셰이더 한 패스로 처리한다 (TV 몸체·유리·내용을 모두 거리 함수로).","배럴: 화면 정규 좌표 q에서 내용 좌표를 <code>c = q·(1 + k|q|²)</code>로 읽는다. |c| &gt; 1은 검은 유리. 대각선 내용 모서리는 <code>s(1 + 2ks²) = 1</code>인 q = (s, s)에 보인다.","주사선 <code>½ − ½cos(2π·v·N)</code>는 내용 좌표 v에 걸리므로 곡면을 따라 휘고, 정확히 N줄. RGB 마스크는 장치 픽셀 열마다 R/G/B를 번갈아 강조, 색 번짐은 R·B를 가로로 엇갈려 샘플.","채널 전환: 선택 타일이 바뀌면 경과 시간 &lt; T 동안 픽셀 해시 노이즈 + 굴러가는 밝은 띠, T가 되는 순간 새 화면이 살짝 밝게 튀며 켜진다.","측정: 같은 셰이더를 측정 모드로 시저 영역(행·열·모서리 블록)만 그려 GPU에서 읽는다. 주사선은 밝은 줄 개수, 모서리는 내용 마스크 끝 픽셀, 전환 시간은 이웃 픽셀 차 평균(노이즈 에너지)이 임계값 위에 머문 시뮬레이션 시간."],pros:['맵의 각 칸이 "화면 속 화면"이 되어, 같은 정보라도 세계관(오래된 방송 장비·감시 모니터)을 강하게 전달한다.',"채널 전환 노이즈가 이동의 시작·끝을 확실히 끊어 주어, 칸 이동이라는 추상적 동작이 손맛 있는 사건이 된다.","셰이더 한 패스라 싸고, 곡률·주사선·번짐 세기가 그대로 스타일 손잡이가 된다."],cons:["주사선·RGB 마스크는 해상도가 낮으면(작은 폰 화면) 모아레가 생기거나 그냥 어둡게만 보인다 – 픽셀당 줄 수를 확인해 줄 수를 조절해야 한다.","곡면 왜곡으로 가장자리 정보가 잘리고, 노이즈 전환이 길면 빠른 탐색을 답답하게 만든다 (짧게, 또는 건너뛰기 가능하게).","번쩍이는 노이즈·깜빡임은 광과민성 사용자에게 부담 – 세기 조절·끄기 옵션이 필요하다."],usedIn:"〈젠레스 존 제로〉의 할로우 탐색(TV 화면 격자 위에서 칸을 옮겨 다니는 TV 모드)이 대표적인 예입니다. CRT 셰이더 자체는 레트로 게임 에뮬레이터 필터, 인디 게임의 레트로 연출 등에서 흔히 쓰이며, 이 페이지는 일반적인 기법을 원본 그래픽으로 재구성한 것입니다.",tips:["주사선 한 줄에 장치 픽셀이 3px 이상 돌아가야 줄로 보인다. 그보다 적으면 모아레가 생기므로 화면 높이에 맞춰 N을 줄인다 (이 페이지는 3.5px 미만이면 HUD로 경고).",'곡면 세기 k는 0.05~0.15 정도가 "볼록한 유리"로 읽히면서 내용이 덜 잘린다. k를 키우면 모서리가 s(1 + 2ks²) = 1의 해만큼 안쪽으로 먹힌다.',"주사선·RGB 마스크는 평균 밝기를 깎는다. 마스크 세기 S라면 <code>1 / (1 − 2S/3)</code>를 곱하는 식으로 보정하고, 주사선 진하기는 0.3~0.6을 많이 쓴다.","채널 전환 노이즈는 0.2~0.5s가 무난하다. 빠르게 연속 이동할 때는 노이즈를 짧게 줄이거나 건너뛰게 해 탐색이 답답하지 않게 한다."],related:["glitch","pixelate","diegetic-ui","film-look","halftone"],controls:[{type:"range",key:"lines",label:"주사선 수 N (타일 높이당)",min:8,max:64,step:1,value:30},{type:"range",key:"curve",label:"곡면 세기 k (배럴 계수)",min:0,max:.3,step:.01,value:.12},{type:"range",key:"dur",label:"채널 전환 시간 T (s)",min:.1,max:1.2,step:.05,value:.45},{type:"range",key:"scan",label:"주사선 진하기 S (0~0.9)",min:0,max:.9,step:.05,value:.55},{type:"toggle",key:"mask",label:"RGB 형광체 마스크",value:!0},{type:"toggle",key:"bleed",label:"색 번짐",value:!0},{type:"toggle",key:"auto",label:"커서 자동 이동",value:!0}],viewers:[{title:"CRT TV 격자",kind:"after",wide:!0,caption:"TV 위로 마우스를 올리거나 탭하면 커서가 그 TV로 옮겨 가고, 그 화면이 T초 동안 지직거린 뒤 켜집니다.",mount:he(!0)},{title:"평면 타일 (CRT 없음)",kind:"before",caption:'같은 내용·같은 커서를 그냥 사각 타일로 보여 줍니다. 정보는 같지만 이동이 즉시 컷이라 "사건"이 되지 않습니다.',mount:he(!1)},{title:"전환 노이즈 · 배럴 곡선",kind:"info",caption:"왼쪽: 전환 타일 중앙 행의 노이즈 에너지(주황 = 설정 전환 구간, 초록 = 판정 임계값). 오른쪽: 대각선 배럴 곡선과 내용 모서리 s.",mount:Ee}]};export{ze as default};
