<script>
    import { activeData, storedBracketData } from "./stores";

    let youtubeVideo = null;
    let bracket;

    activeData.subscribe(store => youtubeVideo = store.youtubeVideo)
    storedBracketData.subscribe(store => bracket = store);

    const closeYoutubeLayer = () => {
        activeData.update(store => {
            store.youtubeVideo = null;
            return store;
        });
    };
</script>

{#if youtubeVideo}
<div class="youtube battle--{bracket.data.modifier}">
    <div class="youtube__title">
        <div>
            <h2>{youtubeVideo.skater[!youtubeVideo.isSwitched ? 'left' : 'right'].name}</h2>
            <span>{youtubeVideo.result[!youtubeVideo.isSwitched ? 'left' : 'right']}</span>
        </div>
        Vs.
        <div>
            <h2>{youtubeVideo.skater[!youtubeVideo.isSwitched ? 'right' : 'left'].name}</h2>
            <span>{youtubeVideo.result[!youtubeVideo.isSwitched ? 'right' : 'left']}</span>
        </div>
    </div>
    <div class="youtube__close" on:click={()=>closeYoutubeLayer()}></div>
    <iframe
        class="youtube__iframe"
        width="560" height="315"
        title="Battle - {youtubeVideo.skater.left.name} Vs. {youtubeVideo.skater.right.name}"
        src="https://www.youtube.com/embed/{youtubeVideo.id}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>
{/if}

<style lang="scss">
  @import "./scss/all-battles";
  @import "./scss/mixins";

  $selector: ".youtube";
  #{$selector} {
    position: fixed;
    z-index: 1337;
    width: 100%;
    height: 100%;
    background: #000;

    &__title {
      background: rgba(#000,.8);
      color: var(--text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      width: 100%;
      top: 0;

      div {
        margin: 1rem;
      }

      h2 {
        display: block;
        margin: 0;
      }

      span {
        color: var(--youtube-title-color, --accent-color);
      }
    }

    &__close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      height: 4rem;
      width: 4rem;
      background: var(--youtube-close-bgcolor, --accent-color);
      color: var(--youtube-close-color, --primary-color);
      cursor: pointer;
      border-radius: 1rem;

      &:after {
        display: inline-block;
        content: "\00d7"; /* This will render the 'X' */
        font-size: 60pt;
        line-height: 35pt;
        margin-left: 3pt;
      }

      &:hover {
        background: var(--youtube-primary-color);
        color: var(--youtube-close-bgcolor, --accent-color);
      }
    }

    &__iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
