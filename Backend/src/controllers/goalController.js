const Goal = require("../models/Goal");

exports.postGoal = async (req, res, next) => {
    try {
        const { title, currentAmount, targetAmount, deadline } = req.body;
        const user = req.user.id;
        const goal = new Goal({
            user,
            title,
            currentAmount,
            targetAmount,
            deadline,
        });
        await goal.save();
        res.json({ message: "goal created" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.getGoal = async (req, res, next) => {
    try {
        const user = req.user.id;
        const result = await Goal.find({ user: user });
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.updateGoal = async (req, res, next) => {
    try {
        const { title, currentAmount, targetAmount, deadline } = req.body;
        const { id } = req.params;
        await Goal.findByIdAndUpdate(id, {
            title,
            currentAmount,
            targetAmount,
            deadline,
        });
        res.json({ message: "goal updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};
