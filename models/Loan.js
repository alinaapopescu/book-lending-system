const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const User = require('./User');

const Loan = sequelize.define('Loan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User', 
      key: 'id', 
    }
  },
  book_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Book',
      key: 'id',
    }
  },
  loan_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
{
  tableName: 'loan',
  timestamps: false
});

// User.belongsToMany(Book, { through: Loan, foreignKey: 'user_id' });
// Book.belongsToMany(User, { through: Loan, foreignKey: 'book_id' });

User.hasMany(Loan, { foreignKey: 'user_id' });
Loan.belongsTo(User, { foreignKey: 'user_id' });

Book.hasMany(Loan, { foreignKey: 'book_id' });
Loan.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = Loan;
