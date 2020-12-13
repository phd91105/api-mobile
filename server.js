const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebase = require('firebase');

const categoryRoutes = require('./routes/category-routes');
const noteRoutes = require('./routes/note-routes');
const scheduleRoutes = require('./routes/schedule-routes');
const userService = require('./models/user_service');

app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

/** **************************************/
app.get('/', (req, res) => {
  res.send(`Server is listening at port ${app.get('port')}`);
});
/** **************************************/
app.use('/api', scheduleRoutes.routes);
/** **************************************/
app.post('/api/signup', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
/** **************************************/
app.post('/api/signin', async (req, res) => {
  const {email, password} = req.body;
  try {
    await userService.authenticate(email, password);
    currentuser = firebase.auth().currentUser;
    res.status(200).json({
      accessToken: currentuser.ya,
      refreshToken: currentuser.refreshToken,
    });
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
/** **************************************/
app.post('/api/resetpass', async (req, res) => {
  const {email} = req.body;
  try {
    await userService.resetPass(email);
    res.status(200).json({
      message: 'link has been sent! check your inbox to reset password',
    });
  } catch (err) {
    res.status(401).json({error: err.message});
  }
});
/** ************ middleware ***************/
app.use((req, res, next) => {
  try {
    uid = currentuser.uid;
    next();
  } catch (e) {
    res.status(401).send({error: e.message});
  }
});
/** ********** firebase auth ***************/
firebase.auth().languageCode = 'vi';
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    app.use('/api', noteRoutes.routes);
    app.use('/api', categoryRoutes.routes);
    app.post('/api/updateprofile', (req, res) => {
      currentuser
          .updateProfile({
            displayName: req.body.displayName,
            photoURL: req.body.photoURL,
          })
          .then(() => {
            // Update successful.
            res.send({message: 'update profile successful', body: req.body});
          })
          .catch((error) => {
            // An error happened.
            res.send({errror: error.message});
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
      user
          .sendEmailVerification()
          .then(() => {
            // Email sent.
            res.send({message: 'verify email sent, check your inbox'});
          })
          .catch((error) => {
            // An error happened.
            res.send({errror: error.message});
          });
    });
    app.post('/api/changepass', (req, res) => {
      user
          .updatePassword(req.body.password)
          .then(() => {
            // Update successful.
            res.send({message: 'password changed'});
          })
          .catch((error) => {
            // An error happened.
            res.send({error: error.message});
          });
    });
  }
});
/** **************************************/
app.set('port', process.env.PORT);
app.listen(app.get('port'), () => {
  console.log('Server listening at port %d ', app.get('port'));
});
