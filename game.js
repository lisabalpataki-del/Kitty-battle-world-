(()=>{
const $=id=>document.getElementById(id);
let save={coins:0,best:0,cat:'princess',owned:['princess'],gfx:'mid',wp:'laser',wps:['laser']};try{Object.assign(save,JSON.parse(localStorage.getItem('kbw')||'{}'))}catch(e){}
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
const G=new THREE.Mesh(new THREE.PlaneGeometry(500,400),new THREE.MeshLambertMaterial({color:0xffb6d9}));G.rotation.x=-Math.PI/2;G.position.x=25;G.receiveShadow=true;scene.add(G);
for(const r of [0,Math.PI/2]){const p=new THREE.Mesh(new THREE.PlaneGeometry(10,460),new THREE.MeshLambertMaterial({color:0xd8c4e8}));p.rotation.x=-Math.PI/2;p.rotation.z=r;p.position.y=.03;scene.add(p)}
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
const sm=new Map(),SM=c=>{if(!sm.has(c))sm.set(c,new THREE.MeshLambertMaterial({color:c}));return sm.get(c)};
const sp=(g,c,x,y,z)=>{const m=new THREE.Mesh(g,SM(c));m.position.set(x,y,z);m.castShadow=true;return m};
const rnd=(a,b)=>a+Math.random()*(b-a),chests=[],fount=[];
let tt=0;const toast=m=>{const t=$('toast');t.textContent=m;t.style.opacity=1;clearTimeout(tt);tt=setTimeout(()=>t.style.opacity=0,1800)};
const fg=new THREE.Mesh(new THREE.PlaneGeometry(150,400),SM(0xc9f2c0));fg.rotation.x=-Math.PI/2;fg.position.set(155,.02,0);fg.receiveShadow=true;scene.add(fg);
const rv=new THREE.Mesh(new THREE.PlaneGeometry(9,400),new THREE.MeshLambertMaterial({color:0x8fd3ff,transparent:true,opacity:.8}));rv.rotation.x=-Math.PI/2;rv.position.set(100,.05,0);scene.add(rv);
scene.add(sp(new THREE.BoxGeometry(12,.4,10),0xe9a3c9,100,.25,0));
for(const s of[-1,1])scene.add(sp(new THREE.BoxGeometry(12,.9,.3),0xffffff,100,.8,s*5));
const trG=new THREE.CylinderGeometry(.3,.4,2.5,6),lfG=new THREE.SphereGeometry(1.8,8,6);
for(let i=0;i<80;i++){const x=rnd(112,227),z=rnd(-190,190);if(Math.abs(z)<8)continue;const t=new THREE.Group();t.position.set(x,0,z);t.add(sp(trG,0x9a6b52,0,1.25,0),sp(lfG,[0x7fd6a0,0xff9ecb,0xb7e8c8][i%3],0,3.6,0));scene.add(t);sway.push(t);blds.push({x,z,r:1})}
for(let i=0;i<14;i++){const x=rnd(115,215),z=(i%2?-1:1)*rnd(14,170),g=new THREE.Group();g.position.set(x,0,z);const b=sp(new THREE.SphereGeometry(3,12,10),0xff4d6d,0,3,0);b.scale.y=1.2;g.add(b,sp(new THREE.ConeGeometry(1.6,1.2,5),0x4cc36b,0,6.4,0));scene.add(g);blds.push({x,z,r:3.6})}
for(let i=0;i<6;i++){const x=rnd(118,215),z=(i%2?-1:1)*rnd(20,160),g=new THREE.Group();g.position.set(x,0,z);const r=sp(new THREE.ConeGeometry(4,2.4,4),0xff6fb0,0,5.2,0);r.rotation.y=Math.PI/4;g.add(sp(new THREE.BoxGeometry(5,4,5),0xffe4f1,0,2,0),r);scene.add(g);blds.push({x,z,r:4.2})}
const flG=new THREE.SphereGeometry(.28,6,6);
for(let i=0;i<100;i++){const f=sp(flG,[0xff9ecb,0xffffff,0xc58bff,0xffe36b][i%4],rnd(108,225),.3,rnd(-190,190));f.userData.y=.3;scene.add(f);sway.push(f)}
function chest(x,z){const c=new THREE.Group();c.position.set(x,0,z);c.add(sp(new THREE.BoxGeometry(1.4,.9,1),0x9a6b52,0,.45,0),sp(new THREE.BoxGeometry(1.5,.4,1.1),0xffd84a,0,1.05,0));scene.add(c);chests.push(c)}
for(let i=0;i<8;i++)chest(rnd(120,220),(i%2?-1:1)*rnd(15,170));
for(const[i,j]of[[-1,-1],[1,-1],[-1,1],[1,1]])chest(i*22+14,j*22+11);
scene.add(sp(new THREE.CylinderGeometry(2.4,2.6,.7,16),0xffffff,11,.35,11),sp(new THREE.CylinderGeometry(2,2,.1,16),0x8fd3ff,11,.7,11),sp(new THREE.CylinderGeometry(.3,.4,2,8),0xffd1e8,11,1.5,11));
for(let i=0;i<6;i++){const s=sp(new THREE.SphereGeometry(.18,6,6),0x8fd3ff,11,1.5,11);scene.add(s);fount.push(s)}
blds.push({x:11,z:11,r:3});
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
function cat(d){d=d||CATS[0];const g=new THREE.Group(),W=d.c,P=d.a;
 const A=d.acc;
 if(A.includes('crown'))g.add(mesh(new THREE.ConeGeometry(.3,.35,5),0xffd84a,0,2.55,0));
 if(A.includes('star'))g.add(mesh(new THREE.OctahedronGeometry(.22),0xffe36b,0,2.7,0));
 if(A.includes('horn'))g.add(mesh(new THREE.ConeGeometry(.1,.55,6),0x9fe8ff,0,2.7,0));
 if(A.includes('flame')){g.add(mesh(new THREE.ConeGeometry(.2,.6,5),0xff7a30,0,2.65,0),mesh(new THREE.ConeGeometry(.14,.5,5),0xffd84a,.2,2.6,0))}
 if(A.includes('halo')){const h=mesh(new THREE.TorusGeometry(.35,.05,6,16),0xffd84a,0,2.8,0);h.rotation.x=Math.PI/2;g.add(h)}
 if(A.includes('wings'))for(const s of[-1,1]){const w=mesh(new THREE.SphereGeometry(.45,8,6),0xffffff,s*.55,1.2,-.55);w.scale.set(.25,1,.6);w.rotation.z=s*.4;g.add(w)}
 if(A.includes('devil'))for(const s of[-1,1]){const h=mesh(new THREE.ConeGeometry(.08,.35,5),0xb01c5a,s*.2,2.45,.1);h.rotation.z=-s*.3;g.add(h)}
 if(A.includes('band'))g.add(mesh(new THREE.CylinderGeometry(.67,.67,.14,12),0xff2e7e,0,2.1,0));
 if(A.includes('rainbow'))[0xff5f5f,0xffe36b,0x6bd6ff].forEach((c,i)=>g.add(mesh(new THREE.SphereGeometry(.13,6,6),c,(i-1)*.25,2.5,0)));
 if(A.includes('crystal')){const c=mesh(new THREE.OctahedronGeometry(.28),0x7ae0e0,0,2.75,0);c.scale.y=1.6;g.add(c)}
 if(d.o)g.add(mesh(new THREE.CylinderGeometry(.5,.82,.45,10),d.o,0,.42,0));
 g.add(mesh(new THREE.SphereGeometry(.7,12,10),W,0,.8,0));
 const h=mesh(new THREE.SphereGeometry(.65,12,10),W,0,1.8,0);g.add(h);
 for(const s of[-1,1]){g.add(mesh(new THREE.ConeGeometry(.22,.45,4),W,s*.42,2.35,0));
  g.add(mesh(new THREE.SphereGeometry(.07,6,6),(d.e||0x442244),s*.25,1.85,.58));
  const a=mesh(new THREE.SphereGeometry(.2,6,6),W,s*.5,.2,0);a.name='leg'+s;g.add(a)}
 g.add(mesh(new THREE.SphereGeometry(.14,6,6),P,-.35,2.2,.4),mesh(new THREE.SphereGeometry(.14,6,6),P,-.6,2.15,.35),mesh(new THREE.SphereGeometry(.1,6,6),P,-.47,2.18,.45));
 return g}
const CAT=()=>CATS.find(c=>c.id===save.cat)||CATS[0];
const P={g:cat(CAT()),x:0,z:0,y:0,vy:0,hp:5,ammo:12,rel:0,inv:0,dash:0,cd:0,face:0,spc:0,spd:0};scene.add(P.g);
let yaw=0,kills=0,score=0,coins=0,over=false,running=false,t0=0;
const en=[],bl=[],ik={},st={x:0,y:0};
const hud=()=>{$('hp').textContent=Math.max(0,P.hp);$('ammo').textContent=P.rel>0?'…':P.ammo;$('score').textContent=score;$('coins').textContent=save.coins+coins;$('kills').textContent=kills;$('bSpec').textContent=P.spc>0?Math.ceil(P.spc):SPN[SPECIAL[save.cat]||'nova'][1]};
const ET=[
{n:'Schattenkatze',c:0x3b2f4f,hp:2,sp:5.5,r:.8,b:'chase',z:'c',w:3,ear:1},
{n:'Roboter',c:0x9aa7b8,hp:4,sp:3,r:.9,b:'shoot',z:'c',w:2,fr:2,keep:12,sq:1},
{n:'Dunkler Hase',c:0x5b3a8a,hp:3,sp:4.5,r:.8,b:'dodge',z:'c',w:2,ear:2},
{n:'Magier',c:0xb36bff,hp:3,sp:2.5,r:.8,b:'shoot',z:'c',w:1.5,fr:2.6,keep:16,bs:9},
{n:'Erdbeer-Monster',c:0xff4d6d,hp:3,sp:4,r:.9,b:'chase',z:'f',w:3},
{n:'Monster',c:0x6fd68a,hp:6,sp:2.8,r:1.2,b:'chase',z:'f',w:1.5},
{n:'Feuergegner',c:0xff8a3d,hp:4,sp:3.5,r:.9,b:'charge',z:'f',w:2},
{n:'Eisgegner',c:0x9fdcff,hp:4,sp:2.8,r:.9,b:'shoot',z:'f',w:2,fr:1.8,keep:13,bs:11},
{n:'Gummi-Hüpfer',c:0xff8ac0,hp:2,sp:5,r:.8,b:'hop',z:'b',w:2},
{n:'Wächter',c:0x8a8aa8,hp:12,sp:1.8,r:1.6,b:'chase',z:'b',w:.4,dmg:2,sq:1}];
const ebl=[];
function mkEn(t){const g=new THREE.Group(),r=t.r;
 const body=t.sq?mesh(new THREE.BoxGeometry(r*1.8,r*1.8,r*1.8),t.c,0,r,0):mesh(new THREE.SphereGeometry(r,12,10),t.c,0,r,0);g.add(body);
 for(const s of[-1,1]){g.add(mesh(new THREE.SphereGeometry(r*.17,6,6),0xffffff,s*r*.35,r*1.15,r*.8),mesh(new THREE.SphereGeometry(r*.09,6,6),0x221133,s*r*.35,r*1.15,r*.95));
  if(t.ear){const e=mesh(new THREE.ConeGeometry(r*.2,r*(t.ear===2?1.2:.5),4),t.c,s*r*.5,r*(t.ear===2?2.1:1.8),0);g.add(e)}}
 const bg=new THREE.Sprite(new THREE.SpriteMaterial({color:0x4a2a4a,depthTest:false})),fl=new THREE.Sprite(new THREE.SpriteMaterial({color:0xff4d9a,depthTest:false}));
 bg.renderOrder=10;fl.renderOrder=11;for(const s of[bg,fl]){s.center.set(0,.5);s.visible=false;scene.add(s)}
 g.userData={hp:t.hp,t,body,r,cd:Math.random()*2,dash:0,f:0,kx:0,kz:0,bg,fl};return g}
function spawn(){const a=Math.random()*6.28,d=25+Math.random()*10,x=Math.max(-185,Math.min(220,P.x+Math.sin(a)*d)),z=Math.max(-185,Math.min(185,P.z+Math.cos(a)*d)),f=x>96;
 const L=ET.filter(t=>t.z==='b'||t.z===(f?'f':'c')),W=L.reduce((s,t)=>s+t.w,0);let q=Math.random()*W,t=L[0];for(const k of L){q-=k.w;if(q<=0){t=k;break}}
 const g=mkEn(t);g.position.set(x,0,z);scene.add(g);en.push(g)}
const hurt=n=>{P.hp-=n;P.inv=1;P.shk=.25;dn(P.g.position,'-'+n,'#ff4d6d');if(P.hp<=0)end(false)};
function shootE(e,nx,nz,t){const b=mesh(new THREE.SphereGeometry(.3,8,8),t.c,e.position.x+nx,1.3,e.position.z+nz);b.material.emissive.setHex(t.c);b.userData={dx:nx,dz:nz,s:t.bs||13,life:2.5};scene.add(b);ebl.push(b)}
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
function dmg(e,n){const u=e.userData;u.hp-=n;u.body.material.emissive.setHex(0xffffff);u.f=.12;burst(e.position.x,1.2,e.position.z,0xffffff,5,4);dn(e.position,'-'+n,'#fff3a0')}
function bul(dx,dz,w){let b;if(w.id==='heart'){b=new THREE.Group();const c=mesh(new THREE.ConeGeometry(.42,.6,6),0xff3d7f,0,-.2,0);c.rotation.x=Math.PI;b.add(mesh(new THREE.SphereGeometry(.28,8,8),0xff3d7f,-.18,.1,0),mesh(new THREE.SphereGeometry(.28,8,8),0xff3d7f,.18,.1,0),c)}
 else{b=mesh(new THREE.SphereGeometry(w.id==='glitter'?.18:.3,8,8),w.col,0,0,0);b.material.emissive.setHex(w.col)}
 b.position.set(P.x+dx,1.6,P.z+dz);b.userData={dx,dz,life:1.3,d:w.d,s:w.s};scene.add(b);bl.push(b)}
function shoot(){const w=WN();if(P.cd>0||P.rel>0||over)return;if(P.ammo<=0){P.rel=w.rl;return}
 P.ammo--;P.cd=w.cd;let dx=-Math.sin(yaw),dz=-Math.cos(yaw),best=.45;
 for(const e of en){const ex=e.position.x-P.x,ez=e.position.z-P.z,d=Math.hypot(ex,ez);if(d>30)continue;const a=Math.acos(Math.max(-1,Math.min(1,(ex*dx+ez*dz)/d)));if(a<best){best=a;dx=ex/d;dz=ez/d}}
 for(let k=0;k<w.n;k++){const a=w.n>1?(k/(w.n-1)-.5)*w.sp:0,c=Math.cos(a),s=Math.sin(a);bul(dx*c-dz*s,dx*s+dz*c,w)}
 burst(P.x+dx,1.6,P.z+dz,w.col,4,3);P.face=Math.atan2(dx,dz);if(P.ammo<=0)P.rel=w.rl}
function special(){if(P.spc>0||over||!running)return;const k=SPECIAL[save.cat]||'nova',px=P.x,pz=P.z;P.spc=12;
 if(k==='heal'){P.hp=Math.min(5,P.hp+3);dn(P.g.position,'+❤️','#ff7eb6');burst(px,1.5,pz,0xff7eb6,18,5);ring(px,pz,0xff7eb6,5)}
 else if(k==='nova'){ring(px,pz,0xff8a3d,10);burst(px,1,pz,0xffb347,24,8);for(const e of en)if(Math.hypot(e.position.x-px,e.position.z-pz)<10)dmg(e,4)}
 else if(k==='burst'){for(let i=0;i<12;i++){const a=i/12*6.283;bul(Math.sin(a),Math.cos(a),{id:'x',d:2,s:30,col:0xffe36b})}ring(px,pz,0xffe36b,3)}
 else if(k==='freeze'){ring(px,pz,0x5ec8ff,16);for(const e of en)if(Math.hypot(e.position.x-px,e.position.z-pz)<16)e.userData.frz=3.5}
 else if(k==='shield'){P.inv=4;ring(px,pz,0x9b5de5,3);dn(P.g.position,'🛡️','#fff')}
 else if(k==='speed'){P.spd=5;dn(P.g.position,'⚡','#ffe36b')}}
function swapW(){const o=WP.filter(w=>save.wps.includes(w.id));if(o.length<2){toast('Keine weitere Waffe – im Menü unter Waffen kaufen');return}const i=o.findIndex(w=>w.id===save.wp);save.wp=o[(i+1)%o.length].id;P.ammo=WN().mag;P.rel=0;store();toast('🔫 '+WN().name)}

const key=(c,v)=>{ik[c]=v;if(v){if(c==='Space')jump();if(c==='ShiftLeft')dodge();if(c==='KeyR'&&P.ammo<WN().mag)P.rel=1.2;if(c==='KeyE')special();if(c==='KeyQ')swapW()}};
addEventListener('keydown',e=>{key(e.code,1)});addEventListener('keyup',e=>{key(e.code,0)});
const jump=()=>{if(P.y<=0.01)P.vy=10},dodge=()=>{if(P.dash<=0){P.dash=.25;P.inv=.4}};
let sh=0;const press=(id,f)=>{const b=$(id);b.addEventListener('pointerdown',e=>{e.preventDefault();f(1)});b.addEventListener('pointerup',()=>f(0));b.addEventListener('pointerleave',()=>f(0))};
press('bShoot',v=>sh=v);press('bJump',v=>v&&jump());press('bDodge',v=>v&&dodge());press('bSpec',v=>v&&special());press('bSwap',v=>v&&swapW());
const stk=$('stick'),kn=$('knob');let sid=null;
const mv=e=>{const r=stk.getBoundingClientRect(),cx=r.left+75,cy=r.top+75;let dx=e.clientX-cx,dy=e.clientY-cy;const d=Math.hypot(dx,dy),m=60;if(d>m){dx*=m/d;dy*=m/d}st.x=dx/m;st.y=-dy/m;kn.style.transform=`translate(${dx}px,${dy}px)`};
stk.addEventListener('pointerdown',e=>{sid=e.pointerId;stk.setPointerCapture(sid);mv(e)});
stk.addEventListener('pointermove',e=>{if(e.pointerId===sid)mv(e)});
const rel=()=>{sid=null;st.x=st.y=0;kn.style.transform=''};stk.addEventListener('pointerup',rel);stk.addEventListener('pointercancel',rel);
let lx=null;const lk=$('look');
lk.addEventListener('pointerdown',e=>{lx=e.clientX;lk.setPointerCapture(e.pointerId)});
lk.addEventListener('pointermove',e=>{if(lx!==null){yaw-=(e.clientX-lx)*.007;lx=e.clientX}});
lk.addEventListener('pointerup',()=>lx=null);lk.addEventListener('pointercancel',()=>lx=null);
function end(win){over=true;P.win=win;save.coins+=coins;save.best=Math.max(save.best,score);store();$('end').style.display='flex';$('endT').textContent=win?'🎉 Sieg!':'💔 Game Over';$('endS').textContent=`Punkte: ${score} · Münzen: +${coins}`}
let last=0,tm=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min((now-last)/1000||0,.05);last=now;tm+=dt;
 for(const t of sway){if(t.userData.y!==undefined)t.position.y=t.userData.y+Math.abs(Math.sin(tm*2+t.position.x))*.15;else t.rotation.z=Math.sin(tm+t.position.x)*.03}
 for(const c of clouds){c.position.x+=dt*2;if(c.position.x>240)c.position.x=-120}
 rv.material.opacity=.72+Math.sin(tm*2)*.1;rv.scale.x=1+Math.sin(tm)*.04;
 fount.forEach((s,i)=>{const a=i*1.05+tm*2,k=(tm*1.5+i/6)%1;s.position.set(11+Math.cos(a)*k*1.5,.9+(1-(2*k-1)**2)*1.7,11+Math.sin(a)*k*1.5)});
 for(let i=parts.length-1;i>=0;i--){const m=parts[i],u=m.userData;u.life-=dt;if(u.ring){const k=1-u.life/u.max;m.scale.setScalar(.5+k*u.ring);m.material.opacity=1-k}else{m.position.x+=u.vx*dt;m.position.y+=u.vy*dt;m.position.z+=u.vz*dt;u.vy-=12*dt;m.scale.setScalar(Math.max(.01,u.life/.6))}if(u.life<=0||m.position.y<0){scene.remove(m);if(u.ring)m.material.dispose();parts.splice(i,1)}}
 if(running&&!over){
  const ix=(ik.KeyD?1:0)-(ik.KeyA?1:0)+st.x,iy=(ik.KeyW?1:0)-(ik.KeyS?1:0)+st.y;
  yaw+=((ik.ArrowLeft?1:0)-(ik.ArrowRight?1:0))*dt*2.2;if(ik.KeyJ||sh)shoot();
  P.cd-=dt;P.inv-=dt;P.dash-=dt;P.spc-=dt;P.spd-=dt;if(P.rel>0){P.rel-=dt;if(P.rel<=0)P.ammo=WN().mag}
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw),rx=Math.cos(yaw),rz=-Math.sin(yaw);
  let mx=fx*iy+rx*ix,mz=fz*iy+rz*ix;const ml=Math.hypot(mx,mz);
  if(ml>.05){const n=Math.min(1,ml),sp=(P.dash>0?18:7)*(P.spd>0?1.7:1);mx=mx/ml*n;mz=mz/ml*n;P.x+=mx*sp*dt;P.z+=mz*sp*dt;if(!(ik.KeyJ||sh))P.face=Math.atan2(mx,mz)}
  for(const b of blds){const dx=P.x-b.x,dz=P.z-b.z,d=Math.hypot(dx,dz);if(d<b.r+.6){P.x=b.x+dx/d*(b.r+.6);P.z=b.z+dz/d*(b.r+.6)}}
  P.x=Math.max(-190,Math.min(225,P.x));P.z=Math.max(-190,Math.min(190,P.z));
  const zn=P.x<80?'Pink City':P.x<96?'Fluss':'Strawberry Forest';if(zn!==zone){zone=zn;$('zone').textContent=zn}
  for(let i=chests.length-1;i>=0;i--){const c=chests[i];c.rotation.y+=dt;if(Math.hypot(c.position.x-P.x,c.position.z-P.z)<2.4){scene.remove(c);chests.splice(i,1);coins+=5;score+=250;toast('🎁 Schatztruhe! +5 🪙')}}
  P.vy-=25*dt;P.y+=P.vy*dt;if(P.y<0){P.y=0;P.vy=0}
  P.g.position.set(P.x,P.y,P.z);P.g.rotation.y=P.face;P.g.scale.set(1,1+Math.min(Math.abs(P.vy)*.01,.12),1);P.g.scale.multiplyScalar(1+Math.min(Math.max(P.cd,0),.15)*.5);
  const walk=ml>.05?Math.sin(tm*14)*.5:0;P.g.position.y+=Math.abs(walk)*.15;
  for(const s of[-1,1]){const l=P.g.getObjectByName('leg'+s);l.position.z=walk*s*.5}
  if(en.length<Math.min(3+(kills/3|0),7))spawn();
  for(let i=bl.length-1;i>=0;i--){const b=bl[i],u=b.userData;b.position.x+=u.dx*u.s*dt;b.position.z+=u.dz*u.s*dt;u.life-=dt;let hit=u.life<=0;
   for(const e of en)if(!hit&&Math.hypot(e.position.x-b.position.x,e.position.z-b.position.z)<e.userData.r+.5){hit=true;dmg(e,u.d);e.userData.body.material.emissive.setHex(0xffffff);e.userData.f=.1;e.userData.kx=u.dx;e.userData.kz=u.dz}
   if(hit){scene.remove(b);bl.splice(i,1)}}
  for(let i=ebl.length-1;i>=0;i--){const b=ebl[i],u=b.userData;b.position.x+=u.dx*u.s*dt;b.position.z+=u.dz*u.s*dt;u.life-=dt;let h=u.life<=0;
   if(!h&&P.inv<=0&&P.y<2.2&&Math.hypot(b.position.x-P.x,b.position.z-P.z)<1){h=true;hurt(1)}
   if(h){scene.remove(b);ebl.splice(i,1)}}
  for(let i=en.length-1;i>=0;i--){const e=en[i],u=e.userData,t=u.t;
   if(u.hp<=0){scene.remove(e,u.bg,u.fl);en.splice(i,1);kills++;burst(e.position.x,1,e.position.z,t.c,16,7);ring(e.position.x,e.position.z,t.c,2.5);score+=50*t.hp;coins+=t.hp>=6?4:1;if(kills>=15)end(true);continue}
   const dx=P.x-e.position.x,dz=P.z-e.position.z,d=Math.hypot(dx,dz)||1,nx=dx/d,nz=dz/d;u.cd-=dt;let sp=t.sp,mx=nx,mz=nz;
   if(t.b==='shoot'){if(d<t.keep)mx=-nx,mz=-nz;else if(d<t.keep+4)sp=0;if(u.cd<=0&&d<28){u.cd=t.fr;shootE(e,nx,nz,t)}}
   else if(t.b==='dodge'){const s=Math.sin(tm*3+i*2);mx=nx-nz*s*.9;mz=nz+nx*s*.9}
   else if(t.b==='charge'){if(u.cd<=0&&d<20){u.cd=3.5;u.dash=.5}if(u.dash>0){u.dash-=dt;sp=t.sp*3.2}}
   else if(t.b==='hop'){e.position.y=Math.abs(Math.sin(tm*5+i))*1.6;sp=t.sp*(e.position.y>.3?1:.2)}
   e.position.x+=mx*sp*dt;e.position.z+=mz*sp*dt;e.rotation.y=Math.atan2(nx,nz);u.body.scale.y=1+Math.sin(tm*8+i)*.1;
   if(u.f>0){u.f-=dt;e.position.x+=u.kx*6*dt;e.position.z+=u.kz*6*dt;if(u.f<=0)u.body.material.emissive.setHex(0)}
   if(d<1.2+t.r&&P.inv<=0&&P.y<1.2)hurt(t.dmg||1)}
  for(const e of en){const u=e.userData,sh=u.hp<u.t.hp&&u.hp>0;u.bg.visible=u.fl.visible=sh;if(sh){u.bg.position.set(e.position.x-Math.cos(yaw)*.7,e.position.y+u.r*2.4+.6,e.position.z+Math.sin(yaw)*.7);u.fl.position.copy(u.bg.position);u.fl.scale.set(1.4*u.hp/u.t.hp,.2,1)}}
  P.g.visible=P.inv<=0||P.inv>1.05||Math.floor(tm*20)%2;hud()}
if(!running){yaw=tm*.25;P.g.position.set(P.x,Math.abs(Math.sin(tm*3))*.25,P.z);P.g.rotation.y=Math.sin(tm)*.6}
 const cx=P.x+Math.sin(yaw)*9*.94,cz=P.z+Math.cos(yaw)*9*.94;
 if(over&&P.win){P.g.position.y=Math.abs(Math.sin(tm*6))*1.2;P.g.rotation.y+=dt*6}
 cam.position.set(cx,P.y+3.8,cz);if(P.shk>0){P.shk-=dt;cam.position.x+=(Math.random()-.5)*.5;cam.position.y+=(Math.random()-.5)*.5}cam.lookAt(P.x,P.y+1.8,P.z);sun.position.set(P.x+30,50,P.z+20);sun.target.position.set(P.x,0,P.z);
 R.render(scene,cam)}

