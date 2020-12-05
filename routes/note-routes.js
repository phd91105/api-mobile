const express = require('express');
const { addNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
} = require('../controllers/noteController');

const router = express.Router();

router.post('/note', addNote);
router.get('/notes', getAllNotes);
router.get('/note/:id', getNote);
router.put('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);


module.exports = {
    routes: router
}