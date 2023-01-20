const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];

  if (!token) res.status(401).json({ message: "Aucun token" });

  const decodedtoken = jwt.verify(token, "TOKEN");

  const userId = decodedtoken.userId;

  req.auth = { userId: userId };

  next();
};

module.exports = checkToken;
