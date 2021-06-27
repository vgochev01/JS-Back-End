const tripService = require('../services/trips');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, tripService);
    next();
}