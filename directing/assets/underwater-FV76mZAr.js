import{V as W,C as O,k as Z,j as J,W as et,a5 as ot,a6 as at,am as st,H as nt,u as it,P as L,M as C,g as V,m as rt,e as ct,c as ut,h as lt,a as pt,G as K,aa as vt,S as dt,D as ft,d as mt,f as ht,ah as xt,aD as wt}from"./three.module-CEzfHhrp.js";import{m as yt}from"./three-viewer-fx7lDL-0.js";import{m as bt,b as Q,s as Mt,a as Tt}from"./canvas-viewer-QtaWfmlz.js";import{c as gt,t as Y,l as kt}from"./chart2d-DfgeckAJ.js";import{P as Pt,a as _,f as tt}from"./extra-kit-c-FPjCbN4U.js";import{m as St}from"./cam-kit2-DamJRS7e.js";import{P as Gt}from"./postfx-kit-b-mDqSKWWr.js";const H=[.3,.075,.045],j=[.35,.8,.9],Ct=[.015,.16,.22],z=[3,6,10,15],F=new W(0,2.4,6),U=z.length,Ut=`
uniform sampler2D tSrc, tDepth;
uniform mat4 uInvProj, uCamWorld;
uniform vec3 uSigma, uFog, uTint;
uniform vec2 uCss;
uniform float uMode, uTime, uWave, uCaus, uSurfY, uProbe;
uniform vec2 uPUV[${U}];
varying vec2 vUv;
vec3 viewPos(vec2 uv, float z) {
  vec4 v = uInvProj * vec4(uv * 2.0 - 1.0, z * 2.0 - 1.0, 1.0);
  return v.xyz / v.w;
}
float caus(vec2 p, float t) {
  float a = sin(p.x * 2.1 + sin(p.y * 1.7 + t * 1.1) * 1.3 + t * 0.6);
  float b = sin(p.y * 2.3 + sin(p.x * 1.5 - t * 0.9) * 1.3 - t * 0.5);
  float c = 1.0 - abs(a + b) * 0.5;
  float a2 = sin(p.x * 3.3 - p.y * 1.2 + sin(p.y * 2.9 + t) + t * 0.7);
  float b2 = sin(p.y * 3.1 + p.x * 1.4 + sin(p.x * 2.3 - t * 1.2));
  float c2 = 1.0 - abs(a2 + b2) * 0.5;
  return pow(c, 7.0) + 0.6 * pow(c2, 9.0);
}
void main() {
  if (uProbe > 0.5) {
    int i = int(floor(vUv.x * ${U*2}.0));
    vec2 uv = uPUV[0];
    for (int k = 0; k < ${U}; k++) { if (k == i || k + ${U} == i) uv = uPUV[k]; }
    vec3 c = texture2D(tSrc, uv).rgb;
    if (i >= ${U}) {
      float d = length(viewPos(uv, texture2D(tDepth, uv).r));
      c *= exp(-uSigma * d);
    }
    gl_FragColor = vec4(sqrt(clamp(c, 0.0, 1.0)), 1.0);
    return;
  }
  vec2 uv = vUv;
  if (uMode > 0.5) {
    vec2 w = vec2(sin(vUv.y * 21.0 + uTime * 2.1) + 0.5 * sin(vUv.y * 47.0 - uTime * 3.3),
                  cos(vUv.x * 17.0 + uTime * 1.7) + 0.5 * cos(vUv.x * 39.0 + uTime * 2.7));
    uv = clamp(vUv + w * uWave / (1.5 * uCss), 0.001, 0.999);
  }
  vec3 c = texture2D(tSrc, uv).rgb;
  if (uMode < 0.5) {
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
    return;
  }
  float z = texture2D(tDepth, uv).r;
  if (uMode < 1.5) {
    // 색만 곱하기: 거리와 무관
    c = c * uTint + uFog * 0.35;
  } else {
    vec3 vp = viewPos(uv, z);
    float d = z >= 0.9999 ? 1e4 : length(vp);
    if (z < 0.9999) {
      vec3 wp = (uCamWorld * vec4(vp, 1.0)).xyz;
      vec3 n = normalize(cross(dFdx(wp), dFdy(wp)));
      float up = clamp(n.y, 0.0, 1.0);
      float k = caus(wp.xz * 0.9, uTime) * up * exp(-0.06 * max(0.0, uSurfY - wp.y));
      c += c * k * 1.6 * uCaus;
    }
    vec3 T = exp(-uSigma * d);
    // 배경(물 깊은 곳): 위쪽이 조금 밝은 산란광
    vec3 fog = uFog * (0.75 + 0.6 * clamp(vUv.y, 0.0, 1.0));
    c = c * T + fog * (1.0 - T);
  }
  gl_FragColor = vec4(c, 1.0);
  #include <colorspace_fragment>
}`,_t=`
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 40.0;
  float r = sin(p.x * 1.3 + sin(p.y * 0.9 + uTime) * 2.0 + uTime * 0.8) * sin(p.y * 1.1 + sin(p.x * 0.7 - uTime * 0.7) * 2.0);
  float v = 0.55 + 0.45 * r;
  gl_FragColor = vec4(vec3(0.6, 0.95, 1.0) * (0.9 + 1.4 * v * v), 1.0);
}`,Ft=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,zt=(n,t)=>Mt(n.shared,"uwClock",t,()=>({t:0}),(m,c)=>m.t+=c);function Dt(n){n.background=new O(9423086),n.add(new nt(14677247,6969920,1.1));const t=new it(16777215,2.2);t.position.set(3,12,2),n.add(t);const m=[],c=new L(120,120,80,80),p=c.attributes.position;for(let o=0;o<p.count;o++){const r=p.getX(o),x=p.getY(o);p.setZ(o,Math.sin(r*.21)*.35+Math.cos(x*.17+r*.05)*.45+Math.sin(r*.7+x*.5)*.08)}c.computeVertexNormals(),m.push(c);const v=new C(c,new V({color:14271642,roughness:1}));v.rotation.x=-Math.PI/2,n.add(v);const a=Tt(77),g=new rt(1,0);m.push(g);const P=new V({color:8159110,roughness:.9,flatShading:!0});for(let o=0;o<26;o++){const r=new C(g,P),x=.4+a()*1.6;r.scale.set(x,x*(.5+a()*.5),x),r.position.set((a()-.5)*30,x*.2,4-a()*40),r.rotation.set(a()*3,a()*3,a()*3),n.add(r)}const y=[15218990,16742954,16765498,11553496,16732042],e=new ct(.18,1,7),d=new ut(.35,12,10);m.push(e,d);for(let o=0;o<70;o++){const r=y[o%y.length],x=new V({color:r,roughness:.7}),w=(a()-.5)*22+2.5,I=4-a()*34;if(a()<.5)for(let G=0;G<4;G++){const k=new C(e,x),B=.6+a()*1.2;k.scale.set(1,B,1),k.position.set(w+(a()-.5)*.6,B/2,I+(a()-.5)*.6),k.rotation.set((a()-.5)*.6,0,(a()-.5)*.6),n.add(k)}else{const G=new C(d,x),k=.6+a()*1.2;G.scale.set(k,k*.7,k),G.position.set(w,.2*k,I),n.add(G)}}const s=new lt(.12,1,.04);s.translate(0,.5,0),m.push(s);const u=new V({color:4168250,roughness:.8}),N=[];for(let o=0;o<40;o++){const r=new C(s,u);r.scale.y=2+a()*4,r.position.set((a()-.5)*26-3,0,3-a()*34),r.rotation.y=a()*3,n.add(r),N.push({m:r,ph:a()*6})}const S=new L(.9,.9),R=new L(.3,.3),l=new pt(.04,.04,1.4,6);m.push(S,R,l);const f=new K({color:new O(.85,.85,.85)}),b=[],h=[-.42,-.2,.05,.24];z.forEach((o,r)=>{const x=new W(Math.sin(h[r]),-.03,-Math.cos(h[r])).normalize(),w=new vt,I=new C(S,f);w.add(I),["#ff2020","#20ff20","#2040ff"].forEach((k,B)=>{const q=new C(R,new K({color:k}));q.position.set((B-1)*.3,-.62,0),w.add(q)});const G=new C(l,new V({color:4473924}));G.position.y=-1.3,w.add(G),w.position.copy(F).addScaledVector(x,o),w.position.y=Math.max(w.position.y,1.9),w.scale.setScalar(Math.max(.7,o/6)),w.position.y+=(w.scale.x-1)*1.6,n.add(w),b.push(w)});const M=St(16756768,1845818);M.group.rotation.x=-Math.PI/2.4,n.add(M.group);const A=new dt({vertexShader:Ft,fragmentShader:_t,uniforms:{uTime:{value:0}},side:ft}),T=new C(new L(200,200),A);T.rotation.x=Math.PI/2,T.position.y=10,n.add(T);const D=500,i=new Float32Array(D*3);for(let o=0;o<D;o++)i[o*3]=(a()-.5)*24,i[o*3+1]=a()*9,i[o*3+2]=6-a()*30;const $=new mt;$.setAttribute("position",new ht(i,3));const E=new xt($,new wt({color:15267071,size:.05,sizeAttenuation:!0}));return n.add(E),{animate:o=>{for(const x of N)x.m.rotation.z=Math.sin(o*.9+x.ph)*.18;A.uniforms.uTime.value=o,E.position.y=-(o*.15%1)*.5,E.rotation.y=Math.sin(o*.05)*.1;const r=o*.25;M.group.position.set(3+Math.sin(r)*3,3.2+Math.sin(o*.7)*.3,-6-Math.cos(r)*3),M.group.rotation.z=Math.cos(r)*.6,M.pose(o*.5,.6)},panels:b,geos:m}}function X(n){return t=>yt(t,{antialias:!1,orbit:!1,fov:55,cam:[F.x,F.y,F.z],target:[0,2,-10],near:.1,far:90},({scene:m,camera:c,renderer:p})=>{const{animate:v,panels:a,geos:g}=Dt(m);n!=="plain"&&(m.background=new O(0));const P=p.extensions.has("EXT_color_buffer_half_float")||p.extensions.has("EXT_color_buffer_float"),y=(l,f)=>{const b=new et(l,f,{type:P?ot:at});return b.depthTexture=new st(l,f),b};let e=y(4,4);const d=new Gt(U*2,1),s=new Pt(Ut,{tSrc:{value:e.texture},tDepth:{value:e.depthTexture},uInvProj:{value:new J},uCamWorld:{value:new J},uSigma:{value:new W(...H)},uFog:{value:new W(...Ct)},uTint:{value:new W(...j)},uCss:{value:new Z(300,200)},uMode:{value:n==="plain"?0:n==="tint"?1:2},uTime:{value:0},uWave:{value:2},uCaus:{value:1},uSurfY:{value:10},uProbe:{value:0},uPUV:{value:z.map(()=>new Z)}}),u={sigma:H.slice(),d:z.slice(),T:z.map(()=>[NaN,NaN,NaN]),vis:z.map(()=>!1)};let N=0;const S=new W,R=()=>{s.u.uProbe.value=1,s.render(p,d.rt),s.u.uProbe.value=0,d.read(p);for(let l=0;l<U;l++)for(let f=0;f<3;f++){const b=d.at(l,0,f)**2,h=d.at(l+U,0,f)**2;u.T[l][f]=u.vis[l]&&b>.05?h/b:NaN}};return{resize(l,f,b){var M;const h=Math.min(b,1.5);e.dispose(),(M=e.depthTexture)==null||M.dispose(),e=y(Math.max(1,Math.floor(l*h)),Math.max(1,Math.floor(f*h))),s.u.tSrc.value=e.texture,s.u.tDepth.value=e.depthTexture,s.u.uCss.value.set(Math.max(1,l),Math.max(1,f))},update(l,f,b){const h=zt(t,b),M=t.params;v(h.t),c.position.set(F.x+Math.sin(h.t*.21)*.5,F.y+Math.sin(h.t*.5)*.15,F.z),c.lookAt(Math.sin(h.t*.13)*1.2-.8,2.1+Math.sin(h.t*.17)*.9,-10),c.rotation.z+=Math.sin(h.t*.4)*.015,c.updateMatrixWorld();const A=M.num("turb",1),T=H.map(i=>i*A);if(s.u.uSigma.value.set(T[0],T[1],T[2]),s.u.uWave.value=M.num("wave",2),s.u.uCaus.value=M.bool("caus",!0)?1:0,s.u.uTime.value=h.t,s.u.uInvProj.value.copy(c.projectionMatrixInverse),s.u.uCamWorld.value.copy(c.matrixWorld),a.forEach((i,$)=>{u.d[$]=i.position.distanceTo(c.position),S.copy(i.position).project(c),u.vis[$]=Math.abs(S.x)<.97&&Math.abs(S.y)<.97&&S.z<1,s.u.uPUV.value[$].set(S.x*.5+.5,S.y*.5+.5)}),u.sigma=T,n==="phys"&&t.shared.set("uw-meas",u),n==="plain"){t.hud(`후처리 없음 · 패널 ${z.length}개가 거리와 상관없이 같은 흰색
산호 빨강도 멀리까지 또렷 → "물 밖" 같음`);return}if(n==="tint"){t.hud([`out = C·(${j.join(", ")}) + 안개×0.35`,`3m 패널 투과 R/G/B ${j.map(i=>_(i)).join(" / ")} = 15m 패널과 동일`,"거리 단서 없음 → 푸른 필터를 씌운 화면"].join(`
`));return}const D=i=>u.vis[i]?`${tt(u.d[i])}m R ${_(u.T[i][0])}/${_(Math.exp(-T[0]*u.d[i]))} G ${_(u.T[i][1])}/${_(Math.exp(-T[1]*u.d[i]))} B ${_(u.T[i][2])}/${_(Math.exp(-T[2]*u.d[i]))}`:`${tt(u.d[i])}m (화면 밖)`;t.hud([`T_c = e^(−σ_c·d)  σ = ${T.map(i=>i.toFixed(3)).join(" / ")} /m`,"패널 투과율 측정/이론:",D(0),D(2),D(3)].join(`
`))},render(){p.setRenderTarget(e),p.render(m,c),n==="phys"&&N%8===0&&R(),N++,s.render(p,null)},dispose(){var l;e.dispose(),(l=e.depthTexture)==null||l.dispose(),d.dispose(),s.dispose(),g.forEach(f=>f.dispose())}}})}function $t(n){return bt(n,()=>({draw(t,m,c){gt(t,m,c);const p=n.shared.get("uw-meas");if(!p)return;const v={x:40,y:24,w:Q(m-56,20),h:Q(c-56,20)},a=20,g=e=>v.x+e/a*v.w,P=e=>v.y+v.h-Math.max(0,Math.min(1,e))*v.h;t.strokeStyle="#1c2230",t.strokeRect(v.x+.5,v.y+.5,v.w,v.h);for(const e of[0,5,10,15,20])Y(t,`${e}m`,g(e),v.y+v.h+12,"#7d8799",9,"center");for(const e of[0,.5,1])Y(t,e.toFixed(1),v.x-4,P(e)+3,"#7d8799",9,"right");const y=["#f87171","#4ade80","#5b9cff"];for(let e=0;e<3;e++){t.strokeStyle=y[e],t.lineWidth=1.8,t.beginPath();for(let d=0;d<=80;d++){const s=d/80*a,u=P(Math.exp(-p.sigma[e]*s));d?t.lineTo(g(s),u):t.moveTo(g(s),u)}t.stroke()}t.lineWidth=1,t.setLineDash([3,4]);for(let e=0;e<3;e++)t.strokeStyle=y[e]+"88",t.beginPath(),t.moveTo(g(0),P(j[e])),t.lineTo(g(a),P(j[e])),t.stroke();t.setLineDash([]);for(let e=0;e<U;e++)if(p.vis[e])for(let d=0;d<3;d++){const s=p.T[e][d];Number.isFinite(s)&&(t.fillStyle="#0b0e14",t.beginPath(),t.arc(g(p.d[e]),P(s),4.5,0,Math.PI*2),t.fill(),t.strokeStyle=y[d],t.lineWidth=2,t.stroke(),t.lineWidth=1)}Y(t,"거리 d →  /  투과율 T ↑   (실선 이론 e^(−σd), 점선 = 색만 곱하기)",6,14,"#c8d0dc",10),kt(t,[{label:"R (σ 큼)",color:y[0]},{label:"G",color:y[1]},{label:"B (σ 작음)",color:y[2]},{label:"○ GPU 측정 (패널)",color:"#c8d0dc"}],v.x,c-6,9)}}))}const Lt={layout:"variants",intro:'<b>수중 연출</b>은 "물속에 있다"를 몸으로 느끼게 하는 후처리 묶음입니다. 가장 중요한 단서는 <b>색이 거리에 따라 채널별로 사라지는 것</b> — 물은 빨간 빛을 가장 빨리 흡수해서, 가까운 산호는 빨갛지만 몇 미터만 멀어져도 갈색·청록으로 변합니다. 여기에 물결 왜곡, 바닥에 일렁이는 빛 그물(커스틱), 떠다니는 부유물, 위쪽의 수면을 더합니다. 세 뷰어는 같은 바닷속을 <b>후처리 없음 / 푸른색만 곱하기 / 깊이 기반 채널별 흡수(Beer–Lambert)</b>로 보여 줍니다.',how:["장면을 색 + 깊이 텍스처로 렌더 타깃에 그린다. 후처리에서 깊이를 역투영 행렬로 뷰 공간 위치로 되돌려, 픽셀까지의 실제 거리 d를 구한다.","채널별 투과율 <code>T_c = exp(−σ_c·d)</code>, σ = (0.30, 0.075, 0.045)/m × 탁도. 결과 <code>C·T + F·(1−T)</code>: 멀수록 물색 F(산란광)로 덮이고, 빨강이 가장 먼저 빠진다.","같은 깊이로 월드 위치를 복원하고 화면 미분(dFdx/dFdy)으로 법선을 구해, 위를 향한 면에만 움직이는 커스틱 무늬를 곱한다. 수면에서 멀수록 약하게.","물결 왜곡: 화면 좌표에 낮은 진폭의 사인파 두 겹으로 UV를 흔든다 (열기 아지랑이와 같은 원리, 더 느리고 규칙적인 파형).","HUD 측정: 3·6·10·15m 흰 패널 중심을 측정 모드로 8×1 타깃에 그려, 원래 장면색과 흡수만 적용한 색의 비 = 실제 렌더된 투과율을 읽는다 (깊이 버퍼에서 복원한 거리 사용). CPU가 아는 패널 거리로 계산한 e^(−σd)와 비교한다."],pros:["거리마다 색이 달라져 공간의 깊이와 규모가 바로 읽힌다. 시야가 자연스럽게 짧아져 긴장감(무엇이 다가올지 모름)도 생긴다.","탁도(σ 배율) 하나로 맑은 열대 바다 ↔ 흐린 호수 ↔ 심해를 전환할 수 있다.","흡수가 시야 거리를 줄여 주므로 먼 물체를 덜 그려도 된다 (성능 이득)."],cons:["깊이 버퍼가 없는 반투명 물체(파티클, 유리)는 거리가 틀려 지나치게 선명하거나 사라질 수 있다.",'색만 곱하면 싸지만 거리 단서가 없어 "파란 필터"로 보인다. 반대로 σ가 너무 크면 화면 대부분이 한 색이 되어 길을 잃는다.',"실제로는 광원→물체 경로(수심)의 흡수도 있다. 여기서는 시선 경로만 계산했고, 깊은 곳 물체가 어두워지는 것은 커스틱 감쇠로만 흉내 냈다."],usedIn:"〈서브노티카〉(깊이에 따른 색·시야 변화), 〈어비주〉, 〈바이오쇼크〉의 해저 도시 바깥 풍경, 〈GTA V〉 다이빙, 〈언차티드 4〉 수중 구간 등.",tips:["σ는 빨강이 초록·파랑보다 4~10배 크게 잡는다. 탁도는 σ 전체에 곱하는 배율 하나로 노출하면 지역(맑은 바다·흐린 호수)별 프리셋을 만들기 쉽다.","흡수로 투과율이 1~2% 아래가 되는 거리(약 4/σ_b) 너머는 어차피 안 보이므로, 카메라 원거리 평면이나 LOD 거리를 그에 맞춰 줄여 성능을 번다.","카메라가 수면에 걸치면 화면을 수면선 기준으로 나눠 위는 물 밖, 아래는 수중 처리를 하고, 경계에 물방울·왜곡 띠를 그려 어색함을 가린다.","소리도 같이 바꾼다: 수중 진입 순간 저역 통과 필터(먹먹한 소리)와 거품 소리를 넣으면 화면 효과의 설득력이 크게 오른다."],related:["caustics","volumetric-fog","atmospheric-perspective","heat-haze","light-cookie"],controls:[{type:"range",key:"turb",label:"탁도 (σ 배율, 배)",min:.3,max:2.5,step:.05,value:1},{type:"range",key:"wave",label:"물결 왜곡 (px)",min:0,max:6,step:.25,value:2},{type:"toggle",key:"caus",label:"커스틱 (빛 그물)",value:!0}],viewers:[{title:"후처리 없음",kind:"before",caption:"바닥·산호·패널이 있지만 공기 중처럼 멀리까지 또렷합니다. 물속이라는 정보가 없습니다.",mount:X("plain")},{title:"푸른색만 곱하기",kind:"variant",caption:"모든 픽셀에 같은 청록을 곱했습니다. 물 느낌은 나지만 가까운 패널과 먼 패널의 색이 같아 깊이감이 없습니다.",mount:X("tint")},{title:"채널별 흡수 + 커스틱 + 물결",kind:"after",caption:"가까운 산호는 빨갛고 멀수록 빨강이 먼저 빠져 청록 안개에 묻힙니다. 바닥엔 빛 그물이 일렁입니다.",mount:X("phys")},{title:"투과율 T_c(d)",kind:"info",caption:'실선은 채널별 이론 e^(−σ_c·d), 점선은 "색만 곱하기"의 거리 무관 투과율입니다. 동그라미는 패널에서 GPU로 잰 값으로, 실선 위에 놓입니다.',mount:$t}]};export{Lt as default};
