const mongoose = require('mongoose');

const insightShema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    summary: { type: Object },
    insightText: { type: String, required: true },
    source: { type: String, enum: ['openai', 'gemini'], default: 'openai' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Insight', insightShema);
