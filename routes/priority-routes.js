const express = require("express");
const {
  addPriority,
  getAllPriority,
  updatePriority,
  deletePriority,
} = require("../controllers/priorityController");

const router = new express.Router();

router.post("/priority", addPriority);
router.get("/priority", getAllPriority);
router.put("/priority/:id", updatePriority);
router.delete("/priority/:id", deletePriority);

module.exports = {
  routes: router,
};
