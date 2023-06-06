'use strict';

const axios = require('axios').default;

const utils = require('./utils.js');

async function repoExists(pRepo) {
    const requ = `repos/${pRepo}`;
    const resp = await get(requ);

    if (!resp) return false;
    if (resp.full_name !== pRepo) return false;
    //if (resp.private) return false;
    return true;
}

async function get(pRequ) {
    const requ = `https://api.github.com/${pRequ}`;
    utils.debug(`requ: ${requ}`);
    try {
        const resp = await axios.get(requ);
        utils.debug(`resp: ${resp.status}`);
        utils.debug(`resp: ${JSON.stringify(resp.data)}`);
        if (resp.status === 200 && resp.data) {
            return resp.data;
        } else {
            console.log(`error: ${resp.status} - ${resp.error}`);
            return null;
        }
    } catch (e) {
        utils.debug(e.toJSON());
        return null;
    }
}

module.exports.get = get;
module.exports.repoExists = repoExists;
