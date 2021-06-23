const playService = require('../services/plays');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, playService);
    console.log(req.storage);
    next();
}