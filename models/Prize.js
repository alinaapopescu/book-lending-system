const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prize = sequelize.define('Prize', {
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  year: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING
  }
});

module.exports = Prize;
