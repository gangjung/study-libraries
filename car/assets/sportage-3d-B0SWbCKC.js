var Il=Object.defineProperty;var Ul=(i,t,e)=>t in i?Il(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var br=(i,t,e)=>Ul(i,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jo="170",Vi={ROTATE:0,DOLLY:1,PAN:2},Bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Nl=0,Aa=1,Fl=2,kc=1,Ol=2,Cn=3,Kn=0,Oe=1,sn=2,$n=0,Gi=1,Ra=2,Ca=3,Pa=4,Bl=5,li=100,zl=101,kl=102,Hl=103,Vl=104,Gl=200,Wl=201,Xl=202,Yl=203,ao=204,co=205,ql=206,Zl=207,$l=208,jl=209,Kl=210,Jl=211,Ql=212,th=213,eh=214,lo=0,ho=1,uo=2,Yi=3,fo=4,po=5,mo=6,go=7,Hc=0,nh=1,ih=2,jn=0,sh=1,rh=2,oh=3,Vc=4,ah=5,ch=6,lh=7,Gc=300,qi=301,Zi=302,_o=303,vo=304,gr=306,ur=1e3,ui=1001,xo=1002,fn=1003,hh=1004,Ds=1005,gn=1006,Tr=1007,di=1008,Un=1009,Wc=1010,Xc=1011,Ss=1012,Qo=1013,fi=1014,Ln=1015,Rs=1016,ta=1017,ea=1018,$i=1020,Yc=35902,qc=1021,Zc=1022,dn=1023,$c=1024,jc=1025,Wi=1026,ji=1027,Kc=1028,na=1029,Jc=1030,ia=1031,sa=1033,sr=33776,rr=33777,or=33778,ar=33779,Mo=35840,yo=35841,So=35842,Eo=35843,bo=36196,To=37492,wo=37496,Ao=37808,Ro=37809,Co=37810,Po=37811,Lo=37812,Do=37813,Io=37814,Uo=37815,No=37816,Fo=37817,Oo=37818,Bo=37819,zo=37820,ko=37821,cr=36492,Ho=36494,Vo=36495,Qc=36283,Go=36284,Wo=36285,Xo=36286,uh=3200,dh=3201,tl=0,fh=1,Zn="",Fe="srgb",Ji="srgb-linear",_r="linear",fe="srgb",Si=7680,La=519,ph=512,mh=513,gh=514,el=515,_h=516,vh=517,xh=518,Mh=519,Da=35044,Ia="300 es",Dn=2e3,dr=2001;class _i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ua=1234567;const _s=Math.PI/180,Es=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function ra(i,t){return(i%t+t)%t}function yh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Sh(i,t,e){return i!==t?(e-i)/(t-i):0}function vs(i,t,e){return(1-e)*i+e*t}function Eh(i,t,e,n){return vs(i,t,1-Math.exp(-e*n))}function bh(i,t=1){return t-Math.abs(ra(i,t*2)-t)}function Th(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function wh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ah(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Rh(i,t){return i+Math.random()*(t-i)}function Ch(i){return i*(.5-Math.random())}function Ph(i){i!==void 0&&(Ua=i);let t=Ua+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Lh(i){return i*_s}function Dh(i){return i*Es}function Ih(i){return(i&i-1)===0&&i!==0}function Uh(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Nh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Fh(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),m=o((t-n)/2),h=r((n-t)/2),f=o((n-t)/2);switch(s){case"XYX":i.set(a*u,c*p,c*m,a*l);break;case"YZY":i.set(c*m,a*u,c*p,a*l);break;case"ZXZ":i.set(c*p,c*m,a*u,a*l);break;case"XZX":i.set(a*u,c*f,c*h,a*l);break;case"YXY":i.set(c*h,a*u,c*f,a*l);break;case"ZYZ":i.set(c*f,c*h,a*u,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Oi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ve(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Yo={DEG2RAD:_s,RAD2DEG:Es,generateUUID:vi,clamp:Ee,euclideanModulo:ra,mapLinear:yh,inverseLerp:Sh,lerp:vs,damp:Eh,pingpong:bh,smoothstep:Th,smootherstep:wh,randInt:Ah,randFloat:Rh,randFloatSpread:Ch,seededRandom:Ph,degToRad:Lh,radToDeg:Dh,isPowerOfTwo:Ih,ceilPowerOfTwo:Uh,floorPowerOfTwo:Nh,setQuaternionFromProperEuler:Fh,normalize:Ve,denormalize:Oi};class ot{constructor(t=0,e=0){ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,s,r,o,a,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],p=n[7],m=n[2],h=n[5],f=n[8],_=s[0],g=s[3],d=s[6],A=s[1],E=s[4],v=s[7],I=s[2],C=s[5],P=s[8];return r[0]=o*_+a*A+c*I,r[3]=o*g+a*E+c*C,r[6]=o*d+a*v+c*P,r[1]=l*_+u*A+p*I,r[4]=l*g+u*E+p*C,r[7]=l*d+u*v+p*P,r[2]=m*_+h*A+f*I,r[5]=m*g+h*E+f*C,r[8]=m*d+h*v+f*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],p=u*o-a*l,m=a*c-u*r,h=l*r-o*c,f=e*p+n*m+s*h;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/f;return t[0]=p*_,t[1]=(s*l-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=m*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=h*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(wr.makeScale(t,e)),this}rotate(t){return this.premultiply(wr.makeRotation(-t)),this}translate(t,e){return this.premultiply(wr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wr=new Zt;function nl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Oh(){const i=fr("canvas");return i.style.display="block",i}const Na={};function ms(i){i in Na||(Na[i]=!0,console.warn(i))}function Bh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function zh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function kh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const se={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(i.r=In(i.r),i.g=In(i.g),i.b=In(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(i.r=Xi(i.r),i.g=Xi(i.g),i.b=Xi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zn?_r:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Xi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Fa=[.64,.33,.3,.6,.15,.06],Oa=[.2126,.7152,.0722],Ba=[.3127,.329],za=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ka=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);se.define({[Ji]:{primaries:Fa,whitePoint:Ba,transfer:_r,toXYZ:za,fromXYZ:ka,luminanceCoefficients:Oa,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:Fa,whitePoint:Ba,transfer:fe,toXYZ:za,fromXYZ:ka,luminanceCoefficients:Oa,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}});let Ei;class Hh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=fr("canvas")),Ei.width=t.width,Ei.height=t.height;const n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=In(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Vh=0;class il{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=vi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ar(s[o].image)):r.push(Ar(s[o]))}else r=Ar(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ar(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gh=0;class Xe extends _i{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,n=ui,s=ui,r=gn,o=di,a=dn,c=Un,l=Xe.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=vi(),this.name="",this.source=new il(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ur:t.x=t.x-Math.floor(t.x);break;case ui:t.x=t.x<0?0:1;break;case xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ur:t.y=t.y-Math.floor(t.y);break;case ui:t.y=t.y<0?0:1;break;case xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=Gc;Xe.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,s=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],p=c[8],m=c[1],h=c[5],f=c[9],_=c[2],g=c[6],d=c[10];if(Math.abs(u-m)<.01&&Math.abs(p-_)<.01&&Math.abs(f-g)<.01){if(Math.abs(u+m)<.1&&Math.abs(p+_)<.1&&Math.abs(f+g)<.1&&Math.abs(l+h+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,v=(h+1)/2,I=(d+1)/2,C=(u+m)/4,P=(p+_)/4,D=(f+g)/4;return E>v&&E>I?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=C/n,r=P/n):v>I?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=C/s,r=D/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=P/r,s=D/r),this.set(n,s,r,e),this}let A=Math.sqrt((g-f)*(g-f)+(p-_)*(p-_)+(m-u)*(m-u));return Math.abs(A)<.001&&(A=1),this.x=(g-f)/A,this.y=(p-_)/A,this.z=(m-u)/A,this.w=Math.acos((l+h+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wh extends _i{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Xe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new il(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends Wh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class sl extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xh extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class mi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],p=n[s+3];const m=r[o+0],h=r[o+1],f=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=p;return}if(a===1){t[e+0]=m,t[e+1]=h,t[e+2]=f,t[e+3]=_;return}if(p!==_||c!==m||l!==h||u!==f){let g=1-a;const d=c*m+l*h+u*f+p*_,A=d>=0?1:-1,E=1-d*d;if(E>Number.EPSILON){const I=Math.sqrt(E),C=Math.atan2(I,d*A);g=Math.sin(g*C)/I,a=Math.sin(a*C)/I}const v=a*A;if(c=c*g+m*v,l=l*g+h*v,u=u*g+f*v,p=p*g+_*v,g===1-a){const I=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=I,l*=I,u*=I,p*=I}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],p=r[o],m=r[o+1],h=r[o+2],f=r[o+3];return t[e]=a*f+u*p+c*h-l*m,t[e+1]=c*f+u*m+l*p-a*h,t[e+2]=l*f+u*h+a*m-c*p,t[e+3]=u*f-a*p-c*m-l*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),p=a(r/2),m=c(n/2),h=c(s/2),f=c(r/2);switch(o){case"XYZ":this._x=m*u*p+l*h*f,this._y=l*h*p-m*u*f,this._z=l*u*f+m*h*p,this._w=l*u*p-m*h*f;break;case"YXZ":this._x=m*u*p+l*h*f,this._y=l*h*p-m*u*f,this._z=l*u*f-m*h*p,this._w=l*u*p+m*h*f;break;case"ZXY":this._x=m*u*p-l*h*f,this._y=l*h*p+m*u*f,this._z=l*u*f+m*h*p,this._w=l*u*p-m*h*f;break;case"ZYX":this._x=m*u*p-l*h*f,this._y=l*h*p+m*u*f,this._z=l*u*f-m*h*p,this._w=l*u*p+m*h*f;break;case"YZX":this._x=m*u*p+l*h*f,this._y=l*h*p+m*u*f,this._z=l*u*f-m*h*p,this._w=l*u*p-m*h*f;break;case"XZY":this._x=m*u*p-l*h*f,this._y=l*h*p-m*u*f,this._z=l*u*f+m*h*p,this._w=l*u*p+m*h*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],p=e[10],m=n+a+p;if(m>0){const h=.5/Math.sqrt(m+1);this._w=.25/h,this._x=(u-c)*h,this._y=(r-l)*h,this._z=(o-s)*h}else if(n>a&&n>p){const h=2*Math.sqrt(1+n-a-p);this._w=(u-c)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+l)/h}else if(a>p){const h=2*Math.sqrt(1+a-n-p);this._w=(r-l)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(c+u)/h}else{const h=2*Math.sqrt(1+p-n-a);this._w=(o-s)/h,this._x=(r+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const h=1-e;return this._w=h*o+e*this._w,this._x=h*n+e*this._x,this._y=h*s+e*this._y,this._z=h*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),p=Math.sin((1-e)*u)/l,m=Math.sin(e*u)/l;return this._w=o*p+this._w*m,this._x=n*p+this._x*m,this._y=s*p+this._y*m,this._z=r*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(t=0,e=0,n=0){b.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ha.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ha.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+c*l+o*p-a*u,this.y=n+c*u+a*l-r*p,this.z=s+c*p+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rr.copy(this).projectOnVector(t),this.sub(Rr)}reflect(t){return this.sub(Rr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new b,Ha=new mi;class Qi{constructor(t=new b(1/0,1/0,1/0),e=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Is.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Is.copy(n.boundingBox)),Is.applyMatrix4(t.matrixWorld),this.union(Is)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(as),Us.subVectors(this.max,as),bi.subVectors(t.a,as),Ti.subVectors(t.b,as),wi.subVectors(t.c,as),kn.subVectors(Ti,bi),Hn.subVectors(wi,Ti),ei.subVectors(bi,wi);let e=[0,-kn.z,kn.y,0,-Hn.z,Hn.y,0,-ei.z,ei.y,kn.z,0,-kn.x,Hn.z,0,-Hn.x,ei.z,0,-ei.x,-kn.y,kn.x,0,-Hn.y,Hn.x,0,-ei.y,ei.x,0];return!Cr(e,bi,Ti,wi,Us)||(e=[1,0,0,0,1,0,0,0,1],!Cr(e,bi,Ti,wi,Us))?!1:(Ns.crossVectors(kn,Hn),e=[Ns.x,Ns.y,Ns.z],Cr(e,bi,Ti,wi,Us))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new b,new b,new b,new b,new b,new b,new b,new b],an=new b,Is=new Qi,bi=new b,Ti=new b,wi=new b,kn=new b,Hn=new b,ei=new b,as=new b,Us=new b,Ns=new b,ni=new b;function Cr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ni.fromArray(i,r);const a=s.x*Math.abs(ni.x)+s.y*Math.abs(ni.y)+s.z*Math.abs(ni.z),c=t.dot(ni),l=e.dot(ni),u=n.dot(ni);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Yh=new Qi,cs=new b,Pr=new b;class oa{constructor(t=new b,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Yh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cs.subVectors(t,this.center);const e=cs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cs.copy(t.center).add(Pr)),this.expandByPoint(cs.copy(t.center).sub(Pr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new b,Lr=new b,Fs=new b,Vn=new b,Dr=new b,Os=new b,Ir=new b;class aa{constructor(t=new b,e=new b(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Lr.copy(t).add(e).multiplyScalar(.5),Fs.copy(e).sub(t).normalize(),Vn.copy(this.origin).sub(Lr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Fs),a=Vn.dot(this.direction),c=-Vn.dot(Fs),l=Vn.lengthSq(),u=Math.abs(1-o*o);let p,m,h,f;if(u>0)if(p=o*c-a,m=o*a-c,f=r*u,p>=0)if(m>=-f)if(m<=f){const _=1/u;p*=_,m*=_,h=p*(p+o*m+2*a)+m*(o*p+m+2*c)+l}else m=r,p=Math.max(0,-(o*m+a)),h=-p*p+m*(m+2*c)+l;else m=-r,p=Math.max(0,-(o*m+a)),h=-p*p+m*(m+2*c)+l;else m<=-f?(p=Math.max(0,-(-o*r+a)),m=p>0?-r:Math.min(Math.max(-r,-c),r),h=-p*p+m*(m+2*c)+l):m<=f?(p=0,m=Math.min(Math.max(-r,-c),r),h=m*(m+2*c)+l):(p=Math.max(0,-(o*r+a)),m=p>0?r:Math.min(Math.max(-r,-c),r),h=-p*p+m*(m+2*c)+l);else m=o>0?-r:r,p=Math.max(0,-(o*m+a)),h=-p*p+m*(m+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Lr).addScaledVector(Fs,m),h}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,m=this.origin;return l>=0?(n=(t.min.x-m.x)*l,s=(t.max.x-m.x)*l):(n=(t.max.x-m.x)*l,s=(t.min.x-m.x)*l),u>=0?(r=(t.min.y-m.y)*u,o=(t.max.y-m.y)*u):(r=(t.max.y-m.y)*u,o=(t.min.y-m.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-m.z)*p,c=(t.max.z-m.z)*p):(a=(t.max.z-m.z)*p,c=(t.min.z-m.z)*p),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){Dr.subVectors(e,t),Os.subVectors(n,t),Ir.crossVectors(Dr,Os);let o=this.direction.dot(Ir),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vn.subVectors(this.origin,t);const c=a*this.direction.dot(Os.crossVectors(Vn,Os));if(c<0)return null;const l=a*this.direction.dot(Dr.cross(Vn));if(l<0||c+l>o)return null;const u=-a*Vn.dot(Ir);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,n,s,r,o,a,c,l,u,p,m,h,f,_,g){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,p,m,h,f,_,g)}set(t,e,n,s,r,o,a,c,l,u,p,m,h,f,_,g){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=u,d[10]=p,d[14]=m,d[3]=h,d[7]=f,d[11]=_,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ai.setFromMatrixColumn(t,0).length(),r=1/Ai.setFromMatrixColumn(t,1).length(),o=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const m=o*u,h=o*p,f=a*u,_=a*p;e[0]=c*u,e[4]=-c*p,e[8]=l,e[1]=h+f*l,e[5]=m-_*l,e[9]=-a*c,e[2]=_-m*l,e[6]=f+h*l,e[10]=o*c}else if(t.order==="YXZ"){const m=c*u,h=c*p,f=l*u,_=l*p;e[0]=m+_*a,e[4]=f*a-h,e[8]=o*l,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=h*a-f,e[6]=_+m*a,e[10]=o*c}else if(t.order==="ZXY"){const m=c*u,h=c*p,f=l*u,_=l*p;e[0]=m-_*a,e[4]=-o*p,e[8]=f+h*a,e[1]=h+f*a,e[5]=o*u,e[9]=_-m*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const m=o*u,h=o*p,f=a*u,_=a*p;e[0]=c*u,e[4]=f*l-h,e[8]=m*l+_,e[1]=c*p,e[5]=_*l+m,e[9]=h*l-f,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const m=o*c,h=o*l,f=a*c,_=a*l;e[0]=c*u,e[4]=_-m*p,e[8]=f*p+h,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=h*p+f,e[10]=m-_*p}else if(t.order==="XZY"){const m=o*c,h=o*l,f=a*c,_=a*l;e[0]=c*u,e[4]=-p,e[8]=l*u,e[1]=m*p+_,e[5]=o*u,e[9]=h*p-f,e[2]=f*p-h,e[6]=a*u,e[10]=_*p+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(qh,t,Zh)}lookAt(t,e,n){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),Gn.crossVectors(n,je),Gn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),Gn.crossVectors(n,je)),Gn.normalize(),Bs.crossVectors(je,Gn),s[0]=Gn.x,s[4]=Bs.x,s[8]=je.x,s[1]=Gn.y,s[5]=Bs.y,s[9]=je.y,s[2]=Gn.z,s[6]=Bs.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],p=n[5],m=n[9],h=n[13],f=n[2],_=n[6],g=n[10],d=n[14],A=n[3],E=n[7],v=n[11],I=n[15],C=s[0],P=s[4],D=s[8],y=s[12],M=s[1],L=s[5],X=s[9],k=s[13],G=s[2],K=s[6],W=s[10],st=s[14],Y=s[3],ut=s[7],mt=s[11],Et=s[15];return r[0]=o*C+a*M+c*G+l*Y,r[4]=o*P+a*L+c*K+l*ut,r[8]=o*D+a*X+c*W+l*mt,r[12]=o*y+a*k+c*st+l*Et,r[1]=u*C+p*M+m*G+h*Y,r[5]=u*P+p*L+m*K+h*ut,r[9]=u*D+p*X+m*W+h*mt,r[13]=u*y+p*k+m*st+h*Et,r[2]=f*C+_*M+g*G+d*Y,r[6]=f*P+_*L+g*K+d*ut,r[10]=f*D+_*X+g*W+d*mt,r[14]=f*y+_*k+g*st+d*Et,r[3]=A*C+E*M+v*G+I*Y,r[7]=A*P+E*L+v*K+I*ut,r[11]=A*D+E*X+v*W+I*mt,r[15]=A*y+E*k+v*st+I*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],p=t[6],m=t[10],h=t[14],f=t[3],_=t[7],g=t[11],d=t[15];return f*(+r*c*p-s*l*p-r*a*m+n*l*m+s*a*h-n*c*h)+_*(+e*c*h-e*l*m+r*o*m-s*o*h+s*l*u-r*c*u)+g*(+e*l*p-e*a*h-r*o*p+n*o*h+r*a*u-n*l*u)+d*(-s*a*u-e*c*p+e*a*m+s*o*p-n*o*m+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],p=t[9],m=t[10],h=t[11],f=t[12],_=t[13],g=t[14],d=t[15],A=p*g*l-_*m*l+_*c*h-a*g*h-p*c*d+a*m*d,E=f*m*l-u*g*l-f*c*h+o*g*h+u*c*d-o*m*d,v=u*_*l-f*p*l+f*a*h-o*_*h-u*a*d+o*p*d,I=f*p*c-u*_*c-f*a*m+o*_*m+u*a*g-o*p*g,C=e*A+n*E+s*v+r*I;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/C;return t[0]=A*P,t[1]=(_*m*r-p*g*r-_*s*h+n*g*h+p*s*d-n*m*d)*P,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*d+n*c*d)*P,t[3]=(p*c*r-a*m*r-p*s*l+n*m*l+a*s*h-n*c*h)*P,t[4]=E*P,t[5]=(u*g*r-f*m*r+f*s*h-e*g*h-u*s*d+e*m*d)*P,t[6]=(f*c*r-o*g*r-f*s*l+e*g*l+o*s*d-e*c*d)*P,t[7]=(o*m*r-u*c*r+u*s*l-e*m*l-o*s*h+e*c*h)*P,t[8]=v*P,t[9]=(f*p*r-u*_*r-f*n*h+e*_*h+u*n*d-e*p*d)*P,t[10]=(o*_*r-f*a*r+f*n*l-e*_*l-o*n*d+e*a*d)*P,t[11]=(u*a*r-o*p*r-u*n*l+e*p*l+o*n*h-e*a*h)*P,t[12]=I*P,t[13]=(u*_*s-f*p*s+f*n*m-e*_*m-u*n*g+e*p*g)*P,t[14]=(f*a*s-o*_*s-f*n*c+e*_*c+o*n*g-e*a*g)*P,t[15]=(o*p*s-u*a*s+u*n*c-e*p*c-o*n*m+e*a*m)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,p=a+a,m=r*l,h=r*u,f=r*p,_=o*u,g=o*p,d=a*p,A=c*l,E=c*u,v=c*p,I=n.x,C=n.y,P=n.z;return s[0]=(1-(_+d))*I,s[1]=(h+v)*I,s[2]=(f-E)*I,s[3]=0,s[4]=(h-v)*C,s[5]=(1-(m+d))*C,s[6]=(g+A)*C,s[7]=0,s[8]=(f+E)*P,s[9]=(g-A)*P,s[10]=(1-(m+_))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ai.set(s[0],s[1],s[2]).length();const o=Ai.set(s[4],s[5],s[6]).length(),a=Ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const l=1/r,u=1/o,p=1/a;return cn.elements[0]*=l,cn.elements[1]*=l,cn.elements[2]*=l,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=p,cn.elements[9]*=p,cn.elements[10]*=p,e.setFromRotationMatrix(cn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Dn){const c=this.elements,l=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),m=(n+s)/(n-s);let h,f;if(a===Dn)h=-(o+r)/(o-r),f=-2*o*r/(o-r);else if(a===dr)h=-o/(o-r),f=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=h,c[14]=f,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Dn){const c=this.elements,l=1/(e-t),u=1/(n-s),p=1/(o-r),m=(e+t)*l,h=(n+s)*u;let f,_;if(a===Dn)f=(o+r)*p,_=-2*p;else if(a===dr)f=r*p,_=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-m,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-h,c[2]=0,c[6]=0,c[10]=_,c[14]=-f,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ai=new b,cn=new ve,qh=new b(0,0,0),Zh=new b(1,1,1),Gn=new b,Bs=new b,je=new b,Va=new ve,Ga=new mi;class vn{constructor(t=0,e=0,n=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],p=s[2],m=s[6],h=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ee(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,h),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Va.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Va,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ga.setFromEuler(this),this.setFromQuaternion(Ga,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class ca{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $h=0;const Wa=new b,Ri=new mi,wn=new ve,zs=new b,ls=new b,jh=new b,Kh=new mi,Xa=new b(1,0,0),Ya=new b(0,1,0),qa=new b(0,0,1),Za={type:"added"},Jh={type:"removed"},Ci={type:"childadded",child:null},Ur={type:"childremoved",child:null};class De extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new b,e=new vn,n=new mi,s=new b(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new Zt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(Xa,t)}rotateY(t){return this.rotateOnAxis(Ya,t)}rotateZ(t){return this.rotateOnAxis(qa,t)}translateOnAxis(t,e){return Wa.copy(t).applyQuaternion(this.quaternion),this.position.add(Wa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xa,t)}translateY(t){return this.translateOnAxis(Ya,t)}translateZ(t){return this.translateOnAxis(qa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zs.copy(t):zs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(ls,zs,this.up):wn.lookAt(zs,ls,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(wn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Za),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jh),Ur.child=t,this.dispatchEvent(Ur),Ur.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Za),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,jh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Kh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const p=c[l];r(t.shapes,p)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),p=o(t.shapes),m=o(t.skeletons),h=o(t.animations),f=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),m.length>0&&(n.skeletons=m),h.length>0&&(n.animations=h),f.length>0&&(n.nodes=f)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}De.DEFAULT_UP=new b(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new b,An=new b,Nr=new b,Rn=new b,Pi=new b,Li=new b,$a=new b,Fr=new b,Or=new b,Br=new b,zr=new me,kr=new me,Hr=new me;class un{constructor(t=new b,e=new b,n=new b){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),An.subVectors(n,e),Nr.subVectors(t,e);const o=ln.dot(ln),a=ln.dot(An),c=ln.dot(Nr),l=An.dot(An),u=An.dot(Nr),p=o*l-a*a;if(p===0)return r.set(0,0,0),null;const m=1/p,h=(l*c-a*u)*m,f=(o*u-a*c)*m;return r.set(1-h-f,f,h)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Rn)===null?!1:Rn.x>=0&&Rn.y>=0&&Rn.x+Rn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Rn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Rn.x),c.addScaledVector(o,Rn.y),c.addScaledVector(a,Rn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return zr.setScalar(0),kr.setScalar(0),Hr.setScalar(0),zr.fromBufferAttribute(t,e),kr.fromBufferAttribute(t,n),Hr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(zr,r.x),o.addScaledVector(kr,r.y),o.addScaledVector(Hr,r.z),o}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),An.subVectors(t,e),ln.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),An.subVectors(this.a,this.b),ln.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return un.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Pi.subVectors(s,n),Li.subVectors(r,n),Fr.subVectors(t,n);const c=Pi.dot(Fr),l=Li.dot(Fr);if(c<=0&&l<=0)return e.copy(n);Or.subVectors(t,s);const u=Pi.dot(Or),p=Li.dot(Or);if(u>=0&&p<=u)return e.copy(s);const m=c*p-u*l;if(m<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Pi,o);Br.subVectors(t,r);const h=Pi.dot(Br),f=Li.dot(Br);if(f>=0&&h<=f)return e.copy(r);const _=h*l-c*f;if(_<=0&&l>=0&&f<=0)return a=l/(l-f),e.copy(n).addScaledVector(Li,a);const g=u*f-h*p;if(g<=0&&p-u>=0&&h-f>=0)return $a.subVectors(r,s),a=(p-u)/(p-u+(h-f)),e.copy(s).addScaledVector($a,a);const d=1/(g+_+m);return o=_*d,a=m*d,e.copy(n).addScaledVector(Pi,o).addScaledVector(Li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const rl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},ks={h:0,s:0,l:0};function Vr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=ra(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Vr(o,r,t+1/3),this.g=Vr(o,r,t),this.b=Vr(o,r,t-1/3)}return se.toWorkingColorSpace(this,s),this}setStyle(t,e=Fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const n=rl[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=Xi(t.r),this.g=Xi(t.g),this.b=Xi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return se.fromWorkingColorSpace(Ne.copy(this),t),Math.round(Ee(Ne.r*255,0,255))*65536+Math.round(Ee(Ne.g*255,0,255))*256+Math.round(Ee(Ne.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Ne.copy(this),e);const n=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const p=o-a;switch(l=u<=.5?p/(o+a):p/(2-o-a),o){case n:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-n)/p+2;break;case r:c=(n-s)/p+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Fe){se.fromWorkingColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,s=Ne.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(ks);const n=vs(Wn.h,ks.h,e),s=vs(Wn.s,ks.s,e),r=vs(Wn.l,ks.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Qt;Qt.NAMES=rl;let Qh=0;class Cs extends _i{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qh++}),this.uuid=vi(),this.name="",this.blending=Gi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ao,this.blendDst=co,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Yi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=La,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Gi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ao&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Yi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==La&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class bs extends Cs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new b,Hs=new ot;class _n{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Da,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hs.fromBufferAttribute(this,e),Hs.applyMatrix3(t),this.setXY(e,Hs.x,Hs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Oi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Oi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Oi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Oi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),n=Ve(n,this.array),s=Ve(s,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Da&&(t.usage=this.usage),t}}class ol extends _n{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class al extends _n{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends _n{constructor(t,e,n){super(new Float32Array(t),e,n)}}let tu=0;const tn=new ve,Gr=new De,Di=new b,Ke=new Qi,hs=new Qi,Ce=new b;class Be extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(nl(t)?al:ol)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Gr.lookAt(t),Gr.updateMatrix(),this.applyMatrix4(Gr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Di).negate(),this.translate(Di.x,Di.y,Di.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new he(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ce.addVectors(Ke.min,hs.min),Ke.expandByPoint(Ce),Ce.addVectors(Ke.max,hs.max),Ke.expandByPoint(Ce)):(Ke.expandByPoint(hs.min),Ke.expandByPoint(hs.max))}Ke.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Ce.fromBufferAttribute(a,l),c&&(Di.fromBufferAttribute(t,l),Ce.add(Di)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _n(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new b,c[D]=new b;const l=new b,u=new b,p=new b,m=new ot,h=new ot,f=new ot,_=new b,g=new b;function d(D,y,M){l.fromBufferAttribute(n,D),u.fromBufferAttribute(n,y),p.fromBufferAttribute(n,M),m.fromBufferAttribute(r,D),h.fromBufferAttribute(r,y),f.fromBufferAttribute(r,M),u.sub(l),p.sub(l),h.sub(m),f.sub(m);const L=1/(h.x*f.y-f.x*h.y);isFinite(L)&&(_.copy(u).multiplyScalar(f.y).addScaledVector(p,-h.y).multiplyScalar(L),g.copy(p).multiplyScalar(h.x).addScaledVector(u,-f.x).multiplyScalar(L),a[D].add(_),a[y].add(_),a[M].add(_),c[D].add(g),c[y].add(g),c[M].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let D=0,y=A.length;D<y;++D){const M=A[D],L=M.start,X=M.count;for(let k=L,G=L+X;k<G;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const E=new b,v=new b,I=new b,C=new b;function P(D){I.fromBufferAttribute(s,D),C.copy(I);const y=a[D];E.copy(y),E.sub(I.multiplyScalar(I.dot(y))).normalize(),v.crossVectors(C,y);const L=v.dot(c[D])<0?-1:1;o.setXYZW(D,E.x,E.y,E.z,L)}for(let D=0,y=A.length;D<y;++D){const M=A[D],L=M.start,X=M.count;for(let k=L,G=L+X;k<G;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _n(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,h=n.count;m<h;m++)n.setXYZ(m,0,0,0);const s=new b,r=new b,o=new b,a=new b,c=new b,l=new b,u=new b,p=new b;if(t)for(let m=0,h=t.count;m<h;m+=3){const f=t.getX(m+0),_=t.getX(m+1),g=t.getX(m+2);s.fromBufferAttribute(e,f),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,f),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(u),c.add(u),l.add(u),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let m=0,h=e.count;m<h;m+=3)s.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),o.fromBufferAttribute(e,m+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(m+0,u.x,u.y,u.z),n.setXYZ(m+1,u.x,u.y,u.z),n.setXYZ(m+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,p=a.normalized,m=new l.constructor(c.length*u);let h=0,f=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?h=c[_]*a.data.stride+a.offset:h=c[_]*u;for(let d=0;d<u;d++)m[f++]=l[h++]}return new _n(m,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Be,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,p=l.length;u<p;u++){const m=l[u],h=t(m,n);c.push(h)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let p=0,m=l.length;p<m;p++){const h=l[p];u.push(h.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],p=r[l];for(let m=0,h=p.length;m<h;m++)u.push(p[m].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const p=o[l];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ja=new ve,ii=new aa,Vs=new oa,Ka=new b,Gs=new b,Ws=new b,Xs=new b,Wr=new b,Ys=new b,Ja=new b,qs=new b;class ue extends De{constructor(t=new Be,e=new bs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ys.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],p=r[c];u!==0&&(Wr.fromBufferAttribute(p,t),o?Ys.addScaledVector(Wr,u):Ys.addScaledVector(Wr.sub(e),u))}e.add(Ys)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(r),ii.copy(t.ray).recast(t.near),!(Vs.containsPoint(ii.origin)===!1&&(ii.intersectSphere(Vs,Ka)===null||ii.origin.distanceToSquared(Ka)>(t.far-t.near)**2))&&(ja.copy(r).invert(),ii.copy(t.ray).applyMatrix4(ja),!(n.boundingBox!==null&&ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ii)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,m=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let f=0,_=m.length;f<_;f++){const g=m[f],d=o[g.materialIndex],A=Math.max(g.start,h.start),E=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let v=A,I=E;v<I;v+=3){const C=a.getX(v),P=a.getX(v+1),D=a.getX(v+2);s=Zs(this,d,t,n,l,u,p,C,P,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let g=f,d=_;g<d;g+=3){const A=a.getX(g),E=a.getX(g+1),v=a.getX(g+2);s=Zs(this,o,t,n,l,u,p,A,E,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let f=0,_=m.length;f<_;f++){const g=m[f],d=o[g.materialIndex],A=Math.max(g.start,h.start),E=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let v=A,I=E;v<I;v+=3){const C=v,P=v+1,D=v+2;s=Zs(this,d,t,n,l,u,p,C,P,D),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const f=Math.max(0,h.start),_=Math.min(c.count,h.start+h.count);for(let g=f,d=_;g<d;g+=3){const A=g,E=g+1,v=g+2;s=Zs(this,o,t,n,l,u,p,A,E,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function eu(i,t,e,n,s,r,o,a){let c;if(t.side===Oe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Kn,a),c===null)return null;qs.copy(a),qs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(qs);return l<e.near||l>e.far?null:{distance:l,point:qs.clone(),object:i}}function Zs(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Gs),i.getVertexPosition(c,Ws),i.getVertexPosition(l,Xs);const u=eu(i,t,e,n,Gs,Ws,Xs,Ja);if(u){const p=new b;un.getBarycoord(Ja,Gs,Ws,Xs,p),s&&(u.uv=un.getInterpolatedAttribute(s,a,c,l,p,new ot)),r&&(u.uv1=un.getInterpolatedAttribute(r,a,c,l,p,new ot)),o&&(u.normal=un.getInterpolatedAttribute(o,a,c,l,p,new b),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const m={a,b:c,c:l,normal:new b,materialIndex:0};un.getNormal(Gs,Ws,Xs,m.normal),u.face=m,u.barycoord=p}return u}class Gt extends Be{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],p=[];let m=0,h=0;f("z","y","x",-1,-1,n,e,t,o,r,0),f("z","y","x",1,-1,n,e,-t,o,r,1),f("x","z","y",1,1,t,n,e,s,o,2),f("x","z","y",1,-1,t,n,-e,s,o,3),f("x","y","z",1,-1,t,e,n,s,r,4),f("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(p,2));function f(_,g,d,A,E,v,I,C,P,D,y){const M=v/P,L=I/D,X=v/2,k=I/2,G=C/2,K=P+1,W=D+1;let st=0,Y=0;const ut=new b;for(let mt=0;mt<W;mt++){const Et=mt*L-k;for(let zt=0;zt<K;zt++){const te=zt*M-X;ut[_]=te*A,ut[g]=Et*E,ut[d]=G,l.push(ut.x,ut.y,ut.z),ut[_]=0,ut[g]=0,ut[d]=C>0?1:-1,u.push(ut.x,ut.y,ut.z),p.push(zt/P),p.push(1-mt/D),st+=1}}for(let mt=0;mt<D;mt++)for(let Et=0;Et<P;Et++){const zt=m+Et+K*mt,te=m+Et+K*(mt+1),j=m+(Et+1)+K*(mt+1),rt=m+(Et+1)+K*mt;c.push(zt,te,rt),c.push(te,j,rt),Y+=6}a.addGroup(h,Y,y),h+=Y,m+=st}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ki(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ge(i){const t={};for(let e=0;e<i.length;e++){const n=Ki(i[e]);for(const s in n)t[s]=n[s]}return t}function nu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cl(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const iu={clone:Ki,merge:Ge};var su=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends Cs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=su,this.fragmentShader=ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ki(t.uniforms),this.uniformsGroups=nu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ll extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new b,Qa=new ot,tc=new ot;class Je extends ll{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Es*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(_s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Es*2*Math.atan(Math.tan(_s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z)}getViewSize(t,e){return this.getViewBounds(t,Qa,tc),e.subVectors(tc,Qa)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(_s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ii=-90,Ui=1;class ou extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Je(Ii,Ui,t,e);s.layers=this.layers,this.add(s);const r=new Je(Ii,Ui,t,e);r.layers=this.layers,this.add(r);const o=new Je(Ii,Ui,t,e);o.layers=this.layers,this.add(o);const a=new Je(Ii,Ui,t,e);a.layers=this.layers,this.add(a);const c=new Je(Ii,Ui,t,e);c.layers=this.layers,this.add(c);const l=new Je(Ii,Ui,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===dr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,p=t.getRenderTarget(),m=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(p,m,h),t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class hl extends Xe{constructor(t,e,n,s,r,o,a,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:qi,super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class au extends pi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new hl(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Gt(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:Ki(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:$n});r.uniforms.tEquirect.value=e;const o=new ue(s,r),a=e.minFilter;return e.minFilter===di&&(e.minFilter=gn),new ou(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Xr=new b,cu=new b,lu=new Zt;class Yn{constructor(t=new b(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Xr.subVectors(n,e).cross(cu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Xr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||lu.getNormalMatrix(t),s=this.coplanarPoint(Xr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new oa,$s=new b;class la{constructor(t=new Yn,e=new Yn,n=new Yn,s=new Yn,r=new Yn,o=new Yn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],u=s[5],p=s[6],m=s[7],h=s[8],f=s[9],_=s[10],g=s[11],d=s[12],A=s[13],E=s[14],v=s[15];if(n[0].setComponents(c-r,m-l,g-h,v-d).normalize(),n[1].setComponents(c+r,m+l,g+h,v+d).normalize(),n[2].setComponents(c+o,m+u,g+f,v+A).normalize(),n[3].setComponents(c-o,m-u,g-f,v-A).normalize(),n[4].setComponents(c-a,m-p,g-_,v-E).normalize(),e===Dn)n[5].setComponents(c+a,m+p,g+_,v+E).normalize();else if(e===dr)n[5].setComponents(a,p,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(t){return si.center.set(0,0,0),si.radius=.7071067811865476,si.applyMatrix4(t.matrixWorld),this.intersectsSphere(si)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if($s.x=s.normal.x>0?t.max.x:t.min.x,$s.y=s.normal.y>0?t.max.y:t.min.y,$s.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($s)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ul(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function hu(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,p=l.byteLength,m=i.createBuffer();i.bindBuffer(c,m),i.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=i.SHORT;else if(l instanceof Uint32Array)h=i.UNSIGNED_INT;else if(l instanceof Int32Array)h=i.INT;else if(l instanceof Int8Array)h=i.BYTE;else if(l instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:m,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,c,l){const u=c.array,p=c.updateRanges;if(i.bindBuffer(l,a),p.length===0)i.bufferSubData(l,0,u);else{p.sort((h,f)=>h.start-f.start);let m=0;for(let h=1;h<p.length;h++){const f=p[m],_=p[h];_.start<=f.start+f.count+1?f.count=Math.max(f.count,_.start+_.count-f.start):(++m,p[m]=_)}p.length=m+1;for(let h=0,f=p.length;h<f;h++){const _=p[h];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class ts extends Be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,p=t/a,m=e/c,h=[],f=[],_=[],g=[];for(let d=0;d<u;d++){const A=d*m-o;for(let E=0;E<l;E++){const v=E*p-r;f.push(v,-A,0),_.push(0,0,1),g.push(E/a),g.push(1-d/c)}}for(let d=0;d<c;d++)for(let A=0;A<a;A++){const E=A+l*d,v=A+l*(d+1),I=A+1+l*(d+1),C=A+1+l*d;h.push(E,v,C),h.push(v,I,C)}this.setIndex(h),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ts(t.width,t.height,t.widthSegments,t.heightSegments)}}var uu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,du=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_u=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,vu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Su=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Eu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Au=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Du=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Iu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Uu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Nu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Fu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ou=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ku=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$u=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ku=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ju=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,td=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ed=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,id=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,od=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ad=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ld=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hd=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
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
#endif`,ud=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,md=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_d=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Md=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ed=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Td=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ad=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ld=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Id=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ud=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Od=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,kd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$d=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,tf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ef=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,rf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,of=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,af=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const uf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,df=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ff=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_f=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,vf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,xf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Af=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Pf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Df=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,If=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ff=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:uu,alphahash_pars_fragment:du,alphamap_fragment:fu,alphamap_pars_fragment:pu,alphatest_fragment:mu,alphatest_pars_fragment:gu,aomap_fragment:_u,aomap_pars_fragment:vu,batching_pars_vertex:xu,batching_vertex:Mu,begin_vertex:yu,beginnormal_vertex:Su,bsdfs:Eu,iridescence_fragment:bu,bumpmap_pars_fragment:Tu,clipping_planes_fragment:wu,clipping_planes_pars_fragment:Au,clipping_planes_pars_vertex:Ru,clipping_planes_vertex:Cu,color_fragment:Pu,color_pars_fragment:Lu,color_pars_vertex:Du,color_vertex:Iu,common:Uu,cube_uv_reflection_fragment:Nu,defaultnormal_vertex:Fu,displacementmap_pars_vertex:Ou,displacementmap_vertex:Bu,emissivemap_fragment:zu,emissivemap_pars_fragment:ku,colorspace_fragment:Hu,colorspace_pars_fragment:Vu,envmap_fragment:Gu,envmap_common_pars_fragment:Wu,envmap_pars_fragment:Xu,envmap_pars_vertex:Yu,envmap_physical_pars_fragment:id,envmap_vertex:qu,fog_vertex:Zu,fog_pars_vertex:$u,fog_fragment:ju,fog_pars_fragment:Ku,gradientmap_pars_fragment:Ju,lightmap_pars_fragment:Qu,lights_lambert_fragment:td,lights_lambert_pars_fragment:ed,lights_pars_begin:nd,lights_toon_fragment:sd,lights_toon_pars_fragment:rd,lights_phong_fragment:od,lights_phong_pars_fragment:ad,lights_physical_fragment:cd,lights_physical_pars_fragment:ld,lights_fragment_begin:hd,lights_fragment_maps:ud,lights_fragment_end:dd,logdepthbuf_fragment:fd,logdepthbuf_pars_fragment:pd,logdepthbuf_pars_vertex:md,logdepthbuf_vertex:gd,map_fragment:_d,map_pars_fragment:vd,map_particle_fragment:xd,map_particle_pars_fragment:Md,metalnessmap_fragment:yd,metalnessmap_pars_fragment:Sd,morphinstance_vertex:Ed,morphcolor_vertex:bd,morphnormal_vertex:Td,morphtarget_pars_vertex:wd,morphtarget_vertex:Ad,normal_fragment_begin:Rd,normal_fragment_maps:Cd,normal_pars_fragment:Pd,normal_pars_vertex:Ld,normal_vertex:Dd,normalmap_pars_fragment:Id,clearcoat_normal_fragment_begin:Ud,clearcoat_normal_fragment_maps:Nd,clearcoat_pars_fragment:Fd,iridescence_pars_fragment:Od,opaque_fragment:Bd,packing:zd,premultiplied_alpha_fragment:kd,project_vertex:Hd,dithering_fragment:Vd,dithering_pars_fragment:Gd,roughnessmap_fragment:Wd,roughnessmap_pars_fragment:Xd,shadowmap_pars_fragment:Yd,shadowmap_pars_vertex:qd,shadowmap_vertex:Zd,shadowmask_pars_fragment:$d,skinbase_vertex:jd,skinning_pars_vertex:Kd,skinning_vertex:Jd,skinnormal_vertex:Qd,specularmap_fragment:tf,specularmap_pars_fragment:ef,tonemapping_fragment:nf,tonemapping_pars_fragment:sf,transmission_fragment:rf,transmission_pars_fragment:of,uv_pars_fragment:af,uv_pars_vertex:cf,uv_vertex:lf,worldpos_vertex:hf,background_vert:uf,background_frag:df,backgroundCube_vert:ff,backgroundCube_frag:pf,cube_vert:mf,cube_frag:gf,depth_vert:_f,depth_frag:vf,distanceRGBA_vert:xf,distanceRGBA_frag:Mf,equirect_vert:yf,equirect_frag:Sf,linedashed_vert:Ef,linedashed_frag:bf,meshbasic_vert:Tf,meshbasic_frag:wf,meshlambert_vert:Af,meshlambert_frag:Rf,meshmatcap_vert:Cf,meshmatcap_frag:Pf,meshnormal_vert:Lf,meshnormal_frag:Df,meshphong_vert:If,meshphong_frag:Uf,meshphysical_vert:Nf,meshphysical_frag:Ff,meshtoon_vert:Of,meshtoon_frag:Bf,points_vert:zf,points_frag:kf,shadow_vert:Hf,shadow_frag:Vf,sprite_vert:Gf,sprite_frag:Wf},_t={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},mn={basic:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Qt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Ge([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Ge([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Qt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Ge([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Ge([_t.points,_t.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Ge([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Ge([_t.common,_t.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Ge([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Ge([_t.sprite,_t.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Ge([_t.common,_t.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Ge([_t.lights,_t.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};mn.physical={uniforms:Ge([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const js={r:0,b:0,g:0},ri=new vn,Xf=new ve;function Yf(i,t,e,n,s,r,o){const a=new Qt(0);let c=r===!0?0:1,l,u,p=null,m=0,h=null;function f(A){let E=A.isScene===!0?A.background:null;return E&&E.isTexture&&(E=(A.backgroundBlurriness>0?e:t).get(E)),E}function _(A){let E=!1;const v=f(A);v===null?d(a,c):v&&v.isColor&&(d(v,1),E=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(A,E){const v=f(E);v&&(v.isCubeTexture||v.mapping===gr)?(u===void 0&&(u=new ue(new Gt(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Ki(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(I,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ri.copy(E.backgroundRotation),ri.x*=-1,ri.y*=-1,ri.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Xf.makeRotationFromEuler(ri)),u.material.toneMapped=se.getTransfer(v.colorSpace)!==fe,(p!==v||m!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,p=v,m=v.version,h=i.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ue(new ts(2,2),new Jn({name:"BackgroundMaterial",uniforms:Ki(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=se.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(p!==v||m!==v.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,p=v,m=v.version,h=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function d(A,E){A.getRGB(js,cl(i)),n.buffers.color.setClear(js.r,js.g,js.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(A,E=1){a.set(A),c=E,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,d(a,c)},render:_,addToRenderList:g}}function qf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=m(null);let r=s,o=!1;function a(M,L,X,k,G){let K=!1;const W=p(k,X,L);r!==W&&(r=W,l(r.object)),K=h(M,k,X,G),K&&f(M,k,X,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,v(M,L,X,k),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function p(M,L,X){const k=X.wireframe===!0;let G=n[M.id];G===void 0&&(G={},n[M.id]=G);let K=G[L.id];K===void 0&&(K={},G[L.id]=K);let W=K[k];return W===void 0&&(W=m(c()),K[k]=W),W}function m(M){const L=[],X=[],k=[];for(let G=0;G<e;G++)L[G]=0,X[G]=0,k[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:X,attributeDivisors:k,object:M,attributes:{},index:null}}function h(M,L,X,k){const G=r.attributes,K=L.attributes;let W=0;const st=X.getAttributes();for(const Y in st)if(st[Y].location>=0){const mt=G[Y];let Et=K[Y];if(Et===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(Et=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(Et=M.instanceColor)),mt===void 0||mt.attribute!==Et||Et&&mt.data!==Et.data)return!0;W++}return r.attributesNum!==W||r.index!==k}function f(M,L,X,k){const G={},K=L.attributes;let W=0;const st=X.getAttributes();for(const Y in st)if(st[Y].location>=0){let mt=K[Y];mt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor));const Et={};Et.attribute=mt,mt&&mt.data&&(Et.data=mt.data),G[Y]=Et,W++}r.attributes=G,r.attributesNum=W,r.index=k}function _(){const M=r.newAttributes;for(let L=0,X=M.length;L<X;L++)M[L]=0}function g(M){d(M,0)}function d(M,L){const X=r.newAttributes,k=r.enabledAttributes,G=r.attributeDivisors;X[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),G[M]!==L&&(i.vertexAttribDivisor(M,L),G[M]=L)}function A(){const M=r.newAttributes,L=r.enabledAttributes;for(let X=0,k=L.length;X<k;X++)L[X]!==M[X]&&(i.disableVertexAttribArray(X),L[X]=0)}function E(M,L,X,k,G,K,W){W===!0?i.vertexAttribIPointer(M,L,X,G,K):i.vertexAttribPointer(M,L,X,k,G,K)}function v(M,L,X,k){_();const G=k.attributes,K=X.getAttributes(),W=L.defaultAttributeValues;for(const st in K){const Y=K[st];if(Y.location>=0){let ut=G[st];if(ut===void 0&&(st==="instanceMatrix"&&M.instanceMatrix&&(ut=M.instanceMatrix),st==="instanceColor"&&M.instanceColor&&(ut=M.instanceColor)),ut!==void 0){const mt=ut.normalized,Et=ut.itemSize,zt=t.get(ut);if(zt===void 0)continue;const te=zt.buffer,j=zt.type,rt=zt.bytesPerElement,vt=j===i.INT||j===i.UNSIGNED_INT||ut.gpuType===Qo;if(ut.isInterleavedBufferAttribute){const at=ut.data,Rt=at.stride,Nt=ut.offset;if(at.isInstancedInterleavedBuffer){for(let Ot=0;Ot<Y.locationSize;Ot++)d(Y.location+Ot,at.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Ot=0;Ot<Y.locationSize;Ot++)g(Y.location+Ot);i.bindBuffer(i.ARRAY_BUFFER,te);for(let Ot=0;Ot<Y.locationSize;Ot++)E(Y.location+Ot,Et/Y.locationSize,j,mt,Rt*rt,(Nt+Et/Y.locationSize*Ot)*rt,vt)}else{if(ut.isInstancedBufferAttribute){for(let at=0;at<Y.locationSize;at++)d(Y.location+at,ut.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let at=0;at<Y.locationSize;at++)g(Y.location+at);i.bindBuffer(i.ARRAY_BUFFER,te);for(let at=0;at<Y.locationSize;at++)E(Y.location+at,Et/Y.locationSize,j,mt,Et*rt,Et/Y.locationSize*at*rt,vt)}}else if(W!==void 0){const mt=W[st];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(Y.location,mt);break;case 3:i.vertexAttrib3fv(Y.location,mt);break;case 4:i.vertexAttrib4fv(Y.location,mt);break;default:i.vertexAttrib1fv(Y.location,mt)}}}}A()}function I(){D();for(const M in n){const L=n[M];for(const X in L){const k=L[X];for(const G in k)u(k[G].object),delete k[G];delete L[X]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const X in L){const k=L[X];for(const G in k)u(k[G].object),delete k[G];delete L[X]}delete n[M.id]}function P(M){for(const L in n){const X=n[L];if(X[M.id]===void 0)continue;const k=X[M.id];for(const G in k)u(k[G].object),delete k[G];delete X[M.id]}}function D(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:y,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:A}}function Zf(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,p){p!==0&&(i.drawArraysInstanced(n,l,u,p),e.update(u,n,p))}function a(l,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,p);let h=0;for(let f=0;f<p;f++)h+=u[f];e.update(h,n,1)}function c(l,u,p,m){if(p===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let f=0;f<l.length;f++)o(l[f],u[f],m[f]);else{h.multiDrawArraysInstancedWEBGL(n,l,0,u,0,m,0,p);let f=0;for(let _=0;_<p;_++)f+=u[_]*m[_];e.update(f,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function $f(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==dn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const D=P===Rs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Un&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ln&&!D)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const p=e.logarithmicDepthBuffer===!0,m=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=f>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:p,reverseDepthBuffer:m,maxTextures:h,maxVertexTextures:f,maxTextureSize:_,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:A,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:I,maxSamples:C}}function jf(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Yn,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const h=p.length!==0||m||n!==0||s;return s=m,n=p.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){e=u(p,m,0)},this.setState=function(p,m,h){const f=p.clippingPlanes,_=p.clipIntersection,g=p.clipShadows,d=i.get(p);if(!s||f===null||f.length===0||r&&!g)r?u(null):l();else{const A=r?0:n,E=A*4;let v=d.clippingState||null;c.value=v,v=u(f,m,E,h);for(let I=0;I!==E;++I)v[I]=e[I];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,m,h,f){const _=p!==null?p.length:0;let g=null;if(_!==0){if(g=c.value,f!==!0||g===null){const d=h+_*4,A=m.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<d)&&(g=new Float32Array(d));for(let E=0,v=h;E!==_;++E,v+=4)o.copy(p[E]).applyMatrix4(A,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Kf(i){let t=new WeakMap;function e(o,a){return a===_o?o.mapping=qi:a===vo&&(o.mapping=Zi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===_o||a===vo)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new au(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class dl extends ll{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const zi=4,ec=[.125,.215,.35,.446,.526,.582],hi=20,Yr=new dl,nc=new Qt;let qr=null,Zr=0,$r=0,jr=!1;const ai=(1+Math.sqrt(5))/2,Ni=1/ai,ic=[new b(-ai,Ni,0),new b(ai,Ni,0),new b(-Ni,0,ai),new b(Ni,0,ai),new b(0,ai,-Ni),new b(0,ai,Ni),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class qo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){qr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),jr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(qr,Zr,$r),this._renderer.xr.enabled=jr,t.scissorTest=!1,Ks(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qr=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),$r=this._renderer.getActiveMipmapLevel(),jr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:Rs,format:dn,colorSpace:Ji,depthBuffer:!1},s=sc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jf(r)),this._blurMaterial=Qf(r,t,e)}return s}_compileMaterial(t){const e=new ue(this._lodPlanes[0],t);this._renderer.compile(e,Yr)}_sceneToCubeUV(t,e,n,s){const a=new Je(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(nc),u.toneMapping=jn,u.autoClear=!1;const h=new bs({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),f=new ue(new Gt,h);let _=!1;const g=t.background;g?g.isColor&&(h.color.copy(g),t.background=null,_=!0):(h.color.copy(nc),_=!0);for(let d=0;d<6;d++){const A=d%3;A===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):A===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const E=this._cubeSize;Ks(s,A*E,d>2?E:0,E,E),u.setRenderTarget(s),_&&u.render(f,a),u.render(t,a)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=m,u.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===qi||t.mapping===Zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=oc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ue(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Ks(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Yr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ic[(s-r-1)%ic.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,p=new ue(this._lodPlanes[s],l),m=l.uniforms,h=this._sizeLods[n]-1,f=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*hi-1),_=r/f,g=isFinite(r)?1+Math.floor(u*_):hi;g>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${hi}`);const d=[];let A=0;for(let P=0;P<hi;++P){const D=P/_,y=Math.exp(-D*D/2);d.push(y),P===0?A+=y:P<g&&(A+=2*y)}for(let P=0;P<d.length;P++)d[P]=d[P]/A;m.envMap.value=t.texture,m.samples.value=g,m.weights.value=d,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:E}=this;m.dTheta.value=f,m.mipInt.value=E-n;const v=this._sizeLods[s],I=3*v*(s>E-zi?s-E+zi:0),C=4*(this._cubeSize-v);Ks(e,I,C,3*v,2*v),c.setRenderTarget(e),c.render(p,Yr)}}function Jf(i){const t=[],e=[],n=[];let s=i;const r=i-zi+1+ec.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-zi?c=ec[o-i+zi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,p=1+l,m=[u,u,p,u,p,p,u,u,p,p,u,p],h=6,f=6,_=3,g=2,d=1,A=new Float32Array(_*f*h),E=new Float32Array(g*f*h),v=new Float32Array(d*f*h);for(let C=0;C<h;C++){const P=C%3*2/3-1,D=C>2?0:-1,y=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];A.set(y,_*f*C),E.set(m,g*f*C);const M=[C,C,C,C,C,C];v.set(M,d*f*C)}const I=new Be;I.setAttribute("position",new _n(A,_)),I.setAttribute("uv",new _n(E,g)),I.setAttribute("faceIndex",new _n(v,d)),t.push(I),s>zi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function sc(i,t,e){const n=new pi(i,t,e);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ks(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Qf(i,t,e){const n=new Float32Array(hi),s=new b(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function rc(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function oc(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function ha(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function tp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===_o||c===vo,u=c===qi||c===Zi;if(l||u){let p=t.get(a);const m=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return e===null&&(e=new qo(i)),p=l?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const h=a.image;return l&&h&&h.height>0||u&&h&&s(h)?(e===null&&(e=new qo(i)),p=l?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function ep(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ms("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function np(i,t,e,n){const s={},r=new WeakMap;function o(p){const m=p.target;m.index!==null&&t.remove(m.index);for(const f in m.attributes)t.remove(m.attributes[f]);for(const f in m.morphAttributes){const _=m.morphAttributes[f];for(let g=0,d=_.length;g<d;g++)t.remove(_[g])}m.removeEventListener("dispose",o),delete s[m.id];const h=r.get(m);h&&(t.remove(h),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function a(p,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,e.memory.geometries++),m}function c(p){const m=p.attributes;for(const f in m)t.update(m[f],i.ARRAY_BUFFER);const h=p.morphAttributes;for(const f in h){const _=h[f];for(let g=0,d=_.length;g<d;g++)t.update(_[g],i.ARRAY_BUFFER)}}function l(p){const m=[],h=p.index,f=p.attributes.position;let _=0;if(h!==null){const A=h.array;_=h.version;for(let E=0,v=A.length;E<v;E+=3){const I=A[E+0],C=A[E+1],P=A[E+2];m.push(I,C,C,P,P,I)}}else if(f!==void 0){const A=f.array;_=f.version;for(let E=0,v=A.length/3-1;E<v;E+=3){const I=E+0,C=E+1,P=E+2;m.push(I,C,C,P,P,I)}}else return;const g=new(nl(m)?al:ol)(m,1);g.version=_;const d=r.get(p);d&&t.remove(d),r.set(p,g)}function u(p){const m=r.get(p);if(m){const h=p.index;h!==null&&m.version<h.version&&l(p)}else l(p);return r.get(p)}return{get:a,update:c,getWireframeAttribute:u}}function ip(i,t,e){let n;function s(m){n=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function c(m,h){i.drawElements(n,h,r,m*o),e.update(h,n,1)}function l(m,h,f){f!==0&&(i.drawElementsInstanced(n,h,r,m*o,f),e.update(h,n,f))}function u(m,h,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,m,0,f);let g=0;for(let d=0;d<f;d++)g+=h[d];e.update(g,n,1)}function p(m,h,f,_){if(f===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<m.length;d++)l(m[d]/o,h[d],_[d]);else{g.multiDrawElementsInstancedWEBGL(n,h,0,r,m,0,_,0,f);let d=0;for(let A=0;A<f;A++)d+=h[A]*_[A];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=p}function sp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function rp(i,t,e){const n=new WeakMap,s=new me;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0;let m=n.get(a);if(m===void 0||m.count!==p){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};m!==void 0&&m.texture.dispose();const h=a.morphAttributes.position!==void 0,f=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],A=a.morphAttributes.color||[];let E=0;h===!0&&(E=1),f===!0&&(E=2),_===!0&&(E=3);let v=a.attributes.position.count*E,I=1;v>t.maxTextureSize&&(I=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const C=new Float32Array(v*I*4*p),P=new sl(C,v,I,p);P.type=Ln,P.needsUpdate=!0;const D=E*4;for(let M=0;M<p;M++){const L=g[M],X=d[M],k=A[M],G=v*I*4*M;for(let K=0;K<L.count;K++){const W=K*D;h===!0&&(s.fromBufferAttribute(L,K),C[G+W+0]=s.x,C[G+W+1]=s.y,C[G+W+2]=s.z,C[G+W+3]=0),f===!0&&(s.fromBufferAttribute(X,K),C[G+W+4]=s.x,C[G+W+5]=s.y,C[G+W+6]=s.z,C[G+W+7]=0),_===!0&&(s.fromBufferAttribute(k,K),C[G+W+8]=s.x,C[G+W+9]=s.y,C[G+W+10]=s.z,C[G+W+11]=k.itemSize===4?s.w:1)}}m={count:p,texture:P,size:new ot(v,I)},n.set(a,m),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let h=0;for(let _=0;_<l.length;_++)h+=l[_];const f=a.morphTargetsRelative?1:1-h;c.getUniforms().setValue(i,"morphTargetBaseInfluence",f),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:r}}function op(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,p=t.get(c,u);if(s.get(p)!==l&&(t.update(p),s.set(p,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const m=c.skeleton;s.get(m)!==l&&(m.update(),s.set(m,l))}return p}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class fl extends Xe{constructor(t,e,n,s,r,o,a,c,l,u=Wi){if(u!==Wi&&u!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Wi&&(n=fi),n===void 0&&u===ji&&(n=$i),super(null,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:fn,this.minFilter=c!==void 0?c:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pl=new Xe,ac=new fl(1,1),ml=new sl,gl=new Xh,_l=new hl,cc=[],lc=[],hc=new Float32Array(16),uc=new Float32Array(9),dc=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=cc[s];if(r===void 0&&(r=new Float32Array(s),cc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function we(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vr(i,t){let e=lc[t];e===void 0&&(e=new Int32Array(t),lc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function ap(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function lp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function up(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;dc.set(n),i.uniformMatrix2fv(this.addr,!1,dc),Ae(e,n)}}function dp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;uc.set(n),i.uniformMatrix3fv(this.addr,!1,uc),Ae(e,n)}}function fp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(we(e,n))return;hc.set(n),i.uniformMatrix4fv(this.addr,!1,hc),Ae(e,n)}}function pp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function _p(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function vp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function Mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function Sp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ac.compareFunction=el,r=ac):r=pl,e.setTexture2D(t||r,s)}function Ep(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gl,s)}function bp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||_l,s)}function Tp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ml,s)}function wp(i){switch(i){case 5126:return ap;case 35664:return cp;case 35665:return lp;case 35666:return hp;case 35674:return up;case 35675:return dp;case 35676:return fp;case 5124:case 35670:return pp;case 35667:case 35671:return mp;case 35668:case 35672:return gp;case 35669:case 35673:return _p;case 5125:return vp;case 36294:return xp;case 36295:return Mp;case 36296:return yp;case 35678:case 36198:case 36298:case 36306:case 35682:return Sp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return bp;case 36289:case 36303:case 36311:case 36292:return Tp}}function Ap(i,t){i.uniform1fv(this.addr,t)}function Rp(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function Cp(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function Pp(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function Lp(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Dp(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ip(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Up(i,t){i.uniform1iv(this.addr,t)}function Np(i,t){i.uniform2iv(this.addr,t)}function Fp(i,t){i.uniform3iv(this.addr,t)}function Op(i,t){i.uniform4iv(this.addr,t)}function Bp(i,t){i.uniform1uiv(this.addr,t)}function zp(i,t){i.uniform2uiv(this.addr,t)}function kp(i,t){i.uniform3uiv(this.addr,t)}function Hp(i,t){i.uniform4uiv(this.addr,t)}function Vp(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||pl,r[o])}function Gp(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||gl,r[o])}function Wp(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||_l,r[o])}function Xp(i,t,e){const n=this.cache,s=t.length,r=vr(e,s);we(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ml,r[o])}function Yp(i){switch(i){case 5126:return Ap;case 35664:return Rp;case 35665:return Cp;case 35666:return Pp;case 35674:return Lp;case 35675:return Dp;case 35676:return Ip;case 5124:case 35670:return Up;case 35667:case 35671:return Np;case 35668:case 35672:return Fp;case 35669:case 35673:return Op;case 5125:return Bp;case 36294:return zp;case 36295:return kp;case 36296:return Hp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Gp;case 35680:case 36300:case 36308:case 36293:return Wp;case 36289:case 36303:case 36311:case 36292:return Xp}}class qp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wp(e.type)}}class Zp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yp(e.type)}}class $p{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Kr=/(\w+)(\])?(\[|\.)?/g;function fc(i,t){i.seq.push(t),i.map[t.id]=t}function jp(i,t,e){const n=i.name,s=n.length;for(Kr.lastIndex=0;;){const r=Kr.exec(n),o=Kr.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){fc(e,l===void 0?new qp(a,i,t):new Zp(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new $p(a),fc(e,p)),e=p}}}class lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);jp(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function pc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Kp=37297;let Jp=0;function Qp(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const mc=new Zt;function tm(i){se._getMatrix(mc,se.workingColorSpace,i);const t=`mat3( ${mc.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case _r:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function gc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Qp(i.getShaderSource(t),o)}else return s}function em(i,t){const e=tm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nm(i,t){let e;switch(t){case sh:e="Linear";break;case rh:e="Reinhard";break;case oh:e="Cineon";break;case Vc:e="ACESFilmic";break;case ch:e="AgX";break;case lh:e="Neutral";break;case ah:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Js=new b;function im(){se.getLuminanceCoefficients(Js);const i=Js.x.toFixed(4),t=Js.y.toFixed(4),e=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function rm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function om(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function gs(i){return i!==""}function _c(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function vc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const am=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zo(i){return i.replace(am,lm)}const cm=new Map;function lm(i,t){let e=$t[t];if(e===void 0){const n=cm.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zo(e)}const hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xc(i){return i.replace(hm,um)}function um(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function dm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===kc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ol?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Cn&&(t="SHADOWMAP_TYPE_VSM"),t}function fm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case Zi:t="ENVMAP_TYPE_CUBE";break;case gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function pm(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Zi:t="ENVMAP_MODE_REFRACTION";break}return t}function mm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hc:t="ENVMAP_BLENDING_MULTIPLY";break;case nh:t="ENVMAP_BLENDING_MIX";break;case ih:t="ENVMAP_BLENDING_ADD";break}return t}function gm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function _m(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=dm(e),l=fm(e),u=pm(e),p=mm(e),m=gm(e),h=sm(e),f=rm(r),_=s.createProgram();let g,d,A=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(gs).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(gs).join(`
`),d.length>0&&(d+=`
`)):(g=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),d=[Mc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==jn?"#define TONE_MAPPING":"",e.toneMapping!==jn?$t.tonemapping_pars_fragment:"",e.toneMapping!==jn?nm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,em("linearToOutputTexel",e.outputColorSpace),im(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gs).join(`
`)),o=Zo(o),o=_c(o,e),o=vc(o,e),a=Zo(a),a=_c(a,e),a=vc(a,e),o=xc(o),a=xc(a),e.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===Ia?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ia?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=A+g+o,v=A+d+a,I=pc(s,s.VERTEX_SHADER,E),C=pc(s,s.FRAGMENT_SHADER,v);s.attachShader(_,I),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(L){if(i.debug.checkShaderErrors){const X=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(I).trim(),G=s.getShaderInfoLog(C).trim();let K=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(K=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,I,C);else{const st=gc(s,I,"vertex"),Y=gc(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+st+`
`+Y)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(k===""||G==="")&&(W=!1);W&&(L.diagnostics={runnable:K,programLog:X,vertexShader:{log:k,prefix:g},fragmentShader:{log:G,prefix:d}})}s.deleteShader(I),s.deleteShader(C),D=new lr(s,_),y=om(s,_)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Kp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Jp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=C,this}let vm=0;class xm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Mm(t),e.set(t,n)),n}}class Mm{constructor(t){this.id=vm++,this.code=t,this.usedTimes=0}}function ym(i,t,e,n,s,r,o){const a=new ca,c=new xm,l=new Set,u=[],p=s.logarithmicDepthBuffer,m=s.vertexTextures;let h=s.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,M,L,X,k){const G=X.fog,K=k.geometry,W=y.isMeshStandardMaterial?X.environment:null,st=(y.isMeshStandardMaterial?e:t).get(y.envMap||W),Y=st&&st.mapping===gr?st.image.height:null,ut=f[y.type];y.precision!==null&&(h=s.getMaxPrecision(y.precision),h!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const mt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Et=mt!==void 0?mt.length:0;let zt=0;K.morphAttributes.position!==void 0&&(zt=1),K.morphAttributes.normal!==void 0&&(zt=2),K.morphAttributes.color!==void 0&&(zt=3);let te,j,rt,vt;if(ut){const ce=mn[ut];te=ce.vertexShader,j=ce.fragmentShader}else te=y.vertexShader,j=y.fragmentShader,c.update(y),rt=c.getVertexShaderID(y),vt=c.getFragmentShaderID(y);const at=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Nt=k.isInstancedMesh===!0,Ot=k.isBatchedMesh===!0,Yt=!!y.map,J=!!y.matcap,O=!!st,w=!!y.aoMap,pt=!!y.lightMap,Q=!!y.bumpMap,ft=!!y.normalMap,ct=!!y.displacementMap,Dt=!!y.emissiveMap,xt=!!y.metalnessMap,T=!!y.roughnessMap,x=y.anisotropy>0,B=y.clearcoat>0,q=y.dispersion>0,et=y.iridescence>0,$=y.sheen>0,Tt=y.transmission>0,dt=x&&!!y.anisotropyMap,Mt=B&&!!y.clearcoatMap,Wt=B&&!!y.clearcoatNormalMap,it=B&&!!y.clearcoatRoughnessMap,bt=et&&!!y.iridescenceMap,Ft=et&&!!y.iridescenceThicknessMap,Ht=$&&!!y.sheenColorMap,wt=$&&!!y.sheenRoughnessMap,Kt=!!y.specularMap,qt=!!y.specularColorMap,de=!!y.specularIntensityMap,U=Tt&&!!y.transmissionMap,lt=Tt&&!!y.thicknessMap,Z=!!y.gradientMap,tt=!!y.alphaMap,gt=y.alphaTest>0,yt=!!y.alphaHash,Xt=!!y.extensions;let _e=jn;y.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(_e=i.toneMapping);const Me={shaderID:ut,shaderType:y.type,shaderName:y.name,vertexShader:te,fragmentShader:j,defines:y.defines,customVertexShaderID:rt,customFragmentShaderID:vt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Ot,batchingColor:Ot&&k._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&k.instanceColor!==null,instancingMorph:Nt&&k.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Ji,alphaToCoverage:!!y.alphaToCoverage,map:Yt,matcap:J,envMap:O,envMapMode:O&&st.mapping,envMapCubeUVHeight:Y,aoMap:w,lightMap:pt,bumpMap:Q,normalMap:ft,displacementMap:m&&ct,emissiveMap:Dt,normalMapObjectSpace:ft&&y.normalMapType===fh,normalMapTangentSpace:ft&&y.normalMapType===tl,metalnessMap:xt,roughnessMap:T,anisotropy:x,anisotropyMap:dt,clearcoat:B,clearcoatMap:Mt,clearcoatNormalMap:Wt,clearcoatRoughnessMap:it,dispersion:q,iridescence:et,iridescenceMap:bt,iridescenceThicknessMap:Ft,sheen:$,sheenColorMap:Ht,sheenRoughnessMap:wt,specularMap:Kt,specularColorMap:qt,specularIntensityMap:de,transmission:Tt,transmissionMap:U,thicknessMap:lt,gradientMap:Z,opaque:y.transparent===!1&&y.blending===Gi&&y.alphaToCoverage===!1,alphaMap:tt,alphaTest:gt,alphaHash:yt,combine:y.combine,mapUv:Yt&&_(y.map.channel),aoMapUv:w&&_(y.aoMap.channel),lightMapUv:pt&&_(y.lightMap.channel),bumpMapUv:Q&&_(y.bumpMap.channel),normalMapUv:ft&&_(y.normalMap.channel),displacementMapUv:ct&&_(y.displacementMap.channel),emissiveMapUv:Dt&&_(y.emissiveMap.channel),metalnessMapUv:xt&&_(y.metalnessMap.channel),roughnessMapUv:T&&_(y.roughnessMap.channel),anisotropyMapUv:dt&&_(y.anisotropyMap.channel),clearcoatMapUv:Mt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(y.sheenRoughnessMap.channel),specularMapUv:Kt&&_(y.specularMap.channel),specularColorMapUv:qt&&_(y.specularColorMap.channel),specularIntensityMapUv:de&&_(y.specularIntensityMap.channel),transmissionMapUv:U&&_(y.transmissionMap.channel),thicknessMapUv:lt&&_(y.thicknessMap.channel),alphaMapUv:tt&&_(y.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ft||x),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!K.attributes.uv&&(Yt||tt),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Rt,skinning:k.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:_e,decodeVideoTexture:Yt&&y.map.isVideoTexture===!0&&se.getTransfer(y.map.colorSpace)===fe,decodeVideoTextureEmissive:Dt&&y.emissiveMap.isVideoTexture===!0&&se.getTransfer(y.emissiveMap.colorSpace)===fe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===sn,flipSided:y.side===Oe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Xt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xt&&y.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function d(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)M.push(L),M.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(A(M,y),E(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function A(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function E(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const M=f[y.type];let L;if(M){const X=mn[M];L=iu.clone(X.uniforms)}else L=y.uniforms;return L}function I(y,M){let L;for(let X=0,k=u.length;X<k;X++){const G=u[X];if(G.cacheKey===M){L=G,++L.usedTimes;break}}return L===void 0&&(L=new _m(i,M,y,r),u.push(L)),L}function C(y){if(--y.usedTimes===0){const M=u.indexOf(y);u[M]=u[u.length-1],u.pop(),y.destroy()}}function P(y){c.remove(y)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:v,acquireProgram:I,releaseProgram:C,releaseShaderCache:P,programs:u,dispose:D}}function Sm(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Em(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function yc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Sc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,m,h,f,_,g){let d=i[t];return d===void 0?(d={id:p.id,object:p,geometry:m,material:h,groupOrder:f,renderOrder:p.renderOrder,z:_,group:g},i[t]=d):(d.id=p.id,d.object=p,d.geometry=m,d.material=h,d.groupOrder=f,d.renderOrder=p.renderOrder,d.z=_,d.group=g),t++,d}function a(p,m,h,f,_,g){const d=o(p,m,h,f,_,g);h.transmission>0?n.push(d):h.transparent===!0?s.push(d):e.push(d)}function c(p,m,h,f,_,g){const d=o(p,m,h,f,_,g);h.transmission>0?n.unshift(d):h.transparent===!0?s.unshift(d):e.unshift(d)}function l(p,m){e.length>1&&e.sort(p||Em),n.length>1&&n.sort(m||yc),s.length>1&&s.sort(m||yc)}function u(){for(let p=t,m=i.length;p<m;p++){const h=i[p];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function bm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Sc,i.set(n,[o])):s>=r.length?(o=new Sc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Tm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new b,color:new Qt};break;case"SpotLight":e={position:new b,direction:new b,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new b,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new b,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new b,halfWidth:new b,halfHeight:new b};break}return i[t.id]=e,e}}}function wm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Am=0;function Rm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Cm(i){const t=new Tm,e=wm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new b);const s=new b,r=new ve,o=new ve;function a(l){let u=0,p=0,m=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let h=0,f=0,_=0,g=0,d=0,A=0,E=0,v=0,I=0,C=0,P=0;l.sort(Rm);for(let y=0,M=l.length;y<M;y++){const L=l[y],X=L.color,k=L.intensity,G=L.distance,K=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=X.r*k,p+=X.g*k,m+=X.b*k;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],k);P++}else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const st=L.shadow,Y=e.get(L);Y.shadowIntensity=st.intensity,Y.shadowBias=st.bias,Y.shadowNormalBias=st.normalBias,Y.shadowRadius=st.radius,Y.shadowMapSize=st.mapSize,n.directionalShadow[h]=Y,n.directionalShadowMap[h]=K,n.directionalShadowMatrix[h]=L.shadow.matrix,A++}n.directional[h]=W,h++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(X).multiplyScalar(k),W.distance=G,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[_]=W;const st=L.shadow;if(L.map&&(n.spotLightMap[I]=L.map,I++,st.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[_]=st.matrix,L.castShadow){const Y=e.get(L);Y.shadowIntensity=st.intensity,Y.shadowBias=st.bias,Y.shadowNormalBias=st.normalBias,Y.shadowRadius=st.radius,Y.shadowMapSize=st.mapSize,n.spotShadow[_]=Y,n.spotShadowMap[_]=K,v++}_++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(X).multiplyScalar(k),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=W,g++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const st=L.shadow,Y=e.get(L);Y.shadowIntensity=st.intensity,Y.shadowBias=st.bias,Y.shadowNormalBias=st.normalBias,Y.shadowRadius=st.radius,Y.shadowMapSize=st.mapSize,Y.shadowCameraNear=st.camera.near,Y.shadowCameraFar=st.camera.far,n.pointShadow[f]=Y,n.pointShadowMap[f]=K,n.pointShadowMatrix[f]=L.shadow.matrix,E++}n.point[f]=W,f++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(k),W.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[d]=W,d++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=m;const D=n.hash;(D.directionalLength!==h||D.pointLength!==f||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==d||D.numDirectionalShadows!==A||D.numPointShadows!==E||D.numSpotShadows!==v||D.numSpotMaps!==I||D.numLightProbes!==P)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=g,n.point.length=f,n.hemi.length=d,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+I-C,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=P,D.directionalLength=h,D.pointLength=f,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=d,D.numDirectionalShadows=A,D.numPointShadows=E,D.numSpotShadows=v,D.numSpotMaps=I,D.numLightProbes=P,n.version=Am++)}function c(l,u){let p=0,m=0,h=0,f=0,_=0;const g=u.matrixWorldInverse;for(let d=0,A=l.length;d<A;d++){const E=l[d];if(E.isDirectionalLight){const v=n.directional[p];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),p++}else if(E.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),h++}else if(E.isRectAreaLight){const v=n.rectArea[f];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),f++}else if(E.isPointLight){const v=n.point[m];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(g),m++}else if(E.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Ec(i){const t=new Cm(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Pm(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ec(i),t.set(s,[a])):r>=o.length?(a=new Ec(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Lm extends Cs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=uh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Dm extends Cs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Im=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Um=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Nm(i,t,e){let n=new la;const s=new ot,r=new ot,o=new me,a=new Lm({depthPacking:dh}),c=new Dm,l={},u=e.maxTextureSize,p={[Kn]:Oe,[Oe]:Kn,[sn]:sn},m=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:Im,fragmentShader:Um}),h=m.clone();h.defines.HORIZONTAL_PASS=1;const f=new Be;f.setAttribute("position",new _n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ue(f,m),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kc;let d=this.type;this.render=function(C,P,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const y=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),X=i.state;X.setBlending($n),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const k=d!==Cn&&this.type===Cn,G=d===Cn&&this.type!==Cn;for(let K=0,W=C.length;K<W;K++){const st=C[K],Y=st.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",st,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ut=Y.getFrameExtents();if(s.multiply(ut),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ut.x),s.x=r.x*ut.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ut.y),s.y=r.y*ut.y,Y.mapSize.y=r.y)),Y.map===null||k===!0||G===!0){const Et=this.type!==Cn?{minFilter:fn,magFilter:fn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new pi(s.x,s.y,Et),Y.map.texture.name=st.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const mt=Y.getViewportCount();for(let Et=0;Et<mt;Et++){const zt=Y.getViewport(Et);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),X.viewport(o),Y.updateMatrices(st,Et),n=Y.getFrustum(),v(P,D,Y.camera,st,this.type)}Y.isPointLightShadow!==!0&&this.type===Cn&&A(Y,D),Y.needsUpdate=!1}d=this.type,g.needsUpdate=!1,i.setRenderTarget(y,M,L)};function A(C,P){const D=t.update(_);m.defines.VSM_SAMPLES!==C.blurSamples&&(m.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pi(s.x,s.y)),m.uniforms.shadow_pass.value=C.map.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(P,null,D,m,_,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(P,null,D,h,_,null)}function E(C,P,D,y){let M=null;const L=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)M=L;else if(M=D.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const X=M.uuid,k=P.uuid;let G=l[X];G===void 0&&(G={},l[X]=G);let K=G[k];K===void 0&&(K=M.clone(),G[k]=K,P.addEventListener("dispose",I)),M=K}if(M.visible=P.visible,M.wireframe=P.wireframe,y===Cn?M.side=P.shadowSide!==null?P.shadowSide:P.side:M.side=P.shadowSide!==null?P.shadowSide:p[P.side],M.alphaMap=P.alphaMap,M.alphaTest=P.alphaTest,M.map=P.map,M.clipShadows=P.clipShadows,M.clippingPlanes=P.clippingPlanes,M.clipIntersection=P.clipIntersection,M.displacementMap=P.displacementMap,M.displacementScale=P.displacementScale,M.displacementBias=P.displacementBias,M.wireframeLinewidth=P.wireframeLinewidth,M.linewidth=P.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const X=i.properties.get(M);X.light=D}return M}function v(C,P,D,y,M){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===Cn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const k=t.update(C),G=C.material;if(Array.isArray(G)){const K=k.groups;for(let W=0,st=K.length;W<st;W++){const Y=K[W],ut=G[Y.materialIndex];if(ut&&ut.visible){const mt=E(C,ut,y,M);C.onBeforeShadow(i,C,P,D,k,mt,Y),i.renderBufferDirect(D,null,k,mt,C,Y),C.onAfterShadow(i,C,P,D,k,mt,Y)}}}else if(G.visible){const K=E(C,G,y,M);C.onBeforeShadow(i,C,P,D,k,K,null),i.renderBufferDirect(D,null,k,K,C,null),C.onAfterShadow(i,C,P,D,k,K,null)}}const X=C.children;for(let k=0,G=X.length;k<G;k++)v(X[k],P,D,y,M)}function I(C){C.target.removeEventListener("dispose",I);for(const D in l){const y=l[D],M=C.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Fm={[lo]:ho,[uo]:mo,[fo]:go,[Yi]:po,[ho]:lo,[mo]:uo,[go]:fo,[po]:Yi};function Om(i,t){function e(){let U=!1;const lt=new me;let Z=null;const tt=new me(0,0,0,0);return{setMask:function(gt){Z!==gt&&!U&&(i.colorMask(gt,gt,gt,gt),Z=gt)},setLocked:function(gt){U=gt},setClear:function(gt,yt,Xt,_e,Me){Me===!0&&(gt*=_e,yt*=_e,Xt*=_e),lt.set(gt,yt,Xt,_e),tt.equals(lt)===!1&&(i.clearColor(gt,yt,Xt,_e),tt.copy(lt))},reset:function(){U=!1,Z=null,tt.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,Z=null,tt=null,gt=null;return{setReversed:function(yt){if(lt!==yt){const Xt=t.get("EXT_clip_control");lt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT);const _e=gt;gt=null,this.setClear(_e)}lt=yt},getReversed:function(){return lt},setTest:function(yt){yt?at(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(yt){Z!==yt&&!U&&(i.depthMask(yt),Z=yt)},setFunc:function(yt){if(lt&&(yt=Fm[yt]),tt!==yt){switch(yt){case lo:i.depthFunc(i.NEVER);break;case ho:i.depthFunc(i.ALWAYS);break;case uo:i.depthFunc(i.LESS);break;case Yi:i.depthFunc(i.LEQUAL);break;case fo:i.depthFunc(i.EQUAL);break;case po:i.depthFunc(i.GEQUAL);break;case mo:i.depthFunc(i.GREATER);break;case go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}tt=yt}},setLocked:function(yt){U=yt},setClear:function(yt){gt!==yt&&(lt&&(yt=1-yt),i.clearDepth(yt),gt=yt)},reset:function(){U=!1,Z=null,tt=null,gt=null,lt=!1}}}function s(){let U=!1,lt=null,Z=null,tt=null,gt=null,yt=null,Xt=null,_e=null,Me=null;return{setTest:function(ce){U||(ce?at(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(ce){lt!==ce&&!U&&(i.stencilMask(ce),lt=ce)},setFunc:function(ce,Pe,Qe){(Z!==ce||tt!==Pe||gt!==Qe)&&(i.stencilFunc(ce,Pe,Qe),Z=ce,tt=Pe,gt=Qe)},setOp:function(ce,Pe,Qe){(yt!==ce||Xt!==Pe||_e!==Qe)&&(i.stencilOp(ce,Pe,Qe),yt=ce,Xt=Pe,_e=Qe)},setLocked:function(ce){U=ce},setClear:function(ce){Me!==ce&&(i.clearStencil(ce),Me=ce)},reset:function(){U=!1,lt=null,Z=null,tt=null,gt=null,yt=null,Xt=null,_e=null,Me=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},p={},m=new WeakMap,h=[],f=null,_=!1,g=null,d=null,A=null,E=null,v=null,I=null,C=null,P=new Qt(0,0,0),D=0,y=!1,M=null,L=null,X=null,k=null,G=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,st=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=st>=1):Y.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=st>=2);let ut=null,mt={};const Et=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),te=new me().fromArray(Et),j=new me().fromArray(zt);function rt(U,lt,Z,tt){const gt=new Uint8Array(4),yt=i.createTexture();i.bindTexture(U,yt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xt=0;Xt<Z;Xt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,tt,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(lt+Xt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return yt}const vt={};vt[i.TEXTURE_2D]=rt(i.TEXTURE_2D,i.TEXTURE_2D,1),vt[i.TEXTURE_CUBE_MAP]=rt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[i.TEXTURE_2D_ARRAY]=rt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),vt[i.TEXTURE_3D]=rt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(Yi),Q(!1),ft(Aa),at(i.CULL_FACE),w($n);function at(U){u[U]!==!0&&(i.enable(U),u[U]=!0)}function Rt(U){u[U]!==!1&&(i.disable(U),u[U]=!1)}function Nt(U,lt){return p[U]!==lt?(i.bindFramebuffer(U,lt),p[U]=lt,U===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=lt),U===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function Ot(U,lt){let Z=h,tt=!1;if(U){Z=m.get(lt),Z===void 0&&(Z=[],m.set(lt,Z));const gt=U.textures;if(Z.length!==gt.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let yt=0,Xt=gt.length;yt<Xt;yt++)Z[yt]=i.COLOR_ATTACHMENT0+yt;Z.length=gt.length,tt=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,tt=!0);tt&&i.drawBuffers(Z)}function Yt(U){return f!==U?(i.useProgram(U),f=U,!0):!1}const J={[li]:i.FUNC_ADD,[zl]:i.FUNC_SUBTRACT,[kl]:i.FUNC_REVERSE_SUBTRACT};J[Hl]=i.MIN,J[Vl]=i.MAX;const O={[Gl]:i.ZERO,[Wl]:i.ONE,[Xl]:i.SRC_COLOR,[ao]:i.SRC_ALPHA,[Kl]:i.SRC_ALPHA_SATURATE,[$l]:i.DST_COLOR,[ql]:i.DST_ALPHA,[Yl]:i.ONE_MINUS_SRC_COLOR,[co]:i.ONE_MINUS_SRC_ALPHA,[jl]:i.ONE_MINUS_DST_COLOR,[Zl]:i.ONE_MINUS_DST_ALPHA,[Jl]:i.CONSTANT_COLOR,[Ql]:i.ONE_MINUS_CONSTANT_COLOR,[th]:i.CONSTANT_ALPHA,[eh]:i.ONE_MINUS_CONSTANT_ALPHA};function w(U,lt,Z,tt,gt,yt,Xt,_e,Me,ce){if(U===$n){_===!0&&(Rt(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),U!==Bl){if(U!==g||ce!==y){if((d!==li||v!==li)&&(i.blendEquation(i.FUNC_ADD),d=li,v=li),ce)switch(U){case Gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ra:i.blendFunc(i.ONE,i.ONE);break;case Ca:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Pa:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ra:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ca:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Pa:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}A=null,E=null,I=null,C=null,P.set(0,0,0),D=0,g=U,y=ce}return}gt=gt||lt,yt=yt||Z,Xt=Xt||tt,(lt!==d||gt!==v)&&(i.blendEquationSeparate(J[lt],J[gt]),d=lt,v=gt),(Z!==A||tt!==E||yt!==I||Xt!==C)&&(i.blendFuncSeparate(O[Z],O[tt],O[yt],O[Xt]),A=Z,E=tt,I=yt,C=Xt),(_e.equals(P)===!1||Me!==D)&&(i.blendColor(_e.r,_e.g,_e.b,Me),P.copy(_e),D=Me),g=U,y=!1}function pt(U,lt){U.side===sn?Rt(i.CULL_FACE):at(i.CULL_FACE);let Z=U.side===Oe;lt&&(Z=!Z),Q(Z),U.blending===Gi&&U.transparent===!1?w($n):w(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const tt=U.stencilWrite;a.setTest(tt),tt&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Q(U){M!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),M=U)}function ft(U){U!==Nl?(at(i.CULL_FACE),U!==L&&(U===Aa?i.cullFace(i.BACK):U===Fl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),L=U}function ct(U){U!==X&&(W&&i.lineWidth(U),X=U)}function Dt(U,lt,Z){U?(at(i.POLYGON_OFFSET_FILL),(k!==lt||G!==Z)&&(i.polygonOffset(lt,Z),k=lt,G=Z)):Rt(i.POLYGON_OFFSET_FILL)}function xt(U){U?at(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+K-1),ut!==U&&(i.activeTexture(U),ut=U)}function x(U,lt,Z){Z===void 0&&(ut===null?Z=i.TEXTURE0+K-1:Z=ut);let tt=mt[Z];tt===void 0&&(tt={type:void 0,texture:void 0},mt[Z]=tt),(tt.type!==U||tt.texture!==lt)&&(ut!==Z&&(i.activeTexture(Z),ut=Z),i.bindTexture(U,lt||vt[U]),tt.type=U,tt.texture=lt)}function B(){const U=mt[ut];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ht(U){te.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),te.copy(U))}function wt(U){j.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),j.copy(U))}function Kt(U,lt){let Z=l.get(lt);Z===void 0&&(Z=new WeakMap,l.set(lt,Z));let tt=Z.get(U);tt===void 0&&(tt=i.getUniformBlockIndex(lt,U.name),Z.set(U,tt))}function qt(U,lt){const tt=l.get(lt).get(U);c.get(lt)!==tt&&(i.uniformBlockBinding(lt,tt,U.__bindingPointIndex),c.set(lt,tt))}function de(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ut=null,mt={},p={},m=new WeakMap,h=[],f=null,_=!1,g=null,d=null,A=null,E=null,v=null,I=null,C=null,P=new Qt(0,0,0),D=0,y=!1,M=null,L=null,X=null,k=null,G=null,te.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Rt,bindFramebuffer:Nt,drawBuffers:Ot,useProgram:Yt,setBlending:w,setMaterial:pt,setFlipSided:Q,setCullFace:ft,setLineWidth:ct,setPolygonOffset:Dt,setScissorTest:xt,activeTexture:T,bindTexture:x,unbindTexture:B,compressedTexImage2D:q,compressedTexImage3D:et,texImage2D:bt,texImage3D:Ft,updateUBOMapping:Kt,uniformBlockBinding:qt,texStorage2D:Wt,texStorage3D:it,texSubImage2D:$,texSubImage3D:Tt,compressedTexSubImage2D:dt,compressedTexSubImage3D:Mt,scissor:Ht,viewport:wt,reset:de}}function bc(i,t,e,n){const s=Bm(n);switch(e){case qc:return i*t;case $c:return i*t;case jc:return i*t*2;case Kc:return i*t/s.components*s.byteLength;case na:return i*t/s.components*s.byteLength;case Jc:return i*t*2/s.components*s.byteLength;case ia:return i*t*2/s.components*s.byteLength;case Zc:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case sa:return i*t*4/s.components*s.byteLength;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case or:case ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yo:case Eo:return Math.max(i,16)*Math.max(t,8)/4;case Mo:case So:return Math.max(i,8)*Math.max(t,8)/2;case bo:case To:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Po:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Do:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case No:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ko:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case cr:case Ho:case Vo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Qc:case Go:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Wo:case Xo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Bm(i){switch(i){case Un:case Wc:return{byteLength:1,components:1};case Ss:case Xc:case Rs:return{byteLength:2,components:1};case ta:case ea:return{byteLength:2,components:4};case fi:case Qo:case Ln:return{byteLength:4,components:1};case Yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function zm(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ot,u=new WeakMap;let p;const m=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(T,x){return h?new OffscreenCanvas(T,x):fr("canvas")}function _(T,x,B){let q=1;const et=xt(T);if((et.width>B||et.height>B)&&(q=B/Math.max(et.width,et.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const $=Math.floor(q*et.width),Tt=Math.floor(q*et.height);p===void 0&&(p=f($,Tt));const dt=x?f($,Tt):p;return dt.width=$,dt.height=Tt,dt.getContext("2d").drawImage(T,0,0,$,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+$+"x"+Tt+")."),dt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),T;return T}function g(T){return T.generateMipmaps}function d(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(T,x,B,q,et=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let $=x;if(x===i.RED&&(B===i.FLOAT&&($=i.R32F),B===i.HALF_FLOAT&&($=i.R16F),B===i.UNSIGNED_BYTE&&($=i.R8)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.R8UI),B===i.UNSIGNED_SHORT&&($=i.R16UI),B===i.UNSIGNED_INT&&($=i.R32UI),B===i.BYTE&&($=i.R8I),B===i.SHORT&&($=i.R16I),B===i.INT&&($=i.R32I)),x===i.RG&&(B===i.FLOAT&&($=i.RG32F),B===i.HALF_FLOAT&&($=i.RG16F),B===i.UNSIGNED_BYTE&&($=i.RG8)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RG8UI),B===i.UNSIGNED_SHORT&&($=i.RG16UI),B===i.UNSIGNED_INT&&($=i.RG32UI),B===i.BYTE&&($=i.RG8I),B===i.SHORT&&($=i.RG16I),B===i.INT&&($=i.RG32I)),x===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGB8UI),B===i.UNSIGNED_SHORT&&($=i.RGB16UI),B===i.UNSIGNED_INT&&($=i.RGB32UI),B===i.BYTE&&($=i.RGB8I),B===i.SHORT&&($=i.RGB16I),B===i.INT&&($=i.RGB32I)),x===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&($=i.RGBA8UI),B===i.UNSIGNED_SHORT&&($=i.RGBA16UI),B===i.UNSIGNED_INT&&($=i.RGBA32UI),B===i.BYTE&&($=i.RGBA8I),B===i.SHORT&&($=i.RGBA16I),B===i.INT&&($=i.RGBA32I)),x===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),x===i.RGBA){const Tt=et?_r:se.getTransfer(q);B===i.FLOAT&&($=i.RGBA32F),B===i.HALF_FLOAT&&($=i.RGBA16F),B===i.UNSIGNED_BYTE&&($=Tt===fe?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(T,x){let B;return T?x===null||x===fi||x===$i?B=i.DEPTH24_STENCIL8:x===Ln?B=i.DEPTH32F_STENCIL8:x===Ss&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===fi||x===$i?B=i.DEPTH_COMPONENT24:x===Ln?B=i.DEPTH_COMPONENT32F:x===Ss&&(B=i.DEPTH_COMPONENT16),B}function I(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==fn&&T.minFilter!==gn?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function C(T){const x=T.target;x.removeEventListener("dispose",C),D(x),x.isVideoTexture&&u.delete(x)}function P(T){const x=T.target;x.removeEventListener("dispose",P),M(x)}function D(T){const x=n.get(T);if(x.__webglInit===void 0)return;const B=T.source,q=m.get(B);if(q){const et=q[x.__cacheKey];et.usedTimes--,et.usedTimes===0&&y(T),Object.keys(q).length===0&&m.delete(B)}n.remove(T)}function y(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const B=T.source,q=m.get(B);delete q[x.__cacheKey],o.memory.textures--}function M(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(x.__webglFramebuffer[q]))for(let et=0;et<x.__webglFramebuffer[q].length;et++)i.deleteFramebuffer(x.__webglFramebuffer[q][et]);else i.deleteFramebuffer(x.__webglFramebuffer[q]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[q])}else{if(Array.isArray(x.__webglFramebuffer))for(let q=0;q<x.__webglFramebuffer.length;q++)i.deleteFramebuffer(x.__webglFramebuffer[q]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let q=0;q<x.__webglColorRenderbuffer.length;q++)x.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[q]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=T.textures;for(let q=0,et=B.length;q<et;q++){const $=n.get(B[q]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(B[q])}n.remove(T)}let L=0;function X(){L=0}function k(){const T=L;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),L+=1,T}function G(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function K(T,x){const B=n.get(T);if(T.isVideoTexture&&ct(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const q=T.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(B,T,x);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function W(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){j(B,T,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function st(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){j(B,T,x);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Y(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){rt(B,T,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const ut={[ur]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[xo]:i.MIRRORED_REPEAT},mt={[fn]:i.NEAREST,[hh]:i.NEAREST_MIPMAP_NEAREST,[Ds]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Tr]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},Et={[ph]:i.NEVER,[Mh]:i.ALWAYS,[mh]:i.LESS,[el]:i.LEQUAL,[gh]:i.EQUAL,[xh]:i.GEQUAL,[_h]:i.GREATER,[vh]:i.NOTEQUAL};function zt(T,x){if(x.type===Ln&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===gn||x.magFilter===Tr||x.magFilter===Ds||x.magFilter===di||x.minFilter===gn||x.minFilter===Tr||x.minFilter===Ds||x.minFilter===di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,ut[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,ut[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,ut[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,mt[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,mt[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Et[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===fn||x.minFilter!==Ds&&x.minFilter!==di||x.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function te(T,x){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));const q=x.source;let et=m.get(q);et===void 0&&(et={},m.set(q,et));const $=G(x);if($!==T.__cacheKey){et[$]===void 0&&(et[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),et[$].usedTimes++;const Tt=et[T.__cacheKey];Tt!==void 0&&(et[T.__cacheKey].usedTimes--,Tt.usedTimes===0&&y(x)),T.__cacheKey=$,T.__webglTexture=et[$].texture}return B}function j(T,x,B){let q=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(q=i.TEXTURE_3D);const et=te(T,x),$=x.source;e.bindTexture(q,T.__webglTexture,i.TEXTURE0+B);const Tt=n.get($);if($.version!==Tt.__version||et===!0){e.activeTexture(i.TEXTURE0+B);const dt=se.getPrimaries(se.workingColorSpace),Mt=x.colorSpace===Zn?null:se.getPrimaries(x.colorSpace),Wt=x.colorSpace===Zn||dt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let it=_(x.image,!1,s.maxTextureSize);it=Dt(x,it);const bt=r.convert(x.format,x.colorSpace),Ft=r.convert(x.type);let Ht=E(x.internalFormat,bt,Ft,x.colorSpace,x.isVideoTexture);zt(q,x);let wt;const Kt=x.mipmaps,qt=x.isVideoTexture!==!0,de=Tt.__version===void 0||et===!0,U=$.dataReady,lt=I(x,it);if(x.isDepthTexture)Ht=v(x.format===ji,x.type),de&&(qt?e.texStorage2D(i.TEXTURE_2D,1,Ht,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Ht,it.width,it.height,0,bt,Ft,null));else if(x.isDataTexture)if(Kt.length>0){qt&&de&&e.texStorage2D(i.TEXTURE_2D,lt,Ht,Kt[0].width,Kt[0].height);for(let Z=0,tt=Kt.length;Z<tt;Z++)wt=Kt[Z],qt?U&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,wt.width,wt.height,bt,Ft,wt.data):e.texImage2D(i.TEXTURE_2D,Z,Ht,wt.width,wt.height,0,bt,Ft,wt.data);x.generateMipmaps=!1}else qt?(de&&e.texStorage2D(i.TEXTURE_2D,lt,Ht,it.width,it.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,bt,Ft,it.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,it.width,it.height,0,bt,Ft,it.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){qt&&de&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Ht,Kt[0].width,Kt[0].height,it.depth);for(let Z=0,tt=Kt.length;Z<tt;Z++)if(wt=Kt[Z],x.format!==dn)if(bt!==null)if(qt){if(U)if(x.layerUpdates.size>0){const gt=bc(wt.width,wt.height,x.format,x.type);for(const yt of x.layerUpdates){const Xt=wt.data.subarray(yt*gt/wt.data.BYTES_PER_ELEMENT,(yt+1)*gt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,yt,wt.width,wt.height,1,bt,Xt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,wt.width,wt.height,it.depth,bt,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Z,Ht,wt.width,wt.height,it.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Z,0,0,0,wt.width,wt.height,it.depth,bt,Ft,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Z,Ht,wt.width,wt.height,it.depth,0,bt,Ft,wt.data)}else{qt&&de&&e.texStorage2D(i.TEXTURE_2D,lt,Ht,Kt[0].width,Kt[0].height);for(let Z=0,tt=Kt.length;Z<tt;Z++)wt=Kt[Z],x.format!==dn?bt!==null?qt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Z,0,0,wt.width,wt.height,bt,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,Z,Ht,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?U&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,wt.width,wt.height,bt,Ft,wt.data):e.texImage2D(i.TEXTURE_2D,Z,Ht,wt.width,wt.height,0,bt,Ft,wt.data)}else if(x.isDataArrayTexture)if(qt){if(de&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Ht,it.width,it.height,it.depth),U)if(x.layerUpdates.size>0){const Z=bc(it.width,it.height,x.format,x.type);for(const tt of x.layerUpdates){const gt=it.data.subarray(tt*Z/it.data.BYTES_PER_ELEMENT,(tt+1)*Z/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,it.width,it.height,1,bt,Ft,gt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,bt,Ft,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,it.width,it.height,it.depth,0,bt,Ft,it.data);else if(x.isData3DTexture)qt?(de&&e.texStorage3D(i.TEXTURE_3D,lt,Ht,it.width,it.height,it.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,bt,Ft,it.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,it.width,it.height,it.depth,0,bt,Ft,it.data);else if(x.isFramebufferTexture){if(de)if(qt)e.texStorage2D(i.TEXTURE_2D,lt,Ht,it.width,it.height);else{let Z=it.width,tt=it.height;for(let gt=0;gt<lt;gt++)e.texImage2D(i.TEXTURE_2D,gt,Ht,Z,tt,0,bt,Ft,null),Z>>=1,tt>>=1}}else if(Kt.length>0){if(qt&&de){const Z=xt(Kt[0]);e.texStorage2D(i.TEXTURE_2D,lt,Ht,Z.width,Z.height)}for(let Z=0,tt=Kt.length;Z<tt;Z++)wt=Kt[Z],qt?U&&e.texSubImage2D(i.TEXTURE_2D,Z,0,0,bt,Ft,wt):e.texImage2D(i.TEXTURE_2D,Z,Ht,bt,Ft,wt);x.generateMipmaps=!1}else if(qt){if(de){const Z=xt(it);e.texStorage2D(i.TEXTURE_2D,lt,Ht,Z.width,Z.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Ft,it)}else e.texImage2D(i.TEXTURE_2D,0,Ht,bt,Ft,it);g(x)&&d(q),Tt.__version=$.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function rt(T,x,B){if(x.image.length!==6)return;const q=te(T,x),et=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const $=n.get(et);if(et.version!==$.__version||q===!0){e.activeTexture(i.TEXTURE0+B);const Tt=se.getPrimaries(se.workingColorSpace),dt=x.colorSpace===Zn?null:se.getPrimaries(x.colorSpace),Mt=x.colorSpace===Zn||Tt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Wt=x.isCompressedTexture||x.image[0].isCompressedTexture,it=x.image[0]&&x.image[0].isDataTexture,bt=[];for(let tt=0;tt<6;tt++)!Wt&&!it?bt[tt]=_(x.image[tt],!0,s.maxCubemapSize):bt[tt]=it?x.image[tt].image:x.image[tt],bt[tt]=Dt(x,bt[tt]);const Ft=bt[0],Ht=r.convert(x.format,x.colorSpace),wt=r.convert(x.type),Kt=E(x.internalFormat,Ht,wt,x.colorSpace),qt=x.isVideoTexture!==!0,de=$.__version===void 0||q===!0,U=et.dataReady;let lt=I(x,Ft);zt(i.TEXTURE_CUBE_MAP,x);let Z;if(Wt){qt&&de&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Kt,Ft.width,Ft.height);for(let tt=0;tt<6;tt++){Z=bt[tt].mipmaps;for(let gt=0;gt<Z.length;gt++){const yt=Z[gt];x.format!==dn?Ht!==null?qt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt,0,0,yt.width,yt.height,Ht,yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt,Kt,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt,0,0,yt.width,yt.height,Ht,wt,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt,Kt,yt.width,yt.height,0,Ht,wt,yt.data)}}}else{if(Z=x.mipmaps,qt&&de){Z.length>0&&lt++;const tt=xt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Kt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(it){qt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,bt[tt].width,bt[tt].height,Ht,wt,bt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Kt,bt[tt].width,bt[tt].height,0,Ht,wt,bt[tt].data);for(let gt=0;gt<Z.length;gt++){const Xt=Z[gt].image[tt].image;qt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt+1,0,0,Xt.width,Xt.height,Ht,wt,Xt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt+1,Kt,Xt.width,Xt.height,0,Ht,wt,Xt.data)}}else{qt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Ht,wt,bt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Kt,Ht,wt,bt[tt]);for(let gt=0;gt<Z.length;gt++){const yt=Z[gt];qt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt+1,0,0,Ht,wt,yt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,gt+1,Kt,Ht,wt,yt.image[tt])}}}g(x)&&d(i.TEXTURE_CUBE_MAP),$.__version=et.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function vt(T,x,B,q,et,$){const Tt=r.convert(B.format,B.colorSpace),dt=r.convert(B.type),Mt=E(B.internalFormat,Tt,dt,B.colorSpace),Wt=n.get(x),it=n.get(B);if(it.__renderTarget=x,!Wt.__hasExternalTextures){const bt=Math.max(1,x.width>>$),Ft=Math.max(1,x.height>>$);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,$,Mt,bt,Ft,x.depth,0,Tt,dt,null):e.texImage2D(et,$,Mt,bt,Ft,0,Tt,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,et,it.__webglTexture,0,Q(x)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,et,it.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(T,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const q=x.depthTexture,et=q&&q.isDepthTexture?q.type:null,$=v(x.stencilBuffer,et),Tt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=Q(x);ft(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,$,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,$,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,$,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,T)}else{const q=x.textures;for(let et=0;et<q.length;et++){const $=q[et],Tt=r.convert($.format,$.colorSpace),dt=r.convert($.type),Mt=E($.internalFormat,Tt,dt,$.colorSpace),Wt=Q(x);B&&ft(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,Mt,x.width,x.height):ft(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,Mt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(x.depthTexture);q.__renderTarget=x,(!q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),K(x.depthTexture,0);const et=q.__webglTexture,$=Q(x);if(x.depthTexture.format===Wi)ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,et,0);else if(x.depthTexture.format===ji)ft(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,et,0);else throw new Error("Unknown depthTexture format")}function Nt(T){const x=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),q){const et=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,q.removeEventListener("dispose",et)};q.addEventListener("dispose",et),x.__depthDisposeCallback=et}x.__boundDepthTexture=q}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Rt(x.__webglFramebuffer,T)}else if(B){x.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[q]),x.__webglDepthbuffer[q]===void 0)x.__webglDepthbuffer[q]=i.createRenderbuffer(),at(x.__webglDepthbuffer[q],T,!1);else{const et=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),at(x.__webglDepthbuffer,T,!1);else{const q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ot(T,x,B){const q=n.get(T);x!==void 0&&vt(q.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Nt(T)}function Yt(T){const x=T.texture,B=n.get(T),q=n.get(x);T.addEventListener("dispose",P);const et=T.textures,$=T.isWebGLCubeRenderTarget===!0,Tt=et.length>1;if(Tt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=x.version,o.memory.textures++),$){B.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<x.mipmaps.length;Mt++)B.__webglFramebuffer[dt][Mt]=i.createFramebuffer()}else B.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let dt=0;dt<x.mipmaps.length;dt++)B.__webglFramebuffer[dt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let dt=0,Mt=et.length;dt<Mt;dt++){const Wt=n.get(et[dt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&ft(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let dt=0;dt<et.length;dt++){const Mt=et[dt];B.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[dt]);const Wt=r.convert(Mt.format,Mt.colorSpace),it=r.convert(Mt.type),bt=E(Mt.internalFormat,Wt,it,Mt.colorSpace,T.isXRRenderTarget===!0),Ft=Q(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,bt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,B.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),at(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),zt(i.TEXTURE_CUBE_MAP,x);for(let dt=0;dt<6;dt++)if(x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)vt(B.__webglFramebuffer[dt][Mt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else vt(B.__webglFramebuffer[dt],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(x)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let dt=0,Mt=et.length;dt<Mt;dt++){const Wt=et[dt],it=n.get(Wt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),zt(i.TEXTURE_2D,Wt),vt(B.__webglFramebuffer,T,Wt,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,0),g(Wt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(dt=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,q.__webglTexture),zt(dt,x),x.mipmaps&&x.mipmaps.length>0)for(let Mt=0;Mt<x.mipmaps.length;Mt++)vt(B.__webglFramebuffer[Mt],T,x,i.COLOR_ATTACHMENT0,dt,Mt);else vt(B.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,dt,0);g(x)&&d(dt),e.unbindTexture()}T.depthBuffer&&Nt(T)}function J(T){const x=T.textures;for(let B=0,q=x.length;B<q;B++){const et=x[B];if(g(et)){const $=A(T),Tt=n.get(et).__webglTexture;e.bindTexture($,Tt),d($),e.unbindTexture()}}}const O=[],w=[];function pt(T){if(T.samples>0){if(ft(T)===!1){const x=T.textures,B=T.width,q=T.height;let et=i.COLOR_BUFFER_BIT;const $=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(T),dt=x.length>1;if(dt)for(let Mt=0;Mt<x.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Mt=0;Mt<x.length;Mt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const Wt=n.get(x[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,et,i.NEAREST),c===!0&&(O.length=0,w.length=0,O.push(i.COLOR_ATTACHMENT0+Mt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(O.push($),w.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,O))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let Mt=0;Mt<x.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const Wt=n.get(x[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function Q(T){return Math.min(s.maxSamples,T.samples)}function ft(T){const x=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function ct(T){const x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function Dt(T,x){const B=T.colorSpace,q=T.format,et=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Ji&&B!==Zn&&(se.getTransfer(B)===fe?(q!==dn||et!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=X,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=st,this.setTextureCube=Y,this.rebindTextures=Ot,this.setupRenderTarget=Yt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=ft}function km(i,t){function e(n,s=Zn){let r;const o=se.getTransfer(s);if(n===Un)return i.UNSIGNED_BYTE;if(n===ta)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ea)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Yc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wc)return i.BYTE;if(n===Xc)return i.SHORT;if(n===Ss)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===Rs)return i.HALF_FLOAT;if(n===qc)return i.ALPHA;if(n===Zc)return i.RGB;if(n===dn)return i.RGBA;if(n===$c)return i.LUMINANCE;if(n===jc)return i.LUMINANCE_ALPHA;if(n===Wi)return i.DEPTH_COMPONENT;if(n===ji)return i.DEPTH_STENCIL;if(n===Kc)return i.RED;if(n===na)return i.RED_INTEGER;if(n===Jc)return i.RG;if(n===ia)return i.RG_INTEGER;if(n===sa)return i.RGBA_INTEGER;if(n===sr||n===rr||n===or||n===ar)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===or)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===yo||n===So||n===Eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===To||n===wo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bo||n===To)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===wo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===zo||n===ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ao)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Co)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Po)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Do)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Io)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===No)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Bo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zo)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ko)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cr||n===Ho||n===Vo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===cr)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qc||n===Go||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===cr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Go)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Hm extends Je{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ae extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vm={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),d=this._getHandJoint(l,_);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],m=u.position.distanceTo(p.position),h=.02,f=.005;l.inputState.pinching&&m>h+f?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&m<=h-f&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Gm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Xe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Jn({vertexShader:Gm,fragmentShader:Wm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ym extends _i{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,p=null,m=null,h=null,f=null;const _=new Xm,g=e.getContextAttributes();let d=null,A=null;const E=[],v=[],I=new ot;let C=null;const P=new Je;P.viewport=new me;const D=new Je;D.viewport=new me;const y=[P,D],M=new Hm;let L=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let rt=E[j];return rt===void 0&&(rt=new Jr,E[j]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(j){let rt=E[j];return rt===void 0&&(rt=new Jr,E[j]=rt),rt.getGripSpace()},this.getHand=function(j){let rt=E[j];return rt===void 0&&(rt=new Jr,E[j]=rt),rt.getHandSpace()};function k(j){const rt=v.indexOf(j.inputSource);if(rt===-1)return;const vt=E[rt];vt!==void 0&&(vt.update(j.inputSource,j.frame,l||o),vt.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",K);for(let j=0;j<E.length;j++){const rt=v[j];rt!==null&&(v[j]=null,E[j].disconnect(rt))}L=null,X=null,_.reset(),t.setRenderTarget(d),h=null,m=null,p=null,s=null,A=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return m!==null?m:h},this.getBinding=function(){return p},this.getFrame=function(){return f},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",G),s.addEventListener("inputsourceschange",K),g.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const rt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),A=new pi(h.framebufferWidth,h.framebufferHeight,{format:dn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let rt=null,vt=null,at=null;g.depth&&(at=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=g.stencil?ji:Wi,vt=g.stencil?$i:fi);const Rt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};p=new XRWebGLBinding(s,e),m=p.createProjectionLayer(Rt),s.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),A=new pi(m.textureWidth,m.textureHeight,{format:dn,type:Un,depthTexture:new fl(m.textureWidth,m.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),te.setContext(s),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(j){for(let rt=0;rt<j.removed.length;rt++){const vt=j.removed[rt],at=v.indexOf(vt);at>=0&&(v[at]=null,E[at].disconnect(vt))}for(let rt=0;rt<j.added.length;rt++){const vt=j.added[rt];let at=v.indexOf(vt);if(at===-1){for(let Nt=0;Nt<E.length;Nt++)if(Nt>=v.length){v.push(vt),at=Nt;break}else if(v[Nt]===null){v[Nt]=vt,at=Nt;break}if(at===-1)break}const Rt=E[at];Rt&&Rt.connect(vt)}}const W=new b,st=new b;function Y(j,rt,vt){W.setFromMatrixPosition(rt.matrixWorld),st.setFromMatrixPosition(vt.matrixWorld);const at=W.distanceTo(st),Rt=rt.projectionMatrix.elements,Nt=vt.projectionMatrix.elements,Ot=Rt[14]/(Rt[10]-1),Yt=Rt[14]/(Rt[10]+1),J=(Rt[9]+1)/Rt[5],O=(Rt[9]-1)/Rt[5],w=(Rt[8]-1)/Rt[0],pt=(Nt[8]+1)/Nt[0],Q=Ot*w,ft=Ot*pt,ct=at/(-w+pt),Dt=ct*-w;if(rt.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Dt),j.translateZ(ct),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Rt[10]===-1)j.projectionMatrix.copy(rt.projectionMatrix),j.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const xt=Ot+ct,T=Yt+ct,x=Q-Dt,B=ft+(at-Dt),q=J*Yt/T*xt,et=O*Yt/T*xt;j.projectionMatrix.makePerspective(x,B,q,et,xt,T),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ut(j,rt){rt===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(rt.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let rt=j.near,vt=j.far;_.texture!==null&&(_.depthNear>0&&(rt=_.depthNear),_.depthFar>0&&(vt=_.depthFar)),M.near=D.near=P.near=rt,M.far=D.far=P.far=vt,(L!==M.near||X!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,X=M.far),P.layers.mask=j.layers.mask|2,D.layers.mask=j.layers.mask|4,M.layers.mask=P.layers.mask|D.layers.mask;const at=j.parent,Rt=M.cameras;ut(M,at);for(let Nt=0;Nt<Rt.length;Nt++)ut(Rt[Nt],at);Rt.length===2?Y(M,P,D):M.projectionMatrix.copy(P.projectionMatrix),mt(j,M,at)};function mt(j,rt,vt){vt===null?j.matrix.copy(rt.matrixWorld):(j.matrix.copy(vt.matrixWorld),j.matrix.invert(),j.matrix.multiply(rt.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(rt.projectionMatrix),j.projectionMatrixInverse.copy(rt.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Es*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(m===null&&h===null))return c},this.setFoveation=function(j){c=j,m!==null&&(m.fixedFoveation=j),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Et=null;function zt(j,rt){if(u=rt.getViewerPose(l||o),f=rt,u!==null){const vt=u.views;h!==null&&(t.setRenderTargetFramebuffer(A,h.framebuffer),t.setRenderTarget(A));let at=!1;vt.length!==M.cameras.length&&(M.cameras.length=0,at=!0);for(let Nt=0;Nt<vt.length;Nt++){const Ot=vt[Nt];let Yt=null;if(h!==null)Yt=h.getViewport(Ot);else{const O=p.getViewSubImage(m,Ot);Yt=O.viewport,Nt===0&&(t.setRenderTargetTextures(A,O.colorTexture,m.ignoreDepthValues?void 0:O.depthStencilTexture),t.setRenderTarget(A))}let J=y[Nt];J===void 0&&(J=new Je,J.layers.enable(Nt),J.viewport=new me,y[Nt]=J),J.matrix.fromArray(Ot.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Ot.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),Nt===0&&(M.matrix.copy(J.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),at===!0&&M.cameras.push(J)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Nt=p.getDepthInformation(vt[0]);Nt&&Nt.isValid&&Nt.texture&&_.init(t,Nt,s.renderState)}}for(let vt=0;vt<E.length;vt++){const at=v[vt],Rt=E[vt];at!==null&&Rt!==void 0&&Rt.update(at,rt,l||o)}Et&&Et(j,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),f=null}const te=new ul;te.setAnimationLoop(zt),this.setAnimationLoop=function(j){Et=j},this.dispose=function(){}}}const oi=new vn,qm=new ve;function Zm(i,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function n(g,d){d.color.getRGB(g.fogColor.value,cl(i)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function s(g,d,A,E,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(g,d):d.isMeshToonMaterial?(r(g,d),p(g,d)):d.isMeshPhongMaterial?(r(g,d),u(g,d)):d.isMeshStandardMaterial?(r(g,d),m(g,d),d.isMeshPhysicalMaterial&&h(g,d,v)):d.isMeshMatcapMaterial?(r(g,d),f(g,d)):d.isMeshDepthMaterial?r(g,d):d.isMeshDistanceMaterial?(r(g,d),_(g,d)):d.isMeshNormalMaterial?r(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?c(g,d,A,E):d.isSpriteMaterial?l(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===Oe&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===Oe&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const A=t.get(d),E=A.envMap,v=A.envMapRotation;E&&(g.envMap.value=E,oi.copy(v),oi.x*=-1,oi.y*=-1,oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),g.envMapRotation.value.setFromMatrix4(qm.makeRotationFromEuler(oi)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function c(g,d,A,E){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*A,g.scale.value=E*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function l(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function m(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function h(g,d,A){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Oe&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function f(g,d){d.matcap&&(g.matcap.value=d.matcap)}function _(g,d){const A=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $m(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,E){const v=E.program;n.uniformBlockBinding(A,v)}function l(A,E){let v=s[A.id];v===void 0&&(f(A),v=u(A),s[A.id]=v,A.addEventListener("dispose",g));const I=E.program;n.updateUBOMapping(A,I);const C=t.render.frame;r[A.id]!==C&&(m(A),r[A.id]=C)}function u(A){const E=p();A.__bindingPointIndex=E;const v=i.createBuffer(),I=A.__size,C=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,I,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function p(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(A){const E=s[A.id],v=A.uniforms,I=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,P=v.length;C<P;C++){const D=Array.isArray(v[C])?v[C]:[v[C]];for(let y=0,M=D.length;y<M;y++){const L=D[y];if(h(L,C,y,I)===!0){const X=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let K=0;K<k.length;K++){const W=k[K],st=_(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,X+G,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,G),G+=st.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(A,E,v,I){const C=A.value,P=E+"_"+v;if(I[P]===void 0)return typeof C=="number"||typeof C=="boolean"?I[P]=C:I[P]=C.clone(),!0;{const D=I[P];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return I[P]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function f(A){const E=A.uniforms;let v=0;const I=16;for(let P=0,D=E.length;P<D;P++){const y=Array.isArray(E[P])?E[P]:[E[P]];for(let M=0,L=y.length;M<L;M++){const X=y[M],k=Array.isArray(X.value)?X.value:[X.value];for(let G=0,K=k.length;G<K;G++){const W=k[G],st=_(W),Y=v%I,ut=Y%st.boundary,mt=Y+ut;v+=ut,mt!==0&&I-mt<st.storage&&(v+=I-mt),X.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=v,v+=st.storage}}}const C=v%I;return C>0&&(v+=I-C),A.__size=v,A.__cache={},this}function _(A){const E={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(E.boundary=4,E.storage=4):A.isVector2?(E.boundary=8,E.storage=8):A.isVector3||A.isColor?(E.boundary=16,E.storage=12):A.isVector4?(E.boundary=16,E.storage=16):A.isMatrix3?(E.boundary=48,E.storage=48):A.isMatrix4?(E.boundary=64,E.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),E}function g(A){const E=A.target;E.removeEventListener("dispose",g);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function d(){for(const A in s)i.deleteBuffer(s[A]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class jm{constructor(t={}){const{canvas:e=Oh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const f=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const A=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this.toneMapping=jn,this.toneMappingExposure=1;const v=this;let I=!1,C=0,P=0,D=null,y=-1,M=null;const L=new me,X=new me;let k=null;const G=new Qt(0);let K=0,W=e.width,st=e.height,Y=1,ut=null,mt=null;const Et=new me(0,0,W,st),zt=new me(0,0,W,st);let te=!1;const j=new la;let rt=!1,vt=!1;const at=new ve,Rt=new ve,Nt=new b,Ot=new me,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function O(){return D===null?Y:1}let w=n;function pt(S,N){return e.getContext(S,N)}try{const S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jo}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",yt,!1),w===null){const N="webgl2";if(w=pt(N,S),w===null)throw pt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Q,ft,ct,Dt,xt,T,x,B,q,et,$,Tt,dt,Mt,Wt,it,bt,Ft,Ht,wt,Kt,qt,de,U;function lt(){Q=new ep(w),Q.init(),qt=new km(w,Q),ft=new $f(w,Q,t,qt),ct=new Om(w,Q),ft.reverseDepthBuffer&&m&&ct.buffers.depth.setReversed(!0),Dt=new sp(w),xt=new Sm,T=new zm(w,Q,ct,xt,ft,qt,Dt),x=new Kf(v),B=new tp(v),q=new hu(w),de=new qf(w,q),et=new np(w,q,Dt,de),$=new op(w,et,q,Dt),Ht=new rp(w,ft,T),it=new jf(xt),Tt=new ym(v,x,B,Q,ft,de,it),dt=new Zm(v,xt),Mt=new bm,Wt=new Pm(Q),Ft=new Yf(v,x,B,ct,$,h,c),bt=new Nm(v,$,ft),U=new $m(w,Dt,ft,ct),wt=new Zf(w,Q,Dt),Kt=new ip(w,Q,Dt),Dt.programs=Tt.programs,v.capabilities=ft,v.extensions=Q,v.properties=xt,v.renderLists=Mt,v.shadowMap=bt,v.state=ct,v.info=Dt}lt();const Z=new Ym(v,w);this.xr=Z,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const S=Q.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Q.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(S){S!==void 0&&(Y=S,this.setSize(W,st,!1))},this.getSize=function(S){return S.set(W,st)},this.setSize=function(S,N,z=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=S,st=N,e.width=Math.floor(S*Y),e.height=Math.floor(N*Y),z===!0&&(e.style.width=S+"px",e.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(W*Y,st*Y).floor()},this.setDrawingBufferSize=function(S,N,z){W=S,st=N,Y=z,e.width=Math.floor(S*z),e.height=Math.floor(N*z),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(L)},this.getViewport=function(S){return S.copy(Et)},this.setViewport=function(S,N,z,H){S.isVector4?Et.set(S.x,S.y,S.z,S.w):Et.set(S,N,z,H),ct.viewport(L.copy(Et).multiplyScalar(Y).round())},this.getScissor=function(S){return S.copy(zt)},this.setScissor=function(S,N,z,H){S.isVector4?zt.set(S.x,S.y,S.z,S.w):zt.set(S,N,z,H),ct.scissor(X.copy(zt).multiplyScalar(Y).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(S){ct.setScissorTest(te=S)},this.setOpaqueSort=function(S){ut=S},this.setTransparentSort=function(S){mt=S},this.getClearColor=function(S){return S.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(S=!0,N=!0,z=!0){let H=0;if(S){let F=!1;if(D!==null){const ht=D.texture.format;F=ht===sa||ht===ia||ht===na}if(F){const ht=D.texture.type,St=ht===Un||ht===fi||ht===Ss||ht===$i||ht===ta||ht===ea,Ct=Ft.getClearColor(),At=Ft.getClearAlpha(),Bt=Ct.r,Vt=Ct.g,Pt=Ct.b;St?(f[0]=Bt,f[1]=Vt,f[2]=Pt,f[3]=At,w.clearBufferuiv(w.COLOR,0,f)):(_[0]=Bt,_[1]=Vt,_[2]=Pt,_[3]=At,w.clearBufferiv(w.COLOR,0,_))}else H|=w.COLOR_BUFFER_BIT}N&&(H|=w.DEPTH_BUFFER_BIT),z&&(H|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),Mt.dispose(),Wt.dispose(),xt.dispose(),x.dispose(),B.dispose(),$.dispose(),de.dispose(),U.dispose(),Tt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Nn),Z.removeEventListener("sessionend",Ps),Ze.stop()};function tt(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const S=Dt.autoReset,N=bt.enabled,z=bt.autoUpdate,H=bt.needsUpdate,F=bt.type;lt(),Dt.autoReset=S,bt.enabled=N,bt.autoUpdate=z,bt.needsUpdate=H,bt.type=F}function yt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Xt(S){const N=S.target;N.removeEventListener("dispose",Xt),_e(N)}function _e(S){Me(S),xt.remove(S)}function Me(S){const N=xt.get(S).programs;N!==void 0&&(N.forEach(function(z){Tt.releaseProgram(z)}),S.isShaderMaterial&&Tt.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,z,H,F,ht){N===null&&(N=Yt);const St=F.isMesh&&F.matrixWorld.determinant()<0,Ct=Mr(S,N,z,H,F);ct.setMaterial(H,St);let At=z.index,Bt=1;if(H.wireframe===!0){if(At=et.getWireframeAttribute(z),At===void 0)return;Bt=2}const Vt=z.drawRange,Pt=z.attributes.position;let It=Vt.start*Bt,Jt=(Vt.start+Vt.count)*Bt;ht!==null&&(It=Math.max(It,ht.start*Bt),Jt=Math.min(Jt,(ht.start+ht.count)*Bt)),At!==null?(It=Math.max(It,0),Jt=Math.min(Jt,At.count)):Pt!=null&&(It=Math.max(It,0),Jt=Math.min(Jt,Pt.count));const re=Jt-It;if(re<0||re===1/0)return;de.setup(F,H,Ct,z,At);let Le,oe=wt;if(At!==null&&(Le=q.get(At),oe=Kt,oe.setIndex(Le)),F.isMesh)H.wireframe===!0?(ct.setLineWidth(H.wireframeLinewidth*O()),oe.setMode(w.LINES)):oe.setMode(w.TRIANGLES);else if(F.isLine){let Lt=H.linewidth;Lt===void 0&&(Lt=1),ct.setLineWidth(Lt*O()),F.isLineSegments?oe.setMode(w.LINES):F.isLineLoop?oe.setMode(w.LINE_LOOP):oe.setMode(w.LINE_STRIP)}else F.isPoints?oe.setMode(w.POINTS):F.isSprite&&oe.setMode(w.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)oe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))oe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Lt=F._multiDrawStarts,Ye=F._multiDrawCounts,ne=F._multiDrawCount,$e=At?q.get(At).bytesPerElement:1,pn=xt.get(H).currentProgram.getUniforms();for(let Re=0;Re<ne;Re++)pn.setValue(w,"_gl_DrawID",Re),oe.render(Lt[Re]/$e,Ye[Re])}else if(F.isInstancedMesh)oe.renderInstances(It,re,F.count);else if(z.isInstancedBufferGeometry){const Lt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ye=Math.min(z.instanceCount,Lt);oe.renderInstances(It,re,Ye)}else oe.render(It,re)};function ce(S,N,z){S.transparent===!0&&S.side===sn&&S.forceSinglePass===!1?(S.side=Oe,S.needsUpdate=!0,On(S,N,z),S.side=Kn,S.needsUpdate=!0,On(S,N,z),S.side=sn):On(S,N,z)}this.compile=function(S,N,z=null){z===null&&(z=S),d=Wt.get(z),d.init(N),E.push(d),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),S!==z&&S.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const H=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ht=F.material;if(ht)if(Array.isArray(ht))for(let St=0;St<ht.length;St++){const Ct=ht[St];ce(Ct,z,F),H.add(Ct)}else ce(ht,z,F),H.add(ht)}),E.pop(),d=null,H},this.compileAsync=function(S,N,z=null){const H=this.compile(S,N,z);return new Promise(F=>{function ht(){if(H.forEach(function(St){xt.get(St).currentProgram.isReady()&&H.delete(St)}),H.size===0){F(S);return}setTimeout(ht,10)}Q.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Pe=null;function Qe(S){Pe&&Pe(S)}function Nn(){Ze.stop()}function Ps(){Ze.start()}const Ze=new ul;Ze.setAnimationLoop(Qe),typeof self<"u"&&Ze.setContext(self),this.setAnimationLoop=function(S){Pe=S,Z.setAnimationLoop(S),S===null?Ze.stop():Ze.start()},Z.addEventListener("sessionstart",Nn),Z.addEventListener("sessionend",Ps),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(N),N=Z.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,N,D),d=Wt.get(S,E.length),d.init(N),E.push(d),Rt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),j.setFromProjectionMatrix(Rt),vt=this.localClippingEnabled,rt=it.init(this.clippingPlanes,vt),g=Mt.get(S,A.length),g.init(),A.push(g),Z.enabled===!0&&Z.isPresenting===!0){const ht=v.xr.getDepthSensingMesh();ht!==null&&Mn(ht,N,-1/0,v.sortObjects)}Mn(S,N,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(ut,mt),J=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,J&&Ft.addToRenderList(g,S),this.info.render.frame++,rt===!0&&it.beginShadows();const z=d.state.shadowsArray;bt.render(z,S,N),rt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,F=g.transmissive;if(d.setupLights(),N.isArrayCamera){const ht=N.cameras;if(F.length>0)for(let St=0,Ct=ht.length;St<Ct;St++){const At=ht[St];Fn(H,F,S,At)}J&&Ft.render(S);for(let St=0,Ct=ht.length;St<Ct;St++){const At=ht[St];Qn(g,S,At,At.viewport)}}else F.length>0&&Fn(H,F,S,N),J&&Ft.render(S),Qn(g,S,N);D!==null&&(T.updateMultisampleRenderTarget(D),T.updateRenderTargetMipmap(D)),S.isScene===!0&&S.onAfterRender(v,S,N),de.resetDefaultState(),y=-1,M=null,E.pop(),E.length>0?(d=E[E.length-1],rt===!0&&it.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,A.pop(),A.length>0?g=A[A.length-1]:g=null};function Mn(S,N,z,H){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){H&&Ot.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Rt);const St=$.update(S),Ct=S.material;Ct.visible&&g.push(S,St,Ct,z,Ot.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||j.intersectsObject(S))){const St=$.update(S),Ct=S.material;if(H&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ot.copy(S.boundingSphere.center)):(St.boundingSphere===null&&St.computeBoundingSphere(),Ot.copy(St.boundingSphere.center)),Ot.applyMatrix4(S.matrixWorld).applyMatrix4(Rt)),Array.isArray(Ct)){const At=St.groups;for(let Bt=0,Vt=At.length;Bt<Vt;Bt++){const Pt=At[Bt],It=Ct[Pt.materialIndex];It&&It.visible&&g.push(S,St,It,z,Ot.z,Pt)}}else Ct.visible&&g.push(S,St,Ct,z,Ot.z,null)}}const ht=S.children;for(let St=0,Ct=ht.length;St<Ct;St++)Mn(ht[St],N,z,H)}function Qn(S,N,z,H){const F=S.opaque,ht=S.transmissive,St=S.transparent;d.setupLightsView(z),rt===!0&&it.setGlobalState(v.clippingPlanes,z),H&&ct.viewport(L.copy(H)),F.length>0&&xi(F,N,z),ht.length>0&&xi(ht,N,z),St.length>0&&xi(St,N,z),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function Fn(S,N,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[H.id]===void 0&&(d.state.transmissionRenderTarget[H.id]=new pi(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?Rs:Un,minFilter:di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const ht=d.state.transmissionRenderTarget[H.id],St=H.viewport||L;ht.setSize(St.z,St.w);const Ct=v.getRenderTarget();v.setRenderTarget(ht),v.getClearColor(G),K=v.getClearAlpha(),K<1&&v.setClearColor(16777215,.5),v.clear(),J&&Ft.render(z);const At=v.toneMapping;v.toneMapping=jn;const Bt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),d.setupLightsView(H),rt===!0&&it.setGlobalState(v.clippingPlanes,H),xi(S,z,H),T.updateMultisampleRenderTarget(ht),T.updateRenderTargetMipmap(ht),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Pt=0,It=N.length;Pt<It;Pt++){const Jt=N[Pt],re=Jt.object,Le=Jt.geometry,oe=Jt.material,Lt=Jt.group;if(oe.side===sn&&re.layers.test(H.layers)){const Ye=oe.side;oe.side=Oe,oe.needsUpdate=!0,ns(re,z,H,Le,oe,Lt),oe.side=Ye,oe.needsUpdate=!0,Vt=!0}}Vt===!0&&(T.updateMultisampleRenderTarget(ht),T.updateRenderTargetMipmap(ht))}v.setRenderTarget(Ct),v.setClearColor(G,K),Bt!==void 0&&(H.viewport=Bt),v.toneMapping=At}function xi(S,N,z){const H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ht=S.length;F<ht;F++){const St=S[F],Ct=St.object,At=St.geometry,Bt=H===null?St.material:H,Vt=St.group;Ct.layers.test(z.layers)&&ns(Ct,N,z,At,Bt,Vt)}}function ns(S,N,z,H,F,ht){S.onBeforeRender(v,N,z,H,F,ht),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(v,N,z,H,S,ht),F.transparent===!0&&F.side===sn&&F.forceSinglePass===!1?(F.side=Oe,F.needsUpdate=!0,v.renderBufferDirect(z,N,H,F,S,ht),F.side=Kn,F.needsUpdate=!0,v.renderBufferDirect(z,N,H,F,S,ht),F.side=sn):v.renderBufferDirect(z,N,H,F,S,ht),S.onAfterRender(v,N,z,H,F,ht)}function On(S,N,z){N.isScene!==!0&&(N=Yt);const H=xt.get(S),F=d.state.lights,ht=d.state.shadowsArray,St=F.state.version,Ct=Tt.getParameters(S,F.state,ht,N,z),At=Tt.getProgramCacheKey(Ct);let Bt=H.programs;H.environment=S.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(S.isMeshStandardMaterial?B:x).get(S.envMap||H.environment),H.envMapRotation=H.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,Bt===void 0&&(S.addEventListener("dispose",Xt),Bt=new Map,H.programs=Bt);let Vt=Bt.get(At);if(Vt!==void 0){if(H.currentProgram===Vt&&H.lightsStateVersion===St)return is(S,Ct),Vt}else Ct.uniforms=Tt.getUniforms(S),S.onBeforeCompile(Ct,v),Vt=Tt.acquireProgram(Ct,At),Bt.set(At,Vt),H.uniforms=Ct.uniforms;const Pt=H.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Pt.clippingPlanes=it.uniform),is(S,Ct),H.needsLights=Mi(S),H.lightsStateVersion=St,H.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Vt,H.uniformsList=null,Vt}function yn(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=lr.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function is(S,N){const z=xt.get(S);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Mr(S,N,z,H,F){N.isScene!==!0&&(N=Yt),T.resetTextureUnits();const ht=N.fog,St=H.isMeshStandardMaterial?N.environment:null,Ct=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ji,At=(H.isMeshStandardMaterial?B:x).get(H.envMap||St),Bt=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Vt=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pt=!!z.morphAttributes.position,It=!!z.morphAttributes.normal,Jt=!!z.morphAttributes.color;let re=jn;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(re=v.toneMapping);const Le=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,oe=Le!==void 0?Le.length:0,Lt=xt.get(H),Ye=d.state.lights;if(rt===!0&&(vt===!0||S!==M)){const Ie=S===M&&H.id===y;it.setState(H,S,Ie)}let ne=!1;H.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Ye.state.version||Lt.outputColorSpace!==Ct||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==At||H.fog===!0&&Lt.fog!==ht||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==it.numPlanes||Lt.numIntersection!==it.numIntersection)||Lt.vertexAlphas!==Bt||Lt.vertexTangents!==Vt||Lt.morphTargets!==Pt||Lt.morphNormals!==It||Lt.morphColors!==Jt||Lt.toneMapping!==re||Lt.morphTargetsCount!==oe)&&(ne=!0):(ne=!0,Lt.__version=H.version);let $e=Lt.currentProgram;ne===!0&&($e=On(H,N,F));let pn=!1,Re=!1,Sn=!1;const le=$e.getUniforms(),ze=Lt.uniforms;if(ct.useProgram($e.program)&&(pn=!0,Re=!0,Sn=!0),H.id!==y&&(y=H.id,Re=!0),pn||M!==S){ct.buffers.depth.getReversed()?(at.copy(S.projectionMatrix),zh(at),kh(at),le.setValue(w,"projectionMatrix",at)):le.setValue(w,"projectionMatrix",S.projectionMatrix),le.setValue(w,"viewMatrix",S.matrixWorldInverse);const rn=le.map.cameraPosition;rn!==void 0&&rn.setValue(w,Nt.setFromMatrixPosition(S.matrixWorld)),ft.logarithmicDepthBuffer&&le.setValue(w,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&le.setValue(w,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,Re=!0,Sn=!0)}if(F.isSkinnedMesh){le.setOptional(w,F,"bindMatrix"),le.setOptional(w,F,"bindMatrixInverse");const Ie=F.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),le.setValue(w,"boneTexture",Ie.boneTexture,T))}F.isBatchedMesh&&(le.setOptional(w,F,"batchingTexture"),le.setValue(w,"batchingTexture",F._matricesTexture,T),le.setOptional(w,F,"batchingIdTexture"),le.setValue(w,"batchingIdTexture",F._indirectTexture,T),le.setOptional(w,F,"batchingColorTexture"),F._colorsTexture!==null&&le.setValue(w,"batchingColorTexture",F._colorsTexture,T));const ke=z.morphAttributes;if((ke.position!==void 0||ke.normal!==void 0||ke.color!==void 0)&&Ht.update(F,z,$e),(Re||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,le.setValue(w,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ze.envMap.value=At,ze.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(ze.envMapIntensity.value=N.environmentIntensity),Re&&(le.setValue(w,"toneMappingExposure",v.toneMappingExposure),Lt.needsLights&&Bn(ze,Sn),ht&&H.fog===!0&&dt.refreshFogUniforms(ze,ht),dt.refreshMaterialUniforms(ze,H,Y,st,d.state.transmissionRenderTarget[S.id]),lr.upload(w,yn(Lt),ze,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(lr.upload(w,yn(Lt),ze,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&le.setValue(w,"center",F.center),le.setValue(w,"modelViewMatrix",F.modelViewMatrix),le.setValue(w,"normalMatrix",F.normalMatrix),le.setValue(w,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ie=H.uniformsGroups;for(let rn=0,on=Ie.length;rn<on;rn++){const ti=Ie[rn];U.update(ti,$e),U.bind(ti,$e)}}return $e}function Bn(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function Mi(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(S,N,z){xt.get(S.texture).__webglTexture=N,xt.get(S.depthTexture).__webglTexture=z;const H=xt.get(S);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,N){const z=xt.get(S);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,z=0){D=S,C=N,P=z;let H=!0,F=null,ht=!1,St=!1;if(S){const At=xt.get(S);if(At.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(w.FRAMEBUFFER,null),H=!1;else if(At.__webglFramebuffer===void 0)T.setupRenderTarget(S);else if(At.__hasExternalTextures)T.rebindTextures(S,xt.get(S.texture).__webglTexture,xt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Pt=S.depthTexture;if(At.__boundDepthTexture!==Pt){if(Pt!==null&&xt.has(Pt)&&(S.width!==Pt.image.width||S.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(S)}}const Bt=S.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(St=!0);const Vt=xt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Vt[N])?F=Vt[N][z]:F=Vt[N],ht=!0):S.samples>0&&T.useMultisampledRTT(S)===!1?F=xt.get(S).__webglMultisampledFramebuffer:Array.isArray(Vt)?F=Vt[z]:F=Vt,L.copy(S.viewport),X.copy(S.scissor),k=S.scissorTest}else L.copy(Et).multiplyScalar(Y).floor(),X.copy(zt).multiplyScalar(Y).floor(),k=te;if(ct.bindFramebuffer(w.FRAMEBUFFER,F)&&H&&ct.drawBuffers(S,F),ct.viewport(L),ct.scissor(X),ct.setScissorTest(k),ht){const At=xt.get(S.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,z)}else if(St){const At=xt.get(S.texture),Bt=N||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,At.__webglTexture,z||0,Bt)}y=-1},this.readRenderTargetPixels=function(S,N,z,H,F,ht,St){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(Ct=Ct[St]),Ct){ct.bindFramebuffer(w.FRAMEBUFFER,Ct);try{const At=S.texture,Bt=At.format,Vt=At.type;if(!ft.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-H&&z>=0&&z<=S.height-F&&w.readPixels(N,z,H,F,qt.convert(Bt),qt.convert(Vt),ht)}finally{const At=D!==null?xt.get(D).__webglFramebuffer:null;ct.bindFramebuffer(w.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,N,z,H,F,ht,St){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=xt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&St!==void 0&&(Ct=Ct[St]),Ct){const At=S.texture,Bt=At.format,Vt=At.type;if(!ft.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=S.width-H&&z>=0&&z<=S.height-F){ct.bindFramebuffer(w.FRAMEBUFFER,Ct);const Pt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Pt),w.bufferData(w.PIXEL_PACK_BUFFER,ht.byteLength,w.STREAM_READ),w.readPixels(N,z,H,F,qt.convert(Bt),qt.convert(Vt),0);const It=D!==null?xt.get(D).__webglFramebuffer:null;ct.bindFramebuffer(w.FRAMEBUFFER,It);const Jt=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Bh(w,Jt,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Pt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,ht),w.deleteBuffer(Pt),w.deleteSync(Jt),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,N=null,z=0){S.isTexture!==!0&&(ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,S=arguments[1]);const H=Math.pow(2,-z),F=Math.floor(S.image.width*H),ht=Math.floor(S.image.height*H),St=N!==null?N.x:0,Ct=N!==null?N.y:0;T.setTexture2D(S,0),w.copyTexSubImage2D(w.TEXTURE_2D,z,0,0,St,Ct,F,ht),ct.unbindTexture()},this.copyTextureToTexture=function(S,N,z=null,H=null,F=0){S.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,S=arguments[1],N=arguments[2],F=arguments[3]||0,z=null);let ht,St,Ct,At,Bt,Vt,Pt,It,Jt;const re=S.isCompressedTexture?S.mipmaps[F]:S.image;z!==null?(ht=z.max.x-z.min.x,St=z.max.y-z.min.y,Ct=z.isBox3?z.max.z-z.min.z:1,At=z.min.x,Bt=z.min.y,Vt=z.isBox3?z.min.z:0):(ht=re.width,St=re.height,Ct=re.depth||1,At=0,Bt=0,Vt=0),H!==null?(Pt=H.x,It=H.y,Jt=H.z):(Pt=0,It=0,Jt=0);const Le=qt.convert(N.format),oe=qt.convert(N.type);let Lt;N.isData3DTexture?(T.setTexture3D(N,0),Lt=w.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Lt=w.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Lt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,N.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,N.unpackAlignment);const Ye=w.getParameter(w.UNPACK_ROW_LENGTH),ne=w.getParameter(w.UNPACK_IMAGE_HEIGHT),$e=w.getParameter(w.UNPACK_SKIP_PIXELS),pn=w.getParameter(w.UNPACK_SKIP_ROWS),Re=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,re.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,re.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,At),w.pixelStorei(w.UNPACK_SKIP_ROWS,Bt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Vt);const Sn=S.isDataArrayTexture||S.isData3DTexture,le=N.isDataArrayTexture||N.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const ze=xt.get(S),ke=xt.get(N),Ie=xt.get(ze.__renderTarget),rn=xt.get(ke.__renderTarget);ct.bindFramebuffer(w.READ_FRAMEBUFFER,Ie.__webglFramebuffer),ct.bindFramebuffer(w.DRAW_FRAMEBUFFER,rn.__webglFramebuffer);for(let on=0;on<Ct;on++)Sn&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xt.get(S).__webglTexture,F,Vt+on),S.isDepthTexture?(le&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,xt.get(N).__webglTexture,F,Jt+on),w.blitFramebuffer(At,Bt,ht,St,Pt,It,ht,St,w.DEPTH_BUFFER_BIT,w.NEAREST)):le?w.copyTexSubImage3D(Lt,F,Pt,It,Jt+on,At,Bt,ht,St):w.copyTexSubImage2D(Lt,F,Pt,It,Jt+on,At,Bt,ht,St);ct.bindFramebuffer(w.READ_FRAMEBUFFER,null),ct.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else le?S.isDataTexture||S.isData3DTexture?w.texSubImage3D(Lt,F,Pt,It,Jt,ht,St,Ct,Le,oe,re.data):N.isCompressedArrayTexture?w.compressedTexSubImage3D(Lt,F,Pt,It,Jt,ht,St,Ct,Le,re.data):w.texSubImage3D(Lt,F,Pt,It,Jt,ht,St,Ct,Le,oe,re):S.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,F,Pt,It,ht,St,Le,oe,re.data):S.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,F,Pt,It,re.width,re.height,Le,re.data):w.texSubImage2D(w.TEXTURE_2D,F,Pt,It,ht,St,Le,oe,re);w.pixelStorei(w.UNPACK_ROW_LENGTH,Ye),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ne),w.pixelStorei(w.UNPACK_SKIP_PIXELS,$e),w.pixelStorei(w.UNPACK_SKIP_ROWS,pn),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Re),F===0&&N.generateMipmaps&&w.generateMipmap(Lt),ct.unbindTexture()},this.copyTextureToTexture3D=function(S,N,z=null,H=null,F=0){return S.isTexture!==!0&&(ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,S=arguments[2],N=arguments[3],F=arguments[4]||0),ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,N,z,H,F)},this.initRenderTarget=function(S){xt.get(S).__webglFramebuffer===void 0&&T.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),ct.unbindTexture()},this.resetState=function(){C=0,P=0,D=null,ct.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}class vl extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class hr extends Xe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],m=n[s+1]-u,h=(o-u)/m;return(s+h)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new ot:new b);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new b,s=[],r=[],o=[],a=new b,c=new ve;for(let h=0;h<=t;h++){const f=h/t;s[h]=this.getTangentAt(f,new b)}r[0]=new b,o[0]=new b;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),p=Math.abs(s[0].y),m=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),p<=l&&(l=p,n.set(0,1,0)),m<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=t;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();const f=Math.acos(Ee(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(c.makeRotationAxis(a,f))}o[h].crossVectors(s[h],r[h])}if(e===!0){let h=Math.acos(Ee(r[0].dot(r[t]),-1,1));h/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(h=-h);for(let f=1;f<=t;f++)r[f].applyMatrix4(c.makeRotationAxis(s[f],h*f)),o[f].crossVectors(s[f],r[f])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ua extends xn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ot){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=c-this.aX,h=l-this.aY;c=m*u-h*p+this.aX,l=m*p+h*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Km extends ua{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function da(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,p){let m=(o-r)/l-(a-r)/(l+u)+(a-o)/u,h=(a-o)/u-(c-o)/(u+p)+(c-a)/p;m*=u,h*=u,s(o,a,m,h)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Qs=new b,Qr=new da,to=new da,eo=new da;class ci extends xn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new b){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Qs.subVectors(s[0],s[1]).add(s[0]),l=Qs);const p=s[a%r],m=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Qs.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Qs),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let f=Math.pow(l.distanceToSquared(p),h),_=Math.pow(p.distanceToSquared(m),h),g=Math.pow(m.distanceToSquared(u),h);_<1e-4&&(_=1),f<1e-4&&(f=_),g<1e-4&&(g=_),Qr.initNonuniformCatmullRom(l.x,p.x,m.x,u.x,f,_,g),to.initNonuniformCatmullRom(l.y,p.y,m.y,u.y,f,_,g),eo.initNonuniformCatmullRom(l.z,p.z,m.z,u.z,f,_,g)}else this.curveType==="catmullrom"&&(Qr.initCatmullRom(l.x,p.x,m.x,u.x,this.tension),to.initCatmullRom(l.y,p.y,m.y,u.y,this.tension),eo.initCatmullRom(l.z,p.z,m.z,u.z,this.tension));return n.set(Qr.calc(c),to.calc(c),eo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new b().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Tc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Jm(i,t){const e=1-i;return e*e*t}function Qm(i,t){return 2*(1-i)*i*t}function t0(i,t){return i*i*t}function xs(i,t,e,n){return Jm(i,t)+Qm(i,e)+t0(i,n)}function e0(i,t){const e=1-i;return e*e*e*t}function n0(i,t){const e=1-i;return 3*e*e*i*t}function i0(i,t){return 3*(1-i)*i*i*t}function s0(i,t){return i*i*i*t}function Ms(i,t,e,n,s){return e0(i,t)+n0(i,e)+i0(i,n)+s0(i,s)}class xl extends xn{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ms(t,s.x,r.x,o.x,a.x),Ms(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class r0 extends xn{constructor(t=new b,e=new b,n=new b,s=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new b){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ms(t,s.x,r.x,o.x,a.x),Ms(t,s.y,r.y,o.y,a.y),Ms(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ml extends xn{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class o0 extends xn{constructor(t=new b,e=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new b){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new b){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yl extends xn{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,s.x,r.x,o.x),xs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sl extends xn{constructor(t=new b,e=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new b){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xs(t,s.x,r.x,o.x),xs(t,s.y,r.y,o.y),xs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class El extends xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return n.set(Tc(a,c.x,l.x,u.x,p.x),Tc(a,c.y,l.y,u.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ot().fromArray(s))}return this}}var pr=Object.freeze({__proto__:null,ArcCurve:Km,CatmullRomCurve3:ci,CubicBezierCurve:xl,CubicBezierCurve3:r0,EllipseCurve:ua,LineCurve:Ml,LineCurve3:o0,QuadraticBezierCurve:yl,QuadraticBezierCurve3:Sl,SplineCurve:El});class a0 extends xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new pr[s.type]().fromJSON(s))}return this}}class wc extends a0{constructor(t){super(),this.type="Path",this.currentPoint=new ot,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ml(this.currentPoint.clone(),new ot(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new yl(this.currentPoint.clone(),new ot(t,e),new ot(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new xl(this.currentPoint.clone(),new ot(t,e),new ot(n,s),new ot(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new El(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new ua(t,e,n,s,r,o,a,c);if(this.curves.length>0){const p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class fa extends Be{constructor(t=[new ot(0,-.5),new ot(.5,0),new ot(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ee(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],u=1/e,p=new b,m=new ot,h=new b,f=new b,_=new b;let g=0,d=0;for(let A=0;A<=t.length-1;A++)switch(A){case 0:g=t[A+1].x-t[A].x,d=t[A+1].y-t[A].y,h.x=d*1,h.y=-g,h.z=d*0,_.copy(h),h.normalize(),c.push(h.x,h.y,h.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:g=t[A+1].x-t[A].x,d=t[A+1].y-t[A].y,h.x=d*1,h.y=-g,h.z=d*0,f.copy(h),h.x+=_.x,h.y+=_.y,h.z+=_.z,h.normalize(),c.push(h.x,h.y,h.z),_.copy(f)}for(let A=0;A<=e;A++){const E=n+A*u*s,v=Math.sin(E),I=Math.cos(E);for(let C=0;C<=t.length-1;C++){p.x=t[C].x*v,p.y=t[C].y,p.z=t[C].x*I,o.push(p.x,p.y,p.z),m.x=A/e,m.y=C/(t.length-1),a.push(m.x,m.y);const P=c[3*C+0]*v,D=c[3*C+1],y=c[3*C+0]*I;l.push(P,D,y)}}for(let A=0;A<e;A++)for(let E=0;E<t.length-1;E++){const v=E+A*t.length,I=v,C=v+t.length,P=v+t.length+1,D=v+1;r.push(I,C,D),r.push(P,D,C)}this.setIndex(r),this.setAttribute("position",new he(o,3)),this.setAttribute("uv",new he(a,2)),this.setAttribute("normal",new he(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fa(t.points,t.segments,t.phiStart,t.phiLength)}}class pa extends Be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new b,u=new ot;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let p=0,m=3;p<=e;p++,m+=3){const h=n+p/e*s;l.x=t*Math.cos(h),l.y=t*Math.sin(h),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[m]/t+1)/2,u.y=(o[m+1]/t+1)/2,c.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(a,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class jt extends Be{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],m=[],h=[];let f=0;const _=[],g=n/2;let d=0;A(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new he(p,3)),this.setAttribute("normal",new he(m,3)),this.setAttribute("uv",new he(h,2));function A(){const v=new b,I=new b;let C=0;const P=(e-t)/n;for(let D=0;D<=r;D++){const y=[],M=D/r,L=M*(e-t)+t;for(let X=0;X<=s;X++){const k=X/s,G=k*c+a,K=Math.sin(G),W=Math.cos(G);I.x=L*K,I.y=-M*n+g,I.z=L*W,p.push(I.x,I.y,I.z),v.set(K,P,W).normalize(),m.push(v.x,v.y,v.z),h.push(k,1-M),y.push(f++)}_.push(y)}for(let D=0;D<s;D++)for(let y=0;y<r;y++){const M=_[y][D],L=_[y+1][D],X=_[y+1][D+1],k=_[y][D+1];(t>0||y!==0)&&(u.push(M,L,k),C+=3),(e>0||y!==r-1)&&(u.push(L,X,k),C+=3)}l.addGroup(d,C,0),d+=C}function E(v){const I=f,C=new ot,P=new b;let D=0;const y=v===!0?t:e,M=v===!0?1:-1;for(let X=1;X<=s;X++)p.push(0,g*M,0),m.push(0,M,0),h.push(.5,.5),f++;const L=f;for(let X=0;X<=s;X++){const G=X/s*c+a,K=Math.cos(G),W=Math.sin(G);P.x=y*W,P.y=g*M,P.z=y*K,p.push(P.x,P.y,P.z),m.push(0,M,0),C.x=K*.5+.5,C.y=W*.5*M+.5,h.push(C.x,C.y),f++}for(let X=0;X<s;X++){const k=I+X,G=L+X;v===!0?u.push(G,G+1,k):u.push(G+1,G,k),D+=3}l.addGroup(d,D,v===!0?1:2),d+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ma extends jt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ma(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bl extends wc{constructor(t){super(t),this.uuid=vi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new wc().fromJSON(s))}return this}}const c0={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Tl(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,u,p,m,h;if(n&&(r=f0(i,t,r,e)),i.length>80*e){a=l=i[0],c=u=i[1];for(let f=e;f<s;f+=e)p=i[f],m=i[f+1],p<a&&(a=p),m<c&&(c=m),p>l&&(l=p),m>u&&(u=m);h=Math.max(l-a,u-c),h=h!==0?32767/h:0}return Ts(r,o,e,a,c,h,0),o}};function Tl(i,t,e,n,s){let r,o;if(s===b0(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Ac(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Ac(r,i[r],i[r+1],o);return o&&xr(o,o.next)&&(As(o),o=o.next),o}function gi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(xr(e,e.next)||xe(e.prev,e,e.next)===0)){if(As(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ts(i,t,e,n,s,r,o){if(!i)return;!o&&r&&v0(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?h0(i,n,s,r):l0(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),As(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=u0(gi(i),t,e),Ts(i,t,e,n,s,r,2)):o===2&&d0(i,t,e,n,s,r):Ts(gi(i),t,e,n,s,r,1);break}}}function l0(i){const t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=s<r?s<o?s:o:r<o?r:o,p=a<c?a<l?a:l:c<l?c:l,m=s>r?s>o?s:o:r>o?r:o,h=a>c?a>l?a:l:c>l?c:l;let f=n.next;for(;f!==t;){if(f.x>=u&&f.x<=m&&f.y>=p&&f.y<=h&&ki(s,a,r,c,o,l,f.x,f.y)&&xe(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function h0(i,t,e,n){const s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,p=r.y,m=o.y,h=a<c?a<l?a:l:c<l?c:l,f=u<p?u<m?u:m:p<m?p:m,_=a>c?a>l?a:l:c>l?c:l,g=u>p?u>m?u:m:p>m?p:m,d=$o(h,f,t,e,n),A=$o(_,g,t,e,n);let E=i.prevZ,v=i.nextZ;for(;E&&E.z>=d&&v&&v.z<=A;){if(E.x>=h&&E.x<=_&&E.y>=f&&E.y<=g&&E!==s&&E!==o&&ki(a,u,c,p,l,m,E.x,E.y)&&xe(E.prev,E,E.next)>=0||(E=E.prevZ,v.x>=h&&v.x<=_&&v.y>=f&&v.y<=g&&v!==s&&v!==o&&ki(a,u,c,p,l,m,v.x,v.y)&&xe(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;E&&E.z>=d;){if(E.x>=h&&E.x<=_&&E.y>=f&&E.y<=g&&E!==s&&E!==o&&ki(a,u,c,p,l,m,E.x,E.y)&&xe(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;v&&v.z<=A;){if(v.x>=h&&v.x<=_&&v.y>=f&&v.y<=g&&v!==s&&v!==o&&ki(a,u,c,p,l,m,v.x,v.y)&&xe(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function u0(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!xr(s,r)&&wl(s,n,n.next,r)&&ws(s,r)&&ws(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),As(n),As(n.next),n=i=r),n=n.next}while(n!==i);return gi(n)}function d0(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&y0(o,a)){let c=Al(o,a);o=gi(o,o.next),c=gi(c,c.next),Ts(o,t,e,n,s,r,0),Ts(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function f0(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Tl(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(M0(l));for(s.sort(p0),r=0;r<s.length;r++)e=m0(s[r],e);return e}function p0(i,t){return i.x-t.x}function m0(i,t){const e=g0(i,t);if(!e)return t;const n=Al(e,i);return gi(n,n.next),gi(e,e.next)}function g0(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const m=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(m<=r&&m>n&&(n=m,s=e.x<e.next.x?e:e.next,m===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let u=1/0,p;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&ki(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(p=Math.abs(o-e.y)/(r-e.x),ws(e,i)&&(p<u||p===u&&(e.x>s.x||e.x===s.x&&_0(s,e)))&&(s=e,u=p)),e=e.next;while(e!==a);return s}function _0(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function v0(i,t,e,n){let s=i;do s.z===0&&(s.z=$o(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,x0(s)}function x0(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function $o(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function M0(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ki(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function y0(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!S0(i,t)&&(ws(i,t)&&ws(t,i)&&E0(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||xr(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function xr(i,t){return i.x===t.x&&i.y===t.y}function wl(i,t,e,n){const s=er(xe(i,t,e)),r=er(xe(i,t,n)),o=er(xe(e,n,i)),a=er(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&tr(i,e,t)||r===0&&tr(i,n,t)||o===0&&tr(e,i,n)||a===0&&tr(e,t,n))}function tr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function er(i){return i>0?1:i<0?-1:0}function S0(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&wl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ws(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function E0(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Al(i,t){const e=new jo(i.i,i.x,i.y),n=new jo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ac(i,t,e,n){const s=new jo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function As(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function jo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function b0(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class ys{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return ys.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Rc(t),Cc(n,t);let o=t.length;e.forEach(Rc);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Cc(n,e[c]);const a=c0.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Rc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Cc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class ga extends Be{constructor(t=new bl([new ot(.5,.5),new ot(-.5,.5),new ot(-.5,-.5),new ot(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new he(s,3)),this.setAttribute("uv",new he(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let m=e.bevelEnabled!==void 0?e.bevelEnabled:!0,h=e.bevelThickness!==void 0?e.bevelThickness:.2,f=e.bevelSize!==void 0?e.bevelSize:h-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,A=e.UVGenerator!==void 0?e.UVGenerator:T0;let E,v=!1,I,C,P,D;d&&(E=d.getSpacedPoints(u),v=!0,m=!1,I=d.computeFrenetFrames(u,!1),C=new b,P=new b,D=new b),m||(g=0,h=0,f=0,_=0);const y=a.extractPoints(l);let M=y.shape;const L=y.holes;if(!ys.isClockWise(M)){M=M.reverse();for(let J=0,O=L.length;J<O;J++){const w=L[J];ys.isClockWise(w)&&(L[J]=w.reverse())}}const k=ys.triangulateShape(M,L),G=M;for(let J=0,O=L.length;J<O;J++){const w=L[J];M=M.concat(w)}function K(J,O,w){return O||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(O,w)}const W=M.length,st=k.length;function Y(J,O,w){let pt,Q,ft;const ct=J.x-O.x,Dt=J.y-O.y,xt=w.x-J.x,T=w.y-J.y,x=ct*ct+Dt*Dt,B=ct*T-Dt*xt;if(Math.abs(B)>Number.EPSILON){const q=Math.sqrt(x),et=Math.sqrt(xt*xt+T*T),$=O.x-Dt/q,Tt=O.y+ct/q,dt=w.x-T/et,Mt=w.y+xt/et,Wt=((dt-$)*T-(Mt-Tt)*xt)/(ct*T-Dt*xt);pt=$+ct*Wt-J.x,Q=Tt+Dt*Wt-J.y;const it=pt*pt+Q*Q;if(it<=2)return new ot(pt,Q);ft=Math.sqrt(it/2)}else{let q=!1;ct>Number.EPSILON?xt>Number.EPSILON&&(q=!0):ct<-Number.EPSILON?xt<-Number.EPSILON&&(q=!0):Math.sign(Dt)===Math.sign(T)&&(q=!0),q?(pt=-Dt,Q=ct,ft=Math.sqrt(x)):(pt=ct,Q=Dt,ft=Math.sqrt(x/2))}return new ot(pt/ft,Q/ft)}const ut=[];for(let J=0,O=G.length,w=O-1,pt=J+1;J<O;J++,w++,pt++)w===O&&(w=0),pt===O&&(pt=0),ut[J]=Y(G[J],G[w],G[pt]);const mt=[];let Et,zt=ut.concat();for(let J=0,O=L.length;J<O;J++){const w=L[J];Et=[];for(let pt=0,Q=w.length,ft=Q-1,ct=pt+1;pt<Q;pt++,ft++,ct++)ft===Q&&(ft=0),ct===Q&&(ct=0),Et[pt]=Y(w[pt],w[ft],w[ct]);mt.push(Et),zt=zt.concat(Et)}for(let J=0;J<g;J++){const O=J/g,w=h*Math.cos(O*Math.PI/2),pt=f*Math.sin(O*Math.PI/2)+_;for(let Q=0,ft=G.length;Q<ft;Q++){const ct=K(G[Q],ut[Q],pt);at(ct.x,ct.y,-w)}for(let Q=0,ft=L.length;Q<ft;Q++){const ct=L[Q];Et=mt[Q];for(let Dt=0,xt=ct.length;Dt<xt;Dt++){const T=K(ct[Dt],Et[Dt],pt);at(T.x,T.y,-w)}}}const te=f+_;for(let J=0;J<W;J++){const O=m?K(M[J],zt[J],te):M[J];v?(P.copy(I.normals[0]).multiplyScalar(O.x),C.copy(I.binormals[0]).multiplyScalar(O.y),D.copy(E[0]).add(P).add(C),at(D.x,D.y,D.z)):at(O.x,O.y,0)}for(let J=1;J<=u;J++)for(let O=0;O<W;O++){const w=m?K(M[O],zt[O],te):M[O];v?(P.copy(I.normals[J]).multiplyScalar(w.x),C.copy(I.binormals[J]).multiplyScalar(w.y),D.copy(E[J]).add(P).add(C),at(D.x,D.y,D.z)):at(w.x,w.y,p/u*J)}for(let J=g-1;J>=0;J--){const O=J/g,w=h*Math.cos(O*Math.PI/2),pt=f*Math.sin(O*Math.PI/2)+_;for(let Q=0,ft=G.length;Q<ft;Q++){const ct=K(G[Q],ut[Q],pt);at(ct.x,ct.y,p+w)}for(let Q=0,ft=L.length;Q<ft;Q++){const ct=L[Q];Et=mt[Q];for(let Dt=0,xt=ct.length;Dt<xt;Dt++){const T=K(ct[Dt],Et[Dt],pt);v?at(T.x,T.y+E[u-1].y,E[u-1].x+w):at(T.x,T.y,p+w)}}}j(),rt();function j(){const J=s.length/3;if(m){let O=0,w=W*O;for(let pt=0;pt<st;pt++){const Q=k[pt];Rt(Q[2]+w,Q[1]+w,Q[0]+w)}O=u+g*2,w=W*O;for(let pt=0;pt<st;pt++){const Q=k[pt];Rt(Q[0]+w,Q[1]+w,Q[2]+w)}}else{for(let O=0;O<st;O++){const w=k[O];Rt(w[2],w[1],w[0])}for(let O=0;O<st;O++){const w=k[O];Rt(w[0]+W*u,w[1]+W*u,w[2]+W*u)}}n.addGroup(J,s.length/3-J,0)}function rt(){const J=s.length/3;let O=0;vt(G,O),O+=G.length;for(let w=0,pt=L.length;w<pt;w++){const Q=L[w];vt(Q,O),O+=Q.length}n.addGroup(J,s.length/3-J,1)}function vt(J,O){let w=J.length;for(;--w>=0;){const pt=w;let Q=w-1;Q<0&&(Q=J.length-1);for(let ft=0,ct=u+g*2;ft<ct;ft++){const Dt=W*ft,xt=W*(ft+1),T=O+pt+Dt,x=O+Q+Dt,B=O+Q+xt,q=O+pt+xt;Nt(T,x,B,q)}}}function at(J,O,w){c.push(J),c.push(O),c.push(w)}function Rt(J,O,w){Ot(J),Ot(O),Ot(w);const pt=s.length/3,Q=A.generateTopUV(n,s,pt-3,pt-2,pt-1);Yt(Q[0]),Yt(Q[1]),Yt(Q[2])}function Nt(J,O,w,pt){Ot(J),Ot(O),Ot(pt),Ot(O),Ot(w),Ot(pt);const Q=s.length/3,ft=A.generateSideWallUV(n,s,Q-6,Q-3,Q-2,Q-1);Yt(ft[0]),Yt(ft[1]),Yt(ft[3]),Yt(ft[1]),Yt(ft[2]),Yt(ft[3])}function Ot(J){s.push(c[J*3+0]),s.push(c[J*3+1]),s.push(c[J*3+2])}function Yt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return w0(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new pr[s.type]().fromJSON(s)),new ga(n,t.options)}}const T0={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],u=t[s*3+1];return[new ot(r,o),new ot(a,c),new ot(l,u)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],p=t[n*3+2],m=t[s*3],h=t[s*3+1],f=t[s*3+2],_=t[r*3],g=t[r*3+1],d=t[r*3+2];return Math.abs(a-u)<Math.abs(o-l)?[new ot(o,1-c),new ot(l,1-p),new ot(m,1-f),new ot(_,1-d)]:[new ot(a,1-c),new ot(u,1-p),new ot(h,1-f),new ot(g,1-d)]}};function w0(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class _a extends Be{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let p=t;const m=(e-t)/s,h=new b,f=new ot;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const d=r+g/n*o;h.x=p*Math.cos(d),h.y=p*Math.sin(d),c.push(h.x,h.y,h.z),l.push(0,0,1),f.x=(h.x/e+1)/2,f.y=(h.y/e+1)/2,u.push(f.x,f.y)}p+=m}for(let _=0;_<s;_++){const g=_*(n+1);for(let d=0;d<n;d++){const A=d+g,E=A,v=A+n+1,I=A+n+2,C=A+1;a.push(E,v,C),a.push(v,I,C)}}this.setIndex(a),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _a(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class mr extends Be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],p=new b,m=new b,h=[],f=[],_=[],g=[];for(let d=0;d<=n;d++){const A=[],E=d/n;let v=0;d===0&&o===0?v=.5/e:d===n&&c===Math.PI&&(v=-.5/e);for(let I=0;I<=e;I++){const C=I/e;p.x=-t*Math.cos(s+C*r)*Math.sin(o+E*a),p.y=t*Math.cos(o+E*a),p.z=t*Math.sin(s+C*r)*Math.sin(o+E*a),f.push(p.x,p.y,p.z),m.copy(p).normalize(),_.push(m.x,m.y,m.z),g.push(C+v,1-E),A.push(l++)}u.push(A)}for(let d=0;d<n;d++)for(let A=0;A<e;A++){const E=u[d][A+1],v=u[d][A],I=u[d+1][A],C=u[d+1][A+1];(d!==0||o>0)&&h.push(E,v,C),(d!==n-1||c<Math.PI)&&h.push(v,I,C)}this.setIndex(h),this.setAttribute("position",new he(f,3)),this.setAttribute("normal",new he(_,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hi extends Be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new b,p=new b,m=new b;for(let h=0;h<=n;h++)for(let f=0;f<=s;f++){const _=f/s*r,g=h/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(_),p.y=(t+e*Math.cos(g))*Math.sin(_),p.z=e*Math.sin(g),a.push(p.x,p.y,p.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),m.subVectors(p,u).normalize(),c.push(m.x,m.y,m.z),l.push(f/s),l.push(h/n)}for(let h=1;h<=n;h++)for(let f=1;f<=s;f++){const _=(s+1)*h+f-1,g=(s+1)*(h-1)+f-1,d=(s+1)*(h-1)+f,A=(s+1)*h+f;o.push(_,g,A),o.push(g,d,A)}this.setIndex(o),this.setAttribute("position",new he(a,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class qn extends Be{constructor(t=new Sl(new b(-1,-1,0),new b(-1,1,0),new b(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new b,c=new b,l=new ot;let u=new b;const p=[],m=[],h=[],f=[];_(),this.setIndex(f),this.setAttribute("position",new he(p,3)),this.setAttribute("normal",new he(m,3)),this.setAttribute("uv",new he(h,2));function _(){for(let E=0;E<e;E++)g(E);g(r===!1?e:0),A(),d()}function g(E){u=t.getPointAt(E/e,u);const v=o.normals[E],I=o.binormals[E];for(let C=0;C<=s;C++){const P=C/s*Math.PI*2,D=Math.sin(P),y=-Math.cos(P);c.x=y*v.x+D*I.x,c.y=y*v.y+D*I.y,c.z=y*v.z+D*I.z,c.normalize(),m.push(c.x,c.y,c.z),a.x=u.x+n*c.x,a.y=u.y+n*c.y,a.z=u.z+n*c.z,p.push(a.x,a.y,a.z)}}function d(){for(let E=1;E<=e;E++)for(let v=1;v<=s;v++){const I=(s+1)*(E-1)+(v-1),C=(s+1)*E+(v-1),P=(s+1)*E+v,D=(s+1)*(E-1)+v;f.push(I,C,D),f.push(C,P,D)}}function A(){for(let E=0;E<=e;E++)for(let v=0;v<=s;v++)l.x=E/e,l.y=v/s,h.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new qn(new pr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Pn extends Cs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class us extends Pn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class va extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class A0 extends va{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const no=new ve,Pc=new b,Lc=new b;class Rl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new la,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Pc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Pc),Lc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lc),e.updateMatrixWorld(),no.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(no)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Dc=new ve,ds=new b,io=new b;class R0 extends Rl{constructor(){super(new Je(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ds.setFromMatrixPosition(t.matrixWorld),n.position.copy(ds),io.copy(n.position),io.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(io),n.updateMatrixWorld(),s.makeTranslation(-ds.x,-ds.y,-ds.z),Dc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Dc)}}class C0 extends va{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new R0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class P0 extends Rl{constructor(){super(new dl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class L0 extends va{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new P0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ic=new ve;class D0{constructor(t,e,n=0,s=1/0){this.ray=new aa(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ic.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ic),this}intersectObject(t,e=!0,n=[]){return Ko(t,this,n,e),n.sort(Uc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ko(t[s],this,n,e);return n.sort(Uc),n}}function Uc(i,t){return i.distance-t.distance}function Ko(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ko(r[o],t,e,!0)}}class Nc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class I0 extends _i{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jo);class U0 extends vl{constructor(){super();const t=new Gt;t.deleteAttribute("uv");const e=new Pn({side:Oe}),n=new Pn,s=new C0(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new ue(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new ue(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new ue(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const c=new ue(t,n);c.position.set(6.167,.857,7.803),c.rotation.set(0,.561,0),c.scale.set(3.927,6.285,3.687),this.add(c);const l=new ue(t,n);l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),this.add(l);const u=new ue(t,n);u.position.set(2.291,-.756,-2.621),u.rotation.set(0,-.286,0),u.scale.set(1.546,1.552,1.496),this.add(u);const p=new ue(t,n);p.position.set(-2.193,-.369,-5.547),p.rotation.set(0,.516,0),p.scale.set(3.875,3.487,2.986),this.add(p);const m=new ue(t,Fi(50));m.position.set(-16.116,14.37,8.208),m.scale.set(.1,2.428,2.739),this.add(m);const h=new ue(t,Fi(50));h.position.set(-16.109,18.021,-8.207),h.scale.set(.1,2.425,2.751),this.add(h);const f=new ue(t,Fi(17));f.position.set(14.904,12.198,-1.832),f.scale.set(.15,4.265,6.331),this.add(f);const _=new ue(t,Fi(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const g=new ue(t,Fi(20));g.position.set(3.235,11.486,-12.541),g.scale.set(2.5,2,.1),this.add(g);const d=new ue(t,Fi(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Fi(i){const t=new bs;return t.color.setScalar(i),t}const Fc={type:"change"},xa={type:"start"},Cl={type:"end"},nr=new aa,Oc=new Yn,N0=Math.cos(70*Yo.DEG2RAD),Te=new b,qe=2*Math.PI,pe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},so=1e-6;class F0 extends I0{constructor(t,e=null){super(t,e),this.state=pe.NONE,this.enabled=!0,this.target=new b,this.cursor=new b,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vi.ROTATE,MIDDLE:Vi.DOLLY,RIGHT:Vi.PAN},this.touches={ONE:Bi.ROTATE,TWO:Bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new b,this._lastQuaternion=new mi,this._lastTargetPosition=new b,this._quat=new mi().setFromUnitVectors(t.up,new b(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Nc,this._sphericalDelta=new Nc,this._scale=1,this._panOffset=new b,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new b,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=B0.bind(this),this._onPointerDown=O0.bind(this),this._onPointerUp=z0.bind(this),this._onContextMenu=Y0.bind(this),this._onMouseWheel=V0.bind(this),this._onKeyDown=G0.bind(this),this._onTouchStart=W0.bind(this),this._onTouchMove=X0.bind(this),this._onMouseDown=k0.bind(this),this._onMouseMove=H0.bind(this),this._interceptControlDown=q0.bind(this),this._interceptControlUp=Z0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fc),this.update(),this.state=pe.NONE}update(t=null){const e=this.object.position;Te.copy(e).sub(this.target),Te.applyQuaternion(this._quat),this._spherical.setFromVector3(Te),this.autoRotate&&this.state===pe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=qe:n>Math.PI&&(n-=qe),s<-Math.PI?s+=qe:s>Math.PI&&(s-=qe),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Te.setFromSpherical(this._spherical),Te.applyQuaternion(this._quatInverse),e.copy(this.target).add(Te),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Te.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new b(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new b(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Te.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(nr.origin.copy(this.object.position),nr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nr.direction))<N0?this.object.lookAt(this.target):(Oc.setFromNormalAndCoplanarPoint(this.object.up,this.target),nr.intersectPlane(Oc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>so||8*(1-this._lastQuaternion.dot(this.object.quaternion))>so||this._lastTargetPosition.distanceToSquared(this.target)>so?(this.dispatchEvent(Fc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qe/60*this.autoRotateSpeed*t:qe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Te.setFromMatrixColumn(e,0),Te.multiplyScalar(-t),this._panOffset.add(Te)}_panUp(t,e){this.screenSpacePanning===!0?Te.setFromMatrixColumn(e,1):(Te.setFromMatrixColumn(e,0),Te.crossVectors(this.object.up,Te)),Te.multiplyScalar(t),this._panOffset.add(Te)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Te.copy(s).sub(this.target);let r=Te.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-qe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(qe*this._rotateDelta.x/e.clientHeight),this._rotateUp(qe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function O0(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function B0(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function z0(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cl),this.state=pe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function k0(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Vi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=pe.DOLLY;break;case Vi.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}break;case Vi.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=pe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=pe.PAN}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(xa)}function H0(i){switch(this.state){case pe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case pe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case pe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function V0(i){this.enabled===!1||this.enableZoom===!1||this.state!==pe.NONE||(i.preventDefault(),this.dispatchEvent(xa),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Cl))}function G0(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function W0(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Bi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=pe.TOUCH_ROTATE;break;case Bi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=pe.TOUCH_PAN;break;default:this.state=pe.NONE}break;case 2:switch(this.touches.TWO){case Bi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=pe.TOUCH_DOLLY_PAN;break;case Bi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=pe.TOUCH_DOLLY_ROTATE;break;default:this.state=pe.NONE}break;default:this.state=pe.NONE}this.state!==pe.NONE&&this.dispatchEvent(xa)}function X0(i){switch(this._trackPointer(i),this.state){case pe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case pe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case pe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case pe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=pe.NONE}}function Y0(i){this.enabled!==!1&&i.preventDefault()}function q0(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Z0(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class $0{constructor(){br(this,"members",[]);br(this,"busy",!1)}add(t){this.members.push(t);const e=()=>this.from(t);return t.controls.addEventListener("change",e),()=>{t.controls.removeEventListener("change",e),this.members=this.members.filter(n=>n!==t)}}from(t){if(!this.busy){this.busy=!0;for(const e of this.members)e!==t&&(e.camera.position.copy(t.camera.position),e.controls.target.copy(t.controls.target),e.controls.update());this.busy=!1}}}function j0(i,t,e){const n=new jm({antialias:!!t.antialias,powerPreference:"high-performance",logarithmicDepthBuffer:!!t.logDepth,stencil:t.stencil??!0});n.outputColorSpace=Fe;const s=n.domElement;s.className="viewer-canvas",i.body.appendChild(s);const r=new vl;r.background=new Qt(t.background??724500);const o=new Je(t.fov??45,1,t.near??.1,t.far??200);o.position.set(...t.cam??[6,4,8]);const a=new F0(o,s);a.target.set(...t.target??[0,0,0]),a.update();let c=i.shared.get("camSync");c||(c=new $0,i.shared.set("camSync",c));const l=c.add({camera:o,controls:a}),u=e({scene:r,camera:o,renderer:n,controls:a});let p=0,m=0,h=0;const f=()=>{var M;const I=i.body.getBoundingClientRect(),C=Math.max(1,Math.floor(I.width)),P=Math.max(1,Math.floor(I.height)),D=t.pixelScale?t.pixelScale():1,y=Math.min(window.devicePixelRatio||1,2)/D;C===p&&P===m&&y===h||(p=C,m=P,h=y,n.setPixelRatio(h),n.setSize(p,m,!1),o.aspect=p/m,o.updateProjectionMatrix(),s.style.imageRendering=D>1?"pixelated":"auto",(M=u.resize)==null||M.call(u,p,m,h))};let _=!0;const g=new IntersectionObserver(I=>{var C;_=((C=I[0])==null?void 0:C.isIntersecting)??!0});g.observe(i.body);let d=0,A=performance.now(),E=0;const v=I=>{var P;if(d<0)return;d=requestAnimationFrame(v);const C=Math.min(.05,(I-A)/1e3);A=I,!(!_||document.hidden)&&(E+=C,f(),(P=u.update)==null||P.call(u,C,E,I),u.render?u.render():n.render(r,o))};return f(),d=requestAnimationFrame(v),{dispose(){var I;cancelAnimationFrame(d),d=-1,g.disconnect(),l(),(I=u.dispose)==null||I.call(u),a.dispose(),r.traverse(C=>{var y,M,L;const P=C;(M=(y=P.geometry)==null?void 0:y.dispose)==null||M.call(y);const D=P.material;Array.isArray(D)?D.forEach(X=>X.dispose()):(L=D==null?void 0:D.dispose)==null||L.call(D)}),n.dispose(),n.forceContextLoss(),s.remove()}}}const fs=new b;function en(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;fs.copy(t),fs[n]=0,fs.normalize();const l=.5*o/(o+a),u=1-fs.angleTo(i)/c;return Math.sign(fs[e])===1?u*l:a/(o+a)+l+l*(1-u)}class kt extends Gt{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new b,c=new b,l=new b(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,p=this.attributes.normal.array,m=this.attributes.uv.array,h=u.length/6,f=new b,_=.5/s;for(let g=0,d=0;g<u.length;g+=3,d+=2)switch(a.fromArray(u,g),c.copy(a),c.x-=Math.sign(c.x)*_,c.y-=Math.sign(c.y)*_,c.z-=Math.sign(c.z)*_,c.normalize(),u[g+0]=l.x*Math.sign(a.x)+c.x*r,u[g+1]=l.y*Math.sign(a.y)+c.y*r,u[g+2]=l.z*Math.sign(a.z)+c.z*r,p[g+0]=c.x,p[g+1]=c.y,p[g+2]=c.z,Math.floor(g/h)){case 0:f.set(1,0,0),m[d+0]=en(f,c,"z","y",r,n),m[d+1]=1-en(f,c,"y","z",r,e);break;case 1:f.set(-1,0,0),m[d+0]=1-en(f,c,"z","y",r,n),m[d+1]=1-en(f,c,"y","z",r,e);break;case 2:f.set(0,1,0),m[d+0]=1-en(f,c,"x","z",r,t),m[d+1]=en(f,c,"z","x",r,n);break;case 3:f.set(0,-1,0),m[d+0]=1-en(f,c,"x","z",r,t),m[d+1]=1-en(f,c,"z","x",r,n);break;case 4:f.set(0,0,1),m[d+0]=1-en(f,c,"x","y",r,t),m[d+1]=1-en(f,c,"y","x",r,e);break;case 5:f.set(0,0,-1),m[d+0]=en(f,c,"x","y",r,t),m[d+1]=1-en(f,c,"y","x",r,e);break}}}const We={length:4.66,width:1.865,height:1.665,frontAxle:1.41,rearAxle:-1.345,wheelR:.37,track:1.6};function K0(){var ba,Ta;const i=new ae,t=new Map,e=[],n=[],s=new Set;let r=12567494;const o=()=>{const R=new us({color:r,metalness:.55,roughness:.32,clearcoat:1,clearcoatRoughness:.06});return n.push(R),e.push(R),R},a=(R=1382428,V=.55,nt=!0)=>{const Ut=new Pn({color:R,roughness:V,metalness:.1});return nt&&e.push(Ut),Ut},c=(R=791065)=>{const V=new us({color:R,metalness:0,roughness:.12,clearcoat:.3,envMapIntensity:.28,transparent:!0,opacity:.96});return e.push(V),V},l=(R,V=.6,nt=.1,Ut={})=>new Pn({color:R,roughness:V,metalness:nt,...Ut}),u=(R,V=1.6)=>new Pn({color:R,emissive:R,emissiveIntensity:V,roughness:.3}),p=(R,V,nt=!1)=>{let Ut=t.get(R);return Ut||t.set(R,Ut={id:R,meshes:[],anchors:[],root:[]}),Ut.root.push(V),V.traverse(ie=>{const ee=ie;ee.isMesh&&(ee.userData.part=R,Ut.meshes.push(ee),nt&&s.add(ee))}),V},m=[],h=(R,V,nt,Ut=!1,ie)=>(R.add(nt),V&&(p(V,nt,Ut),m.push({id:V,obj:nt,offset:ie})),nt),f=(R,V,nt=0,Ut=0,ie=0)=>{const ee=new ue(R,V);return ee.position.set(nt,Ut,ie),ee.castShadow=!1,ee},_=(R,V,nt,Ut,ie=.03,ee)=>{const be=new bl;R(be);const ge=new ga(be,{depth:Math.max(.001,V-ie*2),bevelEnabled:ie>0,bevelThickness:ie,bevelSize:ie,bevelSegments:3,curveSegments:20});if(ge.translate(0,0,nt-(V-ie*2)/2),ee){const ye=ge.attributes.position;for(let He=0;He<ye.count;He++)ye.setZ(He,ye.getZ(He)*ee(ye.getY(He)))}return ge.computeVertexNormals(),new ue(ge,Ut)},g=We.width/2,d=.43,A=We.frontAxle,E=We.rearAxle,v=We.wheelR,I=.24,C=Math.asin((I-v)/d),P=R=>Math.max(.93,1-.055*((R-.72)/.48)**2),D=R=>1-.19*Math.min(1,Math.max(0,(R-.99)/.6)),y=.9125,M=.81,L=(R,V)=>nt=>{const Ut=(ge,ye)=>{const He=R[Math.max(0,ge-1)],En=R[Math.min(R.length-1,ge+1)],zn=En[0]-He[0],os=En[1]-He[1],wa=Math.hypot(zn,os)||1;return[R[ge][0]-os/wa*V*ye,R[ge][1]+zn/wa*V*ye]},ie=R.map((ge,ye)=>Ut(ye,1)),ee=R.map((ge,ye)=>Ut(ye,-1)).reverse(),be=[...ie,...ee];nt.moveTo(be[0][0],be[0][1]);for(let ge=1;ge<be.length;ge++)nt.lineTo(be[ge][0],be[ge][1])},X=R=>V=>{V.moveTo(R[0][0],R[0][1]);for(let nt=1;nt<R.length;nt++)V.lineTo(R[nt][0],R[nt][1])},k=(R,V)=>{const nt=new Be().setFromPoints([R[0],R[1],R[2],R[0],R[2],R[3]]);return nt.computeVertexNormals(),new ue(nt,V)},G=R=>{R.moveTo(.78,I),R.lineTo(E+d*Math.cos(C),I),R.absarc(E,v,d,C,Math.PI-C,!1),R.lineTo(-2.2,I),R.quadraticCurveTo(-2.32,.27,-2.33,.45),R.lineTo(-2.32,.98),R.quadraticCurveTo(-2.3,1.07,-2.18,1.08),R.lineTo(-1.2,1.06),R.lineTo(.78,1)},K=_(G,We.width-.04,0,o(),.07,P);h(i,null,K,!0),s.add(K);const W=new ae;W.visible=!1,i.add(W);const st=o();for(const R of[1,-1])W.add(_(G,.1,R*(y-.05),st,.02,P));W.add(f(new Gt(.8,.04,1.7),l(1382170,.9,0),-1.85,.62,0)),W.add(f(new Gt(.06,.8,1.7),st,-2.29,.66,0));for(const R of[1,-1]){const V=_(nt=>{nt.moveTo(.78,I),nt.lineTo(A-d*Math.cos(C),I),nt.absarc(A,v,d,Math.PI-C,C,!0),nt.lineTo(2.16,.27),nt.quadraticCurveTo(2.22,.5,2.21,.86),nt.quadraticCurveTo(2.15,.93,2,.94),nt.lineTo(.78,.99)},.17,R*(g-.1),o(),.025,P);h(i,null,V,!0),s.add(V)}const Y=a(1711135,.85);for(const R of[A,E])for(const V of[1,-1]){const nt=_(Ut=>{const ie=C-.02,ee=Math.PI-C+.02;Ut.absarc(R,v,d+.075,ie,ee,!1),Ut.absarc(R,v,d-.005,ee,ie,!0)},.05,V*(y*P(.55)+.012),Y,.012);h(i,null,nt,!0),s.add(nt)}for(const R of[1,-1]){const V=f(new kt(1.84,.13,.05,2,.02),Y,-.04,I+.06,R*(y*P(.3)+.012));h(i,null,V,!0),s.add(V);const nt=f(new Gt(1.2,.02,.01),l(12963028,.2,.95),-.05,I+.08,R*(y*P(.3)+.04));h(i,null,nt,!0)}const ut=f(new kt(.26,.62,We.width-.06,4,.08),o(),2.2,.56,0);h(i,"bumper-f",ut,!0),h(i,"bumper-f",f(new kt(.1,.1,We.width-.1,2,.03),Y,2.26,.27,0),!0),h(i,"bumper-f",f(new kt(.04,.045,.9,2,.015),a(11186875,.3),2.32,.27,0),!0);const mt=document.createElement("canvas");mt.width=256,mt.height=64;{const R=mt.getContext("2d");R.fillStyle="#050607",R.fillRect(0,0,256,64),R.strokeStyle="#3a4048",R.lineWidth=2;for(let V=-64;V<320;V+=12)R.beginPath(),R.moveTo(V,0),R.lineTo(V+32,64),R.moveTo(V+32,0),R.lineTo(V,64),R.stroke()}const Et=new hr(mt);Et.colorSpace=Fe,Et.wrapS=Et.wrapT=ur,Et.repeat.set(3,1);const zt=new us({color:16777215,map:Et,roughness:.3,metalness:.3,clearcoat:1});e.push(zt);const te=f(new kt(.05,.27,1.62,3,.02),zt,2.335,.735,0);h(i,"grille",te,!0),h(i,"bumper-f",f(new kt(.08,.15,1.36,2,.03),zt,2.3,.37,0),!0);const j=f(new Gt(.02,.05,.26),l(14147044,.2,.9));for(const R of[1,-1]){const V=[new b(2.385,.872,R*.5),new b(2.38,.875,R*.74),new b(2.35,.865,R*.86),new b(2.335,.78,R*.875),new b(2.34,.63,R*.86)];h(i,"headlamp",f(new qn(new ci(V),40,.013,6,!1),u(15398655,3))),h(i,"headlamp",f(new kt(.03,.24,.07,2,.015),l(1382686,.15,.8),2.365,.72,R*.79));for(let nt=0;nt<4;nt++)h(i,"headlamp",f(new kt(.02,.035,.04,2,.008),u(15923199,1.1),2.38,.645+nt*.05,R*.79));h(i,"headlamp",f(new kt(.03,.13,.04,2,.012),l(1053205,.3,.5),2.335,.38,R*.8));for(let nt=0;nt<3;nt++)h(i,"headlamp",f(new mr(.012,8,6),u(16777215,1.2),2.352,.34+nt*.04,R*.8))}h(i,"grille",f(new Gt(.01,.01,1),l(14015458,.15,1),2.385,.872,0),!0),h(i,"bumper-f",f(new kt(.012,.11,.52,2,.008),l(16053750,.5),2.34,.52,0),!0),h(i,"bumper-f",f(new kt(.03,.022,1.5,2,.008),l(13686493,.2,.95),2.33,.235,0),!0);const rt=l(1711393,.9,.05);h(i,null,f(new Gt(1.4,.04,1.56),rt,1.48,.34,0)),h(i,null,f(new Gt(.06,.62,1.6),rt,.8,.68,0));for(const R of[1,-1])h(i,null,f(new Gt(1.36,.5,.03),rt,1.48,.62,R*.765));const vt=f(new Gt(.2,.04,1.62),a(1053205,.85),.74,1,0);h(i,null,vt,!0),s.add(vt);const at=new ae;at.position.set(.82,1,0),i.add(at);const Rt=1.46,Nt=new Gt(Rt,.035,We.width-.08,16,1,10);Nt.translate(Rt/2,0,0);{const R=Nt.attributes.position;for(let V=0;V<R.count;V++){const nt=R.getX(V)/Rt,Ut=R.getZ(V)/g;R.setY(V,R.getY(V)-nt*nt*.075-Ut*Ut*Ut*Ut*.05+(1-Ut*Ut)*.012)}Nt.computeVertexNormals()}const Ot=f(Nt,o(),0,0,0);h(at,"hood",Ot,!0,new b(0,.05,0));const Yt=f(new Gt(Rt-.2,.012,1.4),l(2764081,1,0),Rt/2+.05,-.04,0);h(at,"hood",Yt),j.position.set(Rt-.02,-.05,0),at.add(j);const J=new us({color:329223,roughness:.35,metalness:.2,clearcoat:.5,envMapIntensity:.35});e.push(J);const O=[[.8,.98],[-.1,1.51],[-.55,1.555],[-1,1.56],[-1.5,1.53],[-2.17,1.1],[-2.2,.98]],w=_(R=>{R.moveTo(O[0][0],O[0][1]),R.lineTo(O[1][0],O[1][1]),R.quadraticCurveTo(-.3,1.55,O[2][0],O[2][1]);for(let V=3;V<O.length;V++)R.lineTo(O[V][0],O[V][1])},1.62,0,J,.06,D);h(i,"cabin",w,!0);const pt=c(1054752),Q=[[[.7,1.04],[-.06,1.49],[-.4,1.515],[-.4,1.04]],[[-.46,1.04],[-.46,1.515],[-1.12,1.51],[-1.12,1.06]],[[-1.18,1.065],[-1.18,1.5],[-1.4,1.495],[-1.84,1.1]]];for(const R of[1,-1])for(const V of Q)h(i,"cabin",_(X(V),.02,R*(M+.004),pt,.004,D),!0);const ft=l(13226200,.18,1,{envMapIntensity:1.2});for(const R of[1,-1])h(i,null,_(L([[.72,1.03],[-.06,1.515],[-.5,1.545],[-1,1.548],[-1.44,1.522]],.011),.02,R*(M+.012),ft,.004,D)),h(i,null,_(X([[-1.44,1.535],[-1.5,1.528],[-2.1,1.075],[-1.98,1.06],[-1.43,1.48]]),.02,R*(M+.012),ft,.006,D));const ct=o(),Dt=_(L([[-.12,1.57],[-.55,1.615],[-1,1.62],[-1.5,1.588]],.012),1.26,0,ct,.02);Dt.visible=!1,h(i,null,Dt,!0),s.add(Dt);for(const R of[1,-1]){const V=_(L([[-.22,1.625],[-.6,1.665],[-1.1,1.668],[-1.5,1.64]],.016),.04,R*.58,l(2303788,.35,.6),.01);h(i,"roof-rail",V);for(const[nt,Ut]of[[-.25,1.6],[-1.47,1.6]])h(i,"roof-rail",f(new Gt(.1,.06,.05),a(1448221),nt,Ut,R*.58))}const xt=new ue(new ma(.05,.16,4),a(987412,.3));xt.scale.set(1.8,.45,.6),xt.rotation.z=Math.PI/2,xt.position.set(-1.38,1.63,0),h(i,"antenna",xt);const T=(R,V,nt,Ut)=>{const ie=V[0]-R[0],ee=V[1]-R[1],be=Math.hypot(ie,ee);let ge=-ee/be,ye=ie/be;ye<0&&(ge=-ge,ye=-ye);const He=M*D(R[1])-nt,En=M*D(V[1])-nt,zn=new b(R[0]+ge*Ut,R[1]+ye*Ut,0),os=new b(V[0]+ge*Ut,V[1]+ye*Ut,0);return[zn.clone().setZ(He),os.clone().setZ(En),os.clone().setZ(-En),zn.clone().setZ(-He)]},x=c(659478);x.side=sn,h(i,"windshield",k(T([.8,.98],[-.1,1.51],.07,.064),x),!0);for(const[R,V]of[[.3,.62],[-.38,.55]]){const nt=f(new Gt(.03,.02,V),a(526602,.6,!1),.74,1.05,R);nt.rotation.y=.12,h(i,"wiper",nt)}const B=[[.74,.32],[-.37,.32],[-.37,.99],[.74,.99],[.78,.7]],q=[[-.41,.32],[-.86,.32],[-.93,.6],[-1.22,.86],[-1.22,1],[-.41,.99]];for(const R of[1,-1]){const V=R*(y+.012);h(i,"door-f",_(X(B),.026,V,o(),.01,P),!0,new b(0,0,R*.05)),h(i,"door-r",_(X(q),.026,V,o(),.01,P),!0,new b(0,0,R*.05));const nt=R*(y*P(.9)+.035);h(i,"door-f",f(new kt(.17,.035,.03,2,.012),ft,0,.9,nt)),h(i,"door-r",f(new kt(.17,.035,.03,2,.012),ft,-.98,.9,nt));const Ut=new ae;Ut.position.set(.6,1.08,R*.96),Ut.add(f(new kt(.2,.13,.2,3,.04),o(),0,0,R*.05)),Ut.add(f(new Gt(.01,.1,.16),l(10466502,.05,1),-.1,0,R*.05)),Ut.add(f(new Gt(.08,.04,.08),a(1053205),.02,-.06,-R*.05)),Ut.add(f(new Gt(.03,.015,.16),u(16753434,1.2),.08,-.02,R*.06)),h(i,"mirror",Ut,!0)}const et=y*P(.86)+.012,$=f(new jt(.085,.085,.012,24),o(),-1.62,.86,et);$.rotation.x=Math.PI/2,h(i,"fuel-door",$,!0,new b(0,.04,0));const Tt=f(new jt(.02,.02,.02,12),l(3108832,.4),-1.6,.86,et+.008);Tt.rotation.x=Math.PI/2,Tt.visible=!1,h(i,"fuel-door",Tt);const dt=f(new kt(.05,.46,1.56,2,.02),o(),-2.34,.84,0);h(i,"tailgate",dt,!0);const Mt=c(659478);Mt.side=sn,h(i,"tailgate",k(T([-2.17,1.1],[-1.5,1.53],.11,.064),Mt),!0);const Wt=f(new Gt(.02,.02,.4),a(526602,.6,!1),-2.12,1.2,.1);Wt.rotation.z=Math.atan2(.43,.67),h(i,"wiper",Wt);const it=_(L([[-1.42,1.6],[-1.68,1.59],[-1.8,1.55]],.025),1.3,0,J,.015);h(i,"tailgate",it,!0);const bt=u(16719146,1.5);h(i,"taillamp",f(new kt(.03,.05,.84,2,.012),J,-2.37,1.04,0));for(const R of[1,-1]){h(i,"taillamp",f(new kt(.04,.04,.42,2,.012),bt,-2.355,1.045,R*.63));const V=new ci([new b(-2.35,1.045,R*.83),new b(-2.33,.96,R*.85),new b(-2.33,.86,R*.82)]);h(i,"taillamp",f(new qn(V,16,.02,6),bt))}const Ft=f(new kt(.2,.4,We.width-.06,4,.07),o(),-2.25,.46,0);h(i,"bumper-r",Ft,!0),h(i,"bumper-r",f(new kt(.08,.15,We.width-.1,2,.03),Y,-2.32,.31,0),!0),h(i,"bumper-r",f(new kt(.03,.04,.9,2,.012),a(11186875,.3),-2.365,.3,0),!0),h(i,"tailgate",f(new Gt(.01,.11,.52),l(15921906,.6),-2.37,.72,0),!0);const Ht=l(1118740,.9,0),wt=l(3093561,.3,.85),Kt=l(7304572,.45,.8),qt=l(3159355,.5,.4),de=[[.24,-.11],[.33,-.12],[.36,-.105],[.372,-.07],[.374,0],[.372,.07],[.36,.105],[.33,.12],[.24,.11]].map(([R,V])=>new ot(R,V)),U=new fa(de,48);U.rotateX(Math.PI/2);for(const[R,V]of[[A,1],[A,-1],[E,1],[E,-1]]){const nt=new ae;nt.position.set(R,v,V*(We.track/2));const Ut=f(U,Ht);h(nt,"tire",Ut,!1,new b(0,.25,V*.12));const ie=f(new jt(.235,.235,.2,40,1,!0),wt);ie.rotation.x=Math.PI/2,h(nt,"tire",ie);const ee=f(new jt(.05,.05,.03,16),l(1711392,.4,.6),0,0,V*.09);ee.rotation.x=Math.PI/2,h(nt,"tire",ee);for(let He=0;He<5;He++){const En=He/5*Math.PI*2,zn=f(new Gt(.19,.045,.025),wt,Math.cos(En)*.13,Math.sin(En)*.13,V*.085);zn.rotation.z=En,h(nt,"tire",zn)}const be=f(new jt(.175,.175,.025,32),Kt,0,0,V*.02);be.rotation.x=Math.PI/2,h(nt,"brake",be,!1,new b(0,0,V*.1));const ge=f(new kt(.1,.16,.07,2,.02),qt,R>0?-.15:.15,.05,V*.02);h(nt,"brake",ge),i.add(nt);const ye=f(new jt(d-.01,d-.01,.3,24,1,!0,-Math.PI/2-1.3,2.6),l(723982,1,0,{side:Oe}),R,v,V*(We.track/2-.02));ye.rotation.x=Math.PI/2,i.add(ye)}const lt=new ae;i.add(lt);const Z=R=>l(R,.65,.05),tt=R=>new us({color:R,roughness:.3,transmission:0,transparent:!0,opacity:.55}),gt=new ae;gt.position.set(1.5,.64,.02),gt.add(f(new kt(.5,.46,.8,3,.05),l(4935767,.5,.6)));const yt=f(new kt(.44,.06,.66,3,.025),l(1842979,.45,.2),0,.25,-.02);gt.add(yt),gt.add(f(new Gt(.2,.004,.3),l(9213085,.3,.8),-.02,.284,-.05)),h(lt,"engine",gt,!1,new b(0,.3,0));const Xt=f(new jt(.045,.045,.035,20),l(921361,.5,.1),1.6,.93,.24);h(lt,"oil-cap",Xt,!1,new b(0,.03,0)),h(lt,"oil-cap",f(new jt(.02,.02,.006,12),l(15909424,.4),1.6,.951,.24));const _e=f(new Hi(.035,.012,8,20),l(16756736,.4),1.79,.92,-.2);_e.rotation.y=Math.PI/2,h(lt,"dipstick",_e,!1,new b(0,.04,0)),h(lt,"dipstick",f(new jt(.008,.008,.25,6),l(16756736,.4),1.79,.78,-.2));const Me=new ae;Me.position.set(1.16,.62,-.22);const ce=f(new Hi(.07,.045,10,20),l(9080726,.35,.85));Me.add(ce),Me.add(f(new jt(.05,.06,.1,16),l(10133671,.3,.85),0,0,.08).rotateX(Math.PI/2)),h(lt,"turbo",Me,!1,new b(0,.12,0));const Pe=new ae;Pe.position.set(2.06,.62,0),Pe.add(f(new Gt(.05,.46,1.34),l(2830132,.6,.6)));for(let R=0;R<9;R++)Pe.add(f(new Gt(.052,.01,1.3),l(6252142,.4,.7),0,-.2+R*.05,0));const Qe=f(new jt(.19,.19,.05,24),l(1184790,.7,.1),-.06,0,-.25);Qe.rotation.z=Math.PI/2,Pe.add(Qe),h(lt,"radiator",Pe,!1,new b(0,.28,0));const Nn=new ae;Nn.position.set(1.77,.6,.57),Nn.add(f(new kt(.27,.2,.18,2,.015),l(1382170,.55,.05))),Nn.add(f(new Gt(.06,.03,.05),l(14035498,.5),.07,.11,.04)),Nn.add(f(new jt(.015,.015,.03,10),l(2763306,.5,.5),-.08,.11,.04)),h(lt,"battery",Nn,!1,new b(0,.14,0));const Ps=f(new kt(.24,.13,.15,2,.02),Z(1447963),1.06,.8,.62);h(lt,"fusebox",Ps,!1,new b(0,.08,0));const Ze=new ae;Ze.position.set(.94,.86,.38),Ze.add(f(new kt(.1,.1,.12,2,.02),tt(15921894))),Ze.add(f(new Gt(.085,.06,.105),l(14267466,.3),0,-.015,0)),Ze.add(f(new jt(.03,.03,.025,14),l(15258186,.5),0,.06,0)),h(lt,"brake-fluid",Ze,!1,new b(0,.08,0));const Mn=new ae;Mn.position.set(1.86,.78,-.56),Mn.add(f(new kt(.14,.17,.14,2,.02),tt(15921906))),Mn.add(f(new Gt(.125,.1,.125),l(16736162,.4),0,-.03,0)),Mn.add(f(new jt(.035,.035,.03,14),l(2237480,.5),0,.1,0)),h(lt,"coolant",Mn,!1,new b(0,.12,0));const Qn=new ae;Qn.position.set(2,.8,.38),Qn.add(f(new jt(.02,.02,.12,10),Z(2764081),0,-.06,0)),Qn.add(f(new jt(.035,.035,.03,16),l(2981375,.4),0,.01,0)),h(lt,"washer",Qn,!1,new b(0,.06,0));const Fn=new ae;Fn.position.set(1.55,.74,-.54),Fn.add(f(new kt(.42,.2,.3,3,.04),Z(1513756)));for(const R of[-.17,.17])Fn.add(f(new Gt(.03,.05,.02),Z(2895926),R,.05,.155));const xi=f(new qn(new ci([new b(-.2,0,.05),new b(-.32,-.02,.2),new b(-.3,-.06,.34)]),16,.045,10),Z(1184533));Fn.add(xi),h(lt,"airbox",Fn,!1,new b(0,.14,0));for(const R of[1,-1]){const V=new ae;V.position.set(A,.86,R*.67),V.add(f(new jt(.085,.1,.06,20),l(3159098,.6,.3))),V.add(f(new jt(.025,.025,.04,10),l(9080983,.3,.8),0,.04,0)),h(lt,"strut-top",V,!1,new b(0,.07,0))}const ns=l(2764339,.4,.7),On=f(new jt(.008,.008,1,6),ns,2.02,.86,-.1);On.rotation.x=Math.PI/2,h(lt,"hood-stay",On,!1);const yn=f(new jt(.008,.008,1,6),ns);yn.visible=!1,h(lt,"hood-stay",yn,!1);const is=new b(2,.86,-.6),Mr=new b(1.06,-.05,-.6),Bn=new ae;lt.add(Bn);const Mi=new ae;Mi.position.set(1.48,.95,.44),Mi.add(f(new kt(.34,.11,.26,3,.02),l(11910340,.35,.85))),Mi.add(f(new Gt(.1,.004,.08),l(16763904,.5),.08,.057,.05)),h(Bn,"inverter",Mi,!1,new b(0,.08,0));const S=l(16742912,.45,.05);for(const R of[[new b(1.32,.95,.4),new b(1.2,.8,.35),new b(1.05,.5,.25),new b(.9,.3,.2),new b(-.2,.28,.25)],[new b(1.6,.9,.36),new b(1.62,.75,.33),new b(1.55,.6,.3)]])h(Bn,"inverter",f(new qn(new ci(R),30,.018,8),S));const N=new ae;N.position.set(1.96,.8,-.3),N.add(f(new kt(.11,.14,.11,2,.02),tt(15921906))),N.add(f(new Gt(.095,.08,.095),l(16736162,.4),0,-.025,0)),N.add(f(new jt(.03,.03,.025,14),l(3828991,.5),0,.08,0)),h(Bn,"hev-coolant",N,!1,new b(0,.1,0));const z=new ae;i.add(z);const H=l(8225932,.4,.8),F=f(new jt(.17,.2,.34,20),l(9278362,.45,.7),1.45,.52,.56);F.rotation.x=Math.PI/2,h(z,"transmission",F,!1,new b(0,.22,0));for(const R of[1,-1]){const nt=f(new jt(.025,.025,.62,10),H,A,v,R*.44);nt.rotation.x=Math.PI/2,h(z,"driveshaft",nt,!1);const Ut=f(new jt(.035,.06,.1,12),l(1118740,.8),A,v,R*.66);Ut.rotation.x=R*Math.PI/2,h(z,"driveshaft",Ut,!1)}const ht=l(3042262,.45,.4);for(const[R,V]of[[A,1],[A,-1],[E,1],[E,-1]]){const nt=new ae;nt.position.set(R,v+.08,V*(R>0?.67:.62));const Ut=[],ie=6,ee=R>0?.36:.26;for(let be=0;be<=ie*16;be++){const ge=be/16*Math.PI*2;Ut.push(new b(Math.cos(ge)*.065,be/(ie*16)*ee,Math.sin(ge)*.065))}nt.add(f(new qn(new ci(Ut),160,.011,6),ht)),nt.add(f(new jt(.025,.025,ee+.1,10),l(1711135,.4,.6),0,ee/2,0)),h(z,"suspension",nt,!1,new b(0,ee+.05,0))}const St=new ci([new b(1.24,.5,-.2),new b(1.05,.3,-.22),new b(.6,.2,-.22),new b(-.6,.2,-.24),new b(-1.6,.22,-.3),new b(-1.95,.27,-.35)]);h(z,"exhaust",f(new qn(St,60,.03,8),H),!1),h(z,"exhaust",f(new kt(.3,.12,.16,2,.04),l(10133928,.35,.8),.85,.22,-.22),!1,new b(0,.1,0));const Ct=f(new jt(.1,.1,.6,20),l(10133928,.35,.8),-2,.3,-.05);Ct.rotation.x=Math.PI/2,Ct.scale.set(1.3,1,.75),h(z,"exhaust",Ct,!1,new b(0,.12,0));const At=f(new kt(.55,.2,1,3,.06),l(2764081,.75,.05),-.95,.33,.05);h(z,"fuel-tank",At,!1,new b(0,.12,0));const Bt=new ae;Bt.position.set(-.38,.38,.05),Bt.add(f(new kt(.55,.2,1.1,3,.03),l(5988712,.4,.75))),Bt.add(f(new Gt(.2,.005,.25),l(16763904,.5),0,.103,.2)),h(Bn,"hv-battery",Bt,!1,new b(0,.14,0));const Vt=new ae;z.add(Vt);const Pt=f(new jt(.035,.035,2.45,12),H,0,.28,.1);Pt.rotation.z=Math.PI/2,h(Vt,"prop-shaft",Pt,!1,new b(.5,.06,0)),h(Vt,"prop-shaft",f(new mr(.12,16,12),l(9278362,.45,.7),E,v-.02,.05),!1);for(const R of[1,-1]){const V=f(new jt(.022,.022,.62,10),H,E,v,R*.42);V.rotation.x=Math.PI/2,h(Vt,"prop-shaft",V,!1)}const It=new ae;It.visible=!1,i.add(It);const Jt=l(2040358,.75,.05),re=l(1447963,.6,.1),Le=l(2830133,.7,.05);It.add(f(new Gt(2.7,.03,1.6),l(1052948,1,0),-.55,.36,0));const oe=f(new kt(.42,.26,1.62,3,.06),Le,.6,.86,0);It.add(oe),It.add(f(new kt(.06,.02,1.5,2,.008),l(8161174,.3,.8),.38,.93,0));const Lt=f(new Gt(.01,.008,1.4),u(5941503,1.2),.385,.9,0);It.add(Lt);const Ye=document.createElement("canvas");Ye.width=1024,Ye.height=192;{const R=Ye.getContext("2d");R.fillStyle="#05070a",R.fillRect(0,0,1024,192);const V=R.createLinearGradient(0,0,0,192);V.addColorStop(0,"#16324a"),V.addColorStop(1,"#0d1d2c"),R.fillStyle=V,R.fillRect(528,14,480,164),R.strokeStyle="#3b82f6",R.lineWidth=6,R.beginPath(),R.moveTo(572,160),R.bezierCurveTo(672,120,732,150,812,80),R.lineTo(952,40),R.stroke(),R.fillStyle="#e6ebf2",R.font="bold 26px sans-serif",R.fillText("300m ↱",552,50),R.fillStyle="#0b0e14",R.fillRect(16,14,480,164),R.strokeStyle="#9aa3ad",R.lineWidth=5;for(const nt of[128,388])R.beginPath(),R.arc(nt,100,68,Math.PI*.8,Math.PI*2.2),R.stroke();R.fillStyle="#ffffff",R.font="bold 54px sans-serif",R.textAlign="center",R.fillText("62",128,118),R.font="20px sans-serif",R.fillText("km/h",128,146),R.fillText("D",388,112),R.fillStyle="#4ade80",R.fillText("READY",258,170)}const ne=new hr(Ye);ne.colorSpace=Fe;const $e=new jt(1.6,1.6,.17,40,1,!0,-.24,.48),pn=f($e,new Pn({map:ne,emissive:16777215,emissiveMap:ne,emissiveIntensity:.9,side:sn,roughness:.2}));pn.position.set(.45-1.6,1.06,.3),pn.rotation.y=Math.PI/2,h(It,"int-display",pn,!1,new b(0,.08,0)),h(It,"int-display",f(new Gt(.03,.2,.86),re,.47,1.06,.3));const Re=document.createElement("canvas");Re.width=512,Re.height=64;{const R=Re.getContext("2d");R.fillStyle="#07090c",R.fillRect(0,0,512,64),R.fillStyle="#cfe3ff",R.font="22px sans-serif",R.textAlign="center",["❄ A/C","AUTO","22.5°","⟲ 내기","♨ 앞유리","22.5°"].forEach((V,nt)=>R.fillText(V,45+nt*84,40))}const Sn=new hr(Re);Sn.colorSpace=Fe;const le=new ae;le.position.set(.39,.82,-.02),le.add(f(new Gt(.012,.06,.5),new Pn({map:Sn,emissive:16777215,emissiveMap:Sn,emissiveIntensity:.7})));for(const R of[.29,-.29]){const V=f(new jt(.03,.03,.03,20),l(10134445,.3,.9),-.01,0,R);V.rotation.z=Math.PI/2,le.add(V)}h(It,"int-climate",le,!1,new b(0,.05,0));const ze=f(new ts(.16,.06),u(8384680,1.2));ze.position.set(.62,1.15,.4),ze.rotation.set(0,-Math.PI/2,0),ze.rotateX(-.6),h(It,"int-hud",ze,!1,new b(0,.05,0));const ke=new ae;ke.position.set(.22,.98,.38),ke.rotation.z=-.42;const Ie=f(new Hi(.18,.018,10,40),Jt);Ie.rotation.y=Math.PI/2,Ie.scale.set(1,.92,1),ke.add(Ie),ke.add(f(new kt(.04,.08,.14,2,.02),re)),ke.add(f(new Gt(.02,.02,.34),re,0,-.01,0)),ke.add(f(new Gt(.02,.15,.02),re,0,-.09,0));for(const R of[.11,-.11])ke.add(f(new Gt(.012,.03,.04),u(10273535,.4),-.012,0,R));const rn=f(new jt(.035,.045,.32,12),re,.12,-.06,0);rn.rotation.z=Math.PI/2,ke.add(rn),h(It,"int-wheel",ke,!1,new b(0,.22,0)),It.add(f(new kt(.95,.22,.26,3,.04),Le,-.05,.6,0));const on=f(new kt(.16,.012,.12,2,.01),l(723982,.4,.2),.36,.72,0);on.rotation.z=.15,h(It,"int-charger",on,!1,new b(0,.05,0)),h(It,"int-charger",f(new Gt(.012,.008,.03),l(9067775,.4),.42,.735,.05));const ti=new ae;ti.position.set(.17,.73,0),ti.add(f(new jt(.045,.05,.035,28),l(12173512,.25,.9))),ti.add(f(new jt(.033,.033,.004,28),u(10273535,.5),0,.019,0)),h(It,"int-shifter",ti,!1,new b(0,.05,0));const Ma=f(new jt(.02,.025,.12,12),Jt,.17,.77,0);Ma.visible=!1,h(It,"int-shifter",Ma);const Pl=f(new kt(.04,.012,.03,2,.006),re,.06,.715,.06);h(It,"int-epb",Pl,!1,new b(0,.04,0)),h(It,"int-epb",f(new kt(.035,.012,.03,2,.006),l(2767406,.5),.06,.715,-.06));for(const R of[.06,-.06])It.add(f(new jt(.035,.035,.01,18),l(328965,.8),-.08,.715,R));It.add(f(new kt(.34,.06,.24,2,.03),Jt,-.36,.74,0)),h(It,"int-seat-r",f(new Gt(.01,.05,.14),l(8161174,.3,.8),-.53,.64,0),!1);const Ll=(R,V,nt,Ut)=>{const ie=new ae;ie.position.set(R,0,V),ie.add(f(new kt(.5,.12,nt,3,.04),Jt,0,.56,0));const ee=f(new kt(.12,Ut,nt,3,.04),Jt,-.24,.56+Ut/2,0);return ee.rotation.z=.2,ie.add(ee),ie.add(f(new Gt(.36,.005,nt*.5),l(3356477,.9),.02,.623,0)),ie};for(const R of[.4,-.4]){const V=Ll(-.15,R,.5,.62);V.add(f(new kt(.1,.12,.26,2,.04),Jt,-.37,1.28,0)),h(It,"int-seat-f",V,!1,new b(0,.1,0))}const yi=new ae;yi.position.set(-1.05,0,0),yi.add(f(new kt(.5,.13,1.42,3,.04),Jt,0,.58,0));for(const[R,V]of[[.27,.86],[-.43,.54]]){const nt=f(new kt(.12,.6,V-.02,3,.04),Jt,-.25,.92,R);nt.rotation.z=.22,yi.add(nt)}for(const R of[.45,-.45])yi.add(f(new Gt(.02,.025,.06),l(16756736,.4),-.2,.66,R)),yi.add(f(new kt(.1,.11,.24,2,.04),Jt,-.37,1.27,R));h(It,"int-seat-r",yi,!1,new b(0,.1,0));const Dl=f(new kt(1,.012,.95,2,.006),c(1779507),-.72,1.635,0);h(i,"int-sunroof",Dl,!0,new b(0,.03,0));const Ls=f(new Hi(.2,.1,12,28),l(13225684,.4,.7),-1.85,.4,0);Ls.rotation.x=Math.PI/2,Ls.visible=!1,h(z,"lpg-tank",Ls,!1,new b(0,.1,0));const ss=[];for(const R of["cabin","windshield","roof-rail","antenna","int-sunroof"])for(const V of((ba=t.get(R))==null?void 0:ba.root)??[])ss.push(V);ss.push(Dt,it),i.traverse(R=>{const V=R;V.isMesh&&V.material===ft&&!V.userData.part&&ss.push(V)});for(const R of((Ta=t.get("tailgate"))==null?void 0:Ta.root)??[])R.material===Mt&&ss.push(R);i.updateMatrixWorld(!0);const ya=new Qi;for(const R of m){ya.setFromObject(R.obj);const V=ya.getCenter(new b);R.offset&&V.add(R.offset);const nt=R.obj.parent;nt.worldToLocal(V),t.get(R.id).anchors.push({parent:nt,local:V})}let Sa=!0,yr=!1,Sr=!1;const Er=new b,rs=new b,Ea={root:i,parts:t,hood:at,setHoodAngle(R){at.rotation.z=R,at.updateMatrixWorld(!0);const V=R>.35;yn.visible=V,On.visible=!V,V&&(rs.copy(Mr),at.localToWorld(rs),lt.worldToLocal(rs),Er.copy(rs).sub(is),yn.position.copy(is).add(rs).multiplyScalar(.5),yn.scale.set(1,Er.length(),1),yn.quaternion.setFromUnitVectors(new b(0,1,0),Er.normalize()))},setXray(R){Sr=R,yr&&(z.visible=R,Bt.visible=R);for(const V of e){const nt=V;nt._op===void 0&&(nt._op=V.opacity,nt._tr=V.transparent),V.transparent=R?!0:nt._tr,V.opacity=R?.1:nt._op,V.depthWrite=!R,V.needsUpdate=!0}},setPowertrain(R,V){Bn.visible=R==="hev",Vt.visible=V,Tt.visible=!1,Me.visible=R!=="lpi",Ls.visible=R==="lpi",At.visible=R!=="lpi",At.position.x=R==="hev"?-1:-.95,At.scale.set(R==="hev"?.8:1,1,1),gt.scale.set(R==="lpi"?1.06:1,1,R==="lpi"?1.04:1)},setPaint(R){r=R;for(const V of n)V.color.setHex(R)},setRoofBlack(R){Sa=R,Dt.visible=!R&&!yr},setInterior(R){yr=R,It.visible=R,K.visible=!R,W.visible=R,z.visible=!R||Sr,Bt.visible=!R||Sr;for(const V of ss)V.visible=!R;Dt.visible=!Sa&&!R},pickables(R){const V=[];for(const nt of t.values())for(const Ut of nt.meshes){if(R&&s.has(Ut))continue;let ie=!0;for(let ee=Ut;ee;ee=ee.parent)ee.visible||(ie=!1);ie&&V.push(Ut)}if(!R)for(const nt of s)nt.userData.part||V.push(nt);return V},isBody:R=>s.has(R)};return Ea.setHoodAngle(0),Ea}const ro={ext:"외관",int:"실내 (실내 보기)",bay:"엔진룸 (본네트 안)",under:"차체 하부 (투시 모드)"},J0=["정비소에 맡기기","눈으로 점검","쉬운 셀프 정비","누구나 쉬움"],nn={hood:{name:"본네트 (후드)",en:"Hood",group:"ext",diy:3,what:"엔진룸을 덮는 철판 뚜껑. 클릭하면 열립니다. 정비 상식의 절반은 이 안에 있어요.",check:['여는 법 ① 운전석 왼쪽 무릎 아래의 본네트 레버를 당긴다 → "턱" 하고 살짝 뜬다.',"여는 법 ② 본네트 앞쪽 틈에 손을 넣어 2차 잠금 레버를 밀면서 들어 올린다.","여는 법 ③ 엔진룸의 후드 지지대(막대)를 세워 본네트 안쪽 홈에 끼운다.",'닫을 때는 30cm쯤 높이에서 손을 놓아 자기 무게로 "탁" 닫히게. 손으로 꾹 누르면 찌그러질 수 있다.'],cycle:"한 달에 한 번, 주유할 때 열어서 액체류 레벨 확인 습관 들이기"},grille:{name:"라디에이터 그릴",en:"Radiator Grille",group:"ext",diy:1,what:"앞쪽의 넓은 검은 그물. 주행풍을 엔진룸의 라디에이터·인터쿨러로 들여보내 열을 식힌다. 스포티지는 헤드램프까지 이어진 대형 그릴이 특징.",check:["비닐봉지·낙엽이 끼면 냉각 성능이 떨어진다 — 세차할 때 같이 확인.","그릴 아래쪽 가운데에는 전방 레이더(스마트 크루즈·충돌방지용)가 숨어 있어 이 부분은 깨끗하게, 스티커 금지."]},headlamp:{name:"헤드램프 · 주간주행등",en:"Headlamp & DRL",group:"ext",diy:0,what:"부메랑 모양 LED가 주간주행등(DRL), 그 안쪽 프로젝터가 전조등. LED는 수명이 길지만 고장 나면 램프 통째로 교체하는 경우가 많다.",check:["오토(AUTO) 위치에 두면 어두워질 때 자동 점등.","하이빔 보조(HBA)는 앞차·마주 오는 차를 카메라로 보고 상향등을 알아서 끄고 켠다.","램프 안에 물방울이 계속 맺혀 있으면 실링 불량 — 보증 수리 대상인지 확인."]},"bumper-f":{name:"앞 범퍼",en:"Front Bumper",group:"ext",diy:1,what:"플라스틱 겉껍데기 안에 충격을 흡수하는 폼과 철제 빔이 들어 있다. 주차 센서(동그란 점)도 여기에.",check:["범퍼 오른쪽 아래쯤 작은 덮개(캡)를 떼면 견인고리를 돌려 끼우는 구멍이 있다(견인고리는 트렁크 바닥 공구함).",'겨울철 눈·흙이 센서를 덮으면 "센서 오류" 경고가 뜰 수 있다 — 닦으면 해결.']},windshield:{name:"앞 유리",en:"Windshield",group:"ext",diy:1,what:"두 장의 유리 사이에 필름을 넣은 접합유리라 깨져도 흩어지지 않는다. 룸미러 뒤에 차로 유지·충돌방지용 전방 카메라가 붙어 있다.",check:["돌빵(작은 칩)은 커지기 전에 유리 복원(리페어)하면 저렴.","유리를 교체하면 전방 카메라 보정(캘리브레이션)을 꼭 해야 한다.","김서림: 에어컨(A/C) ON + 외기 유입이 가장 빠르다."]},wiper:{name:"와이퍼",en:"Wipers",group:"ext",diy:3,what:'고무 블레이드가 유리를 닦는다. 고무는 햇빛·열에 굳어서 시간이 지나면 줄무늬와 "드드득" 소리가 난다.',check:["줄무늬가 남거나 떨리면 교체 시기. 운전석/조수석 길이가 다르니 규격 확인.","교체는 암을 세우고 클립을 눌러 빼면 끝 — 5분이면 셀프 교체 가능.",'세울 때 암이 유리로 "탁" 떨어지면 유리가 깨질 수 있으니 손으로 잡고.'],cycle:"6개월 ~ 1년"},mirror:{name:"사이드 미러",en:"Side Mirror",group:"ext",diy:1,what:"전동 접이식 거울. 거울 모서리의 주황 아이콘이 후측방 경고(옆 차선 사각지대에 차가 있음). 아래에 서라운드 뷰 카메라가 달린 트림도 있다.",check:["깜빡이를 켰는데 미러 경고등이 깜빡이면 옆 차선에 차가 있다는 뜻.","후측방 모니터(BVM): 깜빡이를 켜면 계기판에 옆 사각지대 영상이 뜬다(옵션)."]},"door-f":{name:"앞문",en:"Front Door",group:"ext",diy:1,what:"문 안에는 측면 충돌 보강 빔, 창문 모터, 스피커가 들어 있다. 문 아래쪽 작은 구멍은 빗물이 빠지는 배수구.",check:["문 아래 배수구가 막히면 문 안에 물이 고여 녹이 생긴다.","고무 몰딩(웨더스트립)이 찢어지면 바람 소리·누수의 원인."]},"door-r":{name:"뒷문 · 차일드 락",en:"Rear Door & Child Lock",group:"ext",diy:3,what:"아이를 태울 문. 차일드 락을 걸면 안에서는 문이 열리지 않고 밖에서만 열린다.",check:["전자식 차일드락(2027년형 노블레스부터 기본): 운전석 도어의 차일드락 버튼으로 뒷문 잠금.","기계식(하위 트림): 뒷문 옆면(문 열면 보이는 모서리)의 작은 레버를 LOCK 쪽으로.","안전 하차 보조(노블레스부터): 뒤에서 차·자전거가 오면 경고하고 뒷문 잠금을 유지 — 아이가 갑자기 문 여는 사고를 막는다."],warn:"카시트에 앉은 아이가 문 손잡이에 손이 닿기 시작하면 차일드 락은 필수!"},tire:{name:"타이어 · 휠",en:"Tire & Wheel",group:"ext",diy:2,what:"차와 땅이 닿는 유일한 부분, 바퀴 하나당 손바닥 2개 정도 넓이. 스포티지는 트림에 따라 17~19인치 (예: 235/60R18).",check:["공기압: 운전석 문을 열면 B필러에 붙은 스티커가 기준값(보통 30psi대 중반). 계기판 TPMS로 확인 가능.","홈 깊이: 새 타이어 약 8mm, 법적 한계 1.6mm. 빗길 안전을 생각하면 3mm쯤에서 교체 고려.","타이어 옆면의 4자리 숫자(예: 2324 = 2024년 23주차)가 제조일. 6년 넘으면 고무가 굳는다."],cycle:"공기압 월 1회 · 위치 교환 약 1만 km · 교체 4~6만 km(운전 습관에 따라)"},brake:{name:"브레이크 디스크 · 캘리퍼",en:"Brake Disc & Caliper",group:"ext",diy:1,what:"휠 안쪽의 쇠 원판(디스크)을 캘리퍼 속 패드가 양쪽에서 집어 멈춘다. 휠 사이로 들여다보면 보인다.",check:['"끼익" 쇳소리가 나면 패드 마모 경고음일 수 있다 → 바로 점검.',"휠이 유난히 시커멓게 더러워지는 쪽은 패드 분진이 많은 것(정상 범위일 수 있음).","비 온 뒤 디스크에 생기는 얇은 녹은 몇 번 제동하면 사라지는 정상 현상."],cycle:"패드 점검 약 1만 km마다(정비소 방문 때 같이)"},"fuel-door":{name:"주유구",en:"Fuel Door",group:"ext",diy:3,what:"연료를 넣는 곳. 가솔린·하이브리드는 휘발유, LPi는 LPG 충전구가 있다. (이 3D 모델에서 위치는 예시)",check:["계기판 연료 게이지의 주유기 아이콘 옆 작은 화살표(◀/▶)가 주유구 방향! 렌터카에서도 통하는 꿀팁.",'주유 캡은 "딸깍" 소리가 날 때까지 닫기 — 덜 닫히면 엔진 경고등이 켜질 수 있다.',"인카페이먼트(기본): 지원 주유소에서는 차 화면으로 결제할 수 있다."]},tailgate:{name:"테일게이트 (트렁크)",en:"Power Tailgate",group:"ext",diy:3,what:"전동으로 열리는 뒷문. 유모차·짐을 싣는 곳. 트렁크 바닥 아래에 공구·견인고리·타이어 수리 키트(또는 임시 타이어)가 있다.",check:["스마트 파워 테일게이트(옵션): 키를 가지고 뒤에 3초쯤 서 있으면 자동으로 열린다.","열리는 높이는 설정 가능 — 지하주차장 천장이 낮으면 높이를 낮춰 두기.","닫히는 중 걸림 감지가 있지만 아이 손 조심."]},taillamp:{name:"리어 콤비램프",en:"Tail Lamp",group:"ext",diy:1,what:"미등·브레이크등·방향지시등·후진등이 모인 램프. 브레이크등이 나가면 뒤차가 감속을 모른다.",check:["브레이크등 셀프 점검: 밤에 벽 앞에서 브레이크를 밟고 반사광 확인, 또는 가족에게 봐 달라고."]},"bumper-r":{name:"뒤 범퍼",en:"Rear Bumper",group:"ext",diy:1,what:"후방 주차 센서와 반사판이 있다. 스포티지 5세대는 머플러 끝이 범퍼 아래로 숨겨져 있어 겉에서 잘 안 보인다.",check:['후진 시 "삐삐삐" 간격이 짧아질수록 가깝다는 뜻. 연속음이면 즉시 정지.']},"roof-rail":{name:"루프랙",en:"Roof Rail",group:"ext",diy:1,what:"지붕의 레일. 가로바를 달면 루프박스·자전거 캐리어를 올릴 수 있다. 캠핑 갈 때 유용.",check:["지붕 적재 허용 무게는 취급설명서 확인(보통 수십 kg 수준) — 루프박스 무게 포함.","짐을 올리면 높이가 높아지니 지하주차장 높이 제한 주의."]},antenna:{name:"샤크핀 안테나",en:"Shark-fin Antenna",group:"ext",diy:1,what:"라디오·GPS·통신(커넥티드 서비스) 안테나를 하나로 모은 상어 지느러미 모양 부품.",check:["자동 세차기에서도 접을 필요 없다."]},cabin:{name:"실내 · 유리창",en:"Cabin & Glass",group:"ext",diy:3,what:'창문 안쪽이 실내. 위의 "실내 보기"를 켜면 지붕이 걷히고 운전석·화면·시트를 하나씩 클릭해 볼 수 있다.',check:["여름엔 실내가 70°C 가까이 올라간다. 아이를 잠깐이라도 차에 혼자 두지 않기.","후석 승객 알림(기본)을 켜 두면 내릴 때 뒷좌석에 아이가 남아 있는지 알려 준다."]},"int-display":{name:"파노라믹 커브드 디스플레이",en:"Panoramic Curved Display",group:"int",diy:3,trim:'노블레스부터 (프레스티지는 12.3" 내비 + 4.2" 계기판)',what:"운전대 뒤 12.3인치 계기판과 가운데 12.3인치 내비를 하나로 이은 휘어진 화면. ccNC(기아 커넥트) 기반이라 무선 소프트웨어 업데이트(OTA)를 받는다.",check:["폰 프로젝션(카플레이/안드로이드 오토)으로 휴대폰 내비·음악을 띄울 수 있다.","주차 중에는 OTT 영상 스트리밍도 가능 — 아이 기다릴 때 유용.","설정 > 차량에서 후석 승객 알림, 차일드락, 하차 보조 등을 켜고 끌 수 있다."]},"int-climate":{name:"공조 · 전환형 조작계",en:"Climate & Switchable Controls",group:"int",diy:3,what:'화면 아래 가로로 긴 터치 패널 하나가 버튼 하나로 "공조 ↔ 내비/오디오" 조작으로 바뀐다. 에어컨은 운전석·동승석 독립제어 풀오토(전 트림 기본).',check:["평소엔 AUTO에 두고 온도만 바꾸기. 바람 세기·방향은 차가 맞춘다.","공기청정 모드 + 미세먼지 센서(기본): 미세먼지 심한 날엔 내기순환과 함께.","오토 디포그(기본)가 앞유리 김서림을 미리 막는다. 그래도 서리면 앞유리 버튼 + A/C.","애프터 블로우(기본): 시동을 끈 뒤 에어컨 속을 말려 여름철 냄새를 줄인다.","운전 중엔 조작이 헷갈리기 쉬우니 출발 전에 맞춰 두기."]},"int-wheel":{name:"스티어링 휠",en:"Steering Wheel",group:"int",diy:3,what:"위아래가 평평한 D컷 운전대. 열선(전 트림 기본), 스마트 크루즈·고속도로 주행 보조(HDA) 버튼, 주행 모드 버튼(페이스리프트에서 운전대로 이동했다는 시승기 있음 — 미확인)이 모여 있다.",check:["그립 감지: HDA 사용 중에도 운전대를 잡고 있어야 한다. 손을 떼면 경고 후 기능이 해제된다.","높이·거리 조절은 운전대 아래 레버(수동).","패들 시프트(다이얼 차량): 가솔린은 수동 변속, 하이브리드는 회생제동 세기 조절."]},"int-shifter":{name:"전자식 변속 다이얼",en:"Rotary Shift Dial",group:"int",diy:3,trim:"하이브리드 전 트림 · 가솔린/LPi 노블레스부터 (프레스티지는 일반 레버)",what:"센터콘솔의 원형 다이얼을 돌려 P·R·N·D를 고른다. 기계적으로 연결된 게 아니라 전기 신호로 변속기에 명령한다.",check:["브레이크를 밟은 상태에서 돌려야 변속된다.","시동을 끄면 대부분 자동으로 P에 들어간다 — 계기판 표시로 확인 습관.",'세차기 컨베이어처럼 N에 둔 채 시동을 꺼야 할 때는 취급설명서의 "N 유지" 방법 확인.']},"int-epb":{name:"전자식 파킹 브레이크 · 오토홀드",en:"EPB & Auto Hold",group:"int",diy:3,what:"버튼으로 거는 주차 브레이크(전 트림 기본). 오토홀드를 켜면 신호 대기 때 브레이크에서 발을 떼도 차가 멈춰 있다가 가속 페달을 밟으면 풀린다.",check:["오토홀드는 시동마다 꺼질 수 있으니 계기판 초록 AUTO HOLD 표시 확인.","경사로 주차는 P + 파킹 브레이크 + 핸들을 연석 쪽으로."]},"int-charger":{name:"무선충전 · USB-C",en:"Wireless Charger & USB-C",group:"int",diy:3,trim:"무선충전 노블레스부터",what:"콘솔 앞 트레이에 폰을 올리면 무선충전. USB-C는 1열 1개·2열 2개(기본), 시그니처는 앞좌석 등받이 뒤 100W 단자 2개 추가.",check:["무선충전 중 폰이 뜨거워지면 충전이 느려진다 — 여름엔 에어컨 바람을 콘솔 쪽으로.","카드·동전을 트레이에 같이 두지 않기(발열)."]},"int-hud":{name:"헤드업 디스플레이 (HUD)",en:"Head-Up Display",group:"int",diy:3,trim:"시그니처 기본 · 노블레스 옵션",what:"속도·내비 방향을 앞유리에 비춰 시선을 내리지 않고 볼 수 있게 한다.",check:["편광 선글라스를 끼면 HUD가 안 보일 수 있다.","높이·밝기는 설정 메뉴에서 조절."]},"int-seat-f":{name:"1열 시트 (열선 · 통풍)",en:"Front Seats",group:"int",diy:3,trim:"열선 기본 · 통풍/전동/허리지지대 노블레스부터 · 메모리/이지 억세스 시그니처",what:"앞좌석. 겨울엔 열선, 여름엔 통풍(시트 구멍으로 바람). 동승석 워크인(노블레스부터)은 뒷좌석에서 조수석을 앞으로 밀어 공간을 만든다.",check:["운전 자세: 엉덩이를 끝까지 넣고, 손목이 운전대 위에 닿는 거리, 무릎이 살짝 굽혀지게.","워크인: 2열 카시트에 아이를 태우고 내릴 때 조수석을 앞으로 밀어 두면 편하다."],warn:"조수석에 뒤보기 카시트 금지 — 에어백이 터지면 매우 위험. 아이는 뒷좌석에."},"int-seat-r":{name:"2열 시트 · ISOFIX",en:"Rear Seats & ISOFIX",group:"int",diy:3,trim:"2열 열선 시그니처부터",what:"6:4로 나눠 접히고 등받이 각도 조절(리클라이닝)이 된다. 양쪽 자리의 등받이와 방석 사이 틈에 카시트 고정용 ISOFIX 고리가 있다.",check:["ISOFIX로 고정 후 상단 테더(등받이 뒤 고리)까지 걸기. 카시트를 좌우로 흔들어 2~3cm 이상 움직이지 않으면 OK.","2열 에어벤트(기본)는 앞좌석 사이 콘솔 뒤 — 카시트 쪽으로 바람 방향 맞추기.","2열 USB-C 2개(기본)로 태블릿 충전 가능.","접을 때: 시그니처는 트렁크 옆 리모트 폴딩 레버로도 접힌다."]},"int-sunroof":{name:"파노라마 선루프",en:"Panoramic Sunroof",group:"int",diy:1,trim:"옵션",what:"지붕 앞뒤로 긴 유리. 앞쪽 유리가 열리고 전동 차양막이 있다.",check:["여름엔 차양막을 닫아야 실내 온도가 덜 오른다.","배수구가 막히면 실내로 물이 샐 수 있다 — 낙엽 많은 곳 주차 후 확인.","아이가 선루프 밖으로 몸을 내밀지 않게!"]},"lpg-tank":{name:"LPG 봄베 (LPi)",en:"LPG Tank",group:"under",diy:0,only:"lpi",what:"LPi 모델은 트렁크 바닥(원래 스페어 타이어 자리)에 도넛 모양 LPG 탱크가 들어간다. (배치는 단순화해 표현)",check:["LPG는 충전량이 탱크의 약 80%까지만 채워지는 것이 정상(안전 여유).","겨울철 시동성은 예전보다 좋아졌지만, 장기 주차 전 연료를 너무 적게 두지 않기.","LPG 차량은 일부 지하 주차장 규정 확인(현재 대부분 허용)."]},engine:{name:"엔진",en:"Engine",group:"bay",diy:0,what:"연료와 공기를 태워 힘을 만드는 심장. 2027년형은 1.6 가솔린 터보(8단 자동), 2.0 LPi, 1.6 터보 하이브리드 세 가지(디젤은 단종). 위의 검은 판은 소음을 줄이는 엔진 커버.",check:["평소 할 일은 오일·냉각수 레벨 확인 정도. 나머지는 정비소 영역.","시동 직후 몇 분은 회전수를 높이지 말고 부드럽게 출발하는 것이 엔진에 좋다.","엔진 경고등(노란 엔진 모양)이 켜지면 가까운 시일 내 점검, 깜빡이면 바로 감속·점검."]},"oil-cap":{name:"엔진오일 주입구",en:"Oil Filler Cap",group:"bay",diy:2,what:"엔진 위 기름통 그림이 있는 뚜껑. 엔진오일이 부족할 때 여기로 보충한다.",check:["보충은 딥스틱을 보면서 조금씩(0.5L 단위). 너무 많이 넣어도 문제.","반드시 차에 맞는 규격(취급설명서의 API/ACEA·점도) 오일로.","뚜껑 꼭 다시 잠그기 — 열린 채로 달리면 엔진룸이 오일 범벅."],cycle:"교환: 일반 조건 vs 가혹 조건(짧은 거리 반복·정체·잦은 공회전) 기준이 다름 — 등하원처럼 짧게 자주 타면 가혹 조건 쪽으로!"},dipstick:{name:"엔진오일 게이지 (딥스틱)",en:"Oil Dipstick",group:"bay",diy:3,what:"노란/주황 고리 손잡이. 뽑아서 끝에 묻은 오일 높이로 양을 확인하는 막대.",check:["① 평지에서 시동 끄고 5~10분 기다린다(오일이 아래로 내려오도록).","② 뽑아서 휴지로 닦고 → 끝까지 다시 꽂았다가 → 다시 뽑아서 본다.","③ 오일 자국이 F(MAX)와 L(MIN) 사이면 정상. L에 가까우면 보충.","색이 아주 검고 끈적하거나 우윳빛이면 정비소로."],cycle:"한 달에 한 번, 장거리 여행 전"},coolant:{name:"냉각수 보조탱크",en:"Coolant Reservoir",group:"bay",diy:2,what:"반투명 통 안의 액체가 엔진을 식히는 냉각수. 옆면의 MIN(L)~MAX(F) 눈금 사이에 있어야 한다.",check:["엔진이 식었을 때 확인. 줄어들었으면 같은 종류의 순정 냉각수로 보충.","자꾸 줄어든다면 어딘가 새고 있는 것 → 점검.","장수명 냉각수는 첫 교환까지 매우 길다(취급설명서 기준 확인)."],warn:"엔진이 뜨거울 때 라디에이터/탱크 캡을 열면 끓는 냉각수가 뿜어져 화상을 입는다. 반드시 식힌 뒤에!",cycle:"레벨 확인 월 1회"},"brake-fluid":{name:"브레이크액 탱크",en:"Brake Fluid Reservoir",group:"bay",diy:1,what:"운전석 쪽 뒤편의 작은 반투명 통. 페달을 밟는 힘을 바퀴의 캘리퍼로 전달하는 유압 오일(DOT4)이 들어 있다.",check:["MIN~MAX 사이인지 눈으로만 확인. 패드가 닳으면 조금씩 내려가는 것이 정상.","갑자기 많이 줄었다면 누유 → 바로 정비소.","브레이크액은 공기 중 수분을 빨아들여 끓는점이 낮아지므로 주기적으로 교환."],cycle:"교환 약 2년(또는 4만 km 전후, 취급설명서 확인)"},washer:{name:"워셔액 주입구",en:"Washer Fluid Filler",group:"bay",diy:3,what:"물방울/유리 그림이 있는 파란 뚜껑. 와이퍼 레버를 당기면 나오는 세정액 통 입구.",check:["뚜껑 열고 붓기만 하면 끝 — 가장 쉬운 셀프 정비.","겨울엔 어는점 낮은 사계절/겨울용 워셔액. 물만 넣으면 얼어서 노즐·모터 고장."],cycle:"떨어지면 수시로"},battery:{name:"12V 배터리",en:"12V Battery",group:"bay",diy:2,what:"시동, 라이트, 블랙박스, 도어락에 쓰는 12V 전기 저장소. 빨간 덮개가 (+), 검은 쪽이 (−).",check:["시동 끈 상태 전압: 12.6V 이상 만충 · 12.4V 약 75% · 12.0V 이하면 거의 방전.",'시동이 "끄르릉" 힘없이 걸리면 교체 신호. 수명은 보통 3~5년.',"블랙박스 상시 녹화는 저전압 차단 설정(예: 12.0V 이하 차단)을 꼭 켜두기."],warn:"단자를 분리할 때는 (−)부터, 연결할 때는 (+)부터. 공구로 +와 차체를 동시에 건드리면 불꽃!",cycle:"정비소 방문 때 전압·CCA 점검, 3~5년 교체"},fusebox:{name:"엔진룸 퓨즈 · 릴레이 박스",en:"Engine Room Fuse Box",group:"bay",diy:2,what:"큰 전류가 흐르는 회로들의 퓨즈 모음. 과전류가 흐르면 퓨즈가 끊어져 배선이 타는 것을 막는다. 실내(운전석 아래쪽)에도 퓨즈 박스가 하나 더 있다.",check:["뚜껑 안쪽에 어떤 퓨즈가 무엇인지 그림표가 있다.","퓨즈 교체는 같은 용량(A, 색깔)으로만. 큰 용량을 끼우면 화재 위험."]},airbox:{name:"에어클리너 (공기 필터)",en:"Air Cleaner Box",group:"bay",diy:2,what:"엔진이 빨아들이는 공기의 먼지를 거르는 필터 상자. 엔진은 1L 연료당 약 1만 L 넘는 공기를 마신다.",check:["클립 몇 개를 풀면 뚜껑이 열리고 종이 필터가 나온다 — 셀프 교체 가능.","필터를 빛에 비춰 봤을 때 빛이 거의 안 통하면 교체.",'실내 "에어컨 필터"와는 다른 부품! (그건 글로브박스 뒤)'],cycle:"점검 약 1만 km, 교체 4만 km 전후(먼지 많은 환경이면 더 자주)"},radiator:{name:"라디에이터 · 냉각팬",en:"Radiator & Fan",group:"bay",diy:0,what:"그릴 바로 뒤의 얇은 금속 판. 뜨거워진 냉각수가 가는 관을 지나며 바람에 식는다. 앞에는 에어컨 콘덴서, 터보 차량은 인터쿨러도 함께 있다.",check:['정차 중 엔진룸에서 "웅~" 하는 팬 소리는 정상(온도가 오르면 팬이 돈다).',"계기판 수온이 평소보다 높게 올라가면 바로 안전한 곳에 정차."]},"hood-stay":{name:"후드 지지대",en:"Hood Stay Rod",group:"bay",diy:3,what:"본네트를 받치는 쇠 막대. 엔진룸 앞쪽 가장자리 클립에 눕혀져 있다가, 세워서 본네트 안쪽 표시된 홈에 끼운다.",check:["홈에 정확히 끼우지 않으면 본네트가 떨어질 수 있다 — 고개를 넣기 전에 한 번 흔들어 확인.","닫을 때는 지지대를 원래 클립에 먼저 끼우고 닫기."]},"strut-top":{name:"쇼크업소버 상단 (스트럿 마운트)",en:"Strut Top Mount",group:"bay",diy:1,what:"엔진룸 양쪽 모서리의 둥근 부분은 앞바퀴 서스펜션(맥퍼슨 스트럿)의 꼭대기. 차 무게가 여기서 바퀴로 전달된다.",check:['과속방지턱 넘을 때 "덜컥" 소리가 나면 마운트·쇼크업소버 점검.']},turbo:{name:"터보차저",en:"Turbocharger",group:"bay",diy:0,only:"turbo",what:"배기가스로 바람개비(터빈)를 돌리고, 같은 축의 반대편 날개(컴프레서)로 공기를 압축해 엔진에 밀어 넣는다. 작은 엔진으로 큰 힘.",check:["분당 십수만 회전하며 엔진오일로 윤활·냉각 → 오일 관리가 터보 수명의 핵심.","고속·고부하 주행 직후엔 바로 시동 끄기보다 잠시 천천히 달리거나 30초쯤 두었다 끄면 좋다."]},inverter:{name:"인버터 · 고전압 케이블 (HEV)",en:"Inverter / PCU & HV Cables",group:"bay",diy:0,only:"hev",what:"배터리의 직류(DC)를 모터가 쓰는 교류(AC)로 바꾸는 전력 제어 장치. 주황색 굵은 선은 수백 V가 흐르는 고전압 케이블.",check:["평소 점검할 것은 없다. 계기판에 하이브리드 시스템 경고가 뜨면 정비소."],warn:"주황색 케이블·커넥터는 절대 만지거나 분리하지 않는다. 감전 위험!"},"hev-coolant":{name:"전장 냉각수 탱크 (HEV)",en:"Inverter Coolant Reservoir",group:"bay",diy:1,only:"hev",what:"하이브리드는 엔진용 말고도 인버터·모터를 식히는 냉각 회로가 따로 있어 냉각수 탱크가 2개.",check:["두 탱크 모두 MIN~MAX 사이인지 확인. 서로 섞어 보충하지 않기(각각 표시 확인)."]},transmission:{name:"변속기",en:"Transmission",group:"under",diy:0,what:"엔진 옆(가로 배치)에 붙어 기어비를 바꾸는 장치. 2027년형 가솔린은 8단 자동, 하이브리드는 모터가 붙은 6단 자동, LPi는 6단 자동(미확인). 실내의 다이얼/레버는 전기 신호로 이 변속기에 명령만 보낸다.",check:['변속 충격이 커지거나 "웅~" 하는 이상한 소음이 생기면 점검.',"정차 후 내릴 때는 반드시 P + 전자식 파킹 브레이크(대부분 자동으로 걸림) 확인."]},driveshaft:{name:"드라이브 샤프트",en:"Drive Shaft",group:"under",diy:1,what:"변속기에서 앞바퀴로 회전을 전달하는 축. 양 끝의 고무 주름(부트) 안에 등속 조인트가 있어 핸들을 꺾어도 힘이 전달된다.",check:['핸들을 끝까지 꺾고 돌 때 "딱딱딱" 소리 → 등속 조인트/부트 점검.',"정비소에서 리프트에 올렸을 때 부트가 찢어져 그리스가 튀었는지 봐 달라고 하기."]},suspension:{name:"서스펜션 (스프링 · 쇼크업소버)",en:"Springs & Dampers",group:"under",diy:0,what:"코일 스프링이 충격을 받아 주고, 쇼크업소버(쇼바)가 출렁임을 빨리 멈춘다. 앞은 맥퍼슨 스트럿, 뒤는 멀티링크.",check:["방지턱을 넘은 뒤 차가 2~3번 출렁이면 쇼크업소버 노화.","쇼크업소버 몸통에 기름이 번들거리면 누유."]},exhaust:{name:"배기 · 촉매 · 머플러",en:"Exhaust, Catalyst & Muffler",group:"under",diy:0,what:"엔진에서 나온 배기가스가 촉매(유해가스 정화) → 머플러(소음 감소)를 지나 뒤로 나간다. 스포티지 5세대는 머플러 끝이 뒤 범퍼 아래에 숨어 있다.",check:['머플러에서 "부와앙" 큰 소리가 나면 배기 누설.',"짧은 거리만 반복하면 배기관에 수분이 차기 쉽다 — 가끔은 20~30분 이상 달려 주기."],warn:"주행 직후 배기관·촉매는 수백 °C. 마른 풀밭 위 주차 주의."},"fuel-tank":{name:"연료 탱크",en:"Fuel Tank",group:"under",diy:0,what:"뒷좌석 아래쯤의 플라스틱 연료 탱크(약 50L대). 안에 연료 펌프가 들어 있다.",check:["연료를 바닥까지 자주 쓰면 펌프 냉각에 불리 — 1/4쯤 남으면 주유하는 습관."]},"hv-battery":{name:"고전압 배터리 (HEV)",en:"HV Battery Pack",group:"under",diy:0,only:"hev",what:"뒷좌석 아래의 리튬이온 배터리 팩. 감속할 때 모은 전기로 출발·저속 주행을 돕는다. (배치는 단순화해 표현)",check:["뒷좌석 근처의 배터리 냉각 흡입구를 짐·담요로 막지 않기.","오래 세워 둘 거면 가끔 시동(READY)을 켜 주기."],warn:"고전압 부품 — 사고 후 차체 하부 손상 시 직접 만지지 말 것."},"prop-shaft":{name:"프로펠러 샤프트 · 뒤 디퍼렌셜 (AWD)",en:"Propeller Shaft & Rear Diff",group:"under",diy:0,only:"awd",what:"4륜 구동 모델만 있다. 앞쪽 변속기의 힘 일부를 차 밑을 지나는 긴 축으로 뒤바퀴에 보낸다. 평소엔 앞바퀴 위주, 미끄러지면 뒤로 더 보낸다.",check:["네 바퀴 타이어는 같은 브랜드·같은 마모 상태로 유지(차이가 크면 구동계에 무리)."]}},ir={wolf:12567494,white:15330543,black:1118998,gray:6120556,blue:2377582,green:4872773},Q0={front:{cam:[5.4,1.9,2.6],target:[.3,.7,0]},bay:{cam:[4.4,3.4,2],target:[1.4,.7,0]},side:{cam:[.2,1.5,6.6],target:[0,.75,0]},rear:{cam:[-5.4,2.1,2.4],target:[-.3,.8,0]},xray:{cam:[3.2,3.6,4.6],target:[.2,.5,0]},int:{cam:[-2.4,3.3,1.7],target:[.05,.8,.05]}},hn=i=>i.replace(/&/g,"&amp;").replace(/</g,"&lt;"),oo=(i,t,e)=>!i.only||i.only==="hev"&&t==="hev"||i.only==="lpi"&&t==="lpi"||i.only==="awd"&&e||i.only==="turbo"&&t!=="lpi"||i.only==="ice"&&t!=="hev",ps=i=>i.only==="hev"?"하이브리드 전용":i.only==="awd"?"AWD 전용":i.only==="lpi"?"LPi 전용":i.only==="turbo"?"터보 엔진(가솔린·하이브리드)":"",Bc=i=>`<span class="diy diy-${i}">${"●".repeat(i)}${"○".repeat(3-i)} ${J0[i]}</span>`;function zc(i,t){const e=nn[i];e&&(e.group==="bay"&&!t.bool("hood")&&!t.bool("xray")&&t.set("hood",!0),e.group==="under"&&!t.bool("xray")&&t.set("xray",!0),e.group==="int"&&!t.bool("cabinv")&&t.set("cabinv",!0))}const eg={layout:"simulation",hint:" · 드래그로 360° 회전, 휠/핀치로 확대 · 부품을 클릭(탭)하면 설명이 나옵니다",intro:"우리 집 스포티지를 컴퓨터 안에서 마음껏 돌려보고 열어 보는 페이지입니다. 차를 드래그해 360° 돌려보고, 궁금한 부분을 <b>클릭</b>하면 그게 무엇인지, 무엇을 점검해야 하는지, 직접 할 수 있는지 알려 줍니다. <b>본네트를 클릭</b>하면 열리면서 엔진룸 부품들이 보이고, <b>실내 보기</b>를 켜면 지붕이 걷히면서 화면·공조·변속 다이얼·시트(열선/통풍)·ISOFIX를, <b>투시 모드</b>를 켜면 차 밑의 변속기·배기관·서스펜션까지 볼 수 있어요. 기준은 The 2027 스포티지(2026년 8월 연식변경) 기아 가격표이며, 트림별 사양은 파란 배지로 표시했습니다.",howTitle:"사용법",how:["차를 드래그해 돌려보세요. 위의 시점 버튼(정면·엔진룸·옆·뒤)으로 바로 이동할 수도 있습니다.","본네트를 클릭하면 실제 차처럼 열리고 후드 지지대가 세워집니다. 노란 고리(딥스틱), 파란 뚜껑(워셔액), 반투명 통(냉각수·브레이크액)을 찾아보세요.",'파워트레인을 "하이브리드"로 바꾸면 인버터와 주황색 고전압 케이블, 두 번째 냉각수 탱크, 뒷좌석 아래 고전압 배터리가 나타납니다. "2.0 LPi"는 터보가 없고 트렁크 바닥에 도넛형 LPG 탱크가 들어갑니다.',"실내 보기를 켜면 지붕과 유리가 사라지고 실내가 보입니다. 운전대, 휘어진 디스플레이, 공조 패널, 변속 다이얼, 1·2열 시트를 클릭해 보세요. 기능마다 어느 트림부터 들어가는지도 표시됩니다.","투시 모드를 켜면 차체가 반투명해지고 차 밑 부품을 클릭할 수 있습니다. 아래로 드래그해 차 밑에서 올려다볼 수도 있어요.",'아래 "부품 사전"에서 이름을 눌러도 3D에서 해당 부품을 찾아 강조합니다. 직접 해볼 수 있는 난이도(●●●)도 함께 표시됩니다.'],prosTitle:"이 뷰어로 익힐 것",pros:["본네트 여는 순서와 후드 지지대 거는 법","엔진오일·냉각수·브레이크액·워셔액 — 셀프 점검 4종의 위치","12V 배터리의 +/− 위치 (방전 시 점프 시동에 필요)","하이브리드라면 만지면 안 되는 주황색 고전압 부품","아이를 위한 차일드 락·ISOFIX 위치"],consTitle:"실제 차와 다른 점 (꼭 읽기)",cons:["공부용으로 단순화한 절차적 3D 모델입니다. 모양·비율은 스포티지 5세대 치수를 따랐지만 실제 디자인과 다릅니다.","부품의 대략적 배치는 일반적인 가로배치 엔진 SUV를 따랐고, 연식·트림·파워트레인마다 실제 위치가 다를 수 있습니다.","정확한 규격(오일 종류, 공기압, 교환 주기)은 반드시 차량 취급설명서(기아 앱 또는 글로브박스)와 운전석 도어 스티커를 확인하세요."],usedInTitle:"한 달에 한 번, 5분 셀프 점검 루틴",usedIn:"① 타이어 4개 눈으로 보기 + 계기판 TPMS 공기압 확인 → ② 본네트 열기 → ③ 딥스틱으로 엔진오일 양 → ④ 냉각수 보조탱크 MIN~MAX → ⑤ 브레이크액 MIN~MAX → ⑥ 워셔액 보충 → ⑦ 실내에서 라이트·깜빡이·브레이크등 확인. 이 순서대로 3D 모델에서 먼저 위치를 찾아보세요.",controls:[{type:"toggle",key:"hood",label:"본네트 열기",value:!1},{type:"toggle",key:"cabinv",label:"실내 보기 (지붕 걷기)",value:!1},{type:"toggle",key:"xray",label:"투시 모드 (하부 보기)",value:!1},{type:"toggle",key:"labels",label:"부품 이름표",value:!0},{type:"toggle",key:"spin",label:"자동 회전",value:!0},{type:"select",key:"pt",label:"파워트레인",value:"gas",options:[{label:"가솔린 1.6 터보",value:"gas"},{label:"하이브리드 1.6 터보",value:"hev"},{label:"2.0 LPi",value:"lpi"}]},{type:"toggle",key:"awd",label:"AWD (4륜 구동)",value:!1},{type:"select",key:"paint",label:"색상",value:"wolf",options:[{label:"라이트 그레이 (사진 색)",value:"wolf"},{label:"화이트 펄",value:"white"},{label:"블랙",value:"black"},{label:"그레이",value:"gray"},{label:"블루",value:"blue"},{label:"그린",value:"green"}]},{type:"toggle",key:"roof",label:"블랙 투톤 지붕",value:!1},{type:"button",key:"v-front",label:"정면"},{type:"button",key:"v-bay",label:"엔진룸"},{type:"button",key:"v-side",label:"옆"},{type:"button",key:"v-rear",label:"뒤"},{type:"button",key:"v-int",label:"실내"}],viewers:[{title:"스포티지 3D — 클릭해서 알아보기",kind:"sim",wide:!0,caption:"본네트(앞쪽 덮개)를 클릭하면 열립니다. 엔진룸 부품을 클릭하면 아래 카드와 부품 사전에 설명이 나타납니다.",mount:i=>(i.body.classList.add("car3d"),j0(i,{antialias:!0,cam:[5.6,2.4,4.4],target:[0,.7,0],fov:40,background:856343,near:.05,far:80},({scene:t,camera:e,renderer:n,controls:s})=>{n.toneMapping=Vc,n.toneMappingExposure=1;const r=new qo(n),o=r.fromScene(new U0,.04).texture;t.environment=o,r.dispose(),t.add(new A0(13624319,1710618,.6));const a=new L0(16777215,1.6);a.position.set(4,8,3),t.add(a);const c=document.createElement("canvas");c.width=c.height=256;const l=c.getContext("2d"),u=l.createRadialGradient(128,128,10,128,128,128);u.addColorStop(0,"rgba(0,0,0,0.85)"),u.addColorStop(.55,"rgba(0,0,0,0.45)"),u.addColorStop(1,"rgba(0,0,0,0)"),l.fillStyle=u,l.fillRect(0,0,256,256);const p=new hr(c),m=new ue(new ts(5.6,2.8),new bs({map:p,transparent:!0,depthWrite:!1}));m.rotation.x=-Math.PI/2,m.position.y=.002,t.add(m);const h=new ue(new pa(9,64),new Pn({color:1711911,roughness:.85,metalness:0}));h.rotation.x=-Math.PI/2,t.add(h);const f=new ue(new _a(3.3,3.34,96),new bs({color:2831426}));f.rotation.x=-Math.PI/2,f.position.y=.003,t.add(f);const _=K0();t.add(_.root);for(const O of _.parts.values())for(const w of O.meshes)_.isBody(w)||(w.material=w.material.clone());s.enableDamping=!0,s.dampingFactor=.08,s.minDistance=2.2,s.maxDistance=13,s.maxPolarAngle=Math.PI*.49,s.autoRotateSpeed=.7,s.enablePan=!0,s.screenSpacePanning=!0;const g=document.createElement("div");g.className="car-labels",i.body.appendChild(g);const d=document.createElement("div");d.className="car-card",d.hidden=!0,i.body.appendChild(d);const A=document.createElement("div");A.className="car-tip",A.textContent="👆 부품을 클릭해 보세요 · 본네트를 누르면 열려요",i.body.appendChild(A);const E=new Map;for(const O of _.parts.keys()){const w=nn[O];if(!w)continue;const pt=document.createElement("button");pt.className=`car-label g-${w.group}`,pt.textContent=w.name.replace(/ \(.*\)$/,""),pt.addEventListener("click",Q=>{Q.stopPropagation(),L(O)}),g.appendChild(pt),E.set(O,pt)}const v=()=>i.params.str("pt","gas");_.setPowertrain(v(),i.params.bool("awd")),_.setPaint(ir[i.params.str("paint","wolf")]??ir.wolf),_.setRoofBlack(i.params.bool("roof",!1));let I=_.pickables(!1);const C=()=>I=_.pickables(i.params.bool("xray"));let P=i.params.str("sel")||null,D=null,y=null;const M=O=>{const w=Q0[O];y={t:0,fromC:e.position.clone(),fromT:s.target.clone(),toC:new b(...w.cam),toT:new b(...w.target)},i.params.set("spin",!1)},L=O=>{i.params.set("sel",O??""),O&&zc(O,i.params)},X=()=>{const O=P?nn[P]:void 0;if(!O){d.hidden=!0;return}d.hidden=!1,A.hidden=!0,d.innerHTML=`<button class="car-card-x" aria-label="닫기">×</button>
              <div class="car-card-g">${ro[O.group]}${ps(O)?` · <b>${ps(O)}</b>`:""}</div>
              <h4>${hn(O.name)}</h4>
              ${Bc(O.diy)}${O.trim?` <span class="trim">${hn(O.trim)}</span>`:""}
              <p>${hn(O.what)}</p>
              ${O.warn?`<p class="car-warn">⚠ ${hn(O.warn)}</p>`:""}
              <button class="car-card-more">점검 방법 · 주기 자세히 ↓</button>`,d.querySelector(".car-card-x").addEventListener("click",()=>L(null)),d.querySelector(".car-card-more").addEventListener("click",()=>{var w;(w=document.querySelector(".part-detail"))==null||w.scrollIntoView({behavior:"smooth",block:"start"})})};X();const k=(O,w,pt)=>{if(!O)return;const Q=_.parts.get(O);if(Q)for(const ft of Q.meshes){const ct=ft.material;ct.emissive&&(ct.userData.e0===void 0&&(ct.userData.e0=ct.emissive.getHex(),ct.userData.i0=ct.emissiveIntensity),ct.emissive.setHex(w),ct.emissiveIntensity=pt)}},G=O=>{if(!O)return;const w=_.parts.get(O);if(w)for(const pt of w.meshes){const Q=pt.material;Q.userData.e0!==void 0&&(Q.emissive.setHex(Q.userData.e0),Q.emissiveIntensity=Q.userData.i0)}},K=new D0,W=new ot;let st=null,Y=!1;const ut=O=>{const w=n.domElement.getBoundingClientRect();W.set((O.clientX-w.left)/w.width*2-1,-((O.clientY-w.top)/w.height)*2+1)},mt=()=>{K.setFromCamera(W,e);const O=K.intersectObjects(I,!1)[0];return(O==null?void 0:O.object.userData.part)??null},Et=O=>{st={x:O.clientX,y:O.clientY,t:performance.now()},i.params.bool("spin")&&i.params.set("spin",!1),y=null},zt=O=>{if(!st)return;const w=Math.hypot(O.clientX-st.x,O.clientY-st.y),pt=performance.now()-st.t<600;if(st=null,w>7||!pt)return;ut(O);const Q=mt();Q==="hood"&&i.params.set("hood",!i.params.bool("hood")),L(Q)},te=O=>{O.pointerType!=="mouse"||st||(ut(O),Y=!0)},j=()=>{D!==P&&G(D),D=null,n.domElement.style.cursor=""},rt=n.domElement;rt.addEventListener("pointerdown",Et),rt.addEventListener("pointerup",zt),rt.addEventListener("pointermove",te),rt.addEventListener("pointerleave",j);let vt=0;const at=i.params.on((O,w)=>{if(O==="sel")G(P),P=w||null,X();else if(O==="xray")_.setXray(!!w),C(),h.visible=m.visible=f.visible=!w,s.maxPolarAngle=w?Math.PI*.92:Math.PI*.49,w&&M("xray");else if(O==="pt"||O==="awd")_.setPowertrain(v(),i.params.bool("awd")),C(),P&&!oo(nn[P],v(),i.params.bool("awd"))&&L(null);else if(O==="cabinv")_.setInterior(!!w),C(),w&&!y&&M("int");else if(O==="roof")_.setRoofBlack(!!w);else if(O==="paint")_.setPaint(ir[w]??ir.wolf);else if(O==="hood")w&&!y&&M("bay");else if(O.startsWith("v-")){const pt=O.slice(2);pt==="bay"&&!i.params.bool("hood")&&i.params.set("hood",!0),pt==="int"&&!i.params.bool("cabinv")&&i.params.set("cabinv",!0),M(pt)}});i.params.bool("cabinv")&&(_.setInterior(!0),C()),i.params.bool("xray")&&(_.setXray(!0),C(),h.visible=m.visible=f.visible=!1);const Rt=new b(0,.7,0),Nt=new b,Ot=new b,Yt=new b;let J=0;return{update(O){var B;const w=i.params.bool("hood")?Yo.degToRad(55):0,pt=vt;if(vt+=(w-vt)*Math.min(1,O*4.5),Math.abs(w-vt)<5e-4&&(vt=w),vt!==pt&&_.setHoodAngle(vt),y){y.t=Math.min(1,y.t+O/.9);const q=y.t<.5?2*y.t*y.t:1-Math.pow(-2*y.t+2,2)/2;e.position.lerpVectors(y.fromC,y.toC,q),s.target.lerpVectors(y.fromT,y.toT,q),y.t>=1&&(y=null)}if(s.autoRotate=i.params.bool("spin")&&!y,s.update(),Y){Y=!1;const q=mt();q!==D&&(D&&D!==P&&G(D),D=q),rt.style.cursor=q?"pointer":""}J+=O,D&&D!==P&&k(D,3825052,.55),P&&k(P,3111935,.55+.35*Math.sin(J*5));const Q=i.params.bool("labels"),ft=i.params.bool("xray"),ct=i.params.bool("cabinv"),Dt=i.body.clientWidth,xt=i.body.clientHeight;Ot.copy(e.position).sub(Rt).normalize();let T=0,x=0;for(const[q,et]of E){const $=nn[q],Tt=_.parts.get(q);let dt=!0;for(let it=Tt.meshes[0];it;it=it.parent)it.visible||(dt=!1);dt&&x++;const Mt={ext:!ft&&!ct&&vt<.25,int:ct,bay:vt>.6||ft,under:ft};let Wt=dt&&(q===P||Q&&Mt[$.group]);if(Wt){let it=1/0;for(const bt of Tt.anchors){bt.parent.localToWorld(Nt.copy(bt.local));const Ft=Nt.distanceToSquared(e.position);Ft<it&&(it=Ft,Yt.copy(Nt))}$.group==="ext"&&q!==P&&Nt.copy(Yt).sub(Rt).setY(0).normalize().dot(Ot.clone().setY(0).normalize())<.2&&q!=="hood"&&q!=="cabin"&&q!=="roof-rail"&&q!=="antenna"&&(Wt=!1),Yt.project(e),Yt.z>1&&(Wt=!1),Wt&&(et.style.transform=`translate(${(Yt.x+1)/2*Dt}px, ${(1-Yt.y)/2*xt}px) translate(-50%, -120%)`,T++)}et.hidden=!Wt,et.classList.toggle("sel",q===P)}i.hud(`본네트 ${Math.round(Yo.radToDeg(vt))}° · ${ft?"투시 ON":"투시 OFF"}
선택: ${P?((B=nn[P])==null?void 0:B.name)??P:"—"}
클릭 가능한 부품 ${x}종 · 이름표 ${T}개
전장 ${(We.length*1e3).toLocaleString()} · 전폭 ${(We.width*1e3).toLocaleString()} · 전고 ${(We.height*1e3).toLocaleString()} mm`)},dispose(){at(),rt.removeEventListener("pointerdown",Et),rt.removeEventListener("pointerup",zt),rt.removeEventListener("pointermove",te),rt.removeEventListener("pointerleave",j),o.dispose(),p.dispose(),g.remove(),d.remove(),A.remove()}}}))},{title:"부품 사전 — 이름을 누르면 3D에서 찾아줍니다",kind:"info",wide:!0,caption:'●●● 은 직접 해볼 수 있는 난이도입니다. ●○○ 이하는 "어디 있는지 알고, 이상하면 정비소"가 목표예요.',mount:i=>{i.body.classList.add("part-dict");const t=document.createElement("div");t.className="part-wrap",i.body.appendChild(t);const e=()=>{const o=i.params.str("pt","gas"),a=i.params.bool("awd"),c=i.params.str("sel"),u=["ext","int","bay","under"].map(h=>{const f=Object.entries(nn).filter(([,_])=>_.group===h);return`<div class="pl-group"><h5>${ro[h]} <small>${f.length}</small></h5><div class="pl-chips">${f.map(([_,g])=>{const d=oo(g,o,a);return`<button class="pl-chip ${_===c?"on":""} ${d?"":"na"}" data-id="${_}" ${d?"":`title="${ps(g)} — 파워트레인 선택에서 바꾸면 보입니다"`}><i class="d${g.diy}"></i>${hn(g.name.replace(/ \(.*\)$/,""))}</button>`}).join("")}</div></div>`}).join(""),p=c?nn[c]:void 0,m=p?`<div class="part-detail">
                <div class="pd-head"><span class="pd-g">${ro[p.group]}</span>${ps(p)?`<span class="pd-only">${ps(p)}</span>`:""}</div>
                <h4>${hn(p.name)} <small>${p.en}</small></h4>
                ${Bc(p.diy)}${p.trim?` <span class="trim">${hn(p.trim)}</span>`:""}
                <p>${hn(p.what)}</p>
                <h6>점검 · 관리 방법</h6>
                <ul>${p.check.map(h=>`<li>${hn(h)}</li>`).join("")}</ul>
                ${p.cycle?`<p class="pd-cycle">🗓 <b>주기</b> ${hn(p.cycle)}</p>`:""}
                ${p.warn?`<p class="car-warn">⚠ ${hn(p.warn)}</p>`:""}
              </div>`:'<div class="part-detail empty-d">3D 모델이나 왼쪽 목록에서 부품을 고르면 여기에 <b>무엇인지 · 점검 방법 · 주기 · 주의사항</b>이 나옵니다.<br><br>처음이라면 <button class="pl-chip" data-id="hood">본네트</button> → <button class="pl-chip" data-id="dipstick">엔진오일 게이지</button> → <button class="pl-chip" data-id="coolant">냉각수 보조탱크</button> 순서로 눌러 보세요.</div>';t.innerHTML=`<div class="part-list">${u}</div>${m}`,t.querySelectorAll("[data-id]").forEach(h=>h.addEventListener("click",()=>{var g,d;const f=h.dataset.id,_=nn[f];oo(_,i.params.str("pt","gas"),i.params.bool("awd"))||(_.only==="hev"&&i.params.set("pt","hev"),_.only==="awd"&&i.params.set("awd",!0),_.only==="lpi"&&i.params.set("pt","lpi"),_.only==="turbo"&&i.params.set("pt","gas")),i.params.set("sel",f),zc(f,i.params),(d=(g=i.body.closest(".viewers"))==null?void 0:g.querySelector(".car3d"))==null||d.scrollIntoView({behavior:"smooth",block:"center"})}))};e();const n=i.params.on(o=>{(o==="sel"||o==="pt"||o==="awd")&&e()}),s={ext:0,int:0,bay:0,under:0};for(const o of Object.values(nn))s[o.group]++;const r=Object.values(nn).filter(o=>o.diy>=2).length;return i.hud(`전체 ${Object.keys(nn).length}개 · 외관 ${s.ext} · 실내 ${s.int} · 엔진룸 ${s.bay} · 하부 ${s.under}
셀프 정비 가능(●●○ 이상) ${r}개`),{dispose(){n(),t.remove()}}}}]};export{eg as default};
