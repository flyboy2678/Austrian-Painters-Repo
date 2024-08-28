const express = require("express");
const router = express.Router();
const {
	createUser,
	updateUser,
	getUserByEmail,
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.get("/getUserByEmail/:email", getUserByEmail);

module.exports = router;
