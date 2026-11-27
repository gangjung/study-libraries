import{M as S,ar as W,w as k,ac as D,L as x,n as I,u as N,aq as $,g as R}from"./three.module-BZgG6AUv.js";import{m as T}from"./three-viewer-0rZIEDzf.js";import{m as C}from"./canvas-viewer-Btf0JXdr.js";import{b as F}from"./figure-GCHR3crq.js";import{l as G}from"./shade-CcOaBxDj.js";import{c as z,t as h,D as g}from"./chart2d-JzIgcti9.js";import"./glsl-DOwCk4-f.js";const f=[{name:"낮",shadow:[.66,.6,.82],edge:[1,.72,.68],lit:[1,1,1],bg:12572910},{name:"저녁",shadow:[.5,.38,.62],edge:[1,.55,.42],lit:[1,.86,.7],bg:15250575},{name:"밤",shadow:[.24,.27,.46],edge:[.42,.45,.72],lit:[.62,.68,.9],bg:1778752}];function M(o,t,m){const n=f[o],a=.5,l=(c,i,s)=>c.map((e,p)=>e+(i[p]-e)*s),r=(c,i,s)=>{const e=Math.min(1,Math.max(0,(s-c)/(i-c)));return e*e*(3-2*e)},u=r(a-m,a,t),d=r(a,a+m*1.5,t);return l(l(n.shadow,n.edge,u),n.lit,d)}function L(o){const m=new Uint8Array(256*f.length*4);for(let a=0;a<f.length;a++)for(let l=0;l<256;l++){const r=M(a,l/255,o);m.set([r[0]*255,r[1]*255,r[2]*255,255],(a*256+l)*4)}const n=new D(m,256,f.length);return n.magFilter=x,n.minFilter=x,n.colorSpace=I,n.needsUpdate=!0,n}const A=`
varying vec3 vN; varying vec3 vW;
void main(){
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,_=`
uniform float mode; uniform vec3 L; uniform vec3 albedo; uniform sampler2D ramp; uniform float row; uniform float part;
varying vec3 vN; varying vec3 vW;
void main(){
  vec3 N = normalize(vN);
  float ndl = dot(N, L);
  float hl = ndl * .5 + .5; // 하프 램버트
  vec3 col;
  if (mode < .5) {
    col = albedo * (max(ndl, 0.) * .85 + .2);
  } else if (mode < 1.5) {
    col = albedo * (hl > .5 ? 1. : .55); // 단순 2단: 그늘 = 회색으로 어둡게
  } else {
    float th = 0.;
    if (mode > 2.5) {
      // ILM 마스크 흉내: 아티스트가 칠한 "항상 그늘" 영역과 주름
      if (part < .5) {
        th -= smoothstep(1.66, 1.6, vW.y) * smoothstep(1.5, 1.56, vW.y) * .6; // 턱 아래 목
        th -= smoothstep(1.93, 1.98, vW.y) * step(0., vN.z) * .22;            // 앞머리 그늘
      }
      if (part > 2.5 && part < 3.5) th += (sin(atan(vW.z, vW.x) * 9.) * .5 - .1) * .35; // 치마 주름
      if (part > 1.5 && part < 2.5) th -= smoothstep(1.2, 1.0, vW.y) * .25; // 상의 아래쪽
    }
    vec3 rc = texture2D(ramp, vec2(clamp(hl + th, .01, .99), (row + .5) / 3.)).rgb;
    col = albedo * rc;
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,B={skin:0,hair:1,cloth:2,cloth2:3,eye:4};function U(o,t){return t==="chart"?O(o):T(o,{antialias:!0,cam:[1.1,1.75,3.1],target:[0,1.3,0]},({scene:m})=>{let n=o.params.num("soft",.06),a=L(n);const l=[],r=F(m,(c,i)=>{const s=new N({uniforms:{mode:{value:["lambert","step","ramp","ilm"].indexOf(t)},L:{value:new R},albedo:{value:i.convertSRGBToLinear()},ramp:{value:a},row:{value:0},part:{value:B[c]}},vertexShader:A,fragmentShader:_,side:$});return l.push(s),s}),u=o.params.on(c=>{if(c==="soft"){n=o.params.num("soft",.06),a.dispose(),a=L(n);for(const i of l)i.uniforms.ramp.value=a}}),d=new S(new W(1.4,48),new k({color:0,transparent:!0,opacity:.12}));return d.rotation.x=-Math.PI/2,m.add(d),{update(c,i){const s=Number(o.params.str("row","0")),e=G(i,o.params.bool("animate"),30);for(const p of l)p.uniforms.L.value.copy(e),p.uniforms.row.value=s;m.background.setHex(f[s].bg),r.root.rotation.y=Math.sin(i*.3)*.3,o.hud({lambert:"램버트 (사실적 연속 음영)",step:"2단 툰: 그늘 = 색 × 0.55",ramp:`램프 텍스처 (${f[s].name})`,ilm:`램프 + ILM 그늘 마스크 (${f[s].name})`}[t])},dispose(){u(),a.dispose()}}})}function O(o){return C(o,()=>({draw(t,m,n){z(t,m,n);const a=o.params.num("soft",.06),l=Number(o.params.str("row","0")),r=70,u=m-r-14,d=Math.max(10,Math.min(26,(n-120)/5)),c=[["2단(회색)",e=>e>.5?[1,1,1]:[.55,.55,.55]],...f.map((e,p)=>[`램프·${e.name}`,v=>M(p,v,a)])];c.forEach(([e,p],v)=>{const w=14+v*(d+8);for(let b=0;b<u;b++){const y=p(b/(u-1));t.fillStyle=`rgb(${y[0]*255},${y[1]*255},${y[2]*255})`,t.fillRect(r+b,w,1,d)}v===l+1&&(t.strokeStyle="#facc15",t.lineWidth=2,t.strokeRect(r-1,w-1,u+2,d+2),t.lineWidth=1),h(t,e,r-6,w+d/2+4,"#cbd5e1",10,"right")});const i=14+c.length*(d+8)+6;h(t,"← 빛 반대편 (N·L = −1)",r,i+6,g,9),h(t,"빛 정면 (N·L = 1) →",r+u,i+6,g,9,"right");const s=[1,.878,.8];h(t,"피부색 × 램프 =",r-6,i+34,"#cbd5e1",10,"right");for(let e=0;e<u;e++){const p=M(l,e/(u-1),a);t.fillStyle=`rgb(${p[0]*s[0]*255},${p[1]*s[1]*255},${p[2]*s[2]*255})`,t.fillRect(r+e,i+20,1,d)}h(t,'그늘은 채도 높은 보라·청색, 경계엔 따뜻한 띠: 피부가 "탁해지지" 않음',r,n-10,g,9),o.hud("램프 텍스처 = 밝기를 색으로 바꾸는 1D 표")}}))}const P=[{mode:"lambert",title:"램버트",kind:"before",caption:"사실적인 연속 음영. 입체감은 있지만 셀 애니메이션 느낌이 아니고, 피부 그늘이 회색빛으로 탁하다."},{mode:"step",title:"2단 툰 (회색 그늘)",kind:"variant",caption:"밝기를 임계값으로 자르고 그늘은 색을 어둡게만. 툰처럼 보이지만 그늘이 칙칙하고 경계가 딱딱하다."},{mode:"ramp",title:"램프 텍스처",kind:"after",caption:'밝기 값으로 램프 텍스처를 읽어 그늘 "색"을 정한다. 그늘은 보랏빛, 경계는 살짝 붉은 띠(피부 산란을 흉내). 시간대 행만 바꾸면 낮·저녁·밤 분위기가 바뀐다.'},{mode:"ilm",title:"램프 + ILM 마스크",kind:"variant",caption:'텍스처 채널에 "그늘 임계값 오프셋"을 칠해 두면 조명과 상관없이 목 아래·앞머리 밑·치마 주름에 항상 그늘이 진다. 원화가 의도한 그림자 모양을 고정하는 방법.'},{mode:"chart",title:"램프 텍스처 들여다보기",kind:"info",caption:"가로축이 하프 램버트 밝기. 2단 회색과 비교하면 램프는 그늘 쪽 색상이 바뀌고 경계에 따뜻한 띠가 있다. 경계 부드러움 슬라이더로 셀 느낌 ↔ 부드러운 느낌을 조절."}],Q={layout:"variants",intro:'원신·명조·붕괴 스타레일 같은 애니풍 게임의 캐릭터 셰이딩(커뮤니티 분석으로 알려진 구조) 핵심은 <b>"얼마나 어두운가"가 아니라 "무슨 색인가"</b>입니다. 조명 계산 결과(밝기)를 그대로 쓰지 않고 <b>램프 텍스처</b>에서 색을 읽어 그늘에 원화의 색감을 입히고, <b>ILM(라이트맵) 텍스처</b>의 채널에 그늘 임계값·하이라이트 마스크·AO를 손으로 칠해 그림자 모양까지 아트 디렉션합니다.',how:["밝기 = 하프 램버트 (N·L × 0.5 + 0.5). 그늘 경계 위치를 0.5 근처로 안정화.","임계값 오프셋 = ILM 텍스처의 한 채널(Xrd 발표에서는 G, “그늘 받기 쉬운 정도”) — 접힌 옷·목 아래는 미리 어둡게 칠함.","color = albedo × ramp(밝기 + 오프셋, 재질 행). 재질(피부·옷·금속)과 시간대(낮/밤)마다 다른 행.","ILM의 다른 채널은 게임마다 다름: 예) Xrd는 R = 하이라이트 강도, B = 하이라이트 크기, A = 내부 선. 원신 계열 분석에서는 A = 재질 ID(램프 행 선택).","그림자 맵 그림자도 같은 램프로 합성(그림자 → 밝기 0 쪽 색), 머리카락 그림자는 화면 공간으로 따로 그리기도.","최종적으로 외곽선·림 라이트·SDF 얼굴 그림자와 합쳐 완성."],pros:["아티스트가 색감을 직접 통제","시간대·장소 분위기를 텍스처 교체로 전환","계산이 매우 가벼움 (텍스처 조회 1회)"],cons:["캐릭터마다 ILM·램프 텍스처 제작 필요","물리 기반 조명(GI·반사)과 일관성 맞추기 어려움","환경광이 바뀌면 램프도 직접 조절해야 함"],usedIn:"길티기어 Xrd(ILM 텍스처, GDC 2015 발표), 원신·붕괴 스타레일 등(재질별 낮·밤 램프가 커뮤니티 분석으로 알려짐), 명조 등 애니풍 3D 게임 전반, Unity Toon Shader(UTS)·lilToon 같은 공개 툰 셰이더의 그늘 색 설정. 게임별 세부 구현은 비공개.",controls:[{type:"select",key:"row",label:"램프 행 (시간대)",options:f.map((o,t)=>({label:o.name,value:String(t)})),value:"0"},{type:"range",key:"soft",label:"경계 부드러움",min:.01,max:.25,step:.01,value:.06},{type:"toggle",key:"animate",label:"광원 회전",value:!0}],viewers:P.map(o=>({title:o.title,kind:o.kind,caption:o.caption,mount:t=>U(t,o.mode)}))};export{Q as default};