const show=(id,v)=>$(id).style.display=v?'flex':'none';
const updCoins=()=>{$('coins').textContent=save.coins;$('coins2').textContent=save.coins;$('cc').textContent=save.coins;$('wc').textContent=save.coins};
let pr,ps,pc,pm,pi=0,pyaw=0;
function pl(){requestAnimationFrame(pl);if($('chars').style.display==='none'||!pm)return;pyaw+=.004;pm.rotation.y=pyaw;pm.position.y=Math.sin(performance.now()/400)*.08;const cv=$('pv'),w=cv.clientWidth,h=cv.clientHeight;if(!w)return;if(cv.width!==Math.round(w*2)){pr.setPixelRatio(2);pr.setSize(w,h,false)}pc.aspect=w/h;pc.updateProjectionMatrix();pr.render(ps,pc)}
function showCat(){const d=CATS[pi];if(pm)ps.remove(pm);pm=cat(d);ps.add(pm);$('cn').textContent=d.name;$('cs').textContent=d.desc+' Spezial: '+SPN[SPECIAL[d.id]].join(' ');const own=save.owned.includes(d.id),b=$('cb');b.textContent=save.cat===d.id?'✔ Ausgewählt':own?'Auswählen':'Kaufen 🪙'+d.cost;b.disabled=save.cat===d.id||(!own&&save.coins<d.cost);$('cc').textContent=save.coins}
$('mChar').onclick=()=>{show('menu',0);show('chars',1);if(!pr){pr=new THREE.WebGLRenderer({canvas:$('pv'),antialias:true,alpha:true});ps=new THREE.Scene();ps.add(new THREE.HemisphereLight(0xffffff,0xd9a6ff,1.2));const dl=new THREE.DirectionalLight(0xffffff,.6);dl.position.set(3,5,4);ps.add(dl);pc=new THREE.PerspectiveCamera(40,1,.1,50);pc.position.set(0,1.6,7);pc.lookAt(0,1.4,0);let dx=null;const cv=$('pv');cv.addEventListener('pointerdown',e=>{dx=e.clientX;cv.setPointerCapture(e.pointerId)});cv.addEventListener('pointermove',e=>{if(dx!==null){pyaw+=(e.clientX-dx)*.01;dx=e.clientX}});cv.addEventListener('pointerup',()=>dx=null);requestAnimationFrame(pl)}pi=Math.max(0,CATS.findIndex(c=>c.id===save.cat));showCat()};
$('cp').onclick=()=>{pi=(pi+CATS.length-1)%CATS.length;showCat()};$('cx').onclick=()=>{pi=(pi+1)%CATS.length;showCat()};
$('cb').onclick=()=>{const d=CATS[pi];if(!save.owned.includes(d.id)){if(save.coins<d.cost)return;save.coins-=d.cost;save.owned.push(d.id)}save.cat=d.id;store();scene.remove(P.g);P.g=cat(CAT());scene.add(P.g);showCat();updCoins()};
$('cback').onclick=()=>{show('chars',0);show('menu',1)};
const markG=()=>{for(const k of['low','mid','high'])$('g-'+k).classList.toggle('on',save.gfx===k)};
for(const k of['low','mid','high'])$('g-'+k).onclick=()=>{save.gfx=k;store();applyGfx();markG()};
$('mSet').onclick=()=>{show('menu',0);show('sets',1);markG()};$('sback').onclick=()=>{show('sets',0);show('menu',1)};
updCoins();
function wpRender(){const l=$('wl');l.innerHTML='';for(const w of WP){const own=save.wps.includes(w.id),b=document.createElement('button');b.className='big m'+(save.wp===w.id?' on':'');b.textContent=w.name+' ('+w.desc+') · '+(save.wp===w.id?'✔':own?'Auswählen':'🪙'+w.cost);b.onclick=()=>{if(!own){if(save.coins<w.cost)return;save.coins-=w.cost;save.wps.push(w.id)}save.wp=w.id;P.ammo=w.mag;store();wpRender();updCoins()};l.appendChild(b)}}
$('mWp').onclick=()=>{show('menu',0);show('wp',1);wpRender()};$('wback').onclick=()=>{show('wp',0);show('menu',1)};
$('start').onclick=()=>{$('menu').style.display='none';running=true;try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}catch(e){}};
hud();requestAnimationFrame(loop);
})();
