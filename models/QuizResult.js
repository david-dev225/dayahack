const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category_id: Number,
  category: String,
  score: Number,
  total_questions: Number,
  percentage: Number,
  answers: [
    {
      question_id: Number,
      selected_answer: String,
      correct_answer: String,
      is_correct: Boolean
    }
  ],
  completed_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
