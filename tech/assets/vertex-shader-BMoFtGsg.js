import{x as P,a3 as G,a4 as V,y as _,aR as U,g as p,p as w,u as b,M as A,aM as j,aT as k,aU as L,bO as C,S as W}from"./three.module-BZgG6AUv.js";import{m as B}from"./three-viewer-0rZIEDzf.js";const u=new p,d=new p,M=new U;class H extends P{constructor(a,i=1,m=16711680){const s=new G,r=a.geometry.attributes.normal.count,n=new V(r*2*3,3);s.setAttribute("position",n),super(s,new _({color:m,toneMapped:!1})),this.object=a,this.size=i,this.type="VertexNormalsHelper",this.matrixAutoUpdate=!1,this.update()}update(){this.object.updateMatrixWorld(!0),M.getNormalMatrix(this.object.matrixWorld);const a=this.object.matrixWorld,i=this.geometry.attributes.position,m=this.object.geometry;if(m){const s=m.attributes.position,r=m.attributes.normal;let n=0;for(let e=0,o=s.count;e<o;e++)u.fromBufferAttribute(s,e).applyMatrix4(a),d.fromBufferAttribute(r,e),d.applyMatrix3(M).normalize().multiplyScalar(this.size).add(u),i.setXYZ(n,u.x,u.y,u.z),n=n+1,i.setXYZ(n,d.x,d.y,d.z),n=n+1}i.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}const N=`
uniform vec3 L; uniform vec3 camP; uniform vec3 albedo;
vec3 shade(vec3 N, vec3 P){
  vec3 V = normalize(camP - P), H = normalize(L + V);
  float d = max(dot(N, L), 0.);
  float s = pow(max(dot(N, H), 0.), 80.) * step(0., dot(N, L));
  return albedo * (d * .85 + .12) + vec3(s);
}`,$=`
${N}
varying vec3 vCol;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vec3 N = normalize(mat3(modelMatrix) * normal);
  vCol = shade(N, w.xyz);          // 정점마다 조명 → 색을 넘김
  gl_Position = projectionMatrix * viewMatrix * w;
}`,O=`
varying vec3 vCol;
void main(){ gl_FragColor = vec4(vCol, 1.);
  #include <colorspace_fragment>
}`,R=`
varying vec3 vN; varying vec3 vW;
void main(){
  vec4 w = modelMatrix * vec4(position, 1.);
  vN = normalize(mat3(modelMatrix) * normal);   // 법선·위치만 넘기고
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,D=`
${N}
varying vec3 vN; varying vec3 vW;
void main(){ gl_FragColor = vec4(shade(normalize(vN), vW), 1.);   // 픽셀마다 조명
  #include <colorspace_fragment>
}`,T=`
attribute vec3 vcol; uniform float useFlat;
varying vec3 vSmooth; flat varying vec3 vFlat;
void main(){ vSmooth = vcol; vFlat = vcol; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,I=`
uniform float useFlat;
varying vec3 vSmooth; flat varying vec3 vFlat;
void main(){ gl_FragColor = vec4(useFlat > .5 ? vFlat : vSmooth, 1.);
  #include <colorspace_fragment>
}`;function S(t){return new W(1,t,Math.max(3,Math.round(t*.6)))}function X(t,a){return B(t,{antialias:!0,cam:[0,.6,3.6]},({scene:i,camera:m})=>{i.background=new w(1053724);let s=t.params.num("seg",10);const r={L:{value:new p},camP:{value:new p},albedo:{value:new w(6003967).convertSRGBToLinear()},useFlat:{value:0}},n=a==="gouraud"?new b({uniforms:r,vertexShader:$,fragmentShader:O}):a==="varying"?new b({uniforms:r,vertexShader:T,fragmentShader:I}):new b({uniforms:r,vertexShader:R,fragmentShader:D}),e=new A(S(s),n);i.add(e);let o=null,g=null,f=null;const x=()=>{if(a==="varying"){const y=e.geometry.attributes.position.count,c=new Float32Array(y*3);let v=12345;for(let l=0;l<c.length;l++)v=v*16807%2147483647,c[l]=.15+v/2147483647*.85;e.geometry.setAttribute("vcol",new j(c,3))}a==="debug"&&(o==null||o.dispose(),o&&i.remove(o),g&&i.remove(g),f&&i.remove(f),o=new H(e,.18,16436245),g=new k(e.geometry,new L({color:16777215,size:4,sizeAttenuation:!1})),f=new P(new C(e.geometry),new _({color:6003967,transparent:!0,opacity:.35})),e.visible=!1,i.add(o,g,f))};x();const F=t.params.on(y=>{y==="seg"&&(s=t.params.num("seg",10),e.geometry.dispose(),e.geometry=S(s),x())});return{update(y,c){var h;const v=new p(Math.cos(c*.6)*.8,.6,Math.sin(c*.6)*.8+.5).normalize();t.params.bool("animate")||v.set(.5,.6,.62).normalize(),r.L.value.copy(v),r.camP.value.copy(m.position),r.useFlat.value=t.params.bool("flat")?1:0;const l=e.geometry.attributes.position.count,z=(((h=e.geometry.index)==null?void 0:h.count)??l)/3;o&&o.update(),t.hud({gouraud:`정점에서 조명 계산 → 색 보간 (정점 ${l}개 = 셰이더 ${l}회)`,phong:`정점은 법선만 넘기고 픽셀에서 조명 (정점 ${l}개)`,debug:`정점 ${l}개 · 삼각형 ${z}개 · 노랑 = 정점 법선`,varying:t.params.bool("flat")?"flat: 보간 없이 한 정점의 값":"기본: 세 정점 값을 무게중심 좌표로 보간"}[a])},dispose(){F(),o==null||o.dispose()}}})}const Y=[{mode:"gouraud",title:"정점 조명 (고러드)",kind:"before",caption:"조명을 정점 셰이더에서 계산해 색만 넘기면, 삼각형 안은 세 꼭짓점 색의 선형 보간. 하이라이트가 정점 사이에 떨어지면 사라지거나 별 모양으로 깨진다. 분할 수를 낮춰 보세요."},{mode:"phong",title:"픽셀 조명 (퐁)",kind:"after",caption:"정점 셰이더는 법선과 위치만 varying으로 넘기고, 조명은 픽셀마다 계산. 같은 메시인데 하이라이트가 둥글고 매끈하다. 계산량은 정점 수가 아니라 픽셀 수에 비례."},{mode:"debug",title:"정점 셰이더가 보는 것",kind:"info",caption:"정점 셰이더는 이 점들 하나하나에 대해 한 번씩 실행된다. 입력(속성): 위치·법선(노랑)·UV. 출력: 클립 공간 위치(gl_Position) + 다음 단계로 넘길 varying."},{mode:"varying",title:"varying 보간",kind:"variant",caption:'정점마다 다른 색을 넘기면 래스터라이저가 삼각형 안을 원근 보정 무게중심 좌표로 섞는다. "flat"으로 선언하면 보간 없이 한 정점(도발 정점)의 값을 그대로 쓴다 — 로우폴리 스타일, 정수 ID 전달에 사용.'}],E={layout:"variants",intro:"<b>버텍스(정점) 셰이더</b>는 GPU 파이프라인의 첫 프로그래밍 단계로, 메시의 <b>정점마다 한 번</b> 실행됩니다. 하는 일은 크게 두 가지: (1) 정점 위치를 화면(클립 공간)으로 <b>변환</b>하고, (2) 법선·UV·색 같은 값을 <b>varying</b>으로 다음 단계에 넘깁니다. 넘긴 값은 래스터라이저가 삼각형 내부로 보간해 프래그먼트(픽셀) 셰이더에 전달합니다.",how:["입력: 정점 속성(attribute) — position, normal, uv, 색, 스키닝 가중치… + 모든 정점에 같은 uniform(행렬, 시간).","gl_Position = 투영 × 뷰 × 모델 × 위치 (필수 출력). 이후 원근 나눗셈·뷰포트 변환은 고정 하드웨어.","varying 출력은 삼각형 세 정점 값을 원근 보정 보간해 픽셀 셰이더로. flat이면 보간 없음.","정점에서 할 일 vs 픽셀에서 할 일: 정점 수 ≪ 픽셀 수이면 정점 쪽이 싸지만, 빠르게 변하는 값(하이라이트)은 보간으로 깨진다.","정점 셰이더로 하는 대표 기법: 스키닝, 모프 타깃, 바람·물결 변위, 빌보드, 지형 높이맵, 인스턴싱 변환.","정점 셰이더는 정점을 만들거나 없앨 수 없다 → 테셀레이션·지오메트리·메시 셰이더의 몫."],pros:["정점 단위 계산은 싸다 (정점 수 ≪ 픽셀 수)","변형·애니메이션을 GPU에서 대량 병렬로","CPU↔GPU 데이터 전송 없이 메시를 움직임"],cons:["정점 사이 값은 선형 보간뿐 → 고주파 효과는 픽셀 셰이더로","이웃 정점 정보를 모름 (법선 재계산 등이 어려움)","정점 수를 바꿀 수 없음"],usedIn:"모든 GPU 렌더링(OpenGL·DirectX·Vulkan·Metal). 고러드 셰이딩은 PS1·N64 시절 표준, 현재도 모바일 저사양 재질과 버텍스 라이팅(먼 물체)에 쓰인다.",controls:[{type:"range",key:"seg",label:"구 분할 수",min:4,max:64,step:1,value:10},{type:"toggle",key:"flat",label:"flat varying (보간 끄기)",value:!1},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:Y.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:a=>X(a,t.mode)}))};export{E as default};
