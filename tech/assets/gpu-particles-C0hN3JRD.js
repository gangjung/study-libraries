import{N as F,u as R,r as Q,au as B,ag as k,ac as Z,ai as $,p as H,a3 as z,aM as V,aT as W,aU as X,a8 as L,w as Y,M as ee,P as te}from"./three.module-BZgG6AUv.js";import{F as re}from"./Pass-By1_TgQk.js";import{m as ae}from"./three-viewer-0rZIEDzf.js";import{a as ne}from"./canvas-viewer-Btf0JXdr.js";class oe{constructor(f,x,m){this.variables=[],this.currentTextureIndex=0;let h=B;const l={passThruTexture:{value:null}},c=U(T(),l),b=new re(c);this.setDataType=function(a){return h=a,this},this.addVariable=function(a,e,o){const u=this.createShaderMaterial(e),n={name:a,initialValueTexture:o,material:u,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:F,magFilter:F};return this.variables.push(n),n},this.setVariableDependencies=function(a,e){a.dependencies=e},this.init=function(){if(m.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let a=0;a<this.variables.length;a++){const e=this.variables[a];e.renderTargets[0]=this.createRenderTarget(f,x,e.wrapS,e.wrapT,e.minFilter,e.magFilter),e.renderTargets[1]=this.createRenderTarget(f,x,e.wrapS,e.wrapT,e.minFilter,e.magFilter),this.renderTexture(e.initialValueTexture,e.renderTargets[0]),this.renderTexture(e.initialValueTexture,e.renderTargets[1]);const o=e.material,u=o.uniforms;if(e.dependencies!==null)for(let n=0;n<e.dependencies.length;n++){const t=e.dependencies[n];if(t.name!==e.name){let r=!1;for(let d=0;d<this.variables.length;d++)if(t.name===this.variables[d].name){r=!0;break}if(!r)return"Variable dependency not found. Variable="+e.name+", dependency="+t.name}u[t.name]={value:null},o.fragmentShader=`
uniform sampler2D `+t.name+`;
`+o.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const a=this.currentTextureIndex,e=this.currentTextureIndex===0?1:0;for(let o=0,u=this.variables.length;o<u;o++){const n=this.variables[o];if(n.dependencies!==null){const t=n.material.uniforms;for(let r=0,d=n.dependencies.length;r<d;r++){const w=n.dependencies[r];t[w.name].value=w.renderTargets[a].texture}}this.doRenderTarget(n.material,n.renderTargets[e])}this.currentTextureIndex=e},this.getCurrentRenderTarget=function(a){return a.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(a){return a.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){b.dispose();const a=this.variables;for(let e=0;e<a.length;e++){const o=a[e];o.initialValueTexture&&o.initialValueTexture.dispose();const u=o.renderTargets;for(let n=0;n<u.length;n++)u[n].dispose()}};function M(a){a.defines.resolution="vec2( "+f.toFixed(1)+", "+x.toFixed(1)+" )"}this.addResolutionDefine=M;function U(a,e){e=e||{};const o=new R({name:"GPUComputationShader",uniforms:e,vertexShader:v(),fragmentShader:a});return M(o),o}this.createShaderMaterial=U,this.createRenderTarget=function(a,e,o,u,n,t){return a=a||f,e=e||x,o=o||$,u=u||$,n=n||F,t=t||F,new Q(a,e,{wrapS:o,wrapT:u,minFilter:n,magFilter:t,format:k,type:h,depthBuffer:!1})},this.createTexture=function(){const a=new Float32Array(f*x*4),e=new Z(a,f,x,k,B);return e.needsUpdate=!0,e},this.renderTexture=function(a,e){l.passThruTexture.value=a,this.doRenderTarget(c,e),l.passThruTexture.value=null},this.doRenderTarget=function(a,e){const o=m.getRenderTarget(),u=m.xr.enabled,n=m.shadowMap.autoUpdate;m.xr.enabled=!1,m.shadowMap.autoUpdate=!1,b.material=a,m.setRenderTarget(e),b.render(m),b.material=c,m.xr.enabled=u,m.shadowMap.autoUpdate=n,m.setRenderTarget(o)};function v(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function T(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const E=`
vec3 flow(vec3 p, float t){
  float A = 1., B = .8, C = .6;
  vec3 q = p * 1.1 + vec3(t * .1, 0., t * .07);
  return vec3(A * sin(q.z) + C * cos(q.y), B * sin(q.x) + A * cos(q.z), C * sin(q.y) + B * cos(q.x));
}
float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }`,se=`
uniform float time; uniform float dt; uniform float strength;
${E}
void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 p = texture2D(texturePosition, uv);
  vec4 v = texture2D(textureVelocity, uv);
  v.xyz = v.xyz * .96 + flow(p.xyz, time) * dt * strength - p.xyz * dt * .25;
  gl_FragColor = v;
}`,ie=`
uniform float time; uniform float dt;
${E}
void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 p = texture2D(texturePosition, uv);
  vec4 v = texture2D(textureVelocity, uv);
  p.xyz += v.xyz * dt;
  p.w -= dt;
  if (p.w < 0.) {
    // 수명이 끝나면 구 안 무작위 위치에서 다시 태어남
    float a = h12(uv + time) * 6.283, b = acos(h12(uv * 1.7 + time) * 2. - 1.), r = pow(h12(uv * 2.3 - time), .33) * .6;
    p = vec4(r * sin(b) * cos(a), r * cos(b), r * sin(b) * sin(a), 2. + h12(uv * 3.1 + time) * 4.);
  }
  gl_FragColor = p;
}`,le=`
uniform sampler2D posTex; uniform sampler2D velTex; uniform float size;
attribute vec2 ref;
varying vec3 vCol;
void main(){
  vec4 p = texture2D(posTex, ref);
  vec3 v = texture2D(velTex, ref).xyz;
  vCol = mix(vec3(.2, .5, 1.), vec3(1., .5, .2), clamp(length(v) * .6, 0., 1.)) * clamp(p.w, 0., 1.);
  vec4 mv = modelViewMatrix * vec4(p.xyz, 1.);
  gl_PointSize = size / -mv.z;
  gl_Position = projectionMatrix * mv;
}`,ue=`
varying vec3 vCol;
void main(){ vec2 c = gl_PointCoord - .5; if (dot(c, c) > .25) discard; gl_FragColor = vec4(vCol * .35, 1.); }`;function ce(p,f){return ae(p,{antialias:!1,cam:[0,1.5,6],target:[0,0,0]},({scene:x,renderer:m})=>{x.background=new H(329484);const h=ne(3);if(f==="cpu"){const t=new Float32Array(6e4),r=new Float32Array(2e4*3),d=new Float32Array(2e4),w=new Float32Array(2e4*3),D=s=>{const C=h()*6.283,y=Math.acos(h()*2-1),g=Math.cbrt(h())*.6;t[s*3]=g*Math.sin(y)*Math.cos(C),t[s*3+1]=g*Math.cos(y),t[s*3+2]=g*Math.sin(y)*Math.sin(C),r[s*3]=r[s*3+1]=r[s*3+2]=0,d[s]=2+h()*4};for(let s=0;s<2e4;s++)D(s),d[s]=h()*6;const P=new z;P.setAttribute("position",new V(t,3)),P.setAttribute("color",new V(w,3));const j=new W(P,new X({size:.035,vertexColors:!0,blending:L,depthWrite:!1,transparent:!0}));x.add(j);let S=0,A=0;return{update(s){const C=performance.now();A+=s;const y=p.params.num("strength",4);for(let g=0;g<2e4;g++){const i=g*3,N=t[i]*1.1+A*.1,_=t[i+1]*1.1,I=t[i+2]*1.1+A*.07,J=Math.sin(I)+.6*Math.cos(_),O=.8*Math.sin(N)+Math.cos(I),K=.6*Math.sin(_)+.8*Math.cos(N);r[i]=r[i]*.96+J*s*y-t[i]*s*.25,r[i+1]=r[i+1]*.96+O*s*y-t[i+1]*s*.25,r[i+2]=r[i+2]*.96+K*s*y-t[i+2]*s*.25,t[i]+=r[i]*s,t[i+1]+=r[i+1]*s,t[i+2]+=r[i+2]*s,d[g]-=s,d[g]<0&&D(g);const q=Math.min(1,Math.hypot(r[i],r[i+1],r[i+2])*.6),G=Math.min(1,d[g])*.35;w[i]=(.2+.8*q)*G,w[i+1]=.5*G,w[i+2]=(1-.8*q)*G}P.attributes.position.needsUpdate=!0,P.attributes.color.needsUpdate=!0,S=S*.9+(performance.now()-C)*.1,p.hud(`CPU: ${2e4.toLocaleString()}개 · JS 갱신 ${S.toFixed(2)}ms/프레임 + 버퍼 업로드 ${(2e4*24/1024).toFixed(0)}KB`)}}}const l=Number(p.params.str("size","512")),c=new oe(l,l,m),b=c.createTexture(),M=c.createTexture(),U=b.image.data;for(let n=0;n<l*l;n++){const t=h()*6.283,r=Math.acos(h()*2-1),d=Math.cbrt(h())*.6;U.set([d*Math.sin(r)*Math.cos(t),d*Math.cos(r),d*Math.sin(r)*Math.sin(t),h()*6],n*4)}const v=c.addVariable("textureVelocity",se,M),T=c.addVariable("texturePosition",ie,b);c.setVariableDependencies(v,[v,T]),c.setVariableDependencies(T,[v,T]),v.material.uniforms.time={value:0},v.material.uniforms.dt={value:.016},v.material.uniforms.strength={value:4},T.material.uniforms.time={value:0},T.material.uniforms.dt={value:.016};const a=c.init();a&&p.hud(a);let e,o;if(f==="gpu"){const n=new Float32Array(l*l*2);for(let r=0;r<l*l;r++)n[r*2]=(r%l+.5)/l,n[r*2+1]=(Math.floor(r/l)+.5)/l;const t=new z;t.setAttribute("ref",new V(n,2)),t.setAttribute("position",new V(new Float32Array(l*l*3),3)),o=new R({uniforms:{posTex:{value:null},velTex:{value:null},size:{value:6}},vertexShader:le,fragmentShader:ue,blending:L,depthWrite:!1,transparent:!0}),e=new W(t,o),e.frustumCulled=!1}else o=new Y,e=new ee(new te(3.2,3.2),o);x.add(e);let u=0;return{update(n){u+=n;for(const r of[v,T])r.material.uniforms.time.value=u,r.material.uniforms.dt.value=n;v.material.uniforms.strength.value=p.params.num("strength",4),c.compute();const t=c.getCurrentRenderTarget(T).texture;o instanceof R?(o.uniforms.posTex.value=t,o.uniforms.velTex.value=c.getCurrentRenderTarget(v).texture):o.map!==t&&(o.map=t,o.needsUpdate=!0),p.hud(f==="gpu"?`GPU: ${(l*l).toLocaleString()}개 · 위치/속도 = ${l}² float 텍스처 · CPU 비용 0`:`위치 텍스처 ${l}×${l} (픽셀 하나 = 입자 하나)`)},dispose:()=>c.dispose()}})}const de=[{mode:"cpu",title:"CPU 파티클",kind:"before",caption:"JS 루프로 2만 개를 갱신하고 매 프레임 정점 버퍼를 GPU로 다시 보낸다. 개수를 늘리면 CPU 시간과 업로드가 선형으로 증가."},{mode:"gpu",title:"GPU 파티클 (GPGPU)",kind:"after",caption:"위치·속도를 float 텍스처에 저장하고, 전체 화면 셰이더 한 번으로 모든 입자를 동시에 갱신(핑퐁). 26만 개도 CPU는 아무것도 하지 않는다."},{mode:"state",title:"상태 텍스처",kind:"info",caption:"입자 위치를 담은 텍스처를 그대로 표시. 처음엔 정돈된 노이즈였다가 흐름장을 따라 섞인다."}],ve={layout:"compare",intro:"불꽃·연기·마법 효과에 필요한 수십만 개의 입자를 CPU로 갱신하면 루프 비용과 매 프레임 버퍼 업로드가 병목이 됩니다. <b>GPU 파티클</b>은 입자 상태를 <b>텍스처(또는 버퍼)</b>에 두고 셰이더가 직접 시뮬레이션해, 데이터가 GPU를 떠나지 않습니다. 같은 흐름장(ABC flow) 규칙으로 CPU와 GPU를 비교합니다.",how:["입자 i의 위치·속도·수명을 텍스처의 픽셀 i에 저장한다 (WebGL: float 렌더 타깃, 현대 API: 구조화 버퍼 + 컴퓨트 셰이더).","시뮬레이션 패스: 전체 화면 쿼드를 그리며 픽셀마다 이전 상태를 읽고 힘을 적분해 새 텍스처에 쓴다. 다음 프레임엔 두 텍스처를 맞바꾼다(핑퐁).","렌더 패스: 입자 수만큼의 점/쿼드를 그리고, 정점 셰이더가 자기 번호에 해당하는 픽셀을 읽어 위치를 정한다.","수명이 다한 입자는 같은 셰이더에서 재생성. 컴퓨트 셰이더라면 생존 리스트·정렬·깊이 버퍼 충돌까지 GPU에서."],pros:["CPU 부하·버스 전송 없이 수십만~수백만 입자","깊이 버퍼 충돌, 벡터장, 커브 노이즈 등 GPU 친화적 효과"],cons:["게임플레이 로직이 입자 상태를 읽기 어려움 (GPU→CPU 읽기는 느림)","입자 간 상호작용·정렬(반투명)은 추가 패스 필요","디버깅이 어렵다"],usedIn:"UE Niagara GPU 시뮬레이션, Unity VFX Graph, Godot GPUParticles, 컴퓨트 셰이더 기반 AAA 엔진의 VFX, three.js GPUComputationRenderer.",controls:[{type:"range",key:"strength",label:"흐름장 세기",min:0,max:10,step:.25,value:4},{type:"select",key:"size",label:"GPU 입자 수 (다시 열 때 적용)",value:"512",options:[{label:"256² = 65,536",value:"256"},{label:"512² = 262,144",value:"512"},{label:"1024² = 1,048,576",value:"1024"}]}],viewers:de.map(p=>({title:p.title,kind:p.kind,caption:p.caption,mount:f=>ce(f,p.mode)}))};export{ve as default};
