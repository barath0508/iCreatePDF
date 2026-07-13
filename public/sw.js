const CACHE_NAME = 'icreatepdf-offline-v1';
const STATIC_ASSETS = [
  '/',
  '/logo.png',
  '/manifest.json'
];

// On install, pre-cache the absolute core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests and ignore development hot module reload endpoints
  if (
    event.request.method !== 'GET' || 
    event.request.url.includes('_next/webpack-hmr') ||
    event.request.url.includes('chrome-extension') ||
    event.request.url.includes('localhost')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If cached response exists, return it, but fetch updated version in the background
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {}); // ignore failures (e.g. offline)
        return cachedResponse;
      }

      // If not cached, fetch from network and cache for next time
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
