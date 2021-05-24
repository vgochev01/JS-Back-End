const fs = require('fs/promises');
const database = require('../data/database');
const breedSelectTemplate = require('../util/breedSelectTemplate');
const formidable = require('formidable');
const { loadTemplate } = require('../util/template');

async function addCat(req, res){
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if(err != null) {
            // handle error
        }

        const { name, description, breed } = fields;
        console.log(files);
        const oldPath = files['upload'].path;
        const filename = files['upload'].name;
        const newPath = './content/images/cats/' + filename;
        await fs.rename(oldPath, newPath);

        const catObj = { name, description, breed, img: newPath };

        database.addCat(catObj);

        res.writeHead(301, {
            'Location': '/'
        });
        res.end();
    });
}

async function renderPage(req, res){
    let html = await loadTemplate('addCat');

    const data = await database.getBreeds();
    const breeds = JSON.parse(data);

    html = html.replace('{{breeds}}', breedSelectTemplate(breeds));

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
}

module.exports = {
    renderPage,
    addCat
}