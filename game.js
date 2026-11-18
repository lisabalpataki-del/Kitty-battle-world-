(()=>{
const $=id=>document.getElementById(id);
let save={coins:0,best:0,cat:'princess',owned:['princess'],gfx:'mid',wp:'laser',wps:['laser'],done:{},dia:0,xp:0,lv:1,st:{},ach:{},up:{},eq:{},own:[],dm:null,snd:true};try{Object.assign(save,JSON.parse(localStorage.getItem('kbw')||'{}'))}catch(e){}
const store=()=>{try{localStorage.setItem('kbw',JSON.stringify(save))}catch(e){}};
$('best').textContent=save.best;$('coins').textContent=save.coins;$('coins2').textContent=save.coins;
if(typeof THREE==='undefined'){$('err').style.display='block';return}
const R=renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});

const scene=new THREE.Scene();scene.background=new THREE.Color(0xffd9ec);scene.fog=new THREE.Fog(0xffd9ec,35,120);
const cam=new THREE.PerspectiveCamera(60,1,.1,200);
const rs=()=>{R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener('resize',rs);addEventListener('orientationchange',()=>setTimeout(rs,250));rs();
scene.add(new THREE.HemisphereLight(0xfff0f8,0xd9a6ff,.95));
const sun=new THREE.DirectionalLight(0xffffff,.7);sun.position.set(30,50,20);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45});scene.add(sun);scene.add(sun.target);
const GF={low:[1,0],mid:[1.5,512],high:[2,1024]};
function applyGfx(){const f=GF[save.gfx]||GF.mid;R.setPixelRatio(Math.min(devicePixelRatio,f[0]));R.shadowMap.enabled=!!f[1];sun.castShadow=!!f[1];if(f[1]){sun.shadow.mapSize.set(f[1],f[1]);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}}scene.traverse(o=>{if(o.material)o.material.needsUpdate=true});rs()}
applyGfx();
const mesh=(g,c,x=0,y=0,z=0)=>{const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);m.castShadow=true;return m};
const rnd=(a,b)=>a+Math.random()*(b-a);
const sm=new Map(),SM=c=>{if(!sm.has(c))sm.set(c,new THREE.MeshLambertMaterial({color:c}));return sm.get(c)};
const sp=(g,c,x,y,z)=>{const m=new THREE.Mesh(g,SM(c));m.position.set(x,y,z);return m};
const GCH=new Map(),GC=(k,f)=>{if(!GCH.has(k))GCH.set(k,f());return GCH.get(k)};
const GRAD=new THREE.DataTexture(new Uint8Array([110,180,255]),3,1,THREE.RedFormat);GRAD.minFilter=GRAD.magFilter=THREE.NearestFilter;GRAD.needsUpdate=true;
const TMc=new Map(),TM=c=>{if(!TMc.has(c))TMc.set(c,new THREE.MeshToonMaterial({color:c,gradientMap:GRAD}));return TMc.get(c)};
const OUT=new THREE.MeshBasicMaterial({color:0x7a2d6b,side:THREE.BackSide});
const gs=(r,w=10,h=8)=>GC('S'+r+'_'+w+'_'+h,()=>new THREE.SphereGeometry(r,w,h)),gk=(r,h,n=8)=>GC('K'+r+'_'+h+'_'+n,()=>new THREE.ConeGeometry(r,h,n)),gy=(a,b,h,n=10)=>GC('Y'+a+'_'+b+'_'+h+'_'+n,()=>new THREE.CylinderGeometry(a,b,h,n)),go=r=>GC('O'+r,()=>new THREE.OctahedronGeometry(r));
const cm=(geo,c,x,y,z,ol=1)=>{const m=new THREE.Mesh(geo,TM(c));m.position.set(x,y,z);m.castShadow=!!ol;if(ol){const o=new THREE.Mesh(geo,OUT);o.scale.setScalar(1.09);m.add(o)}return m};
const spin=[],bobs=[],butter=[],deco=[];
const fin=o=>o.traverse(c=>{c.updateMatrix();c.matrixAutoUpdate=false});

const G=new THREE.Mesh(new THREE.PlaneGeometry(700,400),new THREE.MeshLambertMaterial({color:0xffb6d9}));G.rotation.x=-Math.PI/2;G.position.x=25;G.receiveShadow=true;scene.add(G);
for(const r of [0,Math.PI/2]){const p=new THREE.Mesh(new THREE.PlaneGeometry(10,680),new THREE.MeshLambertMaterial({color:0xd8c4e8}));p.rotation.x=-Math.PI/2;p.rotation.z=r;p.position.y=.03;scene.add(p)}
const pal=[0xffffff,0xffd1e8,0xe6ccff,0xffb3d1,0xf5e1ff],blds=[],sway=[],clouds=[];
const heartTop=(x,y,z)=>{const h=new THREE.Group();h.position.set(x,y,z);const c=cm(gk(.42,.6,6),0xff3d7f,0,-.2,0,0);c.rotation.x=Math.PI;h.add(cm(gs(.28,8,6),0xff3d7f,-.18,.1,0,0),cm(gs(.28,8,6),0xff3d7f,.18,.1,0,0),c);scene.add(h);spin.push(h);deco.push(h)};
function house(x,z,k,col,w,h,rc=0xff6fb0){const g=new THREE.Group();g.position.set(x,0,z);const r=w/2;let top=h;
 if(k===0){g.add(cm(gy(r,r*1.05,h,14),col,0,h/2,0),cm(gk(r*1.25,r*1.5,14),rc,0,h+r*.75,0));top=h+r*1.5}
 else if(k===1){g.add(cm(GC('B'+w+'_'+h,()=>new THREE.BoxGeometry(w,h,w)),col,0,h/2,0));const d=cm(gs(r*1.2,14,10),rc,0,h,0);d.scale.y=.75;g.add(d);top=h+r*.9}
 else{g.add(cm(gy(r,r*1.1,h*.6,14),col,0,h*.3,0),cm(gy(r*.72,r*.8,h*.5,14),0xffd1e8,0,h*.85,0),cm(gk(r*.95,r*1.4,14),0xb36bff,0,h*1.1+r*.7,0));top=h*1.1+r*1.4}
 const fz=k===0?r*1.03+.05:k===1?r+.05:r*1.05+.05,wy=k===2?h*.3:h*.65;
 const dr=cm(gs(.9,8,6),0xff8ac0,0,1.2,fz,0);dr.scale.set(.9,1.3,.25);g.add(dr);
 const win=(px,pz,side)=>{const m=cm(gy(.6,.6,.2,10),0xfff3b0,px,wy,pz,0);m.rotation.set(side?0:Math.PI/2,0,side?Math.PI/2:0);g.add(m);deco.push(m)};
 win(-r*.5,fz,0);win(r*.5,fz,0);win(fz,0,1);
 fin(g);scene.add(g);if(k!==1||Math.random()<.5)heartTop(x,top+.8,z)}
function tree(x,z,leaf,sc=1){const t=new THREE.Group();t.position.set(x,0,z);t.scale.setScalar(sc);t.add(cm(gy(.35,.5,2.6,8),0x9a6b52,0,1.3,0),cm(gs(1.5,10,8),leaf,0,3.6,0),cm(gs(1.1,10,8),leaf,.9,3.2,.3),cm(gs(1.1,10,8),leaf,-.8,3.3,-.4));scene.add(t);sway.push(t);blds.push({x,z,r:sc});return t}
function balloon(x,z,col){const b=new THREE.Group();b.position.set(x,5,z);const s=cm(gs(.9,10,8),col,0,2.2,0,0);s.scale.y=1.2;b.add(s,sp(gy(.03,.03,2.2,4),0xffffff,0,1.1,0));scene.add(b);bobs.push({o:b,y:5+Math.random()*3,a:.5,s:1.2+Math.random(),p:Math.random()*6});deco.push(b)}
function butterfly(cx,cz,r){const g=new THREE.Group(),col=[0xff9ecb,0xc58bff,0xffe36b,0x7fe0ff][butter.length%4],wp=[];for(const s of[-1,1]){const p=new THREE.Group(),w=sp(gs(.28,6,4),col,s*.25,0,0);w.scale.set(1,.12,.8);p.add(w);g.add(p);wp.push(p)}g.add(sp(gs(.09,6,6),0x5a3a5a,0,0,0));scene.add(g);butter.push({g,wp,cx,cz,cy:2.5+Math.random()*2,r,s:.4+Math.random()*.4,p:Math.random()*6});deco.push(g)}
const fl0=gs(.3,6,6),FC=[0xff9ecb,0xffffff,0xc58bff,0xffe36b];
for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){if(!i||!j)continue;
 const w=8+Math.random()*4,h=6+Math.random()*9,x=i*22,z=j*22;
 house(x,z,(i*7+j*3+20)%3,pal[(i*3+j+20)%5],w,h);blds.push({x,z,r:w/2+.9});
 tree(x+11,z+11,0xff9ecb);
 for(let k=0;k<4;k++){const f=sp(fl0,FC[k],x+13+k*.8,.3,z+9+k*.5);f.userData.y=.3;scene.add(f);sway.push(f);deco.push(f)}
 if(Math.random()<.3)balloon(x+w/2+2,z+rnd(-3,3),FC[(i+j+8)%4])}
for(let i=0;i<12;i++)butterfly(rnd(-60,60),rnd(-60,60),rnd(3,8));
for(let i=0;i<18;i++){const c=new THREE.Group();for(let k=0;k<3;k++)c.add(mesh(new THREE.SphereGeometry(3-k*.5,8,6),0xffffff,k*3,0,0));c.position.set(Math.random()*660-330,30+Math.random()*10,Math.random()*300-150);scene.add(c);clouds.push(c)}
const chests=[],fount=[];
let tt=0;const toast=m=>{const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>t.style.opacity=0,1800)};
const fg=new THREE.Mesh(new THREE.PlaneGeometry(150,400),SM(0xc9f2c0));fg.rotation.x=-Math.PI/2;fg.position.set(155,.02,0);fg.receiveShadow=true;scene.add(fg);
const rv=new THREE.Mesh(new THREE.PlaneGeometry(9,400),new THREE.MeshLambertMaterial({color:0x8fd3ff,transparent:true,opacity:.8}));rv.rotation.x=-Math.PI/2;rv.position.set(100,.05,0);scene.add(rv);
scene.add(sp(new THREE.BoxGeometry(12,.4,10),0xe9a3c9,100,.25,0));
for(const s of[-1,1])scene.add(sp(new THREE.BoxGeometry(12,.9,.3),0xffffff,100,.8,s*5));
for(let i=0;i<80;i++){const x=rnd(112,227),z=rnd(-190,190);if(Math.abs(z)<8)continue;tree(x,z,[0x7fd6a0,0xff9ecb,0xb7e8c8][i%3],rnd(.9,1.4))}
function berry(x,z){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rnd(-.6,.6);const b=cm(gs(3,14,10),0xff4d6d,0,3.2,0);b.scale.y=1.2;g.add(b);
 for(let k=0;k<5;k++){const a=(k%3-1)*.7,dy=-2.4+(k>>1)*.9,rr=Math.sqrt(9-(dy/1.2)**2);g.add(sp(gs(.16,4,4),0xffe36b,Math.sin(a)*rr,3.2+dy,Math.cos(a)*rr))}
 for(const s of[-1,1]){g.add(cm(gs(.34,8,6),0x3a2040,s*1.0,3.9,2.7,0),cm(gs(.12,6,6),0xffffff,s*1.08,4.05,3.0,0));const bl=cm(gs(.4,8,6),0xff9ecb,s*1.7,3.2,2.3,0);bl.scale.set(1,.55,.4);g.add(bl)}
 const mo=cm(gs(.35,8,6),0x7a2d4b,0,3.0,2.9,0);mo.scale.set(1.3,.5,.3);g.add(mo);
 for(let k=0;k<3;k++){const l=sp(gk(.5,1.4,5),0x4cc36b,Math.sin(k*2.1)*.9,6.6,Math.cos(k*2.1)*.9);l.rotation.set(Math.cos(k*2.1)*.6,0,-Math.sin(k*2.1)*.6);g.add(l)}
 fin(g);scene.add(g);blds.push({x,z,r:3.6})}
