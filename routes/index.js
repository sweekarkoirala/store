const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

const expressSession = require("express-session");
const flash = require("connect-flash");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", {products, success});
  
});

router.get("/cart", isLoggedIn, async (req, res) => {
  try{
      let user = await userModel.findOne({email: req.user.email}).populate("cart");

      const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

      res.render("cart", {user, bill});
  } catch(err) {
      res.send(err.message);
  }
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({email: req.user.email});
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("shop", {products: []});
});

module.exports = router;