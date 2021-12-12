const fs = require("fs");
const yaml = require("js-yaml");
//console.log("yo");
try {
  const doc = yaml.load(
    fs.readFileSync("../whatchu-up-to-mattchoo/_data/top_scrobbled.yml", "utf8")
  );
  //   for (let song of doc) {
  //     console.log(song.track);
  //   }
  const lyricsString = doc.reduce((str, song) => str + song.lyric + " ", "");
  console.log(lyricsString);
  fs.writeFile("./lyricsCloud.txt", lyricsString, (err) => {
    if (err) return console.log(err);
    else return console.log("File Saved!");
  });
  doc.reverse();

  const genresMap = {};
  for (const song of doc){
    for(const genre of song.genres){
      if(genresMap[genre])genresMap[genre]+=song.scrobbles;
      else genresMap[genre] = song.scrobbles;
    }
  }
  console.log(genresMap);
  let genresString = "";
  const sortedGenres=Object.entries(genresMap).sort((a,b) => b[1] -a[1] );
  console.log("SORTED")
  console.log(sortedGenres)
  for (const [genre,freq] of sortedGenres){
    genresString+=genre;
    genresString+=":";
    genresString+=freq;
    genresString+="\n";
  }
  // const genresString = doc.reduce((str, song) => str + song.genres.reduce(
  //   (list,genre) => list + genre.type + " " ,""),"");
  // console.log(genresString);
  fs.writeFile("./genresCloud.txt", genresString, (err) => {
    if (err) return console.log(err);
    else return console.log("File Saved!");
  });

  const songMap = {};
  for (let song of doc){
    if(songMap[song.track])songMap[song.track]+= song.scrobbles;
    else songMap[song.track]=song.scrobbles
    ;
  }
  console.log(songMap);
  const sortedSongs = Object.entries(songMap).sort((a,b) => b[1] - a[1]);
  console.log("SORTED SONGS");
  console.log(sortedSongs)
  let trackTable="";
  for(const [title,freq] of sortedSongs){
    trackTable+=title;
    trackTable+=":";
    trackTable+=freq;
    trackTable+="\n";
  }
  console.log(trackTable);

  fs.writeFile("./tracksCloud.txt", trackTable, (err) => {
    if (err) return console.log(err);
    else return console.log("File Saved!");
  });


  //word it out with table format of TITLE:FREQ 
} catch (e) {
  console.log(e);
}


//word cloud link! https://worditout.com/word-cloud/create
//background color: #fdeeee
//range: #107010 to #bf8fef
