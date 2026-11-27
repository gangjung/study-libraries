import{M,w as K,g as F,b9 as Q,K as U,a8 as Z,k as R,p as y,ba as ee,aQ as te,ah as O,a3 as oe,bb as ie,bc as j,H as ne,a6 as ae,S as se,b as J,B as re,P as le,r as z,s as A,u as E,ae as ce,n as ue}from"./three.module-BZgG6AUv.js";import{F as I}from"./Pass-By1_TgQk.js";import{m as ve}from"./three-viewer-0rZIEDzf.js";import{Q as _}from"./glsl-DOwCk4-f.js";class V extends M{constructor(){super(V.Geometry,new K({opacity:0,transparent:!0})),this.isLensflare=!0,this.type="Lensflare",this.frustumCulled=!1,this.renderOrder=1/0;const t=new F,e=new F,u=new Q(16,16),o=new Q(16,16);let l=O;const v=V.Geometry,w=new U({uniforms:{scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;

				void main() {

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				void main() {

					gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );

				}`,depthTest:!0,depthWrite:!1,transparent:!1}),b=new U({uniforms:{map:{value:u},scale:{value:null},screenPosition:{value:null}},vertexShader:`

				precision highp float;

				uniform vec3 screenPosition;
				uniform vec2 scale;

				attribute vec3 position;
				attribute vec2 uv;

				varying vec2 vUV;

				void main() {

					vUV = uv;

					gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );

				}`,fragmentShader:`

				precision highp float;

				uniform sampler2D map;

				varying vec2 vUV;

				void main() {

					gl_FragColor = texture2D( map, vUV );

				}`,depthTest:!1,depthWrite:!1,transparent:!1}),P=new M(v,w),f=[],d=x.Shader,p=new U({name:d.name,uniforms:{map:{value:null},occlusionMap:{value:o},color:{value:new y(16777215)},scale:{value:new R},screenPosition:{value:new F}},vertexShader:d.vertexShader,fragmentShader:d.fragmentShader,blending:Z,transparent:!0,depthWrite:!1}),k=new M(v,p);this.addElement=function(r){f.push(r)};const g=new R,m=new R,S=new ee,n=new te;this.onBeforeRender=function(r,i,s){r.getCurrentViewport(n);const c=r.getRenderTarget(),h=c!==null?c.texture.type:O;l!==h&&(u.dispose(),o.dispose(),u.type=o.type=h,l=h);const N=n.w/n.z,W=n.z/2,H=n.w/2;let T=16/n.w;if(g.set(T*N,T),S.min.set(n.x,n.y),S.max.set(n.x+(n.z-16),n.y+(n.w-16)),e.setFromMatrixPosition(this.matrixWorld),e.applyMatrix4(s.matrixWorldInverse),!(e.z>0)&&(t.copy(e).applyMatrix4(s.projectionMatrix),m.x=n.x+t.x*W+W-8,m.y=n.y+t.y*H+H-8,S.containsPoint(m))){r.copyFramebufferToTexture(u,m);let D=w.uniforms;D.scale.value=g,D.screenPosition.value=t,r.renderBufferDirect(s,null,v,w,P,null),r.copyFramebufferToTexture(o,m),D=b.uniforms,D.scale.value=g,D.screenPosition.value=t,r.renderBufferDirect(s,null,v,b,P,null);const X=-t.x*2,Y=-t.y*2;for(let G=0,$=f.length;G<$;G++){const C=f[G],B=p.uniforms;B.color.value.copy(C.color),B.map.value=C.texture,B.screenPosition.value.x=t.x+X*C.distance,B.screenPosition.value.y=t.y+Y*C.distance,T=C.size/n.w;const q=n.w/n.z;B.scale.value.set(T*q,T),p.uniformsNeedUpdate=!0,r.renderBufferDirect(s,null,v,p,k,null)}}},this.dispose=function(){w.dispose(),b.dispose(),p.dispose(),u.dispose(),o.dispose();for(let r=0,i=f.length;r<i;r++)f[r].texture.dispose()}}}class x{constructor(t,e=1,u=0,o=new y(16777215)){this.texture=t,this.size=e,this.distance=u,this.color=o}}x.Shader={name:"LensflareElementShader",uniforms:{map:{value:null},occlusionMap:{value:null},color:{value:null},scale:{value:null},screenPosition:{value:null}},vertexShader:`

		precision highp float;

		uniform vec3 screenPosition;
		uniform vec2 scale;

		uniform sampler2D occlusionMap;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vUV = uv;

			vec2 pos = position.xy;

			vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );
			visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );
			visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );

			vVisibility =        visibility.r / 9.0;
			vVisibility *= 1.0 - visibility.g / 9.0;
			vVisibility *=       visibility.b / 9.0;

			gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D map;
		uniform vec3 color;

		varying vec2 vUV;
		varying float vVisibility;

		void main() {

			vec4 texture = texture2D( map, vUV );
			texture.a *= vVisibility;
			gl_FragColor = texture;
			gl_FragColor.rgb *= color;

		}`};V.Geometry=function(){const a=new oe,t=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,1,1,0,1,1,-1,1,0,0,1]),e=new ie(t,5);return a.setIndex([0,1,2,0,2,3]),a.setAttribute("position",new j(e,3,0,!1)),a.setAttribute("uv",new j(e,2,3,!1)),a}();const fe=`
uniform sampler2D t; uniform float thr; varying vec2 vUv;
void main(){ vec3 c = texture2D(t, vUv).rgb; gl_FragColor = vec4(max(c - thr, 0.), 1.); }`,pe=`
uniform sampler2D tBright; uniform float count; uniform float spacing; uniform float halo; uniform float ca;
varying vec2 vUv;
vec3 sampleCA(vec2 uv, vec2 dir){ return vec3(texture2D(tBright, uv + dir * ca).r, texture2D(tBright, uv).g, texture2D(tBright, uv - dir * ca).b); }
void main(){
  vec2 uv = 1. - vUv;
  vec2 gv = (vec2(.5) - uv) * spacing;
  vec2 dir = normalize(gv + 1e-5);
  vec3 acc = vec3(0.);
  for (int i = 0; i < 12; i++){
    if (float(i) >= count) break;
    vec2 o = fract(uv + gv * float(i));
    float w = pow(1. - length(vec2(.5) - o) / .7071, 10.);
    // 고스트마다 다른 색조 (렌즈 코팅 흉내)
    vec3 tint = .5 + .5 * cos(6.283 * (float(i) * .17 + vec3(0., .33, .67)));
    acc += sampleCA(o, dir) * w * tint;
  }
  // 할로: 중심에서 일정 거리 링
  vec2 hv = dir * halo;
  float hw = pow(1. - length(vec2(.5) - fract(uv + hv)) / .7071, 5.);
  acc += sampleCA(fract(uv + hv), dir) * hw;
  gl_FragColor = vec4(acc, 1.);
}`,he=`
uniform sampler2D tScene; uniform sampler2D tGhost; uniform float useGhost; uniform float k;
varying vec2 vUv;
vec3 aces(vec3 x){ return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14), 0., 1.); }
void main(){
  vec3 c = texture2D(tScene, vUv).rgb + texture2D(tGhost, vUv).rgb * useGhost * k;
  gl_FragColor = vec4(aces(c), 1.);
  #include <colorspace_fragment>
}`;function L(a){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");if(a==="glow"){const o=e.createRadialGradient(64,64,0,64,64,64);o.addColorStop(0,"rgba(255,255,240,1)"),o.addColorStop(.2,"rgba(255,220,160,0.6)"),o.addColorStop(1,"rgba(255,180,100,0)"),e.fillStyle=o,e.fillRect(0,0,128,128),e.strokeStyle="rgba(255,240,220,0.5)";for(let l=0;l<6;l++){const v=l/6*Math.PI;e.beginPath(),e.moveTo(64-Math.cos(v)*64,64-Math.sin(v)*64),e.lineTo(64+Math.cos(v)*64,64+Math.sin(v)*64),e.stroke()}}else if(a==="ring")e.strokeStyle="rgba(160,220,255,0.35)",e.lineWidth=6,e.beginPath(),e.arc(64,64,52,0,Math.PI*2),e.stroke();else{e.fillStyle="rgba(255,255,255,0.35)",e.beginPath();for(let o=0;o<6;o++){const l=o/6*Math.PI*2;e[o?"lineTo":"moveTo"](64+Math.cos(l)*56,64+Math.sin(l)*56)}e.fill()}const u=new ce(t);return u.colorSpace=ue,u}function me(a,t){return ve(a,{antialias:!0,cam:[0,1.5,8],target:[0,3,-10],fov:55},({scene:e,camera:u,renderer:o})=>{e.background=new y(.02,.03,.07),e.add(new ne(3359846,1118481,.6));const l=new ae(16772829,3,0,0);e.add(l);const v=new M(new se(.6,24,12),new K({color:new y(30,26,20)}));l.add(v);const w=new J({color:4212824,roughness:.8});for(let i=0;i<7;i++){const s=new M(new re(1.4,2+i%3*2,1.4),w);s.position.set(-7+i*2.4,s.geometry.parameters.height/2,-6),e.add(s)}const b=new M(new le(60,60),new J({color:2106412}));b.rotation.x=-Math.PI/2,e.add(b);const P=[];if(t==="sprite"||t==="both"){const i=L("glow"),s=L("ring"),c=L("hex");P.push(i,s,c);const h=new V;h.addElement(new x(i,140,0,new y(1,.95,.85))),h.addElement(new x(c,30,.4,new y(.5,.8,1))),h.addElement(new x(c,45,.7,new y(.9,.6,1))),h.addElement(new x(s,80,.9)),h.addElement(new x(c,25,1.1,new y(1,.8,.5))),l.add(h)}const f=new z(1,1,{type:A}),d=new z(1,1,{type:A}),p=new z(1,1,{type:A}),k={t:{value:f.texture},thr:{value:2}},g={tBright:{value:d.texture},count:{value:6},spacing:{value:.35},halo:{value:.45},ca:{value:.01}},m={tScene:{value:f.texture},tGhost:{value:p.texture},useGhost:{value:t==="ghosts"||t==="both"?1:0},k:{value:.2}},S=new I(new E({uniforms:k,vertexShader:_,fragmentShader:fe})),n=new I(new E({uniforms:g,vertexShader:_,fragmentShader:pe})),r=new I(new E({uniforms:m,vertexShader:_,fragmentShader:he}));return{update(i,s){l.position.set(Math.sin(s*.25)*9,5+Math.sin(s*.4)*2,-14),g.count.value=a.params.num("ghosts",6),g.spacing.value=a.params.num("spacing",.35),m.k.value=a.params.num("k",.2),a.hud(t==="none"?"플레어 없음":t==="sprite"?"광원 위치 → 화면 중심 직선 위에 스프라이트 배치":t==="ghosts"?`밝은 픽셀을 중심 대칭으로 ${g.count.value}번 반사`:"스프라이트 + 화면 공간 고스트")},render(){o.setRenderTarget(f),o.render(e,u),m.useGhost.value&&(o.setRenderTarget(d),S.render(o),o.setRenderTarget(p),n.render(o)),o.setRenderTarget(null),r.render(o)},resize(i,s,c){f.setSize(Math.floor(i*c),Math.floor(s*c)),d.setSize(Math.floor(i*c/4),Math.floor(s*c/4)),p.setSize(Math.floor(i*c/2),Math.floor(s*c/2))},dispose(){[f,d,p].forEach(i=>i.dispose()),[S,n,r].forEach(i=>i.dispose()),P.forEach(i=>i.dispose())}}})}const de=[{mode:"none",title:"플레어 없음",kind:"before",caption:"매우 밝은 광원이 있어도 렌즈 반응이 없어 CG처럼 깨끗하다."},{mode:"sprite",title:"스프라이트 렌즈 플레어",kind:"variant",caption:"광원의 화면 위치와 화면 중심을 잇는 선 위에 미리 그린 이미지(글로우·육각형·링)를 배치. 광원이 건물 뒤로 가면 가림 검사로 사라진다."},{mode:"ghosts",title:"화면 공간 고스트",kind:"variant",caption:"임계값 넘는 밝은 픽셀을 화면 중심 대칭으로 여러 번 샘플해 고스트를 만든다. 어떤 밝은 물체에서도 자동으로 생기고 모양이 원본을 따른다."},{mode:"both",title:"조합",kind:"after",caption:"광원 전용 스프라이트(스타버스트)와 화면 공간 고스트·할로를 함께. 실제 게임은 여기에 렌즈 먼지 텍스처를 곱한다."}],be={layout:"variants",intro:"밝은 빛이 카메라 렌즈 안의 여러 유리 면 사이에서 반사되면 광원 반대편에 <b>고스트</b>(조리개 모양 상)가 줄지어 생기고, 조리개 날의 회절로 <b>스타버스트</b>가 생깁니다. 게임은 광원마다 스프라이트를 배치하는 고전 방식과, 화면의 밝은 픽셀에서 자동으로 고스트를 만드는 후처리 방식을 씁니다.",how:["스프라이트 방식: 광원의 화면 좌표 P와 화면 중심 C를 잇는 직선 위 여러 지점(P + (C−P)·k)에 플레어 이미지를 그린다.","광원이 가려졌는지 깊이 비교나 오클루전 쿼리로 확인해 페이드한다.","화면 공간 방식: 밝은 픽셀만 추출한 저해상도 버퍼를 화면 중심 대칭(1−uv)으로 뒤집어, 중심 방향으로 일정 간격씩 여러 번 샘플해 더한다.","샘플마다 색조·크기를 바꾸고 RGB를 살짝 어긋나게(색수차) 하며, 블러와 렌즈 먼지 텍스처를 곱해 마무리한다."],pros:["저렴한 비용으로 영화적 분위기","화면 공간 방식은 폭발·네온 등 모든 밝은 것에 자동 적용"],cons:["과하면 시야 방해·인공적인 느낌 (옵션으로 끄는 경우 많음)","사람 눈에는 없는 카메라 현상이라 1인칭에서 어색할 수 있음"],usedIn:'John Chapman "Pseudo Lens Flare"(2013, 화면 공간 고스트), UE 포스트 프로세스 Lens Flares(이미지 기반), Unity SRP Lens Flare 컴포넌트(스프라이트)·Screen Space Lens Flare, 레이싱·SF·밀리터리 슈터 전반(Battlefield 3의 강한 플레어가 유명). 영화의 아나모픽 플레어 연출을 흉내 내기도 함.',controls:[{type:"range",key:"ghosts",label:"고스트 수",min:1,max:12,step:1,value:6},{type:"range",key:"spacing",label:"고스트 간격",min:.05,max:.8,step:.01,value:.35},{type:"range",key:"k",label:"고스트 세기",min:0,max:1,step:.01,value:.2}],viewers:de.map(a=>({title:a.title,kind:a.kind,caption:a.caption,mount:t=>me(t,a.mode)}))};export{be as default};
