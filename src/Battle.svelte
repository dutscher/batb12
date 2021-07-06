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
    $selector: ".battle";
    #{$selector} {
        position: relative;
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
            top: 9%;
        }

        &--2 {
            top: 18%;
        }

        &--3 {
            top: 26%;
        }

        &--4 {
            top: 35%;
        }

        &--5 {
            top: 44%;
        }

        &--6 {
            top: 53%;
        }

        &--7 {
            top: 61%;
        }

        &--8 {
            top: 70%;
        }
    }
</style>
