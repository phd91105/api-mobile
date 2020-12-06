const firebase = require("firebase/app");
require("firebase/auth");
require('./config');
const db = require("./db")

// const apiKey = process.env.API_KEY;
// const fb = firebase.initializeApp({
//   apiKey: apiKey,
// });

exports.addUser = (email, password) =>
  db.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  db.auth().signInWithEmailAndPassword(email, password);
