const CACHE = "cicero-v41";
const ASSETS = ["./", "./index.html", "./manifest.json", "./css/styles.css?v=41", "./data/content.json?v=41", "./js/app.js?v=41", "./js/preferences.js?v=41", "./js/preferences-bootstrap.js?v=41", "./js/router.js", "./js/search.js", "./js/storage.js", "./icons/favicon.svg", "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

/** Stores the shell and activates it without leaving stale versioned caches behind. */
self.addEventListener("install", (event) => event.waitUntil(
  caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
));

/** Removes obsolete Cícero caches before the new worker takes control. */
self.addEventListener("activate", (event) => event.waitUntil(
  caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key.startsWith("cicero-") && key !== CACHE).map((key) => caches.delete(key))))
    .then(() => self.clients.claim())
));

/** Serves cached GET resources first and falls back to the network. */
self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
