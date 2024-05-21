const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Catgeory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},
{
  tableName: 'category',
  timestamps: false
});

module.exports = Category;
