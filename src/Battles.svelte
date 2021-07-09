<script>
    export let battles;
    export let type;

    import Battle from "./Battle.svelte";
</script>

<div class="battles battles--{type}">
    {#each battles as video, index}
        <Battle {video} {index} {type} />
    {/each}
</div>

<style lang="scss">
    .battles {
        position: absolute;
        height: 50%;
        width: 15%;
        text-align: right;
        text-transform: uppercase;
        font-size: 10px;

        &--pros {
            left: 70px;
            top: 40px;
        }

        &--joes {
            left: 70px;
            bottom: 0;
        }

        &--infl {
            text-align: left;
            right: 70px;
            top: 70px;
        }

        &--icons {
            text-align: left;
            right: 70px;
            bottom: 0;
        }
    }
</style>