for(let i=0;i<12;i++)berry(rnd(115,215),(i%2?-1:1)*rnd(14,170));
for(let i=0;i<6;i++){const x=rnd(118,215),z=(i%2?-1:1)*rnd(20,160);house(x,z,i%3,[0xffe4f1,0xfff0c8,0xe6ccff][i%3],5,4.5,0xff5f7f);blds.push({x,z,r:4.2})}
for(let i=0;i<16;i++){const x=rnd(110,225),z=rnd(-185,185);if(Math.abs(z)<7)continue;const g=new THREE.Group();g.position.set(x,0,z);g.scale.setScalar(rnd(.8,1.5));const c=cm(gs(1,10,6),0xff5f7f,0,1.25,0);c.scale.y=.65;g.add(cm(gy(.35,.45,1.1,8),0xfff3e6,0,.55,0),c);for(let k=0;k<3;k++)g.add(sp(gs(.14,5,5),0xffffff,Math.cos(k*2.1)*.5,1.6,Math.sin(k*2.1)*.5));fin(g);scene.add(g)}
for(let i=0;i<80;i++){const f=sp(fl0,FC[i%4],rnd(108,225),.3,rnd(-190,190));f.userData.y=.3;scene.add(f);sway.push(f);deco.push(f)}
for(let i=0;i<10;i++)butterfly(rnd(120,220),rnd(-150,150),rnd(3,8));
function chest(x,z){const c=new THREE.Group();c.position.set(x,0,z);c.add(sp(new THREE.BoxGeometry(1.4,.9,1),0x9a6b52,0,.45,0),sp(new THREE.BoxGeometry(1.5,.4,1.1),0xffd84a,0,1.05,0));scene.add(c);chests.push(c)}
for(let i=0;i<8;i++)chest(rnd(120,220),(i%2?-1:1)*rnd(15,170));
for(const[i,j]of[[-1,-1],[1,-1],[-1,1],[1,1]])chest(i*22+14,j*22+11);
scene.add(sp(new THREE.CylinderGeometry(2.4,2.6,.7,16),0xffffff,11,.35,11),sp(new THREE.CylinderGeometry(2,2,.1,16),0x8fd3ff,11,.7,11),sp(new THREE.CylinderGeometry(.3,.4,2,8),0xffd1e8,11,1.5,11));
for(let i=0;i<6;i++){const s=sp(new THREE.SphereGeometry(.18,6,6),0x8fd3ff,11,1.5,11);scene.add(s);fount.push(s)}
blds.push({x:11,z:11,r:3});
const cg=new THREE.Mesh(new THREE.PlaneGeometry(250,400),SM(0xfff0d0));cg.rotation.x=-Math.PI/2;cg.position.set(-205,.02,0);cg.receiveShadow=true;scene.add(cg);
for(let i=0;i<70;i++){const z=rnd(-190,190);if(Math.abs(z)<6)continue;const m=sp(gy(1,1,.02,10),[0xff9ecb,0xffe36b,0x9fe8ff,0xc58bff,0xb7f0c8][i%5],rnd(-325,-85),.05,z);m.scale.set(rnd(1,3),1,rnd(1,3));scene.add(m);fin(m)}
const rv2=new THREE.Mesh(new THREE.PlaneGeometry(9,400),new THREE.MeshLambertMaterial({color:0xffb3e6,transparent:true,opacity:.8}));rv2.rotation.x=-Math.PI/2;rv2.position.set(-100,.05,0);scene.add(rv2);
for(let k=0;k<6;k++){const m=sp(GC('BB',()=>new THREE.BoxGeometry(2,.4,10)),k%2?0xffffff:0xff7eb6,-100+(k-2.5)*2,.25,0);scene.add(m);fin(m)}
function pop(x,z){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rnd(0,6.28);const c=[0xff7eb6,0xb36bff,0x6bd6ff,0xffe36b][Math.random()*4|0],d=cm(gs(1.7,12,8),c,0,4.4,0);d.scale.z=.3;const sw=sp(gs(1.2,10,6),0xffffff,0,4.4,.5);sw.scale.set(1,1,.12);g.add(cm(gy(.18,.18,3.4,6),0xffffff,0,1.7,0),d,sw);scene.add(g);sway.push(g);blds.push({x,z,r:.7})}
for(let i=0;i<45;i++){const x=rnd(-320,-112),z=rnd(-190,190);if(Math.abs(z)<8)continue;pop(x,z)}
for(let i=0;i<10;i++){const x=rnd(-300,-120),z=(i%2?-1:1)*rnd(20,170);house(x,z,i%3,[0xfff0f8,0xffe1f0,0xe0f7ff][i%3],6,5.5,[0xff7eb6,0x6bd6ff,0xffe36b][i%3]);blds.push({x,z,r:5})}
for(let i=0;i<5;i++){const x=rnd(-300,-125),z=(i%2?-1:1)*rnd(25,160),g=new THREE.Group();g.position.set(x,0,z);const t=cm(GC('TD',()=>new THREE.TorusGeometry(3.2,1.3,10,18)),0xe0a060,0,1,0),ic=sp(GC('TI',()=>new THREE.TorusGeometry(3.2,1.0,8,18)),0xff9ecb,0,1.5,0);t.rotation.x=ic.rotation.x=Math.PI/2;g.add(t,ic);for(let k=0;k<6;k++)g.add(sp(gs(.14,4,4),[0xffffff,0xffe36b,0x9fe8ff][k%3],Math.cos(k*1.05)*3.2,2.3,Math.sin(k*1.05)*3.2));fin(g);scene.add(g);blds.push({x,z,r:4.6})}
for(let i=0;i<40;i++){const f=sp(gs(.9,8,6),[0xff9ecb,0xffe36b,0x9fe8ff,0xb7f0c8][i%4],rnd(-320,-110),.3,rnd(-190,190));f.scale.y=.7;scene.add(f);fin(f);deco.push(f)}
for(let i=0;i<8;i++)chest(rnd(-290,-115),(i%2?-1:1)*rnd(15,170));
for(let i=0;i<8;i++)butterfly(rnd(-300,-120),rnd(-150,150),rnd(3,8));
const falls=[],RB=[0xff5f5f,0xff9f5f,0xffe36b,0x7fe08a,0x6bd6ff,0xb08aff,0xff9ecb],CZ=-335;
const oc=new THREE.Mesh(new THREE.PlaneGeometry(420,260),new THREE.MeshLambertMaterial({color:0x8fd3ff,transparent:true,opacity:.8}));oc.rotation.x=-Math.PI/2;oc.position.set(0,.02,-325);scene.add(oc);
const bch=new THREE.Mesh(new THREE.CircleGeometry(102,48),SM(0xfff0c8));bch.rotation.x=-Math.PI/2;bch.position.set(0,.04,CZ);scene.add(bch);
const isl=new THREE.Mesh(new THREE.CircleGeometry(95,48),SM(0xc8f5e0));isl.rotation.x=-Math.PI/2;isl.position.set(0,.06,CZ);isl.receiveShadow=true;scene.add(isl);
for(let k=0;k<7;k++){const m=sp(GC('RBR',()=>new THREE.BoxGeometry(1.43,.4,50)),RB[k],(k-3)*1.43,.3,-220);scene.add(m);fin(m)}
for(let k=0;k<7;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(8+k*.9,.45,6,28,Math.PI),SM(RB[k]));t.position.set(0,0,-250);scene.add(t);fin(t)}
for(const[x,z,s]of[[-42,-345,16],[44,-335,19]])for(let k=0;k<7;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(s+k*.9,.5,6,28,Math.PI),SM(RB[k]));t.position.set(x,0,z);t.rotation.y=x<0?.5:-.4;scene.add(t);fin(t)}
const rp=(a,b)=>{for(let n=0;n<30;n++){const an=rnd(0,6.28),r=rnd(a,b),x=Math.cos(an)*r,z=CZ+Math.sin(an)*r;if(z<-262)return[x,z]}return[0,-380]};
for(let i=0;i<60;i++){const[x,z]=rp(5,88),m=sp(gy(1,1,.02,10),RB[i%7],x,.09,z);m.scale.set(rnd(1,3),1,rnd(1,3));scene.add(m);fin(m)}
function mountain(x,z,r,h,col){const g=new THREE.Group();g.position.set(x,0,z);g.add(cm(gk(r,h,9),col,0,h/2,0),sp(gk(r*.38,h*.3,9),0xffffff,0,h*.85,0));scene.add(g);fin(g);blds.push({x,z,r:r*.75})}
function waterfall(x,z,r,h){const th=Math.atan(r/h),L=Math.hypot(h*.75,r*.75),w=new THREE.Mesh(GC('WF',()=>new THREE.BoxGeometry(3,1,.5)),new THREE.MeshLambertMaterial({color:0xbfeaff,transparent:true,opacity:.8}));w.scale.y=L;w.rotation.x=-th;w.position.set(x,h*.39,z+r*.58+.5);scene.add(w);fin(w);
 const p=sp(gy(1,1,.05,16),0x8fd3ff,x,.1,z+r*.95+4);p.scale.set(7,1,6);scene.add(p);fin(p);
 for(let k=0;k<6;k++){const m=sp(gs(.35,6,5),0xffffff,x,5,z);scene.add(m);falls.push({m,x,tz:z+r*.2+.8,ty:h*.8,bz:z+r*.95+.8,by:.4,s:k/6,v:.35+Math.random()*.1});deco.push(m)}}
[[-60,-395,18,38,0xc9b8ff],[-25,-405,20,45,0xb8d0ff],[15,-400,22,50,0xe0c8ff],[55,-390,17,36,0xffc9e8],[-75,-355,14,28,0xb8f0d8],[78,-360,14,30,0xc9b8ff]].forEach((q,i)=>{mountain(q[0],q[1],q[2],q[3],q[4]);if(i===1||i===2)waterfall(q[0],q[1],q[2],q[3])});
function cryst(x,z,col,s){const g=new THREE.Group();g.position.set(x,0,z);const a=cm(go(1),col,0,2.6*s,0);a.scale.set(1.2*s,3*s,1.2*s);const b=cm(go(1),0xffffff,1.4*s,1.3*s,.5*s);b.scale.set(.7*s,1.8*s,.7*s);g.add(a,b);scene.add(g);fin(g);blds.push({x,z,r:1.6*s})}
for(let i=0;i<8;i++){const[x,z]=rp(25,80);cryst(x,z,RB[i%7],rnd(.8,1.3))}
for(let i=0;i<6;i++){const[x,z]=rp(20,75);house(x,z,i%3,[0xffffff,0xe6ccff,0xffe1f0][i%3],6,5.5,RB[i]);blds.push({x,z,r:5})}
for(let i=0;i<40;i++){const[x,z]=rp(10,88);tree(x,z,RB[i%7],rnd(.9,1.3))}
function islet(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);const d=cm(gs(4,10,6),0xc8f5e0,0,0,0);d.scale.y=.4;const c=cm(gk(2.2,3,8),0xc8a8ff,0,-2.2,0);c.rotation.x=Math.PI;g.add(d,c,cm(gy(.2,.25,1.4,6),0x9a6b52,0,1.2,0),cm(gs(1.1,8,6),RB[Math.random()*7|0],0,2.4,0));scene.add(g);bobs.push({o:g,y,a:1.2,s:.8+Math.random()*.5,p:Math.random()*6});deco.push(g)}
for(let i=0;i<6;i++){const[x,z]=rp(10,85);islet(x,rnd(14,24),z)}
for(let i=0;i<30;i++){const[x,z]=rp(5,90),m=sp(go(.35),0xffe36b,x,2,z);scene.add(m);bobs.push({o:m,y:rnd(2,10),a:.6,s:1+Math.random(),p:Math.random()*6});spin.push(m);deco.push(m)}
function rchest(x,z){const c=new THREE.Group();c.position.set(x,0,z);c.userData.rare=1;c.add(cm(GC('BX',()=>new THREE.BoxGeometry(1.8,1.1,1.3)),0xffd84a,0,.55,0),cm(GC('BL',()=>new THREE.BoxGeometry(1.9,.5,1.4)),0xff7eb6,0,1.3,0),sp(go(.35),0x7fe0ff,0,2.1,0));scene.add(c);chests.push(c)}
for(let i=0;i<6;i++){const[x,z]=rp(15,85);rchest(x,z)}
for(let i=0;i<4;i++){const[x,z]=rp(15,85);chest(x,z)}
for(let i=0;i<60;i++){const[x,z]=rp(5,90),f=sp(fl0,RB[i%7],x,.3,z);f.userData.y=.3;scene.add(f);sway.push(f);deco.push(f)}
for(let i=0;i<8;i++){const[x,z]=rp(10,80);butterfly(x,z,rnd(3,8))}
let zone='';
const CATS=[
{id:'princess',name:'Princess Kitty',c:0xffffff,a:0xff5fa8,o:0xffb6d9,acc:'crown',cost:0,desc:'Weiße Katze mit Krone und rosa Kleid.'},
{id:'magic',name:'Magic Kitty',c:0xe6ccff,a:0x9b5de5,o:0x7a3fc9,acc:'star',cost:50,desc:'Lila Zauberkatze mit Stern.'},
{id:'ice',name:'Ice Kitty',c:0xcdeeff,a:0x5ec8ff,o:0x7ad0ff,acc:'horn',cost:100,desc:'Eisblaue Katze mit Kristallhorn.'},
{id:'fire',name:'Fire Kitty',c:0xffc9a0,a:0xff4d2e,o:0xff7a30,acc:'flame',cost:120,desc:'Orange Katze mit Flammenkopf.'},
{id:'shadow',name:'Shadow Kitty',c:0x6b5b8f,a:0xff5fa8,e:0xffe36b,o:0x2a2040,acc:'none',cost:150,desc:'Dunkle Katze mit leuchtenden Augen.'},
{id:'angel',name:'Angel Kitty',c:0xffffff,a:0xffe36b,o:0xfff3c0,acc:'halo wings',cost:150,desc:'Weiße Engelkatze mit Heiligenschein und Flügeln.'},
{id:'dark',name:'Dark Kitty',c:0x3b2f4f,a:0xb01c5a,e:0xff3d7f,o:0x1a1226,acc:'devil',cost:200,desc:'Schwarze Katze mit kleinen Hörnern.'},
{id:'star',name:'Star Kitty',c:0xfff3b0,a:0x6b8cff,o:0x4a63d6,acc:'star',cost:250,desc:'Sternenkatze in Blau und Gelb.'},
{id:'warrior',name:'Pink Warrior',c:0xffc2e0,a:0xff2e7e,o:0xd81b60,acc:'band',cost:300,desc:'Kämpferin mit Stirnband.'},
{id:'rainbow',name:'Rainbow Kitty',c:0xfff0ff,a:0xff9ecb,o:0xa0e7ff,acc:'rainbow',cost:400,desc:'Bunte Katze mit Regenbogenkugeln.'},
{id:'crystal',name:'Crystal Kitty',c:0xb8f3ff,a:0x7ae0e0,o:0x4fc3d9,acc:'crystal',cost:500,desc:'Türkise Katze mit Kristall.'},
{id:'golden',name:'Golden Kitty',c:0xffd84a,a:0xffffff,o:0xe0a800,acc:'crown',cost:700,desc:'Goldene Katze, die seltenste von allen.'}];
function cat(d){d=d||CATS[0];const g=new THREE.Group(),W=d.c,P=d.a,A=d.acc||'',E=d.e||0x3a2040;
 g.add(cm(gs(.62,14,10),W,0,.8,0));
 const head=new THREE.Group();head.name='head';head.position.y=1.9;g.add(head);
 const hm=cm(gs(.8,18,14),W,0,0,0);hm.scale.x=1.1;head.add(hm);
 for(const s of[-1,1]){
  const ear=new THREE.Group();ear.name='ear'+s;ear.position.set(s*.5,.5,0);ear.rotation.z=-s*.25;ear.add(cm(gk(.27,.6,6),W,0,.25,0),cm(gk(.14,.34,6),0xffb6d9,0,.2,.08,0));head.add(ear);
  const eye=new THREE.Group();eye.name='eye'+s;eye.position.set(s*.33,.05,.74);eye.add(cm(gs(.15,10,8),E,0,0,0,0),cm(gs(.05,6,6),0xffffff,.05,.06,.12,0));head.add(eye);
  const bl=cm(gs(.13,8,6),0xff9ecb,s*.52,-.18,.6,0);bl.scale.set(1,.55,.35);head.add(bl);
  const arm=new THREE.Group();arm.name='arm'+s;arm.position.set(s*.6,1.15,.1);arm.add(cm(gs(.2,8,6),W,0,-.22,0));g.add(arm);
  const leg=cm(gs(.22,8,6),W,s*.3,.22,.1);leg.name='leg'+s;g.add(leg)}
 head.add(cm(gs(.07,6,6),0xff6fa8,0,-.1,.8,0));
 for(const x of[-.68,-.32]){const w=cm(gs(.14,8,6),P,x,.62,.35);w.scale.set(1,.8,.6);head.add(w)}head.add(cm(gs(.09,6,6),P,-.5,.62,.4));
 const tail=new THREE.Group();tail.name='tail';tail.position.set(0,.55,-.55);[[0,0,-.1,.2],[0,.2,-.3,.17],[0,.42,-.38,.14]].forEach(([x,y,z,r],i)=>tail.add(cm(gs(r,8,6),i===2?P:W,x,y,z)));g.add(tail);
 const H=(...m)=>head.add(...m);
 if(A.includes('crown'))H(cm(gk(.34,.4,5),0xffd84a,0,.98,0));
 if(A.includes('star'))H(cm(go(.24),0xffe36b,0,1.08,0));
 if(A.includes('horn'))H(cm(gk(.1,.55,6),0x9fe8ff,0,1.08,0));
 if(A.includes('flame'))H(cm(gk(.22,.6,5),0xff7a30,0,1.05,0),cm(gk(.15,.5,5),0xffd84a,.2,1.0,0));
 if(A.includes('halo')){const h=cm(GC('T',()=>new THREE.TorusGeometry(.38,.05,6,18)),0xffd84a,0,1.2,0,0);h.rotation.x=Math.PI/2;H(h)}
 if(A.includes('wings'))for(const s of[-1,1]){const w=cm(gs(.45,8,6),0xffffff,s*.55,1.2,-.5);w.scale.set(.25,1,.6);w.rotation.z=s*.4;g.add(w)}
 if(A.includes('devil'))for(const s of[-1,1]){const h=cm(gk(.09,.38,5),0xb01c5a,s*.2,.92,.1);h.rotation.z=-s*.3;H(h)}
 if(A.includes('band'))H(cm(gy(.72,.72,.14,14),0xff2e7e,0,.42,0));
 if(A.includes('rainbow'))[0xff5f5f,0xffe36b,0x6bd6ff].forEach((c,i)=>H(cm(gs(.13,6,6),c,(i-1)*.25,.9,0)));
 if(A.includes('crystal')){const c=cm(go(.3),0x7ae0e0,0,1.1,0);c.scale.y=1.6;H(c)}
 if(d.o)g.add(cm(gy(.5,.82,.45,12),d.o,0,.45,0));
 if(d.x==='glasses')H(cm(GC('B',()=>new THREE.BoxGeometry(.95,.2,.1)),0x222233,0,.05,.84,0));
 if(d.x==='hat')H(cm(gy(.35,.4,.55),0x2a2040,0,1.15,0),cm(gy(.62,.62,.06,14),0x2a2040,0,.88,0));
 if(d.x==='scarf'){const s=cm(GC('T2',()=>new THREE.TorusGeometry(.55,.12,6,14)),0xff5f5f,0,1.25,0);s.rotation.x=Math.PI/2;g.add(s)}
 return g}
