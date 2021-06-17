const fs = require('fs');

module.exports = (req, res) => {
    const file = fs.createReadStream(`.${req.url}`);

    let type = '';

    if(req.url.endsWith('css')){
        type = 'text/css';
    } else if(req.url.endsWith('jpg') || req.url.endsWith('jpeg')){
        type = 'image/jpeg';
    } else if(req.url.endsWith('png')){
        type = 'image/png';
    }

    file.on('error', () => {
        res.statusCode = 404;
        res.write('Not Found');
        res.end();
    })

    file.once('data', data => {
        res.writeHead(200, {
            'Content-Type': type
        });
        send(data);
        file.on('data', send);
    });

    file.on('end', () => res.end());


    function send(data){
        res.write(data);
    }
}