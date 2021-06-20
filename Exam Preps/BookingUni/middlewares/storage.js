const hotelService = require('../services/hotels');
const bookingService = require('../services/booking');

module.exports = () => (req, res, next) => {
    req.storage = Object.assign({}, hotelService, bookingService);
    next();
}