const express = require('express');
const goalController = require('../controllers/goalController');
const { authenticateToken } = require('../middleware/authMiddleware');

const goalRouter = express.Router();

goalRouter.get('/', authenticateToken, goalController.getGoal );
goalRouter.post('/', authenticateToken, goalController.postGoal);

module.exports = goalRouter;
