const Parser = require("acorn").Parser;
const fs = require('fs');
const TypescriptParser= require("typescript-parser").TypescriptParser;

const num=5

const dirname='../snippets_'+num+'k'
// const dirname='../snippets_test'
// const dirname_original='../snippets_'+num+'k_original'
// const dirname_original="../snippets_test_original"

const filenames = fs.readdirSync(dirname)
// const filenames_original = fs.readdirSync(dirname_original)

// const ts_parser = new TypescriptParser();

// async function parse_ts(source){
//     try{
//         await parser.parseSource(source);
//         return true
//     } catch(error){
//        return false
//     }
// }

let parsable_num=0
let unparsable_num=0

filenames.forEach(file=>{
    const source =fs.readFileSync(dirname+'/'+file, 'utf8')
    try{
        Parser.parse(source, {
            ecmaVersion: 2020
        });
        parsable_num+=1
    } catch(error){
        unparsable_num+=1

    }
})
console.log('with preprocess')
console.log('parsed num: ',parsable_num)
console.log('unparsed num:',unparsable_num)
console.log('total num:',parsable_num+unparsable_num)
console.log('parse ratio is:',parsable_num/(parsable_num+unparsable_num))


// parsable_num=0
// unparsable_num=0

// filenames_original.forEach(file=>{
//     const source =fs.readFileSync(dirname_original+'/'+file, 'utf8')
//     try{
//         Parser.parse(source, {
//             ecmaVersion: 2020
//         });
//         parsable_num+=1
//     } catch(error){
//         unparsable_num+=1

//     }
// })
// console.log('without preprocess')
// console.log('parsed num: ',parsable_num)
// console.log('unparsed num:',unparsable_num)
// console.log('total num:',parsable_num+unparsable_num)
// console.log('parse ratio is:',parsable_num/(parsable_num+unparsable_num))