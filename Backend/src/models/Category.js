const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  bgColor: { type: String, default: '#22c55e' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

module.exports = mongoose.model("Category", categorySchema);