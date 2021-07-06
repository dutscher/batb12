const fs = require('fs-extra');
const indexPath = './public/index.html';
const cacheBuster = (new Date().getTime());
const tplCSS = `<link rel="stylesheet" href="./build/bundle.css?cb=${cacheBuster}">`;
const tplJS = `<script defer src="./build/bundle.js?cb=${cacheBuster}"></script>`;

let content = fs.readFileSync(indexPath, 'utf-8');
content = content.replace(/<link rel="stylesheet" href="\.\/build\/bundle\.css\?cb=\d*">/, tplCSS);
content = content.replace(/<script defer src="\.\/build\/bundle\.js\?cb=\d*"><\/script>/, tplJS);

fs.writeFileSync(indexPath, content, 'utf-8');

console.log('updated cache bust in ' + indexPath)
