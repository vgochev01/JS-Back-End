const database = require("../data/database");
const { loadTemplate } = require("../util/template");
const catTemplate = require('../util/catTemplate');
const { addCat } = require("../data/database");

module.exports = async (req, res) => {
    let html = await loadTemplate('index');
    const cats = await database.getCats();

    html = html.replace('{{cats}}', Object.values(cats).map(catTemplate).join(''));

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(html);
    res.end();
}