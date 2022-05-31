<script>
    import Battle from "./Battle.svelte";

    export let battles;
    export let round;
    export let type;
</script>

<div class="battles battles--round-{round} battles--{type}">
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

    &--round {
      // debug
      &-1 {
        //background: rgba(255, 255, 255, 0.5);
      }

      &-2 {
        //background: rgba(255, 255, 255, 0.5);
      }

      &-3 {
        //background: rgba(255, 255, 255, 0.5);
      }

      // finals
      &-4 {
        //background: rgba(255, 255, 255, 0.5);
      }

      // winner + 3rd
      &-5 {
        //background: rgba(255, 255, 255, 0.5);
      }
    }

    :global(.table--batb-1) & {
      @include comp-battles-1();
    }

    :global(.table--batb-11) & {
      @include comp-battles-11();
    }

    :global(.table--batb-12) & {
      @include comp-battles-12();
    }
  }
</style>
