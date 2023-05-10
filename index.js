'use strict';

// const mdTable = require('markdown-table');
// const utils = require('./lib/utils');
// const fs = require('fs');
const repoTools = require('./lib/repoTools.js');

//let maintainers = JSON.parse(fs.readFileSync('maintainers.json'));

if (process.argv[2].toLowerCase() === 'listlabels') {
  const repo = process.argv[3];
  repoTools.listLabels( repo );
} else {
  console.log(`unknown command ${process.argv[2]}`);
}