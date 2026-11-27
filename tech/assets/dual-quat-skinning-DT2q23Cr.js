import{p as U,g as G,M,u as F,aq as V,a as A,w as T,H as K,ao as R,C as Z}from"./three.module-BZgG6AUv.js";import{m as N}from"./three-viewer-0rZIEDzf.js";import{m as E}from"./canvas-viewer-Btf0JXdr.js";import{c as J,l as X,t as B,D as C,a as H}from"./chart2d-JzIgcti9.js";function Q(t=40,o=96){return new Z(.35,.35,4,t,o,!1).rotateZ(-Math.PI/2)}const O=`
uniform float twist; uniform float bend; uniform float blendW; uniform float mode;
varying vec3 vN; varying vec3 vW; varying float vStripe;
vec4 qmul(vec4 a, vec4 b){ return vec4(a.w*b.xyz + b.w*a.xyz + cross(a.xyz, b.xyz), a.w*b.w - dot(a.xyz, b.xyz)); }
vec3 qrot(vec4 q, vec3 v){ return v + 2. * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,s, 0,-s,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,s,0, -s,c,0, 0,0,1); }
void main(){
  float w = smoothstep(-blendW, blendW, position.x);   // 뼈 1 가중치
  vec3 p = position, n = normal;
  vec3 joint = vec3(0.);
  mat3 R = rotZ(bend) * rotX(twist);
  vec3 sp, sn;
  if (mode < .5) {
    // 선형 블렌드 스키닝: 변환된 "위치"를 가중 평균
    vec3 p1 = R * (p - joint) + joint;
    sp = mix(p, p1, w);
    sn = normalize(mix(n, R * n, w));
  } else {
    // 듀얼 쿼터니언: 변환 자체(회전+이동)를 블렌드 후 정규화 → 강체 변환 유지
    vec4 qx = vec4(sin(twist * .5), 0., 0., cos(twist * .5));
    vec4 qz = vec4(0., 0., sin(bend * .5), cos(bend * .5));
    vec4 r1 = qmul(qz, qx);
    vec3 t1 = joint - qrot(r1, joint);                        // 관절 중심 회전의 이동 성분
    vec4 d1 = .5 * qmul(vec4(t1, 0.), r1);
    vec4 r0 = vec4(0., 0., 0., 1.), d0 = vec4(0.);
    if (dot(r0, r1) < 0.) { r1 = -r1; d1 = -d1; }             // 최단 경로
    vec4 br = (1. - w) * r0 + w * r1;
    vec4 bd = (1. - w) * d0 + w * d1;
    float len = length(br);
    br /= len; bd /= len;
    vec3 tr = 2. * (br.w * bd.xyz - bd.w * br.xyz + cross(br.xyz, bd.xyz));
    sp = qrot(br, p) + tr;
    sn = qrot(br, n);
  }
  vStripe = atan(position.z, position.y);
  vN = normalize(mat3(modelMatrix) * sn);
  vec4 wp = modelMatrix * vec4(sp, 1.);
  vW = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,Y=`
