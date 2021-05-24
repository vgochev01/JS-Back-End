const staticController = require("./controllers/staticController");

let handlers = {};

function match(method, url){
    const urlMethods = handlers[url] || {};

    if(url.startsWith('/content/')){
        return staticController;
    }

    if(urlMethods[method] == undefined){
        return (req, res) => {
            res.statusCode = 404;
            res.write('Not Found!');
            res.end();
        }
    } else {
        return urlMethods[method];
    }
}

function registerHandler(method, url, handler){
    const urlMethods = handlers[url];

    if(urlMethods == undefined){
        handlers[url] = {};
    }

    handlers[url][method] = handler;
}

module.exports = {
    match,
    registerHandler,
    get: (...params) => registerHandler('GET', ...params),
    post: (...params) => registerHandler('POST', ...params)
}