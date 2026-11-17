(()=>{
const $=id=>document.getElementById(id);
let save={coins:0,best:0,cat:'princess',owned:['princess'],gfx:'mid'};try{Object.assign(save,JSON.parse(localStorage.getItem('kbw')||'{}'))}catch(e){}
const store=()=>{try{localStorage.setItem('kbw',JSON.stringify(save))}catch(e){}};
$('best').textContent=save.best;$('coins').textContent=save.coins;$('coins2').textContent=save.coins;
if(typeof THREE==='undefined'){$('err').style.display='block';return}
const R=renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});

const scene=new THREE.Scene();scene.background=new THREE.Color(0xffd9ec);scene.fog=new THREE.Fog(0xffd9ec,35,120);
const cam=new THREE.PerspectiveCamera(60,1,.1,200);
const rs=()=>{R.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};addEventListener('resize',rs);rs();
scene.add(new THREE.HemisphereLight(0xfff0f8,0xd9a6ff,.95));
const sun=new THREE.DirectionalLight(0xffffff,.7);sun.position.set(30,50,20);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-45,right:45,top:45,bottom:-45});scene.add(sun);scene.add(sun.target);
const GF={low:[1,0],mid:[1.5,512],high:[2,1024]};
function applyGfx(){const f=GF[save.gfx]||GF.mid;R.setPixelRatio(Math.min(devicePixelRatio,f[0]));R.shadowMap.enabled=!!f[1];sun.castShadow=!!f[1];if(f[1]){sun.shadow.mapSize.set(f[1],f[1]);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}}scene.traverse(o=>{if(o.material)o.material.needsUpdate=true});rs()}
applyGfx();
const mesh=(g,c,x=0,y=0,z=0)=>{const m=new THREE.Mesh(g,new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);m.castShadow=true;return m};
const G=new THREE.Mesh(new THREE.PlaneGeometry(400,400),new THREE.MeshLambertMaterial({color:0xffb6d9}));G.rotation.x=-Math.PI/2;G.receiveShadow=true;scene.add(G);
for(const r of [0,Math.PI/2]){const p=new THREE.Mesh(new THREE.PlaneGeometry(10,300),new THREE.MeshLambertMaterial({color:0xd8c4e8}));p.rotation.x=-Math.PI/2;p.rotation.z=r;p.position.y=.03;scene.add(p)}
const pal=[0xffffff,0xffd1e8,0xe6ccff,0xffb3d1,0xf5e1ff],blds=[],sway=[],clouds=[];
for(let i=-3;i<=3;i++)for(let j=-3;j<=3;j++){if(!i||!j)continue;
 const w=8+Math.random()*4,h=6+Math.random()*10,x=i*22,z=j*22;
 const b=mesh(new THREE.BoxGeometry(w,h,w),pal[(i*3+j+20)%5],x,h/2,z);b.receiveShadow=true;scene.add(b);
 scene.add(mesh(new THREE.ConeGeometry(w*.75,3,4),0xff6fb0,x,h+1.5,z)).rotation;
 blds.push({x,z,r:w/2+.8});
 const tx=x+11,tz=z+11,t=new THREE.Group();t.position.set(tx,0,tz);
 t.add(mesh(new THREE.CylinderGeometry(.3,.4,2.5,6),0x9a6b52,0,1.25,0),mesh(new THREE.SphereGeometry(1.8,10,8),0xff9ecb,0,3.5,0));scene.add(t);sway.push(t);
 for(let k=0;k<4;k++){const f=mesh(new THREE.SphereGeometry(.3,6,6),k%2?0xffffff:0xc58bff,tx+2+k*.8,.3,tz-2+k*.5);f.userData.y=f.position.y;scene.add(f);sway.push(f)}}
