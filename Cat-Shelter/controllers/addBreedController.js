const database = require('../data/database');
const { loadTemplate } = require('../util/template');
const formidable = require('formidable');

async function addBreed(req, res){
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        const breed = fields.breed;
        database.addBreed(breed);
        res.writeHead(301, {
            'Location': '/'
        });
        res.end();
    })
}

async function renderPage(req, res){
    let html = await loadTemplate('addBreed');

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
}

module.exports = {
    renderPage,
    addBreed
}