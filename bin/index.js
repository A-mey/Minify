#! /usr/bin/env node
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");
const path = require('path');
const fs = require('fs');
const {_figlet} = require('../src/figletFile');
const yargs = require("yargs");
let curentPath = process.cwd()
// let options = require('./../src/options');
let {processFileType} = require('./../src/isJSorCSSFile');


const options = yargs
// .usage(usage)
.option("f", {alias:"file", describe: "File to minify", type: "string", demandOption: false })
.option("m", {alias:"map", describe: "flag to map", type: "string", demandOption: false })
.option("t", {alias:"type", describe: "type of file to minify", type: "string", demandOption: false })
.help(true)
.argv;

// console.log("options", options.type.toUpperCase());


if (options.type && options.type.toUpperCase() != 'CSS' && options.type.toUpperCase() != 'JS') {
    return console.log("\x1b[31m", 'Invalid file type');
}

let settings = options.map? {sourceMap: {"filename": "", "url": ""}}: {}
settings.compress = false;
settings.mangle = false;

console.log(settings);
fs.readdir(curentPath, function (err, files) {
    // console.log(files)
    //handling error
    if (err) {
        return console.log("\x1b[31m", 'Unable to scan directory: ' + err);
    }
    // console.log(files);

    //checks if the user provided file name exists
    if (options.file) {
        if (!files.some(x => x.toUpperCase() == options.file.toUpperCase())) {
            // console.log("options", options)
            return console.log("\x1b[31m", 'Err: No such file exists');
        }
        // matchFile(files, options.file)
    }
    ///////////////////////////////////////////////////////////

    //checks if the user provided file type exists
    if (options.type) {
        if (options.type.toUpperCase == 'JS') {
            if (!files.some(x => {
                x.substring(lastIndexOf('.')+1, x.length).toUpperCase() == 'JS'
                && !(/.*\..*\.js$/g).test(x);
            })) {
                return console.log("\x1b[31m", 'Err: No js file found in directory');
            }
        }
        if (options.type.toUpperCase == 'CSS') {
            if (!files.some(x => {
                x.substring(x.lastIndexOf('.')+1, x.length).toUpperCase() == 'CSS'
                && !(/.*\..*\.js$/g).test(x);
            })) {
                return console.log("\x1b[31m", 'Err: No css file found in directory');
            }
        }
        // matchFile(files, options.file)
    }

    //if user hasn't provided a type, check if JS or CSS files exist
    // else {
    //     if (!files.some(x => {
    //         (x.substring(x.lastIndexOf('.'), x.length+1).toUpperCase() == 'CSS'
    //         && (/.*\..*\.css$/g).test(x))
    //         || (x.substring(x.lastIndexOf('.'), x.length+1).toUpperCase() == 'JS'
    //         && (/.*\..*\.js$/g).test(x))
    //     })) {
    //         return console.log("\x1b[31m", 'Err: No css or js file found in directory');
    //     }
    // }
    //////////////////////////////////////////////////////////////////
    
    //listing all files using forEach
    files.forEach(function (file) {
        let fileDetails = processFileType(file, options);
        console.log(fileDetails, "fileDetails");
        if (fileDetails.proceed) {
            
            // fileNameLiteral = '\"'+ fileDetails.name + '\"';
            let minifiedName = fileDetails.fullName + ".min." + fileDetails.type;
            // console.log(minifiedName);
            let fileName = fileDetails.name;
            console.log(settings, "...settings")
            if (settings.sourceMap && settings.sourceMap.hasOwnProperty("filename")) {
                settings.sourceMap.filename = fileName;
            }
            if (settings.sourceMap && settings.sourceMap.hasOwnProperty("url")) {
                settings.sourceMap.url = `${minifiedName}.map`;
            }
            console.log("settings",settings);
            // console.log("fileName",fileName);

            if (fileDetails.type == 'js') {
                console.log("sdfsdfsdf")
                let result = UglifyJS.minify({
                    fileName: fs.readFileSync(fileName, "utf8")
                }
                // , {
                //     sourceMap: {
                //         // content: fs.readFileSync(fileName, "utf8"),
                //         "filename": fileName,
                //         "url": `${minifiedName}.map`
                //     }
                // }
                ,settings
                // }).code, "utf8");
                // fs.writeFileSync("UnfydSec.min.js", UglifyJS.minify({
                //     'UnfydSec.js': fs.readFileSync('UnfydSec.js', "utf8")
                // }
                // , {
                //     sourceMap: {
                //         // content: fs.readFileSync('UnfydSec.js', "utf8"),
                //         filename: 'UnfydSec.js',
                //         url: 'UnfydSec.js.map'
                //     }
                // }
                )
                // result.map = result.map.replace("[\"filename\"]", `[${file}]`);
                let i = result.map.indexOf("fileName");
                result.map = result.map.substring(0, result.map.indexOf("fileName")) + file + result.map.substring( result.map.indexOf("fileName") + 8, result.map.length);
                console.log("result", (result.map));
                fs.writeFileSync(minifiedName, result.code);
                if (options.map) {
                    fs.writeFileSync(`${minifiedName}.map`, result.map);
                }
            }

            if (fileDetails.type == 'css') {
                console.log("\x1b[33m", 'Warning: Cannot create source map for css files');
                let output = new CleanCSS(
                    {
                        //  sourceMap: true, rebaseTo: curentPath
                    }
                )
                .minify(fs.readFileSync(fileName, "utf8"))
                // , function (error, output) {
                    // access output.sourceMap for SourceMapGenerator object
                    // see https://github.com/mozilla/source-map/#sourcemapgenerator for more details
                console.log("sourceMap", output);

                // });
            }

            
            // console.log("minifiedName", minifiedName)
            // console.log("result", result);
        }
    });
    _figlet("DONE!!!")
});