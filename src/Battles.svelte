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
    @import "./scss/mixins";

    .battles {
        position: absolute;
        height: rem(415px);
        width: rem(253px);
        text-align: right;
        text-transform: uppercase;
        font-size: rem(10px);

        &--lt {
            left: rem(68px);
            top: rem(65px);
        }

        &--lb {
            left: rem(68px);
            top: rem(494px);
        }

        &--rt {
            text-align: left;
            right: rem(65px);
            top: rem(65px);
        }

        &--rb {
            text-align: left;
            right: rem(65px);
            top: rem(494px);
        }
    }
</style>
