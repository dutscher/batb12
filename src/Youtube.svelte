<script>
    import { activeData } from "./stores";

    let activeVideo = '0AIKNWgOo6I'

    let youtubeVideo = null;
    activeData.subscribe(store => youtubeVideo = store.youtubeVideo);

    const closeYoutubeLayer = () => {
        activeData.update(store => {
            store.youtubeVideo = null;
            return store;
        });
    };
</script>

{#if youtubeVideo}
<div class="youtube">
    <div class="youtube__title">
        <span>
            <h2>{youtubeVideo.skater[0]}</h2>
            {youtubeVideo.result[0]}
        </span>
        VS
        <span>
            <h2>{youtubeVideo.skater[1]}</h2>
            {youtubeVideo.result[1]}
        </span>
    </div>
    <div class="youtube__close" on:click={()=>closeYoutubeLayer()}></div>
    <iframe
        class="youtube__iframe"
        width="560" height="315"
        title="Battle - {youtubeVideo.title}"
        src="https://www.youtube.com/embed/{youtubeVideo.id}"
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>
{/if}

<style lang="scss">
  @import "./scss/mixins";

  $selector: ".youtube";
  #{$selector} {
    position: fixed;
    z-index: 1337;
    width: 100%;
    height: 100%;

    &__title {
      background: #000;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        margin: 1rem;
      }

      h2 {
        display: block;
        margin: 0;
      }
    }

    &__close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      height: 4rem;
      width: 4rem;
      background: #6AAB1B;
      cursor: pointer;
      border-radius: 1rem;

      &:hover {
        background: white;
      }
    }

    &__iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
