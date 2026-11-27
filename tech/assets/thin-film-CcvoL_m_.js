import{g as zt,k as ot,u as wt,az as Bt,M as tt,S as mt,ar as Yt,G as dt,P as Ht,ab as Xt,aR as Jt,b5 as Qt,b7 as Zt,bM as te,F as It,aq as ee,C as oe,a_ as ne}from"./three.module-BZgG6AUv.js";import{m as ae}from"./three-viewer-0rZIEDzf.js";import{m as se}from"./canvas-viewer-Btf0JXdr.js";import{c as ce,t as A,F as le}from"./chart2d-JzIgcti9.js";const G={bubble:{id:"bubble",label:"비눗방울",tMin:10,tMax:720,ior:1.33,film:{nlo:1,pairs:0,sub:[1,0]},cam:[0,.25,3.6],target:[0,0,0],desc:"공기 | 비눗물 막 | 공기"},oil:{id:"oil",label:"젖은 웅덩이 위 기름막",tMin:150,tMax:700,ior:1.47,film:{nlo:1,pairs:0,sub:[1.33,0]},cam:[0,3.3,4.1],target:[0,-.5,-.35],desc:"공기 | 기름 | 물"},titanium:{id:"titanium",label:"양극산화 티타늄 볼트",tMin:15,tMax:190,ior:2.4,film:{nlo:1,pairs:0,sub:[2.2,3]},cam:[1.3,.7,3.2],target:[0,-.1,0],desc:"공기 | TiO₂ 산화막 | 티타늄(금속)"},beetle:{id:"beetle",label:"딱정벌레 껍질 (다층막)",tMin:76,tMax:85,ior:1.7,film:{nlo:1.4,pairs:5,sub:[1.8,.4]},cam:[.4,2.1,2.9],target:[0,.1,0],desc:"공기 | (고1.7/저1.4)×5쌍 | 어두운 바탕"}};function Tt(e,o){return{nf:o,...e.film}}const ie=(e,o)=>[e[0]*o[0]-e[1]*o[1],e[0]*o[1]+e[1]*o[0]],Pt=(e,o)=>{const a=o[0]*o[0]+o[1]*o[1];return[(e[0]*o[0]+e[1]*o[1])/a,(e[1]*o[0]-e[0]*o[1])/a]},re=e=>{const o=Math.hypot(e[0],e[1]),a=Math.sqrt(Math.max(0,(o+e[0])/2));let n=Math.sqrt(Math.max(0,(o-e[0])/2));return e[1]<0&&(n=-n),[a,n]};function kt(e,o,a,n){const t=1-e*e,l=[n.sub[0]*n.sub[0]-n.sub[1]*n.sub[1],2*n.sub[0]*n.sub[1]],r=re([l[0]-t,l[1]]),i=Math.sqrt(Math.max(1e-6,n.nf*n.nf-t)),c=Math.sqrt(Math.max(1e-6,n.nlo*n.nlo-t)),h=n.pairs===0?1:n.pairs*2;let F=0;for(let L=0;L<2;L++){const q=L===0?r:Pt(l,r),N=L===0?i:n.nf*n.nf/i,O=L===0?c:n.nlo*n.nlo/c,D=L===0?e:1/Math.max(e,1e-4),R=(h-1)%2===0?N:O;let x=Pt([R-q[0],-q[1]],[R+q[0],q[1]]);for(let P=h-1;P>=0;P--){const _=P%2===0,y=_?N:O,S=_?i:c,j=_?a:a*n.nf/n.nlo,p=4*Math.PI*S*j/o,W=ie(x,[Math.cos(p),Math.sin(p)]),nt=P===0?D:(P-1)%2===0?N:O,$=(nt-y)/(nt+y);x=Pt([$+W[0],W[1]],[1+$*W[0],$*W[1]])}F+=x[0]*x[0]+x[1]*x[1]}return F/2}function et(e,o,a,n){const t=(e-o)/(e<o?a:n);return Math.exp(-.5*t*t)}function Ot(e){return[1.056*et(e,599.8,37.9,31)+.362*et(e,442,16,26.7)-.065*et(e,501.1,20.4,26.2),.821*et(e,568.8,46.9,40.5)+.286*et(e,530.9,16.3,31.1),1.217*et(e,437,11.8,36)+.681*et(e,459,26,13.8)]}function Dt(e,o,a){return[3.2406*e-1.5372*o-.4986*a,-.9689*e+1.8758*o+.0415*a,.0557*e-.204*o+1.057*a]}const ft=16;function ue(e){const o=[],a=[],n=[0,0,0];for(let t=0;t<e;t++){const l=400+(t+.5)*300/e,r=Dt(...Ot(l));o.push(l),a.push(r);for(let i=0;i<3;i++)n[i]+=r[i]}for(const t of a)for(let l=0;l<3;l++)t[l]/=n[l];return{lam:o,w:a}}const xt=ue(16),Rt={lam:[650,510,475],w:[[1,0,0],[0,1,0],[0,0,1]]};function ut(e,o,a,n){const t=[0,0,0];for(let l=0;l<n.lam.length;l++){const r=kt(e,n.lam[l],o,a);for(let i=0;i<3;i++)t[i]+=r*n.w[l][i]}return[Math.max(0,t[0]),Math.max(0,t[1]),Math.max(0,t[2])]}function fe(e){const o=Dt(...Ot(e)),a=Math.max(o[0],o[1],o[2],1e-6);return[Math.max(0,o[0]/a),Math.max(0,o[1]/a),Math.max(0,o[2]/a)]}const Wt=e=>(e=Math.max(0,Math.min(1,e)),e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055);function vt(e,o){const a=e.map(n=>Math.round(Wt(n*o)*255));return`rgb(${a[0]},${a[1]},${a[2]})`}const me=[[15,"빨강"],[40,"주황"],[65,"노랑"],[150,"초록"],[190,"청록"],[250,"파랑"],[290,"보라"],[335,"자홍"],[361,"빨강"]];function $t(e){const[o,a,n]=e.map(Wt),t=Math.max(o,a,n),l=Math.min(o,a,n),r=t-l,i=t>1e-4?r/t:0;let c=0;return r>1e-6&&(t===o?c=(a-n)/r%6:t===a?c=(n-o)/r+2:c=(o-a)/r+4,c*=60,c<0&&(c+=360)),t<.04?{name:"거의 검정",hue:c,sat:i}:i<.14?{name:"무채색(흰·회색)",hue:c,sat:i}:{name:me.find(F=>c<F[0])[1],hue:c,sat:i}}function Vt(e){const o=Math.PI*2;return[.5+.5*Math.cos(o*e),.5+.5*Math.cos(o*(e-.33)),.5+.5*Math.cos(o*(e-.67))]}const Ft=1.6,Et=.08;function it(e,o,a,n){const t=e+.35*Math.sin(1.7*o+.9*n),l=o+.35*Math.sin(1.9*a-.7*n+1.3),r=a+.35*Math.sin(2.1*e+.8*n+2.1);return .5*Math.sin(2.3*t+1.1*l)+.3*Math.sin(2.9*l-1.7*r+.6*n)+.2*Math.sin(3.7*r+2.3*t-.4*n)+.12*Math.sin(5.3*t-4.1*l+3.1*r+.5*n)}const rt=e=>Math.min(1,Math.max(0,e)),At=(e,o,a)=>{const n=rt((a-e)/(o-e));return n*n*(3-2*n)};function he(e,o){return Math.hypot(e*.85,o)+.22*it(e*.9,o*.9,2,0)>2.2}function pe(e,o,a,n,t){const[l,r,i]=o;if(e==="bubble"){const h=r*.5+.5,F=Math.cos(a*.25),L=Math.sin(a*.25),q=it(2*(F*l-L*i),2*r+a*.35,2*(L*l+F*i),a),N=rt(Math.pow(1-h,1.2)*.62+.14+.24*q*(.4+h));return n+(t-n)*N}if(e==="oil"){const h=At(1.85,.45,Math.hypot(l*.95,r*1.25)+.3*it(l*.8,r*.8,.3,a*.4)),F=rt(.5+.45*it(l*1.25,r*1.25,.7,a));return At(0,.18,h)*(n+(t-n)*rt(F*.6+h*.4))}if(e==="titanium"){const h=rt((r+.95)/1.7+.03*it(l*3,r*3,i*3,0));return n+(t-n)*h}const c=rt(.5+.35*it(l*2.2,r*2.2,i*2.2,0));return n+(t-n)*c}const de=`
#define PI 3.14159265
uniform float uNf, uNlo, uPairs;
uniform vec2 uSub;
uniform float uLam[${ft}];
uniform vec3 uW[${ft}];
uniform float uNS;
vec2 cmul(vec2 a, vec2 b){ return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x); }
vec2 cdiv(vec2 a, vec2 b){ return vec2(a.x*b.x + a.y*b.y, a.y*b.x - a.x*b.y) / dot(b, b); }
vec2 csqrt(vec2 z){ float r = length(z); float im = sqrt(max(0., (r - z.x) * .5)); return vec2(sqrt(max(0., (r + z.x) * .5)), z.y < 0. ? -im : im); }
float filmR(float c1, float lam, float d){
  float s2 = 1. - c1 * c1;
  vec2 ns2 = vec2(uSub.x*uSub.x - uSub.y*uSub.y, 2. * uSub.x * uSub.y);
  vec2 qs = csqrt(ns2 - vec2(s2, 0.));
  float qh = sqrt(max(1e-6, uNf*uNf - s2)), ql = sqrt(max(1e-6, uNlo*uNlo - s2));
  int nl = uPairs < .5 ? 1 : int(uPairs) * 2;
  float R = 0.;
  for (int pol = 0; pol < 2; pol++){
    vec2 es = pol == 0 ? qs : cdiv(ns2, qs);
    float eh = pol == 0 ? qh : uNf*uNf / qh;
    float el = pol == 0 ? ql : uNlo*uNlo / ql;
    float e0 = pol == 0 ? c1 : 1. / max(c1, 1e-4);
    float eb = (nl - 1) % 2 == 0 ? eh : el;
    vec2 r = cdiv(vec2(eb, 0.) - es, vec2(eb, 0.) + es);
    for (int i = nl - 1; i >= 0; i--){
      bool hi = i % 2 == 0;
      float ei = hi ? eh : el;
      float qi = hi ? qh : ql;
      float di = hi ? d : d * uNf / uNlo;
      float ph = 4. * PI * qi * di / lam;
      vec2 re = cmul(r, vec2(cos(ph), sin(ph)));
      float eu = i == 0 ? e0 : ((i - 1) % 2 == 0 ? eh : el);
      float rt = (eu - ei) / (eu + ei);
      r = cdiv(vec2(rt + re.x, re.y), vec2(1. + rt * re.x, rt * re.y));
    }
    R += dot(r, r);
  }
  return R * .5;
}
vec3 filmRGB(float c1, float d){
  vec3 c = vec3(0.);
  int n = int(uNS);
  for (int i = 0; i < ${ft}; i++){
    if (i >= n) break;
    c += filmR(c1, uLam[i], d) * uW[i];
  }
  return max(c, 0.);
}
vec3 fakeRamp(float x){ return .5 + .5 * cos(6.2831853 * (x - vec3(0., .33, .67))); }
`,ve=`
float swirl(vec3 p, float t){
  vec3 q = p + .35 * vec3(sin(1.7*p.y + .9*t), sin(1.9*p.z - .7*t + 1.3), sin(2.1*p.x + .8*t + 2.1));
  return .5*sin(2.3*q.x + 1.1*q.y) + .3*sin(2.9*q.y - 1.7*q.z + .6*t) + .2*sin(3.7*q.z + 2.3*q.x - .4*t) + .12*sin(5.3*q.x - 4.1*q.y + 3.1*q.z + .5*t);
}
uniform float uPreset, uFlow, uTMin, uTMax;
float thicknessAt(vec3 p){
  float t = uFlow;
  if (uPreset < .5){
    float h = p.y * .5 + .5;
    float ca = cos(t * .25), sa = sin(t * .25);
    float sw = swirl(vec3(2. * (ca*p.x - sa*p.z), 2.*p.y + t*.35, 2. * (sa*p.x + ca*p.z)), t);
    float f = clamp(pow(max(1. - h, 0.), 1.2) * .62 + .14 + .24 * sw * (.4 + h), 0., 1.);
    return mix(uTMin, uTMax, f);
  }
  if (uPreset < 1.5){
    float m = smoothstep(1.85, .45, length(p.xy * vec2(.95, 1.25)) + .3 * swirl(vec3(p.xy * .8, .3), t * .4));
    float f = clamp(.5 + .45 * swirl(vec3(p.xy * 1.25, .7), t), 0., 1.);
    return smoothstep(0., .18, m) * mix(uTMin, uTMax, clamp(f * .6 + m * .4, 0., 1.));
  }
  if (uPreset < 2.5){
    float f = clamp((p.y + .95) / 1.7 + .03 * swirl(p * 3., 0.), 0., 1.);
    return mix(uTMin, uTMax, f);
  }
  float f = clamp(.5 + .35 * swirl(p * 2.2, 0.), 0., 1.);
  return mix(uTMin, uTMax, f);
}
`,xe={bubble:0,oil:1,titanium:2,beetle:3},be={fake:0,phys:1,thick:2},_t={bubble:{rough:0,expo:1.5,base:[0,0,0],env:0,floorY:-1.25},oil:{rough:.015,expo:1.9,base:[.012,.012,.013],env:1,floorY:-.52},titanium:{rough:.16,expo:1.05,base:[0,0,0],env:0,floorY:-.97},beetle:{rough:.1,expo:1.35,base:[.018,.02,.012],env:0,floorY:-.005}},Nt=`
uniform float uEnvKind;
float lin1(float x, float h, float s){ return clamp((h + s - x) / (2. * s), 0., 1.); }
float rectL(vec3 d, float el0, float az0, float hEl, float hAz, float soft){
  float el = asin(clamp(d.y, -1., 1.));
  float az = atan(d.x, d.z);
  float da = abs(mod(az - az0 + PI, 2. * PI) - PI) * cos(el);
  return lin1(abs(el - el0), hEl, soft) * lin1(da, hAz, soft);
}
vec3 envCol(vec3 d, float r){
  float soft = .015 + .5 * r * r;
  if (uEnvKind > .5){
    // 흐린 야외 하늘 + 지평선의 건물 실루엣 + 구름 사이 해
    vec3 c = d.y > 0. ? mix(vec3(1.3, 1.32, 1.36), vec3(.42, .58, .95), pow(d.y, .55)) : mix(vec3(.45), vec3(.05, .05, .055), clamp(-d.y * 5., 0., 1.));
    c += vec3(2.6, 2.4, 2.1) * rectL(d, .5, PI * .82, .1, .1, soft + .12);
    float az = atan(d.x, d.z);
    float top = .05 + .07 * step(.45, fract(az * 2.3)) + .04 * step(.7, fract(az * 5.1 + .3));
    float bld = step(0., d.y) * (1. - smoothstep(top - soft * .3, top + soft * .3 + .002, d.y));
    return mix(c, vec3(.1, .1, .12), bld * .9);
  }
  vec3 c = d.y > 0. ? mix(vec3(.035, .04, .05), vec3(.012, .015, .022), sqrt(d.y)) : mix(vec3(.025, .023, .021), vec3(.008, .007, .006), clamp(-d.y * 4., 0., 1.));
  // 카메라 뒤쪽 위로 넓고 부드러운 밝은 창(하늘빛) — 막의 무늬가 넓게 보이도록
  c += vec3(.95, .97, 1.) * 1.1 * smoothstep(-.5, .45, d.y) * smoothstep(-.45, .55, d.z) * (1. - smoothstep(.75, 1., d.y));
  c += vec3(1., .97, .92) * 3. * rectL(d, .42, .6, .12, .26, soft);
  c += vec3(.95, .97, 1.) * 2.2 * rectL(d, .5, PI + .5, .1, .3, soft);
  c += vec3(1.) * 3. * smoothstep(.955 - soft * .3, .965 + soft * .3, dot(d, normalize(vec3(0., 1., .35))));
  c += vec3(1., .85, .7) * 1.6 * rectL(d, .1, -1.7, .4, .07, soft);
  c += vec3(.7, .85, 1.) * 1.6 * rectL(d, .15, 1.8, .45, .06, soft);
  return c;
}
vec3 acesTone(vec3 x){ return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }
`,Ct=`
varying vec3 vP; varying vec3 vN; varying vec3 vW;
void main(){
  vP = position;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Me=`
