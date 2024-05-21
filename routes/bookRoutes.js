const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /books/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Adds a new book
 *     description: This route allows admins to add a new book.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               cover_image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/add', authenticate, isAdmin, bookController.addBook);

/**
 * @openapi
 * /books/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Deletes a book
 *     description: This route allows admins to delete a book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       403:
 *         description: Authorization required
 */

router.delete('/delete/:id', authenticate, isAdmin, bookController.deleteBook);

/**
 * @openapi
 * /books/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Books
 *     summary: Updates a book
 *     description: This route allows admins to update a book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               cover_image:
 *                 type: string
 *               category_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       403:
 *         description: Authorization required
 */
router.put('/update/:id', authenticate, isAdmin, bookController.updateBook);

module.exports = router;
