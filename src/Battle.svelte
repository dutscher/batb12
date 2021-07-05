<script>
    export let video;
    export let index;
</script>

{#if video.winner}
<div class="battle battle--{index + 1}" title={video.title}>
    {#if video.winner !== '-'}
        <a href={video.youtube} target="_blank">{video.winner}</a>
    {:else}
        -
    {/if}
</div>
{/if}

<style lang="scss">
    .battle {
        position: relative;

        a {
            color: #fff;
        }
        // width: 1112px
        &--1 {
            top: 7%;
        }

        &--2 {
            top: 15%;
        }

        &--3 {
            top: 22%;
        }

        &--4 {
            top: 29%;
        }

        &--5 {
            top: 37%;
        }

        &--6 {
            top: 44%;
        }

        &--7 {
            top: 51%;
        }

        &--8 {
            top: 58%;
        }
    }
</style>
