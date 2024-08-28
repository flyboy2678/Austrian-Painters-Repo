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

module.exports = { createUser, updateUser, getUserByEmail };
