const V='kbw-v14';
const FILES=['./','index.html','style.css','game.js','manifest.json','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png','lib/three.min.js','https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>fetch(new Request(f,{cache:'reload'})).then(r=>{if(r&&(r.ok||r.type==='opaque'))return c.put(f,r)}).catch(()=>{}))).then(()=>self.skipWaiting())))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){const cp=n.clone();caches.open(V).then(c=>c.put(e.request,cp))}return n}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
