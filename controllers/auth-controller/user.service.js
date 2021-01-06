require("firebase/app");
require("../../config/config");
const db = require("../../config/db");

exports.addUser = (email, password) =>
  db.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
  db.auth().signInWithEmailAndPassword(email, password);

exports.resetPass = (email) => db.auth().sendPasswordResetEmail(email);
