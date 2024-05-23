const BookPrize = require('../models/BookPrize'); 

exports.addPrize = async (req, res) => {
  try {
    const {book_id, prize_id } = req.body;
    const bookprize = await BookPrize.create({ book_id, prize_id });
    res.status(201).send({ message: 'BookPrize added successfully', bookprize });
  } catch (error) {
    console.error('Error adding bookprize:', error);
    res.status(500).send({ message: 'Error adding bookprize', error });
  }
};

exports.deleteBookPrize = async (req, res) => {
  try {
    const { id } = req.params;
    const bookprize = await BookPrize.findByPk(id);
    await bookprize.destroy();
    res.send({ message: 'BookPrize deleted successfully' });
  } catch (error) {
    console.error('Error deleting bookprize:', error);
    res.status(500).send({ message: 'Error deleting bookprize', error });
  }
};

exports.updateBookPrize = async (req, res) => {
  try {
    const { id } = req.params;
    const { book_id, prize_id } = req.body;
    const bookprize = await BookPrize.findByPk(id);
    if (!book) {
      return res.status(404).send({ message: 'BookPrize not found' });
    }
    bookprize.book_id = book_id || bookprize.book_id;
    bookprize.prize_id = prize_id || bookprize.prize_id;
    await bookprize.save();
    res.send({ message: 'BookPrize updated successfully', bookprize });
  } catch (error) {
    console.error('Error updating bookprize:', error);
    res.status(500).send({ message: 'Error updating bookprize', error });
  }
};
