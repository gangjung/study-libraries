import{S as at,g as L,M as K,u as tt,aq as ft,Q as pt}from"./three.module-BZgG6AUv.js";import{m as ht}from"./three-viewer-0rZIEDzf.js";import{m as dt}from"./canvas-viewer-Btf0JXdr.js";import{G as it}from"./glsl-DOwCk4-f.js";const lt=12,f=.5,_=.5,D=Math.sqrt(1-f*f),M=1.08,p=((M-D)**2+f*f)/(2*(M-D)),z=M-p,xt=1.035,V=e=>e.toFixed(5);function bt(){const e=new at(1,128,96);e.rotateX(Math.PI/2);const t=e.attributes.position;for(let r=0;r<t.count;r++){const c=t.getX(r),a=t.getY(r),v=t.getZ(r),o=Math.hypot(c,a);v>0&&o<f+1e-4&&t.setZ(r,z+Math.sqrt(Math.max(p*p-o*o,0)))}return e.computeVertexNormals(),e}const nt=`
const float LID_W = 1.15;
const float LID_U = 0.46;
const float LID_L = 0.44;
vec2 lidUV(vec3 d){ return vec2(atan(d.x, d.z) / LID_W, asin(clamp(d.y, -1., 1.))); }
float lidUp(float u){ float k = max(1. - u*u, 0.); return LID_U * pow(k, 0.55) - 0.04 + 0.06*u; }
float lidLo(float u){ float k = max(1. - u*u, 0.); return -LID_L * pow(k, 0.75) + 0.03*u; }
`,yt=`
varying vec3 vLocal;
varying vec3 vWorld;
void main(){
  vLocal = position;
  vec4 w = modelMatrix * vec4(position, 1.);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Lt=`
${it}
${nt}
const float RL = ${V(f)};
const float RI = ${V(_)};
const float ZC = ${V(z)};
const float ZA = ${V(M)};
uniform int uMode;      // 0 평면, 1 시차, 2 굴절, 3 애니풍
uniform int uView;      // 0 최종, 1 샘플 격자
uniform vec3 uCamL;     // 카메라 위치 (눈 로컬)
uniform vec3 uLightL;   // 빛 방향 (눈 로컬, 표면→빛)
uniform vec3 uRightL;   // 카메라 오른쪽 (눈 로컬)
uniform vec3 uUpL;      // 카메라 위쪽 (눈 로컬)
uniform float uZi;      // 홍채 평면 z
uniform float uIor;
uniform float uPupil;
uniform float uLimbal;
uniform float uLidAO;
uniform float uCatch;
uniform vec3 uIrisIn;
uniform vec3 uIrisOut;
varying vec3 vLocal;
varying vec3 vWorld;

float fib3(vec3 p){ return .5 * vnoise3(p) + .3 * vnoise3(p * 2.07 + 11.) + .2 * vnoise3(p * 4.13 + 23.); }

vec3 gridOver(vec3 col, vec2 uv){
  vec2 q = uv * 4.;
  vec2 g = abs(fract(q + .5) - .5) / max(fwidth(q), vec2(1e-4));
  float l = 1. - clamp(min(g.x, g.y) - .5, 0., 1.);
  col = mix(col, vec3(1., .82, .15), l * .9);
  float r = length(uv);
  float ring = abs(r - 1.) / max(fwidth(r), 1e-4);
  col = mix(col, vec3(.2, 1., .45), 1. - clamp(ring - .5, 0., 1.));
  return col;
}

