import{g as u,u as M,M as v,P as T,B as E,S as L,w as D,p as W}from"./three.module-BZgG6AUv.js";import{m as I}from"./canvas-viewer-Btf0JXdr.js";import{m as P}from"./three-viewer-0rZIEDzf.js";import{F,W as U}from"./shade-CcOaBxDj.js";import"./glsl-DOwCk4-f.js";const _=(t,e,s)=>{if(t===0)return 1;if(t===1)return Math.max(0,1-e/s);if(t===2)return 1/(e*e+.01);const r=Math.min(1,Math.pow(e/s,4));return Math.pow(1-r,2)*1/(e*e+1)},$=`
${F}
uniform vec3 lp[3]; uniform vec3 lc[3]; uniform float mode; uniform float R; uniform float I; uniform float showR; uniform vec3 albedo;
float att(float d){
  if (mode < .5) return 1.;
  if (mode < 1.5) return max(0., 1. - d / R);
  if (mode < 2.5) return 1. / (d * d + .01);
  // UE4 방식: 역제곱 × 반경에서 0으로 부드럽게 떨어지는 창 함수
  float x = clamp(1. - pow(d / R, 4.), 0., 1.);
  return x * x / (d * d + 1.);
}
void main(){
  vec3 N = normalize(vN);
  vec3 col = vec3(0.);
  float edge = 0.;
  for (int i = 0; i < 3; i++) {
    vec3 L = lp[i] - vW; float d = length(L);
    col += albedo * lc[i] * I * att(d) * max(dot(N, L / d), 0.);
    // 광원 반경 경계선
    edge += showR * (1. - smoothstep(0., .04, abs(length((lp[i] - vW).xz) - R))) * step(vW.y, .02);
  }
  // 바닥 격자
  vec2 g = abs(fract(vW.xz) - .5);
  float grid = step(.485, max(g.x, g.y)) * step(vW.y, .02);
  col = mix(col, col * .55, grid);
  gl_FragColor = vec4(acesTone(col) + vec3(edge) * vec3(1., .75, .3), 1.);
  #include <colorspace_fragment>
}`;function g(t,e){return P(t,{antialias:!0,cam:[0,7,9],target:[0,0,0]},({scene:s})=>{const r={lp:{value:[new u,new u,new u]},lc:{value:[new u(1,.55,.3),new u(.35,.6,1),new u(.5,1,.5)]},mode:{value:e},R:{value:4},I:{value:1},showR:{value:1},albedo:{value:new u(.6,.6,.6)}},d=new M({uniforms:r,vertexShader:U,fragmentShader:$}),l=new v(new T(24,16),d);l.rotation.x=-Math.PI/2,s.add(l);for(let a=0;a<5;a++){const n=new v(new E(.6,1.2+a%2,.6),d);n.position.set(-6+a*3,.6+a%2/2,-2.5),s.add(n)}const m=r.lp.value.map((a,n)=>{const o=new v(new L(.12,12,8),new D({color:new W(...r.lc.value[n].toArray())}));return s.add(o),o});return{update(a,n){const o=t.params.num("radius",4);r.R.value=o,r.showR.value=t.params.bool("showR")&&e!==0?1:0;const c=t.params.num("intensity",3);r.I.value=e===0?c*.25:e===1?c*.4:e===2?c:c*2,r.lp.value.forEach((p,i)=>{p.set(-5+i*5+Math.sin(n*.6+i*2)*1.5,t.params.num("height",1),Math.cos(n*.5+i)*2.5),m[i].position.copy(p)}),t.hud(["감쇠 없음: 모든 곳이 같은 세기",`선형: 1 − d/R (R=${o})`,`역제곱: 1/d² · R=${o} 지점도 1m 밝기의 ${(100/(o*o+.01)).toFixed(1)}% (밖으로 계속)`,`UE4 창 함수 + 역제곱 (R=${o})`][e])}}})}function B(t){return I(t,()=>({draw(e,s,r){e.fillStyle="#0b0e14",e.fillRect(0,0,s,r);const d=t.params.num("radius",4),l=36,m=s-12,a=14,n=r-26,o=8;e.strokeStyle="rgba(255,255,255,0.1)",e.strokeRect(l,a,m-l,n-a),e.fillStyle="#7d8799",e.font="10px JetBrains Mono, monospace";for(let i=0;i<=o;i+=2)e.fillText(`${i}m`,l+i/o*(m-l)-6,n+14);const c=l+d/o*(m-l);e.strokeStyle="rgba(255,193,77,0.5)",e.setLineDash([4,4]),e.beginPath(),e.moveTo(c,a),e.lineTo(c,n),e.stroke(),e.setLineDash([]),e.fillStyle="#ffc14d",e.fillText("R",c+3,a+10),[["#7d8799","없음",0,.25],["#ff5a5a","선형",1,.4],["#5b9cff","역제곱",2,1],["#4ade80","UE4 창",3,2]].forEach(([i,y,x,b],k)=>{e.strokeStyle=i,e.lineWidth=2,e.beginPath();for(let f=0;f<=200;f++){const h=.05+f/200*o,S=Math.min(1.2,_(x,h,d)*b),R=l+h/o*(m-l),w=n-S/1.2*(n-a);f?e.lineTo(R,w):e.moveTo(R,w)}e.stroke(),e.fillStyle=i,e.fillText(y,m-70,a+14+k*13)}),t.hud("세로: 상대 밝기 · 역제곱은 R 밖에서도 0이 아님 → 모든 픽셀에 계산 필요")}}))}const G=[{mode:0,title:"감쇠 없음",kind:"before",caption:"거리에 상관없이 같은 밝기. 광원 위치감이 전혀 없다."},{mode:1,title:"선형 감쇠",kind:"variant",caption:"반경 R에서 정확히 0이 되어 계산 범위가 명확하지만, 광원 근처가 밋밋하고 빛 웅덩이 경계가 부자연스럽다."},{mode:2,title:"역제곱 법칙 (물리)",kind:"variant",caption:"광원 근처는 매우 밝고 빠르게 어두워진다. 물리적으로 정확하지만 영향이 무한히 이어져 광원 컬링이 불가능하다."},{mode:3,title:"역제곱 + 반경 창 함수",kind:"after",caption:"역제곱 모양을 유지하면서 반경 R에서 부드럽게 0으로. 노란 원 밖은 계산을 건너뛸 수 있다 (타일/클러스터 컬링의 전제)."}],A={layout:"variants",intro:"점광원의 빛은 구 표면으로 퍼지므로 받는 빛의 양은 거리의 제곱에 반비례합니다(<b>역제곱 법칙</b>). 하지만 역제곱은 영원히 0이 되지 않아, 수백 개의 광원을 쓰는 게임에서는 각 광원의 영향 범위를 잘라야 합니다. 물리적인 모양을 유지하면서 반경에서 부드럽게 끊는 감쇠 함수가 실전 표준입니다.",how:["물리: E = I / d². 광원과의 거리가 2배면 밝기는 1/4.","고전 게임(OpenGL 고정 파이프라인): 1 / (c + l·d + q·d²) 의 세 계수를 아티스트가 조정 → 직관적이지 않음.","UE4(Karis 2013): 역제곱 × saturate(1 − (d/R)⁴)². R 밖은 정확히 0이라 광원 볼륨 밖 픽셀을 건너뛸 수 있다.","분모에 +1을 더해 광원 바로 옆(d→0)에서 무한대로 발산하지 않게 한다.","감쇠는 선형 공간에서 계산해야 모양이 맞다 (감마 항목 참고)."],pros:["역제곱 감쇠로 광원 위치·거리감이 사실적","반경 컷오프로 광원 컬링·디퍼드 조명 볼륨 사용 가능"],cons:["역제곱은 넓은 범위에 HDR이 필수 (광원 옆이 매우 밝음)","반경을 너무 작게 잡으면 빛 경계가 보임"],usedIn:"UE4/5, Unity HDRP(물리 단위 광원), Frostbite. three.js PointLight의 decay=2 + distance도 같은 개념.",controls:[{type:"range",key:"radius",label:"광원 반경 R (m)",min:1,max:8,step:.25,value:4},{type:"range",key:"intensity",label:"광원 세기",min:.5,max:10,step:.5,value:3},{type:"range",key:"height",label:"광원 높이 (m)",min:.2,max:3,step:.1,value:1},{type:"toggle",key:"showR",label:"반경 표시",value:!0}],viewers:[...G.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:e=>g(e,t.mode)})),{title:"감쇠 곡선 비교",kind:"info",caption:"역제곱과 창 함수는 1m 밝기를 맞췄고, 없음·선형은 화면이 타지 않도록 낮춰 그렸다. 창 함수(초록)는 역제곱(파랑)을 따라가다 R에서 0이 된다.",wide:!0,mount:B}]};export{A as default};
