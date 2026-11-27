import{k as K,W as D,V as c,am as H,a7 as B,P as X,h as P,c as Y,z as J,a as G,M as Q}from"./three.module-CEzfHhrp.js";import{m as ee}from"./three-viewer-fx7lDL-0.js";import{m as oe,b as W,a as te}from"./canvas-viewer-QtaWfmlz.js";import{c as ae,t as $,l as re}from"./chart2d-DfgeckAJ.js";import{P as F,a as R}from"./extra-kit-c-FPjCbN4U.js";import{m as ne}from"./extra-kit-a-8XGxWFZS.js";import{A as ue,p as se,a as le,b as I,d as ce,t as ie,g as ve,s as de}from"./gfx-kit-d-CaswdL74.js";const M=16,m=25,N=-2,U=.8,Z=.02,y=1.2,fe=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];function pe(){const r=te(5),e=[];for(let f=0;f<M;f++){const t=Math.max(.03,r()),a=r()*Math.PI*2,o=Math.sqrt(1-t*t),s=Math.cbrt((f+r())/M);e.push(new c(o*Math.cos(a)*s,o*Math.sin(a)*s,t*s))}return e}const L=pe(),E=fe.map(r=>{const e=2*Math.PI*(r+.5)/16;return new K(Math.cos(e),Math.sin(e))}),me=`
#include <packing>
uniform sampler2D tDepth, tNormal;
uniform mat4 uProj;
uniform vec3 uKernel[${M}];
uniform vec2 uNoise[16];
uniform float uRadius, uBias, uNear, uFar, uProbe;
uniform vec3 uPA, uPB, uPN;
varying vec2 vUv;
float viewZAt(vec2 uv) { return perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
vec3 viewPos(vec2 uv, float z) { return vec3((uv * 2.0 - 1.0) * (-z) / vec2(uProj[0][0], uProj[1][1]), z); }
float occlusion(vec3 P, vec3 N, int ni) {
  vec2 cs = uNoise[ni];
  vec3 a = abs(N.z) < 0.9 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
  vec3 T0 = normalize(cross(a, N));
  vec3 B0 = cross(N, T0);
  vec3 T = cs.x * T0 + cs.y * B0;
  vec3 B = cross(N, T);
  float occ = 0.0;
  for (int i = 0; i < ${M}; i++) {
    vec3 k = uKernel[i];
    vec3 S = P + (T * k.x + B * k.y + N * k.z) * uRadius;
    vec4 c = uProj * vec4(S, 1.0);
    vec2 suv = c.xy / c.w * 0.5 + 0.5;
    float sz = viewZAt(suv);
    float rc = smoothstep(0.0, 1.0, uRadius / max(abs(P.z - sz), 1e-5));
    occ += (sz >= S.z + uBias ? 1.0 : 0.0) * rc;
  }
  return occ / float(${M});
}
void main() {
  if (uProbe > 0.5) {
    float t = floor(gl_FragCoord.x) / float(${m-1});
    int ni = int(gl_FragCoord.y);
    float o = occlusion(mix(uPA, uPB, t), uPN, ni);
    gl_FragColor = vec4(o, o, o, 1.0);
    return;
  }
  float d = texture2D(tDepth, vUv).x;
  if (d >= 1.0) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  vec3 P = viewPos(vUv, perspectiveDepthToViewZ(d, uNear, uFar));
  vec3 N = normalize(texture2D(tNormal, vUv).xyz * 2.0 - 1.0);
  ivec2 q = ivec2(gl_FragCoord.xy) % 4;
  float o = occlusion(P, N, q.x + 4 * q.y);
  gl_FragColor = vec4(o, o, o, 1.0);
}`,he=`
#include <packing>
uniform sampler2D tAO, tDepth;
uniform vec2 uTexel;
uniform float uNear, uFar;
varying vec2 vUv;
float vz(vec2 uv) { return perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
void main() {
  float zc = vz(vUv);
  float s = 0.0, w = 0.0;
  for (int j = -2; j < 2; j++) for (int i = -2; i < 2; i++) {
    vec2 uv = vUv + vec2(float(i), float(j)) * uTexel;
    float k = exp(-abs(vz(uv) - zc) * 6.0);
    s += texture2D(tAO, uv).r * k;
    w += k;
  }
  float o = s / max(w, 1e-4);
  gl_FragColor = vec4(o, o, o, 1.0);
}`,xe=`
#include <packing>
uniform sampler2D tAlbedo, tNormal, tDepth, tAO;
uniform mat4 uProj, uCamWorld;
uniform vec3 uSunV, uUpV;
uniform float uMode, uShow, uStrength, uNear, uFar;
varying vec2 vUv;
${ue}
void main() {
  float d = texture2D(tDepth, vUv).x;
  vec3 vdir = normalize(vec3((vUv * 2.0 - 1.0) / vec2(uProj[0][0], uProj[1][1]), -1.0));
  vec3 wdir = normalize((uCamWorld * vec4(vdir, 0.0)).xyz);
  if (d >= 1.0) {
    vec3 sky = mix(vec3(0.62, 0.66, 0.72), vec3(0.32, 0.45, 0.68), clamp(wdir.y * 1.6, 0.0, 1.0));
    gl_FragColor = vec4(acesTone(sky), 1.0);
    #include <colorspace_fragment>
    return;
  }
  vec3 alb = texture2D(tAlbedo, vUv).rgb;
  vec3 N = normalize(texture2D(tNormal, vUv).xyz * 2.0 - 1.0);
  float occ = uMode > 0.5 ? texture2D(tAO, vUv).r : 0.0;
  float ao = 1.0 - occ * uStrength;
  float up = dot(N, uUpV) * 0.5 + 0.5;
  vec3 amb = alb * mix(vec3(0.26, 0.22, 0.19), vec3(0.78, 0.86, 1.0), up) * 1.0;
  vec3 dir = alb * vec3(1.0, 0.9, 0.75) * max(dot(N, uSunV), 0.0) * 0.45;
  vec3 col = uMode < 0.5 ? amb + dir : uMode < 1.5 ? (amb + dir) * ao : amb * ao + dir;
  if (uShow > 0.5 && uMode > 0.5) col = vec3(ao * ao);
  gl_FragColor = vec4(acesTone(col * 0.85), 1.0);
  #include <colorspace_fragment>
}`;function we(r){const e=(a,o,s,i,p,v=0)=>{const n=new Q(a,ve(o));return n.position.set(s,i,p),n.rotation.y=v,r.add(n),n},f=e(new X(26,26),9406331,0,0,0);f.rotation.x=-Math.PI/2,e(new P(.4,2.6,8),11050640,N-.2,1.3,-.5),e(new P(6.4,2.6,.4),10261380,.8,1.3,-4.2);for(let a=0;a<4;a++)e(new P(1.4,.3*(a+1),.55),8748144,3.2,.15*(a+1),-3.72+a*.55);e(new P(.7,.7,.7),10124124,-1.3,.35,-3.4,.2),e(new P(.45,.45,.45),11045480,-.6,.225,-3.55,-.4),e(new Y(.6,40,24),9414600,1.4,.6,-2),e(new J(.32,.11,120,16),13671018,.2,.55,-2.6),e(new G(.28,.28,2.4,28),13156532,3.9,1.2,1.6),e(new P(.8,.2,.8),11577500,3.9,.1,1.6),e(new P(1.6,.1,.5),8022616,.7,.48,-.9,.15);for(const a of[-.65,.65])e(new P(.1,.43,.42),6181446,.7+a*Math.cos(.15),.215,-.9-a*Math.sin(.15),.15);for(const[a,o]of[[-1.35,-2.4],[-.75,-2.05],[-1.4,-1.55]])e(new G(.28,.3,.85,24),8227434,a,.425,o);const t=ne(7312096);ie(t),t.position.set(2.5,0,-.4),t.rotation.y=-.6,r.add(t)}function Ae(r,e,f){const t=r.matrixWorldInverse,a=new c(N+e,0,U).applyMatrix4(t),o=new c(0,1,0).transformDirection(t),s=new c(N,0,0).applyMatrix4(t),i=new c(1,0,0).transformDirection(t),p=Math.abs(o.z)<.9?new c(0,0,1):new c(1,0,0),v=new c().crossVectors(p,o).normalize(),n=new c().crossVectors(o,v),u=new c,x=new c,h=new c,S=new c,T=i.dot(s);let g=0;for(const z of E){u.copy(v).multiplyScalar(z.x).addScaledVector(n,z.y),x.crossVectors(o,u);for(const l of L){if(h.copy(a).addScaledVector(u,l.x*f).addScaledVector(x,l.y*f).addScaledVector(o,l.z*f),S.copy(h).applyMatrix4(r.matrixWorld),S.x>=N)continue;const w=h.z*(T/i.dot(h));if(w<h.z+Z)continue;const d=Math.abs(a.z-w);g+=d<1e-5?1:de(0,1,f/d)}}return g/(M*16)}const q=r=>r>=1?0:(1-r)*(1-r)*(2+r)/4;function C(r){return e=>ee(e,{antialias:!1,orbit:!1,fov:50,cam:[3.6,2.6,6.2],near:.1,far:60},({scene:f,camera:t,renderer:a})=>{we(f);let o=null,s=null,i=null;const p=new D(m,16),v=new Uint8Array(m*16*4),n=new F(me,{tDepth:{value:null},tNormal:{value:null},uProj:{value:t.projectionMatrix},uKernel:{value:L},uNoise:{value:E},uRadius:{value:.8},uBias:{value:Z},uNear:{value:t.near},uFar:{value:t.far},uProbe:{value:0},uPA:{value:new c},uPB:{value:new c},uPN:{value:new c}}),u=new F(he,{tAO:{value:null},tDepth:{value:null},uTexel:{value:new K},uNear:{value:t.near},uFar:{value:t.far}}),x=new F(xe,{tAlbedo:{value:null},tNormal:{value:null},tDepth:{value:null},tAO:{value:null},uProj:{value:t.projectionMatrix},uCamWorld:{value:t.matrixWorld},uSunV:{value:new c},uUpV:{value:new c},uMode:{value:r==="none"?0:r==="raw"?1:2},uShow:{value:0},uStrength:{value:1},uNear:{value:t.near},uFar:{value:t.far}}),h={meas:new Float32Array(m),theo:new Float32Array(m),R:.8,ok:!1};r==="blur"&&e.shared.set("ssao-probe",h);const S=new c(.55,.75,.35).normalize();let T=0;const g=(l,w)=>{var b;(b=o==null?void 0:o.depthTexture)==null||b.dispose(),o==null||o.dispose(),s==null||s.dispose(),i==null||i.dispose(),o=new D(l,w,{count:2}),o.depthTexture=new H(l,w);const d=Math.max(1,l>>1),A=Math.max(1,w>>1);s=new D(d,A,{minFilter:B,magFilter:B}),i=new D(d,A),n.u.tDepth.value=o.depthTexture,n.u.tNormal.value=o.textures[1],u.u.tAO.value=s.texture,u.u.tDepth.value=o.depthTexture,u.u.uTexel.value.set(1/d,1/A),x.u.tAlbedo.value=o.textures[0],x.u.tNormal.value=o.textures[1],x.u.tDepth.value=o.depthTexture,x.u.tAO.value=r==="raw"?s.texture:i.texture},z=l=>{const w=t.matrixWorldInverse;n.u.uPA.value.set(N,0,U).applyMatrix4(w),n.u.uPB.value.set(N+y*l,0,U).applyMatrix4(w),n.u.uPN.value.set(0,1,0).transformDirection(w),n.u.uProbe.value=1,n.render(a,p),n.u.uProbe.value=0,a.readRenderTargetPixels(p,0,0,m,16,v);for(let d=0;d<m;d++){let A=0;for(let b=0;b<16;b++)A+=v[(b*m+d)*4]/255;h.meas[d]=A/16,h.theo[d]=Ae(t,d/(m-1)*y*l,l)}h.R=l,h.ok=!0};return{resize(l,w,d){const A=Math.min(d,1.25);g(Math.max(1,Math.floor(l*A)),Math.max(1,Math.floor(w*A)))},update(l,w,d){const A=se(e,"ssaoClock",d),b=e.params,V=Math.sin(A.t*.18);t.position.set(3.4+V*1.1,2.6+Math.sin(A.t*.11)*.25,5.9-V*.6),t.lookAt(-.4,.45,-1.4),t.updateMatrixWorld();const _=b.num("radius",.8);if(n.u.uRadius.value=_,x.u.uStrength.value=b.num("strength",1),x.u.uShow.value=b.bool("show",!1)?1:0,x.u.uSunV.value.copy(S).transformDirection(t.matrixWorldInverse),x.u.uUpV.value.set(0,1,0).transformDirection(t.matrixWorldInverse),r==="none"){e.hud(`AO 없음 · 앰비언트가 구석까지 똑같이 밝음
벽·바닥 모서리와 물체 밑이 떠 보인다`);return}if(r==="raw"){e.hud(`반구 표본 ${M}개 · R ${_.toFixed(2)} · 블러 없음
4×4 회전 노이즈 격자 + 직사광까지 어두워짐`);return}if(!h.ok){e.hud("측정 준비 중…");return}const O=k=>{const j=k/(m-1)*y;return`d=${j.toFixed(2)}R 측정 ${R(h.meas[k])} / 이론 ${R(h.theo[k])} (연속 ${R(q(j))})`};e.hud(["벽 앞 바닥 가림률 (블러 + 앰비언트에만)",O(0),O(5),O(10)].join(`
`))},render(){if(!o||!s||!i)return;a.setRenderTarget(o),a.setClearColor(0,0),a.clear(),a.render(f,t);const l=r==="blur"&&T++%8===0;r!=="none"&&(n.render(a,s),r==="blur"&&u.render(a,i),l&&z(n.u.uRadius.value)),x.render(a,null)},dispose(){var l;(l=o==null?void 0:o.depthTexture)==null||l.dispose(),o==null||o.dispose(),s==null||s.dispose(),i==null||i.dispose(),p.dispose(),n.dispose(),u.dispose(),x.dispose()}}})}function be(r){return oe(r,()=>({draw(e,f,t){ae(e,f,t);const a={x:40,y:26,w:W(f-54,20),h:W(t-58,20)},{X:o,Y:s}=le(e,a,[0,y],[0,.6],[0,.25,.5,.75,1,1.2],[0,.1,.2,.3,.4,.5,.6],v=>`${v}R`,v=>v.toFixed(1)),i=[];for(let v=0;v<=120;v++){const n=v/120*y;i.push([o(n),s(q(n))])}I(e,i,"#ffffff",1,[3,3]);const p=r.shared.get("ssao-probe");if(p!=null&&p.ok){const v=[];for(let u=0;u<m;u++)v.push([o(u/(m-1)*y),s(p.theo[u])]);I(e,v,"#5b9cff",1.6);for(let u=0;u<m;u++)ce(e,o(u/(m-1)*y),s(p.meas[u]),"#ff9a3c",3);let n=0;for(let u=0;u<m;u++)n+=Math.abs(p.meas[u]-p.theo[u]);$(e,`평균 |측정−이론| ${(n/m).toFixed(3)} · R ${p.R.toFixed(2)}`,a.x+a.w-4,a.y+14,"#c8d0dc",10,"right")}$(e,"벽에서 바닥까지 거리 d → 가림률 occ (구석 = 0.5)",a.x,14,"#c8d0dc",10),re(e,[{label:"GPU 측정",color:"#ff9a3c"},{label:"이론(커널 합)",color:"#5b9cff"},{label:"연속 (1−h)²(2+h)/4",color:"#ffffff"}],a.x,t-4,9),r.hud("")}}))}const De={layout:"variants",intro:'<b>SSAO</b>(화면 공간 앰비언트 오클루전)는 하늘빛·주변광이 잘 들어가지 않는 <b>구석, 틈, 물체가 바닥에 닿는 곳</b>을 어둡게 해 물체를 땅에 "붙여" 주는 후처리입니다. 2007년 〈크라이시스〉가 처음 실시간으로 선보인 뒤 거의 모든 게임의 기본 옵션이 되었습니다. 같은 장면을 AO 없음 / 블러 없는 원본 SSAO / 블러 + 앰비언트에만 적용으로 비교하고, 벽 앞 바닥에서 측정한 가림률을 반구 부피의 기하 이론과 맞춰 봅니다.',how:["먼저 G-버퍼를 그린다: 알베도, 뷰 공간 법선(MRT 두 장)과 하드웨어 깊이. 조명은 마지막 합성에서 앰비언트와 직사광을 따로 계산한다.","반해상도 AO 패스: 픽셀 위치 P를 깊이에서 복원하고, 법선 쪽 반구 안에 표본 16개 <code>S = P + TBN·k·R</code>를 놓는다. 표본을 화면에 투영해 그 자리의 깊이가 S보다 앞이면(= S가 물체 속) 가려진 것으로 센다.",'범위 검사 <code>smoothstep(0,1, R/|z_P − z_scene|)</code>: 멀리 떨어진 앞 물체가 배경을 어둡게 하는 "후광"을 막는다. 바이어스 0.02로 평면이 자기 자신을 가리는 여드름을 막는다.',"표본 수를 아끼려고 4×4 픽셀마다 커널을 법선 둘레로 16가지 각도로 돌린다 → 원본은 격자 무늬 노이즈. 4×4 상자 블러(깊이 가중)가 16개 회전을 정확히 한 번씩 섞어 노이즈를 지운다.","AO는 <b>앰비언트(간접광)에만</b> 곱한다. 직사광까지 곱하면 해가 비치는 모서리도 더러워지고 전체가 탁해진다 (가운데 뷰어).",'이론: 커널 반지름이 ∛u 분포라 표본이 반구 부피에 균일하다. 벽에서 d 떨어진 바닥 점은 벽 뒤 부피 비율만큼 가려져 <code>occ = (1−h)²(2+h)/4, h=d/R</code>, 구석(h=0)에서 정확히 0.5. CPU "커널 합"은 실제 16표본 × 16회전과 벽 평면 교차를 그대로 계산한 값이다.'],pros:["장면 복잡도와 무관하게 화면 해상도에만 비례하는 비용 – 동적 물체·캐릭터에도 바로 적용된다.","접촉 그림자 효과로 물체가 떠 보이는 문제를 크게 줄이고 형태를 읽기 쉽게 만든다.","반해상도 + 블러로 1~2ms 안에 돌릴 수 있어 콘솔·PC 기본 옵션이 되었다."],cons:["화면에 보이는 깊이만 알기 때문에 화면 밖·뒤에 가려진 물체의 가림은 모른다 (가장자리에서 AO가 사라짐).","표본이 적으면 노이즈, 블러가 크면 번짐 – 시간 누적(TAA)과 묶어 쓰는 경우가 많다.",'물리적인 가시성 적분이 아니라 근사라서 과하게 걸면 "때 낀" 느낌이 난다. HBAO·GTAO 같은 개선판이 나온 이유.'],usedIn:"〈크라이시스〉(2007, 상용 게임 최초의 실시간 SSAO), HBAO를 옵션으로 넣은 〈배틀필드 3〉, 〈콜 오브 듀티〉 팀이 발표한 GTAO(2016), 언리얼·유니티의 기본 Ambient Occlusion 후처리 등 현세대 게임 대부분.",tips:['반지름 R은 "사람 손 한 뼘~팔 길이"인 0.3~1m가 무난하다. 너무 크면 벽 전체가 뿌옇게 어두워지고 범위 검사 후광이 늘어난다.',"반해상도에서 8~16표본을 돌리고, 깊이 가중 블러(이 페이지는 노이즈 타일과 같은 4×4)나 TAA로 노이즈를 지운다. 블러 크기를 노이즈 타일 크기와 맞추면 회전이 정확히 한 번씩 섞인다.","미리 구운 AO(텍스처·라이트맵)가 있으면 <code>min(SSAO, 구운 AO)</code>처럼 겹쳐 이중으로 어두워지지 않게 한다.","AO는 앰비언트·간접광에만 곱한다. 반사광이 구석에서 떠 보이면 AO에서 유도한 반사 가림(specular occlusion)을 따로 쓴다."],related:["soft-shadow","gi-bleed","ssr","edge-outline","three-point-lighting"],controls:[{type:"range",key:"radius",label:"표본 반지름 R (m)",min:.3,max:1.5,step:.05,value:.8},{type:"range",key:"strength",label:"AO 세기 (배, 합성)",min:0,max:1.5,step:.05,value:1},{type:"toggle",key:"show",label:"AO 버퍼만 보기",value:!1},{type:"toggle",key:"pan",label:"카메라 이동",value:!0}],viewers:[{title:"AO 없음",kind:"before",caption:"앰비언트가 어디서나 똑같아 벽과 바닥의 경계, 상자 밑, 계단 턱이 납작하고 물체가 바닥에서 떠 보입니다.",mount:C("none")},{title:"SSAO 원본 (블러 없음, 전체 조명에 곱함)",kind:"variant",caption:'반구 표본 16개를 4×4 회전 노이즈로 돌린 날것의 AO입니다. 격자 무늬가 보이고, 직사광까지 어둡게 해 햇빛 받는 모서리도 탁해집니다. "AO 버퍼만 보기"로 노이즈를 확인하세요.',mount:C("raw")},{title:"SSAO 블러 + 앰비언트에만",kind:"after",caption:"4×4 깊이 가중 블러로 노이즈를 지우고 간접광에만 곱했습니다. 구석과 접촉면만 부드럽게 어두워져 물체가 땅에 붙습니다. HUD는 왼쪽 벽 앞 바닥 선(z=0.8)에서 잰 측정/이론 가림률입니다.",mount:C("blur")},{title:"벽 앞 바닥 가림률 vs 이론",kind:"info",caption:"주황 점 = GPU가 같은 AO 함수로 바닥 25점 × 16회전을 계산해 읽은 값, 파랑 = CPU가 같은 커널로 벽 평면 교차를 센 값, 흰 점선 = 반구 부피 연속 이론. 반지름을 바꿔도 d/R 축에서 같은 곡선에 놓입니다.",mount:be}]};export{q as aoContinuous,De as default};
