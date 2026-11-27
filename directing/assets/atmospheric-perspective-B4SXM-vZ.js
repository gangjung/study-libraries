import{C as S,V as Y,M as $,S as C,B as j,c as U,W as Z,d as K,F as H,e as X,f as q}from"./three.module-CEzfHhrp.js";import{m as J}from"./BufferGeometryUtils--Oh5Y0A9.js";import{m as Q}from"./three-viewer-fx7lDL-0.js";import{m as ee,b as V,a as te}from"./canvas-viewer-QtaWfmlz.js";import{c as oe,t as N,l as ne}from"./chart2d-DfgeckAJ.js";import{l as B,r as se,a as I}from"./staging-kit-BmPSAB88.js";const v=[12,24,40,62,90,130],ae=[-.12,-.06,-.01,.04,.09,.14],A=4,M=new S(13227746),re=new S(4026024),ie=(()=>{const o=new Y(.72,.92,1.6);return o.multiplyScalar(1/(.2126*o.x+.7152*o.y+.0722*o.z))})(),ce=new S(1913894),le=new S(4875328),ue=`
attribute float shade;
varying float vShade;
varying float vDepth;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mv.z;
  vShade = shade;
  gl_Position = projectionMatrix * mv;
}`,de=`
uniform vec3 uBase, uTop, uFog, uBlue;
uniform float uDensity, uAerial, uPass, uId;
varying float vShade;
varying float vDepth;
void main() {
  if (uPass > 1.5) { gl_FragColor = vec4(uId / 255.0, 0.0, 0.0, 1.0); return; }
  vec3 c = mix(uBase, uTop, pow(clamp(vShade, 0.0, 1.0), 3.0));
  float T = uPass > 0.5 ? 1.0 : exp(-uDensity * vDepth);
  vec3 col;
  if (uAerial > 0.5) {
    // 거리에 따라 채도가 먼저 빠지고(휘도 유지), 남은 색은 파랗게 – 그 위에 안개색을 섞는다
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    vec3 d = mix(vec3(l), c, T * T);
    d *= mix(vec3(1.0), uBlue, 1.0 - T);
    col = mix(uFog, d, T);
  } else col = mix(uFog, c, T);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,fe=`
