// =============================================================================
// Sundae PWA Service Worker
// Strategy: Anti-stale, network-first for navigation, conservative caching
// =============================================================================

const SW_VERSION = '__BUILD_ID__'; // Replaced at build time
const CACHE_PREFIX = 'sundae';
const STATIC_CACHE = `${CACHE_PREFIX}-static-${SW_VERSION}`;
const NAVIGATION_CACHE = `${CACHE_PREFIX}-nav-${SW_VERSION}`;

// Patterns that should NEVER be cached
const NO_CACHE_PATTERNS = [
  /\/api\//,
  /\/v1\//,
  /\/graphql/,
  /\/auth\//,
  /\/login/,
  /\/logout/,
  /\/oauth/,
  /\/_next\/data\//,      // Next.js data fetches (JSON) — always fresh
  /\/trpc\//,
  /\/socket/,
  /\/ws/,
];

// Static asset patterns eligible for SWR caching
const STATIC_ASSET_PATTERNS = [
  /\/_next\/static\//,
  /\/icons\//,
  /\/fonts\//,
  /\.(?:js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/,
];

// ─── INSTALL ────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log(`[SW] Installing v${SW_VERSION}`);
  // Skip waiting immediately — new SW takes over right away
  self.skipWaiting();
});

// ─── ACTIVATE ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log(`[SW] Activating v${SW_VERSION}`);
  event.waitUntil(
    (async () => {
      // Claim all clients immediately
      await self.clients.claim();

      // Purge old versioned caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== STATIC_CACHE && name !== NAVIGATION_CACHE)
          .map((name) => {
            console.log(`[SW] Purging old cache: ${name}`);
            return caches.delete(name);
          })
      );

      // Notify all clients that a new version is active
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => {
        client.postMessage({ type: 'SW_ACTIVATED', version: SW_VERSION });
      });
    })()
  );
});

// ─── FETCH ──────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Never cache non-GET requests
  if (request.method !== 'GET') return;

  // Never cache API / auth / data routes
  if (NO_CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))) return;

  // Navigation requests → NetworkFirst with 3s timeout
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithTimeout(request, NAVIGATION_CACHE, 3000));
    return;
  }

  // Static assets → StaleWhileRevalidate
  if (STATIC_ASSET_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Everything else — let it pass through to network (no caching)
});

// ─── STRATEGIES ─────────────────────────────────────────────────────────────

async function networkFirstWithTimeout(request, cacheName, timeoutMs) {
  const cache = await caches.open(cacheName);
  try {
    const networkResponse = await promiseWithTimeout(fetch(request), timeoutMs);
    if (networkResponse.ok) {
      // Cache successful navigation responses (clone before consuming)
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    // Network failed or timed out — try cache
    const cached = await cache.match(request);
    if (cached) {
      console.log(`[SW] Serving cached navigation: ${request.url}`);
      return cached;
    }
    // Nothing cached — return basic offline response
    return new Response(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Sundae – Offline</title><style>body{font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#0B0F1A;color:#fff;text-align:center}h1{font-size:1.5rem;margin-bottom:0.5rem}p{color:#9CA3AF;margin-bottom:1.5rem}button{background:#7C3AED;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:1rem;cursor:pointer}</style></head><body><div><h1>You\'re offline</h1><p>Check your connection and try again.</p><button onclick="location.reload()">Retry</button></div></body></html>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Start network fetch regardless
  const networkFetch = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);

  // Return cached immediately if available, otherwise wait for network
  return cached || (await networkFetch) || new Response('', { status: 504 });
}

function promiseWithTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout')), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

// ─── MESSAGE HANDLER ────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.source?.postMessage({ type: 'SW_VERSION', version: SW_VERSION });
  }
});
