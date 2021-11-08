
const fs = require('fs');
const path = require('path');

function copyDir() {
    fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
        if (err) {
            console.log(err);
        }
    })
    fs.readdir(path.join(__dirname, 'files'), (err, files) => {
        if (err) {
            console.log(err);
        }
        files.forEach(file => {

            let destination = path.join(__dirname, 'files-copy', `${file}`);
            let src = path.join(__dirname, 'files', `${file}`);
            fs.copyFile(src, destination, err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    })

}
copyDir();

