// Monetag Service Worker Verification
self.options = {
    "domain": "5gvci.com",
    "zoneId": 11378575
};
self.lary = "";

try {
  importScripts('https://5gvci.com/act/files/service-worker.min.js?r=sw');
} catch (e) {
  console.warn('Monetag service worker script blocked or failed to load:', e);
}

const CACHE_NAME = 'icreatepdf-offline-v2';
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
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // ONLY handle same-origin requests (avoid intercepting Google Ads, Tag Manager, Analytics, etc.)
  if (url.origin !== self.location.origin) {
    return;
  }

  // Ignore Next.js webpack HMR and chrome extension urls
  if (
    url.pathname.includes('_next/webpack-hmr') ||
    url.pathname.startsWith('/chrome-extension')
  ) {
    return;
  }

  // Network-First strategy for HTML document navigation requests (routes)
  // This avoids ChunkLoadErrors when the HTML page is updated to point to new JS chunks.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline, try to return cached homepage or route
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Fallback to cached homepage root '/'
            return caches.match('/');
          });
        })
    );
    return;
  }

  // Stale-While-Revalidate strategy for static assets (images, scripts, styles)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Ignore network failures, fallback to cached version
        });

      return cachedResponse || fetchPromise;
    })
  );
});
