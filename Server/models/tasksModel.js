const connection = require("../config/db");
const bcrypt = require("bcrypt");

const createTask = async (task, callback) => {
	const query = `INSERT INTO Tasks (Emp_id, Name, Description, DueDate, Status) VALUES (?, ?, ?, ?, ?)`;
	const status = "Not Started";
	connection.query(
		query,
		[
			task?.assignee,
			task?.taskName,
			task?.description,
			task?.dueDate,
			status,
		],
		(err, results) => {
			if (err) {
				console.log("Error creating task: ", err);
				return;
			}
			callback(null, results);
		}
	);
};

const getUserTasks = (id, callback) => {
	const query = `SELECT * FROM Tasks WHERE Emp_id = ?`;
	connection.query(query, [id], (err, results) => {
		if (err) {
			console.log("Error fetching tasks: ", err);
			return;
		}
		callback(null, results);
	});
};

const getAllTasks = (callback) => {
	const query = `SELECT * FROM Tasks`;
	connection.query(query, (err, results) => {
		if (err) {
			console.log("Error fetching tasks: ", err);
			return;
		}
		callback(null, results);
	});
};

const setProgress = (id, progress, callback) => {
	const query = `UPDATE Tasks SET Status = ? WHERE Task_id = ?`;
	connection.query(query, [progress, id], (err, results) => {
		if (err) {
			console.log("Error updating progress: ", err);
			return;
		}
		callback(null, results);
	});
};

const deleteTask = (id, callback) => {
	const query = `DELETE FROM Tasks WHERE Task_id = ?`;
	connection.query(query, [id], (err, results) => {
		if (err) {
			console.log("Error deleting task: ", err);
			return;
		}
		callback(null, results);
	});
};

module.exports = {
	createTask,
	getUserTasks,
	getAllTasks,
	deleteTask,
	setProgress,
};
