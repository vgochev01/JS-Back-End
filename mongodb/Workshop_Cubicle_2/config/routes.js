const { catalog } = require("../controllers/catalog");
const { create, post: createPost } = require("../controllers/create");
const { edit, post: editPost } = require("../controllers/edit");
const { post: commentPost } = require("../controllers/comments");
const { about } = require("../controllers/about");
const { details } = require("../controllers/details");
const { notFound } = require("../controllers/notFound");
const { init } = require("./storage");

module.exports = (app) => {
  app.use(init());

  app.get("/", catalog);
  app.get("/details/:id", details);
  app.get("/about", about);

  app.get("/create", create);
  app.post("/create", createPost);

  app.get("/edit/:id", edit);
  app.post("/edit/:id", editPost);

  app.post("/comments/:cubeId", commentPost);

  app.all("*", notFound);
};
