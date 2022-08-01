<script>
    import { storedBracketData } from './stores';
    import Battles from "./Battles.svelte";

    let bracket;
    let innerWidth;

    storedBracketData.subscribe(store => bracket = store);
</script>

<svelte:window bind:innerWidth={innerWidth}/>

<div class="table--horizontal-centered table--{bracket.data.modifier}">
    <div class="table"
         style="zoom:{Math.ceil((100 * ( innerWidth / (bracket.data.img.w) ))) - 10}%; width:{bracket.data.img.w}px; height:{bracket.data.img.h}px">
        <a class="playlist"
           target="_blank"
           href={bracket.data.yt}
           title="Open Youtube Playlist">&nbsp;</a>

        <Battles battles={bracket.videos["1"].lt} round="1" type="lt"/>
        <Battles battles={bracket.videos["1"].lb} round="1" type="lb"/>
        <Battles battles={bracket.videos["1"].rt} round="1" type="rt"/>
        <Battles battles={bracket.videos["1"].rb} round="1" type="rb"/>

        <Battles battles={bracket.videos["2"].lt} round="2" type="lt"/>
        <Battles battles={bracket.videos["2"].lb} round="2" type="lb"/>
        <Battles battles={bracket.videos["2"].rt} round="2" type="rt"/>
        <Battles battles={bracket.videos["2"].rb} round="2" type="rb"/>

        <Battles battles={bracket.videos["3"].l} round="3" type="l"/>
        <Battles battles={bracket.videos["3"].r} round="3" type="r"/>

        <Battles battles={bracket.videos["4"].l} round="4" type="l"/>
        <Battles battles={bracket.videos["4"].r} round="4" type="r"/>

        <Battles battles={bracket.videos["Finals"].l} round="5" type="l"/>
        <Battles battles={bracket.videos["Finals"].r} round="5" type="r"/>

        <Battles battles={bracket.videos["Championship Battle"].m} round="6" type="m"/>
        <Battles battles={bracket.videos["Championship Battle"]["3rd"]} round="6" type="3rd"/>

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
    position: relative;
    color: #fff;
    margin: 0 auto;

    .playlist {
      position: absolute;
      left: 50%;
      top: 8%;
      transform: translate(-50%);
      border-radius: 2px;
      border: solid 1px #fff;
      font-size: 0;
    }

    &--horizontal-centered {
      min-height: 100%;
      display: flex;
      align-items: center;
    }

    &--batb-1 {
      @include brackets-1();
    }

    &--batb-11 {
      @include brackets-11();
    }

    &--batb-12 {
      @include brackets-12();
    }
  }
</style>