function animCat(g,t,mv,sh){const r=g.userData.rig||(g.userData.rig={head:g.getObjectByName('head'),tail:g.getObjectByName('tail'),eL:g.getObjectByName('ear-1'),eR:g.getObjectByName('ear1'),yL:g.getObjectByName('eye-1'),yR:g.getObjectByName('eye1'),aL:g.getObjectByName('arm-1'),aR:g.getObjectByName('arm1')});
 if(!r.head)return;
 r.head.position.y=1.9+Math.sin(t*(mv?14:2.5))*.03;r.head.rotation.z=Math.sin(t*1.7)*.05;
 r.tail.rotation.y=Math.sin(t*(mv?9:4))*.5;r.tail.rotation.x=-.2+Math.sin(t*2)*.08;
 const f1=Math.pow(Math.max(0,Math.sin(t*2.1)),14)*.5,f2=Math.pow(Math.max(0,Math.sin(t*1.7+2)),14)*.5,w=mv?Math.sin(t*14)*.08:0;
 r.eL.rotation.z=.25+f1+w;r.eR.rotation.z=-.25-f2-w;
 r.yL.scale.y=r.yR.scale.y=(t%3.7)<.13?.1:1;
 const sw=mv?Math.sin(t*10)*.8:Math.sin(t*2)*.1;
 if(sh){r.aL.rotation.x=r.aR.rotation.x=-1.4}else{r.aL.rotation.x=sw;r.aR.rotation.x=-sw}
 r.aL.rotation.z=-.25;r.aR.rotation.z=.25}
const CAT=()=>{const d=CATS.find(c=>c.id===save.cat)||CATS[0],e=save.eq||{};return Object.assign({},d,e.col!=null?{c:e.col}:{},e.out!=null?{o:e.out}:{},{x:e.acc||''})};
const P={g:cat(CAT()),x:0,z:0,y:0,vy:0,hp:5,ammo:12,rel:0,inv:0,dash:0,cd:0,face:0,spc:0,spd:0};scene.add(P.g);
let yaw=0,kills=0,score=0,coins=0,over=false,running=false,t0=0;
const en=[],bl=[],ik={},st={x:0,y:0};
const hud=()=>{$('hp').textContent=Math.max(0,P.hp);$('ammo').textContent=P.rel>0?'…':P.ammo;$('score').textContent=score;$('coins').textContent=save.coins+coins;$('kills').textContent=kills;if(AR&&AR.mode==='boss'){const b=en.find(x=>x.userData.t.b==='boss');$('bf').style.width=(b?Math.max(0,b.userData.hp/b.userData.t.hp*100):0)+'%'}$('bSpec').textContent=P.spc>0?Math.ceil(P.spc):SPN[SPECIAL[save.cat]||'nova'][1]};
const BM=new Map(),bm=c=>{if(!BM.has(c)){const m=new THREE.MeshLambertMaterial({color:c});m.emissive.setHex(c);BM.set(c,m)}return BM.get(c)};
const bsp=(r,c)=>new THREE.Mesh(GC('bs'+r,()=>new THREE.SphereGeometry(r,8,8)),bm(c));
const BARBG=new THREE.SpriteMaterial({color:0x4a2a4a,depthTest:false}),BARFL=new THREE.SpriteMaterial({color:0xff4d9a,depthTest:false});
const ET=[
{n:'Schattenkatze',k:'cat',c:0x3b2f4f,hp:2,sp:5.5,r:.8,b:'chase',z:'c',w:3,ear:1},
{n:'Roboter',k:'robot',c:0x9aa7b8,hp:4,sp:3,r:.9,b:'shoot',z:'c',w:2,fr:2,keep:12,sq:1},
{n:'Dunkler Hase',k:'hare',c:0x5b3a8a,hp:3,sp:4.5,r:.8,b:'dodge',z:'c',w:2,ear:2},
{n:'Magier',k:'mage',c:0xb36bff,hp:3,sp:2.5,r:.8,b:'shoot',z:'c',w:1.5,fr:2.6,keep:16,bs:9},
{n:'Erdbeer-Monster',k:'berry',c:0xff4d6d,hp:3,sp:4,r:.9,b:'chase',z:'f',w:3},
{n:'Monster',k:'monster',c:0x6fd68a,hp:6,sp:2.8,r:1.2,b:'chase',z:'f',w:1.5},
{n:'Feuergegner',k:'fire',c:0xff8a3d,hp:4,sp:3.5,r:.9,b:'charge',z:'f',w:2},
{n:'Eisgegner',k:'ice',c:0x9fdcff,hp:4,sp:2.8,r:.9,b:'shoot',z:'f',w:2,fr:1.8,keep:13,bs:11},
{n:'Gummi-Hüpfer',k:'frog',c:0xff8ac0,hp:2,sp:5,r:.8,b:'hop',z:'b',w:2},
{n:'Wächter',k:'golem',c:0x8a8aa8,hp:12,sp:1.8,r:1.6,b:'chase',z:'b',w:.4,dmg:2,sq:1},
{n:'Lutscher-Krieger',k:'wrap',c:0xff5fa8,hp:4,sp:3.6,r:.9,b:'charge',z:'d',w:2},
{n:'Schoko-Golem',k:'golem',c:0x8a5a44,hp:8,sp:2.2,r:1.3,b:'chase',z:'d',w:1,dmg:2,sq:1},
{n:'Zuckerguss-Schütze',k:'cupcake',c:0xfff0f8,hp:3,sp:3,r:.8,b:'shoot',z:'d',w:2,fr:1.7,keep:12,bs:12},
{n:'Gummibär',k:'bear',c:0x7fe0a0,hp:3,sp:4.5,r:.9,b:'dodge',z:'d',w:2,ear:1},
{n:'Wolkengeist',k:'ghost',c:0xffffff,hp:3,sp:3,r:.9,b:'shoot',z:'r',w:2,fr:2,keep:13,bs:10},
{n:'Kristall-Golem',k:'golem',c:0x9fe8ff,hp:9,sp:2.2,r:1.4,b:'chase',z:'r',w:1.2,dmg:2},
{n:'Regenbogen-Vogel',k:'bird',c:0xff7eb6,hp:3,sp:5,r:.8,b:'dodge',z:'r',w:2}];
const ebl=[];
const UG={s:()=>GC('us',()=>new THREE.SphereGeometry(1,12,9)),c:()=>GC('uc',()=>new THREE.ConeGeometry(1,1,10)),y:()=>GC('uy',()=>new THREE.CylinderGeometry(1,1,1,10)),o:()=>GC('uo',()=>new THREE.OctahedronGeometry(1))};
function build(specs,g,mats,piv){const P={},mm=new Map();
 for(const q of specs){if(q[0]==='P'){const w=new THREE.Group();w.position.set(q[2],q[3],q[4]);w.userData={k:q[1][0],ph:q[5]||0};g.add(w);P[q[1]]=w;piv.push(w);continue}
  const[sh,col,x,y,z,sx,sy,sz,f={}]=q;let mt=mm.get(col);if(!mt){mt=new THREE.MeshToonMaterial({color:col,gradientMap:GRAD});mm.set(col,mt);mats.push(mt)}
  const m=new THREE.Mesh(UG[sh](),mt);m.position.set(x,y,z);m.scale.set(sx,sy,sz);if(f.r)m.rotation.set(f.r[0],f.r[1],f.r[2]);m.castShadow=f.o!==0;
  if(f.o!==0){const o=new THREE.Mesh(UG[sh](),OUT);o.scale.setScalar(1.12);m.add(o)}
  (f.p?P[f.p]:g).add(m)}}
