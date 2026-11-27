import{V as R,K as de,H as ve,u as he,i as pe,M as T,y as fe,g as q,G as ee,C as E,a as me,c as te,T as xe,ac as ae,S as ge,D as ye,ag as we,b as Me,h as be}from"./three.module-CEzfHhrp.js";import{m as Te}from"./three-viewer-fx7lDL-0.js";import{m as Ae,s as ze,a as He}from"./canvas-viewer-QtaWfmlz.js";import{c as Fe,l as Re}from"./chart2d-DfgeckAJ.js";import{P as $e,a as G,f as Pe}from"./extra-kit-c-FPjCbN4U.js";import{P as We,H as oe,o as Ve,s as Ge,a as se,c as ie,d as ne}from"./shader-kit-a-CYybgKL4.js";const F=2.2,A=8,$=128,N=F*1.7,S=.35,C=new R(0,.95,0),O=`
uniform float uR, uV, uTau, uA0, uW;
float rippleAt(vec3 n, vec4 hit, float now) {
  float age = now - hit.w;
  if (hit.w < -0.5 || age < 0.0) return 0.0;
  float d = uR * acos(clamp(dot(n, hit.xyz), -1.0, 1.0));
  float r = uV * age;
  float A = uA0 * exp(-age / uTau);
  float x = (d - r) / uW;
  return A * exp(-x * x);
}`,Se=`
// 2D 육각 격자: x = 중심에서의 육각 거리(0 중심 ~ 0.5 테두리), yz = 셀 id
vec3 hex2(vec2 p) {
  const vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  vec2 gv = dot(a, a) < dot(b, b) ? a : b;
  vec2 q = abs(gv);
  float hd = max(dot(q, vec2(0.5, 0.8660254)), q.x);
  return vec3(hd, p - gv);
}
float hh2(vec2 c) { return fract(sin(dot(c, vec2(127.1, 311.7))) * 43758.5453); }`,Ce=`
uniform vec4 uHits[${A}];
uniform float uTime, uMode;
${O}
varying vec3 vWp;
varying vec3 vNo;
varying float vRip;
void main() {
  vec3 n = normalize(position);
  float rip = 0.0;
  if (uMode > 1.5) for (int i = 0; i < ${A}; i++) rip += rippleAt(n, uHits[i], uTime);
  vRip = rip;
  vNo = n;
  vec3 p = position + n * 0.1 * rip;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Ne=`
