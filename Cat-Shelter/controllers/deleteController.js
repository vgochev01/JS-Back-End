const { getCats } = require("../data/database");
const editTemplate = require("../util/editTemplate");
const { loadTemplate } = require("../util/template");
const formidable = require('formidable');
const database = require("../data/database");
const fs = require('fs/promises');

async function deleteCat(req, res) {
    const id = req.url.slice();
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
    deleteCat,
    renderPage
}