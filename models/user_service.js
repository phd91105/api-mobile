const firebase = require("firebase/app");
require("firebase/auth");
require('./config');
const db = require("./db")

exports.addUser = (email, password) =>
  db.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  db.auth().signInWithEmailAndPassword(email, password);

exports.signout = () =>
  db.auth().signOut();