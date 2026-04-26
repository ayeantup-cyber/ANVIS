// ═══════════════════════════════════════════════════
//  BC NOTES ENGINE — SERVICE WORKER
//  Blue Comet / AIITØNE  |  bluecomet.work
//  Strategy: Cache-first for app shell, network-first for everything else
// ═══════════════════════════════════════════════════

const CACHE_NAME = 'bc-notes-v1';

// Files to pre-cache on install — the app shell
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap'
];

// ── INSTALL ──
// Pre-cache the app shell so the app loads offline immediately
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      // Cache what we can — font CDN may fail offline, that's fine
      return Promise.allSettled(
        PRECACHE.map(url => cache.add(url).catch(() => null))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ──
// Clean up old caches from previous versions
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// ── FETCH ──
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // NAVIGATION requests (loading the app itself) — cache-first
  // This makes the app load instantly offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then(function(cached) {
        if (cached) {
          // Serve from cache immediately, then update in background
          fetch(event.request).then(function(fresh) {
            caches.open(CACHE_NAME).then(c => c.put(event.request, fresh));
          }).catch(() => {});
          return cached;
        }
        // Not in cache yet — fetch and cache
        return fetch(event.request).then(function(response) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // FONT requests — cache-first, long lived
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // SAME-ORIGIN assets (manifest, icons, etc.) — cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // EVERYTHING ELSE — network-first, fall back to cache
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

// ── MESSAGE HANDLER ──
// Allow the app to trigger cache updates or SW version checks
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
