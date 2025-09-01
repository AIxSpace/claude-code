const fs = require('fs');

const content = fs.readFileSync('../cli.mjs', 'utf8');

if (content.length === 0) {
    console.log('read content failed');
    return;
}

const sourcemapMatch = content.match(/\/\/# sourceMappingURL=data:application\/json;base64,([A-Za-z0-9+\/=]+)/m);

if (sourcemapMatch) {
    const base64Data = sourcemapMatch[1];
    const sourcemapJson = Buffer.from(base64Data, 'base64').toString('utf8');
    
    const sourcemap = JSON.parse(sourcemapJson);
    const formattedJson = JSON.stringify(sourcemap, null, 2);
    
    fs.writeFileSync('../cli.mjs.map', formattedJson);
    console.log('extract sourcemap to cli.mjs.map');

    console.log(`contains ${sourcemap.sources.length} source files`);
} else {
    console.log('can not find sourcemap data');
    console.log('File ending:');
    console.log(content.slice(-200));
}