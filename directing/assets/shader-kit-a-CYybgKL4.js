var M=Object.defineProperty;var b=(e,t,s)=>t in e?M(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var x=(e,t,s)=>b(e,typeof t!="symbol"?t+"":t,s);import{W as v}from"./three.module-CEzfHhrp.js";import{s as y}from"./canvas-viewer-QtaWfmlz.js";import{G as k,t as d}from"./chart2d-DfgeckAJ.js";const R=(e,t,s,i)=>y(e.shared,t,s,()=>({t:0,dt:0}),(a,n)=>{a.dt=n,a.t+=a.dt});function L(e,t,s,i,a){e.position.set(t.x+a*Math.cos(i)*Math.sin(s),t.y+a*Math.sin(i),t.z+a*Math.cos(i)*Math.cos(s)),e.lookAt(t),e.updateMatrixWorld()}class W{constructor(t,s,i=!0){x(this,"rt");x(this,"buf");this.w=t,this.h=s,this.rt=new v(Math.max(1,t),Math.max(1,s),{depthBuffer:i}),this.buf=new Uint8Array(Math.max(1,t)*Math.max(1,s)*4)}resize(t,s){t=Math.max(1,Math.floor(t)),s=Math.max(1,Math.floor(s)),!(t===this.w&&s===this.h)&&(this.w=t,this.h=s,this.rt.setSize(t,s),this.buf=new Uint8Array(t*s*4))}read(t){return t.readRenderTargetPixels(this.rt,0,0,this.w,this.h,this.buf),this.buf}readRow(t,s){const i=Math.max(0,Math.min(this.h-1,Math.floor(s)));return t.readRenderTargetPixels(this.rt,0,i,this.w,1,this.buf),this.buf}readCol(t,s){const i=Math.max(0,Math.min(this.w-1,Math.floor(s)));return t.readRenderTargetPixels(this.rt,i,0,1,this.h,this.buf),this.buf}dispose(){this.rt.dispose()}}function C(e,t,s,i,a,n,o=0){const h=[],r=new Set(a);t.traverse(c=>{(c.isMesh||c.isPoints||c.isLine)&&!r.has(c)&&c.visible&&(c.visible=!1,h.push(c))});const l=t.background,u=t.overrideMaterial;t.background=null,t.overrideMaterial=n,e.setRenderTarget(i),e.setClearColor(o,1),e.clear(),e.render(t,s),e.setRenderTarget(null),t.overrideMaterial=u,t.background=l;for(const c of h)c.visible=!0}const H=`
vec3 skEnv(vec3 d, vec3 tint) {
  float y = d.y;
  vec3 c = mix(vec3(0.03, 0.035, 0.05), vec3(0.12, 0.14, 0.2) * tint, smoothstep(-0.2, 0.9, y));
  // 소프트박스 두 개
  vec3 b1 = normalize(vec3(0.6, 0.55, 0.6));
  vec3 b2 = normalize(vec3(-0.75, 0.35, -0.3));
  c += vec3(1.0, 0.95, 0.9) * 2.2 * smoothstep(0.93, 0.975, dot(d, b1));
  c += vec3(0.6, 0.75, 1.0) * 1.3 * smoothstep(0.95, 0.985, dot(d, b2));
  // 수평선 띠
  c += vec3(0.25, 0.18, 0.35) * exp(-abs(y) * 12.0) * 0.6;
  return c;
}`,f=(e,t)=>e.x+(t-e.x0)/(e.x1-e.x0||1)*e.w,m=(e,t)=>e.y+e.h-(Math.max(e.y0,Math.min(e.y1,t))-e.y0)/(e.y1-e.y0||1)*e.h;function G(e,t,s,i,a,n,o=h=>`${h}`){e.strokeStyle=k,e.lineWidth=1,e.strokeRect(t.x+.5,t.y+.5,t.w,t.h);for(const h of n){const r=m(t,h);e.beginPath(),e.moveTo(t.x,r+.5),e.lineTo(t.x+t.w,r+.5),e.stroke(),d(e,o(h),t.x-3,r+3,"#7d8799",9,"right")}for(const h of a)d(e,`${h}`,f(t,h),t.y+t.h+11,"#7d8799",9,"center");d(e,s,t.x,t.y-6,"#c8d0dc",10),d(e,i,t.x+t.w,t.y+t.h+22,"#7d8799",9,"right")}function _(e,t,s,i,a=1.6,n=[],o=80){e.strokeStyle=i,e.lineWidth=a,e.setLineDash(n),e.beginPath();let h=!1;for(let r=0;r<=o;r++){const l=t.x0+(t.x1-t.x0)*r/o,u=s(l);if(!Number.isFinite(u)){h=!1;continue}h?e.lineTo(f(t,l),m(t,u)):e.moveTo(f(t,l),m(t,u)),h=!0}e.stroke(),e.setLineDash([])}function z(e,t,s,i,a=2.6,n=!1){e.fillStyle=i,e.strokeStyle=i,e.lineWidth=1.2;for(let o=0;o+1<s.length;o+=2){const h=s[o],r=s[o+1];!Number.isFinite(h)||!Number.isFinite(r)||h<t.x0||h>t.x1||(e.beginPath(),e.arc(f(t,h),m(t,r),a,0,Math.PI*2),n?e.stroke():e.fill())}}function A(e,t){if(e>t*1.25){const i=(e-30)/2-36;return[{x:40,y:24,w:Math.max(20,i),h:Math.max(20,t-62)},{x:40+i+52,y:24,w:Math.max(20,i),h:Math.max(20,t-62)}]}const s=(t-30)/2-40;return[{x:40,y:22,w:Math.max(20,e-56),h:Math.max(20,s)},{x:40,y:22+s+52,w:Math.max(20,e-56),h:Math.max(20,s)}]}class N{constructor(t=120){x(this,"data",[]);this.max=t}push(t,s){this.data.push(t,s),this.data.length>this.max*2&&this.data.splice(0,this.data.length-this.max*2)}clear(){this.data.length=0}}const B=`
float skHash(ivec2 c) {
  uvec2 p = uvec2(c + 4096);
  uint h = p.x * 0x27d4eb2du ^ p.y * 0x165667b1u;
  h ^= h >> 15u;
  h *= 0x2c1b3c6du;
  h ^= h >> 12u;
  return float(h >> 8u) / 16777215.0;
}`;function D(e,t){const s=e+4096>>>0,i=t+4096>>>0;let a=(Math.imul(s,668265261)^Math.imul(i,374761393))>>>0;return a=(a^a>>>15)>>>0,a=Math.imul(a,739982445)>>>0,a=(a^a>>>12)>>>0,(a>>>8)/16777215}export{H as E,N as H,W as P,B as S,G as a,D as b,_ as c,z as d,L as o,C as r,A as s,R as u};
