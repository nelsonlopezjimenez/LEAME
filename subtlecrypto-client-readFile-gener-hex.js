/ SCRIPT FOR CFC DIRECTORY
// AUTHOR: HOLLAND
// DATE: 2021/07

const containers = document.querySelectorAll(".videoCont");
const smallButton = document.getElementById("buttonSmall");
const medButton = document.getElementById("buttonMedium");
const bigButton = document.getElementById("buttonBig");
const smallStyle = smallButton.style;
const medStyle = medButton.style;
const bigStyle = bigButton.style;
const allVideos = document.querySelectorAll("video");
const myMap = new Map();

function changeSizeSmall() {
    let regexReplacePercent20Array = [];
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.margin = "1.5%";
    containers[i].style.width = "30%";
    containers[i].style.paddingBottom = "0%";
    smallStyle.backgroundColor = "darkgrey";
    medStyle.backgroundColor = "white";
    bigStyle.backgroundColor = "white";
  }
  //console.log(allVideos.length);
  for (i of allVideoCurrentPath) {
    myMap.set(i.key, i.value);
  }

  for (i = 0; i < allVideos.length; i++) {
    let myArray = [];
    let myString = allVideos[i].currentSrc;
    myArray = myString.split("/");

    let regexReplacePercent20 = myArray[myArray.length - 1].replaceAll(
      "%20",
      " "
    );
    regexReplacePercent20Array.push(regexReplacePercent20);
    // console.log(`regexReplacePercent20 == ${regexReplacePercent20}`);
    //generateHash with sha-1 and save into array
    // use hash as key to setAttribute to current  path
    // shaXXX(regexReplacePercent20)

    // //console.log(shaXXX(regexReplacePercent20).then((i) => //console.log(i)));

    // get value  based on key
    let prefix = "/youtube.nel/public_html/";
    let newPathHashKey = shaXXX(regexReplacePercent20).then((error, it) => {
      if (error)
        //console.log(error)
        return error;
    });

    //console.log(`newPathHashKey : ${newPathHashKey}`)
    //console.log(myMap.get(newPathHashKey));
    //console.log("=================")
       // allVideos[i].setAttribute("src", prefix + myMap.get(newPathHashKey));
  }
  console.log(`regexArray.length  == ${regexReplacePercent20Array.length}`);

  let globalArray = [] ;
  const getHashLocalNameKey = async function (regexReplacePercent20Array, myMap)  {
      let myPromiseArray = [];
      let prefix = "/youtube.nel/public_html/";
      try{
          for (let i = 0; i<regexReplacePercent20Array.length; i++){
            //   console.log(regexReplacePercent20Array[i]);
            let myPromise = shaXXX(regexReplacePercent20Array[i]); //this is a promise
            myPromiseArray = (myPromise).then(val => {
                console.log(val);  // correct local hash
                globalArray.push(val);
                console.log(globalArray.length)
                console.log(myMap.get(val));
                if (myMap.get(val)){  // to eliminate the 'Not Found' message after executing this script
                  console.log("found the video path!!!!!!!!")
                  allVideos[i].setAttribute('src', prefix+myMap.get(val))
                }
                else {
                  console.log("make a list of not found video path");
                  console.log(regexReplacePercent20Array[i]);   // i tried myMap.get(val) and val and of 
                                            //course those are the hashes not the labels. 
                }
                return globalArray;   // I believe this is undefined because not resolved neither rejected
            })
          }
        //   console.log(myPromiseArray)// not reached for some reason
          return await myPromiseArray;  //???
      } catch (error)  {
        console.log(error);
      }
   }
  
  
  
  let myLocalHashvaluesArray = getHashLocalNameKey(regexReplacePercent20Array, myMap)

//   let my = myPromiseArray.then( i => {
      
//       return i;
//   })

//   Promise.all(myPromiseArray).then(val => {
//       console.log(val);
//   })
  
}
/** found in reference.codeproject.com/dom/subtlecrypto/*/
 function shaXXX(str) {
  // transform the string into an arraybuffer
  let buffer = new TextEncoder("utf8").encode(str);
  return  crypto.subtle.digest("sha-1", buffer).then(function (hash) {
    return hex(hash);
  });
}
 function hex(buffer) {
  let hexCodes = [];
  let view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    let value = view.getUint32(i);
    let stringValue = value.toString(16);
    let padding = "00000000";
    let paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return  hexCodes.join("");
}
// shaXXX("Colt's Code Camp Day 1-SF_Xl5TOGlY.mp4").then(function(digest) {
//     //console.log(digest);
// });

function changeSizeMedium() {
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.margin = ".1%";
    containers[i].style.width = "49.8%";
    containers[i].style.paddingBottom = "1%";
    smallStyle.backgroundColor = "white";
    medStyle.backgroundColor = "darkgrey";
    bigStyle.backgroundColor = "white";
  }
}

function changeSizeBig() {
  for (let i = 0; i < containers.length; i++) {
    containers[i].style.margin = "1% 3%";
    containers[i].style.paddingBottom = "2%";
    containers[i].style.width = "94%";
    smallStyle.backgroundColor = "white";
    medStyle.backgroundColor = "white";
    bigStyle.backgroundColor = "darkgrey";
  }
}

smallButton.addEventListener("click", changeSizeSmall);
medButton.addEventListener("click", changeSizeMedium);
bigButton.addEventListener("click", changeSizeBig);

// END

// for (i of files){
//     let myObj = {};
//     let myBaseName = path.basename(i);
//     let basenameHash = crypto.createHash(hashMethod).update(myBaseName).digest('hex');
//     myObj.key = basenameHash;
//     myObj.value = i;

//     myObjArray.push(myObj);
//     myMap.set(basenameHash, myBaseName);
//     myPathArray.push(i);

// }
