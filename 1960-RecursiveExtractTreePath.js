// FOUND IN WEBMOUND DOT COM nodejs-get-files-in-directories-recursively with nodejs
// by Robin on June 10, 2022

// ***** 9.22.2022
// 
// fsPromises.readdir(): recursive reading of a directory with subdirectories
//NOT USING PATH!!!! join

const { readdir, writeFile, readFile } = require("fs").promises;
const  crypto = require('crypto');
const path = require('path');
const hashMethod = 'md5';

const recursiveGetFileList = async (dirName) => {
  let files = [];
  const myPromise = await readdir(dirName, { withFileTypes: true });

  for (const item of myPromise) {
    if (item.isDirectory()) {
      files = [...files, ...(await recursiveGetFileList(`${dirName}/${item.name}`))];
    }
    else {
        files.push(`${dirName}/${item.name}`);
    }
  }
  return files;
};
recursiveGetFileList('RAW-VIDEOS').then( (files) => {
    const myMap = new Map();
    const hashMethod = 'sha1';
    let myObjArray = [];
    let myPathArray = []

    for (i of files){
        let myObj = {};
        let myBaseName = path.basename(i);
        let basenameHash = crypto.createHash(hashMethod).update(myBaseName).digest('hex');
        myObj.key = basenameHash;
        myObj.value = i;

        myObjArray.push(myObj);
        myMap.set(basenameHash, myBaseName);
        myPathArray.push(i);

    }
    console.log(myMap.get("94c96ca4178ebf7cd7b46c10f4c0f106"))
    writeFile('out70.txt', JSON.stringify(myObjArray), 'utf8', error => { // files is an array, taken as string
        if (error) {console.log(error);}
        console.log('success saving out10')
    })
    writeFile('out80.txt', JSON.stringify(myPathArray), 'utf8', error => {
        if (error){
            console.log(error);
        } else {
            console.log(`myPathArray.length: ${myPathArray.length}`);
        }
    })
});

// If interested only in files, get rid of subdirectory names
/*
const { statSync } = require('fs');
const { readdir } = require('fs').promises;

const recursiveGetFileList = async (dirName) => {
    let files = [];
    const myPromise = await readdir(dirName);

    for (const item of myPromise) {
        if ( !statSync(`${dirName}/${item}`).isDirectory()) {
            files.push(item);
        }
    }
    return files;
}

recursiveGetFileList('RAW-VIDEOS').then ( (files) => {
    console.log(files);
});

*/
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
// USING CALLBACK FUNCTION
// const fs = require ('fs');
// const path = require('path');

// const currentDir = path.join(__dirname, 'RAW-VIDEOS/2022vscode');

// let fileNameArray = fs.readdir(currentDir, function(err, result){
//     if (err) return console.log('unable to scan directory ' + err);
//     result.forEach(function (file){
//         return (file);
//     });
// });

// console.log(fileNameArray);

// console.log("This is fs module")
