const fs = require("fs");
const { parse } = require("csv-parse");
const parser = parse();

const mergeKeysValues = (keys, values) =>
  keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});

const shouldSample = () => Math.floor(Math.random() * 10001) == 1;

let counterPy = 0;
let counterJs = 0;
const processRecord = (record) => {
  let written = false;

  // Count number of non-empty lines
  const recordLines = record.Content.split("\n").filter(
    (l) => l.trim() != ""
  ).length;
  const sample = shouldSample();

  if (record.Tags.indexOf("javascript") > -1) {
    const discardReasons = [];
    if (!/console|\(|=/.test(record.Content)) {
      discardReasons.push("tokens");
    }

    if (recordLines < 6) {
      discardReasons.push("length");
    }

    if (discardReasons.length && sample) {
      const dir = `./discarded-snippets-sample/js`;
      fs.writeFileSync(
        `${dir}/${record.PostId}-${counterJs}.js`,
        record.Content.replace(/^\s{4}|\s*$/gm, "") // Remove 4 spaces at start or any number of spaces at end of each line
      );
      counterJs++;
      written = true;
    }
  }

  if (record.Tags.indexOf("python") > -1) {
    const discardReasons = [];
    if (!/print|import|\(|=/.test(record.Content)) {
      discardReasons.push("tokens");
    }

    if (recordLines < 6) {
      discardReasons.push("length");
    }

    if (discardReasons.length && sample) {
      const dir = `./discarded-snippets-sample/python`;
      fs.writeFileSync(
        `${dir}/${record.PostId}-${counterPy}.py`,
        record.Content.replace(/^\s{4}|\s*$/gm, "") // Remove 4 spaces at start or any number of spaces at end of each line
      );
      counterPy++;
      written = true;
    }
  }
  return written;
};

let headers = [];
let processed = 0;
let written = 0;

if (!fs.existsSync("./discarded-snippets-sample/js")) {
  fs.mkdirSync("./discarded-snippets-sample/js", { recursive: true });
}
if (!fs.existsSync("./discarded-snippets-sample/python")) {
  fs.mkdirSync("./discarded-snippets-sample/python");
}

fs.createReadStream("./test-data.csv")
  .pipe(parser)
  .on("data", function (csvRow) {
    if (!headers.length) {
      headers = csvRow;
      headers[0] = "PostId";
      headers[3] = "Content";
      return;
    }
    const record = mergeKeysValues(headers, csvRow);
    if (processRecord(record)) {
      written++;
      console.log(`Written ${written} snippets`);
    }

    processed++;
    if (processed % 1000 === 0) console.log(`Processed ${processed} snippets`);
  });
