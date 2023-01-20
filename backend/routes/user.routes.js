const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.ctrl");
const multerMiddleware = require("../middleware/imageProfil.middleware");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", userCtrl.getAllUser);
router.get("/:id", authMiddleware, userCtrl.getOneUser);
router.put(
  "/update/:id",
  authMiddleware,
  multerMiddleware,
  userCtrl.updateUser
);
router.delete(
  "/delete/:id",
  authMiddleware,
  multerMiddleware,
  userCtrl.deleteUser
);

// Friend
router.post("/add-friends/:id", authMiddleware, userCtrl.addFriend);
router.get("/friends/:id", authMiddleware, userCtrl.getAllFriend);
router.delete("/delete-friend/:id", authMiddleware, userCtrl.deleteFriend);

module.exports = router;