/** 절차적 홍채: uv는 홍채 반지름 단위 (|uv| = 1이 림부스) */
vec3 irisTex(vec2 uv){
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  vec2 cs = vec2(cos(a), sin(a));
  float pr = uPupil;
  float t = clamp((r - pr) / (1. - pr), 0., 1.);
  float fb = fib3(vec3(cs * 14., r * 2.2));
  float f2 = vnoise3(vec3(cs * 42., r * 5.));
  vec3 col = mix(uIrisIn, uIrisOut, smoothstep(.12, .62, t + (fb - .5) * .4));
  col *= .5 + .95 * fb + .35 * (f2 - .5);
  // 동공 둘레 톱니 고리 (collarette)
  float zig = .3 + .035 * sin(a * 13. + fb * 4.);
  col += uIrisIn * .8 * smoothstep(.07, 0., abs(t - zig));
  // 움푹 팬 무늬 (crypts)
  float cr = smoothstep(.6, .74, vnoise3(vec3(cs * 7., r * 7.)));
  col *= 1. - .6 * cr * smoothstep(.25, .4, t) * smoothstep(.95, .7, t);
  // 림벌 링: 바깥 가장자리가 어둡게
  col *= mix(1., .1, uLimbal * smoothstep(.72, 1., t));
  // 동공
  col *= mix(.55, 1., smoothstep(pr, pr + .1, r));
  col = mix(vec3(.004), col, smoothstep(pr - .012, pr + .012, r));
  return col;
}

vec3 scleraTex(vec3 n){
  float ang = acos(clamp(n.z, -1., 1.));
  vec3 base = vec3(.80, .75, .70);
  float nz = vnoise3(n * 7.) * .6 + vnoise3(n * 16. + 5.) * .4;
  float vein = smoothstep(.9, .985, 1. - abs(2. * nz - 1.)) * smoothstep(.75, 1.25, ang);
  base = mix(base, vec3(.55, .1, .08), vein * .45);
  base = mix(base, vec3(.72, .5, .45), smoothstep(.8, 1.5, ang) * .5);
  return base;
}

/** 단순한 스튜디오 환경: 하늘 그라데이션 + 빛 방향의 사각 소프트박스(창문) */
vec3 envLight(vec3 R, vec3 L, float soft){
  vec3 sky = mix(vec3(.04, .04, .05), vec3(.45, .55, .7), smoothstep(-.2, .8, R.y));
  float s = dot(R, L);
  float box = 0.;
  if (s > 0.) {
    vec3 Tx = normalize(cross(vec3(0., 1., 0.), L));
    vec3 Ty = cross(L, Tx);
    vec2 q = vec2(dot(R, Tx), dot(R, Ty)) / s;
    box = (1. - smoothstep(.3 - soft, .3 + soft, abs(q.x))) * (1. - smoothstep(.2 - soft, .2 + soft, abs(q.y)));
  }
  return sky + vec3(1., .97, .92) * 60. * box;
}

