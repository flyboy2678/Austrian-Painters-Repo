const messagesModel = require("../models/messagesModel");

const sendMessage = (req, res) => {
	const message = req.body;
	messagesModel.sendMessage(message, (err, result) => {
		if (err) {
			res.status(500).send("Error sending message");
			return;
		}
		res.status(201).send(result);
	});
};

const getMessages = (req, res) => {
	const { sender_id, receiver_id } = req.params;
	const users = { sender_id, receiver_id };
	messagesModel.getMessages(users, (err, result) => {
		if (err) {
			res.status(500).send("Error getting messages");
			return;
		}
		res.status(200).send(result);
	});
};

module.exports = { sendMessage, getMessages };
