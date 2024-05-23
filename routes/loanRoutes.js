const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');
const { authenticate, isAdmin} = require('../middleware/auth');


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



/**
 * @openapi
 * /loan/get/:userId:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan
 *     summary: Get all the loans of a certain user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User loans returned successfully
 *       403:
 *         description: Authorization required
 */
router.get('/get/:userId', authenticate, isAdmin, loanController.getAllUserLoans);

router.get('/:loanId', authenticate, isAdmin, loanController.getLoanDetails);

module.exports = router;
