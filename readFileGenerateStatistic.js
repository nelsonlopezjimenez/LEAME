/** READ: a json file ./Homo_sapiens.GRCh38.pep.all.2hash.json
 *  './Homo_sapiens.GRCh38.pep.all.json from Homo_sapiens.GRCh38.pep.all.txt
 *  PROCESS:  statistics: how many labels have same hash, how many seq have same hash
 *  SAVE: './Homo_sapiens.GRCh38.pep.all.hash-statistics.json to use tableu or something similar
 */

const { writeFile } = require('fs');
const { readFile } = require('fs').promises;
const crypto = require('crypto');


let fileName = './Homo_sapiens.GRCh38.pep.all.sha1.json';
// fileName = './out671.txt';
// fileName = './tmp.txt';


// fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.txt'; // JSON.stringigy(fastaOjbArray) invalid string length

const readContentFileExample = async fileName => {
  try {
    const mypromise = await readFile(fileName, { encoding: 'utf8' });
    // return mypromise.then(i => console.log(i)); // mypromise.then is not a function
    return mypromise;

  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
};

readContentFileExample(fileName).then( jsonObjString => { // it is read as a  string
  let hashMetod = 'md5';
  let seqObjHashArray = [];
  let jsonObj = JSON.parse(jsonObjString);
  let numOfRecords = jsonObj.length;
  numOfRecords = 3;

  for (let i = 0; i < jsonObj.length; i++){
    let seqObjHash = {};
    let labelHash;
    let seqHash;
    labelHash = crypto.createHash(hashMetod).update(jsonObj[i].label).digest('hex');
    seqHash = crypto.createHash(hashMetod).update(jsonObj[i].seq).digest('hex');
    // console.log(`labelHash, seqHash : ${labelHash} ${seqHash}`); // *****consolelog
    seqObjHash.labelHash = labelHash;
    seqObjHash.seqHash = seqHash;
    seqObjHashArray.push(seqObjHash);
  }
  console.log(typeof pepAllDict);
  console.log(typeof jsonObj);
  console.log(typeof seqObjHashArray.length);
  console.log(seqObjHashArray.length);
  for (let i = seqObjHashArray.length - numOfRecords; i < numOfRecords; i++){
    console.log(jsonObj[i])
    console.log(seqObjHashArray[i]);
  }
  // return seqObjHashArray; // no effect whatsoever
  writeFile('outHash12.txt', JSON.stringify(seqObjHashArray), (error) => {
    if (error) console.log(error);
    else console.log('success outHash12.txt')
  })

  
});
  
