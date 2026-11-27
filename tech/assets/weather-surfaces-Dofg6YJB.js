import{g as se,a5 as de,$ as ve,e as me,p as we,u as ee,az as he,M as E,S as I,o as ge,aK as xe,D as Se,aB as ye,P as be,B as S,C as te,x as Me,aT as Pe,r as We,s as Ne,q as Re,b as _e,a3 as ze,aM as ae,ae as ke,n as Fe,ad as Ce}from"./three.module-BZgG6AUv.js";import{m as Ae}from"./three-viewer-0rZIEDzf.js";import{a as ie}from"./canvas-viewer-Btf0JXdr.js";import{G as ce}from"./glsl-DOwCk4-f.js";const oe=new se(-.5,.55,.67).normalize(),He=t=>-.2+t*.25,ne=`
uniform float uMode; uniform float uWetS; uniform float uWetP; uniform float uLevel; uniform float uSnow;
uniform float uTime; uniform float uRipple; uniform float uMask; uniform vec3 uSunDir;
uniform float uPor; uniform float uTop;
varying vec3 vWP; varying vec3 vWN; varying float vHB;
${ce}
float broadH(vec2 p){
  float h = (vnoise(p * .33) - .5) * .07 + (vnoise(p * .9 + 7.) - .5) * .025;
  vec2 d;
  d = p - vec2(.3, 1.3);   h -= .16 * exp(-dot(d, d) / 3.);
  d = p - vec2(-2.4, -1.9); h -= .14 * exp(-dot(d, d) / 1.8);
  d = p - vec2(2.9, 3.4);  h -= .13 * exp(-dot(d, d) / 1.5);
  d = p - vec2(-2.2, 3.9); h -= .12 * exp(-dot(d, d) / 2.2);
  d = p - vec2(3.6, -1.7); h -= .10 * exp(-dot(d, d) / 1.);
  return h;
}
// 눈 윗면 높이: 낮은 곳(줄눈)부터 메우고, 노이즈로 바람에 쌓인 듯한 두께 변화
float snowH(vec2 p, float hb){ return hb - .008 + uSnow * (.03 + .10 * vnoise(p * .55 + 3.) + .015 * vnoise(p * 3.1)); }
`,Le=`
#ifdef W_GROUND
uniform sampler2D tRefl; uniform mat4 uReflVP; uniform float uReflOn;
#endif
// 보로노이 자갈: 가장 가까운 점 = 돌 하나, (F2 − F1)/2 ≈ 줄눈까지의 거리
float stoneH(vec2 p, out float id, out float sd){
  vec2 q = p / .26;
  vec2 c = floor(q), f = fract(q);
  float d1 = 9., d2 = 9.; vec2 c1 = vec2(0.), o1 = vec2(0.);
  for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++){
    vec2 n = vec2(float(i), float(j));
    vec2 r = n + .5 + (hash22(c + n) - .5) * .75 - f;
    float d = dot(r, r);
    if (d < d1){ d2 = d1; d1 = d; c1 = c + n; o1 = r; } else if (d < d2) d2 = d;
  }
  float edge = (sqrt(d2) - sqrt(d1)) * .5 * .26;
  id = hash12(c1 + 17.);
  sd = .011 - edge;                       // 줄눈 반폭 1.1cm, 음수 = 돌 안쪽
  float dome = smoothstep(0., .06, -sd);
  float top = .03 + .018 * hash12(c1 + 5.3) + dot(o1, hash22(c1 + 2.2) - .5) * .02;
  return dome * (2. - dome) * top * (.92 + .08 * vnoise(p * 22.));
}
// 빗방울 파문: 셀마다 무작위 위치·위상으로 퍼지는 고리. 높이 대신 기울기(법선)만 반환
vec2 rippleGrad(vec2 p, float t, float amt){
  vec2 g = vec2(0.);
  for (int L = 0; L < 3; L++){
    float fl = float(L);
    vec2 q = p * 2.4 + vec2(fl * .37, fl * .71);
    vec2 c = floor(q), f = fract(q);
    float on = step(hash12(c * 1.37 + fl * 5.1), amt);
    vec2 ctr = .22 + .56 * hash22(c + fl * 19.1);
    float life = fract(t * (.8 + .3 * fl) + hash12(c + fl * 7.3 + 1.7));
    vec2 dv = f - ctr; float r = length(dv);
    float x = (r - life * .36) * 30.;
    float w = exp(-x * x * .12) * (1. - life) * (1. - life) * on;
    g += dv / max(r, 1e-4) * cos(x) * w;
  }
  return g;
}
vec3 heat(float x){ x = clamp(x, 0., 1.); return mix(mix(vec3(.04, .05, .12), vec3(.1, .45, .75), smoothstep(0., .5, x)), vec3(1., .85, .3), smoothstep(.5, 1., x)); }
vec3 glintN(vec3 n, vec3 cell){ return normalize(n + (vec3(hash13(cell), hash13(cell + 3.1), hash13(cell + 7.7)) - .5) * .9); }
// 눈 결정 반짝임: 무작위로 기운 작은 면 중 태양을 시선 쪽으로 반사하는 것만 골라 매끈하게
bool glintOn(vec3 n, vec3 cell, vec3 V){ return hash13(cell + 11.) > .9 && dot(reflect(-V, glintN(n, cell)), uSunDir) > .985; }
`,Te=`
vec3 wV = normalize(cameraPosition - vWP);
vec2 wp = vWP.xz;
float sid, ssd;
float hs = stoneH(wp, sid, ssd);
// 높이의 화면 미분으로 법선 교란(범프): 높이 함수를 한 번만 계산
vec3 wNm = normalize(vWN);
vec3 dpx = dFdx(vWP), dpy = dFdy(vWP);
vec3 r1 = cross(dpy, wNm), r2 = cross(wNm, dpx);
float det = dot(dpx, r1);
vec3 wN = normalize(abs(det) * wNm - sign(det) * (dFdx(hs) * r1 + dFdy(hs) * r2));
float wH = vHB + hs;
float inStone = smoothstep(.002, -.006, ssd);
vec3 stoneC = mix(vec3(.12, .115, .11), vec3(.22, .19, .155), sid) * (.7 + .6 * vnoise(wp * 6. + sid * 13.));
stoneC *= mix(.6, 1., smoothstep(0., .035, -ssd));   // 모서리에 낀 때
vec3 wAlb = mix(vec3(.11, .095, .08), stoneC, inStone) * (.8 + .4 * vnoise(wp * .6 + 4.));
float wPor = mix(1., .55, inStone);
float wRough = mix(.95, .7 - .12 * sid, inStone);
float wWet = 0., wPud = 0., wSnow = 0.;
float wDepth = uLevel - wH;
bool wRainy = (uMode > .5 && uMode < 1.5) || uMode > 2.5;
bool wSnowy = uMode > 1.5;
bool wGlint = false;
if (wRainy) {
  wWet = mix(uWetS, uWetP, wPor);
  wWet = max(wWet, smoothstep(-.02, 0., wDepth) * step(-.195, uLevel));  // 웅덩이 가장자리 젖은 띠
  wPud = smoothstep(0., .004, wDepth);
}
if (uMode > .5 && uMode < 1.5) {
  wAlb *= mix(1., .25, wPor * wWet);                         // 다공성일수록 더 어두워짐
  wRough = mix(wRough, mix(.07, .3, wPor), wWet);           // 물막 → 매끈
  if (wPud > 0.) {
    vec2 g = rippleGrad(wp, uTime, uRipple);
    vec3 Nw = normalize(vec3(-g.x * .3, 1., -g.y * .3));    // 평평한 수면 + 파문
    wN = normalize(mix(wN, Nw, wPud));
    wAlb = mix(wAlb, wAlb * vec3(.16, .18, .2) * exp(-wDepth * 10.), wPud);   // 물속 바닥: 빛이 덜 닿아 어두움
    wRough = mix(wRough, .02, wPud);
  }
}
if (wSnowy) {
  float S = snowH(wp, vHB);
  wSnow = smoothstep(-.002, .01, S - wH) * step(.001, uSnow);
  if (uMode < 2.5) {
    float dust = smoothstep(-.035, 0., S - wH) * uSnow * .5;
    const float ee = .05;
    vec3 Ns = normalize(vec3(S - snowH(wp + vec2(ee, 0.), vHB), ee, S - snowH(wp + vec2(0., ee), vHB)) + vWN - vec3(0., 1., 0.));
    float cov = max(wSnow, dust);
    wAlb = mix(wAlb, vec3(.86, .89, .94), cov);
    wRough = mix(wRough, .8, cov);
    wN = normalize(mix(wN, Ns, wSnow));
    vec3 cell = floor(vWP * 90.);
    if (wSnow > .5 && glintOn(Ns, cell, wV)) { wN = glintN(Ns, cell); wRough = .08; }
  }
}
diffuseColor.rgb = wAlb;
float wMaskD = wDepth; float wMaskH = clamp((wH + .2) / .28, 0., 1.); vec3 wMaskN = wN;
`,De=`
vec3 wV = normalize(cameraPosition - vWP);
vec3 wNg = normalize(vWN);
float nz = vnoise(vWP.xz * 1.3 + vWP.y * .7) * .6 + vnoise(vWP.xz * 5. + 2.) * .4;
float wWet = 0., wSnow = 0., wPud = 0.;
float wPor = uPor;
bool wRainy = (uMode > .5 && uMode < 1.5) || uMode > 2.5;
bool wSnowy = uMode > 1.5;
bool wGlint = false;
if (wRainy) {
  wWet = mix(uWetS, uWetP, uPor);
  float st = vnoise(vec2(dot(vWP.xz, vec2(.7071)) * 16., vWP.y * .9));   // 수직면 흘러내린 자국
  wWet *= mix(1., .45 + .7 * st, 1. - abs(wNg.y));
  wWet *= wNg.y < -.5 ? .25 : 1.;                                        // 아랫면은 덜 젖음
  wWet = clamp(wWet, 0., 1.);
}
if (wSnowy) {
  float cover = clamp(uSnow * 1.6 - (1. - nz) * .7, 0., 1.);
  wSnow = smoothstep(.5, .8, wNg.y) * smoothstep(0., .15, cover);
  if (uTop > -50.) {   // 윗면 가장자리: 옆면 위쪽을 눈 두께만큼 흰 띠로
    float th = uSnow * .07;
    wSnow = max(wSnow, smoothstep(uTop - th - .005, uTop - th + .005, vWP.y) * step(abs(wNg.y), .6) * smoothstep(.05, .2, uSnow) * step(.35, nz));
  }
}
if (uMode > .5 && uMode < 1.5) diffuseColor.rgb *= mix(1., .25, uPor * wWet);
vec3 wCell = floor(vWP * 90.);
if (uMode > 1.5 && uMode < 2.5) {
  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.86, .89, .94), wSnow);
  wGlint = wSnow > .5 && glintOn(vec3(0., 1., 0.), wCell, wV);
}
float wMaskD = 0.; float wMaskH = .2; vec3 wMaskN = wNg;
`;function Ge(t,a){let o=t.vertexShader;o=o.replace("#include <common>",`#include <common>
`+ne),a&&(o=o.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
      { float e = .08; float h0 = broadH(position.xz);
        objectNormal = normalize(vec3(h0 - broadH(position.xz + vec2(e, 0.)), e, h0 - broadH(position.xz + vec2(0., e)))); }`),o=o.replace("#include <begin_vertex>",`#include <begin_vertex>
      float hb = broadH(position.xz); vHB = hb; float yy = hb;
      if (uMode > 1.5 && uMode < 2.5) yy = max(hb, snowH(position.xz, hb));   // 눈 두께만큼 정점을 올림
      transformed.y += yy;`)),o=o.replace("#include <project_vertex>",`#include <project_vertex>
    vWP = (modelMatrix * vec4(transformed, 1.)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);`),t.vertexShader=o;let e=t.fragmentShader;e=e.replace("#include <common>",`#include <common>
`+ne+Le),e=e.replace("#include <map_fragment>",`#include <map_fragment>
`+(a?Te:De)),e=e.replace("#include <roughnessmap_fragment>",a?`#include <roughnessmap_fragment>
roughnessFactor = wRough;`:`#include <roughnessmap_fragment>
      if (uMode > .5 && uMode < 1.5) roughnessFactor = mix(roughnessFactor, mix(.06, .28, uPor), wWet);
      if (uMode > 1.5 && uMode < 2.5) roughnessFactor = mix(roughnessFactor, .8, wSnow);
      if (wGlint) roughnessFactor = .08;`),e=e.replace("#include <metalnessmap_fragment>",`#include <metalnessmap_fragment>
if (uMode > 1.5 && uMode < 2.5) metalnessFactor *= 1. - wSnow;`),e=e.replace("#include <normal_fragment_maps>",a?`#include <normal_fragment_maps>
normal = normalize((viewMatrix * vec4(wN, 0.)).xyz);`:`#include <normal_fragment_maps>
if (wGlint) normal = normalize((viewMatrix * vec4(glintN(vec3(0., 1., 0.), wCell), 0.)).xyz);`),a&&(e=e.replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
      if (uReflOn > .5 && wPud > .001) {
        vec3 Vd = normalize(vWP - cameraPosition);
        float tp = (uLevel - cameraPosition.y) / min(Vd.y, -1e-3);
        vec3 Pp = cameraPosition + Vd * tp;
        vec4 cl = uReflVP * vec4(Pp, 1.);
        vec2 ruv = cl.xy / cl.w * .5 + .5 + wN.xz * .05;
        vec3 pl = texture2D(tRefl, ruv).rgb;
        float inb = smoothstep(0., .02, ruv.x) * smoothstep(1., .98, ruv.x) * smoothstep(0., .02, ruv.y) * smoothstep(1., .98, ruv.y);
        float F = .02 + .98 * pow(1. - max(dot(wN, -Vd), 0.), 5.);
        reflectedLight.indirectSpecular = mix(reflectedLight.indirectSpecular, pl * F, wPud * inb);
      }`)),e=e.replace("#include <opaque_fragment>",`#include <opaque_fragment>
    if (uMode > 2.5) {
      vec3 mc;
      if (uMask < .5) mc = heat(wPor * wWet);
      else if (uMask < 1.5) mc = mix(vec3(.06), mix(vec3(.1, .35, .65), vec3(.65, .95, 1.), clamp(wMaskD * 12., 0., 1.)), wPud);
      else if (uMask < 2.5) mc = mix(vec3(.05, .07, .12), vec3(1.), wSnow);
      else mc = vec3(wMaskH);
      float lam = .55 + .45 * max(dot(wMaskN, normalize(vec3(.3, 1., .4))), 0.);
      gl_FragColor.rgb = mc * lam;
    }`),t.fragmentShader=e}const $e=`
uniform vec3 uSunDir; varying vec3 vD;
${ce}
vec3 skyCol(vec3 d){
  float y = d.y;
  vec3 c = mix(vec3(.62, .68, .76), vec3(.16, .32, .7), pow(clamp(y, 0., 1.), .5));
  if (y > 0.) {
    vec2 uv = d.xz / (y + .15) * 1.5;
    float cl = smoothstep(.45, .8, fbm2(uv * .6 + 3.));
    c = mix(c, vec3(.9, .91, .94) * (.75 + .3 * fbm2(uv * 1.7)), cl * .85 * smoothstep(0., .12, y));
  }
  c = mix(c, vec3(.18, .17, .15), smoothstep(0., -.08, y));
  float s = max(dot(d, uSunDir), 0.);
  c += vec3(1., .9, .75) * (pow(s, 900.) * 40. + pow(s, 16.) * .25);
  return c;
}
void main(){
  gl_FragColor = vec4(skyCol(normalize(vD)), 1.);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,Oe=`
