const timeEntryModel = require("../models/clockingModel");

// insert a new time entry
exports.createTimeEntry = (req, res) => {
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
exports.clockIn = (req, res) => {
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
exports.updateClockOut = (req, res) => {
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
exports.getTimeEntriesByDate = (req, res) => {
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

exports.setDuration = (req, res) => {
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
exports.deleteTimeEntry = (req, res) => {
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
