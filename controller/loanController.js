const { Op } = require('sequelize');
const Loan = require('../models/Loan');
const { sequelize } = require('../config/database');
const Book = require('../models/Book');
const User = require('../models/User');

exports.loanBook = async (req, res) => {
    const { book_id, loan_date } = req.body;
    let loanDate = new Date(loan_date);
    let returnDate = new Date(loan_date);
    returnDate.setDate(loanDate.getDate() + 14);  // Setează data de returnare la 14 zile după data de împrumut

    try {
        // Verificam daca nu apar conflicte cu alt imprumut
        const loanExist = await Loan.findOne({
            where: {
                book_id,
                [Op.or]: [  
                    { loan_date: { [Op.lte]: returnDate } },
                    { return_date: { [Op.gte]: loanDate } }
                ]
            }
        });

        if (loanExist) {
            return res.status(409).send({ message: 'Sorry, this book is already loaned out during the requested period.' });
        }

        // Crearea împrumutului
        const loan = await Loan.create({
            book_id,
            loan_date: loanDate,
            return_date: returnDate,
            user_id: req.user.id  
        });

        res.status(201).send({ message: 'The book was loaned successfully.', loan });
    } catch (error) {
        console.error('Error at book loan:', error);
        res.status(500).send({ message: 'Internal Error', error });
    }
};


// All the loans of a user
exports.getAllUserLoans = async (req, res) => {
    try {
        const user_id = req.params.userId;
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const loans = await Loan.findAll({
            where: { user_id: user_id}
        });

        res.send(loans);
    } catch (error) {
        console.error('Error retrieving user loans:', error);
        res.status(500).send({ message: 'Failed to retrieve loans', error });
    }
};


// Loan detaile
exports.getLoanDetails = async (req, res) => {
    try {
        const { loanId } = req.params;
        const loan = await Loan.findByPk(loanId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']  
                },
                {
                    model: Book,
                    attributes: ['id', 'title', 'author'],
                }
            ]
        });
        // console.log('User model is:', User);
        // console.log('Book model is:', Book);

        if (!loan) {
            return res.status(404).send({ message: 'Loan not found' });
        }

        res.send({
            userId: loan.User.id,
            userName: loan.User.username,
            bookId: loan.Book.id,
            bookTitle: loan.Book.title,
            authorName: loan.Book.author 
        });
    } catch (error) {
        console.error('Error retrieving loan details:', error);
        res.status(500).send({ message: 'Failed to retrieve loan details', error });
    }
};
