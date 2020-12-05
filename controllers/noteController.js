'use strict';

const firebase = require('../db');
const Note = require('../models/note');
const firestore = firebase.firestore();


const addNote = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('notes').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await firestore.collection('notes');
        const data = await notes.get();
        const notesArray = [];
        if (data.empty) {
            res.status(404).send('No note record found');
        } else {
            data.forEach(doc => {
                const note = new Note(
                    doc.id,
                    doc.data().body,
                    doc.data().attachment,
                    doc.data().author,
                    doc.data().created_at,
                    doc.data().updated_at,
                    doc.data().expires_at,
                    doc.data().status
                );
                notesArray.push(note);
            });
            res.send(notesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const note = await firestore.collection('notes').doc(id);
        const data = await note.get();
        if (!data.exists) {
            res.status(404).send('Note with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const note = await firestore.collection('notes').doc(id);
        await note.update(data);
        res.send('Note record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteNote = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('notes').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
}