for(let i=0;i<10;i++){const c=new THREE.Group();for(let k=0;k<3;k++)c.add(mesh(new THREE.SphereGeometry(3-k*.5,8,6),0xffffff,k*3,0,0));c.position.set(Math.random()*200-100,30+Math.random()*10,Math.random()*200-100);scene.add(c);clouds.push(c)}
const CATS=[
{id:'princess',name:'Princess Kitty',c:0xffffff,a:0xff5fa8,acc:'crown',cost:0,desc:'Die klassische weiße Katze mit rosa Schleife und Krone.'},
{id:'magic',name:'Magic Kitty',c:0xe6ccff,a:0x9b5de5,acc:'star',cost:50,desc:'Lila Zauberkatze mit Stern.'},
{id:'ice',name:'Ice Kitty',c:0xcdeeff,a:0x5ec8ff,acc:'horn',cost:100,desc:'Eisblaue Katze mit Kristallhorn.'},
{id:'shadow',name:'Shadow Kitty',c:0x6b5b8f,a:0xff5fa8,e:0xffe36b,acc:'none',cost:150,desc:'Dunkle Katze mit leuchtenden Augen.'}];
function cat(d){d=d||CATS[0];const g=new THREE.Group(),W=d.c,P=d.a;
 if(d.acc==='crown')g.add(mesh(new THREE.ConeGeometry(.3,.35,5),0xffd84a,0,2.55,0));
 if(d.acc==='star')g.add(mesh(new THREE.OctahedronGeometry(.22),0xffe36b,0,2.7,0));
 if(d.acc==='horn')g.add(mesh(new THREE.ConeGeometry(.1,.55,6),0x9fe8ff,0,2.7,0));
 g.add(mesh(new THREE.SphereGeometry(.7,12,10),W,0,.8,0));
 const h=mesh(new THREE.SphereGeometry(.65,12,10),W,0,1.8,0);g.add(h);
 for(const s of[-1,1]){g.add(mesh(new THREE.ConeGeometry(.22,.45,4),W,s*.42,2.35,0));
  g.add(mesh(new THREE.SphereGeometry(.07,6,6),(d.e||0x442244),s*.25,1.85,.58));
  const a=mesh(new THREE.SphereGeometry(.2,6,6),W,s*.5,.2,0);a.name='leg'+s;g.add(a)}
 g.add(mesh(new THREE.SphereGeometry(.14,6,6),P,-.35,2.2,.4),mesh(new THREE.SphereGeometry(.14,6,6),P,-.6,2.15,.35),mesh(new THREE.SphereGeometry(.1,6,6),P,-.47,2.18,.45));
 return g}
const CAT=()=>CATS.find(c=>c.id===save.cat)||CATS[0];
const P={g:cat(CAT()),x:0,z:0,y:0,vy:0,hp:5,ammo:12,rel:0,inv:0,dash:0,cd:0,face:0};scene.add(P.g);
let yaw=0,kills=0,score=0,coins=0,over=false,running=false,t0=0;
const en=[],bl=[],ik={},st={x:0,y:0};
const hud=()=>{$('hp').textContent=P.hp;$('ammo').textContent=P.rel>0?'…':P.ammo;$('score').textContent=score;$('coins').textContent=save.coins+coins;$('kills').textContent=kills};
function spawn(){const a=Math.random()*6.28,d=25+Math.random()*10;
 const m=mesh(new THREE.SphereGeometry(.9,12,10),[0xb36bff,0x8ae0ff,0xffe36b][Math.random()*3|0],P.x+Math.sin(a)*d,.9,P.z+Math.cos(a)*d);
 m.userData={hp:3,sp:3+Math.random()*1.5};scene.add(m);en.push(m)}
function shoot(){if(P.cd>0||P.rel>0||over)return;if(P.ammo<=0){P.rel=1.2;return}
 P.ammo--;P.cd=.22;let dx=-Math.sin(yaw),dz=-Math.cos(yaw),best=.45;
 for(const e of en){const ex=e.position.x-P.x,ez=e.position.z-P.z,d=Math.hypot(ex,ez);if(d>30)continue;const a=Math.acos(Math.max(-1,Math.min(1,(ex*dx+ez*dz)/d)));if(a<best){best=a;dx=ex/d;dz=ez/d}}
 const b=mesh(new THREE.SphereGeometry(.3,8,8),0xff3d9a,P.x+dx,1.6,P.z+dz);b.material.emissive.setHex(0xff3d9a);b.userData={dx,dz,life:1.3};scene.add(b);bl.push(b);P.face=Math.atan2(dx,dz);if(P.ammo<=0)P.rel=1.2}
