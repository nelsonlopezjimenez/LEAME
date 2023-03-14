// ****** 11.18.2022
// ****** For file hashing
// FOUND IN WEBMOUND DOT COM nodejs-get-files-in-directories-recursively with nodejs
// by Robin on June 10, 2022

// ***** 9.22.2022
// 
// fsPromises.readdir(): recursive reading of a directory with subdirectories
//NOT USING PATH!!!! join

const { readdir, writeFile, readFile } = require("fs").promises;
const  crypto = require('crypto');
const path = require('path');

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
  return files;
};
recursiveGetFileList('RAW-VIDEOS').then( (files) => {
    const hashMethod = 'sha1';
    let myObjArray = [];

    for (i of files){
        let myObj = {};
        let myBaseName = path.basename(i);
        let basenameHash = crypto.createHash(hashMethod).update(myBaseName).digest('hex');
        myObj.key = basenameHash;
        myObj.value = i;

        myObjArray.push(myObj);

    }
    writeFile('out70.txt', JSON.stringify(myObjArray), 'utf8', error => { // files is an array, taken as string
        if (error) {
            console.log(error);
        }
        console.log('success saving out10')
    })
});


// NOT RECURSIVE YET. Prints the name of dirs and files
/*
const { readdir } = require('fs').promises;

const recursiveGetFileList = async (dirname) => {
    const files = await readdir(dirname);

    return files;
};

recursiveGetFileList('RAW-VIDEOS').then( (files) => {
    console.log(files);
})

*/
