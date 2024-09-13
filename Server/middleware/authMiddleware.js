const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		res.status(403).send("Token is required");
		return;
	}

	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			console.log("Error: ", err);
			res.status(401).send("Invalid token");
			return;
		}

		req.user = decoded;
		next();
	});
};

module.exports = { verifyToken };
