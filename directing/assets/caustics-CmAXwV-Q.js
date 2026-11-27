import{V as ie,q as me,W as pe,L as te,S as I,M as C,P as D,g as H,r as xe,s as ye,t as we,T as ge,c as be,H as Me,u as ke,v as Te,A as Pe,w as oe,n as Ce,D as Fe,x as Se,k as We}from"./three.module-CEzfHhrp.js";import{m as $e}from"./three-viewer-fx7lDL-0.js";import{m as ze,b as ae}from"./canvas-viewer-QtaWfmlz.js";import{c as Ae}from"./fx-CIZ4XT9q.js";import{c as _e,t as $,l as Ee}from"./chart2d-DfgeckAJ.js";import{h as Le,P as De,a as S}from"./extra-kit-c-FPjCbN4U.js";import{g as y,F as Re,u as Ne}from"./env-kit-BSefkVuG.js";const a=6,Ge=1.6,ne=200,se=512,m=64,V=.7,X=1.333,R=new ie(.22,-1,.14).normalize(),Oe=.55,Je=[[.3,1.6,.02,0],[1.9,1.1,.012,1.3],[-1.1,2.4,.026,2.1],[2.8,.8,.006,4],[.9,3.5,.035,5.2]],re=Je.map(([s,e,i,r])=>{const t=2*Math.PI/e;return{kx:Math.cos(s)*t,kz:Math.sin(s)*t,A:i,ph:r,w:Math.sqrt(9.81*t)*Oe}}),le=`
uniform float uT, uAmp;
vec3 waveH(vec2 p) {
  vec3 r = vec3(0.0);
  ${re.map(s=>`{ float s = ${y(s.kx)} * p.x + ${y(s.kz)} * p.y - ${y(s.w)} * uT + ${y(s.ph)};
    r += ${y(s.A)} * uAmp * vec3(sin(s), ${y(s.kx)} * cos(s), ${y(s.kz)} * cos(s)); }`).join(`
  `)}
  return r;
}
vec3 waveN(vec2 p) { vec3 h = waveH(p); return normalize(vec3(-h.y, 1.0, -h.z)); }
`;function ve(s,e,i,r){let t=0,o=0,l=0;for(const v of re){const d=v.kx*s+v.kz*e-v.w*i+v.ph,n=Math.cos(d);t+=v.A*r*Math.sin(d),o+=v.A*r*v.kx*n,l+=v.A*r*v.kz*n}return[t,o,l]}function z(s,e,i,r,t){const[o,l,v]=ve(s,e,i,r),d=new ie(-l,1,-v).normalize(),n=1/X,w=-d.dot(R),M=1-n*n*(1-w*w),p=R.clone().multiplyScalar(n).addScaledVector(d,n*w-Math.sqrt(Math.max(0,M))),c=(-t-o)/p.y;return[s+p.x*c,e+p.z*c]}function ce(s,e,i,r,t){const l=z(s+.001,e,i,r,t),v=z(s-.001,e,i,r,t),d=z(s,e+.001,i,r,t),n=z(s,e-.001,i,r,t);return((l[0]-v[0])*(d[1]-n[1])-(l[1]-v[1])*(d[0]-n[0]))/(4*.001*.001)}const Ie=`
${le}
uniform vec3 uL;
uniform float uD;
varying vec2 vOld;
varying vec2 vNew;
void main() {
  vec2 p = position.xy;
  vec3 h = waveH(p);
  vec3 n = normalize(vec3(-h.y, 1.0, -h.z));
  vec3 r = refract(uL, n, ${y(1/X)});
  float s = (-uD - h.x) / r.y;
  vec2 X = p + r.xz * s;
  vOld = p;
  vNew = X;
  gl_Position = vec4(X / ${y(a)}, 0.0, 1.0);
}`,He=`
varying vec2 vOld;
varying vec2 vNew;
void main() {
  vec2 ox = dFdx(vOld), oy = dFdy(vOld);
  vec2 nx = dFdx(vNew), ny = dFdy(vNew);
  float aOld = abs(ox.x * oy.y - ox.y * oy.x);
  float aNew = max(abs(nx.x * ny.y - nx.y * ny.x), 1e-12);
  gl_FragColor = vec4(min(aOld / aNew, 40.0), 0.0, 0.0, 1.0);
}`,Ue=`
uniform sampler2D tC;
uniform vec2 uPts[${m}];
uniform float uEnc;
void main() {
  int i = int(gl_FragCoord.x);
  gl_FragColor = vec4(texture2D(tC, uPts[i]).r * uEnc, 0.0, 0.0, 1.0);
}`,Ve=`
varying vec3 vW;
varying vec3 vN;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Xe=`
uniform sampler2D tC;
uniform float uMode, uT, uD;
uniform vec3 uL;
varying vec3 vW;
varying vec3 vN;
vec2 h2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
float worleyEdge(vec2 p, float t) {
  vec2 i = floor(p);
  vec2 f = p - i;
  float d1 = 8.0, d2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(float(x), float(y));
    vec2 o = h2(i + g);
    o = 0.5 + 0.4 * sin(t + 6.2831 * o);
    float d = length(g + o - f);
    if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
  }
  return d2 - d1;
}
void main() {
  vec3 n = normalize(vN);
  // 모자이크 타일
  vec2 tp = (n.y > 0.5 ? vW.xz : (abs(n.x) > 0.5 ? vW.zy : vW.xy)) * 3.0;
  vec2 tf = fract(tp);
  float grout = step(0.06, tf.x) * step(0.06, tf.y);
  float v = fract(sin(dot(floor(tp), vec2(12.9898, 78.233))) * 43758.5453);
  vec3 alb = mix(vec3(0.55, 0.78, 0.86), vec3(0.75, 0.9, 0.95), v);
  if (n.y > 0.5 && abs(vW.x) < 0.25 && abs(vW.z) < 4.5) alb = vec3(0.12, 0.2, 0.42);
  alb *= mix(0.72, 1.0, grout);
  float sunC = 1.0;
  if (n.y > 0.5) {
    if (uMode > 1.5) sunC = texture2D(tC, vW.xz / ${y(2*a)} + 0.5).r;
    else if (uMode > 0.5) {
      float a = worleyEdge(vW.xz * 0.9 + vec2(uT * 0.12, uT * 0.05), uT * 0.9);
      float b = worleyEdge(vW.xz * 1.3 - vec2(uT * 0.07, -uT * 0.1), uT * 1.1 + 3.0);
      float e = min(a, b);
      sunC = 0.55 + 2.2 * pow(1.0 - smoothstep(0.0, 0.22, e), 2.0);
    }
  }
  float ndl = max(dot(n, -uL), 0.0);
  vec3 sunCol = vec3(1.0, 0.96, 0.88) * 2.2;
  vec3 col = alb * (sunCol * ndl * sunC + vec3(0.12, 0.22, 0.3));
  // 물속 흡수: 수면까지 거리만큼 빨강부터 줄어듦
  float depth = max(0.0, -vW.y);
  col *= exp(-vec3(0.45, 0.12, 0.08) * depth * 1.6);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,je=`
${le}
varying vec3 vW;
varying vec3 vN;
void main() {
  vec2 p = position.xy;
  vec3 h = waveH(p);
  vW = vec3(p.x, h.x, p.y);
  vN = normalize(vec3(-h.y, 1.0, -h.z));
  gl_Position = projectionMatrix * viewMatrix * vec4(vW, 1.0);
}`,qe=`
uniform vec3 uL;
varying vec3 vW;
varying vec3 vN;
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(cameraPosition - vW);
  float f = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
  vec3 r = reflect(-v, n);
  vec3 sky = mix(vec3(0.55, 0.7, 0.85), vec3(0.25, 0.45, 0.8), clamp(r.y, 0.0, 1.0));
  float spec = pow(max(dot(r, -uL), 0.0), 600.0) * 8.0;
  vec3 col = sky * f + vec3(spec);
  gl_FragColor = vec4(col + vec3(0.02, 0.08, 0.1), clamp(0.12 + f + spec, 0.0, 1.0));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function U(s){return e=>$e(e,{antialias:!0,orbit:!1,fov:50,cam:[0,10,12],far:200,background:10274012},({scene:i,camera:r,renderer:t})=>{t.toneMapping=me,t.toneMappingExposure=1;const o={uT:{value:0},uAmp:{value:1},uD:{value:2},uL:{value:R.clone()}},l=new pe(se,se,{type:Le(t),depthBuffer:!1,minFilter:te,magFilter:te}),v={...o,tC:{value:l.texture},uMode:{value:s==="none"?0:s==="fake"?1:2}},d=new I({vertexShader:Ve,fragmentShader:Xe,uniforms:v}),n=new C(new D(2*a,2*a),d);n.rotation.x=-Math.PI/2,i.add(n);const w=[];for(let x=0;x<4;x++){const u=new C(new D(2*a,1),d),g=x*Math.PI/2;u.rotation.y=g,u.position.set(-Math.sin(g)*a,0,-Math.cos(g)*a),i.add(u),w.push(u)}const M=new H({color:14273456,roughness:.9}),p=new xe;p.moveTo(-a-6,-a-6),p.lineTo(a+6,-a-6),p.lineTo(a+6,a+6),p.lineTo(-a-6,a+6);const c=new ye;c.moveTo(-a,-a),c.lineTo(-a,a),c.lineTo(a,a),c.lineTo(a,-a),p.holes.push(c);const N=new C(new we(p),M);N.rotation.x=-Math.PI/2,N.position.y=.12,i.add(N);const de=new H({color:13159634,metalness:.8,roughness:.3});for(const x of[-.35,.35]){const u=new C(new ge(.5,.04,8,20,Math.PI),de);u.position.set(a-2+x,.12,-a+.05),u.rotation.y=Math.PI/2,i.add(u)}const j=new C(new be(.35,24,16),new H({color:16734794,roughness:.5}));i.add(j),i.add(new Me(13625087,8415824,1.2));const q=new ke(16773853,2.4);q.position.copy(R).multiplyScalar(-20),i.add(q);const G=new C(new D(2*a,2*a,128,128),new I({vertexShader:je,fragmentShader:qe,uniforms:o,transparent:!0,depthWrite:!1}));G.frustumCulled=!1,G.geometry.scale(1,-1,1),i.add(G);const B=2*(a+Ge),K=new D(B,B,ne,ne),Y=new Te,O=new C(K,new I({vertexShader:Ie,fragmentShader:He,uniforms:o,side:Fe,depthTest:!1,depthWrite:!1,blending:Ce,blendSrc:oe,blendDst:oe,blendEquation:Pe}));O.frustumCulled=!1,Y.add(O);const fe=new Se(-1,1,1,-1,0,1),A=new Re(t,m,1,8),Z=Array.from({length:m},()=>new We),Q=new De(Ue,{tC:{value:l.texture},uPts:{value:Z},uEnc:{value:A.enc}}),h={x:new Float32Array(m),meas:new Float32Array(m),theo:new Float32Array(m),fold:0,ok:!1};s==="real"&&e.shared.set("caus-probe",h);let ee=0,J=!1;const ue=(x,u,g)=>{let T=0;for(let f=0;f<m;f++){const k=-a+.8+(2*a-1.6)*(f+.5)/m,F=z(k,V,x,u,g),_=ce(k,V,x,u,g);_<=0&&T++,h.x[f]=F[0],h.theo[f]=1/Math.max(.001,Math.abs(_)),Z[f].set(F[0]/(2*a)+.5,F[1]/(2*a)+.5)}let W=0,P=0;for(let f=0;f<24;f++)for(let k=0;k<24;k++)P++,ce(-a+(k+.5)*.5,-a+(f+.5)*.5,x,u,g)<=0&&W++;return h.fold=W/P,T};return{update(x,u,g){const T=Ne(e,"causClock",g,"run"),W=e.params,P=W.num("amp",1.25),f=W.num("depth",3);o.uT.value=T.t,o.uAmp.value=P,o.uD.value=f,n.position.y=-f,w.forEach(E=>{E.scale.y=f+.12,E.position.y=(.12-f)/2});const[k]=ve(-2.5,2.2,T.t,P);j.position.set(-2.5,k+.12,2.2);const F=T.t*.08;r.position.set(Math.sin(F)*11,10.5,Math.cos(F)*11),r.lookAt(0,-f*.5,0),J=s==="real"&&ee%8===0;const _=(f*(1-1/X)).toFixed(2);if(s==="none")e.hud(`바닥 햇빛 = 평평한 물과 같음 (밝기 1.00 균일)
수심 ${f.toFixed(1)} m · 파도 진폭 ×${P.toFixed(2)}`);else if(s==="fake")e.hud(`스크롤 보로노이 2겹 · 파도와 무관
수심을 바꿔도 무늬가 그대로 (평균 밝기 ≈ 1)`);else if(!h.ok)e.hud("측정 준비 중…");else{const E=[10,32,50];let L=0;for(let b=1;b<m;b++)h.theo[b]>h.theo[L]&&h.theo[b]<30&&(L=b);const he=E.map(b=>`x=${h.x[b].toFixed(1)} 측정 ${S(h.meas[b])} / 이론 1/|J| ${S(h.theo[b])}`);e.hud([`밝기 = 1/|J|, J≈1 + ${_}·∇²h (수심 ${f.toFixed(1)} m)`,...he,`최대점 측정 ${S(h.meas[L])} / 이론 ${S(h.theo[L])} · 접힘 ${(h.fold*100).toFixed(0)}%`].join(`
`))}J&&ue(T.t,P,f)},render(){if(ee++,s==="real"){if(t.setRenderTarget(l),t.setClearColor(0,1),t.clear(),t.render(Y,fe),J){Q.render(t,A.rt);const x=A.read(t);for(let u=0;u<m;u++)h.meas[u]=x[u*4];h.ok=!0}t.setClearColor(10274012,1)}t.setRenderTarget(null),t.render(i,r)},dispose(){l.dispose(),A.dispose(),Q.dispose(),O.material.dispose(),K.dispose()}}})}function Be(s){return ze(s,()=>({draw(e,i,r){_e(e,i,r);const t=s.shared.get("caus-probe"),o={x:34,y:24,w:ae(i-46,20),h:ae(r-56,20)};let l=2;if(t!=null&&t.ok)for(let n=0;n<m;n++)l=Math.max(l,Math.min(8,t.theo[n]),Math.min(8,t.meas[n]));l=Math.ceil(l*1.1);const v=n=>o.x+(n+a)/(2*a)*o.w,d=n=>o.y+o.h-Ae(n,0,l)/l*o.h;e.strokeStyle="#1c2230",e.strokeRect(o.x+.5,o.y+.5,o.w,o.h);for(let n=1;n<l;n++)e.beginPath(),e.moveTo(o.x,d(n)+.5),e.lineTo(o.x+o.w,d(n)+.5),e.stroke(),$(e,String(n),o.x-3,d(n)+3,"#7d8799",9,"right");if(e.strokeStyle="#4b5563",e.setLineDash([4,4]),e.beginPath(),e.moveTo(o.x,d(1)),e.lineTo(o.x+o.w,d(1)),e.stroke(),e.setLineDash([]),t!=null&&t.ok){e.strokeStyle="#ffffff",e.lineWidth=1.4,e.beginPath();for(let c=0;c<m;c++)c?e.lineTo(v(t.x[c]),d(t.theo[c])):e.moveTo(v(t.x[c]),d(t.theo[c]));e.stroke(),e.lineWidth=1;for(let c=0;c<m;c++)e.fillStyle="#38d9d9",e.beginPath(),e.arc(v(t.x[c]),d(t.meas[c]),2.6,0,Math.PI*2),e.fill();let n=0,w=0,M=0,p=0;for(let c=0;c<m;c++)t.theo[c]>8||(n+=t.meas[c],w+=t.theo[c],p+=Math.abs(t.meas[c]-t.theo[c])/t.theo[c],M++);$(e,`평균 측정 ${S(n/Math.max(1,M))} / 이론 ${S(w/Math.max(1,M))} · 평균 상대오차 ${(p/Math.max(1,M)*100).toFixed(1)}%`,o.x+o.w,o.y+12,"#c8d0dc",9,"right")}$(e,`바닥 밝기 배율 (수면 직선 z=${V} → 바닥 착지 x)`,o.x,14,"#c8d0dc",10),$(e,`−${a} m`,o.x,o.y+o.h+11,"#7d8799",9),$(e,`+${a} m`,o.x+o.w,o.y+o.h+11,"#7d8799",9,"right"),Ee(e,[{label:"이론 1/|J|",color:"#ffffff"},{label:"GPU 커스틱 텍스처",color:"#38d9d9"},{label:"평평한 물 = 1",color:"#4b5563"}],o.x,r-4,9),s.hud("")}}))}const at={layout:"variants",intro:'<b>커스틱</b>은 물결 진 수면이 볼록 렌즈·오목 렌즈처럼 햇빛을 모으고 흩어, 바닥에 <b>일렁이는 밝은 그물 무늬</b>를 만드는 현상입니다. 화면에 물이 "있다"는 것을 수면이 아니라 바닥의 빛으로 알려 주기 때문에 수영장·얕은 바다·수중 동굴 연출의 핵심 재료입니다. 여기서는 커스틱 없음 / 흔한 스크롤 텍스처 가짜 / 실제 굴절로 계산한 커스틱을 같은 수영장, 같은 파도로 비교합니다.',how:["수면 높이를 파도 5개의 합 <code>h(x,z,t) = Σ Aᵢ sin(kᵢ·p − ωᵢt + φᵢ)</code>로 두고, 미분으로 법선 n을 얻는다 (ω = √(g·k), 심해파 분산).","수면을 200×200 격자로 나누고, 정점 셰이더에서 햇빛 L을 <code>refract(L, n, 1/1.333)</code>로 꺾어 바닥 y = −D에 닿는 점 X로 정점을 옮긴다. 화면 대신 바닥 좌표계(512² 텍스처)에 그린다.","조각 셰이더: 같은 삼각형의 원래 넓이와 옮겨진 넓이를 <code>dFdx/dFdy</code> 행렬식으로 구해 <code>밝기 = 원래 넓이 / 새 넓이 = 1/|J|</code>를 가산 혼합. 빛이 모이면(넓이 ↓) 밝고, 퍼지면 어둡다. 빛 에너지는 보존되어 평균은 1.",'얕은 파도에서는 <code>J ≈ 1 + D(1 − 1/n)·∇²h</code> – 봉우리 아래는 ∇²h < 0이라 J < 1(빛이 모여 밝음)이다. 수심 D가 깊을수록, 곡률이 클수록 초점이 바닥에 가까워져 선이 날카로워진다. J가 0을 지나면 "접힘"이 생겨 여러 삼각형이 겹쳐 더해진다.',"바닥 셰이더는 커스틱 텍스처 값을 햇빛 항에 곱하고, 물속 흡수(빨강부터 감쇠)를 더한다. 가짜 방식은 보로노이 경계 무늬 2겹을 서로 다른 방향으로 흘려 min으로 합친다.","HUD 측정: 수면 직선 위 64점이 떨어지는 바닥 위치에서 커스틱 텍스처를 64×1 실수 타깃으로 읽는다. 이론 = CPU가 같은 파도로 착지점을 계산하고 수치 미분으로 구한 1/|J|."],pros:["파도와 무늬가 정확히 연동된다 – 파도가 커지거나 수심이 바뀌면 무늬의 날카로움·크기가 저절로 맞게 변한다.","격자 하나를 그리는 패스 한 번(정점 4만 개)이라 생각보다 싸고, 텍스처 해상도로 품질·비용을 조절하기 쉽다.","빛 에너지가 보존되므로 바닥 평균 밝기가 유지되어, 켜고 꺼도 전체 노출이 흔들리지 않는다."],cons:["바닥이 평면이라는 가정 – 계단·물체 위 커스틱은 높이맵이나 다른 투사가 필요하다.","격자보다 작은 파도는 표현 못 하고, 접힘 근처 선은 격자 해상도만큼 뭉개진다.","가짜 텍스처는 훨씬 싸고 예술적으로 조절하기 쉬워, 실제로는 원거리·모바일에서 가짜를 많이 쓴다."],usedIn:"〈서브노티카〉의 얕은 바다, 〈크라이시스〉의 물가(대부분의 게임은 미리 만든 커스틱 텍스처를 흘리는 방식), Evan Wallace의 WebGL Water 데모(이 페이지의 격자 투사 방식), 각종 수영장·아쿠아리움 장면.",tips:["선이 가장 날카로운 수심은 J = 0, 즉 D ≈ 1/((1 − 1/n)·|∇²h|) ≈ 4/|∇²h|다. 이보다 깊으면 접힘이 늘어 무늬가 잘게 부서지고 흐려진다.","커스틱 텍스처는 반정밀도 실수(half float)로 만든다. 8비트는 가산 혼합된 밝은 선(수~수십 배)이 1에서 잘려 버린다. 이 페이지는 40배에서 자른다.","가짜 방식을 쓸 때는 무늬 2겹을 서로 다른 방향·속도로 흘리고, 수심에 따라 크기·선명도를 바꾸며, RGB를 살짝 어긋나게 읽어 색 분산을 흉내 내면 훨씬 그럴듯하다.","물속 벽·물체에도 무늬를 입히려면 바닥 좌표 대신 빛 방향으로 투영한 좌표(라이트 쿠키처럼)로 커스틱 텍스처를 읽는다."],related:["underwater","stylized-water","light-cookie","wet-surface","heat-haze"],controls:[{type:"range",key:"amp",label:"파도 진폭 배율 (배)",min:.2,max:2,step:.05,value:1.25},{type:"range",key:"depth",label:"수심 D (m)",min:.5,max:5,step:.1,value:3},{type:"toggle",key:"run",label:"파도 움직임",value:!0}],viewers:[{title:"커스틱 없음",kind:"before",caption:"수면은 반짝이지만 바닥 햇빛이 균일해, 물이 아니라 투명한 유리판 아래 같습니다.",mount:U("none")},{title:"스크롤 텍스처 (가짜)",kind:"variant",caption:"보로노이 무늬 2겹을 흘려 그럴듯한 그물을 만들었지만, 수면 파도와 따로 놀고 수심을 바꿔도 변하지 않습니다.",mount:U("fake")},{title:"굴절 계산 커스틱",kind:"after",caption:"수면 격자를 굴절시켜 바닥에 투사하고 넓이 비로 밝기를 정했습니다. 파도 봉우리 아래에 빛이 모이고, 수심이 깊을수록 선이 날카롭습니다.",mount:U("real")},{title:"밝기 1/|J| 프로파일",kind:"info",caption:"수면 한 줄이 바닥에 떨어진 곳의 밝기. 흰 선 = CPU 1/|J|, 점 = GPU 커스틱 텍스처. 수심을 늘려 J가 0에 가까워지면 봉우리가 급격히 솟고, 접힘이 생기면 겹친 빛이 더해져 이론(단일 원상)보다 커집니다.",mount:Be}]};export{at as default};
