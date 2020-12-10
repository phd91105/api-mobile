const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
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
    currentuser = firebase.auth().currentUser;
    res.status(200).json({ uid: currentuser.uid, email: currentuser.email, displayName: currentuser.displayName, photoURL: currentuser.photoURL, accessToken: currentuser.ya, refreshToken: currentuser.refreshToken });
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
/************* middleware ****************/
app.use(function (req, res, next) {
  try {
    uid = currentuser.uid;
    next();
  }
  catch (e) {
    res.send({ error: e.message });
  }
})
/************ firebase auth ***************/
firebase.auth().languageCode = 'vi';
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    app.use('/api', noteRoutes.routes);
    app.post('/api/updateprofile', (req, res) => {
      currentuser.updateProfile({
        displayName: req.body.displayName,
        photoURL: req.body.photoURL,
      }).then(function () {
        // Update successful.
        res.send({ message: 'update profile successful', body: req.body })
      }).catch(function (error) {
        // An error happened.
        res.send({ errror: error.message })
      });
    });
    app.get('/api/getuserinfo', (req, res) => {
      body = {
        displayname: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        emailVerified: user.emailVerified,
        uid: user.uid,
      };
      res.send(body);
    });
    app.post('/api/verifyemail', (req, res) => {
      user.sendEmailVerification().then(function () {
        // Email sent.
        res.send({ message: 'verify email sent, check your inbox' })
      }).catch(function (error) {
        // An error happened.
        res.send({ errror: error.message })
      });
    });
    app.post('/api/changepass', (req, res) => {
      user.updatePassword(req.body.password).then(function () {
        // Update successful.
        res.send({ message: 'password changed' });
      }).catch(function (error) {
        // An error happened.
        res.send({ error: error.message });
      });
    });
  } else {
    // console.log('error 1');
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
