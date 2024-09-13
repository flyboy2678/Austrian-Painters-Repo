const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
	createUser,
	updateUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	deleteUser,
	adminUpdateUser,
	changePassword,
} = require("../controllers/userController");

router.post("/createUser", verifyToken, createUser);
router.put("/updateUser", verifyToken, updateUser);
router.put("/adminUpdateUser", verifyToken, adminUpdateUser);
router.get("/getUserByEmail/:email", verifyToken, getUserByEmail);
router.get("/getUserById/:id", verifyToken, getUserById);
router.get("/getAllUsers", verifyToken, getAllUsers);
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.put("/changePassword", verifyToken, changePassword);

module.exports = router;
