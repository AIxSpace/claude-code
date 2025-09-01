cd r1
mkdir sources
node extract-sourcemap.js

npm install -g shuji

cd ..
shuji cli.mjs.map -o r1/sources --preserve > out.log