const key=(c,v)=>{ik[c]=v;if(v){if(c==='Space')jump();if(c==='ShiftLeft')dodge();if(c==='KeyR'){P.rel=1.2;P.ammo=12}}};
addEventListener('keydown',e=>{key(e.code,1)});addEventListener('keyup',e=>{key(e.code,0)});
const jump=()=>{if(P.y<=0.01)P.vy=10},dodge=()=>{if(P.dash<=0){P.dash=.25;P.inv=.4}};
let sh=0;const press=(id,f)=>{const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();f(1)});b.addEventListener('pointerup',()=>f(0));b.addEventListener('pointerleave',()=>f(0))};
press('bShoot',v=>sh=v);press('bJump',v=>v&&jump());press('bDodge',v=>v&&dodge());
const stk=$('stick'),kn=$('knob');let sid=null;
const mv=e=>{const r=stk.getBoundingClientRect(),cx=r.left+75,cy=r.top+75;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy),m=60;if(d>m){dx*=m/d;dy*=m/d}st.x=dx/m;st.y=-dy/m;kn.style.transform=`translate(${dx}px,${dy}px)`};
stk.addEventListener('pointerdown',e=>{sid=e.pointerId;stk.setPointerCapture(sid);mv(e)});
stk.addEventListener('pointermove',e=>{if(e.pointerId===sid)mv(e)});
const rel=()=>{sid=null;st.x=st.y=0;kn.style.transform=''};stk.addEventListener('pointerup',rel);stk.addEventListener('pointercancel',rel);
let lx=null;const lk=$('look');
lk.addEventListener('pointerdown',e=>{lx=e.clientX;lk.setPointerCapture(e.pointerId)});
lk.addEventListener('pointermove',e=>{if(lx!==null){yaw-=(e.clientX-lx)*.007;lx=e.clientX}});
lk.addEventListener('pointerup',()=>lx=null);lk.addEventListener('pointercancel',()=>lx=null);
function end(win){over=true;save.coins+=coins;save.best=Math.max(save.best,score);store();$('end').style.display='flex';$('endT').textContent=win?'🎉 Sieg!':'💔 Game Over';$('endS').textContent=`Punkte: ${score} · Münzen: +${coins}`}
let last=0,tm=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000||0,.05);last=now;tm+=dt;
 for(const t of sway){if(t.userData.y!==undefined)t.position.y=t.userData.y+Math.abs(Math.sin(tm*2+t.position.x))*.15;else t.rotation.z=Math.sin(tm+t.position.x)*.03}
 for(const c of clouds){c.position.x+=dt*2;if(c.position.x>110)c.position.x=-110}
 if(running&&!over){
  const ix=(ik.KeyD?1:0)-(ik.KeyA?1:0)+st.x,iy=(ik.KeyW?1:0)-(ik.KeyS?1:0)+st.y;
  yaw+=((ik.ArrowLeft?1:0)-(ik.ArrowRight?1:0))*dt*2.2;if(ik.KeyJ||sh)shoot();
  P.cd-=dt;P.inv-=dt;P.dash-=dt;if(P.rel>0){P.rel-=dt;if(P.rel<=0)P.ammo=12}
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
  let mx=fx*iy+rx*ix,mz=fz*iy+rz*ix;const ml=Math.hypot(mx,mz);
  if(ml>.05){const n=Math.min(1,ml),sp=(P.dash>0?18:7);mx=mx/ml*n;mz=mz/ml*n;P.x+=mx*sp*dt;P.z+=mz*sp*dt;if(!(ik.KeyJ||sh))P.face=Math.atan2(mx,mz)}
  for(const b of blds){const dx=P.x-b.x,dz=P.z-b.z,d=Math.hypot(dx,dz);if(d<b.r+.6){P.x=b.x+dx/d*(b.r+.6);P.z=b.z+dz/d*(b.r+.6)}}
  P.vy-=25*dt;P.y+=P.vy*dt;if(P.y<0){P.y=0;P.vy=0}
  P.g.position.set(P.x,P.y,P.z);P.g.rotation.y=P.face;
  const walk=ml>.05?Math.sin(tm*14)*.5:0;P.g.position.y+=Math.abs(walk)*.15;
  for(const s of[-1,1]){const l=P.g.getObjectByName('leg'+s);l.position.z=walk*s*.5}
  if(en.length<Math.min(3+(kills/3|0),7))spawn();
  for(let i=bl.length-1;i>=0;i--){const b=bl[i],u=b.userData;b.position.x+=u.dx*40*dt;b.position.z+=u.dz*40*dt;u.life-=dt;let hit=u.life<=0;
   for(const e of en)if(!hit&&Math.hypot(e.position.x-b.position.x,e.position.z-b.position.z)<1.2){hit=true;e.userData.hp--;e.material.emissive.setHex(0xffffff);e.userData.f=.1;e.userData.kx=u.dx;e.userData.kz=u.dz}
   if(hit){scene.remove(b);bl.splice(i,1)}}
  for(let i=en.length-1;i>=0;i--){const e=en[i],u=e.userData;
   if(u.hp<=0){scene.remove(e);en.splice(i,1);kills++;score+=100;coins++;if(kills>=15)end(true);continue}
   const dx=P.x-e.position.x,dz=P.z-e.position.z,d=Math.hypot(dx,dz)||1;
   e.position.x+=dx/d*u.sp*dt;e.position.z+=dz/d*u.sp*dt;e.scale.y=1+Math.sin(tm*8+i)*.12;
   if(u.f>0){u.f-=dt;e.position.x+=u.kx*6*dt;e.position.z+=u.kz*6*dt;if(u.f<=0)e.material.emissive.setHex(0)}
   if(d<1.7&&P.inv<=0&&P.y<1){P.hp--;P.inv=1;if(P.hp<=0)end(false)}}
  P.g.visible=P.inv<=0||Math.floor(tm*20)%2;hud()}
