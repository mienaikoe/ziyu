const fs = require('fs');
const wordcount = require('wordcount');


var total = 0;

function countWords( filename ){
  var file = fs.readFileSync("Chapters/" + filename, "utf8");
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

  fs.appendFileSync("wordcount.log", `${now}\t\t${total} words\r\n`);
});
