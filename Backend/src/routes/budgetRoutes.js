const express = require('express');
const budgetController = require('../controllers/budgetController');
const { authenticateToken } = require('../middleware/authMiddleware');

const budgetRouter = express.Router();

budgetRouter.get('/', authenticateToken, budgetController.getBudget);
budgetRouter.post('/', authenticateToken, budgetController.postBudget);
budgetRouter.put('/:id', authenticateToken, budgetController.updateBudget);
budgetRouter.delete('/:id', authenticateToken, budgetController.deleteBudget);

module.exports = budgetRouter;
