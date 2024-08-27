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

module.exports = { createUser };
