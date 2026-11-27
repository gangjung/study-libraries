var vt=Object.defineProperty;var dt=(t,e,s)=>e in t?vt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var T=(t,e,s)=>dt(t,typeof e!="symbol"?e+"":e,s);import{m as xt}from"./three-viewer-0rZIEDzf.js";import{p as gt,M as B,S as ot,u as ht,az as bt,H as yt,D as wt,P as Dt,b as P,B as O,aC as lt,T as At,r as C,aN as Tt,s as st,L as q,N as V,k as K,aB as W,g as St,w as Rt,bg as Ft,C as Ut,af as Mt,ag as Lt,ah as $t,ai as It}from"./three.module-BZgG6AUv.js";import{F as Bt}from"./Pass-By1_TgQk.js";import{Q as _t}from"./glsl-DOwCk4-f.js";import{c as Ht}from"./postscene-jOAKHM8g.js";const j=["taa","bloom","exposure","tonemap","sharpen","grade","fxaa","vignette","grain"],z={taa:{name:"TAA (지터 + 히스토리)",short:"TAA",color:"#5b9cff",pixel:!1,alu:.35},bloom:{name:"블룸 (임계값 + 블러)",short:"Bloom",color:"#ffb84d",pixel:!1,alu:.62},exposure:{name:"노출 (×2^EV)",short:"Exp",color:"#e8e8e8",pixel:!0,alu:.02},tonemap:{name:"톤 매핑 (ACES)",short:"Tone",color:"#ff7a7a",pixel:!0,alu:.06},sharpen:{name:"샤프닝 (언샤프)",short:"Sharp",color:"#c084fc",pixel:!1,alu:.2},grade:{name:"컬러 그레이딩 (LUT)",short:"LUT",color:"#38d9d9",pixel:!0,alu:.08},fxaa:{name:"FXAA",short:"FXAA",color:"#4ade80",pixel:!1,alu:.3},vignette:{name:"비네트",short:"Vig",color:"#9aa0a8",pixel:!0,alu:.02},grain:{name:"필름 그레인",short:"Grain",color:"#d4c49a",pixel:!0,alu:.04}},at=.12;function ft(t,e=2.07){let s=0,a=0,o=!1;for(const i of t){const n=z[i];s+=(at+n.alu)*e,n.pixel?(a+=(o?0:at)*e+n.alu*e,o=!0):(a+=(at+n.alu)*e,o=!1)}return{split:s,uber:a}}const ct=new St(-.62,.2,-1).normalize(),Et="varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }",Ct=`
varying vec3 vDir; uniform vec3 uSun;
void main(){
  vec3 d = normalize(vDir);
  float h = clamp(d.y, -0.2, 1.);
  // 노을 하늘: 지평선 주황(밝음) → 천정 짙은 남색
  vec3 col = mix(vec3(4.2, 1.9, 0.75), vec3(0.08, 0.16, 0.42), pow(clamp(h * 2.2, 0., 1.), 0.6));
  col = mix(col, vec3(0.05, 0.04, 0.05), smoothstep(0.0, -0.15, d.y));
  float c = dot(d, uSun);
  float ang = acos(clamp(c, -1., 1.));
  col += vec3(6., 3.2, 1.2) * exp(-ang * 9.);   // 해 주변 산란
  col += vec3(150., 120., 85.) * smoothstep(0.05, 0.043, ang); // 해 원반 (매우 밝은 HDR)
  gl_FragColor = vec4(col, 1.);
}`;function G(t,e,s){const a=new Rt;return a.color.setRGB(t,e,s,Ft),a}function Pt(t){t.background=new gt(0);const e=new B(new ot(90,32,16),new ht({vertexShader:Et,fragmentShader:Ct,side:bt,uniforms:{uSun:{value:ct.clone()}},depthWrite:!0}));t.add(e),t.add(new yt(8425664,2103312,.9));const s=new wt(16765600,12);s.position.copy(ct).multiplyScalar(20),t.add(s);const a=Ht(8,1711396,3817288);a.repeat.set(24,24);const o=new B(new Dt(60,60),new P({map:a,roughness:.85}));o.rotation.x=-Math.PI/2,t.add(o);const i=new B(new O(5.2,2.2,.2),new P({color:2763827,roughness:.9}));i.position.set(-.4,1.1,-2.6),t.add(i);const n=new B(new O(1.5,1.9,.08),new P({color:15921906,roughness:.95}));n.position.set(2.5,1.15,-.9),n.rotation.y=-.45,t.add(n);const r=new lt(16777215,55,0,.55,.4,2);r.position.set(1.4,2.6,.9),r.target=n,t.add(r);const l=new B(new ot(.42,32,16),new P({color:14260856,roughness:.6}));l.position.set(1.15,.42,.55),t.add(l);const u=new B(new O(.6,.6,.6),new P({color:2792858,roughness:.5}));u.position.set(1.9,.3,.9),u.rotation.y=.5,t.add(u);const v=new lt(16769216,18,0,.7,.5,2);v.position.set(1,2.2,2),v.target=l,t.add(v);const x=G(18,1.2,9),y=G(1.2,9,20),D=(c,m,p,f,b,d)=>{const h=new B(new Ut(.022,.022,c,6),m);h.position.set(p,f,b),h.rotation.z=d,t.add(h)};D(2.4,x,-1.6,2.35,-2.3,Math.PI/2),D(2.4,x,-1.6,.85,-2.3,Math.PI/2),D(1.5,x,-2.8,1.6,-2.3,0),D(1.5,x,-.4,1.6,-2.3,0);for(let c=0;c<6;c++)D(1.55,y,-2.45+c*.36,1.6,-2.28,.5);for(let c=0;c<4;c++)D(1.6,y,-.9+c*.5,3.05,-2.6,.18);const S=G(22,12,3),A=[];for(let c=0;c<3;c++){const m=new B(new ot(.08,12,8),S);A.push(m),t.add(m)}const g=new B(new O(.14,.9,.14),G(1.6,1.6,1.7));g.position.set(0,.75,-1.6),t.add(g);const w=new B(new At(.28,.07,96,10),new P({color:5267616,roughness:.3,metalness:.4}));return w.position.set(-.3,.55,.6),t.add(w),(c,m)=>{const p=m?c:0;A.forEach((f,b)=>{const d=p*1.3+b/3*Math.PI*2;f.position.set(-.3+Math.cos(d)*1,.55+Math.sin(d*2)*.25,.6+Math.sin(d)*.6)}),g.position.x=-.4+Math.sin(p*1.7)*1.8,w.rotation.set(p*.7,p*1.1,0)}}const U=`precision highp float; varying vec2 vUv; uniform sampler2D tIn; uniform vec2 uTexel;
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
`,kt=`${U}
uniform sampler2D tHist; uniform sampler2D tDepth; uniform mat4 invVP; uniform mat4 prevVP; uniform float uAlpha; uniform float uFirst;
void main(){
  vec3 cur = texture2D(tIn, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  vec4 wp = invVP * vec4(vUv * 2. - 1., d * 2. - 1., 1.); wp /= wp.w;
  vec4 pc = prevVP * wp; vec2 puv = pc.xy / pc.w * .5 + .5;
  vec3 hist = texture2D(tHist, puv).rgb;
  // 이웃 클램핑: 히스토리를 현재 3×3 색 범위로 제한 (움직이는 물체 잔상 억제, 모션 벡터 없음)
  vec3 mn = cur, mx = cur;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec3 c = texture2D(tIn, vUv + vec2(x, y) * uTexel).rgb; mn = min(mn, c); mx = max(mx, c);
  }
  hist = clamp(hist, mn, mx);
  float a = uAlpha;
  if (uFirst > .5 || puv.x < 0. || puv.y < 0. || puv.x > 1. || puv.y > 1.) a = 1.;
  gl_FragColor = vec4(mix(hist, cur, a), 1.);
}`,Nt=`${U}
uniform float uPre; uniform float uThr; uniform float uKnee;
vec3 pick(vec2 uv){
  vec3 c = max(texture2D(tIn, uv).rgb, 0.) * uPre;
  float m = max(c.r, max(c.g, c.b));
  float rq = clamp(m - uThr + uKnee, 0., 2. * uKnee); rq = rq * rq / (4. * uKnee + 1e-4);
  return c * max(rq, m - uThr) / max(m, 1e-4);
}
void main(){
  vec2 o = uTexel * .5;
  vec3 s = pick(vUv + vec2(-o.x, -o.y)) + pick(vUv + vec2(o.x, -o.y)) + pick(vUv + vec2(-o.x, o.y)) + pick(vUv + vec2(o.x, o.y));
  gl_FragColor = vec4(min(s * .25, vec3(2000.)), 1.);
}`,Wt=`${U}
void main(){
  vec2 o = uTexel * .5;
  vec3 s = texture2D(tIn, vUv + vec2(-o.x, -o.y)).rgb + texture2D(tIn, vUv + vec2(o.x, -o.y)).rgb + texture2D(tIn, vUv + vec2(-o.x, o.y)).rgb + texture2D(tIn, vUv + vec2(o.x, o.y)).rgb;
  gl_FragColor = vec4(s * .25, 1.);
}`,zt=`${U}
uniform vec2 uDir;
void main(){
  // 9탭 가우시안을 선형 샘플 5번으로
  vec3 s = texture2D(tIn, vUv).rgb * .2270270;
  s += (texture2D(tIn, vUv + uDir * 1.3846154).rgb + texture2D(tIn, vUv - uDir * 1.3846154).rgb) * .3162162;
  s += (texture2D(tIn, vUv + uDir * 3.2307692).rgb + texture2D(tIn, vUv - uDir * 3.2307692).rgb) * .0702703;
  gl_FragColor = vec4(s, 1.);
}`,Ot=`${U}
uniform sampler2D tB1; uniform sampler2D tB2; uniform sampler2D tB3; uniform sampler2D tB4; uniform float uStr; uniform float uPre;
void main(){
  vec3 b = texture2D(tB1, vUv).rgb * .35 + texture2D(tB2, vUv).rgb * .3 + texture2D(tB3, vUv).rgb * .2 + texture2D(tB4, vUv).rgb * .15;
  // 추출은 노출 적용 기준이었으므로 원래 단위로 되돌려 더한다
  gl_FragColor = vec4(texture2D(tIn, vUv).rgb + b * uStr / uPre, 1.);
}`,Vt=`${U} uniform float uK; void main(){ gl_FragColor = vec4(texture2D(tIn, vUv).rgb * uK, 1.); }`,Kt=`${U}
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){ gl_FragColor = vec4(aces(max(texture2D(tIn, vUv).rgb, 0.)), 1.); }`,Gt=`${U}
uniform float uK; uniform float uLdr;
void main(){
  vec3 c = texture2D(tIn, vUv).rgb;
  vec2 o = uTexel * 1.5;
  vec3 b = c * .25;
  b += (texture2D(tIn, vUv + vec2(o.x, 0.)).rgb + texture2D(tIn, vUv - vec2(o.x, 0.)).rgb + texture2D(tIn, vUv + vec2(0., o.y)).rgb + texture2D(tIn, vUv - vec2(0., o.y)).rgb) * .125;
  b += (texture2D(tIn, vUv + o).rgb + texture2D(tIn, vUv - o).rgb + texture2D(tIn, vUv + vec2(o.x, -o.y)).rgb + texture2D(tIn, vUv + vec2(-o.x, o.y)).rgb) * .0625;
  // 언샤프 마스크: 원본 + k·(원본 − 블러). 음수는 0으로 잘림 (= 검은 헤일로)
  vec3 r = max(c + uK * (c - b), 0.);
  // LDR 단계(톤 매핑 뒤)라면 8비트 버퍼처럼 0~1로 저장
  gl_FragColor = vec4(uLdr > .5 ? min(r, 1.) : r, 1.);
}`,Xt=`${U}
uniform sampler3D tLut; uniform float uN;
vec3 toS(vec3 c){ return mix(c * 12.92, 1.055 * pow(c, vec3(1. / 2.4)) - .055, step(.0031308, c)); }
vec3 toL(vec3 c){ return mix(c / 12.92, pow((c + .055) / 1.055, vec3(2.4)), step(.04045, c)); }
void main(){
  // LDR용 LUT: 입력을 0~1 sRGB로 가정 → 1을 넘는 HDR 값은 격자 끝에서 잘린다
  vec3 s = toS(clamp(texture2D(tIn, vUv).rgb, 0., 1.));
  vec3 g = texture(tLut, s * (uN - 1.) / uN + .5 / uN).rgb;
  gl_FragColor = vec4(toL(g), 1.);
}`,qt=`${U}
float lu(vec3 c){ return dot(c, vec3(.299, .587, .114)); }
void main(){
  vec3 rgbM = texture2D(tIn, vUv).rgb;
  vec3 nw = texture2D(tIn, vUv + vec2(-1., -1.) * uTexel).rgb, ne = texture2D(tIn, vUv + vec2(1., -1.) * uTexel).rgb;
  vec3 sw = texture2D(tIn, vUv + vec2(-1., 1.) * uTexel).rgb, se = texture2D(tIn, vUv + vec2(1., 1.) * uTexel).rgb;
  float lNW = lu(nw), lNE = lu(ne), lSW = lu(sw), lSE = lu(se), lM = lu(rgbM);
  float lMin = min(lM, min(min(lNW, lNE), min(lSW, lSE)));
  float lMax = max(lM, max(max(lNW, lNE), max(lSW, lSE)));
  vec2 dir = vec2(-((lNW + lNE) - (lSW + lSE)), ((lNW + lSW) - (lNE + lSE)));
  float red = max((lNW + lNE + lSW + lSE) * (.25 * (1. / 8.)), 1. / 128.);
  float rcp = 1. / (min(abs(dir.x), abs(dir.y)) + red);
  dir = clamp(dir * rcp, -8., 8.) * uTexel;
  vec3 a = .5 * (texture2D(tIn, vUv + dir * (1. / 3. - .5)).rgb + texture2D(tIn, vUv + dir * (2. / 3. - .5)).rgb);
  vec3 b = a * .5 + .25 * (texture2D(tIn, vUv - dir * .5).rgb + texture2D(tIn, vUv + dir * .5).rgb);
  float lB = lu(b);
  gl_FragColor = vec4((lB < lMin || lB > lMax) ? a : b, 1.);
}`,jt=`${U}
uniform float uAspect;
void main(){
  vec2 p = (vUv - .5) * vec2(uAspect, 1.);
  float v = smoothstep(1.05, .35, length(p));
  gl_FragColor = vec4(texture2D(tIn, vUv).rgb * mix(1., v, .75), 1.);
}`,Jt=`${U}
uniform float uAmt; uniform float uSeed; uniform float uLdr;
float h(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main(){
  vec2 q = gl_FragCoord.xy + uSeed * vec2(37.1, 17.3);
  float n = h(q) + h(q + 91.7) - 1.;   // 삼각 분포 노이즈, 매 프레임 다른 무늬
  vec3 c = texture2D(tIn, vUv).rgb;
  vec3 r = c * (1. + n * uAmt * 1.6) + n * uAmt * .05;
  gl_FragColor = vec4(uLdr > .5 ? clamp(r, 0., 1.) : r, 1.);
}`,Zt=`precision highp float; uniform sampler2D tIn; uniform ivec2 uSize;
float lum(vec3 c){ return dot(c, vec3(.2126, .7152, .0722)); }
void main(){
  ivec2 base = ivec2(gl_FragCoord.xy) * 16;
  float mx = 0., over = 0., sum = 0., n = 0.;
  for (int y = 0; y < 16; y++) for (int x = 0; x < 16; x++) {
    ivec2 p = base + ivec2(x, y);
    if (p.x >= uSize.x || p.y >= uSize.y) continue;
    vec3 c = texelFetch(tIn, p, 0).rgb;
    float l = lum(c);
    mx = max(mx, l); sum += l; n += 1.;
    if (max(c.r, max(c.g, c.b)) > 1.002) over += 1.;
  }
  n = max(n, 1.);
  gl_FragColor = vec4(mx, over / n, sum / n, 1.);
}`,Qt=`precision highp float; uniform sampler2D tIn; uniform ivec2 uSize;
void main(){
  float mx = 0., over = 0., sum = 0., n = 0.;
  for (int y = 0; y < 128; y++) { if (y >= uSize.y) break;
    for (int x = 0; x < 128; x++) { if (x >= uSize.x) break;
      vec4 s = texelFetch(tIn, ivec2(x, y), 0); mx = max(mx, s.r); over += s.g; sum += s.b; n += 1.; } }
  n = max(n, 1.);
  float t = clamp((log2(max(mx, 1e-6)) + 12.) / 24., 0., 1.);
  float v = floor(t * 65535. + .5); float hi = floor(v / 256.); float lo = v - hi * 256.;
  float m = clamp((log2(max(sum / n, 1e-6)) + 12.) / 24., 0., 1.);
  gl_FragColor = vec4(hi / 255., lo / 255., over / n, m);
}`,Yt=`precision highp float; varying vec2 vUv; uniform sampler2D tIn; uniform float uZebra; uniform vec2 uOrigin;
void main(){
  vec3 c = texture2D(tIn, vUv).rgb;
  bool over = max(c.r, max(c.g, c.b)) > 1.002;
  vec3 o = clamp(c, 0., 1.);
  gl_FragColor = vec4(o, 1.);
  #include <colorspace_fragment>
  if (uZebra > .5 && over) {
    float s = step(.5, fract((gl_FragCoord.x - gl_FragCoord.y) / 7.));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1., .15, .75), .55 * s);
  }
}`,H=17;function te(){const t=new Uint8Array(H**3*4),e=o=>Math.max(0,Math.min(1,o));let s=0;for(let o=0;o<H;o++)for(let i=0;i<H;i++)for(let n=0;n<H;n++){let r=[n,i,o].map(x=>x/(H-1));r=r.map(x=>(x-.45)*1.18+.45);let l=.2126*r[0]+.7152*r[1]+.0722*r[2];const u=(1-e(l))**2,v=e(l)**2;r=[r[0]-.05*u+.09*v,r[1]+.03*u+.02*v,r[2]+.09*u-.08*v],l=.2126*r[0]+.7152*r[1]+.0722*r[2],r=r.map(x=>l+(x-l)*1.25),t[s++]=e(r[0])*255,t[s++]=e(r[1])*255,t[s++]=e(r[2])*255,t[s++]=255}const a=new Mt(t,H,H,H);return a.format=Lt,a.type=$t,a.minFilter=q,a.magFilter=q,a.wrapS=a.wrapT=a.wrapR=It,a.unpackAlignment=1,a.needsUpdate=!0,a}const ut=(t,e)=>{let s=1,a=0;for(;t>0;)s/=e,a+=s*(t%e),t=Math.floor(t/e);return a},ee=.42,X=10;class oe{constructor(e,s,a,o){T(this,"W",1);T(this,"H",1);T(this,"sceneRT");T(this,"stageRTs",[]);T(this,"ping",[]);T(this,"histA");T(this,"histB");T(this,"bloomRTs",[]);T(this,"redA");T(this,"statsRT");T(this,"statsBuf",new Uint8Array(X*4));T(this,"lut",te());T(this,"q",new Bt);T(this,"mats",{});T(this,"frame",0);T(this,"taaFrame",0);T(this,"sig","");T(this,"sigFrames",0);T(this,"prevVP",new W);T(this,"stats",[]);T(this,"stageTex",[]);T(this,"final");this.renderer=e,this.scene=s,this.camera=a,this.keepStages=o;const i={type:st,depthBuffer:!1,minFilter:q,magFilter:q};this.sceneRT=new C(1,1,{type:st,depthTexture:new Tt(1,1)});const n=o?X-1:2;for(let u=0;u<n;u++)(o?this.stageRTs:this.ping).push(new C(1,1,i));this.histA=new C(1,1,i),this.histB=new C(1,1,i);for(let u=0;u<4;u++)this.bloomRTs.push([new C(1,1,i),new C(1,1,i)]);const r={type:st,depthBuffer:!1,minFilter:V,magFilter:V};this.redA=new C(1,1,r),this.statsRT=new C(X,1,{depthBuffer:!1,minFilter:V,magFilter:V}),this.final=this.sceneRT.texture;const l=(u,v={})=>new ht({vertexShader:_t,fragmentShader:u,uniforms:{tIn:{value:null},uTexel:{value:new K},...v},depthTest:!1,depthWrite:!1});this.mats={taa:l(kt,{tHist:{value:null},tDepth:{value:this.sceneRT.depthTexture},invVP:{value:new W},prevVP:{value:new W},uAlpha:{value:.1},uFirst:{value:1}}),bright:l(Nt,{uPre:{value:1},uThr:{value:1},uKnee:{value:.5}}),down:l(Wt),blur:l(zt,{uDir:{value:new K}}),combine:l(Ot,{tB1:{value:null},tB2:{value:null},tB3:{value:null},tB4:{value:null},uStr:{value:.8},uPre:{value:1}}),exposure:l(Vt,{uK:{value:1}}),tonemap:l(Kt),sharpen:l(Gt,{uK:{value:.8},uLdr:{value:0}}),grade:l(Xt,{tLut:{value:this.lut},uN:{value:H}}),fxaa:l(qt),vignette:l(jt,{uAspect:{value:1}}),grain:l(Jt,{uAmt:{value:.15},uSeed:{value:0},uLdr:{value:0}}),redA:l(Zt,{uSize:{value:new K(1,1)}}),redB:l(Qt,{uSize:{value:new K(1,1)}}),display:l(Yt,{uZebra:{value:1}})},this.statsRT.scissorTest=!0}setSize(e,s){this.W=Math.max(8,Math.floor(e)),this.H=Math.max(8,Math.floor(s)),this.sceneRT.setSize(this.W,this.H);for(const a of[...this.stageRTs,...this.ping,this.histA,this.histB])a.setSize(this.W,this.H);this.bloomRTs.forEach((a,o)=>{const i=2**(o+1);for(const n of a)n.setSize(Math.max(1,Math.ceil(this.W/i)),Math.max(1,Math.ceil(this.H/i)))}),this.redA.setSize(Math.ceil(this.W/16),Math.ceil(this.H/16)),this.taaFrame=0}pass(e,s,a,o=this.W,i=this.H){e.uniforms.tIn.value=s,e.uniforms.uTexel.value.set(1/o,1/i),this.q.material=e,this.renderer.setRenderTarget(a),this.q.render(this.renderer)}bloom(e,s,a,o){const i=this.bloomRTs,n=this.mats;n.bright.uniforms.uPre.value=a,this.pass(n.bright,e,i[0][0]);for(let r=1;r<4;r++)this.pass(n.down,i[r-1][0].texture,i[r][0],i[r-1][0].width,i[r-1][0].height);for(let r=0;r<4;r++){const[l,u]=i[r];n.blur.uniforms.uDir.value.set(1/l.width,0),this.pass(n.blur,l.texture,u,l.width,l.height),n.blur.uniforms.uDir.value.set(0,1/l.height),this.pass(n.blur,u.texture,l,l.width,l.height)}n.combine.uniforms.tB1.value=i[0][0].texture,n.combine.uniforms.tB2.value=i[1][0].texture,n.combine.uniforms.tB3.value=i[2][0].texture,n.combine.uniforms.tB4.value=i[3][0].texture,n.combine.uniforms.uStr.value=o,n.combine.uniforms.uPre.value=a,this.pass(n.combine,e,s)}reduce(e,s){const a=this.mats.redA;a.uniforms.uSize.value.set(this.W,this.H),this.pass(a,e,this.redA);const o=this.mats.redB;o.uniforms.uSize.value.set(this.redA.width,this.redA.height),this.statsRT.viewport.set(s,0,1,1),this.statsRT.scissor.set(s,0,1,1),this.pass(o,this.redA.texture,this.statsRT)}run(e,s){const a=this.renderer,o=this.camera;this.frame++;const i=e.join(",");this.sigFrames++,i!==this.sig&&(this.sig=i,this.taaFrame=0,this.sigFrames=0,this.stats=[]);const n=e.includes("taa"),r=2**s.ev*ee;o.clearViewOffset(),o.updateMatrixWorld();const l=new W().multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse);if(n){const A=this.frame%8+1;o.setViewOffset(this.W,this.H,ut(A,2)-.5,ut(A,3)-.5,this.W,this.H)}const u=new W().multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse);a.setRenderTarget(this.sceneRT),a.render(this.scene,o),o.clearViewOffset();const v=e.indexOf("tonemap"),x=A=>v>=0&&A>v?1:0,y=e.length+1,D=this.frame%y;let S=this.sceneRT.texture;if(this.stageTex=[S],D===0&&this.reduce(S,0),e.forEach((A,g)=>{const w=this.keepStages?this.stageRTs[g]:this.ping[g%2],c=this.mats;switch(A){case"taa":{this.taaFrame++,c.taa.uniforms.tHist.value=this.histA.texture,c.taa.uniforms.invVP.value.copy(u).invert(),c.taa.uniforms.prevVP.value.copy(this.taaFrame===1?l:this.prevVP),c.taa.uniforms.uFirst.value=this.taaFrame===1?1:0,this.pass(c.taa,S,this.histB),[this.histA,this.histB]=[this.histB,this.histA];break}case"bloom":{const m=e.indexOf("exposure")>g;this.bloom(S,w,m?r:1,s.bloom);break}case"exposure":c.exposure.uniforms.uK.value=r,this.pass(c.exposure,S,w);break;case"sharpen":c.sharpen.uniforms.uK.value=s.sharpen,c.sharpen.uniforms.uLdr.value=x(g),this.pass(c.sharpen,S,w);break;case"vignette":c.vignette.uniforms.uAspect.value=this.W/this.H,this.pass(c.vignette,S,w);break;case"grain":c.grain.uniforms.uAmt.value=s.grain,c.grain.uniforms.uSeed.value=this.frame%97,c.grain.uniforms.uLdr.value=x(g),this.pass(c.grain,S,w);break;default:this.pass(c[A],S,w)}S=A==="taa"?this.histA.texture:w.texture,this.stageTex.push(S),D===g+1&&this.reduce(S,g+1)}),n&&this.prevVP.copy(l),this.final=S,this.frame%10===0){a.readRenderTargetPixels(this.statsRT,0,0,X,1,this.statsBuf);const A=this.statsBuf,g=[];for(let w=0;w<y;w++){const c=(A[w*4]*256+A[w*4+1])/65535;g.push({max:2**(c*24-12),over:A[w*4+2]/255,mean:2**(A[w*4+3]/255*24-12)})}this.sigFrames>y+1&&(this.stats=g)}a.setRenderTarget(null)}display(e,s){this.mats.display.uniforms.uZebra.value=s?1:0,this.mats.display.uniforms.tIn.value=e,this.q.material=this.mats.display,this.q.render(this.renderer)}dispose(){var e;for(const s of[this.sceneRT,...this.stageRTs,...this.ping,this.histA,this.histB,this.redA,this.statsRT,...this.bloomRTs.flat()])s.dispose();(e=this.sceneRT.depthTexture)==null||e.dispose(),Object.values(this.mats).forEach(s=>s.dispose()),this.lut.dispose(),this.q.dispose()}}const J=j,k=["taa","bloom","exposure","tonemap","sharpen","grade","vignette","grain"],Q=[{id:"correct",name:"올바른 순서 (TAA)",order:j,on:k},{id:"mobile",name:"올바른 순서 · 모바일 (FXAA)",order:j,on:["bloom","exposure","tonemap","grade","fxaa","vignette","grain"]},{id:"bloom-late",name:"✗ 블룸을 톤 매핑 뒤에",order:["taa","exposure","tonemap","bloom","sharpen","grade","fxaa","vignette","grain"],on:k},{id:"grain-early",name:"✗ 그레인을 TAA 앞에",order:["grain","taa","bloom","exposure","tonemap","sharpen","grade","fxaa","vignette"],on:k},{id:"grade-hdr",name:"✗ LDR LUT를 톤 매핑 앞(HDR)에",order:["taa","bloom","exposure","grade","tonemap","sharpen","fxaa","vignette","grain"],on:k},{id:"expo-late",name:"✗ 노출을 톤 매핑 뒤에",order:["taa","bloom","tonemap","exposure","sharpen","grade","fxaa","vignette","grain"],on:k},{id:"sharpen-hdr",name:"✗ 샤프닝을 톤 매핑 앞(HDR)에",order:["taa","bloom","sharpen","exposure","tonemap","grade","fxaa","vignette","grain"],on:k},{id:"fxaa-hdr",name:"✗ FXAA를 톤 매핑 앞(HDR)에",order:["fxaa","exposure","tonemap","grade","vignette","bloom","sharpen","grain","taa"],on:["fxaa","exposure","tonemap","grade","vignette"]}],Y="bloom-late";function rt(t){const e=t.str("order","").split(",").filter(a=>J.includes(a)),s=[...new Set(e)];for(const a of J)s.includes(a)||s.push(a);return s}const it=t=>rt(t).filter(e=>t.bool("on_"+e,!1)),se=t=>j.filter(e=>t.includes(e));function mt(t){const e=n=>t.indexOf(n),s=n=>e(n)>=0,a=(n,r)=>s(n)&&s(r)&&e(n)<e(r),o=[],i=s("tonemap");return i||o.push({bad:!0,short:"톤 매핑 없음 → 1.0 초과가 출력에서 잘림",long:"<b>톤 매핑이 꺼짐</b>: 1.0을 넘는 HDR 값(하늘·네온·해)이 출력에서 그냥 잘려 하얗게 뭉칩니다."}),a("tonemap","bloom")&&o.push({bad:!0,short:"블룸이 톤 매핑 뒤 → 해와 흰 벽이 똑같이 약하게 번짐",long:"<b>블룸이 톤 매핑 뒤</b>: 이미 0~1로 눌린 값에서 밝은 곳을 추출하므로 해(HDR ≈ 150)와 흰 패널(≈ 3)이 구분되지 않고 똑같이 약하게 번집니다. 더한 값은 1에서 잘려 탁한 안개처럼 보입니다."}),a("tonemap","exposure")&&o.push({bad:!0,short:"노출이 톤 매핑 뒤 → 하이라이트가 회색",long:"<b>노출이 톤 매핑 뒤</b>: 이미 압축된 0~1 값에 곱하므로 어둡게 하면 해·네온이 회색으로 죽고, 밝게 하면 넓은 영역이 평평하게 잘립니다."}),s("grade")&&(!i||a("grade","tonemap"))&&o.push({bad:!0,short:"LDR LUT가 HDR 값에 → 밝은 색이 흰/회색으로",long:"<b>LDR용 LUT가 HDR 값에 적용</b>: LUT 격자는 0~1 입력만 담으므로 1을 넘는 채널이 끝에서 잘립니다. 주황 노을·분홍 네온이 채널별로 잘려 흰색이 되고, 그 뒤 톤 매핑이 1을 0.8로 눌러 회색이 됩니다. (HDR에서 그레이딩하려면 로그 인코딩용 LUT를 따로 만들어야 합니다.)"}),a("grain","taa")&&o.push({bad:!0,short:"그레인이 TAA 앞 → 노이즈가 뭉개지고 잔상 증가",long:"<b>그레인이 TAA 앞</b>: 매 프레임 바뀌는 노이즈가 히스토리에 평균되어 거의 지워지고 얼룩처럼 번집니다. 노이즈가 이웃 클램핑 범위도 넓혀 움직이는 물체의 잔상이 늘어납니다."}),s("sharpen")&&(!i||a("sharpen","tonemap"))&&o.push({bad:!0,short:"샤프닝이 HDR에서 → 해·네온 둘레 검은 테두리",long:"<b>샤프닝이 HDR에서</b>: 해·네온 옆처럼 값 차이가 수십 배인 경계에서 원본 − 블러가 크게 음수가 되어 0으로 잘린 검은 테두리(헤일로)가 생깁니다."}),a("sharpen","taa")&&o.push({bad:!0,short:"샤프닝이 TAA 앞 → TAA가 다시 흐림",long:"<b>샤프닝이 TAA 앞</b>: 날카롭게 만든 결과를 TAA가 다시 평균해 흐려지고, 지터로 흔들리는 고주파가 강조되어 깜빡입니다. 샤프닝은 TAA·업스케일 뒤에 둡니다."}),s("fxaa")&&(!i||a("fxaa","tonemap"))&&o.push({bad:!0,short:"FXAA가 HDR에서 → 밝은 선의 계단이 남음",long:"<b>FXAA가 HDR에서</b>: 밝은 선(≈ 6)과 어두운 배경을 평균해도 그 값(≈ 3)은 톤 매핑 뒤 여전히 거의 흰색이라 계단이 그대로 남습니다. 루마 기반 경계 검출도 0~1 지각 밝기를 가정합니다."}),s("fxaa")&&s("taa")&&o.push({bad:!1,short:"TAA + FXAA 동시 → 이중 블러",long:"<b>TAA와 FXAA 동시 사용</b>: 둘 다 화면을 부드럽게 하므로 이중으로 흐려집니다. 보통 둘 중 하나만 씁니다."}),a("grain","fxaa")&&o.push({bad:!1,short:"FXAA가 그레인 뒤 → 그레인 점을 뭉갬",long:"<b>FXAA가 그레인 뒤</b>: 그레인 점을 경계로 보고 일부를 뭉갭니다. 엔진에 따라 배치가 다르지만, 그레인은 AA 뒤 마지막에 두는 편이 깔끔합니다."}),a("bloom","taa")&&o.push({bad:!1,short:"블룸이 TAA 앞 → 흔들리는 점이 번져 깜빡임",long:"<b>블룸이 TAA 앞</b>: 지터로 흔들리는 작은 밝은 점(파이어플라이)이 안정화되기 전에 번져 블룸이 깜빡입니다."}),s("vignette")&&a("vignette","tonemap")&&o.push({bad:!1,short:"비네트가 HDR에서 → 모서리의 밝은 값은 그대로 하얌",long:"<b>비네트가 HDR에서</b>: 모서리의 아주 밝은 값은 어둡게 곱해도 여전히 1을 넘어 하얗게 남습니다(큰 문제는 아니지만 의도와 다름)."}),s("grain")&&a("grain","tonemap")&&o.push({bad:!1,short:"그레인이 톤 매핑 앞 → 밝기마다 세기가 들쭉날쭉",long:"<b>그레인이 톤 매핑 앞</b>: 노이즈 세기가 톤 곡선에 눌려 하이라이트에서는 사라지고 중간톤에서만 보입니다."}),o}const Z=t=>t>=100?t.toFixed(0):t>=10?t.toFixed(1):t.toFixed(2);function ae(t){return{ev:t.num("ev",0),bloom:t.num("bloomK",.8),grain:t.num("grainK",.08),sharpen:t.num("sharpK",.8)}}function pt(t,e){const s=t.indexOf("tonemap"),a=(i,n,r)=>{const l=n?Z(n.max):"…",u=n&&r&&n.over>.002?"!":"";return`${i} ${l}${u}`},o=[a("장면",e[0],!1)];return t.forEach((i,n)=>{const r=a(z[i].short,e[n+1],s>=0&&n>=s);o.push(n===s?`┃ ${r}`:r)}),o.join(" › ").replace(/ › ┃/g," ┃")}function nt(t,e){return xt(t,{cam:[.9,1.55,6.6],target:[-.1,1.35,-.8],fov:50,far:200},({scene:s,camera:a,renderer:o})=>{const i=Pt(s),n=new oe(o,s,a,e==="strip");o.setClearColor(724500,1);let r=1,l=1,u=null,v=null;e==="strip"&&(u=document.createElement("canvas"),u.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1",t.body.appendChild(u),v=u.getContext("2d"));const x=()=>e==="ref"?se(it(t.params)):it(t.params);let y=[];const D=22,S=c=>{const p=n.W/n.H;let f={tw:0,cols:1};for(let R=1;R<=c;R++){const E=Math.ceil(c/R),L=Math.min((r-6*(R+1))/R,(l-D-6*(E+1))/E*p);L>f.tw&&(f={tw:L,cols:R})}const b=Math.floor(f.tw),d=Math.floor(b/p),h=f.cols,M=Math.ceil(c/h),F=Math.floor((r-(h*b+(h-1)*6))/2),_=D+Math.floor((l-D-(M*d+(M-1)*6))/2);y=[];for(let R=0;R<c;R++)y.push({x:F+R%h*(b+6),y:_+Math.floor(R/h)*(d+6),w:b,h:d})},A=c=>{if(!u||!v)return;const m=Math.min(window.devicePixelRatio||1,2);(u.width!==Math.floor(r*m)||u.height!==Math.floor(l*m))&&(u.width=Math.floor(r*m),u.height=Math.floor(l*m));const p=v;p.setTransform(m,0,0,m,0,0),p.clearRect(0,0,r,l);const f=c.indexOf("tonemap"),b=y[0]&&y[0].w<150,d=b?9:11;y.forEach((h,M)=>{const F=n.stats[M],_=M>0?c[M-1]:null,R=_?`${M}. ${z[_].short}`:"0. 장면 HDR",E=f>=0&&M-1>=f,L=d*2+6;p.fillStyle="rgba(0,0,0,0.62)",p.fillRect(h.x,h.y+h.h-L,h.w,L),p.fillStyle=_?z[_].color:"#e6ebf2",p.fillRect(h.x,h.y+h.h-L,3,L),p.font=`700 ${d}px 'Noto Sans KR', sans-serif`,p.fillStyle="#e6ebf2",p.fillText(R,h.x+6,h.y+h.h-L+d+1),p.font=`${d}px 'JetBrains Mono', monospace`,p.fillStyle="#b8c2d0";const $=F?b?`${Z(F.max)} · >1 ${Math.round(F.over*100)}%`:`max ${Z(F.max)} · >1 ${(F.over*100).toFixed(1)}%`:"측정 중…";if(p.fillText($,h.x+6,h.y+h.h-5),F){const I=F.max>1.01,N=I?E?"잘림":"HDR":"LDR",tt=I?E?"#ff5a5a":"#ff9f43":"#5b9cff";p.font=`700 ${d}px 'JetBrains Mono', monospace`;const et=p.measureText(N).width+8;p.fillStyle=tt,p.fillRect(h.x+h.w-et-3,h.y+3,et,d+5),p.fillStyle="#0b0e14",p.fillText(N,h.x+h.w-et+1,h.y+d+4)}if(f>=0&&M===f+1){const I=p.createLinearGradient(0,h.y,0,h.y+h.h);I.addColorStop(0,"#ff9f43"),I.addColorStop(1,"#5b9cff"),p.fillStyle=I,p.fillRect(h.x-5,h.y-2,4,h.h+4),p.font=`700 ${d}px 'Noto Sans KR', sans-serif`,p.fillStyle="rgba(0,0,0,0.7)";const N="HDR ▶ LDR",tt=p.measureText(N).width+8;p.fillRect(h.x+2,h.y+3,tt,d+5),p.fillStyle="#ffd08a",p.fillText(N,h.x+6,h.y+d+4)}})};let g=0,w=null;return{update(c,m,p){var L;i(p/1e3,t.params.bool("motion",!0));const f=x(),b=n.stats,d=ft(f),h=mt(f),M=`패스 ${f.length} · 추정 ${d.split.toFixed(1)} ms (픽셀 패스 합침 ${d.uber.toFixed(1)} ms) · 1080p 모바일 가정`;if(e==="strip"){const $=b.length?b.filter(I=>I&&I.max>1.01).length:0;t.hud(r<500?`단계 ${f.length+1} · 1 초과 단계 ${b.length?$:"…"} · 줄무늬 = 1 초과`:`단계 ${f.length+1}개 · 1.0 초과 단계 ${b.length?$:"…"}개 · 줄무늬 = 1.0 초과 픽셀 · ${d.split.toFixed(1)} ms 추정`);return}const F=h.filter($=>$.bad).length,_=h.length-F,R=e==="ref"?"✓ 같은 패스를 기준 순서로":F?`✗ 문제 ${F}개`:_?`△ 주의 ${_}개`:"✓ 문제 없음",E=e==="user"?[...h].sort(($,I)=>Number(I.bad)-Number($.bad)).slice(0,2).map($=>`${$.bad?"⚠":"△"} ${$.short}`):[];r<500?t.hud([`${R} · ${d.split.toFixed(1)} ms 추정`,pt(f,b),...E.slice(0,1)].join(`
`)):t.hud([R+" · ┃ = 톤 매핑(HDR→LDR) · ! = 1 초과(잘림)",pt(f,b),M,...E].join(`
`)),e==="user"&&b!==w&&(w=b,t.shared.set("pfxStats",{order:f,stats:b}),(L=t.shared.get("pfxStatsListener"))==null||L())},render(){const c=x();if(n.run(c,ae(t.params)),o.setRenderTarget(null),e!=="strip"){o.setViewport(0,0,r,l),n.display(n.final,!1);return}const m=n.stageTex.length;y.length!==m&&S(m),o.autoClear=!1,o.setScissorTest(!1),o.setViewport(0,0,r,l),o.clear(),o.setScissorTest(!0);const p=t.params.bool("zebra",!0);y.forEach((f,b)=>{const d=l-f.y-f.h;o.setViewport(f.x,d,f.w,f.h),o.setScissor(f.x,d,f.w,f.h),n.display(n.stageTex[b],p)}),o.setScissorTest(!1),o.setViewport(0,0,r,l),o.autoClear=!0,(g++%6===0||y.length!==m)&&A(c)},resize(c,m){r=c,l=m;const f=Math.min(e==="strip"?.6:1,Math.sqrt((e==="strip"?26e4:52e4)/(c*m)));n.setSize(c*f,m*f),y=[]},dispose(){n.dispose(),u==null||u.remove()}}})}function ne(t){const e=t.params;t.hud("");const s=document.createElement("div");s.style.cssText='position:absolute;inset:0;overflow:auto;padding:8px;background:#0e131b;color:#e6ebf2;font:12px/1.4 "Noto Sans KR",sans-serif;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px;align-content:start;touch-action:pan-y',t.body.appendChild(s);const a="background:#18202c;color:#e6ebf2;border:1px solid #243041;border-radius:5px;min-width:30px;height:24px;font-size:12px;cursor:pointer;padding:0",o=()=>{const u=rt(e),v=it(e),x=v.indexOf("tonemap"),y=mt(v),D=ft(v),S=s.clientWidth<420,A=e.str("preset",Y),g=Q.find(m=>m.id===A);let w="";u.forEach((m,p)=>{const f=e.bool("on_"+m,!1),b=v.indexOf(m),d=z[m],h=f?x<0||b<x?'<span style="color:#ff9f43">HDR</span>':b===x?'<span style="color:#ffd08a">HDR→LDR</span>':'<span style="color:#5b9cff">LDR</span>':"";w+=`<div style="display:flex;align-items:center;gap:6px;padding:3px 4px;border-radius:6px;background:${f?"#141b26":"transparent"};opacity:${f?1:.45}">
        <span style="width:16px;text-align:right;color:#8a97a8;font:11px 'JetBrains Mono',monospace">${f?b+1:"–"}</span>
        <span style="width:8px;height:8px;border-radius:50%;background:${d.color};flex:none"></span>
        <span style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${S?d.name.replace(/ \(.*\)$/,""):d.name}</span>
        <span style="font:10px 'JetBrains Mono',monospace;min-width:44px;text-align:right">${h}</span>
        <span data-max="${m}" style="font:10px 'JetBrains Mono',monospace;color:#b8c2d0;min-width:42px;text-align:right"></span>
        <button data-act="up" data-j="${p}" style="${a}" ${p===0?"disabled":""} aria-label="위로">▲</button>
        <button data-act="down" data-j="${p}" style="${a}" ${p===u.length-1?"disabled":""} aria-label="아래로">▼</button>
        <input type="checkbox" data-on="${m}" ${f?"checked":""} style="width:18px;height:18px;margin:0 2px" aria-label="${d.name} 켜기">
      </div>`,f&&b===x&&(w+='<div style="margin:2px 0;padding:2px 6px;border-top:2px solid #ff9f43;border-bottom:2px solid #5b9cff;font-size:11px;color:#ffd08a;text-align:center">▲ HDR (0 ~ 수백, 선형) · 톤 매핑 · LDR (0 ~ 1) ▼</div>')});const c=y.length?y.map(m=>`<li style="margin:3px 0;color:${m.bad?"#ffb3b3":"#ffe2a6"}">${m.bad?"✗":"△"} ${m.long}</li>`).join(""):'<li style="color:#a6f0c0">✓ 깨지는 규칙 없음. 장면 HDR → TAA → 블룸 → 노출 → 톤 매핑 → (샤프닝) → 그레이딩 → 비네트·그레인.</li>';s.innerHTML=`
      <div>
        <div style="font-weight:700;margin-bottom:4px">체인 (위 → 아래 순서로 실행) <span style="font-weight:400;color:#8a97a8">· 프리셋: ${g?g.name:"사용자 지정"}</span></div>
        ${w}
        <div style="color:#8a97a8;font-size:11px;margin-top:4px">▲▼ = 한 칸 이동 (꺼진 패스는 건너뜀) · 체크 = 켜기 · 오른쪽 숫자 = 그 패스 직후 최대 밝기(측정)</div>
      </div>
      <div>
        <div style="font-weight:700;margin-bottom:4px">무엇이 깨지는가</div>
        <ul style="margin:0;padding-left:16px">${c}</ul>
        <div style="margin-top:8px;padding:6px;border:1px solid #243041;border-radius:6px;font:11px/1.5 'JetBrains Mono',monospace;color:#cfd8e3">
          추정 비용 (1080p 모바일 가정, 시뮬레이션)<br>
          패스마다 따로: ${D.split.toFixed(2)} ms<br>
          연속 픽셀 패스 합침(uber): ${D.uber.toFixed(2)} ms<br>
          <span style="color:#8a97a8">노출·톤 매핑·LUT·비네트·그레인은 이웃 픽셀을 읽지 않아 한 셰이더로 합칠 수 있습니다. TAA·블룸·FXAA·샤프닝이 사이에 끼면 합칠 수 없습니다.</span>
        </div>
      </div>`,i()},i=()=>{const u=t.shared.get("pfxStats");s.querySelectorAll("[data-max]").forEach(v=>{const x=v.dataset.max,y=u?u.order.indexOf(x):-1,D=u&&y>=0?u.stats[y+1]:null;v.textContent=D?Z(D.max):"",v.style.color=D&&D.max>1.01?"#ffb070":"#9fc3ff"})},n=u=>{const v=u.target.closest("button[data-act]");if(!v)return;const x=rt(e),y=Number(v.dataset.j),D=x[y],S=w=>e.bool("on_"+w,!1),A=v.dataset.act==="up"?-1:1;let g=y+A;if(S(D))for(;g>=0&&g<x.length&&!S(x[g]);)g+=A;(g<0||g>=x.length)&&(g=y+A),!(g<0||g>=x.length)&&(x.splice(y,1),x.splice(g,0,D),e.set("order",x.join(",")),e.set("preset","custom"))},r=u=>{const v=u.target;v.dataset.on&&e.set("on_"+v.dataset.on,v.checked)};s.addEventListener("click",n),s.addEventListener("change",r);const l=e.on(u=>{(u==="order"||u==="preset"||u.startsWith("on_"))&&o()});return t.shared.set("pfxStatsListener",i),o(),{dispose(){l(),t.shared.delete("pfxStatsListener"),s.remove()}}}const re={taa:"TAA 켜기",bloom:"블룸 켜기",exposure:"노출 켜기",tonemap:"톤 매핑 켜기",sharpen:"샤프닝 켜기",grade:"컬러 그레이딩(LUT) 켜기",fxaa:"FXAA 켜기",vignette:"비네트 켜기",grain:"필름 그레인 켜기"},ie=Q.find(t=>t.id===Y),le=[{type:"select",key:"preset",label:"프리셋",options:[...Q.map(t=>({label:t.name,value:t.id})),{label:"사용자 지정",value:"custom"}],value:Y},...J.map(t=>({type:"toggle",key:"on_"+t,label:re[t],value:ie.on.includes(t)})),{type:"range",key:"ev",label:"노출 (EV)",min:-3,max:3,step:.1,value:0},{type:"range",key:"bloomK",label:"블룸 세기",min:0,max:2,step:.05,value:.8},{type:"range",key:"grainK",label:"그레인 세기",min:0,max:.4,step:.01,value:.08},{type:"range",key:"sharpK",label:"샤프닝 세기",min:0,max:2,step:.05,value:.8},{type:"toggle",key:"motion",label:"물체 움직임",value:!0},{type:"toggle",key:"zebra",label:"1.0 초과 줄무늬 (스트립)",value:!0}],ve={layout:"compare",intro:'후처리 패스 하나하나는 단순하지만, <b>순서</b>가 바뀌면 같은 패스로도 결과가 깨집니다. 핵심은 <b>HDR/LDR 경계</b>입니다. 톤 매핑 전에는 해가 150, 흰 벽이 3처럼 범위 제한 없는 선형 값이고, 톤 매핑 뒤에는 모두 0~1로 눌립니다. 블룸·노출처럼 "얼마나 밝은가"가 필요한 패스는 경계 앞에, LUT·그레인·비네트처럼 화면 표시 값을 다루는 패스는 경계 뒤에 와야 합니다. 프리셋으로 잘못된 순서를 고르고 왼쪽(선택한 순서)과 오른쪽(같은 패스, 기준 순서)을 비교해 보세요. 모든 패스는 실제 셰이더로 렌더 타깃을 거칩니다.',how:["장면을 반정밀도 부동소수(RGBA16F) 렌더 타깃에 HDR로 그린다 (TAA가 켜져 있으면 매 프레임 서브픽셀 지터).","TAA: 지난 프레임 히스토리를 재투영해 섞고 이웃 클램핑으로 잔상을 줄인다. 흐려지기 전 HDR 신호를 안정화한다.","블룸: 노출 기준 밝기 1을 넘는 부분만 추출해 1/2~1/16 해상도로 블러한 뒤 더한다 (HDR이라 해와 흰 벽이 구분된다).","노출(×2^EV) → 톤 매핑(ACES 근사)으로 HDR을 0~1로 압축한다. 여기가 HDR/LDR 경계다.","톤 매핑 뒤 LDR에서 샤프닝 → LUT 그레이딩 → (FXAA) → 비네트·그레인을 적용하고 UI는 그 위에 따로 그린다.","디버그 스트립은 각 패스 직후 버퍼를 썸네일로 보여 주고, GPU에서 줄인 최대 밝기·1.0 초과 비율을 읽어 표시한다."],pros:["순서를 지키면 같은 비용으로 밝기 표현·색감·안정성을 모두 얻음","경계 뒤 픽셀 단위 패스는 하나의 uber 셰이더로 합쳐 대역폭 절약"],cons:["패스를 추가할 때마다 어느 공간(HDR/LDR, 선형/감마)을 가정하는지 확인해야 함","LUT·FXAA처럼 LDR을 가정한 도구를 HDR에 넣으면 조용히 깨짐"],usedIn:"UE의 포스트 프로세스 체인(TAA/TSR → 블룸 → 톤 매퍼에 노출·LUT·비네트·그레인 통합), Unity URP/HDRP의 Uber Post, 대부분의 엔진이 비슷한 순서를 따릅니다.",controls:le,setup(t){let e=!1;const s=a=>{const o=Q.find(i=>i.id===a);if(o){e=!0,t.set("order",o.order.join(","));for(const i of J)t.set("on_"+i,o.on.includes(i));e=!1}};return s(t.str("preset",Y)),t.on((a,o)=>{a==="preset"?s(String(o)):a.startsWith("on_")&&!e&&t.str("preset")!=="custom"&&t.set("preset","custom")})},viewers:[{title:"선택한 순서",kind:"before",caption:"프리셋 또는 편집기의 순서 그대로 실행. HUD: 단계별 최대 밝기(┃ = 톤 매핑 경계), 추정 비용, 깨지는 이유.",mount:t=>nt(t,"user")},{title:"같은 패스 · 기준 순서",kind:"after",caption:"켜진 패스는 같고 순서만 HDR → TAA → 블룸 → 노출 → 톤 매핑 → 샤프닝 → LUT → FXAA → 비네트 → 그레인으로 정렬.",mount:t=>nt(t,"ref")},{title:"체인 편집기 (▲▼로 순서 바꾸기)",kind:"info",wide:!0,caption:"탭해서 패스를 위아래로 옮기거나 끄고 켭니다. 톤 매핑 줄이 HDR과 LDR을 나눕니다.",mount:t=>ne(t)},{title:"단계별 디버그 스트립",kind:"info",wide:!0,caption:"선택한 순서의 각 패스 직후 버퍼. 분홍 줄무늬 = 1.0을 넘는 픽셀(HDR, 화면에선 잘림). 배지: HDR / LDR / 잘림(LDR 단계인데 1 초과).",mount:t=>nt(t,"strip")}]};export{ve as default};
