const database = require('../data/database');
const formParser = require('../util/formParser');
const { loadTemplate } = require('../util/template');

async function addBreed(req, res){
    const data = await formParser(req);
    const breed = data.breed;
    database.addBreed(breed);
    res.writeHead(301, {
        'Location': '/'
    });
    res.end();
    console.log(database.database.breeds);
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