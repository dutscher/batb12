<script>
    import { storedYoutubeLinks } from './stores';
    import Battles from "./Battles.svelte";

    let rounds;
    storedYoutubeLinks.subscribe(value => rounds = value);
    let innerWidth;

    let imgDim = "1669x929".split("x");
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="table" style="zoom:{Math.ceil((100 * ( innerWidth / imgDim[0] )))}%; width:{imgDim[0]}px; height:{imgDim[1]}px">
    <a class="playlist" target="_blank" href="https://www.youtube.com/playlist?list=PLmxvVi4Ors7Y_Zoa9FRYyZ7SwmK8e_VDz" title="Open Youtube Playlist">&nbsp;</a>
    <Battles battles={rounds["1"]["left-top"]} type="lt" />
    <Battles battles={rounds["1"]["left-bottom"]} type="lb" />
    <Battles battles={rounds["1"]["right-top"]} type="rt" />
    <Battles battles={rounds["1"]["right-bottom"]} type="rb" />
    <img class="table__img" src="../assets/table-12.jpg" alt="Battle at the Berrics 12 - Community" style="width:100%" />
</div>

<style lang="scss">
    .table {
        position: relative;
        color: #fff;

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
    }
</style>
