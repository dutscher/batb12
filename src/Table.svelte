<script>
    import { storedYoutubeLinks } from './stores';
    import Battles from "./Battles.svelte";

    let rounds;
    storedYoutubeLinks.subscribe(value => rounds = value);
</script>

<div class="table">
    <a class="playlist" target="_blank" href="https://www.youtube.com/playlist?list=PLmxvVi4Ors7Y_Zoa9FRYyZ7SwmK8e_VDz" title="Open Youtube Playlist">&nbsp;</a>
    <Battles battles={rounds["1"]["Joes"]} type="joes" />
    <Battles battles={rounds["1"]["Influencers"]} type="infl" />
    <img class="table__img" src="../assets/table.jpg" alt="Battle at the Berrics 12 - Community" />
</div>

<style lang="scss">
    .table {
        position: relative;
        color: #fff;

        .playlist {
            position: absolute;
            width: 10%;
            height: 20%;
            left: 50%;
            top: 7%;
            transform: translate(-50%);
        }

        &__img {
            width: 100%;
        }
    }
</style>
