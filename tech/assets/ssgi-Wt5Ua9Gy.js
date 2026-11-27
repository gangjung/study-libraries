import{r as x,aN as C,s as R,z as U,w as j,u as M,aB as I,k as N,p as F,D as _,P as T,B as h,S as O,M as P,b as A}from"./three.module-BZgG6AUv.js";import{F as k}from"./Pass-By1_TgQk.js";import{m as B}from"./three-viewer-0rZIEDzf.js";import{Q as G}from"./glsl-DOwCk4-f.js";const Q=`
uniform sampler2D tColor; uniform sampler2D tDepth; uniform sampler2D tNormal;
uniform mat4 proj; uniform mat4 projInv; uniform float radius; uniform float samples; uniform float frame;
varying vec2 vUv;
vec3 vpos(vec2 uv){ float d = texture2D(tDepth, uv).x; vec4 p = projInv * vec4(uv * 2. - 1., d * 2. - 1., 1.); return p.xyz / p.w; }
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main(){
  if (texture2D(tDepth, vUv).x >= 1.) { gl_FragColor = vec4(0.); return; }
  vec3 P = vpos(vUv);
  vec3 N = normalize(texture2D(tNormal, vUv).xyz * 2. - 1.);
  vec3 T = normalize(cross(abs(N.y) < .9 ? vec3(0, 1, 0) : vec3(1, 0, 0), N)), B = cross(N, T);
  vec3 acc = vec3(0.);
  for (int s = 0; s < 32; s++){
    if (float(s) >= samples) break;
    float r1 = h12(gl_FragCoord.xy + float(s) * 7.31 + frame * .37), r2 = h12(gl_FragCoord.yx * 1.37 + float(s) * 3.17 + frame * .71);
    float ph = 6.2831853 * r1, sr = sqrt(r2);
    vec3 dir = T * cos(ph) * sr + B * sin(ph) * sr + N * sqrt(1. - r2);
    for (int k = 1; k <= 8; k++){
      vec3 Q = P + dir * radius * (float(k) / 8.) * (float(k) / 8.);
      vec4 c = proj * vec4(Q, 1.);
      vec2 uv = c.xy / c.w * .5 + .5;
      if (uv.x < 0. || uv.y < 0. || uv.x > 1. || uv.y > 1.) break;
      float diff = vpos(uv).z - Q.z;
      if (diff > .01 && diff < radius) {
        // 맞은 표면이 이쪽을 향할 때만 빛을 보냄
        vec3 hn = normalize(texture2D(tNormal, uv).xyz * 2. - 1.);
        if (dot(hn, -dir) > 0.) acc += texture2D(tColor, uv).rgb;
        break;
      }
    }
  }
  gl_FragColor = vec4(acc / samples, 1.);
}`,E=`
uniform sampler2D tColor; uniform sampler2D tGI; uniform sampler2D tAlbedo; uniform sampler2D tDepth; uniform float mode; uniform float strength; uniform vec2 texel;
varying vec2 vUv;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){
  vec3 direct = texture2D(tColor, vUv).rgb;
  // 노이즈를 줄이는 깊이 인식 블러 (5×5)
  float d0 = texture2D(tDepth, vUv).x;
  vec3 gi = vec3(0.); float ws = 0.;
  for (int y = -2; y <= 2; y++) for (int x = -2; x <= 2; x++){
    vec2 uv = vUv + vec2(x, y) * texel * 2.;
    float w = exp(-abs(texture2D(tDepth, uv).x - d0) * 3000.);
    gi += texture2D(tGI, uv).rgb * w; ws += w;
  }
  gi /= max(ws, 1e-4);
  vec3 alb = texture2D(tAlbedo, vUv).rgb;
  vec3 indirect = gi * alb * strength;
  vec3 c = mode < .5 ? direct : mode < 1.5 ? indirect * 2. : mode < 2.5 ? direct + indirect : alb * .25 + direct;
  gl_FragColor = vec4(aces(c), 1.);
  #include <colorspace_fragment>
}`;function L(t){t.background=new F(0);const a=new _(16773341,4);a.position.set(1.5,4,3),a.castShadow=!0,a.shadow.mapSize.set(1024,1024),Object.assign(a.shadow.camera,{left:-4,right:4,top:4,bottom:-4}),t.add(a);const i=e=>new A({color:e,roughness:1}),r=(e,g,c,l=[0,0,0])=>{const o=new P(e,i(g));return o.position.set(...c),o.rotation.set(...l),o.castShadow=o.receiveShadow=!0,t.add(o),o};return r(new T(6,6),14540253,[0,0,0],[-Math.PI/2,0,0]),r(new T(6,3),14540253,[0,1.5,-3]),r(new h(.1,3,6),16722458,[-3,1.5,0]),r(new h(.1,3,6),2154560,[3,1.5,0]),r(new h(1,1.8,1),15658734,[-1.2,.9,-1.2],[0,.4,0]),r(new h(1,1,1),16764992,[1.1,.5,.2],[0,-.3,0]),r(new O(.45,32,16),15658734,[0,.45,1.2])}function H(t,a){return B(t,{antialias:!1,cam:[0,2.4,5.6],target:[0,1,0]},({scene:i,camera:r,renderer:e})=>{e.shadowMap.enabled=!0;const g=L(i),c={type:R},l=new x(1,1,{...c,depthTexture:new C(1,1)}),o=new x(1,1,c),p=new x(1,1,c),f=new x(1,1,c),y=new U,w=new Map;i.traverse(s=>{const n=s;n.isMesh&&w.set(n,new j({color:n.material.color}))});const b=new k(new M({uniforms:{tColor:{value:l.texture},tDepth:{value:l.depthTexture},tNormal:{value:o.texture},proj:{value:new I},projInv:{value:new I},radius:{value:2},samples:{value:12},frame:{value:0}},vertexShader:G,fragmentShader:Q})),S=new k(new M({uniforms:{tColor:{value:l.texture},tGI:{value:f.texture},tAlbedo:{value:p.texture},tDepth:{value:l.depthTexture},mode:{value:["direct","buffer","combined","albedoOnly"].indexOf(a)},strength:{value:1.5},texel:{value:new N}},vertexShader:G,fragmentShader:E})),v=b.material.uniforms,D=S.material.uniforms;let z=0;return{update(s,n){g.position.x=Math.sin(n*.6)*2,r.updateMatrixWorld(),v.proj.value.copy(r.projectionMatrix),v.projInv.value.copy(r.projectionMatrixInverse),v.radius.value=t.params.num("radius",2),v.samples.value=t.params.num("samples",12),v.frame.value=z++%64,D.strength.value=t.params.num("strength",1.5),t.hud(a==="direct"?"직접광 + 그림자만 (앰비언트 0)":a==="buffer"?`간접광 버퍼 · ${v.samples.value}광선/픽셀`:a==="combined"?"직접광 + SSGI 1회 반사":"비교: 균일한 앰비언트 0.25")},render(){e.setRenderTarget(l),e.render(i,r),a!=="direct"&&a!=="albedoOnly"&&(i.overrideMaterial=y,e.setRenderTarget(o),e.render(i,r),i.overrideMaterial=null,e.setRenderTarget(f),b.render(e));const s=new Map;w.forEach((n,u)=>{s.set(u,u.material),u.material=n}),e.setRenderTarget(p),e.render(i,r),s.forEach((n,u)=>u.material=n),e.setRenderTarget(null),S.render(e)},resize(s,n,u){const d=Math.floor(s*u),m=Math.floor(n*u);l.setSize(d,m),o.setSize(d,m),p.setSize(d,m),f.setSize(Math.floor(d/2),Math.floor(m/2)),D.texel.value.set(1/d,1/m)},dispose(){[l,o,p,f].forEach(s=>s.dispose()),y.dispose(),w.forEach(s=>s.dispose()),b.dispose(),S.dispose()}}})}const V=[{mode:"direct",title:"직접광만",kind:"before",caption:"햇빛이 닿지 않는 그늘은 완전히 검다. 실제 방이라면 빨강·초록 벽과 바닥에서 반사된 빛이 그늘을 채운다."},{mode:"albedoOnly",title:"균일 앰비언트",kind:"variant",caption:"그늘을 밝히는 가장 흔한 꼼수. 어디나 같은 밝기라 형태가 평평하고 벽 색이 번지지 않는다."},{mode:"buffer",title:"SSGI 간접광 버퍼",kind:"info",caption:"각 픽셀에서 반구로 광선을 쏴 화면의 직접광 색을 모은 결과. 빨간 벽 옆 바닥은 붉게, 초록 벽 옆은 녹색으로 물든다."},{mode:"combined",title:"직접광 + SSGI",kind:"after",caption:"흰 상자와 공의 그늘진 면에 벽 색이 번진다. 카메라를 돌려 빨간 벽을 화면 밖으로 보내면 붉은 반사광도 함께 사라진다 — 화면 공간의 한계."}],K={layout:"compare",intro:'빛은 벽과 바닥에서 튕겨 다른 물체를 다시 비춥니다(간접광, GI). SSGI는 이미 그려진 <b>화면의 색·깊이·법선</b>만으로 이 한 번의 반사를 근사합니다. 픽셀마다 반구 방향으로 광선을 쏴 화면 안의 다른 표면과 만나면, 그 표면의 밝기를 간접광으로 가져옵니다. SSAO가 "얼마나 가려졌나"를 본다면 SSGI는 "가린 것이 무슨 색인가"까지 봅니다.',how:["직접광 색, 깊이, 법선 버퍼를 렌더링한다.","각 픽셀의 법선 반구에서 코사인 가중 방향 몇 개를 고른다 (프레임마다 다르게).","방향마다 깊이 버퍼를 따라 레이마칭해 교차점을 찾고, 그 지점의 직접광 색을 누적한다.","절반 해상도로 계산 후 깊이 인식 블러 + 시간 누적으로 노이즈를 지운다.","최종 = 직접광 + 간접광 × 알베도. 이전 프레임 결과를 다시 입력으로 쓰면 다중 반사도 흉내 낼 수 있다."],pros:["동적 조명·동적 물체의 색 번짐을 사전 계산 없이","장면 복잡도와 무관한 비용","SSAO의 자연스러운 상위 호환"],cons:["화면 밖·가려진 표면의 빛은 반영 불가","노이즈가 많아 시간 누적·디노이즈 필수","큰 반경은 비싸고 불안정 → 프로브/RTGI와 혼합"],usedIn:"UE5 Lumen의 화면 공간 단계, Unity HDRP SSGI, Godot 4 SSIL. 대개 프로브·라이트맵 GI 위에 근거리 보강용으로 얹음.",controls:[{type:"range",key:"radius",label:"광선 길이",min:.3,max:5,step:.1,value:2},{type:"range",key:"samples",label:"픽셀당 광선",min:2,max:32,step:1,value:12},{type:"range",key:"strength",label:"간접광 세기",min:0,max:4,step:.1,value:1.5}],viewers:V.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:a=>H(a,t.mode)}))};export{K as default};
