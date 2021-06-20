const hotelService = require('../services/hotels');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, hotelService);
    next();
}