const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.ctrl");
const authMiddleware = require("../middleware/auth.middleware");
const multerMiddleware = require("../middleware/multer.middleware");

router.post("/", authMiddleware, multerMiddleware, postCtrl.createPost);
router.get("/", postCtrl.getAllPost);
router.put(
  "/update/:id",
  authMiddleware,
  multerMiddleware,
  postCtrl.updatePost
);
router.delete("/delete/:id", authMiddleware, postCtrl.deleteOnePost);

router.post("/:id/like", authMiddleware, postCtrl.createLike);
router.get("/:id/like", postCtrl.getAllLike);
router.delete("/:id/dislike", authMiddleware, postCtrl.deleteLike);

module.exports = router;
