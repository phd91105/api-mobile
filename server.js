const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const firebase = require("firebase");
const noteRoutes = require('./routes/note-routes');
app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const userService = require("./models/user_service");

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await userService.authenticate(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    app.use('/api', noteRoutes.routes);
  } else {
    // No user is signed in.
  }
});

app.set("port", process.env.PORT);
app.listen(app.get("port"), function () {
  console.log(
    "Server listening at port %d ",
    app.get("port")
  );
});
