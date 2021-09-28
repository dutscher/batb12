<script>
    import { storedBracketData } from './stores';
    import Battles from "./Battles.svelte";

    let bracket;
    let innerWidth;

    storedBracketData.subscribe(value => bracket = value);
</script>

<svelte:window bind:innerWidth={innerWidth}/>

<div class="table--horizontal-centered table--{bracket.data.modifier}">
    <div class="table"
         style="zoom:{Math.ceil((100 * ( innerWidth / (bracket.data.img.w) ))) - 5}%; width:{bracket.data.img.w}px; height:{bracket.data.img.h}px">
        <a class="playlist"
           target="_blank"
           href={bracket.data.yt}
           title="Open Youtube Playlist">&nbsp;</a>

        <Battles battles={bracket.videos["1"]["left-top"]} round="1" type="lt"/>
        <Battles battles={bracket.videos["1"]["left-bottom"]} round="1" type="lb"/>
        <Battles battles={bracket.videos["1"]["right-top"]} round="1" type="rt"/>
        <Battles battles={bracket.videos["1"]["right-bottom"]} round="1" type="rb"/>

<!--        <Battles battles={bracket.videos["2"]["left-top"]} round="2" type="lt"/>-->
<!--        <Battles battles={bracket.videos["2"]["left-bottom"]} round="2" type="lb"/>-->
<!--        <Battles battles={bracket.videos["2"]["right-top"]} round="2" type="rt"/>-->
<!--        <Battles battles={bracket.videos["2"]["right-bottom"]} round="2" type="rb"/>-->

<!--        <Battles battles={bracket.videos["3"]["left-top"]} round="3" type="lt"/>-->
<!--        <Battles battles={bracket.videos["3"]["left-bottom"]} round="3" type="lb"/>-->
<!--        <Battles battles={bracket.videos["3"]["right-top"]} round="3" type="rt"/>-->
<!--        <Battles battles={bracket.videos["3"]["right-bottom"]} round="3" type="rb"/>-->

<!--        <Battles battles={bracket.videos["3"]["left"]} round="3" type="l"/>-->
<!--        <Battles battles={bracket.videos["3"]["right"]} round="3" type="r"/>-->

<!--        <Battles battles={bracket.videos["Finals"]["left"]} round="4" type="l"/>-->
<!--        <Battles battles={bracket.videos["Finals"]["right"]} round="4" type="r"/>-->

<!--        <Battles battles={bracket.videos["Championship Battle"]["middle"]} round="5" type="m"/>-->
<!--        <Battles battles={bracket.videos["Championship Battle"]["3rd-place"]} round="5" type="3rd"/>-->

        <img
                class="table__img"
                src="{bracket.data.img.src}"
                alt={bracket.data.title}
                style="width:100%"/>
    </div>
</div>

<style lang="scss">
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

    &--batb-12 {
      .playlist {
        left: 836px;
        top: 75px;
        width: 218px;
        height: 187px;

        &:hover {
          border: solid 1px #B20C1E;
        }
      }
    }

    &--batb-11 {
      .playlist {
        left: 823px;
        top: 27px;
        width: 218px;
        height: 210px;

        &:hover {
          border-color: #DE5E1B;
        }
      }
    }
  }
</style>
