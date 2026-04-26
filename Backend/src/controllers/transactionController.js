const Transactions = require("../models/Transactions");
const Budget = require("../models/Budget");
const { default: mongoose } = require("mongoose");

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
        const currentYear = new Date().getFullYear();

        const result = await Transactions.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    date: {
                        $gte: new Date(`${currentYear}-01-01`),
                        $lte: new Date(`${currentYear}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { month: { $month: "$date" }, type: "$type" },
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const monthlyIncome = new Array(12).fill(0);
        const monthlyExpense = new Array(12).fill(0);

        result.forEach((item) => {
            const monthlyIndex = item._id.month - 1;
            if (item._id.type === "income") {
                monthlyIncome[monthlyIndex] = item.total;
            } else if (item._id.type === "expense") {
                monthlyExpense[monthlyIndex] = item.total;
            }
        });

        res.json({
            income: monthlyIncome,
            expense: monthlyExpense,
            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getDashboardCardInfo = async (req, res, next) => {
    try {
        const user = req.user.id;

        const startofmonth = new Date();
        startofmonth.setDate(1);
        startofmonth.setHours(0, 0, 0, 0);

        const endofmonth = new Date();
        endofmonth.setMonth(endofmonth.getMonth() + 1);
        endofmonth.setDate(0);
        endofmonth.setHours(23, 59, 59, 999);

        const transactions = await Transactions.find({
            user: user,
            date: { $gte: startofmonth, $lte: endofmonth },
        });
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
