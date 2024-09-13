const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	refreshToken,
	sendForgotPasswordEmail,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/refreshToken", refreshToken);
router.post("/forgotPassword", sendForgotPasswordEmail);

module.exports = router;
