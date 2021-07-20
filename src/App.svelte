<script>
	import Github from "./Github.svelte";
	import Table from "./Table.svelte";
</script>

<Github />
<Table />

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
