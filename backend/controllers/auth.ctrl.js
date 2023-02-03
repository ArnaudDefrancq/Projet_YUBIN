const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = db.User;

exports.signUp = (req, res) => {
  const { user_email, user_pseudo, user_password } = req.body;
  const user_image = `${req.protocol}://${req.get(
    "host"
  )}/images/profil/mee.png`;

  if (user_email == "" || user_pseudo == "" || user_password == "") {
    res.status(400).json({ error: "Veuillez remplire tout les champs" });
  }

  userModel
    .findOne({
      attributes: ["user_email"],
      where: { user_email: user_email },
    })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(user_password, 10)
          .then((hash) => {
            const newUser = new userModel({
              ...req.body,
              user_password: hash,
              user_image,
            });
            newUser
              .save()
              .then(() => res.status(201).json({ message: "utilisateur créé" }))
              .catch((err) =>
                res.status(500).json({ error: err + "probleme de save" })
              );
          })
          .catch((err) =>
            res.status(500).json({ error: err + "probleme de hash" })
          );
      } else {
        res.status(500).json({ message: "email déjà utilisée" });
      }
    })
    .catch((err) => res.status(500).json({ error: err + "probleme findOne" }));
};

exports.signIn = (req, res) => {
  const { user_email, user_password } = req.body;

  if (user_email == "" || user_password == "") {
    res.status(500).json({ error: "Veuillez remplire tout les champs !" });
  }

  userModel
    .findOne({
      where: { user_email: user_email },
    })
    .then((user) => {
      if (user) {
        bcrypt
          .compare(user_password, user.user_password)
          .then((valid) => {
            if (!valid) {
              res.status(500).json({ error: "pas le bon MDP" });
            } else {
              res.cookie(
                "jwt",
                jwt.sign(
                  {
                    userId: user.id,
                    userPseudo: user.user_pseudo,
                  },
                  "TOKEN",
                  { expiresIn: "24h" }
                )
              );
              res.status(200).json({
                userId: user.id,
                userPseudo: user.user_pseudo,
                token: jwt.sign(
                  {
                    userId: user.id,
                    userPseudo: user.user_pseudo,
                  },
                  "TOKEN",
                  { expiresIn: "24h" }
                ),
              });
            }
          })
          .catch((err) =>
            res.status(500).json({ error: err + "probleme avec bcrypt" })
          );
      }
    })
    .catch((err) => res.status(500).json({ error: err + "probleme findOne" }));
};
exports.logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
