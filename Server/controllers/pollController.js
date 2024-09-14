const pollModel = require("../models/pollModel");

const insertPoll = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  pollModel.insertPoll(id, data, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.status(200).json(results);
  });
};
const updatePoll = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  pollModel.updatePoll(id, data, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.status(200).json(results);
  });
};

const getPolls = (req, res) => {

  pollModel.getPolls((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching data", error: err });
    }
    res.status(200).send(results);
  });
};

module.exports = {
    insertPoll,
    updatePoll,
    getPolls
}