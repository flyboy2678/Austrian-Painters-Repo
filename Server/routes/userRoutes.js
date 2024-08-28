const express = require("express");
const router = express.Router();
const {
	createUser,
	updateUser,
	getUserByEmail,
	getAllUsers,
	deleteUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.get("/getUserByEmail/:email", getUserByEmail);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
