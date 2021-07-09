<script>
    import { storedYoutubeLinks } from './stores';
    import Battles from "./Battles.svelte";

    let rounds;
    storedYoutubeLinks.subscribe(value => rounds = value);
    let innerWidth;
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div class="table" style="zoom: {Math.ceil((100 * ( innerWidth / 1669 )))}%">
    <a class="playlist" target="_blank" href="https://www.youtube.com/playlist?list=PLmxvVi4Ors7Y_Zoa9FRYyZ7SwmK8e_VDz" title="Open Youtube Playlist">&nbsp;</a>
    <Battles battles={rounds["1"]["Pros"]} type="pros" />
    <Battles battles={rounds["1"]["Joes"]} type="joes" />
    <Battles battles={rounds["1"]["Influencers"]} type="infl" />
    <Battles battles={rounds["1"]["Icons"]} type="icons" />
    <img class="table__img" src="../assets/table.jpg" alt="Battle at the Berrics 12 - Community" />
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

        &__img {
            width: 100%;
        }
    }
</style>
