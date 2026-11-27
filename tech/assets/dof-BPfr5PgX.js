import{r as D,s as y,N as h,a9 as U,aa as g,A as P,U as k,u as C,p as w,$ as E,ab as T,k as A}from"./three.module-BZgG6AUv.js";import{E as S,R as F,O as M}from"./OutputPass-BpyMY09z.js";import{P as R,F as _}from"./Pass-By1_TgQk.js";import{m as B}from"./three-viewer-0rZIEDzf.js";import{b as V}from"./postscene-jOAKHM8g.js";const Z={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class z extends R{constructor(e,r,l){super(),this.scene=e,this.camera=r;const c=l.focus!==void 0?l.focus:1,f=l.aperture!==void 0?l.aperture:.025,d=l.maxblur!==void 0?l.maxblur:1;this.renderTargetDepth=new D(1,1,{minFilter:h,magFilter:h,type:y}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new U,this.materialDepth.depthPacking=g,this.materialDepth.blending=P;const u=Z,t=k.clone(u.uniforms);t.tDepth.value=this.renderTargetDepth.texture,t.focus.value=c,t.aspect.value=r.aspect,t.aperture.value=f,t.maxblur.value=d,t.nearClip.value=r.near,t.farClip.value=r.far,this.materialBokeh=new C({defines:Object.assign({},u.defines),uniforms:t,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.uniforms=t,this.fsQuad=new _(this.materialBokeh),this._oldClearColor=new w}render(e,r,l){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);const c=e.getClearAlpha(),f=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=l.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(c),e.autoClear=f}setSize(e,r){this.materialBokeh.uniforms.aspect.value=e/r,this.renderTargetDepth.setSize(e,r)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}const G=6e-4;function x(o,e){return B(o,{antialias:!0,cam:[0,1.8,8],target:[0,1,-6],fov:45},({scene:r,camera:l,renderer:c})=>{c.toneMapping=E;const f=V(r);l.far=80,l.updateProjectionMatrix();const d=new T,u=s=>{const a=c.domElement.getBoundingClientRect();d.setFromCamera(new A((s.clientX-a.left)/a.width*2-1,-((s.clientY-a.top)/a.height)*2+1),l);const v=d.intersectObjects(r.children,!1)[0];if(v){const p=v.point.clone().applyMatrix4(l.matrixWorldInverse);o.params.set("focus",Math.round(-p.z*10)/10)}};c.domElement.addEventListener("dblclick",u);let t=null,i=null,n=null;e==="bokeh"?(t=new S(c),t.addPass(new F(r,l)),i=new z(r,l,{focus:8,aperture:.002,maxblur:.012}),t.addPass(i),t.addPass(new M)):e==="coc"&&(n=new C({uniforms:{focus:{value:8},aperture:{value:.002},maxblur:{value:.012}},vertexShader:"varying float vDepth; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vDepth = -mv.z; gl_Position = projectionMatrix * mv; }",fragmentShader:`uniform float focus; uniform float aperture; uniform float maxblur; varying float vDepth;
          void main(){
            float c = clamp((vDepth - focus) * aperture / maxblur, -1.0, 1.0);
            vec3 inF = vec3(0.29, 0.87, 0.5);
            vec3 col = c < 0.0 ? mix(inF, vec3(0.25, 0.45, 1.0), -c) : mix(inF, vec3(1.0, 0.3, 0.3), c);
            float band = step(0.98, fract(vDepth));
            gl_FragColor = vec4(col * (0.75 + 0.25 * (1.0 - band)), 1.0);
          }`}),r.overrideMaterial=n);const m=()=>{const s=o.params.num("focus",8),a=o.params.num("aperture",4)*G,v=o.params.num("maxblur",12)/1e3;if(i){const p=i.uniforms;p.focus.value=s,p.aperture.value=a,p.maxblur.value=v}n&&(n.uniforms.focus.value=s,n.uniforms.aperture.value=a,n.uniforms.maxblur.value=v)};m();const b=o.params.on(m);return{update(s,a){f(a),o.hud(`초점 거리 ${o.params.num("focus",8).toFixed(1)}
조리개 ${o.params.num("aperture",4)}`)},render:t?()=>t.render():void 0,resize:(s,a,v)=>{t&&(t.setPixelRatio(v),t.setSize(s,a))},dispose:()=>{b(),c.domElement.removeEventListener("dblclick",u),t==null||t.dispose(),i==null||i.dispose(),r.overrideMaterial=null}}})}const L={layout:"variants",intro:"실제 카메라 렌즈는 <b>한 거리에만</b> 초점이 정확히 맞고, 그보다 앞뒤는 점이 원(착란원, Circle of Confusion)으로 퍼져 흐려집니다. 피사계 심도(DoF) 후처리는 깊이 버퍼로 픽셀마다 착란원 크기를 계산해 그만큼 블러합니다. <b>뷰어를 더블클릭하면 그 물체에 초점이 맞습니다.</b>",how:["깊이 버퍼에서 각 픽셀의 카메라 거리를 읽는다.","착란원 크기 CoC ∝ 조리개 × |거리 − 초점 거리| (실제 렌즈 공식은 초점거리·F값이 포함된 박막 렌즈 근사).","CoC 반경만큼 주변 픽셀을 샘플링해 섞는다. 원형/육각형 샘플 패턴을 쓰면 밝은 점이 조리개 모양의 보케로 퍼진다.","앞쪽 흐림(전경)이 초점 맞은 물체 위로 번지도록 전경/배경을 나눠 처리하는 것이 고품질 구현의 핵심.","성능을 위해 절반 해상도에서 블러하고, 분리형(separable) 필터나 산란(scatter) 기반 보케를 쓴다."],pros:["시선 유도와 영화적인 분위기","컷신·조준(ADS) 연출에 효과적","먼 배경의 디테일 부족을 가려 줌"],cons:["플레이 중에는 정보를 가려 답답할 수 있음","경계(초점 물체 윤곽)에서 번짐·헤일로 아티팩트","고품질 보케는 비쌈"],usedIn:"컷신과 사진 모드(거의 모든 AAA), 저격 조준 시 배경 흐림, UE의 Cinematic DoF, Unity HDRP Physical Camera.",controls:[{type:"range",key:"focus",label:"초점 거리",min:1,max:30,step:.1,value:8},{type:"range",key:"aperture",label:"조리개 크기 (클수록 얕은 심도)",min:0,max:20,step:.5,value:4},{type:"range",key:"maxblur",label:"최대 블러 (×0.001)",min:2,max:30,step:1,value:12}],viewers:[{title:"DoF 없음 (핀홀 카메라)",kind:"before",caption:"모든 거리가 선명하다. 게임 화면은 기본적으로 무한히 작은 조리개의 핀홀 카메라.",mount:o=>x(o,"none")},{title:"피사계 심도 (Bokeh)",kind:"after",caption:"초점 거리 밖이 흐려지고, 작은 발광 점이 원형 보케로 퍼진다. 멀리 있는 간판의 글자가 흐려지는 정도를 보세요.",mount:o=>x(o,"bokeh")},{title:"착란원(CoC) 크기 시각화",kind:"info",caption:"초록 = 초점 안(선명), 파랑 = 초점보다 앞(전경 흐림), 빨강 = 뒤(배경 흐림). 색이 진할수록 많이 흐려진다. 가는 줄은 1m 간격 등고선.",mount:o=>x(o,"coc")}]};export{L as default};
