const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Import des Route
const authRouter = require("./routes/auth.routes.js");
const postRouter = require("./routes/post.routes");
const comRouter = require("./routes/com.routes");
const userRouter = require("./routes/user.routes");

const app = express();

// permet de lire les JSON et COOKIE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// synchronise les tables
// models.sequelize.sync({ alter: true });

// Vérif connection server
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

// Sys auth
app.use("/api/auth", authRouter);

// Sys user
app.use("/api/user", userRouter);

// Sys des posts
app.use("/api/post", postRouter);

// Sys des com
app.use("/api/com", comRouter);

module.exports = app;
