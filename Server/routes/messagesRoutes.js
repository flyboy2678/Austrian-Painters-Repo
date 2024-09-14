const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const MessagesController = require("../controllers/messagesController");

router.post("/sendMessage", verifyToken, MessagesController.sendMessage);
router.get(
	"/getMessages/:sender_id/:receiver_id",
	verifyToken,
	MessagesController.getMessages
);

module.exports = router;
