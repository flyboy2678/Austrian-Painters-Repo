const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const clockingRoutes = require("./routes/clockingRoutes");
const pollRoutes = require("./routes/pollRoutes");

const {
  insertTimeEntry,
  deleteTimeEntry,
  updateClockOut,
} = require("./models/clockingModel");

const { getAllUsers } = require("./models/userModel");
const { insertPoll, getPolls } = require("./models/pollModel");

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
app.use("/api", clockingRoutes);
app.use("/api", pollRoutes);

app.use("/insert", (req, res) => {
  insertTimeEntry({
    user_id: "6",
    entry_date: "2024-08-29",
    clock_in: "2024-08-29 08:00:00",
    clock_out: null,
  });
  res.send("Inserting data");
});

app.use("/test-poll", (req, res) => {
  // insertPoll(
  //   "05fa90d1978e55fd",
  //   {
  //     name_and_surname: "Tony Lapuken",
  //     poll_data: {
  //       question: "Are you?",
  //       poll_options: ["Yes", "No"],
  //       poll_votes: [0, 0],
  //     },
  //   },
  //   () => {}
  // );
  getPolls();

  res.send("Yini Manje?");
});

app.use("/users", (req, res) => {
  getAllUsers((result) => {});
  res.send("Users");
});

app.use("/delete", (req, res) => {
  deleteTimeEntry("0", (result) => {});
  res.send("Delete");
});

app.use("/test", (req, res) => {
  // clockIn("6", {
  //   clock_in: "2024-08-29 17:17:00",
  // });
  updateClockOut("6", {
    clock_out: "2024-08-29 23:33:00",
  });
  res.send("Tester");
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
