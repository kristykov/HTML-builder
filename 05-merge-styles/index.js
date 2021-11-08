const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {

    if (err) {
        console.log(err);
    }
    else {
        files.forEach(file => {
            if (file.isFile() && path.extname(file.name).slice(1) == "css") {
                const readStream = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf8');
                readStream.on('data', (chunk) => {
                    const fileBundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
                    fs.appendFile(fileBundlePath, chunk, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            }
        })
    }
})