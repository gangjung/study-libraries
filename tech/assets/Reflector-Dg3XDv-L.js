import{M as A,q as B,p as R,l as k,g as c,aB as W,aQ as P,r as z,s as H,u as q,U as I}from"./three.module-BZgG6AUv.js";class w extends A{constructor(S,o={}){super(S),this.isReflector=!0,this.type="Reflector",this.camera=new B;const l=this,U=o.color!==void 0?new R(o.color):new R(8355711),_=o.textureWidth||512,F=o.textureHeight||512,T=o.clipBias||0,u=o.shader||w.ReflectorShader,j=o.multisample!==void 0?o.multisample:4,s=new k,n=new c,i=new c,M=new c,d=new W,v=new c(0,0,-1),r=new P,m=new c,b=new c,f=new P,p=new W,t=this.camera,g=new z(_,F,{samples:j,type:H}),h=new q({name:u.name!==void 0?u.name:"unspecified",uniforms:I.clone(u.uniforms),fragmentShader:u.fragmentShader,vertexShader:u.vertexShader});h.uniforms.tDiffuse.value=g.texture,h.uniforms.color.value=U,h.uniforms.textureMatrix.value=p,this.material=h,this.onBeforeRender=function(e,C,x){if(i.setFromMatrixPosition(l.matrixWorld),M.setFromMatrixPosition(x.matrixWorld),d.extractRotation(l.matrixWorld),n.set(0,0,1),n.applyMatrix4(d),m.subVectors(i,M),m.dot(n)>0)return;m.reflect(n).negate(),m.add(i),d.extractRotation(x.matrixWorld),v.set(0,0,-1),v.applyMatrix4(d),v.add(M),b.subVectors(i,v),b.reflect(n).negate(),b.add(i),t.position.copy(m),t.up.set(0,1,0),t.up.applyMatrix4(d),t.up.reflect(n),t.lookAt(b),t.far=x.far,t.updateMatrixWorld(),t.projectionMatrix.copy(x.projectionMatrix),p.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),p.multiply(t.projectionMatrix),p.multiply(t.matrixWorldInverse),p.multiply(l.matrixWorld),s.setFromNormalAndCoplanarPoint(n,i),s.applyMatrix4(t.matrixWorldInverse),r.set(s.normal.x,s.normal.y,s.normal.z,s.constant);const a=t.projectionMatrix;f.x=(Math.sign(r.x)+a.elements[8])/a.elements[0],f.y=(Math.sign(r.y)+a.elements[9])/a.elements[5],f.z=-1,f.w=(1+a.elements[10])/a.elements[14],r.multiplyScalar(2/r.dot(f)),a.elements[2]=r.x,a.elements[6]=r.y,a.elements[10]=r.z+1-T,a.elements[14]=r.w,l.visible=!1;const D=e.getRenderTarget(),O=e.xr.enabled,V=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(g),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(C,t),e.xr.enabled=O,e.shadowMap.autoUpdate=V,e.setRenderTarget(D);const y=x.viewport;y!==void 0&&e.state.viewport(y),l.visible=!0},this.getRenderTarget=function(){return g},this.dispose=function(){g.dispose(),l.material.dispose()}}}w.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};export{w as R};
