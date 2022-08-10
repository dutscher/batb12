import { writable } from 'svelte/store';
import { storedBracketData, prepareJSON } from "./bracket-data.js";

let activeNr;

export const activeData = writable({ activeNr: null, youtubeVideo: null });

activeData.subscribe(async store => {
    if (store.activeNr &&  store.activeNr !== activeNr) {
        activeNr = store.activeNr;
        const loadedJson = await fetch(`../data/batb${activeNr}.json`).then(res => res.json());

        console.log({loadedJson})

        storedBracketData.set(prepareJSON(loadedJson));
    }
});
