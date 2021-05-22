const fs = require('fs/promises');
const formidable = require('formidable');

module.exports = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        const file = files['filetoupload'];
        const oldPath = file.path;
        const name = file.name;
        const newPath = './uploads/' + name;
        await fs.rename(oldPath, newPath);

        res.writeHead(301, {
            'Location': '/catalog'
        });
        res.end();
    })
}