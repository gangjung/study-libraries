import{V as f,C as d,ap as p,aq as w}from"./three.module-CEzfHhrp.js";import{s as S}from"./canvas-viewer-QtaWfmlz.js";import{t as M}from"./chart2d-DfgeckAJ.js";const N=`
vec3 acesTone(vec3 c) { return clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), 0.0, 1.0); }`,G=`
vec4 packUnit(float v) {
  v = clamp(v, 0.0, 0.99999);
  vec3 e = fract(v * vec3(1.0, 255.0, 65025.0));
  e.xy -= e.yz / 255.0;
  return vec4(e, 1.0);
}`,E=(t,e)=>t[e]/255+t[e+1]/65025+t[e+2]/16581375,T=(t,e,n)=>{const o=Math.min(1,Math.max(0,(n-t)/(e-t)));return o*o*(3-2*o)},k=`
in vec3 position;
in vec3 normal;
uniform mat4 modelViewMatrix, projectionMatrix;
uniform mat3 normalMatrix;
out vec3 vN;
void main() {
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,P=`
precision highp float;
uniform vec3 uAlbedo;
uniform float uEmit;
in vec3 vN;
layout(location = 0) out vec4 gAlbedo;
layout(location = 1) out vec4 gNormal;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) n = -n;
  gAlbedo = vec4(uAlbedo, uEmit);
  gNormal = vec4(n * 0.5 + 0.5, 1.0);
}`;function V(t,e=0){const n=t instanceof d?t.clone():new d(t);return new p({glslVersion:w,vertexShader:k,fragmentShader:P,uniforms:{uAlbedo:{value:new f(n.r,n.g,n.b)},uEmit:{value:e}}})}function b(t){t.traverse(e=>{const n=e;if(!n.isMesh)return;const o=n.material;n.material=V(o.color??new d(16777215)),o.dispose()})}const u=new f,h=new f,v=new f;function z(t,e,n){const o=n.map(i=>e.dot(u.subVectors(i,t)));let a=n;if(o.some(i=>i<1e-9)){a=[];for(let i=0;i<n.length;i++){const l=(i+1)%n.length,c=o[i],m=o[l];c>=1e-9&&a.push(n[i]),c>=1e-9!=m>=1e-9&&a.push(n[i].clone().lerp(n[l],(c-1e-9)/(c-m)))}if(a.length<3)return 0}let s=0;for(let i=0;i<a.length;i++){u.subVectors(a[i],t).normalize(),h.subVectors(a[(i+1)%a.length],t).normalize();const l=Math.acos(Math.min(1,Math.max(-1,u.dot(h))));v.crossVectors(u,h);const c=v.length();c<1e-9||(s+=l*e.dot(v)/c)}return Math.abs(s)/(2*Math.PI)}const C=(t,e,n,o="pan")=>S(t.shared,e,n,()=>({t:0}),(a,s)=>{t.params.bool(o,!0)&&(a.t+=s)});function F(t,e,n,o,a,s,i,l){const c=r=>e.x+(r-n[0])/(n[1]-n[0])*e.w,m=r=>e.y+e.h-(Math.min(o[1],Math.max(o[0],r))-o[0])/(o[1]-o[0])*e.h;t.strokeStyle="#1c2230",t.lineWidth=1;for(const r of s)t.beginPath(),t.moveTo(e.x,Math.round(m(r))+.5),t.lineTo(e.x+e.w,Math.round(m(r))+.5),t.stroke(),M(t,l(r),e.x-3,m(r)+3,"#7d8799",9,"right");for(const r of a)M(t,i(r),c(r),e.y+e.h+11,"#7d8799",9,"center");return t.strokeStyle="#2a3242",t.strokeRect(e.x+.5,e.y+.5,e.w,e.h),{X:c,Y:m}}function W(t,e,n,o=1.6,a=[]){e.length<2||(t.strokeStyle=n,t.lineWidth=o,t.setLineDash(a),t.beginPath(),e.forEach(([s,i],l)=>l?t.lineTo(s,i):t.moveTo(s,i)),t.stroke(),t.setLineDash([]),t.lineWidth=1)}function j(t,e,n,o,a=3,s=!1){!Number.isFinite(e)||!Number.isFinite(n)||(t.beginPath(),t.arc(e,n,a,0,Math.PI*2),s?(t.strokeStyle=o,t.lineWidth=1.5,t.stroke(),t.lineWidth=1):(t.fillStyle=o,t.fill()))}export{N as A,G as P,F as a,W as b,j as d,z as f,V as g,C as p,T as s,b as t,E as u};
