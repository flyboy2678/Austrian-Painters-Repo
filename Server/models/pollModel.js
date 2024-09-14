const connection = require("../config/db");

const insertPoll = (user_id, data) => {
  const query = `INSERT INTO polls (user_id, name_and_surname, poll_data) VALUES (?, ?, ?)`;

  connection.query(
    query,
    [user_id, data.name_and_surname, JSON.stringify(data.poll_data)],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return;
      }
      console.log("Poll entries:", results);
    }
  );
};
const updatePoll = (id, data,callback) => {
  const query = `UPDATE polls SET poll_data = ? WHERE id = ?`;
  console.log(data.poll_data);
  connection.query(
    query,
    [JSON.stringify(data.poll_data), id],
    (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return;
      }
      callback(null, results);
      console.log("Poll entries:", results);
    }
  );
};

const getPolls = (callback) => {
  const query = `SELECT * FROM polls ORDER BY created_at DESC`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return;
    }
    callback(null, results);
    console.log("Poll entries:", results);
  });
};

module.exports = {
  insertPoll,
  updatePoll,
  getPolls,
};
