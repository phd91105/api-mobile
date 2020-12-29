require("firebase/app");
require("firebase/auth");
require("../../models/config");
const db = require("../../models/db");

exports.addUser = (email, password) =>
  db.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  db.auth().signInWithEmailAndPassword(email, password);

exports.resetPass = (email) => db.auth().sendPasswordResetEmail(email);
