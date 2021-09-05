<script>
    import Battle from "./Battle.svelte";

    export let battles;
    export let round;
    export let type;
</script>

<div class="battles battles--{round} battles--{type}">
    {#each battles as video, index}
        <Battle {video} {index} {type}/>
    {/each}
</div>

<style lang="scss">
  @import "./scss/mixins";

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

    &--1 {
      z-index: 5;
      //background: rgba(255, 255, 255, 0.5);
    }

    &--2 {
      z-index: 4;
      //background: rgba(255, 255, 255, 0.5);
    }

    &--3 {
      z-index: 3;
      //background: rgba(255, 255, 255, 0.5);
    }
    // finals
    &--4 {
      z-index: 2;
      //background: rgba(255, 255, 255, 0.5);
    }
    // winner + 3rd
    &--5 {
      z-index: 1;
      //background: rgba(255, 255, 255, 0.5);
    }

    :global(.table--batb-12) & {
      &--1 {
        height: 415px;
        width: 253px;

        &#{$selector} {
          &--lt {
            left: 68px;
            top: 65px;
          }

          &--lb {
            left: 68px;
            top: 494px;
          }

          &--rt {
            right: 65px;
            top: 65px;
          }

          &--rb {
            right: 65px;
            top: 494px;
          }
        }
      }

      &--2 {
        height: 387px;
        width: 250px;

        &#{$selector} {
          &--lt {
            left: 200px;
            top: 80px;
          }

          &--lb {
            left: 200px;
            top: 507px;
          }

          &--rt {
            right: 198px;
            top: 80px;
          }

          &--rb {
            right: 198px;
            top: 507px;
          }
        }
      }

      &--3 {
        height: 333px;
        width: 250px;

        &#{$selector} {
          &--lt {
            left: 329px;
            top: 107px;
          }

          &--lb {
            left: 329px;
            top: 534px;
          }

          &--rt {
            right: 329px;
            top: 107px;
          }

          &--rb {
            right: 329px;
            top: 534px;
          }
        }
      }

      &--4 {
        height: 653px;
        width: 250px;

        &#{$selector} {
          &--l {
            left: 457px;
            top: 162px;
          }

          &--r {
            right: 457px;
            top: 162px;
          }
        }
      }

      &--5 {
        height: 159px;
        width: 244px;

        &#{$selector} {
          &--m {
            left: 713px;
            top: 415px;
          }

          &--3rd {
            height: 50px;
            left: 713px;
            top: 765px;
          }
        }
      }
    }

    :global(.table--batb-11) & {
      &--1 {
        width: 305px;
        height: 390px;

        &#{$selector} {
          &--lt {
            left: 15px;
            top: 60px;
          }

          &--lb {
            left: 15px;
            top: 500px;
          }

          &--rt {
            right: 30px;
            top: 60px;
          }

          &--rb {
            right: 30px;
            top: 500px;
          }
        }
      }

      &--2 {
        width: 285px;
        height: 341px;

        &#{$selector} {
          &--lt {
            left: 180px;
            top: 80px;
          }

          &--lb {
            left: 180px;
            top: 525px;
          }

          &--rt {
            right: 195px;
            top: 80px;
          }

          &--rb {
            right: 195px;
            top: 525px;
          }
        }
      }

      &--3 {
        width: 363px;
        height: 732px;

        &#{$selector} {
          &--l {
            left: 331px;
            top: 80px;
          }

          &--r {
            right: 344px;
            top: 80px;
          }
        }
      }

      &--4 {
        width: 363px;
        height: 732px;

        &#{$selector} {
          &--l {
            left: 331px;
            top: 80px;
          }

          &--r {
            right: 344px;
            top: 80px;
          }
        }
      }
    }
  }
</style>
