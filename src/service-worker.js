/* eslint-env serviceworker */
/* global clients */

// MealMaster service worker.
// Two jobs: keep the app usable without a network, and deliver meal reminders
// while the app is closed. Workbox replaces self.__WB_MANIFEST at build time
// with the hashed asset list — nothing else here depends on Workbox.

const VERSION = 'v1';
const PRECACHE = `mealmaster-precache-${VERSION}`;
const RUNTIME = `mealmaster-runtime-${VERSION}`;
const APP_SHELL = '/index.html';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const PRECACHE_URLS = [
  ...new Set(
    (self.__WB_MANIFEST || [])
      .map((entry) => (typeof entry === 'string' ? entry : entry.url))
      .concat(APP_SHELL)
  ),
];

// ---------------------------------------------------------------- lifecycle

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PRECACHE);
      // Individually, so one 404 cannot fail the whole install like addAll does
      await Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => {})
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([PRECACHE, RUNTIME]);
      const names = await caches.keys();
      await Promise.all(names.map((n) => (keep.has(n) ? null : caches.delete(n))));
      await self.clients.claim();
    })()
  );
});

// Lets the page trigger an immediate update instead of waiting for a reload
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

// ------------------------------------------------------------------- fetch

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Cross-origin (the API on Render, Cloudinary images) goes straight to the
  // network — caching authenticated or opaque responses causes more problems
  // than it solves.
  if (url.origin !== self.location.origin) return;

  // Never cache API traffic: it is per-user and changes constantly.
  if (url.pathname.startsWith('/api')) return;

  // Navigations: network first, fall back to the cached shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(PRECACHE);
          const shell = await cache.match(APP_SHELL);
          return (
            shell ||
            new Response('<h1>You are offline</h1>', {
              status: 503,
              headers: { 'Content-Type': 'text/html' },
            })
          );
        }
      })()
    );
    return;
  }

  // Static assets are content-hashed, so cache-first is safe and fast.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && response.type === 'basic') {
          const cache = await caches.open(RUNTIME);
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        return Response.error();
      }
    })()
  );
});

// -------------------------------------------------------------------- push

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'MealMaster', body: event.data ? event.data.text() : '' };
  }

  const options = {
    body: data.body || 'It is time to prepare your meal.',
    icon: data.icon || '/icons/icon-192.png',
    badge: data.badge || '/icons/badge-72.png',
    data: data.data || {},
    vibrate: data.vibrate || [200, 100, 200],
    actions: [{ action: 'open', title: 'View meal' }],
  };
  if (data.image) options.image = data.image;
  // renotify is only valid alongside a tag
  if (data.tag) {
    options.tag = data.tag;
    options.renotify = true;
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'MealMaster', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || '/reminders';

  event.waitUntil(
    (async () => {
      const windows = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      for (const client of windows) {
        if (new URL(client.url).origin === self.location.origin) {
          await client.focus();
          if ('navigate' in client) await client.navigate(target);
          return;
        }
      }
      await clients.openWindow(target);
    })()
  );
});

// Browsers rotate push subscriptions without warning. Re-subscribe and tell the
// server, otherwise reminders silently stop arriving on this device.
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const applicationServerKey =
          event.oldSubscription?.options?.applicationServerKey;
        const subscription = await self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
        await fetch(`${API_BASE}/reminders/subscribe`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription.toJSON()),
        });
      } catch {
        // Nothing useful to do here — the user will re-enable from the UI.
      }
    })()
  );
});
