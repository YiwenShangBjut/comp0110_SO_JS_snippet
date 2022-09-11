require("dotenv").config();
const { BigQuery } = require("@google-cloud/bigquery");
const { stringify } = require("csv-stringify/sync");
const fs = require("fs");

const bigquery = new BigQuery();

const queryBig = fs.readFileSync("./query.sql", "utf-8");

// Small example query to test with
const querySmall = `SELECT * FROM \`sotorrent-org.2020_12_31.PostType\` LIMIT 1000`;

// JOB ID: 23a00fbf-cc15-47a5-a1d1-045584ffa30b

async function extract() {
  // Run the query as a job
  const [job] = await bigquery.createQueryJob({
    query: querySmall,
    jobTimeoutMs: 10000000,
  });
  console.log("Job started", job?.id);

  const filename = `data-${new Date().getTime()}.csv`;
  const fileStream = fs.createWriteStream(filename, { flags: "a" });

  let finished = false;
  let pageTokenToUse = null;
  let writtenRows = 0;
  while (!finished) {
    console.log(`Fetching results with pageToken ${pageTokenToUse}`);
    const queryOptions = { maxResults: 20000 };
    if (pageTokenToUse) queryOptions.pageToken = pageTokenToUse;

    const results = await job.getQueryResults(queryOptions);
    const [rows, _, { totalRows, pageToken, totalBytesProcessed }] = results;
    console.log(`Just fetched ${totalBytesProcessed} bytes`);

    const justFetchedNumRows = rows.length;
    pageTokenToUse = pageToken;
    if (!pageToken) finished = true;

    // Write the CSV header line first
    if (writtenRows === 0) {
      fileStream.write(stringify([Object.keys(rows[0])], { header: false }));
    }

    // Write one-line-at-a-time in JSON Lines format (one JSON object per line)
    console.log(`Writing ${justFetchedNumRows} rows to file...`);
    rows.forEach((row, i) => {
      if (i % 100 === 0) {
        console.log(`Writing ${i + 1}/${justFetchedNumRows}...`);
      }

      // Write the object as a CSV line
      fileStream.write(stringify([Object.values(row)], { header: false }));
      writtenRows++;
    });
    console.log(`So far, written ${writtenRows} rows out of ${totalRows}`);
  }

  fileStream.end();
  console.log(`Finished writing ${writtenRows} rows!`);
}
console.log('query js is running')
extract();