uniform vec3 uFog, uZenith;
uniform float uPass;
varying vec3 vDir;
void main() {
  if (uPass > 1.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); return; }
  vec3 d = normalize(vDir);
  vec3 col = mix(uFog, uZenith, smoothstep(0.02, 0.55, d.y));
  vec3 sun = normalize(vec3(0.35, 0.18, -1.0));
  float s = max(0.0, dot(d, sun));
  col += vec3(1.0, 0.86, 0.62) * (pow(s, 600.0) * 4.0 + pow(s, 12.0) * 0.25);
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,me=`
varying vec3 vDir;
void main() {
  vDir = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;function E(o,e){const d=v[o],a=1/d,n=o*1.7,i=Math.sin(e*9*a+n)*.55+Math.sin(e*23*a+n*2.3)*.3+Math.sin(e*61*a+n*.7)*.15;return A+d*ae[o]+d*.035*i}function he(o){const e=v[o],d=e*1.3+8,a=140,n=[],i=[],c=[];for(let r=0;r<=a;r++){const t=-d+2*d*r/a,l=E(o,t);n.push(t,l,-e,t,l-e*.06,-e,t,-60,-e),i.push(1,.75,0)}for(let r=0;r<a;r++){const t=r*3,l=(r+1)*3;c.push(t,t+1,l,l,t+1,l+1,t+1,t+2,l+1,l+1,t+2,l+2)}const h=new K;return h.setAttribute("position",new H(n,3)),h.setAttribute("shade",new H(i,1)),h.setIndex(c),h}function ve(){const o=te(31),e=[],d=v[0];for(let a=0;a<70;a++){const n=-24+o()*48,i=.7+o()*1.1,c=new X(i*.28,i,7);c.deleteAttribute("uv"),c.deleteAttribute("normal"),c.translate(n,E(0,n)+i*.45-.15,-d+.25+o()*.3);const h=c.attributes.position.count,r=new Float32Array(h);for(let t=0;t<h;t++)r[t]=.35+.4*((c.attributes.position.getY(t)-E(0,n))/i);c.setAttribute("shade",new q(r,1)),e.push(c.toNonIndexed())}return J(e)}const D=90;function k(o){return e=>Q(e,{antialias:!0,orbit:!1,cam:[0,A,0],target:[0,A,-100],fov:50,near:.5,far:900},({scene:d,camera:a,renderer:n})=>{const i=[],c=p=>{const f=new C({vertexShader:ue,fragmentShader:de,uniforms:{uBase:{value:ce},uTop:{value:le},uFog:{value:M},uBlue:{value:ie},uDensity:{value:0},uAerial:{value:o==="aerial"?1:0},uPass:{value:0},uId:{value:p}}});return i.push(f),f};v.forEach((p,f)=>{const g=new $(he(f),c(f+1));g.renderOrder=-f,d.add(g)}),d.add(new $(ve(),c(20)));const h=new C({vertexShader:me,fragmentShader:fe,side:j,depthWrite:!1,uniforms:{uFog:{value:M},uZenith:{value:re},uPass:{value:0}}}),r=new $(new U(800,24,12),h);r.renderOrder=-100,d.add(r);let t=null,l=[],L=0,s=null;const x=B(M.r,M.g,M.b),P=p=>{for(const f of i)f.uniforms.uPass.value=p;h.uniforms.uPass.value=p},w=()=>{const p=Math.max(16,Math.round(D*a.aspect));(!t||t.width!==p)&&(t==null||t.dispose(),t=new Z(p,D),l=[0,1,2].map(()=>new Uint8Array(p*D*4))),n.setRenderTarget(t);for(const u of[2,1,0])P(u),n.render(d,a),n.readRenderTargetPixels(t,0,0,p,D,l[u]);P(0),n.setRenderTarget(null);const f=new Float64Array(v.length),g=new Float64Array(v.length),F=new Float64Array(v.length),T=new Float64Array(v.length),y=new Float64Array(v.length),[b,_,z]=l;for(let u=0;u<p*D*4;u+=4){const m=z[u]-1;if(m<0||m>=v.length)continue;const O=B(b[u]/255,b[u+1]/255,b[u+2]/255),W=B(_[u]/255,_[u+1]/255,_[u+2]/255);f[m]+=O-x,g[m]+=W-x;const[G,R]=se(I(b[u]/255),I(b[u+1]/255),I(b[u+2]/255));F[m]+=Math.cos(G*Math.PI/180)*R,T[m]+=Math.sin(G*Math.PI/180)*R,y[m]++}s={T:v.map((u,m)=>y[m]&&Math.abs(g[m])>1e-6?f[m]/g[m]:NaN),hue:v.map((u,m)=>y[m]?(Math.atan2(T[m],F[m])*180/Math.PI+360)%360:NaN),sigma:o==="none"?0:e.params.num("density",.018)},e.shared.set(`ap-${o}`,s)};return{update(p,f){const g=o==="none"?0:e.params.num("density",.018);for(const b of i)b.uniforms.uDensity.value=g;const F=e.params.bool("pan",!0)?Math.sin(f*.25)*4:0;if(a.position.set(F,A,0),a.lookAt(F,A,-100),a.updateMatrixWorld(),r.position.copy(a.position),L++%10===0&&w(),!s)return;const T=s,y=b=>`d${String(v[b]).padEnd(3)} ${Number.isNaN(T.T[b])?" -- ":T.T[b].toFixed(2)}/${Math.exp(-g*v[b]).toFixed(2)}`;e.hud([`σ=${g.toFixed(3)}/m · 측정/이론 e^(−σd)`,`${y(0)}  ${y(1)}`,`${y(2)}  ${y(3)}`,`${y(4)}  ${y(5)}`,`색상 d12 ${T.hue[0].toFixed(0)}° d40 ${T.hue[2].toFixed(0)}° d90 ${T.hue[4].toFixed(0)}°`].join(`
