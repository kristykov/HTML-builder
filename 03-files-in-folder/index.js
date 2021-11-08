const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            if (file.isFile()) {

                let filePath = path.join(folderPath, `${file.name}`);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${stats.size / 1000}kb`);
                    }
                })
            }
        })
    }
});




