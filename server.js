const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const noteRoutes = require('./routes/note-routes');
const jwt = require('jsonwebtoken');
app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const userService = require("./user_service");

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
    var token = jwt.sign(user, '123', { algorithm: 'HS256', expiresIn: '1h' });
    res.json({ access_token: token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// app.use(function (req, res, next) {

//   if (req.headers && req.headers.authorization && String)
// });

app.use('/api', noteRoutes.routes);

app.set("port", process.env.PORT);
app.set("ip", process.env.IP || "localhost");
app.listen(app.get("port"), app.get("ip"), function () {
  console.log(
    "Chat bot server listening at %s:%d ",
    app.get("ip"),
    app.get("port")
  );
});
