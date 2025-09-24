const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    limit: { type: Number, required: true },
    period: { type: String, enum: ['monthly', 'weekly'], required: true },
    spent: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Budget', budgetSchema);
