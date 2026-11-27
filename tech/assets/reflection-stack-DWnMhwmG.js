import{o as U,u as N,az as he,M as W,S as Y,bh as ne,aG as re,s as ie,bi as le,g as V,r as ce,aN as ge,k as de,aB as pe,P as q,bw as we,aP as ye,w as E,H as Re,D as Ce,a6 as ke,p as A,C as Me,b as We,B as ze,ae as Fe,n as _e}from"./three.module-BZgG6AUv.js";import{F as Pe}from"./Pass-By1_TgQk.js";import{m as $e}from"./three-viewer-0rZIEDzf.js";import{G as ee,Q as Le}from"./glsl-DOwCk4-f.js";const Te={ssr:0,probe:1,stack:2},b=2.2,T=3.2,j=-1,H=9.5,X=new V(0,1.6,4),ue=new V(-b,0,j),ve=new V(b,T,H),je=new de(j,j+1.2),xe=new V(-4,10,-12).normalize(),J=64,me=1.3,K=8,Be=`
varying vec3 vDir;
void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,De=`
uniform vec3 sunDir; varying vec3 vDir;
${ee}
void main(){
  vec3 d = normalize(vDir);
  float y = d.y;
  vec3 zen = vec3(.08, .22, .62), hor = vec3(.55, .64, .78), gnd = vec3(.12, .11, .10);
  vec3 c = y > 0. ? mix(hor, zen, pow(clamp(y, 0., 1.), .55)) : mix(hor * .45, gnd, clamp(-y * 5., 0., 1.));
  if (y > 0.) {
    vec2 p = d.xz / (y + .12) * 1.4;
    float cl = smoothstep(.48, .78, fbm2(p + 4.));
    c = mix(c, vec3(.92, .93, .96), cl * .75 * smoothstep(0., .25, y));
  }
  float s = max(dot(d, sunDir), 0.);
  c += vec3(1., .86, .62) * (pow(s, 900.) * 40. + pow(s, 10.) * .3);
  gl_FragColor = vec4(c * 1.3, 1.);
}`,Ge=`
varying vec3 vW;
void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,Ie=`
uniform sampler2D tColor; uniform sampler2D tDepth;
uniform samplerCube skyCube; uniform samplerCube probeCube;
uniform mat4 proj; uniform mat4 projInv;
uniform vec2 res; uniform float mode; uniform float viz; uniform float rough; uniform float edgeW; uniform float boxProj;
uniform vec3 probeP; uniform vec3 bmin; uniform vec3 bmax; uniform vec2 inflZ; uniform float exposure;
varying vec3 vW;
${ee}
vec3 viewPos(vec2 uv){ float d = texture(tDepth, uv).x; vec4 p = projInv * vec4(uv * 2. - 1., d * 2. - 1., 1.); return p.xyz / p.w; }
void main(){
  // 바닥은 따로 그리므로 장면 깊이와 직접 비교해 가려진 부분을 버린다
  vec2 suv = gl_FragCoord.xy / res;
  if (texture(tDepth, suv).x < gl_FragCoord.z - 1e-6) discard;

  float puddle = smoothstep(.46, .6, fbm2(vW.xz * .32 + 3.1));
  float r = clamp(mix(rough, rough * .2, puddle), 0., 1.);
  vec3 V = normalize(cameraPosition - vW);
  vec3 Rw = reflect(-V, vec3(0., 1., 0.));

  // ── 1) SSR: 뷰 공간에서 반사 광선을 걸으며 깊이 버퍼와 비교
  float ssrW = 0.; vec3 ssrC = vec3(0.); float steps = 0.;
  float roughFade = mode > 1.5 ? 1. - smoothstep(.3, .55, r) : 1.; // 계층 모드: 거친 픽셀은 SSR을 건너뜀
  if ((mode < .5 || mode > 1.5) && roughFade > 0.) {
    vec3 P = (viewMatrix * vec4(vW, 1.)).xyz;
    vec3 R = normalize((viewMatrix * vec4(Rw, 0.)).xyz);
    float stepLen = .08; vec3 Q = P + R * stepLen * hash12(gl_FragCoord.xy); float hit = 0.; vec2 huv = vec2(0.); float dist = 0.;
    for (int i = 0; i < ${J}; i++) {
      steps += 1.;
      Q += R * stepLen;
      vec4 c = proj * vec4(Q, 1.);
      if (c.w <= 0.) break;
      vec2 uv = c.xy / c.w * .5 + .5;
      if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) break; // 화면 밖: 정보 없음
      float diff = viewPos(uv).z - Q.z;
      if (diff > 0. && diff < max(.12, stepLen * 1.2)) {
        vec3 a = Q - R * stepLen, b = Q;
        for (int k = 0; k < 5; k++) {
          vec3 m = (a + b) * .5; vec4 cm = proj * vec4(m, 1.); vec2 um = cm.xy / cm.w * .5 + .5;
          if (viewPos(um).z - m.z > 0.) b = m; else a = m;
        }
        vec4 cb = proj * vec4(b, 1.); huv = cb.xy / cb.w * .5 + .5; hit = 1.; dist = length(b - P);
        break;
      }
      stepLen *= 1.05;
    }
    if (hit > .5) {
      float ew = max(edgeW, .001);
      vec2 e = smoothstep(0., ew, huv) * (1. - smoothstep(1. - ew, 1., huv));
      float facing = 1. - smoothstep(.2, .6, R.z); // 카메라 쪽으로 돌아오는 광선은 신뢰도 낮음
      ssrW = e.x * e.y * facing * roughFade;
      ssrC = textureLod(tColor, huv, clamp(r * (2. + dist * 1.2), 0., 6.)).rgb;
    }
  }

  // ── 2) 로컬 프로브 (박스 투영) + 3) 하늘
  vec3 probeC = vec3(0.); float infl = 0.;
  if (mode > .5) {
    vec3 Rp = Rw;
    if (boxProj > .5) {
      vec3 f = (bmax - vW) / Rp, b = (bmin - vW) / Rp;
      vec3 far = max(f, b);
      float t = max(min(min(far.x, far.y), far.z), 0.);
      Rp = vW + Rp * t - probeP;
    }
    probeC = textureLod(probeCube, Rp, r * 6.).rgb;
    infl = smoothstep(inflZ.x, inflZ.y, vW.z) * step(vW.z, bmax.z);
  }
  vec3 skyC = textureLod(skyCube, Rw, r * 5.).rgb;

  // ── 계층 합성: SSR 신뢰도만큼 SSR, 나머지는 프로브 영향도만큼 프로브, 그래도 남으면 하늘
  float none = 0., pW = 0., sW = 0.;
  if (mode < .5) none = 1. - ssrW;
  else { float rest = 1. - ssrW; pW = rest * infl; sW = rest - pW; }
  vec3 refl = ssrC * ssrW + probeC * pW + skyC * sW;

  vec2 g = step(.5, fract(vW.xz * .5));
  float tile = abs(g.x - g.y);
  if (viz > 1.5) { gl_FragColor = vec4(ssrW, pW, sW, (1. + steps) / ${J+1}.); return; }
  if (viz > .5) {
    vec3 m = vec3(.03, .62, .12) * ssrW + vec3(.05, .2, .95) * pW + vec3(.33) * sW + vec3(.006) * none;
    gl_FragColor = vec4(m * (.85 + .15 * tile), 1.);
  } else {
    vec3 alb = mix(vec3(.028, .03, .034), vec3(.05, .05, .056), tile) * (1. - puddle * .5);
    float inside = smoothstep(CZ0_ - .3, CZ0_ + .4, vW.z);
    float lamps = 0.;
    for (int i = 0; i < 4; i++) { vec3 d = vec3(vW.x, 3.1, vW.z - (7. - float(i) * 2.6)); lamps += 3. / (1. + dot(d, d)); }
    vec3 lightC = mix(vec3(2.4, 2.25, 2.), vec3(.25) + vec3(1., .88, .72) * lamps, inside);
    float F = .04 + .96 * pow(1. - max(V.y, 0.), 5.);
    float spec = mix(.3, 1., F) * mix(.55, 1., puddle) * (1. - .45 * r);
    vec3 col = alb * lightC + refl * spec;
    gl_FragColor = vec4(acesTone(col * exposure), 1.);
  }
  #include <colorspace_fragment>
}`.replace(/CZ0_/g,j.toFixed(1)),Ee=`
uniform sampler2D t; uniform float dim; uniform float exposure; varying vec2 vUv;
${ee}
void main(){
  vec3 c = acesTone(texture(t, vUv).rgb * exposure);
  if (dim > .5) c = vec3(dot(c, vec3(.3, .59, .11)) * .3);
  gl_FragColor = vec4(c, 1.);
  #include <colorspace_fragment>
}`;function Oe(){const t=document.createElement("canvas");t.width=512,t.height=96;const e=t.getContext("2d");e.fillStyle="#1a0614",e.fillRect(0,0,512,96),e.strokeStyle="#ff3fd0",e.lineWidth=8,e.strokeRect(8,8,496,80),e.font="bold 60px sans-serif",e.textAlign="center",e.textBaseline="middle",e.shadowColor="#ff3fd0",e.shadowBlur=16,e.fillStyle="#ffe0f6",e.fillText("OPEN 24H",256,50);const o=new Fe(t);return o.colorSpace=_e,o}function Ze(t){const e=(a,n=0,u=.8)=>new We({color:a,roughness:u,emissive:a,emissiveIntensity:n}),o=(a,n,u,_,P,$,w)=>{const k=new W(new ze(a,n,u),w);return k.position.set(_,P,$),t.add(k),k};t.add(new Re(12571903,3813416,.9));const p=new Ce(16773336,2.2);p.position.copy(xe).multiplyScalar(20),t.add(p);for(const a of[6.5,2]){const n=new ke(16769720,6,0,2);n.position.set(0,2.9,a),t.add(n)}const s=e(9078658,0,.9),x=e(10787468,0,.9),v=(j+H)/2,R=H-j;o(6.8,6,R,-b-3.4,3,v,s),o(6.8,6,R,b+3.4,3,v,s),o(b*2,6-T,R,0,(6+T)/2,v,e(7105126,0,.9)),o(b*2,T,.5,0,T/2,H+.25,e(5919824,0,.9)),o(.5,4.5,15,-9.25,2.25,-8.5,x),o(.5,4.5,15,9.25,2.25,-8.5,x),o(19,10,1,0,5,-16.5,e(10129280,0,.9));const O=new E({color:new A().setRGB(2.6,2.1,1.3)}),Z=new q(1.1,1.3);for(let a=0;a<3;a++)for(let n=0;n<6;n++){if((a*7+n*3)%5===0)continue;const u=new W(Z,O);u.position.set(-6.5+n*2.6,1.6+a*2.6,-15.98),t.add(u)}const S=(a,n,u)=>o(.06,1.3,1.6,n,1.45,u,e(a,1.6,.6));S(16728128,-b+.03,5.6),S(16760880,-b+.03,1.2),S(3832831,b-.03,6.6),S(3203184,b-.03,2.4);const Q=new E({color:new A().setRGB(4,3.6,3)});for(let a=0;a<4;a++)o(.3,.04,1.3,0,T-.03,7-a*2.6,Q);const z=Oe(),B=new E({map:z,color:new A().setRGB(3.2,3.2,3.2)}),m=new E({color:new A().setRGB(1.6,.2,1.2)});o(2.6,.42,.06,0,2.92,3,[m,m,m,m,B,B]);const C=new Y(1,32,16),f=(a,n,u,_,P,$=1)=>{const w=new W(a,n);return w.position.set(u,_,P),w.scale.setScalar($),t.add(w),w};f(C,e(16726843,.25,.35),-1.25,.45,1,.45),o(.8,.8,.8,1.3,.4,0,e(16765499,.2,.5)).rotation.y=.5,f(new Me(.5,.5,2,24),e(3133546,.2,.5),-3.2,1,-6),o(1,3,1,3.6,1.5,-8,e(4029439,.25,.5)),f(C,e(15095295,.25,.35),.9,.8,-11,.8);const h=f(C,e(16747038,.6,.3),0,.35,4.6,.35),F=o(.7,.7,.7,-1,.35,-4,e(2286591,.6,.3)),g=new W(new q(19,27),e(2105894,0,.9));return g.rotation.x=-Math.PI/2,g.position.set(0,0,-3.5),g.visible=!1,t.add(g),{dyn:[h,F],captureFloor:g,tick(a){const n=a/1e3;h.position.x=Math.sin(n*.9)*1.5,h.position.y=.35+Math.abs(Math.sin(n*2.6))*.12,F.position.x=-1+Math.sin(n*.6)*3,F.rotation.y=n},dispose(){z.dispose()}}}const G=64,I=40,Ae=1920*1080,fe=6e-8,d=t=>`${Math.round(t*100)}%`;function He(t,e){const o=Ae*e.floor,p=t==="probe"?0:o*e.steps*fe,s=t==="ssr"?0:o*(1-e.ssr)*3*fe;return{ssr:p,fb:s,total:p+s}}function Ve(t,e,o,p){if(!o)return"측정 중…";const s=He(e,o),x=`추정 ${s.total.toFixed(1)} ms`;if(t==="map"){const v=[`SSR(초록) ${d(o.ssr)}`];return e!=="ssr"?v.push(`프로브(파랑) ${d(o.probe)}`,`하늘(회색) ${d(o.sky)}`):v.push(`없음(검정) ${d(o.none)}`),`${v.join(" · ")}
기준: ${e==="stack"?"전체 계층":e==="ssr"?"SSR만":"프로브만"} · 평균 ${o.steps.toFixed(0)}스텝/픽셀 · ${x}`}return e==="ssr"?`SSR 성공 ${d(o.ssr)} · 반사 없음 ${d(o.none)}
평균 ${o.steps.toFixed(0)}스텝/픽셀 (실패해도 비용 지불) · ${x}`:e==="probe"?`로컬 프로브 ${d(o.probe)} · 하늘 ${d(o.sky)} · 박스 투영 ${p?"켬":"끔"}
${x} · 동적 물체(주황 공·하늘색 상자) 반사 없음`:`SSR ${d(o.ssr)} · 프로브 ${d(o.probe)} · 하늘 ${d(o.sky)}
${x} (SSR ${s.ssr.toFixed(1)} + 폴백 ${s.fb.toFixed(2)}) · 평균 ${o.steps.toFixed(0)}스텝`}function Qe(t,e){return $e(t,{antialias:!1,cam:[0,me,K],target:[0,0,K-4],fov:62,near:.05,far:90},({scene:o,camera:p,renderer:s,controls:x})=>{const v=Ze(o),R=new U,O=new N({uniforms:{sunDir:{value:xe}},vertexShader:Be,fragmentShader:De,side:he,depthWrite:!1});R.add(new W(new Y(40,32,16),O));const Z={type:ie,generateMipmaps:!0,minFilter:re},S=new ne(128,Z),Q=new le(.1,100,S),z=new ne(128,Z),B=new le(.05,60,z);B.position.copy(X),s.autoClear=!0,Q.update(s,R),o.background=S.texture,v.dyn.forEach(r=>r.visible=!1),v.captureFloor.visible=!0,B.update(s,o),v.captureFloor.visible=!1,v.dyn.forEach(r=>r.visible=!0),s.autoClear=!1;const m=new ce(1,1,{type:ie,depthTexture:new ge(1,1),generateMipmaps:!0,minFilter:re}),C=new ce(G,I),f=new Uint8Array(G*I*4),h=new de(1,1),F=()=>e==="map"?t.params.str("mapMode","stack")??"stack":e,g=new N({uniforms:{tColor:{value:m.texture},tDepth:{value:m.depthTexture},skyCube:{value:S.texture},probeCube:{value:z.texture},proj:{value:new pe},projInv:{value:new pe},res:{value:h},mode:{value:2},viz:{value:e==="map"?1:0},rough:{value:.15},edgeW:{value:.1},boxProj:{value:1},probeP:{value:X},bmin:{value:ue},bmax:{value:ve},inflZ:{value:je},exposure:{value:1}},vertexShader:Ge,fragmentShader:Ie,depthTest:!1,depthWrite:!1}),a=new U,n=new W(new q(19,27),g);n.rotation.x=-Math.PI/2,n.position.set(0,0,-3.5),a.add(n);const u=new U;if(e==="map"){const r=new we(new ye(ue.clone(),ve.clone()),8038655);u.add(r);const l=new W(new Y(.12,12,6),new E({color:10274047,wireframe:!0}));l.position.copy(X),u.add(l)}const _=new N({uniforms:{t:{value:m.texture},dim:{value:e==="map"?1:0},exposure:{value:1}},vertexShader:Le,fragmentShader:Ee}),P=new Pe(_),$=r=>{const l=K-r;p.position.set(0,me,l),x.target.set(0,0,l-4),x.update()},w=t.params.on(r=>{r==="camGo"&&$(t.params.num("camGo",0))});let k=null,be=Math.floor(Math.random()*12);const Se=()=>{const r=g.uniforms,l=h.clone();h.set(G,I),r.viz.value=2,s.setRenderTarget(C),s.setClearColor(0,0),s.clear(),s.render(a,p),s.readRenderTargetPixels(C,0,0,G,I,f),s.setClearColor(0,1),h.copy(l),r.viz.value=e==="map"?1:0;let i=0,c=0,y=0,M=0,D=0;for(let L=0;L<f.length;L+=4){const ae=f[L+3];ae!==0&&(i++,c+=f[L]/255,y+=f[L+1]/255,M+=f[L+2]/255,D+=Math.max(0,ae/255*(J+1)-1))}if(!i){k={floor:0,ssr:0,probe:0,sky:0,none:0,steps:0};return}const oe=c/i,te=y/i,se=M/i;k={floor:i/(G*I),ssr:oe,probe:te,sky:se,none:Math.max(0,1-oe-te-se),steps:D/i}};return{update(r,l,i){v.tick(i),t.params.bool("camAuto")&&$(7.5-7.5*Math.cos(i*35e-5));const c=g.uniforms;c.mode.value=Te[F()],c.rough.value=t.params.num("rough",.15),c.edgeW.value=t.params.num("edge",.1),c.boxProj.value=t.params.bool("boxProj",!0)?1:0,p.updateMatrixWorld(),c.proj.value.copy(p.projectionMatrix),c.projInv.value.copy(p.projectionMatrixInverse),t.hud(Ve(e,F(),k,t.params.bool("boxProj",!0)))},render(){s.setRenderTarget(m),s.clear(),s.render(o,p),s.setRenderTarget(null),s.clear(),P.render(s),s.render(a,p),e==="map"&&s.render(u,p),be++%12===0&&Se()},resize(r,l,i){const c=Math.floor(r*i),y=Math.floor(l*i);m.setSize(c,y),h.set(c,y)},dispose(){w(),v.dispose(),m.dispose(),C.dispose(),S.dispose(),z.dispose(),P.dispose(),_.dispose(),O.dispose(),[a,u].forEach(r=>r.traverse(l=>{var c,y,M,D;const i=l;(y=(c=i.geometry)==null?void 0:c.dispose)==null||y.call(c),(D=(M=i.material)==null?void 0:M.dispose)==null||D.call(M)})),R.traverse(r=>{var l,i;return(i=(l=r.geometry)==null?void 0:l.dispose)==null?void 0:i.call(l)})}}})}const Ue=[{vm:"ssr",title:"① SSR만",kind:"before",caption:"화면에 보이는 것만 반사한다. 바닥 아래쪽은 반사 광선이 화면 위로 빠져나가 검게 비고, 카메라 위쪽 화면 밖의 네온 간판은 어디에도 비치지 않는다. 대신 굴러다니는 주황 공 반사는 정확하다."},{vm:"probe",title:"② 프로브만 (로컬 + 하늘)",kind:"variant",caption:"복도 중앙에서 미리 찍은 큐브맵과 하늘 큐브맵. 빈 곳은 없지만 동적 물체는 비치지 않고, 박스 투영을 끄면 간판·조명 반사가 엉뚱한 위치에서 미끄러진다."},{vm:"stack",title:"③ 전체 계층 (SSR → 프로브 → 하늘)",kind:"after",caption:"SSR 신뢰도가 높은 곳은 SSR, 낮아지는 만큼 박스 투영 로컬 프로브, 프로브 영향 범위 밖(안뜰)은 하늘. 화면 가장자리와 거친 바닥에서 부드럽게 넘어간다."},{vm:"map",title:"소스 맵 (초록 SSR · 파랑 프로브 · 회색 하늘)",kind:"info",caption:"바닥 픽셀마다 어떤 반사 소스를 얼마나 썼는지 색으로 섞어 표시. 중간색 띠가 블렌딩 구간이다. 파란 상자 선 = 박스 투영 상자, 작은 구 = 프로브 캡처 위치."}],qe={layout:"compare",intro:"젖은 바닥 하나에도 반사 기법 하나로는 부족합니다. <b>SSR</b>은 정확하지만 화면에 있는 것만, <b>로컬 반사 프로브</b>는 어디서나 값을 주지만 미리 찍은 정적 장면만, <b>하늘 큐브맵</b>은 늘 있지만 주변 건물이 없습니다. 그래서 엔진은 픽셀마다 <b>SSR → 박스 투영 로컬 프로브 → 하늘</b> 순서로 시도하고, 앞 단계의 <b>신뢰도</b>가 모자란 만큼만 다음 단계로 채웁니다. 카메라를 복도에서 안뜰로 움직이며 각 소스가 맡는 영역이 바뀌는 것을 보세요.",how:["하늘(전역) 큐브맵과 로컬 프로브 큐브맵을 미리 캡처한다. 로컬 프로브는 복도 상자를 박스 투영 볼륨으로 지정하고 거칠기용 밉을 만든다.","장면(반사면 제외)을 색 + 깊이로 렌더링한 뒤, 반사 픽셀마다 SSR 광선을 깊이 버퍼 위로 걷는다.","SSR 신뢰도 = 교차 성공 × 화면 가장자리 페이드 × 카메라 방향 페이드 × 거칠기 페이드. 거칠기가 SSR 한계를 넘으면 광선을 아예 쏘지 않는다.","남은 비중(1 − SSR)은 픽셀이 들어 있는 프로브 영향 범위 가중치만큼 박스 투영 프로브로 채운다.","그래도 남은 비중은 하늘 큐브맵으로 채우고, 셋을 더해 프레넬을 곱해 바닥에 얹는다."],pros:["어느 픽셀도 반사가 비지 않음 (항상 하늘이 마지막 안전망)","가까운 동적 물체는 SSR로 정확, 화면 밖은 프로브로 그럴듯하게","거친 표면은 싼 프로브만 써서 비용 절약"],cons:["소스마다 밝기·위치가 달라 경계가 보일 수 있음 (블렌딩 폭 조절 필요)","프로브 배치·상자 크기·영향 범위를 레벨마다 손으로 맞춰야 함","SSR 비용은 실패한 픽셀에도 지불됨"],usedIn:"UE의 반사 환경(SSR + Sphere/Box Reflection Capture + Sky Light), Unity HDRP의 반사 계층(SSR 또는 레이 트레이싱 → 반사 프로브 → 하늘). UE5 Lumen 반사도 화면 추적을 먼저 시도한다.",controls:[{type:"range",key:"rough",label:"거칠기",min:0,max:1,step:.01,value:.15},{type:"select",key:"mapMode",label:"소스 맵 기준",options:[{label:"전체 계층",value:"stack"},{label:"SSR만",value:"ssr"},{label:"프로브만",value:"probe"}],value:"stack"},{type:"range",key:"edge",label:"가장자리 페이드 폭",min:0,max:.3,step:.01,value:.1},{type:"toggle",key:"boxProj",label:"박스 투영",value:!0},{type:"range",key:"camGo",label:"카메라 위치 (복도 → 안뜰)",min:0,max:15,step:.1,value:0},{type:"toggle",key:"camAuto",label:"카메라 자동 이동",value:!1}],viewers:Ue.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:e=>Qe(e,t.vm)}))};export{qe as default};
