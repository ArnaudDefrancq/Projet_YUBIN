const db = require("../models");
const comModel = db.Comment;
const postModel = db.Post;
const userModel = db.User;

exports.createCom = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.auth.userId } });
    const post = await postModel.findOne({ where: { id: req.params.id } });

    const comment = new comModel({
      ...req.body,
      user_id: user.id,
      post_id: post.id,
    });

    comment
      .save()
      .then(() => res.status(201).json({ message: "Commentaire enregistré" }))
      .catch((err) =>
        res.status(500).json({ error: err + "Probleme dans le save" })
      );
  } catch {
    res.status(500).json({ error: "probleme dans le try/catch" });
  }
};
exports.getAllCom = (req, res) => {
  comModel
    .findAll({
      where: { post_id: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: userModel,
        },
      ],
    })
    .then((coms) => res.status(200).json({ coms }))
    .catch((err) => res.status(500).json({ error: err + "probleme findAll" }));
};
exports.updateCom = (req, res) => {
  const updateCom = { ...req.body };

  comModel
    .findOne({ where: { id: req.params.id } })
    .then((com) => {
      if (com.user_id !== req.auth.userId)
        res.status(500).json({ error: "Vous n'êtes pas l'auteur" });
      else {
        comModel
          .update(updateCom, { where: { id: req.params.id } })
          .then((data) => res.status(201).json({ data }))
          .catch((err) =>
            res.status(500).json({ error: err + "probleme update com" })
          );
      }
    })
    .catch((err) => res.status(500).json({ error: err + "probleme findOne" }));
};
exports.deleteCom = (req, res) => {
  comModel
    .findOne({ where: { id: req.params.id } })
    .then((com) => {
      if (com.user_id !== req.auth.userId)
        res.status(500).json({ error: "Vous n'êtes pas l'auteur" });
      comModel
        .destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch((err) =>
          res.status(500).json({ error: err + "probleme destroy" })
        );
    })
    .catch((err) => res.status(500).json({ error: err + "Probleme findOne" }));
};
