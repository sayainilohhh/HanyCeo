/* PioFinance service worker. Naikkan VERSI setiap kali merilis pembaruan. */
const VERSI='piofinance-v1.1.1',SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSI).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSI).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data==='SKIP')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(VERSI).then(c=>c.put('index.html',k));return x}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(h=>{const f=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const k=x.clone();caches.open(VERSI).then(c=>c.put(r,k))}return x}).catch(()=>h);return h||f}))});
