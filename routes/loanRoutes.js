const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');
const { authenticate} = require('../middleware/auth');


/**
 * @openapi
 * /loan/add:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan
 *     summary: Register a loan of a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_id:
 *                 type: integer
 *               loan_date:
 *                 type: date
 *     responses:
 *       200:
 *         description: Loan added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/add', authenticate, loanController.loanBook);

module.exports = router;
