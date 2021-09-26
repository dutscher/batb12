(() => {
    const pre = '[PWA Loader]';
    const registerPushSubscriptionAfterPermissionGranted = (sw) => {
        let subscriptionExists = false;

        // https://serviceworke.rs/push-get-payload_index_doc.html
        // https://rossta.net/blog/using-the-web-push-api-with-vapid.html

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

        sw.then(function (registration) {
            console.log(pre, 'is ready')
            return registration.pushManager.getSubscription()
                .then(async function (subscription) {
                    if (subscription) {
                        console.log(pre, 'subscription already there', subscription);
                        subscriptionExists = true;
                        return subscription;
                    }

                    const response = await fetch('//api.willy-selma.de/push/vapidPublicKey');
                    console.log(pre, 'create subscription', subscription, response);
                    const vapidPublicKey = await response.text();
                    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: convertedVapidKey
                    });
                });
        })
            .then(async function (subscription) {
                if (!subscriptionExists) {
                    const dbsubscription = await fetch('https://api.willy-selma.de/push/register', {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            subscription: subscription
                        }),
                    });
                    localStorage.setItem('subscriptionID', dbsubscription.id);
                    console.log(pre, 'subscriptionID is in localstorage', dbsubscription.id)
                }

                console.log(pre, 'window.notifyme()')
                window.notifyme = function (msg) {
                    const payload = msg || 'commit junge';
                    const ttl = 24 * 60 * 60;

                    fetch('//api.willy-selma.de/push/sendNotification', {
                        method: 'post',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            payload: payload,
                            ttl: ttl,
                        }),
                    });
                };
            });
    }

    window.onload = () => {
        if ('serviceWorker' in navigator) {
            console.log(pre, 'init service worker')
            const sw = navigator.serviceWorker.register('./js/service-worker.js?cb=' + window.cacheBuster);

            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'notifications' })
                    .then(function (notificationPerm) {
                        console.log(pre, 'notification permission changed', notificationPerm.state)
                        notificationPerm.onchange = function () {
                            if (notificationPerm.state === 'granted') {
                                console.log(pre, 'notification subcribed')
                                registerPushSubscriptionAfterPermissionGranted(sw);
                            }
                        }
                    });
            }
        }
    }
})()
