const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");

const ownersRouter = require("./routes/ownersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");

const connectDB = require("./config/mongoose-connection.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);