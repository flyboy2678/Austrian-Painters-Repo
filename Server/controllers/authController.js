const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { createUser, getUserByEmail } = require("../models/userModel");

const secretKey = process.env.JWT_SECRET;

const signup = (req, res) => {
	const user = req.body;
	console.log("User: ", user);
	createUser(user, (err, result) => {
		if (err) {
			res.status(500).send("Error creating user");
			return;
		}
		res.status(201).send(result);
	});
};

const login = (req, res) => {
	const { email, password } = req.body;

	getUserByEmail(email, (err, results) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}

		if (results.length === 0) {
			res.status(401).send("User not found");
			return;
		}

		const user = results[0];

		bcrypt.compare(password, user.Password, (err, result) => {
			if (err) {
				res.status(500).send("Error comparing passwords");
				return;
			}

			if (!result) {
				res.status(401).send("Invalid credentials");
				return;
			}

			const token = jwt.sign(
				{ email: user.Email, role: user.Role },
				secretKey,
				{ expiresIn: "9h" },
				{ algorithm: "HS256" }
			);
			res.status(200).send({ token });
		});
	});
};

module.exports = { signup, login };
