import{g as l,aB as u,aO as p,D as G,m as W,aP as V,k as B,p as X,H as j,u as $,aQ as Z,G as q,e as K,M as m,P as Q,B as y,as as J,b as P}from"./three.module-BZgG6AUv.js";import{m as Y}from"./three-viewer-0rZIEDzf.js";import{a as ee}from"./canvas-viewer-Btf0JXdr.js";const D=new u;class w{constructor(e){e=e||{},this.zNear=e.webGL===!0?-1:0,this.vertices={near:[new l,new l,new l,new l],far:[new l,new l,new l,new l]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4)}setFromProjectionMatrix(e,i){const a=this.zNear,o=e.elements[2*4+3]===0;return D.copy(e).invert(),this.vertices.near[0].set(1,1,a),this.vertices.near[1].set(1,-1,a),this.vertices.near[2].set(-1,-1,a),this.vertices.near[3].set(-1,1,a),this.vertices.near.forEach(function(t){t.applyMatrix4(D)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(t){t.applyMatrix4(D);const s=Math.abs(t.z);o?t.z*=Math.min(i/s,1):t.multiplyScalar(Math.min(i/s,1))}),this.vertices}split(e,i){for(;e.length>i.length;)i.push(new w);i.length=e.length;for(let a=0;a<e.length;a++){const o=i[a];if(a===0)for(let t=0;t<4;t++)o.vertices.near[t].copy(this.vertices.near[t]);else for(let t=0;t<4;t++)o.vertices.near[t].lerpVectors(this.vertices.near[t],this.vertices.far[t],e[a-1]);if(a===e.length-1)for(let t=0;t<4;t++)o.vertices.far[t].copy(this.vertices.far[t]);else for(let t=0;t<4;t++)o.vertices.far[t].lerpVectors(this.vertices.near[t],this.vertices.far[t],e[a])}}toSpace(e,i){for(let a=0;a<4;a++)i.vertices.near[a].copy(this.vertices.near[a]).applyMatrix4(e),i.vertices.far[a].copy(this.vertices.far[a]).applyMatrix4(e)}}const A={lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
 	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

  		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	float linearDepth = (vViewPosition.z) / (shadowFar - cameraNear);
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#if defined( USE_SHADOWMAP ) && defined( CSM_FADE )
		vec2 cascade;
		float cascadeCenter;
		float closestEdge;
		float margin;
		float csmx;
		float csmy;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
				// NOTE: Depth gets larger away from the camera.
				// cascade.x is closer, cascade.y is further
				cascade = CSM_cascades[ i ];
				cascadeCenter = ( cascade.x + cascade.y ) / 2.0;
				closestEdge = linearDepth < cascadeCenter ? cascade.x : cascade.y;
				margin = 0.25 * pow( closestEdge, 2.0 );
				csmx = cascade.x - margin / 2.0;
				csmy = cascade.y + margin / 2.0;
				if( linearDepth >= csmx && ( linearDepth < csmy || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 ) ) {

					float dist = min( linearDepth - csmx, csmy - linearDepth );
					float ratio = clamp( dist / margin, 0.0, 1.0 );

					vec3 prevColor = directLight.color;
					directionalLightShadow = directionalLightShadows[ i ];
					directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

					bool shouldFadeLastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth > cascadeCenter;
					directLight.color = mix( prevColor, directLight.color, shouldFadeLastCascade ? ratio : 1.0 );

					ReflectedLight prevLight = reflectedLight;
					RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

					bool shouldBlend = UNROLLED_LOOP_INDEX != CSM_CASCADES - 1 || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth < cascadeCenter;
					float blendRatio = shouldBlend ? ratio : 1.0;

					reflectedLight.directDiffuse = mix( prevLight.directDiffuse, reflectedLight.directDiffuse, blendRatio );
					reflectedLight.directSpecular = mix( prevLight.directSpecular, reflectedLight.directSpecular, blendRatio );
					reflectedLight.indirectDiffuse = mix( prevLight.indirectDiffuse, reflectedLight.indirectDiffuse, blendRatio );
					reflectedLight.indirectSpecular = mix( prevLight.indirectSpecular, reflectedLight.indirectSpecular, blendRatio );

				}
			#endif

		}
		#pragma unroll_loop_end
	#elif defined (USE_SHADOWMAP)

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )

				directionalLightShadow = directionalLightShadows[ i ];
				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y) directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && (linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1)) RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

			#endif

		}
		#pragma unroll_loop_end

	#elif ( NUM_DIR_LIGHT_SHADOWS > 0 )
		// note: no loop here - all CSM lights are in fact one light only
		getDirectionalLightInfo( directionalLights[0], directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

	#if ( NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS)
		// compute the lights not casting shadows (if any)

		#pragma unroll_loop_start
		for ( int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];

			getDirectionalLightInfo( directionalLight, directLight );

			RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

		}
		#pragma unroll_loop_end

	#endif

