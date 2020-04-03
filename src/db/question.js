import mongoose from 'mongoose';

module.exports = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    type: {
      type: String,
      default: 'radio',
    },
    lang: {
      type: String,
      default: 'sv',
    },
    answers: [{
      text: {
        type: String,
      },
      weight: {
        type: Number
      },
    }]
  },
  {
    versionKey: false
  }
);
