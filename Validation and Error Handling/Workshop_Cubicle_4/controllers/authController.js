const router = require("express").Router();
const { isAuth, isGuest } = require("../middlewares/guards");

const { body, validationResult } = require("express-validator");

router.get("/register", isGuest(), (req, res) => {
  res.render("register", { title: "Register" });
});

router.post(
  "/register",
  isGuest(),
  body(
    "username",
    "Username must contain at least 5 latin alphanumeric characters!"
  ).trim().isLength({ min: 5 }).isAlphanumeric("en-US"),
  body(
      "password",
      "Password must contain at least 8 latin alphanumeric characters!"
  ).trim().isLength({ min: 8 }).isAlphanumeric("en-US"),
  body(
      "repeatPassword",
      "Passwords must match!"
  ).custom((value, { req }) => {
    if(value != req.body.password){
        throw new Error("Passwords don't match!");
    }
    return true;
  }),
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        errors = errors.mapped();
        throw new Error(Object.values(errors).map(e => e.msg).join('\n'));
      }
      await req.auth.register(req.body);
      res.redirect("/products");
    } catch (err) {
      res.render("register", {
        title: "Register",
        errors: err.message.split('\n'),
        username: req.body.username || "",
      });
    }
  }
);

router.get("/login", isGuest(), (req, res) => {
  res.render("login", { title: "Login" });
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    await req.auth.login(req.body);
    res.redirect("/products");
  } catch (err) {
    res.render("login", {
      title: "Login",
      error: err.message,
      username: req.body.username || "",
    });
  }
});

router.get("/logout", isAuth(), async (req, res) => {
  await req.auth.logout();
  res.redirect("/products");
});

module.exports = router;
