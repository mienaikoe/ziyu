import showdown from "showdown";
import fs from "fs";
import path from "path";

const COMMENT_REGEX = /<!--[\S\s]*?-->/g;
const DIVIDER = "\n<div style=\"page-break-after: always;\"></div>\n";

function getMd(filename) {
  var file = fs.readFileSync(path.join("Chapters", filename), "utf8");
  file = file.replace(COMMENT_REGEX, "");
  return file;
}

fs.readdir(path.join(".", "Chapters"), function (err, filenames) {
  let fullHtml = "";
  const converter = new showdown.Converter();
  for (let ix in filenames) {
    const filename = filenames[ix];
    const html = converter.makeHtml( getMd(filename) )
    const divider = ix === 0 ? "" : DIVIDER;
    let className;
    if( filename.includes("Title") ){
      className = "title";
    } else if( filename.includes("Part") ){
      className = "part";
    } else {
      className = "chapter";
    }

    fullHtml = fullHtml + divider + `<div class="${className}">${html}</div>`;
  }

  fs.writeFile("render.html", `<html><head><link rel="stylesheet" href="./render.css"></head><body>${fullHtml}</body></html>`, err => {
    if(err){
      console.error(err);
    } else {
      console.log("done!");
    }
  });
});
