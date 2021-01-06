const express = require("express");
const router = new express.Router();
const {
  getUserInfo,
  updateProfile,
  signOut,
} = require("../controllers/auth-controller/user.controller");

router.get("/userinfo", getUserInfo);
router.post("/updateprofile", updateProfile);
router.post("/signout", signOut);

module.exports = {
  routes: router,
};