const EY=(p,x,y,z,s,c=0xffffff,pc=0x221133)=>[['s',c,x,y,z,s,s,s*.7,{o:0,p}],['s',pc,x,y,z+s*.55,s*.55,s*.55,s*.3,{o:0,p}]];
const LG=(n,c,x,y,z,l,t,ph)=>[['P','L'+n,x,y,z,ph],['y',c,0,-l/2,0,t,l,t,{p:'L'+n}],['s',c,0,-l,t*.5,t*1.4,t*.8,t*1.7,{p:'L'+n}]];
const AM=(n,c,x,y,z,l,t,ph,h)=>[['P','A'+n,x,y,z,ph],['y',c,0,-l/2,0,t,l,t,{p:'A'+n}],['s',h||c,0,-l,0,t*1.5,t*1.5,t*1.5,{p:'A'+n}]];
const PI=Math.PI,FG=(p)=>['c',0xffffff,0,0,0,.04,.12,.04,{o:0,p,r:[PI,0,0]}];
const KS={
cat:t=>{const c=t.c,a=0x6b5b8f;return[['s',c,0,.8,0,.5,.45,.85,{}],['P','H',0,1.0,.75],['s',c,0,0,0,.45,.42,.4,{p:'H'}],['c',c,-.28,.42,0,.16,.38,.12,{p:'H'}],['c',c,.28,.42,0,.16,.38,.12,{p:'H'}],['s',0xffe36b,-.2,.06,.34,.12,.16,.06,{o:0,p:'H'}],['s',0xffe36b,.2,.06,.34,.12,.16,.06,{o:0,p:'H'}],['c',0xffffff,-.12,-.2,.4,.04,.14,.04,{o:0,p:'H',r:[PI,0,0]}],['c',0xffffff,.12,-.2,.4,.04,.14,.04,{o:0,p:'H',r:[PI,0,0]}],['P','T',0,.95,-.75],['s',c,0,.1,-.3,.13,.13,.4,{p:'T',r:[.5,0,0]}],['s',a,0,.5,-.52,.11,.11,.3,{p:'T'}],['c',a,0,1.28,-.3,.1,.3,.1,{}],['c',a,0,1.3,0,.1,.3,.1,{}],['c',a,0,1.25,.3,.1,.28,.1,{}],...LG(0,c,-.3,.6,.45,.55,.1,0),...LG(1,c,.3,.6,.45,.55,.1,3.14),...LG(2,c,-.3,.6,-.45,.55,.1,3.14),...LG(3,c,.3,.6,-.45,.55,.1,0)]},
robot:t=>{const c=t.c,d=0x555566;return[['y',c,0,1.1,0,.55,.9,.45,{}],['s',0x7ee0ff,0,1.1,.42,.18,.18,.08,{o:0}],['P','H',0,1.75,0],['s',c,0,0,0,.42,.38,.42,{p:'H'}],['s',0x222233,0,.02,.3,.32,.15,.14,{o:0,p:'H'}],['s',0xff3d3d,0,.02,.4,.09,.09,.05,{o:0,p:'H'}],['y',d,.2,.45,0,.03,.4,.03,{p:'H'}],['s',0xff3d7f,.2,.68,0,.08,.08,.08,{o:0,p:'H'}],['s',d,-.6,1.5,0,.2,.2,.2,{}],['s',d,.6,1.5,0,.2,.2,.2,{}],...AM(0,c,-.7,1.5,0,.8,.11,0,d),...AM(1,c,.7,1.5,0,.8,.11,3,d),...LG(0,d,-.25,.65,0,.6,.14,0),...LG(1,d,.25,.65,0,.6,.14,3.14)]},
hare:t=>{const c=t.c;return[['s',c,0,.85,0,.5,.55,.6,{}],['s',0xe6d0ff,0,.8,.4,.3,.35,.2,{o:0}],['P','H',0,1.45,.2],['s',c,0,0,0,.36,.34,.36,{p:'H'}],['P','E0',-.15,.3,0,0],['s',c,0,.5,0,.1,.6,.07,{p:'E0'}],['s',0xffb6d9,0,.5,.05,.05,.45,.03,{o:0,p:'E0'}],['P','E1',.15,.3,0,1],['s',c,0,.5,0,.1,.6,.07,{p:'E1'}],['s',0xffb6d9,0,.5,.05,.05,.45,.03,{o:0,p:'E1'}],...EY('H',-.15,.05,.3,.1,0xff3d3d,0x220010),...EY('H',.15,.05,.3,.1,0xff3d3d,0x220010),['c',0xffffff,-.06,-.15,.3,.03,.1,.03,{o:0,p:'H',r:[PI,0,0]}],['c',0xffffff,.06,-.15,.3,.03,.1,.03,{o:0,p:'H',r:[PI,0,0]}],['s',0xffffff,0,.7,-.6,.2,.2,.2,{}],...AM(0,c,-.4,1.1,.2,.5,.09,0),...AM(1,c,.4,1.1,.2,.5,.09,3),...LG(0,c,-.35,.45,-.1,.45,.16,0),...LG(1,c,.35,.45,-.1,.45,.16,3.14)]},
mage:t=>{const c=t.c,m=0xff9ef0;return[['c',c,0,.95,0,.65,1.9,.65,{}],['P','H',0,2.0,0],['s',c,0,0,0,.38,.4,.38,{p:'H'}],['s',0x1a1030,0,0,.22,.28,.3,.15,{o:0,p:'H'}],['s',m,-.1,.02,.34,.07,.07,.04,{o:0,p:'H'}],['s',m,.1,.02,.34,.07,.07,.04,{o:0,p:'H'}],['c',c,0,.5,-.1,.26,.5,.26,{p:'H',r:[-.35,0,0]}],...AM(0,c,-.55,1.55,.1,.6,.1,0,0xffe0c0),['P','A1',.55,1.55,.1,3],['y',c,0,-.3,0,.1,.6,.1,{p:'A1'}],['y',0x8a5a44,0,-.2,.25,.04,2,.04,{p:'A1',r:[.25,0,0]}],['s',m,0,.8,.35,.18,.18,.18,{o:0,p:'A1'}],['P','O',0,1.4,0],['s',0xffe36b,.9,0,0,.1,.1,.1,{o:0,p:'O'}],['s',0xffe36b,-.45,0,.78,.1,.1,.1,{o:0,p:'O'}],['s',0xffe36b,-.45,0,-.78,.1,.1,.1,{o:0,p:'O'}]]},
berry:t=>{const c=t.c,gr=0x4cc36b;return[['s',c,0,.95,0,.75,.85,.75,{}],['s',0xffe36b,-.7,.9,.2,.07,.1,.07,{o:0}],['s',0xffe36b,.7,.9,.2,.07,.1,.07,{o:0}],['s',0xffe36b,-.55,.5,.45,.07,.1,.07,{o:0}],['s',0xffe36b,.55,.5,.45,.07,.1,.07,{o:0}],['s',0xffe36b,0,.4,.68,.07,.1,.07,{o:0}],['c',gr,0,1.9,0,.3,.55,.3,{}],['c',gr,-.3,1.85,0,.25,.5,.25,{r:[0,0,.7]}],['c',gr,.3,1.85,0,.25,.5,.25,{r:[0,0,-.7]}],...EY(undefined,-.28,1.15,.6,.18),...EY(undefined,.28,1.15,.6,.18),['y',0x3a1030,-.28,1.4,.62,.03,.3,.03,{o:0,r:[0,0,1.1]}],['y',0x3a1030,.28,1.4,.62,.03,.3,.03,{o:0,r:[0,0,-1.1]}],['P','J',0,.75,.55],['s',0x7a1030,0,0,.1,.38,.14,.2,{o:0,p:'J'}],['c',0xffffff,-.2,.08,.2,.05,.12,.05,{o:0,p:'J'}],['c',0xffffff,0,.08,.22,.05,.12,.05,{o:0,p:'J'}],['c',0xffffff,.2,.08,.2,.05,.12,.05,{o:0,p:'J'}],...AM(0,c,-.8,.95,0,.45,.12,0,gr),...AM(1,c,.8,.95,0,.45,.12,3,gr),...LG(0,gr,-.3,.35,0,.35,.14,0),...LG(1,gr,.3,.35,0,.35,.14,3.14)]},
monster:t=>{const c=t.c,p=0x8a5cb8;return[['s',c,0,1.0,0,.8,.85,.7,{}],['s',0xdff5c8,0,.95,.5,.5,.55,.3,{o:0}],['P','H',0,1.85,.15],['s',c,0,0,0,.55,.5,.5,{p:'H'}],['c',0xfff3e0,-.38,.45,0,.12,.45,.12,{p:'H',r:[0,0,.4]}],['c',0xfff3e0,.38,.45,0,.12,.45,.12,{p:'H',r:[0,0,-.4]}],['s',0xffffff,0,.08,.42,.22,.22,.1,{o:0,p:'H'}],['s',0x221133,0,.08,.52,.1,.1,.06,{o:0,p:'H'}],['P','J',0,1.55,.55],['s',0x4a1a4a,0,0,.05,.3,.1,.15,{o:0,p:'J'}],['c',0xffffff,-.15,.05,.15,.05,.12,.05,{o:0,p:'J'}],['c',0xffffff,.15,.05,.15,.05,.12,.05,{o:0,p:'J'}],['c',p,0,1.8,-.5,.12,.35,.12,{}],['c',p,0,1.45,-.62,.12,.35,.12,{r:[-.4,0,0]}],['c',p,0,1.1,-.68,.12,.35,.12,{r:[-.6,0,0]}],['P','T',0,.9,-.6],['s',c,0,.2,-.3,.15,.15,.5,{p:'T'}],...AM(0,c,-1.0,1.55,0,.95,.2,0,p),...AM(1,c,1.0,1.55,0,.95,.2,3,p),...LG(0,c,-.4,.6,0,.6,.22,0),...LG(1,c,.4,.6,0,.6,.22,3.14)]},
fire:t=>{const c=t.c,y=0xffd84a;return[['s',c,0,.9,0,.5,.6,.45,{}],['s',y,0,.85,.35,.3,.35,.2,{o:0}],['P','H',0,1.55,0],['s',c,0,0,0,.42,.42,.4,{p:'H'}],['c',0xffe0b0,-.25,.4,0,.1,.35,.1,{p:'H',r:[0,0,.3]}],['c',0xffe0b0,.25,.4,0,.1,.35,.1,{p:'H',r:[0,0,-.3]}],...EY('H',-.17,.05,.34,.1,0xffe36b,0x7a1f00),...EY('H',.17,.05,.34,.1,0xffe36b,0x7a1f00),['P','F0',0,1.95,0,0],['c',y,0,.3,0,.2,.6,.2,{o:0,p:'F0'}],['P','F1',-.25,1.9,0,1.5],['c',0xff7a30,0,.25,0,.15,.5,.15,{o:0,p:'F1'}],['P','F2',.25,1.9,0,3],['c',0xff7a30,0,.25,0,.15,.5,.15,{o:0,p:'F2'}],['P','F3',0,1.4,-.4,4],['c',0xff7a30,0,.3,0,.25,.7,.25,{o:0,p:'F3'}],['P','W0',-.35,1.3,-.35,0],['c',0xff5a1f,-.5,.3,0,.15,.9,.35,{p:'W0',r:[0,0,.6]}],['P','W1',.35,1.3,-.35,1],['c',0xff5a1f,.5,.3,0,.15,.9,.35,{p:'W1',r:[0,0,-.6]}],['P','T',0,.7,-.4],['s',c,0,.1,-.4,.1,.1,.4,{p:'T'}],['c',y,0,.1,-.8,.14,.3,.14,{o:0,p:'T',r:[1.57,0,0]}],...AM(0,c,-.55,1.1,0,.5,.1,0,y),...AM(1,c,.55,1.1,0,.5,.1,3,y),...LG(0,c,-.22,.5,0,.5,.12,0),...LG(1,c,.22,.5,0,.5,.12,3.14)]},
ice:t=>{const c=t.c,w=0xd8f4ff;return[['o',c,0,1.0,0,.65,.85,.55,{}],['s',0xffffff,0,1.0,.5,.17,.17,.1,{o:0}],['o',w,-.75,1.55,0,.25,.55,.25,{r:[0,0,.4]}],['o',w,.75,1.55,0,.25,.55,.25,{r:[0,0,-.4]}],['P','H',0,1.85,.05],['s',0xbfeaff,0,0,0,.38,.38,.36,{p:'H'}],['c',w,-.24,.4,0,.07,.4,.07,{p:'H'}],['c',w,-.12,.45,0,.07,.5,.07,{p:'H'}],['c',w,0,.48,0,.07,.55,.07,{p:'H'}],['c',w,.12,.45,0,.07,.5,.07,{p:'H'}],['c',w,.24,.4,0,.07,.4,.07,{p:'H'}],...EY('H',-.15,.03,.32,.09,0x3a6bff,0x001040),...EY('H',.15,.03,.32,.09,0x3a6bff,0x001040),...AM(0,c,-.85,1.3,0,.7,.13,0,w),...AM(1,c,.85,1.3,0,.7,.13,3,w),...LG(0,c,-.28,.55,0,.55,.17,0),...LG(1,c,.28,.55,0,.55,.17,3.14)]},
frog:t=>{const c=t.c;return[['s',c,0,.6,0,.8,.55,.75,{}],['s',0xffffff,-.35,.95,-.1,.15,.08,.12,{o:0}],['P','H',0,.95,.5],['s',0xffffff,-.35,.3,0,.22,.22,.22,{p:'H'}],['s',0x221133,-.35,.32,.15,.11,.11,.1,{o:0,p:'H'}],['s',0xffffff,.35,.3,0,.22,.22,.22,{p:'H'}],['s',0x221133,.35,.32,.15,.11,.11,.1,{o:0,p:'H'}],['s',0x7a2d4b,0,-.15,.28,.4,.07,.1,{o:0,p:'H'}],['s',0xff5fa8,-.5,-.1,.2,.14,.07,.05,{o:0,p:'H'}],['s',0xff5fa8,.5,-.1,.2,.14,.07,.05,{o:0,p:'H'}],['P','L0',-.7,.5,-.3,0],['s',c,0,-.1,0,.3,.35,.5,{p:'L0'}],['s',c,0,-.35,.3,.3,.12,.45,{p:'L0'}],['P','L1',.7,.5,-.3,3.14],['s',c,0,-.1,0,.3,.35,.5,{p:'L1'}],['s',c,0,-.35,.3,.3,.12,.45,{p:'L1'}],...AM(0,c,-.5,.5,.5,.3,.1,0),...AM(1,c,.5,.5,.5,.3,.1,3)]},
golem:t=>{const c=t.c,h=t.n==='Schoko-Golem'?0xfff0f8:0x8888aa;return[['y',c,0,1.3,0,.7,.9,.5,{}],['s',t.n==='Schoko-Golem'?0xff9ecb:0x7ee0ff,0,1.35,.48,.18,.18,.1,{o:0}],['P','H',0,2.1,.1],['s',c,0,0,0,.34,.32,.32,{p:'H'}],['s',0x7ee0ff,0,.02,.28,.26,.07,.06,{o:0,p:'H'}],['s',c,-.95,1.7,0,.4,.35,.4,{}],['s',c,.95,1.7,0,.4,.35,.4,{}],['c',h,-.95,2.1,0,.12,.4,.12,{}],['c',h,.95,2.1,0,.12,.4,.12,{}],...AM(0,c,-.95,1.65,0,1.1,.22,0,h),...AM(1,c,.95,1.65,0,1.1,.22,3,h),...LG(0,c,-.35,.85,0,.85,.22,0),...LG(1,c,.35,.85,0,.85,.22,3.14)]},
wrap:t=>{const c=t.c,w=0xffffff;return[['s',c,0,.95,0,.6,.5,.5,{}],['s',w,0,.95,0,.62,.1,.52,{o:0}],['c',w,-.85,.95,0,.35,.5,.35,{r:[0,0,1.57]}],['c',w,.85,.95,0,.35,.5,.35,{r:[0,0,-1.57]}],...EY(undefined,-.22,1.1,.45,.13),...EY(undefined,.22,1.1,.45,.13),['s',0x7a2d4b,0,.85,.5,.15,.06,.05,{o:0}],...AM(0,c,-.65,.9,0,.5,.1,0,w),['P','A1',.65,.9,0,3],['y',c,0,-.25,0,.1,.5,.1,{p:'A1'}],['y',w,0,-.6,.2,.04,1.1,.04,{p:'A1',r:[.5,0,0]}],['s',0xff5fa8,0,-1.15,.45,.3,.3,.08,{p:'A1'}],...LG(0,w,-.25,.55,0,.5,.12,0),...LG(1,w,.25,.55,0,.5,.12,3.14)]},
cupcake:t=>{const c=t.c,w=0xffd1a8;return[['c',w,0,.5,0,.6,1,.6,{r:[PI,0,0]}],['s',c,0,1.15,0,.7,.3,.7,{}],['s',0xffd1e8,0,1.4,0,.55,.28,.55,{}],['s',c,0,1.62,0,.38,.25,.38,{}],['s',0xff3d3d,0,1.88,0,.17,.17,.17,{}],...EY(undefined,-.2,.72,.46,.12),...EY(undefined,.2,.72,.46,.12),...AM(0,w,-.65,.85,0,.4,.1,0),...AM(1,w,.7,.85,.1,.45,.1,3,0x9fe8ff),['y',0x9fe8ff,.7,.5,.35,.12,.5,.12,{r:[1.57,0,0]}],...LG(0,w,-.2,.3,0,.3,.1,0),...LG(1,w,.2,.3,0,.3,.1,3.14)]},
bear:t=>{const c=t.c;return[['s',c,0,.9,0,.5,.6,.45,{}],['s',0xe8fff0,0,.85,.4,.3,.35,.15,{o:0}],['P','H',0,1.65,0],['s',c,0,0,0,.45,.42,.4,{p:'H'}],['s',c,-.33,.36,0,.16,.16,.1,{p:'H'}],['s',c,.33,.36,0,.16,.16,.1,{p:'H'}],['s',0xc8ffd8,0,-.1,.36,.2,.15,.15,{p:'H'}],['s',0x3a2040,0,-.04,.5,.06,.05,.05,{o:0,p:'H'}],...EY('H',-.18,.12,.34,.09),...EY('H',.18,.12,.34,.09),...AM(0,c,-.55,1.2,0,.5,.12,0),...AM(1,c,.55,1.2,0,.5,.12,3),...LG(0,c,-.25,.4,0,.4,.15,0),...LG(1,c,.25,.4,0,.4,.15,3.14)]}};
KS.brobo=t=>{const c=t.c,d=0x555566;return[['y',c,0,1.2,0,.8,1.1,.6,{}],['s',0xff7eb6,0,1.2,.55,.25,.25,.1,{o:0}],['P','H',0,2.1,0],['s',c,0,0,0,.65,.55,.6,{p:'H'}],['c',c,-.45,.55,0,.2,.5,.15,{p:'H'}],['c',c,.45,.55,0,.2,.5,.15,{p:'H'}],['s',0x222233,0,.02,.5,.5,.2,.15,{o:0,p:'H'}],['s',0xff3d7f,-.2,.02,.6,.1,.1,.05,{o:0,p:'H'}],['s',0xff3d7f,.2,.02,.6,.1,.1,.05,{o:0,p:'H'}],['y',d,0,.65,0,.03,.4,.03,{p:'H'}],['s',0xff3d7f,0,.9,0,.1,.1,.1,{o:0,p:'H'}],...AM(0,c,-1.0,1.7,0,.9,.2,0,d),...AM(1,c,1.0,1.7,0,.9,.2,3,d),['P','T',0,.8,-.6],['y',d,0,.2,-.3,.06,.8,.06,{p:'T',r:[1.0,0,0]}],['s',0xff3d7f,0,.55,-.7,.14,.14,.14,{o:0,p:'T'}],...LG(0,d,-.35,.75,0,.75,.2,0),...LG(1,d,.35,.75,0,.75,.2,3.14)]};
KS.bberry=t=>{const o=[...KS.berry({c:t.c})];for(let k=0;k<5;k++){const a=k*1.257;o.push(['c',0xffd84a,Math.cos(a)*.4,2.05,Math.sin(a)*.4,.1,.4,.1,{}])}return o};
KS.bqueen=t=>{const c=t.c,sk=0xffe0c8;return[['c',c,0,1.0,0,.95,2,.95,{}],['s',0xffffff,0,.3,0,.98,.18,.98,{o:0}],['P','H',0,2.35,0],['s',sk,0,0,0,.4,.4,.38,{p:'H'}],['s',0xff5fa8,0,.3,-.05,.5,.3,.5,{p:'H'}],...EY('H',-.15,0,.32,.1),...EY('H',.15,0,.32,.1),['s',0xffe36b,-.3,.62,0,.14,.14,.14,{o:0,p:'H'}],['s',0xff7eb6,0,.7,0,.18,.18,.18,{o:0,p:'H'}],['s',0x6bd6ff,.3,.62,0,.14,.14,.14,{o:0,p:'H'}],...AM(0,sk,-.8,1.8,0,.7,.1,0),['P','A1',.8,1.8,0,3],['y',sk,0,-.35,0,.1,.7,.1,{p:'A1'}],['y',0xffffff,0,-.3,.3,.04,1.4,.04,{p:'A1',r:[.4,0,0]}],['s',0xff3d7f,0,.4,.55,.2,.2,.2,{o:0,p:'A1'}]]};
KS.blord=t=>{const c=t.c;return[['c',c,0,1.2,0,.9,2.4,.9,{}],['P','H',0,2.6,0],['s',c,0,0,0,.45,.45,.42,{p:'H'}],['s',0x1a1030,0,0,.25,.32,.34,.15,{o:0,p:'H'}],['s',0xff3d3d,-.13,.03,.37,.08,.08,.04,{o:0,p:'H'}],['s',0xff3d3d,.13,.03,.37,.08,.08,.04,{o:0,p:'H'}],['c',0xb01c5a,-.4,.45,0,.14,.8,.14,{p:'H',r:[0,0,.5]}],['c',0xb01c5a,.4,.45,0,.14,.8,.14,{p:'H',r:[0,0,-.5]}],...AM(0,c,-.9,2.0,0,1.4,.12,0,0x1a1226),...AM(1,c,.9,2.0,0,1.4,.12,3,0x1a1226),['P','O',0,1.6,0],['o',0x9b5de5,1.4,0,0,.2,.3,.2,{o:0,p:'O'}],['o',0x9b5de5,-1.4,0,0,.2,.3,.2,{o:0,p:'O'}],['o',0x9b5de5,0,0,1.4,.2,.3,.2,{o:0,p:'O'}],['o',0x9b5de5,0,0,-1.4,.2,.3,.2,{o:0,p:'O'}]]};
KS.dragon=t=>{const R=[0xff5f5f,0xff9f5f,0xffe36b,0x7fe08a,0x6bd6ff,0xc58bff,0xff9ecb],o=[],b=0x6bd6ff;R.forEach((c,k)=>o.push(['s',c,0,.95-(k>4?(k-4)*.12:0),1.2-k*.75,.55-k*.035,.5-k*.03,.5,{}]));
 return[...o,['P','H',0,1.55,1.9],['s',b,0,0,0,.5,.45,.5,{p:'H'}],['s',b,0,-.12,.5,.28,.22,.35,{p:'H'}],['c',0xffe36b,-.3,.45,-.05,.1,.5,.1,{p:'H',r:[-.3,0,.3]}],['c',0xffe36b,.3,.45,-.05,.1,.5,.1,{p:'H',r:[-.3,0,-.3]}],...EY('H',-.25,.12,.42,.12),...EY('H',.25,.12,.42,.12),['c',0xffffff,-.1,-.3,.7,.04,.12,.04,{o:0,p:'H',r:[PI,0,0]}],['c',0xffffff,.1,-.3,.7,.04,.12,.04,{o:0,p:'H',r:[PI,0,0]}],['P','W0',-.45,1.5,.2,0],['s',0xc58bff,-.8,.3,0,.9,.06,.5,{p:'W0',r:[0,0,.35]}],['P','W1',.45,1.5,.2,1],['s',0xc58bff,.8,.3,0,.9,.06,.5,{p:'W1',r:[0,0,-.35]}],...LG(0,b,-.4,.6,.7,.6,.14,0),...LG(1,b,.4,.6,.7,.6,.14,3.14),...LG(2,b,-.4,.6,-.7,.6,.14,3.14),...LG(3,b,.4,.6,-.7,.6,.14,0)]};
