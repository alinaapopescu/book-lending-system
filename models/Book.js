const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING
  },
  author: {
    type: DataTypes.STRING
  },
  isbn: {
    type: DataTypes.STRING,
    unique: true
  },
  cover_image: {
    type: DataTypes.STRING
  },
  category_id: {
    type: DataTypes.INTEGER
  }
});

module.exports = Book;