const yargs = require("yargs");

const options = yargs
// .usage(usage)
.option("f", {alias:"file", describe: "File to minify", type: "string", demandOption: false })
.option("m", {alias:"map", describe: "flag to map", type: "string", demandOption: false })
.help(true)
.argv;

console.log(options, "options1");
module.export = options;