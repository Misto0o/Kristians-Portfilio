const CACHE_NAME = 'portfolio-cache-v3';  // Update this string when assets change to bust the cache

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

// During installation, pre-cache the application shell so the site can load offline
self.addEventListener('install', (event) => {
  console.log('[SW] Installing & caching shell…');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  // Immediately move to the activate phase so the new worker takes control
  self.skipWaiting();
});

// On activation, remove any old caches that don't match the current CACHE_NAME
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
    ).then(() => self.clients.claim()) // Ensure the service worker controls uncontrolled clients
  );
});

// Fetch handler implements a cache-first strategy with a background network update
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

      // Return cached response if available immediately; otherwise wait for network
      return cached || fetchPromise;
    })
  );
});