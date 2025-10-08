const Transanctions = require("../models/Transactions");
const Budget = require("../models/Budget");
const Transactions = require("../models/Transactions");

exports.expensVsCategory = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const startOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
        );

        const result = await Transanctions.aggregate([
            {
                $match: { user: userId, type: "expense", date: { $gte: startOfMonth } },
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    forigenField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$category" },
            {
                $project: {
                    _id: 0,
                    category: "$category.name",
                    totalAmount: 1,
                },
            },
        ]);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Aggregation failed" });
    }
};

exports.expensVsIncome = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const sixMonthAgo = new Date();
        sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);

        const result = await Transanctions.aggregate([
            {
                $match: { user: userId, date: { $gte: sixMonthAgo } },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$date" },
                        year: { $year: "$date" },
                        type: "$type",
                    },
                },
            },
            {
                $group: {
                    _id: { month: "$_id.month", year: "$_id.year" },
                    income: {
                        $sum: { $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0] },
                    },
                    expenses: {
                        $sum: { $cond: [{ $eq: ["$_id.type", "expenses"] }, "$total", 0] },
                    },
                },
            },
            { $sort: { "$_id.year": 1, "$_id.month": 1 } },
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Aggregation failed" });
    }
};

exports.budgetProgress = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const startOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1,
        );

        const spending = await Transanctions.aggregate([
            {
                $match: { user: userId, type: "expense", date: { $gte: startOfMonth } },
            },
            { $group: { _id: "$category", spent: { $sum: "$amount" } } },
        ]);

        const budgets = await Budget.find({ user: userId }).populate("category");

        const result = budgets.map((budget) => {
            const spent =
                spending.find((s) => String(s.id) === String(budget.category._id))
                    ?.spent || 0;
            return {
                category: budget.category.name,
                limit: budget.limit,
                spent,
                percentage: Math.round((spent / budget.limit) * 100),
            };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Aggregation failed" });
    }
};

exports.topExpenses = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const result = await Transactions.aggregate([
            { $match: { user: userId, type: "expense" } },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { $total: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    forigenField: "_id",
                    as: "category",
                },
            },
            { $unwind: "category" },
            {
                $project: {
                    _id: 0,
                    category: "$category.name",
                    total: 1,
                },
            },
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Aggregation failed" });
    }
};
