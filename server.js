const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const firebase = require("firebase");

const noteRoutes = require('./routes/note-routes');
const scheduleRoutes = require('./routes/schedule-routes');
const userService = require("./models/user_service");

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

/****************************************/
app.get("/", (req, res) => {
  res.send(`Server is listening at port ${app.get("port")}`);
});

/****************************************/
app.use('/api', scheduleRoutes.routes);

/****************************************/
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/****************************************/
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await userService.authenticate(email, password);
    currentuser = user.user;
    // var accesstoken = jwt.sign({ uid: user.user.uid, email: user.user.email, name: user.user.displayName, photoUrl: user.user.photoUrl }, 'secret-key', { algorithm: 'HS256', expiresIn: '1d' });
    res.status(200).json({ email: currentuser.email, accessToken: currentuser.ya, refreshToken: currentuser.refreshToken });
    // res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/****************************************/
app.post("/api/resetpass", async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetPass(email);
    res.status(200).json({ message: "link has been sent! check your inbox to reset password" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

/********* middleware verify token *******/
// app.use(function (req, res, next) {
//   if (req.headers && req.headers.authorization && String(req.headers.authorization.split(' ')[0]).toLowerCase() === 'bearer') {
//     var token = req.headers.authorization.split(' ')[1];
//     var decodetoken = jwt.decode(token);
//     uid = decodetoken.uid;
//     email = decodetoken.email;
//     displayName = decodetoken.displayName;
//     jwt.verify(token, 'secret-key', function (err, decode) {
//       if (err) {
//         return res.status(403).send({ message: 'token invalid' });
//       }
//       else return next();
//     });
//   }
//   else {
//     return res.status(403).send({ message: 'Unauthorized' })
//   }
// });

app.use(function (req, res, next) {
  uid = currentuser.uid;
  next();
})

/****************************************/
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    app.use('/api', noteRoutes.routes);
  } else {

  }
});

/****************************************/
app.set("port", process.env.PORT);
app.listen(app.get("port"), function () {
  console.log(
    "Server listening at port %d ",
    app.get("port")
  );
});
