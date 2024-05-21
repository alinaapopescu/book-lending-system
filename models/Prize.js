const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prize = sequelize.define('Prize', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
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
},
{
  tableName: 'prize', // Specifică explicit numele tabelului pentru a evita orice confuzie
  timestamps: false   // Presupunem că tabelul nu folosește timestamps dacă nu este specificat altfel
});

module.exports = Prize;
