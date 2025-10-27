const mongoose = require("mongoose");

const insightShema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    insight: String,
    tone: String,
    html: String,
    data: Object,
});

module.exports = mongoose.model("Insight", insightShema);
