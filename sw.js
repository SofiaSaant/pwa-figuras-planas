const CACHE_NAME = 'matematicas-figuras-planas-v6';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Cache external dependencies for offline use
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'
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
    // Handle all requests (including external resources like Tailwind CSS)
    if (event.request.url.startsWith(self.location.origin) || 
        event.request.url.includes('tailwindcss') ||
        event.request.url.includes('cdn.jsdelivr.net')) {
        
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    // Return cached version if available
                    if (response) {
                        return response;
                    }
                    
                    // Try to fetch from network
                    return fetch(event.request)
                        .then(networkResponse => {
                            // Cache successful responses for future offline use
                            if (networkResponse && networkResponse.status === 200) {
                                const responseClone = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => {
                                        cache.put(event.request, responseClone);
                                    });
                            }
                            return networkResponse;
                        })
                        .catch(() => {
                            // If both cache and network fail, return appropriate fallback
                            if (event.request.headers.get('accept') && 
                                event.request.headers.get('accept').includes('text/html')) {
                                return caches.match('./index.html');
                            }
                            
                            // For CSS requests, return a minimal fallback
                            if (event.request.url.includes('.css') || 
                                event.request.url.includes('tailwindcss')) {
                                return new Response('/* Offline fallback CSS */', {
                                    headers: { 'Content-Type': 'text/css' }
                                });
                            }
                            
                            // For other requests, return a generic error response
                            return new Response('Offline - Resource not available', {
                                status: 503,
                                statusText: 'Service Unavailable'
                            });
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
