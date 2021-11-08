//Немного не разобралась с синхронизацией в этом задании: файл index.html в создоваемой папке project-dist обновляется только со второго запуска сборки

const fs = require('fs');
const path = require('path');

const compPath = path.join(__dirname, 'components');
const projectPath = path.join(__dirname, 'project-dist');
const tempPath = path.join(__dirname, 'template.html');
const indexPath = path.join(projectPath, 'index.html');
const stylePath = path.join(projectPath, 'style.css');


//create 'project-dist' folder
fs.mkdir(projectPath, { recursive: true }, err => {
    if (err) {
        console.log(err);
    }
});


//replace tags in template.html
fs.readdir(compPath, { withFileTypes: true }, (err, files) => {
    let articles, footer, header;
    if (err) {
        console.log(err);
    }
    else {
        fs.readFile(tempPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            }
            files.forEach(file => {
                const readStream = fs.createReadStream(path.join(compPath, `${file.name}`), 'utf8');
                readStream.on('data', (chunk) => {
                    if (file.name == 'articles.html') {
                        articles = chunk;
                        data = data.toString().replace('{{articles}}', articles);
                        fs.writeFile(tempPath, data, err => {
                            if (err) {
                                console.log(err)
                            }
                        })
                        console.log(data);
                    } else if (file.name == 'footer.html') {
                        footer = chunk;
                        data = data.toString().replace('{{footer}}', footer);
                        fs.writeFile(tempPath, data, err => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    } else if (file.name == 'header.html') {
                        header = chunk;
                        data = data.toString().replace('{{header}}', header);
                        fs.writeFile(tempPath, data, err => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    }
                })
            })

        })
    }
})

const tempOld = fs.createReadStream(tempPath, 'utf8');
const tempNew = fs.createWriteStream(indexPath, 'utf8');
tempOld.pipe(tempNew);



//make style
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        files.forEach(file => {
            if (file.isFile() && path.extname(file.name).slice(1) == "css") {
                const readStream = fs.createReadStream(path.join(__dirname, 'styles', `${file.name}`), 'utf8');
                readStream.on('data', (chunk) => {
                    fs.appendFile(stylePath, chunk, err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                })
            }
        })
    }
})

//copy assets

fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
        fs.stat(path.join(__dirname, 'assets', `${file.name}`), (er, e) => {
            if (!e.isFile()) {
                fs.mkdir(path.join(projectPath, 'assets', `${file.name}`), { recursive: true }, () => {
                    fs.readdir(path.join(__dirname, 'assets', `${file.name}`), { withFileTypes: true }, (e, a) => {
                        a.forEach(i => {
                            fs.copyFile(path.join(__dirname, 'assets', `${file.name}`, `${i.name}`), path.join(projectPath, 'assets', `${file.name}`, `${i.name}`), (er) => { });
                        });
                    });
                });
            }
        });
    });
});





