const mongoose = require('mongoose');

const TransanctionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    amount: { type: Number, required: true },
    discription: { type: String },
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'bank', 'upi', 'other'],
      default: 'other',
    },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Transanctions', TransanctionSchema);
