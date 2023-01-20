const db = require("../models");
const postModel = db.Post;
const userModel = db.User;
const likeModel = db.Like;
const fs = require("fs");

exports.createPost = (req, res) => {
  try {
    if (req.file) {
      postModel
        .create({
          post_content: req.body.post_content,
          post_image: `${req.protocol}://${req.get("host")}/images/post/${
            req.file.filename
          }`,
          user_id: req.auth.userId,
        })
        .then((post) => {
          res.status(201).json({ message: "posted !" + post });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ error: err + "probleme creation post avec image" })
        );
    } else {
      postModel
        .create({
          post_content: req.body.post_content,
          user_id: req.auth.userId,
        })
        .then((post) => {
          res.status(201).json({ message: "posted !" + post });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ error: err + "probleme creation post sans image" })
        );
    }
  } catch {
    return res.status(500).json({ error: "probleme dans le try/catch" });
  }
};
exports.getAllPost = (req, res) => {
  postModel
    .findAll({
      order: [["createdAt", "DESC"]],
      include: {
        model: userModel,
      },
    })
    .then((posts) => res.status(200).json({ posts }))
    .catch((err) =>
      res.status(500).json({ error: err + "Probleme lecture des posts" })
    );
};
exports.updatePost = (req, res) => {
  const updatePost = req.file
    ? {
        ...req.body,
        post_image: `${req.protocol}://${req.get("host")}/images/post/${
          req.file.filename
        }`,
      }
    : {
        ...req.body,
      };

  try {
    postModel
      .findOne({ where: { id: req.params.id } })
      .then((post) => {
        if (post.user_id !== req.auth.userId)
          res.status(500).json({ error: "Vous nêtes pas l'auteur du post" });
        if (req.file || updatePost.post_image === "") {
          const filename = post.post_image.split("/images/post/")[1];
          fs.unlink(`images/post/${filename}`, () => {
            console.log("image supprimer");
          });
        }
        postModel
          .update(updatePost, { where: { id: req.params.id } })
          .then((data) =>
            res.status(201).json({ message: "post modifier" + data })
          )
          .catch((err) =>
            res.status(500).json({ error: err + "Probleme update" })
          );
      })
      .catch((err) =>
        res.status(500).json({ error: err + "probleme recup post" })
      );
  } catch {
    return res.status(500).json({ error: "probleme dans le try/catch" });
  }
};
exports.deleteOnePost = (req, res) => {
  postModel
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (post.user_id !== req.auth.userId)
        res.status(500).json({ message: "Vous nêtes pas l'auteur" });
      if (post.post_image) {
        const filename = post.post_image.split("/images/post/")[1];
        fs.unlink(`images/post/${filename}`, () => {
          postModel
            .destroy({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "post effacé" }))
            .catch((err) =>
              res.status(500).json({ error: err + "probleme destroy" })
            );
        });
      } else {
        postModel
          .destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: "post effacé" }))
          .catch((err) =>
            res.status(500).json({ error: err + "probleme destroy" })
          );
      }
    })
    .catch((err) => res.status(500).json({ error: err + "probleme findone" }));
};

//like
exports.createLike = async (req, res) => {
  try {
    console.log(req.params.id);

    const user = await userModel.findOne({ where: { id: req.auth.userId } });
    const post = await postModel.findOne({ where: { id: req.params.id } });

    const newLike = new likeModel({
      user_id: user.id,
      post_id: post.id,
    });

    likeModel
      .findOne({ where: { post_id: post.id } })
      .then((post) => {
        if (post) {
          if (post.user_id === user.id)
            res.status(500).json({ error: "post déjà liké" });
          else {
            newLike
              .save()
              .then(() => res.status(201).json({ message: "post liké" }))
              .catch((err) =>
                res.status(500).json({ error: err + "probleme save" })
              );
          }
        } else {
          newLike
            .save()
            .then(() => res.status(201).json({ message: "post liké" }))
            .catch((err) =>
              res.status(500).json({ error: err + "probleme save" })
            );
        }
      })
      .catch((err) =>
        res.status(500).json({ error: err + "Probleme findOne" })
      );
  } catch {
    res.status(500).json({ error: "probleme try/catch" });
  }
};
exports.getAllLike = async (req, res) => {
  try {
    const post = await userModel.findOne({ where: { id: req.params.id } });
    likeModel
      .findAll({ where: { post_id: post.id } })
      .then((likes) => res.status(200).json({ likes }))
      .catch((err) => res.status(500).json({ error: err + "pas trouvé" }));
  } catch {
    res.status(500).json({ error: "probleme try/catch" });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.auth.userId } });
    const post = await postModel.findOne({ where: { id: req.params.id } });

    likeModel
      .findOne({ where: { user_id: user.id, post_id: post.id } })
      .then((like) => {
        if (like.user_id !== req.auth.userId)
          res.status(500).json({ error: "Vous n'êtes pas l'auteur du like" });
        else {
          like
            .destroy()
            .then(() => res.status(200).json({ message: "dislike" }))
            .catch((err) =>
              res.status(500).json({ error: err + "probleme dislike" })
            );
        }
      })
      .catch((err) => res.status(500).json({ error: err + "probleme touvé" }));
  } catch (error) {
    res.status(500).json({ error: error + "Probleme try/catch" });
  }
};
