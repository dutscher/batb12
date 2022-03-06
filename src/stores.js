import { writable } from 'svelte/store';
import bracketsJSON from '../data/batb12.json';

export const activeData = writable({ version: bracketsJSON.nr, youtubeVideo: null });

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
            if (!video.startsWith('-|-|-')) {
                const data = video.split('|');
                // "0          |1                         |2      |3         |4          |5      |6          "
                // "p1v7MNvUzbk|Sean Davis Vs. Shaun Hover|S SKATE|Sean Davis|l2I37cC1YWc|SKATE S|Shaun Hover"
                // "p1v7MNvUzbk*|Sean Davis* Vs. Shaun Hover|S SKATE|Sean Davis|l2I37cC1YWc|SKATE S|Shaun Hover"
                const hasRematch = data.length > 4;
                const isSwitched = data[!hasRematch ? 0 : 4].includes('*');
                // "TnrqvN6ChPE|Nick Tucker* Vs. Sierra Fellers*/Ishod Wair* Vs. Shane O'Neill*|S SKATE|Nick Tucker",
                const skaterRaw = data[1].replace(' vs. ', ' Vs. ').split('/')[0].split(' Vs. ');
                const skater = {
                    left: skaterRaw[isSwitched ? 1 : 0],
                    right: skaterRaw[isSwitched ? 0 : 1],
                }
                if (skater.left.includes('*')) {
                    skater.replaceLeft = true;
                    skater.left = skater.left.replace('*', '');
                }
                if (skater.right.includes('*')) {
                    skater.replaceRight = true;
                    skater.right = skater.right.replace('*', '');
                }
                const resultRaw = data[!hasRematch ? 2 : 5].split(' ');
                const result = resultRaw.length === 1 ? {} : {
                    left: resultRaw[isSwitched ? 1 : 0],
                    right: resultRaw[isSwitched ? 0 : 1],
                }
                return {
                    id: data[!hasRematch ? 0 : 4].replace(/\*$/, ''),
                    skater,
                    result,
                    winner: data[!hasRematch ? 3 : 6],
                    isSwitched,
                };
            }
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
//console.log(brackets)
console.log(brackets)
storedBracketData.set(brackets);
