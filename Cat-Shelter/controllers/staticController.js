const fs = require('fs');

module.exports = (req, res) => {
    const file = fs.createReadStream('./content/styles/site.css');
    
    file.on('error', () => {
        res.statusCode = 404;
        res.write('Not Found!');
        res.end();
    });

    file.once('data', data => {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        send(data);
        file.on('data', send);
    });

    file.on('end', () => res.end());

    function send(data){
        res.write(data);
    }
}
    