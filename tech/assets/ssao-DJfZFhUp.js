import{aB as B,k as Te,aN as We,bH as qe,bI as Xe,r as Se,s as Pe,N as De,u as O,A as C,U as V,z as Ke,b6 as H,bq as G,bJ as je,bK as Ze,p as He,b5 as Ye,g as le,ac as Ge,aE as nt,au as rt,ad as q,m as lt,ag as ct,ah as ht,H as ut,D as dt,b as ft,B as fe,C as mt,T as pt,S as vt,M as gt}from"./three.module-BZgG6AUv.js";import{C as W,E as xt,R as Mt,O as St}from"./OutputPass-BpyMY09z.js";import{P as Qe,F as $e}from"./Pass-By1_TgQk.js";import{m as Pt}from"./three-viewer-0rZIEDzf.js";import{a as Dt}from"./canvas-viewer-Btf0JXdr.js";class Je{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(e,t,i){return e[0]*t+e[1]*i}dot3(e,t,i,a){return e[0]*t+e[1]*i+e[2]*a}dot4(e,t,i,a,o){return e[0]*t+e[1]*i+e[2]*a+e[3]*o}noise(e,t){let i,a,o;const s=.5*(Math.sqrt(3)-1),n=(e+t)*s,c=Math.floor(e+n),r=Math.floor(t+n),g=(3-Math.sqrt(3))/6,h=(c+r)*g,P=c-h,v=r-h,D=e-P,E=t-v;let U,A;D>E?(U=1,A=0):(U=0,A=1);const x=D-U+g,M=E-A+g,p=D-1+2*g,T=E-1+2*g,w=c&255,y=r&255,R=this.perm[w+this.perm[y]]%12,u=this.perm[w+U+this.perm[y+A]]%12,d=this.perm[w+1+this.perm[y+1]]%12;let f=.5-D*D-E*E;f<0?i=0:(f*=f,i=f*f*this.dot(this.grad3[R],D,E));let m=.5-x*x-M*M;m<0?a=0:(m*=m,a=m*m*this.dot(this.grad3[u],x,M));let b=.5-p*p-T*T;return b<0?o=0:(b*=b,o=b*b*this.dot(this.grad3[d],p,T)),70*(i+a+o)}noise3d(e,t,i){let a,o,s,n;const r=(e+t+i)*.3333333333333333,g=Math.floor(e+r),h=Math.floor(t+r),P=Math.floor(i+r),v=1/6,D=(g+h+P)*v,E=g-D,U=h-D,A=P-D,x=e-E,M=t-U,p=i-A;let T,w,y,R,u,d;x>=M?M>=p?(T=1,w=0,y=0,R=1,u=1,d=0):x>=p?(T=1,w=0,y=0,R=1,u=0,d=1):(T=0,w=0,y=1,R=1,u=0,d=1):M<p?(T=0,w=0,y=1,R=0,u=1,d=1):x<p?(T=0,w=1,y=0,R=0,u=1,d=1):(T=0,w=1,y=0,R=1,u=1,d=0);const f=x-T+v,m=M-w+v,b=p-y+v,X=x-R+2*v,K=M-u+2*v,Y=p-d+2*v,Q=x-1+3*v,$=M-1+3*v,S=p-1+3*v,F=g&255,j=h&255,Z=P&255,ce=this.perm[F+this.perm[j+this.perm[Z]]]%12,he=this.perm[F+T+this.perm[j+w+this.perm[Z+y]]]%12,ue=this.perm[F+R+this.perm[j+u+this.perm[Z+d]]]%12,de=this.perm[F+1+this.perm[j+1+this.perm[Z+1]]]%12;let _=.6-x*x-M*M-p*p;_<0?a=0:(_*=_,a=_*_*this.dot3(this.grad3[ce],x,M,p));let I=.6-f*f-m*m-b*b;I<0?o=0:(I*=I,o=I*I*this.dot3(this.grad3[he],f,m,b));let z=.6-X*X-K*K-Y*Y;z<0?s=0:(z*=z,s=z*z*this.dot3(this.grad3[ue],X,K,Y));let k=.6-Q*Q-$*$-S*S;return k<0?n=0:(k*=k,n=k*k*this.dot3(this.grad3[de],Q,$,S)),32*(a+o+s+n)}noise4d(e,t,i,a){const o=this.grad4,s=this.simplex,n=this.perm,c=(Math.sqrt(5)-1)/4,r=(5-Math.sqrt(5))/20;let g,h,P,v,D;const E=(e+t+i+a)*c,U=Math.floor(e+E),A=Math.floor(t+E),x=Math.floor(i+E),M=Math.floor(a+E),p=(U+A+x+M)*r,T=U-p,w=A-p,y=x-p,R=M-p,u=e-T,d=t-w,f=i-y,m=a-R,b=u>d?32:0,X=u>f?16:0,K=d>f?8:0,Y=u>m?4:0,Q=d>m?2:0,$=f>m?1:0,S=b+X+K+Y+Q+$,F=s[S][0]>=3?1:0,j=s[S][1]>=3?1:0,Z=s[S][2]>=3?1:0,ce=s[S][3]>=3?1:0,he=s[S][0]>=2?1:0,ue=s[S][1]>=2?1:0,de=s[S][2]>=2?1:0,_=s[S][3]>=2?1:0,I=s[S][0]>=1?1:0,z=s[S][1]>=1?1:0,k=s[S][2]>=1?1:0,Be=s[S][3]>=1?1:0,we=u-F+r,ye=d-j+r,Ce=f-Z+r,Ee=m-ce+r,Re=u-he+2*r,Ne=d-ue+2*r,be=f-de+2*r,Ue=m-_+2*r,Ae=u-I+3*r,Oe=d-z+3*r,Ve=f-k+3*r,_e=m-Be+3*r,Ie=u-1+4*r,ze=d-1+4*r,ke=f-1+4*r,Le=m-1+4*r,J=U&255,ee=A&255,te=x&255,ie=M&255,tt=n[J+n[ee+n[te+n[ie]]]]%32,it=n[J+F+n[ee+j+n[te+Z+n[ie+ce]]]]%32,at=n[J+he+n[ee+ue+n[te+de+n[ie+_]]]]%32,st=n[J+I+n[ee+z+n[te+k+n[ie+Be]]]]%32,ot=n[J+1+n[ee+1+n[te+1+n[ie+1]]]]%32;let ae=.6-u*u-d*d-f*f-m*m;ae<0?g=0:(ae*=ae,g=ae*ae*this.dot4(o[tt],u,d,f,m));let se=.6-we*we-ye*ye-Ce*Ce-Ee*Ee;se<0?h=0:(se*=se,h=se*se*this.dot4(o[it],we,ye,Ce,Ee));let oe=.6-Re*Re-Ne*Ne-be*be-Ue*Ue;oe<0?P=0:(oe*=oe,P=oe*oe*this.dot4(o[at],Re,Ne,be,Ue));let ne=.6-Ae*Ae-Oe*Oe-Ve*Ve-_e*_e;ne<0?v=0:(ne*=ne,v=ne*ne*this.dot4(o[st],Ae,Oe,Ve,_e));let re=.6-Ie*Ie-ze*ze-ke*ke-Le*Le;return re<0?D=0:(re*=re,D=re*re*this.dot4(o[ot],Ie,ze,ke,Le)),27*(g+h+P+v+D)}}const me={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new Te},cameraProjectionMatrix:{value:new B},cameraInverseProjectionMatrix:{value:new B},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == 1.0 ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background
				
			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},pe={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ve={uniforms:{tDiffuse:{value:null},resolution:{value:new Te}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class L extends Qe{constructor(e,t,i,a,o=32){super(),this.width=i!==void 0?i:512,this.height=a!==void 0?a:512,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=new Map,this.generateSampleKernel(o),this.generateRandomKernelRotations();const s=new We;s.format=qe,s.type=Xe,this.normalRenderTarget=new Se(this.width,this.height,{minFilter:De,magFilter:De,type:Pe,depthTexture:s}),this.ssaoRenderTarget=new Se(this.width,this.height,{type:Pe}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new O({defines:Object.assign({},me.defines),uniforms:V.clone(me.uniforms),vertexShader:me.vertexShader,fragmentShader:me.fragmentShader,blending:C}),this.ssaoMaterial.defines.KERNEL_SIZE=o,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new Ke,this.normalMaterial.blending=C,this.blurMaterial=new O({defines:Object.assign({},ve.defines),uniforms:V.clone(ve.uniforms),vertexShader:ve.vertexShader,fragmentShader:ve.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new O({defines:Object.assign({},pe.defines),uniforms:V.clone(pe.uniforms),vertexShader:pe.vertexShader,fragmentShader:pe.fragmentShader,blending:C}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new O({uniforms:V.clone(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Ze,blendDst:G,blendEquation:H,blendSrcAlpha:je,blendDstAlpha:G,blendEquationAlpha:H}),this.fsQuad=new $e(null),this.originalClearColor=new He}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}render(e,t,i){switch(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this.renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this.renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case L.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case L.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case L.OUTPUT.Depth:this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case L.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case L.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Ye,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}renderPass(e,t,i,a,o){e.getClearColor(this.originalClearColor);const s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,a!=null&&(e.setClearColor(a),e.setClearAlpha(o||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(s)}renderOverride(e,t,i,a,o){e.getClearColor(this.originalClearColor);const s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,a=t.clearColor||a,o=t.clearAlpha||o,a!=null&&(e.setClearColor(a),e.setClearAlpha(o||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(s)}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}generateSampleKernel(e){const t=this.kernel;for(let i=0;i<e;i++){const a=new le;a.x=Math.random()*2-1,a.y=Math.random()*2-1,a.z=Math.random(),a.normalize();let o=i/e;o=lt.lerp(.1,1,o*o),a.multiplyScalar(o),t.push(a)}}generateRandomKernelRotations(){const i=new Je,a=4*4,o=new Float32Array(a);for(let s=0;s<a;s++){const n=Math.random()*2-1,c=Math.random()*2-1,r=0;o[s]=i.noise3d(n,c,r)}this.noiseTexture=new Ge(o,4,4,nt,rt),this.noiseTexture.wrapS=q,this.noiseTexture.wrapT=q,this.noiseTexture.needsUpdate=!0}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){t.set(i,i.visible),(i.isPoints||i.isLine)&&(i.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){const a=t.get(i);i.visible=a}),t.clear()}}L.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const ge={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Te},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new B},cameraProjectionMatrixInverse:{value:new B},cameraWorldMatrix:{value:new B},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new le(-1,-1,-1)},sceneBoxMax:{value:new le(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},xe={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Fe={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function Tt(l=5){const e=Math.floor(l)%2===0?Math.floor(l)+1:Math.floor(l),t=wt(e),i=t.length,a=new Uint8Array(i*4);for(let s=0;s<i;++s){const n=t[s],c=2*Math.PI*n/i,r=new le(Math.cos(c),Math.sin(c),0).normalize();a[s*4]=(r.x*.5+.5)*255,a[s*4+1]=(r.y*.5+.5)*255,a[s*4+2]=127,a[s*4+3]=255}const o=new Ge(a,e,e);return o.wrapS=q,o.wrapT=q,o.needsUpdate=!0,o}function wt(l){const e=Math.floor(l)%2===0?Math.floor(l)+1:Math.floor(l),t=e*e,i=Array(t).fill(0);let a=Math.floor(e/2),o=e-1;for(let s=1;s<=t;){if(a===-1&&o===e?(o=e-2,a=0):(o===e&&(o=0),a<0&&(a=e-1)),i[a*e+o]!==0){o-=2,a++;continue}else i[a*e+o]=s++;o++,a--}return i}const Me={defines:{SAMPLES:16,SAMPLE_VECTORS:et(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new Te},cameraProjectionMatrixInverse:{value:new B},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function et(l,e,t){const i=yt(l,e,t);let a="vec3[SAMPLES](";for(let o=0;o<l;o++){const s=i[o];a+=`vec3(${s.x}, ${s.y}, ${s.z})${o<l-1?",":")"}`}return a}function yt(l,e,t){const i=[];for(let a=0;a<l;a++){const o=2*Math.PI*e*a/l,s=Math.pow(a/(l-1),t);i.push(new le(Math.cos(o),Math.sin(o),s))}return i}class N extends Qe{constructor(e,t,i,a,o,s,n){super(),this.width=i!==void 0?i:512,this.height=a!==void 0?a:512,this.clear=!0,this.camera=t,this.scene=e,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Tt(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Se(this.width,this.height,{type:Pe}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new O({defines:Object.assign({},ge.defines),uniforms:V.clone(ge.uniforms),vertexShader:ge.vertexShader,fragmentShader:ge.fragmentShader,blending:C,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ke,this.normalMaterial.blending=C,this.pdMaterial=new O({defines:Object.assign({},Me.defines),uniforms:V.clone(Me.uniforms),vertexShader:Me.vertexShader,fragmentShader:Me.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new O({defines:Object.assign({},xe.defines),uniforms:V.clone(xe.uniforms),vertexShader:xe.vertexShader,fragmentShader:xe.fragmentShader,blending:C}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new O({uniforms:V.clone(W.uniforms),vertexShader:W.vertexShader,fragmentShader:W.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Ze,blendDst:G,blendEquation:H,blendSrcAlpha:je,blendDstAlpha:G,blendEquationAlpha:H}),this.blendMaterial=new O({uniforms:V.clone(Fe.uniforms),vertexShader:Fe.vertexShader,fragmentShader:Fe.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ye,blendSrc:Ze,blendDst:G,blendEquation:H,blendSrcAlpha:je,blendDstAlpha:G,blendEquationAlpha:H}),this.fsQuad=new $e(null),this.originalClearColor=new He,this.setGBuffer(o?o.depthTexture:void 0,o?o.normalTexture:void 0),s!==void 0&&this.updateGtaoMaterial(s),n!==void 0&&this.updatePdMaterial(n)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(e,t){e!==void 0?(this.depthTexture=e,this.normalTexture=t,this._renderGBuffer=!1):(this.depthTexture=new We,this.depthTexture.format=qe,this.depthTexture.type=Xe,this.normalRenderTarget=new Se(this.width,this.height,{minFilter:De,magFilter:De,type:Pe,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const i=this.normalTexture?1:0,a=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=a,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=a,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(e){e?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(e.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(e.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(e){e.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=e.radius),e.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=e.distanceExponent),e.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=e.thickness),e.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=e.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),e.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=e.scale),e.samples!==void 0&&e.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=e.samples,this.gtaoMaterial.needsUpdate=!0),e.screenSpaceRadius!==void 0&&(e.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=e.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(e){let t=!1;e.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=e.lumaPhi),e.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=e.depthPhi),e.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=e.normalPhi),e.radius!==void 0&&e.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=e.radius),e.radiusExponent!==void 0&&e.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=e.radiusExponent,t=!0),e.rings!==void 0&&e.rings!==this.pdRings&&(this.pdRings=e.rings,t=!0),e.samples!==void 0&&e.samples!==this.pdSamples&&(this.pdSamples=e.samples,t=!0),t&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=et(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(e,t,i){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(e,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(e,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case N.OUTPUT.Off:break;case N.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case N.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case N.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case N.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:t);break;case N.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t);break;case N.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=C,this.renderPass(e,this.copyMaterial,this.renderToScreen?null:t),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(e,this.blendMaterial,this.renderToScreen?null:t);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(e,t,i,a,o){e.getClearColor(this.originalClearColor);const s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,a!=null&&(e.setClearColor(a),e.setClearAlpha(o||0),e.clear()),this.fsQuad.material=t,this.fsQuad.render(e),e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(s)}renderOverride(e,t,i,a,o){e.getClearColor(this.originalClearColor);const s=e.getClearAlpha(),n=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,a=t.clearColor||a,o=t.clearAlpha||o,a!=null&&(e.setClearColor(a),e.setClearAlpha(o||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=n,e.setClearColor(this.originalClearColor),e.setClearAlpha(s)}setSize(e,t){this.width=e,this.height=t,this.gtaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.pdRenderTarget.setSize(e,t),this.gtaoMaterial.uniforms.resolution.value.set(e,t),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(e,t),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){t.set(i,i.visible),(i.isPoints||i.isLine)&&(i.visible=!1)})}restoreVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){const a=t.get(i);i.visible=a}),t.clear()}generateNoise(e=64){const t=new Je,i=e*e*4,a=new Uint8Array(i);for(let s=0;s<e;s++)for(let n=0;n<e;n++){const c=s,r=n;a[(s*e+n)*4]=(t.noise(c,r)*.5+.5)*255,a[(s*e+n)*4+1]=(t.noise(c+e,r)*.5+.5)*255,a[(s*e+n)*4+2]=(t.noise(c,r+e)*.5+.5)*255,a[(s*e+n)*4+3]=(t.noise(c+e,r+e)*.5+.5)*255}const o=new Ge(a,e,e,ct,ht);return o.wrapS=q,o.wrapT=q,o.needsUpdate=!0,o}}N.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};function Ct(l){l.background=new He(10134445),l.add(new ut(16777215,9076848,2.2));const e=new dt(16777215,.6);e.position.set(4,6,3),l.add(e);const t=new ft({color:14210252,roughness:.9}),i=(s,n,c,r,g=0)=>{const h=new gt(s,t);return h.position.set(n,c,r),h.rotation.y=g,l.add(h),h};i(new fe(12,.2,12),0,-.1,0),i(new fe(12,5,.2),0,2.5,-3),i(new fe(.2,5,12),-3,2.5,0);const a=Dt(5);for(let s=0;s<14;s++){const n=.3+a()*.7;i(new fe(n,n,n),-2.5+a()*3.6,n/2+(s>9?.9:0),-2.5+a()*3.6,a()*3)}for(let s=0;s<4;s++)i(new mt(.15,.15,3,24),1.5+s*.45,1.5,-2.6);const o=i(new pt(.45,.16,160,24),1.2,.75,.8);return i(new vt(.5,32,16),-.4,.5,1.4),s=>o.rotation.y=s*.4}function Et(l,e){return Pt(l,{antialias:!1,cam:[4.5,3,5.5],target:[-.5,.8,-.5]},({scene:t,camera:i,renderer:a})=>{const o=Ct(t);if(e==="none")return{update:(h,P)=>(o(P),l.hud("AO 없음: 반구광이 모든 곳에 균일"))};const s=new xt(a);s.addPass(new Mt(t,i));let n=null,c=null;e==="ssao"?(n=new L(t,i,1,1,32),s.addPass(n)):(c=new N(t,i,1,1),c.output=e==="buffer"?N.OUTPUT.Denoise:N.OUTPUT.Default,s.addPass(c)),s.addPass(new St);const r=()=>{const h=l.params.num("radius",1.2);n&&(n.kernelRadius=h*1.6,n.minDistance=.001,n.maxDistance=.08),c&&(c.updateGtaoMaterial({radius:h,distanceExponent:1,thickness:1,scale:1,samples:16}),c.blendIntensity=l.params.num("intensity",1))};r();const g=l.params.on(r);return{update(h,P){o(P),l.hud(e==="ssao"?`SSAO (법선 반구 커널 32개) · 반경 ${l.params.num("radius",1.2)}`:e==="gtao"?"GTAO · 16샘플 + 디노이즈":"AO 버퍼 (흰색 = 열림, 검정 = 막힘)")},render:()=>s.render(),resize(h,P,v){s.setPixelRatio(v),s.setSize(h,P)},dispose(){g(),s.dispose()}}})}const Rt=[{mode:"none",title:"AO 없음",kind:"before",caption:"하늘에서 오는 앰비언트가 상자 사이 틈, 벽 모서리, 바닥 접촉부까지 똑같이 들어가 물체가 떠 보이고 형태가 납작하다."},{mode:"ssao",title:"SSAO (반구 샘플링)",kind:"variant",caption:"픽셀 주변 반구에 무작위 점을 뿌려 깊이 버퍼보다 뒤에 있는(가려진) 비율을 센다. 반경을 키우면 넓게 어두워지고 후광이 생긴다."},{mode:"gtao",title:"GTAO (지평선 기반)",kind:"after",caption:'방향별로 깊이 버퍼를 따라 걸으며 "지평선 각도"를 찾아 열린 각도를 코사인 가중으로 적분. 같은 샘플 수로 더 정확하고 접촉부가 또렷하다.'},{mode:"buffer",title:"AO 버퍼만",kind:"info",caption:"GTAO 결과만 표시. 모서리·틈·접촉부일수록 어둡다. 이 값을 앰비언트 조명에 곱한다."}],Vt={layout:"compare",intro:"앰비언트 오클루전(AO)은 주변 형상에 막혀 <b>간접광이 덜 들어오는 정도</b>입니다. 방 구석, 물건 사이 틈, 바닥에 닿은 부분이 자연스럽게 어두워져 입체감과 접지감이 생깁니다. 화면 공간 AO는 이미 그려진 <b>깊이 버퍼만으로</b> 주변 가림을 추정해 장면 복잡도와 무관하게 동작합니다.",how:["깊이(+법선) 버퍼를 렌더링한다.","SSAO: 각 픽셀 위치 주변 반구에 커널 점을 놓고 화면에 투영해 깊이 버퍼와 비교, 가려진 점의 비율을 AO로 쓴다.","HBAO/GTAO: 몇 개 방향으로 깊이 버퍼를 따라가며 가장 높이 솟은 지평선 각도를 찾고, 열린 각도를 해석적으로 적분한다.","샘플 수가 적어 생기는 노이즈를 공간 블러(깊이 인식) 또는 TAA로 제거한다.","결과를 간접광(앰비언트·IBL 확산)에만 곱한다. 직접광에 곱하면 그림자와 중복되어 지저분해진다."],pros:["장면 복잡도와 무관한 고정 비용","동적 물체에도 자동으로 동작","입체감·접지감이 크게 향상"],cons:["화면 밖·가려진 물체는 고려 못 함 (화면 가장자리에서 AO가 사라짐)","깊이만 보므로 얇은 물체 뒤를 막혔다고 착각 (후광 현상)","반경이 크면 비용·노이즈 증가"],usedIn:"Crysis(2007, CryEngine 2 — 최초로 널리 알려진 SSAO), HBAO·HBAO+(NVIDIA), GTAO(Activision, 2016), UE 후처리 AO, Unity URP SSAO·HDRP(GTAO 계열), Intel XeGTAO·AMD CACAO 공개 구현.",controls:[{type:"range",key:"radius",label:"AO 반경",min:.1,max:3,step:.05,value:1.2},{type:"range",key:"intensity",label:"GTAO 세기",min:0,max:1,step:.05,value:1}],viewers:Rt.map(l=>({title:l.title,kind:l.kind,caption:l.caption,mount:e=>Et(e,l.mode)}))};export{Ct as buildClutter,Vt as default};
