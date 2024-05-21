const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prize = sequelize.define('Prize', {
  
  name: {
    type: DataTypes.STRING,
    require: true,
    unique: true
  },
  year: {
    type: DataTypes.INTEGER,
    require: true
  },
  description: {
    type: DataTypes.STRING,
    require: false
  }
});

module.exports = Prize;
