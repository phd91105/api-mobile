const express = require("express");
const {
  addStatus,
  getAllStatus,
  getStatus,
  updateStatus,
  deleteStatus,
} = require("../controllers/status.controller");

const router = new express.Router();

router.post("/status", addStatus);
router.get("/status", getAllStatus);
router.get("/status/:id", getStatus);
router.put("/status/:id", updateStatus);
router.delete("/status/:id", deleteStatus);

module.exports = {
  routes: router,
};
