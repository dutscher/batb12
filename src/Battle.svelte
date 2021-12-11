<script>
    import { activeData } from './stores';
    export let video;
    export let index;
    export let type;

    let youtubeVideo = null;
    activeData.subscribe(store => youtubeVideo = store.youtubeVideo);

    const openYoutubeLayer = (video) => {
        activeData.update(store => {
            store.youtubeVideo = video;
            return store;
        });
    };
</script>

{#if video.winner}
    <div class="battle battle--{index + 1} battle--{type}" title={video.title}>
        {#if type === '3rd'}
            3rd:
        {/if}
        {#if type === 'm'}
            Winner:
        {/if}
        {#if video.winner !== '-'}
            <div class="battle__link" on:click={() => openYoutubeLayer(video)}
               data-result-top={video.result[0]} data-result-bottom={video.result[1]}>
                {video.winner}
            </div>
        {:else}
            -
        {/if}
    </div>
{/if}

<style lang="scss">
  @import './scss/all-battles';
  @import "./scss/mixins";

  $selector: ".battle";
  #{$selector} {
    position: absolute;
    width: 100%;
    cursor: default;

    &__link {
      position: relative;
      display: block;
      user-select: none;
      cursor: pointer;

      &:hover {
        &::before,
        &::after {
          display: block;
        }
      }

      &::before,
      &::after {
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

      #{$selector}--r &,
      #{$selector}--rt &,
      #{$selector}--rb & {
        &::before,
        &::after {
          right: 0
        }
      }
    }
  }

  :global(.table--batb-1) {
    @include battle-1($selector);
  }

  :global(.table--batb-11) {
    @include battle-11($selector);
  }

  :global(.table--batb-12) {
    @include battle-12($selector);
  }
</style>
