import{g as E,u as he,aq as ye,M as $,P as Ie,S as $e,C as Ne,aM as Ge,ac as Xe,ag as qe,L as Se,a3 as Ue,a4 as We}from"./three.module-BZgG6AUv.js";import{m as Oe}from"./BufferGeometryUtils-CSZ6nkm7.js";import{m as je}from"./three-viewer-0rZIEDzf.js";import{m as Ke}from"./canvas-viewer-Btf0JXdr.js";import{G as Ye}from"./glsl-DOwCk4-f.js";const B=[.085,.006,.018],j=[{value:"tint",label:"바탕색 밝게",c:[1,.4,.52]},{value:"white",label:"흰색",c:[.85,.85,.85]},{value:"gold",label:"금색",c:[1,.72,.28]},{value:"teal",label:"청록 (대비)",c:[.2,.85,.85]},{value:"none",label:"없음 (0)",c:[0,0,0]}],Ce=t=>(j.find(o=>o.value===t.str("sheenColor","tint"))??j[0]).c,te={velvet:{label:"벨벳",note:"짧은 털(파일)이 서 있어 가장자리에서 털 옆면이 빛남 → 강한 림, 정면은 어두움",ggxR:.75,m:{base:[.06,.004,.016],base2:[.06,.004,.016],sheen:[1,.38,.55],sheenR:.33,specW:0,ggxR:.75,anisoW:0,at:.3,ab:.3,weave:1,weaveScale:160,weaveAmp:1}},cotton:{label:"면 (평직)",note:"보풀이 넓게 퍼져 시언이 약하고 넓음 → 가장자리가 살짝 희뿌옇게",ggxR:.85,m:{base:[.36,.3,.22],base2:[.4,.34,.26],sheen:[.45,.45,.45],sheenR:.85,specW:0,ggxR:.85,anisoW:0,at:.5,ab:.5,weave:2,weaveScale:80,weaveAmp:.7}},silk:{label:"새틴 · 실크",note:"긴 실(플로트)이 한 방향으로 누워 이방성 하이라이트 + 약한 시언",ggxR:.35,m:{base:[.42,.24,.08],base2:[.42,.24,.08],sheen:[.6,.48,.3],sheenR:.3,specW:0,ggxR:.35,anisoW:1,at:.55,ab:.09,weave:3,weaveScale:110,weaveAmp:.35}},denim:{label:"데님 (능직)",note:"남색 날실 + 흰 씨실의 사선 무늬, 시언은 약하고 거칠다",ggxR:.8,m:{base:[.02,.045,.14],base2:[.32,.34,.38],sheen:[.14,.17,.24],sheenR:.7,specW:0,ggxR:.8,anisoW:0,at:.5,ab:.5,weave:4,weaveScale:64,weaveAmp:.9}}},O={base2:[0,0,0],sheen:[0,0,0],sheenR:.5,specW:0,ggxR:.8,anisoW:0,at:.5,ab:.5,weave:0,weaveScale:1,weaveAmp:0};function Le(t,o){if(t==="ggx")return{...O,base:B,base2:B,specW:1,ggxR:o.num("ggxRough",.65)};if(t==="sheen")return{...O,base:B,base2:B,sheen:Ce(o),sheenR:o.num("sheenRough",.35)};const n=te[o.str("preset","velvet")]??te.velvet;return o.str("model","sheen")==="ggx"?{...n.m,sheen:[0,0,0],anisoW:0,specW:1,ggxR:n.ggxR}:n.m}const W=Math.PI,K=t=>Math.min(1,Math.max(0,t));function de(t,o){const l=1/Math.max(t,.07)**2,a=Math.max(1-o*o,.0078125);return(2+l)*Math.pow(a,l*.5)/(2*W)}const Ve=(t,o)=>K(1/(4*(o+t-o*t)));function Fe(t,o){const n=(t*t)**2,l=o*o*(n-1)+1;return n/(W*l*l)}function Je(t,o,n){const l=(t*t)**2,a=n*Math.sqrt(o*o*(1-l)+l),v=o*Math.sqrt(n*n*(1-l)+l);return .5/Math.max(a+v,1e-5)}const Re=(t,o)=>t+(1-t)*Math.pow(1-o,5),_=32,q=16;let fe=null;function ke(){if(fe)return fe;const t=new Float32Array(_*q),o=40,n=32,l=W/2/o,a=W/n;for(let v=0;v<q;v++){const h=Math.max(v/(q-1),.07);for(let c=0;c<_;c++){const p=Math.max(c/(_-1),.001),e=Math.sqrt(1-p*p);let s=0;for(let r=0;r<o;r++){const u=(r+.5)*l,m=Math.sin(u),f=Math.cos(u);for(let i=0;i<n;i++){const d=(i+.5)*a,N=m*Math.cos(d)+e,g=m*Math.sin(d),b=f+p,y=b/Math.hypot(N,g,b);s+=de(h,y)*Ve(p,f)*f*m}}t[v*_+c]=Math.min(1,s*l*a*2)}}return fe=t,t}function ce(t,o){const n=ke(),l=K(t)*(_-1),a=K(o)*(q-1),v=Math.min(Math.floor(l),_-2),h=Math.min(Math.floor(a),q-2),c=l-v,p=a-h,e=n[h*_+v]*(1-c)+n[h*_+v+1]*c,s=n[(h+1)*_+v]*(1-c)+n[(h+1)*_+v+1]*c;return e*(1-p)+s*p}function Ze(){const t=ke(),o=new Uint8Array(_*q*4);for(let l=0;l<t.length;l++){const a=Math.round(K(t[l])*255);o[l*4]=a,o[l*4+1]=a,o[l*4+2]=a,o[l*4+3]=255}const n=new Xe(o,_,q,qe);return n.magFilter=Se,n.minFilter=Se,n.needsUpdate=!0,n}const _e=[.2,.23,.29],le=[.045,.04,.035],De=1;function Qe(t){const o=t*.5+.5;return[0,1,2].map(n=>(le[n]+(_e[n]-le[n])*o)*De)}function et(t,o){const n=[-1,-.0275,-.572,.022],l=[1,.0425,1.04,-.04],a=n.map((h,c)=>t*h+l[c]),v=Math.min(a[0]*a[0],Math.pow(2,-9.28*o))*a[0]+a[1];return[-1.04*v+a[2],1.04*v+a[3]]}const P=(t,o)=>t[0]*o[0]+t[1]*o[1]+t[2]*o[2],D=t=>{const o=Math.hypot(t[0],t[1],t[2])||1;return[t[0]/o,t[1]/o,t[2]/o]},I=(t,o)=>[t[1]*o[2]-t[2]*o[1],t[2]*o[0]-t[0]*o[2],t[0]*o[1]-t[1]*o[0]];function re(t,o,n,l,a){const v=Math.max(P(t,o),1e-4),h=Math.max(a.sheen[0],a.sheen[1],a.sheen[2]),c=h>0?ce(v,a.sheenR):0,p=[0,0,0],e=I(t,n);for(const m of l){const f=P(t,m.L);if(f<=0)continue;const i=D([m.L[0]+o[0],m.L[1]+o[1],m.L[2]+o[2]]),d=Math.max(P(t,i),0),N=Math.max(P(o,i),0),g=h>0?ce(f,a.sheenR):0,b=1-h*Math.max(c,g),y=a.specW>0?a.specW*Fe(a.ggxR,d)*Je(a.ggxR,v,f)*Re(.04,N):0;let M=0;if(a.anisoW>0){const x=P(n,i),S=P(e,i),L=a.at*a.ab,C=a.ab*x,A=a.at*S,T=L*d,G=L/(C*C+A*A+T*T),V=L*G*G/W,F=P(n,o),H=P(e,o),R=P(n,m.L),Y=P(e,m.L),z=f*Math.hypot(a.at*F,a.ab*H,v),oe=v*Math.hypot(a.at*R,a.ab*Y,f);M=a.anisoW*V*(.5/Math.max(z+oe,1e-5))*Re(.05,N)}const w=h>0?de(a.sheenR,d)*Ve(v,f):0;for(let x=0;x<3;x++)p[x]+=m.C[x]*f*(a.base[x]/W*b+y+M+a.sheen[x]*w)}const s=Qe(t[1]),r=et(a.ggxR,v),u=a.specW>0?a.specW*(.04*r[0]+r[1]):0;for(let m=0;m<3;m++)p[m]+=s[m]*(a.base[m]*(1-h*c)+a.sheen[m]*c+u*.9);return p}const me=t=>.2126*t[0]+.7152*t[1]+.0722*t[2];function xe(t,o){const n=D([o[0],0,o[2]]),l=D(I(n,[0,1,0])),a=t.num("lightAz",15)*W/180,h=[{L:D([-n[0]*Math.cos(a)-l[0]*Math.sin(a),.6,-n[2]*Math.cos(a)-l[2]*Math.sin(a)]),C:[3.4,3.3,3.15]}];return t.bool("back",!0)&&h.push({L:D([n[0]*.65+l[0]*.75,.45,n[2]*.65+l[2]*.75]),C:[3.2,2.85,2.4]}),h}function tt(t,o,n){const l=me(re(n,n,D(I([0,1,0],n)),o,t)),a=D(I([0,1,0],n)),v=I(n,a),h=.15,c=Math.sqrt(1-h*h);let p=0,e=0;const s=36;for(let r=0;r<s;r++){const u=r/s*2*W,m=D([n[0]*h+c*(a[0]*Math.cos(u)+v[0]*Math.sin(u)),n[1]*h+c*(a[1]*Math.cos(u)+v[1]*Math.sin(u)),n[2]*h+c*(a[2]*Math.cos(u)+v[2]*Math.sin(u))]),f=D(I([0,1,0],m)),i=me(re(m,n,f,o,t));p+=i,e=Math.max(e,i)}return p/=s,{center:l,rim:p,peak:e,ratio:p/Math.max(l,1e-4)}}function be(t,o,n,l,a=!1,v=!1){const h=[],c=[];for(let s=0;s<=o;s++)for(let r=0;r<=t;r++){const u=r/t,m=s/o,f=n(u,m);h.push(...f),c.push(...l(u,m,f))}const p=[],e=t+1;for(let s=0;s<o;s++)for(let r=0;r<t;r++){const u=s*e+r,m=u+1,f=u+e,i=f+1;if(v&&s===0){a?p.push(u,i,f):p.push(u,f,i);continue}a?p.push(u,m,i,u,i,f):p.push(u,i,m,u,f,i)}return{pos:h,uv:c,idx:p}}function ge(t){const o=[],n=[],l=[];for(const c of t){const p=o.length/3;o.push(...c.pos),n.push(...c.uv);for(const e of c.idx)l.push(e+p)}let a=new Ue;a.setAttribute("position",new We(o,3)),a.setAttribute("uv",new We(n,2)),a.setIndex(l),a=Oe(a,1e-4),a.computeVertexNormals(),a.computeTangents();const v=a.getAttribute("tangent"),h=new Float32Array(v.count*3);for(let c=0;c<v.count;c++){let p=v.getX(c),e=v.getY(c),s=v.getZ(c);(!Number.isFinite(p+e+s)||p*p+e*e+s*s<1e-8)&&(p=1,e=0,s=0),h[c*3]=p,h[c*3+1]=e,h[c*3+2]=s}return a.deleteAttribute("tangent"),a.setAttribute("aTan",new Ge(h,3)),a}const ie=-1.75,Me=0,He=1.8,se=1.78;function ot(){const n=be(72,56,(l,a)=>{const v=(l-.5)*1.1,h=.035+.12*a,c=l*W*2*3.5+a*.9,p=ie+v*(1+.18*a)+h*.35*Math.cos(c),e=h*Math.sin(c)+.16*(1-(2*l-1)**2)*(.3+a)-.05;return[p,se-.03-a*1.6,e]},(l,a)=>[l*1.1*1.25,a*1.6]);return ge([n])}const X=.5,pe=.92;function at(){const o=X*1.12,l=o+1.25,a=pe+(X+.012)*Math.cos(1.12),v=(X+.012)*Math.sin(1.12),h=.16,c=.1,p=Math.cos(1.12)-c,e=Math.sin(1.12),r=be(112,64,(u,m)=>{const f=u*W*2,i=m*l;let d,N;if(i<=o){const g=i/X;d=(X+.012)*Math.sin(g),N=pe+(X+.012)*Math.cos(g)}else{const g=i-o,b=1-Math.exp(-g/h);d=v+h*p*b+c*g,N=a-e*g-(1-e)*(g-h*b);const y=.11*Math.min(1,g/.55)**1.5;d+=y*Math.sin(7*f+.7*Math.sin(3*f)+1.3),N<.012&&(d+=(.012-N)*.9,N=.012)}return[Me+d*Math.cos(f),N,d*Math.sin(f)]},(u,m)=>{const f=m*l,i=u*W*2;return[f*Math.cos(i),f*Math.sin(i)]},!0,!0);return ge([r])}const Ae=.3;function nt(){const o=Ae+.01,n=25*W/180,l=Math.cos(n),a=Math.sin(n),v=h=>be(48,48,(c,p)=>{const e=c*2-1,s=p*2-1,r=Math.pow(Math.max(0,(1-e*e)*(1-s*s)),.42),u=.02*Math.sin(11*(Math.abs(e)-Math.abs(s)))*(e*e*s*s),m=.62*e*(1-.13*(1-s*s)),f=.62*s*(1-.13*(1-e*e)),i=o+h*Ae*r+u;return[He+m*l-f*a,Math.max(.005,i),m*a+f*l]},(c,p)=>[(c*2-1)*.62,(p*2-1)*.62],h<0);return ge([v(1),v(-1)])}const ve=`
attribute vec3 aTan;
varying vec3 vN; varying vec3 vW; varying vec3 vT; varying vec2 vUv;
void main(){
  vUv = uv;
  vN = normalize(mat3(modelMatrix) * normal);
  vT = mat3(modelMatrix) * aTan;
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Ee=`
varying vec3 vN; varying vec3 vW; varying vec3 vT; varying vec2 vUv;
uniform vec3 uL1; uniform vec3 uC1; uniform vec3 uL2; uniform vec3 uC2;
${Ye}
const float PI = 3.14159265;
vec3 envIrr(vec3 n){ return mix(vec3(${le.join(",")}), vec3(${_e.join(",")}), n.y * .5 + .5) * ${De.toFixed(2)}; }
vec3 envDir(vec3 d){
  vec3 c = d.y > 0. ? mix(vec3(.3, .32, .36), vec3(.1, .14, .24), d.y) : mix(vec3(.12, .11, .1), vec3(${le.join(",")}), clamp(-d.y * 4., 0., 1.));
  return c;
}
`,st=`
${Ee}
uniform vec3 uBase; uniform vec3 uBase2; uniform vec3 uSheen; uniform float uSheenR;
uniform float uSpecW; uniform float uGgxR; uniform float uAnisoW; uniform float uAt; uniform float uAb;
uniform float uWeave; uniform float uWeaveScale; uniform float uWeaveAmp;
uniform sampler2D uLut;

