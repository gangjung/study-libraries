import{S as m,T as l,at as d,P as h,g as p,M as x,p as M}from"./three.module-BZgG6AUv.js";import{G as g}from"./glsl-DOwCk4-f.js";const w=`
varying vec3 vN; varying vec3 vW; varying vec2 vUv;
void main(){
  vUv = uv;
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,S=`
varying vec3 vN; varying vec3 vW; varying vec2 vUv;
${g}
vec3 skyEnv(vec3 d){
  float y = d.y;
  vec3 sky = mix(vec3(.55, .62, .72), vec3(.12, .3, .65), clamp(y, 0., 1.));
  vec3 gnd = mix(vec3(.25, .22, .2), vec3(.08, .07, .06), clamp(-y * 3., 0., 1.));
  vec3 c = y > 0. ? sky : gnd;
  // 창문 같은 밝은 사각 광원 두 개 (반사에서 하이라이트 모양이 보이게)
  vec2 a = vec2(atan(d.z, d.x), asin(clamp(d.y, -1., 1.)));
  if (abs(a.x - .8) < .25 && abs(a.y - .5) < .18) c += vec3(6., 5.6, 5.);
  if (abs(a.x + 2.2) < .12 && abs(a.y - .25) < .3) c += vec3(2., 3., 5.);
  return c;
}
`;function b(o,c,s={}){const a=[],e=(t,v,i,r,y)=>{const n=new x(t,c(new M(v),a.length));return n.position.set(i,r,y),o.add(n),a.push(n),n};if(e(new m(.9,96,48),14242639,-1.5,.9,0),e(new l(.55,.2,200,32),6003967,1.4,1,0),e(new d(.45,.6,16,32),14725200,0,.75,1.5),s.floor!==!1){const t=e(new h(10,10),9080728,0,0,0);t.rotation.x=-Math.PI/2}return{items:a,tick(t){a[1].rotation.y=t*.4,a[1].rotation.x=t*.25}}}function G(o,c,s=40){const a=c?o*.5:.7,e=s*Math.PI/180;return new p(Math.cos(a)*Math.cos(e),Math.sin(e),Math.sin(a)*Math.cos(e))}export{S as F,w as W,b,G as l};
