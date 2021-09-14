<script>
    import { onMount } from 'svelte';

    const promptThePermission = async () => {
        const result = await Notification.requestPermission();

        if (result === 'granted') {
            isGranted = true;
        }
    }

    let isGranted = true;

    onMount(() => {
        isGranted = Notification.permission === "granted";
    });
</script>

{#if !isGranted}
<button on:click={promptThePermission}>
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