float D_Charlie(float r, float NoH){
  float a = max(r, .07); a *= a;
  float inv = 1. / a;
  float s2 = max(1. - NoH * NoH, .0078125);
  return (2. + inv) * pow(s2, inv * .5) / (2. * PI);
}
float V_Ashikhmin(float NoV, float NoL){ return clamp(1. / (4. * (NoL + NoV - NoL * NoV)), 0., 1.); }
float D_GGX(float r, float NoH){ float a2 = r * r; a2 *= a2; float d = NoH * NoH * (a2 - 1.) + 1.; return a2 / (PI * d * d); }
float V_Smith(float r, float NoV, float NoL){
  float a2 = r * r; a2 *= a2;
  float gv = NoL * sqrt(NoV * NoV * (1. - a2) + a2);
  float gl = NoV * sqrt(NoL * NoL * (1. - a2) + a2);
  return .5 / max(gv + gl, 1e-5);
}
float F_Schlick(float f0, float VoH){ return f0 + (1. - f0) * pow(1. - VoH, 5.); }
float sheenE(float NoV, float r){ return texture2D(uLut, vec2((clamp(NoV, 0., 1.) * 31. + .5) / 32., (clamp(r, 0., 1.) * 15. + .5) / 16.)).r; }
vec2 envBRDF(float r, float NoV){
  vec4 rr = r * vec4(-1., -.0275, -.572, .022) + vec4(1., .0425, 1.04, -.04);
  float a004 = min(rr.x * rr.x, exp2(-9.28 * NoV)) * rr.x + rr.y;
  return vec2(-1.04, 1.04) * a004 + rr.zw;
}

