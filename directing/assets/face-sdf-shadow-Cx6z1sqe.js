import{V as G,ae as dt,af as ht,a6 as pt,L as K,C as E,aa as mt,S as Q,M as _,a as vt,b as Mt,c as V,G as tt,x as wt,W as xt,al as gt,D as yt,d as St,F as bt}from"./three.module-CEzfHhrp.js";import{m as Ft}from"./three-viewer-fx7lDL-0.js";import{m as Lt,b as et,s as kt}from"./canvas-viewer-QtaWfmlz.js";import{c as Nt,t as Y,l as Tt}from"./chart2d-DfgeckAJ.js";import{s as Dt,A as Ct,h as At,d as at,i as ot,c as nt}from"./anime-kit-C6AkWSFn.js";import{p as st}from"./extra-kit-c-FPjCbN4U.js";const k=1,N=1.18,$=.95,a=128,It=2.3,Pt=`
const float SX = ${k.toFixed(4)}, SY = ${N.toFixed(4)}, SZ = ${$.toFixed(4)};
float g2(vec2 p, vec2 c, vec2 s) { vec2 d = (p - c) / s; return exp(-dot(d, d)); }
float faceBump(vec2 p) {
  vec2 q = vec2(abs(p.x), p.y);
  return 0.20 * g2(p, vec2(0.0, -0.08), vec2(0.075, 0.2))
       + 0.08 * g2(p, vec2(0.0, -0.26), vec2(0.07, 0.06))
       + 0.05 * g2(q, vec2(0.33, 0.33), vec2(0.17, 0.07))
       - 0.09 * g2(q, vec2(0.35, 0.13), vec2(0.15, 0.1))
       + 0.06 * g2(q, vec2(0.52, -0.14), vec2(0.2, 0.17))
       - 0.03 * g2(p, vec2(0.0, -0.47), vec2(0.17, 0.045))
       + 0.03 * g2(p, vec2(0.0, -0.53), vec2(0.13, 0.05))
       + 0.04 * g2(p, vec2(0.0, -0.76), vec2(0.22, 0.13))
       + 0.02 * sin(13.0 * p.x + 3.0 * p.y) * sin(11.0 * p.y - 5.0 * p.x + 1.3)
       + 0.012 * sin(29.0 * p.x - 17.0 * p.y)
       + 0.008 * sin(41.0 * p.y + 23.0 * p.x + 0.7);
}
float faceH(vec2 p) {
  float r2 = dot(p, p);
  float f = clamp(1.0 - r2, 0.0, 1.0);
  return sqrt(max(1.0 - 0.985 * r2, 0.0)) + faceBump(p) * f * f;
}
vec3 faceN(vec2 p) {
  const float e = 0.003;
  float fx = (faceH(p + vec2(e, 0.0)) - faceH(p - vec2(e, 0.0))) / (2.0 * e);
  float fy = (faceH(p + vec2(0.0, e)) - faceH(p - vec2(0.0, e))) / (2.0 * e);
  return normalize(vec3(-SZ * fx / SX, -SZ * fy / SY, 1.0));
}`,C=(e,t,n,i,c,d)=>{const s=(e-n)/c,l=(t-i)/d;return Math.exp(-(s*s+l*l))};function it(e,t){const n=Math.abs(e);return .2*C(e,t,0,-.08,.075,.2)+.08*C(e,t,0,-.26,.07,.06)+.05*C(n,t,.33,.33,.17,.07)-.09*C(n,t,.35,.13,.15,.1)+.06*C(n,t,.52,-.14,.2,.17)-.03*C(e,t,0,-.47,.17,.045)+.03*C(e,t,0,-.53,.13,.05)+.04*C(e,t,0,-.76,.22,.13)+.02*Math.sin(13*e+3*t)*Math.sin(11*t-5*e+1.3)+.012*Math.sin(29*e-17*t)+.008*Math.sin(41*t+23*e+.7)}const lt=e=>{const t=Math.min(1,Math.max(0,1-e));return t*t},H=(e,t)=>Math.sqrt(Math.max(1-.985*(e*e+t*t),0))+it(e,t)*lt(e*e+t*t),ct=(e,t)=>$*(Math.sqrt(Math.max(1-(e*e+t*t),0))+it(e,t)*lt(e*e+t*t));function _t(e,t,n){const c=(H(e+.003,t)-H(e-.003,t))/.006,d=(H(e,t+.003)-H(e,t-.003))/(2*.003),s=-$*c/k,l=-$*d/N,f=Math.hypot(s,l,1);return n[0]=s/f,n[1]=l/f,n[2]=1/f,n}function Gt(e,t){const n=e-.24*Math.exp(-(((t+.1)/.2)**2))*Math.exp(-((e/.45)**2))+.08*t*t;return .5+Math.asin(Math.max(-1,Math.min(1,n)))/Math.PI*.94}let q=null;function j(){if(q)return q;const e=new Float32Array(a*a),t=new Uint8Array(a*a*4),n=new Uint8Array(a*a),i=new Float32Array(a*a*3),c=[0,0,0];let d=0;for(let s=0;s<a;s++)for(let l=0;l<a;l++){const f=(l+.5)/a*2-1,h=(s+.5)/a*2-1,u=s*a+l,o=Math.round(Gt(f,h)*255);e[u]=o/255,t[u*4]=o,t[u*4+1]=o,t[u*4+2]=o,t[u*4+3]=255,f*f+h*h<1&&(n[u]=1,d++),_t(f,h,c),i[u*3]=c[0],i[u*3+1]=c[1],i[u*3+2]=c[2]}return q={T:e,bytes:t,inD:n,nrm:i,tot:d},q}function Z(e,t,n){const i=j(),c=Math.atan2(t.x,t.z),d=Math.abs(c)/Math.PI;let s=0;for(let l=0;l<a;l++)for(let f=0;f<a;f++){const h=l*a+f;if(n&&(n[h]=0),!i.inD[h])continue;let u;e==="sdf"?u=d<i.T[l*a+(c>=0?f:a-1-f)]:u=i.nrm[h*3]*t.x+i.nrm[h*3+1]*t.y+i.nrm[h*3+2]*t.z>=0,u?s++:n&&(n[h]=1)}return s/Math.max(1,i.tot)}function $t(){const n=[0,0,ct(0,0)],i=[];for(let s=1;s<=48;s++)for(let l=0;l<128;l++){const f=s/48,h=2*Math.PI*l/128,u=f*Math.cos(h),o=f*Math.sin(h);n.push(k*u,N*o,ct(u,o))}const c=(s,l)=>1+(s-1)*128+l%128;for(let s=0;s<128;s++)i.push(0,c(1,s),c(1,s+1));for(let s=1;s<48;s++)for(let l=0;l<128;l++){const f=c(s,l),h=c(s,l+1),u=c(s+1,l),o=c(s+1,l+1);i.push(f,u,o,f,o,h)}const d=new St;return d.setAttribute("position",new bt(n,3)),d.setIndex(i),d.computeVertexNormals(),d}function zt(){const e=new V(1,48,32,Math.PI,Math.PI),t=e.attributes.position,n=e.attributes.normal,i=new G;for(let c=0;c<t.count;c++)i.fromBufferAttribute(t,c),t.setXYZ(c,i.x*k,i.y*N,i.z*$),i.set(i.x/k,i.y/N,i.z/$).normalize(),n.setXYZ(c,i.x,i.y,i.z);return e}const Rt=`
varying vec2 vXY;
void main() {
  vXY = position.xy / vec2(${k.toFixed(4)}, ${N.toFixed(4)});
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Bt=`
uniform vec3 uLl;
uniform float uMode, uMeas, uShowMap;
uniform sampler2D tMap;
uniform vec3 uLit, uShade;
varying vec2 vXY;
${Pt}
${Ct}
void main() {
  vec2 p = vXY;
  float hard, soft, T = 0.0;
  if (uMode < 0.5) {
    float d = dot(faceN(p), uLl);
    hard = step(0.0, d);
    soft = smoothstep(-0.015, 0.015, d);
  } else {
    float ph = atan(uLl.x, uLl.z);
    float a = abs(ph) / 3.14159265;
    vec2 uv = (p + 1.0) * 0.5;
    if (ph < 0.0) uv.x = 1.0 - uv.x;
    T = texture2D(tMap, uv).r;
    hard = T > a ? 1.0 : 0.0;
    soft = smoothstep(-0.004, 0.004, T - a);
  }
  if (uMeas > 0.5) { gl_FragColor = vec4(hard, 1.0, 0.0, 1.0); return; }
  vec3 col = mix(uShade, uLit, soft);
  // 경계 바로 안쪽의 따뜻한 띠 (셀 애니메이션의 "그림자 경계 색")
  col = mix(col, vec3(1.0, 0.62, 0.55), (soft - soft * soft) * 1.2);
  if (uShowMap > 0.5 && uMode > 0.5) col = mix(col, vec3(T, T * 0.9 + 0.1, 1.0 - T * 0.6), 0.55);
  vec4 f = animeFace(p, soft);
  col = mix(col, f.rgb, f.a);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Ut=`
varying vec3 vN;
void main() {
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Et=`
uniform vec3 uLw, uLit, uShade, uInner;
varying vec3 vN;
void main() {
  vec3 n = normalize(vN);
  if (!gl_FrontFacing) { gl_FragColor = vec4(uInner, 1.0);
    #include <colorspace_fragment>
    return; }
  float d = dot(n, uLw);
  vec3 col = mix(uShade, uLit, smoothstep(-0.02, 0.02, d));
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Xt=(e,t)=>kt(e.shared,"fsClock",t,()=>({t:0,phi:40}),(n,i)=>{n.t+=i,e.params.bool("auto",!0)?(n.phi+=i*e.params.num("speed",24),n.phi>180&&(n.phi-=360)):n.phi=e.params.num("angle",60)}),Yt=(e,t)=>e.params.bool("sway",!0)?14*Math.sin(t*.55):0;function rt(e){return t=>Ft(t,{antialias:!0,orbit:!1,fov:30,cam:[.8,.3,7.2],target:[0,-.12,0],far:120},({scene:n,camera:i,renderer:c})=>{n.background=null,n.add(Dt(16176095,9414886));const d=j(),s=new dt(d.bytes,a,a,ht,pt);s.minFilter=K,s.magFilter=K,s.needsUpdate=!0;const l={value:new G(0,0,1)},f={value:new G(0,0,1)},h={uLl:l,uMode:{value:e==="sdf"?1:0},uMeas:{value:0},uShowMap:{value:0},tMap:{value:s},uLit:{value:new E(16771290)},uShade:{value:new E(14917288)}},u=new mt;n.add(u);const o=new Q({vertexShader:Rt,fragmentShader:Bt,uniforms:h}),y=new _($t(),o);y.layers.enable(2),u.add(y);const g=(w,M,L=M,m=gt)=>new Q({vertexShader:Ut,fragmentShader:Et,side:m,uniforms:{uLw:f,uLit:{value:new E(w)},uShade:{value:new E(M)},uInner:{value:new E(L)}}});u.add(new _(zt(),g(16771290,14917288)));const B=new _(At({sx:k*1.08,sy:N*1.06,sz:$*1.12,front:.95,tips:1.32,side:2.05,back:2.35,strands:20}),g(7031962,3811160,2365498,yt));u.add(B);const X=new _(new vt(.3,.34,.9,24),g(16771290,14917288));X.position.set(0,-1.35,-.15),n.add(X);const A=new _(new Mt(.55,1.6,8,24),g(8368869,5009328));A.rotation.z=Math.PI/2,A.position.set(0,-2.1,-.2),n.add(A);const S=new _(new V(.09,16,10),new tt({color:16774048})),T=new _(new V(.2,16,10),new tt({color:16769126,transparent:!0,opacity:.3,depthWrite:!1}));S.add(T),n.add(S);const b=new wt(-k,k,N,-N,.1,30);b.layers.set(2);const z=new xt(a,a),p=new Uint8Array(a*a*4),F=new Uint8Array(a*a),I=new Uint8Array(a*a),U=new Int32Array(a*a),D=new G,r={lit:NaN,frags:0,thLit:NaN,thFrags:0,phiLocal:0,ok:!1};t.shared.set(`fs-meas-${e}`,r);let v=0;const x=w=>{b.position.set(10*Math.sin(w),0,10*Math.cos(w)),b.lookAt(0,0,0),b.updateMatrixWorld(),h.uMeas.value=1,c.setRenderTarget(z),c.setClearColor(0,1),c.clear(),c.render(n,b),c.readRenderTargetPixels(z,0,0,a,a,p),c.setRenderTarget(null),h.uMeas.value=0;let M=0,L=0;for(let m=0;m<a*a;m++)F[m]=0,!(p[m*4+1]<128)&&(M++,p[m*4]>127?L++:F[m]=1);r.ok=M>100,r.lit=L/Math.max(1,M),r.frags=nt(F,a,a,4,U),r.thLit=Z(e,D,I),r.thFrags=nt(I,a,a,4,U)};return{update(w,M,L){const m=Xt(t,L),P=t.params,O=P.num("elev",20)*Math.PI/180,W=m.phi*Math.PI/180;f.value.set(Math.sin(W)*Math.cos(O),Math.sin(O),Math.cos(W)*Math.cos(O));const R=Yt(t,m.t)*Math.PI/180;u.rotation.y=R;const ft=new G(Math.sin(R),0,Math.cos(R)),ut=new G(Math.cos(R),0,-Math.sin(R));D.set(f.value.dot(ut),f.value.y,f.value.dot(ft)),l.value.copy(D),h.uShowMap.value=P.bool("showMap",!1)?1:0,S.position.copy(f.value).multiplyScalar(It),r.phiLocal=Math.atan2(D.x,D.z)*180/Math.PI,v++%8===0&&x(R);const J=e==="sdf"?`얼굴 기준 φ ${at(r.phiLocal)} (xz만 사용)`:`얼굴 기준 φ ${at(r.phiLocal)} · 고도 ${P.num("elev",20).toFixed(0)}°`;if(!r.ok){t.hud(J);return}t.hud([J,`밝은 면적 측정 ${st(r.lit)} / 이론 ${st(r.thLit)}`,`그림자 조각 측정 ${ot(r.frags)} / 이론 ${ot(r.thFrags)}`].join(`
`))},dispose(){z.dispose(),s.dispose()}}})}function Ht(e){const t=j(),n=document.createElement("canvas");n.width=a,n.height=a;const i=n.getContext("2d"),c=i.createImageData(a,a),d=73,s=new Float32Array(d),l=new Float32Array(d),f=new G;let h=NaN;for(let o=0;o<d;o++){const y=(-180+360*o/(d-1))*Math.PI/180;s[o]=Z("sdf",f.set(Math.sin(y),0,Math.cos(y)),null)}let u=0;return Lt(e,()=>({draw(o,y,g){Nt(o,y,g);const B=e.shared.get("fs-meas-sdf"),X=e.shared.get("fs-meas-ndl"),A=e.params.num("elev",20);if(A!==h){h=A;const r=A*Math.PI/180;for(let v=0;v<d;v++){const x=(-180+360*v/(d-1))*Math.PI/180;l[v]=Z("ndl",f.set(Math.sin(x)*Math.cos(r),Math.sin(r),Math.cos(x)*Math.cos(r)),null)}}const S=B?B.phiLocal:0;if(u++%3===0){const r=Math.abs(S)/180;for(let v=0;v<a;v++)for(let x=0;x<a;x++){const w=v*a+x,M=((a-1-v)*a+x)*4;if(!t.inD[w]){c.data[M+3]=0;continue}const L=t.T[v*a+(S>=0?x:a-1-x)],m=L*255,P=r>=L;c.data[M]=P?m*.45+40:m,c.data[M+1]=P?m*.3+20:m*.92+10,c.data[M+2]=P?m*.55+90:m*.8,c.data[M+3]=255}i.putImageData(c,0,0)}const T=Math.max(10,Math.min(g-40,y*.42)),b=10,z=Math.max(26,(g-T)/2-6);o.imageSmoothingEnabled=!0,o.drawImage(n,b,z,T,T),Y(o,`임계값 맵 T (${S>=0?"오른쪽 빛":"왼쪽 빛 → 거울"})`,b,z+T+12,"#c8d0dc",9);const p={x:b+T+34,y:24,w:et(y-T-56,20),h:et(g-52,20)},F=r=>p.x+(r+180)/360*p.w,I=r=>p.y+p.h-r*p.h;o.strokeStyle="#1c2230",o.strokeRect(p.x+.5,p.y+.5,p.w,p.h);for(const r of[-180,-90,0,90,180])Y(o,`${r}`,F(r),p.y+p.h+11,"#7d8799",9,"center");for(const r of[0,.5,1])Y(o,`${r*100}%`,p.x-4,I(r)+3,"#7d8799",9,"right");const U=(r,v,x)=>{o.strokeStyle=v,o.lineWidth=x,o.beginPath();for(let w=0;w<d;w++){const M=F(-180+360*w/(d-1));w?o.lineTo(M,I(r[w])):o.moveTo(M,I(r[w]))}o.stroke(),o.lineWidth=1};U(l,"#9aa3b2",1.4),U(s,"#ff9a3c",2),o.strokeStyle="#4ade80",o.setLineDash([3,3]),o.beginPath(),o.moveTo(F(S),p.y),o.lineTo(F(S),p.y+p.h),o.stroke(),o.setLineDash([]);const D=(r,v)=>{!r||!r.ok||(o.fillStyle=v,o.beginPath(),o.arc(F(r.phiLocal),I(r.lit),4,0,Math.PI*2),o.fill())};D(X,"#e6e9ef"),D(B,"#ffd166"),Y(o,"밝은 면적 vs 얼굴 기준 빛 각도 φ",p.x,14,"#c8d0dc",10),Tt(o,[{label:"N·L 이론",color:"#9aa3b2"},{label:"SDF 이론",color:"#ff9a3c"},{label:"측정 점",color:"#ffd166"}],p.x,g-4,9),e.hud("")}}))}const Jt={layout:"compare",intro:'애니풍 셰이더에서 얼굴은 가장 까다로운 부위입니다. 코·눈두덩·광대의 작은 굴곡 때문에 <b>N·L 툰 셰이딩</b>을 그대로 쓰면 빛이 조금만 움직여도 그림자가 얼룩덜룩 조각나 "더러운 얼굴"이 됩니다. <b>얼굴 SDF 그림자</b>는 법선을 아예 버리고, 아티스트가 "빛이 몇 도일 때 이 텍셀이 밝아지는지"를 그려 둔 <b>임계값 맵</b>을 빛 각도와 비교합니다. 그림자 경계가 늘 한 줄로, 그림처럼 움직입니다.',how:["빛 방향을 얼굴의 forward/right 벡터에 투영해 xz 평면 각도 <code>φ = atan2(L·right, L·forward)</code>를 구한다 (머리가 돌아도 얼굴 기준). 위아래 성분은 버린다.",'맵은 "오른쪽에서 오는 빛" 0~180°만 담는다. 텍셀 값 T = 그 텍셀이 아직 밝은 최대 |φ|/180°. 판정: <code>|φ|/π &lt; T(u′, v)</code>, 왼쪽 빛이면 <code>u′ = 1 − u</code>로 거울 샘플.',"이 페이지의 맵은 JS로 절차 생성: 행마다 x에 대해 단조인 필드 + 코 옆으로 그림자가 먼저 들어오는 코 모양 혹 → 어느 각도에서도 경계는 한 줄. 실무에서는 여러 각도의 손그림 그림자를 SDF로 바꿔 보간해 만든다.",'측정: 얼굴만 얼굴 정면 직교 카메라로 128×128(맵 텍셀과 1:1)에 "밝음·얼굴" 마스크로 그려 GPU에서 읽고, 밝은 픽셀 비율과 그늘의 4-연결 조각 수를 센다. 이론은 같은 텍셀 격자에서 CPU로 같은 판정을 한 값.'],pros:["그림자 모양을 아티스트가 직접 디자인한다: 코 그림자, 볼 경계선 위치를 원화 그대로 재현.","빛이 돌아도 경계가 한 줄로 부드럽게 쓸려 가 깜빡임·얼룩이 없다 (조각 수 1).","텍스처 한 장 + 샘플 한 번이라 싸다. 법선 편집(노멀 전송) 같은 메시 작업도 필요 없다."],cons:["빛의 위아래 성분을 무시해 머리 위에서 내리쬐는 빛, 아래에서 비추는 공포 조명은 표현하지 못한다.","얼굴 전용 맵이라 표정(입 벌림, 찡그림)으로 형태가 바뀌어도 그림자는 그대로다.","맵 해상도·필터링이 부족하면 경계가 계단처럼 보이고, 좌우 거울 사용 탓에 비대칭 얼굴엔 맵이 두 장 필요하다."],usedIn:"〈원신〉·〈붕괴: 스타레일〉 같은 애니풍 3D 게임에서 얼굴 그림자를 임계값(SDF) 맵으로 처리하는 방식이 널리 알려져 있고, 애니풍 툰 셰이더 에셋에도 표준 기능처럼 들어갑니다. 구체적인 맵 제작법은 게임마다 다릅니다.",tips:["경계는 <code>smoothstep(T − a ± w)</code>로 살짝 부드럽게 하되, w를 <code>fwidth(T − a)</code> 기준 1~2픽셀로 잡으면 화면 해상도와 무관하게 계단·번짐이 없다.","빛이 거의 머리 위·아래라 xz 성분 길이가 0에 가까우면 φ = atan2가 크게 튄다. 그 길이가 0.1~0.2 아래로 떨어지면 그림자 대비를 줄이거나 직전 φ를 유지한다.","8비트 맵이면 각도 해상도가 180°/255 ≈ 0.7°다. 블록 압축(BC1 등)은 경계를 떨리게 하므로 단채널 BC4나 비압축을 쓴다.",'판정 경계 바로 안쪽에 채도 높은 살구색 띠를 섞으면(이 페이지의 따뜻한 띠) 셀화의 "그림자 경계 색" 느낌이 산다. 몸·머리카락은 일반 툰 셰이딩, 얼굴만 SDF로 나눠 쓴다.'],related:["cel-shading","rim-light","angel-ring","subsurface-skin","three-point-lighting"],controls:[{type:"toggle",key:"auto",label:"빛 자동 회전",value:!0},{type:"range",key:"speed",label:"회전 속도 (°/s)",min:5,max:90,step:1,value:24},{type:"range",key:"angle",label:"빛 각도 φ (°, 자동 끔일 때)",min:-180,max:180,step:1,value:60},{type:"range",key:"elev",label:"빛 고도 (°, N·L에만 영향)",min:0,max:60,step:1,value:20},{type:"toggle",key:"sway",label:"머리 좌우 흔들기",value:!0},{type:"toggle",key:"showMap",label:"SDF 맵 겹쳐 보기",value:!1}],viewers:[{title:"N·L 툰 (법선 그대로)",kind:"before",caption:"같은 얼굴을 법선으로 2단 툰 셰이딩했습니다. 눈두덩·코·볼의 굴곡마다 그림자가 섬처럼 생겨 조각 수가 늘어납니다.",mount:rt("ndl")},{title:"얼굴 SDF 그림자",kind:"after",caption:"빛 각도와 임계값 맵만 비교합니다. 경계가 한 줄로 얼굴을 쓸고 지나가며, 측정된 밝은 면적이 맵 텍셀 비율과 일치합니다.",mount:rt("sdf")},{title:"임계값 맵 · 밝은 면적 곡선",kind:"info",caption:"왼쪽: 현재 빛 쪽으로 거울 처리한 임계값 맵(보라 = 그늘). 오른쪽: φ에 따른 밝은 면적 이론 곡선(주황 = SDF, 회색 = N·L)과 GPU 측정 점(노랑 = SDF, 흰색 = N·L). SDF 곡선은 |φ|가 커질수록 단조롭게 줄어듭니다.",wide:!0,mount:Ht}]};export{Jt as default};
