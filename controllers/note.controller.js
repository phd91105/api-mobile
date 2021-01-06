const firebase = require("../config/db");
const Note = require("../models/note");
const firestore = firebase.firestore();

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  let date = a.getDate(),
    month = a.getMonth() + 1,
    year = a.getFullYear(),
    hour = a.getHours() + 7,
    min = a.getMinutes(),
    time = `${addZero(hour)}:${addZero(min)} ${addZero(date)}/${addZero(month)}/${year}`;
  return time;
}
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const addNote = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      uid: req["userID"],
      category: body.category,
      title: body.title,
      body: body.body,
      created_at: timeConverter(Date.now()),
      update_at: null,
      expires_at: body.expires_at,
      priority: body.priority,
      status: body.status,
    };
    const note = await firestore.collection("notes").doc().set(data);
    res
      .status(201)
      .send({ status: "ok", message: "create note successful!", data: note });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllNotes = async (req, res) => {
  try {
    const category = req.query.category;
    const notes = await firestore.collection("notes");
    if (category) {
      var data = await notes
        .where("uid", "==", req["userID"])
        .where("category", "==", category)
        .get();
    } else {
      data = await notes.where("uid", "==", req["userID"]).get();
    }
    const notesArray = [];
    data.forEach((doc) => {
      const note = new Note(
        doc.id,
        doc.data().uid,
        doc.data().category,
        doc.data().title,
        doc.data().body,
        doc.data().created_at,
        doc.data().update_at,
        doc.data().expires_at,
        doc.data().priority,
        doc.data().status
      );
      notesArray.push(note);
    });
    res.send({
      status: "ok",
      data: notesArray,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getCount = async (req, res) => {
  try {
    var sts = [];
    const notes = await firestore.collection("notes");
    var data = await notes.where("uid", "==", req["userID"]).get();
    const notesArray = [];
    data.forEach((doc) => {
      const note = new Note(
        doc.id,
        doc.data().uid,
        doc.data().category,
        doc.data().title,
        doc.data().body,
        doc.data().created_at,
        doc.data().update_at,
        doc.data().expires_at,
        doc.data().priority,
        doc.data().status
      );
      notesArray.push(note);
    });
    for (var i in notesArray) {
      sts.push(notesArray[i].status);
    }
    var result = sts.reduce(function (p, c) {
      if (c in p) {
        p[c]++;
      } else {
        p[c] = 1;
      }
      return p;
    }, {});
    res.send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getNote = async (req, res) => {
  try {
    var arr = [];
    const id = req.params.id;
    const data = await firestore.collection("notes").doc(id).get();
    if (!data.exists) {
      res.status(404).send({ message: "Note with the given ID not found" });
    } else {
      arr.push(data.data());
      arr[0].id = id;
      res.send({ status: "ok", data: arr[0] });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const note = await firestore.collection("notes").doc(id);
    await note.update(body);
    res.send({ message: "Note record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteNote = async (req, res) => {
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
  getCount,
  updateNote,
  deleteNote,
};
