import{p as rt,g as C,u as tt,aq as xt,M as _,C as et,ar as yt,S as ot,w as nt,k as gt,ae as wt,a3 as bt,a4 as D}from"./three.module-BZgG6AUv.js";import{m as St}from"./three-viewer-0rZIEDzf.js";import{a as Mt}from"./canvas-viewer-Btf0JXdr.js";const E=[{c:[0,3.35,0],r:[1.05,.85,1.05]},{c:[-1,2.65,.25],r:[.85,.7,.85]},{c:[.95,2.75,-.2],r:[.9,.72,.9]},{c:[.15,2.45,.95],r:[.8,.62,.8]},{c:[-.15,2.55,-.95],r:[.8,.62,.8]},{c:[2.15,.48,1.25],r:[.72,.5,.72]},{c:[-1.95,.4,1.35],r:[.58,.42,.58]}],U=E.length,st=`
uniform vec3 cC[${U}]; uniform vec3 cR[${U}];
float pathLen(vec3 o, vec3 d){
  float s = 0.;
  for (int i = 0; i < ${U}; i++){
    vec3 oo = (o - cC[i]) / cR[i], dd = d / cR[i];
    float a = dot(dd, dd), b = dot(oo, dd), c = dot(oo, oo) - 1.;
    float disc = b * b - a * c;
    if (disc > 0.){
      float q = sqrt(disc);
      float t0 = (-b - q) / a, t1 = (-b + q) / a;
      s += max(0., t1 - max(t0, 0.));
    }
  }
  return s;
}`,zt=`
attribute vec3 aProxyN; attribute vec4 aInfo; attribute vec3 aCenter;
uniform float uTime; uniform float wind; uniform vec3 L; uniform float selfShadow;
varying vec3 vCardN; varying vec3 vProxyN; varying vec3 vW; varying vec2 vUv; varying float vDepth; varying float vShadow; varying float vRand;
${st}
void main(){
  vec3 p = position;
  float depth = aInfo.x, rnd = aInfo.y, ci = aInfo.z, ph = aInfo.w;
  // 바람: 덩어리 단위로 느리게 흔들리고(높을수록 크게), 카드마다 빠르게 파르르
  float h = clamp(aCenter.y / 3.4, .25, 1.);
  vec3 W = normalize(vec3(1., 0., .35));
  float sway = sin(uTime * 1.25 + ci * 1.9) * .7 + sin(uTime * 2.1 + ci * 3.1) * .3;
  p += W * sway * .07 * wind * h;
  p.y += sin(uTime * 1.6 + ci * 2.3) * .02 * wind;
  p += normal * sin(uTime * 7. + ph) * .035 * wind;
  vCardN = normalize(mat3(modelMatrix) * normal);
  vProxyN = normalize(mat3(modelMatrix) * aProxyN);
  vec4 w = modelMatrix * vec4(p, 1.);
  vW = w.xyz;
  vUv = uv; vDepth = depth; vRand = rnd;
  // 자기 그림자: 원래 위치에서 태양 쪽으로 덩어리들을 통과하는 길이 (정점 단위라 싸다)
  vShadow = selfShadow > .5 ? exp(-1.25 * pathLen((modelMatrix * vec4(position, 1.)).xyz, L)) : 1.;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Nt=`
