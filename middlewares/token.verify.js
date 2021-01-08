// require("../config/config");
// var rp = require("request-promise");
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccount.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://api-node-c2241-default-rtdb.firebaseio.com",
// });

// module.exports = async (req, res, next) => {
//   if (req.headers && req.headers.authorization) {
//     var options = {
//       method: "POST",
//       uri:
//         "https://securetoken.googleapis.com/v1/token?key=AIzaSyApawbw1_-ArVvpxMGNbIqgFMNZlvsMj1I",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       form: {
//         grant_type: "refresh_token",
//         refresh_token: req.headers.authorization,
//       },
//     };
//     try {
//       let idToken = await rp(options);
//       let tk = JSON.parse(idToken).access_token;
//       let decodedToken = await admin.auth().verifyIdToken(tk);
//       req["userID"] = decodedToken.uid;
//       next();
//     } catch (err) {
//       res.status(400).send(JSON.parse(err.response.body));
//     }
//   } else {
//     return res.status(403).send({ error: "Unauthorized" });
//   }
// };
require("../config/config");
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
      req["userID"] = decodedToken.uid;
    } catch (err) {
      // console.log("error");
    }
  } else {
    return res.status(403).send({ error: "Unauthorized" });
  }
  next();
};
