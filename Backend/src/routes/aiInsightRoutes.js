const express = require('express');
const aiInsightController = require('../controllers/aiInsightController');
const { authenticateToken } = require('../middleware/authMiddleware');

const aiInsightRouter = express.Router();

aiInsightRouter.get('/', authenticateToken, aiInsightController.getAiInsight );

module.exports = aiInsightRouter;
