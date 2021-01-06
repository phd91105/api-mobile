const firebase = require("../config/db");
const Status = require("../models/status");
const firestore = firebase.firestore();

const addStatus = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      uid: req["userID"],
      status_name: body.status_name,
    };
    const status = await firestore.collection("status").doc().set(data);
    res.status(201).send({
      status: "ok",
      message: "create status successful!",
      data: status,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllStatus = async (req, res) => {
  try {
    const status = await firestore.collection("status");
    var data = await status.where("uid", "==", req["userID"]).get();
    const statusArray = [];

    data.forEach((doc) => {
      const status = new Status(doc.id, doc.data().uid, doc.data().status_name);
      statusArray.push(status);
    });
    res.send({ status: "ok", data: statusArray });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const status = await firestore.collection("status").doc(id).get();
    await status.update(body);
    res.send({ message: "Status record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteStatus = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("status").doc(id).delete();
    res.send({ message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addStatus,
  getAllStatus,
  updateStatus,
  deleteStatus,
};
