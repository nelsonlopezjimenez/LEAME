#!/usr/bin/env node

//https://www.digitalocean.com/community/tutorials/how-to-work-with-files-using-streams-in-node-js
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const Transform = stream.Transform || require('readable-stream').Transform;
const crypto = require('crypto');


function reverse(filePath) {
    const readStream = fs.createReadStream(filePath);
    const reversedDataFilePath = filePath.split('.')[0] + '-reversed.' + filePath.split('.')[1];
    const writeStream = fs.createWriteStream(reversedDataFilePath);

    const reverseStream1 = new Transform({
        transform(data, encoding, callback) {
            const reversedData = data.toString().split("").reverse().join("");
            this.push(reversedData);
            callback();
        }
    });
    let buildHash;
    const reverseStream = new Transform({
        transform(data, encoding, callback) {
            let build;
            const hashLabel = crypto.createHash('sha1').update(data.toString()).digest('hex');
            console.log(hashLabel);
            buildHash =+ hashLabel;
            // processedData.then(i => this.push(i));
            this.push(buildHash);
            callback();
        }
    })

    readStream.pipe(reverseStream).pipe(writeStream).on('finish', () => {
        console.log(`Finished reversing the contents of ${filePath} and saving the output to ${reversedDataFilePath}.`);
    });
};
function copy(filePath) {
    const inputStream = fs.createReadStream(filePath)
    const fileCopyPath = filePath.split('.')[0] + '-copy.' + filePath.split('.')[1]
    const outputStream = fs.createWriteStream(fileCopyPath)

    inputStream.pipe(outputStream)

    outputStream.on('finish', () => {
        console.log(`You have successfully created a ${filePath} copy. The new file name is ${fileCopyPath}.`);
    })
}
function read(filePath) {
    const readableStream = fs.createReadStream(filePath);

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    readableStream.on('data', (chunk) => {
        let counter = 0;
        let my = Buffer.from(chunk); // it is a global object, no need to require

        console.log(my.length)
        console.log('<Buffer A   B  .     .  A   newline>')
        console.log(chunk);
    })
}

function write(filePath) {
    const writableStream = fs.createWriteStream(filePath);

    writableStream.on('error', (error) => {
        console.log(`An error occured while writing to the file. Error: ${error.message}`);
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter a sentence: '
    });

    rl.prompt();

    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'exit':
                rl.close();
                break;
            default:
                sentence = line + '\n'
                writableStream.write(sentence);
                rl.prompt();
                break;
        }
    }).on('close', () => {
        writableStream.end();
        writableStream.on('finish', () => {
            console.log(`All your sentences have been written to ${filePath}`);
        })
        setTimeout(() => {
            process.exit(0);
        }, 100);
    });
}
function copyStream(filePath) {
    // Node.js program to demonstrate the
    // fs.createWriteStream() method

    let writer = fs.createWriteStream(filePath + '-copy.txt', {
        flags: 'a'
    });

    // Use fs.createReadStream() method
    // to read the file
    let reader = fs.createReadStream(filePath)
        .pipe(writer);

}
function copyStream1(filePath) {
    const readableStream = fs.createReadStream(filePath);
    const writableStream = fs.createWriteStream(filePath + '-copy.txt');

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })
    readableStream.on('data', (chunk) => {
        console.log(chunk);
        writableStream.write(chunk);
    });

    writableStream.end();
}
const args = process.argv;
const commands = ['read', 'write', 'copy', 'reverse', 'copy-stream'];


const getHelpText = function () {
    const helpText = `
    simplecli is a simple cli program to demonstrate how to handle files using streams.
    usage:
        mycliprogram <command> <path_to_file>

        <command> can be:
        read: Print a file's contents to the terminal
        write: Write a message from the terminal to a file
        copy: Create a copy of a file in the current directory
        reverse: Reverse the content of a file and save its output to another file.
        copy-stream: Create a copy of the file.

        <path_to_file> is the path to the file you want to work with.
    `;
    console.log(helpText);
}

let command = '';

if (args.length < 3) {
    getHelpText();
    return;
}
else if (args.length > 4) {
    console.log('More arguments provided than expected');
    getHelpText();
    return;
}
else {
    command = args[2]
    if (!args[3]) {
        console.log('This tool requires at least one path to a file');
        getHelpText();
        return;
    }
}

switch (commands.indexOf(command)) {
    case 0:
        // console.log('command is read');
        read(args[3]);
        break;
    case 1:
        write(args[3]);
        break;
    case 2:
        copy(args[3]);
        break;
    case 3:
        reverse(args[3]);
        break;
    case 4:
        copyStream(args[3]);
        break;
    default:
        console.log('You entered a wrong command. See help text below for supported functions');
        getHelpText();
        return;
}

/**
 * Conclusion
Streams are used in native Node.js modules and in various yarn and npm packages that perform input/output operations because they provide an efficient way to handle data. In this article, you used various stream-based functions to work with files in Node.js. You built a command-line program with read, write, copy, and reverse commands. Then you implemented each of these commands in functions named accordingly. To implement the functions, you used functions like createReadStream, createWriteStream, pipe from the fs module, the createInterface function from the readline module, and finally the abstract Transform() class. Finally, you pieced these functions together in a small command-line program.

As a next step, you could extend the command-line program you created to include other file system functionality you might want to use locally. A good example could be writing a personal tool to convert data from .tsv stream source to .csv or attempting to replicate the wget command you used in this article to download files from GitHub.

The command-line program you have written handles command-line arguments itself and uses a simple prompt to get user input. You can learn more about building more robust and maintainable command-line applications by following How To Handle Command-line Arguments in Node.js Scripts and How To Create Interactive Command-line Prompts with Inquirer.js.

Additionally, Node.js provides extensive documentation on the various Node.js stream module classes, methods, and events you might need for your use case.
 */
