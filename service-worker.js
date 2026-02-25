const CACHE_NAME = 'portfolio-cache-v3';  // 🔁 Update this on every deploy

const ASSETS_TO_CACHE = [
  '/',
    '/index.html',
    '/about.html',
    'projects.html',
    '/resume.html',
    '/styles.css',
    '/about.css',
    '/projects.css',
    '/resume.css',
    '/script.js',
    '/about.js',
    '/projects.js',
    '/resume.js',
    '/Assets',
    '/images',
    'PortfilioFaviocn'
];

// Install: cache core files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing & caching shell…');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting(); // ⚡ Activate immediately
});

// Activate: nuke all old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating & cleaning old caches…');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('[SW] Deleting old cache:', key);
          return caches.delete(key);
        }
      }))
    ).then(() => self.clients.claim()) // ⚡ Take control
  );
});

// Fetch: cache-first with background update
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchPromise = fetch(event.request)
        .then(async networkRes => {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkRes.clone());
          return networkRes;
        }).catch(() => {});

      // Serve cached, update in background
      return cached || fetchPromise;
    })
  );
});