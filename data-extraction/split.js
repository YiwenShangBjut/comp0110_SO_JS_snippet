const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify/sync");
const parser = parse();

const mergeKeysValues = (keys, values) =>
  keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});

const pythonDiscarded = fs.createWriteStream(
  "./py-discarded-posts.csv",
  "utf-8"
);
pythonDiscarded.write("postIdFinal,reason\n");

const javascriptDiscarded = fs.createWriteStream(
  "./js-discarded-posts.csv",
  "utf-8"
);
javascriptDiscarded.write("postIdFinal,reason\n");

let counterPy = 0;
let counterJs = 0;
const processRecord = (record) => {
  // console.log(record)
  // Count number of non-empty lines
  recordLines = record.content.split("\n").filter((l) => l.trim() != "").length;

  if (record.Tags.indexOf("javascript") > -1) {
    const discardReasons = [];
    if (!/console|\(|=/.test(record.content)) {
      discardReasons.push("tokens");
    }

    if (recordLines < 6) {
      discardReasons.push("length");
    }

    if (discardReasons.length) {
      javascriptDiscarded.write(
        stringify([[record.postIdFinal, discardReasons.join("+")]], {
          header: false,
        })
      );
    } else {
      // Organise files on the filesystem by using the first 4 digits of the Post ID
      // as the containing folder, to improve performance
      const dir = `./snippets/js/${record.postIdFinal.toString().substr(0, 4)}`;
      fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(
        `${dir}/${record.postIdFinal}-${counterJs}.js`,
        record.content.replace(/^\s{4}|\s*$/gm, "") // Remove 4 spaces at start or any number of spaces at end of each line
      );
      counterJs++;
    }
  }

  if (record.Tags.indexOf("python") > -1) {
    const discardReasons = [];
    if (!/print|import|\(|=/.test(record.content)) {
      discardReasons.push("tokens");
    }

    if (recordLines < 6) {
      discardReasons.push("length");
    }

    if (discardReasons.length) {
      pythonDiscarded.write(
        stringify([[record.postIdFinal, discardReasons.join("+")]], {
          header: false,
        })
      );
    } else {
      // Organise files on the filesystem by using the first 4 digits of the Post ID
      // as the containing folder, to improve performance
      const dir = `./snippets/python/${record.postIdFinal.toString().substr(0, 4)}`;
      fs.mkdirSync(dir, { recursive: true });

      fs.writeFileSync(
        `${dir}/${record.postIdFinal}-${counterPy}.py`,
        record.content.replace(/^\s{4}|\s*$/gm, "") // Remove 4 spaces at start or any number of spaces at end of each line
      );
      counterPy++;
    }
  }
};

let headers = [];
let processed = 0;

if (!fs.existsSync("./snippets/js")) {
  fs.mkdirSync("./snippets/js", { recursive: true });
}
if (!fs.existsSync("./snippets/python")) fs.mkdirSync("./snippets/python");

fs.createReadStream("./test-data.csv")
  .pipe(parser)
  .on("data", function (csvRow) {
    if (!headers.length) {
      headers = csvRow;
      return;
    }
    const record = mergeKeysValues(headers, csvRow);
    processRecord(record);
    processed++;
    if (processed % 100 === 0) console.log(`Processed ${processed} snippets`);
  });
