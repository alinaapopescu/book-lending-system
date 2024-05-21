const Category = require('../models/Category'); 
const Book = require('../models/Book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.addCategory = async (req, res) => {
  try {
    const { category_name, rating } = req.body;
    const category = await Category.create({ category_name, rating });
    res.status(201).send({ message: 'Category added successfully', category });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send({ message: 'Error adding category', error });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    await Book.update({ category_id: null }, { where: { category_id: id } });
    await category.destroy();
    res.send({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send({ message: 'Error deleting category', error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    category.name = name || category.name;
    category.rating = rating || category.rating;
    await category.save();
    res.send({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send({ message: 'Error updating category', error });
  }
};