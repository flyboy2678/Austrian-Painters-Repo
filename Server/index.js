const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the Home Page");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
