const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { login, signup } = require("../controllers/authController");

router.post("/login", login);
router.post("/signup", signup);

router.post("/users", createUser);

module.exports = router;
