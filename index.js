'use strict';

// const mdTable = require('markdown-table');
// const utils = require('./lib/utils');
// const fs = require('fs');
const labelTools = require('./lib/labelTools.js');
const commandLineArgs = require('command-line-args');

//let maintainers = JSON.parse(fs.readFileSync('maintainers.json'));

const optDef = [
    { name: 'para', type: String, multiple: true, defaultOption: true },
    { name: 'debug', alias: 'd', type: Boolean },
    { name: 'verbose', alias: 'v', type: Boolean },
];

let args;
try {
    args = commandLineArgs(optDef);
} catch (e) {
    if (e.name === 'UNKNOWN_OPTION') {
        console.log(`error: unknown option '${e.optionName}'`);
        process.exit(1);
    } else if (e.name === 'UNKNOWN_VALUE') {
        console.log(`error: unsupported option value '${e.optionValue}'`);
        process.exit(1);
    } else if (e.name === 'ALREADY_SET') {
        console.log(`error: option '${e.optionName}' specified multiple times`);
        process.exit(1);
    } else {
        throw e;
    }
}

if (args.para[0] && args.para[0] === 'list-labels') {
    labelTools.listLabels(args);
} else if (args.para[0] && args.para[0] === 'set-labels') {
    labelTools.setLabels(args);
} else {
    console.log(`unknown command ${args.para[0]}`);
}
