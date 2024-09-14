const connection = require("../config/db");
const { getSocketIO } = require("../socketIo/config");

const sendMessage = (data, callback) => {
	const { sender_id, receiver_id, message } = data; // Destructure message object

	const query = `INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)`;

	connection.query(
		query,
		[sender_id, receiver_id, message], // Pass the correct variables
		(err, results) => {
			if (err) {
				console.log("Error sending message: ", err);
				return callback(err);
			}
			const io = getSocketIO();
			if (io) {
				// Check if io is defined
				io.emit("sendMessage", {
					sender_id,
					receiver_id,
					message,
				});
			} else {
				console.log("Socket.IO instance is not available");
			}
			console.log("Message sent: ", results);
			callback(null, results);
		}
	);
};

const getMessages = (users, callback) => {
	const { sender_id, receiver_id } = users; // Destructure users object

	const query = `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY timestamp ASC`;

	connection.query(
		query,
		[sender_id, receiver_id, receiver_id, sender_id],
		(err, results) => {
			if (err) {
				console.log("Error getting messages: ", err);
				return callback(err);
			}
			console.log("Messages: ", results);
			callback(null, results);
		}
	);
};

module.exports = { sendMessage, getMessages };