uniform sampler2D leafTex; uniform vec3 L; uniform vec3 camP;
uniform float mode; uniform float k; uniform float steps;
uniform vec3 cShadow; uniform vec3 cMid; uniform vec3 cLit; uniform vec3 cTrans; uniform vec3 cCool;
varying vec3 vCardN; varying vec3 vProxyN; varying vec3 vW; varying vec2 vUv; varying float vDepth; varying float vShadow; varying float vRand;
void main(){
  vec4 tx = texture2D(leafTex, vUv);
  vec3 V = normalize(camP - vW);
  vec3 Nc = normalize(vCardN) * (gl_FrontFacing ? 1. : -1.);
  vec3 Np = normalize(vProxyN);
  float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715))));
  bool full = mode > 1.5 && mode < 2.5;
  if (full){
    // 시선과 거의 나란한(옆으로 선) 카드는 디더로 녹여 "판때기" 티를 없애고, 잎 가장자리도 디더로 부드럽게
    float edgeOn = 1. - smoothstep(.06, .32, abs(dot(Nc, V)));
    if (tx.a < .5 + (ign - .5) * .35 || edgeOn > ign + .001) discard;
  } else if (tx.a < .5) discard;
  vec3 N = normalize(mix(Nc, Np, k));
  if (mode > 2.5){
    // 디버그: 법선을 RGB로 (x,y,z → r,g,b)
    gl_FragColor = vec4(N * .5 + .5, 1.);
    return;
  }
  // 살짝 감싼 램버트 (그늘 경계를 N·L = 0보다 조금 뒤로)
  float d = clamp((dot(N, L) + .3) / 1.3, 0., 1.);
  float ao = 1.;
  if (full){
    ao = mix(.75, 1., smoothstep(.5, 1., vDepth)); // 덩어리 속 깊은 잎은 어둡게
    d *= mix(.45, 1., vShadow) * ao;
  }
  float idx = min(floor(d * steps), steps - 1.);
  float q = idx / (steps - 1.);
  vec3 col;
  if (full){
    // 색조 이동: 그늘은 푸른 청록, 빛은 노란 연두 (밝기만 바꾸지 않고 색상도 바꿈)
    col = q < .5 ? mix(cCool, cMid, q * 2.) : mix(cMid, cLit, q * 2. - 1.);
    // 역광 투과: 태양을 마주 볼 때 덩어리 가장자리·얇은 부분이 노랗게 비침
    float back = pow(max(dot(-V, L), 0.), 2.);
    float thin = 1. - abs(dot(Np, V));
    col += cTrans * back * (.06 + .94 * thin * thin * thin) * mix(.5, 1., vShadow) * 1.3;
    // 그늘 안에서도 잎이 한 덩어리로 뭉개지지 않게 깊이에 따라 아주 약하게 명도 차
    col *= .82 + .18 * smoothstep(.55, 1., vDepth);
  } else {
    col = mix(cShadow, cLit, q);
  }
  col *= .93 + vRand * .14;
  col *= mix(.8, 1., tx.r);
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,Ct=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Tt=`
uniform vec3 L; uniform vec3 albedo; uniform vec3 shade; uniform float steps; uniform float ground;
varying vec3 vN; varying vec3 vW;
${st}
void main(){
  float sh = exp(-1.6 * pathLen(vW + vN * .02, L));
  float d = clamp(dot(normalize(vN), L) * .5 + .5, 0., 1.);
  if (ground > .5) d = .75;
  d *= mix(.3, 1., sh);
  float idx = min(floor(d * steps), steps - 1.);
  vec3 col = mix(shade, albedo, idx / (steps - 1.));
  if (ground > .5) col *= 1. - .25 * smoothstep(10., 40., length(vW.xz));
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`;function kt(){const r=document.createElement("canvas");r.width=r.height=128;const t=r.getContext("2d"),i=(p,w,T,d,o)=>{t.save(),t.translate(p,w),t.rotate(T);const u=t.createLinearGradient(-o,0,o,0);u.addColorStop(0,"#d0d0d0"),u.addColorStop(.5,"#ffffff"),u.addColorStop(1,"#bcbcbc"),t.fillStyle=u,t.beginPath(),t.moveTo(0,0),t.quadraticCurveTo(o,-d*.45,0,-d),t.quadraticCurveTo(-o,-d*.45,0,0),t.fill(),t.strokeStyle="#a8a8a8",t.lineWidth=1.5,t.beginPath(),t.moveTo(0,-2),t.lineTo(0,-d*.85),t.stroke(),t.restore()},m=128*.5,g=128*.97;i(m,g,0,128*.62,128*.2);for(const p of[-1,1])i(m+p*4,g-128*.18,p*.75,128*.5,128*.17),i(m+p*3,g-128*.42,p*.55,128*.42,128*.15),i(m+p*6,g-128*.05,p*1.25,128*.4,128*.14);const l=new wt(r);return l.anisotropy=4,l}const P=4;function at(e,r){const t=Mt(7),i=[],m=[],g=[],l=[],p=[],w=[],T=[],d=[],o=[],u=[],a=[],f=new C,A=new C,h=new C,b=new C,x=new C,S=new C;E.forEach((v,z)=>{const[k,N,n]=v.c,[s,y,c]=v.r,L=Math.max(6,Math.round(e*((s+c)*.5*y)/(.95*.8)));for(let $=0;$<L;$++){const W=t()*2-1,O=t()*Math.PI*2,K=Math.sqrt(1-W*W),G=.62+.4*Math.pow(t(),.5);b.set(k+K*Math.cos(O)*s*G,N+W*y*G,n+K*Math.sin(O)*c*G);const B=t()*2-1,X=t()*Math.PI*2,Y=Math.sqrt(1-B*B);h.set(Y*Math.cos(X),B,Y*Math.sin(X)),f.set(0,1,0).cross(h),f.lengthSq()<1e-4&&f.set(1,0,0).cross(h),f.normalize(),A.crossVectors(h,f);const Z=t()*Math.PI*2,H=Math.cos(Z),J=Math.sin(Z),it=f.clone().multiplyScalar(H).addScaledVector(A,J),ct=A.clone().multiplyScalar(H).addScaledVector(f,-J),Q=r*(.8+t()*.4)*.5,V=i.length/3,lt=t(),dt=t()*6.283,ut=[[-1,-1,0,0],[1,-1,1,0],[1,1,1,1],[-1,1,0,1]];for(const[ft,vt,mt,pt]of ut){x.copy(b).addScaledVector(it,ft*Q).addScaledVector(ct,vt*Q),i.push(x.x,x.y,x.z),m.push(h.x,h.y,h.z),S.set((x.x-k)/(s*s),(x.y-N)/(y*y),(x.z-n)/(c*c)).normalize(),g.push(S.x,S.y,S.z);const ht=Math.hypot((x.x-k)/s,(x.y-N)/y,(x.z-n)/c);l.push(Math.min(1.2,ht),lt,z,dt),p.push(k,N,n),w.push(mt,pt)}T.push(V,V+1,V+2,V,V+2,V+3),d.push(b.x,b.y,b.z),o.push(h.x,h.y,h.z),S.set((b.x-k)/(s*s),(b.y-N)/(y*y),(b.z-n)/(c*c)).normalize(),u.push(S.x,S.y,S.z),a.push(z)}});const M=new bt;M.setAttribute("position",new D(i,3)),M.setAttribute("normal",new D(m,3)),M.setAttribute("aProxyN",new D(g,3)),M.setAttribute("aInfo",new D(l,4)),M.setAttribute("aCenter",new D(p,3)),M.setAttribute("uv",new D(w,2)),M.setIndex(T);const F=a.length,R=new Int32Array(F*P).fill(-1),q=new Float32Array(P);for(let v=0;v<F;v++){q.fill(1e9);for(let z=0;z<F;z++){if(z===v||a[z]!==a[v])continue;const k=(d[v*3]-d[z*3])**2+(d[v*3+1]-d[z*3+1])**2+(d[v*3+2]-d[z*3+2])**2;for(let N=0;N<P;N++)if(k<q[N]){for(let n=P-1;n>N;n--)q[n]=q[n-1],R[v*P+n]=R[v*P+n-1];q[N]=k,R[v*P+N]=z;break}}}return{geo:M,n:F,center:new Float32Array(d),cardN:new Float32Array(o),proxyN:new Float32Array(u),nb:R}}function j(e,r,t,i,m){const g=e.n,l=new Float32Array(g*3),p=new Int8Array(g);for(let o=0;o<g;o++){let u=e.cardN[o*3],a=e.cardN[o*3+1],f=e.cardN[o*3+2];u*(i.x-e.center[o*3])+a*(i.y-e.center[o*3+1])+f*(i.z-e.center[o*3+2])<0&&(u=-u,a=-a,f=-f);let h=u+(e.proxyN[o*3]-u)*r,b=a+(e.proxyN[o*3+1]-a)*r,x=f+(e.proxyN[o*3+2]-f)*r;const S=Math.hypot(h,b,x)||1;h/=S,b/=S,x/=S,l[o*3]=h,l[o*3+1]=b,l[o*3+2]=x;const M=Math.min(1,Math.max(0,(h*t.x+b*t.y+x*t.z+.3)/1.3));p[o]=Math.min(m-1,Math.floor(M*m))}let w=0,T=0,d=0;for(let o=0;o<g;o++)for(let u=0;u<P;u++){const a=e.nb[o*P+u];if(a<0)continue;const f=l[o*3]*l[a*3]+l[o*3+1]*l[a*3+1]+l[o*3+2]*l[a*3+2];w+=Math.acos(Math.min(1,Math.max(-1,f))),p[o]!==p[a]&&T++,d++}return{dev:w/Math.max(1,d)*180/Math.PI,mis:T/Math.max(1,d)*100}}function Lt(e,r){const t=(e.params.num("sunAz",40)+(e.params.bool("sunSpin",!0)?r*22:0))*Math.PI/180,i=e.params.num("sunEl",35)*Math.PI/180;return new C(Math.cos(t)*Math.cos(i),Math.sin(i),Math.sin(t)*Math.cos(i))}const I=e=>new rt(e);function Pt(e,r){return St(e,{antialias:!0,cam:[4.3,3.1,5.4],target:[0,2,.3]},({scene:t,camera:i,renderer:m})=>{t.background=new rt(13624562);const g=kt(),l=E.map(n=>new C(...n.c)),p=E.map(n=>new C(...n.r)),w=new C,T={value:3},d={card:0,proxy:1,full:2,info:3}[r],o={leafTex:{value:g},L:{value:w},camP:{value:new C},uTime:{value:0},wind:{value:.6},selfShadow:{value:r==="full"?1:0},mode:{value:d},k:{value:r==="card"?0:1},steps:T,cShadow:{value:I(2837818)},cMid:{value:I(6069829)},cLit:{value:I(r==="full"?13623930:10935402)},cTrans:{value:I(15265904)},cCool:{value:I(2973286)},cC:{value:l},cR:{value:p}},u=new tt({uniforms:o,vertexShader:zt,fragmentShader:Nt,side:xt});let a=at(e.params.num("density",110),e.params.num("size",.7));const f=new _(a.geo,u);f.frustumCulled=!1,t.add(f);const A=(n,s,y)=>new tt({uniforms:{L:{value:w},albedo:{value:I(n)},shade:{value:I(s)},steps:T,ground:{value:y?1:0},cC:{value:l},cR:{value:p}},vertexShader:Ct,fragmentShader:Tt}),h=A(9067067,4861474,!1),b=new _(new et(.12,.24,2.6,10).translate(0,1.3,0),h);t.add(b);for(let n=1;n<5;n++){const s=new C(0,1.9,0),y=l[n].clone().lerp(s,.25),c=s.distanceTo(y),L=new _(new et(.04,.09,c,6).translate(0,c/2,0),h);L.position.copy(s),L.quaternion.setFromUnitVectors(new C(0,1,0),y.clone().sub(s).normalize()),t.add(L)}const x=new _(new yt(40,48),A(12900750,8297074,!0));x.rotation.x=-Math.PI/2,t.add(x);const S=new _(new ot(.28,16,12),new nt({color:16773536}));t.add(S);const M=[];if(r==="info"){const n=new nt({color:16777215,wireframe:!0,transparent:!0,opacity:.22,depthWrite:!1});E.forEach(c=>{const L=new _(new ot(1,12,8),n);L.position.set(...c.c),L.scale.set(...c.r),t.add(L)});const s=document.createElement("div");s.style.cssText="position:absolute;top:0;bottom:0;left:50%;width:2px;margin-left:-1px;background:rgba(255,255,255,.85);pointer-events:none;z-index:1";const y=(c,L)=>{const $=document.createElement("div");return $.textContent=c,$.style.cssText=`position:absolute;bottom:6px;${L}:6px;font:11px/1.3 sans-serif;color:#fff;background:rgba(0,0,0,.55);padding:2px 6px;border-radius:5px;pointer-events:none;z-index:2`,$};M.push(s,y("카드 면 법선","left"),y("덩어리(프록시) 법선","right")),M.forEach(c=>e.body.appendChild(c))}let F=0;const R=e.params.on(n=>{n!=="density"&&n!=="size"||(clearTimeout(F),F=window.setTimeout(()=>{const s=a.geo;a=at(e.params.num("density",110),e.params.num("size",.7)),f.geometry=a.geo,s.dispose()},120))});let q=0,v={dev:0,mis:0},z={dev:0};const k=new gt,N=()=>{const n=e.params.str("nsrc","proxy");return n==="card"?0:n==="proxy"?1:e.params.num("blendK",.7)};return{update(n,s){if(w.copy(Lt(e,s)),S.position.set(0,2,0).addScaledVector(w,9),o.camP.value.copy(i.position),o.uTime.value=s,o.wind.value=e.params.num("wind",.6),T.value=Math.round(e.params.num("steps",3)),r==="full"&&(o.k.value=N()),q++%6===0){const c=T.value;r==="info"?(v=j(a,0,w,i.position,c),z=j(a,1,w,i.position,c)):v=j(a,o.k.value,w,i.position,c)}const y=`카드 ${a.n}장 · 삼각형 ${a.n*2}`;if(r==="info")e.hud(`${y}
이웃 법선 편차: 카드 ${v.dev.toFixed(0)}° vs 프록시 ${z.dev.toFixed(0)}°
RGB = 법선 XYZ · 흰 선 = 프록시 타원체`);else{const c={card:"법선: 카드 면 (양면 뒤집기)",proxy:"법선: 덩어리 타원체에서 전사",full:`법선: ${{card:"카드 면",proxy:"프록시 전사",blend:`블렌드 ${Math.round(o.k.value*100)}%`}[e.params.str("nsrc","proxy")]??""} + 색조·투과·자기 그림자·디더`}[r];e.hud(`${y}
${c}
이웃 법선 편차 ${v.dev.toFixed(0)}° · 이웃 명암 불일치 ${v.mis.toFixed(0)}%`)}},render:r==="info"?()=>{m.getSize(k);const n=k.x,s=k.y;m.setScissorTest(!0),o.k.value=0,m.setScissor(0,0,Math.floor(n/2),s),m.render(t,i),o.k.value=1,m.setScissor(Math.floor(n/2),0,n-Math.floor(n/2),s),m.render(t,i),m.setScissorTest(!1)}:void 0,dispose(){R(),clearTimeout(F),a.geo.dispose(),g.dispose(),M.forEach(n=>n.remove())}}})}const Ft=[{mode:"card",title:"잎 카드 면 법선",kind:"before",caption:"카드마다 자기 평면의 법선으로 툰 셰이딩. 바로 옆 카드끼리도 방향이 제각각이라 밝은 잎·어두운 잎이 소금·후추처럼 섞이고, 덩어리의 빛 방향이 읽히지 않는다. 카드가 납작한 판으로 보인다."},{mode:"proxy",title:"덩어리 법선 전사",kind:"after",caption:"같은 카드·같은 텍스처인데 법선만 각 덩어리(타원체)의 바깥 방향으로 바꿨다. 빛 받는 쪽·그늘 쪽이 큰 면으로 나뉘어 붓으로 칠한 공 덩어리처럼 보인다. 런타임 비용은 0 (정점 데이터만 다름)."},{mode:"full",title:"+ 색조 이동 · 투과 · 자기 그림자",kind:"variant",caption:'그늘은 청록, 빛은 노란 연두로 색상 자체를 이동. 태양을 마주 보면 가장자리가 노랗게 비치고(투과), 덩어리를 통과하는 빛 경로 길이로 아래쪽 덩어리가 그늘진다. 옆으로 선 카드는 디더로 녹인다. "법선 소스"는 이 뷰어에 적용.'},{mode:"info",title:"법선 RGB: 카드 vs 프록시",kind:"info",caption:"왼쪽 절반은 카드 면 법선, 오른쪽 절반은 전사된 프록시 법선을 색(R=X, G=Y, B=Z)으로 표시. 흰 와이어프레임이 법선을 빌려 오는 프록시 타원체. 오른쪽은 색이 덩어리 위로 매끈한 그라데이션."}],Rt={layout:"compare",intro:"스타일라이즈드 게임의 나무는 수백 장의 <b>잎 카드</b>(잎 텍스처를 그린 사각형)로 만듭니다. 그런데 카드마다 자기 면의 법선으로 조명하면 옆 카드끼리 밝기가 제멋대로라 <b>지저분한 얼룩</b>이 됩니다. 해결책은 잎 덩어리를 감싸는 단순한 <b>구·타원체(프록시)의 법선을 카드 정점에 옮겨 담는 것</b>입니다. 그러면 나무가 몇 개의 둥근 덩어리로 읽히고, 툰 램프·색조 이동·투과를 얹어 원화 같은 수관이 됩니다.",how:["덩어리 배치: 수관을 구·타원체 몇 개(또는 저폴리 블롭 메시)로 러프하게 만든다.","카드 뿌리기: 덩어리 표면 근처 껍질에 잎 카드를 무작위 방향으로 흩뿌린다 (잎 텍스처는 알파 테스트).","법선 전사: 각 카드 정점의 법선을 프록시 표면 법선으로 교체 (DCC의 Data Transfer, 또는 normalize(정점 − 덩어리 중심)).","셰이딩: 전사 법선으로 툰 램프. 그늘 쪽은 푸른 쪽, 빛 쪽은 노란 쪽으로 색조를 이동한다.","부가 효과: 역광 투과(태양을 마주 볼 때 가장자리 밝게), 덩어리 깊이 기반 어둡게, 옆으로 선 카드 디더 페이드, 정점 셰이더 바람."],pros:["런타임 비용 없이 정점 데이터만으로 큰 변화","실루엣은 잎 카드로 복잡하게, 명암은 덩어리로 단순하게","툰 램프·외곽선 등 다른 NPR 기법과 잘 맞음"],cons:["카드 정점 법선이 사실과 달라 그림자 맵 바이어스·스펙큘러가 어색할 수 있음","알파 테스트 카드는 오버드로·앨리어싱 비용","프록시를 잘못 잡으면 덩어리 사이 이음새가 보임"],usedIn:"스타일라이즈드 나무 제작의 널리 알려진 기법으로, 원신 같은 애니풍 게임 스타일의 수관에서 비슷한 결과를 볼 수 있습니다. Blender Data Transfer 모디파이어·Houdini 속성 전사로 굽는 튜토리얼이 많이 공유되어 있습니다.",controls:[{type:"select",key:"nsrc",label:"법선 소스 (3번 뷰어)",options:[{label:"카드 면",value:"card"},{label:"프록시 전사",value:"proxy"},{label:"블렌드",value:"blend"}],value:"proxy"},{type:"range",key:"blendK",label:"블렌드 비율",min:0,max:1,step:.05,value:.7},{type:"range",key:"steps",label:"툰 단계 수",min:2,max:5,step:1,value:3},{type:"range",key:"size",label:"잎 카드 크기",min:.3,max:1.1,step:.05,value:.7},{type:"range",key:"density",label:"잎 카드 밀도",min:20,max:200,step:5,value:110},{type:"range",key:"sunAz",label:"태양 방위각 (°)",min:0,max:360,step:5,value:40},{type:"range",key:"sunEl",label:"태양 고도 (°)",min:5,max:85,step:5,value:35},{type:"toggle",key:"sunSpin",label:"태양 회전",value:!0},{type:"range",key:"wind",label:"바람",min:0,max:2,step:.05,value:.6}],viewers:Ft.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:r=>Pt(r,e.mode)}))};export{Rt as default};
