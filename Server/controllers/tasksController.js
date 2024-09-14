const tasksModel = require("../models/tasksModel");
const nodemailer = require("nodemailer");
const { getUserById } = require("../models/userModel");

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
	const progress = req.body.status;
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

const updateTask = (req, res) => {
	const task = req.body;
	tasksModel.updateTask(task, (err, result) => {
		if (err) {
			res.status(500).send("Error updating task");
			return;
		}
		res.status(200).send(result);
	});
};

//run this function every 24 hours
const checkDueDate = () => {
	tasksModel.getAllTasks((err, results) => {
		if (err) {
			console.log("Error fetching tasks: ", err);
			return;
		}
		const tasks = results;
		const today = new Date();
		tasks.forEach((task) => {
			const dueDate = new Date(task.DueDate);
			//if there is less than 24 hours left before the due date, send a reminder
			if (dueDate - today < 86400000 && task.reminded === "false") {
				console.log("Reminder: ", task.Name);
				sendReminderEmail(task);
			}
		});
	});
};

const sendReminderEmail = async (task) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		secure: false,
		port: 465,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	console.log("Task: ", task);
	let user;
	getUserById(task.Emp_id, (err, result) => {
		if (err) {
			console.log("Error fetching user: ", err);
			return;
		}
		user = result[0];
		console.log("User: ", user);
		const mailOptions = {
			to: user.Email,
			subject: "Task Reminder",
			html: `<p>Task: ${task.Name} is due tomorrow</p>`,
		};

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log("Error sending email", err);
				return;
			}
			console.log("Email sent: ", info.response);
		});

		tasksModel.updateReminder(task.Task_id, (err, result) => {
			if (err) {
				console.log("Error updating reminder: ", err);
				return;
			}
		});
	});
};

const tenSeconds = 10000;
setInterval(checkDueDate, tenSeconds);

module.exports = {
	createTask,
	getUserTasks,
	getAllTasks,
	deleteTask,
	updateTask,
	setProgress,
};
