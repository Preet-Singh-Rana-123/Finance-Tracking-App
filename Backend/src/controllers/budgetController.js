const Budget = require("../models/Budget");

exports.postBudget = (req, res, next) => {
    try {
        const { category, limit, spent, period } = req.body;
        const user = req.user.id;
        const budget = new Budget({
            user,
            category,
            limit,
            spent,
            period,
        });
        budget.save();
        res.json({ message: "Budget created", budget });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getBudget = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await Budget.find({ user: userId });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.updateBudget = async (req, res, next) => {
    try {
        const { category, limit, spent, period } = req.body;
        const user = req.user.id;
        const { id } = req.params;
        await Budget.findByIdAndUpdate(id, {
            category,
            limit,
            spent,
            period,
            user,
        });
        res.json({ message: "Update succussfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.deleteBudget = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Budget.findByIdAndDelete(id);
        res.json({ message: "Deleted succussfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};
