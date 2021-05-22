const fs = require('fs');

async function parseForm(req){
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('end', () => {
            let result;
            try {
                result = body.split('&').map(e => e.split('=')).reduce((acc, cur) => Object.assign(acc, {[cur[0]]: cur[1]}), {});
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    })
}

module.exports = parseForm;