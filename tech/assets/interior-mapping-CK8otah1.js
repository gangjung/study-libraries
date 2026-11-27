import{G as Z0,ae as ee,aH as te,aG as ce,H as oe,D as ae,u as ie,g as O,k as re,M as o0,P as R0,B as I0,ao as h0,p as a0,m as le}from"./three.module-BZgG6AUv.js";import{m as se}from"./canvas-viewer-Btf0JXdr.js";import{m as ne}from"./three-viewer-0rZIEDzf.js";const k=192,N0=6,p0=4;let m0=null;function i0(i){let o=i>>>0;return()=>{o=o+1831565813>>>0;let t=o;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}class r0{constructor(o,t,r,c=k){this.g=o,this.ox=t,this.oy=r,this.T=c}X(o){return this.ox+o*this.T}Y(o){return this.oy+(1-o)*this.T}rect(o,t,r,c,e){o=Math.max(0,o),t=Math.max(0,t),r=Math.min(1,r),c=Math.min(1,c),!(r<=o||c<=t)&&(this.g.fillStyle=e,this.g.fillRect(this.X(o),this.Y(c),(r-o)*this.T,(c-t)*this.T))}grad(o,t,r,c,e,a){const l=this.g.createLinearGradient(0,this.Y(c),0,this.Y(t));l.addColorStop(0,e),l.addColorStop(1,a),this.g.fillStyle=l,this.g.fillRect(this.X(o),this.Y(c),(r-o)*this.T,(c-t)*this.T)}ellipse(o,t,r,c,e){this.g.fillStyle=e,this.g.beginPath(),this.g.ellipse(this.X(o),this.Y(t),r*this.T,c*this.T,0,0,Math.PI*2),this.g.fill()}poly(o,t){this.g.fillStyle=t,this.g.beginPath(),o.forEach(([r,c],e)=>e?this.g.lineTo(this.X(r),this.Y(c)):this.g.moveTo(this.X(r),this.Y(c))),this.g.closePath(),this.g.fill()}line(o,t,r,c,e,a=1){this.g.strokeStyle=e,this.g.lineWidth=a,this.g.beginPath(),this.g.moveTo(this.X(o),this.Y(t)),this.g.lineTo(this.X(r),this.Y(c)),this.g.stroke()}emissive(o,t,r,c){const e=this.g;e.save(),e.globalCompositeOperation="destination-out",e.fillStyle="rgba(0,0,0,0.45)",e.fillRect(this.X(o),this.Y(c),(r-o)*this.T,(c-t)*this.T),e.restore()}ao(o,t=.32){const r=this.g,c=this.T,e=(l,s,v,h,C,Y,g,P)=>{const M=r.createLinearGradient(C,Y,g,P);M.addColorStop(0,`rgba(0,0,0,${t})`),M.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=M,r.fillRect(l,s,v,h)},a=c*.16;o.l&&e(this.ox,this.oy,a,c,this.ox,0,this.ox+a,0),o.r&&e(this.ox+c-a,this.oy,a,c,this.ox+c,0,this.ox+c-a,0),o.t&&e(this.ox,this.oy,c,a,0,this.oy,0,this.oy+a),o.b&&e(this.ox,this.oy+c-a,c,a,0,this.oy+c,0,this.oy+c-a)}noise(o,t=10){const r=i0(o),c=this.g;for(let e=0;e<260;e++){const a=(r()-.5)*t;c.fillStyle=a>0?`rgba(255,255,255,${a/255})`:`rgba(0,0,0,${-a/255})`,c.fillRect(this.ox+r()*(this.T-7),this.oy+r()*(this.T-7),2+r()*5,2+r()*5)}}}function T(i,o,t){i.rect(0,0,1,1,o),i.grad(0,.5,1,1,"rgba(255,255,255,0.06)","rgba(255,255,255,0)"),i.noise(t,8),i.rect(0,0,1,.045,"rgba(60,45,35,0.55)")}function V0(i,o,t,r,c,e){const a=i0(e),l=["#8c2f2a","#2f4f7a","#d0a040","#3d6b45","#6b3d6b","#c9c2b0","#1f2a33"];let s=o;for(;s<t-.01;){const v=.012+a()*.018,h=(c-r)*(.6+a()*.35);i.rect(s,r,Math.min(s+v,t),r+h,l[Math.floor(a()*l.length)]),s+=v+.002}}function fe(i,o,t,r,c,e){i.rect(o,r,t,c,"#5a3d28"),i.rect(o+.015,r+.015,t-.015,c-.015,"#3b281a");const a=4;for(let l=0;l<a;l++){const s=r+.015+(c-r-.03)*l/a,v=s+(c-r-.03)/a;i.rect(o+.015,s,t-.015,s+.012,"#6b4a30"),V0(i,o+.02,t-.02,s+.012,v-.01,e+l*7)}}function b0(i,o,t){i.rect(o-.02,0,t+.02,.72,"#d9d2c4"),i.rect(o,0,t,.7,"#8a6142"),i.rect(o+.03,.4,t-.03,.66,"rgba(0,0,0,0.12)"),i.rect(o+.03,.05,t-.03,.36,"rgba(0,0,0,0.12)"),i.ellipse(t-.035,.36,.012,.012,"#e0c060")}function y0(i,o,t,r,c,e,a){i.rect(o,t,r,c,"#2a2420"),i.grad(o+.015,t+.015,r-.015,c-.015,e,a),i.ellipse((o+r)/2+.04,(t+c)/2+.02,(r-o)*.12,(r-o)*.12,"rgba(255,240,200,0.7)"),i.poly([[o+.015,t+.015],[o+(r-o)*.45,t+(c-t)*.55],[r-.015,t+.015]],"rgba(30,40,30,0.55)")}function ve(i,o,t){const r=i0(o),c=9;for(let e=0;e<c;e++){let a=-r();for(;a<1;){const l=.25+r()*.35,s=.82+r()*.3;i.rect(e/c,a,(e+1)/c,a+l,`rgb(${t[0]*s},${t[1]*s},${t[2]*s})`),i.rect(e/c,a,(e+1)/c,a+.006,"rgba(0,0,0,0.35)"),a+=l}i.rect(e/c,0,e/c+.005,1,"rgba(0,0,0,0.35)")}}function O0(i,o,t,r){for(let c=0;c<o;c++)for(let e=0;e<o;e++)i.rect(c/o,e/o,(c+1)/o,(e+1)/o,(c+e)%2?t:r)}function l0(i,o,t,r){if(i.rect(0,0,1,1,o),i.noise(t,6),r==="round")i.ellipse(.5,.45,.16,.16,"#d8d0c0"),i.ellipse(.5,.45,.12,.12,"#fff6e0"),i.emissive(.38,.33,.62,.57);else if(r==="panels"){for(let c=0;c<4;c++)for(let e=0;e<4;e++)i.rect(c/4+.005,e/4+.005,(c+1)/4-.005,(e+1)/4-.005,"#e4e6e8");for(const[c,e]of[[.25,.25],[.75,.25],[.25,.75],[.75,.75]])i.rect(c-.09,e-.03,c+.09,e+.03,"#f4fbff"),i.emissive(c-.09,e-.03,c+.09,e+.03)}else for(const c of[.3,.7])i.ellipse(c,.5,.07,.07,"#3a3a3a"),i.ellipse(c,.5,.045,.045,"#ffe4b0"),i.emissive(c-.05,.45,c+.05,.55);i.ao({l:!0,r:!0,t:!0,b:!0},.22)}function ue(i,o){const t=k,r=o*t,c=a=>new r0(i,a*t,r);let e=c(0);T(e,"#d9c8ae",11),y0(e,.36,.52,.66,.74,"#f0a060","#4870a0"),e.rect(.18,.04,.82,.22,"#2f6f74"),e.rect(.21,.22,.79,.38,"#28605f"),e.rect(.14,.04,.22,.3,"#2a6568"),e.rect(.78,.04,.86,.3,"#2a6568"),e.rect(.3,.22,.42,.32,"#e0b050"),e.rect(.58,.22,.7,.32,"#c85a40"),e.rect(.905,0,.915,.56,"#2a2a2a"),e.poly([[.87,.56],[.95,.56],[.935,.66],[.885,.66]],"#f5e2b8"),e.emissive(.87,.56,.95,.66),e.rect(.04,0,.1,.1,"#7a4a30"),e.ellipse(.07,.18,.05,.09,"#3f7a3a"),e.ao({l:!0,r:!0,b:!0,t:!0}),e=c(1),T(e,"#d4c2a6",12),fe(e,.5,.92,0,.78,3),y0(e,.15,.5,.36,.68,"#80b0d0","#305070"),e.ao({r:!0,b:!0,t:!0}),e=c(2),T(e,"#d4c2a6",13),b0(e,.12,.38),e.rect(.45,.28,.85,.36,"#5a3d28"),V0(e,.48,.8,.36,.46,9),e.ao({l:!0,b:!0,t:!0}),e=c(3),ve(e,21,[150,100,62]),e.rect(.22,.28,.78,.72,"#8a3b34"),e.rect(.25,.31,.75,.69,"#a8574a"),e.rect(.3,.36,.7,.64,"#8a3b34"),e.ao({l:!0,r:!0,t:!0},.4),l0(c(4),"#ece6dc",22,"round"),e=c(5),e.rect(.12,0,.14,.12,"#3a2a20"),e.rect(.3,0,.32,.12,"#3a2a20"),e.rect(.1,.12,.34,.2,"#8a5a3a"),e.rect(.12,.2,.32,.36,"#9a6a44"),e.rect(.66,0,.68,.16,"#2a2a2a"),e.rect(.84,0,.86,.16,"#2a2a2a"),e.rect(.62,.16,.9,.19,"#5a3d28"),e.ellipse(.76,.24,.04,.05,"#d0c8b0")}function he(i,o){const t=k,r=o*t,c=a=>new r0(i,a*t,r);let e=c(0);T(e,"#b9c3cc",31),e.rect(.12,.5,.62,.8,"#f4f6f8"),e.rect(.12,.48,.62,.5,"#888"),e.line(.18,.7,.4,.62,"#3060c0",2),e.line(.2,.58,.5,.74,"#c03030",2),e.rect(.7,.5,.92,.72,"#2a2a30"),e.rect(.72,.52,.9,.7,"#4b7bd0"),e.emissive(.72,.52,.9,.7);for(const a of[.08,.55])e.rect(a,.27,a+.38,.3,"#c8c0b0"),e.rect(a+.02,0,a+.04,.27,"#555"),e.rect(a+.34,0,a+.36,.27,"#555"),e.rect(a+.12,.31,a+.27,.43,"#1a1a1e"),e.rect(a+.13,.32,a+.26,.42,"#8fc0ff"),e.emissive(a+.13,.32,a+.26,.42),e.rect(a+.185,.3,a+.205,.32,"#333");e.ao({l:!0,r:!0,b:!0,t:!0}),e=c(1),T(e,"#b4bec8",32);for(let a=0;a<3;a++){const l=.42+a*.17;e.rect(l,0,l+.15,.45,"#8a9098");for(let s=0;s<3;s++)e.rect(l+.01,.02+s*.145,l+.14,.15+s*.145,"#9aa1aa"),e.rect(l+.06,.12+s*.145,l+.09,.13+s*.145,"#333")}e.rect(.1,.55,.3,.7,"#2d5a8c"),e.ao({r:!0,b:!0,t:!0}),e=c(2),T(e,"#b4bec8",33),e.rect(.05,0,.55,.75,"#6d7a86"),e.rect(.07,.02,.53,.73,"rgba(170,205,230,0.85)"),e.rect(.29,.02,.31,.73,"#6d7a86"),e.rect(.62,.45,.86,.7,"#e8e0c0"),e.ao({l:!0,b:!0,t:!0}),e=c(3),O0(e,8,"#5c6470","#646c78"),e.noise(34,14),e.ao({l:!0,r:!0,t:!0},.35),l0(c(4),"#dfe2e6",35,"panels"),e=c(5),e.rect(.05,0,.55,.3,"#7a828c"),e.rect(.05,.3,.55,.33,"#c8c0b0"),e.rect(.2,.33,.38,.47,"#1a1a1e"),e.rect(.21,.34,.37,.46,"#7fb0f0"),e.ellipse(.72,.62,.045,.055,"#2a2420"),e.poly([[.64,0],[.64,.42],[.67,.55],[.77,.55],[.8,.42],[.8,0]],"#2c3e5a"),e.rect(.6,0,.84,.03,"#222")}function me(i,o){const t=k,r=o*t,c=a=>new r0(i,a*t,r);let e=c(0);T(e,"#8fa8c8",41),e.rect(.22,.04,.78,.5,"#6a4a34"),e.rect(.25,.08,.75,.47,"#7a5840"),e.rect(.2,.04,.8,.24,"#e8e2d6"),e.rect(.2,.04,.8,.17,"#c86b5a"),e.rect(.27,.24,.46,.32,"#f4f2ee"),e.rect(.54,.24,.73,.32,"#f4f2ee");for(const a of[.06,.82])e.rect(a,0,a+.12,.18,"#5a3d28"),e.rect(a+.04,.18,a+.08,.22,"#444"),e.poly([[a+.02,.22],[a+.1,.22],[a+.085,.3],[a+.035,.3]],"#ffe0a8"),e.emissive(a+.02,.22,a+.1,.3);y0(e,.38,.6,.62,.76,"#e0c0e8","#6a4a8a"),e.ao({l:!0,r:!0,b:!0,t:!0}),e=c(1),T(e,"#8aa2c2",42),e.rect(.45,0,.9,.78,"#e2ddd2"),e.rect(.675,0,.68,.78,"#9a948a"),e.rect(.64,.38,.655,.46,"#888"),e.rect(.7,.38,.715,.46,"#888"),e.ao({r:!0,b:!0,t:!0}),e=c(2),T(e,"#8aa2c2",43),b0(e,.1,.36),e.rect(.5,.42,.78,.74,"#f0e8d8"),e.rect(.52,.44,.76,.72,"#d06050"),e.ellipse(.64,.58,.06,.06,"#f4d040"),e.ao({l:!0,b:!0,t:!0}),e=c(3),e.rect(0,0,1,1,"#c8bca8"),e.noise(44,18),e.rect(.15,.55,.85,1,"#e8e2d6"),e.rect(.15,.55,.85,.75,"#c86b5a"),e.ao({l:!0,r:!0,t:!0},.4),l0(c(4),"#eceff4",45,"round"),e=c(5),e.rect(.1,0,.22,.12,"#b0603a"),e.ellipse(.16,.3,.09,.18,"#3a7a3a"),e.ellipse(.12,.42,.06,.1,"#4a8a44"),e.rect(.15,.1,.17,.22,"#3a2a1a"),e.rect(.6,0,.92,.22,"#6a4a34"),e.rect(.62,.11,.9,.12,"#3a2a1a"),e.rect(.7,.22,.78,.3,"#d8d0e8")}function de(i,o){const t=k,r=o*t,c=l=>new r0(i,l*t,r);let e=c(0);T(e,"#e8e4da",51);for(let l=0;l<8;l++)for(let s=0;s<12;s++){const v=(s+l%2*.5)/12;e.rect(v,.3+l*.035,v+1/12-.005,.3+l*.035+.03,"#d8eee8")}e.rect(.04,0,.7,.3,"#3d6b5a");for(let l=0;l<4;l++)e.rect(.05+l*.163,.02,.2+l*.163,.27,"#477a68");e.rect(.04,.28,.7,.31,"#c8c4bc"),e.rect(.04,.62,.7,.64,"#6a4a34");const a=i0(5);for(let l=0;l<9;l++){const s=.07+l*.07;e.rect(s,.64,s+.045,.64+.05+a()*.06,["#e0b050","#c85a40","#f4f2ee","#5a8a50"][l%4])}e.rect(.76,0,.96,.78,"#d8dcdf"),e.rect(.76,.5,.96,.51,"#9aa"),e.rect(.78,.53,.795,.66,"#888"),e.rect(.78,.3,.795,.46,"#888"),e.ao({l:!0,r:!0,b:!0,t:!0}),e=c(1),T(e,"#e2ddd0",52),e.rect(.45,0,.92,.3,"#3d6b5a"),e.rect(.45,.28,.92,.31,"#c8c4bc"),e.rect(.45,.55,.92,.78,"#477a68"),e.rect(.15,.5,.3,.7,"#f8f4ea"),e.ellipse(.225,.6,.06,.06,"#fff"),e.line(.225,.6,.225,.65,"#222",2),e.ao({r:!0,b:!0,t:!0}),e=c(2),T(e,"#e2ddd0",53),b0(e,.14,.4),e.rect(.55,.45,.88,.72,"#2a2420"),e.rect(.57,.47,.86,.7,"#f2efe6"),e.ao({l:!0,b:!0,t:!0}),e=c(3),O0(e,7,"#2e2e34","#e8e6e0"),e.ao({l:!0,r:!0,t:!0},.4),l0(c(4),"#f2efe6",55,"pendant"),e=c(5),e.rect(.25,.25,.75,.28,"#7a5236"),e.rect(.28,0,.3,.25,"#5a3d28"),e.rect(.7,0,.72,.25,"#5a3d28");for(const l of[.12,.8])e.rect(l,.15,l+.1,.17,"#4a3020"),e.rect(l+(l<.5?0:.08),.15,l+(l<.5?.02:.1),.42,"#4a3020"),e.rect(l,0,l+.015,.15,"#4a3020"),e.rect(l+.085,0,l+.1,.15,"#4a3020");e.rect(.495,.62,.505,1,"#222"),e.poly([[.44,.56],[.56,.56],[.53,.63],[.47,.63]],"#2a2a2a"),e.rect(.47,.55,.53,.565,"#ffe4b0"),e.rect(.4,.28,.48,.32,"#e8e2d6")}function pe(){if(m0)return m0;const i=document.createElement("canvas");i.width=k*N0,i.height=k*p0;const o=i.getContext("2d");return ue(o,0),he(o,1),me(o,2),de(o,3),m0=i,i}const A=3.4,Z=3.2,w0=.55,g0=2.85,U0=.8,B0=2.75,ye=.8,_0=12,U=[{x0:-14.2,cols:3,floors:5,seed:1,base:[.62,.52,.44],side:8021592},{x0:-3.6,cols:4,floors:6,seed:2,base:[.66,.66,.64],side:8421500},{x0:10.4,cols:3,floors:4,seed:3,base:[.55,.36,.3],side:7226938},{x0:21,cols:3,floors:7,seed:4,base:[.5,.56,.62],side:6253432}],I=U.reduce((i,o)=>i+o.cols*(o.floors-1),0),x0=1210,w=["#5b9cff","#ff9a3c","#4ade80","#e66cff","#facc15"],E0=["뒷벽","왼쪽 벽","오른쪽 벽","바닥","천장"];function xe(i,o){return i.num("strafe",0)+(i.bool("auto",!0)?Math.sin(o*32e-5)*7:0)}function G0(i,o){let t=U[0],r=1/0;for(const a of U){const l=Math.min(Math.max(i,a.x0),a.x0+a.cols*A-.01),s=Math.abs(l-i);s<r&&(r=s,t=a)}const c=Math.min(t.cols-1,Math.max(0,Math.floor((i-t.x0)/A))),e=Math.min(t.floors-1,Math.max(1,Math.floor(o/Z)));return{x0:t.x0+c*A,y0:e*Z,col:c,fl:e,b:t}}const be=`
uniform vec2 uSize;
varying vec2 vF; varying vec3 vDir;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  // 카메라를 파사드의 물체 공간으로 → 시선 광선도 물체 공간 (파사드 면 = z 0)
  vec3 camO = (inverse(modelMatrix) * vec4(cameraPosition, 1.)).xyz;
  vF = position.xy + uSize * .5;     // 파사드 왼쪽 아래가 (0,0)인 미터 좌표
  vDir = position - camO;            // 정점마다 선형 → 픽셀에서 보간해도 정확
  gl_Position = projectionMatrix * viewMatrix * w;
}`,we=`
#define CW ${A.toFixed(2)}
#define CH ${Z.toFixed(2)}
#define WX0 ${w0.toFixed(2)}
#define WX1 ${g0.toFixed(2)}
#define WY0 ${U0.toFixed(2)}
#define WY1 ${B0.toFixed(2)}
uniform vec2 uSize; uniform float uSeed; uniform vec3 uBase; uniform float uFloors;
uniform float uMode, uDepth, uNight, uTime, uCurtain, uView, uRefl, uMid;
uniform sampler2D uAtlas;
varying vec2 vF; varying vec3 vDir;

float hash(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float rect(vec2 uv, vec4 r){ return step(r.x, uv.x) * step(uv.x, r.z) * step(r.y, uv.y) * step(uv.y, r.w); }
const vec3 WALLS[6] = vec3[6](vec3(.86,.80,.70), vec3(.70,.78,.84), vec3(.76,.83,.70), vec3(.88,.74,.68), vec3(.82,.82,.84), vec3(.64,.68,.80));
const vec3 ACC[6] = vec3[6](vec3(.18,.45,.50), vec3(.66,.28,.22), vec3(.30,.32,.50), vec3(.78,.58,.22), vec3(.33,.52,.30), vec3(.52,.30,.52));
const vec3 PLANES[5] = vec3[5](vec3(.36,.61,1.), vec3(1.,.6,.24), vec3(.29,.87,.5), vec3(.9,.42,1.), vec3(.98,.8,.08));

float dayF(){ return 1. - smoothstep(.25, .8, uNight); }
float lampF(){ return smoothstep(.3, .75, uNight); }

// q = 방 정규화 좌표: x 0..1 (왼→오), y 0..1 (바닥→천장), z 0..1 (창→뒷벽)
vec3 roomLight(vec3 q, float lit, float tv){
  float day = dayF(), lamp = lampF() * lit;
  vec3 L = day * mix(vec3(1.1, 1.09, 1.1), vec3(.45, .47, .55), sqrt(q.z));   // 창으로 들어온 빛: 안쪽일수록 어둡게
  vec3 d = (q - vec3(.5, .95, .45)) * vec3(CW, CH, uDepth);
  L += lamp * vec3(1.12, .86, .56) * min(1.25, 2.3 / (1. + dot(d, d) * .3));    // 천장 등
  float fl = .55 + .45 * sin(uTime * 9. + sin(uTime * 2.3) * 5.);
  L += lampF() * (1. - lit) * tv * vec3(.16, .26, .55) * fl * (1.2 - q.z * .5); // 불 꺼진 방의 TV 깜빡임
  return L + vec3(.025, .03, .045);
}

// 절차적 방 (평면 텍스처 · 광선-상자 뷰어): 면 번호 pl 0 뒷벽 1 왼벽 2 오른벽 3 바닥 4 천장
vec3 procAlbedo(int pl, vec3 q, float rs, out float em){
  em = 0.;
  vec3 wall = WALLS[min(5, int(hash(vec2(rs, 1.)) * 6.))];
  vec3 acc = ACC[min(5, int(hash(vec2(rs, 2.)) * 6.))];
  float kind = floor(hash(vec2(rs, 3.)) * 4.);
  float ft = floor(hash(vec2(rs, 4.)) * 3.);
  vec3 c = wall;
  if (pl == 0) {
    vec2 uv = q.xy;
    c *= mix(.62, 1., step(.045, uv.y));
    if (kind < .5) {          // 소파 + 그림
      if (rect(uv, vec4(.36,.52,.64,.74)) > 0.) c = vec3(.14);
      if (rect(uv, vec4(.38,.54,.62,.72)) > 0.) c = mix(vec3(.95,.62,.3), vec3(.28,.48,.8), clamp((uv.y - .54) * 6. + sin(uv.x * 25.) * .2, 0., 1.));
      if (rect(uv, vec4(.23,.22,.77,.38)) > 0.) c = acc * .82;
      if (rect(uv, vec4(.2,.04,.8,.22)) + rect(uv, vec4(.15,.04,.23,.3)) + rect(uv, vec4(.77,.04,.85,.3)) > 0.) c = acc;
    } else if (kind < 1.5) {  // 책장 + 스탠드
      if (rect(uv, vec4(.08,.0,.48,.82)) > 0.) {
        c = vec3(.4,.27,.17);
        float row = fract(uv.y / .2), bk = hash(vec2(floor(uv.x * 46.), floor(uv.y / .2) + rs));
        if (uv.x > .1 && uv.x < .46 && uv.y < .8 && row > .08 && row < .9 - bk * .3) c = mix(ACC[min(5, int(bk * 6.))], vec3(.9), .15);
        else if (row <= .08) c = vec3(.5,.35,.22);
      }
      if (rect(uv, vec4(.735,.0,.75,.56)) > 0.) c = vec3(.15);
      if (rect(uv, vec4(.68,.56,.81,.67)) > 0.) { c = vec3(.97,.88,.7); em = .9; }
    } else if (kind < 2.5) {  // 침대
      if (rect(uv, vec4(.22,.04,.78,.48)) > 0.) c = vec3(.45,.31,.2);
      if (rect(uv, vec4(.2,.04,.8,.24)) > 0.) c = mix(vec3(.93,.9,.86), acc, step(uv.y, .17));
      if (rect(uv, vec4(.27,.24,.46,.31)) + rect(uv, vec4(.54,.24,.73,.31)) > 0.) c = vec3(.96);
      if (rect(uv, vec4(.06,.04,.17,.18)) + rect(uv, vec4(.83,.04,.94,.18)) > 0.) c = vec3(.38,.26,.17);
      if (rect(uv, vec4(.08,.18,.15,.26)) + rect(uv, vec4(.85,.18,.92,.26)) > 0.) { c = vec3(1.,.88,.66); em = .8; }
    } else {                  // 책상 + 모니터
      if (rect(uv, vec4(.12,.29,.88,.32)) > 0.) c = vec3(.78,.74,.66);
      if (rect(uv, vec4(.14,.0,.16,.29)) + rect(uv, vec4(.84,.0,.86,.29)) > 0.) c = vec3(.25);
      if (rect(uv, vec4(.37,.35,.63,.53)) > 0.) c = vec3(.06);
      if (rect(uv, vec4(.39,.37,.61,.51)) > 0.) { c = vec3(.45,.65,1.); em = .7; }
      if (rect(uv, vec4(.49,.32,.51,.35)) > 0.) c = vec3(.2);
      if (rect(uv, vec4(.2,.6,.33,.8)) > 0.) c = acc;
    }
  } else if (pl == 1 || pl == 2) {
    vec2 uv = q.zy;           // 가로 = 깊이 (0 창 → 1 뒷벽)
    c *= mix(.62, 1., step(.045, uv.y)) * .94;
    bool doorSide = (pl == 1) == (hash(vec2(rs, 5.)) > .5);
    if (doorSide) {
      if (rect(uv, vec4(.53,.0,.84,.72)) > 0.) c = vec3(.86,.83,.78);
      if (rect(uv, vec4(.55,.0,.82,.7)) > 0.) c = vec3(.5,.35,.24);
      if (length((uv - vec2(.79,.36)) * vec2(uDepth, CH)) < .05) c = vec3(.9,.75,.35);
    } else if (hash(vec2(rs, 6.)) > .5) {
      if (rect(uv, vec4(.3,.44,.6,.7)) > 0.) c = vec3(.14);
      if (rect(uv, vec4(.32,.46,.58,.68)) > 0.) c = mix(acc, vec3(.95,.9,.7), uv.y * 3. - 1.4);
    } else {
      if (rect(uv, vec4(.4,.0,.88,.78)) > 0.) c = mix(vec3(.88,.86,.8), vec3(.55,.42,.3), step(.5, hash(vec2(rs, 7.))));
      if (abs(uv.x - .64) < .004 && uv.y < .78) c *= .6;
    }
  } else if (pl == 3) {
    vec2 uv = q.xz;
    if (ft < .5) {            // 원목 마루
      vec2 g = vec2(uv.x * 9., uv.y * uDepth * .9);
      g.y += hash(vec2(floor(g.x), rs)) * 3.;
      c = mix(vec3(.5,.32,.18), vec3(.68,.47,.28), hash(floor(g) + rs));
      c *= 1. - .45 * max(step(.95, fract(g.x)), step(.97, fract(g.y)));
    } else if (ft < 1.5) {    // 카펫
      c = acc * .55 + .22;
      c *= .92 + .08 * hash(floor(uv * 90.));
    } else {                  // 타일
      vec2 g = floor(vec2(uv.x * 6., uv.y * uDepth * 1.8));
      c = mix(vec3(.88,.87,.84), vec3(.32,.33,.36), mod(g.x + g.y, 2.));
    }
    if (rect(uv, vec4(.24,.26,.76,.72)) > 0.) c = mix(acc * .8 + .08, vec3(.92,.86,.7), step(.5, rect(uv, vec4(.28,.31,.72,.67)) * (1. - rect(uv, vec4(.31,.35,.69,.63)))));
  } else {
    vec2 uv = q.xz;
    c = vec3(.9,.89,.86);
    float r = length((uv - vec2(.5,.45)) * vec2(CW, uDepth));
    if (r < .26) { c = vec3(1.,.96,.86); em = 1.; }
    else if (r < .3) c = vec3(.75);
  }
  return c;
}

// 아틀라스 조회 (밉 레벨은 파사드 좌표 미분으로 직접 계산 → 면 경계에서 미분이 튀는 이음새 방지)
vec4 atlas(float col, float row, vec2 uv, float lod){
  uv = clamp(uv, 2.5 / ${k}., 1. - 2.5 / ${k}.);
  return textureLod(uAtlas, vec2((col + uv.x) / ${N0}., (${p0-1}. - row + uv.y) / ${p0}.), lod);
}

vec3 skyRefl(vec3 r){
  float day = dayF();
  vec3 zen = mix(vec3(.03,.05,.12), vec3(.32,.52,.85), day), hor = mix(vec3(.12,.11,.18), vec3(.8,.86,.93), day);
  vec3 s = mix(hor, zen, clamp(r.y * 1.8, 0., 1.));
  float az = atan(r.x, r.z);
  float sky = .1 + .28 * hash(vec2(floor(az * 6.), 3.));
  if (r.y < sky) {           // 길 건너편 건물 실루엣
    s = mix(vec3(.04,.045,.06), vec3(.45,.45,.48), day);
    vec2 wc = vec2(az * 45., r.y * 34.);
    float win = step(.25, fract(wc.x)) * step(.3, fract(wc.y));
    s += win * step(.55, hash(floor(wc))) * lampF() * vec3(.9,.7,.4);
    s += win * day * vec3(.08,.1,.14);
  }
  if (r.y < -.02) s = mix(vec3(.03), vec3(.3,.3,.32), day);
  return s;
}

void main(){
  vec2 cell = floor(vF / vec2(CW, CH));
  vec2 lc = vF - cell * vec2(CW, CH);
  float day = dayF();
  vec3 facadeL = mix(vec3(.1,.11,.17), vec3(1.,.97,.92), day);

  // ── 파사드 벽 (창 밖 부분) ──
  vec3 base = uBase * (.93 + .07 * hash(cell + uSeed));
  vec3 col = base;
  if (lc.y < .14) col *= .78;                            // 층 슬래브 띠
  if (cell.y < .5) col = uBase * .55;                    // 1층 로비 석재
  if (vF.y > uFloors * CH) col = uBase * .8 + .06;       // 옥상 파라펫
  bool win = cell.y > .5 && cell.y < uFloors - .5 && lc.x > WX0 && lc.x < WX1 && lc.y > WY0 && lc.y < WY1;
  if (rect(lc, vec4(WX0 - .12, WY0 - .14, WX1 + .12, WY0)) > 0. && cell.y > .5 && cell.y < uFloors - .5) col = vec3(.82,.8,.76) * (uBase.r + .4); // 창턱
  if (rect(lc, vec4(WX0 - .07, WY0 - .07, WX1 + .07, WY1 + .07)) > 0. && cell.y > .5 && cell.y < uFloors - .5) col = vec3(.2,.21,.23); // 창틀
  col *= facadeL;

  if (win) {
    // ── 시선 광선을 방 상자에 쏘기 ──
    vec3 p = vec3(vF, 0.);
    vec3 d = vDir;
    vec2 r0 = cell * vec2(CW, CH);
    if (uMode < .5) d = vec3(vF - (r0 + vec2(CW * .5, (WY0 + WY1) * .5)), -4.);  // 평면: 창 정면 4 m에서 찍은 사진으로 고정
    float D = uDepth;
    vec3 sd = sign(d) * max(abs(d), vec3(1e-5));
    float tx = ((d.x > 0. ? r0.x + CW : r0.x) - p.x) / sd.x;
    float ty = ((d.y > 0. ? r0.y + CH : r0.y) - p.y) / sd.y;
    float tz = -D / sd.z;
    float t = min(tx, min(ty, tz));
    int pl = t == tz ? 0 : (t == tx ? (d.x < 0. ? 1 : 2) : (d.y < 0. ? 3 : 4));
    vec3 h = p + d * t;
    vec3 q = vec3((h.x - r0.x) / CW, (h.y - r0.y) / CH, -h.z / D);

    float rs = hash(cell + uSeed * 7.31);
    float lit = step(hash(vec2(rs, 9.)), .58);
    float tv = step(.55, hash(vec2(rs, 10.)));
    vec3 room;
    if (uMode < 1.5) {
      float em;
      vec3 alb = procAlbedo(pl, q, rs, em);
      // 모서리 AO: 면이 만나는 곳까지의 거리(m)
      float e = pl == 0 ? min(min(q.x, 1. - q.x) * CW, min(q.y, 1. - q.y) * CH)
              : pl <= 2 ? min(min(q.y, 1. - q.y) * CH, (1. - q.z) * D)
              : min(min(q.x, 1. - q.x) * CW, (1. - q.z) * D);
      float ao = mix(.55, 1., smoothstep(0., .5, e));
      room = alb * roomLight(q, lit, tv) * ao + em * (lampF() * (lit * .9 + .25) + day * .15) * vec3(1., .9, .75);
    } else {
      // 큐브맵 방식: 맞은 점을 정규화 큐브 [-1,1]³ 좌표로 보고 "가장 큰 축"으로 면을 고른다 (samplerCube가 하드웨어에서 하는 일)
      float style = floor(hash(vec2(rs, 11.)) * 4.);
      bool mir = hash(vec2(rs, 12.)) > .5;
      vec3 qq = q; if (mir) qq.x = 1. - qq.x;
      vec3 c = vec3(qq.x * 2. - 1., qq.y * 2. - 1., 1. - 2. * qq.z);
      vec3 ac = abs(c);
      float face; vec2 fuv;
      if (-c.z >= ac.x && -c.z >= ac.y) { face = 0.; fuv = qq.xy; }
      else if (ac.x >= ac.y) { face = c.x < 0. ? 1. : 2.; fuv = c.x < 0. ? vec2(qq.z, qq.y) : vec2(1. - qq.z, qq.y); }
      else { face = c.y < 0. ? 3. : 4.; fuv = vec2(qq.x, qq.z); }
      float fw = max(fwidth(vF.x), fwidth(vF.y));
      float lod = log2(max(fw * ${(k/A).toFixed(2)} * (1. + t), 1e-4)) - .25;
      vec4 tx4 = atlas(face, style, fuv, lod);
      float em = 1. - smoothstep(.7, .92, tx4.a);
      room = tx4.rgb * roomLight(q, lit, tv) * 1.05 + tx4.rgb * em * (lampF() * (lit * 1.1 + .3) + day * .2);
      // 중경 레이어: 방 깊이 55% 위치의 컷아웃 평면 (가구 실루엣이 벽보다 앞에서 따로 움직임)
      if (uMid > .5 && hash(vec2(rs, 13.)) > .2) {
        float zm = -.55 * D, tm = zm / sd.z;
        if (tm < t) {
          vec3 hm = p + d * tm;
          vec2 mq = vec2((hm.x - r0.x) / CW, (hm.y - r0.y) / CH);
          if (mir) mq.x = 1. - mq.x;
          float mrow = floor(hash(vec2(rs, 14.)) * 4.);
          vec4 m = atlas(5., mrow, mq, log2(max(fw * ${(k/A).toFixed(2)} * (1. + tm), 1e-4)) - .25);
          if (m.a > .5) { room = m.rgb * roomLight(vec3(mq.x, mq.y, .55), lit, tv) * .9; if (uView > .5) pl = 5; }
        }
      }
      // 커튼·블라인드: 유리 12 cm 뒤 평면
      float amt = clamp(uCurtain * (.55 + .9 * hash(vec2(rs, 15.))), 0., 1.);
      if (amt > .01) {
        float tc = -.12 / sd.z;
        vec3 hc = p + d * tc;
        vec2 cq = vec2((hc.x - r0.x - WX0) / (WX1 - WX0), (hc.y - r0.y - WY0) / (WY1 - WY0));
        vec3 fab = mix(ACC[min(5, int(hash(vec2(rs, 16.)) * 6.))], vec3(.92,.9,.84), .45);
        bool blinds = hash(vec2(rs, 17.)) < .35;
        float cov = 0.; vec3 cc = fab;
        if (blinds) {
          if (cq.y > 1. - amt * 1.05 && fract(cq.y * 22.) < .78) { cov = 1.; cc = vec3(.86,.85,.8) * (.8 + .2 * fract(cq.y * 22.) / .78); }
        } else {
          float half_ = amt * .5;
          if (cq.x < half_ || cq.x > 1. - half_) { cov = 1.; cc = fab * (.72 + .28 * sin(cq.x * 70.) * sin(cq.x * 70.)); }
        }
        if (cov > .5) {
          // 낮: 바깥에서 받는 빛 / 밤: 불 켠 방이면 뒤에서 비치는 투과광
          room = cc * (day * .95 + .04) + cc * lampF() * lit * vec3(1.1,.8,.5) * .9;
          if (uView > .5) pl = 6;
        }
      }
    }

    // 디버그 표시
    if (uView > .5 && uView < 1.5) {
      vec3 g = floor(h * vec3(1., 1., 1.) * 1.25);
      float chk = mod(g.x + g.y + g.z, 2.);
      room = pl < 5 ? PLANES[pl] * (.72 + .28 * chk) : (pl == 5 ? vec3(.95) : vec3(1.,.55,.7));
    } else if (uView > 1.5) {
      vec3 idc = .35 + .65 * vec3(hash(vec2(rs, 21.)), hash(vec2(rs, 22.)), hash(vec2(rs, 23.)));
      room = idc * (pl == 0 ? 1. : pl <= 2 ? .8 : .62);
    }

    // 유리: 약간의 색 + (확장 뷰어) 프레넬 반사
    col = room * vec3(.86,.9,.93);
    if (uMode > 1.5 && uRefl > .5 && uView < .5) {
      vec3 v = normalize(-d);
      float F = .04 + .96 * pow(1. - clamp(v.z, 0., 1.), 5.);
      col = mix(col, skyRefl(reflect(-v, vec3(0., 0., 1.))), clamp(F + .05, 0., 1.));
    }
    // 창살 (유리면 위, 시차 없음)
    float mx = (WX0 + WX1) * .5;
    if (abs(lc.x - mx) < .035 || abs(lc.y - (WY1 - .5)) < .03) col = vec3(.2,.21,.23) * facadeL;
  }
  gl_FragColor = vec4(col, 1.);
}`,ge=new a0(10274024),Me=new a0(4868728),qe=new a0(461592);function d0(i,o){return ne(i,{antialias:!0,cam:[12.5,4.6,9.5],target:[5.5,6.4,0],fov:45,far:300},({scene:t,camera:r,renderer:c,controls:e})=>{e.maxPolarAngle=Math.PI*.62,e.minDistance=2.5,e.maxDistance=40;const a=new Z0;t.add(a);let l=null;o===2&&(l=new ee(pe()),l.colorSpace=te,l.minFilter=ce,l.anisotropy=4);const s={uMode:{value:o},uDepth:{value:4},uNight:{value:.5},uTime:{value:0},uCurtain:{value:.35},uView:{value:0},uRefl:{value:1},uMid:{value:1},uAtlas:{value:l}},v=new oe(13623551,4866104,1.2),h=new ae(16773853,1.6);h.position.set(8,14,10),t.add(v,h);for(const z of U){const W=z.cols*A,D=z.floors*Z+ye,f=new ie({uniforms:{...s,uSize:{value:new re(W,D)},uSeed:{value:z.seed},uBase:{value:new O(...z.base)},uFloors:{value:z.floors}},vertexShader:be,fragmentShader:we}),m=new o0(new R0(W,D),f);m.position.set(z.x0+W/2,D/2,0);const q=new o0(new I0(W,D,_0),new h0({color:z.side}));q.position.set(z.x0+W/2,D/2,-_0/2-.02),a.add(m,q)}const C=new o0(new R0(140,60),new h0({color:2829617}));C.rotation.x=-Math.PI/2,C.position.set(8,0,10);const Y=new o0(new I0(140,.15,3),new h0({color:7828332}));Y.position.set(8,.075,1.5),a.add(C,Y);const g=new a0,P=new O,M=new O,_={cam:new O,tgt:new O};return i.shared.set("imEye",_),{update(z,W,D){const f=i.params,m=f.num("night",.5);s.uDepth.value=f.num("depth",4),s.uNight.value=m,s.uTime.value=D/1e3,s.uCurtain.value=f.num("curtain",.35),s.uView.value=["final","planes","ids"].indexOf(f.str("view","final")),s.uRefl.value=f.bool("refl",!0)?1:0,s.uMid.value=f.bool("mid",!0)?1:0,a.position.x=-xe(f,D);const q=1-le.smoothstep(m,.25,.8);g.copy(qe).lerp(Me,Math.min(1,q*2)).lerp(ge,Math.max(0,q*2-1)),t.background.copy(g),v.intensity=.15+1.05*q,h.intensity=1.6*q,P.copy(r.position).sub(a.position),M.copy(e.target).sub(a.position),_.cam.copy(P),_.tgt.copy(M);const x=G0(M.x,M.y),d=P.x-(x.x0+A/2),X=Math.max(.1,P.z),L=Math.atan2(Math.abs(d),X),S=s.uDepth.value*Math.tan(L),b=c.info.render.triangles,H=(I*x0/1e3).toFixed(0),E=o===0?["평면 텍스처: 창 정면에서 찍은 방 사진을 유리에 붙임",`△ ${b} (방 ${I}개를 실제로 만들면 ≈ ${H}k △)`,"교차 0 ALU + 무늬 ≈ 40 ALU/픽셀 (추정)",`시선각 ${(L*57.3).toFixed(0)}° · 뒷벽 시차 0 m (그림이 유리에 붙어 있음)`]:o===1?["광선-상자 교차 → 5면 중 먼저 맞은 면을 절차적으로 칠함",`△ ${b} (실제 방이면 ≈ ${H}k △, 드로우콜 +${I*4})`,"교차 ≈ 20 ALU + 무늬 ≈ 40 ALU/픽셀 (추정)",`시선각 ${(L*57.3).toFixed(0)}° · 뒷벽 시차 D·tanθ = ${S.toFixed(2)} m (창 폭 ${(g0-w0).toFixed(1)} m)`]:[`큐브맵 조회(아틀라스 4종) + ${f.bool("mid",!0)?"중경 ":""}${f.num("curtain",.35)>.01?"커튼 ":""}${f.bool("refl",!0)?"프레넬 반사":""}`,`△ ${b} (실제 방이면 ≈ ${H}k △)`,`교차 ≈ 20 + 레이어 ≈ ${10*((f.bool("mid",!0)?1:0)+(f.num("curtain",.35)>.01?1:0))+(f.bool("refl",!0)?25:0)} ALU, 텍스처 ${1+(f.bool("mid",!0)?1:0)}회 (추정)`,`시선각 ${(L*57.3).toFixed(0)}° · 뒷벽 시차 ${S.toFixed(2)} m`];i.hud(E.join(`
`))},dispose(){l==null||l.dispose(),i.shared.get("imEye")===_&&i.shared.delete("imEye")}}})}function Se(i){const o={cam:new O(12.5,4.6,9.5),tgt:new O(5.5,6.4,0)};return se(i,()=>({draw(t,r,c){const e=i.params;t.fillStyle="#0b0e14",t.fillRect(0,0,r,c);const a=i.shared.get("imEye")??o,l=G0(a.tgt.x,a.tgt.y),s=e.num("depth",4),v=r<520,h=v?9:11,C=v?40:46,Y=r/(c-C)>1.25,g=Y?r/2:r,P=Y?c-C:(c-C)/2;t.font=`${h}px JetBrains Mono, monospace`;const M=(m,q,x)=>{const d=x==="top"?A:Z,X=x==="top"?w0:U0,L=x==="top"?g0:B0,B=x==="top"?a.cam.x-l.x0:a.cam.y-l.y0,S=a.cam.z,b=2.6,H=-1,E=d+1,s0=-s-.5,G=14,M0=h+8,q0=g-G*2,n0=P-G*2-M0,e0=x==="top"?Math.min(q0/(E-H),n0/(b-s0)):Math.min(q0/(b-s0),n0/(E-H)),S0=m+g/2,$0=q+M0+G+n0/2,F0=(H+E)/2,T0=(b+s0)/2,$=(p,n)=>x==="top"?[S0+(p-F0)*e0,$0-(n-T0)*e0]:[S0-(n-T0)*e0,$0-(p-F0)*e0],F=(p,n,u,y,R,N=1,c0=[])=>{const[K,V]=$(p,n),[J,Q]=$(u,y);t.strokeStyle=R,t.lineWidth=N,t.setLineDash(c0),t.beginPath(),t.moveTo(K,V),t.lineTo(J,Q),t.stroke(),t.setLineDash([])};t.fillStyle="#c8d0dc",t.fillText(x==="top"?"위에서 본 단면 (x–z)":"옆에서 본 단면 (y–z)",m+G,q+G+h);const[C0,z0]=$(0,0),[W0,D0]=$(d,-s);t.fillStyle="rgba(91,156,255,0.06)",t.fillRect(Math.min(C0,W0),Math.min(z0,D0),Math.abs(W0-C0),Math.abs(D0-z0)),F(H,0,X,0,"#9aa3b2",4),F(L,0,E,0,"#9aa3b2",4),F(X,0,L,0,"rgba(160,210,255,0.5)",2);const t0=x==="top"?1:3,L0=x==="top"?2:4;F(0,0,0,-s,w[t0]+"55",2),F(d,0,d,-s,w[L0]+"55",2),F(0,-s,d,-s,w[0]+"55",2),F(0,-.55*s,d,-.55*s,"rgba(255,255,255,0.25)",1,[4,4]),e.num("curtain",.35)>.01&&F(X,-.12,L,-.12,"rgba(255,140,180,0.45)",1,[2,3]);const k0=11,f0={};for(let p=0;p<k0;p++){const n=X+(L-X)*(p+.5)/k0,u=n-B,y=-S,R=S>b?b/S:1;F(n+(B-n)*R,S*R,n,0,"rgba(200,208,220,0.28)",1);const N=u>1e-6?(d-n)/u:u<-1e-6?(0-n)/u:1/0,c0=-s/y,K=Math.min(N,c0),V=K===c0?0:u<0?t0:L0,J=n+u*K,Q=y*K;F(n,0,J,Q,w[V],1.6);const[J0,Q0]=$(J,Q);t.fillStyle=w[V],t.beginPath(),t.arc(J0,Q0,2.5,0,Math.PI*2),t.fill();const X0=V===0?J:Q,H0=f0[V]??[1/0,-1/0];f0[V]=[Math.min(H0[0],X0),Math.max(H0[1],X0)]}for(const[p,[n,u]]of Object.entries(f0)){const y=Number(p);y===0?F(n,-s,u,-s,w[0],5):F(y===t0?0:d,n,y===t0?0:d,u,w[y],5)}const j0=Math.min(S,b),K0=S>b?_(X,L)+(B-_(X,L))*(b/S):B,[v0,u0]=$(K0,j0);t.fillStyle="#fff3d6",t.beginPath(),t.arc(v0,u0,4,0,Math.PI*2),t.fill(),t.fillStyle="#c8d0dc";const A0=S>b?`카메라 쪽 (${Math.hypot(B-d/2,S).toFixed(1)} m)`:"카메라",Y0=t.measureText(A0).width;let j=v0+7;j+Y0>m+g-4&&(j=v0-7-Y0),j=Math.max(m+4,j),t.fillText(A0,j,x==="top"?u0+4:u0+h+6);const P0=(p,n,u,y)=>{const[R,N]=$(p,n);t.fillStyle=y,t.fillText(u,R,N)};if(x==="top"){P0(d/2-.35,-s-.32,E0[0],w[0]);const[p,n]=$(0,-s*.5);t.fillStyle=w[1],t.fillText("왼쪽 벽",Math.max(m+3,p-8-t.measureText("왼쪽 벽").width),n);const[u,y]=$(d,-s*.5);t.fillStyle=w[2],t.fillText("오른쪽 벽",Math.min(u+8,m+g-3-t.measureText("오른쪽 벽").width),y),P0(E-.9,.25,"유리","#9fc8ff")}else{const[p,n]=$(d*.5,-s);t.fillStyle=w[0],t.fillText("뒷벽",p+4,n);const[u,y]=$(-.35,-s*.5);t.fillStyle=w[3],t.fillText("바닥",u-12,y+h);const[R,N]=$(d+.15,-s*.5);t.fillStyle=w[4],t.fillText("천장",R-12,N-2)}},_=(m,q)=>(m+q)/2;M(0,0,"top"),Y?M(g,0,"side"):M(0,P,"side"),Y&&(t.strokeStyle="#1c2230",t.beginPath(),t.moveTo(g,8),t.lineTo(g,c-C-4),t.stroke());const z=a.cam.x-(l.x0+A/2),W=Math.atan2(Math.abs(z),Math.max(.1,a.cam.z)),D=I*x0,f=c-C+h+4;t.fillStyle="#c8d0dc",t.fillText(v?`D ${s.toFixed(1)} m · θ ${(W*57.3).toFixed(0)}° → 뒷벽 밀림 ${(s*Math.tan(W)).toFixed(2)} m`:`기준 방: 건물 ${l.b.seed} · ${l.fl+1}층 ${l.col+1}번째 창 · 방 깊이 D ${s.toFixed(1)} m · 시선각 θ ${(W*57.3).toFixed(0)}° → 뒷벽이 창에 대해 D·tanθ = ${(s*Math.tan(W)).toFixed(2)} m 밀림`,8,f),t.fillStyle="#ff9a3c",t.fillText(v?`실제 방: ${I}개 × ~${x0}△ ≈ ${(D/1e3).toFixed(0)}k △`:`실제 지오메트리: 방 ${I}개 × (껍데기 10△ + 가구 ~1,200△) ≈ ${(D/1e3).toFixed(0)}k △, 드로우콜 +~${I*4}, 조명 ${I}개, 텍스처 다수 (추정)`,8,f+h+3),t.fillStyle="#4ade80",t.fillText(v?`인테리어 매핑: 파사드 ${U.length*2}△ + 픽셀당 ~20 ALU`:`인테리어 매핑: 파사드 사각형 ${U.length}장 = ${U.length*2}△ 그대로, 창 픽셀마다 교차 ≈ 20 ALU + 텍스처 1~2회 (추정)`,8,f+(h+3)*2),i.hud(`광선 11개 / 단면 · ${E0.map(m=>m).join(" · ")}`)}}))}const Ce={layout:"compare",intro:'도시의 건물 창문마다 방을 실제로 모델링하면 방 수 × (벽 + 가구 + 조명)만큼 삼각형·드로우콜이 늘어납니다. <b>인테리어 매핑</b>은 건물 정면을 평평한 사각형 하나로 두고, 창 픽셀마다 <b>시선 광선을 "보이지 않는 방 상자" 안으로 연장</b>해 먼저 맞는 면(뒷벽·옆벽·바닥·천장)을 칠합니다. 카메라가 움직이면 뒷벽과 옆벽이 창틀에 대해 제각각 밀려 진짜 방처럼 보이고, 방 번호로 무늬·조명을 바꿔 수백 개 창이 모두 달라집니다. 자동 스트레이프로 카메라가 건물 앞을 지나가는 동안 왼쪽 평면 텍스처와 비교해 보세요.',how:["정점 셰이더: 카메라 위치를 파사드의 물체(접선) 공간으로 옮기고, 시선 방향 d = 정점 위치 − 카메라를 넘긴다.","픽셀 셰이더: 파사드 좌표를 셀 크기로 나눠 방 번호(층, 열)를 얻고, 그 셀을 앞면으로 하는 상자 [x0,x1]×[y0,y1]×[−D,0]을 가정한다.","광선-상자 교차: 축마다 t = (벽 위치 − p)/d 를 구하고 가장 작은 t가 맞은 면. 맞은 점 좌표로 그 면의 UV를 만든다.","면 UV로 벽지·바닥·천장 텍스처(또는 큐브맵/아틀라스)를 조회하고, 방 번호 해시로 스타일·가구·불 켜짐을 무작위로.","확장: 방 중간 깊이의 컷아웃 평면(가구), 유리 바로 뒤 커튼 평면을 같은 방식(광선-평면)으로 앞에서부터 합성하고, 프레넬로 유리 반사를 섞는다."],pros:["방이 몇 개든 파사드 사각형 2△ — 삼각형·드로우콜·조명 수가 늘지 않음",'시선에 따라 정확한 원근·시차 (평면 텍스처의 "스티커" 느낌이 사라짐)',"방 번호 해시만으로 수백 개 방을 서로 다르게, 밤에는 불 켠 방만 빛나게"],cons:["방 안은 볼록 상자 하나: 진짜 가구의 입체·가림은 레이어 몇 장으로 흉내만","창 픽셀마다 나눗셈·분기 → 가까이서 화면을 가득 채우면 픽셀 비용이 큼","방 깊이가 달라지면 옆벽·바닥 텍스처가 늘어남, 큐브맵은 텍스처 메모리를 씀"],usedIn:"Joost van Dongen의 2008년 발표가 원형. 이후 오픈월드 도시 게임의 건물 창문에 널리 쓰임 (Marvel's Spider-Man의 큐브맵 실내가 자주 언급됨). Unreal의 InteriorCubemap 머티리얼 함수.",controls:[{type:"select",key:"view",label:"표시",options:[{label:"최종 화면",value:"final"},{label:"맞은 면 색칠 (디버그)",value:"planes"},{label:"방 ID 색칠",value:"ids"}],value:"final"},{type:"range",key:"depth",label:"방 깊이 (m)",min:1,max:8,step:.1,value:4},{type:"range",key:"night",label:"시간대 (낮 0 → 밤 1)",min:0,max:1,step:.01,value:.5},{type:"range",key:"curtain",label:"커튼 · 블라인드 (확장 뷰어)",min:0,max:1,step:.01,value:.35},{type:"range",key:"strafe",label:"카메라 좌우 이동 (m)",min:-10,max:10,step:.1,value:0},{type:"toggle",key:"auto",label:"자동 스트레이프",value:!0},{type:"toggle",key:"mid",label:"중경 가구 레이어",value:!0},{type:"toggle",key:"refl",label:"유리 반사 (프레넬)",value:!0}],viewers:[{title:"평면 창 텍스처 (방 그림을 붙임)",kind:"before",caption:"창 정면에서 찍은 방 그림을 유리에 그대로 붙였다. 정면에서는 그럴듯하지만, 카메라가 옆으로 지나가도 그림 속 뒷벽·옆벽이 창틀과 함께 움직여 스티커처럼 보인다.",mount:i=>d0(i,0)},{title:"인테리어 매핑 (광선-상자 교차)",kind:"after",caption:"같은 절차적 방을 픽셀마다 광선-상자 교차로 그린다. 비스듬히 보면 반대편 옆벽이 넓게 드러나고 뒷벽은 창 뒤로 밀린다. 방마다 벽지·가구·바닥이 다르고 밤에는 일부 방만 불이 켜진다.",mount:i=>d0(i,1)},{title:"큐브맵 방 + 레이어 (아틀라스 · 중경 · 커튼 · 반사)",kind:"variant",caption:"맞은 점을 큐브 좌표로 보고 미리 그린 방 텍스처(4종 아틀라스)를 조회. 방 중간의 가구 컷아웃 평면, 유리 뒤 커튼·블라인드, 프레넬 유리 반사를 더했다. 밤에는 불 켠 방과 커튼이 빛난다.",mount:i=>d0(i,2)},{title:"광선이 창을 지나 가상 방에 맞는 모습 · 비용",kind:"info",wide:!0,caption:"화면 중앙의 창 하나를 위·옆에서 자른 단면. 회색은 카메라에서 창까지, 색 선은 방 안에서 처음 맞은 면(파랑 뒷벽, 주황 왼쪽, 초록 오른쪽, 보라 바닥, 노랑 천장). 굵은 구간이 창으로 보이는 면의 범위. 점선은 확장 뷰어의 중경 레이어·커튼 평면.",mount:Se}]};export{Ce as default};
