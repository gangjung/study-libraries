import{r as f,aG as d,s as g,u as x,k as y,M as b,P as h,o as R,a2 as T}from"./three.module-BZgG6AUv.js";import{m as S}from"./three-viewer-0rZIEDzf.js";import{b as k}from"./postscene-jOAKHM8g.js";import{Q as C}from"./glsl-DOwCk4-f.js";const D=`
uniform sampler2D tScene; uniform float mode; uniform float uTime; uniform vec2 uRes;
uniform float grain; uniform float vignette; uniform float curve; uniform float pixel; uniform float colors;
varying vec2 vUv;
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float bayer4(vec2 p){
  ivec2 q = ivec2(mod(p, 4.));
  int i = q.x + q.y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + .5) / 16.;
}
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){
  vec2 uv = vUv;
  vec3 c;
  if (mode < .5) {
    c = aces(texture2D(tScene, uv).rgb);
  } else if (mode < 1.5) {
    // 필름: 약한 색수차 + 그레인 + 비네트 + 살짝 바랜 톤
    vec2 d = uv - .5;
    c.r = texture2D(tScene, uv - d * .004).r; c.g = texture2D(tScene, uv).g; c.b = texture2D(tScene, uv + d * .004).b;
    c = aces(c);
    c = mix(vec3(dot(c, vec3(.3, .59, .11))), c, .85) * vec3(1.04, 1., .92) + vec3(.02, .015, .03);
    float lum = dot(c, vec3(.3, .59, .11));
    // 그레인은 중간 톤에서 가장 강함 (실제 필름 입자 특성)
    float n = h12(gl_FragCoord.xy + fract(uTime * 24.) * 517.) - .5;
    c += n * grain * (1. - abs(lum - .5) * 1.4);
    c *= mix(1., smoothstep(.85, .2, length(d * vec2(1.15, 1.))), vignette);
  } else if (mode < 2.5) {
    // CRT: 화면 곡률 → 주사선 → RGB 섀도 마스크
    vec2 cc = uv * 2. - 1.;
    cc *= 1. + curve * pow(abs(cc.yx), vec2(2.)) * .25;
    uv = cc * .5 + .5;
    if (any(lessThan(uv, vec2(0.))) || any(greaterThan(uv, vec2(1.)))) { gl_FragColor = vec4(0, 0, 0, 1); return; }
    float lines = 240.;
    vec2 q = vec2(uv.x, (floor(uv.y * lines) + .5) / lines);
    vec3 s = aces(texture2D(tScene, q).rgb * 1.25);
    float sl = .55 + .45 * sin(uv.y * lines * 6.2832 + 1.57);
    float m3 = mod(gl_FragCoord.x, 3.);
    vec3 mask = vec3(m3 < 1. ? 1. : .55, m3 >= 1. && m3 < 2. ? 1. : .55, m3 >= 2. ? 1. : .55);
    c = s * mix(1., sl, .75) * mask * 1.25;
    c += aces(texture2D(tScene, q, 3.).rgb) * .15; // 형광체 번짐
    c *= smoothstep(1.4, .6, length(cc));
  } else {
    // 레트로: 저해상도 픽셀화 + 색 수 제한 + 순서 디더링
    vec2 cells = floor(uRes / pixel);
    vec2 p = (floor(uv * cells) + .5) / cells;
    vec3 s = aces(texture2D(tScene, p).rgb);
    float th = bayer4(floor(uv * cells)) - .5;
    float lv = colors - 1.;
    c = floor(s * lv + .5 + th) / lv;
  }
  gl_FragColor = vec4(clamp(c, 0., 1.), 1.);
  #include <colorspace_fragment>
}`;function F(t,o){return S(t,{cam:[0,2,7.5],target:[0,1,-3],antialias:!1},({scene:i,camera:u,renderer:r})=>{const v=k(i),n=new f(1,1,{type:g,generateMipmaps:!0,minFilter:d}),l=new x({vertexShader:C,fragmentShader:D,uniforms:{tScene:{value:n.texture},mode:{value:o},uTime:{value:0},uRes:{value:new y(1,1)},grain:{value:.12},vignette:{value:.8},curve:{value:1},pixel:{value:4},colors:{value:4}}}),m=new b(new h(2,2),l),s=new R;s.add(m);const p=new T(-1,1,1,-1,0,1);return{update(c,a){v(a);const e=l.uniforms;e.uTime.value=a,e.grain.value=t.params.num("grain",.12),e.vignette.value=t.params.num("vignette",.8),e.curve.value=t.params.num("curve",1),e.pixel.value=t.params.num("pixel",4),e.colors.value=t.params.num("colors",4),t.hud(["원본 (톤 매핑만)",`필름 그레인 ${e.grain.value.toFixed(2)} + 비네트 + 색수차`,"CRT: 곡률 + 주사선 240줄 + RGB 마스크",`픽셀 ${e.pixel.value}배 · 채널당 ${e.colors.value}단계 + 4×4 바이어 디더`][o])},resize(c,a,e){n.setSize(Math.floor(c*e),Math.floor(a*e)),l.uniforms.uRes.value.set(c*e,a*e)},render(){r.setRenderTarget(n),r.render(i,u),r.setRenderTarget(null),r.render(s,p)},dispose(){n.dispose()}}})}const G=[{mode:0,title:"원본",kind:"before",caption:'톤 매핑만 거친 깨끗한 디지털 이미지. 기술적으로 정확하지만 차갑고 "CG 같은" 느낌이 들 수 있다.'},{mode:1,title:"필름 룩",kind:"variant",caption:"프레임마다 바뀌는 그레인(중간 톤에서 가장 강함), 가장자리를 어둡게 하는 비네트, 렌즈 색수차, 약간 바랜 색. 시선이 중앙으로 모이고 질감이 생긴다."},{mode:2,title:"CRT 모니터",kind:"variant",caption:"브라운관을 흉내: 볼록한 화면 곡률, 가로 주사선, 화면을 이루는 RGB 형광체 세로 줄무늬(애퍼처 그릴형 마스크), 빛 번짐."},{mode:3,title:"레트로 픽셀 · 디더링",kind:"variant",caption:"낮은 해상도로 샘플링하고 색 수를 제한한 뒤 바이어 행렬로 디더링. 적은 색으로 그라데이션을 점 패턴으로 표현한다."}],_={layout:"variants",intro:"정확한 렌더링 위에 <b>의도적인 결함</b>을 더해 분위기를 만드는 스타일 후처리입니다. 필름 그레인·비네트·색수차는 카메라 렌즈와 필름의 특성을, CRT·픽셀화·디더링은 옛 하드웨어의 특성을 흉내 냅니다. 모두 전체 화면 셰이더 한 번이라 비용이 작고, 게임의 정체성을 크게 좌우합니다.",how:["그레인: 프레임마다 바뀌는 해시 노이즈를 휘도에 따라 가중해 더함 (어두운 곳·밝은 곳은 약하게).","비네트: 화면 중심 거리로 smoothstep 감쇠. 색수차: 중심에서 바깥으로 R·B 채널 샘플 위치를 반대로 밀기.","CRT: UV를 배럴 왜곡 → 주사선 수로 세로 양자화 + sin 밝기 변조 → 화면 픽셀 x mod 3으로 RGB 마스크.","레트로: floor(uv × 셀 수)로 샘플 위치 양자화, floor(색 × 단계 + 바이어 임계값)으로 색 감축.","보통 톤 매핑 뒤, UI 앞에 적용. 접근성 옵션으로 끌 수 있게 하는 것이 좋다."],pros:["저렴한 비용으로 강한 스타일","렌더링의 단점(밴딩·깨끗함)을 가려줌","레트로 감성·호러 분위기 연출"],cons:["과하면 눈이 피로하고 디테일 손실","그레인은 영상 압축(스트리밍)에 불리","플레이어 취향이 갈려 옵션 필요"],usedIn:"Left 4 Dead·Mass Effect(필름 그레인), Alien: Isolation(70년대 필름 룩), Return of the Obra Dinn(1비트 디더링), 레트로 컬렉션·에뮬레이터와 픽셀아트 인디 게임의 CRT 필터 옵션, UE·Unity 포스트 프로세스 볼륨의 Film Grain·Vignette.",controls:[{type:"range",key:"grain",label:"그레인 세기",min:0,max:.4,step:.01,value:.12},{type:"range",key:"vignette",label:"비네트",min:0,max:1,step:.05,value:.8},{type:"range",key:"curve",label:"CRT 곡률",min:0,max:2,step:.1,value:1},{type:"range",key:"pixel",label:"픽셀 크기",min:2,max:12,step:1,value:4},{type:"range",key:"colors",label:"채널당 색 단계",min:2,max:8,step:1,value:4}],viewers:G.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:o=>F(o,t.mode)}))};export{_ as default};
