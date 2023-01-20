const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.ctrl");
const userCtrl = require("../controllers/user.ctrl");
const multerMiddleware = require("../middleware/multer.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// auth
router.post("/signup", multerMiddleware, authCtrl.signUp);
router.post("/signin", authCtrl.signIn);
router.get("/logout", authCtrl.logOut);

// user
router.get("/user/", userCtrl.getAllUser);
router.get("/user/:id", authMiddleware, userCtrl.getOneUser);
router.put(
  "/user/update/:id",
  authMiddleware,
  multerMiddleware,
  userCtrl.updateUser
);
router.delete(
  "/user/delete/:id",
  authMiddleware,
  multerMiddleware,
  userCtrl.deleteUser
);

module.exports = router;
