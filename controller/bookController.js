const Book = require('../models/Book'); 
const Category = require('../models/Category')
const BookPrize = require('../models/BookPrize');
const { Op } = require('sequelize');


exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, cover_image, category_id } = req.body;
    const categoryExists = await Category.findByPk(category_id);
    //  if (!categoryExists) {
    //    return res.status(404).send({ message: 'Category not found' });
    //  }
    let book;
    if (categoryExists)
      {book = await Book.create({ title, author, isbn, cover_image, category_id });}
    else {
       book = await Book.create({ title, author, isbn, cover_image });
    }
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
    const bookPrizes = await BookPrize.findAll({ where: { book_id: id } });
    for (const bookPrize of bookPrizes) {
      await bookPrize.destroy();
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


// Sort the book alphabetical using title
exports.getSortedBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [['title', 'ASC']]
    });
    res.status(200).send(books);
  } catch (error) {
    console.error('Error fetching sorted books:', error);
    res.status(500).send({ message: 'Error fetching sorted books', error });
  }
};

exports.searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    });
    res.status(200).send(books);
  } catch (error) {
    console.error('Error searching books by title:', error);
    res.status(500).send({ message: 'Error searching books by title', error });
  }
};

exports.searchBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const books = await Book.findAll({
      where: {
        author: {
          [Op.like]: `%${author}%`
        }
      }
    });
    res.status(200).send(books);
  } catch (error) {
    console.error('Error searching books by author:', error);
    res.status(500).send({ message: 'Error searching books by author', error });
  }
};

// Sorted + pagination
exports.getSortedBooksPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const books = await Book.findAll({
      order: [['title', 'ASC']], 
      limit: limit,              
      offset: offset            
    });
    res.status(200).send(books);
  } catch (error) {
    console.error('Error fetching sorted books:', error);
    res.status(500).send({ message: 'Error fetching sorted books', error });
  }
};

