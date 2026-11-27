import{p as z,M as C,u as T,aq as X,C as R,w as _,k as W,am as B,aB as I,g as P,Q as U,aD as Y,P as D,ac as H,ag as $,au as j,aM as E,a3 as L,a4 as Q}from"./three.module-BZgG6AUv.js";import{m as q}from"./three-viewer-0rZIEDzf.js";import{a as k}from"./canvas-viewer-Btf0JXdr.js";import{G as J}from"./glsl-DOwCk4-f.js";const K=`
uniform float time; uniform float mode; uniform float wind; uniform vec2 windDir;
varying float vH; varying vec3 vCol;
${J}
void main(){
  vec4 base = instanceMatrix * vec4(0., 0., 0., 1.);
  vec3 p = position;
  float h = p.y; // 0(뿌리) ~ 1(끝)
  vec4 w = instanceMatrix * vec4(p, 1.);
  float phase = hash12(base.xz) * 6.28;
  vec2 bend = vec2(0.);
  if (mode > .5 && mode < 1.5) {
    // 모든 풀이 같은 사인으로: 기계적인 군무
    bend = windDir * sin(time * 2.) * .35 * wind;
  } else if (mode > 1.5) {
    // 이동하는 돌풍 노이즈 + 개체별 위상 떨림
    float gust = fbm2(base.xz * .15 - windDir * time * .8);
    bend = windDir * (gust * 1.4 - .3) * wind + vec2(sin(time * 3. + phase), cos(time * 2.6 + phase)) * .06 * wind;
  }
  // 높이의 제곱으로 휘게 → 뿌리는 고정, 끝만 크게
  w.xz += bend * h * h;
  w.y -= length(bend) * h * h * .3;
  vH = h; vCol = mix(vec3(.12, .3, .06), vec3(.55, .75, .25), hash12(base.xz + 3.));
  gl_Position = projectionMatrix * viewMatrix * w;
}`,O=`
varying float vH; varying vec3 vCol;
void main(){ gl_FragColor = vec4(vCol * (.35 + .75 * vH), 1.);
  #include <colorspace_fragment>
}`,Z=`
uniform sampler2D vat; uniform float frames; uniform float time; uniform float fps;
attribute float vid;
varying vec3 vW;
void main(){
  // 버텍스 애니메이션 텍스처: 가로 = 정점 번호, 세로 = 프레임. 두 프레임을 보간
  float f = mod(time * fps, frames);
  float f0 = floor(f), f1 = mod(f0 + 1., frames);
  vec3 p0 = texelFetch(vat, ivec2(int(vid), int(f0)), 0).xyz;
  vec3 p1 = texelFetch(vat, ivec2(int(vid), int(f1)), 0).xyz;
  vec3 p = mix(p0, p1, f - f0);
  vec4 w = modelMatrix * vec4(p, 1.);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,tt=`
