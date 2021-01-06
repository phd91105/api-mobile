const express = require("express");
const {
  addNote,
  getAllNotes,
  getNote,
  getCount,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");

const router = new express.Router();

router.post("/note", addNote);
router.get("/notes", getAllNotes);
router.get("/note/:id", getNote);
router.put("/note/:id", updateNote);
router.delete("/note/:id", deleteNote);
router.get("/count", getCount);

module.exports = {
  routes: router,
};
