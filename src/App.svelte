<script>
	import Github from "./Github.svelte";
	import Notification from "./Notification.svelte";
    import Youtube from "./Youtube.svelte";
    import Brackets from "./Brackets.svelte";
</script>

<Github />
<Notification />
<Youtube />
<Brackets />

<style>
	:global(html), :global(body) {
		height: 100%;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background: #050505;
		overflow-x: hidden;
	}
</style>
