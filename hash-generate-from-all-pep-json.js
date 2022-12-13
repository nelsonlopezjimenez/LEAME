/** READ: a json file generated from ensemble all pep fasta
 *  './Homo_sapiens.GRCh38.pep.all.json from Homo_sapiens.GRCh38.pep.all.txt
 *  PROCESS:  create a labelHash and seqHash
 *  SAVE: './Homo_sapiens.GRCh38.pep.all.2hash.json
 */

const { writeFile } = require('fs');
const { readFile } = require('fs').promises;
const crypto = require('crypto');

let dirName = './DATA/'
let fileName = './Homo_sapiens.GRCh38.pep.all.json';
fileName = './out671.txt';
fileName = './tmp.txt';
fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.txt'; // JSON.stringigy(fastaOjbArray) invalid string length
fileName = 'gbpri1.fsa_aa.out.json';
fileName = './Homo_sapiens.GRCh38.pep.all.label-seq.out.json'
fileName = 'gbpri1.fsa_aa.label-seq.out.json'; //'.label-seq.out.json'

const readContentFile = async fileName => {
  try {
    const mypromise = await readFile(fileName, { encoding: 'utf8' });
    // return mypromise.then(i => console.log(i)); // mypromise.then is not a function
    return mypromise;

  } catch (err) {
    // When a request is aborted - err is an AbortError
    console.error(err);
  }
};
/**object: ensemLabel:"", synonymArray: [], seqHash: "" seqArray: "", seqBelongArray */
let pepObj ={};
let pepObjArray = [];
const pepAllDict = {}; /**key/value   ensemLabelHash/seqHash */
/**
 *            item.hash = null; // createHash().update().digest()
            let hashMethod = 'sha256';
            hashMethod = 'sha1';
            hashMethod = 'md5';
            item.hash = crypto.createHash(hashMethod).update(path.basename(i)).digest('hex');
            // console.log(item); // *****
            result.push(item);
 
 */

readContentFile(fileName).then( jsonObjString => { // it is read as a  string
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
    seqHash = crypto.createHash(hashMethod).update(jsonObj[i].seq).digest('hex');
    seqLenght = jsonObj[i].seq.length;
    // console.log(`labelHash, seqHash : ${labelHash} ${seqHash}`); // *****consolelog
    seqObjHash.labelHash = labelHash;
    seqObjHash.seqHash = seqHash;
    seqObjHash.seqLenght = seqLenght;
    seqObjHashArray.push(seqObjHash);

    // seqHashToLabelObj.label = jsonObj[i].label;
    // seqHashToLabelObj.seqHash = seqHash;
    // seqHashToLabelObj.seqLenght = seqLenght;
    // seqHashToLabelArray.push(seqHashToLabelObj);

    buildFlatHashToLabel += `${seqHash}\t${jsonObj[i].label}\t${seqLenght}\n`

    buildFlatHashFile += `${seqHash}\t${labelHash}\t${seqLenght}\n`
  }
  // console.log(typeof pepAllDict);
  // console.log(typeof jsonObj);
  // console.log(typeof seqObjHashArray.length);
  console.log(seqObjHashArray.length + " line77");
  console.log(seqHashToLabelArray.length + ' line78 seqHashToLabelArray.length')
  // for (let i = seqObjHashArray.length - numOfRecords; i < numOfRecords; i++){
  //   console.log(jsonObj[i])
  //   console.log(seqObjHashArray[i]);
  // }
  // return seqObjHashArray; // no effect whatsoever
  for (item of seqHashToLabelArray) {
    if (item.seqHash === "55a5e2d656c64d17ab5dd5a0a7c902875d3810ee"){
      console.log(item.label);
    }
  }

              // Homo_sapiens.GRCh38.pep.all.label-seq.out
              // gbpri1.fsa_aa.label-seq.
    //'.label-seq.out.json'
  // writeFile('gbpri1.fsa_aa.out.sha1.json', JSON.stringify(seqObjHashArray), (error) => {

  writeFile(dirName + fileName + '.hashed.json', JSON.stringify(seqObjHashArray), (error) => {
    if (error) console.log(error);
    else console.log('success sha1 json')
  })
  writeFile(dirName + fileName + '.hash2label.flat', buildFlatHashToLabel, error => {
    if (error) console.log(error + 'line88');
    else console.log('writen sequence hash to label FLAT')
  })
  writeFile(dirName + fileName + '-seqHash-labelHash-seqLength.flat', buildFlatHashFile, error => {
    if (error) console.log(error + ' line102');
    else console.log('flat file written!!');
  })
  
});
  
