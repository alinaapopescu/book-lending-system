const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /categories:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Add a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ratings:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/', authenticate, isAdmin, categoryController.addCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Deletes a category
 *     description: This route allows admins to delete a category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       403:
 *         description: Authorization required
 */

router.delete('/:id', authenticate, isAdmin, categoryController.deleteCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Updates a category
 *     description: This route allows admins to update details of a category.
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
 *               name:
 *                 type: string
 *               ratings:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       403:
 *         description: Authorization required
 */
router.put('/:id', authenticate, isAdmin, categoryController.updateCategory);

module.exports = router;
