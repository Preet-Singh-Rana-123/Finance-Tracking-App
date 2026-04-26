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

transactionRouter.get(
    "/get-expense",
    authenticateToken,
    transactionController.getExpense,
);

transactionRouter.get(
    "/get-balance",
    authenticateToken,
    transactionController.getBalance,
);

transactionRouter.get(
    "/get-dashboard-card-info",
    authenticateToken,
    transactionController.getDashboardCardInfo,
);

module.exports = transactionRouter;