if(!running){yaw=tm*.25;P.g.position.set(P.x,Math.abs(Math.sin(tm*3))*.25,P.z);P.g.rotation.y=Math.sin(tm)*.6}
 const cx=P.x+Math.sin(yaw)*9*.94,cz=P.z+Math.cos(yaw)*9*.94;
 cam.position.set(cx,P.y+3.8,cz);cam.lookAt(P.x,P.y+1.8,P.z);sun.position.set(P.x+30,50,P.z+20);sun.target.position.set(P.x,0,P.z);
 R.render(scene,cam)}

const show=(id,v)=>$(id).style.display=v?'flex':'none';
const updCoins=()=>{$('coins').textContent=save.coins;$('coins2').textContent=save.coins;$('cc').textContent=save.coins};
let pr,ps,pc,pm,pi=0,pyaw=0;
function pl(){requestAnimationFrame(pl);if($('chars').style.display==='none'||!pm)return;pyaw+=.004;pm.rotation.y=pyaw;pm.position.y=Math.sin(performance.now()/400)*.08;const cv=$('pv'),w=cv.clientWidth,h=cv.clientHeight;if(!w)return;if(cv.width!==Math.round(w*2)){pr.setPixelRatio(2);pr.setSize(w,h,false)}pc.aspect=w/h;pc.updateProjectionMatrix();pr.render(ps,pc)}
function showCat(){const d=CATS[pi];if(pm)ps.remove(pm);pm=cat(d);ps.add(pm);$('cn').textContent=d.name;$('cs').textContent=d.desc;const own=save.owned.includes(d.id),b=$('cb');b.textContent=save.cat===d.id?'✔ Ausgewählt':own?'Auswählen':'Kaufen 🪙'+d.cost;b.disabled=save.cat===d.id||(!own&&save.coins<d.cost);$('cc').textContent=save.coins}
$('mChar').onclick=()=>{show('menu',0);show('chars',1);if(!pr){pr=new THREE.WebGLRenderer({canvas:$('pv'),antialias:true,alpha:true});ps=new THREE.Scene();ps.add(new THREE.HemisphereLight(0xffffff,0xd9a6ff,1.2));const dl=new THREE.DirectionalLight(0xffffff,.6);dl.position.set(3,5,4);ps.add(dl);pc=new THREE.PerspectiveCamera(40,1,.1,50);pc.position.set(0,1.6,7);pc.lookAt(0,1.4,0);let dx=null;const cv=$('pv');cv.addEventListener('pointerdown',e=>{dx=e.clientX;cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointermove',e=>{if(dx!==null){pyaw+=(e.clientX-dx)*.01;dx=e.clientX}});cv.addEventListener('pointerup',()=>dx=null);requestAnimationFrame(pl)}pi=Math.max(0,CATS.findIndex(c=>c.id===save.cat));showCat()};
$('cp').onclick=()=>{pi=(pi+CATS.length-1)%CATS.length;showCat()};$('cx').onclick=()=>{pi=(pi+1)%CATS.length;showCat()};
$('cb').onclick=()=>{const d=CATS[pi];if(!save.owned.includes(d.id)){if(save.coins<d.cost)return;save.coins-=d.cost;save.owned.push(d.id)}save.cat=d.id;store();scene.remove(P.g);P.g=cat(CAT());scene.add(P.g);showCat();updCoins()};
$('cback').onclick=()=>{show('chars',0);show('menu',1)};
const markG=()=>{for(const k of['low','mid','high'])$('g-'+k).classList.toggle('on',save.gfx===k)};
for(const k of['low','mid','high'])$('g-'+k).onclick=()=>{save.gfx=k;store();applyGfx();markG()};
$('mSet').onclick=()=>{show('menu',0);show('sets',1);markG()};$('sback').onclick=()=>{show('sets',0);show('menu',1)};
updCoins();
$('start').onclick=()=>{$('menu').style.display='none';running=true;try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}catch(e){}};
hud();requestAnimationFrame(loop);
})();
