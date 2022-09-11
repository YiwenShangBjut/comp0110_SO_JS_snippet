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

const find_snippet_lines = (file_name, num) => {
    let start = 0
    let end = 10000

    // const snippet_dir = 'snippet-' + num + 'k/exact_match_snippet_' + num + 'k'
    // const snippet = fs.readFileSync(snippet_dir + '/' + file_name, 'utf8')
    // const file_dir = 'project-file-' + num + 'k/exact_match_file_' + num + 'k'
    // const file = fs.readFileSync(file_dir + '/' + file_name, 'utf8')
    // snippet_lines = snippet.split('\n')
    // file_lines = file.split('\n')
    // // console.log('snippet:',snippet_lines[0])
    // for (let i = 0; i < file_lines.length; i++) {
    //     if (file_lines[i].trim() == snippet_lines[0].trim()) {
    //         start = i
    //     }
    // }
    // // console.log('start: ', start)
    // end = start + snippet_lines.length - 1
    return [start + 1, end + 1]
}

async function write_csv(resultsForLinter, linterName, writer, num) {
    for (let j = 0; j < resultsForLinter.length; j++) {
        const result = resultsForLinter[j];
        path_list = result.filePath.split('\\')
        file_name = path_list[path_list.length - 1]
        if (file_name == "29122006.ts") {
            console.log(result)
        }
        if (file_name == undefined)
            console.log(result)
        snippet_range = find_snippet_lines(file_name, num)

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
                if (message.line >= snippet_range[0] && message.line < snippet_range[1]) {
                    if (!message.hasOwnProperty('fix')) {
                        const occurences = dict[message.ruleId];
                        if (occurences > 0) {
                            dict[message.ruleId] = occurences + 1;
                        } else {
                            dict[message.ruleId] = 1;
                        }
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
        await Promise.resolve(
            jquery_linter.linter.lintFiles(`${dir}/*.js`)
        ).then((result) => {
            write_csv(result, jquery_linter.name, writer, num)
        })
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

    //   const outputFilename =
    //     args.length === 2 ? args[1] : `output-js-${new Date().getTime()}.csv`;
    const outputFilename = 'output-' + num + 'k-jq-file.csv'
    const writer = fs.createWriteStream(outputFilename, { flags: "a" });
    await analyse('JS_project_file_' + num + 'k', writer, num);

})();
