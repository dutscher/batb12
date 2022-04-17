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
    <div class="battle battle--{index + 1} battle--{type}"
         title="{video.skater.left.name} Vs. {video.skater.right.name}">
        {#if type === '3rd'}
            3rd:
        {/if}
        {#if type === 'm'}
            Winner:
        {/if}
        <div class="battle__link{video.skater.left.crossed ? ' battle__link--crossed' : ''}" on:click={() => openYoutubeLayer(video)}
             {...(video.skater.left.replaced || video.skater.left.crossed ? { 'data-rider-top': video.skater.left.name } : {})}
             {...(video.skater.right.replaced || video.skater.right.crossed ? { 'data-rider-bottom': video.skater.right.name } : {})}>
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
        width: 48%;
        text-align: right;
        padding-left: 3px;
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
          right: 0;
          padding-right: 3px;
          padding-left: 0;
          text-align: left;
        }
      }

      //&--crossed {
      //  top: -100%;
      //}
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

  :global(.battles--round-1 #{$selector}__link) {
    &::before,
    &::after {
      text-align: left !important;
    }
  }

  :global(.battles--round-1 #{$selector}--r #{$selector}__link),
  :global(.battles--round-1 #{$selector}--rt #{$selector}__link),
  :global(.battles--round-1 #{$selector}--rb #{$selector}__link) {
    &::before,
    &::after {
      text-align: right !important;;
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
