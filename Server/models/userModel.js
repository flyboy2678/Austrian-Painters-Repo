const connection = require("../config/db");
const bcrypt = require("bcrypt");
const { uid } = require("uid");

const createUser = async (user, callback) => {
	const query = `INSERT INTO EMPLOYEES (Emp_id, FirstName, LastName, Email, Password, Admin) VALUES (?, ?, ?, ?, ?, ?)`;
	//check if user exists
	const userExistsQuery = `SELECT * FROM EMPLOYEES WHERE Email = ?`;

	const userId = uid(16);

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
		var password = await bcrypt.hash(user.password, 10);
	} catch (err) {
		console.log("Error hashing password: ", err);
	}

	if (user.role) {
		var role = user.role;
	} else {
		var role = 0;
	}

	//create user in the database
	connection.query(
		query,
		[userId, user?.name, user?.surname, user?.email, password, role],
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

const adminUpdateUser = (user, callback) => {
	//update the firstName, LastName, and email
	const query = `UPDATE EMPLOYEES SET FirstName = ?, LastName = ?, Email = ?, Admin = ? WHERE Emp_id = ?`;

	connection.query(
		query,
		[user.name, user.surname, user.email, user.role, user.id],
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
		// console.log("Users found: ", results);
		callback(null, results);
	});
};

const deleteUser = (id, callback) => {
	const query = `DELETE FROM EMPLOYEES WHERE Emp_id = ?`;

	const deleteTasksQuery = `DELETE FROM Tasks WHERE Emp_id = ?`;

	connection.query(deleteTasksQuery, [id], (err, results) => {
		if (err) {
			console.log("Error deleting user tasks: ", err);
			return;
		}
		console.log("User tasks deleted: ", results);
	});

	connection.query(query, [id], (err, results) => {
		if (err) {
			console.log("Error deleting user: ", err);
			return;
		}
		console.log("User deleted: ", results);
		callback(null, results);
	});
};

const changePassword = async (user, callback) => {
	const query = `UPDATE EMPLOYEES SET Password = ? WHERE Emp_id = ?`;

	//hash password
	try {
		var newPassword = await bcrypt.hash(user.password, 10);
	} catch (err) {
		console.log("Error hashing password: ", err);
	}
	connection.query(query, [newPassword, user.id], (err, results) => {
		if (err) {
			console.log("Error updating password: ", err);
			return;
		}
		console.log("Password updated: ", results);
		callback(null, results);
	});
};


const updateUserStatus = (emp_id, status) => {
    const query = `
        UPDATE EMPLOYEES
        SET status = ?
        WHERE Emp_id = ?
    `;

    connection.query(
        query,
        [status, emp_id],
        (err, results) => {
            if (err) {
                console.error("Error updating status:", err);
                return;
            }

            if (results.affectedRows === 0) {
                console.log("No user found with the given Emp_id.");
            } else {
                console.log("Status updated successfully for Emp_id:", emp_id);
            }
        }
    );
};

const getUserStatus = (emp_id, callback) => {
    const query = `
        SELECT status
        FROM EMPLOYEES
        WHERE Emp_id = ?
    `;

    connection.query(
        query,
        [emp_id],
        (err, results) => {
            if (err) {
                console.error("Error retrieving status:", err);
                callback(err, null); // Pass error to the callback
                return;
            }

            if (results.length === 0) {
                console.log("No user found with the given Emp_id.");
                callback(null, null); // No user found
            } else {
                const status = results[0].status;
                console.log("User status retrieved successfully:", status);
                callback(null, status); // Pass the status to the callback
            }
        }
    );
};


module.exports = {
	createUser,
	getUserByEmail,
	updateUser,
	getUserById,
	getAllUsers,
	deleteUser,
	adminUpdateUser,
	updateUserStatus,
	getUserStatus,
	changePassword,
};