`))},dispose(){t==null||t.dispose()}}})}function pe(o){return ee(o,()=>({draw(e,d,a){oe(e,d,a);const n=34,i=22,c=V(d-n-12,20),h=V(a-i-36,20),r=s=>n+s/140*c,t=s=>i+h-Math.max(0,Math.min(1.1,s))/1.1*h;e.strokeStyle="#1c2230",e.strokeRect(n+.5,i+.5,c,h);for(const s of[.25,.5,.75,1])e.beginPath(),e.moveTo(n,t(s)+.5),e.lineTo(n+c,t(s)+.5),e.stroke(),N(e,s.toFixed(2),n-4,t(s)+3,"#7d8799",9,"right");for(const s of[0,40,80,120])N(e,`${s}m`,r(s),i+h+12,"#7d8799",9,"center");const l=o.params.num("density",.018);e.strokeStyle="#e6ebf2",e.setLineDash([4,3]),e.beginPath();for(let s=0;s<=70;s++){const x=s/70*140;s?e.lineTo(r(x),t(Math.exp(-l*x))):e.moveTo(r(x),t(Math.exp(-l*x)))}e.stroke(),e.setLineDash([]);const L=[["none","#f87171",0],["fog","#5b9cff",-2],["aerial","#4ade80",2]];for(const[s,x,P]of L){const w=o.shared.get(`ap-${s}`);w&&(e.fillStyle=x,v.forEach((p,f)=>{Number.isNaN(w.T[f])||(e.beginPath(),e.arc(r(p)+P,t(w.T[f]),4,0,Math.PI*2),e.fill())}))}N(e,"하늘 대비 잔존율 (L−L안개)/(L₀−L안개) vs 거리",n,13,"#c8d0dc",10),ne(e,[{label:`이론 e^(−${l.toFixed(3)}d)`,color:"#e6ebf2"},{label:"안개 없음",color:"#f87171"},{label:"지수 안개",color:"#5b9cff"},{label:"+탈채도",color:"#4ade80"}],8,a-6,9),o.hud("")}}))}const Fe={layout:"variants",intro:'<b>대기 원근</b>(공기 원근법)은 레오나르도 다 빈치가 정리한 원리로, 빛이 공기 속 입자에 산란되기 때문에 <b>멀리 있는 것일수록 대비가 낮아지고 하늘색에 가까워집니다</b>. 빛이 거리 <code>d</code>를 지나며 남는 비율은 <code>T = e^(−σ·d)</code> (비어-람베르트 법칙), 화면 색은 <code>물체색·T + 안개색·(1−T)</code>입니다. 세 뷰어의 능선 6겹은 <b>모두 똑같은 색</b>으로 칠해져 있습니다. HUD는 렌더 타깃을 읽어 능선마다 "하늘 대비가 얼마나 남았나"를 측정하고 이론값 <code>e^(−σd)</code>와 나란히 보여줍니다.',how:["능선을 깊이 12·24·40·62·90·130m에 세운다. 셰이더에서 시야 깊이 <code>d = −viewPos.z</code>로 <code>T = exp(−σd)</code>를 계산해 안개색과 섞는다.","안개색을 하늘의 지평선 색과 같게 하면, 먼 능선은 하늘에 녹아들며 끝이 사라진다.","대기 원근 강화: 채도를 <code>T²</code>로 먼저 빼고(휘도는 유지), 남은 색에 파란 틴트를 <code>1−T</code>만큼 곱한다 → 명도 단서에 색 단서가 더해진다.","측정: 능선 ID 패스 + 안개 없는 기준 패스 + 실제 패스를 같은 카메라로 그려, 능선별 <code>(L − L_안개) / (L₀ − L_안개)</code>를 평균. 선형 휘도로 계산하므로 셰이더 공식과 그대로 비교된다.","Three.js 기본 <code>FogExp2</code>는 <code>1 − e^(−(σd)²)</code>로 가까운 곳은 거의 맑고 먼 곳이 급격히 흐려지는 다른 곡선이다 – 여기서는 물리적인 1제곱 지수를 직접 구현했다."],pros:["같은 색 에셋을 거리만으로 겹겹이 분리해, 산·도시·숲의 규모감을 싸게 만든다.","먼 곳의 디테일을 숨겨 LOD 전환·컬링 경계를 가려준다 (오픈 월드의 필수 요소).","안개색 하나로 시간대·날씨·지역의 분위기를 통째로 바꿀 수 있다."],cons:["밀도가 너무 높으면 게임플레이 시야(적·목표 지점)까지 지워 버린다.",'하늘과 안개색이 어긋나면 먼 지형이 "회색 판"처럼 떠 보인다.',"단일 지수 안개는 높이 차(골짜기 안개, 산 정상의 맑음)를 표현하지 못해 높이 안개·볼류메트릭이 필요해진다."],usedIn:"〈젤다의 전설: 브레스 오브 더 와일드〉의 푸른 원경, 〈사일런트 힐〉(짧은 시야를 짙은 안개로 연출), 〈섀도우 오브 더 콜로서스〉, 〈저니〉, 〈호라이즌 제로 던〉·〈엘든 링〉의 원경 능선. 동양 산수화의 삼원법과 지브리 배경 미술도 같은 원리를 쓴다.",tips:['σ는 "어디서 대비가 절반이 되나"로 정하면 쉽다: 절반 거리 d½ = ln2/σ ≈ 0.69/σ. 예를 들어 200m에서 절반이 되게 하려면 σ ≈ 0.0035/m.',"플레이 공간(적·목표가 나오는 거리)의 잔존율은 0.6 이상으로 유지하고, 그보다 먼 원경에서 본격적으로 흐려지게 한다. 시작 거리(fog start)를 두는 것도 방법이다.","안개색은 고정값 대신 카메라가 바라보는 방향의 하늘 지평선 색(태양 쪽은 밝고 따뜻하게)을 쓰면 먼 지형이 하늘과 자연스럽게 이어진다.","산·골짜기가 있는 맵은 높이에 따라 밀도가 줄어드는 높이 안개(σ·e^(−h/H))를 겹치면 골짜기 안개와 맑은 산 정상이 함께 표현된다."],related:["volumetric-fog","sky-scattering","parallax","color-script","god-rays"],controls:[{type:"range",key:"density",label:"안개 밀도 σ (/m)",min:.004,max:.05,step:.001,value:.018},{type:"toggle",key:"pan",label:"카메라 좌우 이동",value:!0}],viewers:[{title:"안개 없음",kind:"before",caption:"여섯 능선이 같은 색으로 겹쳐 있어 겹침 말고는 거리 단서가 없습니다. 측정 대비가 모든 거리에서 1.00입니다.",mount:k("none")},{title:"지수 안개 (하늘색으로)",kind:"after",caption:"같은 능선이 멀수록 하늘에 녹아듭니다. 측정 잔존율이 이론 e^(−σd)와 소수 둘째 자리까지 일치합니다.",mount:k("fog")},{title:"안개 + 탈채도 · 청색 이동",kind:"variant",caption:"휘도 대비는 같은 곡선을 따르지만 채도가 더 빨리 빠지고 원경이 파래집니다. HUD 마지막 줄의 색상(°)이 초록(약 140°)에서 파랑(200°대)으로 안개만 쓸 때보다 빨리 넘어갑니다.",mount:k("aerial")},{title:"거리별 대비 – 측정 vs 이론",kind:"info",caption:"점선이 비어-람베르트 곡선, 점이 측정값입니다. 빨강(안개 없음)은 1에 붙어 있고, 파랑·초록은 곡선 위에 놓입니다.",mount:pe}]};export{Fe as default};
