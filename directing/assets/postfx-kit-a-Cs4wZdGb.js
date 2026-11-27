import{G as s,C as l}from"./three.module-CEzfHhrp.js";import{s as f}from"./canvas-viewer-QtaWfmlz.js";const x=`
vec3 pfxHableF(vec3 x) {
  const float A = 0.15, B = 0.50, C = 0.10, D = 0.20, E = 0.02, F = 0.30;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}
vec3 pfxTone(vec3 x, int op) {
  x = max(x, vec3(0.0));
  if (op == 0) return min(x, vec3(1.0));
  if (op == 1) return x / (1.0 + x);
  if (op == 2) return clamp(pfxHableF(x * 2.0) / pfxHableF(vec3(11.2)), 0.0, 1.0);
  vec3 y = x * 0.6;
  return clamp((y * (2.51 * y + 0.03)) / (y * (2.43 * y + 0.59) + 0.14), 0.0, 1.0);
}
vec3 pfxSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(vec3(0.0031308), c));
}
float pfxLum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
/** 값 v ∈ [0,1)을 8비트 두 채널에 나눠 담아 약 16비트 정밀도로 읽는다 */
vec2 pfxPack(float v) {
  v = clamp(v, 0.0, 0.99998);
  float a = floor(v * 255.0) / 255.0;
  return vec2(a, (v - a) * 255.0);
}`,o=t=>(t*(.15*t+.1*.5)+.2*.02)/(t*(.15*t+.5)+.2*.3)-.02/.3,m=o(11.2),c=t=>Math.min(1,Math.max(0,t)),h=["Linear clamp","Reinhard","Hable 필믹","ACES 피팅"];function M(t,a){if(t=Math.max(0,t),a===0)return Math.min(t,1);if(a===1)return t/(1+t);if(a===2)return c(o(t*2)/m);const e=t*.6;return c(e*(2.51*e+.03)/(e*(2.43*e+.59)+.14))}const E=t=>(t=c(t),t<.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055),F=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),S=(t,a)=>(t+a/255)/255;function b(t,a){return new s({color:new l(t).multiplyScalar(a)})}const A=(t,a,e)=>f(t.shared,a,e,()=>({t:0}),(r,n)=>r.t+=n),C=(t,a,e,r=1.5,n=1)=>({W:Math.max(1,Math.floor(t*Math.min(e,r)/n)),H:Math.max(1,Math.floor(a*Math.min(e,r)/n))});export{x as T,h as a,E as b,b as g,A as p,C as r,F as s,M as t,S as u};