void main(){
  vec3 p = vLocal;
  float rxy = length(p.xy);
  bool cornea = p.z > 0. && rxy < RL + .002;
  vec3 N = cornea ? normalize(p - vec3(0., 0., ZC)) : normalize(p);
  vec3 V = normalize(uCamL - p);
  vec3 vd = -V;
  vec3 L = normalize(uLightL);

  // 눈꺼풀 거리 (머리 공간: 눈꺼풀은 눈알과 함께 돌지 않음)
  vec2 luv = lidUV(normalize(vWorld));
  float du = lidUp(luv.x) - luv.y;
  float dl = luv.y - lidLo(luv.x);

  vec3 lightCol = vec3(1., .97, .92) * 1.9;
  vec3 amb = vec3(.2, .22, .26);
  vec3 col;

  if (uMode == 3) {
    // ── 애니풍: 깊이 없음, 툰 단계, 화면 고정 하이라이트 ──
    vec3 Na = normalize(p);
    float lit = smoothstep(-.04, .04, dot(Na, L) + .35);
    vec2 auv = p.xy / RI;
    auv.y *= .8; // 세로로 긴 홍채
    float ar = length(auv);
    if (p.z > 0. && ar < 1.) {
      float gy = auv.y * .5 + .5;
      vec3 ic = mix(uIrisOut * 1.7 + .06, uIrisOut * .22, smoothstep(.1, .9, gy));
      ic += uIrisIn * .7 * smoothstep(.1, 0., abs(ar - .72)) * (1. - gy);
      float pu = length(auv * vec2(1.25, 1.));
      ic = mix(ic, uIrisOut * .1, 1. - smoothstep(uPupil * 1.05 - .01, uPupil * 1.05 + .01, pu));
      ic = mix(ic, vec3(.025, .02, .035), uLimbal * smoothstep(.86, .9, ar));
      col = ic * mix(.75, 1., lit);
      if (uView == 1) col = gridOver(col, p.xy / RI);
    } else {
      col = mix(vec3(.62, .64, .82), vec3(.96, .95, .97), lit);
    }
    // 눈꺼풀 그림자: 위 눈꺼풀 아래 단단한 띠
    float band = 1. - smoothstep(.14, .15, du - .025 * sin(luv.x * 4.));
    col *= mix(vec3(1.), vec3(.6, .58, .78), band * uLidAO);
    // 화면 기준으로 고정된 하이라이트: 각막 앞 기준점에서 카메라 오른쪽/위쪽으로 띄움
    if (uCatch > .5 && p.z > .5) {
      vec3 A = vec3(0., 0., ZA);
      vec3 q1 = p - (A + uRightL * .17 + uUpL * .2);
      vec3 q2 = p - (A - uRightL * .16 - uUpL * .2);
      float h1 = length(vec2(dot(q1, uRightL) / .12, dot(q1, uUpL) / .09));
      float h2 = length(vec2(dot(q2, uRightL), dot(q2, uUpL))) / .045;
      float h = max(1. - smoothstep(.92, 1., h1), (1. - smoothstep(.9, 1., h2)) * .9);
      col = mix(col, vec3(1.), h);
    }
    gl_FragColor = vec4(col, 1.);
    #include <colorspace_fragment>
    return;
  }

  // ── 사실풍 ──
  float lidSh = mix(.08, 1., pow(smoothstep(0., .42, du), .8));
  float lowAO = mix(.4, 1., smoothstep(0., .14, dl));
  float cornAO = mix(.35, 1., smoothstep(1.02, .5, abs(luv.x)));
  float aoDirect = mix(1., lidSh * cornAO, uLidAO);
  float aoAmb = mix(1., lidSh * lowAO * cornAO, uLidAO);

  vec3 base;
  vec3 dN;
  if (cornea) {
    float h = max(p.z - uZi, 0.);
    vec2 uv;
    vec3 irisN = vec3(0., 0., 1.);
    if (uMode == 0) {
      uv = p.xy / RI;
      irisN = N;
    } else if (uMode == 1) {
      uv = (p.xy + vd.xy / max(-vd.z, .2) * h) / RI;
    } else {
      vec3 tr = refract(vd, N, 1. / uIor);
      tr.z = min(tr.z, -.05);
      vec3 hit = p + tr * max((uZi - p.z) / tr.z, 0.);
      uv = hit.xy / RI;
    }
    float r = length(uv);
    base = r <= 1. ? irisTex(uv) : vec3(.03, .025, .022);
    if (uView == 1) base = gridOver(base, uv);
    dN = irisN;
    float dI = clamp(dot(dN, L) * .6 + .45, 0., 1.);
    col = base * (lightCol * dI * aoDirect + amb * aoAmb);
  } else {
    vec3 n = normalize(p);
    base = scleraTex(n);
    float ang = acos(clamp(n.z, -1., 1.));
    base *= mix(1., mix(.3, 1., smoothstep(.5236, .64, ang)), uLimbal);
    float dS = clamp((dot(N, L) + .5) / 1.5, 0., 1.);
    col = base * (lightCol * dS * aoDirect + amb * aoAmb);
    col += vec3(.06, .012, .006) * (1. - dS) * dS * 4. * aoDirect; // 공막 산란 느낌 (붉은 경계)
  }

  // 젖은 반사 (캐치라이트): 각막·공막 표면의 프레넬 반사
  vec3 R = reflect(vd, N);
  float F = .025 + .975 * pow(1. - max(dot(N, V), 0.), 5.);
  float specOcc = mix(1., smoothstep(.02, .22, du) * smoothstep(0., .06, dl) * cornAO, uLidAO);
  col += envLight(R, L, cornea ? .02 : .08) * F * uCatch * specOcc * (cornea ? 1. : .5);

  gl_FragColor = vec4(acesTone(col), 1.);
  #include <colorspace_fragment>
}`,Mt=`
varying vec3 vWorld;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,wt=`
${it}
${nt}
uniform vec3 uLightW;
uniform float uAnime;
varying vec3 vWorld;
void main(){
  vec3 d = normalize(vWorld);
  vec2 l = lidUV(d);
  float up = lidUp(l.x);
  float lo = lidLo(l.x);
  if (d.z > 0. && l.y < up && l.y > lo) discard;
  vec3 N = gl_FrontFacing ? d : -d;
  float ndl = dot(N, normalize(uLightW));
  float aboveUp = l.y - up;
  float belowLo = lo - l.y;
  float xs = smoothstep(1.08, .55, abs(l.x));
  vec3 col;
  if (uAnime > .5) {
    vec3 skin = mix(vec3(.82, .52, .42), vec3(.98, .74, .62), smoothstep(-.1, .05, ndl + .2));
    col = skin;
    float liner = step(0., aboveUp) * (1. - smoothstep(.07, .085, aboveUp - .03 * smoothstep(.3, 1., l.x))) * smoothstep(1.12, .7, abs(l.x));
    col = mix(col, vec3(.06, .03, .03), liner);
    float lower = step(0., belowLo) * (1. - smoothstep(.012, .02, belowLo)) * smoothstep(-.1, .5, l.x) * xs;
    col = mix(col, vec3(.35, .15, .12), lower);
    float crease = 1. - smoothstep(0., .008, abs(aboveUp - .2));
    col = mix(col, vec3(.7, .42, .36), crease * xs);
    if (!gl_FrontFacing) col = vec3(.5, .2, .18);
    gl_FragColor = vec4(col, 1.);
    #include <colorspace_fragment>
    return;
  }
  vec3 skin = vec3(.6, .36, .27) * (.85 + .15 * vnoise3(d * 40.));
  float dif = clamp((ndl + .35) / 1.35, 0., 1.);
  col = skin * (vec3(1., .97, .92) * 2.1 * dif + vec3(.2, .2, .24));
  col += vec3(.12, .02, .01) * dif * (1. - dif) * 3.; // 피부 산란 느낌
  // 속눈썹 선, 쌍꺼풀 주름, 아래 눈꺼풀 물기선
  float lash = step(0., aboveUp) * (1. - smoothstep(.025, .05, aboveUp)) * xs;
  col = mix(col, vec3(.02, .012, .01), lash * .92);
  float crease = (1. - smoothstep(0., .05, abs(aboveUp - .19))) * xs;
  col *= 1. - .35 * crease;
  float water = step(0., belowLo) * (1. - smoothstep(.006, .02, belowLo)) * xs;
  col = mix(col, vec3(.5, .2, .18), water * .8);
  if (!gl_FrontFacing) col = vec3(.18, .05, .045) * (.6 + .4 * dif);
  gl_FragColor = vec4(acesTone(col), 1.);
  #include <colorspace_fragment>
}`,It={flat:0,parallax:1,refract:2,anime:3},et={brown:{inner:[.36,.17,.05],outer:[.13,.055,.018]},blue:{inner:[.32,.24,.1],outer:[.09,.22,.45]},green:{inner:[.36,.26,.07],outer:[.08,.24,.11]},gray:{inner:[.27,.25,.2],outer:[.17,.21,.25]}},ot=new L(-.45,.6,.65).normalize(),zt=[0,0,.45],$=e=>e*180/Math.PI,Q=e=>e.num("depth",3)/lt;function st(e,t){const r=t.num("depth",3),c=t.num("ior",1.376),a=r*Math.sin(e)/Math.max(Math.cos(e),.2),v=Math.asin(Math.min(1,Math.sin(e)/c));return{par:a,ref:r*Math.tan(v),thT:v}}function ct(e){const t=e.num("ior",1.376),r=M-Q(e),c=.2,a=z+Math.sqrt(p*p-c*c);if(a<=r)return 1;const v=c/p,o=(a-z)/p,i=rt(0,-1,v,o,1/t);if(!i)return 1;const S=(r-a)/i[1],x=c+i[0]*S;return c/Math.max(x,.001)}function rt(e,t,r,c,a){const v=-(e*r+t*c),o=1-a*a*(1-v*v);if(o<0)return null;const i=a*v-Math.sqrt(o);return[a*e+i*r,a*t+i*c]}function kt(e,t){return ht(e,{antialias:!0,cam:[.8,.3,3.2],target:zt,fov:30,background:856086,near:.05,far:50},({scene:r,camera:c,controls:a})=>{a.minDistance=1.8,a.maxDistance=7;const v=()=>{e.params.bool("orbit",!0)&&e.params.set("orbit",!1)};a.addEventListener("start",v);const o={uMode:{value:It[t]},uView:{value:0},uCamL:{value:new L},uLightL:{value:new L},uRightL:{value:new L(1,0,0)},uUpL:{value:new L(0,1,0)},uZi:{value:.83},uIor:{value:1.376},uPupil:{value:.35},uLimbal:{value:1},uLidAO:{value:1},uCatch:{value:1},uIrisIn:{value:new L},uIrisOut:{value:new L}},i=new K(bt(),new tt({uniforms:o,vertexShader:yt,fragmentShader:Lt}));r.add(i);const S=new K(new at(xt,128,80),new tt({uniforms:{uLightW:{value:ot.clone()},uAnime:{value:t==="anime"?1:0}},vertexShader:Mt,fragmentShader:wt,side:ft}));r.add(S);const x=new pt,q=new L,y=new L(0,0,M);return{update(l,n,F){const u=e.params;if(u.bool("orbit",!0)){const A=F/1e3,U=.95*Math.sin(A*.42),R=.1+.12*Math.sin(A*.27),s=c.position.distanceTo(a.target);c.position.set(a.target.x+s*Math.sin(U)*Math.cos(R),a.target.y+s*Math.sin(R),a.target.z+s*Math.cos(U)*Math.cos(R)),a.update()}i.rotation.y=u.num("gaze",0)*Math.PI/180,i.updateMatrixWorld(),x.copy(i.quaternion).invert(),o.uCamL.value.copy(i.worldToLocal(q.copy(c.position))),o.uLightL.value.copy(ot).applyQuaternion(x),o.uRightL.value.set(1,0,0).applyQuaternion(c.quaternion).applyQuaternion(x),o.uUpL.value.set(0,1,0).applyQuaternion(c.quaternion).applyQuaternion(x),o.uZi.value=M-Q(u),o.uIor.value=u.num("ior",1.376),o.uPupil.value=u.num("pupil",.35),o.uLimbal.value=u.bool("limbal",!0)?1:0,o.uLidAO.value=u.bool("lidAO",!0)?1:0,o.uCatch.value=u.bool("catch",!0)?1:0,o.uView.value=u.str("view","final")==="grid"?1:0;const b=et[u.str("iris","brown")]??et.brown;o.uIrisIn.value.set(...b.inner),o.uIrisOut.value.set(...b.outer);const P=o.uCamL.value,C=q.copy(y).sub(P).normalize(),g=Math.acos(Math.min(1,Math.max(-1,-C.z)));e.shared.set("eyeView",{yaw:Math.atan2(P.x,P.z),theta:g});const k=st(g,u),T=`시선각 ${$(g).toFixed(0)}°`;t==="flat"?e.hud(`${T}
홍채 샘플 이동 0.00 mm (표면에 붙음)
추가 비용 ≈ 0 (평면 UV)`):t==="parallax"?e.hud(`${T}
꼭짓점 샘플 이동 ${k.par.toFixed(2)} mm (직선, 깊이 ${u.num("depth",3).toFixed(1)} mm)
추가 비용 ≈ 나눗셈 1 + MAD 몇 개 (추정)`):t==="refract"?e.hud(`${T} → 굴절 후 ${$(k.thT).toFixed(0)}°
꼭짓점 샘플 이동 ${k.ref.toFixed(2)} mm (n = ${u.num("ior",1.376).toFixed(3)}) · 홍채 ×${ct(u).toFixed(2)}
추가 비용 ≈ refract(√ 1회) + 평면 교차 ~15 ALU (추정)`):e.hud(`${T}
홍채 깊이 0 · 하이라이트는 화면 기준 오른쪽 위에 고정
툰 2단계 + 하이라이트 위치 계산 ~10 ALU (추정)`)},dispose(){a.removeEventListener("start",v)}}})}function Tt(e){return dt(e,()=>({draw(t,r,c){const a=e.params,v=e.shared.get("eyeView")??{yaw:.6,theta:.6},o=v.yaw,i=M-Q(a),S=a.num("ior",1.376),x=a.num("pupil",.35)*_;t.fillStyle="#0d1016",t.fillRect(0,0,r,c);const y=Math.min((r-24)/1.8,(c-64-26)/.78),l=s=>r/2+s*y,n=s=>c-26-(s-.48)*y;t.beginPath();for(let s=0;s<=40;s++){const h=-f+2*f*s/40,m=z+Math.sqrt(p*p-h*h);s===0&&t.moveTo(l(h),n(Math.min(m,Math.max(i,D)))),t.lineTo(l(h),n(m))}t.lineTo(l(f),n(i)),t.lineTo(l(-f),n(i)),t.closePath(),t.fillStyle="rgba(90,160,255,0.12)",t.fill(),t.strokeStyle="#9aa3b2",t.lineWidth=2,t.beginPath();const F=Math.asin(f);t.arc(l(0),n(0),y,-Math.PI/2+F,-Math.PI/2+1.2),t.stroke(),t.beginPath(),t.arc(l(0),n(0),y,-Math.PI/2-1.2,-Math.PI/2-F),t.stroke(),t.strokeStyle="#d8f0ff",t.beginPath();for(let s=0;s<=60;s++){const h=-f+2*f*s/60,m=z+Math.sqrt(p*p-h*h);s===0?t.moveTo(l(h),n(m)):t.lineTo(l(h),n(m))}t.stroke(),t.strokeStyle="rgba(200,200,220,0.25)",t.lineWidth=1,t.beginPath(),t.ellipse(l(0),n(i-.17),x*y*1.6+8,.15*y,0,0,Math.PI*2),t.stroke(),t.strokeStyle="#b07a3a",t.lineWidth=5,t.beginPath(),t.moveTo(l(-_-.06),n(i)),t.lineTo(l(-x),n(i)),t.moveTo(l(x),n(i)),t.lineTo(l(_+.06),n(i)),t.stroke();const u=-Math.sin(o),b=-Math.cos(o),P=Math.cos(o),C=-Math.sin(o),g=[],k=9;for(let s=0;s<k;s++){const h=-.44+.88*s/(k-1),m=h*P-u*3,w=.95+h*C-b*3,N=m,W=w-z,E=N*u+W*b,ut=N*N+W*W-p*p,X=E*E-ut;if(X<0)continue;const Y=-E-Math.sqrt(X),d=m+u*Y,I=w+b*Y,H=s===(k-1)/2;if(t.setLineDash([]),t.lineWidth=H?2:1,Math.abs(d)>f||I<D-.001){const O=m*u+w*b,mt=m*m+w*w-1,J=O*O-mt;if(J<0)continue;const B=-O-Math.sqrt(J);t.strokeStyle="rgba(255,255,255,0.18)",t.beginPath(),t.moveTo(l(m),n(w)),t.lineTo(l(m+u*B),n(w+b*B)),t.stroke();continue}t.strokeStyle=H?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.4)",t.beginPath(),t.moveTo(l(m),n(w)),t.lineTo(l(d),n(I)),t.stroke();const vt=Math.max(I-i,0);t.setLineDash([2,3]),t.strokeStyle="rgba(170,170,170,0.8)",t.beginPath(),t.moveTo(l(d),n(I)),t.lineTo(l(d),n(i)),t.stroke();const j=d+u/Math.max(-b,.2)*vt;t.setLineDash([5,4]),t.strokeStyle="#ff9a3c",t.beginPath(),t.moveTo(l(d),n(I)),t.lineTo(l(j),n(i)),t.stroke();const Z=rt(u,b,d/p,(I-z)/p,1/S);let G=d;if(Z){const O=Math.min(Z[1],-.05);G=d+Z[0]*Math.max((i-I)/O,0),t.setLineDash([]),t.strokeStyle="#4fd1ff",t.beginPath(),t.moveTo(l(d),n(I)),t.lineTo(l(G),n(i)),t.stroke()}g.push({x:d,c:"#aaaaaa"},{x:j,c:"#ff9a3c"},{x:G,c:"#4fd1ff"})}t.setLineDash([]);for(const s of g)t.fillStyle=s.c,t.beginPath(),t.arc(l(s.x),n(i),3,0,Math.PI*2),t.fill();t.font="11px system-ui, sans-serif",t.fillStyle="#d8f0ff",t.textAlign="left",t.fillText("각막",l(f)+6,n(D)-4),t.fillStyle="#c99a5a",t.fillText("홍채 평면",l(_+.08),n(i)+4),t.fillStyle="rgba(140,190,255,0.8)",t.fillText("전방(방수)",l(-f)-64,n((i+M)/2)),t.fillStyle="#9aa3b2",t.fillText("공막",l(-.78)-4,n(.64));const T=2/lt*y;t.strokeStyle="#9aa3b2",t.lineWidth=2,t.beginPath(),t.moveTo(r-16-T,c-12),t.lineTo(r-16,c-12),t.stroke(),t.textAlign="right",t.fillText("2 mm",r-16-T-6,c-8),t.textAlign="left";const A=[["#aaaaaa","평면: 표면 위치 그대로"],["#ff9a3c","시차: 시선을 직선으로 연장"],["#4fd1ff",`굴절: 각막에서 꺾임 (n = ${S.toFixed(3)})`]],U=c-12-A.length*15;t.fillStyle="rgba(13,16,22,0.8)",t.fillRect(4,U-6,196,A.length*15+6),A.forEach(([s,h],m)=>{t.fillStyle=s,t.fillRect(10,U+m*15+2,14,3),t.fillStyle="#d0d6e0",t.fillText(h,30,U+m*15+7)});const R=st(v.theta,a);e.hud(`수평 단면 · 방위 ${$(o).toFixed(0)}° · 시선각 ${$(v.theta).toFixed(0)}°
꼭짓점 이동 평면 0 / 시차 ${R.par.toFixed(2)} / 굴절 ${R.ref.toFixed(2)} mm
정면 굴절 배율 ≈ ×${ct(a).toFixed(2)} (홍채가 커 보임)`)}}))}const St=[{mode:"flat",title:"평면 홍채 (표면에 그림)",kind:"before",caption:"홍채 무늬를 각막 표면에 그대로 칠했다. 카메라가 돌아도 무늬가 표면에 붙어 함께 움직여, 옆에서 보면 홍채가 볼록하게 튀어나온 스티커처럼 보인다."},{mode:"parallax",title:"시차 오프셋 (직선 시선)",kind:"variant",caption:"표면에서 홍채 평면까지의 깊이만큼 시선 방향으로 UV를 민다. 비스듬히 보면 홍채가 각막 안쪽으로 물러나 보인다. 꺾임이 없어서 옆으로 갈수록 굴절보다 많이 밀린다."},{mode:"refract",title:"각막 굴절 (refract → 홍채 평면)",kind:"after",caption:"각막 법선으로 시선을 꺾고(굴절률 약 1.376) 홍채 평면과 만나는 점을 샘플한다. 직선보다 덜 밀리고 홍채가 조금 확대되며, 옆에서 봐도 홍채가 각막 렌즈 속에 떠 있다."},{mode:"anime",title:"애니풍 눈 (평면 홍채 · 화면 고정 하이라이트)",kind:"variant",caption:"깊이를 일부러 버린다. 세로로 긴 홍채, 위가 어두운 그라데이션, 눈꺼풀 그림자는 단단한 띠. 하이라이트는 카메라 기준 위치에 붙어 어느 각도에서도 오른쪽 위에 남는다."}],Pt={layout:"compare",intro:'눈은 캐릭터에서 가장 먼저 시선이 가는 곳이라, 조금만 납작해도 "인형 눈"이 됩니다. 실제 눈은 투명하고 볼록한 <b>각막</b> 뒤 약 3 mm 안쪽에 <b>홍채</b>가 평평하게 놓여 있어서, 보는 각도에 따라 홍채가 각막 속에서 밀리고 렌즈처럼 확대됩니다. 이 페이지는 같은 절차적 홍채를 <b>표면에 그대로</b>, <b>시차 오프셋</b>, <b>각막 굴절</b>로 샘플해 비교하고, 림벌 링·눈꺼풀 그림자·캐치라이트를 켜고 끌 수 있게 했습니다. 마지막은 깊이를 일부러 버린 <b>애니풍 눈</b>입니다. 자동 카메라 흔들기가 좌우로 돌 때 홍채 무늬와 하이라이트가 어떻게 움직이는지 보세요.',how:["눈알 메시는 구 하나에 각막 볼록면을 얹은 모양. 림부스(각막 가장자리) 안쪽 픽셀은 각막 구의 법선, 바깥은 공막(흰자) 법선을 쓴다.","평면: 홍채 UV = 표면 좌표 xy / 홍채 반지름. 시차: 표면에서 홍채 평면까지 깊이 h만큼 시선 방향으로 UV를 민다 (offset = v.xy / v.z × h).","굴절: t = refract(시선, 각막 법선, 1/1.376), 홍채 평면(z = zi)과 교차한 점의 xy가 UV. 평면 밖에 맞으면 어두운 림부스.","공막·홍채에 눈꺼풀 그림자와 구석 AO를 곱하고, 홍채 가장자리를 어둡게(림벌 링) 한다.","각막의 젖은 반사: 반사 벡터로 환경(창문 모양 소프트박스)을 읽고 프레넬(F0 ≈ 0.025)을 곱해 캐치라이트를 만든다."],pros:["메시 하나와 셰이더 몇 줄로 홍채가 각막 속에 들어간 깊이감","굴절은 각도·확대까지 물리적으로 맞음, 시차는 더 싸고 단순",'캐치라이트·림벌 링·그림자는 거의 공짜인데 "살아 있는 눈"의 인상을 크게 바꿈'],cons:["홍채 평면 깊이·각막 모양이 메시와 어긋나면 UV가 엉뚱하게 밀림","굴절 UV는 화면 가장자리에서 늘어나 텍스처 밉 선택이 흔들릴 수 있음","애니풍 캐릭터에 사실풍 굴절을 넣으면 오히려 어색해짐 (화풍 선택의 문제)"],usedIn:'Jorge Jimenez 외 "Next-Generation Character Rendering"(GDC 2013)에 눈 셰이딩(굴절·습윤 반사 등)이 포함됨. UE의 Eye 셰이딩 모델과 MetaHuman 눈 머티리얼, Unity HDRP의 Eye 셰이더도 각막 굴절·림벌 링·코스틱 같은 항목을 둔다 (세부 파라미터는 버전마다 다름). 애니풍 게임은 평면 홍채 텍스처와 별도 하이라이트 레이어가 흔함.',controls:[{type:"toggle",key:"orbit",label:"자동 카메라 흔들기",value:!0},{type:"range",key:"depth",label:"홍채 깊이 (mm)",min:0,max:4.5,step:.1,value:3},{type:"range",key:"ior",label:"각막 굴절률",min:1,max:1.6,step:.002,value:1.376},{type:"range",key:"pupil",label:"동공 크기",min:.15,max:.7,step:.01,value:.35},{type:"range",key:"gaze",label:"시선 좌우 (°)",min:-30,max:30,step:1,value:0},{type:"select",key:"iris",label:"홍채 색",options:[{label:"갈색",value:"brown"},{label:"파랑",value:"blue"},{label:"초록",value:"green"},{label:"회색",value:"gray"}],value:"brown"},{type:"select",key:"view",label:"표시",options:[{label:"최종 화면",value:"final"},{label:"홍채 샘플 격자",value:"grid"}],value:"final"},{type:"toggle",key:"limbal",label:"림벌 링",value:!0},{type:"toggle",key:"lidAO",label:"눈꺼풀 그림자 · 공막 AO",value:!0},{type:"toggle",key:"catch",label:"캐치라이트 (젖은 반사)",value:!0}],viewers:[...St.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:t=>kt(t,e.mode)})),{title:"수평 단면: 시선이 홍채 평면에 닿는 위치",kind:"info",wide:!0,caption:"위 3D 카메라 방향에서 들어오는 평행 광선 9개를 눈의 수평 단면에 그렸다. 회색 점선은 평면(표면 바로 아래), 주황 점선은 시차(직선), 하늘색은 굴절(각막에서 꺾임)이 홍채 평면에 닿는 곳. 굴절은 광선이 안쪽으로 모여 홍채가 확대되고 이동이 줄어든다.",mount:Tt}]};export{Pt as default};
