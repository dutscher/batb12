<script>
    export let video;
    export let index;
    export let type;
</script>

{#if video.winner}
<div class="battle battle--{index + 1} battle--{type}" title={video.title}>
    {#if video.winner !== '-'}
        <a class="battle__link" href={video.youtube} target="_blank"
           data-result-top={video.result[0]} data-result-bottom={video.result[1]}>
            {video.winner}
        </a>
    {:else}
        -
    {/if}
</div>
{/if}

<style lang="scss">
    @import "./scss/mixins";

    $selector: ".battle";
    #{$selector} {
        position: absolute;
        width: 100%;
        cursor: default;

        &__link {
            color: #fff;
            position: relative;
            display: block;
            user-select: none;

            &:hover {
                color: #B20C1E;

                &::before,
                &::after {
                    display: block;
                }
            }

            &::before,
            &::after {
                background: #B20C1E;
                color: #fff;
                content: attr(data-result-top);
                display: none;
                position: absolute;
                top: -100%;
                width: 50%;
                text-align: center;
                border-radius: 2px;
            }

            &::after {
                content: attr(data-result-bottom);
                top: 100%;
            }

            #{$selector}--infl & {
                &::before,
                &::after {
                    right: 0
                }
            }
        }

        &--1 {
            top: rem(13px);
        }

        &--2 {
            top: rem(67px);
        }

        &--3 {
            top: rem(120px);
        }

        &--4 {
            top: rem(174px);
        }

        &--5 {
            top: rem(227px);
        }

        &--6 {
            top: rem(281px);
        }

        &--7 {
            top: rem(333px);
        }

        &--8 {
            top: rem(387px);
        }
    }
</style>
