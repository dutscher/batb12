const fs = require('fs-extra');
const indexPath = './public/index.html';
const cacheBuster = (new Date().getTime());
const tpl = `<script defer src="./build/bundle.js?cb=${cacheBuster}"></script>`;

let content = fs.readFileSync(indexPath, 'utf-8');

content = content.replace(/<script defer src="\.\/build\/bundle\.js\?cb=\d*"><\/script>/, tpl);

fs.writeFileSync(indexPath, content, 'utf-8');

console.log('updated cache bust in ' + indexPath)
