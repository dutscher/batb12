<script>
    import { onMount } from 'svelte';

    // const Notification = window.Notification || window.mozNotification || window.webkitNotification;

    let wasQuestioned = false;

    // if (Notification.permission === 'default') {
    //     wasQuestioned = true;
    // }

    const promptThePermission = () => {
        console.log('promptThePermission')
        Notification.requestPermission(
            function (permission) {
                if (wasQuestioned) {
                    console.log('User was asked. New permission is:', permission);
                }

                isGranted = permission === 'granted';
                // https://stackoverflow.com/questions/35217959/how-to-listen-for-web-notification-permission-change
                if ('permissions' in navigator) {
                    navigator.permissions.query({ name: 'notifications' })
                        .then(function (notificationPerm) {
                            notificationPerm.onchange = function () {
                                console.log('User decided to change his settings. New permission:', notificationPerm.state);

                                isGranted = notificationPerm.state === 'granted';
                            };
                        });
                }
            }
        );
    }

    let isGranted = false;

    onMount(() => {
        //isGranted = Notification.permission === "granted";
    });
</script>

{#if !isGranted}
    <button on:click={() => {}}>
        Notify on Updates?
    </button>
{/if}

<style lang="scss">
  button {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    cursor: pointer;
    background: white;
    color: black;
    z-index: 1337;
    border: none;
  }
</style>
