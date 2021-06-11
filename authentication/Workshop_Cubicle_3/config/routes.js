const { init } = require("./storage");

const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');
const commonController = require('../controllers/commonController');

module.exports = (app) => {

  app.use(init());
  
  app.use('/products', productController);
  app.use('/accessory', accessoryController);
  app.use('/', commonController);

};
