const express = require("express");
const router = express.Router();
const {
	createTimeEntry,
	clockIn,
	setDuration,
	updateClockOut,
	getHours,
	getTimeEntriesByDate,
	deleteTimeEntry,
	updateHours
  } = require("../controllers/clockingController");
const { verifyToken } = require("../middleware/authMiddleware");
// create a new time entry
router.post("/logHours/", verifyToken, createTimeEntry);

// update an existing time entry's clock-in time
router.put("/logHours/clockIn/:id/", verifyToken, clockIn);

// update an existing time entry's clock-out time
router.put(
	"/logHours/clockOut/:id/",
	verifyToken,
	updateClockOut
);

// get time entries for a specific user and / or date
router.get(
	"/logHours/getUser/:id/:start/:end",
	verifyToken,
	getTimeEntriesByDate
);

router.get("/logHours/getHours/:id", verifyToken, getHours);

router.post(
	"/logHours/setDuration/",
	verifyToken,
	setDuration
);

router.put(
	"/logHours/updateHours/",
	verifyToken,
	updateHours
);
// delete a time entry
router.delete(
	"/time-entries/:id",
	verifyToken,
	deleteTimeEntry
);

module.exports = router;
