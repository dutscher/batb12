<script>
    const promptThePermission = async () => {
        console.log('check the permission')
        const result = await Notification.requestPermission();
        if (result === 'granted') {

        }
    }
</script>

<button on:click={promptThePermission}>
    Notify on Updates?
</button>

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
