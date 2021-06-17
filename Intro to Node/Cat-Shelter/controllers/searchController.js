const { getCats } = require("../data/database")
const formidable = require('formidable');
const catTemplate = require('../util/catTemplate');
const { loadTemplate } = require('../util/template');

module.exports = async (req, res) => {
    const cats = await getCats();

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields) => {
        if(err != null){
            // handle error
        }

        const { query } = fields;

        const matching = Object.values(cats).filter(c => c.name.includes(query));
        
        let html = await loadTemplate('index');
        html = html.replace('{{cats}}', matching.map(catTemplate).join(''));

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(html);
        res.end();
    });
}