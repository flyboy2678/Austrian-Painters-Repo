const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// use the userRoutes for all routes starting with /api
app.use("/api", userRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to the Home Page");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
