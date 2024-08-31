const express = require("express");
const router = express.Router();
const clockingController = require("../controllers/clockingController");

// create a new time entry
router.post("/logHours/", clockingController.createTimeEntry);

// update an existing time entry's clock-in time
router.put("/logHours/clockIn/:id/", clockingController.clockIn);

// update an existing time entry's clock-out time
router.put("/logHours/clockOut/:id/", clockingController.updateClockOut);

// get time entries for a specific date and user
router.get(
	"/time-entries/getUser/:id",
	clockingController.getTimeEntriesByDate
);

router.post("/setDuration/", clockingController.setDuration);

// delete a time entry
router.delete("/time-entries/:id", clockingController.deleteTimeEntry);

module.exports = router;
