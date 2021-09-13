window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./js/service-worker.js?cb=' + window.cacheBuster);

        // https://serviceworke.rs/push-get-payload_index_doc.html

        // Web-Push
        // Public base64 to Uint
        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            let outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        navigator.serviceWorker.ready
            .then(function (registration) {
                return registration.pushManager.getSubscription()
                    .then(async function (subscription) {
                        if (subscription) {
                            return subscription;
                        }

                        const response = await fetch('https://api.willy-selma.de/push/vapidPublicKey');
                        const vapidPublicKey = await response.text();
                        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                        return registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey
                        });
                    });
            }).then(function (subscription) {
            fetch('https://api.willy-selma.de/push/register', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription
                }),
            });

            console.log('subscription', subscription)

            window.notifyme = function () {
                const payload = 'commit junge';
                const delay = 10;
                const ttl = 1;

                fetch('https://api.willy-selma.de/push/sendNotification', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        subscription: subscription,
                        payload: payload,
                        delay: delay,
                        ttl: ttl,
                    }),
                });
            };
        });
    }
}
