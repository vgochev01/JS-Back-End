const database = require('../data/database');
const { loadTemplate } = require('../util/template');
const formidable = require('formidable');

async function addBreed(req, res){
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        const breed = fields.breed;
        
        if(breed == ''){
            return redir('/add/breed');
        }

        database.addBreed(breed);
        redir('/')
    })

    function redir(location){
        res.writeHead(301, {
            'Location': location
        });
        res.end();
    }
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