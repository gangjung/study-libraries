import{ac as I,L as D}from"./three.module-BZgG6AUv.js";import{m as M}from"./frag-jY9xgSE6.js";import"./three-viewer-0rZIEDzf.js";import"./glsl-DOwCk4-f.js";const d=128,u=48,c=8;function T(e,o,s,n,i){let l=0;n[0]=0,i[0]=-1/0,i[1]=1/0;for(let a=1;a<o;a++){let m=(e[a]+a*a-(e[n[l]]+n[l]*n[l]))/(2*a-2*n[l]);for(;m<=i[l];)l--,m=(e[a]+a*a-(e[n[l]]+n[l]*n[l]))/(2*a-2*n[l]);l++,n[l]=a,i[l]=m,i[l+1]=1/0}l=0;for(let a=0;a<o;a++){for(;i[l+1]<a;)l++;s[a]=(a-n[l])**2+e[n[l]]}}function S(e,o,s,n){const l=new Float64Array(o*s);for(let r=0;r<o*s;r++)l[r]=e[r]>0===n?0:1e20;const a=Math.max(o,s),m=new Float64Array(a),g=new Float64Array(a),p=new Int32Array(a),x=new Float64Array(a+1);for(let r=0;r<o;r++){for(let t=0;t<s;t++)m[t]=l[t*o+r];T(m,s,g,p,x);for(let t=0;t<s;t++)l[t*o+r]=g[t]}for(let r=0;r<s;r++){for(let t=0;t<o;t++)m[t]=l[r*o+t];T(m,o,g,p,x);for(let t=0;t<o;t++)l[r*o+t]=Math.sqrt(g[t])}return l}function R(){const e=d*c,o=u*c,s=document.createElement("canvas");s.width=e,s.height=o;const n=s.getContext("2d");n.fillStyle="#000",n.fillRect(0,0,e,o),n.fillStyle="#fff",n.textAlign="center",n.textBaseline="middle",n.font=`800 ${o*.62}px "Noto Sans KR", sans-serif`,n.fillText("게임 Ag",e/2,o*.52);const i=n.getImageData(0,0,e,o).data,l=new Uint8Array(e*o);for(let t=0;t<e*o;t++)l[t]=i[t*4]>127?1:0;const a=S(l,e,o,!1),m=S(l,e,o,!0),g=new Uint8Array(new ArrayBuffer(d*u*4)),p=new Uint8Array(new ArrayBuffer(d*u*4)),x=4*c;for(let t=0;t<u;t++)for(let f=0;f<d;f++){const A=f*c+c/2,F=(t*c+c/2)*e+A,k=a[F]-m[F],y=Math.max(0,Math.min(1,.5-k/(2*x)));let v=0;for(let w=0;w<c;w++)for(let h=0;h<c;h++)v+=l[(t*c+w)*e+f*c+h];v/=c*c;const b=((u-1-t)*d+f)*4;g.set([y*255,y*255,y*255,255],b),p.set([v*255,v*255,v*255,255],b)}const r=t=>{const f=new I(t,d,u);return f.magFilter=D,f.minFilter=D,f.needsUpdate=!0,f};return{sdf:r(g),bmp:r(p)}}const U=`
uniform float mode; uniform sampler2D tSdf; uniform sampler2D tBmp; uniform float zoom; uniform float outline; uniform float glow; uniform float weight;
void main(){
  // 확대: 화면 중앙 근처를 천천히 이동하며 본다
  float asp = uRes.x / uRes.y;
  vec2 p = (vUv - .5) * vec2(asp, 1.);
  vec2 c = vec2(.5 + .28 * sin(uTime * .15), .5 + .05 * sin(uTime * .21));
  vec2 uv = c + p / zoom * vec2(TH_OVER_TW, 1.);
  vec3 bg = vec3(.06, .07, .1);
  vec3 col = bg;
  if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) { gl_FragColor = vec4(bg, 1.); return; }
  if (mode < .5) {
    float a = texture2D(tBmp, uv).r;
    col = mix(bg, vec3(1.), a);
  } else {
    float d = texture2D(tSdf, uv).r;
    // 0.5 = 경계. fwidth로 화면 픽셀 1개 폭만큼만 부드럽게 → 확대해도 선명
    float w = fwidth(d) * .7;
    float edge = .5 - weight;
    if (mode < 1.5) {
      col = mix(bg, vec3(1.), smoothstep(edge - w, edge + w, d));
    } else if (mode < 2.5) {
      float sh = texture2D(tSdf, uv + vec2(-.004, .01)).r;
      col = mix(bg, vec3(0.), smoothstep(edge - .08, edge + .02, sh) * .7);
      float gl = smoothstep(edge - glow, edge, d);
      col += vec3(.2, .6, 1.) * gl * gl * .9;
      float ol = smoothstep(edge - outline - w, edge - outline + w, d);
      col = mix(col, vec3(1., .55, .15), ol);
      float fill = smoothstep(edge - w, edge + w, d);
      vec3 grad = mix(vec3(1., .95, .7), vec3(1., .75, .3), uv.y * 2. - .4);
      col = mix(col, grad, fill);
    } else {
      // 거리장 그대로: 등고선
      float sd = (d - .5);
      col = sd > 0. ? vec3(.4, .65, 1.) : vec3(1., .6, .35);
      col *= .5 + .5 * abs(sd) * 3.;
      col *= .75 + .25 * cos(sd * 120.);
      col = mix(col, vec3(1.), 1. - smoothstep(0., w * 2., abs(sd)));
    }
  }
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`.replace("TH_OVER_TW",(u/d).toFixed(5));function B(e,o){let s=e.shared.get("sdfTex");s||(s=R(),e.shared.set("sdfTex",s));const n=s;return M(e,{frag:U,uniforms:{mode:{value:o},tSdf:{value:n.sdf},tBmp:{value:n.bmp},zoom:{value:2},outline:{value:.1},glow:{value:.3},weight:{value:0}},update(i){i.zoom.value=e.params.num("zoom",2.5),i.outline.value=e.params.num("outline",.12),i.glow.value=e.params.num("glow",.35),i.weight.value=e.params.num("weight",0),e.hud(`텍스처 ${d}×${u} (같은 크기) · ${e.params.num("zoom",2.5)}배 확대 · `+(o===0?"커버리지 비트맵 → 흐릿":o===1?"거리 0.5에서 자름 → 선명":o===2?"같은 텍스처로 외곽선·글로우·그림자":"저장된 거리값 (파랑 = 안, 주황 = 밖)"))}})}const _=[{mode:0,title:"비트맵 글꼴",kind:"before",caption:'픽셀마다 "글자가 덮는 비율"을 저장한 일반 글꼴 텍스처. 확대하면 선형 보간 때문에 흐릿하게 번지고, 작게 만들면 계단이 진다.'},{mode:1,title:"SDF 글꼴",kind:"after",caption:'같은 해상도에 "가장 가까운 윤곽까지의 거리"를 저장. 거리는 선형으로 보간해도 정확하므로 0.5에서 자르면 몇 배를 확대해도 날카롭다. 모서리만 약간 둥글어진다 (MSDF로 해결).'},{mode:2,title:"효과: 외곽선·글로우·그림자",kind:"variant",caption:'거리값을 다른 임계값으로 자르면 외곽선, 부드럽게 감쇠시키면 글로우, 오프셋 샘플은 그림자. 추가 텍스처 없이 셰이더 몇 줄. "굵기"로 볼드도 공짜.'},{mode:3,title:"거리장 자체",kind:"info",caption:"텍스처에 실제로 들어 있는 값. 등고선이 윤곽과 평행하게 퍼진다 — 이것이 SDF."}],W={layout:"variants",intro:"SDF(부호 있는 거리장) 글꼴은 글자 모양 대신 <b>각 텍셀에서 가장 가까운 윤곽까지의 거리</b>를 저장합니다. 거리는 선형 보간해도 의미가 유지되기 때문에 작은 텍스처로도 크게 확대했을 때 날카로운 윤곽을 얻고, 임계값만 바꿔 외곽선·글로우·굵기·그림자 효과를 셰이더에서 공짜로 만들 수 있습니다. Valve의 2007년 논문 이후 게임 UI 텍스트의 표준이 됐습니다.",how:["고해상도로 글자를 래스터화한 뒤 거리 변환(EDT)으로 안·밖 거리를 구하고 부호를 합친다.","일정 범위(예: ±4텍셀)만 0..1로 정규화해 저해상도 텍스처(글자당 32~64px)에 저장한다.","셰이더: d = texture(uv), alpha = smoothstep(0.5 − w, 0.5 + w, d), w = fwidth(d) — 화면 픽셀 1개 폭으로 안티앨리어싱.","외곽선 = 0.5 − 두께에서 한 번 더 자르기, 글로우 = 넓은 smoothstep, 그림자 = 오프셋 샘플.","MSDF: RGB 세 채널에 서로 다른 모서리 거리를 저장하고 중앙값을 취해 뾰족한 모서리까지 보존."],pros:["작은 텍스처로 모든 크기에서 선명","외곽선·글로우·굵기 조절이 공짜","3D 공간의 텍스트에도 적합"],cons:["모서리가 둥글어짐 (MSDF로 보완)","아주 작은 글자에선 힌팅된 비트맵보다 흐릿","아틀라스 생성 전처리 필요"],usedIn:"Valve TF2(Chris Green, SIGGRAPH 2007), Unity TextMesh Pro, Godot 4 MSDF 글꼴, msdfgen, 많은 게임의 HUD·이름표·월드 공간 텍스트.",controls:[{type:"range",key:"zoom",label:"확대 배율",min:.6,max:12,step:.1,value:2.5},{type:"range",key:"weight",label:"굵기 (임계값 이동)",min:-.15,max:.15,step:.01,value:0},{type:"range",key:"outline",label:"외곽선 두께",min:0,max:.3,step:.01,value:.12},{type:"range",key:"glow",label:"글로우 폭",min:.05,max:.5,step:.01,value:.35}],viewers:_.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>B(o,e.mode)}))};export{W as default};
