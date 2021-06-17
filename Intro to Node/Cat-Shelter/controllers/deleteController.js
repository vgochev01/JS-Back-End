const { getCats } = require("../data/database");
const editTemplate = require("../util/editTemplate");
const { loadTemplate } = require("../util/template");
const formidable = require('formidable');
const database = require("../data/database");
const fs = require('fs/promises');
const deleteTemplate = require("../util/deleteTemplate");
const defaultController = require("./defaultController");

async function deleteCat(req, res) {
    const id = req.url.slice(11);
    database.deleteCat(id);

    res.writeHead(301, {
        'Location': '/'
    });
    res.end();
}

async function renderPage(req, res){
    const id = req.url.slice(11);
    const cats = await getCats();

    if(cats[id] == undefined){
        defaultController(req, res);
        return;
    }

    let html = await loadTemplate('catShelter');
    html = html.replace('{{template}}', deleteTemplate(cats[id]));

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