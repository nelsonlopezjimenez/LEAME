//  readFileExample using the readFile abort example modified

const { writeFile } = require('fs');

const { readFile } = require('fs').promises;

let dirName = './DATA/'
let fileName = 'out20.txt';
fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.2.txt'; // head -300 Homo_sapiens.GRCh38.pep.all.txt >
fileName = './fasta-like-sequence.txt'; // to test why after converting to array from string.spli('\n') then to 
                              // object the "seq" property has an "undefined" at the beginning

fileName = 'Homo_sapiens.GRCh38.pep.all.2.txt';
fileName = 'HHomo_sapiens.GRCh38.pep.all.2.txt'; //labels made shorter without adding carriage returns
fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.2.txt'; // head -300 Homo_sapiens.GRCh38.pep.all.txt >
fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.txt'; // pep.all
fileName = './gbpri1.fsa_aa';
fileName = 'Homo_sapiens.GRCh38.pep.all.txt'; // pep.all


// fileName = '../../homo-sapiens-gr38/Homo_sapiens.GRCh38.pep.all.txt'; // JSON.stringigy(fastaOjbArray) invalid string length

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
readContentFile(fileName).then(item => {  // type of item : string
  let line = 0;
  let buildString = "This is ";
  let counterGreaterThan = 0;
  let counterNewLine = 0;
  let fastaObjArray = [];

  let arraySplitNewLines = item.split('\n');

  let previousRecord = "";
  let currentRecord = "";
  let myObj = {};
  let prevObj = {};
  let message = "this is else for new lines presence";
  let lastGreaterThan;
  let lastGreaterThanLine;
  
  for (let i = 0; i < arraySplitNewLines.length - 1; i++) {
    // console.log(`*** ${arraySplitNewLines[i]}`);
  
    if (arraySplitNewLines[i].charAt(0) === '>') {
      lastGreaterThanLine = i + 1;
      counterGreaterThan++;
      // prevObj = Object.assign({}, myObj); // as in linked list, copy to prev and reinitialize for current
      /**the head 300 file with 123 ">" gives 299 by using this method. Try map */
      // prevObj = myObj.map(i => i); // testing map function
      prevObj = {...myObj};

      myObj = {};
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
  
  
  // console.log("fastaObjArray second to last object: ");
  // console.log(fastaObjArray[fastaObjArray.length-2]);
  // console.log("fastaObjArray last object:");
  // console.log(fastaObjArray[fastaObjArray.length-1]); // ***** consolelog
  // console.log("==========================");
  // console.log(`lastGreaterThan && arraySplitNewLines.length: ${lastGreaterThanLine} && ${arraySplitNewLines.length}`)

  for (let i=arraySplitNewLines.length-6; i<arraySplitNewLines.length; i++){  // last six lines from array
    console.log(`arraySplitNewLines ${arraySplitNewLines[i]}`)
  }

  console.log(`messages, counterGreate: ${counterGreaterThan} and counterNewLines ${counterNewLine} 
               total lines: ${arraySplitNewLines.length} lastGreaterLine: ${lastGreaterThanLine}
               fastaObjArray.length: ${fastaObjArray.length}`)

              //  Homo_sapiens.GRCh38.pep.all
  // writeFile('gbpri1.fsa_aa.label-seq.out.json', JSON.stringify(fastaObjArray), (error) => {
  writeFile(dirName + fileName + '.label-seq.out.json', JSON.stringify(fastaObjArray), (error) => {
    if (error) console.log(error);
    else console.log('success')
  })

  writeFile(dirName + fileName + '.out.label-seq.flat', (item), (error) => {
    if (error) console.log(error);
    else console.log('success')
  })
});

// Problem 9.18.2022 Object { label: "...", seq: "undefinedMGPGLLHWMALCLLGTGHGDAMVIQNPRYQVTQFGKPVTLSCSQTLNHN...."}

//   writeFile('out420.txt', (arraySplitNewLines), (error) =>{  // it is an array, not a TypedArray or Buffer or DataView
//     if (error) console.log(error);
//     else console.log('success')
//   })
// })

/*
 *1) 9.18.2022
 OUTPUT LOOKS CORRECT BUT ONE > IS MISSING!!!

 gammastudent@DESKTOP-7B54NT4 MINGW64 ~/Documents/2022-FALL/javascript/change-source (master)
$ node readFileExample.js
{
  label: '>ENSP00000399781.1 pep chromosome:GRCh38:1:26442836:26471294:1 gene:ENSG00000117682.18 transcript:ENST00000431933.5 gene_biotype:protein_coding transcript_biotype:protein_coding gene_symbol:DHDDS description:dehydrodolichyl diphosphate synthase subunit [Source:HGNC Symbol;Acc:HGNC:20603]',
  seq: 'undefinedLARQKFSRLMEEKEKLQKHGVCIRVLGDLHLLPLDLQELIAQAVQATKNYNNDISESLLDKCLYTNRSPHPDILIRTSGEVRLSDFLLWQQKARDMYAEERKRQQLERDQATVTEQLLREGLQASGDAQLRRTRLHKLSARREERVQGFLQALELKRADWLARLGTASA'
}
fastaObjArray.label at zero >ENSP00000488240.1 pep chromosome:GRCh38:CHR_HSCHR7_2_CTG6:142847306:142847317:1 gene:ENSG00000282253.1 transcript:ENST00000631435.1 gene_biotype:TR_D_gene transcript_biotype:TR_D_gene gene_symbol:TRBD1 description:T cell receptor beta diversity 1 [Source:HGNC Symbol;Acc:HGNC:12158]
arraySplitNewLines GLQASGDAQLRRTRLHKLSARREERVQGFLQALELKRADWLARLGTASA
arraySplitNewLines >ENSP00000393961.1 pep chromosome:GRCh38:1:26446364:26467527:1 gene:ENSG00000117682.18 transcript:ENST00000416052.1 gene_biotype:protein_coding transcript_biotype:protein_coding gene_symbol:DHDDS description:dehydrodolichyl diphosphate synthase subunit [Source:HGNC Symbol;Acc:HGNC:20603]
arraySplitNewLines XHLLPLDLQELIAQAVQATKNYNKCFLNVCFAYTSRHEISNAVREMAWGVEQGLLDPSDI
arraySplitNewLines SESLLDKCLYTNRSPHPDILIRTSGEVRLSDFLLWQTSHSCLVFQPVLWPEYTFWNLFEA
arraySplitNewLines ILQFQMNHSVLQHPGSLLTKAWKKPFQQDGELYGNCSSPKSS
arraySplitNewLines
messages, counterGreate: 120712 and counterNewLines 0
               total lines: 969270 lastGreaterLine: 969266
               fastaObjArray.length: 120712
success
success


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
 * 
 * THE  CUURENT PROBLEM 
 * {
  label: '>ENSP00000488551.1 pep chromosome:GRCh38:CHR_HSCHR7_2_CTG6:142634764:142635309:1 gene:ENSG00000282497.1 
  transcript:ENST00000631835.1 gene_biotype:TR_V_gene transcript_biotype:TR_V_gene gene_symbol:TRBV15 
  description:T cell receptor beta variable 15 [Source:HGNC Symbol;Acc:HGNC:12190]',  
  seq: 'undefinedMGPGLLHWMALCLLGTGHGDAMVIQNPRYQVTQFGKPVTLSCSQTLNHNVMYWYQQKSSQAPKLLFHYYDKDFNNEADTPDNFQSRRPNTSFCFLDIR
  SPGLGDAAMYLCATSR'
}
   ********
   ********
>ENSP00000488551.1 pep chromosome:GRCh38:CHR_HSCHR7_2_CTG6:142634764:142635309:1 gene:ENSG00000282497.1 transcript:ENST00000631835.1 gene_biotype:TR_V_gene transcript_biotype:TR_V_gene gene_symbol:TRBV15 description:T cell receptor beta variable 15 [Source:HGNC Symbol;Acc:HGNC:12190]
MGPGLLHWMALCLLGTGHGDAMVIQNPRYQVTQFGKPVTLSCSQTLNHNVMYWYQQKSSQ
APKLLFHYYDKDFNNEADTPDNFQSRRPNTSFCFLDIRSPGLGDAAMYLCATSR


 * 
 * readContentFile based on readFile with signal abort from VS Code
 * It reads whole file into memory as a promise
 * The promise is fulfilled and then the object is a string. Apply all string methods
 * in for (i of fileContent) if i === '\n' true, show line number if i === '>' show it as implicit index in
 * the string.
 * NOW: build the line while reading the file: no way to keep in memory before or after current index i
 * for loop executes current character only
  [...,{"label":">ENSP00000488551.1 pep chromosome:GRCh38:CHR_HSCHR7_2_CTG6:142634764:142635309:1 gene:ENSG00000282497.1 transcript:ENST00000631835.1 gene_biotype:TR_V_gene transcript_biotype:TR_V_gene gene_symbol:TRBV15 description:T cell receptor beta variable 15 [Source:HGNC Symbol;Acc:HGNC:12190]"},{"seq":"undefinedMGPGLLHWMALCLLGTGHGDAMVIQNPRYQVTQFGKPVTLSCSQTLNHNVMYWYQQKSSQ"},{"seq":"undefinedAPKLLFHYYDKDFNNEADTPDNFQSRRPNTSFCFLDIRSPGLGDAAMYLCATSR"},{"label":">ENSP00000451578.1 pep chromosome:GRCh38:14:22422371:22423042:1 gene:ENSG00000211821.2 transcript:ENST00000390469.2 gene_biotype:TR_V_gene transcript_biotype:TR_V_gene gene_symbol:TRDV2 description:T cell receptor delta variable 2 [Source:HGNC Symbol;Acc:HGNC:12263]"},{"seq":"undefinedMQRISSLIHLSLFWAGVMSAIELVPEHQTVPVSIGVPATLRCSMKGEAIGNYYINWYRKT"}]

*/