
const CACHE_NAME = 'restaurant-cache-v1';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/images/food1.jpg',
    '/images/food2.jpg',
    '/images/food3.jpg',
    '/images/pasta.jpg',
    '/images/salmon.jpg',
    '/images/burger.jpg',
    '/images/interior.jpg',
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/map.jpg',
    '/images/placeholder.jpg'
];

// Install event - cache all static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_URLS);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request because it's a one-time use stream
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response because it's a one-time use stream
                    const responseToCache = response.clone();

                    // Cache the fetched resource
                    if (event.request.url.includes('/images/')) {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                    }

                    return response;
                });
            })
    );
});
