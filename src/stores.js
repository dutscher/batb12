import { writable } from 'svelte/store';

import bracketsJSON from '../data/batb12.json';

export const storedBracketData = writable({});
const brackets = {
    data: {
        name: 'BATB',
        title: 'Battle At The Berrics',
        date: 'Feb 23, 2009',
        yt: 'https://www.youtube.com/c/berrics/search?query=',
        ws: 'https://theberrics.com/',
        img: 'assets/table-12.jpg|1669x929',
        // insert data from json
        ...bracketsJSON.data,
    },
    videos: {},
};
// map videos
Object.keys(bracketsJSON.videos).map(round => {
    const roundKey = round.replace('Round ', "")
    // iterate round
    brackets.videos[roundKey] = {};
    Object.keys(bracketsJSON.videos[round]).map(category => {
        brackets.videos[roundKey][category] = bracketsJSON.videos[round][category].map(video => {
            const data = video.split('|');
            // "0          |1                         |2      |3         |4          |5      |6          "
            // "p1v7MNvUzbk|Sean Davis Vs. Shaun Hover|S SKATE|Sean Davis|l2I37cC1YWc|SKATE S|Shaun Hover" "
            const hasRematch = data.length > 4;

            return {
                youtube: 'https://www.youtube.com/watch?v=' + data[!hasRematch ? 0 : 4],
                title: data[1],
                result: data[!hasRematch ? 2 : 5].split(' '),
                winner: data[!hasRematch ? 3 : 6],
            };
        });
    })
});
// map image
const img = brackets.data.img.split('|')
const dim = img[1].split('x');
brackets.data.img = {
    src: img[0],
    w: dim[0],
    h: dim[1],
}
brackets.data.modifier = brackets.data.name.toLowerCase().replace(' ', '-')
console.log(brackets)
storedBracketData.set(brackets);
