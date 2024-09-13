const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const clockingRoutes = require("./routes/clockingRoutes");
const {
  insertTimeEntry,
  getTimeEntriesByDate,
  deleteTimeEntry,
  updateClockOut,
  clockIn,
} = require("./models/clockingModel");
const { getAllUsers } = require("./models/userModel");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", clockingRoutes);

app.use("/insert", (req, res) => {
  insertTimeEntry({
    user_id: "6",
    entry_date: "2024-08-29",
    clock_in: "2024-08-29 08:00:00",
    clock_out: null,
  });
  res.send("Inserting data");
});


app.use("/get/6/2024-08-28/2024-08-31", (req, res) => {

  getTimeEntriesByDate('05fa90d1978e55fd', '2024-08-28', '2024-09-12',()=>{});

  res.send("Getting data");
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
