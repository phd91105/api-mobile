const admin = require("firebase-admin");

module.exports = (req, res) => {
    admin
      .auth()
      .getUser(req["userID"])
      .then((userRecord) => {
        res.status(200).json(userRecord);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  }