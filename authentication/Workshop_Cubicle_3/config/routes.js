const { post: commentPost } = require("../controllers/comments");
const { about } = require("../controllers/about");
const { notFound } = require("../controllers/notFound");
const { init } = require("./storage");

const productController = require('../controllers/productController');
const accessoryController = require('../controllers/accessoryController');

module.exports = (app) => {
  app.use(init());

  app.get('/', (req, res) => res.redirect('/products'));
  
  app.use('/products', productController);
  app.use('/accessory', accessoryController);

  app.get("/about", about);

  app.post("/comments/:cubeId", commentPost);

  app.all("*", notFound);
};
