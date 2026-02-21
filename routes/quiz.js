const express = require('express');
const jwt = require('jsonwebtoken');
const Category = require('../models/Category');
const Question = require('../models/Question');
const QuizResult = require('../models/QuizResult');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Pas de token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Get all categories
router.get('/categories', verifyToken, async (req, res) => {
  try {
    console.log('📌 API /categories appelé - UserId:', req.userId);
    const categories = await Category.find().limit(10);
    console.log('✅ Catégories trouvées:', categories.length);
    res.json(categories);
  } catch (error) {
    console.error('❌ Erreur categories:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get questions for a category
router.get('/category/:categoryId', verifyToken, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const questions = await Question.find();

    let filtered;
    if (categoryId === '5' || categoryId === 5) {
      // Mixed - questions aléatoires
      filtered = questions.sort(() => 0.5 - Math.random()).slice(0, 15);
    } else {
      // Catégorie spécifique
      filtered = questions
        .filter(q => q.category_id === parseInt(categoryId))
        .slice(0, 15);
    }

    res.json(filtered);
  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Submit quiz
router.post('/submit', verifyToken, async (req, res) => {
  try {
    const { categoryId, responses } = req.body;
    const userId = req.userId;
    const questions = await Question.find();

    let correctCount = 0;
    const totalQuestions = responses.length;
    const answers = [];

    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      const isCorrect = question && question.correct_answer === response.selectedAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      answers.push({
        question_id: response.questionId,
        selected_answer: response.selectedAnswer || null,
        correct_answer: question?.correct_answer,
        is_correct: isCorrect
      });
    });

    // Get category name
    const category = await Category.findOne({ id: parseInt(categoryId) });
    const categoryName = category?.name || 'Mixed';

    // Save quiz result
    const result = new QuizResult({
      user_id: userId,
      category_id: parseInt(categoryId),
      category: categoryName,
      score: correctCount,
      total_questions: totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100),
      answers
    });

    await result.save();

    res.json({
      score: correctCount,
      totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user results
router.get('/results', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const results = await QuizResult.find({ user_id: userId })
      .sort({ completed_at: -1 });

    const formattedResults = results.map(result => ({
      id: result._id,
      category: result.category,
      score: result.score,
      total_questions: result.total_questions,
      percentage: result.percentage,
      completed_at: result.completed_at
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error('Results error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
