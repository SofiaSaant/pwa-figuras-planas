const CACHE_NAME = 'matematicas-figuras-planas-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache).catch(error => {
                    console.log('Cache addAll failed:', error);
                });
            })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    // Only handle same-origin requests
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Return cached version or fetch from network
                    return response || fetch(event.request).catch(() => {
                        // If both cache and network fail, return a basic response for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./index.html');
                        }
                    });
                })
        );
    }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Claim control of all clients
            return self.clients.claim();
        })
    );
});