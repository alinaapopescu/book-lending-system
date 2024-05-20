const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookPrize = sequelize.define('BookPrize', {
  book_id: {
    type: DataTypes.INTEGER
  },
  prize_id: {
    type: DataTypes.INTEGER
  }
});

module.exports = Prize;
