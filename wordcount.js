const fs = require('fs');
const wordcount = require('wordcount');


var chaptersStarted = 4;
var total = 0;

function countWords( filename, chaptername ){
  var file = fs.readFileSync(filename, "utf8");
  var count = wordcount(file);
  total += count;
  console.log(`${chaptername}: ${count} words`);
}

countWords( "Chapters/Prologue.md", "Prologue " );
for( var ix=1; ix<=chaptersStarted; ix++ ){
  countWords(`Chapters/Chapter${ix}.md`, `Chapter ${ix}`);
}

console.log(`Total    : ${total} words`);

/*
  July 4 - 4524 -> x4710

*/