uniform vec4 uHits[${A}];
uniform float uTime, uMode, uFlash;
uniform vec3 uCol;
${O}
${Se}
varying vec3 vWp;
varying vec3 vNo;
varying float vRip;
void main() {
  vec3 n = normalize(vNo);
  vec3 v = normalize(cameraPosition - vWp);
  float fres = pow(1.0 - abs(dot(n, v)), 3.0);
  // 삼면 투영 육각 무늬
  vec3 w = pow(abs(n), vec3(4.0));
  w /= (w.x + w.y + w.z);
  float sc = 3.2;
  vec3 hx = hex2(vWp.zy * sc), hy = hex2(vWp.xz * sc), hz = hex2(vWp.xy * sc);
  float edge = w.x * smoothstep(0.42, 0.48, hx.x) + w.y * smoothstep(0.42, 0.48, hy.x) + w.z * smoothstep(0.42, 0.48, hz.x);
  float cid = w.x * hh2(hx.yz) + w.y * hh2(hy.yz) + w.z * hh2(hz.yz);
  float rip = 0.0, spot = 0.0;
  if (uMode > 1.5) {
    for (int i = 0; i < ${A}; i++) {
      rip += rippleAt(n, uHits[i], uTime);
      vec4 h = uHits[i];
      float age = uTime - h.w;
      if (h.w > -0.5 && age >= 0.0) {
        float d = uR * acos(clamp(dot(n, h.xyz), -1.0, 1.0));
        spot += exp(-age / (uTau * 0.35)) * exp(-d * d * 18.0);
      }
    }
  }
  float base = 0.04 + 0.7 * fres + edge * (0.08 + 0.22 * fres);
  vec3 col = uCol * base;
  if (uMode > 0.5 && uMode < 1.5) col += uCol * uFlash * (0.5 + 0.8 * edge + fres);
  if (uMode > 1.5) {
    col += vec3(0.55, 0.9, 1.0) * rip * 1.4 + uCol * rip * (6.0 * edge + 1.6 * step(0.55, cid));
    col += vec3(1.0, 0.95, 0.85) * spot * 1.6;
  }
  if (!gl_FrontFacing) col *= 0.45;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,ke=`
uniform vec4 uHit;
uniform vec3 uTan;
uniform float uTime;
${O}
varying vec2 vUv;
void main() {
  float d = (floor(vUv.x * ${$}.0) / ${$-1}.0) * ${N.toFixed(4)};
  float ang = d / uR;
  vec3 n = cos(ang) * uHit.xyz + sin(ang) * uTan;
  float v = clamp(rippleAt(n, uHit, uTime), 0.0, 1.0) * 65535.0;
  float hi = floor(v / 256.0);
  gl_FragColor = vec4(hi / 255.0, (v - hi * 256.0) / 255.0, 0.0, 1.0);
}`,Le=(s,o)=>ze(s.shared,"shieldWorld",o,()=>({t:0,shots:[],next:.6,fire:!1,rnd:He(9),n:0}),(e,v)=>{e.t+=v;const n=s.params.bool("auto",!0);if(e.fire||n&&e.t>=e.next){e.fire=!1,e.next=e.t+1.9;const b=(e.rnd()-.5)*2.4,x=.2+e.rnd()*.95;e.shots.push({dir:new R(Math.cos(x)*Math.sin(b),Math.sin(x),Math.cos(x)*Math.cos(b)),t0:e.t}),e.n++,e.shots.length>A&&e.shots.shift()}});function B(s){return o=>Te(o,{antialias:!0,orbit:!1,fov:40,cam:[0,3,7.5],target:[C.x,C.y,C.z],far:80,background:658710},({scene:e,camera:v,renderer:n})=>{e.fog=new de(658710,12,30),e.add(new ve(9085183,1709072,.8));const b=new he(16769728,1.6);b.position.set(4,7,3),e.add(b);const x=new pe(5618687,0,6,2);x.position.set(0,1.2,0),e.add(x);const h=new T(new fe(18,64),new q({color:2762272,roughness:.95}));h.rotation.x=-Math.PI/2,e.add(h);const g=new q({color:5922928,roughness:.6,metalness:.3}),y=new q({color:3159102,roughness:.7}),w=new ee({color:new E(.4,1.4,2)}),k=(p,l,M,f,r,c)=>{const u=new T(new be(p,l,M),c);u.position.set(f,l/2,r),e.add(u)};k(1.1,.7,.8,-.6,-.4,g),k(.6,.45,.6,.75,.2,y),k(.4,.3,.4,.2,.75,g);const X=new T(new me(.14,.2,1.5,16),y);X.position.set(.35,.75,-.6),e.add(X);const L=new T(new te(.13,20,14),w);L.position.set(.35,1.58,-.6),e.add(L);const _=new T(new xe(F,.05,8,128),w);_.rotation.x=Math.PI/2,_.position.y=.02,e.add(_);const a={uHits:{value:Array.from({length:A},()=>new ae(0,1,0,-1))},uTime:{value:0},uMode:{value:s==="static"?0:s==="flash"?1:2},uFlash:{value:0},uR:{value:F},uV:{value:1.6},uTau:{value:.8},uA0:{value:1},uW:{value:.18},uCol:{value:new E(.25,.65,1)}},j=new T(new te(F,128,64,0,Math.PI*2,0,Math.PI/2),new ge({vertexShader:Ce,fragmentShader:Ne,uniforms:a,transparent:!0,depthWrite:!1,blending:we,side:ye}));j.renderOrder=2,e.add(j);const re=new ee({color:new E(2,.9,.3)}),P=[];for(let p=0;p<3;p++){const l=new T(new Me(.05,.4,4,8),re);l.visible=!1,e.add(l),P.push(l)}const W=new $e(ke,{uHit:{value:new ae},uTan:{value:new R},uTime:{value:0},uR:a.uR,uV:a.uV,uTau:a.uTau,uA0:a.uA0,uW:a.uW}),I=new We($,1,!1),t=o.shared.get("shield-meas")??{rHist:new oe(80),aHist:new oe(80),age:NaN,rMe:NaN,aMe:NaN,hitT:-1,v:1.6,tau:.8,a0:1};s==="ripple"&&o.shared.set("shield-meas",t);let le=0;const K=new R(0,1,0),z=new R,ue=p=>{let l=null;for(const i of p.shots)p.t>=i.t0+S&&(l=i);if(!l)return;const M=l.t0+S;M!==t.hitT&&(t.hitT=M,t.rHist.clear(),t.aHist.clear());const f=p.t-M;if(a.uV.value*f>N*.92)return;W.u.uHit.value.set(l.dir.x,l.dir.y,l.dir.z,M),z.crossVectors(K,l.dir),z.lengthSq()<1e-6&&z.set(1,0,0),z.normalize(),W.u.uTan.value.copy(z),W.u.uTime.value=p.t,W.render(n,I.rt);const r=I.read(n);n.setRenderTarget(null);let c=0,u=-1;const H=i=>(r[i*4]*256+r[i*4+1])/65535;for(let i=0;i<$;i++){const m=H(i);m>u&&(u=m,c=i)}let V=0;if(c>0&&c<$-1){const i=H(c-1),m=H(c+1),d=i-2*u+m;Math.abs(d)>1e-9&&(V=Math.max(-.5,Math.min(.5,.5*(i-m)/d)))}t.age=f,t.rMe=(c+V)/($-1)*N,t.aMe=u,t.v=a.uV.value,t.tau=a.uTau.value,t.a0=a.uA0.value,t.rHist.push(f,t.rMe),t.aHist.push(f,t.aMe)};return{update(p,l,M){const f=o.params,r=Le(o,M);Ve(v,C,.45*Math.sin(r.t*.11),.3,7.6),a.uTime.value=r.t,a.uV.value=f.num("v",1.6),a.uTau.value=f.num("tau",.8),a.uW.value=f.num("width",.18);let c=0,u=0;for(let m=0;m<A;m++){const d=r.shots[m],Y=a.uHits.value[m];if(!d){Y.set(0,1,0,-1);continue}const J=d.t0+S,D=r.t-J;if(Y.set(d.dir.x,d.dir.y,d.dir.z,D>=0?J:-1),D>=0)c+=Math.exp(-D/a.uTau.value);else if(u<P.length){const ce=(r.t-d.t0)/S,Q=z.copy(d.dir).multiplyScalar(F*4.2).add(new R(1.5,1.2,0)),Z=d.dir.clone().multiplyScalar(F),U=P[u++];U.visible=!0,U.position.copy(Q).lerp(Z,ce),U.quaternion.setFromUnitVectors(K,Z.clone().sub(Q).normalize())}}for(;u<P.length;u++)P[u].visible=!1;a.uFlash.value=s==="flash"?Math.min(1.5,c)*a.uA0.value:0,x.intensity=s==="static"?0:3*Math.min(1.5,c),L.scale.setScalar(1+.25*Math.sin(r.t*5)),s==="ripple"&&le++%4===0&&ue(r);const H=r.shots.length?r.shots[r.shots.length-1]:null,V=H?r.t-H.t0-S:NaN,i=[s==="static"?"고정 보호막 (피격 반응 없음)":s==="flash"?`전체 번쩍임 Σ A₀e^(−t/τ) = ${G(a.uFlash.value)}`:`파문 v ${Pe(a.uV.value)} · τ ${G(a.uTau.value)} · 최근 피격 ${V>=0?G(V)+"s":"--"}`];s==="ripple"&&Number.isFinite(t.rMe)&&(i.push(`반지름 측정 ${G(t.rMe)} / 이론 v·t ${G(t.v*t.age)}`),i.push(`진폭 측정 ${t.aMe.toFixed(3)} / 이론 ${(t.a0*Math.exp(-t.age/t.tau)).toFixed(3)}`)),o.hud(i.join(`
`))},dispose(){W.dispose(),I.dispose()}}})}function _e(s){return Ae(s,()=>({draw(o,e,v){Fe(o,e,v);const n=s.shared.get("shield-meas");if(!n)return;const[b,x]=Ge(e,v),h=Math.max(1,Math.min(N/n.v,3.5*n.tau,4)),g={...b,x0:0,x1:h,y0:0,y1:Math.ceil(n.v*h)};se(o,g,"파문 반지름 r (측지 거리)","피격 후 t (s)",[0,+(h/2).toFixed(1),+h.toFixed(1)],[0,g.y1/2,g.y1]),ie(o,g,w=>n.v*w,"#c8d0dc"),ne(o,g,n.rHist.data,"#38d9d9",2.4);const y={...x,x0:0,x1:h,y0:0,y1:Math.max(.2,n.a0)};se(o,y,"파문 진폭 A","피격 후 t (s)",[0,+(h/2).toFixed(1),+h.toFixed(1)],[0,y.y1/2,y.y1],w=>w.toFixed(1)),ie(o,y,w=>n.a0*Math.exp(-w/n.tau),"#c8d0dc"),ne(o,y,n.aHist.data,"#ff9a3c",2.4),Re(o,[{label:"이론 v·t, A₀e^(−t/τ)",color:"#c8d0dc"},{label:"측정 r",color:"#38d9d9"},{label:"측정 A",color:"#ff9a3c"}],8,v-4,9),s.hud("")}}))}const Oe={layout:"compare",intro:'보호막이 총알을 막았다는 사실은 숫자보다 <b>표면 반응</b>으로 전해야 합니다. 맞은 점에서 <b>파문 고리</b>가 일정한 속도로 퍼지고 점점 약해지며, 고리가 지나가는 자리의 <b>육각 무늬</b>가 빛나면 "어디에 맞았고 막아냈다"가 한눈에 읽힙니다. 같은 사격을 고정 보호막 / 전체 번쩍임 / 파문 + 육각 강조로 비교합니다.',how:["맞은 점마다 (방향 h, 맞은 시각 t₀)를 유니폼 배열(최대 8개)에 넣는다. 셰이더는 각 픽셀의 단위 법선 n에서 측지 거리 <code>d = R·acos(n·h)</code>를 구한다.","고리: <code>r = v·t</code>, 진폭 <code>A = A₀e^(−t/τ)</code>, 세기 <code>A·exp(−((d − r)/w)²)</code>. 여러 피격은 그냥 더한다(가산 블렌딩과 잘 맞음).","육각 무늬는 월드 좌표를 세 평면(yz, xz, xy)에 투영한 2D 육각 격자를 법선 가중치로 섞는 삼면 투영. 파문 세기를 칸 테두리에 6배, 무작위로 고른 절반쯤의 칸 안쪽에 1.6배로 곱해 고리가 지나는 칸이 켜진다. 맞은 점에는 더 빨리(0.35τ) 사라지는 흰 섬광을 얹는다.","정점 셰이더도 같은 파문 함수로 표면을 법선 방향으로 0.1·I 만큼 밀어, 고리가 실제로 부풀어 지나가는 실루엣이 생긴다.","측정: 같은 GLSL 함수를 최근 피격점에서 뻗은 대원(측지선) 위 128점에 대해 GPU로 평가해 읽고, 최댓값 위치와 값을 v·t, A₀e^(−t/τ)와 비교한다."],pros:['맞은 위치·방향이 정확히 보여 "어느 쪽에서 쏘는지" 정보가 된다.',"유니폼 배열 + 덧셈이라 동시 피격 여러 개도 셰이더 한 번으로 처리.","측지 거리를 쓰면 곡면 위에서도 고리가 고르게 퍼진다(화면·UV 거리와 다름)."],cons:["배열 크기만큼만 동시 파문을 기억한다(오래된 것부터 버림).","모든 픽셀이 피격 수만큼 acos·exp를 계산 → 큰 보호막이 화면을 덮으면 비용이 커진다.","구가 아닌 임의 메시는 측지 거리를 이렇게 간단히 구할 수 없어 월드 거리로 근사해야 한다."],usedIn:"〈헤일로〉 시리즈의 에너지 실드 피격, 〈오버워치〉 라인하르트 방벽·윈스턴 보호막처럼 피격 지점에서 퍼지는 파문과 육각 무늬 강조는 SF 보호막 연출에서 널리 쓰이는 방식입니다. 실제 셰이더 구현은 게임마다 다릅니다.",tips:["고리가 보호막 반대편까지 가는 시간(πR/v)보다 감쇠 τ를 짧게 둔다. 여기선 R 2.2m, v 1.6m/s면 약 4.3초인데 τ 0.8초라 맞은 쪽 근처에서 사라져 위치가 또렷하다.","고리 폭 w는 반지름의 5~10%가 읽기 좋다. 너무 얇으면 육각 칸보다 가늘어져 깜빡이고, 너무 넓으면 전체 번쩍임과 구분이 안 된다.","배열이 꽉 차면 가장 오래된 피격을 덮어쓴다. 연사 무기는 가까운 피격을 하나로 합치거나 진폭만 키워 배열을 아낀다.","구가 아닌 방벽(평면·원통)은 측지 거리 대신 월드 거리 |p − h|로 근사해도 반지름이 작을 때는 차이가 거의 없다."],related:["hologram","hit-flash","shockwave","damage-direction","telegraph"],controls:[{type:"range",key:"v",label:"파문 속도 v (m/s)",min:.5,max:3,step:.1,value:1.6},{type:"range",key:"tau",label:"감쇠 시간 τ (초)",min:.2,max:2,step:.05,value:.8},{type:"range",key:"width",label:"고리 폭 w (m)",min:.05,max:.5,step:.01,value:.18},{type:"toggle",key:"auto",label:"자동 사격",value:!0},{type:"button",key:"fire",label:"한 발 쏘기"}],setup(s,o){return s.on(e=>{if(e!=="fire")return;const v=o.get("shieldWorld");v&&(v.s.fire=!0)})},viewers:[{title:"고정 보호막",kind:"before",caption:"프레넬과 육각 무늬만 있는 반구입니다. 총알이 맞아도 아무 변화가 없어 막았는지, 어디에 맞았는지 알 수 없습니다.",mount:B("static")},{title:"전체 번쩍임",kind:"variant",caption:"피격마다 보호막 전체가 A₀e^(−t/τ)로 밝아졌다가 사라집니다. 맞은 건 알지만 위치·방향 정보가 없습니다.",mount:B("flash")},{title:"파문 + 육각 강조",kind:"after",caption:"맞은 점에서 고리가 v·t로 퍼지며 약해지고, 고리가 지나는 칸의 육각 선이 켜집니다. 표면도 살짝 부풀어 지나갑니다.",mount:B("ripple")},{title:"파문 반지름 · 진폭 측정",kind:"info",caption:"가장 최근 피격의 파문을 측지선 128점에서 GPU로 평가해 읽은 최댓값 위치(왼쪽)와 값(오른쪽). 선은 v·t와 A₀e^(−t/τ).",mount:_e}]};export{Oe as default};
