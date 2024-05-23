const express = require('express');
const router = express.Router();
const bookprizeController = require('../controller/bookprizeController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /bookprize/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Book-Prize
 *     summary: Adds a new book-prize
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               prize_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book-Prize added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/add', authenticate, isAdmin, bookprizeController.addPrize);


/**
 * @openapi
 * /bookprize/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Book-Prize
 *     summary: Deletes a book-prize
 *     description: This route allows admins to delete a book-prize relation.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the prize to delete
 *     responses:
 *       200:
 *         description: Book-Prize deleted successfully
 *       404:
 *         description: Book-Prize not found
 *       403:
 *         description: Authorization required
 */

router.delete('/delete/:id', authenticate, isAdmin, bookprizeController.deleteBookPrize);

/**
 * @openapi
 * /bookprize/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Book-Prize
 *     summary: Updates a book-prize
 *     description: This route allows admins to update details of a book-prize.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               prize_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Book-Prize updated successfully
 *       404:
 *         description: Book-Prize not found
 *       403:
 *         description: Authorization required
 */
router.put('/update/:id', authenticate, isAdmin, bookprizeController.updateBookPrize);

module.exports = router;