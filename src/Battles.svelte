<script>
    export let battles;
    export let type;

    import Battle from "./Battle.svelte";
</script>

<div class="battles battles--{type}">
    {#each battles as video, index}
        <Battle {video} {index} />
    {/each}
</div>

<style lang="scss">
    .battles {
        position: absolute;
        height: 50%;
        width: 19%;
        text-align: right;
        text-transform: uppercase;
        font-size: 10px;

        &--joes {
            left: 0;
            bottom: 0;
        }

        &--infl {
            text-align: left;
            right: 0;
            top: 4%;
        }
    }
</style>
