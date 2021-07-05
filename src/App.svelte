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
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
	}

	:global(body) {
		padding: 0;
		margin: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
