const express = require("express");
const router = express.Router();
const clockingController = require("../controllers/clockingController");
const { verifyToken } = require("../middleware/authMiddleware");
// create a new time entry
router.post("/logHours/", verifyToken, clockingController.createTimeEntry);

// update an existing time entry's clock-in time
router.put("/logHours/clockIn/:id/", verifyToken, clockingController.clockIn);

// update an existing time entry's clock-out time
router.put(
	"/logHours/clockOut/:id/",
	verifyToken,
	clockingController.updateClockOut
);

// get time entries for a specific user and / or date
router.get(
	"/logHours/getUser/:id/:start/:end",
	verifyToken,
	clockingController.getTimeEntriesByDate
);

router.get("/logHours/getHours/:id", verifyToken, clockingController.getHours);

router.post(
	"/logHours/setDuration/",
	verifyToken,
	clockingController.setDuration
);

router.put(
	"/logHours/updateHours/",
	verifyToken,
	clockingController.updateHours
);
// delete a time entry
router.delete(
	"/time-entries/:id",
	verifyToken,
	clockingController.deleteTimeEntry
);

module.exports = router;
