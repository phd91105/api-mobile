const userService = require("./user.service");
const admin = require("firebase-admin");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.addUser(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticate(email, password);
    res.status(200).json({
      accessToken: user.user.ya,
      refreshToken: user.user.refreshToken,
      type: "bearer token",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const resetPass = async (req, res) => {
  const { email } = req.body;
  try {
    await userService.resetPass(email);
    res.status(200).json({
      message: "An email has been sent. Please check your inbox",
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
const getUserInfo = (req, res) => {
  admin
    .auth()
    .getUser(req["userID"])
    .then((userRecord) => {
      res.status(200).json(userRecord);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};
const updateProfile = (req, res) => {
  admin
    .auth()
    .updateUser(req["userID"], {
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
};
const signOut = (req, res) => {
  admin
    .auth()
    .revokeRefreshTokens(req["userID"])
    .then(() => {
      res.send({ message: "Token revoked" });
    });
};

module.exports = {
  signUp,
  signIn,
  resetPass,
  getUserInfo,
  updateProfile,
  signOut,
};
