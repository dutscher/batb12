// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';
const pre = '[ServiceWorker]'

// Add list of files to cache here.
const FILES_TO_CACHE = [
    '../offline.html',
    '../assets/table-12.jpg',
];

self.addEventListener('install', (evt) => {
    console.log(pre, 'install');

    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log(pre, 'activate');
    // Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log(pre, 'fetch', evt.request.url);
    // Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('offline.html');
                    });
            })
    );
});

// https://serviceworke.rs/push-get-payload_service-worker_doc.html
function getEndpoint() {
    return self.registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription.endpoint;
            }

            throw new Error('User not subscribed');
        });
}

self.addEventListener('push', function (event) {
    console.log(pre, 'push');
    event.waitUntil(
        getEndpoint()
            .then(function (endpoint) {
                console.log(pre, 'endpoint', endpoint);
                return fetch('./getPayload?endpoint=' + endpoint);
            })
            .then(function (response) {
                return response.text();
            })
            .then(function (payload) {
                console.log(pre, 'showNotification', payload);
                self.registration.showNotification('BATB12', {
                    body: payload,
                });
            })
    );
});