uniform vec3 camP;
varying vec3 vN; varying vec3 vW; varying float vStripe;
void main(){
  vec3 N = normalize(vN) * (gl_FrontFacing ? 1. : -1.);
  vec3 L = normalize(vec3(.4, .8, .5));
  float d = max(dot(N, L), 0.) * .8 + .2;
  float stripe = step(.5, fract(vStripe / 6.2832 * 6.));  // 비틀림이 보이도록 세로 줄무늬
  vec3 base = mix(vec3(.95, .75, .62), vec3(.75, .42, .35), stripe);
  vec3 V = normalize(camP - vW);
  float s = pow(max(dot(N, normalize(L + V)), 0.), 40.) * .3;
  gl_FragColor = vec4(base * d + s, 1.);
  #include <colorspace_fragment>
}`,S=(t,o)=>{if(t.params.bool("animate")){const e=Math.sin(o*.6)*.5+.5;return{twist:e*t.params.num("twist",170)*Math.PI/180,bend:e*t.params.num("bend",60)*Math.PI/180}}return{twist:t.params.num("twist",170)*Math.PI/180,bend:t.params.num("bend",60)*Math.PI/180}};function tt(t,o){return o==="chart"?et(t):o==="cpu"?at(t):N(t,{antialias:!0,cam:[.8,2.2,6],target:[.4,.3,0]},({scene:e,camera:c})=>{e.background=new U(1317412);const n={twist:{value:0},bend:{value:0},blendW:{value:.6},mode:{value:o==="lbs"?0:1},camP:{value:new G}},l=new M(Q(),new F({uniforms:n,vertexShader:O,fragmentShader:Y,side:V}));e.add(l);const d=new M(new A(.5,.012,8,48),new T({color:16436245}));return d.rotation.y=Math.PI/2,e.add(d),{update(b,a){const{twist:i,bend:s}=S(t,a);n.twist.value=i,n.bend.value=s,n.blendW.value=t.params.num("blend",.6),n.camP.value.copy(c.position);const r=o==="lbs"?.35*Math.abs(Math.cos(i/2)):.35;t.hud(`${o==="lbs"?"선형 블렌드 (LBS)":"듀얼 쿼터니언 (DQS)"} · 비틀기 ${Math.round(i*180/Math.PI)}° · 굽힘 ${Math.round(s*180/Math.PI)}° · 관절 단면 반지름 ${(r/.35*100).toFixed(0)}%`)}}})}function et(t){return E(t,()=>{let o=0;return{step(e){o+=e},draw(e,c,n){J(e,c,n);const l=180,d=Array.from({length:l+1},(r,v)=>Math.abs(Math.cos(v/l*Math.PI/2*1))*100),b=Array.from({length:l+1},()=>100),a={x:36,y:14,w:c-50,h:n-50};X(e,a,[{data:b,color:"#4ade80",width:2},{data:d,color:"#f87171",width:2}],0,110,{xs:l});for(const r of[0,50,100])B(e,`${r}%`,a.x-4,a.y+a.h-r/110*a.h+3,C,9,"right");for(const r of[0,90,180])B(e,`${r}°`,a.x+r/180*a.w,a.y+a.h+14,C,9,"center");const{twist:i}=S(t,o),s=a.x+Math.min(1,i/Math.PI)*a.w;e.strokeStyle="#facc15",e.beginPath(),e.moveTo(s,a.y),e.lineTo(s,a.y+a.h),e.stroke(),H(e,[{label:"LBS: r·|cos(θ/2)|",color:"#f87171"},{label:"DQS: 항상 r",color:"#4ade80"}],a.x,n-8,10),t.hud("관절 중앙(두 뼈 가중치 0.5) 단면 반지름 vs 비틀기 각도")}}})}function at(t){return N(t,{antialias:!0,cam:[0,9,14],target:[0,0,0]},({scene:o})=>{o.background=new U(1317412),o.add(new K(16777215,4478310,2.2));const e=Q(24,48),c=e.attributes.position.array.slice();let n=[];const l=new R({color:15250586}),d=()=>{n.forEach(r=>{o.remove(r),r.geometry.dispose()});const i=t.params.num("arms",60),s=Math.ceil(Math.sqrt(i));n=Array.from({length:i},(r,v)=>{const u=new M(e.clone(),l);return u.scale.setScalar(.45),u.position.set((v%s-s/2)*2.4,0,(Math.floor(v/s)-s/2)*1.2),o.add(u),u})};d();const b=t.params.on(i=>i==="arms"&&d());let a=0;return{update(i,s){const r=performance.now();n.forEach((u,_)=>{const{twist:g,bend:P}=S(t,s+_*.05),h=u.geometry.attributes.position.array,z=Math.cos(g),q=Math.sin(g),k=Math.cos(P),L=Math.sin(P),D=t.params.num("blend",.6);for(let m=0;m<h.length;m+=3){const p=c[m],f=c[m+1],w=c[m+2],y=Math.min(1,Math.max(0,(p+D)/(2*D))),x=y*y*(3-2*y),I=f*z-w*q,$=f*q+w*z,W=p*k-I*L,j=p*L+I*k;h[m]=p+(W-p)*x,h[m+1]=f+(j-f)*x,h[m+2]=w+($-w)*x}u.geometry.attributes.position.needsUpdate=!0}),a=a*.9+(performance.now()-r)*.1;const v=n.length*e.attributes.position.count;t.hud(`CPU 스키닝: 팔 ${n.length}개 · 정점 ${v.toLocaleString()} · JS ${a.toFixed(2)}ms/프레임 + 버퍼 업로드
(GPU 스키닝이면 CPU 비용 ≈ 0, 뼈 행렬만 전송)`)},dispose(){b(),e.dispose()}}})}const ot=[{mode:"lbs",title:"선형 블렌드 스키닝",kind:"before",caption:"두 뼈로 변환한 위치를 가중 평균. 비틀면 관절이 쪼그라드는 사탕 껍질 현상(180°에서 한 점으로), 굽히면 안쪽이 꺼진다. 줄무늬로 비틀림을 확인."},{mode:"dqs",title:"듀얼 쿼터니언 스키닝",kind:"after",caption:"위치가 아니라 변환(회전+이동)을 듀얼 쿼터니언으로 섞고 정규화 → 섞인 결과도 강체 변환이라 부피가 유지된다. 대신 굽힘 바깥쪽이 살짝 부풀 수 있다."},{mode:"chart",title:"관절 단면 반지름",kind:"info",caption:"가중치가 반반인 관절 중앙에서 LBS 단면은 r·|cos(θ/2)|로 줄어 180°에서 0. DQS는 어떤 각도에서도 r."},{mode:"cpu",title:"CPU 스키닝 비용",kind:"variant",caption:"같은 계산을 CPU(JS)에서 정점마다 하고 매 프레임 버퍼를 다시 올리면 팔 개수에 비례해 비용이 커진다. GPU 스키닝은 뼈 행렬만 보내고 정점 셰이더가 병렬로 처리한다."}],ct={layout:"compare",intro:"캐릭터 애니메이션은 정점 셰이더에서 정점마다 뼈 변환을 섞는 <b>GPU 스키닝</b>으로 처리됩니다. 가장 흔한 <b>선형 블렌드 스키닝(LBS)</b>은 변환된 위치를 평균 내기 때문에 비틀거나 크게 굽히면 관절이 <b>부피를 잃습니다</b>. <b>듀얼 쿼터니언 스키닝(DQS)</b>은 회전과 이동을 함께 표현하는 듀얼 쿼터니언을 섞어 이 문제를 해결합니다.",how:["CPU: 애니메이션 포즈 → 뼈 행렬(또는 듀얼 쿼터니언) 배열을 유니폼/텍스처로 GPU에 전송.","정점 속성: 뼈 인덱스 4개 + 가중치 4개 (합 = 1).","LBS: p′ = Σ wᵢ (Mᵢ p). 행렬의 선형 결합은 회전 행렬이 아니라서 부피가 줄어듦.","DQS: 뼈마다 듀얼 쿼터니언 q̂ᵢ = qᵢ + ε·½ tᵢqᵢ. 섞기 b̂ = Σ wᵢ q̂ᵢ → 크기로 나눠 정규화 → 회전 + 이동 추출 후 적용.","섞기 전 쿼터니언 부호를 맞춰야(내적 < 0이면 뒤집기) 최단 경로로 보간.","스케일이 있는 뼈는 DQS로 표현 불가 → 스케일만 LBS로 처리하는 혼합 방식, 또는 부위별로 LBS/DQS 선택."],pros:["비틀림·굽힘에서 부피 보존","정점당 비용이 LBS와 비슷","LBS용 가중치를 그대로 사용 가능"],cons:["굽힘 바깥쪽 부풂(bulging)","비균일 스케일 미지원","보조 뼈(트위스트 본) + LBS가 여전히 더 흔한 해법"],usedIn:"Kavan 등 2007 “Skinning with Dual Quaternions”(I3D), Maya skinCluster의 Dual Quaternion 방식, Blender Armature의 “Preserve Volume”. 주요 게임 엔진의 기본 스키닝은 LBS 계열이라 DQS는 커스텀 셰이더·플러그인으로 도입하거나, LBS + 트위스트 본으로 대신하는 경우가 많음.",controls:[{type:"range",key:"twist",label:"비틀기 (°)",min:0,max:180,step:1,value:170},{type:"range",key:"bend",label:"굽힘 (°)",min:0,max:130,step:1,value:60},{type:"range",key:"blend",label:"가중치 블렌드 폭",min:.1,max:1.5,step:.05,value:.6},{type:"range",key:"arms",label:"CPU 스키닝 팔 개수",min:1,max:200,step:1,value:60},{type:"toggle",key:"animate",label:"자동 반복",value:!0}],viewers:ot.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:o=>tt(o,t.mode)}))};export{ct as default};
