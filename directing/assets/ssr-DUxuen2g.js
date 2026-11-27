import{W as A,V as N,k as Y,am as J,C as K,M as L,P as tt,g as Q,h as et,H as ot,u as at,i as nt}from"./three.module-CEzfHhrp.js";import{m as rt}from"./three-viewer-fx7lDL-0.js";import{m as lt,b as W}from"./canvas-viewer-QtaWfmlz.js";import{c as st,t as I,l as E}from"./chart2d-DfgeckAJ.js";import{h as ut,P as q,N as it,p as j,f as B}from"./extra-kit-c-FPjCbN4U.js";import{A as ct,p as ft,a as vt,b as O}from"./gfx-kit-d-CaswdL74.js";const y=64,w=36,C=40;function pt(){const r=[],t=(o,e,l,a,n,u,c,f,g=3)=>r.push({min:new N(o,e,l),max:new N(a,n,u),color:c,emit:f,ei:g}),p=[2285823,16727496,16756782,8088831];[1.5,-3,-7,-11,-15].forEach((o,e)=>{for(const l of[-2.6,2.6]){t(l-.35,0,o-.35,l+.35,o>0?7:4.2,o+.35,4869464);const a=p[(e+(l>0?1:0))%4];t(l-.38,1.25,o-.38,l+.38,1.39,o+.38,1118481,a),t(l-.38,3.1,o-.38,l+.38,3.22,o+.38,1118481,a)}});for(const o of[-7,-15])t(-2.95,4.2,o-.3,2.95,4.55,o+.3,2895414),t(-2.6,4.06,o-.32,2.6,4.2,o-.24,1118481,o===-7?16727496:2285823,4);t(-3.2,1.8,-19,3.2,3.6,-18.8,1118481,16732058,2.4),t(-7.5,0,-21.5,7.5,10,-20.5,2764088),t(-7.5,0,-21,-6.5,9,9,2764088),t(6.5,0,-21,7.5,9,9,2764088),t(-6.5,2.2,-13,-6.4,3.4,-9,1118481,4063152,2),t(6.4,1.6,-6,6.5,2.4,-2,1118481,16756782,2.2),t(6.4,3.4,-16,6.5,5.2,-14.5,1118481,2285823,2);for(let o=0;o<4;o++)for(let e=0;e<3;e++){if((o*7+e*3)%4===0)continue;const l=-6+o*3.2;t(l,4.5+e*1.6,-20.5,l+1.4,5.4+e*1.6,-20.42,1118481,e===1?16760938:8369919,1.2)}return t(-1.6,0,-9.9,-.9,1.7,-9.3,2831696),t(-1.55,.5,-9.32,-.95,1.6,-9.28,1118481,10217727,2.2),t(.6,0,-5.4,1.4,.8,-4.6,5916214),t(.75,.8,-5.25,1.25,1.3,-4.75,6968384),r}const $=pt(),ht=`
#include <packing>
uniform sampler2D tColor, tDepth;
uniform mat4 uProj, uCamWorld;
uniform vec3 uUpV;
uniform float uNear, uFar, uThick, uProbe;
varying vec2 vUv;
float vz(vec2 uv) { return perspectiveDepthToViewZ(texture2D(tDepth, uv).x, uNear, uFar); }
vec3 vpos(vec2 uv, float z) { return vec3((uv * 2.0 - 1.0) * (-z) / vec2(uProj[0][0], uProj[1][1]), z); }
vec2 proj(vec3 p) { vec4 c = uProj * vec4(p, 1.0); return c.xy / c.w * 0.5 + 0.5; }
bool march(vec3 P, vec3 R, out vec2 huv, out float ht) {
  float t = 0.0, dt = 0.12;
  huv = vec2(0.0); ht = 0.0;
  for (int i = 0; i < 48; i++) {
    float tn = t + dt;
    if (tn > ${C.toFixed(1)}) return false;
    vec3 Q = P + R * tn;
    if (Q.z > -uNear) return false;
    vec2 uv = proj(Q);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return false;
    float dz = vz(uv) - Q.z;
    if (dz > 0.0 && dz < uThick + dt) {
      float lo = t, hi = tn;
      for (int k = 0; k < 6; k++) {
        float m = 0.5 * (lo + hi);
        vec3 M = P + R * m;
        if (vz(proj(M)) - M.z > 0.0) hi = m; else lo = m;
      }
      huv = proj(P + R * hi);
      ht = hi;
      return true;
    }
    t = tn;
    dt *= 1.07;
  }
  return false;
}
void main() {
  float d = texture2D(tDepth, vUv).x;
  vec2 huv;
  float ht;
  bool hit = false;
  if (d < 1.0) {
    vec3 P = vpos(vUv, perspectiveDepthToViewZ(d, uNear, uFar));
    vec3 W = (uCamWorld * vec4(P, 1.0)).xyz;
    if (abs(W.y) < 0.02) hit = march(P, reflect(normalize(P), uUpV), huv, ht);
  }
  if (!hit) { gl_FragColor = vec4(0.0); return; }
  if (uProbe > 0.5) {
    float U = 1.0 + huv.x * 65533.0, V = 1.0 + huv.y * 65533.0;
    float uh = floor(U / 256.0), vh = floor(V / 256.0);
    gl_FragColor = vec4(uh, floor(U - uh * 256.0), vh, floor(V - vh * 256.0)) / 255.0;
    return;
  }
  vec2 e = smoothstep(0.0, 0.08, huv) * smoothstep(0.0, 0.08, 1.0 - huv);
  float conf = e.x * e.y * (1.0 - smoothstep(0.6 * ${C.toFixed(1)}, ${C.toFixed(1)}, ht));
  gl_FragColor = vec4(texture2D(tColor, huv).rgb * conf, ht / ${C.toFixed(1)});
}`,dt=`
#include <packing>
uniform sampler2D tColor, tDepth, tRefl;
uniform mat4 uProj, uCamWorld;
uniform vec3 uUpV;
uniform vec2 uAspect;
uniform float uMode, uNear, uFar, uGain, uShow;
varying vec2 vUv;
${it}
${ct}
void main() {
  vec3 col = texture2D(tColor, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  if (d < 1.0 && uMode > 0.5) {
    float z = perspectiveDepthToViewZ(d, uNear, uFar);
    vec3 P = vec3((vUv * 2.0 - 1.0) * (-z) / vec2(uProj[0][0], uProj[1][1]), z);
    vec3 W = (uCamWorld * vec4(P, 1.0)).xyz;
    if (abs(W.y) < 0.02) {
      vec4 r0 = texture2D(tRefl, vUv);
      vec3 refl;
      float k;
      if (uMode < 1.5) {
        refl = r0.rgb;
        k = 0.6;
      } else {
        float puddle = smoothstep(0.47, 0.55, xk_fbm(vec3(W.xz * 0.32, 1.7)));
        float rough = mix(0.5, 0.03, puddle);
        float rad = rough * (0.004 + 0.06 * r0.a);
        refl = r0.rgb;
        for (int i = 0; i < 12; i++) {
          float a = float(i) * 2.39996;
          float rr = sqrt((float(i) + 0.5) / 12.0);
          refl += texture2D(tRefl, vUv + vec2(cos(a), sin(a)) * rr * rad * uAspect).rgb;
        }
        refl /= 13.0;
        float cv = clamp(dot(-normalize(P), uUpV), 0.0, 1.0);
        float F = 0.04 + 0.96 * pow(1.0 - cv, 5.0);
        col *= mix(1.0, 0.55, puddle);
        k = F * mix(0.45, 1.6, puddle) * 1.6;
      }
      col += refl * k * uGain;
      if (uShow > 0.5) col = refl * k * uGain;
    } else if (uShow > 0.5) col *= 0.15;
  }
  gl_FragColor = vec4(acesTone(col * 1.5), 1.0);
  #include <colorspace_fragment>
}`;function mt(r){r.background=new K(329227);const t=new L(new tt(15,32).translate(0,6,0),new Q({color:2895413,roughness:.5}));t.rotation.x=-Math.PI/2,r.add(t);for(const e of $){const l=new N().subVectors(e.max,e.min),a=new Q({color:e.color,roughness:.7,emissive:e.emit??0,emissiveIntensity:e.emit?e.ei??3:0}),n=new L(new et(l.x,l.y,l.z),a);n.position.addVectors(e.min,e.max).multiplyScalar(.5),r.add(n)}r.add(new ot(5926824,1710112,1.6));const p=new at(10466559,.8);p.position.set(-3,8,4),r.add(p);const o=[[2285823,-2,1.4,-3],[16727496,2,1.4,-7],[16756782,-2,1.4,-11],[16732058,0,2.6,-17.5]];for(const[e,l,a,n]of o){const u=new nt(e,9,12,2);u.position.set(l,a,n),r.add(u)}}const U=new Float64Array($.length*6);$.forEach((r,t)=>U.set([r.min.x,r.min.y,r.min.z,r.max.x,r.max.y,r.max.z],t*6));const G=(r,t)=>{const p=1/t.x,o=1/t.y,e=1/t.z;let l=1/0;for(let a=0;a<U.length;a+=6){let n=(U[a]-r.x)*p,u=(U[a+3]-r.x)*p,c=n<u?n:u,f=n<u?u:n;n=(U[a+1]-r.y)*o,u=(U[a+4]-r.y)*o,c=Math.max(c,n<u?n:u),f=Math.min(f,n<u?u:n),!(c>f)&&(n=(U[a+2]-r.z)*e,u=(U[a+5]-r.z)*e,c=Math.max(c,n<u?n:u,1e-4),f=Math.min(f,n<u?u:n),c<=f&&c<l&&(l=c))}return l};function xt(r,t,p){const o=r.position,e=new N,l=new N,a=new N,n=new N,u=new N,c=r.projectionMatrix.elements;for(let f=0;f<w;f++)for(let g=0;g<y;g++){const P=f*y+g,v=(g+.5)/y,h=(f+.5)/w;e.set((v*2-1)/c[0],(h*2-1)/c[5],-1).transformDirection(r.matrixWorld);const s=G(o,e),b=e.y<0?-o.y/e.y:1/0;if(!(b<s)){t[P]=0;continue}l.copy(o).addScaledVector(e,b),a.set(e.x,-e.y,e.z);const z=G(l,a);if(!(z<=C)){t[P]=4;continue}n.copy(l).addScaledVector(a,z),u.copy(n).project(r);const k=(u.x+1)/2,i=(u.y+1)/2;if(u.z>1||k<0||k>1||i<0||i>1){t[P]=2;continue}const d=n.distanceTo(o),m=n.clone().sub(o).divideScalar(d);t[P]=G(o,m)<d-.03?3:1,p[P*2]=k,p[P*2+1]=i}}function _(r){return t=>rt(t,{antialias:!1,orbit:!1,fov:55,cam:[0,1.6,6],near:.1,far:80},({scene:p,camera:o,renderer:e})=>{mt(p);const l=ut(e);let a=null,n=null;const u=new A(y,w),c=new Uint8Array(y*w*4),f=new Float32Array(y*w*2);let g=1,P=1;const v=new q(ht,{tColor:{value:null},tDepth:{value:null},uProj:{value:o.projectionMatrix},uCamWorld:{value:o.matrixWorld},uUpV:{value:new N},uNear:{value:o.near},uFar:{value:o.far},uThick:{value:.4},uProbe:{value:0}}),h=new q(dt,{tColor:{value:null},tDepth:{value:null},tRefl:{value:null},uProj:{value:o.projectionMatrix},uCamWorld:{value:o.matrixWorld},uUpV:{value:v.u.uUpV.value},uAspect:{value:new Y(1,1)},uMode:{value:r==="none"?0:r==="ssr"?1:2},uNear:{value:o.near},uFar:{value:o.far},uGain:{value:1},uShow:{value:0}}),s={cat:new Uint8Array(y*w),gpuHit:new Uint8Array(y*w),measRate:NaN,predRate:NaN,agree:NaN,errPx:NaN,err90:NaN,offFrac:NaN,hist:[],ok:!1};r==="full"&&t.shared.set("ssr-probe",s);let b=0;const z=(i,d)=>{var m;(m=a==null?void 0:a.depthTexture)==null||m.dispose(),a==null||a.dispose(),n==null||n.dispose(),a=new A(i,d,{type:l}),a.depthTexture=new J(i,d),n=new A(Math.max(1,i>>1),Math.max(1,d>>1),{type:l}),v.u.tColor.value=a.texture,v.u.tDepth.value=a.depthTexture,h.u.tColor.value=a.texture,h.u.tDepth.value=a.depthTexture,h.u.tRefl.value=n.texture,h.u.uAspect.value.set(d/i,1)},k=()=>{v.u.uProbe.value=1,v.render(e,u),v.u.uProbe.value=0,e.readRenderTargetPixels(u,0,0,y,w,c),xt(o,s.cat,f);let i=0,d=0,m=0,S=0,R=0;const M=[];for(let x=0;x<y*w;x++){const D=s.cat[x],H=c[x*4]*256+c[x*4+1],T=H>0?1:0;if(s.gpuHit[x]=T,D===0)continue;i++,d+=T;const V=D===1?1:0;if(m+=V,V===T&&S++,D===2&&R++,V&&T){const X=(H-1)/65533,Z=(c[x*4+2]*256+c[x*4+3]-1)/65533;M.push(Math.hypot((X-f[x*2])*g,(Z-f[x*2+1])*P))}}s.measRate=i?d/i:NaN,s.predRate=i?m/i:NaN,s.agree=i?S/i:NaN,s.offFrac=i?R/i:NaN,M.sort((x,D)=>x-D),s.errPx=M.length?M[M.length>>1]:NaN,s.err90=M.length?M[Math.floor(M.length*.9)]:NaN,s.hist.push({m:s.measRate,p:s.predRate}),s.hist.length>150&&s.hist.shift(),s.ok=!0};return{resize(i,d,m){g=i,P=d;const S=Math.min(m,1.25);z(Math.max(1,Math.floor(i*S)),Math.max(1,Math.floor(d*S)))},update(i,d,m){const S=ft(t,"ssrClock",m),R=t.params,M=Math.sin(S.t*.16)*1.4,x=1.5+Math.sin(S.t*.23)*.5,D=R.num("tilt",8)*Math.PI/180;if(o.position.set(M,x,6),o.lookAt(M*.3,x-Math.tan(D)*18,-12),o.updateMatrixWorld(),v.u.uUpV.value.set(0,1,0).transformDirection(o.matrixWorldInverse),v.u.uThick.value=R.num("thick",.4),h.u.uGain.value=R.num("gain",1),h.u.uShow.value=R.bool("show",!1)?1:0,r==="none"){t.hud("반사 없음 · 젖은 바닥이 그냥 어두운 면");return}if(r==="ssr"){t.hud(`광선 진행 48걸음 · 이분 6번 · 두께 ${R.num("thick",.4).toFixed(2)}m
거울처럼 선명, 가장자리 페이드만`);return}if(!s.ok){t.hud("측정 준비 중…");return}t.hud([`바닥 적중률 측정 ${j(s.measRate)} / 예측 ${j(s.predRate)}`,`칸별 일치 ${j(s.agree)} · 위치 오차 중앙값 ${B(s.errPx)}px (90% ${B(s.err90)}px)`,`대상이 화면 밖이라 원리상 불가 ${j(s.offFrac)}`].join(`
`))},render(){!a||!n||(e.setRenderTarget(a),e.render(p,o),r!=="none"&&v.render(e,n),r==="full"&&b++%10===0&&k(),h.render(e,null))},dispose(){var i;(i=a==null?void 0:a.depthTexture)==null||i.dispose(),a==null||a.dispose(),n==null||n.dispose(),u.dispose(),v.dispose(),h.dispose()}}})}const F=["","#4ade80","#f87171","#e66cff","#2a3242"];function yt(r){return lt(r,()=>({draw(t,p,o){st(t,p,o);const e=r.shared.get("ssr-probe"),l=W(Math.min(p*.5-20,(o-60)*y/w),20),a=l*w/y,n=12,u=26;if(I(t,"탐침 64×36 (위 = 화면 위)",n,16,"#c8d0dc",10),e!=null&&e.ok){const v=l/y,h=a/w;for(let s=0;s<w;s++)for(let b=0;b<y;b++){const z=s*y+b,k=e.cat[z];if(!k)continue;const i=n+b*v,d=u+a-(s+1)*h,m=e.gpuHit[z];t.fillStyle=k===1?m?F[1]:"#facc15":F[k],t.globalAlpha=k===1||m?1:.55,t.fillRect(i,d,Math.max(1,v-.4),Math.max(1,h-.4)),k!==1&&m&&(t.strokeStyle="#ffffff",t.strokeRect(i+.5,d+.5,Math.max(1,v-1),Math.max(1,h-1)))}t.globalAlpha=1}t.strokeStyle="#2a3242",t.strokeRect(n+.5,u+.5,l,a);const c=n+l+44,f={x:c,y:26,w:W(p-c-12,20),h:W(a,20)},{X:g,Y:P}=vt(t,f,[0,149],[0,1],[],[0,.25,.5,.75,1],()=>"",v=>`${Math.round(v*100)}%`);if(I(t,"바닥 적중률 (시간 →)",f.x,16,"#c8d0dc",10),e!=null&&e.ok){const h=150-e.hist.length;O(t,e.hist.map((s,b)=>[g(h+b),P(s.p)]),"#ffffff",1,[3,3]),O(t,e.hist.map((s,b)=>[g(h+b),P(s.m)]),"#ff9a3c",1.8)}E(t,[{label:"보임·적중",color:F[1]},{label:"보임·놓침",color:"#facc15"},{label:"화면 밖",color:F[2]},{label:"가려짐",color:F[3]},{label:"하늘",color:"#4b5563"}],n,o-18,9),E(t,[{label:"GPU 적중률",color:"#ff9a3c"},{label:"CPU 예측",color:"#ffffff"},{label:"흰 테두리 = 예측 밖 적중(가짜 반사)",color:"#9aa3b2"}],n,o-4,9),r.hud("")}}))}const Nt={layout:"variants",intro:"<b>화면 공간 반사(SSR)</b>는 비 온 밤거리의 젖은 바닥에 네온이 번져 비치는 장면을 만드는 대표 기법입니다. 반사용 카메라를 하나 더 돌리는 대신, <b>이미 그려진 화면</b>의 깊이 버퍼를 따라 반사 광선을 진행해 부딪힌 픽셀의 색을 가져옵니다. 싸고 어떤 모양의 바닥·물체에도 쓸 수 있지만, <b>화면에 없는 것은 반사할 수 없다</b>는 분명한 한계가 있습니다. 반사 없음 / 선명한 SSR / 거칠기 블러 + 프레넬 웅덩이를 비교하고, 적중률을 거울 기하 예측과 맞춰 봅니다.",how:["장면을 HDR 색 + 깊이 텍스처로 그린다. 깊이에서 픽셀의 뷰 공간 위치 P를 복원하고, 월드 높이가 0인 픽셀(바닥)만 반사를 계산한다.","반사 방향 <code>R = reflect(normalize(P), N)</code>으로 광선을 48걸음 진행한다 (첫 0.12m, 매 걸음 ×1.07 → 약 40m). 걸음마다 Q를 화면에 투영해 그 자리 깊이와 비교한다.","Q가 표면 뒤로 들어갔고(<code>z_scene > z_Q</code>) 그 차이가 두께 + 걸음 폭보다 작으면 적중. 마지막 두 걸음 사이를 이분 탐색 6번으로 다듬어 적중 uv의 색을 가져온다.","광선이 화면 밖으로 나가면 즉시 실패 → 반사가 뚝 끊긴다. 그래서 적중 uv가 화면 가장자리 8% 안이면, 또 광선이 길면 서서히 페이드한다.","세 번째 뷰어: 노이즈 웅덩이 마스크로 거칠기를 정하고 적중 거리에 비례해 반사를 흐린다(거칠수록, 멀수록 뿌옇게). 세기는 슐릭 프레넬 <code>F = 0.04 + 0.96(1 − cosθ)⁵</code> – 낮게 볼수록 강하다.",'측정: 같은 셰이더를 64×36 탐침 타깃에 돌려 적중 여부·uv를 읽는다. CPU는 장면 상자들로 실제 거울 반사 광선을 쏴 대상 Q를 구해 "보임 / 화면 밖 / 가려짐 / 하늘"로 나눈다 → 적중률과 반사 위치 오차(px)를 비교.'],pros:["반사 카메라를 추가로 그리지 않아 장면 복잡도와 무관하게 비용이 화면 크기에 비례한다.","평면이 아닌 바닥·웅덩이·젖은 차체 등 어떤 표면에도 같은 패스로 반사가 생긴다.","움직이는 캐릭터·이펙트·네온이 그대로 비쳐 젖은 도시 분위기를 강하게 만든다."],cons:["화면에 없는 것(화면 위로 잘린 간판, 카메라 뒤, 물체 뒷면)은 반사 불가 – 카메라를 숙이면 반사가 아래부터 잘린다.",'깊이 버퍼는 두께를 모르므로, 물체 뒤로 지나가는 광선이 앞면에 맞은 것으로 오인되는 "가짜 반사"가 생긴다.',"걸음이 거칠면 얇은 물체를 건너뛰고, 촘촘하면 비싸다. 실패한 곳은 반사 프로브·큐브맵으로 메워야 한다."],usedIn:"〈킬존: 섀도 폴〉(2013, 초기 대표 사례), 〈사이버펑크 2077〉 나이트 시티의 비 온 거리처럼 젖은 도시를 그리는 게임 다수, 언리얼 엔진 4의 기본 반사(UE5에서는 루멘 반사가 기본) 등.",tips:["실패한 픽셀은 반사 프로브·큐브맵으로 메운다. SSR 결과의 신뢰도(가장자리·거리 페이드 값)를 가중치로 프로브와 섞으면 반사가 뚝 끊기지 않는다.","고정 걸음 대신 깊이 버퍼의 최소값 밉 체인(Hi-Z)으로 빈 공간을 크게 건너뛰면 같은 비용으로 더 멀리, 얇은 물체도 덜 놓치며 추적할 수 있다.","걸음 시작점을 픽셀마다 조금씩 흔들고(디더) TAA로 누적하면 계단 무늬가 사라진다. 거친 표면 반사는 반해상도로 추적한 뒤 블러해도 티가 안 난다.","두께 검사는 장면 물체 두께에 맞춰 0.1~0.5m. 너무 크면 물체 뒤를 지나는 광선이 앞면에 맞은 것으로 처리되는 가짜 반사가 늘어난다."],related:["wet-surface","pbr-material","ssao","stylized-water","bloom"],controls:[{type:"range",key:"tilt",label:"카메라 숙임 (°)",min:-4,max:22,step:1,value:8},{type:"range",key:"thick",label:"두께 검사 (m)",min:.05,max:2,step:.05,value:.4},{type:"range",key:"gain",label:"반사 세기 (배)",min:0,max:2,step:.05,value:1},{type:"toggle",key:"show",label:"반사만 보기",value:!1},{type:"toggle",key:"pan",label:"카메라 이동",value:!0}],viewers:[{title:"반사 없음",kind:"before",caption:'네온과 기둥은 있지만 바닥이 그냥 어두운 면이라 "비 온 거리"의 느낌이 없습니다.',mount:_("none")},{title:"SSR (선명한 거울)",kind:"variant",caption:'깊이 버퍼를 따라 진행한 반사 광선의 적중 색을 그대로 더했습니다. 위치는 정확하지만 바닥 전체가 거울 같고, 화면 위로 잘린 들보·간판은 반사가 뚝 끊깁니다. "카메라 숙임"을 올려 보세요.',mount:_("ssr")},{title:"SSR + 거칠기 블러 + 프레넬",kind:"after",caption:"웅덩이는 선명하게, 마른 아스팔트는 거리에 비례해 뿌옇게, 세기는 프레넬로 낮은 각도일수록 강하게 – 실제 젖은 바닥처럼 보입니다. HUD는 탐침 적중률(측정/예측)과 반사 위치 오차입니다.",mount:_("full")},{title:"적중 지도 · 적중률 vs 기하 예측",kind:"info",caption:"왼쪽: 바닥 탐침 칸마다 CPU 예측(색)과 GPU 결과. 빨강 = 반사 대상이 화면 밖이라 SSR이 원리상 못 그리는 곳, 흰 테두리 = 예측상 보이지 않는데 적중한 가짜 반사. 오른쪽: 적중률 측정(주황) vs 예측(흰 점선).",mount:yt}]};export{Nt as default};
