const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Catgeory', {
  category_name: {
    type: DataTypes.STRING,
    unique: true
  },
  rating: {
    type: DataTypes.INTEGER
  }
});

module.exports = Category;
