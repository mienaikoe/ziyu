import snarkdown from 'snarkdown';
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
  for (let ix in filenames) {
    const filename = filenames[ix];
    const html = snarkdown( getMd(filename) )
    const divider = ix === 0 ? "" : DIVIDER;

    fullHtml = fullHtml + divider + html;
  }

  fs.writeFile("render.html", `<html><body>${fullHtml}</body></html>`, err => {
    if(err){
      console.error(err);
    } else {
      console.log("done!");
    }
  });
});
