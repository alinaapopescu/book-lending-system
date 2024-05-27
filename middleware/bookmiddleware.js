const { body, validationResult } = require('express-validator');
const Book = require('../models/Book'); 
const Category = require('../models/Category');

exports.validateBook = [
    // Titlul not null unique
    body('title').notEmpty().withMessage('Title is required')
        .custom(async title => {
            const found = await Book.findOne({ where: { title } });
            if (found) {
                return Promise.reject('Title already exists');
            }
        }),

    // Autorul not null
    body('author').notEmpty().withMessage('Author is required'),

    // ISBN not null unique
    body('isbn').notEmpty().withMessage('ISBN is required')
        .custom(async isbn => {
            const found = await Book.findOne({ where: { isbn } });
            if (found) {
                return Promise.reject('ISBN already exists');
            }
        }),

    // Image not null unique
    body('cover_image').notEmpty().withMessage('Cover image is required')
        .custom(async (cover_image) => {
            const found = await Book.findOne({ where: { cover_image } });
            if (found) {
                return Promise.reject('Cover image already exists');
            }
        }),

    // Category ID nu trebuie să fie null
    body('category_id').custom(async (category_id) => {
      // console.log(category_id );
      if (category_id === null || category_id==='' || category_id === undefined ) {
        console.log("aici");
        return true;
    } else if (category_id) {
        try {
            const category = await Category.findByPk(category_id);
            if (!category) {
                return Promise.reject('Category not found');  
            }
        } catch (error) {
            throw new Error('Database error while validating category ID');
        }
    } else {
        return true;
    }
}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
