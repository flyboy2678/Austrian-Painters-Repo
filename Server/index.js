const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const pollRoutes = require("./routes/pollRoutes");
const clockingRoutes = require("./routes/clockingRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const { setSocketIO } = require("./socketIo/config");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:4200",
		methods: ["GET", "POST"],
	},
});

// Set io instance in socketManager
setSocketIO(io);

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", pollRoutes);
app.use("/api", clockingRoutes);
app.use("/api", messagesRoutes);

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("sendMessage", (message) => {
		console.log("Message received: ", message);
		io.emit("newMessage", message);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
