const express = require("express");
const router = express.Router();
const { insertPoll, getPolls , updatePoll} = require("../controllers/pollController");

// create a new poll entry
router.post("/insert-poll/:id", insertPoll);
router.get("/get-poll", getPolls);
router.post("/update-poll/:id", updatePoll);

module.exports = router;
