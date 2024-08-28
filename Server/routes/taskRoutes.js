const express = require("express");
const router = express.Router();
const {
	createTask,
	getUserTasks,
	getAllTasks,
	deleteTask,
	setProgress,
} = require("../controllers/tasksController");

router.post("/createTask", createTask);
router.get("/getUserTasks/:id", getUserTasks);
router.get("/getAllTasks", getAllTasks);
router.put("/setProgress/:id", setProgress);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
