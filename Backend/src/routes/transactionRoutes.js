const express = require("express");
const transactionController = require("../controllers/transactionController");
const { authenticateToken } = require("../middleware/authMiddleware");

const transactionRouter = express.Router();

transactionRouter.get(
    "/",
    authenticateToken,
    transactionController.getTransaction,
);
transactionRouter.post(
    "/",
    authenticateToken,
    transactionController.postTransaction,
);
transactionRouter.delete(
    "/:id",
    authenticateToken,
    transactionController.deleteTransaction,
);
transactionRouter.get(
    "/get-income",
    authenticateToken,
    transactionController.getIncome,
);

module.exports = transactionRouter;
