<script>
    import { onMount } from 'svelte';

    const Notification = window.Notification || window.mozNotification || window.webkitNotification;
    const granted = 'granted';

    const promptThePermission = () => {
        Notification.requestPermission(
            function (permission) {
                isGranted = permission === granted;
                if ('permissions' in navigator) {
                    navigator.permissions.query({ name: 'notifications' })
                        .then(function (notificationPerm) {
                            notificationPerm.onchange = function () {
                                isGranted = notificationPerm.state === granted;
                            };
                        });
                }
            }
        );
    }

    let isGranted = false;

    onMount(() => {
        isGranted = Notification.permission === granted;
    });
</script>

{#if !isGranted}
    <button on:click={() => promptThePermission()}              >
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
