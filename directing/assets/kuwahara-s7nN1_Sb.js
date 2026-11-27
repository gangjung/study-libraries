import{W as E,k as H,ae as X,af as q,a7 as B}from"./three.module-CEzfHhrp.js";import{m as O}from"./three-viewer-fx7lDL-0.js";import{m as Q,b as I,a as Y}from"./canvas-viewer-QtaWfmlz.js";import{c as K,t as N,l as L,g as V}from"./chart2d-DfgeckAJ.js";import{b as J,u as Z,c as C,d as tt}from"./postfx-kit-c-DBfwFReP.js";import{h as et,P as ot,a as z,f as U}from"./extra-kit-c-FPjCbN4U.js";import"./cam-kit2-DamJRS7e.js";const F=6,v=128,S=48,m=64,g=.3,A=.7,st=.05,at=`
uniform sampler2D tSrc;
uniform vec2 uTexel;
uniform float uMode;
uniform int uR;
varying vec2 vUv;
void main() {
  vec3 c0 = texture2D(tSrc, vUv).rgb;
  if (uMode < 0.5 || uR == 0) {
    gl_FragColor = vec4(c0, 1.0);
    #include <colorspace_fragment>
    return;
  }
  vec3 m[4];
  vec3 s[4];
  for (int k = 0; k < 4; k++) { m[k] = vec3(0.0); s[k] = vec3(0.0); }
  vec3 box = vec3(0.0);
  for (int j = -${F}; j <= ${F}; j++) {
    if (j < -uR || j > uR) continue;
    for (int i = -${F}; i <= ${F}; i++) {
      if (i < -uR || i > uR) continue;
      vec3 c = texture2D(tSrc, vUv + vec2(float(i), float(j)) * uTexel).rgb;
      box += c;
      vec3 c2 = c * c;
      if (i <= 0 && j <= 0) { m[0] += c; s[0] += c2; }
      if (i >= 0 && j <= 0) { m[1] += c; s[1] += c2; }
      if (i <= 0 && j >= 0) { m[2] += c; s[2] += c2; }
      if (i >= 0 && j >= 0) { m[3] += c; s[3] += c2; }
    }
  }
  float fr = float(uR);
  vec3 outc;
  if (uMode < 1.5) {
    outc = box / ((2.0 * fr + 1.0) * (2.0 * fr + 1.0));
  } else {
    float n = (fr + 1.0) * (fr + 1.0);
    float best = 1e9;
    outc = c0;
    for (int k = 0; k < 4; k++) {
      vec3 mu = m[k] / n;
      vec3 v = s[k] / n - mu * mu;
      float vs = v.r + v.g + v.b;
      if (vs < best) { best = vs; outc = mu; }
    }
  }
  gl_FragColor = vec4(outc, 1.0);
  #include <colorspace_fragment>
}`;function nt(){const r=Y(9090),t=new Uint8Array(v*S*4);let h=0,p=0,d=0;for(let k=0;k<S;k++)for(let n=0;n<v;n++){const y=n<m?g:A,c=Math.round(Math.min(1,Math.max(0,y+V(r)*st))*255),o=(k*v+n)*4;if(t[o]=t[o+1]=t[o+2]=c,t[o+3]=255,Math.abs(n-m)>10){const M=c-y*255;h+=M,p+=M*M,d++}}const R=new X(t,v,S,q);R.minFilter=R.magFilter=B,R.needsUpdate=!0;const b=h/d;return{tex:R,sigma:Math.sqrt(p/d-b*b)}}const rt=(r,t)=>r==="box"?1/(2*t+1):1,G=(r,t,h)=>r==="orig"?h:r==="box"?h/(2*t+1):h/(t+1);function D(r){return t=>O(t,{antialias:!1,orbit:!1,fov:42,cam:[0,3.6,10],far:120},({scene:h,camera:p,renderer:d})=>{const R=J(h,{seed:33,sky:["#2f5fa8","#ffd6a8"]}),b=new E(4,4,{type:et(d),samples:4}),k=nt(),n=new E(v,S),y=new Uint8Array(v*S*4),c=new ot(at,{tSrc:{value:b.texture},uTexel:{value:new H(.25,.25)},uMode:{value:r==="orig"?0:r==="box"?1:2},uR:{value:4}}),o={R:4,sharp:NaN,std:NaN,sigmaIn:k.sigma*1,profile:new Float32Array(v)};t.shared.set("kw-"+r,o);let M=0;const w=()=>{const i=o.R;c.u.tSrc.value=k.tex;const e=c.u.uTexel.value.clone();c.u.uTexel.value.set(1/v,1/S),c.render(d,n),c.u.tSrc.value=b.texture,c.u.uTexel.value.copy(e),d.readRenderTargetPixels(n,0,0,v,S,y);const u=i,s=S-i,a=o.profile;for(let x=0;x<v;x++){let T=0;for(let P=u;P<s;P++)T+=y[(P*v+x)*4];a[x]=T/(s-u)}let l=0;for(let x=m-12;x<m+12;x++)l=Math.max(l,Math.abs(a[x+1]-a[x]));o.sharp=l/((A-g)*255);let f=0,j=0,$=0;for(let x=u;x<s;x++)for(let T=i+2;T<v-i-2;T++){if(Math.abs(T-m)<i+4)continue;const P=y[(x*v+T)*4]-(T<m?g:A)*255;f+=P,j+=P*P,$++}const _=f/$;o.std=Math.sqrt(Math.max(0,j/$-_*_))};return{resize(i,e,u){const s=Math.min(u,1.25),a=Math.max(1,Math.floor(i*s)),l=Math.max(1,Math.floor(e*s));b.setSize(a,l),c.u.uTexel.value.set(1/a,1/l)},update(i,e,u){const s=Z(t.shared,"kwClock",u),a=t.params,l=a.bool("sway",!0)?Math.sin(s.t*.1):0;p.position.set(l*2.2,3.6,10),p.lookAt(l*.6,2,-1.5),p.updateMatrixWorld(),R.update(s.t);const f=Math.round(a.num("r",4));c.u.uR.value=f,f!==o.R&&(M=0),o.R=f;const j=2*f+1,$=r==="orig"?["원본 (필터 없음)"]:r==="box"?[`박스 블러 ${j}×${j} 평균`]:[`쿠와하라 R=${f}: 네 구역 (${f+1}×${f+1}) 중 최소 분산의 평균`];$.push(`경계 기울기 측정 ${z(o.sharp)} / 이론 ${z(rt(r,f))} (계단=1)`),$.push(`면 잡음 σ 측정 ${U(o.std)} / 이론 ${r==="kuwa"?"≈":""}${U(G(r,f,o.sigmaIn))} (8비트, 입력 ${U(o.sigmaIn)})`),t.hud($.join(`
`))},render(){d.setRenderTarget(b),d.render(h,p),M++%10===0&&w(),c.render(d,null)},dispose(){b.dispose(),n.dispose(),k.tex.dispose(),c.dispose(),R.textures.forEach(i=>i.dispose())}}})}const W=[{mode:"orig",label:"원본",color:"#c8d0dc"},{mode:"box",label:"박스 블러",color:"#5b9cff"},{mode:"kuwa",label:"쿠와하라",color:"#ff9a3c"}];function ct(r){return Q(r,()=>({draw(t,h,p){K(t,h,p);const d=W.map(e=>r.shared.get("kw-"+e.mode)),R=d.find(e=>e);if(!R)return;const b=R.R,k=Math.floor(h*.58),n={x:40,y:26,w:I(k-54,20),h:I(p-60,20)};C(t,n,"열 (경계 ±16px)","탐침 열 평균 (8비트)");const y=e=>n.x+(e-(m-16))/32*n.w,c=e=>n.y+n.h-(e-50)/155*n.h;for(const e of[g*255,A*255])N(t,e.toFixed(0),n.x-4,c(e)+3,"#7d8799",9,"right");t.strokeStyle="rgba(91,156,255,0.5)",t.setLineDash([4,3]),t.beginPath();for(let e=m-16;e<=m+16;e++){const u=Math.min(1,Math.max(0,(e-(m-b)+1)/(2*b+1))),s=(g+(A-g)*u)*255;e===m-16?t.moveTo(y(e),c(s)):t.lineTo(y(e),c(s))}t.stroke(),t.setLineDash([]),W.forEach((e,u)=>{const s=d[u];if(s){t.strokeStyle=e.color,t.lineWidth=1.6,t.beginPath();for(let a=m-16;a<=m+16;a++){const l=c(s.profile[a]);a===m-16?t.moveTo(y(a),l):t.lineTo(y(a),l)}t.stroke()}}),t.lineWidth=1,N(t,`점선 = 박스 이론 램프 (폭 ${2*b+1}px)`,n.x+4,n.y+12,"#7d8799",9);const o={x:k+26,y:26,w:I(h-k-38,20),h:I(p-60,20)};C(t,o,"","면 잡음 σ (8비트)");const M=Math.max(4,R.sigmaIn*1.15),w=e=>o.y+o.h-Math.min(e,M)/M*o.h;for(const e of[0,Math.round(M/2),Math.round(M)])N(t,String(e),o.x-4,w(e)+3,"#7d8799",9,"right");const i=o.w/3;W.forEach((e,u)=>{const s=d[u],a=o.x+u*i+i*.22,l=i*.56;if(s&&Number.isFinite(s.std)){t.fillStyle=e.color,t.globalAlpha=.8,t.fillRect(a,w(s.std),l,o.y+o.h-w(s.std)),t.globalAlpha=1;const f=G(e.mode,b,s.sigmaIn);t.strokeStyle="#f87171",t.lineWidth=2,t.beginPath(),t.moveTo(a-3,w(f)),t.lineTo(a+l+3,w(f)),t.stroke(),t.lineWidth=1,tt(t,a+l/2,w(s.std),"#e6e9ef",2.5)}N(t,e.label.split(" ")[0],o.x+u*i+i/2,o.y+o.h+12,"#c8d0dc",9,"center")}),L(t,W.map(e=>({label:e.label,color:e.color})),n.x,p-6,9),L(t,[{label:"이론 σ",color:"#f87171"}],o.x,p-6,9),r.hud("")}}))}const pt={layout:"variants",intro:'<b>쿠와하라 필터</b>는 "주변을 평균내되, <b>가장 고른 쪽</b>에서만 평균낸다"는 아주 단순한 규칙으로 사진을 <b>붓으로 칠한 그림</b>처럼 바꿉니다. 보통 블러는 경계도 함께 뭉개지만, 쿠와하라는 경계를 가로지르는 구역을 "얼룩덜룩하다(분산이 크다)"며 버리기 때문에 <b>윤곽은 날카롭게 남고 면 안의 잔무늬만</b> 물감 덩어리처럼 뭉칩니다. 세 뷰어는 같은 광장을 <b>원본 / 같은 창 크기의 박스 블러 / 쿠와하라</b>로 비교하고, 계단+잡음 탐침으로 두 성질을 숫자로 잽니다.',how:["픽셀 p 둘레 (2R+1)² 창을 p를 꼭짓점으로 하는 네 정사각 구역 Q0..Q3 (각 (R+1)²)로 나눈다. 창을 한 번만 돌며 네 구역의 Σc, Σc²를 함께 모은다.","구역마다 평균 <code>μk = Σc/n</code>, 분산 <code>σk² = Σc²/n − μk²</code> (RGB 합). 분산이 가장 작은 구역의 μ를 출력한다.","경계 바로 옆 픽셀에서는 경계를 넘지 않는 구역이 반드시 하나 있고 그 구역의 분산이 가장 작다 → 출력이 그 쪽 색 → 계단이 계단으로 남는다.","측정 ① 경계 기울기: 탐침 열 평균 프로파일의 최대 차분 / 계단 높이. 박스는 폭 2R+1 램프가 되어 <code>1/(2R+1)</code>, 쿠와하라는 ≈ 1.","측정 ② 면 잡음: 박스는 독립 잡음 (2R+1)²개 평균 → <code>σ/(2R+1)</code>. 쿠와하라는 (R+1)²개 평균 → <code>≈ σ/(R+1)</code> – 잡음은 덜 지우지만 경계를 지킨다.","확장: 일반화 쿠와하라(원형 8구역 + 가우시안 가중), 이방성 쿠와하라(구조 텐서로 구역을 획 방향으로 늘림)는 네모난 얼룩을 붓 자국 모양으로 바꾼다."],pros:['경계 보존 스무딩: 윤곽·실루엣은 그대로, 면 안의 잡디테일만 지워 "그림 같은" 인상을 만든다.',"셰이더 한 패스, 학습·참조 이미지 없이 결정적. 반경 R 하나로 붓 크기를 조절한다.","노이즈가 많은 저해상도 텍스처·저조도 장면도 그럴듯한 회화 톤으로 감출 수 있다."],cons:["비용이 R²에 비례 ((2R+1)² 표본). 반해상도에서 돌리거나 표본을 줄인 근사를 써야 모바일에서 버틴다.","고전 4구역은 네모난 얼룩·블록 무늬가 생긴다(측정에서도 잡음이 σ/(R+1)까지만 줄어든다).","얇은 선·작은 글자처럼 구역보다 가는 디테일은 어느 구역에도 다수로 남지 않아 사라진다 – UI는 필터 뒤에 그려야 한다."],usedIn:'비사실적 렌더링(NPR) 연구의 대표 필터(Kyprianidis 등의 이방성 쿠와하라, 2009), 유화·수채화 톤 인디 게임과 셰이더 데모, 일부 이미지 편집기의 "유화" 효과, 컷신·회상 장면의 회화풍 전환 연출.',tips:['1080p 기준 R = 3~6이 "붓 터치"로 읽히는 범위다. 표본 수가 (2R+1)²로 늘어나므로 R이 크면 반해상도에서 돌리고 결과를 키운다.',"네모난 얼룩이 거슬리면 원형 8구역 + 가우시안 가중(일반화 쿠와하라)으로 바꾸고, 붓 방향까지 원하면 구조 텐서로 구역을 늘이는 이방성 버전을 쓴다.","쿠와하라만 쓰면 형태가 흐릿해지기 쉽다. 깊이·노멀 외곽선을 위에 얹고 종이·캔버스 질감을 곱하면 회화풍이 확실해진다.","UI·자막·작은 아이콘은 필터 뒤에 그린다. 구역보다 가는 선은 필터를 거치면 사라진다."],related:["edge-outline","cel-shading","ink-wash-transition","halftone","pixelate"],controls:[{type:"range",key:"r",label:"반경 R (창 2R+1)",min:1,max:F,step:1,value:4},{type:"toggle",key:"sway",label:"카메라 천천히 이동",value:!0}],viewers:[{title:"원본",kind:"before",caption:"타일 결, 창문, 나뭇잎 면이 모두 그대로 보이는 일반 렌더입니다.",mount:D("orig")},{title:"박스 블러 (같은 창)",kind:"variant",caption:"같은 크기 창의 평균입니다. 잔무늬는 사라지지만 건물 윤곽·지붕 선·인형 실루엣까지 함께 번집니다.",mount:D("box")},{title:"쿠와하라",kind:"after",caption:"면 안은 물감 덩어리처럼 뭉치는데 윤곽은 날카롭게 남습니다. 붓으로 칠한 그림 같은 인상이 됩니다.",mount:D("kuwa")},{title:"경계 프로파일 · 면 잡음",kind:"info",caption:"왼쪽: 탐침 계단을 가로지른 열 평균. 박스(파랑)는 이론 램프(점선)처럼 기울고 쿠와하라(주황)는 원본처럼 곧게 섭니다. 오른쪽: 평탄 영역 잡음 σ 측정 막대와 이론(빨간 선).",mount:ct}]};export{pt as default};
