const { catalog } = require("../controllers/catalog");
const { create, post: createPost } = require("../controllers/create");
const { edit, post: editPost } = require("../controllers/edit");
const { about } = require("../controllers/about");
const { details } = require("../controllers/details");
const { notFound } = require("../controllers/notFound");
const { init } = require("../models/database");

module.exports = async (app) => {
  app.use(await init());

  app.get("/", catalog);
  app.get("/details/:id", details);
  app.get("/about", about);
  app.get("/create", create);
  app.post("/create", createPost);
  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);

  app.all("*", notFound);
};
