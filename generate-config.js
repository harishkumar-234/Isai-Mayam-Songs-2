const fs = require('fs');
const path = require('path');

const repo = 0; // change to 1 or 2 in other repos

const config = [];

const folders = fs.readdirSync('.').filter(item => {
  return fs.statSync(item).isDirectory() &&
         item !== '.github';
});

folders.forEach(folder => {
  const songs = fs.readdirSync(folder).filter(file =>
    /\.(mp3|mpeg|wav|m4a|aac|ogg|flac)$/i.test(file)
  );

  if (songs.length > 0) {
    config.push({
      repo,
      movie: folder,
      songs
    });
  }
});

const output =
`window.SONGS_CONFIG = ${JSON.stringify(config, null, 2)};`;

fs.writeFileSync('songs-config.js', output);

console.log('songs-config.js generated');
