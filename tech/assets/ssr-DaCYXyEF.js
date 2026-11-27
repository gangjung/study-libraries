import{P as z,b as d,r as x,aN as D,s as y,u as b,aB as c,p as C,H as P,D as j,M as f,B as k,S as T}from"./three.module-BZgG6AUv.js";import{F as g}from"./Pass-By1_TgQk.js";import{R as W}from"./Reflector-Dg3XDv-L.js";import{m as F}from"./three-viewer-0rZIEDzf.js";import{Q as S,O as I}from"./glsl-DOwCk4-f.js";const Q=`
uniform sampler2D tColor; uniform sampler2D tDepth;
uniform mat4 proj; uniform mat4 projInv; uniform mat4 camWorld; uniform mat4 view;
uniform float steps; uniform float thick; uniform float fade; uniform float mode; uniform float refl;
varying vec2 vUv;
vec3 viewPos(vec2 uv){ float d = texture2D(tDepth, uv).x; vec4 p = projInv * vec4(uv * 2. - 1., d * 2. - 1., 1.); return p.xyz / p.w; }
void main(){
  vec3 base = texture2D(tColor, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  vec3 P = viewPos(vUv);
  vec3 W = (camWorld * vec4(P, 1.)).xyz;
  // 반사 바닥 픽셀만 (월드 y ≈ 0)
  if (d >= 1. || abs(W.y) > .005 || mode < .5) { gl_FragColor = vec4(base, 1.); return; }
  vec3 N = normalize((view * vec4(0., 1., 0., 0.)).xyz);
  vec3 R = normalize(reflect(normalize(P), N));
  vec3 hitCol = vec3(0.); float hit = 0.;
  vec3 Q = P; float stepLen = .06;
  vec2 huv = vec2(0.);
  for (int i = 0; i < 128; i++) {
    if (float(i) >= steps) break;
    Q += R * stepLen; stepLen *= 1.04;
    vec4 c = proj * vec4(Q, 1.);
    vec2 uv = c.xy / c.w * .5 + .5;
    if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) break;
    float sz = viewPos(uv).z;
    float diff = sz - Q.z; // 양수면 광선이 표면 뒤로 들어감
    if (diff > 0. && diff < thick) {
      // 이분 탐색으로 교차점 다듬기
      vec3 a = Q - R * stepLen / 1.04, b = Q;
      for (int k = 0; k < 6; k++) { vec3 m = (a + b) * .5; vec4 cm = proj * vec4(m, 1.); vec2 um = cm.xy / cm.w * .5 + .5; if (viewPos(um).z - m.z > 0.) b = m; else a = m; }
      vec4 cb = proj * vec4(b, 1.); huv = cb.xy / cb.w * .5 + .5;
      hitCol = texture2D(tColor, huv).rgb; hit = 1.; break;
    }
  }
  float w = hit;
  if (fade > .5 && hit > .5) {
    // 화면 가장자리와 카메라 쪽으로 향하는 광선은 서서히 사라지게
    // smoothstep(e0, e1)는 e0 < e1이어야 정의됨 → 뒤집힌 페이드는 1 − smoothstep으로
    vec2 e = smoothstep(0., .12, huv) * (1. - smoothstep(.88, 1., huv));
    w *= e.x * e.y * (1. - smoothstep(.6, 1., R.z));
  }
  if (mode > 2.5) { gl_FragColor = vec4(mix(vec3(.6, .1, .1), vec3(.1, .9, .3), w), 1.); return; }
  gl_FragColor = vec4(mix(base, mix(base, hitCol, refl), w), 1.);
}`;function R(e,o){e.background=new C(1053466),e.add(new P(14542591,3156e3,1.4));const u=new j(16777215,2);if(u.position.set(3,6,4),e.add(u),o){const r=new f(new z(14,14),o);r.rotation.x=-Math.PI/2,e.add(r)}const l=[16734810,16761165,4906624,6003967,15101183],n=[];l.forEach((r,a)=>{const s=a%2?new k(.8,1.6,.8):new T(.55,32,16),v=new f(s,new d({color:r,roughness:.4,emissive:r,emissiveIntensity:.15}));v.position.set(-3+a*1.5,a%2?.8:.55,-1.5+a%3*.8),e.add(v),n.push(v)});const p=new f(new k(6,3,.3),new d({color:8425632,roughness:.8}));return p.position.set(0,1.5,-4),e.add(p),r=>n.forEach((a,s)=>a.position.y=(s%2?.8:.55)+Math.abs(Math.sin(r*1.2+s))*.6)}function _(e,o){return F(e,{antialias:!1,cam:[0,1.6,6],target:[0,.6,-1]},({scene:u,camera:l,renderer:n})=>{if(o==="planar"){const m=R(u,null),i=new W(new z(14,14),{color:7829367,textureWidth:1024,textureHeight:1024});return i.rotation.x=-Math.PI/2,u.add(i),{update:(t,M)=>{m(M),e.hud("뒤집힌 카메라로 장면을 한 번 더 렌더 (정답)")},dispose:()=>i.dispose()}}const r=R(u,new d({color:3159100,roughness:.6}));if(o==="none")return{update:(m,i)=>(r(i),e.hud("반사 없음"))};const a=new x(1,1,{type:y,depthTexture:new D(1,1)}),s=new x(1,1,{type:y}),v=new b({uniforms:{tColor:{value:a.texture},tDepth:{value:a.depthTexture},proj:{value:new c},projInv:{value:new c},camWorld:{value:new c},view:{value:new c},steps:{value:64},thick:{value:.3},fade:{value:o==="fade"||o==="mask"?1:0},mode:{value:o==="mask"?3:1},refl:{value:.7}},vertexShader:S,fragmentShader:Q}),h=new g(v),w=new g(new b({uniforms:{t:{value:s.texture}},vertexShader:S,fragmentShader:I}));return{update(m,i){r(i);const t=v.uniforms;t.steps.value=e.params.num("steps",64),t.thick.value=e.params.num("thick",.3),t.refl.value=e.params.num("refl",.7),l.updateMatrixWorld(),t.proj.value.copy(l.projectionMatrix),t.projInv.value.copy(l.projectionMatrixInverse),t.camWorld.value.copy(l.matrixWorld),t.view.value.copy(l.matrixWorldInverse),e.hud(o==="mask"?"초록 = 화면에서 교차점을 찾음 · 빨강 = 실패":`레이마칭 ${t.steps.value}스텝 · 두께 ${t.thick.value}${o==="fade"?" · 가장자리 페이드":""}`)},render(){n.setRenderTarget(a),n.render(u,l),n.setRenderTarget(s),h.render(n),n.setRenderTarget(null),w.render(n)},resize(m,i,t){a.setSize(Math.floor(m*t),Math.floor(i*t)),s.setSize(Math.floor(m*t),Math.floor(i*t))},dispose(){a.dispose(),s.dispose(),h.dispose(),w.dispose(),v.dispose()}}})}const L=[{mode:"none",title:"반사 없음",kind:"before",caption:"광택 있는 바닥인데 아무것도 비치지 않아 물체가 떠 보인다."},{mode:"raw",title:"SSR (가공 없음)",kind:"variant",caption:"화면에 보이는 것만 반사할 수 있다. 카메라를 내려 물체 윗부분이 화면 밖으로 나가면 반사가 뚝 잘린다. 물체 뒤쪽(화면에 없는 면)도 비치지 않는다."},{mode:"fade",title:"SSR + 가장자리 페이드",kind:"after",caption:"실패 영역 근처를 부드럽게 사라지게 해 잘린 경계를 숨긴다. 실제 게임은 여기에 반사 프로브를 폴백으로 깐다."},{mode:"mask",title:"교차 성공 마스크",kind:"info",caption:"바닥 픽셀 중 반사 광선이 화면 안에서 물체에 닿은 곳(초록). 화면 아래쪽 반사일수록 위쪽 화면 정보가 필요하다."},{mode:"planar",title:"정답: 평면 반사",kind:"info",caption:"거울 카메라로 장면을 다시 그린 결과. 화면 밖 물체와 뒷면까지 정확하지만, 평면 하나당 장면을 한 번 더 그린다."}],E={layout:"variants",intro:"이미 렌더링된 화면의 <b>색과 깊이 버퍼</b>만으로 반사를 만듭니다. 각 픽셀에서 반사 방향으로 광선을 쏘아 깊이 버퍼를 따라 걸어가다(레이마칭) 표면과 만나는 지점의 색을 가져옵니다. 추가 렌더링 없이 모든 표면에 반사를 주지만 <b>화면에 없는 것은 반사할 수 없습니다</b>. 카메라를 위아래로 움직여 한계를 확인해 보세요.",how:["장면을 색 + 깊이(+법선) 버퍼로 렌더링한다.","반사 픽셀마다 뷰 공간 위치와 법선으로 반사 벡터 R을 구한다.","R 방향으로 조금씩 전진하며 각 점을 화면에 투영해 깊이 버퍼와 비교. 광선이 표면 뒤로 들어간(두께 이내) 첫 지점이 교차점.","이분 탐색으로 교차점을 다듬고, 그 화면 좌표의 색을 반사색으로 쓴다.","화면 가장자리·카메라 방향 광선은 페이드하고, 실패한 곳은 반사 프로브/큐브맵으로 채운다. 거친 표면은 광선을 지터링하고 디노이즈한다."],pros:["장면 복잡도와 무관한 비용, 모든 형태의 표면에 적용","동적 물체 반사가 자동으로 맞음","접촉부 반사가 정확해 접지감이 좋음"],cons:["화면 밖·가려진 물체는 반사 불가 (가장 큰 한계)","얇은 물체에서 두께 추정 오류","노이즈·깜빡임 → TAA와 디노이즈 필수"],usedIn:"Crysis 2(2011), Killzone Shadow Fall(2013) 무렵부터 AAA에 널리 퍼짐. Frostbite 확률적 SSR(2015), UE의 SSR과 Lumen 화면 트레이스, Unity HDRP. 레이 트레이싱 반사와도 함께 쓰인다.",controls:[{type:"range",key:"steps",label:"레이마칭 스텝",min:8,max:128,step:4,value:64},{type:"range",key:"thick",label:"두께 허용치",min:.05,max:2,step:.05,value:.3},{type:"range",key:"refl",label:"반사 세기",min:0,max:1,step:.05,value:.7}],viewers:L.map(e=>({title:e.title,kind:e.kind,caption:e.caption,mount:o=>_(o,e.mode)}))};export{E as default};
