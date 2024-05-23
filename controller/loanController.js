const { Op } = require('sequelize');
const Loan = require('../models/Loan');
const { sequelize } = require('../config/database');

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
