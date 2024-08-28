const express = require("express");
const router = express.Router();
const {
	createUser,
	updateUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	deleteUser,
	adminUpdateUser,
} = require("../controllers/userController");

router.post("/createUser", createUser);
router.put("/updateUser", updateUser);
router.put("/adminUpdateUser", adminUpdateUser);
router.get("/getUserByEmail/:email", getUserByEmail);
router.get("/getUserById/:id", getUserById);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
