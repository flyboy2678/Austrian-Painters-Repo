const timeEntryModel = require("../models/clockingModel");

// insert a new time entry
const createTimeEntry = (req, res) => {
  const data = req.body;
  timeEntryModel.insertTimeEntry(data, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error inserting data", error: err });
    }

    res.status(201).json({
      message: "Data inserted successfully",
      id: data.user_id,
    });
  });
};

// update an existing time entry's clock-out time
const clockIn = (req, res) => {
  timeEntryModel.clockIn(
    // gets id and clockout from the parameters
    req.params.id,
    req.body,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating data", error: err });
      }
      res.status(200).json({
        message: "Data Clock-Out updated successfully",
        affectedRows: results.affectedRows,
      });
    }
  );
};

// update an existing time entry's clock-out time
const updateClockOut = (req, res) => {
  timeEntryModel.updateClockOut(
    // gets id and clockout from the parameters
    req.params.id,
    req.body,
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating data", error: err });
      }
      res.status(200).json({
        message: "Data Clock-Out updated successfully",
        affectedRows: results.affectedRows,
      });
    }
  );
};


// get time entries for a specific date and user
const getTimeEntriesByDate = (req, res) => {
  const { id, start, end } = req.params;
  timeEntryModel.getTimeEntriesByDate(id, start, end, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.status(200).json(results);
  });
};

const setDuration = (req, res) => {
  const data = req.body;
  timeEntryModel.setDuration(data, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.status(200).json(results);
  });
};

// delete a time entry
const deleteTimeEntry = (req, res) => {
  const { entryId } = req.params;
  timeEntryModel.deleteTimeEntry(entryId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting time entry", error: err });
    }
    res.status(200).json({
      message: "Time entry deleted successfully",
      affectedRows: results.affectedRows,
    });
  });
};

const getHours = (req, res) => {
	const user_id = req.params.id;
	timeEntryModel.getHours(user_id, (err, results) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Error fetching data", error: err });
		}
		res.status(200).json(results);
	});
};

const updateHours = (req, res) => {
	const data = req.body;
	timeEntryModel.updateHours(data, (err, results) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "Error updating hours", error: err });
		}
		res.status(200).json({
			message: "Hours updated successfully",
			affectedRows: results.affectedRows,
		});
	});
};

module.exports = {
  createTimeEntry,
  clockIn,
  setDuration,
  updateClockOut,
  getHours,
  getTimeEntriesByDate,
  deleteTimeEntry,
  updateHours
}