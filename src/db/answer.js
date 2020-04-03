import mongoose from 'mongoose';

module.exports = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
    },
    place: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now
    },
  },
  {
    versionKey: false
  }
);
