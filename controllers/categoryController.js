const firebase = require("../models/db");
const Category = require("../models/category");
const firestore = firebase.firestore();

const addCategory = async (req, res) => {
  try {
    const body = req.body;
    const data = {
      uid: req["userID"],
      cate_name: body.cate_name,
    };
    const category = await firestore.collection("categories").doc().set(data);
    res.status(201).send({
      status: "ok",
      message: "create category successful!",
      data: category,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await firestore.collection("categories");
    var data = await categories.where("uid", "==", req["userID"]).get();
    const categoriesArray = [];
    if (data.empty) {
      res.status(404).send({ message: "No category record found" });
    } else {
      data.forEach((doc) => {
        const category = new Category(
          doc.id,
          doc.data().uid,
          doc.data().cate_name
        );
        categoriesArray.push(category);
      });
      res.send({ status: "ok", data: categoriesArray });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await firestore.collection("categories").doc(id).get();
    if (!data.exists) {
      res.status(404).send({ message: "Category with the given ID not found" });
    } else {
      res.send({ status: "ok", data: data.data() });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const category = await firestore.collection("categories").doc(id);
    await category.update(body);
    res.send({ message: "Category record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("categories").doc(id).delete();
    res.send({ message: "Record deleted successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
