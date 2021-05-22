const fs = require('fs');

module.exports = (req, res) => {
    const filename = req.url.slice(8);
    const data = fs.createReadStream(`./static/${filename}`);
    data.on('error', () => {
        res.statusCode = 404;
        res.write('Not Found');
        res.end();
    })
    data.pipe(res);
}