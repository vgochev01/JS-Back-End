
const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const commonController = require('../controllers/commonController');

module.exports = (app) => {
  
  app.use('/products', productController);
  app.use('/accessory', accessoryController);
  app.use('/auth', authController);
  app.use('/', commonController);

};
