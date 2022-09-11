const fs = require("fs");
const { parse } = require("csv-parse");
const parser = parse();

const mergeKeysValues = (keys, values) =>
  keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});

let commonCounter = 0;
const processRecord = (record) => {
  // Count number of non-empty lines
  recordLines = record.Content.split("\n").filter((l) => l.trim() != "").length;
  let isJs = false;

  if (record.Tags.indexOf("javascript") > -1) {
    const discardReasons = [];
    if (!/console|\(|=/.test(record.Content)) {
      discardReasons.push("tokens");
    }

    if (recordLines < 6) {
      discardReasons.push("length");
    }

    if (!discardReasons.length) {
      isJs = true;
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

    if (!discardReasons.length) {
      if (isJs) commonCounter++;	    
    }
  }
};

let headers = [];
let processed = 0;

fs.createReadStream("../MASTER_RESULTS_FILES/FULL_DATASET.csv")
  .pipe(parser)
  .on("data", function (csvRow) {
    if (!headers.length) {
      headers = csvRow;
      return;
    }
    const record = mergeKeysValues(headers, csvRow);
    processRecord(record);
    processed++;
    if (processed % 1000 === 0) console.log(`Processed ${processed} snippets (currently ${commonCounter} common snippets)`);
  }).on("end", function() {
    console.log('Common snippets to both JS and PY: ', commonCounter);
  });