attribute vec4 aS; uniform float uTime; varying float vA;
void main(){
  float y = mod(aS.z - uTime * 10. * aS.w, 7.) - .3;
  vec3 p = vec3(aS.x + position.y * .05, y + position.y * .5, aS.y);
  vA = 1. - position.y * .85;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.);
}`,Ve="uniform float uA; varying float vA; void main(){ gl_FragColor = vec4(.78, .84, .95, uA * vA); }",je=`
attribute vec4 aS; uniform float uTime; uniform float uPx;
void main(){
  float y = mod(aS.z - uTime * .55 * aS.w, 7.);
  vec3 p = vec3(aS.x + sin(uTime * .8 + aS.z * 3.) * .25, y, aS.y + cos(uTime * .6 + aS.x * 2.) * .2);
  vec4 mv = viewMatrix * vec4(p, 1.);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uPx * (.6 + aS.w) / -mv.z;
}`,qe="uniform float uA; void main(){ float a = smoothstep(.5, .15, length(gl_PointCoord - .5)); gl_FragColor = vec4(vec3(.96), a * uA); }",_=t=>t-Math.floor(t);function O(t,a){let o=_(t*.1031),e=_(a*.1031),n=_(t*.1031);const r=o*(e+33.33)+e*(n+33.33)+n*(o+33.33);return o+=r,e+=r,n+=r,_((o+e)*n)}function re(t,a){let o=_(t*.1031),e=_(a*.103),n=_(t*.0973);const r=o*(e+33.33)+e*(n+33.33)+n*(o+33.33);return o+=r,e+=r,n+=r,[_((o+e)*n),_((o+n)*e)]}function X(t,a){const o=Math.floor(t),e=Math.floor(a),n=t-o,r=a-e,l=n*n*(3-2*n),f=r*r*(3-2*r),v=O(o,e),w=O(o+1,e),N=O(o,e+1),h=O(o+1,e+1);return(v+(w-v)*l)*(1-f)+(N+(h-N)*l)*f}function Be(t,a){let o=(X(t*.33,a*.33)-.5)*.07+(X(t*.9+7,a*.9+7)-.5)*.025;const e=(n,r,l,f)=>{const v=t-n,w=a-r;o-=l*Math.exp(-(v*v+w*w)/f)};return e(.3,1.3,.16,3),e(-2.4,-1.9,.14,1.8),e(2.9,3.4,.13,1.5),e(-2.2,3.9,.12,2.2),e(3.6,-1.7,.1,1),o}const V=(t,a,o)=>{const e=Math.min(1,Math.max(0,(o-t)/(a-t)));return e*e*(3-2*e)};function Ue(t,a){const o=t/.26,e=a/.26,n=Math.floor(o),r=Math.floor(e),l=o-n,f=e-r;let v=9,w=9,N=0,h=0,R=0,p=0;for(let P=-1;P<=1;P++)for(let z=-1;z<=1;z++){const[j,q]=re(n+z,r+P),T=z+.5+(j-.5)*.75-l,k=P+.5+(q-.5)*.75-f,L=T*T+k*k;L<v?(w=v,v=L,N=n+z,h=r+P,R=T,p=k):L<w&&(w=L)}const H=(Math.sqrt(w)-Math.sqrt(v))*.5*.26,G=V(0,.06,H-.011),[u,c]=re(N+2.2,h+2.2),Y=.03+.018*O(N+5.3,h+5.3)+(R*(u-.5)+p*(c-.5))*.02;return G*(2-G)*Y}const K=[];function ue(){if(K.length)return K;for(let t=0;t<52;t++)for(let a=0;a<44;a++){const o=-6.5+(t+.5)*.25,e=-3.8+(a+.5)*(10.8/44),n=Be(o,e);K.push({hb:n,h:n+Ue(o,e),x:o,z:e})}return K}function Ee(t){const a=ue();let o=0;for(const e of a)t-e.h>.002&&o++;return o/a.length}function Ie(t){const a=ue();let o=0,e=0,n=0;for(const r of a){const l=r.hb-.008+t*(.03+.1*X(r.x*.55+3,r.z*.55+3)+.015*X(r.x*3.1,r.z*3.1));l>r.h&&o++;const f=Math.max(0,l-r.hb);e+=f,n=Math.max(n,f)}return{cover:o/a.length,avg:e/a.length,max:n}}function Ke(t,a,o){if(t<0)return{wetS:a,wetP:a,L:o,rain:1,phase:""};const e=V(13,15,t),n=a*(1-V(.3,3.5,t)),r=a*(1-V(1.2,6.5,t)),l=o+(Math.min(o,-.175)-o)*V(4.5,11.5,t),f=t<3.5?"비 그침 · 매끈한 돌 윗면부터 마름":t<6.5?"다공성 줄눈이 늦게 마르는 중":t<11.5?"웅덩이 증발 중 (가장 늦게)":t<13?"완전 건조":"다시 비";return{wetS:n+(a-n)*e,wetP:r+(a-r)*e,L:l+(o-l)*e,rain:t<13?0:e,phase:f}}function le(t,a){const o=document.createElement("canvas");o.width=256,o.height=128;const e=o.getContext("2d"),n=ie(7);e.fillStyle="#7a7166",e.fillRect(0,0,256,128);for(let l=0;l<4;l++){const f=l%2?32:0;for(let v=-1;v<5;v++){const w=n();e.fillStyle=`rgb(${120+w*50|0},${58+w*22+n()*10|0},${42+n()*18|0})`,e.fillRect(v*64+f+3,l*32+3,58,26)}}for(let l=0;l<1800;l++)e.fillStyle=`rgba(${n()<.5?"0,0,0":"255,240,220"},${.08+n()*.1})`,e.fillRect(n()*256,n()*128,2,2);const r=new ke(o);return r.colorSpace=Fe,r.wrapS=r.wrapT=Ce,r.repeat.set(t,a),r.anisotropy=4,r}function Xe(t,a){return Ae(t,{antialias:!0,cam:[6.4,1.75,7.2],target:[-.6,.45,-.6],fov:50},({scene:o,camera:e,renderer:n,controls:r})=>{n.toneMapping=a===3?de:ve,n.toneMappingExposure=.85,n.shadowMap.enabled=!0,n.shadowMap.type=me,n.shadowMap.autoUpdate=!1,n.shadowMap.needsUpdate=!0,n.info.autoReset=!1,o.background=new we(a===3?1053464:10466252);const l=new ee({uniforms:{uSunDir:{value:oe}},vertexShader:"varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",fragmentShader:$e,side:he,depthWrite:!1}),f=new E(new I(90,48,24),l);f.frustumCulled=!1,f.renderOrder=-1;const v=new ge;v.add(new E(f.geometry,l));const w=new xe(n),N=w.fromScene(v,0,.1,200);w.dispose(),o.environment=N.texture,a!==3&&o.add(f);const h=new Se(16773597,3.6);h.position.copy(oe).multiplyScalar(20),h.castShadow=!0;const R=h.shadow.camera;R.left=-10,R.right=10,R.top=10,R.bottom=-10,R.near=1,R.far=45,h.shadow.mapSize.set(1024,1024),h.shadow.bias=-5e-4,h.shadow.normalBias=.02,o.add(h,h.target);const p={uMode:{value:a},uWetS:{value:0},uWetP:{value:0},uLevel:{value:-1},uSnow:{value:0},uTime:{value:0},uRipple:{value:0},uMask:{value:1},uSunDir:{value:oe}},H={tRefl:{value:null},uReflVP:{value:new ye},uReflOn:{value:0}},G=[],u=s=>{const x=new _e({color:s.color,roughness:s.rough,metalness:s.metal??0,map:s.map??null}),i=!!s.ground;return x.onBeforeCompile=d=>{Object.assign(d.uniforms,p,{uPor:{value:s.por},uTop:{value:s.top??-100}},i?H:{}),i&&(d.defines={...d.defines??{},W_GROUND:""}),Ge(d,i)},x.customProgramCacheKey=()=>i?"weather-ground":"weather-prop",x},c=(s,x,i,d,C,D=0)=>{const y=new E(s,x);return y.position.set(i,d,C),y.rotation.y=D,y.castShadow=!0,y.receiveShadow=!0,o.add(y),y},Y=new be(24,18,192,144).rotateX(-Math.PI/2).translate(2.5,0,2),P=new E(Y,u({color:16777215,rough:.9,por:1,ground:!0}));P.receiveShadow=!0,o.add(P);const z=le(7.5,2.6),j=le(5,2.6);G.push(z,j),c(new S(15,2.6,.4),u({color:16777215,rough:.88,por:.8,top:2.6,map:z}),0,1.3,-4.2),c(new S(.4,2.6,10),u({color:16777215,rough:.88,por:.8,top:2.6,map:j}),-7.3,1.3,.6),c(new S(15.2,.12,.55),u({color:10130828,rough:.8,por:.6,top:2.72}),0,2.66,-4.2),c(new S(.55,.12,10.2),u({color:10130828,rough:.8,por:.6,top:2.72}),-7.3,2.66,.6),c(new S(2.2,.07,.55),u({color:9132598,rough:.7,por:.85,top:.515}),1.8,.48,-3.3),c(new S(2.2,.45,.06),u({color:9132598,rough:.7,por:.85,top:1.025}),1.8,.8,-3.55);const q=u({color:2829875,rough:.45,metal:.85,por:0,top:.45});c(new S(.08,.45,.55),q,.85,.225,-3.3),c(new S(.08,.45,.55),q,2.75,.225,-3.3),c(new S(.8,.8,.8),u({color:10516560,rough:.75,por:.9,top:.8}),-3.7,.4,-3.2,.2),c(new S(.7,.7,.7),u({color:10121288,rough:.75,por:.9,top:.7}),-2.8,.35,-3.35,-.3),c(new S(.6,.6,.6),u({color:11042904,rough:.75,por:.9,top:1.4}),-3.6,1.1,-3.2,.5),c(new te(.06,.08,3.2,16),u({color:2829875,rough:.4,metal:.85,por:0,top:3.2}),-1,1.6,-3.3),c(new S(.35,.2,.35),u({color:2829875,rough:.4,metal:.85,por:0,top:3.35}),-1,3.25,-3.3),c(new S(1.3,.6,1.3),u({color:10196620,rough:.85,por:.6,top:.6}),4.4,.3,-.4),c(new S(1.15,.05,1.15),u({color:3811870,rough:.95,por:1,top:.605}),4.4,.58,-.4),c(new I(.55,32,16),u({color:4156213,rough:.8,por:.9,top:1.55}),4.4,1,-.4),c(new te(.36,.36,1,24),u({color:3104655,rough:.35,metal:.5,por:.05,top:1}),-5,.5,1.6);const T=u({color:8025200,rough:.6,por:.4,top:.45});c(new I(.3,24,12),T,-3.8,.15,3),c(new I(.3,24,12),T,-4.4,.15,4.6);const k=ie(a*11+5),L=(s,x)=>{const i=new ze,d=x?2:1,C=new Float32Array(s*d*3),D=new Float32Array(s*d*4);for(let y=0;y<s;y++){const m=[-8+k()*16,-6+k()*14,k()*7,.8+k()*.4];for(let A=0;A<d;A++)C[(y*d+A)*3+1]=A,D.set(m,(y*d+A)*4)}return i.setAttribute("position",new ae(C,3)),i.setAttribute("aS",new ae(D,4)),i},$={uTime:{value:0},uA:{value:.35},uPx:{value:20}};let g=null;a===1?g=new Me(L(1400,!0),new ee({uniforms:$,vertexShader:Oe,fragmentShader:Ve,transparent:!0,depthWrite:!1})):a===2&&(g=new Pe(L(1500,!1),new ee({uniforms:$,vertexShader:je,fragmentShader:qe,transparent:!0,depthWrite:!1}))),g&&(g.frustumCulled=!1,o.add(g));const F=a===1?new We(4,4,{type:Ne}):null,M=new Re,B=new se;let J=0,Q=0,Z=0,W={L:NaN,area:0,snowKey:NaN,snow:{cover:0,avg:0,max:0}},U=0;return{resize(s,x,i){F&&(J=Math.max(1,Math.round(s*i*.5)),Q=Math.max(1,Math.round(x*i*.5)),F.setSize(J,Q)),$.uPx.value=16*i},update(s,x){const i=t.params,d=t.shared.get("wx");let C=d&&d.start>=0?(performance.now()-d.start)/1e3:-1;d&&C>15&&(d.start=-1,C=-1);const D=i.num("wet",.85),y=He(i.num("level",.62)),m=Ke(a===1||a===3?C:-1,D,y);if(p.uTime.value=x,p.uMask.value=["wet","puddle","snow","height"].indexOf(i.str("mask","puddle")),a===0?(p.uWetS.value=p.uWetP.value=0,p.uLevel.value=-1,p.uSnow.value=0):(p.uWetS.value=m.wetS,p.uWetP.value=m.wetP,p.uLevel.value=m.L,p.uSnow.value=i.num("snow",.6),p.uRipple.value=i.num("ripple",.7)*m.rain),$.uTime.value=x,g){const b=i.bool("particles",!0);g.visible=b&&(a===2||m.rain>.01),$.uA.value=a===1?.38*m.rain:.9}if(Z-=s,Z>0)return;Z=.2;const A=b=>b.toFixed(2);if(a===0)t.hud(`건조 · 거칠기 줄눈 0.95 / 돌 0.6~0.7
반사: 흐린 하늘 환경맵뿐 · draw ${U}`);else if(a===1){const b=Math.round(m.L*500)/500;b!==W.L&&(W.L=b,W.area=Ee(b));const fe=1-.75*.55*m.wetS,pe=1-.75*m.wetP;t.hud(`젖음 ${Math.round(m.wetP*100)}% · 알베도 돌 ×${A(fe)} / 줄눈 ×${A(pe)}
웅덩이 면적 ${Math.round(W.area*100)}% · 수위 ${(m.L*100).toFixed(1)}cm
반사 패스 ${J}×${Q} · draw ${U}(2회)`+(m.phase?`
⏱ ${m.phase}`:""))}else if(a===2){const b=p.uSnow.value;b!==W.snowKey&&(W.snowKey=b,W.snow=Ie(b)),t.hud(`눈 덮임(바닥) ${Math.round(W.snow.cover*100)}% · 평균 ${(W.snow.avg*100).toFixed(1)}cm
정점 오프셋 최대 ${(W.snow.max*100).toFixed(1)}cm · draw ${U}`)}else{const b={wet:"젖음 마스크 = 다공성 × 젖음 (밝을수록 더 어두워짐)",puddle:"웅덩이 마스크 = 수위 − 높이 > 0 (밝을수록 깊음)",snow:"눈 마스크 = 눈 높이 > 지면 높이, 소품은 법선·위",height:"높이맵: 줄눈 낮음(검정) · 돌 윗면 높음(흰색)"};t.hud(b[i.str("mask","puddle")]+(m.phase?`
⏱ ${m.phase}`:""))}},render(){if(n.info.reset(),F&&p.uLevel.value>-.205){const s=p.uLevel.value;M.fov=e.fov,M.aspect=e.aspect,M.near=e.near,M.far=e.far,M.updateProjectionMatrix(),M.position.set(e.position.x,2*s-e.position.y,e.position.z),B.copy(r.target),B.y=2*s-B.y,M.up.set(0,1,0),M.lookAt(B),M.updateMatrixWorld(),H.uReflVP.value.multiplyMatrices(M.projectionMatrix,M.matrixWorldInverse),P.visible=!1;const x=(g==null?void 0:g.visible)??!1;g&&(g.visible=!1),n.setRenderTarget(F),n.render(o,M),n.setRenderTarget(null),P.visible=!0,g&&(g.visible=x),H.tRefl.value=F.texture,H.uReflOn.value=1}else H.uReflOn.value=0;n.render(o,e),U=n.info.render.calls},dispose(){F==null||F.dispose(),N.dispose(),G.forEach(s=>s.dispose())}}})}const Ye=[{mode:0,title:"맑음",kind:"before",caption:"마른 자갈 바닥. 거칠기가 높아 하늘이 흐릿하게만 비치고, 줄눈은 밝은 흙색."},{mode:1,title:"젖음 · 웅덩이",kind:"after",caption:"다공성 줄눈·벽돌은 진하게 어두워지고 돌은 매끈해져 햇빛을 반짝 반사. 낮은 곳엔 벽과 가로등을 비추는 웅덩이와 빗방울 파문."},{mode:2,title:"눈 쌓임",kind:"variant",caption:"위를 향한 면(법선·위)부터 쌓이고 줄눈 같은 낮은 곳을 먼저 메운다. 바닥 정점이 눈 두께만큼 올라가 소품 아랫부분이 묻힌다."},{mode:3,title:"마스크 보기",kind:"info",caption:'셰이더가 내부에서 계산하는 마스크를 그대로 출력. "마스크 표시"로 젖음·웅덩이·눈·높이맵을 바꿔 본다.'}],oo={layout:"variants",intro:"비가 오면 장면 전체를 다시 만드는 게 아니라, 같은 재질에 <b>날씨 파라미터</b>를 넣어 셰이더가 표면을 바꿉니다. 젖으면 <b>알베도가 어두워지고</b>(다공성 재질일수록 더) <b>거칠기가 낮아져</b> 반사가 선명해지고, 높이맵이 낮은 곳에는 <b>웅덩이</b>가 고여 거울처럼 주변을 비추며 빗방울 <b>파문</b>이 퍼집니다. 눈은 <b>위를 향한 면</b>부터 노이즈 마스크를 따라 쌓입니다. 여기서는 MeshStandardMaterial에 onBeforeCompile로 이 계산을 직접 끼워 넣었습니다.",how:["젖음 w(0~1)와 재질의 다공성 p로 알베도 × lerp(1, 0.3, p·w), 거칠기는 물막 값(0.07~0.3)으로 보간. 금속·도장면은 어두워지지 않고 매끈해지기만 한다.","웅덩이: 수위 − 높이맵 > 0인 픽셀은 법선을 위(0,1,0)로 평평하게, 거칠기 0.02, 바닥색은 물속처럼 어둡게.","웅덩이 반사: 카메라를 수면 높이 기준으로 뒤집어 반 해상도 렌더 타깃에 한 번 더 그리고, 프레넬(F0 0.02)로 섞는다.","빗방울 파문: 셀마다 무작위 위치·시간으로 퍼지는 고리의 기울기를 수면 법선에 더하고, 반사 UV도 그만큼 흔든다.",'눈: 소품은 world 법선의 y(위를 향한 정도) × 노이즈, 바닥은 "눈 높이 > 지면 높이"로 줄눈부터 메우고 정점을 눈 두께만큼 올린다. 무작위 셀의 법선을 비틀어 반짝임.'],pros:["메시·텍스처 추가 없이 파라미터 하나로 맑음↔비↔눈 전환","높이맵을 재활용해 웅덩이·눈이 지형에 맞게 자연스럽게 분포",'시간에 따라 값만 바꾸면 "마르는" 과정도 표현'],cons:["평면 반사는 장면을 한 번 더 그려야 함(웅덩이 높이가 여럿이면 SSR로 대체)","모든 셰이더에 날씨 코드가 들어가야 해서 재질 시스템 차원의 설계 필요","세로 면의 빗물 흐름, 물체 아래 비 가림(occlusion) 등은 별도 처리"],usedIn:"오픈 월드·레이싱 게임의 동적 날씨에서 흔한 구성(예: Uncharted 4, Assassin's Creed 시리즈, Red Dead Redemption 2 등의 젖은 표면·눈 쌓임). 세부 구현은 게임마다 다름.",controls:[{type:"range",key:"wet",label:"젖음",min:0,max:1,step:.01,value:.85},{type:"range",key:"level",label:"웅덩이 수위",min:0,max:1,step:.01,value:.62},{type:"range",key:"ripple",label:"빗방울 파문",min:0,max:1,step:.01,value:.7},{type:"range",key:"snow",label:"눈 양",min:0,max:1,step:.01,value:.6},{type:"toggle",key:"particles",label:"비·눈 입자",value:!0},{type:"select",key:"mask",label:"마스크 표시",value:"puddle",options:[{label:"젖음",value:"wet"},{label:"웅덩이",value:"puddle"},{label:"눈",value:"snow"},{label:"높이맵",value:"height"}]},{type:"button",key:"dry",label:"비 그치기 (마르기)"}],viewers:Ye.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:a=>Xe(a,t.mode)})),setup(t,a){const o={start:-1};return a.set("wx",o),t.on(e=>{e==="dry"&&o.start<0&&(o.start=performance.now())})}};export{oo as default};
