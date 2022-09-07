const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getIndex);
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.get("/notepad", authController.getNotepad);
router.post("/signup", authController.postSignup);

module.exports = router;