KS.ghost=t=>{const c=t.c;return[['s',c,0,1.0,0,.65,.6,.6,{}],['s',c,-.5,.75,0,.3,.3,.3,{}],['s',c,.5,.75,0,.3,.3,.3,{}],['s',c,0,1.5,0,.35,.3,.3,{}],['c',c,-.3,.3,0,.2,.6,.2,{r:[PI,0,0]}],['c',c,0,.25,0,.22,.7,.22,{r:[PI,0,0]}],['c',c,.3,.3,0,.2,.6,.2,{r:[PI,0,0]}],...EY(undefined,-.22,1.05,.5,.13),...EY(undefined,.22,1.05,.5,.13),['s',0x7a2d4b,0,.8,.55,.12,.1,.05,{o:0}],...AM(0,c,-.65,.9,0,.4,.1,0),...AM(1,c,.65,.9,0,.4,.1,3)]};
KS.bird=t=>{const c=t.c;return[['s',c,0,.9,0,.35,.35,.5,{}],['s',c,0,1.15,.45,.25,.25,.25,{}],['c',0xffe36b,0,1.12,.75,.08,.25,.08,{r:[1.57,0,0]}],...EY(undefined,-.12,1.22,.62,.06),...EY(undefined,.12,1.22,.62,.06),['P','T',0,.9,-.4],['c',0xff5f5f,-.1,.1,-.3,.08,.5,.08,{p:'T',r:[-1.3,0,.2]}],['c',0xffe36b,0,.1,-.3,.08,.5,.08,{p:'T',r:[-1.3,0,0]}],['c',0x6bd6ff,.1,.1,-.3,.08,.5,.08,{p:'T',r:[-1.3,0,-.2]}],['P','W0',-.3,1.0,0,0],['s',0xc58bff,-.5,0,0,.55,.05,.3,{p:'W0'}],['P','W1',.3,1.0,0,1],['s',0xc58bff,.5,0,0,.55,.05,.3,{p:'W1'}],['c',0xffe36b,-.12,.5,.1,.05,.2,.05,{o:0,r:[PI,0,0]}],['c',0xffe36b,.12,.5,.1,.05,.2,.05,{o:0,r:[PI,0,0]}]]};
const flash=(u,h)=>{for(const m of u.mats)m.emissive.setHex(h)};
function animEn(e,t,mv){const u=e.userData,a=mv?1:.25;for(const p of u.piv){const k=p.userData.k,ph=p.userData.ph;
 if(k==='L')p.rotation.x=Math.sin(t*10+ph)*.7*a;
 else if(k==='A')p.rotation.x=Math.sin(t*10+ph+3)*.6*a+.15;
 else if(k==='T')p.rotation.y=Math.sin(t*6+ph)*.6;
 else if(k==='H'){p.rotation.z=Math.sin(t*3+ph)*.08;p.rotation.x=Math.sin(t*5)*.05}
 else if(k==='W')p.rotation.z=(ph?1:-1)*(.2+Math.sin(t*12)*.5);
 else if(k==='E')p.rotation.z=(ph?-1:1)*.15+Math.sin(t*6+ph*2)*.1;
 else if(k==='J')p.rotation.x=Math.max(0,Math.sin(t*6))*.35;
 else if(k==='O')p.rotation.y=t*2.2;
 else if(k==='F')p.scale.y=1+Math.sin(t*14+ph)*.3}
 const hv={mage:.45,ghost:.6,bird:1.1}[u.t.k];if(hv!==undefined)e.position.y=hv+Math.sin(t*3)*.25}
function mkEn(t){const g=new THREE.Group(),mats=[],piv=[];build((KS[t.k]||KS.cat)(t),g,mats,piv);g.scale.setScalar(t.r);
 const bg=new THREE.Sprite(BARBG),fl=new THREE.Sprite(BARFL);bg.scale.set(1.4,.2,1);bg.renderOrder=10;fl.renderOrder=11;for(const s of[bg,fl]){s.center.set(0,.5);s.visible=false;scene.add(s)}
 g.userData={hp:t.hp,t,mats,piv,r:t.r,cd:Math.random()*2,dash:0,f:0,kx:0,kz:0,bg,fl};return g}
function spawn(pos){let x,z,L;
 if(AR){const a=Math.random()*6.28,k=pos?3:AR.R*.8;x=(pos?pos.x:AR.cx)+Math.sin(a)*k;z=(pos?pos.z:AR.cz)+Math.cos(a)*k;L=ET.filter(t=>AR.a.pool.includes(t.n))}
 else{const a=Math.random()*6.28,d=25+Math.random()*10;x=Math.max(-310,Math.min(220,P.x+Math.sin(a)*d));z=Math.max(-425,Math.min(185,P.z+Math.cos(a)*d));const zz=z<-205?'r':x>96?'f':x<-96?'d':'c';L=ET.filter(t=>t.z==='b'||t.z===zz)}
 const W=L.reduce((s,t)=>s+t.w,0);let q=Math.random()*W,t=L[0];for(const k of L){q-=k.w;if(q<=0){t=k;break}}
 const g=mkEn(t);g.position.set(x,0,z);scene.add(g);en.push(g)}
