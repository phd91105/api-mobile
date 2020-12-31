require("firebase/auth");
require("../models/config");
const admin = require("firebase-admin");
const serviceAccount = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}
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
