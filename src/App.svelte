<script>
	import Github from "./Github.svelte";
	import Notification from "./Notification.svelte";
    import Youtube from "./Youtube.svelte";
    import Brackets from "./Brackets.svelte";

    let bracketNr;

    import { storedBracketData } from "./stores";
    storedBracketData.subscribe(store => bracketNr = store.data.nr);
</script>

<div class="active-bracket-{bracketNr}">
    <Github />
    <Notification />
    <Youtube />
    <Brackets />
</div>

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
