<script>
    import Battle from "./Battle.svelte";

    export let battles;
    export let round;
    export let type;
</script>

<div class="battles battles--round battles--round-{round} battles--{type}">
    {#each battles as video, index}
        <Battle {video} {index} {type}/>
    {/each}
</div>

<style lang="scss">
  @import './scss/all-battles';
  @import './scss/mixins';

  $selector: '.battles';
  #{$selector} {
    position: absolute;
    text-align: right;
    text-transform: uppercase;
    font-size: 10px;

    &--r,
    &--rt,
    &--rb {
      text-align: left;
    }

    //@include battles-debug();

    :global(.table--batb-1) & {
      @include battles-1($selector);
    }

    :global(.table--batb-11) & {
      @include battles-11($selector);
    }

    :global(.table--batb-12) & {
      @include battles-12($selector);
    }
  }
</style>
