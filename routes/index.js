const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

const expressSession = require("express-session");
const flash = require("connect-flash");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", {products});
  
});

module.exports = router;