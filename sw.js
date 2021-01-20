const version = "v1";
const cacheName = `sw-${version}`;
const preCacheAssets = [
  "/",
  "./index.html",
  "./css/main.css",
  "./js/app.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(preCacheAssets);
    })
  );
});

self.addEventListener("active", (event) => {
  event.waitUntil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map((cache) => {
          if (cache !== cacheName) {
            console.log(`Service Worker: Clearing Old Cache`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp)=>{
      return resp || fetch(event.request,{
        mode:'cors'
      }).then((response)=>{
        let responseClone=response.clone();
        caches.open(cacheName).then((cache)=>{
          cache.put(event.request,responseClone)
        });
        return response
      })
    })
  )
});
