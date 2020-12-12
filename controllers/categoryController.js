const firebase = require("../models/db");
const Category = require("../models//category");
const firestore = firebase.firestore();

const addCategory = async (req, res, next) => {
  try {
    const body = req.body;
    const data = {
      uid: uid,
      cate_name: body.cate_name,
    };
    const category = await firestore.collection("categories").doc().set(data);
    res
      .status(201)
      .send({ message: "create category successful!", data: category });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await firestore.collection("categories");
    var data = await categories.where("uid", "==", uid).get();
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
      res.send(categoriesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = await firestore.collection("categories").doc(id);
    const data = await category.where("uid", "==", uid).get();
    if (!data.exists) {
      res.status(404).send({ message: "Category with the given ID not found" });
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = {
      cate_name: body.cate_name,
    };
    const category = await firestore.collection("categories").doc(id);
    await category.update(data);
    res.send({ message: "Category record updated successfuly" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCategory = async (req, res, next) => {
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
