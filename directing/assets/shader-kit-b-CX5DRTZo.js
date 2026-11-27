var _=Object.defineProperty;var F=(r,t,a)=>t in r?_(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a;var v=(r,t,a)=>F(r,typeof t!="symbol"?t+"":t,a);import{S as I,C as d,M as O,y as R,b as f,c,T as z,a as B,e as E,O as L,W as V,a7 as g,j,V as b,_ as k,a8 as H,f as C}from"./three.module-CEzfHhrp.js";import{m as U}from"./BufferGeometryUtils--Oh5Y0A9.js";const J=r=>Number.isFinite(r)?`${Math.round(r)}`:"--";function K(r={},t=1){const a=[],n=(e,P,A,N,S=[0,0,0],T=[1,1,1])=>{e=e.index?e.toNonIndexed():e,e.deleteAttribute("uv");const W=new j().compose(new b(...N),new k().setFromEuler(new H(...S)),new b(...T));e.applyMatrix4(W);const m=new d(P),w=e.attributes.position.count,l=new Float32Array(w*3),M=new Float32Array(w);for(let i=0;i<w;i++)l[i*3]=m.r,l[i*3+1]=m.g,l[i*3+2]=m.b,M[i]=A;e.setAttribute("color",new C(l,3)),e.setAttribute("part",new C(M,1)),a.push(e)},s=Math.max(.5,t),o=e=>Math.max(3,Math.round(e*s)),u=r.skin??16767426,x=r.cloth??6000111,h=r.hair??4864622,G=r.pants??3093840,y=r.accent??16762967;for(const e of[-1,1])n(new f(.1,.32,o(4),o(12)),G,3,[e*.13,.27,0]),n(new c(.12,o(14),o(10)),3811882,3,[e*.13,.07,.04],[0,0,0],[1,.6,1.35]);n(new f(.25,.3,o(6),o(20)),x,1,[0,.72,0]),n(new z(.255,.035,o(6),o(24)),y,4,[0,.58,0],[Math.PI/2,0,0]);for(const e of[-1,1])n(new f(.075,.34,o(4),o(10)),x,1,[e*.33,.74,.02],[0,0,e*.22]),n(new c(.08,o(12),o(8)),u,0,[e*.38,.52,.03]);n(new B(.07,.08,.1,o(12)),u,0,[0,.99,0]),n(new c(.33,o(32),o(22)),u,0,[0,1.26,.01]),n(new c(.35,o(32),o(14),0,Math.PI*2,0,Math.PI*.52),h,2,[0,1.27,-.005]),n(new c(.3,o(20),o(14)),h,2,[0,1.18,-.12],[0,0,0],[1.05,1,.75]);for(const e of[-1,1])n(new E(.07,.3,o(10)),h,2,[e*.29,1.12,.07],[0,0,e*.12]);for(const e of[-1,1])n(new c(.045,o(10),o(8)),2234931,5,[e*.12,1.25,.31],[0,0,0],[.8,1.2,.5]);n(new L(.06),y,4,[.22,1.5,.2]);const p=U(a);return p.computeBoundingBox(),p.computeBoundingSphere(),p}const X=1.62,Y=`
attribute vec3 color;
attribute float part;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
varying vec3 vCol;
varying float vPart;
void main() {
  vCol = color;
  vPart = part;
  vOp = position;
  vNw = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,D=`
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
void main() {
  vOp = position;
  vNw = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Z=`
vec3 toonShade(vec3 alb, vec3 n, vec3 l, vec3 v) {
  float d = dot(n, l);
  float lit = smoothstep(-0.05, 0.12, d);
  vec3 c = alb * mix(vec3(0.42, 0.42, 0.58), vec3(1.0, 0.97, 0.92), lit);
  c += alb * vec3(0.18, 0.22, 0.32) * max(n.y, 0.0);
  c += vec3(0.25, 0.3, 0.4) * pow(1.0 - max(dot(n, v), 0.0), 4.0) * 0.5;
  return c;
}`;function tt(r=14,t=3818070,a=1316898){const n=new I({uniforms:{uC0:{value:new d(t)},uC1:{value:new d(a)},uR:{value:r}},vertexShader:D,fragmentShader:`
uniform vec3 uC0, uC1;
uniform float uR;
varying vec3 vWp;
void main() {
  float r = length(vWp.xz);
  vec3 c = mix(uC0, uC1, smoothstep(0.0, uR, r));
  vec2 g = abs(fract(vWp.xz) - 0.5);
  c *= 1.0 - 0.12 * (1.0 - smoothstep(0.0, 0.03, min(g.x, g.y)));
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`}),s=new O(new R(r,64),n);return s.rotation.x=-Math.PI/2,s}function et(r,t,a=127){let n=0;for(let s=t;s<r.length;s+=4)r[s]>a&&n++;return n}class ot{constructor(t=!0){v(this,"rt",null);v(this,"buf",new Uint8Array(4));v(this,"w",1);v(this,"h",1);this.depth=t}ensure(t,a){var n;return t=Math.max(1,Math.floor(t)),a=Math.max(1,Math.floor(a)),this.rt&&t===this.w&&a===this.h?this.rt:((n=this.rt)==null||n.dispose(),this.w=t,this.h=a,this.rt=new V(t,a,{depthBuffer:this.depth,minFilter:g,magFilter:g}),this.buf=new Uint8Array(t*a*4),this.rt)}read(t){return this.rt?(t.readRenderTargetPixels(this.rt,0,0,this.w,this.h,this.buf),this.buf):this.buf}dispose(){var t;(t=this.rt)==null||t.dispose(),this.rt=null}}export{Y as C,ot as M,D as P,Z as T,et as a,X as b,K as c,tt as g,J as i};
