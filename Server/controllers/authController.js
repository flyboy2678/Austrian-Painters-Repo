const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {
	createUser,
	getUserByEmail,
	getUserById,
} = require("../models/userModel");
const { jwtDecode } = require("jwt-decode");
const nodemailer = require("nodemailer");

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

	//check if user exists
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

		//compare the password entered with the hashed password in the database before logging the user in
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
				{
					id: user.Emp_id,
					firstName: user.FirstName,
					lastName: user.LastName,
					email: user.Email,
					admin: user.Admin,
				},
				secretKey,
				{ expiresIn: "9h" },
				{ algorithm: "HS256" }
			);
			res.status(200).send({ token });
		});
	});
};

//used to refresh token if token is expired or after the user changes their details
const refreshToken = (req, res) => {
	//we sending the current token in thats stored in the local storage
	const token = req.body;
	const decoded = jwtDecode(token.refreshToken.token);

	//going into the database to retrive the updated user details
	getUserById(decoded.id, (err, results) => {
		if (err) {
			res.status(500).send("Error getting user");
			return;
		}
		const user = results[0];
		if (!user) {
			res.status(401).send("User not found");
			return;
		}

		//sign a new token with the updated user details
		const token = jwt.sign(
			{
				id: decoded.id,
				firstName: user.FirstName,
				lastName: user.LastName,
				email: user.Email,
				admin: user.Admin,
			},
			secretKey,
			{ expiresIn: "9h" },
			{ algorithm: "HS256" }
		);
		res.status(200).send({ token });
	});
};

const sendForgotPasswordEmail = (req, res) => {
	const data = req.body;
	const email = data.email;
	const token = jwt.sign(
		{ email },
		secretKey,
		{ expiresIn: "1h" },
		{ algorithm: "HS256" }
	);
	const resetLink = `http://localhost:3000/reset-password/${token}`;

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

	const mailOptions = {
		to: email,
		subject: "Password Reset",
		html: `<p>Click on the link to reset your password:</p> <a>${resetLink}</a>`,
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log("Error sending email", err);
			return;
		}
		console.log("Email sent: ", info.response);
	});
};

module.exports = { signup, login, refreshToken, sendForgotPasswordEmail };
