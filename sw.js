const CACHE = 'witchbrew-v1';
const FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  if (e.request.url.includes('supabase.co')) return; // nie cachen, immer live
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
