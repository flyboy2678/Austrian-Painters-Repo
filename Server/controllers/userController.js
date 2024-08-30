const userModel = require("../models/userModel");

const createUser = (req, res) => {
	const user = req.body;
	userModel.createUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error creating user");
			return;
		}
		res.status(201).send(result);
	});
};

const getUserByEmail = (req, res) => {
	const email = req.params.email;
	userModel.getUserByEmail(email, (err, result) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}
		res.status(200).send(result);
	});
};

const getUserById = (req, res) => {
	const id = req.params.id;
	userModel.getUserById(id, (err, result) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}
		res.status(200).send(result);
	});
};

const updateUser = (req, res) => {
	const user = req.body;
	userModel.updateUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error updating user");
			return;
		}
		res.status(200).send(result);
	});
};

const adminUpdateUser = (req, res) => {
	const user = req.body;
	userModel.adminUpdateUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error updating user");
			return;
		}
		res.status(200).send(result);
	});
};

const getAllUsers = (req, res) => {
	userModel.getAllUsers((err, result) => {
		if (err) {
			res.status(500).send("Error getting users");
			return;
		}
		res.status(200).send(result);
	});
};

const deleteUser = (req, res) => {
	const id = req.params.id;
	userModel.deleteUser(id, (err, result) => {
		if (err) {
			res.status(500).send("Error deleting user");
			return;
		}
		res.status(200).send(result);
	});
};

const changePassword = (req, res) => {
	const user = req.body;
	userModel.changePassword(user, (err, result) => {
		if (err) {
			res.status(500).send("Error changing password");
			return;
		}
		res.status(200).send(result);
	});
};

module.exports = {
	createUser,
	updateUser,
	adminUpdateUser,
	getUserByEmail,
	getAllUsers,
	getUserById,
	deleteUser,
	changePassword,
};
