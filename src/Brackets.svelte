<script>
    import { activeData, storedBracketData } from './stores';
    import Battles from "./Battles.svelte";
    import { jsVoid } from "./utils.js";

    let activeNr;
    let bracket;
    let innerWidth;

    activeData.subscribe(store => activeNr = store.activeNr)
    storedBracketData.subscribe(store => bracket = store);

    const changeBattle = (event, isPrev = false) => {
        event.stopPropagation();
        event.preventDefault();

        activeData.update(store => {
            store.activeNr = isPrev ? bracket.data.prev : bracket.data.next;
            return store;
        })
    }
</script>

<svelte:window bind:innerWidth={innerWidth}/>
<svelte:head><title>{bracket.data.title}</title></svelte:head>

<div class="table--horizontal-centered table--{bracket.data.modifier}">
    <div class="table"
         style="zoom:{Math.ceil((100 * ( innerWidth / (bracket.data.img.w) ))) - 10}%; width:{bracket.data.img.w}px; height:{bracket.data.img.h}px">

        <a class="playlist"
           target="_blank"
           href={bracket.data.yt}
           title="Open Youtube Playlist">
            {#if bracket.data.prev}
            <a class="prev"
               href={jsVoid}
               title="Prev Battle" on:click={(e) => changeBattle(e, true)}>&nbsp;</a>
            {/if}
            {#if bracket.data.next}
            <a class="next"
               href={jsVoid}
               title="Next Battle" on:click={(e) => changeBattle(e, )}>&nbsp;</a>
            {/if}
        </a>

        {#each Object.entries(bracket.videos) as [round, positions]}
            {#each Object.entries(positions) as [type, battles]}
                <Battles {battles} {type} {round}/>
            {/each}
        {/each}

        <img
                class="table__img"
                src="{bracket.data.img.src}"
                alt={bracket.data.title}
                style="width:100%"/>
    </div>
</div>

<style lang="scss">
  @import './scss/all-battles';

  $selector: '.table';

  #{$selector} {
    --playlist-primary-color: white;
    --playlist-accent-color: #6AAB1B;

    position: relative;
    color: #fff;
    margin: 0 auto;

    .playlist {
      position: absolute;
      left: var(--playlist-left, 50%);
      top: var(--playlist-top, 8%);
      width: var(--playlist-width, 218px);
      height: var(--playlist-height, 187px);
      transform: translate(-50%);
      border-radius: 2px;
      border: solid 1px var(--playlist-primary-color, --playlist-primary-color);
      font-size: 0;

      &:hover {
        border: solid 1px var(--playlist-hover-border-color, --playlist-accent-color);
      }

      .prev,
      .next {
        position: absolute;
        top: 50%;
        height: 1vmin;
        box-sizing: border-box;
        position: absolute;

        &::before {
          content: '';
          width: 125%;
          height: 100%;
          border-width: .8vmin .8vmin 0 0;
          border-style: solid;
          border-color: #fafafa;
          transition: .2s ease;
          display: block;
          transform-origin: 100% 0;
        }

        &:after {
          content: '';
          position: relative;
          top: -100%;
          width: 100%;
          height: 100%;
          border-width: 0 .8vmin 0 0;
          border-style: solid;
          border-color: #fafafa;
          transform-origin: 100% 0;
          transition: .2s ease;
        }

        &:hover::before,
        &:hover::after {
          border-color: var(--accent-color);
        }
      }

      .prev {
        transform: rotate(225deg);
        left: -10%;
      }

      .next {
        transform: rotate(45deg);
        right: -10%;
        top: 45%;
      }
    }

    &--horizontal-centered {
      min-height: 100%;
      display: flex;
      align-items: center;
    }
  }
</style>
