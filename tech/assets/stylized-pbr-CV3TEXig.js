import{k as q,aR as Z,g as N,S as K,C as B,at as J,a as T,B as Q,M as I,u as V,az as ee,ar as z,w as A,r as te,aB as oe,aq as ae,p as ne}from"./three.module-BZgG6AUv.js";import{m as C}from"./three-viewer-0rZIEDzf.js";import{b as le}from"./figure-GCHR3crq.js";const S=[{name:"한낮",top:[.18,.38,.95],hor:[.75,.85,1],gnd:[.22,.26,.14],glow:[{dir:[.6,.75,.3],col:[.5,.45,.35],pow:4},{dir:[0,-1,0],col:[.12,.16,.06],pow:1}],key:{dir:[.45,.82,.35],K:[2.3,2.15,1.9],size:.05},fill:{dir:[-.6,.3,-.7],K:[.05,.07,.1],size:.3},expo:.55,ground:8231514},{name:"노을 역광",top:[.12,.12,.38],hor:[1.25,.5,.25],gnd:[.14,.07,.07],glow:[{dir:[-.3,.1,-.95],col:[1.6,.55,.2],pow:6},{dir:[.3,.5,.8],col:[.2,.12,.35],pow:2}],key:{dir:[-.3,.12,-.95],K:[2.2,.95,.38],size:.07},fill:{dir:[.4,.6,.7],K:[.12,.08,.22],size:.5},expo:.75,ground:7229512},{name:"실내 네온",top:[.025,.02,.045],hor:[.05,.035,.07],gnd:[.04,.03,.045],glow:[{dir:[.95,.15,.25],col:[.9,.08,.55],pow:3},{dir:[-.85,.25,-.45],col:[.06,.55,.9],pow:3}],key:{dir:[.9,.3,.3],K:[1.7,.22,1.05],size:.22},fill:{dir:[-.8,.35,-.5],K:[.18,.95,1.45],size:.2},expo:1.15,ground:4868693},{name:"밤 (달빛)",top:[.006,.01,.03],hor:[.03,.045,.1],gnd:[.008,.008,.012],glow:[{dir:[.3,.7,.6],col:[.03,.05,.12],pow:3},{dir:[-.9,.05,-.3],col:[.25,.12,.03],pow:8}],key:{dir:[.35,.75,.55],K:[.3,.4,.75],size:.04},fill:{dir:[-.9,.12,-.35],K:[.55,.3,.08],size:.08},expo:1.5,ground:3817552}],H=e=>{const t=Math.hypot(e[0],e[1],e[2])||1;return[e[0]/t,e[1]/t,e[2]/t]};for(const e of S){e.key.dir=H(e.key.dir),e.fill.dir=H(e.fill.dir);for(const t of e.glow)t.dir=H(t.dir)}function re(e,t){const n=t[1];let l;if(n>0){const a=1-(1-Math.min(n,1))**2;l=[0,1,2].map(o=>e.hor[o]+(e.top[o]-e.hor[o])*a)}else{const a=Math.min(1,-n*4);l=[0,1,2].map(o=>e.hor[o]+(e.gnd[o]-e.hor[o])*a)}for(const a of e.glow){const o=Math.max(0,t[0]*a.dir[0]+t[1]*a.dir[1]+t[2]*a.dir[2])**a.pow;l=[l[0]+a.col[0]*o,l[1]+a.col[1]*o,l[2]+a.col[2]*o]}return l}const E=new Map;function ie(e){const t=E.get(e);if(t)return t;const n=S[e],l=Array.from({length:9},()=>new N),a=32,o=64,r=4*Math.PI/(a*o);for(let d=0;d<a;d++)for(let i=0;i<o;i++){const m=-1+2*(d+.5)/a,s=2*Math.PI*(i+.5)/o,v=Math.sqrt(1-m*m),h=v*Math.cos(s),g=v*Math.sin(s),y=m,x=re(n,[h,y,g]),u=[.282095,.488603*y,.488603*g,.488603*h,1.092548*h*y,1.092548*y*g,.315392*(3*g*g-1),1.092548*h*g,.546274*(h*h-y*y)];for(let c=0;c<9;c++)l[c].x+=x[0]*u[c]*r,l[c].y+=x[1]*u[c]*r,l[c].z+=x[2]*u[c]*r}return E.set(e,l),l}const se=e=>.2126*e[0]+.7152*e[1]+.0722*e[2];function ce(e){const t=Math.max(se(e.key.K),1e-4);let n=e.key.K.map(o=>1+(o/t-1)*.6);const l=Math.max(...n);l>1.25&&(n=n.map(o=>o*1.25/l));const a=Math.min(1.1,Math.max(.92,t*e.expo));return new N(n[0]*a,n[1]*a,n[2]*a)}const de={skin:{albedo:16769228,rough:.6,metal:0,tint:[.88,.6,.68],spec:0,id:0,name:"피부"},hair:{albedo:4874142,rough:.32,metal:0,tint:[.5,.45,.8],spec:.5,id:1,name:"머리카락"},cloth:{albedo:15921911,rough:.9,metal:0,tint:[.66,.7,.92],spec:0,id:2,name:"흰 천"},cloth2:{albedo:12073034,rough:.75,metal:0,tint:[.62,.34,.55],spec:0,id:3,name:"빨간 천"},eye:{albedo:2830165,rough:.2,metal:0,tint:[.6,.6,.78],spec:0,id:4,name:"눈"},gold:{albedo:16761690,rough:.28,metal:1,tint:[.62,.42,.3],spec:1,id:5,name:"금 갑옷"},silver:{albedo:14212582,rough:.18,metal:1,tint:[.5,.54,.72],spec:1,id:6,name:"은 장식"},leather:{albedo:5911588,rough:.4,metal:0,tint:[.55,.4,.52],spec:.35,id:7,name:"가죽"}},me=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,_=`
#define PI 3.14159265
uniform vec3 eTop, eHor, eGnd, g0c, g0d, g1c, g1d; uniform float g0p, g1p;
uniform vec3 keyL, keyW, keyK; uniform float keyS;
uniform vec3 filL, filW, filK; uniform float filS;
uniform float expo; uniform vec3 sh[9]; uniform mat3 toLocal;
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
vec3 envBase(vec3 d){
  float y = d.y;
  vec3 c;
  if (y > 0.) { float t = 1. - (1. - min(y, 1.)) * (1. - min(y, 1.)); c = mix(eHor, eTop, t); }
  else c = mix(eHor, eGnd, clamp(-y * 4., 0., 1.));
  c += g0c * pow(max(dot(d, g0d), 0.), g0p) + g1c * pow(max(dot(d, g1d), 0.), g1p);
  return c;
}
vec3 shIrr(vec3 n){
  const float c1 = .429043, c2 = .511664, c3 = .743125, c4 = .886227, c5 = .247708;
  return c1 * sh[8] * (n.x * n.x - n.y * n.y) + c3 * sh[6] * n.z * n.z + c4 * sh[0] - c5 * sh[6]
    + 2. * c1 * (sh[4] * n.x * n.y + sh[7] * n.x * n.z + sh[5] * n.y * n.z)
    + 2. * c2 * (sh[3] * n.x + sh[1] * n.y + sh[2] * n.z);
}
// 원반 광원: 거칠기만큼 넓어지고 그만큼 휘도가 낮아짐 (에너지 대략 보존)
vec3 disc(vec3 d, vec3 dir, vec3 K, float s, float r){
  float s2 = s + r * r * 1.1 + r * .12;
  float a = acos(clamp(dot(d, dir), -1., 1.));
  return K / (s2 * s2) * smoothstep(s2, s2 * .6, a);
}
// 사전 필터 큐브맵 대용: 거칠수록 SH 조도 쪽으로 흐려짐
vec3 envRad(vec3 d, float r){
  return mix(envBase(d), max(shIrr(d), 0.) / PI, r * r) + disc(d, keyL, keyK, keyS, r) + disc(d, filL, filK, filS, r);
}
// 화면 출력: 0.8까지는 그대로, 그 위만 부드럽게 눌러 줌 (툰 색을 건드리지 않는 톤 매핑)
vec3 tone(vec3 c){ return mix(c, .8 + .2 * (1. - exp(-(c - .8) / .2)), step(.8, c)); }
`,pe=`
${_}
uniform float mode, tRamp, tSpec, tMetal, tAmb, tRim;
uniform vec3 albedo, tint, keyStyled, toonW; uniform float rough, metal, specI, matId;
varying vec3 vN; varying vec3 vW;
vec2 envBRDF(float r, float NoV){ // Karis 모바일 근사
  vec4 r4 = r * vec4(-1., -.0275, -.572, .022) + vec4(1., .0425, 1.04, -.04);
  float a004 = min(r4.x * r4.x, exp2(-9.28 * NoV)) * r4.x + r4.y;
  return vec2(-1.04, 1.04) * a004 + r4.zw;
}
vec3 styleAmb(vec3 a){
  float l = lum(a);
  vec3 h = a / max(l, 1e-4);
  h = mix(vec3(1.), h, .55);
  h /= max(1., max(h.r, max(h.g, h.b)) / 1.3);
  return h * clamp(.6 + l * .8, .62, 1.);
}
void main(){
  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  float NoV = clamp(dot(N, V), 1e-3, 1.);
  float NL = dot(N, keyW);
  float hl = NL * .5 + .5;
  vec3 Nl = toLocal * N;
  vec3 Rl = toLocal * reflect(-V, N);
  vec3 F0 = mix(vec3(.04), albedo, metal);
  bool ground = matId > 7.5;
  bool isHair = abs(matId - 1.) < .5;
  float isSkin = matId < .5 ? 1. : 0.;
  vec3 col;
  if (mode < .5 && !ground) {
    // ① 순수 툰: 고정 램프만. 환경·금속성 무시
    float lit = smoothstep(.47, .53, dot(N, toonW) * .5 + .5);
    col = albedo * mix(tint, vec3(1.), lit);
  } else if (mode < 1.5 || ground) {
    // ② 순수 PBR: SH 확산 + 직접광(N·L) + IBL 정반사
    vec3 irr = max(shIrr(Nl), 0.) / PI;
    vec3 dir = keyK * max(NL, 0.) + filK * max(dot(N, filW), 0.);
    vec2 ab = envBRDF(rough, NoV);
    vec3 spec = envRad(Rl, rough) * (F0 * ab.x + ab.y);
    col = (albedo * (1. - metal) * (irr + dir) + spec) * expo;
    col = tone(col);
  } else {
    // ③ 하이브리드
    vec3 ambS = tAmb > .5 ? styleAmb(max(shIrr(Nl), 0.) / PI * expo) : vec3(1.);
    vec3 kS = tAmb > .5 ? keyStyled : vec3(1.);
    float lit = smoothstep(.47, .53, hl);
    vec3 dif;
    if (tRamp > .5) {
      dif = albedo * mix(tint * ambS, kS, lit);
      dif += albedo * vec3(.22, .04, 0.) * lit * (1. - lit) * 4. * isSkin; // 피부 경계의 따뜻한 띠
    } else {
      lit = max(NL, 0.);
      dif = albedo * (ambS * .45 + kS * lit * .8);
    }
    col = dif;
    if (metal > .5 && tMetal > .5) {
      // 금속: IBL 반사를 쓰되 밝기를 3~4단으로 계단화
      vec3 e = envRad(Rl, rough) * expo;
      float l = lum(e);
      float b = .12 + .33 * smoothstep(.07, .1, l) + .45 * smoothstep(.4, .48, l) + .55 * smoothstep(1.3, 1.5, l);
      vec3 h = mix(vec3(1.), e / max(l, 1e-4), .7);
      h /= max(1., max(h.r, max(h.g, h.b)) / 1.4);
      vec2 ab = envBRDF(rough, NoV);
      col = (F0 * ab.x + ab.y) * h * b * 1.15 + albedo * .14 * mix(tint, vec3(1.), lit) * kS;
    }
    if (specI > 0.) {
      vec3 H = normalize(keyW + V);
      float NoH = max(dot(N, H), 0.);
      float a = rough * rough;
      float den = NoH * NoH * (a * a - 1.) + 1.;
      if (tSpec > .5) {
        float m;
        if (isHair) {
          // 머리카락: 결 방향(T) 기준 카지야-케이 → 계단화하면 "엔젤 링" 띠
          vec3 T = normalize(vec3(0., 1., 0.) - N * N.y + vec3(1e-4));
          float TH = dot(T, H);
          m = smoothstep(.976, .982,sqrt(max(1. - TH * TH, 0.))) * smoothstep(-.1, .2, NL) * smoothstep(.92, .8, abs(N.y)) * step(0., dot(N, V));
        } else {
          float dn = a * a / (den * den); // 피크를 1로 정규화한 GGX
          m = smoothstep(.45, .5, dn) * step(0., NL);
        }
        vec3 sc = isHair ? mix(albedo * 2.5, vec3(1.), .45) : vec3(1.);
        col += kS * sc * m * specI * (metal > .5 ? 1.1 : .8);
      } else {
        float D = a * a / (PI * den * den);
        vec3 F = F0 + (1. - F0) * pow(1. - max(dot(H, V), 0.), 5.);
        col += keyK * PI * D * F * .25 * max(NL, 0.) * expo * (metal > .5 ? 1. : specI * 2.5);
      }
    }
    if (tRim > .5) {
      // 림: 실루엣 쪽 법선 방향의 환경 색을 그대로 가져옴
      float rm = smoothstep(.58, .66, 1. - NoV) * (.3 + .7 * (1. - lit));
      vec3 rc = envRad(Nl, .55) * expo;
      float rl = lum(rc);
      rc = rc / max(rl, 1e-4) * min(rl * 1.3 + .15, 1.);
      col += rc * rm * .55;
    }
    col = tone(col);
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,ue=`
${_}
varying vec3 vD;
void main(){
  vec3 d = toLocal * normalize(vD);
  vec3 c = envBase(d) + disc(d, keyL, keyK, keyS, 0.) * .02 + disc(d, filL, filK, filS, 0.) * .05;
  gl_FragColor = vec4(tone(c * expo), 1.);
  #include <colorspace_fragment>
}`,fe="varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }";function $(){const e=()=>({value:new N});return{eTop:e(),eHor:e(),eGnd:e(),g0c:e(),g0d:e(),g1c:e(),g1d:e(),g0p:{value:1},g1p:{value:1},keyL:e(),keyW:e(),keyK:e(),keyS:{value:.05},filL:e(),filW:e(),filK:e(),filS:{value:.1},expo:{value:1},sh:{value:Array.from({length:9},()=>new N)},toLocal:{value:new Z},keyStyled:e(),toonW:e(),mode:{value:2},tRamp:{value:1},tSpec:{value:1},tMetal:{value:1},tAmb:{value:1},tRim:{value:1}}}const L=new oe;function R(e,t,n,l){const a=S[t],o=(i,m)=>e[i].value.set(m[0],m[1],m[2]);o("eTop",a.top),o("eHor",a.hor),o("eGnd",a.gnd),o("g0c",a.glow[0].col),o("g0d",a.glow[0].dir),e.g0p.value=a.glow[0].pow,o("g1c",a.glow[1].col),o("g1d",a.glow[1].dir),e.g1p.value=a.glow[1].pow;const r=n*Math.PI/180;L.makeRotationY(r),o("keyL",a.key.dir),o("keyK",a.key.K),e.keyS.value=a.key.size,e.keyW.value.set(...a.key.dir).applyMatrix4(L),o("filL",a.fill.dir),o("filK",a.fill.K),e.filS.value=a.fill.size,e.filW.value.set(...a.fill.dir).applyMatrix4(L),e.toonW.value.set(...S[0].key.dir).applyMatrix4(L),e.toLocal.value.setFromMatrix4(L.makeRotationY(-r)),e.expo.value=a.expo;const d=ie(t);e.sh.value.forEach((i,m)=>i.copy(d[m])),e.keyStyled.value.copy(ce(a)),l.uniforms.albedo.value.set(a.ground).convertSRGBToLinear()}function D(e,t){e.tRamp.value=t.params.bool("tRamp",!0)?1:0,e.tSpec.value=t.params.bool("tSpec",!0)?1:0,e.tMetal.value=t.params.bool("tMetal",!0)?1:0,e.tAmb.value=t.params.bool("tAmb",!0)?1:0,e.tRim.value=t.params.bool("tRim",!0)?1:0}function W(e,t){const n=t==="ground"?{albedo:8421504,rough:.85,metal:0,tint:[1,1,1],spec:0,id:8}:de[t];return new V({uniforms:{...e,albedo:{value:new ne(n.albedo).convertSRGBToLinear()},tint:{value:new N(...n.tint)},rough:{value:n.rough},metal:{value:n.metal},specI:{value:n.spec},matId:{value:n.id}},vertexShader:me,fragmentShader:pe,side:ae})}function j(e,t){e.background=null;const n=new Map,l=s=>(n.has(s)||n.set(s,W(t,s)),n.get(s)),a=le(e,s=>l(s)),o=(s,v,h,g,y,x=a.root)=>{const u=new I(s,l(v));return u.position.set(...h),g&&u.scale.set(...g),y&&u.rotation.set(...y),x.add(u),u};for(const s of[-1,1])o(new K(.16,32,16,0,Math.PI*2,0,Math.PI/2),"gold",[s*.3,1.52,0],[1,.8,.95],[0,0,-s*.45]),o(new B(.085,.092,.22,24,1,!0),"silver",[s*.366,1,0],void 0,[0,0,s*.18]),o(new B(.105,.115,.42,24),"leather",[s*.12,.21,0]),o(new J(.07,.12,6,12),"leather",[s*.12,.06,.07],void 0,[Math.PI/2,0,0]);o(new B(.255,.245,.3,40,1,!0,-Math.PI/2,Math.PI),"silver",[0,1.33,0],[1,1,.8]),o(new T(.245,.035,12,48),"leather",[0,1.1,0],[1,.78,1],[Math.PI/2,0,0]),o(new Q(.11,.085,.035),"gold",[0,1.1,.205]),o(new T(.06,.022,10,28),"gold",[.31,.14,.12],void 0,[0,1.1,0],a.head);const r=new I(new K(40,48,24),new V({uniforms:t,vertexShader:fe,fragmentShader:ue,side:ee,depthWrite:!1}));r.renderOrder=-1,e.add(r);const d=W(t,"ground"),i=new I(new z(7,64),d);i.rotation.x=-Math.PI/2,e.add(i);const m=new I(new z(.55,32),new A({color:0,transparent:!0,opacity:.35,depthWrite:!1}));return m.rotation.x=-Math.PI/2,m.position.y=.004,e.add(m),{fig:a,sky:r,ground:i,groundMat:d,blob:m,envObjs:[r,i,m]}}function G(e,t,n){const l=d=>d>.008856?Math.cbrt(d):7.787*d+.13793103448275862,a=(.4124*e+.3576*t+.1805*n)/.9505,o=.2126*e+.7152*t+.0722*n,r=(.0193*e+.1192*t+.9505*n)/1.089;return[116*l(o)-16,500*(l(a)-l(o)),200*(l(o)-l(r))]}const O=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1],e[2]-t[2]);function X(e,t,n,l){const r=new te(48,64),d=new Uint8Array(48*64*4),i=new Uint8Array(48*64*4),m=new A({color:16777215});let s={rot:0,aspect:1};return{begin(){s={rot:l.fig.root.rotation.y,aspect:n.aspect},l.fig.root.rotation.y=0,n.aspect=48/64,n.updateProjectionMatrix();const v=t.background;t.overrideMaterial=m,l.envObjs.forEach(h=>h.visible=!1),e.setRenderTarget(r),e.setClearColor(0,1),e.clear(),e.render(t,n),e.readRenderTargetPixels(r,0,0,48,64,d),t.overrideMaterial=null,t.background=v,l.envObjs.forEach(h=>h.visible=!0)},shot(){e.setRenderTarget(r),e.clear(),e.render(t,n),e.readRenderTargetPixels(r,0,0,48,64,i);let v=0,h=0,g=0,y=0,x=0,u=0;for(let f=0;f<48*64;f++){const M=i[f*4]/255,w=i[f*4+1]/255,p=i[f*4+2]/255;d[f*4]>128?(v++,h+=M,g+=w,y+=p):(x++,u+=.2126*M+.7152*w+.0722*p)}const c=G(h/Math.max(v,1),g/Math.max(v,1),y/Math.max(v,1));return{L:c[0],bgL:G(u/Math.max(x,1),u/Math.max(x,1),u/Math.max(x,1))[0],lab:c}},end(){e.setRenderTarget(null),l.fig.root.rotation.y=s.rot,n.aspect=s.aspect,n.updateProjectionMatrix()},dispose(){r.dispose(),m.dispose()}}}const F={toon:0,pbr:1,hybrid:2},ve=["순수 툰 (램프만)","순수 PBR (GGX + IBL)","NPR + PBR 하이브리드"],he=["툰","PBR","하이브리드"],ge=["낮","노을","네온","밤"],U={antialias:!0,cam:[.95,1.5,2.55],target:[0,1.28,0],far:120},Y=["env","rot","tRamp","tSpec","tMetal","tAmb","tRim"];function ye(e){const t=(n,l)=>e[n].value?l:`(${l}✕)`;return[t("tRamp","램프"),t("tSpec","스텝 스펙"),t("tMetal","금속 IBL"),t("tAmb","환경색"),t("tRim","림")].join("·")}function be(e,t){return C(e,U,({scene:n,camera:l,renderer:a,controls:o})=>{const r=$();r.mode.value=F[t];const d=j(n,r),i=X(a,n,l,d);let m=!0,s=-1,v=null,h=null;const g=e.params.on(u=>{Y.includes(u)&&(m=!0)}),y=()=>m=!0;o.addEventListener("change",y);const x=()=>({ei:Number(e.params.str("env","1")),rot:e.params.num("rot",30)});return{update(u,c){const{ei:f,rot:M}=x();D(r,e),m&&c-s>.35&&(m=!1,s=c,i.begin(),R(r,0,M,d.groundMat),h=i.shot(),R(r,f,M,d.groundMat),v=i.shot(),i.end()),R(r,f,M,d.groundMat),d.fig.root.rotation.y=Math.sin(c*.35)*.35;const w=S[f];let p="";v&&h&&(p=`캐릭터 L* ${v.L.toFixed(0)} · 배경 L* ${v.bgL.toFixed(0)} · 한낮 대비 ΔE ${O(v.lab,h.lab).toFixed(0)}`),e.hud(`${ve[F[t]]} · ${w.name}${t==="hybrid"?`
${ye(r)}`:""}
${p}`)},dispose(){g(),o.removeEventListener("change",y),i.dispose()}}})}function xe(e){return C(e,U,({scene:t,camera:n,renderer:l,controls:a})=>{const o=$(),r=j(t,o),d=X(l,t,n,r),i=document.createElement("div");i.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:1;font:10px/1.3 system-ui,sans-serif;color:#f1f5f9",e.body.appendChild(i);const m=[],s=[];for(let c=0;c<3;c++)for(let f=0;f<4;f++){const M=document.createElement("div");M.style.cssText=`position:absolute;left:${f*25}%;top:${c*33.333}%;width:25%;height:33.333%;box-sizing:border-box;border:1px solid rgba(255,255,255,.18)`;const w=document.createElement("div");w.style.cssText="position:absolute;left:3px;bottom:2px;background:rgba(0,0,0,.6);padding:1px 4px;border-radius:3px;white-space:pre;font-size:9px;line-height:1.25",M.appendChild(w),i.appendChild(M),m.push(w),s.push(M)}let v=!0,h=-1;const g=Array(12).fill(null),y=e.params.on(c=>{Y.includes(c)&&(v=!0)}),x=()=>v=!0;a.addEventListener("change",x);const u=new q;return{update(c,f){const M=Number(e.params.str("env","1")),w=e.params.num("rot",30);if(D(o,e),v&&f-h>.5){v=!1,h=f,d.begin();for(let p=0;p<3;p++)for(let b=0;b<4;b++)o.mode.value=p,R(o,b,w,r.groundMat),g[p*4+b]=d.shot();d.end();for(let p=0;p<3;p++)for(let b=0;b<4;b++){const k=g[p*4+b],P=g[p*4];m[p*4+b].textContent=`${he[p]} · ${ge[b]}
L*${k.L.toFixed(0)} ΔE${O(k.lab,P.lab).toFixed(0)}`}}s.forEach((p,b)=>p.style.borderColor=b%4===M?"rgba(250,204,21,.85)":"rgba(255,255,255,.18)"),r.fig.root.rotation.y=Math.sin(f*.35)*.35,e.hud("")},render(){l.getSize(u);const c=u.x/4,f=u.y/3,M=n.aspect;n.aspect=c/f,n.updateProjectionMatrix(),l.setScissorTest(!0);const w=e.params.num("rot",30);for(let p=0;p<3;p++)for(let b=0;b<4;b++){const k=Math.floor(b*c),P=Math.floor((2-p)*f);l.setViewport(k,P,Math.ceil(c),Math.ceil(f)),l.setScissor(k,P,Math.ceil(c),Math.ceil(f)),o.mode.value=p,R(o,b,w,r.groundMat),l.render(t,n)}l.setScissorTest(!1),l.setViewport(0,0,u.x,u.y),n.aspect=M,n.updateProjectionMatrix()},dispose(){y(),a.removeEventListener("change",x),d.dispose(),i.remove()}}})}const Me=[{mode:"toon",title:"① 순수 툰 (램프만)",kind:"before",caption:'모든 재질을 "알베도 × 고정 램프"로만 칠한다. 금 갑옷은 노란 페인트, 은 장식은 회색 플라스틱. 환경을 바꿔도 캐릭터 색이 그대로라(ΔE ≈ 0) 노을·네온·밤 배경 위에 오려 붙인 것처럼 보인다.'},{mode:"pbr",title:"② 순수 PBR (GGX + IBL)",kind:"variant",caption:"SH 확산 + 직접광 N·L + 환경 정반사(IBL). 금속은 하늘과 지평선을 비추고 환경에 녹아들지만, 피부 그늘 경계가 넓게 번지고 회색빛으로 탁하다. 역광 노을·밤에는 얼굴 대부분이 그늘 쪽으로 넘어가 어둡고 탁해진다(캐릭터 L*가 툰·하이브리드보다 15~25 낮음)."},{mode:"hybrid",title:"③ NPR + PBR 하이브리드",kind:"after",caption:"확산 = 램프(재질별 색조 이동된 그늘색 × 환경 SH 색), 스펙큘러 = GGX를 계단화(머리카락은 엔젤 링), 금속 = IBL 반사를 3~4단으로 계단화, 림 = 뒤쪽 환경 색. 환경 색은 따라가면서(ΔE > 0) 밝기는 일정 범위를 지켜(L* 유지) 어디서나 읽힌다."},{mode:"matrix",title:"방식 × 환경 매트릭스",kind:"info",wide:!0,caption:"위에서부터 툰 / PBR / 하이브리드, 왼쪽부터 한낮 / 노을 역광 / 실내 네온 / 밤. 칸마다 캐릭터 평균 밝기(L*)와 한낮 대비 색 변화(ΔE)를 측정해 표시. 툰은 ΔE가 0, PBR은 L*가 크게 흔들리고, 하이브리드는 ΔE는 생기되 L*는 좁은 범위에 머문다. 노란 테두리 = 현재 선택한 환경."}],Le={layout:"compare",intro:'최근 애니풍 게임은 "툰이냐 PBR이냐"를 고르지 않고 <b>항마다 다른 방식</b>을 씁니다. 얼굴과 옷의 확산은 <b>툰 램프</b>로 원화 같은 그늘 경계와 색을 지키고, 금속 반사·환경광·림처럼 "주변 세계와 이어져야 하는" 항은 <b>PBR/IBL</b>에서 가져와 양식화합니다. 그 결과 캐릭터가 낮·노을·네온·밤 어디에 서도 <b>작화 톤은 유지</b>하면서 <b>장면의 빛에 녹아듭니다</b>.',how:["환경 준비: 하늘(또는 반사 프로브)에서 확산용 SH 9계수와 정반사용 사전 필터 환경을 만든다. 이 페이지는 절차적 하늘에서 SH를 CPU로 투영.","확산 = albedo × lerp(그늘색 × 양식화된 SH 앰비언트, 양식화된 주광색, ramp(N·L)). 그늘색은 재질마다 색조를 돌린 값(피부 → 분홍·보라, 흰 천 → 하늘색).","양식화: 환경 색은 채도를 줄이고 밝기는 하한·상한으로 묶는다 → 색조는 장면을 따르되 밤에도 얼굴이 읽힘.","스펙큘러 = GGX를 계산하되 smoothstep으로 계단화해 또렷한 하이라이트 조각으로. 머리카락은 결 방향 기준(카지야-케이) 띠 → 엔젤 링.","금속 = IBL 반사(반사 벡터로 환경 조회 × 환경 BRDF)를 쓰되 밝기를 3~4단으로 양자화 → 애니풍 금속인데 주변을 실제로 비춤.","림 = 실루엣 쪽 법선 방향의 환경 색. 역광 노을에선 주황, 네온에선 청록 테두리가 생겨 장면과 연결."],pros:["한 캐릭터 에셋으로 모든 조명 환경 대응","금속·가죽 등 재질 구분이 툰보다 확실","얼굴·피부는 원화 톤 유지","배경(PBR)과 캐릭터(NPR)의 이질감 감소"],cons:['항마다 "양식화 규칙"을 정해야 해 셰이더·튜닝 복잡',"환경 SH·반사 프로브 등 PBR 파이프라인이 전제","계단화 임계값이 거칠기·노출과 얽혀 재질마다 조정 필요"],usedIn:"원신·붕괴: 스타레일·명조·젠레스 존 제로 등 최근 애니풍 게임의 캐릭터 셰이더가 툰 확산에 PBR식 금속·환경 반사를 섞는 방향으로 알려져 있음(세부 구현은 게임마다 다르고 비공개 부분이 많음). Unity UTS·lilToon 같은 공개 툰 셰이더도 MatCap·환경광 반영 옵션을 제공.",controls:[{type:"select",key:"env",label:"조명 환경",options:S.map((e,t)=>({label:e.name,value:String(t)})),value:"1"},{type:"range",key:"rot",label:"광원 회전 (°)",min:0,max:360,step:5,value:30},{type:"toggle",key:"tRamp",label:"하이브리드: 램프 확산 (끄면 램버트)",value:!0},{type:"toggle",key:"tSpec",label:"하이브리드: 계단 스펙큘러 (끄면 GGX 그대로)",value:!0},{type:"toggle",key:"tMetal",label:"하이브리드: 금속 IBL 반사 (끄면 단색)",value:!0},{type:"toggle",key:"tAmb",label:"하이브리드: 환경 색 반영 (SH 앰비언트)",value:!0},{type:"toggle",key:"tRim",label:"하이브리드: 환경 림 라이트",value:!0}],viewers:Me.map(e=>({title:e.title,kind:e.kind,caption:e.caption,wide:e.wide,mount:t=>e.mode==="matrix"?xe(t):be(t,e.mode)}))};export{Le as default};
