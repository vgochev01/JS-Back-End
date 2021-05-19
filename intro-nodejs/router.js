let handlers = {};

function match(method, url){
    const urlMethods = handlers[url] || {};
    const handler = urlMethods[method];

    if(handler == undefined){
        return defaultHandler;
    } else {
        return handler;
    }
}

function registerHandler(method, url, handler){
    const urlMethods = handlers[url];
    if(urlMethods == undefined){
        handlers[url] = {};
    }
    handlers[url][method] = handler;
}

function defaultHandler(req, res){
    res.statusCode = 404;
    res.write('Not Found');
    res.end();
}

module.exports = { 
    match, 
    get: (...params) => registerHandler('GET', ...params),
    post: (...params) => registerHandler('POST', ...params),
    registerHandler 
};