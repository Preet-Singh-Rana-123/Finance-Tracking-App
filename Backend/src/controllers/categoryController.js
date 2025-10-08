const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Users = require("../models/Users");

exports.getCategory = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await Category.find({ user: userId });

        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "aggregation error" });
    }
};

exports.postCategory = async (req, res, next) => {
    try {
        const { name, type, bgcolor } = req.body;
        const userId = req.user.id || req.user._id;
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const category = new Category({
            name,
            type,
            bgcolor,
            user: userObjectId,
        });
        await category.save();
        res.json({ message: "category created", category });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(id, { name });
        res.json({ message: "Updated successfully", updatedCategory });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.json({ message: "deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};
