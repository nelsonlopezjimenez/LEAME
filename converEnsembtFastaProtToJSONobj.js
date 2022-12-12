//  readFileExample using the readFile abort example modified 12.12.2022

const { writeFile } = require('fs');

const { readFile } = require('fs').promises;

let fullPath = "C:/Users/gammastudent/Documents/2022-FALL/javascript/change-source/"

let dirName = 'DATA/'
let fileName = 'out20.txt';
fileName = './gbpri1.fsa_aa';

fullPath += dirName + fileName;

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
// readContentFile(fileName).then( i => console.log(i));
// readContentFile(fileName);
readContentFile(fullPath).then(item => {  // type of item : string
  let line = 0;
  let counterGreaterThan = 0;
  let counterNewLine = 0;
  let fastaObjArray = [];

  let arraySplitNewLines = item.split('\n');

  let myObj = {};
  let prevObj = {};

  let lastGreaterThanLine;
  
  for (let i = 0; i < arraySplitNewLines.length - 1; i++) {
    // console.log(`*** ${arraySplitNewLines[i]}`);
  
    if (arraySplitNewLines[i].charAt(0) === '>') {
      lastGreaterThanLine = i + 1;
      counterGreaterThan++;
      // prevObj = Object.assign({}, myObj); // as in linked list, copy to prev and reinitialize for current
      // prevObj = myObj.map(i => i); // testing map function
      prevObj = {...myObj};

      myObj = {label: undefined, seq : ""}; // to fix the seq = undefinedMMEDE....

      myObj.label = arraySplitNewLines[i];
      /**This if is to solve the first item problem  it push only if prevObj is not undefined*/
      if (prevObj.label !== undefined ){
        fastaObjArray.push(prevObj);
      }
    } else {
      myObj.seq += arraySplitNewLines[i];
      /**this if is to solve lastitem problem IT DID NOT SOLVE it added ">" chars from 123 to 299 */
      // if (i > lastGreaterThanLine -1){  // PENDING TO FIX: replace 2 with a variable 
      //                   // containing the line number with the last '>'
      //   fastaObjArray.push(myObj);
      // }
      if (i === arraySplitNewLines.length-2){  // ***** because the last line is empty line.
        console.log("************* last line looping"); // *****consolelog
        console.log(myObj); // *****consolelog
        fastaObjArray.push(myObj);
      }
    }
  }  //end for loop

  for (let i=arraySplitNewLines.length-6; i<arraySplitNewLines.length; i++){  // last six lines from array
    console.log(`arraySplitNewLines ${arraySplitNewLines[i]}`)
  }

  console.log(`messages, counterGreate: ${counterGreaterThan} and counterNewLines ${counterNewLine} 
               total lines: ${arraySplitNewLines.length} lastGreaterLine: ${lastGreaterThanLine}
               fastaObjArray.length: ${fastaObjArray.length}`)

  writeFile(fullPath + '.label-seq.out.json', JSON.stringify(fastaObjArray), (error) => {
    if (error) console.log(error);
    else console.log('success')
  })

  writeFile(fullPath + '.out.label-seq.flat', (item), (error) => {
    if (error) console.log(error);
    else console.log('success')
  })
});



/*
* 12.12.2022
* 1) ALGORiTHM:
    a) Read content of file using promises
    b) promise.then(process the content);
    c) process the content: it is a string
    d) string to array using split(newLine char);
    e) declare currentObj and prevObj (a la linked list);
    f) for loop
    g) if first char is '>' copy to prev what is current
    h) reinitialize current: label and seq to undefined and "" (not undefined)
    i) assing to current.label the current line
    j) push prevObj to the array of object
    k) if first char is not '>' ie reading the sequence
    l) add the current line to current.seq
    m) continue if not the end of the array of separatedbynewlines
    n) if it is last current then output 'last line looping'
    o) finish looping
    q) write a file with the json array and as flat file which is the same as original (no need in the future);
    
 *1) 9.18.2022
 OUTPUT LOOKS CORRECT BUT ONE > IS MISSING!!!

 gammastudent@DESKTOP-7B54NT4 MINGW64 ~/Documents/2022-FALL/javascript/change-source (master)
$ node readFileExample.js
{

 *2) item is a string of the whole content with newLine chars at the right positions
 *2a) I tried to process as string: read char-by-char and establish the boundaries using > and \n
 *2b) I use for(let i of item) with if ( i === '\n') to show the number of lines and if (i === '>')
 *2c) But not clear result even when I added flags and tried prev, current and next as linked list
 *2d) I tried regular for loop to no avail
 *2e) I tried regular for loop after item.split('\n') creating an array with newLine as divider
 *2f) Then processing each element in following manner:
 *2f1) When current i begins with ">", this is the end of previous object, needs to push previous (label and seq)
 *2f2) Then to create current first label if begins with ">", else if not begin with ">" save as seq 
 *3a) if first char of array[i] is '>' then clone current obj to prevObj, reinitialize current to ""
 * 3b) append array[i] to current.label else append array[i] to current.seq, then
 * 3c) push prevObj to arrayof objects
 * 
 * 
*/