const hurt=n=>{snd(200,.3,'sawtooth',.08,60);P.hp-=n;P.inv=1;P.shk=.25;dn(P.g.position,'-'+n,'#ff4d6d');if(P.hp<=0)end(false)};
function shootE(e,nx,nz,t){const b=bsp(.3,t.c);b.position.set(e.position.x+nx,1.3,e.position.z+nz);b.userData={dx:nx,dz:nz,s:t.bs||13,life:2.5};scene.add(b);ebl.push(b)}
const today=()=>new Date().toISOString().slice(0,10);
const MP=[{id:'kill20',k:'kill',n:20,t:'Besiege 20 Gegner',r:[30,0]},{id:'coin100',k:'coin',n:100,t:'Sammle 100 Münzen',r:[40,0]},{id:'arena3',k:'arena',n:3,t:'Gewinne 3 Arena-Kämpfe',r:[60,1]},{id:'boss1',k:'boss',n:1,t:'Besiege einen Boss',r:[80,2]},{id:'chest3',k:'chest',n:3,t:'Öffne 3 Schatztruhen',r:[30,0]},{id:'spec5',k:'spec',n:5,t:'Nutze 5 Spezialangriffe',r:[25,0]},{id:'kill50',k:'kill',n:50,t:'Besiege 50 Gegner',r:[70,1]}];
const ACH=[{id:'k100',k:'kill',n:100,t:'Besiege 100 Gegner',r:[50,1]},{id:'k500',k:'kill',n:500,t:'Besiege 500 Gegner',r:[200,5]},{id:'ar5',k:'arena',n:5,t:'Gewinne 5 Arena-Kämpfe',r:[80,2]},{id:'b1',k:'boss',n:1,t:'Besiege deinen ersten Boss',r:[100,2]},{id:'b5',k:'boss',n:5,t:'Besiege 5 Bosse',r:[300,8]},{id:'ch10',k:'chest',n:10,t:'Öffne 10 Schatztruhen',r:[60,2]},{id:'co1000',k:'coin',n:1000,t:'Sammle 1000 Münzen',r:[100,3]},{id:'sp25',k:'spec',n:25,t:'Nutze 25 Spezialangriffe',r:[60,1]}];
function dm(){if(save.dm&&save.dm.date===today())return;let h=0;for(const c of today())h=(h*31+c.charCodeAt(0))>>>0;const ids=[];while(ids.length<3){h=(h*1103515245+12345)>>>0;const m=MP[(h>>>8)%MP.length];if(!ids.includes(m.id))ids.push(m.id)}save.dm={date:today(),ids,p:{},cl:{}}}
function ev(k,n=1){save.st[k]=(save.st[k]||0)+n;dm();save.dm.p[k]=(save.dm.p[k]||0)+n}
function xp(n){save.xp+=n;while(save.xp>=save.lv*100){save.xp-=save.lv*100;save.lv++;save.coins+=20;save.dia++;toast('⬆️ Level '+save.lv+'! +20 🪙 +1 💎')}}
let ac=null;const snd=(f,d,t,v,f2)=>{if(!save.snd||!ac)return;try{const o=ac.createOscillator(),q=ac.createGain(),n=ac.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);q.gain.setValueAtTime(v,n);q.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(q);q.connect(ac.destination);o.start();o.stop(n+d)}catch(e){}};
const UP=k=>(save.up&&save.up[k])||0,MAXHP=()=>5+UP('hp');
let AR=null,crystal=null;const gems=[];
const AREN=[
{key:'pink',name:'Pink Battle Arena',mode:'waves',md:'Überlebe 5 Wellen',floor:0xffb6d9,bg:0xffd9ec,pil:0xff6fb0,pool:['Schattenkatze','Roboter','Dunkler Hase','Magier'],bonus:20},
{key:'straw',name:'Strawberry Battle Arena',mode:'clear',n:12,md:'Besiege 12 Gegner',floor:0xb7e8b0,bg:0xdff5d0,pil:0xff4d6d,pool:['Erdbeer-Monster','Monster','Feuergegner','Gummi-Hüpfer'],bonus:25},
{key:'candy',name:'Candy Battle Arena',mode:'collect',md:'Sammle 8 Bonbons',floor:0xffe1f0,bg:0xfff0c8,pil:0x7fe0ff,pool:['Gummi-Hüpfer','Lutscher-Krieger','Zuckerguss-Schütze','Gummibär','Schoko-Golem'],bonus:30},
{key:'shadow',name:'Shadow Battle Arena',mode:'defend',md:'Schütze den Kristall 60 s',floor:0x4a3a6a,bg:0x2a2040,pil:0x9b5de5,pool:['Schattenkatze','Dunkler Hase','Magier','Wächter'],bonus:40},
{key:'rainbow',name:'Rainbow Battle Arena',mode:'clear',n:20,md:'Besiege 20 Gegner',floor:0xe6ccff,bg:0xd6f0ff,pil:0xffe36b,pool:['Feuergegner','Eisgegner','Magier','Gummi-Hüpfer','Wächter','Wolkengeist','Regenbogen-Vogel','Kristall-Golem'],bonus:50}];
const BOSS=[
{n:'Mega-Robo-Katze',k:'brobo',c:0xff9ecb,hp:60,sp:2.2,r:2.6,b:'boss',sq:1,dmg:2,pat:['aim','ring','minions'],rew:30},
{n:'Erdbeer-König',k:'bberry',c:0xff4d6d,hp:80,sp:2.2,r:3,b:'boss',dmg:2,pat:['ring','charge','aim'],rew:40},
{n:'Bonbon-Königin',k:'bqueen',c:0xff8ac0,hp:100,sp:2.2,r:2.8,b:'boss',dmg:2,pat:['spiral','minions','aim'],rew:50},
{n:'Schatten-Lord',k:'blord',c:0x3b2f4f,hp:130,sp:2.4,r:3,b:'boss',dmg:2,pat:['tele','ring','spiral'],rew:60},
{n:'Regenbogen-Drache',k:'dragon',c:0x6bd6ff,hp:180,sp:2.6,r:3.4,b:'boss',dmg:2,pat:['spiral','charge','ring','minions','tele'],rew:100}];
function mkBoss(d,i){return mkEn(d)}
function ebul(x,z,dx,dz,col,s,sz){const b=bsp(sz||.3,col);b.position.set(x+dx,1.3,z+dz);b.userData={dx,dz,s:s||11,life:3};scene.add(b);ebl.push(b)}
function fan(x,z,dx,dz,l,col){for(const o of l){const c=Math.cos(o),s=Math.sin(o);ebul(x,z,dx*c-dz*s,dx*s+dz*c,col,13,.4)}}
const obj=s=>{if($('zone').textContent!==s)$('zone').textContent=s};
function buildArena(a,i){const cx=(i-2)*130,cz=520,R=30;scene.background.setHex(a.bg);scene.fog.color.setHex(a.bg);
 const f=new THREE.Mesh(new THREE.CircleGeometry(R,48),SM(a.floor));f.rotation.x=-Math.PI/2;f.position.set(cx,.06,cz);f.receiveShadow=true;scene.add(f);
 const o=new THREE.Mesh(new THREE.CircleGeometry(R*5,24),SM(a.bg));o.rotation.x=-Math.PI/2;o.position.set(cx,.02,cz);scene.add(o);
 for(let k=0;k<14;k++){const an=k/14*6.283,g=new THREE.Group();g.position.set(cx+Math.cos(an)*(R+1),0,cz+Math.sin(an)*(R+1));g.add(sp(new THREE.CylinderGeometry(.6,.8,4,8),0xffffff,0,2,0),sp(i===3?new THREE.ConeGeometry(.9,1.8,5):new THREE.SphereGeometry(1,10,8),a.pil,0,4.6,0));scene.add(g);if(i===0||i===4)sway.push(g)}
 if(i===4)[0xff5f5f,0xffe36b,0x6bd6ff,0xc58bff].forEach((c,k)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(12+k*.9,.45,6,28,Math.PI),SM(c));t.position.set(cx,0,cz-R-8);scene.add(t)});
 return{cx,cz,R}}
function startArena(i,boss){const a=AREN[i],c=buildArena(a,i);
 AR={a,key:a.key+(boss?'_boss':''),cx:c.cx,cz:c.cz,R:c.R,mode:boss?'boss':a.mode,t:0,next:1,wave:1,W:a.mode==='waves'?5:1,left:a.mode==='waves'?5:(a.n||12),got:0,chp:20,bonus:boss?BOSS[i].rew:a.bonus,bi:i};
 P.x=c.cx;P.z=c.cz+15;yaw=0;
 if(boss){const b=mkBoss(BOSS[i],i);b.position.set(c.cx,0,c.cz-12);scene.add(b);en.push(b);$('boss').style.display='block';$('bn').textContent=BOSS[i].n}
 else if(a.mode==='defend'){crystal=mesh(new THREE.OctahedronGeometry(1.4),0x9b5de5,c.cx,2,c.cz);crystal.material.emissive.setHex(0x5b2da5);scene.add(crystal)}
 $('kills').parentNode.style.display='none';show('ar',0);$('start').onclick()}
function gem(){const a=Math.random()*6.28,r=Math.random()*(AR.R-6),m=mesh(new THREE.OctahedronGeometry(.6),[0xff8ac0,0xffe36b,0x7fe0ff][gems.length%3],AR.cx+Math.cos(a)*r,1.2,AR.cz+Math.sin(a)*r);m.material.emissive.setHex(0x553344);scene.add(m);gems.push(m)}
function arenaTick(dt){const m=AR.mode;AR.t+=dt;
 if(m==='waves'||m==='clear'){if(AR.left>0&&en.length<5&&AR.t>AR.next){spawn();AR.left--;AR.next=AR.t+.7}
  else if(AR.left===0&&en.length===0){if(AR.wave>=AR.W){end(true);return}AR.wave++;AR.left=3+2*AR.wave;toast('Welle '+AR.wave);AR.next=AR.t+2}
  obj(AR.W>1?'Welle '+AR.wave+'/'+AR.W+' · Gegner '+(AR.left+en.length):'Gegner übrig: '+(AR.left+en.length))}
 else if(m==='collect'){if(en.length<4&&AR.t>AR.next){spawn();AR.next=AR.t+3}
  while(gems.length<3)gem();
  for(let i=gems.length-1;i>=0;i--){const q=gems[i];q.rotation.y+=dt*2;if(Math.hypot(q.position.x-P.x,q.position.z-P.z)<2.2){burst(q.position.x,1.2,q.position.z,0xffe36b,10,5);scene.remove(q);gems.splice(i,1);AR.got++;coins++;snd(800,.15,'sine',.06,1400)}}
  if(AR.got>=8){end(true);return}obj('Bonbons '+AR.got+'/8')}
 else if(m==='defend'){if(en.length<5&&AR.t>AR.next){spawn();AR.next=AR.t+2.2}
  crystal.rotation.y+=dt;crystal.scale.setScalar(.5+.5*Math.max(0,AR.chp)/20);
  if(AR.chp<=0){end(false);return}if(AR.t>=60){end(true);return}
  obj('Kristall '+Math.max(0,Math.ceil(AR.chp))+'/20 · '+Math.ceil(60-AR.t)+' s')}
 else obj('Besiege '+BOSS[AR.bi].n)}
const SPECIAL={princess:'heal',magic:'burst',ice:'freeze',fire:'nova',shadow:'shield',angel:'heal',dark:'speed',star:'burst',warrior:'nova',rainbow:'shield',crystal:'freeze',golden:'nova'};
const SPN={heal:['Herzheilung','💗'],burst:['Sternenregen','🌟'],freeze:['Eiszeit','❄️'],nova:['Nova-Explosion','💥'],shield:['Schutzschild','🛡️'],speed:['Turbo','⚡']};
const WP=[{id:'laser',name:'Rosa Laser',desc:'schnell',d:1,cd:.22,mag:12,n:1,sp:0,s:40,col:0xff3d9a,cost:0,rl:1.2},
{id:'heart',name:'Herz-Kanone',desc:'2 Schaden',d:2,cd:.5,mag:8,n:1,sp:0,s:28,col:0xff3d7f,cost:100,rl:1.4},
{id:'glitter',name:'Glitzer-Streuer',desc:'5 Schüsse',d:1,cd:.7,mag:6,n:5,sp:.5,s:34,col:0xffe36b,cost:200,rl:1.5}];
const WN=()=>WP.find(w=>w.id===save.wp)||WP[0];
const parts=[],pg=new THREE.SphereGeometry(.12,4,4),rg=new THREE.TorusGeometry(1,.08,6,24),V=new THREE.Vector3();
function burst(x,y,z,col,n,s){if(parts.length>160)return;if(save.gfx==='low')n=Math.ceil(n/2);for(let i=0;i<n;i++){const m=new THREE.Mesh(pg,SM(col));m.position.set(x,y,z);m.userData={vx:rnd(-1,1)*s,vy:rnd(1,2.5)*s*.6,vz:rnd(-1,1)*s,life:.6};scene.add(m);parts.push(m)}}
function ring(x,z,col,R){const m=new THREE.Mesh(rg,new THREE.MeshBasicMaterial({color:col,transparent:true}));m.rotation.x=Math.PI/2;m.position.set(x,.4,z);m.userData={ring:R,life:.45,max:.45};scene.add(m);parts.push(m)}
function dn(pos,txt,col){V.set(pos.x,pos.y+2.2,pos.z).project(cam);const el=document.createElement('div');el.className='dn';el.textContent=txt;el.style.left=(V.x*.5+.5)*innerWidth+'px';el.style.top=(-V.y*.5+.5)*innerHeight+'px';el.style.color=col||'#fff';document.body.appendChild(el);el.offsetWidth;el.style.transform='translate(-50%,-60px)';el.style.opacity=0;setTimeout(()=>el.remove(),850)}
function dmg(e,n){const u=e.userData;snd(350,.08,'sawtooth',.04,150);u.hp-=n;flash(u,0xffffff);u.f=.12;burst(e.position.x,1.2,e.position.z,0xffffff,5,4);dn(e.position,'-'+n,'#fff3a0')}
function bul(dx,dz,w){let b;if(w.id==='heart'){b=new THREE.Group();const hg=GC('hs',()=>new THREE.SphereGeometry(.28,8,8)),hc=GC('hc',()=>new THREE.ConeGeometry(.42,.6,6)),m=bm(0xff3d7f),c=new THREE.Mesh(hc,m);c.position.y=-.2;c.rotation.x=Math.PI;for(const s of[-1,1]){const h=new THREE.Mesh(hg,m);h.position.set(s*.18,.1,0);b.add(h)}b.add(c)}
 else b=bsp(w.id==='glitter'?.18:.3,w.col);
 b.position.set(P.x+dx,1.6,P.z+dz);b.userData={dx,dz,life:1.3,d:w.d,s:w.s};scene.add(b);bl.push(b)}
function shoot(){const w=WN();if(P.cd>0||P.rel>0||over)return;if(P.ammo<=0){P.rel=w.rl;return}
 P.ammo--;P.cd=w.cd;let dx=-Math.sin(yaw),dz=-Math.cos(yaw),best=1,nd=16,nn=null;
 for(const e of en){const ex=e.position.x-P.x,ez=e.position.z-P.z,d=Math.hypot(ex,ez);if(d>30)continue;const a=Math.acos(Math.max(-1,Math.min(1,(ex*dx+ez*dz)/d)));if(a<best){best=a;dx=ex/d;dz=ez/d}if(d<nd){nd=d;nn=[ex/d,ez/d]}}if(best===1&&nn){dx=nn[0];dz=nn[1]}
 for(let k=0;k<w.n;k++){const a=w.n>1?(k/(w.n-1)-.5)*w.sp:0,c=Math.cos(a),s=Math.sin(a);bul(dx*c-dz*s,dx*s+dz*c,w)}
 burst(P.x+dx,1.6,P.z+dz,w.col,4,3);snd(900,.08,'square',.04,300);P.face=Math.atan2(dx,dz);if(P.ammo<=0)P.rel=w.rl}
