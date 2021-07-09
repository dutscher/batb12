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
            left: 4%;
            top: 4%;
        }

        &--joes {
            left: 4%;
            bottom: 0;
        }

        &--infl {
            text-align: left;
            right: 4%;
            top: 4%;
        }

        &--icons {
            text-align: left;
            right: 4%;
            bottom: 0;
        }
    }
</style>
