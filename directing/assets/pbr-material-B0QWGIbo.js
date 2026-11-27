import{c as ae,M as U,S as ne,B as xe,aw as Re,v as _e,u as Ie,g as Ce,C as ze,ax as Le,V as z,T as Ve,G as We,J as $e}from"./three.module-CEzfHhrp.js";import{m as Be}from"./three-viewer-fx7lDL-0.js";import{m as Ee,b as j,s as je}from"./canvas-viewer-QtaWfmlz.js";import{c as Xe,t as I,l as Ae}from"./chart2d-DfgeckAJ.js";import{p as we,r as Se}from"./anime-kit-C6AkWSFn.js";import{M as qe}from"./shader-kit-b-CX5DRTZo.js";import{a as C,f as se}from"./extra-kit-c-FPjCbN4U.js";import"./BufferGeometryUtils--Oh5Y0A9.js";const V=5,L=.42,be=1,J=[.85,.42,.16],ie=2.4,p=96,K=o=>.1+.8*o/(V-1),O=o=>o/(V-1),ge=(o,e)=>new z((o-(V-1)/2)*be,(e-(V-1)/2)*be,0);function re(o,e){const n=e*e,h=o*o*(n-1)+1;return n/(Math.PI*h*h)}function Ye(o,e,n){const h=n*n,i=o*Math.sqrt(h+(1-h)*e*e),P=e*Math.sqrt(h+(1-h)*o*o);return .5/Math.max(i+P,1e-5)}const Q=(o,e)=>o+(1-o)*Math.pow(1-Math.max(0,Math.min(1,e)),5),Z=(o,e)=>.04+(J[e]-.04)*o;function ke(o,e,n,h,i){const P=o.dot(n),c=o.dot(e);if(P<=0||c<=0)return 0;const M=e.clone().add(n).normalize(),S=h*h;return re(Math.max(0,o.dot(M)),S)*Ye(P,c,S)*Q(Z(i,1),e.dot(M))*P*ie}function He(o){const e=Math.pow(o*o,2);if(e>=.999)return NaN;const n=(Math.SQRT2*e-1)/(e-1);return Math.acos(Math.sqrt(Math.max(0,Math.min(1,n))))*180/Math.PI}const Ue=`
varying vec3 vNw;
varying vec3 vWp;
void main() {
  vNw = normalize(mat3(modelMatrix) * normal);
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWp = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,le=`
vec3 envCol(vec3 d) {
  vec3 g = vec3(0.10, 0.09, 0.08);
  vec3 s = vec3(0.30, 0.38, 0.58);
  vec3 c = mix(g, s, smoothstep(-0.15, 0.45, d.y));
  c += vec3(1.0, 0.85, 0.6) * 0.9 * smoothstep(0.08, 0.0, abs(d.y - 0.05)) * smoothstep(-0.3, 0.6, d.z);
  c += vec3(1.6) * smoothstep(0.985, 0.995, dot(d, normalize(vec3(-0.6, 0.7, 0.4))));
  return c;
}
vec3 envAvg() { return vec3(0.2, 0.23, 0.3); }`,Ke=`
uniform vec3 uL, uBase;
uniform float uRough, uMetal, uMode, uDbg, uScale, uI;
varying vec3 vNw;
varying vec3 vWp;
${le}
const float PI = 3.14159265;
float D_GGX(float nh, float a) { float a2 = a * a; float d = nh * nh * (a2 - 1.0) + 1.0; return a2 / (PI * d * d); }
float V_Smith(float nl, float nv, float a) {
  float a2 = a * a;
  float gv = nl * sqrt(a2 + (1.0 - a2) * nv * nv);
  float gl = nv * sqrt(a2 + (1.0 - a2) * nl * nl);
  return 0.5 / max(gv + gl, 1e-5);
}
vec3 F_Schlick(vec3 f0, float c) { return f0 + (1.0 - f0) * pow(1.0 - clamp(c, 0.0, 1.0), 5.0); }
void main() {
  vec3 n = normalize(vNw);
  vec3 v = normalize(cameraPosition - vWp);
  vec3 h = normalize(uL + v);
  float nl = dot(n, uL);
  float nv = max(dot(n, v), 1e-4);
  float nh = max(dot(n, h), 0.0);
  float vh = max(dot(v, h), 0.0);
  float a = uRough * uRough;
  vec3 f0 = mix(vec3(0.04), uBase, uMetal);
  vec3 col;
  if (uMode < 0.5) {
    // 블린-퐁: 금속 개념 없이 흰 반사 + 기본색 확산
    float ex = max(2.0 / max(a * a, 1e-4) - 2.0, 1.0);
    float sp = (ex + 8.0) / (8.0 * PI) * pow(nh, ex) * 0.5;
    col = (uBase / PI + vec3(sp)) * max(nl, 0.0) * uI + uBase * envAvg() * 0.5;
  } else {
    vec3 F = F_Schlick(f0, vh);
    vec3 spec = D_GGX(nh, a) * V_Smith(max(nl, 0.0), nv, a) * F;
    vec3 kd = uBase * (1.0 - uMetal) / PI;
    vec3 direct = (kd + spec) * max(nl, 0.0) * uI;
    if (uDbg > 0.5) {
      float sg = nl > 0.0 ? spec.g * nl * uI : 0.0;
      gl_FragColor = vec4(sg / uScale, F_Schlick(f0, nv).g, 1.0, 1.0);
      return;
    }
    // 환경: 반사 방향 하늘색을 거칠기만큼 평균 쪽으로, Schlick F(N·V)로 가중 (근사)
    vec3 r = reflect(-v, n);
    vec3 envS = mix(envCol(r), envAvg(), clamp(uRough * 1.3, 0.0, 1.0));
    vec3 Fe = F_Schlick(f0, nv) * (1.0 - 0.6 * uRough * (1.0 - uMetal)) ;
    vec3 envD = mix(vec3(0.10, 0.09, 0.08), vec3(0.30, 0.38, 0.58), n.y * 0.5 + 0.5);
    col = direct + envS * Fe + kd * PI * envD * (1.0 - Fe);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Oe=`
varying vec3 vWp;
${le}
void main() {
  gl_FragColor = vec4(envCol(normalize(vWp)) * 0.35, 1.0);
  #include <colorspace_fragment>
}`,ye=`
varying vec3 vWp;
void main() { vWp = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,Je=`
varying vec3 vWp;
${le}
void main() { gl_FragColor = vec4(envCol(normalize(vWp)), 1.0); }`,Qe=(o,e)=>je(o.shared,"pbrClock",e,()=>({t:0,az:-.5}),(n,h)=>{n.t+=h,n.az=o.params.bool("auto",!0)?-.55+.45*Math.sin(n.t*.25):o.params.num("az",-.4)}),Ne=o=>new z(Math.sin(o)*.8,.55,Math.cos(o)*.8).normalize();function ce(o){return e=>Be(e,{antialias:!0,orbit:!1,fov:36,cam:[0,.65,9.4],target:[0,.45,0]},({scene:n,camera:h,renderer:i})=>{const P=new ae(40,32,16),c=new U(P,new ne({vertexShader:ye,fragmentShader:Oe,side:xe,depthWrite:!1}));n.add(c);const M={value:Ne(-.5)},S=new ae(L,96,64),k=[];let v=null,F=null,D=null;if(o==="three"){v=new Re(i);const u=new _e;u.add(new U(new ae(10,32,16),new ne({vertexShader:ye,fragmentShader:Je,side:xe}))),F=v.fromScene(u,0),u.traverse(m=>{var x,G,g;const b=m;(x=b.geometry)==null||x.dispose(),(g=(G=b.material)==null?void 0:G.dispose)==null||g.call(G)}),n.environment=F.texture,D=new Ie(16777215,ie),n.add(D)}for(let u=0;u<V;u++)for(let m=0;m<V;m++){let b;o==="three"?b=new Ce({color:new ze().setRGB(...J,Le),metalness:O(u),roughness:K(m)}):b=new ne({vertexShader:Ue,fragmentShader:Ke,uniforms:{uL:M,uBase:{value:new z(...J)},uRough:{value:K(m)},uMetal:{value:O(u)},uMode:{value:o==="phong"?0:1},uDbg:{value:0},uScale:{value:1},uI:{value:ie}}});const x=new U(S,b);x.position.copy(ge(m,u)),n.add(x),k.push({mesh:x,i:m,j:u})}const f=new U(new Ve(L*1.12,.012,8,64),new We({color:16436245}));n.add(f);const d=new $e(22,1,.1,20),s=new qe(!0),a={peakMe:NaN,peakTh:NaN,hwMe:NaN,hwTh:NaN,hwD:NaN,f0Me:NaN,f0Th:NaN,fgMe:NaN,fgTh:NaN,fgNv:NaN,lobe:[],fres:[],r:.5,m:0,clip:!1};o==="ggx"&&e.shared.set("pbr-meas",a);let X=0,W=2,$=0;const r={o:new z,d:new z,n:new z,v:new z,h:new z},Pe=()=>{const u=k.find(t=>t.i===W&&t.j===$),m=u.mesh.position,b=K(W),x=O($),G=h.position.clone().sub(m).normalize();d.position.copy(m).addScaledVector(G,L/Math.sin(11*Math.PI/180)/.9),d.lookAt(m),d.updateMatrixWorld(),d.updateProjectionMatrix();const g=M.value,A=d.position.clone().sub(m).normalize(),B=A.clone().add(g).normalize(),ee=ke(B,A,g,b,x),he=Math.max(.001,ee*1.3),te=u.mesh.material;te.uniforms.uDbg.value=1,te.uniforms.uScale.value=he;const Fe=n.children.map(t=>t.visible);n.children.forEach(t=>t.visible=t===u.mesh);const Te=s.ensure(p,p);i.setRenderTarget(Te),i.setClearColor(0,0),i.clear(),i.render(n,d);const R=s.read(i);i.setRenderTarget(null),n.children.forEach((t,l)=>t.visible=Fe[l]),te.uniforms.uDbg.value=0;let oe=-1,ve=0,me=!1;for(let t=0;t<p*p;t++)R[t*4+2]<128||(R[t*4]>=255&&(me=!0),R[t*4]>oe&&(oe=R[t*4],ve=t));if(a.clip=me,a.r=b,a.m=x,oe<=0)return;const fe=Math.floor(ve/p),w=[];for(let t=0;t<p;t++){const l=fe*p+t;if(R[l*4+2]<128)continue;we(d,t,fe,p,p,r.o,r.d);const y=Se(r.o,r.d,m,L);if(y<0)continue;r.n.copy(r.o).addScaledVector(r.d,y).sub(m).divideScalar(L),r.v.copy(r.d).negate(),r.h.copy(r.v).add(g).normalize();const N=Math.acos(Math.min(1,r.n.dot(r.h)))*180/Math.PI;w.push({th:N,me:R[l*4]/255*he,tv:ke(r.n,r.v,g,b,x),th0:t})}if(!w.length)return;let q=0;w.forEach((t,l)=>t.me>w[q].me&&(q=l));let Y=0;w.forEach((t,l)=>t.tv>w[Y].tv&&(Y=l)),a.peakMe=w[q].me,a.peakTh=w[Y].tv;const de=(t,l)=>{const y=w[l][t],N=[];for(const E of[-1,1])for(let _=l+E;_>=0&&_<w.length;_+=E)if(w[_][t]<=y/2){const H=w[_-E],Me=w[_],De=(H[t]-y/2)/Math.max(1e-9,H[t]-Me[t]);N.push(H.th+(Me.th-H.th)*De);break}return N.length?N.reduce((E,_)=>E+_,0)/N.length:NaN};a.hwMe=de("me",q),a.hwTh=de("tv",Y),a.hwD=He(b);const ue=Math.max(1e-6,a.peakTh);a.lobe=w.map(t=>({th:t.th,me:t.me/ue,tv:t.tv/ue}));const Ge=m.clone().project(d),pe=Math.max(0,Math.min(p-1,Math.floor((Ge.y+1)/2*p))),T=[];for(let t=0;t<p;t++){const l=pe*p+t;if(R[l*4+2]<128)continue;we(d,t,pe,p,p,r.o,r.d);const y=Se(r.o,r.d,m,L);if(y<0)continue;r.n.copy(r.o).addScaledVector(r.d,y).sub(m).divideScalar(L);const N=-r.n.dot(r.d);T.push({tv:Math.acos(Math.min(1,N))*180/Math.PI,me:R[l*4+1]/255,nv:N})}if(a.fres=T.map(t=>({tv:t.tv,me:t.me})),T.length){let t=0,l=-1;T.forEach((y,N)=>{y.nv>T[t].nv&&(t=N),y.nv>.12&&(l<0||y.nv<T[l].nv)&&(l=N)}),a.f0Me=T[t].me,a.f0Th=Q(Z(x,1),T[t].nv),l>=0&&(a.fgMe=T[l].me,a.fgTh=Q(Z(x,1),T[l].nv),a.fgNv=T[l].nv)}};return{update(u,m,b){const x=Qe(e,b),G=e.params;M.value.copy(Ne(x.az)),D&&D.position.copy(M.value).multiplyScalar(10),W=Math.round(G.num("pr",2)),$=Math.round(G.num("pm",0)),f.position.copy(ge(W,$));const g=K(W),A=O($),B=`탐침 구: 거칠기 ${g.toFixed(1)} (α ${C(g*g)}) · 금속도 ${A.toFixed(2)}`;if(o==="ggx")e.hud([B,`피크 측정 ${C(a.peakMe)} / 이론 ${C(a.peakTh)}${a.clip?" (포화)":""}`,`반값 반각 θ_h 측정 ${se(a.hwMe)}° / 이론 ${se(a.hwTh)}° (D만 ${se(a.hwD)}°)`,`F 정면 측정 ${C(a.f0Me)} / 이론 ${C(a.f0Th)} · 가장자리(N·V ${C(a.fgNv)}) ${C(a.fgMe)} / ${C(a.fgTh)}`].join(`
`));else if(o==="phong"){const ee=Math.max(2/Math.max(Math.pow(g*g,2),1e-4)-2,1);e.hud([B,`블린-퐁 지수 n = 2/α² − 2 = ${ee.toFixed(0)}`,"금속도 무시 · 반사는 늘 흰색, 프레넬 없음","가로: 거칠기 0.1→0.9 · 세로: 금속도 0(아래)→1(위)"].join(`
`))}else e.hud([B,"three.js MeshStandardMaterial + 같은 방향광 + PMREM 하늘","(GGX·Smith 같고, F는 구면 가우시안 근사·거칠기 하한 등 차이)"].join(`
`))},render(){o==="ggx"&&X++%10===0&&Pe(),i.render(n,h)},dispose(){s.dispose(),S.dispose(),F==null||F.dispose(),v==null||v.dispose(),n.environment=null}}})}function Ze(o){return Ee(o,()=>({draw(e,n,h){Xe(e,n,h);const i=o.shared.get("pbr-meas"),P=j(Math.floor(n/2),40),c={x:30,y:22,w:j(P-40,20),h:j(h-52,20)},M=i&&Number.isFinite(i.hwTh)?Math.min(90,Math.max(8,i.hwTh*3)):40,S=f=>c.x+Math.min(f,M)/M*c.w,k=f=>c.y+c.h-Math.max(0,Math.min(1.1,f))*(c.h/1.1);if(e.strokeStyle="#1c2230",e.strokeRect(c.x+.5,c.y+.5,c.w,c.h),I(e,"0°",S(0),c.y+c.h+11,"#7d8799",9,"center"),I(e,`${M.toFixed(0)}°`,S(M),c.y+c.h+11,"#7d8799",9,"right"),I(e,"1",c.x-4,k(1)+3,"#7d8799",9,"right"),I(e,"½",c.x-4,k(.5)+3,"#7d8799",9,"right"),e.setLineDash([2,3]),e.strokeStyle="#3a4458",e.beginPath(),e.moveTo(c.x,k(.5)),e.lineTo(c.x+c.w,k(.5)),e.stroke(),e.setLineDash([]),i){const f=i.r*i.r;e.strokeStyle="#7d8799",e.setLineDash([4,3]),e.beginPath();for(let s=0;s<=100;s++){const a=s/100*M,X=re(Math.cos(a*Math.PI/180),f)/re(1,f);s?e.lineTo(S(a),k(X)):e.moveTo(S(a),k(X))}e.stroke(),e.setLineDash([]);const d=[...i.lobe].sort((s,a)=>s.th-a.th);e.strokeStyle="#5b9cff",e.lineWidth=1.6,e.beginPath(),d.forEach((s,a)=>a?e.lineTo(S(s.th),k(s.tv)):e.moveTo(S(s.th),k(s.tv))),e.stroke(),e.lineWidth=1,e.fillStyle="#facc15";for(const s of d)s.th>M||(e.beginPath(),e.arc(S(s.th),k(s.me),2,0,Math.PI*2),e.fill())}I(e,"반사 로브 / 피크 vs θ_h",c.x,13,"#c8d0dc",10);const v={x:P+26,y:22,w:j(n-P-38,20),h:j(h-52,20)},F=f=>v.x+f/90*v.w,D=f=>v.y+v.h-Math.max(0,Math.min(1,f))*v.h;e.strokeStyle="#1c2230",e.strokeRect(v.x+.5,v.y+.5,v.w,v.h),I(e,"0°",F(0),v.y+v.h+11,"#7d8799",9,"center"),I(e,"90°",F(90),v.y+v.h+11,"#7d8799",9,"right");for(const[f,d]of[[.04,"#4ade80"],[J[1],"#ff9a3c"],[i?Z(i.m,1):.04,"#e6e9ef"]]){e.strokeStyle=d,e.lineWidth=d==="#e6e9ef"?1:1.6,e.setLineDash(d==="#e6e9ef"?[3,3]:[]),e.beginPath();for(let s=0;s<=90;s++){const a=Q(f,Math.cos(s*Math.PI/180));s?e.lineTo(F(s),D(a)):e.moveTo(F(s),D(a))}e.stroke()}if(e.setLineDash([]),e.lineWidth=1,i){e.fillStyle="#facc15";for(const f of i.fres)e.beginPath(),e.arc(F(f.tv),D(f.me),2,0,Math.PI*2),e.fill()}I(e,"Schlick F vs 시선각",v.x,13,"#c8d0dc",10),Ae(e,[{label:"이론",color:"#5b9cff"},{label:"D만",color:"#7d8799"},{label:"GPU",color:"#facc15"},{label:"F₀ .04",color:"#4ade80"},{label:"금속",color:"#ff9a3c"}],c.x,h-4,9),o.hud("")}}))}const rt={layout:"compare",intro:"현대 게임의 재질은 대부분 <b>기본색 · 금속도 · 거칠기</b> 세 값으로 정해집니다(PBR 금속/거칠기 워크플로). 거칠기는 반사 하이라이트를 넓고 낮게 펴고, 금속도는 확산을 없애고 반사에 기본색을 입힙니다. 5×5 구 격자를 <b>블린-퐁</b>(옛 방식) / <b>직접 짠 GGX Cook-Torrance</b> / <b>three.js MeshStandardMaterial</b>로 비교하고, 탐침 구의 하이라이트 피크·로브 폭·프레넬을 GPU에서 읽어 공식과 맞춥니다.",how:["미세면 분포 D(GGX): <code>α²/(π((N·H)²(α²−1)+1)²)</code>, α = 거칠기². 거칠수록 하이라이트가 넓고 낮아지지만 넓이(에너지)는 보존된다.","가림 Vis(높이 상관 Smith)와 프레넬 F(Schlick) <code>F₀ + (1−F₀)(1−V·H)⁵</code>. 비금속 F₀ ≈ 0.04, 금속 F₀ = 기본색 → 정면은 4%만 반사하던 플라스틱도 스치는 각에선 거의 거울이 된다.","확산은 <code>기본색·(1−금속도)/π</code>. 금속은 확산이 0이라 빛을 받는 쪽도 반사만 보이고, 환경(하늘)이 없으면 검게 보인다 → 환경 반사가 필수.",'측정: 고른 탐침 구를 전용 카메라로 96×96 타깃에 "직접 반사광 ÷ 스케일, F(N·V)"만 출력해 읽는다. 하이라이트 행의 픽셀마다 CPU 광선-구 교차로 θ_h = acos(N·H)를 붙여 피크와 반값 반각을, 중심 행에서 정면·가장자리 F를 같은 픽셀의 CPU 공식값과 비교한다.',"참고선: D만의 반값 반각은 <code>cos²θ = (√2·α² − 1)/(α² − 1)</code>. 실제 로브는 Vis·F·N·L이 곱해져 조금 다르다."],pros:["값 두 개(금속도·거칠기)로 플라스틱·고무·금속·광택 페인트를 일관되게 표현하고, 어떤 조명에서도 그럴듯하다.","에너지 보존이라 아티스트가 밝기를 따로 맞추지 않아도 거칠기를 바꿔도 전체 반사량이 크게 안 변한다.","엔진(언리얼·유니티·three.js)이 같은 모델을 써서 텍스처·에셋을 옮겨도 비슷하게 보인다."],cons:["환경광(IBL)이 없으면 금속이 검게 보인다. 반사 프로브·PMREM 같은 사전 필터링이 필요하다.","아주 매끈한(α → 0) 하이라이트는 한 픽셀보다 작아져 반짝임(스페큘러 앨리어싱)이 생긴다. 엔진은 거칠기 하한·법선 분산으로 막는다.","GGX는 꼬리가 길어 하이라이트 주변이 은은히 밝지만, 다층 재질(클리어코트·천)은 확장 모델이 따로 필요하다."],usedIn:"Disney의 원칙 기반 BRDF(2012)와 Epic의 언리얼 엔진 4 강연(Karis, 2013) 이후 GGX + Smith + Schlick 조합은 언리얼·유니티·three.js 등 대부분의 실시간 엔진 표준이 됐습니다. 여기 환경 반사는 하늘 그라데이션을 거칠기만큼 평균 쪽으로 섞은 간단한 근사입니다.",tips:["금속도는 거의 0 아니면 1로 칠한다. 중간값은 녹·먼지가 금속을 덮는 경계처럼 섞이는 곳에만 쓴다.","비금속 기본색은 sRGB 50~240 범위, 금속 기본색은 밝게(180~255) 둔다. 너무 어둡거나 순백인 기본색은 어떤 조명에서도 부자연스럽다.","비금속 F₀는 물 0.02, 플라스틱·돌 0.04 안팎이라 대부분 0.04 고정으로 충분하다. 보석처럼 굴절률이 큰 재질만 따로 올린다.","하이라이트 크기 감: D만의 반값 반각은 거칠기 0.3에서 약 3.3°, 0.5에서 약 9.6°, 0.7에서 약 21°다. 거칠기 하한을 0.05 안팎으로 두면 스페큘러 반짝임(앨리어싱)을 줄일 수 있다."],related:["iridescence","wet-surface","ssr","gi-bleed","tonemapping"],controls:[{type:"range",key:"pr",label:"탐침 구 거칠기 칸 (0.1 → 0.9)",min:0,max:4,step:1,value:2},{type:"range",key:"pm",label:"탐침 구 금속도 칸 (0 → 1)",min:0,max:4,step:1,value:0},{type:"toggle",key:"auto",label:"빛 방향 자동으로 흔들기",value:!0},{type:"range",key:"az",label:"빛 방위 (rad, 자동 끔일 때)",min:-1.2,max:.6,step:.01,value:-.4}],viewers:[{title:"블린-퐁 (옛 방식)",kind:"before",caption:'거칠기만 지수로 바뀌고 금속도는 무시됩니다. 위쪽 "금속" 줄도 흰 하이라이트의 플라스틱처럼 보이고, 가장자리 반사(프레넬)가 없습니다.',mount:ce("phong")},{title:"직접 구현 GGX Cook-Torrance",kind:"after",caption:"위로 갈수록 확산이 사라지고 반사가 기본색을 띱니다. 오른쪽으로 갈수록 하이라이트가 넓고 낮아지며, 아래 비금속 구도 가장자리에서 하늘을 강하게 비춥니다. 노란 고리가 탐침 구입니다.",mount:ce("ggx")},{title:"three.js MeshStandardMaterial",kind:"variant",caption:"엔진 내장 PBR. 같은 GGX 계열이라 격자의 경향은 같고, 환경은 같은 하늘을 PMREM으로 사전 필터링해 거친 금속 반사가 더 정확히 흐려집니다.",mount:ce("three")},{title:"로브 · 프레넬 측정",kind:"info",caption:"왼쪽: 탐침 구 하이라이트 행의 반사광(피크로 정규화) vs θ_h. 파랑 = 같은 픽셀 공식, 노랑 = GPU, 회색 점선 = D만 (거칠기 0.1은 로브가 1픽셀≈1°보다 좁아 픽셀 한계). 오른쪽: Schlick 곡선(F₀ 0.04 / 금속)과 중심 행에서 읽은 F(N·V).",mount:Ze}]};export{rt as default};
