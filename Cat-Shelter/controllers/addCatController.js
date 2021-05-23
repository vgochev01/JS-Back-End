const database = require('../data/database');
const formParser = require('../util/formParser');
const { loadTemplate } = require('../util/template');

async function addCat(req, res){
    //TODO
}

async function renderPage(req, res){
    let html = await loadTemplate('addCat');

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