const editController = require("./controllers/editController");
const deleteController = require("./controllers/deleteController");
const staticController = require("./controllers/staticController");
const defaultHandler = require('./controllers/defaultController');

let handlers = {};

function match(method, url){
    const urlMethods = handlers[url] || {};

    if(url.startsWith('/content/')){
        return staticController;
    }

    if(url.startsWith('/edit/')){
        if(method == 'GET'){
            return editController.renderPage;
        } else if(method == 'POST'){
            return editController.editCat;
        }
    }

    if(url.startsWith('/find-home/')){
        if(method == 'GET'){
            return deleteController.renderPage;
        } else if(method == 'POST'){
            return deleteController.deleteCat;
        }
    }

    if(urlMethods[method] == undefined){
        return defaultHandler;
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