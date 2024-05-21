const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
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
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Category,
      key: 'id'
    }
  }},
  {
    tableName: 'book',
    timestamps: false
  }
);

// Book <-> Category
Book.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Book;