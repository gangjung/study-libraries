var z=Object.defineProperty;var N=(t,e,s)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var A=(t,e,s)=>N(t,typeof e!="symbol"?e+"":e,s);import{a5 as V,a6 as C,v as E,x as O,S as U,M as X,P as G,V as y}from"./three.module-CEzfHhrp.js";const L=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;class W{constructor(e,s){A(this,"scene",new E);A(this,"cam",new O(-1,1,1,-1,0,1));A(this,"mat");A(this,"mesh");this.mat=new U({vertexShader:L,fragmentShader:e,uniforms:s,depthTest:!1,depthWrite:!1}),this.mesh=new X(new G(2,2),this.mat),this.mesh.frustumCulled=!1,this.scene.add(this.mesh)}get u(){return this.mat.uniforms}render(e,s){e.setRenderTarget(s),e.render(this.scene,this.cam)}dispose(){this.mesh.geometry.dispose(),this.mat.dispose()}}const $=t=>t.extensions.has("EXT_color_buffer_half_float")||t.extensions.has("EXT_color_buffer_float")?V:C,j=`
float xk_lat(ivec3 c) {
  uvec3 p = uvec3(c);
  uint h = (p.x * 0x8da6b343u) ^ (p.y * 0xd8163841u) ^ (p.z * 0xcb1ab31fu);
  h ^= h >> 13u;
  h *= 0x5bd1e995u;
  h ^= h >> 15u;
  return float(h >> 8u) / 16777215.0;
}
float xk_vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = p - i;
  vec3 u = f * f * (3.0 - 2.0 * f);
  ivec3 c = ivec3(i) + 1024;
  float a = mix(xk_lat(c), xk_lat(c + ivec3(1, 0, 0)), u.x);
  float b = mix(xk_lat(c + ivec3(0, 1, 0)), xk_lat(c + ivec3(1, 1, 0)), u.x);
  float d = mix(xk_lat(c + ivec3(0, 0, 1)), xk_lat(c + ivec3(1, 0, 1)), u.x);
  float e = mix(xk_lat(c + ivec3(0, 1, 1)), xk_lat(c + ivec3(1, 1, 1)), u.x);
  return mix(mix(a, b, u.y), mix(d, e, u.y), u.z);
}
float xk_fbm(vec3 p) {
  float s = 0.0, a = 0.5, n = 0.0;
  for (int i = 0; i < 4; i++) {
    s += a * xk_vnoise(p);
    n += a;
    p = p * 2.03 + vec3(17.1, 9.7, 3.3);
    a *= 0.5;
  }
  return s / n;
}`;function v(t,e,s){let o=(Math.imul(t,2376512323)^Math.imul(e,3625334849)^Math.imul(s,3407524639))>>>0;return o=(o^o>>>13)>>>0,o=Math.imul(o,1540483477)>>>0,o=(o^o>>>15)>>>0,(o>>>8)/16777215}const M=t=>t*t*(3-2*t),b=(t,e,s)=>t+(e-t)*s;function R(t,e,s){const o=Math.floor(t),r=Math.floor(e),u=Math.floor(s),f=M(t-o),l=M(e-r),S=M(s-u),a=o+1024,i=r+1024,c=u+1024,p=b(v(a,i,c),v(a+1,i,c),f),_=b(v(a,i+1,c),v(a+1,i+1,c),f),w=b(v(a,i,c+1),v(a+1,i,c+1),f),d=b(v(a,i+1,c+1),v(a+1,i+1,c+1),f);return b(b(p,_,l),b(w,d,l),S)}function q(t,e,s){let o=0,r=.5,u=0;for(let f=0;f<4;f++)o+=r*R(t,e,s),u+=r,t=t*2.03+17.1,e=e*2.03+9.7,s=s*2.03+3.3,r*=.5;return o/u}function D(t,e){let s=0,o=t.length;for(;s<o;){const r=s+o>>1;t[r]<e?s=r+1:o=r}return t.length?s/t.length:0}function J(t,e,s){const o=t.attributes.position,r=t.attributes.normal,u=t.index,f=u?u.count/3:o.count/3,l=(n,g)=>u?u.getX(n*3+g):n*3+g,S=new Float64Array(f),a=new y,i=new y,c=new y;let p=0;for(let n=0;n<f;n++)a.fromBufferAttribute(o,l(n,0)),i.fromBufferAttribute(o,l(n,1)),c.fromBufferAttribute(o,l(n,2)),p+=i.sub(a).cross(c.sub(a)).length()/2,S[n]=p;const _=new Float32Array(e*3),w=new Float32Array(e*3),d=new y,T=new y,P=new y;for(let n=0;n<e;n++){const g=s()*p;let m=0,B=f-1;for(;m<B;){const F=m+B>>1;S[F]<g?m=F+1:B=F}let h=s(),x=s();h+x>1&&(h=1-h,x=1-x);const k=1-h-x;a.fromBufferAttribute(o,l(m,0)),i.fromBufferAttribute(o,l(m,1)),c.fromBufferAttribute(o,l(m,2)),_[n*3]=a.x*k+i.x*h+c.x*x,_[n*3+1]=a.y*k+i.y*h+c.y*x,_[n*3+2]=a.z*k+i.z*h+c.z*x,d.fromBufferAttribute(r,l(m,0)),T.fromBufferAttribute(r,l(m,1)),P.fromBufferAttribute(r,l(m,2)),d.multiplyScalar(k).addScaledVector(T,h).addScaledVector(P,x).normalize(),w[n*3]=d.x,w[n*3+1]=d.y,w[n*3+2]=d.z}return{P:_,N:w,area:p}}const K=t=>Number.isFinite(t)?t.toFixed(1):"--",Q=t=>Number.isFinite(t)?t.toFixed(2):"--",Y=t=>Number.isFinite(t)?`${(t*100).toFixed(1)}%`:"--";export{j as N,W as P,Q as a,q as b,D as c,L as d,K as f,$ as h,Y as p,J as s,R as v};
