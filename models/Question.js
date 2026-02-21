const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  category_id: {
    type: Number,
    required: true
  },
  question_text: {
    type: String,
    required: true
  },
  option_a: String,
  option_b: String,
  option_c: String,
  option_d: String,
  correct_answer: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Question', questionSchema);
