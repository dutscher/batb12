<script>
    import { activeData } from './stores';

    export let video;
    export let index;
    export let type;

    let youtubeVideo = null;
    activeData.subscribe(store => youtubeVideo = store.youtubeVideo);

    const openYoutubeLayer = (video) => {
        if (video.winner !== '-') {
            activeData.update(store => {
                store.youtubeVideo = video;
                return store;
            });
        }
    };
</script>

{#if video.winner}
    <div class="battle battle--{index + 1} battle--{type}" title="{video.skater.left} Vs. {video.skater.right}">
        {#if type === '3rd'}
            3rd:
        {/if}
        {#if type === 'm'}
            Winner:
        {/if}
        <div class="battle__link" on:click={() => openYoutubeLayer(video)}
             {...(video.skater.replaceLeft ? { 'data-rider-top': video.skater.left } : {})}
             {...(video.skater.replaceRight ? { 'data-rider-bottom': video.skater.right } : {})}>
            <div class="battle__label"
                 {...(video.result.left ? { 'data-result-top': video.result.left } : {})}
                 {...(video.result.right ? { 'data-result-bottom': video.result.right } : {})}>
                <span>{video.winner || '-'}</span>
            </div>
        </div>
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
      user-select: none;
      cursor: pointer;

      &::before,
      &::after {
        content: attr(data-rider-top);
        display: block;
        position: absolute;
        top: -100%;
        width: 50%;
        text-align: center;
        border-radius: 2px;
        z-index: 1;
      }

      &::after {
        content: attr(data-rider-bottom);
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

    &__label {
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
        z-index: 2;
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
    @include comp-battle-1($selector);
  }

  :global(.table--batb-11) {
    @include comp-battle-11($selector);
  }

  :global(.table--batb-12) {
    @include comp-battle-12($selector);
  }
</style>