function special(){if(P.spc>0||over||!running||paused)return;const k=SPECIAL[save.cat]||'nova',px=P.x,pz=P.z;P.spc=[12,9,7,5][UP('cd')];ev('spec');snd(300,.4,'triangle',.07,900);
 if(k==='heal'){P.hp=Math.min(MAXHP(),P.hp+3);dn(P.g.position,'+❤️','#ff7eb6');burst(px,1.5,pz,0xff7eb6,18,5);ring(px,pz,0xff7eb6,5)}
 else if(k==='nova'){ring(px,pz,0xff8a3d,10);burst(px,1,pz,0xffb347,24,8);for(const e of en)if(Math.hypot(e.position.x-px,e.position.z-pz)<10)dmg(e,4)}
 else if(k==='burst'){for(let i=0;i<12;i++){const a=i/12*6.283;bul(Math.sin(a),Math.cos(a),{id:'x',d:2,s:30,col:0xffe36b})}ring(px,pz,0xffe36b,3)}
 else if(k==='freeze'){ring(px,pz,0x5ec8ff,16);for(const e of en)if(Math.hypot(e.position.x-px,e.position.z-pz)<16)e.userData.frz=e.userData.t.b==='boss'?1.2:3.5}
 else if(k==='shield'){P.inv=4;ring(px,pz,0x9b5de5,3);dn(P.g.position,'🛡️','#fff')}
 else if(k==='speed'){P.spd=5;dn(P.g.position,'⚡','#ffe36b')}}
function swapW(){const o=WP.filter(w=>save.wps.includes(w.id));if(o.length<2){toast('Keine weitere Waffe – im Menü unter Waffen kaufen');return}const i=o.findIndex(w=>w.id===save.wp);save.wp=o[(i+1)%o.length].id;P.ammo=WN().mag;P.rel=0;store();toast('🔫 '+WN().name)}

const key=(c,v)=>{ik[c]=v;if(v){if(c==='Space')jump();if(c==='ShiftLeft')dodge();if(c==='KeyR'&&P.ammo<WN().mag)P.rel=1.2;if(c==='KeyE')special();if(c==='KeyQ')swapW()}};
addEventListener('keydown',e=>{key(e.code,1)});addEventListener('keyup',e=>{key(e.code,0)});
const jump=()=>{if(P.y<=0.01)P.vy=10},dodge=()=>{if(P.dash<=0){P.dash=.25;P.inv=.4}};
let sh=0;const press=(id,f)=>{const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();f(1)});b.addEventListener('pointerup',()=>f(0));b.addEventListener('pointerleave',()=>f(0))};
press('bShoot',v=>sh=v);press('bJump',v=>v&&jump());press('bDodge',v=>v&&dodge());press('bSpec',v=>v&&special());press('bPause',v=>v&&running&&!over&&setP(!paused));press('bSwap',v=>v&&swapW());
const stk=$('stick'),kn=$('knob');let sid=null;
const mv=e=>{const r=stk.getBoundingClientRect(),hh=r.width/2,cx=r.left+hh,cy=r.top+hh;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy),m=hh*.8;if(d>m){dx*=m/d;dy*=m/d}st.x=dx/m;st.y=-dy/m;kn.style.transform=`translate(${dx}px,${dy}px)`};
stk.addEventListener('pointerdown',e=>{sid=e.pointerId;stk.setPointerCapture(sid);mv(e)});
stk.addEventListener('pointermove',e=>{if(e.pointerId===sid)mv(e)});
const rel=()=>{sid=null;st.x=st.y=0;kn.style.transform=''};stk.addEventListener('pointerup',rel);stk.addEventListener('pointercancel',rel);
let lx=null;const lk=$('look');
lk.addEventListener('pointerdown',e=>{lx=e.clientX;lk.setPointerCapture(e.pointerId)});
lk.addEventListener('pointermove',e=>{if(lx!==null){yaw-=(e.clientX-lx)*.007;lx=e.clientX}});
lk.addEventListener('pointerup',()=>lx=null);lk.addEventListener('pointercancel',()=>lx=null);
function end(win){if(over)return;over=true;snd(win?700:150,.6,'triangle',.08,win?1400:60);P.win=win;if(win&&AR){coins+=AR.bonus;save.done[AR.key]=1;xp(50);if(AR.mode!=='boss'){ev('arena');save.dia++}}ev('coin',coins);save.coins+=coins;save.best=Math.max(save.best,score);store();$('end').style.display='flex';$('endT').textContent=win?'🎉 Sieg!':'💔 Game Over';$('endS').textContent=`Punkte: ${score} · Münzen: +${coins} · Level ${save.lv} · 💎 ${save.dia}`}
let last=0,tm=0,fa=0,fc=0,paused=false,gst=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000||0,.05);last=now;tm+=dt;
 fa+=dt;fc++;if(fa>2.5){const fps=fc/fa;fa=0;fc=0;if(running&&!over&&!paused&&tm>gst+6&&fps<35&&save.gfx!=='low'){save.gfx=save.gfx==='high'?'mid':'low';store();applyGfx();gfxExtras();toast('Grafik automatisch reduziert: '+(save.gfx==='mid'?'Mittel':'Niedrig'))}}
 for(const t of sway){if(t.userData.y!==undefined)t.position.y=t.userData.y+Math.abs(Math.sin(tm*2+t.position.x))*.15;else t.rotation.z=Math.sin(tm+t.position.x)*.03}
 for(const c of clouds){c.position.x+=dt*2;if(c.position.x>340)c.position.x=-340}
 for(const h of spin)h.rotation.y+=dt*1.6;
 for(const b of bobs)b.o.position.y=b.y+Math.sin(tm*b.s+b.p)*b.a;
 for(const b of butter){const a=tm*b.s+b.p;b.g.position.set(b.cx+Math.cos(a)*b.r,b.cy+Math.sin(a*2)*.5,b.cz+Math.sin(a)*b.r);b.g.rotation.y=-a;const f=Math.sin(tm*18+b.p)*.9;b.wp[0].rotation.z=f;b.wp[1].rotation.z=-f}
 rv2.material.opacity=.72+Math.sin(tm*2+1)*.1;oc.material.opacity=.75+Math.sin(tm*1.5)*.08;
 for(const f of falls){f.s=(f.s+dt*f.v)%1;f.m.position.set(f.x+Math.sin(f.s*20)*.8,f.ty+(f.by-f.ty)*f.s,f.tz+(f.bz-f.tz)*f.s)}
 rv.material.opacity=.72+Math.sin(tm*2)*.1;rv.scale.x=1+Math.sin(tm)*.04;
 fount.forEach((s,i)=>{const a=i*1.05+tm*2,k=(tm*1.5+i/6)%1;s.position.set(11+Math.cos(a)*k*1.5,.9+(1-(2*k-1)**2)*1.7,11+Math.sin(a)*k*1.5)});
 for(let i=parts.length-1;i>=0;i--){const m=parts[i],u=m.userData;u.life-=dt;if(u.ring){const k=1-u.life/u.max;m.scale.setScalar(.5+k*u.ring);m.material.opacity=1-k}else{m.position.x+=u.vx*dt;m.position.y+=u.vy*dt;m.position.z+=u.vz*dt;u.vy-=12*dt;m.scale.setScalar(Math.max(.01,u.life/.6))}if(u.life<=0||m.position.y<0){scene.remove(m);if(u.ring)m.material.dispose();parts.splice(i,1)}}
 if(running&&!over&&!paused){
  const ix=(ik.KeyD?1:0)-(ik.KeyA?1:0)+st.x,iy=(ik.KeyW?1:0)-(ik.KeyS?1:0)+st.y;
  yaw+=((ik.ArrowLeft?1:0)-(ik.ArrowRight?1:0))*dt*2.2;if(ik.KeyJ||sh)shoot();
  P.cd-=dt;P.inv-=dt;P.dash-=dt;P.spc-=dt;P.spd-=dt;if(P.rel>0){P.rel-=dt;if(P.rel<=0)P.ammo=WN().mag}
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
  let mx=fx*iy+rx*ix,mz=fz*iy+rz*ix;const ml=Math.hypot(mx,mz);
  if(ml>.05){const n=Math.min(1,ml),sp=(P.dash>0?18:7)*(P.spd>0?1.7:1);mx=mx/ml*n;mz=mz/ml*n;P.x+=mx*sp*dt;P.z+=mz*sp*dt;if(!(ik.KeyJ||sh))P.face=Math.atan2(mx,mz)}
  for(const b of blds){const dx=P.x-b.x,dz=P.z-b.z,d=Math.hypot(dx,dz);if(d<b.r+.6){P.x=b.x+dx/d*(b.r+.6);P.z=b.z+dz/d*(b.r+.6)}}
  if(AR){const ax=P.x-AR.cx,az=P.z-AR.cz,ad=Math.hypot(ax,az);if(ad>AR.R-2){P.x=AR.cx+ax/ad*(AR.R-2);P.z=AR.cz+az/ad*(AR.R-2)}}
  else{P.x=Math.max(-315,Math.min(225,P.x));P.z=Math.max(-430,Math.min(190,P.z));if(P.z<-195)P.x=Math.max(-190,Math.min(190,P.x));const zn=P.z<-243?'Rainbow Island':P.z<-195?'Regenbogenbrücke':P.x<-104?'Candy Valley':P.x<-96?'Fluss':P.x<80?'Pink City':P.x<96?'Fluss':'Strawberry Forest';if(zn!==zone){zone=zn;$('zone').textContent=zn}}
  for(let i=chests.length-1;i>=0;i--){const c=chests[i];c.rotation.y+=dt;if(Math.hypot(c.position.x-P.x,c.position.z-P.z)<2.4){scene.remove(c);chests.splice(i,1);const rare=c.userData.rare;coins+=rare?20:5;score+=rare?600:250;ev('chest');snd(800,.15,'sine',.06,1400);xp(10);let tx=rare?'💎 Seltene Truhe! +20 🪙 +2 💎':'🎁 Schatztruhe! +5 🪙';if(rare)save.dia+=2;else if(Math.random()<.25){save.dia++;tx+=' +1 💎'}toast(tx)}}
  P.vy-=25*dt;P.y+=P.vy*dt;if(P.y<0){P.y=0;P.vy=0}
  P.g.position.set(P.x,P.y,P.z);P.g.rotation.y=P.face;P.g.scale.set(1,1+Math.min(Math.abs(P.vy)*.01,.12),1);P.g.scale.multiplyScalar(1+Math.min(Math.max(P.cd,0),.15)*.5);animCat(P.g,tm,ml>.05,P.cd>.1);
  const walk=ml>.05?Math.sin(tm*14)*.5:0;P.g.position.y+=Math.abs(walk)*.15;
  for(const s of[-1,1]){const l=P.g.getObjectByName('leg'+s);l.position.z=walk*s*.5}
  if(AR)arenaTick(dt);else if(en.length<Math.min(3+(kills/3|0),7))spawn();
  for(let i=bl.length-1;i>=0;i--){const b=bl[i],u=b.userData;b.position.x+=u.dx*u.s*dt;b.position.z+=u.dz*u.s*dt;u.life-=dt;let hit=u.life<=0;
   for(const e of en)if(!hit&&Math.hypot(e.position.x-b.position.x,e.position.z-b.position.z)<e.userData.r+.5){hit=true;dmg(e,u.d);e.userData.f=.1;e.userData.kx=u.dx;e.userData.kz=u.dz}
   if(hit){scene.remove(b);bl.splice(i,1)}}
  for(let i=ebl.length-1;i>=0;i--){const b=ebl[i],u=b.userData;b.position.x+=u.dx*u.s*dt;b.position.z+=u.dz*u.s*dt;u.life-=dt;let h=u.life<=0;
   if(!h&&P.inv<=0&&P.y<2.2&&Math.hypot(b.position.x-P.x,b.position.z-P.z)<1){h=true;hurt(1)}
   if(h){scene.remove(b);ebl.splice(i,1)}}
  for(let i=en.length-1;i>=0;i--){const e=en[i],u=e.userData,t=u.t;
   if(u.hp<=0){scene.remove(e,u.bg,u.fl);u.mats.forEach(m=>m.dispose());en.splice(i,1);kills++;burst(e.position.x,1,e.position.z,t.c,16,7);ring(e.position.x,e.position.z,t.c,2.5);score+=50*t.hp;coins+=(t.hp>=6?4:1)+(t.rew||0);ev('kill');snd(500,.2,'square',.05,100);xp(5+t.hp);if(t.b==='boss'){ev('boss');xp(100);save.dia+=2+(AR?AR.bi:0)}if(!AR&&kills>=15)end(true);if(t.b==='boss')end(true);continue}
   if(u.frz>0){u.frz-=dt;flash(u,u.frz>0?0x3399ff:0);continue}
   const dx=P.x-e.position.x,dz=P.z-e.position.z,d=Math.hypot(dx,dz)||1,nx=dx/d,nz=dz/d;u.cd-=dt;let sp=t.sp,mx=nx,mz=nz;
   if(t.b==='shoot'){if(d<t.keep)mx=-nx,mz=-nz;else if(d<t.keep+4)sp=0;if(u.cd<=0&&d<28){u.cd=t.fr;shootE(e,nx,nz,t)}}
   else if(t.b==='dodge'){const s=Math.sin(tm*3+i*2);mx=nx-nz*s*.9;mz=nz+nx*s*.9}
   else if(t.b==='charge'){if(u.cd<=0&&d<20){u.cd=3.5;u.dash=.5}if(u.dash>0){u.dash-=dt;sp=t.sp*3.2}}
   else if(t.b==='hop'){e.position.y=Math.abs(Math.sin(tm*5+i))*1.6;sp=t.sp*(e.position.y>.3?1:.2)}
   else if(t.b==='boss'){const ph=u.hp<t.hp*.5,ex=e.position.x,ez=e.position.z;if(d<9){mx=-nx;mz=-nz}else if(d<15)sp=0;
    if(u.dash>0){u.dash-=dt;sp=11;mx=nx;mz=nz}
    if(u.sprl>0){u.sprl-=dt;u.sc=(u.sc||0)-dt;if(u.sc<=0){u.sc=.11;const a=tm*5;ebul(ex,ez,Math.sin(a),Math.cos(a),t.c,10);if(ph)ebul(ex,ez,-Math.sin(a),-Math.cos(a),t.c,10)}}
    if(u.cd<=0){u.cd=ph?1.7:2.8;const p=t.pat[(u.pi=(u.pi||0)+1)%t.pat.length];
     if(p==='aim')fan(ex,ez,nx,nz,[-.3,0,.3],t.c);
     else if(p==='ring'){const n=ph?24:16;for(let k=0;k<n;k++){const a=k/n*6.283;ebul(ex,ez,Math.sin(a),Math.cos(a),t.c,9)}}
     else if(p==='spiral')u.sprl=2.5;
     else if(p==='charge')u.dash=.7;
     else if(p==='minions'){spawn({x:ex,z:ez});spawn({x:ex,z:ez})}
     else if(p==='tele'){const a=Math.random()*6.28;e.position.x=P.x+Math.sin(a)*9;e.position.z=P.z+Math.cos(a)*9;burst(e.position.x,2,e.position.z,t.c,14,6);fan(e.position.x,e.position.z,-Math.sin(a),-Math.cos(a),[-.5,-.25,0,.25,.5],t.c)}}}
   if(AR&&AR.mode==='defend'&&d>9&&t.b!=='shoot'){const kx=AR.cx-e.position.x,kz=AR.cz-e.position.z,kd=Math.hypot(kx,kz)||1;mx=kx/kd;mz=kz/kd;if(kd<3)AR.chp-=dt*(t.dmg||1)*1.2}
   e.position.x+=mx*sp*dt;e.position.z+=mz*sp*dt;e.rotation.y=Math.atan2(nx,nz);animEn(e,tm+i,sp>.5);
   if(u.f>0){u.f-=dt;e.position.x+=u.kx*6*dt;e.position.z+=u.kz*6*dt;if(u.f<=0)flash(u,0)}
   if(d<1.2+t.r&&P.inv<=0&&P.y<1.2)hurt(t.dmg||1)}
  for(const e of en){const u=e.userData,sh=u.hp<u.t.hp&&u.hp>0;u.bg.visible=u.fl.visible=sh;if(sh){u.bg.position.set(e.position.x-Math.cos(yaw)*.7,e.position.y+u.r*2.4+.6,e.position.z+Math.sin(yaw)*.7);u.fl.position.copy(u.bg.position);u.fl.scale.set(1.4*u.hp/u.t.hp,.2,1)}}
  P.g.visible=P.inv<=0||P.inv>1.05||Math.floor(tm*20)%2;hud()}
