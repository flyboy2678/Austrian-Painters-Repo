const tasksModel = require("../models/tasksModel");

const createTask = (req, res) => {
	const task = req.body;
	tasksModel.createTask(task, (err, result) => {
		if (err) {
			res.status(500).send("Error creating task");
			return;
		}
		res.status(201).send(result);
	});
};

const getUserTasks = (req, res) => {
	const id = req.params.id;
	tasksModel.getUserTasks(id, (err, result) => {
		if (err) {
			res.status(500).send("Error fetching tasks");
			return;
		}
		res.status(200).send(result);
	});
};

const getAllTasks = (req, res) => {
	tasksModel.getAllTasks((err, result) => {
		if (err) {
			res.status(500).send("Error fetching tasks");
			return;
		}
		res.status(200).send(result);
	});
};

const setProgress = (req, res) => {
	const id = req.params.id;
	const progress = req.body.progress;
	tasksModel.setProgress(id, progress, (err, result) => {
		if (err) {
			res.status(500).send("Error updating progress");
			return;
		}
		res.status(200).send(result);
	});
};

const deleteTask = (req, res) => {
	const id = req.params.id;
	tasksModel.deleteTask(id, (err, result) => {
		if (err) {
			res.status(500).send("Error deleting task");
			return;
		}
		res.status(200).send(result);
	});
};

module.exports = {
	createTask,
	getUserTasks,
	getAllTasks,
	deleteTask,
	setProgress,
};
