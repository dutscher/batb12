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
        .then(function (subscription) {
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
        //     .then(function (endpoint) {
        //         console.log(pre, 'endpoint', endpoint);
        //         return fetch('//api.willy-selma.de/push/getPayload?endpoint=' + endpoint);
        //     })
        //     .then(function (response) {
        //         return response.text();
        //     })
        //     .then(function (payload) {
            .then(function (endpoint) {
                let title = 'BATB12';
                let body = (event.data && event.data.text());
                let tag = "batb-push-tag";
                let icon = '/batb12/icons/apple-icon-120x120.png';
                console.log(pre, 'showNotification', { title, body, tag, icon });
                self.registration.showNotification(title, { body, icon, vibrate: [500, 100, 500], })
        })
    );
});
// https://newbedev.com/how-can-i-initiate-a-pwa-progressive-webapp-open-from-a-click-on-a-push-notification
self.addEventListener('notificationclick', function (event) {
    console.log(pre, 'notificationclick', event.notification)
    //For root applications: just change "'./'" to "'/'"
    //Very important having the last forward slash on "new URL('./', location)..."
    const rootUrl = new URL('./', location).href;
    event.notification.close();
    event.waitUntil(
        clients.matchAll().then(matchedClients =>
        {
            for (let client of matchedClients)
            {
                if (client.url.indexOf(rootUrl) >= 0)
                {
                    return client.focus();
                }
            }

            return clients.openWindow(rootUrl).then(function (client) { client.focus(); });
        })
    );
});
