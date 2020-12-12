const firebase = require("../models/db");
const Note = require("../models/note");
const firestore = firebase.firestore();

const addNote = async (req, res, next) => {
  try {
    const body = req.body;
    const data = {
      uid: uid,
      category: body.category,
      title: body.title,
      body: body.body,
      created_at: Date.now(),
      updated_at: null,
      expires_at: body.expires_at,
      status: body.status,
    };
    const note = await firestore.collection("notes").doc().set(data);
    res.status(201).send({ message: "create note successful!", data: note });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const param = req.query.category;
    const notes = await firestore.collection("notes");
    if (param == undefined) {
      var data = await notes.where("uid", "==", uid).get();
    } else {
      var data = await notes
        .where("uid", "==", uid)
        .where("category", "==", param)
        .get();
    }
    const notesArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No note record found" });
    } else {
      data.forEach((doc) => {
        const note = new Note(
          doc.id,
          doc.data().uid,
          doc.data().category,
          doc.data().title,
          doc.data().body,
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
};

const getNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await firestore.collection("notes").doc(id);
    const data = await note.where("uid", "==", uid).get();
    if (!data.exists) {
      res.status(404).send({ message: "Note with the given ID not found" });
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = {
      category: body.category,
      title: body.title,
      body: body.body,
      updated_at: Date.now(),
      expires_at: body.expires_at,
      status: body.status,
    };
    const note = await firestore.collection("notes").doc(id);
    await note.update(data);
    res.send({ message: "Note record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("notes").doc(id).delete();
    res.send({ message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
};
