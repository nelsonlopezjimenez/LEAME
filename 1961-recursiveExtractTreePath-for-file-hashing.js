// ****** 11.18.2022
// ****** For file hashing
// FOUND IN WEBMOUND DOT COM nodejs-get-files-in-directories-recursively with nodejs
// by Robin on June 10, 2022

// ***** 9.22.2022
// 
// fsPromises.readdir(): recursive reading of a directory with subdirectories
//NOT USING PATH!!!! join
/**
 * ver 11.20.2022 111111bbbbbbb
 * I had issues with the promises. In the debugger the values in the array are promises.
 * I had to console log the values. 
 * the output of recursive tree search is an array of file names
 * then it is passed to recursiveFileGetList dot then into a for (item of object) and each item is passed to a async function for hashing
 * The function returned the hash only, which was saved but the item name was the same for all hashes.
 * I had to pass the item and then return the item itself (label) and the hash.
 * Elephant contains the hash/label-path pair. that goes into venus as myFlat (one pair at a time)
 * venus.then populate local to recursiveFileGetList myFlatVersion string as zebra, and save into a file only on the last item.
 * by consoling out myFlatVersion, it increases after each iteration of the for loop. 
 * So it cannot be saved on each iteration, neither can be passed to a global object since the promise
 * is still unresolved by then. If trying to check lenght of myFlatversion before the promise is resolved, the value is zero
 * or undefined.
 * This version contains all the code and the test. Next version it will be cleared. 
 * 
 */
const { readdir, writeFile, readFile } = require("fs").promises;
const  crypto = require('crypto');
const path = require('path');

let myFlatVersion = "";

let myPath = 'RAW-VIDEOS';
myPath = 'DATA';
myPath = 'C:/Users/gammastudent/Videos/Captures'; // ERR_FS_FILE_TOO_LARGE
myPath = 'C:/Users/Public/Videos/RAW-VIDEOS/colt-steele.1';
myPath = 'C:/Users/Public/Videos/RAW-VIDEOS/colt-steele'; // out-RAW-VIDEOS-colt-steele.flat

const recursiveGetFileList = async (dirName) => {
  let files = [];
  const myPromise = await readdir(dirName, { withFileTypes: true }); // Array Dirent

  for (const item of myPromise) {
    if (item.isDirectory()) {
      files = [...files, ...(await recursiveGetFileList(`${dirName}/${item.name}`))]; //check flatten
    }
    else {
        files.push(`${dirName}/${item.name}`);
    }
  }
  return files; //it is a promise promiseFiles
};

const recursiveReadFile = async (fullPathName, hashMethod) => {
    const readFilePromise = await readFile(fullPathName);
    let fileHash = crypto.createHash(hashMethod).update(readFilePromise).digest('hex');

    return `${fileHash}\t${fullPathName}`;
}
recursiveGetFileList(myPath).then( (files) => {
    let filePromiseArrayLenght = files.length;
    console.log(filePromiseArrayLenght + " ====== " );
    const hashMethod = 'sha1';
    myFlatVersion = "";
    let counter = 0;
    let signal ='#';

    for (item of files){
        let myFlat = "";
        // readFile to hash

        let elephant = recursiveReadFile(item, hashMethod);
    
        let venus = elephant
            .then(tiger => {
            let myInsideObj = {};
            let splStr = tiger.split('\t');
            myInsideObj.key = splStr[0];
            myInsideObj.value = splStr[1];
            myFlat += tiger + '\n';
            // console.log(myFlatVersion) it shows all lines 58 times, number of items in the folder until last one read.
            // return myInsideObj;
            return myFlat; //one item at a time hash/path pair
        })
        // .then(venus => myObjArray.push(venus)) // pushing was inside elephant and that is why so many arrays

        venus
        .then(zebra => {
        myFlatVersion += zebra;
        counter++;
        signal += '#';
        console.log( counter % 10 ? signal  : counter );
        // console.log(myFlat.length + '\t' + counter++ + '\t' + zebra.length + ' **** ' + myFlatVersion.length);
        // console.log(counter++);
        // return myFlat;
        if (counter < files.length ){
            // console.log(myFlatVersion);
                // console.log(myFlatVersion);
                writeFile('out70.flat', myFlatVersion, 'utf8', error => { // files is an array, taken as string
                    if (error) {
                        console.log(error);
                    }
                    console.log('success saving out10')
                });
            }
        })

        // *** this gives the number of items in for (item of something)
        // console.log(myFlatVersion.length + " line136 - 133 - 125 - " + counter++ + ' No of items: ' + files.length);
        
    }
    
});
