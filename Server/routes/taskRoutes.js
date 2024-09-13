const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
	createTask,
	getUserTasks,
	getAllTasks,
	deleteTask,
	setProgress,
} = require("../controllers/tasksController");

router.post("/createTask", verifyToken, createTask);
router.get("/getUserTasks/:id", verifyToken, getUserTasks);
router.get("/getAllTasks", verifyToken, getAllTasks);
router.put("/setProgress/:id", verifyToken, setProgress);
router.delete("/deleteTask/:id", verifyToken, deleteTask);

module.exports = router;
