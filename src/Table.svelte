<script>
    import { storedBracketData } from './stores';
    import Battles from "./Battles.svelte";

    let bracket;
    let innerWidth;

    storedBracketData.subscribe(value => bracket = value);
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="table--horizontal-centered">
    <div class="table"
         style="zoom:{Math.ceil((100 * ( innerWidth / (bracket.data.img.w) ))) - 3}%; width:{bracket.data.img.w}px; height:{bracket.data.img.h}px">
        <a class="playlist"
           target="_blank"
           href={bracket.data.yt}
           title="Open Youtube Playlist">&nbsp;</a>
        <Battles battles={bracket.videos["1"]["left-top"]} type="lt" />
        <Battles battles={bracket.videos["1"]["left-bottom"]} type="lb" />
        <Battles battles={bracket.videos["1"]["right-top"]} type="rt" />
        <Battles battles={bracket.videos["1"]["right-bottom"]} type="rb" />
        <img
            class="table__img"
            src="../{bracket.data.img.src}"
            alt={bracket.data.title}
            style="width:100%" />
    </div>
</div>

<style lang="scss">
    .table {
        position: relative;
        color: #fff;
        margin: 0 auto;

        .playlist {
            position: absolute;
            width: 13%;
            height: 20%;
            left: 50%;
            top: 8%;
            transform: translate(-50%);
            border-radius: 2px;
            border: solid 1px #fff;
            font-size: 0;

            &:hover {
                border: solid 1px #B20C1E;
            }
        }

      &--horizontal-centered {
        min-height: 100%;
        display: flex;
        align-items: center;
      }
    }
</style>
