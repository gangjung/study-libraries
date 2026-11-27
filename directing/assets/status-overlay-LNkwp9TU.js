import{V as O,S as st,M as nt,aA as at}from"./three.module-CEzfHhrp.js";import{m as rt}from"./three-viewer-fx7lDL-0.js";import{m as it,b as V,a as ct,s as lt}from"./canvas-viewer-QtaWfmlz.js";import{c as ut,t as A,l as ft}from"./chart2d-DfgeckAJ.js";import{s as vt}from"./anime-kit-C6AkWSFn.js";import{g as pt,T as mt,C as dt,c as X,M as I,a as j,b as W}from"./shader-kit-b-CX5DRTZo.js";import{N as ht,p as w,c as bt,s as xt,b as $}from"./extra-kit-c-FPjCbN4U.js";import"./BufferGeometryUtils--Oh5Y0A9.js";const Y=["frozen","burn","poison","stone"],yt={frozen:0,burn:1,poison:2,stone:3},L={frozen:"빙결",burn:"화상",poison:"중독",stone:"석화"},kt={frozen:[.5,.8,1],burn:[1,.4,.1],poison:[.45,1,.3],stone:[.55,.55,.55]},Mt=4.5,Tt=6.5,D=12e3,R=64,G=64,J=e=>-.02+1.04*e;function K(e,t,s,c){const n=s/W;return e==="stone"?.85*n+.15*$(t*4,s*4,c*4):e==="burn"?.7*n+.3*$(t*5+3,s*5+3,c*5+3):e==="frozen"?$(t*3+7,s*3+7,c*3+7):Math.min(1,5*Math.abs($(t*5+11,s*5+11,c*5+11)-.5))}let g=null;function Q(){if(g)return g;const e=X(),{P:t,N:s}=xt(e,D,ct(31));e.dispose();const c={},n={};for(const y of Y){const a=new Float32Array(D);for(let i=0;i<D;i++)a[i]=K(y,t[i*3],t[i*3+1],t[i*3+2]);c[y]=a,n[y]=Float32Array.from(a).sort()}return g={P:t,N:s,f:c,sorted:n},g}const St=`
uniform vec3 uL, uTint;
uniform float uStatus, uTh, uP, uTime, uMode, uMask;
varying vec3 vWp;
varying vec3 vNw;
varying vec3 vOp;
varying vec3 vCol;
varying float vPart;
${ht}
${mt}
float field(vec3 p) {
  float yn = p.y / ${W.toFixed(3)};
  if (uStatus < 0.5) return xk_fbm(p * 3.0 + 7.0);
  if (uStatus < 1.5) return 0.7 * yn + 0.3 * xk_fbm(p * 5.0 + 3.0);
  if (uStatus < 2.5) return min(1.0, 5.0 * abs(xk_fbm(p * 5.0 + 11.0) - 0.5));
  return 0.85 * yn + 0.15 * xk_fbm(p * 4.0);
}
void main() {
  vec3 n = normalize(vNw);
  vec3 v = normalize(cameraPosition - vWp);
  vec3 base = toonShade(vCol, n, uL, v);
  float cov = 0.0;
  float f = 1.0;
  if (uMode > 1.5) { f = field(vOp); cov = step(f, uTh); }
  else if (uMode > 0.5) cov = step(0.5, uP);
  if (uMask > 0.5) {
    // 1: 덮임 마스크 · 2, 3: 오브젝트 좌표를 16비트(두 채널)로 기록 → CPU가 같은 픽셀의 f를 다시 계산
    vec3 q = clamp((vOp - vec3(-0.6, -0.05, -0.6)) / vec3(1.2, 1.8, 1.2), 0.0, 1.0) * 255.0;
    vec3 hi = floor(q) / 255.0;
    vec3 lo = fract(q);
    if (uMask < 1.5) gl_FragColor = vec4(cov, 1.0, 0.0, 1.0);
    else if (uMask < 2.5) gl_FragColor = vec4(hi.x, lo.x, hi.y, lo.y);
    else gl_FragColor = vec4(hi.z, lo.z, cov, 1.0);
    return;
  }
  vec3 col = base;
  if (uMode > 0.5 && uMode < 1.5) {
    col = mix(base, base * uTint * 1.4, uP * 0.75);
  } else if (uMode > 1.5) {
    float edge = cov * smoothstep(uTh - 0.05, uTh, f);
    float lum = dot(base, vec3(0.299, 0.587, 0.114));
    float nv = max(dot(n, v), 0.0);
    vec3 h = normalize(uL + v);
    float nh = max(dot(n, h), 0.0);
    float nl = dot(n, uL);
    vec3 fx;
    if (uStatus < 0.5) {
      // 빙결: 채도 빼고 푸른 얼음 + 프레넬 + 날카로운 반사 + 서리 반짝이
      vec3 ice = mix(vec3(lum) * vec3(0.7, 0.88, 1.08), vec3(0.62, 0.85, 1.0), 0.45);
      float fres = pow(1.0 - nv, 3.0);
      float frost = smoothstep(0.66, 0.72, xk_vnoise(vOp * 46.0)) * (0.6 + 0.4 * sin(uTime * 3.0 + vOp.x * 40.0));
      fx = ice + fres * vec3(0.55, 0.85, 1.0) * 0.6 + pow(nh, 90.0) * 1.4 * step(0.0, nl) + frost * 0.4;
      fx += edge * vec3(0.9, 0.97, 1.0) * 0.8;
    } else if (uStatus < 1.5) {
      // 화상: 그을린 바탕 + 위로 흐르는 노이즈 불길(발광)
      float fl = xk_fbm(vOp * vec3(6.0, 3.0, 6.0) - vec3(0.0, uTime * 2.4, 0.0));
      float heat = smoothstep(0.42, 0.72, fl) * (0.45 + 0.55 * (1.0 - vOp.y / ${W.toFixed(3)}));
      vec3 emi = mix(vec3(1.0, 0.22, 0.02), vec3(1.0, 0.85, 0.35), heat) * heat * 2.2;
      fx = base * vec3(0.32, 0.24, 0.22) + emi + edge * vec3(1.0, 0.5, 0.1) * 2.2;
    } else if (uStatus < 2.5) {
      // 중독: 탁한 녹색 + 맥동하는 혈관
      float vn = xk_fbm(vOp * 9.0 + 5.0);
      float vein = 1.0 - smoothstep(0.0, 0.03, abs(vn - 0.5));
      float pulse = 0.5 + 0.5 * sin(uTime * 5.0 - vOp.y * 10.0);
      fx = base * vec3(0.62, 0.85, 0.55) + vein * vec3(0.45, 1.0, 0.2) * (0.35 + 0.9 * pulse);
      fx += edge * vec3(0.5, 1.0, 0.3) * 0.7;
    } else {
      // 석화: 회색 돌 결 + 균열, 반사 없음
      float grain = xk_fbm(vOp * 16.0);
      float crack = 1.0 - smoothstep(0.0, 0.025, abs(xk_vnoise(vOp * 9.0) - 0.5));
      vec3 stone = vec3(0.56, 0.54, 0.5) * (0.65 + 0.6 * grain);
      fx = stone * (0.35 + 0.75 * max(nl, 0.0)) * (1.0 - crack * 0.55);
      fx *= 1.0 - edge * 0.45;
    }
    col = mix(base, fx, cov);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}`,Pt=(e,t)=>lt(e.shared,"statusClock",t,()=>({t:0,local:0,p:0}),(s,c)=>{s.t+=c,e.params.bool("auto",!0)?(s.local=(s.local+c)%Tt,s.p=Math.min(1,s.local/Mt)):s.p=e.params.num("prog",.5)});function U(e){return t=>rt(t,{antialias:!0,orbit:!1,fov:30,cam:[.6,1.05,4.1],target:[0,.78,0]},({scene:s,camera:c,renderer:n})=>{const y=vt(1053468,2828868,40);s.add(y);const a=pt(10);s.add(a);const i={value:new O(.5,.75,.45).normalize()},r=new st({vertexShader:dt,fragmentShader:St,uniforms:{uL:i,uTint:{value:new O(1,1,1)},uStatus:{value:0},uTh:{value:0},uP:{value:0},uTime:{value:0},uMode:{value:e==="none"?0:e==="tint"?1:2},uMask:{value:0}}}),l=X(),d=new nt(l,r);s.add(d);const x=new I(!0),o={me:NaN,th:NaN,surf:NaN,p:0,dots:[],status:"frozen"};t.shared.set(`status-meas-${e}`,o);let Z=0;const T=Q(),H=new at,C=new O,N=new O,tt=(h,k)=>{d.updateMatrixWorld(),H.getNormalMatrix(d.matrixWorld);const m=c.position;let p=0,u=0;const b=T.f[h];for(let f=0;f<D;f++){C.set(T.P[f*3],T.P[f*3+1],T.P[f*3+2]).applyMatrix4(d.matrixWorld),N.set(T.N[f*3],T.N[f*3+1],T.N[f*3+2]).applyMatrix3(H);const M=m.x-C.x,S=m.y-C.y,v=m.z-C.z,P=M*M+S*S+v*v,F=(N.x*M+N.y*S+N.z*v)/Math.sqrt(P);if(F<=0)continue;const _=F/P;u+=_,b[f]<k&&(p+=_)}return u>0?p/u:NaN},E=new I(!0),q=new I(!0),B=(h,k)=>{const m=h.ensure(R,G);return r.uniforms.uMask.value=k,n.setRenderTarget(m),n.setClearColor(0,0),n.clear(),n.render(s,c),h.read(n)},et=(h,k,m,p)=>{if(e==="tint")return m>=.5?1:0;const u=B(E,2),b=B(q,3);let f=0,M=0;const S=(v,P)=>(v+P/255)/255;for(let v=0;v<R*G;v++){if(p[v*4+1]<128)continue;const P=-.6+1.2*S(u[v*4],u[v*4+1]),F=-.05+1.8*S(u[v*4+2],u[v*4+3]),_=-.6+1.2*S(b[v*4],b[v*4+1]);f++,K(h,P,F,_)<k&&M++}return f?M/f:NaN},ot=(h,k,m)=>{const p=x.ensure(R,G);y.visible=!1,a.visible=!1,r.uniforms.uMask.value=1,n.setRenderTarget(p),n.setClearColor(0,0),n.clear(),n.render(s,c);const u=x.read(n),b=j(u,1),f=j(u,0);o.me=b?f/b:NaN,o.th=et(h,k,m,u),o.surf=e==="shader"?tt(h,k):o.th,n.setRenderTarget(null),r.uniforms.uMask.value=0,y.visible=!0,a.visible=!0,o.p=m,o.status!==h&&(o.status=h,o.dots=[]),Number.isFinite(o.me)&&(o.dots.push({p:m,me:o.me,th:o.th,surf:o.surf}),o.dots.length>90&&o.dots.shift())};let z={s:"frozen",th:0,p:0};return{update(h,k,m){const p=Pt(t,m),u=t.params.str("status","frozen")||"frozen",b=J(p.p);r.uniforms.uStatus.value=yt[u],r.uniforms.uTh.value=b,r.uniforms.uP.value=p.p,r.uniforms.uTime.value=p.t,r.uniforms.uTint.value.set(...kt[u]),d.rotation.y=.55*Math.sin(p.t*.35),d.position.y=0,z={s:u,th:b,p:p.p};const M=[e==="none"?"상태 표시 없음 (같은 진행 시계)":e==="tint"?`${L[u]} · 전신 색 틴트 강도 ${w(p.p*.75)}`:`${L[u]} · θ = −0.02 + 1.04·p = ${b.toFixed(2)}`,`진행 p ${w(p.p)}`];e!=="none"&&M.push(`덮임 측정 ${w(o.me)} / 이론 ${w(o.th)}`,e==="tint"?'(틴트 ≥ 절반이면 전부 "덮임"으로 셈)':`표면 표본 가중 ${w(o.surf)} · 측정 시점 p ${w(o.p)}`),t.hud(M.join(`
`))},render(){e!=="none"&&Z++%8===0&&ot(z.s,z.th,z.p),n.render(s,c)},dispose(){x.dispose(),E.dispose(),q.dispose()}}})}function wt(e){return it(e,()=>({draw(t,s,c){ut(t,s,c);const n=e.params.str("status","frozen")||"frozen",y=Q(),a={x:38,y:22,w:V(s-52,20),h:V(c-56,20)},i=l=>a.x+l*a.w,r=l=>a.y+a.h-Math.max(0,Math.min(1,l))*a.h;t.strokeStyle="#1c2230",t.strokeRect(a.x+.5,a.y+.5,a.w,a.h);for(const l of[0,.25,.5,.75,1])A(t,`${Math.round(l*100)}%`,a.x-4,r(l)+3,"#7d8799",9,"right"),A(t,l.toFixed(2),i(l),a.y+a.h+11,"#7d8799",9,"center");t.strokeStyle="#3a4458",t.setLineDash([3,3]),t.beginPath(),t.moveTo(i(0),r(0)),t.lineTo(i(1),r(1)),t.stroke(),t.strokeStyle="#ff9a3c",t.beginPath(),t.moveTo(i(0),r(0)),t.lineTo(i(.5),r(0)),t.lineTo(i(.5),r(1)),t.lineTo(i(1),r(1)),t.stroke(),t.setLineDash([]),t.strokeStyle="#a3e635",t.lineWidth=1.8,t.beginPath();for(let l=0;l<=100;l++){const d=l/100,x=bt(y.sorted[n],J(d));l?t.lineTo(i(d),r(x)):t.moveTo(i(d),r(x))}t.stroke(),t.lineWidth=1;for(const[l,d]of[["status-meas-shader","#a3e635"],["status-meas-tint","#ff9a3c"]]){const x=e.shared.get(l);if(!(!x||x.status!==n))for(const o of x.dots)t.fillStyle=d,t.beginPath(),t.arc(i(o.p),r(o.me),2.4,0,Math.PI*2),t.fill(),l==="status-meas-shader"&&(t.strokeStyle="#e6e9ef",t.beginPath(),t.arc(i(o.p),r(o.surf),3.6,0,Math.PI*2),t.stroke())}A(t,`${L[n]} 덮인 넓이 vs 진행 p  (점 GPU · 원 표면 표본)`,a.x,13,"#c8d0dc",10),ft(t,[{label:"셰이더 F(θ)",color:"#a3e635"},{label:"틴트",color:"#ff9a3c"},{label:"덮임 = p",color:"#3a4458"}],a.x,c-4,9),e.hud("")}}))}const Dt={layout:"compare",intro:'빙결·화상·중독·석화 같은 상태이상은 아이콘보다 <b>캐릭터 몸 자체</b>가 바뀔 때 한눈에 읽힙니다. 같은 캐릭터에 상태를 <b>표면 셰이더 오버레이</b>로 덮어, 단순히 몸 전체 색을 바꾸는 틴트와 비교합니다. 모든 상태가 "퍼짐 필드 f(p) < 임계값 θ(t)"라는 한 틀을 쓰고, 필드 모양만 바꿔 발부터 굳거나 아래부터 타오르거나 혈관을 따라 번지게 합니다. 덮인 넓이를 GPU에서 세어 노이즈 분포(CDF) 이론과 맞춰 봅니다.',how:["퍼짐 필드: 석화 <code>0.85·y/H + 0.15·fbm</code>(발부터), 화상 <code>0.7·y/H + 0.3·fbm</code>(아래부터), 빙결 <code>fbm</code>(얼룩), 중독 <code>min(1, 5·|fbm − ½|)</code>(능선=혈관부터). 오브젝트 공간 좌표라 캐릭터가 움직여도 무늬가 붙어 있다.",'임계값 <code>θ = −0.02 + 1.04·p</code>, p = 진행도(0→1). <code>f &lt; θ</code>인 곳이 덮이고, θ 바로 아래 띠는 서리선·불씨·균열 같은 "전선" 효과.',"덮인 곳의 머티리얼: 빙결 = 채도 감소 + 푸른 얼음 + 프레넬 + 날카로운 반사 + 서리 반짝임 / 화상 = 그을림 + 위로 흐르는 노이즈 불길 발광 / 중독 = 탁한 녹색 + 맥동 혈관 / 석화 = 돌 결 + 균열, 반사 없음.","측정: 덮임 마스크를 64×64 타깃에 그려 읽은 덮인 픽셀 비율. 이론: 정수 해시 노이즈라 CPU가 GPU와 같은 f를 계산한다 → 같은 픽셀에 보이는 표면의 오브젝트 좌표를 두 채널 16비트로 읽어 CPU가 <code>f &lt; θ</code>를 다시 판정. 그래프의 원은 표면 표본 1.2만 개를 투영 넓이로 가중한 값(머리카락 아래 두피처럼 가려진 면까지 세어 몇 % 어긋남)."],pros:["진행 상황이 몸에 그대로 보인다: 석화가 무릎까지 왔는지, 불길이 얼마나 번졌는지 UI 없이 읽힌다.","한 셰이더 + 상태 번호 + 임계값 하나로 모든 상태를 처리해 머티리얼 교체·추가 메시가 필요 없다.","필드를 CDF로 균등화하면(디졸브 페이지 참고) 진행 속도를 원하는 곡선으로 맞출 수 있다."],cons:["노이즈 필드는 분포가 가운데 몰려(빙결) 진행이 S자로 빨라졌다 느려진다. 게임 시간과 맞추려면 CDF 보정이 필요하다.","오버레이마다 노이즈를 여러 번 계산해 프래그먼트 비용이 크다. 모바일에서는 노이즈를 텍스처로 굽는다.","여러 상태가 겹칠 때(빙결 + 중독) 우선순위·섞는 규칙을 따로 정해야 한다."],usedIn:"〈원신〉의 빙결(얼음 껍질), 〈디아블로〉 시리즈의 빙결·중독 색 오버레이, 〈몬스터 헌터〉의 상태이상 표시처럼 상태를 몸 표면으로 보여 주는 연출은 액션 RPG 전반에 쓰입니다. 실제 게임은 추가 메시(얼음 덩어리)·파티클을 함께 쓰는 경우가 많고, 여기서는 셰이더 부분만 다룹니다.",tips:["진행 p와 덮인 넓이를 정확히 비례시키려면 θ = F⁻¹(p)(필드 CDF의 역함수)를 쓴다. 표본 몇천 개로 미리 정렬해 두면 표 하나로 끝난다.","스키닝된 캐릭터는 애니메이션된 위치가 아니라 기본 자세(바인드 포즈) 좌표로 필드를 계산해야 무늬가 몸 위에서 미끄러지지 않는다.","전선 띠 폭은 필드 단위 0.03~0.08(여기선 0.05)이 무난하다. 너무 얇으면 멀리서 깜빡이고, 너무 두꺼우면 덮인 영역과 구분이 안 된다.",'해제 연출은 θ를 거꾸로 내리면 된다. 빙결 해제는 θ를 빠르게 내리면서 얼음 파편 파티클을 함께 터뜨리면 "깨진다"는 느낌이 산다.'],related:["dissolve-death","elemental-reaction","hit-flash","snow-accumulation","low-health"],controls:[{type:"select",key:"status",label:"상태이상",value:"frozen",options:Y.map(e=>({label:L[e],value:e}))},{type:"toggle",key:"auto",label:"진행 자동 반복 (4.5초에 100%, 6.5초 주기)",value:!0},{type:"range",key:"prog",label:"진행 p (자동 끔일 때)",min:0,max:1,step:.01,value:.5}],viewers:[{title:"상태 표시 없음",kind:"before",caption:"같은 캐릭터, 같은 진행 시계. 상태가 걸렸는지 몸만 봐서는 알 수 없습니다.",mount:U("none")},{title:"전신 색 틴트",kind:"variant",caption:"몸 전체를 상태 색으로 물들였습니다. 걸렸다는 것만 알 뿐 얼마나 진행됐는지, 어떤 재질인지는 읽히지 않습니다.",mount:U("tint")},{title:"머티리얼 오버레이",kind:"after",caption:"퍼짐 필드 < 임계값인 곳만 얼음·불길·혈관·돌로 바뀝니다. 상태를 골라 보세요. 전선(경계 띠)이 진행 방향을 보여 줍니다.",mount:U("shader")},{title:"덮인 넓이 vs 진행",kind:"info",caption:"초록 곡선 = 표면 전체 노이즈 CDF F(θ(p)), 초록 점 = 오버레이 GPU 측정, 흰 원 = 보이는 쪽 표면 표본 가중값, 주황 = 틴트(p ≥ 0.5에서 전부 덮임으로 셈), 회색 점선 = 덮임 = p. 석화·화상은 높이가 섞여 거의 직선, 빙결은 S자, 중독은 초반이 빠릅니다.",mount:wt}]};export{Dt as default};