if(!running){yaw=tm*.25;P.g.position.set(P.x,Math.abs(Math.sin(tm*3))*.25,P.z);P.g.rotation.y=Math.sin(tm)*.6;animCat(P.g,tm,false,false)}
 const cx=P.x+Math.sin(yaw)*9*.94,cz=P.z+Math.cos(yaw)*9*.94;
 if(over&&P.win){P.g.position.y=Math.abs(Math.sin(tm*6))*1.2;P.g.rotation.y+=dt*6}
 cam.position.set(cx,P.y+3.8,cz);if(P.shk>0){P.shk-=dt;cam.position.x+=(Math.random()-.5)*.5;cam.position.y+=(Math.random()-.5)*.5}cam.lookAt(P.x,P.y+1.8,P.z);sun.position.set(P.x+30,50,P.z+20);sun.target.position.set(P.x,0,P.z);
 R.render(scene,cam)}

const show=(id,v)=>$(id).style.display=v?'flex':'none';
const updCoins=()=>{$('coins').textContent=save.coins;$('coins2').textContent=save.coins;$('cc').textContent=save.coins;$('wc').textContent=save.coins;$('lv').textContent=save.lv;$('dia').textContent=save.dia};
let pr,ps,pc,pm,pi=0,pyaw=0;
function pl(){requestAnimationFrame(pl);if($('chars').style.display==='none'||!pm)return;pyaw+=.004;pm.rotation.y=pyaw;pm.position.y=Math.sin(performance.now()/400)*.08;animCat(pm,performance.now()/1000,false,false);const cv=$('pv'),w=cv.clientWidth,h=cv.clientHeight;if(!w)return;if(cv.width!==Math.round(w*2)){pr.setPixelRatio(2);pr.setSize(w,h,false)}pc.aspect=w/h;pc.updateProjectionMatrix();pr.render(ps,pc)}
function showCat(){const d=CATS[pi];if(pm)ps.remove(pm);pm=cat(d.id===save.cat?CAT():d);ps.add(pm);$('cn').textContent=d.name;$('cs').textContent=d.desc+' Spezial: '+SPN[SPECIAL[d.id]].join(' ');const own=save.owned.includes(d.id),b=$('cb');b.textContent=save.cat===d.id?'✔ Ausgewählt':own?'Auswählen':'Kaufen 🪙'+d.cost;b.disabled=save.cat===d.id||(!own&&save.coins<d.cost);$('cc').textContent=save.coins}
$('mChar').onclick=()=>{show('menu',0);show('chars',1);if(!pr){pr=new THREE.WebGLRenderer({canvas:$('pv'),antialias:true,alpha:true});ps=new THREE.Scene();ps.add(new THREE.HemisphereLight(0xffffff,0xd9a6ff,1.2));const dl=new THREE.DirectionalLight(0xffffff,.6);dl.position.set(3,5,4);ps.add(dl);pc=new THREE.PerspectiveCamera(40,1,.1,50);pc.position.set(0,1.6,7);pc.lookAt(0,1.4,0);let dx=null;const cv=$('pv');cv.addEventListener('pointerdown',e=>{dx=e.clientX;cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointermove',e=>{if(dx!==null){pyaw+=(e.clientX-dx)*.01;dx=e.clientX}});cv.addEventListener('pointerup',()=>dx=null);requestAnimationFrame(pl)}pi=Math.max(0,CATS.findIndex(c=>c.id===save.cat));showCat()};
$('cp').onclick=()=>{pi=(pi+CATS.length-1)%CATS.length;showCat()};$('cx').onclick=()=>{pi=(pi+1)%CATS.length;showCat()};
$('cb').onclick=()=>{const d=CATS[pi];if(!save.owned.includes(d.id)){if(save.coins<d.cost)return;save.coins-=d.cost;save.owned.push(d.id)}save.cat=d.id;store();scene.remove(P.g);P.g=cat(CAT());scene.add(P.g);showCat();updCoins()};
$('cback').onclick=()=>{show('chars',0);show('menu',1)};
const markG=()=>{for(const k of['low','mid','high'])$('g-'+k).classList.toggle('on',save.gfx===k)};
for(const k of['low','mid','high'])$('g-'+k).onclick=()=>{save.gfx=k;store();applyGfx();gfxExtras();markG()};
$('mSet').onclick=()=>{show('menu',0);show('sets',1);markG()};$('sback').onclick=()=>{show('sets',0);show('menu',1)};
updCoins();
function wpRender(){const l=$('wl');l.innerHTML='';for(const w of WP){const own=save.wps.includes(w.id),b=document.createElement('button');b.className='big m'+(save.wp===w.id?' on':'');b.textContent=w.name+' ('+w.desc+') · '+(save.wp===w.id?'✔':own?'Auswählen':'🪙'+w.cost);b.onclick=()=>{if(!own){if(save.coins<w.cost)return;save.coins-=w.cost;save.wps.push(w.id)}save.wp=w.id;P.ammo=w.mag;store();wpRender();updCoins()};l.appendChild(b)}}
$('mWp').onclick=()=>{show('menu',0);show('wp',1);wpRender()};$('wback').onclick=()=>{show('wp',0);show('menu',1)};
function arRender(){const l=$('al');l.innerHTML='';AREN.forEach((a,i)=>{for(const boss of[0,1]){const b=document.createElement('button'),ok=save.done[a.key+(boss?'_boss':'')];b.className='big m';b.textContent=(boss?'👑 Boss: '+BOSS[i].n+' ('+BOSS[i].hp+' HP)':'⚔️ '+a.name+' – '+a.md)+(ok?' ✅':'');b.onclick=()=>startArena(i,boss);l.appendChild(b)}})}
$('mAr').onclick=()=>{show('menu',0);show('ar',1);arRender()};$('aback').onclick=()=>{show('ar',0);show('menu',1)};
const SH=[{id:'c1',t:'col',n:'Mint-Fell',v:0xbdf5d6,p:40},{id:'c2',t:'col',n:'Himmelblau',v:0xbfe3ff,p:40},{id:'c3',t:'col',n:'Flieder',v:0xe0c8ff,p:40},{id:'c4',t:'col',n:'Pfirsich',v:0xffd9c0,p:40},
{id:'o1',t:'out',n:'Rosa Kleid',v:0xff8fc4,p:50},{id:'o2',t:'out',n:'Türkis-Kleid',v:0x4fd1c5,p:50},{id:'o3',t:'out',n:'Gold-Kleid',v:0xf2c200,p:80},{id:'o4',t:'out',n:'Nacht-Kleid',v:0x2d2060,p:50},
{id:'a1',t:'acc',n:'Sonnenbrille',v:'glasses',p:60},{id:'a2',t:'acc',n:'Zylinder',v:'hat',p:80},{id:'a3',t:'acc',n:'Schal',v:'scarf',p:50}];
const UPC={cd:[5,10,20],hp:[5,10,15]},UPN={cd:'Spezial-Abklingzeit',hp:'Extra-Herz'};
const applyCat=()=>{scene.remove(P.g);P.g=cat(CAT());scene.add(P.g)};
const mk=(l,txt,on,f)=>{const b=document.createElement('button');b.className='big m'+(on?' on':'');b.textContent=txt;b.onclick=f;l.appendChild(b)};
const hd=(l,t)=>{const p=document.createElement('p');p.className='s';p.textContent=t;l.appendChild(p)};
function shopRender(){const l=$('sl');l.innerHTML='';$('sc').textContent=save.coins;$('sd').textContent=save.dia;const nm={col:'Fellfarben',out:'Kleider',acc:'Accessoires'};
 for(const t of['col','out','acc']){hd(l,nm[t]+' (für deine aktuelle Katze)');for(const it of SH.filter(x=>x.t===t)){const own=save.own.includes(it.id),on=save.eq[t]===it.v;mk(l,it.n+' · '+(on?'✔ an':own?'Anziehen':'🪙'+it.p),on,()=>{if(on)delete save.eq[t];else{if(!own){if(save.coins<it.p)return toast('Zu wenig Münzen');save.coins-=it.p;save.own.push(it.id)}save.eq[t]=it.v}applyCat();store();updCoins();shopRender()})}}
 hd(l,'Verbesserungen (Diamanten 💎)');
 for(const k of['cd','hp']){const lv=UP(k),c=UPC[k][lv];mk(l,UPN[k]+' Stufe '+lv+'/3'+(c?' · 💎'+c:' · MAX'),0,()=>{if(!c)return toast('Schon auf MAX');if(save.dia<c)return toast('Zu wenig Diamanten');save.dia-=c;save.up[k]=lv+1;store();updCoins();shopRender()})}}
const rw=r=>'🪙'+r[0]+(r[1]?' 💎'+r[1]:'');
function misRender(){dm();const l=$('ml');l.innerHTML='';hd(l,'Tagesmissionen – neue jeden Tag');for(const id of save.dm.ids){const m=MP.find(x=>x.id===id),p=Math.min(save.dm.p[m.k]||0,m.n),done=p>=m.n,cl=save.dm.cl[id];
 mk(l,m.t+' ('+p+'/'+m.n+') · '+(cl?'✔ erledigt':done?'Holen: '+rw(m.r):rw(m.r)),cl,()=>{if(!done||cl)return;save.dm.cl[id]=1;save.coins+=m.r[0];save.dia+=m.r[1];xp(20);store();updCoins();misRender()})}}
function rewRender(){const l=$('rl');l.innerHTML='';hd(l,'Level '+save.lv+' · XP '+save.xp+'/'+save.lv*100+' · 💎 '+save.dia);hd(l,'Besiegt: '+(save.st.kill||0)+' · Arenen: '+(save.st.arena||0)+' · Bosse: '+(save.st.boss||0)+' · Truhen: '+(save.st.chest||0));
 for(const a of ACH){const v=Math.min(save.st[a.k]||0,a.n),done=v>=a.n,cl=save.ach[a.id];mk(l,a.t+' ('+v+'/'+a.n+') · '+(cl?'✔':done?'Holen: '+rw(a.r):rw(a.r)),cl,()=>{if(!done||cl)return;save.ach[a.id]=1;save.coins+=a.r[0];save.dia+=a.r[1];xp(30);store();updCoins();rewRender()})}}
const panel=(btn,id,fn,back)=>{$(btn).onclick=()=>{show('menu',0);show(id,1);fn()};$(back).onclick=()=>{show(id,0);show('menu',1)}};
panel('mShop','shop',shopRender,'shback');panel('mMis','mis',misRender,'mback');panel('mRew','rew',rewRender,'rback');
function gfxExtras(){const lo=save.gfx==='low';for(const t of sway)if(t.userData&&t.userData.y!==undefined)t.visible=!lo;for(const c of clouds)c.visible=!lo;OUT.visible=!lo;for(const d of deco)d.visible=!lo;scene.fog.far=lo?80:120}
function setP(v){paused=v;$('pz').style.display=v?'flex':'none'}
$('pres').onclick=()=>setP(false);
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running&&!over)setP(true)});
addEventListener('keydown',e=>{if((e.code==='KeyP'||e.code==='Escape')&&running&&!over)setP(!paused)});
$('snd').textContent='Ton: '+(save.snd?'an':'aus');$('snd').onclick=()=>{save.snd=!save.snd;store();$('snd').textContent='Ton: '+(save.snd?'an':'aus')};
$('start').onclick=()=>{$('menu').style.display='none';running=true;gst=tm;P.hp=MAXHP();try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume()}catch(e){}try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}catch(e){}};
gfxExtras();hud();requestAnimationFrame(loop);
})();
