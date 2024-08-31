const express = require("express");
const router = express.Router();
const clockingController = require("../controllers/clockingController");

// create a new time entry
router.post("/logHours/", clockingController.createTimeEntry);

// update an existing time entry's clock-in time
router.put("/logHours/clockIn/:id/", clockingController.clockIn);

// update an existing time entry's clock-out time
router.put("/logHours/clockOut/:id/", clockingController.updateClockOut);

// get time entries for a specific user and / or date
router.get(
	"/logHours/getUser/:id/:start/:end",
	clockingController.getTimeEntriesByDate
);

router.post("/logHours/setDuration/", clockingController.setDuration);

// delete a time entry
router.delete("/time-entries/:id", clockingController.deleteTimeEntry);

module.exports = router;
