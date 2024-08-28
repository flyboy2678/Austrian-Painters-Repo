const connection = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (user, callback) => {
	const query = `INSERT INTO EMPLOYEES (Email, Password) VALUES (?, ?)`;
	//check if user exists
	const userExistsQuery = `SELECT * FROM EMPLOYEES WHERE Email = ?`;
	connection.query(userExistsQuery, [user.email], (err, results) => {
		if (err) {
			console.log("Error checking if user exists: ", err);
			return;
		}
		if (results.length > 0) {
			console.log("User already exists");
			callback(null, { message: "User already exists" });
			return;
		}
	});
	//hash password
	try {
		var hashedPassword = await bcrypt.hash(user.password, 10);
	} catch (err) {
		console.log("Error hashing password: ", err);
	}
	//create user in the database
	connection.query(
		query,
		[
			user?.email,
			hashedPassword,
			user?.first_name,
			user?.last_name,
			user?.role,
		],
		(err, results) => {
			if (err) {
				// console.log("Error creating user: ", err);
				return;
			}
			// console.log("User created: ", results);
			callback(null, results);
		}
	);
};

const getUserByEmail = (email, callback) => {
	const query = `SELECT * FROM EMPLOYEES WHERE Email = ?`;

	connection.query(query, [email], (err, results) => {
		if (err) {
			// console.log("Error getting user: ", err);
			return;
		}
		// console.log("User found: ", results);
		callback(null, results);
	});
};

const getUserById = (id, callback) => {
	const query = `SELECT * FROM EMPLOYEES WHERE Emp_id = ?`;

	connection.query(query, [id], (err, results) => {
		if (err) {
			// console.log("Error getting user: ", err);
			return;
		}
		// console.log("User found: ", results);
		callback(null, results);
	});
};

const updateUser = (user, callback) => {
	//update the firstName, LastName, and email
	const query = `UPDATE EMPLOYEES SET FirstName = ?, LastName = ?, Email = ? WHERE Emp_id = ?`;

	connection.query(
		query,
		[user.firstName, user.lastName, user.email, user.id],
		(err, results) => {
			if (err) {
				// console.log("Error updating user: ", err);
				return;
			}
			// console.log("User updated: ", results);
			callback(null, results);
		}
	);
};

const getAllUsers = (callback) => {
	const query = `SELECT * FROM EMPLOYEES`;

	connection.query(query, (err, results) => {
		if (err) {
			console.log("Error getting users: ", err);
			return;
		}
		console.log("Users found: ", results);
		callback(null, results);
	});
};

const deleteUser = (id, callback) => {
	const query = `DELETE FROM EMPLOYEES WHERE Emp_id = ?`;

	connection.query(query, [id], (err, results) => {
		if (err) {
			console.log("Error deleting user: ", err);
			return;
		}
		console.log("User deleted: ", results);
		callback(null, results);
	});
};

module.exports = {
	createUser,
	getUserByEmail,
	updateUser,
	getUserById,
	getAllUsers,
	deleteUser,
};
