const express = require('express');
const chartController = require('../controllers/chartController');

const chartRouter = express.Router();

chartRouter.get("/expense-by-category/:userId", chartController.expensVsCategory);
chartRouter.get("/income-by-expense/:userId", chartController.expensVsIncome);
chartRouter.get("/budget-progress/:userId", chartController.budgetProgress);
chartRouter.get("/top-expenses/:userId", chartController.topExpenses);

module.exports = chartRouter;
