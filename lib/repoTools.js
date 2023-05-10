'use strict';

const axios = require('axios').default;
const fs = require('fs');

async function getLabels(pRepo) {

  const resp = await axios.get(`https://api.github.com/repos/${pRepo}/labels`);

  if (resp.status === 200 && resp.data.length > 0) {
    console.log( `DEBUG: ${JSON.stringify(resp.data)}` );
    return resp.data;
  } else {
    console.log ( `ERROR: ${resp.status} - ${resp.error}`);  
    return {};
  }
};


async function listLabels(pRepo) {
  console.log(`listing labels of ${pRepo}`);

  const labelList = JSON.parse(fs.readFileSync('./templates/labels.json'));
  //console.log(JSON.stringify(labelList));

  const labels = await getLabels(pRepo);

  console.log('');
  console.log('Checking non standard labels ...');
  for ( const label of labels ) {
    const name = label.name;
    if ( !labelList[name] ) {
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
	console.log (`    ${name} - label is missing`);
    }
  }
}

async function addLabel (pRepository, pLabel) {

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

async function addLabels (pRepository) {
	await addLabel( pRepository, pLabel );
}
module.exports.getLabels = getLabels;
module.exports.listLabels = listLabels;