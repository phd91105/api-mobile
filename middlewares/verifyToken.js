require("firebase/auth");
require("../models/config");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-node-c2241-default-rtdb.firebaseio.com",
});

module.exports = async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0].toLowerCase() === "bearer"
  ) {
    let idToken = req.headers.authorization.split(" ")[1];
    try {
      let decodedToken = await admin.auth().verifyIdToken(idToken);
      req["currentUser"] = decodedToken;
      req["userID"] = decodedToken.uid;
    } catch (err) {
      console.log("error");
    }
  } else {
    return res.status(403).send({ error: "Unauthorized" });
  }
  next();
};
