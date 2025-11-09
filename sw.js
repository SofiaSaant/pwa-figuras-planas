const CACHE_NAME = 'matematicas-figuras-planas-v6';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './styles.css',
    './main.js',
    // Tema: Base y Altura
    './vistas/base-altura/base-altura.html',
    './vistas/base-altura/base-altura.js',
    './vistas/base-altura/base-altura-refactored.js',
    // Tema: Suma de Ángulos
    './vistas/suma-angulos/suma-angulos.html',
    './vistas/suma-angulos/suma-angulos.js',
    // Tema: Circunferencia
    './vistas/circunferencia/circunferencia.html',
    './vistas/circunferencia/circunferencia.js',
    // Tema: Número Pi
    './vistas/numero-pi/numero-pi.html',
    './vistas/numero-pi/numero-pi.js',
    // Tema: Figuras Circulares
    './vistas/figuras-circulares/figuras-circulares.html',
    './vistas/figuras-circulares/figuras-circulares.js',
    // Tema: Posiciones de Rectas
    './vistas/posiciones-rectas/posiciones-rectas.html',
    './vistas/posiciones-rectas/posiciones-rectas.js',
    // Core architecture
    './core/animations.css',
    './core/app-loader.js',
    './core/BaseTopicModule.js',
    './core/main-app.js',
    // Cache external dependencies for offline use
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap'
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

// Fetch event - Network First strategy for HTML, Cache First for assets
self.addEventListener('fetch', event => {
    // Handle all requests (including external resources)
    if (event.request.url.startsWith(self.location.origin) ||
        event.request.url.includes('cdn.jsdelivr.net') ||
        event.request.url.includes('fonts.googleapis.com')) {

        // Network First strategy for HTML files (always get fresh content)
        if (event.request.headers.get('accept') &&
            event.request.headers.get('accept').includes('text/html')) {

            event.respondWith(
                fetch(event.request)
                    .then(networkResponse => {
                        // Cache the new version
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
                        // If network fails, try cache
                        return caches.match(event.request)
                            .then(response => {
                                return response || caches.match('./index.html');
                            });
                    })
            );
        }
        // Cache First strategy for CSS, JS, and other assets
        else {
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
                                // For CSS requests, return a minimal fallback
                                if (event.request.url.includes('.css')) {
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