const commonController = require('../controllers/commonController');
const authController = require('../controllers/authController');
const hotelController = require('../controllers/hotelController');
const bookingController = require('../controllers/bookingController');

module.exports = (app) => {
    app.use('/', commonController);
    app.use('/auth', authController);
    app.use('/hotels', hotelController);
    app.use('/book', bookingController);
}