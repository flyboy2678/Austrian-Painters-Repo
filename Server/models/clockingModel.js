const connection = require("../config/db");

// inserts a time entry
// user_id will reference Emp_id
// on initial
const insertTimeEntry = (data) => {
  const query = `
      INSERT INTO time_entries (user_id, entry_date, clock_in, clock_out)
      VALUES (?, ?, ?, ?)
    `;

  connection.query(
    query,
    [data.user_id, data.entry_date, data.clock_in, data.clock_out],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }

      console.log("Data inserted successfully:", results.insertId);
    }
  );
};

const clockIn = (user_id, data) => {
  const query = `
      INSERT INTO time_entries (user_id, clock_in)
      VALUES (?, ?)
    `;

  connection.query(query, [user_id, data.clock_in], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      return;
    }
    console.log(
      "Clock-in successful, new entry created with ID:",
      results.insertId
    );
  });
};

// updates the clockout
const updateClockOut = (user_id, data) => {
  const query = `
      UPDATE time_entries
      SET clock_out = ?, 
          duration = TIMEDIFF(GREATEST(?, clock_in), LEAST(?, clock_in))
      WHERE user_id = ? AND clock_out IS NULL
      ORDER BY id DESC LIMIT 1;
    `;

  connection.query(
    query,
    [data.clock_out, data.clock_out, data.clock_out, user_id],
    (err, results) => {
      if (err) {
        console.error("Error updating data:", err);
        return;
      }
      console.log("Data updated successfully:", results.affectedRows);
    }
  );
};

function addOneDay(entry_date) {
  const date = new Date(entry_date); // Convert entry_date to a Date object
  date.setDate(date.getDate() + 1); // Add one day
  const nextDay = date.toISOString().split("T")[0]; // Convert back to YYYY-MM-DD format
  return nextDay;
}

const getTimeEntriesByDate = (user_id, start, end, callback) => {
  var query = null;
  if (start == null) {
    query = `
      SELECT * FROM time_entries
      WHERE user_id = ?
      ORDER BY entry_date ASC;
	  `;
  } else if (end == null) {
    start = addOneDay(start);

    query = `
      SELECT * FROM time_entries
      WHERE user_id = ? AND entry_date = ?
      ORDER BY entry_date ASC;
    `;
  } else if (start != null && end != null) {
    start = addOneDay(start);
    end = addOneDay(end);

    query = `
      SELECT * FROM time_entries
      WHERE user_id = ? AND entry_date BETWEEN ? AND ?
      ORDER BY entry_date ASC;
    `;
  }

  connection.query(
    query,[user_id, start, end],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return;
      }
      console.log("Time entries:", results);
      callback(null, results);
    }
  );
};

const setDuration = (data, callback) => {
  const query = `INSERT INTO time_entries (user_id, entry_date, hours) VALUES (?, ?, ?)`;

  connection.query(
    query,
    [data.id, data.day, data.duration],
    (err, results) => {
      if (err) {
        console.error("Error setting duration:", err);
        callback(err, null);
        return;
      }
      console.log("Duration set successfully:", results.affectedRows);
      callback(null, results);
    }
  );
};

const deleteTimeEntry = (entryId, callback) => {
  const query = `DELETE FROM time_entries WHERE id = ?`;

  connection.query(query, [entryId], (err, results) => {
    if (err) {
      console.error("Error deleting time entry:", err);
      callback(err, null);
      return;
    }
    console.log("Time entry deleted successfully:", results.affectedRows);
    callback(null, results);
  });
};

module.exports = {
  insertTimeEntry,
  clockIn,
  updateClockOut,
  getTimeEntriesByDate,
  setDuration,
  deleteTimeEntry,
};
