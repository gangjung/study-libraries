import{W as B,V as re,ac as le,k as ie,H as ue,u as fe,M as F,y as he,aa as me,b as O,g as V,D as de,c as pe,z as ve,e as xe}from"./three.module-CEzfHhrp.js";import{m as ye}from"./three-viewer-fx7lDL-0.js";import{m as Me,b as E,s as be}from"./canvas-viewer-QtaWfmlz.js";import{c as ke,t as A,l as Ce}from"./chart2d-DfgeckAJ.js";import{h as we,P as X}from"./extra-kit-c-FPjCbN4U.js";import{s as Pe,e as ge,h as $e}from"./anime-kit-C6AkWSFn.js";const p=160,C=8,Q=Array.from({length:C},(o,r)=>r/(C-1)),Ke=[[.96,.55,.2],[.2,.62,.92],[.92,.22,.46],[.3,.76,.36],[.98,.9,.3],[.46,.3,.72],[.6,.6,.6],[.15,.14,.2]],J=["주황","하늘","분홍","초록","노랑","보라","회색","먹색"],Z=[15,75,0,45],Fe=["C","M","Y","K"],ee=["#38d9d9","#e66cff","#facc15","#e6e9ef"];function Le(o,r,l){const c=1-Math.max(o,r,l);return c>.999?[0,0,0,1]:[(1-o-c)/(1-c),(1-r-c)/(1-c),(1-l-c)/(1-c),c]}function G(o,r){const l=r*Math.sqrt(Math.max(0,o)/Math.PI),c=96;let e=0;for(let w=0;w<c;w++){const y=((w+.5)/c-.5)*r;for(let f=0;f<c;f++){const M=((f+.5)/c-.5)*r;e+=Math.min(1,Math.max(0,l-Math.hypot(M,y)+.5))}}return e/(c*c)}const te=`
uniform sampler2D tSrc;
uniform vec2 uRes;
uniform float uCell, uAng, uMode, uProbe, uBarPx;
uniform vec4 uAngs;
uniform vec3 uPatch[${C}];
varying vec2 vUv;
const float PI = 3.14159265;
vec3 patchCol(float k) {
  vec3 c = uPatch[0];
  for (int i = 1; i < ${C}; i++) if (float(i) <= k) c = uPatch[i];
  return c;
}
vec3 tone(vec2 f) {
  if (uProbe > 0.5) return patchCol(floor(f.x / ${p.toFixed(1)}));
  if (f.y < uBarPx) return patchCol(floor(clamp(f.x / uRes.x, 0.0, 0.9999) * ${C.toFixed(1)}));
  vec3 c = texture2D(tSrc, f / uRes).rgb;
  return pow(max(c, vec3(0.0)), vec3(1.0 / 2.2));
}
vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }
float chan(vec3 c, int ch) {
  if (ch == 0) return 1.0 - dot(c, vec3(0.2126, 0.7152, 0.0722));
  float K = 1.0 - max(c.r, max(c.g, c.b));
  if (ch == 4) return K;
  if (K > 0.999) return 0.0;
  float v = ch == 1 ? c.r : ch == 2 ? c.g : c.b;
  return (1.0 - v - K) / (1.0 - K);
}
float screenDot(vec2 f, float ang, int ch) {
  vec2 p = rot(f, ang);
  vec2 cc = (floor(p / uCell) + 0.5) * uCell;
  float v = chan(tone(rot(cc, -ang)), ch);
  float r = uCell * sqrt(max(v, 0.0) / PI);
  return clamp(r - length(p - cc) + 0.5, 0.0, 1.0);
}
void main() {
  vec2 f = gl_FragCoord.xy;
  vec3 paper = vec3(0.97, 0.94, 0.86);
  vec3 col;
  if (uMode < 0.5) {
    col = tone(f);
  } else if (uMode < 1.5) {
    float k = screenDot(f, uAng, 0);
    if (uProbe > 0.5) { gl_FragColor = vec4(k, 0.0, 0.0, 1.0); return; }
    col = mix(paper, vec3(0.1, 0.12, 0.25), k);
  } else {
    float C = screenDot(f, uAngs.x, 1);
    float M = screenDot(f, uAngs.y, 2);
    float Y = screenDot(f, uAngs.z, 3);
    float K = screenDot(f, uAngs.w, 4);
    if (uProbe > 0.5) { gl_FragColor = vec4(C, M, Y, K); return; }
    col = paper * mix(vec3(1.0), vec3(0.0, 0.66, 0.94), C) * mix(vec3(1.0), vec3(0.93, 0.0, 0.55), M) * mix(vec3(1.0), vec3(1.0, 0.93, 0.0), Y) * mix(vec3(1.0), vec3(0.08, 0.08, 0.1), K);
  }
  gl_FragColor = vec4(pow(col, vec3(2.2)), 1.0);
  #include <colorspace_fragment>
}`,Ne=(o,r)=>be(o.shared,"htClock",r,()=>({t:0}),(l,c)=>l.t+=c);function Se(o){o.background=null,o.add(Pe(15331061,7313366)),o.add(new ue(16777215,9080734,.9));const r=new fe(16774368,2.3);r.position.set(4,7,3),o.add(r);const l=(a,i=.6)=>new V({color:a,roughness:i}),c=new F(new he(9,48),l(15391163,1));c.rotation.x=-Math.PI/2,o.add(c);const e=new me;o.add(e);const w=new F(new O(.45,.9,8,32),l(15753295));w.position.y=.95,e.add(w);const y=new F(ge(.42,.46,.42),l(16768194,.7));y.position.y=2,e.add(y);const f=new F($e({sx:.45,sy:.49,sz:.46,front:.95,tips:1.3,side:1.95,back:2.25,strands:20,phase:.5}),new V({color:3423380,roughness:.45,side:de}));f.position.y=2,e.add(f);for(const a of[-1,1]){const i=new F(new O(.11,.6,6,16),l(15753295));i.position.set(a*.55,1.05,0),i.rotation.z=a*.25,e.add(i)}const M=new F(new pe(.85,48,32),l(6538141,.5));M.position.set(-2.1,.85,-.6),o.add(M);const $=new F(new ve(.5,.17,160,20),l(16040525,.35));$.position.set(2,1.25,-.3),o.add($);const n=new F(new xe(.5,1.2,40),l(8415704));return n.position.set(.9,.6,1.6),o.add(n),{animate(a){$.rotation.set(a*.4,a*.6,0),e.position.y=Math.abs(Math.sin(a*2.2))*.12,e.rotation.y=Math.sin(a*.5)*.5,n.rotation.y=a*.3}}}function Y(o){return r=>ye(r,{antialias:!1,fov:38,cam:[4.2,3,7.2],target:[0,1,0],far:120},({scene:l,camera:c,renderer:e})=>{const w=Se(l),y=new B(4,4,{type:we(e),samples:4}),f=new B(p*C,p),M=new Uint8Array(p*C*p*4),$=(o==="cmyk"?Ke:Q.map(s=>[s,s,s])).map(s=>new re(...s)),n=s=>({tSrc:{value:y.texture},uRes:{value:new ie(4,4)},uCell:{value:8},uAng:{value:0},uAngs:{value:new le(...Z.map(P=>P*Math.PI/180))},uMode:{value:o==="orig"?0:o==="mono"?1:2},uProbe:{value:s},uBarPx:{value:20},uPatch:{value:$}}),a=new X(te,n(0)),i=new X(te,n(1));i.u.uRes.value.set(p*C,p);let t=1,h=300,L="",I=NaN,T=NaN;const oe=o==="cmyk"?4:1,u={me:[],th:[],v:[],cell:8,cellDev:8,err:NaN};r.shared.set(`ht-meas-${o}`,u);const ne=(s,P,b,K)=>{const m=Math.cos(P),d=Math.sin(P),v=s*p;let g=0,x=0;for(let k=0;k<p;k++)for(let N=0;N<p;N++){const z=v+N+.5,H=k+.5,ce=Math.floor((m*z-d*H)/b),se=Math.floor((d*z+m*H)/b);let R=!0;for(let D=0;D<4&&R;D++){const U=(ce+(D&1))*b,j=(se+(D>>1))*b,W=m*U+d*j,q=-d*U+m*j;(W<v||W>v+p||q<0||q>p)&&(R=!1)}R&&(g+=M[(k*p*C+v+N)*4+K],x++)}return x?g/x/255:NaN},ae=(s,P)=>{i.u.uCell.value=s,i.u.uAng.value=P,i.render(e,f),e.readRenderTargetPixels(f,0,0,p*C,p,M),e.setRenderTarget(null),u.me=[],u.th=[],u.v=[];let b=0,K=0;for(let m=0;m<C;m++){const d=$[m],v=o==="cmyk"?Le(d.x,d.y,d.z):[1-(.2126*d.x+.7152*d.y+.0722*d.z)],g=[],x=[];for(let k=0;k<oe;k++){const N=o==="cmyk"?Z[k]*Math.PI/180:P;g.push(ne(m,N,s,k)),x.push(G(v[k],s)),Number.isFinite(g[k])&&(b+=Math.abs(g[k]-x[k]),K++)}u.me.push(g),u.th.push(x),u.v.push(v)}u.err=K?b/K:NaN,u.cell=s/t,u.cellDev=s},S=s=>s!==void 0&&Number.isFinite(s)?`${(s*100).toFixed(1)}%`:"--",_=s=>s!==void 0&&Number.isFinite(s)?`${Math.round(s*100)}`:"--";return{resize(s,P,b){t=b,h=P;const K=Math.max(1,Math.floor(s*b)),m=Math.max(1,Math.floor(P*b));y.setSize(K,m),a.u.uRes.value.set(K,m),L=""},update(s,P,b){const K=Ne(r,b);w.animate(K.t);const m=r.params,d=m.num("cell",8),v=d*t,g=m.num("angle",45)*Math.PI/180;for(const x of[a,i])x.u.uCell.value=v,x.u.uAng.value=g;if(a.u.uBarPx.value=m.bool("bar",!0)?Math.max(18,Math.min(h*.14,3.2*d))*t:-1,o!=="orig"){const x=`${v.toFixed(3)}|${g.toFixed(4)}`;x!==L&&(L=x,ae(v,g))}if(o==="orig"){v!==I&&(I=v,T=G(1,v)),r.hud(["원본 (연속 톤)",`L=0 → 목표 1−L 100% / 잘린 망점 ${S(T)}`,"r > 셀/2 시작: 1−L > π/4 = 78.5%"].join(`
`));return}u.me.length&&(o==="mono"?r.hud([`셀 ${d.toFixed(1)}px · ${m.num("angle",45).toFixed(0)}° · r = s√((1−L)/π)`,`L=${Q[5].toFixed(2)} 측정 ${S(u.me[5][0])} / 이론 ${S(u.th[5][0])}`,`L=0.00 측정 ${S(u.me[0][0])} / 이론 ${S(u.th[0][0])} (잘림)`,`8패치 평균 |오차| ${(u.err*100).toFixed(2)}%p`].join(`
`)):r.hud([`C 15° · M 75° · Y 0° · K 45° · 셀 ${d.toFixed(1)}px`,`${J[0]} CMYK 측정 ${u.me[0].map(_).join("/")}%`,`${J[0]} CMYK 이론 ${u.th[0].map(_).join("/")}%`,`32칸 평균 |오차| ${(u.err*100).toFixed(2)}%p`].join(`
`)))},render(){e.setRenderTarget(y),e.render(l,c),a.render(e,null)},dispose(){y.dispose(),f.dispose(),a.dispose(),i.dispose()}}})}function De(o){let r=NaN;const l=41,c=new Float32Array(l);return Me(o,()=>({draw(e,w,y){ke(e,w,y);const f=o.shared.get("ht-meas-mono"),M=o.shared.get("ht-meas-cmyk"),$=(f==null?void 0:f.cellDev)??8;if($!==r){r=$;for(let t=0;t<l;t++)c[t]=G(t/(l-1),$)}const n={x:40,y:24,w:E(w-56,20),h:E(y-52,20)},a=t=>n.x+t*n.w,i=t=>n.y+n.h-t*n.h;e.strokeStyle="#1c2230",e.strokeRect(n.x+.5,n.y+.5,n.w,n.h);for(const t of[0,.5,1])A(e,`${t*100}%`,n.x-4,i(t)+3,"#7d8799",9,"right"),A(e,`${t}`,a(t),n.y+n.h+11,"#7d8799",9,"center");e.fillStyle="rgba(255,154,60,0.08)",e.fillRect(a(Math.PI/4),n.y,n.w-(a(Math.PI/4)-n.x),n.h),e.strokeStyle="#5a6272",e.setLineDash([4,3]),e.beginPath(),e.moveTo(a(0),i(0)),e.lineTo(a(1),i(1)),e.stroke(),e.setLineDash([]),e.strokeStyle="#ff9a3c",e.lineWidth=2,e.beginPath();for(let t=0;t<l;t++){const h=t/(l-1);t?e.lineTo(a(h),i(c[t])):e.moveTo(a(h),i(c[t]))}if(e.stroke(),e.lineWidth=1,M&&M.me.length)for(let t=0;t<C;t++)for(let h=0;h<4;h++){const L=M.me[t][h];!Number.isFinite(L)||M.v[t][h]<.01||(e.fillStyle=ee[h],e.fillRect(a(M.v[t][h])-2,i(L)-2,4,4))}if(f&&f.me.length){e.fillStyle="#ffffff";for(let t=0;t<C;t++){const h=f.me[t][0];Number.isFinite(h)&&(e.beginPath(),e.arc(a(f.v[t][0]),i(h),3.5,0,Math.PI*2),e.fill())}}A(e,"잉크 커버리지 vs 어두움 v (= 1−L 또는 잉크량)",n.x,14,"#c8d0dc",10),A(e,"r > 셀/2",a(Math.PI/4)+3,n.y+n.h-6,"#ff9a3c",9),Ce(e,[{label:"목표 v",color:"#5a6272"},{label:"잘림 이론",color:"#ff9a3c"},{label:"흑백 측정",color:"#ffffff"},...Fe.map((t,h)=>({label:t,color:ee[h]}))],n.x,y-4,9),o.hud("")}}))}const _e={layout:"compare",intro:"<b>하프톤(망점)</b>은 인쇄기가 회색을 찍는 방법입니다. 잉크는 칠하거나 안 칠하거나 둘뿐이라, 대신 <b>점의 크기</b>로 어두움을 표현합니다 – 점 넓이가 곧 어두움. 셰이더로 이 규칙을 재현하면 3D 장면이 만화책·팝아트 인쇄물처럼 보입니다. 같은 장면을 <b>원본 / 흑백 망점 / CMYK 4색 망점</b>으로 비교하고, 점 넓이가 실제로 1 − L을 따르는지(그리고 어디서 따르지 못하는지) 측정합니다.",how:["픽셀 좌표를 망점 각도 α만큼 돌려 한 변 s의 셀 격자를 만들고, 셀 중심에서 원본 톤을 <b>한 번만</b> 읽는다 (셀 안은 같은 크기의 점 하나).","점 넓이 = 셀 넓이 × 어두움이 되도록 <code>r = s·√((1−L)/π)</code> (πr² = s²(1−L)). 가장자리는 1px 램프로 앤티에일리어싱.","단, 점은 자기 셀 안에서만 그려지므로 <code>r &gt; s/2</code>(1−L &gt; π/4 ≈ 78.5%)부터 네 변에서 잘린다 → 완전한 검정도 약 91%까지만 덮인다. 실제 인쇄는 이웃 점과 합쳐지는 모양(체인 점)으로 이 구간을 메운다.","CMYK: <code>K = 1 − max(R,G,B)</code>, <code>C = (1−R−K)/(1−K)</code> … 네 판을 각각 15°·75°·0°·45°로 돌려 겹친다 – 각도를 엇갈려야 판끼리 간섭 무늬(모아레)가 덜 생긴다.","측정: 같은 셰이더를 균일 톤 패치 8개(160×160px)에 그려 GPU에서 읽고, 패치 안에 셀이 통째로 들어간 픽셀만 평균한다. 이론은 셀 정사각형 안의 램프 점 넓이를 수치 적분한 값(잘림 포함)."],pros:['톤이 "점의 크기"라는 그래픽 요소로 바뀌어 화면 전체가 하나의 인쇄물 스타일로 통일된다.',"셀 크기·각도·잉크 색이 그대로 아트 디렉션 손잡이가 되고, 후처리 한 패스라 싸다.","면적 보존 공식 덕분에 망점을 써도 장면의 밝기 관계(명암 구조)가 유지된다."],cons:["셀보다 작은 디테일(얇은 선, 작은 글자)은 셀 하나의 톤으로 뭉개진다 – UI·외곽선은 망점 위에 따로 그린다.","카메라가 움직여도 격자는 화면에 고정이라 물체 위로 점이 미끄러지는 느낌이 날 수 있다 (오브젝트 공간 망점으로 해결하기도 한다).","정렬된 격자(0°)는 픽셀 격자와 맞물려 표본 오차·모아레가 커지고, r > s/2 구간은 잘림 때문에 어두운 톤이 덜 어둡다."],usedIn:"영화 〈스파이더맨: 뉴 유니버스〉의 인쇄 망점 질감이 대표적이고, 〈젠레스 존 제로〉·〈하이파이 러시〉 같은 만화·코믹스풍 게임의 연출에서도 망점이 화면 언어로 쓰입니다. 구체적인 셰이더 구현은 작품마다 다르며, 여기서는 일반적인 화면 공간 망점 기법을 보여 줍니다.",tips:['셀 크기는 1080p 기준 6~12px가 "점이 보이면서도 형태가 읽히는" 구간이다. 해상도에 비례해 키워야 모바일·4K에서 느낌이 같다.',"흑백 한 판이면 45°가 가장 덜 거슬린다(인쇄 표준). 0°는 픽셀 격자와 맞물려 표본 오차·모아레가 커진다.",'어두운 구간 잘림(검정이 91%)은 v > 0.5부터 "검정 바탕에 흰 점"으로 뒤집어 그리거나, 이웃 셀 점까지 거리 최솟값을 쓰면 메울 수 있다.',"화면 전체 대신 툰 셰이딩의 그림자 영역에만 망점을 깔면 만화 스크린톤 느낌이 된다. 외곽선·UI는 망점 패스 뒤에 그린다."],related:["comic-panel","cel-shading","edge-outline","crt-tv","pixelate"],controls:[{type:"range",key:"cell",label:"셀 크기 s (CSS px)",min:4,max:20,step:.5,value:8},{type:"range",key:"angle",label:"흑백 망점 각도 (°)",min:0,max:90,step:1,value:45},{type:"toggle",key:"bar",label:"아래쪽 컬러 바 (톤 패치)",value:!0}],viewers:[{title:"원본 (연속 톤)",kind:"before",caption:"부드러운 조명의 3D 장면입니다. 아래 컬러 바는 인쇄소가 쓰는 톤 확인용 패치(L = 0 → 1)입니다.",mount:Y("orig")},{title:"흑백 망점",kind:"variant",caption:"셀마다 점 하나, 점 넓이 = 1 − L. 측정 패치에서 잉크량이 이론과 맞고, 가장 어두운 패치만 셀 경계에서 잘려 91%에 머뭅니다.",mount:Y("mono")},{title:"CMYK 4색 망점",kind:"after",caption:"네 잉크 판을 15°·75°·0°·45°로 엇갈려 겹쳤습니다. 아래 바는 8가지 색 패치이고, HUD는 첫 패치(주황)의 C/M/Y/K 잉크량을 측정·이론으로 보여 줍니다 (Y판은 0° 정렬 격자라 표본 오차가 조금 큽니다).",mount:Y("cmyk")},{title:"커버리지 곡선",kind:"info",caption:"점선은 목표(커버리지 = 어두움), 주황은 셀 경계 잘림을 넣은 이론, 점은 GPU 측정값(흰 원 = 흑백, 색 사각형 = CMYK 각 판). 주황 구역(r > 셀/2)에서 곡선이 목표 아래로 꺾입니다.",mount:De}]};export{_e as default};
