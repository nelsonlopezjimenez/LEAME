/** READ: a json file generated from ensemble all pep fasta
 *  './Homo_sapiens.GRCh38.pep.all.json from Homo_sapiens.GRCh38.pep.all.txt
 *  PROCESS:  create a labelHash and seqHash
 *  SAVE: './Homo_sapiens.GRCh38.pep.all.2hash.json
 */

const { writeFile } = require('fs');
const { readFile } = require('fs').promises;
const crypto = require('crypto');

let fullPath = "C:/Users/gammastudent/Documents/2022-FALL/javascript/change-source/"

let dirName = './DATA/'
let fileName = './Homo_sapiens.GRCh38.pep.all.json';
fileName = 'gbpri1.fsa_aa.label-seq.out.json'; //'.label-seq.out.json' 

fullPath += dirName + fileName;

const readContentFile = async fileName => {
  try {
    const mypromise = await readFile(fullPath, { encoding: 'utf8' });
    // return mypromise.then(i => console.log(i)); // mypromise.then is not a function
    return mypromise;

  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
};
/**object: ensemLabel:"", synonymArray: [], seqHash: "" seqArray: "", seqBelongArray */


readContentFile(fullPath).then( jsonObjString => { // it is read as a  string
  let myModifier = "NelsonLopez";
  let buildFlatHashFile = "";
  let buildFlatHashToLabel = "";
  let hashMethod = 'md5';
  hashMethod  = 'sha1';
  let seqObjHashArray = [];
  let seqHashToLabelArray = [];
  let jsonObj = JSON.parse(jsonObjString);
  let numOfRecords = jsonObj.length;
  numOfRecords = 3;

  for (let i = 0; i < jsonObj.length; i++){
    let seqHashToLabelObj = {};
    let seqObjHash = {};
    let labelHash;
    let seqHash;
    let seqLenght;
    let modifiedLabelHash = myModifier + jsonObj[i].label; //not used look below....
    labelHash = crypto.createHash(hashMethod).update(myModifier + jsonObj[i].label).digest('hex');
    seqHash = crypto.createHash(hashMethod).update(myModifier + jsonObj[i].seq).digest('hex');
    seqLenght = jsonObj[i].seq.length;
    // console.log(`labelHash, seqHash : ${labelHash} ${seqHash}`); // *****consolelog
    seqObjHash.labelHash = labelHash;
    seqObjHash.seqHash = seqHash;
    seqObjHash.seqLenght = seqLenght;
    seqObjHashArray.push(seqObjHash);

    buildFlatHashToLabel += `${seqHash}\t${jsonObj[i].label}\t${seqLenght}\n`

    buildFlatHashFile += `${seqHash}\t${labelHash}\t${seqLenght}\n`
  }

  console.log(seqObjHashArray.length + " line90");
  console.log(seqHashToLabelArray.length + ' line91 seqHashToLabelArray.length')
  // for (let i = seqObjHashArray.length - numOfRecords; i < numOfRecords; i++){
  //   console.log(jsonObj[i])
  //   console.log(seqObjHashArray[i]);
  // }
  // return seqObjHashArray; // no effect whatsoever

  writeFile(fullPath + '.hashed.json', JSON.stringify(seqObjHashArray), (error) => {
    if (error) console.log(error);
    else console.log('success sha1 json')
  })
  writeFile(fullPath + '.hash2label.flat', buildFlatHashToLabel, error => {
    if (error) console.log(error + 'line88');
    else console.log('writen sequence hash to label FLAT')
  })
  writeFile(fullPath + '-seqHash-labelHash-seqLength.flat', buildFlatHashFile, error => {
    if (error) console.log(error + ' line102');
    else console.log('flat file writfullPath');
  })


});
/**
 * 12.12.2022
 * ALGORiTHM
 * 1) input a json with label/fasta aa pairs
 * 2) read with fs.promises
 * 3) dot then( process the string);
 * 4) PROCESS: 
 * 5) JSON.parse the string
 * 6) for loop each line
 * 7) Generate hashes of label, fasta_aa, seq length
 * 8) add to array of json, and two flat files: one with seqHash and full label
 * 9) second flat file with seqHash, labelHash, and length. 
 * 10) add other properties at a later time
 * 11) write to files and quit.
 * 
 */