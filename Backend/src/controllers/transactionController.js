const Transactions = require("../models/Transactions");

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
        res.json({message: "deleted successfully"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
};

exports.searchByDate = async (req,res,next) => {
    try{
    }catch (err){
        console.log(err);
        res.status(500).json({ message: "internal error" });
    }
}
