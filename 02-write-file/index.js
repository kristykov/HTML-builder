const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const filePath = path.join(__dirname, 'name.txt');

let question = function () {
    readline.question('What is your name?', name => {
        fs.appendFile(filePath, name, err => {
            if (err) {
                throw err;
            } else if (name == 'exit') {
                return readline.close();
            }
        });
        question();
    });

};

question();