#endif


#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,lights_pars_begin:`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 CSM_cascades[CSM_CASCADES];
uniform float cameraNear;
uniform float shadowFar;
#endif
	`+p.lights_pars_begin},U=new u,M=new w({webGL:!0}),g=new l,S=new V,v=[],C=[],I=new u,x=new u,ie=new l(0,1,0);class te{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new l(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new w({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this.createLights(),this.updateFrustums(),this.injectInclude()}createLights(){for(let e=0;e<this.cascades;e++){const i=new G(16777215,this.lightIntensity);i.castShadow=!0,i.shadow.mapSize.width=this.shadowMapSize,i.shadow.mapSize.height=this.shadowMapSize,i.shadow.camera.near=this.lightNear,i.shadow.camera.far=this.lightFar,i.shadow.bias=this.shadowBias,this.parent.add(i),this.parent.add(i.target),this.lights.push(i)}}initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}updateShadowBounds(){const e=this.frustums;for(let i=0;i<e.length;i++){const o=this.lights[i].shadow.camera,t=this.frustums[i],s=t.vertices.near,r=t.vertices.far,c=r[0];let h;c.distanceTo(r[2])>c.distanceTo(s[2])?h=r[2]:h=s[2];let d=c.distanceTo(h);if(this.fade){const f=this.camera,O=Math.max(f.far,this.maxFar),k=t.vertices.far[0].z/(O-f.near),z=.25*Math.pow(k,2)*(O-f.near);d+=z}o.left=-d/2,o.right=d/2,o.top=d/2,o.bottom=-d/2,o.updateProjectionMatrix()}}getBreaks(){const e=this.camera,i=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":a(this.cascades,e.near,i,this.breaks);break;case"logarithmic":o(this.cascades,e.near,i,this.breaks);break;case"practical":t(this.cascades,e.near,i,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,i,this.breaks);break}function a(s,r,c,h){for(let d=1;d<s;d++)h.push((r+(c-r)*d/s)/c);h.push(1)}function o(s,r,c,h){for(let d=1;d<s;d++)h.push(r*(c/r)**(d/s)/c);h.push(1)}function t(s,r,c,h,d){v.length=0,C.length=0,o(s,r,c,C),a(s,r,c,v);for(let f=1;f<s;f++)d.push(W.lerp(v[f-1],C[f-1],h));d.push(1)}}update(){const e=this.camera,i=this.frustums;I.lookAt(new l,this.lightDirection,ie),x.copy(I).invert();for(let a=0;a<i.length;a++){const o=this.lights[a],t=o.shadow.camera,s=(t.right-t.left)/this.shadowMapSize,r=(t.top-t.bottom)/this.shadowMapSize;U.multiplyMatrices(x,e.matrixWorld),i[a].toSpace(U,M);const c=M.vertices.near,h=M.vertices.far;S.makeEmpty();for(let d=0;d<4;d++)S.expandByPoint(c[d]),S.expandByPoint(h[d]);S.getCenter(g),g.z=S.max.z+this.lightMargin,g.x=Math.floor(g.x/s)*s,g.y=Math.floor(g.y/r)*r,g.applyMatrix4(I),o.position.copy(g),o.target.position.copy(g),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}injectInclude(){p.lights_fragment_begin=A.lights_fragment_begin,p.lights_pars_begin=A.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const i=[],a=this,o=this.shaders;e.onBeforeCompile=function(t){const s=Math.min(a.camera.far,a.maxFar);a.getExtendedBreaks(i),t.uniforms.CSM_cascades={value:i},t.uniforms.cameraNear={value:a.camera.near},t.uniforms.shadowFar={value:s},o.set(e,t)},o.set(e,null)}updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(a,o){if(a!==null){const t=a.uniforms;this.getExtendedBreaks(t.CSM_cascades.value),t.cameraNear.value=this.camera.near,t.shadowFar.value=e}!this.fade&&"CSM_FADE"in o.defines?(delete o.defines.CSM_FADE,o.needsUpdate=!0):this.fade&&!("CSM_FADE"in o.defines)&&(o.defines.CSM_FADE="",o.needsUpdate=!0)},this)}getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new B);e.length=this.breaks.length;for(let i=0;i<this.cascades;i++){const a=this.breaks[i],o=this.breaks[i-1]||0;e[i].x=o,e[i].y=a}}updateFrustums(){this.getBreaks(),this.initCascades(),this.updateShadowBounds(),this.updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(i,a){delete a.onBeforeCompile,delete a.defines.USE_CSM,delete a.defines.CSM_CASCADES,delete a.defines.CSM_FADE,i!==null&&(delete i.uniforms.CSM_cascades,delete i.uniforms.cameraNear,delete i.uniforms.shadowFar),a.needsUpdate=!0}),e.clear()}}const N=new l(-1,-.65,.35).normalize(),L=120,b={begin:p.lights_fragment_begin,pars:p.lights_pars_begin};let _=0;function T(n){return _++,new te(n)}function H(n){n.dispose(),_=Math.max(0,_-1),_===0&&(p.lights_fragment_begin=b.begin,p.lights_pars_begin=b.pars)}function R(n,e){const i=n.params.str("split","practical");e.mode!==i&&(e.mode=i,e.updateFrustums())}const F=n=>n.map(e=>(e*L).toFixed(1)+"m").join(" / "),ae=`
