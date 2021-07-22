const fs = require('fs-extra');
const srcPath = './public/index.html';
const destPath = './public/index.html';
const cacheBuster = (new Date().getTime());
const tplCSS = `<link rel="stylesheet" href="./build/bundle.css?cb=${cacheBuster}">`;
const tplJS = `<script defer src="./build/bundle.js?cb=${cacheBuster}"></script>`;
const tplSW = `'./sw.js?cb=${cacheBuster}'`;

let content = fs.readFileSync(srcPath, 'utf-8');
content = content.replace(/<link rel="stylesheet" href="\.\/build\/bundle\.css\?cb=\d*">/, tplCSS);
content = content.replace(/<script defer src="\.\/build\/bundle\.js\?cb=\d*"><\/script>/, tplJS);
content = content.replace(/'\.\/sw\.js\?cb=\d*'/, tplSW);
// activate tracking
content = content.replace(/async xsrc/, 'async src');

fs.writeFileSync(destPath, content, 'utf-8');

console.log('updated cache bust in ' + destPath)
