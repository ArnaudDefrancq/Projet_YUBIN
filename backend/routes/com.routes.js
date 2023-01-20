const express = require("express");
const router = express.Router();
const comCtrl = require("../controllers/com.ctrl");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/:id", authMiddleware, comCtrl.createCom);
router.get("/:id", comCtrl.getAllCom);
router.put("/update/:id", authMiddleware, comCtrl.updateCom);
router.delete("/delete/:id", authMiddleware, comCtrl.deleteCom);

module.exports = router;
