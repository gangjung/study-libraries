import{H as ae,D as oe,M as v,P as I,w as re,ao as le,C as se,b as z,p as ne,S as j,u as N,g as ie,aB as ue,k as Q,B as ce,aN as H,az as fe,o as de,a2 as pe,m as ve,ae as he,n as me,a_ as ge,r as xe,L as be,N as q,aG as Me,s as ke}from"./three.module-BZgG6AUv.js";import{m as we}from"./three-viewer-0rZIEDzf.js";import{c as ye}from"./postscene-jOAKHM8g.js";import{F as Se,W as E}from"./shade-CcOaBxDj.js";import{Q as Fe}from"./glsl-DOwCk4-f.js";const x={teal:[.35,.95,.8],amber:[1,.62,.22],clear:[.92,.96,1]},Pe=`
${Se}
uniform float uMode; uniform sampler2D uScene; uniform sampler2D uBack; uniform sampler2D uDepth;
uniform vec2 uRes; uniform float uPr; uniform mat4 uVP;
uniform float uIor; uniform float uThick; uniform float uAbsorb; uniform vec3 uTint;
uniform float uRough; uniform float uDisp; uniform float uDepthFix; uniform float uMaxLod;

vec2 suv;           // 이 픽셀의 화면 UV
float fragZ;        // 이 유리 픽셀의 깊이 (0..1)
float rejected;     // 깊이 검사로 비틀기를 포기했는지

// 굴절 광선이 두께만큼 진행한 점을 화면에 투영 → 불투명 장면 복사본에서 읽을 UV
vec2 refractUV(vec3 P, vec3 V, vec3 N, float ior, float thickness){
  vec3 r = refract(-V, N, 1. / ior);
  vec4 c = uVP * vec4(P + r * thickness, 1.);
  vec2 uv = c.xy / c.w * .5 + .5;
  // 깊이 검사: 읽으려는 곳이 유리보다 앞에 있는 물체면 비틀지 않은 UV로 대체
  if (uDepthFix > .5 && texture2D(uDepth, uv).r < fragZ - 1e-5) { uv = suv; rejected = 1.; }
  return clamp(uv, vec2(.001), vec2(.999));
}

vec3 sceneAt(vec2 uv, float lod){
  if (lod < .05) return textureLod(uScene, uv, 0.).rgb;
  // 거친 유리: 흐린 mip 단계 + 회전한 4탭으로 계단 무늬를 부드럽게
  float a = hash12(gl_FragCoord.xy) * 6.283;
  vec2 px = exp2(lod) * .6 / uRes;
  vec3 s = textureLod(uScene, uv, lod).rgb;
  for (int i = 0; i < 4; i++) {
    float t = a + float(i) * 1.5708;
    s += textureLod(uScene, uv + vec2(cos(t), sin(t)) * px, lod).rgb;
  }
  return s / 5.;
}

vec3 hue(float h){ return clamp(abs(fract(h + vec3(0., 2., 1.) / 3.) * 6. - 3.) - 1., 0., 1.); }

void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  suv = gl_FragCoord.xy / uRes;
  fragZ = gl_FragCoord.z;
  rejected = 0.;
  float NdV = clamp(dot(N, V), 0., 1.);
  vec3 L = normalize(vec3(.5, .9, .4));
  float spec = pow(max(dot(reflect(-L, N), V), 0.), 180.) * 3.;

  if (uMode < .5) {
    // 알파 블렌딩만: 뒤를 그대로 비추고 색만 얹음 (빛이 꺾이지 않음)
    vec3 col = uTint * .55 + spec;
    gl_FragColor = vec4(col, .32 + spec * .3);
    #include <colorspace_fragment>
    return;
  }

  // 두께 = 뒷면까지 거리 − 앞면까지 거리 (뒷면 패스에서 구움)
  float front = length(vW - cameraPosition);
  float back = texture2D(uBack, suv).r;
  float th = back > front ? back - front : .05;
  float thickness = th * uThick;

  vec2 uvG = refractUV(vW, V, N, uIor, thickness);

  if (uMode > 2.5) {
    vec2 offPx = (uvG - suv) * uRes;
    float Lp = length(offPx);
    if (uMode < 3.5) {
      // 오프셋 벡터: 색 = 방향, 밝기 = 크기, 화살표 격자
      float cell = 22. * uPr;
      vec2 c = (floor(gl_FragCoord.xy / cell) + .5) * cell;
      vec2 dir = Lp > .01 ? offPx / Lp : vec2(0.);
      float len = min(Lp, cell * .45);
      vec2 a = c - dir * len, b = c + dir * len;
      vec2 pa = gl_FragCoord.xy - a, ba = b - a;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0., 1.);
      float d = length(pa - ba * h);
      float line = 1. - smoothstep(.7 * uPr, 1.5 * uPr, d);
      float head = 1. - smoothstep(1.6 * uPr, 2.4 * uPr, length(gl_FragCoord.xy - b));
      float mag = clamp(Lp / (45. * uPr), 0., 1.);
      vec3 base = hue(atan(dir.y, dir.x) / 6.283) * (.25 + .75 * mag);
      if (rejected > .5) base = vec3(.45) * (.6 + .4 * step(.5, fract((gl_FragCoord.x + gl_FragCoord.y) / (8. * uPr))));
      gl_FragColor = vec4(mix(base, vec3(1.), max(line, head)), 1.);
    } else if (uMode < 4.5) {
      // 두께 히트맵
      float k = clamp(th / 2., 0., 1.);
      gl_FragColor = vec4(mix(vec3(.05, .1, .4), vec3(1., .85, .2), k) * (.4 + .6 * k) + vec3(k * k * .3), 1.);
    } else {
      // 버퍼 보기: 유리는 테두리선만 (복사본에는 유리가 없다는 표시)
      float rim = smoothstep(.35, .05, NdV);
      gl_FragColor = vec4(vec3(1., .9, .4), .1 + rim * .8);
    }
    #include <colorspace_fragment>
    return;
  }

  vec3 refr;
  if (uMode < 1.5) {
    refr = sceneAt(uvG, 0.);
  } else {
    // 거칠기 → mip LOD, 분산 → R/G/B를 서로 다른 굴절률로
    float lod = uRough * uMaxLod;
    vec2 uvR = refractUV(vW, V, N, max(uIor - uDisp, 1.), thickness);
    vec2 uvB = refractUV(vW, V, N, uIor + uDisp, thickness);
    refr = vec3(sceneAt(uvR, lod).r, sceneAt(uvG, lod).g, sceneAt(uvB, lod).b);
  }
  // 비어–램버트 흡수: 두꺼운 곳일수록 유리 색이 짙어짐
  vec3 sigma = (1. - uTint) * .9;
  refr *= exp(-sigma * thickness * uAbsorb);
  // 프레넬 반사 (슐릭 근사, F0는 굴절률에서)
  float f0 = pow((uIor - 1.) / (uIor + 1.), 2.);
  float F = f0 + (1. - f0) * pow(1. - NdV, 5.);
  vec3 refl = skyEnv(reflect(-V, N));
  vec3 col = mix(refr, refl, F) + spec * (1. - uRough * .8);
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,Te=`
varying vec3 vN; varying vec3 vW; varying vec2 vUv;
void main(){ gl_FragColor = vec4(length(vW - cameraPosition), 0., 0., 1.); }`,Re=`
uniform sampler2D uScene; uniform float uDim; varying vec2 vUv;
void main(){ gl_FragColor = vec4(texture2D(uScene, vUv).rgb * uDim, 1.);
  #include <colorspace_fragment>
}`;function De(){const a=document.createElement("canvas");a.width=1024,a.height=512;const e=a.getContext("2d"),t=32;for(let o=0;o<t;o++)e.fillStyle=`hsl(${o/t*360}, 85%, ${o%2?55:45}%)`,e.fillRect(o*a.width/t,0,a.width/t+1,a.height);e.strokeStyle="rgba(10,10,20,.85)",e.lineWidth=3;for(let o=0;o<=t;o++){const h=o*a.width/t;e.beginPath(),e.moveTo(h,0),e.lineTo(h,a.height),e.stroke()}e.strokeStyle="rgba(255,255,255,.7)",e.lineWidth=2;for(let o=0;o<=a.height;o+=32)e.beginPath(),e.moveTo(0,o),e.lineTo(a.width,o),e.stroke();e.fillStyle="#111",e.font='900 92px "Noto Sans KR", sans-serif',e.textAlign="center",e.fillText("GLASS  굴절  REFRACTION",a.width/2,300);const n=new he(a);return n.colorSpace=me,n.anisotropy=4,n}function Ce(){const a=[],e=[[0,0],[.42,0],[.55,.06],[.58,.2],[.58,1.05],[.52,1.25],[.3,1.45],[.2,1.6],[.19,2],[.23,2.05],[.22,2.12],[0,2.12]];for(const[t,n]of e)a.push(new Q(t,n));return new ge(a,48)}function G(a,e,t){return new xe(a,e,{type:ke,minFilter:t?Me:q,magFilter:t?be:q,generateMipmaps:t,depthBuffer:!0})}function Le(a,e){return we(a,{antialias:!0,cam:[.5,1.8,6.4],target:[0,1,0],background:1053466},({scene:t,camera:n,renderer:o})=>{const h=t.background;t.add(new ae(14674175,4208688,1.4));const B=new oe(16777215,2);B.position.set(3,6,4),t.add(B);const m=[],F=De(),P=new v(new I(14,7),new re({map:F}));P.position.set(0,3,-2.4),t.add(P),m.push(P);const b=ye(8,1843760,14212324);b.repeat.set(10,10);const T=new v(new I(14,14),new le({map:b}));T.rotation.x=-Math.PI/2,t.add(T),m.push(T);for(let s=0;s<9;s++){const i=new v(new se(.07,.07,3.2,12),new z({color:new ne().setHSL(s/9,.8,.55),roughness:.4}));i.position.set(-3.2+s*.8,1.6,-1.1),t.add(i),m.push(i)}const M=new v(new j(.2,24,16),new z({color:16742938,roughness:.3}));t.add(M),m.push(M);const k=new N({uniforms:{uMode:{value:e===9?3:e},uScene:{value:null},uBack:{value:null},uDepth:{value:null},uRes:{value:new Q(1,1)},uPr:{value:1},uVP:{value:new ue},uIor:{value:1.5},uThick:{value:1},uAbsorb:{value:1},uTint:{value:new ie(...x.teal)},uRough:{value:0},uDisp:{value:0},uDepthFix:{value:1},uMaxLod:{value:6}},vertexShader:E,fragmentShader:Pe,transparent:e===0,depthWrite:e!==0}),R=[],D=(s,i,r,c)=>{const d=new v(s,k);return d.position.set(i,r,c),t.add(d),R.push(d),d};if(D(new j(.85,64,32),-1.9,1,.2),D(new ce(1.3,1.7,.45),.05,1,.7).rotation.set(.1,.55,.12),D(Ce(),1.85,0,-.1),e===0)return{update(s,i){M.position.set(-1.9+1.25*Math.cos(i*.8),1+.3*Math.sin(i*1.1),1.25);const r=x[a.params.str("tint","teal")]??x.teal;k.uniforms.uTint.value.set(...r),a.hud("알파 블렌딩 · 굴절 이동 0 px · 두께 무시 · 패스 1 (장면 복사 없음)")},dispose(){F.dispose(),b.dispose()}};let u=G(2,2,!0);u.depthTexture=new H(2,2);const w=G(2,2,!1),A=new N({vertexShader:E,fragmentShader:Te,side:fe}),U=new de,y=new N({uniforms:{uScene:{value:null},uDim:{value:1}},vertexShader:Fe,fragmentShader:Re,depthWrite:!1,depthTest:!1}),C=new v(new I(2,2),y);C.frustumCulled=!1,U.add(C);const Z=new pe(-1,1,1,-1,0,1);let p=2,f=2,W=1;const g=(s,i)=>{for(const r of m)r.visible=s;for(const r of R)r.visible=i},l=k.uniforms;return{resize(s,i,r){var c;p=Math.max(2,Math.floor(s*r)),f=Math.max(2,Math.floor(i*r)),W=r,u.dispose(),(c=u.depthTexture)==null||c.dispose(),u=G(p,f,!0),u.depthTexture=new H(p,f),w.setSize(p,f),l.uRes.value.set(p,f),l.uPr.value=r,l.uMaxLod.value=Math.max(1,Math.log2(Math.min(p,f))-3)},update(s,i){M.position.set(-1.9+1.25*Math.cos(i*.8),1+.3*Math.sin(i*1.1),1.25);const r=a.params,c=r.num("ior",1.5),d=r.num("thick",1.6),L=r.num("rough",.35),V=r.num("disp",.1);l.uIor.value=c,l.uThick.value=d,l.uAbsorb.value=r.num("absorb",1),l.uTint.value.set(...x[r.str("tint","teal")]??x.teal),l.uRough.value=e===2?L:0,l.uDisp.value=e===2?V:0,l.uDepthFix.value=r.bool("depthFix",!0)?1:0;const S=r.str("info","offset");e===9&&(l.uMode.value=S==="buf"?5:S==="thick"?4:3);const K=2*.85*Math.cos(Math.PI/4)*d,O=Math.asin(Math.sin(Math.PI/4)/c),J=K*Math.sin(Math.PI/4-O),X=n.position.distanceTo(R[0].position),Y=f/W/(2*X*Math.tan(ve.degToRad(n.fov/2))),_=J*Y,ee=((c-1)/(c+1))**2;if(e===1)a.hud(`굴절 이동 ≈ ${_.toFixed(0)} px (구 45° 지점) · F0 ${(ee*100).toFixed(1)}% · 패스 3 · 장면 탭 1`);else if(e===2){const $=L*l.uMaxLod.value,te=Math.abs(_*((Math.sin(Math.PI/4-Math.asin(Math.sin(Math.PI/4)/(c+V)))-Math.sin(Math.PI/4-Math.asin(Math.sin(Math.PI/4)/Math.max(1,c-V))))/Math.max(1e-4,Math.sin(Math.PI/4-O))));a.hud(`mip LOD ${$.toFixed(1)} (흐림 ≈ ${Math.round(2**$)} px) · 무지개 폭 ≈ ${te.toFixed(0)} px · 장면 탭 ${L>.01?15:3}`)}else a.hud(S==="buf"?"유리를 빼고 그린 불투명 장면 복사본 (유리는 테두리만)":S==="thick"?"두께 = 뒷면 거리 − 앞면 거리 (밝을수록 두꺼움)":`오프셋 벡터: 색 = 방향 · 밝기 = 크기 · 회색 빗금 = 깊이 검사로 제외 · 45° ≈ ${_.toFixed(0)} px`)},render(){const s=t.background;if(l.uVP.value.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),g(!0,!1),o.setRenderTarget(u),o.render(t,n),g(!1,!0),t.background=null,t.overrideMaterial=A,o.setClearColor(0,0),o.setRenderTarget(w),o.clear(),o.render(t,n),t.overrideMaterial=null,t.background=s??h,o.setRenderTarget(null),l.uScene.value=u.texture,l.uBack.value=w.texture,l.uDepth.value=u.depthTexture,e===9){y.uniforms.uScene.value=u.texture,y.uniforms.uDim.value=l.uMode.value===5?1:.3,o.render(U,Z),o.autoClear=!1,o.clearDepth(),k.transparent=l.uMode.value===5,g(!1,!0),t.background=null,o.render(t,n),t.background=s??h,o.autoClear=!0,g(!0,!0);return}g(!0,!0),o.render(t,n)},dispose(){var s;(s=u.depthTexture)==null||s.dispose(),u.dispose(),w.dispose(),A.dispose(),y.dispose(),C.geometry.dispose(),F.dispose(),b.dispose()}}})}const Ve=[{mode:0,title:"알파 블렌딩만",kind:"before",caption:'색을 입힌 반투명 표면을 뒤 장면 위에 섞기만 한 것. 뒤 줄무늬가 유리 안에서도 곧게 이어져 "색 셀로판"처럼 보이고, 두꺼운 곳과 얇은 곳의 차이도 없다.'},{mode:1,title:"화면 공간 굴절",kind:"after",caption:"유리를 빼고 그린 장면을 복사해 두고, 유리 픽셀마다 굴절 광선이 두께만큼 나아간 점을 화면에 투영해 그 복사본을 읽는다. 줄무늬가 휘고, 가장자리는 프레넬 반사로 밝고, 두꺼운 곳일수록 유리 색이 짙다(비어–램버트)."},{mode:2,title:"거친 유리 · 분산",kind:"variant",caption:"거칠기만큼 흐린 mip 단계를 읽으면 간유리(서리 유리)가 되고, R·G·B를 서로 다른 굴절률로 세 번 읽으면 가장자리에 무지개 번짐(색 분산)이 생긴다."},{mode:9,title:"내부 버퍼 · 오프셋",kind:"info",caption:'"정보 보기"로 전환: 불투명 장면 복사본(유리가 없음), 픽셀마다 어디서 읽어 오는지 화살표, 뒷면 패스로 구한 두께. 복사본에 없는 것(유리 뒤의 유리, 화면 밖)은 굴절에도 나오지 않는다.'}],We={layout:"compare",intro:'래스터 게임에서 유리는 "뒤에 무엇이 있는지"를 직접 알 수 없습니다. 그래서 <b>불투명한 것부터 먼저 그려 화면을 복사</b>해 두고, 유리를 그릴 때 그 복사본을 <b>법선·굴절률·두께만큼 비틀어 읽어</b> 빛이 꺾인 것처럼 보이게 합니다. 여기에 프레넬 반사, 두께에 따른 흡수 색, 거칠기 흐림(mip), 파장별 굴절률 차이(분산)를 더하면 유리답게 보입니다.',how:["1패스: 유리를 숨기고 불투명 장면을 렌더 타깃에 그린다(색 + 깊이). 색 텍스처는 mip 체인을 만든다.","2패스: 유리 뒷면(BackSide)만 그려 카메라에서 뒷면까지 거리를 저장 → 앞면 거리와의 차가 두께.","3패스: 유리 픽셀에서 r = refract(−V, N, 1/IOR), 점 P + r·두께를 화면에 투영해 복사본을 읽는다.","흡수: 색 × exp(−σ·두께) (비어–램버트). 반사: 슐릭 프레넬로 환경색과 섞음.","거칠기 → 읽을 mip LOD, 분산 → R/G/B를 IOR−d, IOR, IOR+d로 따로 읽음. 깊이 검사로 유리 앞 물체가 비쳐 드는 것을 막는다."],pros:["장면 복사 1회 + 텍스처 몇 번으로 유리·물·얼음·열 아지랑이까지 처리","두께·흡수·거칠기를 재질 값으로 조절 가능","불투명 장면이 이미 그려진 상태라 정렬 문제가 줄어듦"],cons:["화면 밖·가려진 곳은 복사본에 없어서 굴절되지 않음","유리 뒤의 유리는 복사본에 없어 사라짐(여러 겹 투과)","단일 경계 근사라 두꺼운 렌즈의 뒤집힌 상은 재현 못 함","장면 복사·mip 생성 대역폭 비용"],usedIn:"Three.js MeshPhysicalMaterial transmission(같은 원리), UE 굴절(Refraction) 핀·Pixel Normal Offset, Unity HDRP 굴절(Screen Space Refraction), 각종 게임의 창문·물병·얼음·물 표면.",controls:[{type:"range",key:"ior",label:"굴절률 (IOR)",min:1,max:2.4,step:.01,value:1.5},{type:"range",key:"thick",label:"두께",min:0,max:4,step:.05,value:1.6},{type:"range",key:"absorb",label:"흡수 색 세기",min:0,max:3,step:.05,value:1},{type:"select",key:"tint",label:"유리 색",options:[{label:"청록",value:"teal"},{label:"호박",value:"amber"},{label:"무색",value:"clear"}],value:"teal"},{type:"range",key:"rough",label:"거칠기",min:0,max:1,step:.01,value:.35},{type:"range",key:"disp",label:"분산",min:0,max:.2,step:.005,value:.1},{type:"toggle",key:"depthFix",label:"깊이 검사 (앞 물체 제외)",value:!0},{type:"select",key:"info",label:"정보 보기",options:[{label:"오프셋 벡터",value:"offset"},{label:"불투명 장면 버퍼",value:"buf"},{label:"두께",value:"thick"}],value:"offset"}],viewers:Ve.map(a=>({title:a.title,kind:a.kind,caption:a.caption,mount:e=>Le(e,a.mode)}))};export{We as default};
