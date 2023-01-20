const db = require("../models");
const userModel = db.User;
const postModel = db.Post;
const comModel = db.Comment;
const friendModel = db.Friend;
const fs = require("fs");

exports.getAllUser = (req, res) => {
  userModel
    .findAll()
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(500).json({ error: err + "Probleme findAll" }));
};
exports.getOneUser = (req, res) => {
  userModel
    .findOne({
      where: { id: req.params.id },
      include: [
        {
          model: postModel,
        },
        {
          model: comModel,
        },
        {
          model: friendModel,
        },
      ],
    })
    .then((user) => {
      if (user.id !== req.auth.userId) res.status(500).json({ error });
      res.status(200).json({ user });
    })
    .catch((err) => res.status(500).json({ error: err + "rien trouvé" }));
};
exports.updateUser = (req, res) => {
  const updateUser = req.file
    ? {
        ...req.body,
        user_image: `${req.protocol}://${req.get("host")}/images/profil/user/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  userModel
    .findOne({ where: { id: req.params.id } })
    .then((user) => {
      if (user.id !== req.auth.userId)
        res.status(500).json({ error: "Vous n'êtes pas le bon utilisateur" });
      if (req.file || updateUser.user_image === "") {
        const filename = user.user_image.split("/images/profil/user/")[1];
        fs.unlink(`images/profil/user/${filename}`, () => {
          console.log("image supprimer");
        });
      }
      userModel
        .update(updateUser, { where: { id: req.auth.userId } })
        .then(() => res.status(200).json({ message: "user modif" }))
        .catch((err) => res.status(500).json({ error: err + "rien changé" }));
    })
    .catch((err) => res.status(500).json({ error: err + "Rien trouvé" }));
};
exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.params.id } });

    if (user.id !== req.auth.userId)
      res
        .status(500)
        .json({ error: "Vous n'êtes pas le propriétaire du compte" });
    if (user.user_image) {
      const filename = user.user_image.split("/images/profil/user/")[1];
      fs.unlink(`images/profil/user/${filename}`, () => {
        console.log("image supprimer");
      });
    }
    userModel
      .destroy({ where: { id: user.id } })
      .then(() => res.status(200).json({ message: "user suppr" }))
      .catch((err) => res.status(500).json({ error: err + "Pas suppr" }));
  } catch (err) {
    res.statsu(500).json({ error: err + "Probleme try/catch" });
  }
};

// Friends
exports.addFriend = async (req, res) => {
  try {
    const userFriend = await userModel.findOne({
      where: { id: req.params.id },
    });
    const user = await userModel.findOne({ where: { id: req.auth.userId } });

    const newFriend = new friendModel({
      user_id: user.id,
      friend: userFriend.id,
    });

    friendModel
      .findOne({ where: { user_id: user.id } })
      .then((friend) => {
        if (friend) {
          if (friend.user_id === user.id) {
            res.status(500).json({ error: "post déjà ami" });
          } else {
            newFriend
              .save()
              .then(() => res.status(200).json({ message: "ami ajouté" }))
              .catch((err) =>
                res.status(500).json({ error: err + "pas save" })
              );
          }
        } else {
          newFriend
            .save()
            .then(() => res.status(200).json({ message: "ami ajouté" }))
            .catch((err) => res.status(500).json({ error: err + "pas save" }));
        }
      })
      .catch((err) =>
        res.status(500).json({ error: err + "probleme rien trouvé" })
      );
  } catch (err) {
    res.status(500).json({ error: err + "probleme try" });
  }
};

exports.getAllFriend = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.params.id } });

    friendModel
      .findAll({
        where: {
          user_id: user.id,
        },
        order: [["createdAt", "DESC"]],
      })
      .then((friend) => res.status(200).json({ friend }))
      .catch((err) => res.status(500).json({ error: err + "probleme find" }));
  } catch (err) {
    res.status(500).json({ error: err + "probleme try" });
  }
};

exports.deleteFriend = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.auth.userId } });
    const userFriend = await userModel.findOne({
      where: { id: req.params.id },
    });

    friendModel
      .findOne({ where: { user_id: user.id, friend: userFriend.id } })
      .then((friend) => {
        if (friend.user_id !== req.auth.userId)
          res.status(500).json({ error: "Ce n'est pas vous" });
        else {
          friend
            .destroy()
            .then(() => res.status(200).json({ message: "ami suppr" }))
            .catch((err) =>
              res.status(500).json({ error: err + "rien enlevé" })
            );
        }
      })
      .catch((err) => res.status(500).json({ error: err + "rien trouvé" }));
  } catch (err) {
    res.status(500).json({ error: err + "probleme try" });
  }
};