float thread(float f){ return sqrt(max(0., sin(PI * f))); }
// 직조 높이: up = 날실(세로 실)이 위에 있으면 1
float weaveH(vec2 p, out float up){
  vec2 c = floor(p), f = fract(p);
  float wx = thread(f.x), wy = thread(f.y);
  float m;
  if (uWeave < 2.5) m = mod(c.x + c.y, 2.);                              // 평직: 한 올씩 교차
  else if (uWeave < 3.5) m = abs(mod(c.y - 2. * c.x, 5.)) < .5 ? 0. : 1.; // 수자직: 날실이 4칸 떠 있음
  else m = mod(c.x - c.y, 4.) < 2.5 ? 1. : 0.;                           // 3/1 능직: 사선
  up = m;
  if (uWeave > 2.5 && uWeave < 3.5) return m > .5 ? wx : .8 * wy;          // 새틴은 길게 이어지는 실
  return m > .5 ? wx * mix(.55, 1., wy) : wy * mix(.55, 1., wx);
}

vec3 shadeL(vec3 N, vec3 V, vec3 T, vec3 B, vec3 base, vec3 L, vec3 C, float NoV, float maxS, float eV){
  float NoL = dot(N, L);
  if (NoL <= 0.) return vec3(0.);
  vec3 H = normalize(L + V);
  float NoH = max(dot(N, H), 0.), VoH = max(dot(V, H), 0.);
  float eL = maxS > 0. ? sheenE(NoL, uSheenR) : 0.;
  float scale = 1. - maxS * max(eV, eL);           // 시언이 가져간 에너지만큼 바탕을 줄임
  float spec = uSpecW > 0. ? uSpecW * D_GGX(uGgxR, NoH) * V_Smith(uGgxR, NoV, NoL) * F_Schlick(.04, VoH) : 0.;
  float aniso = 0.;
  if (uAnisoW > 0.) {
    float a2 = uAt * uAb;
    vec3 v = vec3(uAb * dot(T, H), uAt * dot(B, H), a2 * NoH);
    float w2 = a2 / dot(v, v);
    float D = a2 * w2 * w2 / PI;
    float lv = NoL * length(vec3(uAt * dot(T, V), uAb * dot(B, V), NoV));
    float ll = NoV * length(vec3(uAt * dot(T, L), uAb * dot(B, L), NoL));
    aniso = uAnisoW * D * (.5 / max(lv + ll, 1e-5)) * F_Schlick(.05, VoH);
  }
  vec3 sh = maxS > 0. ? uSheen * D_Charlie(uSheenR, NoH) * V_Ashikhmin(NoV, NoL) : vec3(0.);
  return C * NoL * (base / PI * scale + spec + aniso + sh);
}