varying vec3 vW;
void main(){
  vec3 n = normalize(cross(dFdx(vW), dFdy(vW)));
  float l = abs(dot(n, normalize(vec3(.4, .8, .5)))) * .8 + .25;
  vec2 st = step(.5, fract(vW.xy * 1.5));
  vec3 c = mix(vec3(.85, .2, .2), vec3(.95), abs(st.x - st.y) * .0 + step(.5, fract(vW.y * 1.2)) * .8);
  gl_FragColor = vec4(c * l, 1.);
  #include <colorspace_fragment>
}`;function et(){const i=new L,r=[],l=4;for(let v=0;v<l;v++){const t=v/l,s=(v+1)/l,d=.05*(1-t),u=.05*(1-s);r.push(-d,t,0,d,t,0,-u,s,0,d,t,0,u,s,0,-u,s,0)}return i.setAttribute("position",new Q(r,3)),i}function nt(){const t=new Float32Array(1008),s=new Float32Array(336*3);for(let o=0;o<14;o++)for(let e=0;e<24;e++){const a=(o*24+e)*3;t[a]=e*.1,t[a+1]=2.4-o*.1,t[a+2]=0}s.set(t);const d=.1,u=new Float32Array(336*90*4),y=k(2),f=o=>{for(let e=0;e<336;e++){if(e%24===0)continue;const a=e*3,p=.0018+.0012*Math.sin(o*.21+e%24*.3)+y()*4e-4;for(let n=0;n<3;n++){const m=(t[a+n]-s[a+n])*.99;s[a+n]=t[a+n],t[a+n]+=m+(n===1?-.0012:n===0?p:Math.sin(o*.37+e*.05)*8e-4)}}for(let e=0;e<12;e++)for(let a=0;a<14;a++)for(let p=0;p<24;p++){const n=a*24+p;for(const m of[p+1<24?n+1:-1,a+1<14?n+24:-1]){if(m<0)continue;const b=t[m*3]-t[n*3],F=t[m*3+1]-t[n*3+1],A=t[m*3+2]-t[n*3+2],S=Math.hypot(b,F,A)||1e-6,w=(S-d)/S/2,G=n%24===0,V=m%24===0,M=G?0:V?2:1,N=V?0:G?2:1;t[n*3]+=b*w*M,t[n*3+1]+=F*w*M,t[n*3+2]+=A*w*M,t[m*3]-=b*w*N,t[m*3+1]-=F*w*N,t[m*3+2]-=A*w*N}}};let c=0;for(let o=0;o<400;o++)f(c++);for(let o=0;o<90;o++){for(let e=0;e<3;e++)f(c++);for(let e=0;e<336;e++)u.set([t[e*3],t[e*3+1],t[e*3+2],1],(o*336+e)*4)}const h=new H(u,336,90,$,j);h.needsUpdate=!0;const x=new D(1,1,23,13),g=new Float32Array(336).map((o,e)=>e);return x.setAttribute("vid",new E(g,1)),{tex:h,g:x,FR:90,bytes:336*90*16}}function ot(i,r){return q(i,{antialias:!0,cam:r===3?[1.2,1.8,4.2]:[0,2.2,6],target:r===3?[1.2,1.6,0]:[0,.3,0]},({scene:l})=>{if(l.background=new z(10469600),r===3){const{tex:f,g:c,FR:h,bytes:x}=nt(),g={vat:{value:f},frames:{value:h},time:{value:0},fps:{value:30}},o=new C(c,new T({uniforms:g,vertexShader:Z,fragmentShader:tt,side:X}));o.frustumCulled=!1,l.add(o);const e=new C(new R(.03,.03,3,12),new _({color:5592405}));return e.position.set(0,1.5,0),l.add(e),{update(a,p){g.time.value=p,i.hud(`VAT ${c.getAttribute("position").count}정점 × ${h}프레임 = ${(x/1024).toFixed(0)}KB · CPU 비용 0`)},dispose:()=>f.dispose()}}const v=9e3,t={time:{value:0},mode:{value:r},wind:{value:1},windDir:{value:new W(1,.3).normalize()}},s=new B(et(),new T({uniforms:t,vertexShader:K,fragmentShader:O,side:X}),v),d=k(5),u=new I;for(let f=0;f<v;f++){const c=.5+d()*.7;u.compose(new P((d()-.5)*10,0,(d()-.5)*8),new U().setFromEuler(new Y(0,d()*Math.PI,0)),new P(c*1.4,c,c)),s.setMatrixAt(f,u)}s.frustumCulled=!1,l.add(s);const y=new C(new D(12,10),new _({color:3820064}));return y.rotation.x=-Math.PI/2,l.add(y),{update(f,c){t.time.value=c,t.wind.value=i.params.num("wind",1),i.hud([`풀 ${v}포기 · 정지`,"전체 같은 사인파","이동 돌풍 노이즈 + 개체 위상 + 높이² 가중",""][r])}}})}const at=[{mode:0,title:"정지",kind:"before",caption:"9000포기의 풀(인스턴싱 1드로우)이 정지해 있으면 생기가 없다."},{mode:1,title:"단순 사인 흔들림",kind:"variant",caption:"모든 풀잎이 같은 박자로 흔들려 기계적이다. 뿌리부터 끝까지 똑같이 움직이면 더 어색하다(여기선 높이² 가중 적용)."},{mode:2,title:"노이즈 돌풍 바람",kind:"after",caption:"흐르는 노이즈 필드가 바람 덩어리처럼 지나가며 풀밭에 물결이 생긴다. 개체마다 위상이 달라 자연스럽다. 전부 정점 셰이더에서 계산."},{mode:3,title:"버텍스 애니메이션 텍스처 (VAT)",kind:"variant",caption:"천 시뮬레이션을 미리 돌려 프레임별 정점 위치를 텍스처에 구웠다. 런타임엔 텍스처만 읽어 재생 — 시뮬레이션 비용 없이 복잡한 움직임."}],lt={layout:"variants",intro:"수천~수만 개의 풀·나뭇잎·깃발을 CPU로 애니메이션하면 감당이 안 됩니다. <b>정점 셰이더</b>에서 시간과 위치로 정점을 직접 움직이면 GPU가 병렬로 처리해 사실상 무료입니다. 단순 함수 대신 시뮬레이션 결과를 텍스처에 구워 재생하는 <b>VAT</b>는 천·파괴·군중 같은 복잡한 움직임까지 같은 방식으로 다룹니다.",how:["바람: 월드 위치로 스크롤되는 노이즈를 샘플해 휨 방향·세기를 정하고, 정점 높이(또는 정점 컬러 마스크)의 제곱으로 가중한다.","인스턴스 ID·위치 해시로 위상을 흔들어 동기화를 깬다. 나무는 줄기·가지·잎 단위로 주파수를 달리한 계층 흔들림.","VAT: DCC 툴에서 시뮬레이션을 돌려 프레임 × 정점 위치(와 법선)를 텍스처에 저장.","정점 셰이더가 정점 번호와 시간으로 텍스처를 읽어 위치를 바꾼다. 프레임 사이는 보간.","인스턴스마다 재생 시작 시간을 달리하면 같은 VAT로 수천 개의 서로 다른 움직임."],pros:["CPU 비용 0, 인스턴싱과 결합해 대량 처리","VAT는 물리·변형 애니메이션을 런타임 비용 없이 재생"],cons:["셰이더 변형은 충돌·상호작용을 모름 (캐릭터가 풀을 밟는 효과는 별도 텍스처로 전달)","VAT는 정점 수 × 프레임 수만큼 메모리","그림자·모션 벡터 패스에도 같은 변형을 넣어야 함"],usedIn:"Crysis의 식물 흔들림(GPU Gems 3), Ghost of Tsushima의 바람 풀밭(GDC 2021), UE SimpleGrassWind·Pivot Painter, Houdini(SideFX Labs) VAT로 구운 파괴·천·군중 연출.",controls:[{type:"range",key:"wind",label:"바람 세기",min:0,max:3,step:.05,value:1}],viewers:at.map(i=>({title:i.title,kind:i.kind,caption:i.caption,mount:r=>ot(r,i.mode)}))};export{lt as default};
