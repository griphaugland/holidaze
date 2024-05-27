const CACHE_NAME = "holidaze-cache-v1";
const urlsToCache = [
  "/",
  "/desktopimage2.webp",
  "/sydney.webp",
  "/newyork.webp",
  "/dubai.webp",
  "/england.webp",
  "/spain2.webp",
  "/mobileimage3.webp",
  "/cambodia.webp",
  "/china.webp",
  "/india.webp",
  "/desktopimage4.webp",
  "/desktopimage3.webp",
  "/italy.webp",
  // Add more image URLs as needed
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
