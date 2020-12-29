const express = require("express");
const router = new express.Router();
const {
  signIn,
  signUp,
  resetPass,
} = require("../controllers/authController/userController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/resetpass", resetPass);

module.exports = {
  routes: router,
};
