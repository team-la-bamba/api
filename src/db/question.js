import mongoose from 'mongoose';

module.exports = new mongoose.Schema(
  {
    text: {
      type: Object
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
        type: Object,
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