void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  vec3 T = vT - N * dot(N, vT);
  T = dot(T, T) > 1e-8 ? normalize(T) : normalize(cross(N, vec3(0., 0., 1.)) + vec3(1e-3));
  vec3 B = cross(N, T);
  vec3 base = uBase;
  if (uWeave > 0.5) {
    vec2 p = vUv * uWeaveScale;
    float fw = length(fwidth(p));
    float fade = 1. - smoothstep(.25, .8, fw);
    vec2 g = vec2(0.);
    if (uWeave < 1.5) {
      // 벨벳: 털 끝의 잔 노이즈 + 털이 눌린 "크러시" 얼룩(저주파)
      float e = .35;
      float h0 = vnoise(p), hx = vnoise(p + vec2(e, 0.)), hy = vnoise(p + vec2(0., e));
      g = vec2(hx - h0, hy - h0) / e * .15 * fade;
      vec2 q = vUv * 5.;
      float c0 = fbm2(q), cx = fbm2(q + vec2(.03, 0.)), cy = fbm2(q + vec2(0., .03));
      g += vec2(cx - c0, cy - c0) / .03 * .05;
    } else {
      float up, u2;
      float e = .05;
      float h0 = weaveH(p, up);
      float hx = weaveH(p + vec2(e, 0.), u2), hy = weaveH(p + vec2(0., e), u2);
      g = vec2(hx - h0, hy - h0) / e * .22 * fade;
      base = mix(base, mix(uBase, uBase2, up < .5 ? 1. : 0.) * (.75 + .25 * h0), fade);
      base = mix(base, (uBase * 3. + uBase2) * .25, 1. - fade); // 멀리서는 평균색
    }
    N = normalize(N - uWeaveAmp * (g.x * T + g.y * B));
    T = normalize(T - N * dot(N, T));
    B = cross(N, T);
  }
  float NoV = max(dot(N, V), 1e-4);
  float maxS = max(uSheen.r, max(uSheen.g, uSheen.b));
  float eV = maxS > 0. ? sheenE(NoV, uSheenR) : 0.;
  vec3 col = shadeL(N, V, T, B, base, uL1, uC1, NoV, maxS, eV) + shadeL(N, V, T, B, base, uL2, uC2, NoV, maxS, eV);
  vec3 irr = envIrr(N);
  col += irr * (base * (1. - maxS * eV) + uSheen * eV);
  if (uSpecW > 0. || uAnisoW > 0.) {
    float r = uSpecW > 0. ? uGgxR : .5 * (uAt + uAb);
    vec2 ab = envBRDF(r, NoV);
    vec3 R = reflect(-V, N);
    float w = uSpecW > 0. ? uSpecW : uAnisoW;
    col += w * (.04 * ab.x + ab.y) * mix(envDir(R), irr, r);
  }
  gl_FragColor = vec4(acesTone(col * 1.1), 1.);
  #include <colorspace_fragment>
}`,Te=`
${Ee}
uniform vec3 uCol;
void main(){
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 col = uCol / PI * (max(dot(N, uL1), 0.) * uC1 + max(dot(N, uL2), 0.) * uC2) + uCol * envIrr(N);
  // 물체 아래 접지 그림자(가짜 AO)
  float ao = 1.;
  ao *= mix(.35, 1., smoothstep(.35, 1.15, length(vW.xz - vec2(${Me.toFixed(2)}, 0.))));
  ao *= mix(.4, 1., smoothstep(.3, .95, length((vW.xz - vec2(${He.toFixed(2)}, 0.)) * vec2(1., 1.))));
  ao *= mix(.6, 1., smoothstep(.1, .7, length((vW.xz - vec2(${ie.toFixed(2)}, 0.)) * vec2(.6, 1.5))));
  ao *= mix(1., .3, smoothstep(2.5, 7., length(vW.xz)));
  gl_FragColor = vec4(acesTone(col * ao * 1.1), 1.);
  #include <colorspace_fragment>
}`;function ct(t,o){return je(t,{antialias:!0,cam:[0,1.55,4.7],target:[0,.8,0],fov:40,background:790293,near:.05,far:60},({scene:n,camera:l,controls:a})=>{a.maxPolarAngle=W*.53;const v=Ze(),h={uL1:{value:new E(0,1,0)},uC1:{value:new E},uL2:{value:new E(0,1,0)},uC2:{value:new E}},c={...h,uBase:{value:new E},uBase2:{value:new E},uSheen:{value:new E},uSheenR:{value:.4},uSpecW:{value:0},uGgxR:{value:.8},uAnisoW:{value:0},uAt:{value:.5},uAb:{value:.5},uWeave:{value:0},uWeaveScale:{value:1},uWeaveAmp:{value:0},uLut:{value:v}},p=new he({uniforms:c,vertexShader:ve,fragmentShader:st,side:ye}),e=new he({uniforms:{...h,uCol:{value:new E(.03,.03,.032)}},vertexShader:ve,fragmentShader:Te,side:ye}),s=new he({uniforms:{...h,uCol:{value:new E(.25,.2,.15)}},vertexShader:ve,fragmentShader:Te}),r=y=>{const M=y.getAttribute("position").count,w=new Float32Array(M*3);for(let x=0;x<M;x++)w[x*3]=1;return y.setAttribute("aTan",new Ge(w,3)),y};n.add(new $(ot(),p)),n.add(new $(at(),p)),n.add(new $(nt(),p));const u=new $(r(new Ie(16,16)),e);u.rotation.x=-W/2,n.add(u);const m=new $(r(new $e(X*.97,32,16)),s);m.position.set(Me,pe,0),n.add(m);const f=new $(r(new Ne(.022,.022,1.58,12)),s);f.rotation.z=W/2,f.position.set(ie,se,-.02),n.add(f);for(const y of[-.76,.76]){const M=new $(r(new Ne(.018,.022,se,10)),s);M.position.set(ie+y,se/2,-.02),n.add(M)}let i=Le(o,t.params);const d=()=>{i=Le(o,t.params),c.uBase.value.set(...i.base),c.uBase2.value.set(...i.base2),c.uSheen.value.set(...i.sheen),c.uSheenR.value=i.sheenR,c.uSpecW.value=i.specW,c.uGgxR.value=i.ggxR,c.uAnisoW.value=i.anisoW,c.uAt.value=i.at,c.uAb.value=i.ab,c.uWeave.value=t.params.bool("weave",!0)?i.weave:0,c.uWeaveScale.value=i.weaveScale,c.uWeaveAmp.value=i.weaveAmp};d();const N=t.params.on(()=>d()),g=new E;let b=1;return{update(y){l.getWorldDirection(g);const M=xe(t.params,[g.x,g.y,g.z]);if(h.uL1.value.set(...M[0].L),h.uC1.value.set(...M[0].C),M[1]?(h.uL2.value.set(...M[1].L),h.uC2.value.set(...M[1].C)):h.uC2.value.set(0,0,0),b+=y,b<.2)return;b=0;const w=[-g.x,-g.y,-g.z],x=tt(i,M,w),S=o==="ggx"?`GGX 거칠기 ${i.ggxR.toFixed(2)} (시언 없음)`:o==="sheen"?`시언 거칠기 ${i.sheenR.toFixed(2)} · 시언 색 ${(j.find(C=>C.value===t.params.str("sheenColor","tint"))??j[0]).label}`:`${(te[t.params.str("preset","velvet")]??te.velvet).label} · ${t.params.str("model","sheen")==="ggx"?"GGX만":"천 BRDF"}`,L=x.ratio>=2.5?"가장자리가 빛남":x.ratio>=1.15?"가장자리가 조금 밝음":x.ratio<=.87?"가장자리가 어두움":"거의 같음";t.hud(`${S}
가장자리/정면 밝기 비 ${x.ratio.toFixed(2)} (${L})
정면 ${x.center.toFixed(3)} · 가장자리 평균 ${x.rim.toFixed(3)} · 최대 ${x.peak.toFixed(3)}`)},dispose(){N(),v.dispose()}}})}const U=[.15,.3,.5,.75,1],ee=j.filter(t=>t.value!=="none");function ae(t){return K(t*(2.51*t+.03)/(t*(2.43*t+.59)+.14))}function ne(t){return t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055}function lt(t){return Ke(t,()=>{let o=null,n="",l="";const a=getComputedStyle(document.documentElement),v=(e,s)=>a.getPropertyValue(e).trim()||s,h=(e,s,r)=>{const u=U.length+1,m=ee.length,f=Math.ceil(u*e*r),i=Math.ceil(m*e*r),d=document.createElement("canvas");d.width=f,d.height=i;const N=d.getContext("2d"),g=N.createImageData(f,i),b=xe(t.params,[0,0,-1]),y=[0,0,1],M=s*r;for(let w=0;w<m;w++)for(let x=0;x<u;x++){const S=x===0?{...O,base:B,specW:1,ggxR:t.params.num("ggxRough",.65)}:{...O,base:B,sheen:ee[w].c,sheenR:U[x-1]},L=(x+.5)*e*r,C=(w+.5)*e*r;for(let A=Math.floor(C-M);A<Math.ceil(C+M);A++)for(let T=Math.floor(L-M);T<Math.ceil(L+M);T++){const G=(T+.5-L)/M,V=-(A+.5-C)/M,F=G*G+V*V;if(F>1||T<0||A<0||T>=f||A>=i)continue;const H=[G,V,Math.sqrt(1-F)],R=re(H,y,D(I([0,1,0],H)),b,S),Y=K((1-Math.sqrt(F))*M*.9),z=(A*f+T)*4;g.data[z]=ne(ae(R[0]*1.1))*255,g.data[z+1]=ne(ae(R[1]*1.1))*255,g.data[z+2]=ne(ae(R[2]*1.1))*255,g.data[z+3]=Y*255}}return N.putImageData(g,0,0),d},c=(e,s,r,u,m,f,i,d)=>{e.strokeStyle=d,e.lineWidth=1;for(const b of[.5,1])e.beginPath(),e.arc(s,r,u*b,W,2*W),e.stroke();e.beginPath(),e.moveTo(s-u-6,r),e.lineTo(s+u+6,r),e.stroke(),e.setLineDash([3,3]);for(const b of[-60,-30,0,30,60]){const y=b*W/180;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.sin(y)*u,r-Math.cos(y)*u),e.stroke()}e.setLineDash([]),e.fillStyle=d,e.font="10px system-ui, sans-serif",e.textAlign="center",e.fillText("N",s,r-u-4),e.fillText("90°",s+u-4,r+12),e.fillText("90°",s-u+4,r+12);const N=160,g=f.map(b=>{const y=[];let M=1e-9;for(let w=0;w<=N;w++){const x=-W/2+w/N*W,S=Math.max(0,b.f(x));y.push(S),M=Math.max(M,S)}return y.map(w=>w/M)});f.forEach((b,y)=>{e.strokeStyle=b.color,e.lineWidth=2,e.fillStyle=b.color+"22",e.beginPath(),e.moveTo(s,r),g[y].forEach((M,w)=>{const x=-W/2+w/N*W,S=M*u;e.lineTo(s+Math.sin(x)*S,r-Math.cos(x)*S)}),e.closePath(),e.fill(),e.stroke()}),e.fillStyle=i,e.font="11px system-ui, sans-serif",e.textAlign="left",e.fillText(m,s-u,Math.max(12,r-u-16)),f.forEach((b,y)=>{e.fillStyle=b.color,e.fillText(b.label,s-u*.78+y*u*.92,r+17)})},p=(e,s,r,u,m,f,i,d)=>{const N=xe(t.params,[0,0,-1]),g=[0,0,1],b=120,y=u<260,M=r+(y?34:22),w=r+m-18,x=s+12,S=s+u-12,L=f.map(({m:A})=>{const T=[];for(let G=0;G<=b;G++){const V=-.995+G/b*1.99,F=[V,0,Math.sqrt(1-V*V)];T.push(ne(ae(me(re(F,g,D(I([0,1,0],F)),N,A))*1.1)))}return T}),C=Math.max(1e-4,...L.flat());e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(x,w),e.lineTo(S,w),e.moveTo((x+S)/2,w),e.lineTo((x+S)/2,M),e.stroke(),e.fillStyle=d,e.font="10px system-ui, sans-serif",e.textAlign="left",e.fillText("가장자리",x,w+12),e.textAlign="right",e.fillText("가장자리",S,w+12),e.textAlign="center",e.fillText(y?"정면":"정면 (N·V=1)",(x+S)/2,w+12),f.forEach((A,T)=>{e.strokeStyle=A.color,e.lineWidth=2,e.beginPath(),L[T].forEach((G,V)=>{const F=x+V/b*(S-x),H=w-G/C*(w-M);V===0?e.moveTo(F,H):e.lineTo(F,H)}),e.stroke(),e.fillStyle=A.color,e.textAlign="right",e.fillText(A.label,S-(f.length-1-T)*44,r+(y?26:12))}),e.fillStyle=i,e.font="11px system-ui, sans-serif",e.textAlign="left",e.fillText(y?"구 단면 밝기":"구 가로 단면의 화면 밝기 (현재 조명)",x,r+12)};return{draw(e,s,r){const u=v("--bg-2","#12161e"),m=v("--fg","#e6e8ee"),f="rgba(160,170,190,0.35)";e.fillStyle=u,e.fillRect(0,0,s,r);const i=s<600,d=i?{x:0,y:0,w:s,h:r*.44}:{x:0,y:0,w:s*.5,h:r},N=i?{x:0,y:r*.44,w:s,h:r*.56}:{x:s*.5,y:0,w:s*.5,h:r},g=t.params.num("ggxRough",.65),b=t.params.num("sheenRough",.35),y="#7aa7ff",M="#ff7aa8",w=d.w,x=d.h,S=w/x>1.9,L=S?{x:d.x,y:d.y,w:w/2,h:x}:{x:d.x,y:d.y,w,h:x*.55},C=S?{x:d.x+w/2,y:d.y,w:w/2,h:x}:{x:d.x,y:d.y+x*.55,w,h:x*.45},A=Math.max(18,Math.min(L.w/2-22,L.h-60));c(e,L.x+L.w/2,L.y+L.h-30,A,L.w<260?"분포 D(θh)":"미세면 방향 분포 D(θh) · 각각 최댓값=1",[{f:k=>Fe(g,Math.cos(k)),color:y,label:`GGX ${g.toFixed(2)}`},{f:k=>de(b,Math.cos(k)),color:M,label:`Charlie ${b.toFixed(2)}`}],m,f);const T=Ce(t.params);p(e,C.x,C.y,C.w,C.h,[{m:{...O,base:B,base2:B,specW:1,ggxR:g},color:y,label:"GGX"},{m:{...O,base:B,base2:B,sheen:T,sheenR:b},color:M,label:"시언"}],m,f);const G=i?44:64,V=16,F=U.length+1,H=ee.length,R=Math.max(10,Math.min((N.w-G-8)/F,(N.h-V-8)/H)),Y=R*.44,z=Math.min(window.devicePixelRatio||1,2),oe=[R.toFixed(1),z,t.params.num("lightAz",15),t.params.bool("back",!0),g].join("|");(oe!==n||!o)&&(o=h(R,Y,z),n=oe);const J=N.x+G+(N.w-G-F*R)/2,Z=N.y+V+2;e.drawImage(o,J,Z,F*R,H*R),e.font=`${i?9:10}px system-ui, sans-serif`,e.textAlign="center",e.fillStyle=m,e.fillText("GGX",J+R/2,Z-4),U.forEach((k,Q)=>e.fillText(`r ${k.toFixed(2)}`,J+(Q+1.5)*R,Z-4)),e.textAlign="right",ee.forEach((k,Q)=>e.fillText(k.label.replace(" (대비)",""),J-4,Z+(Q+.5)*R+3));const we=ee.findIndex(k=>k.value===t.params.str("sheenColor","tint"));if(we>=0){let k=0;U.forEach((Q,ze)=>{Math.abs(Q-b)<Math.abs(U[k]-b)&&(k=ze)}),e.strokeStyle="#ffd34d",e.lineWidth=1.5,e.strokeRect(J+(k+1)*R+1,Z+we*R+1,R-2,R-2)}const Pe=ce(1,b),Be=ce(.15,b),ue=i?"":`시언 알베도 E (거칠기 ${b.toFixed(2)}): 정면 ${Pe.toFixed(2)} · 가장자리(N·V 0.15) ${Be.toFixed(2)}
바탕 확산은 (1 − max(시언 색)·E)로 줄여 에너지 보존`;ue!==l&&(t.hud(ue),l=ue)}}})}const rt=[{mode:"ggx",title:"GGX로 만든 천 (거친 미세면)",kind:"before",caption:'"천은 거칠다"며 GGX 거칠기만 올린 결과. 정면이 가장 밝고 가장자리로 갈수록 어두워지는 램버트 + 뿌연 하이라이트라 고무나 무광 플라스틱처럼 보인다. 역광에서도 테두리가 한쪽에만 약하게 생긴다.'},{mode:"sheen",title:"시언 BRDF (Charlie + 바탕 확산)",kind:"after",caption:"Charlie 분포는 법선과 수직인 미세면(서 있는 털의 옆면)에 몰려 있어 보는 각이 비스듬할수록 밝다. 실루엣과 주름 능선이 부드럽게 빛나고 정면은 오히려 어둡다 — 벨벳의 특징. 시언이 가져간 만큼 바탕 확산을 줄인다."},{mode:"preset",title:"재질 프리셋 + 직조 노멀",kind:"variant",caption:'"프리셋"으로 벨벳·면·새틴(실크)·데님을 고르고 "프리셋 셰이딩 모델"을 GGX만으로 바꿔 비교. 새틴은 시언 + 이방성 GGX, 데님은 능직 사선 무늬와 흰 씨실. 직조 무늬는 보이도록 크게 과장했고, 확대하면 잘 보인다.'}],mt={layout:"compare",intro:"천을 GGX로 칠하면 거칠기를 아무리 조절해도 <b>고무·플라스틱</b>처럼 보입니다. 실제 천은 표면에서 털(섬유)이 서 있어서, <b>비스듬히 볼수록</b> 섬유 옆면이 빛을 받아 실루엣과 주름 능선이 부드럽게 빛납니다. 이를 위한 별도의 정반사 로브가 <b>시언(sheen)</b>이며, 실시간에서는 Estevez & Kulla(2017)의 <b>Charlie</b> 분포와 Ashikhmin식 가시성 항이 표준처럼 쓰입니다(glTF KHR_materials_sheen).",how:["GGX의 미세면 분포 D는 법선 방향(θh = 0)에 몰려 있다 → 정면 하이라이트. Charlie는 sin(θh)^(1/α) 꼴로 법선과 수직인 방향에 몰려 있다 → 가장자리 빛남.","시언 정반사 = 시언 색 × D_Charlie(N·H) × V(N·V, N·L) × N·L. V는 Ashikhmin 계열의 1 / (4(N·L + N·V − N·L·N·V)).","바탕(확산)은 시언이 가져간 에너지만큼 줄인다: 확산 × (1 − max(시언 색) × E(N·V)). E는 시언 로브의 방향 알베도로, 미리 적분한 작은 표(LUT)에서 읽는다.","환경광에서도 시언 색 × E(N·V) × 조도로 같은 림이 생긴다.","실크·새틴은 시언에 이방성 GGX를 더하고, 직조 무늬(평직·능직·수자직)는 디테일 노멀로 얹는다."],pros:['로브 하나 추가로 벨벳·면·니트의 "천 느낌"이 바로 생김',"표준 파라미터(시언 색·시언 거칠기)라 툴 간 호환","LUT 하나와 ALU 몇 줄로 모바일에서도 부담이 작음"],cons:["섬유 하나하나의 산란(실 사이 그림자, 투과)까지는 표현 못 함 — 근사","에너지 보존 처리(알베도 스케일)를 빼먹으면 가장자리가 과하게 밝아짐","직조 노멀은 멀리서 지글거리므로 밉/페이드 처리 필요"],usedIn:"glTF KHR_materials_sheen, three.js MeshPhysicalMaterial(sheen·sheenRoughness·sheenColor), UE Cloth 셰이딩 모델(Fuzz Color), Unity HDRP Fabric 셰이더(Cotton/Wool·Silk), Filament cloth 모델.",controls:[{type:"range",key:"sheenRough",label:"시언 거칠기",min:.07,max:1,step:.01,value:.35},{type:"select",key:"sheenColor",label:"시언 색",value:"tint",options:j.map(t=>({label:t.label,value:t.value}))},{type:"range",key:"ggxRough",label:"GGX 거칠기",min:.3,max:1,step:.01,value:.65},{type:"select",key:"preset",label:"프리셋",value:"velvet",options:Object.entries(te).map(([t,o])=>({label:o.label,value:t}))},{type:"select",key:"model",label:"프리셋 셰이딩 모델",value:"sheen",options:[{label:"천 BRDF (시언)",value:"sheen"},{label:"GGX만",value:"ggx"}]},{type:"toggle",key:"weave",label:"직조 노멀",value:!0},{type:"range",key:"lightAz",label:"주 조명 방향 (°, 0=정면 · 180=뒤)",min:0,max:180,step:5,value:15},{type:"toggle",key:"back",label:"역광 (림 라이트)",value:!0}],viewers:[...rt.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:o=>ct(o,t.mode)})),{title:"로브 극좌표 · 시언 거칠기 × 색 격자",kind:"info",wide:!0,caption:"왼쪽: GGX는 법선 쪽으로 솟은 로브, Charlie는 수평(90°) 쪽으로 퍼진 나비 모양. 오른쪽 그래프를 드래그해 빛 입사각을 바꾸면 GGX는 거울 방향 한쪽, 시언은 비스듬한 시선 전체로 빛을 보낸다. 격자: 첫 열은 GGX, 나머지는 시언 거칠기(가로) × 시언 색(세로), 노란 테두리는 현재 선택.",mount:t=>lt(t)}]};export{mt as default};
