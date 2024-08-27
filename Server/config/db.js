const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
	host: process.env.SQL_HOST,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASSWORD,
	database: process.env.SQL_DATABASE,
});

connection.connect((err) => {
	if (err) {
		console.log("Error connecting to DB: ", err);
		return;
	}
	console.log("Connected to DB");
});

module.exports = connection;