varying vec3 vP; varying vec3 vN; varying vec3 vW;
uniform float uRough, uExpo, uFakeAmp, uStep, uTransp;
uniform vec3 uBase;
${de}
${ve}
${Nt}
void main(){
  // 웅덩이 가장자리: 불규칙한 물 경계 밖은 버림 (아스팔트가 보임)
  if (uPreset > .5 && uPreset < 1.5){
    float pm = length(vP.xy * vec2(.85, 1.)) + .22 * swirl(vec3(vP.xy * .9, 2.), 0.);
    if (pm > 2.2) discard;
  }
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  // 안쪽 면(비눗방울 뒷면 등)은 법선을 시선 쪽으로 (BackSide 재질은 gl_FrontFacing이 뒤집히므로 내적으로 판정)
  if (dot(N, V) < 0.) N = -N;
  float c1 = clamp(dot(N, V), 1e-3, 1.);
  float d = thicknessAt(vP);
#if MODE == 2
  // 두께 디버그: 흑백(범위 안에서 두꺼울수록 밝음) + 가는/굵은 등고선
  float u = d < 1. ? 0. : clamp((d - min(uTMin, uTMax)) / max(abs(uTMax - uTMin), 1.), 0., 1.) * .85 + .15;
  vec3 col = mix(vec3(.02, .025, .04), vec3(.86, .9, 1.), u);
  float s = d / uStep;
  float l1 = 1. - smoothstep(0., fwidth(s) * 1.2, abs(fract(s - .5) - .5));
  float s2 = d / (uStep * 4.);
  float l2 = 1. - smoothstep(0., fwidth(s2) * 2.2, abs(fract(s2 - .5) - .5));
  col = mix(col, vec3(1., .62, .25), l1 * .6);
  col = mix(col, vec3(1., .3, .12), l2);
  col *= .6 + .4 * max(dot(N, normalize(vec3(.4, .8, .5))), 0.);
  gl_FragColor = vec4(col, 1.);
#else
  vec3 R;
  #if MODE == 0
    // 가짜: 1 − N·V 로 색상환 램프. 두께·굴절률 무시
    R = fakeRamp((1. - c1) * ${Ft.toFixed(2)} + ${Et.toFixed(2)}) * mix(uFakeAmp, 1., pow(1. - c1, 3.) * .7);
  #else
    R = filmRGB(c1, d);
  #endif
  vec3 Rd = reflect(-V, N);
  vec3 col = R * envCol(Rd, uRough);
  // 투과해 들어간 빛이 바탕에서 확산 (물 밑 아스팔트, 딱정벌레 색소층)
  col += (1. - R) * uBase * envCol(N, 1.);
  col = acesTone(col * uExpo);
  float a = uTransp > .5 ? clamp(dot(R, vec3(.3333)) * 1.2, 0., 1.) : 1.;
  gl_FragColor = vec4(col, a);
#endif
  #include <colorspace_fragment>
}`,ye="varying vec3 vD; void main(){ vD = position; vec4 w = modelMatrix * vec4(position, 1.); gl_Position = projectionMatrix * viewMatrix * w; }",we=`
#define PI 3.14159265
varying vec3 vD; uniform float uExpo;
${Nt}
void main(){ gl_FragColor = vec4(acesTone(envCol(normalize(vD), 0.) * uExpo), 1.);
  #include <colorspace_fragment>
}`,Pe=`
#define PI 3.14159265
varying vec3 vP; varying vec3 vN; varying vec3 vW;
uniform float uExpo, uAsphalt;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
${Nt}
void main(){
  float r = length(vP.xy);
  vec3 irr = envCol(vec3(0., 1., 0.), 1.) * .9;
  vec3 col;
  if (uAsphalt > .5){
    float gr = hash12(floor(vP.xy * 260.)) * .45 + hash12(floor(vP.xy * 60.)) * .3 + hash12(floor(vP.xy * 9.)) * .25;
    col = vec3(.05, .05, .052) * (.55 + .9 * gr) * dot(irr, vec3(.3333));
  } else {
    col = vec3(.03, .032, .036) * (.3 + .7 * smoothstep(.15, 1.4, r)) * mix(1., .3, smoothstep(1.5, 5., r));
  }
  gl_FragColor = vec4(acesTone(col * uExpo), 1.);
  #include <colorspace_fragment>
}`;function Se(){const e=new oe(.52,.52,.32,6,1).toNonIndexed();e.translate(0,.58,0),e.computeVertexNormals();const o=[new ot(0,-.95),new ot(.22,-.95)],a=.075;for(let t=-.93;t<.42;t+=a/2){const l=Math.round((t+.93)/(a/2));o.push(new ot(l%2===0?.25:.285,t))}o.push(new ot(.27,.42),new ot(0,.42));const n=new ne(o,48);return[e,n]}function ke(){const e=new mt(1,64,32,0,Math.PI*2,0,Math.PI/2);e.scale(.62,.42,1),e.translate(0,0,-.22);const o=new mt(1,48,24,0,Math.PI*2,0,Math.PI/2);o.scale(.44,.3,.3),o.translate(0,0,.82);const a=new mt(1,32,16,0,Math.PI*2,0,Math.PI/2);a.scale(.24,.17,.18),a.translate(0,0,1.16);for(const n of[e,o,a])n.rotateY(Math.PI/2).translate(-.06,0,0);return[e,o,a]}function Re(e,o,a){let n=e.shared.get("tfFlow");return n||(n={tt:0,spin:0,last:-1},e.shared.set("tfFlow",n)),n.last!==a&&(n.last=a,n.tt+=o*e.params.num("drain",1),e.params.bool("spin",!0)&&(n.spin+=o*.3)),n}function Kt(e){return e.str("samples","16")==="3"?Rt:xt}const Gt=new Map;function $e(e,o,a,n){const t=`${e}|${o}|${a}|${n}`;let l=Gt.get(t);if(l===void 0){const r=Tt(G[e],n);let i=0;for(let c=0;c<24;c++){const h=ut(1,o+(a-o)*(c+.5)/24,r,xt);i+=.2126*h[0]+.7152*h[1]+.0722*h[2]}l=Math.min(1,i/24*1.6),Gt.set(t,l)}return l}function Te(e,o){const a=Math.max(1,Math.abs(o-e));return[1,2,5,10,20,25,50,100,200].find(n=>a/n<=12)??250}function St(e,o){const a=G[e.params.str("preset","bubble")||"bubble"];return ae(e,{cam:a.cam,target:a.target,antialias:!0,fov:40,background:329482},({scene:n,camera:t,controls:l})=>{const r=new Array(ft).fill(550),i=Array.from({length:ft},()=>new zt),c={uNf:{value:1.33},uNlo:{value:1},uPairs:{value:0},uSub:{value:new ot(1,0)},uLam:{value:r},uW:{value:i},uNS:{value:16},uPreset:{value:0},uFlow:{value:0},uTMin:{value:10},uTMax:{value:900},uRough:{value:0},uExpo:{value:1.4},uFakeAmp:{value:.1},uStep:{value:50},uBase:{value:new zt},uEnvKind:{value:0},uTransp:{value:0}},h=(M,f)=>{const g=new wt({uniforms:{...c,uTransp:{value:f?1:0}},vertexShader:Ct,fragmentShader:Me,defines:{MODE:be[o]},side:M});return f&&(g.transparent=!0,g.depthWrite=!1,g.blending=Qt,g.blendSrc=Zt,g.blendDst=te),g},F=h(It,!1),L=h(ee,!1),q=new wt({uniforms:{uExpo:c.uExpo,uEnvKind:c.uEnvKind},vertexShader:ye,fragmentShader:we,side:Bt,depthWrite:!1}),N=new tt(new mt(60,32,16),q);N.renderOrder=-10,n.add(N);const O={uExpo:c.uExpo,uEnvKind:c.uEnvKind,uAsphalt:{value:0}},D=new wt({uniforms:O,vertexShader:Ct,fragmentShader:Pe}),R=new tt(new Yt(6,64),D);R.rotation.x=-Math.PI/2,n.add(R);const x={bubble:new dt,oil:new dt,titanium:new dt,beetle:new dt},P={bubble:[],oil:[],titanium:[],beetle:[]},_=new mt(1,72,48),y=new tt(_,o==="thick"?F:h(Bt,!0)),S=new tt(_,o==="thick"?F:h(It,!0));y.renderOrder=1,S.renderOrder=2,y.visible=o!=="thick",x.bubble.add(y,S),P.bubble.push(S);const j=new tt(new Ht(6.4,6.4),F);j.rotation.x=-Math.PI/2,j.position.y=-.5,x.oil.add(j),P.oil.push(j);for(const M of Se()){const f=new tt(M,F);x.titanium.add(f),P.titanium.push(f)}for(const M of ke()){const f=new tt(M,L);x.beetle.add(f),P.beetle.push(f)}for(const M of Object.values(x))n.add(M);let p=a.id;const W=(M,f)=>{p=M;for(const z of Object.keys(x))x[z].visible=z===M;const g=_t[M];if(R.position.y=g.floorY,O.uAsphalt.value=M==="oil"?1:0,R.scale.setScalar(M==="oil"?1.6:1),f){const z=G[M];t.position.set(...z.cam),l.target.set(...z.target),l.update()}};W(p,!1);const nt=e.params.on((M,f)=>{M==="preset"&&typeof f=="string"&&W(f,!0)}),$=new Xt,C=new ot(0,0),ht=new Jt;return{update(M,f,g){const z=e.params,X=Re(e,M,g),m=G[p],at=_t[p],U=z.num("tMin",m.tMin),k=z.num("tMax",m.tMax),Y=z.num("ior",m.ior),B=Tt(m,Y),V=Kt(z);c.uNf.value=B.nf,c.uNlo.value=B.nlo,c.uPairs.value=B.pairs,c.uSub.value.set(B.sub[0],B.sub[1]);for(let b=0;b<ft;b++){r[b]=V.lam[b]??550;const v=V.w[b];v?i[b].set(v[0],v[1],v[2]):i[b].set(0,0,0)}c.uNS.value=V.lam.length,c.uPreset.value=xe[p],c.uFlow.value=X.tt,c.uTMin.value=U,c.uTMax.value=k,c.uRough.value=at.rough,c.uExpo.value=at.expo,c.uBase.value.set(...at.base),c.uEnvKind.value=at.env,c.uStep.value=Te(U,k),c.uFakeAmp.value=$e(p,U,k,Y),p!=="oil"&&(x[p].rotation.y=p==="beetle"?Math.sin(X.spin)*.9:X.spin),$.setFromCamera(C,t);const d=$.intersectObjects(P[p],!1)[0];let T={hit:!1,d:0,cos:1,preset:p};if(d&&d.face){const b=d.object.worldToLocal(d.point.clone());if(p!=="oil"||!he(b.x,b.y)){const v=d.face.normal.clone().applyMatrix3(ht.getNormalMatrix(d.object.matrixWorld)).normalize(),I=Math.abs(v.dot($.ray.direction));T={hit:!0,d:pe(p,[b.x,b.y,b.z],X.tt,U,k),cos:I,preset:p}}}e.shared.set("tfCenter",T);const H=Math.acos(Math.min(1,T.cos))*180/Math.PI,J=p==="beetle"?"층당 ":"";if(o==="thick")e.hud(`막 두께 지도 · ${J}범위 ${Math.round(Math.min(U,k))}–${Math.round(Math.max(U,k))} nm
`+(T.hit?`화면 중앙 ${J}두께 ${T.d.toFixed(0)} nm`:"화면 중앙: 물체 없음")+`
가는 선 ${c.uStep.value} nm · 굵은 선 ${c.uStep.value*4} nm 간격`);else if(o==="fake"){const b=Vt((1-T.cos)*Ft+Et),v=$t(b);e.hud(`색 = 색상환(1 − N·V) 램프 · 두께 무시
`+(T.hit?`중앙 색 ${v.name} (${v.hue.toFixed(0)}°) · 시야각 ${H.toFixed(0)}°
두께 ${T.d.toFixed(0)} nm여도 색은 같음`:"화면 중앙: 물체 없음"))}else{let b="화면 중앙: 물체 없음";if(T.hit){const v=ut(T.cos,T.d,B,V),I=$t(v),st=.2126*v[0]+.7152*v[1]+.0722*v[2];b=`중앙 ${J}두께 ${T.d.toFixed(0)} nm · 시야각 ${H.toFixed(0)}°
반사 주색 ${I.name}${I.sat>=.14?` (${I.hue.toFixed(0)}°)`:""} · 반사율 ${(st*100).toFixed(1)}%`}e.hud(`${m.desc} · 파장 ${V.lam.length}개
${b}`)}},dispose(){nt(),_.dispose()}}})}function Fe(e){let o="",a={spec:[],rgb:[]};const n=220;return se(e,()=>({draw(t,l,r){ce(t,l,r);const i=e.params,c=i.str("preset","bubble")||"bubble",h=G[c],F=i.num("tMin",h.tMin),L=i.num("tMax",h.tMax),q=Math.min(F,L),N=Math.max(F,L),O=i.num("ior",h.ior),D=Tt(h,O),R=N<=250?250:N<=1e3?1e3:1500,x=e.shared.get("tfCenter")??{hit:!1,d:(q+N)/2,cos:1,preset:c},P=x.hit&&x.preset===c?x.d:(q+N)/2,_=x.hit&&x.preset===c?x.cos:1,y=l<560,S=y?9:10,j=`${c}|${O}|${R}`;if(j!==o){o=j;const s=[],u=[];let E=1e-4;for(let K=0;K<n;K++){const Z=(K+.5)/n*R,gt=ut(1,Z,D,xt),Lt=ut(1,Z,D,Rt);s.push(gt),u.push(Lt),E=Math.max(E,...gt,...Lt)}const w=.95/E;a={spec:s.map(K=>vt(K,w)),rgb:u.map(K=>vt(K,w))}}const p=y?54:92,W=l-12,nt=34,$=y?14:18,C=s=>p+s/R*(W-p),ht=i.str("samples","16")==="3",M=(s,u,E,w)=>{const K=(W-p)/s.length;for(let Z=0;Z<s.length;Z++)t.fillStyle=s[Z],t.fillRect(p+Z*K,u,K+.6,$);A(t,(w?"▶ ":"")+E,p-6,u+$/2+3.5,w?"#facc15":"#c9d1dc",S,"right")},f=nt+10;t.fillStyle="rgba(250,204,21,0.16)",t.fillRect(C(q),f-6,Math.max(2,C(Math.min(N,R))-C(q)),$*2+10),t.strokeStyle="#facc15",t.lineWidth=1.5,t.beginPath(),t.moveTo(C(q),f-2),t.lineTo(C(q),f-7),t.lineTo(C(Math.min(N,R)),f-7),t.lineTo(C(Math.min(N,R)),f-2),t.stroke(),M(a.spec,f,y?"16파장":"스펙트럼 16",!ht),M(a.rgb,f+$+2,y?"RGB 3":"RGB 3파장",ht);const g=C(Math.min(P,R));t.fillStyle="#ffffff",t.beginPath(),t.moveTo(g,f+$*2+3),t.lineTo(g-5,f+$*2+10),t.lineTo(g+5,f+$*2+10),t.fill(),t.fillRect(g-.75,f-2,1.5,$*2+4);const z=f+$*2+22,X=R<=250?50:R<=1e3?100:250;for(let s=0;s<=R;s+=X){const u=C(s);t.fillStyle="#3a4252",t.fillRect(u,f+$*2+2,1,4),(!y||s%(X*2)===0)&&A(t,`${s}`,u,z,"#7d8799",S,"center")}A(t,y?"nm":"두께 nm",p-6,z,"#7d8799",S,"right");const m=z+18,at=r-30,U=y?26:40,k=y?30:44,Y=y?l*.56:l*.55,B=Y+U,V=l-10,d=Math.max(30,at-m),T=90,H=[[],[],[]],J=[],b=[];let v;for(let s=0;s<=T;s++){const u=Math.cos(s/T*89.5*Math.PI/180),E=ut(u,P,D,xt);b.push(E);for(let w=0;w<3;w++)H[w].push(E[w]);J.push(kt(u,550,0,D))}v=.03;for(let s=0;s<=70;s++)v=Math.max(v,H[0][s],H[1][s],H[2][s],J[s]);v=Math.min(1,v*1.15);const I=s=>k+s/T*(Y-k),st=s=>m+d-Math.min(s,v)/v*d;t.strokeStyle="#1c2230",t.lineWidth=1,t.strokeRect(k+.5,m+.5,Y-k,d);for(const[s,u]of[[0,"#ff6b6b"],[1,"#4ade80"],[2,"#5b9cff"]])t.strokeStyle=u,t.lineWidth=1.6,t.beginPath(),H[s].forEach((E,w)=>w?t.lineTo(I(w),st(E)):t.moveTo(I(w),st(E))),t.stroke();t.strokeStyle="#9aa3b2",t.setLineDash([4,3]),t.beginPath(),J.forEach((s,u)=>u?t.lineTo(I(u),st(s)):t.moveTo(I(u),st(s))),t.stroke(),t.setLineDash([]),A(t,`${(v*100).toFixed(0)}%`,k-4,m+9,"#7d8799",S,"right"),A(t,y?`반사율·각도 (${P.toFixed(0)}nm)`:`각도별 반사율 (두께 ${P.toFixed(0)} nm) — 점선: 막 없을 때`,k+4,m-4,"#c9d1dc",S);const Q=7;let bt=1e-4;for(const s of b)bt=Math.max(bt,...s);for(let s=0;s<T;s++){const u=I(s),E=I(s+1);t.fillStyle=vt(b[s],.95/bt),t.fillRect(u,m+d+2,E-u+.6,Q);const w=Math.cos(s/T*89.5*Math.PI/180);t.fillStyle=vt(Vt((1-w)*Ft+Et),.95),t.fillRect(u,m+d+3+Q,E-u+.6,Q)}A(t,"실제",k-4,m+d+2+Q,"#c9d1dc",S-1,"right"),A(t,"가짜",k-4,m+d+3+Q*2,"#c9d1dc",S-1,"right");for(let s=0;s<=90;s+=30)A(t,`${s}°`,k+s/90*(Y-k),m+d+Q*2+14,"#7d8799",S,"center");const Mt=Math.acos(Math.min(1,_))*180/Math.PI,qt=k+Mt/90*(Y-k);t.strokeStyle="#ffffff",t.lineWidth=1,t.setLineDash([2,3]),t.beginPath(),t.moveTo(qt,m),t.lineTo(qt,m+d+Q*2+3),t.stroke(),t.setLineDash([]);const ct=s=>B+(s-400)/300*(V-B),yt=[];let lt=.05;for(let s=400;s<=700;s+=2){const u=kt(_,s,P,D);yt.push(u),lt=Math.max(lt,u)}lt=Math.min(1,lt*1.12);const pt=s=>m+d-s/lt*d;yt.forEach((s,u)=>{const E=400+u*2,w=fe(E);t.fillStyle=`rgba(${Math.round(w[0]*255)},${Math.round(w[1]*255)},${Math.round(w[2]*255)},0.75)`,t.fillRect(ct(E),pt(s),(V-B)/150+.6,m+d-pt(s))}),t.strokeStyle="#e6e9ef",t.lineWidth=1.4,t.beginPath(),yt.forEach((s,u)=>u?t.lineTo(ct(400+u*2),pt(s)):t.moveTo(ct(400),pt(s))),t.stroke(),t.strokeStyle="#1c2230",t.lineWidth=1,t.strokeRect(B+.5,m+.5,V-B,d),Rt.lam.forEach((s,u)=>{t.strokeStyle=["#ff6b6b","#4ade80","#5b9cff"][u],t.setLineDash([3,3]),t.beginPath(),t.moveTo(ct(s),m),t.lineTo(ct(s),m+d),t.stroke()}),t.setLineDash([]),A(t,`${(lt*100).toFixed(0)}%`,B-3,m+9,"#7d8799",S,"right");for(const s of[400,500,600,700])A(t,`${s}`,ct(s),m+d+12,"#7d8799",S,"center");A(t,y?"스펙트럼 R(λ)":`파장별 반사 (시야각 ${Mt.toFixed(0)}°) — 점선: RGB 3파장 위치`,B+4,m-4,"#c9d1dc",S),y||A(t,"nm",V,m+d+24,"#7d8799",S,"right");const jt=ut(_,P,D,Kt(i)),Ut=$t(jt);e.hud(`${h.label} · 막 n=${O.toFixed(2)} · 중앙 ${P.toFixed(0)} nm, ${Mt.toFixed(0)}° → ${Ut.name}`),t.font=`${S}px ${le}`}}))}const Ee=[{title:"가짜 무지개 (N·V 색상 램프)",kind:"before",caption:"흔한 지름길: 1 − N·V 값으로 색상환을 돌린 램프를 반사에 곱한다. 어느 물체든 가장자리에 같은 동심원 고리가 생기고, 색 순서가 실제 간섭색과 다르며, 두께·굴절률을 바꿔도 아무 변화가 없다. 비눗방울의 흘러내리는 무늬도 없다.",mount:e=>St(e,"fake")},{title:"물리 기반 박막 간섭",kind:"after",caption:"파장마다 막의 윗면·아랫면에서 반사된 빛의 위상차를 Airy 합으로 더해 반사율을 구하고 RGB로 합친다. 색 띠가 두께 등고선을 따라 흐르고, 비스듬히 볼수록 색이 짧은 파장(파랑) 쪽으로 밀린다. 두께·굴절률 슬라이더가 색을 바로 바꾼다.",mount:e=>St(e,"phys")},{title:"막 두께 지도 (디버그)",kind:"info",caption:'같은 장면에서 막 두께만 흑백으로(밝을수록 두꺼움). 가는 주황 선과 굵은 빨간 선(4칸마다)은 일정 간격 등고선(간격은 HUD). 물리 기반 뷰어의 색 띠가 이 등고선과 그대로 겹친다 — 간섭색은 "두께 지도"다.',mount:e=>St(e,"thick")},{title:"간섭색 차트 · 각도별 반사율 · 스펙트럼",kind:"info",wide:!0,caption:"위: 두께에 따른 간섭색 띠(정면 기준, 미셸-레비 차트와 같은 원리). 노란 괄호 = 현재 두께 범위, 흰 삼각형 = 화면 중앙 두께. 16파장은 두꺼워질수록 색이 바래 파스텔·흰색이 되지만, RGB 3파장은 끝없이 진한 색을 반복한다. 아래 왼쪽: 중앙 두께에서 입사각별 R·G·B 반사율과 실제/가짜 색 띠. 아래 오른쪽: 파장별 반사 스펙트럼.",mount:Fe}],ze={layout:"compare",intro:'비눗방울·물웅덩이 위 기름·딱정벌레 껍질·불에 그을린 티타늄의 무지개빛은 색소가 아니라 <b>얇은 막의 간섭</b>입니다. 막 윗면에서 반사된 빛과 아랫면까지 갔다 온 빛이 겹칠 때, 왕복 거리 차가 파장의 정수배면 그 색이 강해지고 반 파장 어긋나면 사라집니다. 그래서 색은 <b>막 두께(수백 nm)·굴절률·보는 각도</b>로 정해집니다. 아래에서 흔한 "N·V 무지개 램프"와 실제 간섭 계산을 비교하고, 프리셋을 바꿔 보세요.',how:["막 안쪽 각도: sinθ₁ = sinθ₀ / n막 (스넬). 두 반사 빛의 위상차 δ = 4π · n막 · d · cosθ₁ / λ.","윗면 반사 r₁₂와 아랫면 반사 r₂₃(바탕이 금속이면 복소수)를 Airy 합으로 더한다: r = (r₁₂ + r₂₃e^{iδ}) / (1 + r₁₂r₂₃e^{iδ}), R = |r|².","s·p 편광을 각각 계산해 평균하고, 여러 파장(여기서는 400–700 nm 16개)의 R을 CIE 등색 함수로 RGB에 합친다.","두께 d는 텍스처·노이즈·시뮬레이션으로 픽셀마다 다르게: 비눗방울은 중력 배수로 위가 얇고, 기름막은 가장자리로 갈수록 얇다.","비스듬히 보면 cosθ₁가 작아져 광로차가 줄어든다 → 색이 짧은 파장 쪽으로 이동(파랑화).","게임에서는 파장 루프 대신 Belcour–Barla 2017의 스펙트럼 적분 근사나 두께×각도 LUT를 쓰고, glTF는 KHR_materials_iridescence로 표준화했다."],pros:["두께·굴절률이라는 물리적인 두 값으로 비눗방울·기름·양극산화 금속·곤충을 모두 표현",'보는 각도에 따라 색이 이동해 "살아 있는" 느낌',"두께 맵 하나로 아티스트가 무늬를 그릴 수 있음"],cons:["파장 루프는 픽셀당 비용이 큼 → 근사식·LUT 필요","RGB 3파장만 쓰면 두꺼운 막에서 색이 바래지 않아 과포화","다층막(딱정벌레·모르포 나비)은 층 수만큼 비용 증가"],usedIn:'glTF KHR_materials_iridescence(three.js MeshPhysicalMaterial의 iridescence), UE·Unity HDRP의 박막(thin film) 재질 옵션, Belcour & Barla 2017 "A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence". 게임의 비눗방울·기름 웅덩이·딱정벌레·자동차 카멜레온 도장.',controls:[{type:"select",key:"preset",label:"재질 프리셋",options:Object.keys(G).map(e=>({label:G[e].label,value:e})),value:"bubble"},{type:"range",key:"tMin",label:"최소 두께 (nm)",min:0,max:1e3,step:5,value:G.bubble.tMin},{type:"range",key:"tMax",label:"최대 두께 (nm)",min:20,max:1500,step:5,value:G.bubble.tMax},{type:"range",key:"ior",label:"막 굴절률",min:1.1,max:2.8,step:.01,value:G.bubble.ior},{type:"range",key:"drain",label:"배수·흐름 속도",min:0,max:3,step:.1,value:1},{type:"toggle",key:"spin",label:"자동 회전",value:!0},{type:"select",key:"samples",label:"파장 샘플",options:[{label:"스펙트럼 16파장",value:"16"},{label:"RGB 3파장 (650·510·475 nm)",value:"3"}],value:"16"}],viewers:Ee,setup(e){return e.on((o,a)=>{if(o!=="preset"||typeof a!="string")return;const n=G[a];n&&(e.set("tMin",n.tMin),e.set("tMax",n.tMax),e.set("ior",n.ior))})}};export{ze as default};
