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

  :global(.table--batb-12) {
    #{$selector} {
      &__link {
        color: #fff;

        &:hover {
          color: #B20C1E;
        }

        &::before,
        &::after {
          background: #B20C1E;
          color: #fff;
        }
      }

      &--1 {
        top: 13px;
      }

      &--2 {
        top: 67px;
      }

      &--3 {
        top: 120px;
      }

      &--4 {
        top: 174px;
      }

      &--5 {
        top: 227px;
      }

      &--6 {
        top: 281px;
      }

      &--7 {
        top: 333px;
      }

      &--8 {
        top: 387px;
      }
    }

    :global(.battles--2) #{$selector} {
      &--1 {
        top: 25px;
      }

      &--2 {
        top: 132px;
      }

      &--3 {
        top: 239px;
      }

      &--4 {
        top: 347px;
      }
    }

    :global(.battles--3) #{$selector} {
      &--1 {
        top: 52px;
      }

      &--2 {
        top: 266px;
      }
    }

    :global(.battles--4) #{$selector} {
      &--1 {
        top: 104px;
      }

      &--2 {
        top: 531px;
      }
    }

    :global(.battles--m) #{$selector} {
      &--1 {
        top: 229px;
        text-align: center;
      }
    }

    :global(.battles--3rd) #{$selector} {
      &--1 {
        text-align: center;
      }
    }
  }

  :global(.table--batb-11) {
    #{$selector} {
      &__link {
        color: #fff;

        &:hover {
          color: #B20C1E;
        }

        &::before,
        &::after {
          background: #B20C1E;
          color: #fff;
        }
      }

      &--1 {
        top: 23px;
      }

      &--2 {
        top: 125px;
      }

      &--3 {
        top: 245px;
      }

      &--4 {
        top: 345px;
      }
    }

    :global(.battles--2) #{$selector} {
      &--1 {
        top: 52px;
      }

      &--2 {
        top: 276px;
      }
    }

    :global(.battles--3) #{$selector} {
      &--1 {
        top: 163px;
      }

      &--2 {
        top: 605px;
      }
    }
  }

</style>
