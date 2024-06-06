const express = require('express');
const router = express.Router();
const loanController = require('../controller/loanController');
const { authenticate, isAdmin} = require('../middleware/auth');


/**
 * @openapi
 * /loan/:
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
router.post('/', authenticate, loanController.loanBook);



/**
 * @openapi
 * /loan/:userId:
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
router.get('/:userId', authenticate, isAdmin, loanController.getAllUserLoans);


/**
 * @openapi
 * /loan/:loanId
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Loan
 *     summary: Get details about a loan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loan_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User loan details were returned successfully
 *       403:
 *         description: Authorization required
 */
router.get('/:loanId', authenticate, isAdmin, loanController.getLoanDetails);

module.exports = router;
