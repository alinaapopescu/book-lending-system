const Book = require('../models/Book'); 

exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, cover_image, category_id } = req.body;
     // Verificam daca categoria exista
     const categoryExists = await Category.findByPk(category_id);
     if (!categoryExists) {
       console.error('Category not found: ', error);
       return res.status(404).send({ message: 'Category not found' });
     }
    const book = await Book.create({ title, author, isbn, cover_image, catgeory_id });
    res.status(201).send({ message: 'Book added successfully', book });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).send({ message: 'Error adding book', error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    await book.destroy();
    res.send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send({ message: 'Error deleting book', error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, cover_image, catgeory_id } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.cover_image = cover_image || book.cover_image;
    book.catgeory_id = catgeory_id || book.catgeory_id;
    await book.save();
    res.send({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send({ message: 'Error updating book', error });
  }
};
