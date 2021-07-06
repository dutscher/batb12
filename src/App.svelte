<script>
	import Table from "./Table.svelte";
</script>

<svelte:head>
	<title>BATB12 - Community Table</title>
</svelte:head>

<main>
	<Table />
</main>

<style>
	:global(html), :global(body) {
		height: 100%;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		background: #050505;
		display: flex;
		align-items: center;
		min-height: 1500px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
