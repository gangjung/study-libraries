import{k as l,$ as w,b as x,M as b,B as y,r as F,s as M,N as U,L as R,u as A,U as D}from"./three.module-BZgG6AUv.js";import{F as L}from"./Pass-By1_TgQk.js";import{m as k}from"./three-viewer-0rZIEDzf.js";import{b as T}from"./postscene-jOAKHM8g.js";const d={uniforms:{tLow:{value:null},texel:{value:new l},sharpen:{value:0},mode:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
    uniform sampler2D tLow; uniform vec2 texel; uniform float sharpen; uniform int mode;
    varying vec2 vUv;
    vec3 s(vec2 o){ return min(texture2D(tLow, vUv + o * texel).rgb, vec3(1.0)); }
    void main(){
      vec3 c = texture2D(tLow, vUv).rgb;
      if (mode == 2) {
        // 대비 적응형 샤프닝 (AMD CAS/FSR1 RCAS 계열의 단순화): 주변 4픽셀의 최소/최대로 샤프닝 양을 조절해 링잉 억제
        vec3 cc = min(c, vec3(1.0));
        vec3 n = s(vec2(0.0, 1.0)), so = s(vec2(0.0, -1.0)), e = s(vec2(1.0, 0.0)), w = s(vec2(-1.0, 0.0));
        vec3 mn = min(cc, min(min(n, so), min(e, w)));
        vec3 mx = max(cc, max(max(n, so), max(e, w)));
        vec3 amp = sqrt(clamp(min(mn, 1.0 - mx) / max(mx, vec3(1e-4)), 0.0, 1.0));
        vec3 wgt = amp * (-1.0 / mix(8.0, 4.0, sharpen));
        c = (cc + (n + so + e + w) * wgt) / (1.0 + 4.0 * wgt);
      }
      gl_FragColor = vec4(c, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`};function $(t,s){return k(t,{antialias:!1,cam:[1.4,1.75,-14.2],target:[0,1.5,-20],fov:45},({scene:c,camera:f,renderer:o})=>{o.toneMapping=w;const u=T(c),S=new x({color:15658734});for(let n=0;n<24;n++){const e=new b(new y(.02,1.2,.02),S);e.position.set(-2.4+n*.2,.6,-17.5),c.add(e)}if(s==="native")return{update(n,e){u(e);const v=o.getDrawingBufferSize(new l);t.hud(`네이티브 ${v.x}×${v.y}
픽셀 100%`)}};const a=new F(1,1,{type:M}),g=s==="nearest"?U:R;a.texture.minFilter=a.texture.magFilter=g;const i=new A(d);i.uniforms=D.clone(d.uniforms),i.uniforms.mode.value=s==="sharpen"?2:0;const p=new L(i);let r=new l,m=0;const h=()=>{const n=t.params.num("scale",50)/100,e=o.getDrawingBufferSize(new l);n===m&&e.equals(r)||(m=n,r=e,a.setSize(Math.max(1,Math.floor(e.x*n)),Math.max(1,Math.floor(e.y*n))),i.uniforms.texel.value.set(1/a.width,1/a.height))};return{update(n,e){u(e),h(),i.uniforms.sharpen.value=t.params.num("sharpness",70)/100,t.hud(`내부 ${a.width}×${a.height} → 출력 ${r.x}×${r.y}
렌더 픽셀 ${Math.round(m*m*100)}%`)},render(){o.setRenderTarget(a),o.render(c,f),o.setRenderTarget(null),i.uniforms.tLow.value=a.texture,p.render(o)},dispose(){a.dispose(),p.dispose(),i.dispose()}}})}const C=[{mode:"nearest",title:"최근접 업스케일",kind:"before",caption:"저해상도 픽셀을 그대로 키움. 계단이 크게 보인다 (도트 게임 스타일)."},{mode:"bilinear",title:"쌍선형 업스케일",kind:"variant",caption:"이웃 4픽셀을 보간. 계단은 사라지지만 전체가 뿌옇게 흐려진다."},{mode:"sharpen",title:"쌍선형 + 적응형 샤프닝 (FSR1 계열)",kind:"after",caption:"업스케일 후 대비 적응형 샤프닝으로 윤곽을 되살린다. 글자 가독성을 비교해 보세요. 진짜 디테일을 만들지는 못한다."},{mode:"native",title:"기준: 네이티브 해상도",kind:"info",caption:"모든 픽셀을 렌더링한 정답. 비용은 렌더 픽셀 수에 비례한다."}],E={layout:"variants",intro:"해상도가 높아질수록 픽셀 셰이딩 비용이 커집니다. <b>업스케일링</b>은 내부적으로 낮은 해상도(예: 50% → 픽셀 수 25%)로 렌더링한 뒤 화면 크기로 키웁니다. 키우는 방법에 따라 화질이 크게 달라집니다. 렌더 스케일을 바꿔 가며 간판 글자와 울타리를 비교해 보세요. 현대 기법인 DLSS·FSR2·XeSS는 여기에 <b>여러 프레임의 정보(시간적 누적)</b>를 더해 실제 디테일까지 복원합니다.",how:["공간적 업스케일: 한 프레임의 저해상도 이미지만으로 키운다. 최근접 → 쌍선형 → 에지 적응 보간(FSR1 EASU) 순으로 품질이 좋아진다.","샤프닝: 보간으로 흐려진 윤곽을 복원. 단순 언샤프 마스크는 헤일로(링잉)가 생기므로 주변 대비에 따라 양을 조절한다(CAS/RCAS).","시간적 업스케일(FSR2·DLSS·XeSS): 매 프레임 서브픽셀만큼 카메라를 흔들고(jitter), 모션 벡터로 이전 프레임을 재투영해 누적 → 여러 프레임의 샘플로 고해상도를 재구성한다.","DLSS는 누적 단계의 판단(어떤 과거 샘플을 믿을지)을 신경망이 수행한다."],pros:["GPU 비용을 크게 절감 (50% 스케일 = 픽셀 1/4)","고해상도 디스플레이·레이 트레이싱을 실시간으로 가능하게 함","공간적 방식은 구현이 쉽고 어디서나 동작"],cons:["공간적 방식은 없는 디테일을 만들지 못함 (얇은 선·글자가 깨짐)","시간적 방식은 고스팅·떨림 같은 아티팩트, 모션 벡터 필요","과한 샤프닝은 지글거림 유발"],usedIn:"AMD FSR 1/2/3, NVIDIA DLSS, Intel XeSS, UE4 TAAU·UE5 TSR, Unity 6 STP, Apple MetalFX, Qualcomm Snapdragon GSR(모바일 공간 업스케일), 콘솔의 체커보드 렌더링·동적 해상도.",controls:[{type:"range",key:"scale",label:"렌더 스케일 (%)",min:20,max:100,step:5,value:50},{type:"range",key:"sharpness",label:"샤프닝 강도 (%)",min:0,max:100,step:5,value:70}],viewers:C.map(t=>({title:t.title,kind:t.kind,caption:t.caption,mount:s=>$(s,t.mode)}))};export{E as default};
