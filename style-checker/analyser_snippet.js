const { ESLint } = require("eslint");
const fs = require("fs");
const { dirname } = require("path");
const path = require("path");


const js_linter = {
  name: "standard",
  linter: new ESLint({
    overrideConfigFile: "./.eslintrc.standard.js",
  }),
}

const jquery_linter = {
  name: "jquery",
  linter: new ESLint({
    overrideConfigFile: "./.eslintrc.jquery.js",
  }),
}

const ts_linter = {
  name: "typescript",
  linter: new ESLint({ overrideConfigFile: "./.eslintrc.typescript.js" }),
}

const react_linter = {
  name: "react",
  linter: new ESLint({ overrideConfigFile: "./.eslintrc.react.js" }),
}


const write = (writer, data) =>
  new Promise((resolve, reject) => {
    if (writer.write(data)) {
      process.nextTick(resolve);
    } else {
      writer.once("drain", () => {
        writer.off("error", reject);
        resolve();
      });
      writer.once("error", reject);
    }
  });

async function write_csv(resultsForLinter, linterName, writer, num) {
  for (let j = 0; j < resultsForLinter.length; j++) {
    const result = resultsForLinter[j];
    path_list = result.filePath.split('\\')
    file_name = path_list[path_list.length - 1]

    if (file_name == undefined)
      console.log(result)

    let content = '"';
    content += file_name;
    content += `\",${linterName}`;

    // if fatalErrorCount is greater than 0 then the file does not contain only js code
    if (result.fatalErrorCount > 0) {
      content += ',"Eslint ERROR"';
    } else {
      content += ',"{';

      const dict = {};
      result.messages.forEach(function (message) {
        if (!message.hasOwnProperty('fix')) {
          const occurences = dict[message.ruleId];
          if (occurences > 0) {
            dict[message.ruleId] = occurences + 1;
          } else {
            dict[message.ruleId] = 1;
          }
        }

      });

      // prints the number of rules broken for each type of rule
      let first = true;
      let statements = 0;
      for (const rule in dict) {
        if (rule == "num-statements/num-statements") {
          statements = dict[rule];
          continue;
        }
        if (!first) {
          content += ", '" + rule + "': " + dict[rule];
        } else {
          content += "'" + rule + "': " + dict[rule];
          first = false;
        }
      }
      const warnings = result.warningCount - statements;
      const fixableW = result.fixableWarningCount;
      const fixableE = result.fixableErrorCount;
      const fixable = fixableE + fixableW;
      content += '}", error count: "' + result.errorCount;
      content += '", warnings: "' + warnings;
      content += '", fixable: "' + fixable;
      content += '", statements: "' + statements + '"';
    }

    await write(writer, content + "\n");
  }
}


async function analyse(dir, writer, num) {
  try {
    if (dir.includes('Jquery')) {
      await Promise.resolve(
        jquery_linter.linter.lintFiles(`${dir}/*.js`)
      ).then((result) => {
        write_csv(result, jquery_linter.name, writer, num)
      })

    } else {
      await Promise.resolve(
        js_linter.linter.lintFiles(`${dir}/*.js`)
      ).then((result) => {
        write_csv(result, js_linter.name, writer, num)
      })
      await Promise.resolve(
        ts_linter.linter.lintFiles(`${dir}/*.ts`)
      ).then((result) => {
        if (result.length > 0) {
          write_csv(result, ts_linter.name, writer, num)
        }

      })
      await Promise.resolve(
        react_linter.linter.lintFiles(`${dir}/*.jsx`)
      ).then((result) => {
        if (result.length > 0) {
          write_csv(result, react_linter.name, writer, num)
        }
      })
    }
  } catch (err) {
    console.error("Failed to analyse directory with all linters", dir, err);
  }
}
(async () => {
  const args = process.argv.slice(2);
  const num = args[0]
  console.log('args: ', args)
  if (args.length > 2 || args.length < 1) {
    console.error(
      'Invalid arguments: expected use "node analyser.js path-to-snippet-folders [outputFilename.csv]"'
    );
    return;
  }

  const outputFilename =
    args.length === 2 ? args[1] : `output-js-${new Date().getTime()}.csv`;
  const writer = fs.createWriteStream(outputFilename, { flags: "a" });
  await analyse('JS_snippet_' + num + 'k', writer, num);
  await analyse('Jquery_snippet_' + num + 'k', writer, num);

  // writer.end();
})();
