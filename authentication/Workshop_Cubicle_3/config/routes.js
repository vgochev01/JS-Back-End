const { post: commentPost } = require("../controllers/comments");
const { about } = require("../controllers/about");
const { notFound } = require("../controllers/notFound");
const { init } = require("./storage");
const { createAccessory, accessoryPost } = require("../controllers/accessories");

const productController = require('../controllers/productController');

module.exports = (app) => {
  app.use(init());

  app.get('/', (req, res) => res.redirect('/products'));
  
  app.use('/products', productController);

  app.get("/about", about);

  app.post("/comments/:cubeId", commentPost);

  app.get('/accessory/create', createAccessory);
  app.post('/accessory/create', accessoryPost);

  // app.get('/details/:cubeId/attach', attach);
  // app.post('/details/:cubeId/attach', attachPost);

  app.all("*", notFound);
};
