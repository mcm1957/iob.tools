'use strict';

let optDebug = false;

function debug(pLog) {
    if (optDebug) console.log(`[debug] ${pLog}`);
}

function setDebug(pFlag) {
    if (pFlag) {
        console.log(`[debug] debug output enabled`);
    } else {
        if (optDebug) console.log(`[debug] debug output disabled`);
    }
    optDebug = pFlag;
}

module.exports.debug = debug;
module.exports.setDebug = setDebug;
