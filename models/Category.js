const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Catgeory', {
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Category;
