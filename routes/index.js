const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

const expressSession = require("express-session");
const flash = require("connect-flash");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, function (req, res) {
  res.render("shop.js");
});

module.exports = router;