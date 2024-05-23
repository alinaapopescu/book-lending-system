const Prize = require('../models/Prize'); 
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


exports.addPrize = async (req, res) => {
  try {
    const { name, year, description } = req.body;
    const prize = await Prize.create({ name, year, description });
    res.status(201).send({ message: 'Prize added successfully', prize });
  } catch (error) {
    console.error('Error adding prize:', error);
    res.status(500).send({ message: 'Error adding prize', error });
  }
};


exports.deletePrize = async (req, res) => {
  try {
    const { id } = req.params;
    const prize = await Prize.findByPk(id);
    if (!prize) {
      return res.status(404).send({ message: 'Prize not found' });
    }
    await prize.destroy();
    res.send({ message: 'Prize deleted successfully' });
  } catch (error) {
    console.error('Error deleting prize:', error);
    res.status(500).send({ message: 'Error deleting prize', error });
  }
};

exports.updatePrize = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, year, description } = req.body;
    const prize = await Prize.findByPk(id);
    if (!category) {
      return res.status(404).send({ message: 'Prize not found' });
    }
    prize.name = name || prize.name;
    prize.year = year || prize.year;
    prize.description = description || prize.description;
    await prize.save();
    res.send({ message: 'Prize updated successfully', category });
  } catch (error) {
    console.error('Error updating prize:', error);
    res.status(500).send({ message: 'Error updating prize', error });
  }
};