var S=Object.defineProperty;var d=(a,e,t)=>e in a?S(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var s=(a,e,t)=>d(a,typeof e!="symbol"?e+"":e,t);import{G as m,D as h,J as x,am as g,an as M,W as b,k as y,j as P,C as v,V as f,S as w,al as T}from"./three.module-CEzfHhrp.js";import{N as k}from"./extra-kit-c-FPjCbN4U.js";const C=`
vec2 lkPack(float x) { x = clamp(x, 0.0, 1.0) * 255.0; float h = floor(x); return vec2(h / 255.0, x - h); }
vec3 lkAces(vec3 c) { return clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), 0.0, 1.0); }
float lkHash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }`,W=(a,e,t)=>(a[e]+a[e+1]/255)/255*t,L=(a,e,t)=>{const r=Math.min(1,Math.max(0,(t-a)/(e-a||1e-9)));return r*r*(3-2*r)},z=`
uniform vec3 uSpPos, uSpDir, uSpRight, uSpUp, uSpCol;
uniform float uSpI, uSpCosO, uSpCosI, uSpNear, uSpFar, uSpShadow;
uniform mat4 uSpMat;
uniform sampler2D uSpDepth;
uniform vec2 uSpTexel;
float spLin(float d) { return uSpNear * uSpFar / (uSpFar - d * (uSpFar - uSpNear)); }
float spCone(float cosT) { return smoothstep(uSpCosO, uSpCosI, cosT); }
/** 빛 공간 기울기 좌표 (x/z, y/z, z) – 쿠키는 이 평면(빛에서 거리 1)에 그려진 무늬 */
vec3 spSlope(vec3 p) { vec3 v = p - uSpPos; float z = max(dot(v, uSpDir), 1e-4); return vec3(dot(v, uSpRight) / z, dot(v, uSpUp) / z, z); }
float spShadowTap(vec3 p, float bias, int taps) {
  if (uSpShadow < 0.5) return 1.0;
  vec4 c = uSpMat * vec4(p, 1.0);
  if (c.w <= 0.0) return 1.0;
  vec2 uv = c.xy / c.w * 0.5 + 0.5;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  float zr = c.w - bias;
  if (taps < 2) return step(zr, spLin(texture2D(uSpDepth, uv).r));
  float s = 0.0;
  for (int i = -1; i <= 1; i++)
    for (int j = -1; j <= 1; j++) s += step(zr, spLin(texture2D(uSpDepth, uv + vec2(float(i), float(j)) * uSpTexel).r));
  return s / 9.0;
}`;class V{constructor(e=1024,t=.1,r=30){s(this,"cam");s(this,"rt");s(this,"u");s(this,"depthMat",new m({colorWrite:!1,side:h}));s(this,"outerDeg",25);s(this,"innerDeg",18);this.cam=new x(60,1,t,r);const u=new g(e,e);u.type=M,this.rt=new b(e,e,{depthTexture:u,depthBuffer:!0}),this.u={uSpPos:{value:new f},uSpDir:{value:new f(0,-1,0)},uSpRight:{value:new f(1,0,0)},uSpUp:{value:new f(0,0,-1)},uSpCol:{value:new v(1,1,1)},uSpI:{value:10},uSpCosO:{value:Math.cos(.4)},uSpCosI:{value:Math.cos(.3)},uSpNear:{value:t},uSpFar:{value:r},uSpShadow:{value:1},uSpMat:{value:new P},uSpDepth:{value:u},uSpTexel:{value:new y(1/e,1/e)}}}get pos(){return this.u.uSpPos.value}get dir(){return this.u.uSpDir.value}get right(){return this.u.uSpRight.value}get up(){return this.u.uSpUp.value}get cosO(){return this.u.uSpCosO.value}get cosI(){return this.u.uSpCosI.value}get I(){return this.u.uSpI.value}set(e,t,r,u,c,n){const l=Math.min(70,Math.max(2,r)),p=Math.min(l-.5,Math.max(0,u));this.outerDeg=l,this.innerDeg=p;const i=this.dir.copy(t).normalize();this.pos.copy(e);const o=this.cam;o.position.copy(e),n?o.up.copy(n):o.up.set(0,1,0),Math.abs(i.dot(o.up))>.98&&o.up.set(0,0,-1),o.lookAt(e.x+i.x,e.y+i.y,e.z+i.z),o.fov=Math.min(170,2*l+6),o.updateProjectionMatrix(),o.updateMatrixWorld(),this.right.setFromMatrixColumn(o.matrixWorld,0).normalize(),this.up.setFromMatrixColumn(o.matrixWorld,1).normalize(),this.u.uSpMat.value.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.u.uSpCosO.value=Math.cos(l*Math.PI/180),this.u.uSpCosI.value=Math.cos(p*Math.PI/180),this.u.uSpI.value=Number.isFinite(c)?Math.max(0,c):0}cone(e){return L(this.cosO,this.cosI,e)}renderShadow(e,t){const r=t.overrideMaterial,u=t.background;t.overrideMaterial=this.depthMat,t.background=null,e.setRenderTarget(this.rt),e.clear(),e.render(t,this.cam),e.setRenderTarget(null),t.overrideMaterial=r,t.background=u}dispose(){var e;(e=this.rt.depthTexture)==null||e.dispose(),this.rt.dispose(),this.depthMat.dispose()}}function O(){return{uAmbTop:{value:new v(.02,.022,.03)},uAmbBot:{value:new v(.01,.01,.012)},uProbe:{value:0},uProbeScale:{value:4},uTime:{value:0},uTone:{value:1},uExpo:{value:1},uVol:{value:0},uVolS:{value:.06}}}const D=`
varying vec3 vWp;
varying vec3 vN;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  vN = normalize(transpose(inverse(mat3(modelMatrix))) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,I=(a,e)=>`
${e?"#define LK_VOL":""}
uniform vec3 uAmbTop, uAmbBot, uAlbedo, uEmis;
uniform float uProbe, uProbeScale, uTime, uTone, uExpo, uVol, uVolS, uPattern, uSpec;
varying vec3 vWp;
varying vec3 vN;
varying vec2 vUv;
${C}
${k}
${z}
${a||"float cookie(vec2 q) { return 1.0; }"}
vec3 albedoAt(vec3 p, vec3 n) {
  vec3 a = uAlbedo;
  if (uPattern > 3.5) { // 체크 타일
    vec2 q = abs(n.y) > 0.5 ? p.xz : (abs(n.x) > 0.5 ? p.zy : p.xy);
    vec2 c = floor(q / 0.5);
    a *= 0.8 + 0.25 * mod(c.x + c.y, 2.0);
  } else if (uPattern > 2.5) { // 판자 (상자)
    vec2 q = abs(n.y) > 0.5 ? p.xz : (abs(n.x) > 0.5 ? p.zy : p.xy);
    float pl = floor(q.y / 0.22);
    float seam = smoothstep(0.0, 0.015, fract(q.y / 0.22) * 0.22) * smoothstep(0.0, 0.015, (1.0 - fract(q.y / 0.22)) * 0.22);
    a *= (0.75 + 0.35 * xk_fbm(vec3(q.x * 2.0, pl * 3.1, 1.0)) ) * mix(0.45, 1.0, seam);
  } else if (uPattern > 1.5) { // 바닥 마루
    float pl = floor(p.x / 0.35);
    float g = xk_fbm(vec3(p.z * 0.6, pl * 5.3, p.x * 8.0));
    float seam = smoothstep(0.0, 0.02, fract(p.x / 0.35) * 0.35);
    a *= (0.7 + 0.5 * g) * mix(0.5, 1.0, seam);
  } else if (uPattern > 0.5) { // 회벽 얼룩
    a *= 0.72 + 0.45 * xk_fbm(p * 1.7 + n * 3.0);
  }
  return a;
}
#ifdef LK_VOL
vec3 volHint(float jit) {
  vec3 ro = cameraPosition;
  vec3 rd = vWp - ro;
  float len = length(rd);
  rd /= max(len, 1e-4);
  float t0 = min(0.4, len);
  float dt = (len - t0) / 12.0;
  float acc = 0.0;
  for (int i = 0; i < 12; i++) {
    vec3 x = ro + rd * (t0 + (float(i) + jit) * dt);
    vec3 lv = x - uSpPos;
    float d2 = max(dot(lv, lv), 1.0); // 광원 바로 앞의 1/d² 특이점을 잘라 낸다
    float c = spCone(dot(lv, uSpDir) * inversesqrt(d2));
    if (c > 0.0) c *= cookie(spSlope(x).xy);
    if (c > 0.0) acc += c / d2 * spShadowTap(x, 0.06, 1) * exp(-uVolS * float(i) * dt);
  }
  return uSpCol * (acc * dt * uVolS * uSpI * 0.0796 * uVol);
}
#endif
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  vec3 lv = uSpPos - vWp;
  float d2 = max(dot(lv, lv), 1e-4);
  vec3 L = lv * inversesqrt(d2);
  float cosT = dot(-L, uSpDir);
  float ndl = max(dot(n, L), 0.0);
  float cone = spCone(cosT);
  vec3 sl = spSlope(vWp);
  float ck = cosT > 0.0 ? cookie(sl.xy) : 0.0;
  float sh = cone * ck > 0.0 ? spShadowTap(vWp + n * 0.02, 0.025 + 0.05 * (1.0 - ndl), 9) : 0.0;
  float fac = cone * ck * sh;
  float Es = uSpI * ndl / d2 * fac;
  vec3 Ea = mix(uAmbBot, uAmbTop, n.y * 0.5 + 0.5);
  if (uProbe > 1.5) { gl_FragColor = vec4(lkPack(fac), acos(clamp(cosT, -1.0, 1.0)) / 0.7853982, 1.0); return; }
  if (uProbe > 0.5) { gl_FragColor = vec4(lkPack(Es / uProbeScale), lkPack(dot(Ea, vec3(0.2126, 0.7152, 0.0722)) / uProbeScale * 20.0)); return; }
  vec3 alb = albedoAt(vWp, n);
  vec3 v = normalize(cameraPosition - vWp);
  vec3 h = normalize(L + v);
  vec3 spec = uSpCol * (uSpec * pow(max(dot(n, h), 0.0), 40.0) * Es);
  vec3 col = alb * (uSpCol * Es + Ea) + spec + uEmis;
#ifdef LK_VOL
  // 인터리브드 그라디언트 노이즈 + 프레임 이동 → 흰 점 대신 고운 디더
  float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))) + fract(uTime * 7.31) * 0.618);
  col += volHint(ign);
#endif
  col *= uExpo;
  if (uTone > 0.5) col = lkAces(col);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`;function _(a,e,t){return new w({vertexShader:D,fragmentShader:I(t.cookie??"",!!t.vol),side:t.side??T,uniforms:{...a.u,...e,...t.uniforms??{},uAlbedo:{value:new v(t.color)},uEmis:{value:new v(t.emissive??0)},uPattern:{value:t.pattern??0},uSpec:{value:t.spec??.15}}})}function N(a,e,t={}){const r=new Map;return{get:(c,n=0,l=.15,p=0)=>{const i=`${c}|${n}|${l}|${p}`;let o=r.get(i);return o||(o=_(a,e,{...t,color:c,pattern:n,spec:l,emissive:p}),r.set(i,o)),o},all:()=>[...r.values()]}}export{C as P,V as S,N as a,z as b,O as m,L as s,W as u};
