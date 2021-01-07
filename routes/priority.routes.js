const express = require("express");
const {
  addPriority,
  getAllPriority,
  updatePriority,
  getPriority,
  deletePriority,
} = require("../controllers/priority.controller");

const router = new express.Router();

router.post("/priority", addPriority);
router.get("/priority", getAllPriority);
router.get("/priority/:id", getPriority);
router.put("/priority/:id", updatePriority);
router.delete("/priority/:id", deletePriority);

module.exports = {
  routes: router,
};
