import { writable } from 'svelte/store';
import bracketsJSON from '../data/batb12.json';

export const activeData = writable({ version: bracketsJSON.nr, youtubeVideo: null });

const convertCategory = (indicator) => {
    const cats = {
        'left': 'l',
        'left-top': 'lt',
        'left-bottom': 'lb',
        'right': 'r',
        'right-top': 'rt',
        'right-bottom': 'rb',
        'middle': 'm',
        '3rd-place': '3rd',
    }
    return cats[indicator];
}

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
    const delimiter = ' Vs. ';
    Object.keys(bracketsJSON.videos[round]).map(category => {
        let shortCategory = convertCategory(category);
        brackets.videos[roundKey][shortCategory] = bracketsJSON.videos[round][category].map(video => {
            if (!video.startsWith('-|-|-')) {
                const [youtubeId, skaterRaw, resultsRaw, winner, rematchYoutubeId, rematchResultsRaw, rematchWinner] = video.split('|');
                // "0          |1                         |2      |3         |4          |5      |6          "
                // "p1v7MNvUzbk|Sean Davis Vs. Shaun Hover|S SKATE|Sean Davis|l2I37cC1YWc|SKATE S|Shaun Hover"
                // "p1v7MNvUzbk*|Sean Davis* Vs. Shaun Hover|S SKATE|Sean Davis|l2I37cC1YWc|SKATE S|Shaun Hover"
                const isSwitched = (rematchYoutubeId || youtubeId).includes('*');
                // "TnrqvN6ChPE|Nick Tucker* Vs. Sierra Fellers*/Ishod Wair* Vs. Shane O'Neill*|S SKATE|Nick Tucker",
                const [leftSkater, rightSkater] = skaterRaw.replace(' vs. ', delimiter).replace(' VS. ', delimiter).split('/')[0].split(delimiter);
                const skater = {
                    left: { name: leftSkater },
                    right: { name: rightSkater },
                }
                // replace inital
                if (skater.left.name.includes('*')) {
                    skater.left.replaced = true;
                    skater.left.name = skater.left.name.replace('*', '');
                }
                // legion of doom / Tyler Peterson--Legion of Doom
                if (skater.left.name.includes('--')) {
                    skater.left.crossed = true;
                    skater.left.name = skater.left.name.split('--')[1];
                }
                // replace inital
                if (skater.right.name.includes('*')) {
                    skater.right.replaced = true;
                    skater.right.name = skater.right.name.replace('*', '');
                }
                // legion of doom
                if (skater.right.name.includes('--')) {
                    skater.right.crossed = true;
                    skater.right.name = skater.right.name.split('--')[1];
                }
                const resultRaw = (rematchResultsRaw || resultsRaw).split(' ');
                const result = resultRaw.length === 1 ? {} : {
                    left: resultRaw[0],
                    right: resultRaw[1],
                }
                return {
                    id: (rematchYoutubeId || youtubeId).replace(/\*$/, ''),
                    skater,
                    result,
                    winner: (rematchWinner || winner),
                    isSwitched,
                };
            } else {
                return {
                    result: { left: '-', right: '-' },
                    skater: { left: { name: '-' }, right: { name: '-' } },
                    winner: '-',
                };
            }
        });
    })
});

console.log(brackets.videos)

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
storedBracketData.set(brackets);
