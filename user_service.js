const firebase = require("firebase/app");
require("firebase/auth");
// require('./config');
// const db = require("./db")

const apiKey = process.env.API_KEY;
const fb = firebase.initializeApp({
  apiKey: apiKey,
});

exports.addUser = (email, password) =>
  fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  fb.auth().signInWithEmailAndPassword(email, password);
