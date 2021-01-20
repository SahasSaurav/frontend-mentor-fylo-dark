const version = "v2";
const cacheName = `sw-${version}`;
const preCacheAssets = [
  "/",
  "./index.html",
  "./css/main.css",
  "./js/app.js",
  "./images/bg-curvy-desktop.svg",
  "./images/bg-curvy-mobile.svg",
  "./images/bg-quotes.png",
  "./images/icon-access-anywhere.svg",
  "./images/icon-any-file.svg",
  "./images/icon-arrow.svg",
  "./images/icon-collaboration.svg",
  "./images/icon-email.svg",
  "./images/icon-hamburger.svg",
  "./images/icon-location.svg",
  "./images/icon-phone.svg",
  "./images/icon-security.svg",
  "./images/illustration-intro.png",
  "./images/illustration-stay-productive.png",
  "./images/logo.svg",
  "./images/profile-1.jpg",
  "./images/profile-2.jpg",
  "./images/profile-3.jpg",
  "https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap",
  `https://kit.fontawesome.com/c60f73f892.js"
  crossorigin`,
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
    caches.match(event.request).then((resp) => {
      return (
        resp ||
        fetch(event.request, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          mode: "cors",
        }).then((response) => {
          let responseClone = response.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
      );
    })
  );
});
