const parseForm = require('../util/formParser');
const database = require('../database');

module.exports = async (req, res) => {
    const fields = await parseForm(req);
    database.addItem(fields);
    res.writeHead(301, {
        'Location': '/catalog'
    });
    res.end();
}