import{W as B,a7 as I,S as xe,D as pe,k as be,C as ye,V as X}from"./three.module-CEzfHhrp.js";import{m as he}from"./three-viewer-fx7lDL-0.js";import{m as ke,b as K}from"./canvas-viewer-QtaWfmlz.js";import{c as ge,t as _,l as ae}from"./chart2d-DfgeckAJ.js";import{p as Me,r as we}from"./anime-kit-C6AkWSFn.js";import{b as Te,u as Ne,c as le,d as Se}from"./postfx-kit-c-DBfwFReP.js";import{h as De,P as se,f as Ae,p as re}from"./extra-kit-c-FPjCbN4U.js";import"./cam-kit2-DamJRS7e.js";const ie=120,Ce=[3.4,6.1,1.2],ze=.75,Fe=`
varying vec3 vN;
varying float vD;
void main() {
  vec4 p = vec4(position, 1.0);
  vec3 n = normal;
  #ifdef USE_INSTANCING
  p = instanceMatrix * p;
  n = mat3(instanceMatrix) * n;
  #endif
  vec4 mv = modelViewMatrix * p;
  vN = normalize(normalMatrix * n);
  vD = -mv.z;
  gl_Position = projectionMatrix * mv;
}`,Re=`
uniform float uFar;
varying vec3 vN;
varying float vD;
void main() {
  vec3 n = normalize(vN) * (gl_FrontFacing ? 1.0 : -1.0);
  gl_FragColor = vec4(n, vD / uFar);
}`,Ue=`
uniform sampler2D tCol, tND;
uniform vec2 uTexel;
uniform float uK, uMode, uRoberts, uTc, uTd, uTn;
varying vec2 vUv;
float lum(vec2 uv) { return dot(texture2D(tCol, uv).rgb, vec3(0.2126, 0.7152, 0.0722)); }
vec4 nd(vec2 uv) { return texture2D(tND, uv); }
void main() {
  vec2 o = uTexel * uK;
  float e = 0.0;
  if (uRoberts > 0.5) {
    // 로버츠 크로스: p, p+(k,k), p+(k,0), p+(0,k)
    vec2 a = vUv, b = vUv + o, c = vUv + vec2(o.x, 0.0), d = vUv + vec2(0.0, o.y);
    if (uMode < 0.5) {
      float g = abs(lum(a) - lum(b)) + abs(lum(c) - lum(d));
      e = step(uTc, g * 0.5);
    } else {
      vec4 A = nd(a), B = nd(b), C = nd(c), D = nd(d);
      float dc = max(A.w, 1e-4);
      float gd = (abs(A.w - B.w) + abs(C.w - D.w)) * 0.5 / dc;
      e = step(uTd, gd);
      if (uMode > 1.5) {
        vec3 gn = (abs(A.xyz - B.xyz) + abs(C.xyz - D.xyz)) * 0.5;
        e = max(e, step(uTn, gn.x + gn.y + gn.z));
      }
    }
  } else {
    // 소벨 3×3 (간격 k)
    vec4 s[9];
    float l[9];
    for (int j = 0; j < 3; j++)
      for (int i = 0; i < 3; i++) {
        vec2 uv = vUv + vec2(float(i - 1), float(j - 1)) * o;
        if (uMode < 0.5) l[j * 3 + i] = lum(uv);
        else s[j * 3 + i] = nd(uv);
      }
    if (uMode < 0.5) {
      float gx = (l[2] + 2.0 * l[5] + l[8]) - (l[0] + 2.0 * l[3] + l[6]);
      float gy = (l[6] + 2.0 * l[7] + l[8]) - (l[0] + 2.0 * l[1] + l[2]);
      e = step(uTc, length(vec2(gx, gy)) * 0.25);
    } else {
      vec4 gx = (s[2] + 2.0 * s[5] + s[8]) - (s[0] + 2.0 * s[3] + s[6]);
      vec4 gy = (s[6] + 2.0 * s[7] + s[8]) - (s[0] + 2.0 * s[1] + s[2]);
      float dc = max(s[4].w, 1e-4);
      float gd = length(vec2(gx.w, gy.w)) * 0.25 / dc;
      e = step(uTd, gd);
      if (uMode > 1.5) {
        vec3 gn = sqrt(gx.xyz * gx.xyz + gy.xyz * gy.xyz) * 0.25;
        e = max(e, step(uTn, gn.x + gn.y + gn.z));
      }
    }
  }
  gl_FragColor = vec4(e, 0.0, 0.0, 1.0);
}`,Ee=`
uniform sampler2D tCol, tEdge;
uniform vec3 uInk;
uniform float uMask;
varying vec2 vUv;
void main() {
  vec3 c = texture2D(tCol, vUv).rgb;
  float e = texture2D(tEdge, vUv).r;
  if (uMask > 0.5) c = vec3(0.92);
  gl_FragColor = vec4(mix(c, uInk, e), 1.0);
  #include <colorspace_fragment>
}`,ue=(p,o)=>o?p:2*p;function ce(p,o,v,s,c,M){for(let f=0;f<c;f++)for(let a=0;a<s;a++){let m=0;for(let u=-M;u<=M&&!m;u++){const b=a+u;b>=0&&b<s&&(m=p[f*s+b])}v[f*s+a]=m}for(let f=0;f<c;f++)for(let a=0;a<s;a++){let m=0;for(let u=-M;u<=M&&!m;u++){const b=f+u;b>=0&&b<c&&(m=v[b*s+a])}o[f*s+a]=m}}function Y(p){return o=>he(o,{antialias:!1,orbit:!1,fov:45,cam:[0,4.5,13],far:ie},({scene:v,camera:s,renderer:c})=>{const M=Te(v,{seed:21,probeSphere:{pos:Ce,r:ze,color:9085638}}),f=De(c),a=new B(4,4,{type:f}),m=new B(4,4,{type:f,minFilter:I,magFilter:I}),u=new B(4,4,{minFilter:I,magFilter:I}),b=new xe({vertexShader:Fe,fragmentShader:Re,uniforms:{uFar:{value:ie}},side:pe}),r=new se(Ue,{tCol:{value:a.texture},tND:{value:m.texture},uTexel:{value:new be(.25,.25)},uK:{value:1},uMode:{value:p==="color"?0:p==="depth"?1:2},uRoberts:{value:0},uTc:{value:.1},uTd:{value:.05},uTn:{value:.5}}),D=new se(Ee,{tCol:{value:a.texture},tEdge:{value:u.texture},uInk:{value:new ye(1053210)},uMask:{value:0}});let y=4,e=4,x=0;const l={thick:NaN,missing:NaN,extra:NaN,sil:0,k:1,roberts:!1};o.shared.set("eo-"+p,l);const d=200,E=new Uint8Array(d*d*4),T=new Uint8Array(d*d),A=new Uint8Array(d*d),F=new Uint8Array(d*d),q=new Uint8Array(d*d),H=new Uint8Array(d*d),J=new Uint8Array(d*d),Q=new X,Z=new X,G=new X,de=()=>{const g=M.probe;G.copy(g.center).project(s);const j=s.position.distanceTo(g.center),C=g.r/(j*Math.tan(s.fov*Math.PI/360))*(e/2),t=Math.min(d,Math.max(16,Math.ceil(C*2+24))),N=(G.x+1)/2*y,R=(G.y+1)/2*e,S=Math.round(N-t/2),w=Math.round(R-t/2);if(S<0||w<0||S+t>y||w+t>e||G.z>1){l.thick=l.missing=l.extra=NaN;return}c.readRenderTargetPixels(u,S,w,t,t,E);for(let n=0;n<t;n++)for(let i=0;i<t;i++)Me(s,S+i,w+n,y,e,Q,Z),T[n*t+i]=we(Q,Z,g.center,g.r)>0?1:0,F[n*t+i]=E[(n*t+i)*4]>127?1:0;let U=0;for(let n=0;n<t;n++)for(let i=0;i<t;i++){const k=n*t+i,h=T[k]&&(i>0&&!T[k-1]||i<t-1&&!T[k+1]||n>0&&!T[k-t]||n<t-1&&!T[k+t])?1:0;A[k]=h,U+=h}const z=Math.round(l.k)+1;ce(A,q,J,t,t,z),ce(F,H,J,t,t,z);let W=0,ee=0,O=0;const fe=N-S-.5,ve=R-w-.5,me=(C+z+4)**2;for(let n=0;n<t*t;n++){const i=n%t,k=(n-i)/t;(i-fe)**2+(k-ve)**2>me||(A[n]&&!H[n]&&W++,F[n]&&(O++,q[n]||ee++))}const te=Math.round(R-w),oe=Math.max(1,Math.floor(C*.25));let ne=0,V=0;for(let n=te-oe;n<=te+oe;n++){if(n<0||n>=t)continue;let i=-1;for(let h=0;h<t;h++)if(T[n*t+h]){i=h;break}if(i<0)continue;let k=0;for(let h=Math.max(0,i-z-1);h<=Math.min(t-1,i+z);h++){if(!F[n*t+h])continue;let $=h;for(;$>0&&F[n*t+$-1];)$--;let P=h;for(;P<t-1&&F[n*t+P+1];)P++;k=Math.max(k,P-$+1),h=P}k>0&&(ne+=k,V++)}l.sil=U,l.missing=U?W/U:NaN,l.extra=O?ee/O:0,l.thick=V?ne/V:NaN};return{resize(g,j,C){const t=Math.min(C,1.5);y=Math.max(1,Math.floor(g*t)),e=Math.max(1,Math.floor(j*t)),a.setSize(y,e),m.setSize(y,e),u.setSize(y,e),r.u.uTexel.value.set(1/y,1/e)},update(g,j,C){const t=Ne(o.shared,"eoClock",C),N=o.params,R=N.bool("sway",!0)?Math.sin(t.t*.12)*1.4:0;s.position.set(R,4.5,13),s.lookAt(R*.4,2.4,-1.5),s.updateMatrixWorld(),M.update(t.t);const S=Math.round(N.num("k",1)),w=N.str("kernel","sobel")==="roberts";r.u.uK.value=S,r.u.uRoberts.value=w?1:0,r.u.uTc.value=N.num("tc",.1),r.u.uTd.value=N.num("td",.05),r.u.uTn.value=N.num("tn",1),D.u.uMask.value=N.bool("mask",!1)?1:0,l.k=S,l.roberts=w;const U=ue(S,w),z=p==="color"?"색 소벨: 휘도 차 |G|/4 > τc":p==="depth"?"깊이: (|G|/4)/d > τd":"깊이 OR 노멀 Σ|G|/4 > τn";o.hud([`${z} · ${w?"로버츠":"소벨"} k=${S}`,`선 두께 측정 ${Ae(l.thick)} / 이론 ${U}px (렌더 해상도)`,`구 실루엣 ${l.sil}px · 누락 ${re(l.missing)} · 과잉 ${re(l.extra)}`].join(`
`))},render(){c.setRenderTarget(a),c.render(v,s);const g=v.background;v.background=null,v.overrideMaterial=b,c.setClearColor(0,1),c.setRenderTarget(m),c.clear(),c.render(v,s),v.overrideMaterial=null,v.background=g,r.render(c,u),x++%8===0&&de(),D.render(c,null)},dispose(){a.dispose(),m.dispose(),u.dispose(),b.dispose(),r.dispose(),D.dispose(),M.textures.forEach(g=>g.dispose())}}})}const L=[{mode:"color",label:"색만",color:"#ff9a3c"},{mode:"depth",label:"깊이",color:"#5b9cff"},{mode:"dn",label:"깊이+노멀",color:"#4ade80"}];function Pe(p){return ke(p,()=>({draw(o,v,s){ge(o,v,s);const c=L.map(e=>p.shared.get("eo-"+e.mode)),M=c.find(e=>e);if(!M)return;const f=Math.floor(v*.5),a={x:36,y:26,w:K(f-52,20),h:K(s-60,20)};le(o,a,"커널 간격 k (px)","선 두께 (px)");const m=9,u=e=>a.x+(e-.5)/4*a.w,b=e=>a.y+a.h-Math.min(e,m)/m*a.h;for(const e of[0,3,6,9])_(o,String(e),a.x-4,b(e)+3,"#7d8799",9,"right");for(let e=1;e<=4;e++)_(o,String(e),u(e),a.y+a.h+12,"#7d8799",9,"center");for(const e of[!1,!0]){o.strokeStyle=e===M.roberts?"#e6e9ef":"#3a4356",o.setLineDash(e?[4,3]:[]),o.lineWidth=1.6,o.beginPath();for(let x=1;x<=4;x++){const l=b(ue(x,e));x===1?o.moveTo(u(x),l):o.lineTo(u(x),l)}o.stroke()}o.setLineDash([]),L.forEach((e,x)=>{const l=c[x];l&&Number.isFinite(l.thick)&&Se(o,u(l.k)+(x-1)*6,b(l.thick),e.color)}),_(o,"실선 소벨 2k · 점선 로버츠 k",a.x+4,a.y+12,"#7d8799",9);const r={x:f+30,y:26,w:K(v-f-44,20),h:K(s-60,20)};le(o,r,"","구 실루엣 정확도");const D=e=>r.y+r.h-Math.min(1,Math.max(0,e))*r.h;for(const e of[0,.5,1])_(o,`${e*100}%`,r.x-4,D(e)+3,"#7d8799",9,"right");const y=r.w/3;L.forEach((e,x)=>{const l=c[x],d=r.x+x*y+y*.15,E=y*.32;if(l)for(const[T,A]of[l.missing,l.extra].entries())Number.isFinite(A)&&(o.fillStyle=T?"rgba(248,113,113,0.85)":e.color,o.fillRect(d+T*(E+2),D(A),E,r.y+r.h-D(A)));_(o,e.label,r.x+x*y+y/2,r.y+r.h+12,"#c8d0dc",9,"center")}),ae(o,[{label:"누락",color:"#c8d0dc"},{label:"과잉",color:"#f87171"}],r.x,s-6,9),ae(o,L.map(e=>({label:e.label,color:e.color})),a.x,s-6,9),p.hud("")}}))}const Ve={layout:"variants",intro:"<b>후처리 외곽선</b>은 메쉬를 건드리지 않고, 다 그려진 화면에서 <b>이웃 픽셀끼리 값이 갑자기 바뀌는 곳</b>을 찾아 선을 긋습니다. 무엇의 차이를 보느냐가 핵심입니다: <b>색</b>만 보면 그림자·무늬에도 선이 생기고 배경과 색이 비슷한 물체는 선이 끊깁니다. <b>깊이</b>를 보면 물체와 배경 사이 실루엣이 확실히 잡히고, <b>노멀</b>까지 보면 같은 깊이에서 꺾이는 모서리(상자 모서리, 지붕 능선)도 잡힙니다. 세 뷰어는 같은 광장을 <b>색 소벨 / 깊이 소벨 / 깊이+노멀 소벨</b>로 비교하고, 하늘에 뜬 회청색 구로 실루엣 정확도를 잽니다.",how:["장면을 두 번 그린다: 색 버퍼, 그리고 <code>(뷰 공간 노멀 xyz, 선형 깊이 d/far)</code>를 담은 반정밀도 버퍼(오버라이드 머티리얼).",'소벨 3×3: <code>Gx = (우열 1·2·1) − (좌열 1·2·1)</code>, Gy 같음. |G|/4 는 계단 높이와 같아진다. 깊이는 <code>(|G|/4)/d_center</code>로 나눠 "상대 깊이 차"로 판정 – 멀리 있는 물체도 같은 기준.',"노멀은 세 성분 각각 소벨을 걸어 더한다. 같은 평면 위는 노멀이 같아 0, 모서리에서 갑자기 커진다.","표본 간격 k로 두께를 조절한다. 계단이 i|i+1 사이면 소벨은 p−k…p+k 안에 계단을 품는 <b>2k</b>개 픽셀이, 로버츠 크로스(p와 p+k만)는 <b>k</b>개가 반응한다.",'측정: 구를 CPU에서 광선 추적해 픽셀 단위 "정답 실루엣"을 만들고, GPU 선 마스크를 구 주변 패치만 읽어 누락·과잉 픽셀과 가로 두께를 센다(8프레임마다).',"<b>뒤집힌 껍데기(셀 셰이딩 페이지)</b>와 비교: 껍데기는 메쉬마다 한 번 더 그려 실루엣만 깔끔히 내지만 안쪽 모서리·교차선은 못 그리고 메쉬 수만큼 비용이 는다. 후처리는 화면 하나에 고정 비용, 교차선까지 잡지만 두께가 픽셀 단위로 고정되고 임계값 조정이 필요하다."],pros:["장면 복잡도와 무관한 고정 비용(풀스크린 1~2패스). 오브젝트마다 껍데기 메쉬를 만들 필요가 없다.","물체끼리 겹치거나 파고드는 교차선, 바닥과의 접촉선도 자동으로 그려진다.","깊이·노멀 버퍼는 SSAO·디퍼드 렌더링이 이미 만들어 두는 경우가 많아 거의 공짜."],cons:["임계값 의존: 비스듬한 바닥은 깊이가 빠르게 변해 먼 곳에 가짜 선이 생기고, 너무 올리면 얕은 계단이 사라진다.","선 두께가 화면 픽셀 단위라 해상도·거리와 상관없이 같다 – 먼 물체는 선에 묻히고, 굵게 하면 가는 물체가 뭉개진다.","색 소벨은 텍스처 무늬·그림자 경계에도 선을 긋고, 배경과 휘도가 비슷한 물체는 실루엣을 놓친다(측정의 누락·과잉 막대).","반투명·파티클은 깊이 버퍼에 없어 선이 안 생긴다."],usedIn:"〈보더랜드〉 시리즈의 굵은 코믹스풍 외곽선, 뫼비우스풍 선화가 특징인 〈세이블〉 같은 게임, 그리고 유니티·언리얼의 툰 렌더링 예제에서 표준처럼 쓰이는 기법입니다.",tips:["비스듬한 바닥의 가짜 선은 깊이 임계값을 시선과 표면의 각도로 키워 막는다. 예: <code>τd ÷ max(n·v, 0.2)</code>처럼 표면이 시선과 나란할수록 기준을 느슨하게.","선 색은 순수한 검정보다 바탕색을 어둡게 한 색(바탕 × 0.3~0.5)이 덜 거칠고 그림처럼 보인다. 먼 곳은 선을 옅게 하면 먼 물체가 선에 묻히지 않는다.","표본 간격 k는 해상도에 비례시킨다(1080p에서 k = 1이면 4K에서 2). 외곽선은 FXAA 같은 후처리 안티에일리어싱 앞에 그려야 선도 매끄러워진다.","깊이·노멀 버퍼를 SSAO·림라이트와 공유하면 추가 비용은 풀스크린 패스 한 번뿐이다."],related:["cel-shading","rim-light","kuwahara","halftone","ssao"],controls:[{type:"select",key:"kernel",label:"커널",options:[{label:"소벨 3×3",value:"sobel"},{label:"로버츠 크로스 2×2",value:"roberts"}],value:"sobel"},{type:"range",key:"k",label:"표본 간격 k (px, 두께)",min:1,max:4,step:1,value:1},{type:"range",key:"tc",label:"색 임계 τc (휘도)",min:.02,max:.4,step:.01,value:.1},{type:"range",key:"td",label:"깊이 임계 τd (상대)",min:.01,max:.3,step:.01,value:.05},{type:"range",key:"tn",label:"노멀 임계 τn (성분 차 합)",min:.1,max:1.5,step:.05,value:1},{type:"toggle",key:"mask",label:"선만 보기 (흰 바탕)",value:!1},{type:"toggle",key:"sway",label:"카메라 천천히 이동",value:!0}],viewers:[{title:"색 소벨 (휘도만)",kind:"before",caption:"타일 줄눈·창문·그림자 경계에도 선이 그어지고, 하늘과 밝기가 비슷한 회청색 구는 실루엣이 군데군데 끊깁니다.",mount:Y("color")},{title:"깊이 소벨",kind:"variant",caption:"물체와 배경 사이 실루엣이 확실하고 무늬 선은 사라집니다. 대신 상자 모서리처럼 깊이가 연속인 꺾임은 놓칩니다.",mount:Y("depth")},{title:"깊이 + 노멀 소벨",kind:"after",caption:"노멀 차이가 모서리·지붕 능선·분수 테두리를 더해 줍니다. 툰 게임에서 흔히 쓰는 조합입니다.",mount:Y("dn")},{title:"두께 이론 vs 측정 · 실루엣 정확도",kind:"info",caption:"왼쪽: k에 따른 선 두께 이론(소벨 2k, 로버츠 k)과 세 레인의 측정 점. 오른쪽: 구의 해석적 실루엣과 비교한 누락(실루엣 중 선이 없는 비율)·과잉(선 중 실루엣이 아닌 비율).",mount:Pe}]};export{Ve as default};
