import{S as z,C as M,B as P,M as A,c as w,V as g,d as q,F as v}from"./three.module-CEzfHhrp.js";const S=t=>Number.isFinite(t)?`${Math.round(t)}`:"--",C=(t,e=0)=>Number.isFinite(t)?`${t>=0?"+":""}${t.toFixed(e)}°`:"--",F=(t,e,i)=>{const a=Math.min(1,Math.max(0,(i-t)/(e-t)));return a*a*(3-2*a)};function I(t,e){const i=((e/(2*Math.PI)*t.strands+(t.phase??0))%1+1)%1,a=1-Math.abs(2*i-1),r=t.front+(t.tips-t.front)*Math.pow(a,.6),n=Math.abs(e),h=Math.exp(-(((n-Math.PI*.5)/.42)**2)),l=F(Math.PI*.55,Math.PI*.85,n);let o=r+(t.side-r)*h;return o=o+(t.back-o)*l,o}function G(t){const e=t.segPhi??216,i=t.segT??24,a=[],r=[],n=[],h=[];for(let c=0;c<=e;c++){const s=-Math.PI+2*Math.PI*c/e,m=I(t,s);for(let p=0;p<=i;p++){const x=p/i,u=Math.max(.001,x*m),d=Math.sin(u)*Math.sin(s),y=Math.cos(u),b=Math.sin(u)*Math.cos(s);a.push(d*t.sx,y*t.sy,b*t.sz);const f=new g(d/t.sx,y/t.sy,b/t.sz).normalize();r.push(f.x,f.y,f.z),n.push(c/e,x)}}const l=i+1;for(let c=0;c<e;c++)for(let s=0;s<i;s++){const m=c*l+s,p=(c+1)*l+s;h.push(m,m+1,p,p,m+1,p+1)}const o=new q;return o.setAttribute("position",new v(a,3)),o.setAttribute("normal",new v(r,3)),o.setAttribute("uv",new v(n,2)),o.setIndex(h),o}function N(t,e,i,a=64,r=40){const n=new w(1,a,r),h=n.attributes.position,l=n.attributes.normal,o=new g;for(let c=0;c<h.count;c++)o.fromBufferAttribute(h,c),h.setXYZ(c,o.x*t,o.y*e,o.z*i),o.set(o.x/t,o.y/e,o.z/i).normalize(),l.setXYZ(c,o.x,o.y,o.z);return n}const T=`
vec4 animeFace(vec2 p, float lit) {
  vec4 o = vec4(0.0);
  vec2 q = vec2(abs(p.x), p.y);
  float aa = 0.012;
  // 홍조
  float bl = exp(-dot((q - vec2(0.5, -0.2)) / vec2(0.15, 0.07), (q - vec2(0.5, -0.2)) / vec2(0.15, 0.07)));
  o = vec4(vec3(1.0, 0.45, 0.5), bl * 0.35);
  // 눈 (타원)
  vec2 e = (q - vec2(0.36, 0.06)) / vec2(0.12, 0.16);
  float ed = length(e);
  float eye = 1.0 - smoothstep(1.0 - aa * 8.0, 1.0, ed);
  vec3 iris = mix(vec3(0.62, 0.36, 0.95), vec3(0.16, 0.08, 0.28), smoothstep(-0.6, 0.7, e.y));
  float pupil = 1.0 - smoothstep(0.42, 0.48, length(e * vec2(1.25, 0.95)));
  iris = mix(iris, vec3(0.08, 0.03, 0.12), pupil * 0.8);
  vec2 hl = (q - vec2(0.36 + 0.035 * sign(p.x), 0.12)) / vec2(0.035, 0.045);
  iris = mix(iris, vec3(1.0), 1.0 - smoothstep(0.8, 1.0, length(hl)));
  vec2 hl2 = (q - vec2(0.36 - 0.03 * sign(p.x), -0.02)) / vec2(0.02, 0.018);
  iris = mix(iris, vec3(1.0), (1.0 - smoothstep(0.7, 1.0, length(hl2))) * 0.8);
  o = mix(o, vec4(iris, 1.0), eye);
  // 윗눈꺼풀 (두꺼운 선)
  float lid = smoothstep(0.86, 0.95, ed) * (1.0 - smoothstep(1.12, 1.2, ed)) * smoothstep(-0.05, 0.35, e.y);
  o = mix(o, vec4(0.12, 0.06, 0.12, 1.0), lid);
  // 눈썹
  float by = 0.3 + 0.03 * cos((q.x - 0.36) * 6.0);
  float brow = (1.0 - smoothstep(0.012, 0.022, abs(p.y - by))) * (1.0 - smoothstep(0.1, 0.13, abs(q.x - 0.37)));
  o = mix(o, vec4(0.25, 0.15, 0.2, 1.0), brow);
  // 입
  float my = -0.5 + 0.06 * (1.0 - (p.x / 0.08) * (p.x / 0.08));
  float mouth = (1.0 - smoothstep(0.008, 0.016, abs(p.y - my))) * (1.0 - smoothstep(0.07, 0.085, abs(p.x)));
  o = mix(o, vec4(0.55, 0.2, 0.25, 1.0), mouth);
  o.rgb *= mix(0.82, 1.0, lit);
  return o;
}`;function _(t,e,i,a,r,n,h){n.setFromMatrixPosition(t.matrixWorld),h.set((e+.5)/a*2-1,(i+.5)/r*2-1,.5).unproject(t).sub(n).normalize()}function j(t,e,i,a){const r=t.x-i.x,n=t.y-i.y,h=t.z-i.z,l=r*e.x+n*e.y+h*e.z,o=r*r+n*n+h*h-a*a,c=l*l-o;if(c<0)return-1;const s=-l-Math.sqrt(c);return s>0?s:-1}function E(t,e,i,a=4,r=new Int32Array(e*i)){const n=new Uint8Array(e*i);let h=0;for(let l=0;l<e*i;l++){if(!t[l]||n[l])continue;let o=0;r[o++]=l,n[l]=1;let c=0;for(;o>0;){const s=r[--o];c++;const m=s%e,p=(s-m)/e;m>0&&t[s-1]&&!n[s-1]&&(n[s-1]=1,r[o++]=s-1),m<e-1&&t[s+1]&&!n[s+1]&&(n[s+1]=1,r[o++]=s+1),p>0&&t[s-e]&&!n[s-e]&&(n[s-e]=1,r[o++]=s-e),p<i-1&&t[s+e]&&!n[s+e]&&(n[s+e]=1,r[o++]=s+e)}c>=a&&h++}return h}function V(t,e,i=60){const a=new z({side:P,depthWrite:!1,uniforms:{uB:{value:new M(t)},uT:{value:new M(e)}},vertexShader:"varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 uB, uT; varying vec3 vP;
      void main(){ float t = clamp(normalize(vP).y * 0.5 + 0.5, 0.0, 1.0); gl_FragColor = vec4(mix(uB, uT, smoothstep(0.3, 0.8, t)), 1.0);
      #include <colorspace_fragment>
      }`}),r=new A(new w(i,24,12),a);return r.renderOrder=-1,r}export{T as A,I as a,E as c,C as d,N as e,G as h,S as i,_ as p,j as r,V as s};
