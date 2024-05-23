const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const Prize = require('./Prize');

const BookPrize = sequelize.define('BookPrize', {
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Book', 
      key: 'id'
    }
  },
  prize_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prize', 
      key: 'id'
    }
  }
}, {
  tableName: 'bookprize', 
  timestamps: false  
});

Book.belongsToMany(Prize, { through: BookPrize, foreignKey: 'book_id' });
Prize.belongsToMany(Book, { through: BookPrize, foreignKey: 'prize_id' });

module.exports = BookPrize;
