const Transactions = require("../models/Transactions");
const Budget = require("../models/Budget");

exports.postTransaction = async (req, res, next) => {
    try {
        const { type, category, amount, paymentMethod, description } = req.body;
        const user = req.user.id;
        const transaction = new Transactions({
            type,
            category,
            amount,
            paymentMethod,
            description,
            user,
        });
        await transaction.save();
        res.json({ message: "transaction posted", transaction });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getTransaction = async (req, res, next) => {
    try {
        const user = req.user.id;
        const result = await Transactions.find({ user: user });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Transactions.findByIdAndDelete(id);
        res.json({ message: "deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.searchByDate = async (req, res, next) => {
    try {
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getIncome = async (req, res, next) => {
    try {
        const user = req.user.id;
        const transactions = await Transactions.find({ user: user });
        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        res.json({ income });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getExpense = async (req, res, next) => {
    try {
        const user = req.user.id;
        const transactions = await Transactions.find({ user: user });
        const expense = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        res.json({ expense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getBalance = async (req, res, next) => {
    try {
        const user = req.user.id;
        const transactions = await Transactions.find({ user: user });
        const expense = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income > expense ? income - expense : 0;
        res.json({ balance });
    } catch {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getIncomeAndExpense = async (req, res, next) => {
    try {
        const user = req.user.id;
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getDashboardCardInfo = async (req, res, next) => {
    try {
        const user = req.user.id;
        const transactions = await Transactions.find({ user: user });
        const expense = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        const income = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const balance = income > expense ? income - expense : 0;
        const budget = await Budget.find({ user: user });
        const monthlyBudget = budget.reduce((sum, b) => sum + b.limit, 0);

        const result = {
            balance: balance,
            expense: expense,
            income: income,
            budget: monthlyBudget,
        };
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};
