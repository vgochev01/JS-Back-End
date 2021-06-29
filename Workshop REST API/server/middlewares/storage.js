const furnitureService = require('../services/furniture');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, furnitureService);
    next();
}