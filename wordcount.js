const fs = require('fs');
const wordcount = require('wordcount');

const COMMENT_REGEX = /<!--[\S\s]*?-->/g;

var total = 0;

function countWords( filename ){
  var file = fs.readFileSync("Chapters/" + filename, "utf8");
  file = file.replace(COMMENT_REGEX,"");
  var count = wordcount(file);
  total += count;
  let tabs = "\t";
  if( filename.length < 15 ){
    tabs += "\t";
  }
  console.log(`${filename}:${tabs}${count} words`);
}


fs.readdir("./Chapters", function(err, items) {
  for( let ix in items ){
    let item = items[ix];
    countWords(item);
  }

  let now = new Date().toString();
  console.log(`\nTotal:\t\t\t${total} words`);

  let campnano = total - 41870;
  console.log(`\n\nCamp Nano Words:\t\t\t${campnano} words`);

  fs.appendFileSync("wordcount.log", `${now}\t\t${total} words\r\n`);
});
