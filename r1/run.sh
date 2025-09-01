cd r1
node extract-sourcemap.js
npm install -g shuji
shuji cli.mjs.map -o r1/sources --preserve > out.log