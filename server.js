const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");
const categoryRoutes = require("./routes/category-routes");
const noteRoutes = require("./routes/note-routes");
const userService = require("./models/userService");
const admin = require("firebase-admin");
const serviceAccount = require("./api-node-c2241-firebase-adminsdk-4ukq8-c75d4c4d65.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://api-node-c2241-default-rtdb.firebaseio.com",
});
firebase.auth().languageCode = "vi";
app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
/** **************************************/
app.get("/", (req, res) => {
  res.send(`Server is listening at port ${app.get("port")}`);
});
/** **************************************/
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
/** **************************************/
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticate(email, password);
    res.status(200).json({
      accessToken: user.user.ya,
      refreshToken: user.user.refreshToken,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
/** **************************************/
app.post("/api/resetpass", async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetPass(email);
    res.status(200).json({
      message: "An email has been sent. Please check your inbox",
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});
/** ************ middleware ***************/
app.use(async (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0].toLowerCase() === "bearer"
  ) {
    const idToken = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      // req["currentUser"] = decodedToken;
      req["userID"] = decodedToken.uid;
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  } else {
    return res.status(403).send({ error: "Unauthorized" });
  }
  next();
});
/** **************************************/
app.use("/api", noteRoutes.routes);
app.use("/api", categoryRoutes.routes);
app.get("/api/userinfo", (req, res) => {
  admin
    .auth()
    .getUser(req["userID"])
    .then((userRecord) => {
      res.status(200).json(userRecord);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});
app.post("/api/updateprofile", (req, res) => {
  admin
    .auth()
    .updateUser(uid, {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      photoURL: req.body.photoURL,
    })
    .then((userRecord) => {
      res.status(200).json(userRecord);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});
/** **************************************/
app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log("Server listening at port %d ", app.get("port"));
});
