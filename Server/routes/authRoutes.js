const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	refreshToken,
} = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);
router.post("/refreshToken", refreshToken);


module.exports = router;