uniform vec4 splits; varying float vDepth; varying vec3 vW;
void main(){
  float d = vDepth / ${L.toFixed(1)};
  vec3 c = d < splits.x ? vec3(1., .35, .35) : d < splits.y ? vec3(.35, 1., .45) : d < splits.z ? vec3(.4, .55, 1.) : d < splits.w ? vec3(1., .85, .3) : vec3(.3);
  float k = mod(floor(vW.x) + floor(vW.z), 2.) * .15 + .75;
  gl_FragColor = vec4(c * k, 1.);
  #include <colorspace_fragment>
}`,oe="varying float vDepth; varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.); vW = w.xyz; vec4 v = viewMatrix * w; vDepth = -v.z; gl_Position = projectionMatrix * v; }";function E(n,e){const i=new m(new Q(300,300),e(10133642));i.rotation.x=-Math.PI/2,i.receiveShadow=!0,n.add(i);const a=ee(12);for(let t=4;t>-150;t-=3){for(const s of[-1,1]){const r=new m(new y(.25,3,.25),e(14540253));r.position.set(s*4,1.5,t),r.castShadow=r.receiveShadow=!0,n.add(r)}if(a()<.5){const s=new m(new J(.9,2.6,8),e(3832384));s.position.set((a()<.5?-1:1)*(5.5+a()*5),1.3,t),s.castShadow=s.receiveShadow=!0,n.add(s)}}const o=new m(new y(1.6,1,3.2),e(13647936));o.position.set(1.2,.5,0),o.castShadow=o.receiveShadow=!0,n.add(o)}function re(n,e){return Y(n,{antialias:!0,cam:[0,2.2,8],target:[0,1,-20],fov:55,far:300},({scene:i,camera:a,renderer:o})=>{if(i.background=new X(11060448),i.add(new j(13623551,5263424,1.2)),e==="viz"){const r=new $({uniforms:{splits:{value:new Z}},vertexShader:oe,fragmentShader:ae});E(i,()=>r);const c=T({maxFar:L,cascades:4,mode:"practical",parent:new q,shadowMapSize:256,lightDirection:N,camera:a});return{update(){R(n,c),c.updateFrustums();const h=c.breaks;r.uniforms.splits.value.set(h[0],h[1],h[2],h[3]),n.hud(`분할 (${c.mode}): ${F(h)}`)},dispose:()=>H(c)}}if(o.shadowMap.enabled=!0,o.shadowMap.type=K,e==="csm"){const r=T({maxFar:L,cascades:4,mode:"practical",parent:i,shadowMapSize:1024,lightDirection:N,lightIntensity:2.5,camera:a});return E(i,c=>{const h=new P({color:c,roughness:.9});return r.setupMaterial(h),h}),{update(){R(n,r),a.updateMatrixWorld(),r.update(),n.hud(`캐스케이드 4개 × 1024² · 구간 끝 ${F(r.breaks)}`)},resize:()=>r.updateFrustums(),dispose:()=>{r.remove(),H(r)}}}const t=new G(16777215,2.5);t.castShadow=!0,t.shadow.mapSize.set(1024,1024);const s=e==="wide"?80:12;return Object.assign(t.shadow.camera,{left:-s,right:s,top:s,bottom:-s,near:1,far:200}),t.shadow.bias=-5e-4,i.add(t,t.target),E(i,r=>new P({color:r,roughness:.9})),{update(){const r=new l(0,0,e==="wide"?-60:-6);t.target.position.copy(r),t.position.copy(r).addScaledVector(N,-60),n.hud(`섀도 맵 1장 × 1024² · 범위 ${s*2}m × ${s*2}m · 텍셀 ${(s*2/1024*100).toFixed(1)}cm`)}}})}const se=[{mode:"wide",title:"섀도 맵 1장 · 넓은 범위",kind:"before",caption:"160m를 한 장에 담으면 텍셀 하나가 16cm. 먼 곳까지 그림자가 있지만 발밑의 자동차·기둥 그림자가 뭉개진다."},{mode:"narrow",title:"섀도 맵 1장 · 좁은 범위",kind:"variant",caption:"24m만 담으면 가까운 그림자는 선명하지만 그 너머의 기둥과 나무는 그림자가 아예 없다."},{mode:"csm",title:"캐스케이드 섀도 맵 (4단계)",kind:"after",caption:"카메라 절두체를 거리별로 4구간으로 나눠 구간마다 섀도 맵을 따로 쓴다. 가까운 곳은 촘촘하게, 먼 곳은 넓게 — 화면에서 보이는 텍셀 밀도가 고르게 된다."},{mode:"viz",title:"캐스케이드 구간",kind:"info",caption:'빨강·초록·파랑·노랑 = 1~4번 캐스케이드. 기본값은 로그 분할과 균등 분할을 반씩 섞은 실용 분할로, 가까울수록 구간이 짧다. "분할 방식"을 바꿔 비교해 보자.'}],de={layout:"variants",intro:"태양처럼 장면 전체를 비추는 방향광의 그림자를 섀도 맵 한 장에 담으면, 넓이와 해상도를 동시에 만족할 수 없습니다. <b>캐스케이드 섀도 맵(CSM)</b>은 카메라 시야를 거리별 구간으로 나누고 구간마다 별도의 섀도 맵을 씁니다. 원근 투영 때문에 가까운 곳이 화면에서 크게 보이므로, 가까운 구간에 해상도를 집중하는 것이 효율적입니다.",how:["카메라 절두체를 near~far 사이 N개 구간으로 나눈다. 분할 = λ·로그 분할 + (1−λ)·균등 분할.","구간마다 그 부분 절두체를 감싸는 광원 공간 직교 투영을 계산해 섀도 맵을 렌더링한다.","텍셀 크기 단위로 투영을 스냅해 카메라가 움직일 때 그림자 경계가 떨리지 않게 한다 (shimmering 방지).","셰이딩: 픽셀의 뷰 깊이로 캐스케이드를 고르고 해당 맵으로 판정. 경계는 두 캐스케이드를 블렌딩.","먼 캐스케이드는 몇 프레임에 한 번만 갱신해 비용을 아낀다."],pros:["넓은 실외에서 가까운 그림자는 선명, 먼 그림자도 유지","표준적이고 하드웨어 친화적"],cons:["캐스케이드 수만큼 장면을 여러 번 렌더 (드로우 콜 증가)","캐스케이드 경계에서 품질이 갑자기 바뀜","흔들림 방지·바이어스 튜닝이 까다로움"],usedIn:"실외가 넓은 대부분의 3D 게임의 태양 그림자. UE의 Cascaded Shadow Maps(UE5 기본은 Virtual Shadow Maps), Unity Shadow Cascades, Godot DirectionalLight3D의 PSSM 2/4 Splits.",controls:[{type:"select",key:"split",label:"분할 방식",options:[{label:"실용 분할 (λ=0.5)",value:"practical"},{label:"균등 분할",value:"uniform"},{label:"로그 분할",value:"logarithmic"}],value:"practical"}],viewers:se.map(n=>({title:n.title,kind:n.kind,caption:n.caption,mount:e=>re(e,n.mode)}))};export{de as default};
