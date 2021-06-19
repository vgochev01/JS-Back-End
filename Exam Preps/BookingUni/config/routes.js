const commonController = require('../controllers/commonController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.use('/', commonController);
    app.use('/auth', authController);
}