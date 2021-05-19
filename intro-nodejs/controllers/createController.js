const formidable = require('formidable');
const database = require('../database');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        if(err != null) { /* handle error */ }
        database.push({name: fields.name, serial: fields.serial});
        res.writeHead(301, {
            'Location': '/catalog'
        });
        res.end();
    })
}