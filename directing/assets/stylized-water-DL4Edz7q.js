import{aB as J,W as H,j as q,x as K,am as Q,an as tt,a6 as et,P as ot,C as G,f as nt,M as P,g as D,m as at,h as B,a as O,e as st,p as rt,H as ct,u as lt}from"./three.module-CEzfHhrp.js";import{m as it}from"./three-viewer-fx7lDL-0.js";import{m as dt,b as X,a as ut}from"./canvas-viewer-QtaWfmlz.js";import{c as W,l as pt}from"./fx-CIZ4XT9q.js";import{c as ht,t as R,l as ft}from"./chart2d-DfgeckAJ.js";import{h as vt,P as mt,N as wt,a as j}from"./extra-kit-c-FPjCbN4U.js";import{u as xt}from"./env-kit-BSefkVuG.js";const y=[8,15,30,55],L=8,N=-16,yt=-3,C=1.2,z=128,V=256,Z=-1,Y=9,Mt=o=>{const t=(o-N)/L-.5,c=W(Math.floor(t),0,y.length-2),i=W(t-c,0,1),a=W((i-.5)*(L/1.5)+.5,0,1),w=a*a*(3-2*a);return pt(Math.tan(y[c]*Math.PI/180),Math.tan(y[c+1]*Math.PI/180),t<0?0:t>y.length-1?1:w)};function E(o,t){let c=W(-t*Mt(o),yt,C);return c>=C-.001&&(c+=.25*Math.sin(o*.7)*Math.sin(t*.9)*W((-t-2)/3,0,1)),c}const kt=`
${wt}
uniform sampler2D tScene, tDepth;
uniform mat4 uInvVP;
uniform float uMode, uT, uDth, uWob, uMask;
uniform vec3 uSun;
varying vec2 vUv;
vec3 worldAt(vec2 uv, float z) { vec4 p = uInvVP * vec4(uv * 2.0 - 1.0, z * 2.0 - 1.0, 1.0); return p.xyz / p.w; }
float foamThr(vec2 xz) {
  float n = xk_vnoise(vec3(xz * 1.3, uT * 0.35));
  return uDth * (1.0 + uWob * (2.0 * n - 1.0));
}
vec3 aces(vec3 c) { return clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), 0.0, 1.0); }
vec3 shadeWater(vec3 pN, vec3 rd, float tW, float dV, vec3 scene, float aa) {
  vec3 pW = pN + rd * tW;
  vec2 q = pW.xz;
  // 수면 법선: 흐르는 값 노이즈 두 겹의 기울기
  float e = 0.08;
  vec3 a1 = vec3(q * 0.9 + vec2(uT * 0.25, uT * 0.1), uT * 0.2);
  vec3 a2 = vec3(q * 1.7 - vec2(uT * 0.18, -uT * 0.22), 7.0 + uT * 0.3);
  float h0 = xk_vnoise(a1) + 0.5 * xk_vnoise(a2);
  float hx = xk_vnoise(a1 + vec3(e * 0.9, 0.0, 0.0)) + 0.5 * xk_vnoise(a2 + vec3(e * 1.7, 0.0, 0.0));
  float hz = xk_vnoise(a1 + vec3(0.0, e * 0.9, 0.0)) + 0.5 * xk_vnoise(a2 + vec3(0.0, e * 1.7, 0.0));
  vec3 n = normalize(vec3(-(hx - h0) / e * 0.18, 1.0, -(hz - h0) / e * 0.18));
  vec3 v = -rd;
  vec3 hv = normalize(uSun + v);
  float spec = pow(max(dot(n, hv), 0.0), 220.0);
  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 skyR = vec3(0.55, 0.75, 0.95);
  vec3 col;
  if (uMode < 0.5) {
    col = mix(scene, vec3(0.12, 0.35, 0.5), 0.45) + skyR * fres * 0.5 + vec3(spec) * 3.0;
  } else {
    // 굴절 일렁임 (얕을수록 약하게, 물 위 물체를 끌어오지 않게 깊이 확인)
    vec3 refr = scene;
    if (uMode > 1.5) {
      vec2 off = n.xz * 0.035 * clamp(dV, 0.0, 1.0);
      float z2 = texture2D(tDepth, vUv + off).r;
      vec3 p2 = worldAt(vUv + off, z2);
      if (p2.y < 0.0) refr = texture2D(tScene, vUv + off).rgb;
    }
    vec3 shallow = vec3(0.25, 0.85, 0.8);
    vec3 deep = vec3(0.03, 0.18, 0.38);
    float k = 1.0 - exp(-max(dV, 0.0) / 1.2);
    if (uMode > 1.5) k = floor(k * 4.0 + 0.5 * smoothstep(0.35, 0.65, fract(k * 4.0))) / 4.0 * 0.8 + k * 0.2;
    col = mix(refr * shallow * 1.1, deep, k);
    col = mix(col, deep * 0.6, smoothstep(0.0, 0.1, k) * 0.15);
    if (uMode > 1.5) {
      // 툰 하이라이트: 문턱 하나로 흰 반점
      col += vec3(1.0) * step(0.55, spec) * 1.2 + skyR * step(0.25, fres) * 0.15;
      // 물가 거품 띠 + 물가로 밀려오는 거품 줄
      float thr = foamThr(q);
      float foam = 1.0 - smoothstep(thr - aa, thr + aa, dV);
      float ph = fract(dV / (uDth * 1.6) + uT * 0.3);
      float lines = smoothstep(0.08, 0.0, abs(ph - 0.5)) * smoothstep(uDth * 3.5, uDth * 1.2, dV) * step(thr, dV);
      lines *= step(0.45, xk_vnoise(vec3(q * 0.8, uT * 0.2)));
      col = mix(col, vec3(0.95, 0.98, 1.0), max(foam, lines * 0.8));
    } else col += skyR * fres * 0.4 + vec3(spec) * 2.0;
  }
  return col;
}
void main() {
  float z = texture2D(tDepth, vUv).r;
  vec3 scene = texture2D(tScene, vUv).rgb;
  vec3 pN = worldAt(vUv, 0.0);
  vec3 pF = worldAt(vUv, 1.0);
  vec3 rd = normalize(pF - pN);
  vec3 pS = worldAt(vUv, z);
  float tS = z >= 0.99999 ? 1e9 : dot(pS - pN, rd);
  float tW = rd.y < -1e-5 ? (0.0 - pN.y) / rd.y : -1.0;
  bool water = tW > 0.0 && tW < tS;
  float dV = z >= 0.99999 ? 50.0 : (0.0 - pS.y);
  if (uMask > 0.5) {
    float f = water && dV < foamThr((pN + rd * tW).xz) ? 1.0 : 0.0;
    gl_FragColor = vec4(f, water ? 1.0 : 0.0, 0.0, 1.0);
    return;
  }
  float aa = clamp(fwidth(dV), 1e-3, 0.05);
  vec3 col = scene;
  if (water) col = shadeWater(pN, rd, tW, dV, scene, aa);
  gl_FragColor = vec4(aces(col), 1.0);
  #include <colorspace_fragment>
}`;function Tt(o){const t=ut(19),c=new ot(48,34,192,136);c.rotateX(-Math.PI/2),c.translate(0,0,1);const i=c.attributes.position,a=new Float32Array(i.count*3),w=new G(15325094),n=new G(12101498),M=new G(8368986),l=new G;for(let d=0;d<i.count;d++){const f=i.getX(d),s=i.getZ(d),r=E(f,s);i.setY(d,r),r>.75?l.copy(w).lerp(M,W((r-.75)/.3,0,1)):l.copy(n).lerp(w,W((r+.6)/1.2,0,1)),a.set([l.r,l.g,l.b],d*3)}c.setAttribute("color",new nt(a,3)),c.computeVertexNormals();const p=new P(c,new D({vertexColors:!0,roughness:1}));o.add(p);const T=new D({color:9078144,roughness:.95,flatShading:!0});for(const[d,f,s]of[[-8,6,1.1],[.2,5.5,1],[8,5.5,.9],[-3,13,1.6],[5,15,1.2]]){const r=new P(new at(s,1),T);r.position.set(d,-.35+t()*.3,f),r.scale.y=.8+t()*.5,r.rotation.set(t(),t()*3,0),o.add(r)}const e=new D({color:9067062,roughness:.9}),h=new P(new B(1.4,.12,7),e);h.position.set(0,.55,1.5),o.add(h);for(let d=0;d<4;d++)for(const f of[-.6,.6]){const s=new P(new O(.08,.08,4,8),e);s.position.set(f,-1.4,-1+d*1.8),o.add(s)}const U=new P(new B(2,1.4,1.8),new D({color:15918799,roughness:.9}));U.position.set(-5,C+.7,-6),o.add(U);const u=new P(new st(1.7,1.1,4),new D({color:13784378,roughness:.8}));u.position.set(-5,C+1.95,-6),u.rotation.y=Math.PI/4,o.add(u);const A=new D({color:4098634,roughness:1,flatShading:!0}),x=new D({color:7031346,roughness:1});for(let d=0;d<9;d++){const f=-18+t()*36,s=-4-t()*9,r=new P(new O(.1,.16,2.2,6),x);r.position.set(f,E(f,s)+1.1,s),o.add(r);const v=new P(new rt(.9+t()*.4,0),A);v.position.set(f,E(f,s)+2.5,s),o.add(v)}o.add(new ct(12574975,9075290,1.1));const k=new lt(16773336,2.6);return k.position.set(-6,12,8),o.add(k),k.position.clone().normalize()}function F(o){return t=>it(t,{antialias:!1,orbit:!1,fov:50,cam:[0,7,18],near:.3,far:120,background:10473712},({scene:c,camera:i,renderer:a})=>{a.toneMapping=J;const w=Tt(c),n=vt(a),M=(s,r,v)=>{const m=new H(s,r,{type:v});return m.depthTexture=new Q(s,r),m.depthTexture.type=tt,m},l=M(4,4,n),p=M(z,V,et),T=new H(z,V,{depthBuffer:!1}),e=new Uint8Array(z*V*4),h=new q,U=new q,u={tScene:{value:l.texture},tDepth:{value:l.depthTexture},uInvVP:{value:h},uMode:{value:o==="plain"?0:o==="depth"?1:2},uT:{value:0},uDth:{value:.4},uWob:{value:.3},uMask:{value:0},uSun:{value:w}},A=new mt(kt,u),x=new K(N,-N,-Z,-Y,1,30);x.position.set(0,12,0),x.up.set(0,0,-1),x.lookAt(0,0,0),x.updateMatrixWorld(),x.updateProjectionMatrix(),U.multiplyMatrices(x.matrixWorld,x.projectionMatrixInverse);const k={w:y.map(()=>NaN),ok:!1};o==="toon"&&t.shared.set("sw-meas",k);let d=0;const f=()=>{a.setRenderTarget(p),a.render(c,x),u.tDepth.value=p.depthTexture,u.uInvVP.value=U,u.uMask.value=1,A.render(a,T),u.uMask.value=0,u.tDepth.value=l.depthTexture,u.uInvVP.value=h,a.readRenderTargetPixels(T,0,0,z,V,e);const s=(Y-Z)/V;y.forEach((r,v)=>{const m=N+L*(v+.5);let S=0,b=0;for(let _=0;_<z;_++){const $=N+(_+.5)/z*-2*N;if(Math.abs($-m)>2.5)continue;let g=0;for(let I=0;I<V;I++)e[(I*z+_)*4]>127&&g++;S+=g*s,b++}k.w[v]=b?S/b:NaN}),k.ok=!0};return{resize(s,r,v){const m=Math.min(v,1.5),S=Math.max(1,Math.floor(s*m)),b=Math.max(1,Math.floor(r*m));l.setSize(S,b)},update(s,r,v){const m=xt(t,"swClock",v,"run"),S=t.params;u.uT.value=m.t,u.uDth.value=S.num("dth",.4),u.uWob.value=S.num("wob",.3);const b=Math.sin(m.t*.1)*7;i.position.set(b,6,13),i.lookAt(b*.7,-.6,.5),i.updateMatrixWorld(),h.multiplyMatrices(i.matrixWorld,i.projectionMatrixInverse);const _=u.uDth.value,$=y.map(g=>_/Math.tan(g*Math.PI/180));o==="plain"?t.hud(`반투명 파랑 45% 섞기 · 깊이 정보 없음
물가·깊은 곳 구분 없음, 거품 없음`):o==="depth"?t.hud(`색 = mix(얕은 청록, 깊은 남색, 1 − e^(−d/1.2))
물 깊이 d = 깊이 버퍼 역투영 (수직 거리)`):k.ok?t.hud([`거품 폭 w = d_th / tanα (d_th ${_.toFixed(2)} m, 노이즈 ±${Math.round(u.uWob.value*100)}%)`,...y.map((g,I)=>`${g}° 측정 ${j(k.w[I])} / 이론 ${j($[I])} m`)].join(`
`)):t.hud("측정 준비 중…")},render(){d++,a.setRenderTarget(l),a.render(c,i),o==="toon"&&d%10===1&&f(),A.render(a,null)},dispose(){var s,r;(s=l.depthTexture)==null||s.dispose(),l.dispose(),(r=p.depthTexture)==null||r.dispose(),p.dispose(),T.dispose(),A.dispose()}}})}function bt(o){return dt(o,()=>({draw(t,c,i){ht(t,c,i);const a=o.shared.get("sw-meas"),w=o.params.num("dth",.4),n={x:34,y:24,w:X(c-46,20),h:X(i-56,20)},M=Math.max(1,Math.ceil(w/Math.tan(6*Math.PI/180)*1.05)),l=e=>n.x+(e-4)/62*n.w,p=e=>n.y+n.h-W(e,0,M)/M*n.h;t.strokeStyle="#1c2230",t.strokeRect(n.x+.5,n.y+.5,n.w,n.h);const T=M>6?2:1;for(let e=T;e<M;e+=T)t.beginPath(),t.moveTo(n.x,p(e)+.5),t.lineTo(n.x+n.w,p(e)+.5),t.stroke(),R(t,`${e}`,n.x-3,p(e)+3,"#7d8799",9,"right");t.strokeStyle="#ffffff",t.lineWidth=1.4,t.beginPath();for(let e=6;e<=66;e+=.5){const h=w/Math.tan(e*Math.PI/180);e===6?t.moveTo(l(e),p(h)):t.lineTo(l(e),p(h))}t.stroke(),t.lineWidth=1;for(const e of y)R(t,`${e}°`,l(e),n.y+n.h+11,"#7d8799",9,"center"),t.strokeStyle="rgba(255,255,255,0.08)",t.beginPath(),t.moveTo(l(e),n.y),t.lineTo(l(e),n.y+n.h),t.stroke();a!=null&&a.ok&&y.forEach((e,h)=>{t.fillStyle="#a3e635",t.beginPath(),t.arc(l(e),p(a.w[h]),4,0,Math.PI*2),t.fill(),R(t,j(a.w[h]),l(e)+6,p(a.w[h])-5,"#a3e635",9)}),R(t,`물가 거품 띠 폭 w (m) vs 해변 경사 α  (d_th = ${w.toFixed(2)} m)`,n.x,14,"#c8d0dc",10),ft(t,[{label:"이론 d_th / tanα",color:"#ffffff"},{label:"GPU 마스크 측정",color:"#a3e635"}],n.x,i-4,9),o.hud("")}}))}const It={layout:"variants",intro:'<b>툰 물 셰이더</b>는 물리적으로 정확한 물 대신 "그림 같은 물"을 만드는 연출입니다. 핵심은 <b>깊이 버퍼</b>: 수면과 그 아래 바닥 사이 거리를 알면 얕은 곳은 밝은 청록, 깊은 곳은 짙은 남색으로 칠하고, 거리가 거의 0인 <b>물가와 바위 둘레에 흰 거품선</b>을 그릴 수 있습니다. 여기에 문턱 하나로 끊은 반짝임과 굴절 일렁임을 더하면 〈바람의 지휘봉〉풍의 물이 됩니다. 반투명 파랑 / 깊이 색 / 완전한 툰 물을 같은 해변으로 비교합니다.',how:["불투명 장면(섬·바위·잔교)을 색 + 깊이 텍스처로 먼저 그린다.","전체 화면 패스에서 픽셀마다 시선 광선을 수면 y = 0과 교차시켜 수면점을, 깊이 버퍼를 역투영(<code>invViewProj · ndc</code>)해 바닥점을 얻는다. 바닥이 수면보다 가까우면 물이 아니다.","물 깊이 <code>d = 0 − y_바닥</code> (수직 거리). 색 = <code>mix(얕은 색 × 바닥, 깊은 색, 1 − e^{−d/1.2})</code> – 얕은 곳은 바닥이 비치고 깊을수록 물색만 남는다. 툰은 이 값을 4단계로 끊는다.","거품: <code>d < d_th·(1 + a(2n − 1))</code> (n = 흐르는 값 노이즈, 가장자리를 들쭉날쭉하게). 기울기 α인 해변에서 d = s·tanα이므로 거품 띠 폭은 <code>w = d_th / tanα</code> – 완만한 모래사장은 넓게, 절벽·바위는 얇게.","추가 장식: 깊이에 따라 위상이 도는 줄(<code>fract(d/k + t)</code>)로 물가로 밀려오는 거품 줄, 반사 하이라이트를 <code>step</code>으로 끊은 흰 반점, 노멀로 화면 좌표를 미는 굴절 일렁임(물 위 물체를 끌어오지 않게 깊이 확인).",'HUD 측정: 같은 셰이더를 위에서 내려다보는 직교 카메라로 "거품 마스크" 모드(128×256)로 그려 읽고, 경사 4구간마다 열별 거품 길이를 평균한다. 이론 = d_th / tanα (노이즈는 평균 0이라 평균 폭은 그대로).'],pros:["물가·바위·기둥 어디든 자동으로 거품이 생긴다 – 아티스트가 거품 메시를 따로 배치할 필요가 없다.",'깊이 색 하나로 얕은 여울·깊은 바다가 읽혀, 플레이어가 "걸어 들어갈 수 있는 곳"을 직관적으로 안다.',"전체 화면 패스 하나(+ 깊이 텍스처)로 끝나 모바일에서도 가능하다."],cons:["화면에 보이는 깊이만 쓰므로 화면 밖·가려진 바닥은 알 수 없다. 굴절 오프셋이 물 위 물체를 끌어오는 문제를 따로 막아야 한다.","거품 폭이 경사에 반비례 – 절벽에선 거의 안 보이고 아주 완만한 갯벌에선 지나치게 넓어져 문턱을 경사로 보정하기도 한다.","반투명 물체(다른 물·파티클)는 깊이 버퍼에 없어 거품이 생기지 않는다."],usedIn:"〈젤다의 전설 바람의 지휘봉〉풍의 그림 같은 바다, 〈시 오브 시브즈〉의 스타일라이즈드 바다, 〈원신〉 같은 툰 렌더링 게임의 물가 거품, 유니티·언리얼 툰 물 튜토리얼의 표준 기법(깊이 기반 거품). 실제 구현 방식은 게임마다 다르다.",tips:['물 깊이는 이 페이지처럼 수직 깊이(수면 y − 바닥 y)를 쓰는 편이 안정적이다. 흔한 "시선 방향 깊이 차"를 쓰면 카메라를 기울일 때마다 거품 폭이 변한다.',"경사와 상관없이 거품 폭을 일정하게 하고 싶으면 d를 월드 수평 기울기 |∇d|(평면 해변에선 tanα)로 나눈 값, 즉 물가까지의 수평 거리로 문턱을 잡는다.","깊이 색은 3~5단계가 읽기 좋고, 가장 깊은 색도 완전한 검정이 아닌 짙은 남색으로 둔다. 감쇠 거리(여기선 1.2m)는 걸어 들어갈 수 있는 깊이에 맞춘다.","굴절 오프셋은 얕을수록 줄이고, 밀린 좌표의 깊이가 수면 위면 원래 좌표로 되돌린다. 그래야 물 위 기둥·캐릭터가 물속으로 번져 보이지 않는다."],related:["cel-shading","caustics","underwater","wet-surface","wind-sway"],controls:[{type:"range",key:"dth",label:"거품 깊이 문턱 d_th (m)",min:.1,max:.8,step:.01,value:.4},{type:"range",key:"wob",label:"거품 가장자리 노이즈 a (0~0.6)",min:0,max:.6,step:.01,value:.3},{type:"toggle",key:"run",label:"물 움직임",value:!0}],viewers:[{title:"반투명 파랑",kind:"before",caption:"수면을 파란 반투명으로 덮었을 뿐이라 물가와 깊은 곳이 같은 색이고, 바위 둘레도 물이 닿는 경계가 드러나지 않습니다.",mount:F("plain")},{title:"깊이 색",kind:"variant",caption:"깊이 버퍼로 물 깊이를 구해 얕은 곳은 바닥이 비치는 청록, 깊은 곳은 남색. 해변의 경사가 색 띠로 읽힙니다.",mount:F("depth")},{title:"툰 물 (거품 · 하이라이트 · 일렁임)",kind:"after",caption:"깊이 문턱 아래를 흰 거품으로 칠하니 물가와 바위 둘레에 선이 생기고, 완만한 왼쪽 해변일수록 띠가 넓습니다. 밀려오는 거품 줄과 툰 반짝임이 더해집니다.",mount:F("toon")},{title:"거품 띠 폭 vs 경사",kind:"info",caption:"흰 선 = d_th / tanα, 점 = GPU 거품 마스크에서 잰 평균 폭. 문턱을 두 배로 하면 모든 구간 폭이 두 배가 되고, 경사가 급할수록 빠르게 얇아집니다.",mount:bt}]};export{It as default};
