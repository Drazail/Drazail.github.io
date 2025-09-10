const cacheName = "RarePixel-LightBound-0.1.6";
const contentToCache = [
    "Build/b475c9bc3c4ba0f30540d811f0b6bd86.loader.js",
    "Build/6834598621fc1a93f6081d602dad81cc.framework.js.unityweb",
    "Build/07dffadfeba4d7b38ec54ace0957ad6e.data.unityweb",
    "Build/e4e774fe56c5c5c8a60163f09c220f10.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
