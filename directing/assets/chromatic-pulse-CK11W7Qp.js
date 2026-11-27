import{m as y,s as g}from"./canvas-viewer-QtaWfmlz.js";import{u as w,R as f}from"./fx-CIZ4XT9q.js";import{c as A,a as F,t as M,l as C}from"./chart2d-DfgeckAJ.js";import{m as H,S as R}from"./vfx-kit-p_4w7CZ_.js";import"./three.module-CEzfHhrp.js";import"./three-viewer-fx7lDL-0.js";const v=[1,.55,.8,.4];function S(){return{t:0,hitT:-99,strength:0,pulse:0,prevPulse:0,peak:0,nextAuto:.5,autoIdx:0,pending:!1,tauMeas:0,crossed:!0,histC:new f(240),histP:new f(240)}}function b(e,n,t){e.hitT=e.t,e.strength=t,e.peak=n.num("peak",12)*t,e.crossed=!1}function $(e,n,t){const u=n*t.num("slow",1),o=e.t;e.t+=u,e.pending&&(e.pending=!1,b(e,t,1)),t.bool("auto",!0)&&e.t>=e.nextAuto&&(b(e,t,v[e.autoIdx++%v.length]),e.nextAuto=e.t+1.3);const r=Math.max(.005,t.num("tau",120)/1e3);e.prevPulse=e.pulse;const i=e.t-e.hitT;e.pulse=e.peak*Math.exp(-i/r);const l=e.peak/Math.E;if(!e.crossed&&i>0&&e.pulse<=l){e.crossed=!0;const s=Math.max(0,o-e.hitT),c=o>=e.hitT?e.prevPulse:e.peak,a=c>e.pulse?(c-l)/(c-e.pulse):0;e.tauMeas=s+a*(i-s)}e.histC.push(t.num("const",4)),e.histP.push(e.pulse)}function k(e,n){return g(e.shared,"chroma",n,S,(t,u)=>$(t,u,e.params))}const T=`
varying vec2 vUv;
uniform float uOff, uRadial, uHit, uHitAge;
${R}
// 장면 + 가운데 허수아비 적 + 타격 섬광 (모든 뷰어 공통)
vec3 sceneC(vec2 p) {
  vec3 c = scene(p) * 0.85;
  float d = length(p - vec2(0.0, 0.02));
  float body = 1.0 - smoothstep(0.095, 0.105, d);
  vec3 enemy = mix(vec3(0.75, 0.2, 0.25), vec3(1.0), exp(-uHitAge / 0.05) * uHit);
  c = mix(c, enemy, body);
  c = mix(c, vec3(0.1, 0.05, 0.08), (1.0 - smoothstep(0.105, 0.112, d)) * (1.0 - body));
  // 별 모양 스파크
  float ang = atan(p.y, p.x);
  float rays = pow(abs(cos(ang * 4.0)), 24.0);
  float flash = exp(-uHitAge / 0.08) * uHit;
  c += vec3(1.0, 0.9, 0.6) * rays * (1.0 - smoothstep(0.0, 0.45 * (0.4 + uHitAge * 3.0), d)) * flash;
  return c;
}
void main() {
  vec2 p = toP(vUv);
  float m = min(uSize.x, uSize.y);
  // 반지름 방향: 가장자리(짧은 변 끝)에서 오프셋 = uOff px, 중심은 0 (렌즈형)
  vec2 dir = uRadial > 0.5 ? p / 0.5 : vec2(1.0, 0.0);
  vec2 o = dir * uOff / m;
  vec3 col;
  col.r = sceneC(p + o).r;
  col.g = sceneC(p).g;
  col.b = sceneC(p - o).b;
  gl_FragColor = vec4(col, 1.0);
}
`;function h(e){return n=>{const t={uOff:{value:0},uRadial:{value:1},uHit:{value:0},uHitAge:{value:99}};return H(n,T,t,{update(u,o,r,i,l){const s=k(n,r),c=n.params,a=w(i,l),d=e==="const"?c.num("const",4):0,p=e==="pulse"?s.pulse:d;t.uOff.value=p*a,t.uRadial.value=c.str("dir","radial")==="radial"?1:0,t.uHit.value=s.strength,t.uHitAge.value=s.t-s.hitT;const x=c.num("tau",120),m=[`채널 오프셋 R↔G ${(p*a).toFixed(2)}px (R–B ${(2*p*a).toFixed(2)}px)`];e==="none"?m.push("타격 섬광만 – 화면 자체는 흔들리지 않음"):e==="const"?m.push(`항상 ${d.toFixed(1)}px@300 고정 → 타격과 무관, 화면이 늘 흐릿`,"대비(가장자리 번짐)만 늘고 임팩트 정보 0"):m.push(`최근 최대 ${(s.peak*a).toFixed(2)}px → τ 후 ${(s.peak/Math.E*a).toFixed(2)}px`,`감쇠 시간 측정 ${(s.tauMeas*1e3).toFixed(1)}ms · 이론 τ = ${x.toFixed(0)}ms (반감 ${(x*Math.LN2).toFixed(0)}ms)`),n.hud(m.join(`
`))}})}}function P(e){const n=new Float32Array(240),t=new Float32Array(240);return y(e,()=>{let u=null;return{step(o,r,i){u=k(e,i)},draw(o,r,i){if(A(o,r,i),!u)return;u.histC.ordered(n),u.histP.ordered(t);const l=12,s=24,c=Math.max(4,e.params.num("peak",12),e.params.num("const",4))*1.1,a={x:l,y:s,w:Math.max(20,r-l*2),h:Math.max(20,i-s-l)};F(o,a,[{data:n,color:"#ff9a3c",width:1.4,dash:[5,3]},{data:t,color:"#4ade80",width:1.8}],0,c);const d=e.params.num("tau",120),p=a.y+a.h-u.peak/Math.E/c*a.h;o.strokeStyle="rgba(200,208,220,0.4)",o.setLineDash([2,3]),o.beginPath(),o.moveTo(a.x,p),o.lineTo(a.x+a.w,p),o.stroke(),o.setLineDash([]),M(o,"peak/e",a.x+a.w-44,p-3,"#7d8799",10),C(o,[{label:"상시 색수차",color:"#ff9a3c"},{label:"펄스 (px@300)",color:"#4ade80"}],l,15),e.hud(`최근 4초 · τ ${d}ms 측정 ${(u.tauMeas*1e3).toFixed(1)}ms`)}}})}const D={layout:"compare",intro:'<b>색수차(chromatic aberration)</b>는 R·G·B 채널을 서로 반대 방향으로 조금씩 밀어 읽는 포스트 효과입니다. 늘 켜 두면 화면이 흐릿해질 뿐이지만, <b>타격 순간에만 크게 벌렸다가 <code>e^(−t/τ)</code>로 빠르게 모으면</b> 렌즈가 충격을 받은 듯 화면 자체가 "흔들린" 느낌을 줍니다. 카메라를 실제로 움직이지 않아 멀미가 적은 것도 장점.',how:["타격 이벤트에서 <code>pulse = peak × 세기</code>로 설정, 매 프레임 <code>pulse = peak·e^(−(t−t₀)/τ)</code>로 감쇠 (τ = 60~150ms).","포스트 셰이더: <code>R = tex(uv + o)</code>, <code>G = tex(uv)</code>, <code>B = tex(uv − o)</code>.","렌즈형은 <code>o = (uv − 중심) × k</code>로 가장자리에서 크게 → 중앙의 캐릭터는 또렷하게 유지된다.","오프셋은 해상도 기준(px)으로 정해 큰 화면·작은 화면에서 같은 느낌이 나게 한다.","상시 색수차는 0~1px 정도로 아주 약하게, 펄스 최대는 6~15px 정도가 무난."],pros:["셰이더 텍스처 3번 읽기 – 매우 싸다.","카메라를 흔들지 않고도 충격감을 줘서 화면 흔들림과 함께 쓰거나 대체(접근성)할 수 있다.",'τ 하나로 "날카로운 타격"(짧게) ↔ "묵직한 폭발"(길게) 조절.'],cons:["상시 적용은 눈이 피로하고 글자가 번진다 – UI에는 적용하지 말 것.","연타에서 매번 최대치로 리셋하면 계속 번진 상태가 된다 → 최댓값 갱신(max) 방식이나 쿨다운.","색각 이상 사용자에게는 정보가 덜 전달되므로 단독 피드백으로 쓰지 않는다."],usedIn:"사이버펑크 2077의 피격·글리치 효과, 여러 액션·슈터 게임의 피격 화면 효과, 언리얼 포스트 프로세스의 Chromatic Aberration(Scene Color Fringe).",tips:["τ는 날카로운 타격 60~100ms, 묵직한 폭발 150~300ms가 출발점이다. 반감 시간은 τ × ln2(약 0.7τ)다.","연타 때는 펄스를 더하지 말고 max(현재 값, 새 펄스)로 갱신한다. 합산하면 계속 번진 화면이 된다.","오프셋은 기준 해상도(예: 1080p) px로 정하고 실제 화면 높이 비율로 곱한다. 이 페이지는 높이 300px 기준(px@300)이다.","색수차를 싫어하는 플레이어가 많아 PC 게임 대부분이 끄기 옵션을 둔다. 꺼도 피격 정보가 사라지지 않게 플래시·흔들림과 함께 쓴다."],related:["shockwave","screen-shake","hit-flash","glitch","screen-damage"],controls:[{type:"button",key:"hit",label:"👊 타격"},{type:"range",key:"peak",label:"펄스 최대 (px@300)",min:2,max:24,step:.5,value:12},{type:"range",key:"tau",label:"감쇠 시간 τ (ms)",min:30,max:400,step:5,value:120},{type:"range",key:"const",label:"상시 색수차 (px@300)",min:0,max:10,step:.5,value:4},{type:"select",key:"dir",label:"방향",options:[{label:"렌즈형 (중심→가장자리)",value:"radial"},{label:"가로 균일",value:"flat"}],value:"radial"},{type:"range",key:"slow",label:"시간 배속 (배)",min:.1,max:1,step:.05,value:1},{type:"toggle",key:"auto",label:"자동 타격",value:!0}],setup(e,n){return e.on(t=>{const u=n.get("chroma");u&&t==="hit"&&(u.s.pending=!0)})},viewers:[{title:"색수차 없음",kind:"before",caption:"같은 타격 섬광이지만 화면은 그대로입니다. 임팩트가 적의 반짝임에만 갇혀 있습니다.",mount:h("none")},{title:"상시 색수차",kind:"variant",caption:"늘 같은 양만큼 채널이 벌어져 있어 화면이 흐릿하고, 타격 순간과 평소의 차이가 없습니다.",mount:h("const")},{title:"타격 펄스 (e^(−t/τ))",kind:"after",caption:"타격 순간 채널이 확 벌어졌다가 τ마다 1/e(약 37%)로 빠르게 모입니다. 평소엔 깨끗하고 충격만 강조됩니다. HUD의 측정 감쇠 시간이 τ와 같은지 확인하세요.",mount:h("pulse")},{title:"채널 오프셋 그래프",kind:"info",wide:!0,caption:"주황 점선(상시)은 평평하고, 초록(펄스)은 타격마다 치솟았다가 지수적으로 떨어집니다. 회색 점선 = 최근 최대/e(τ가 지난 뒤의 값)입니다. 최근 4초를 보여 줍니다.",mount:P}]};export{D as default};
