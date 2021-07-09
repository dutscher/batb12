import { writable } from 'svelte/store';

import youtubeJSON from '../data/youtube.json';

export const storedYoutubeLinks = writable({});
const mappedVideos = {};

Object.keys(youtubeJSON).map(round => {
    const roundKey = round.replace("Round ", "")
    mappedVideos[roundKey] = {};
    Object.keys(youtubeJSON[round]).map(category => {
        mappedVideos[roundKey][category] = youtubeJSON[round][category].map(video => {
            const data = video.split('|');

            return {
                youtube: "https://www.youtube.com/watch?v=" + data[0],
                title: data[1],
                result: data[2].split(' '),
                winner: data[3],
                referee: data[4],
            };
        });
    })
});

storedYoutubeLinks.set(mappedVideos);
