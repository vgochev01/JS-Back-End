const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const tripsController = require('../controllers/tripsController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trips', tripsController);

    app.all('*', (req, res) => {
        res.status(404);
        res.render('404', { title: 'Page Not Found' });
    });
}