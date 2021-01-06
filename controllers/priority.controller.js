const firebase = require("../config/db");
const Priority = require("../models/priority");
const firestore = firebase.firestore();

const addPriority = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      uid: req["userID"],
      priority_name: body.priority_name,
    };
    const priority = await firestore.collection("priority").doc().set(data);
    res.status(201).send({
      status: "ok",
      message: "create priority successful!",
      data: priority,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPriority = async (req, res) => {
  try {
    const priority = await firestore.collection("priority");
    var data = await priority.where("uid", "==", req["userID"]).get();
    const priorityArray = [];
    data.forEach((doc) => {
      const priority = new Priority(
        doc.id,
        doc.data().uid,
        doc.data().priority_name
      );
      priorityArray.push(priority);
    });
    res.send({ status: "ok", data: priorityArray });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updatePriority = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
      const priority = await firestore.collection("priority").doc(id).get();
    await priority.update(body);
    res.send({ message: "Priority record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deletePriority = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("priority").doc(id).delete();
    res.send({ message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addPriority,
  getAllPriority,
  updatePriority,
  deletePriority,
};
