import{$ as k,M as E,B as A,b as z,af as C,ag as G,ah as B,L as F,ai as V,p as W}from"./three.module-BZgG6AUv.js";import{S as $,E as _,R as j,O as N}from"./OutputPass-BpyMY09z.js";import{m as H}from"./three-viewer-0rZIEDzf.js";import{m as O}from"./canvas-viewer-Btf0JXdr.js";import{b as I}from"./postscene-jOAKHM8g.js";import"./Pass-By1_TgQk.js";const K={name:"LUTShader",uniforms:{lut:{value:null},lutSize:{value:0},tDiffuse:{value:null},intensity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}

	`,fragmentShader:`

		uniform float lutSize;
		uniform sampler3D lut;

		varying vec2 vUv;
		uniform float intensity;
		uniform sampler2D tDiffuse;
		void main() {

			vec4 val = texture2D( tDiffuse, vUv );
			vec4 lutVal;

			// pull the sample in by half a pixel so the sample begins
			// at the center of the edge pixels.
			float pixelWidth = 1.0 / lutSize;
			float halfPixelWidth = 0.5 / lutSize;
			vec3 uvw = vec3( halfPixelWidth ) + val.rgb * ( 1.0 - pixelWidth );


			lutVal = vec4( texture( lut, uvw ).rgb, val.a );

			gl_FragColor = vec4( mix( val, lutVal, intensity ) );

		}

	`};class Z extends ${set lut(e){const t=this.material;e!==this.lut&&(t.uniforms.lut.value=null,e&&(t.uniforms.lutSize.value=e.image.width,t.uniforms.lut.value=e))}get lut(){return this.material.uniforms.lut.value}set intensity(e){this.material.uniforms.intensity.value=e}get intensity(){return this.material.uniforms.intensity.value}constructor(e={}){super(K),this.lut=e.lut||null,this.intensity="intensity"in e?e.intensity:1}}const v=n=>Math.max(0,Math.min(1,n)),w=([n,e,t])=>.2126*n+.7152*e+.0722*t,g=(n,e)=>{const t=w(n);return n.map(a=>t+(a-t)*e)},x=(n,e)=>n.map(t=>(t-.5)*e+.5),T=[{id:"tealorange",name:"틸 & 오렌지",caption:"그림자는 청록, 밝은 곳(피부톤)은 주황으로. 블록버스터 영화의 대표 룩.",f:n=>{let e=x(n,1.15);const t=w(e);return e=[e[0]-.03*(1-t)**2+.08*t*t,e[1]+.02*(1-t)**2+.02*t*t,e[2]+.07*(1-t)**2-.07*t*t],g(e,1.2)}},{id:"bleach",name:"블리치 바이패스",caption:"채도를 절반쯤 빼고 대비를 올린 거칠고 금속적인 느낌 (전쟁 영화 풍).",f:n=>{const e=w(n);let t=n.map(a=>a*.45+e*.55);return t=x(t,1.35),[t[0]-.01,t[1],t[2]+.02]}},{id:"noir",name:"느와르 + 빨강 강조",caption:"빨간 계열만 남기고 흑백으로. LUT는 색상(hue)별로 다른 처리도 할 수 있다.",f:n=>{if(n[0]>n[1]*1.4&&n[0]>n[2]*1.4&&n[0]>.2)return g(x(n,1.2),1.3);const t=v((w(n)-.5)*1.45+.5);return[t,t,t]}},{id:"retro",name:"레트로 필름",caption:"검정을 띄우고(lift) 채도를 낮춘 뒤 따뜻하게. 바랜 사진 느낌.",f:n=>{let e=n.map(a=>.08+a*.84);e=g(e,.72);const t=w(e);return[e[0]+.05,e[1]+.015+.02*(1-t),e[2]-.05]}}],s=33;function q(n){const e=new Uint8Array(s*s*s*4);let t=0;for(let o=0;o<s;o++)for(let l=0;l<s;l++)for(let d=0;d<s;d++){const i=n([d/(s-1),l/(s-1),o/(s-1)]);e[t++]=v(i[0])*255,e[t++]=v(i[1])*255,e[t++]=v(i[2])*255,e[t++]=255}const a=new C(e,s,s,s);return a.format=G,a.type=B,a.minFilter=a.magFilter=F,a.wrapS=a.wrapT=a.wrapR=V,a.unpackAlignment=1,a.needsUpdate=!0,a}function R(n,e){return H(n,{antialias:!0,cam:[0,1.8,8],target:[0,1,-6],fov:45},({scene:t,camera:a,renderer:o})=>{o.toneMapping=k;const l=I(t);if([14262394,7317724,6989903,13369344,15843890,16777215,8421504,2105376].forEach((c,f)=>{const h=new E(new A(.5,.5,.1),new z({color:c,roughness:.9}));h.position.set(-1.75+f*.5,.3,5),t.add(h)}),e===null)return{update:(c,f)=>l(f)};const i=new _(o);i.addPass(new j(t,a)),i.addPass(new N);const u=q(T[e].f),m=new Z({lut:u,intensity:1});return i.addPass(m),{update(c,f){l(f),m.intensity=n.params.num("intensity",100)/100,n.hud(`3D LUT ${s}³  강도 ${n.params.num("intensity",100)}%`)},render:()=>i.render(),resize:(c,f,h)=>{i.setPixelRatio(h),i.setSize(c,f)},dispose:()=>{u.dispose(),i.dispose()}}})}const J={title:"색 매핑 표 (입력 → 출력)",kind:"info",wide:!0,caption:'각 줄의 위쪽 = 입력 색(색상환과 밝기 단계), 아래쪽 = 그 그레이드의 LUT를 통과한 색. LUT는 이런 "모든 색 → 새 색" 대응표를 3차원 격자로 저장한 것이다.',mount:n=>O(n,()=>{let e=-1;return{draw(t,a,o){const l=n.params.num("intensity",100);if(e===l*1e4+a+o)return;e=l*1e4+a+o,t.fillStyle="#0b0e14",t.fillRect(0,0,a,o);const d=Math.min(110,a*.22),i=T.length+1,u=o/i,m=64,c=(a-d-8)/m,f=r=>{if(r<m*.65){const y=new W().setHSL(r/(m*.65),.75,.55);return[y.r,y.g,y.b]}const p=(r-m*.65)/(m*.35-1);return[p,p,p]},h=(r,p,y)=>{t.fillStyle="#e6ebf2",t.font='600 12px "Noto Sans KR", sans-serif',t.textBaseline="middle",t.fillText(y,8,r+u/2);for(let b=0;b<m;b++){const S=f(b),L=d+b*c;t.fillStyle=`rgb(${S.map(U=>Math.round(v(U)*255)).join(",")})`,t.fillRect(L,r+u*.12,Math.ceil(c),u*.36);let D=S;if(p){const U=p(S);D=S.map((M,P)=>M+(U[P]-M)*(l/100))}t.fillStyle=`rgb(${D.map(U=>Math.round(v(U)*255)).join(",")})`,t.fillRect(L,r+u*.5,Math.ceil(c),u*.36)}};h(0,null,"원본"),T.forEach((r,p)=>h((p+1)*u,r.f,r.name))}}})},at={layout:"variants",intro:"컬러 그레이딩은 화면 전체의 색감을 바꿔 분위기를 만드는 후처리입니다. 아티스트가 포토샵·DaVinci 같은 도구에서 만든 색 보정 결과를 <b>3D LUT</b>(Look-Up Table)에 구워 두면, 게임은 픽셀마다 <b>텍스처 한 번 읽기</b>로 그 복잡한 보정을 그대로 재현합니다. 아래쪽 색 패치(피부·하늘·풀·빨강·노랑·흰·회·검)가 어떻게 바뀌는지 비교해 보세요.",how:['RGB 각 축을 N단계(보통 16·32·33)로 나눈 3차원 격자를 만든다. 각 칸에는 "이 입력 색 → 이 출력 색"이 저장된다.',"중립 LUT(입력=출력) 이미지를 게임 스크린샷에 붙여 보정 툴로 함께 보정하고, 결과 LUT를 다시 게임에 넣는 방식이 일반적이다.","후처리에서 픽셀 색을 3D 텍스처 좌표로 써서 샘플링한다. 하드웨어 삼선형 보간 덕에 격자 사이 색도 부드럽게 나온다.","보통 톤 매핑 이후(디스플레이 색 공간) 또는 log 공간에서 적용한다. 여러 LUT를 섞어 시간대·지역별 분위기를 전환하기도 한다."],pros:["아무리 복잡한 색 보정도 고정 비용(텍스처 1회 샘플)","아티스트가 익숙한 툴로 룩을 만들 수 있음","여러 LUT를 보간해 부드러운 분위기 전환"],cons:["LUT 해상도가 낮으면 급격한 보정에서 띠(banding)가 생김","공간적인 효과(비네트, 국소 대비)는 표현 불가","HDR 출력에서는 범위 처리가 까다로움"],usedIn:"UE·Unity의 Color Grading LUT, 거의 모든 AAA 게임의 시네마틱 룩, 인스타그램 류 사진 필터.",controls:[{type:"range",key:"intensity",label:"LUT 강도 (%)",min:0,max:100,step:1,value:100}],viewers:[{title:"원본",kind:"before",caption:"톤 매핑까지만 적용한 상태.",mount:n=>R(n,null)},...T.map((n,e)=>({title:n.name,kind:"variant",caption:n.caption,mount:t=>R(t,e)})),J]};export{at as default};
