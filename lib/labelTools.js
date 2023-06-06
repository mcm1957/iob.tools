'use strict';

const fs = require('fs');

const gh = require('./githubTools.js');
const utils = require('./utils.js');

async function listLabels(pArgs) {
    utils.setDebug(pArgs.debug);
    const repo = pArgs.para[1] || '';
    if (!repo) {
        console.log(`error: no repostory specified`);
        return;
    }
    if (!(await gh.repoExists(repo))) {
        console.log(`error: repostory '${repo}' does not exist`);
        return;
    }

    console.log(`listing labels of ${repo}`);

    const labelList = JSON.parse(fs.readFileSync('./templates/labels.json'));

    utils.debug(`labels configured`);
    utils.debug(JSON.stringify(labelList));

    const labels = await gh.get(`repos/${repo}/labels`);
    if (!labels) return;

    console.log('');
    console.log('Checking non standard labels ...');
    for (const label of labels) {
        const name = label.name;
        if (!labelList[name]) {
            console.log(`    ${name} - non standard label`);
        } else {
            labelList[name].exists = 'x';
        }
    }

    console.log('');
    console.log('Checking missing labels ...');
    //console.log(JSON.stringify(labelList));
    for (const name in labelList) {
        if (labelList[name].exists !== 'x') {
            console.log(`    ${name} - label is missing`);
        }
    }
}

async function addLabel(pArgs, pRepository, pLabel) {
    /*
curl -L \ -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/labels \
  -d '{"name":"bug","description":"Something isn'\''t working","color":"f29513"}'
*/
    const resp = await axios.get(`https://api.github.com/repos/${pRepository}/labels`);
}

async function setLabel(pArgs, pRepo, pLabel) {
    if (!pArgs.verbose) console.log(`    processing label '${pLabel.name}'`);
}

async function setLabels(pArgs) {
    utils.setDebug(pArgs.debug);
    const repo = pArgs.para[1] || '';
    if (!repo) {
        console.log(`error: no repostory specified`);
        return;
    }
    if (!(await gh.repoExists(repo))) {
        console.log(`error: repostory '${repo}' does not exist`);
        return;
    }

    const labelList = JSON.parse(fs.readFileSync('./templates/labels.json'));
    const labels = await gh.get(`repos/${repo}/labels`);
    if (!labels) {
        s;
        console.log(`error: error retrieving existing labels`);
        return;
    }
    for (const label of labels) {
        const name = label.name;
        if (labelList[name]) {
            labelList[name].name = name;
            labelList[name].exists = 'x';
            labelList[name].cColor = label.color;
            labelList[name].cDescription = label.description;
        }
    }

    console.log(`setting labels at ${repo}`);
    for (const label in labelList) {
        if (pArgs.verbose) console.log(`    processing label '${label}'`);
        let isOk = true;
        if (!labelList[label].exists) {
            if (pArgs.verbose) console.log(`        label '${label}' does not exist, will be added`);
            isOk = false;
        } else {
            if (labelList[label].cColor != labelList[label].color) {
                if (pArgs.verbose)
                    console.log(
                        `        color of label '${label}' does not match ('${labelList[label].cColor}' -> '${labelList[label].color}'), will be fixed`,
                    );
                isOk = false;
            }
            if (labelList[label].cDescription != labelList[label].description) {
                if (pArgs.verbose)
                    console.log(
                        `        description of label ${label} does not match ('${labelList[label].cDescription}' -> '${labelList[label].description}'), will be fixed`,
                    );
                isOk = false;
            }
        }
        if (isOk) {
            if (pArgs.verbose) console.log(`        all checks passed`);
        } else {
            setLabel(pArgs, repo, labelList[label]);
        }
    }
}

module.exports.listLabels = listLabels;
module.exports.setLabels = setLabels;
