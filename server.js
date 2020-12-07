const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
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
    accesstoken = user.user.ya;
    refreshtoken = user.user.refreshToken;
    // res.status(201).json({ accessToken: accesstoken, refreshToken: refreshtoken });
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
    var token = req.headers.authorization.split(' ')[1];
    if (token == accesstoken) {
      return next();
    }
    else {
      return res.status(403).send({ message: 'Invalid Token' })
    }
  }
  else {
    return res.status(403).send({ message: 'Unauthorized' });
  }
});

app.use('/api', noteRoutes.routes);

app.set("port", process.env.PORT);
app.listen(app.get("port"), function () {
  console.log(
    "Server listening at port %d ",
    app.get("port")
  );
});
