const { getCats } = require("../data/database");
const editTemplate = require("../util/editTemplate");
const { loadTemplate } = require("../util/template");
const formidable = require('formidable');
const database = require("../data/database");
const fs = require('fs/promises');

async function editCat(req, res) {
    const id = req.url.slice(6);
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if(err != null) { 
            // handle error
        }

        const { name, description, breed } = fields;

        const oldPath = files['upload'].path;
        const filename = files['upload'].name;
        const newPath = './content/images/cats/' + filename;
        await fs.rename(oldPath, newPath);

        const catObj = { name, description, breed, img: newPath, id };

        database.editCat(id, catObj);

        res.writeHead(301, {
            'Location': '/'
        });
        res.end();
    });
}

async function renderPage(req, res){
    const id = req.url.slice(6);
    const cats = await getCats();

    let html = await loadTemplate('editCat');
    
    html = html.replace('{{editForm}}', await editTemplate(cats[id]));

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
}

module.exports = {
    editCat,
    renderPage
}