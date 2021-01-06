const express = require("express");
const {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = new express.Router();

router.post("/category", addCategory);
router.get("/categories", getAllCategories);
router.get("/category/:id", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = {
  routes: router,
};
