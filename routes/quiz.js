const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const JWT_SECRET = 'your-secret-key-change-this';
const dataDir = path.join(__dirname, '../data');

function getFile(filename) {
  const file = path.join(dataDir, filename);
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

function saveFile(filename, data) {
  const file = path.join(dataDir, filename);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

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
router.get('/categories', verifyToken, (req, res) => {
  try {
    console.log('📌 API /categories appelé - UserId:', req.userId);
    const categories = getFile('categories.json');
    console.log('✅ Catégories trouvées:', categories.length);
    res.json(categories);
  } catch (error) {
    console.error('❌ Erreur categories:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get questions for a category
router.get('/category/:categoryId', verifyToken, (req, res) => {
  try {
    const { categoryId } = req.params;
    const questions = getFile('questions.json');

    let filtered;
    if (categoryId === '5') {
      // Mixed - questions aléatoires
      filtered = questions.sort(() => Math.random() - 0.5).slice(0, 15);
    } else {
      // Catégorie spécifique
      filtered = questions
        .filter(q => q.category_id === parseInt(categoryId))
        .slice(0, 15);
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Submit quiz
router.post('/submit', verifyToken, (req, res) => {
  try {
    const { categoryId, responses } = req.body;
    const userId = req.userId;
    const questions = getFile('questions.json');

    let correctCount = 0;
    const totalQuestions = responses.length;
    const userResponses = getFile('user_responses.json');

    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      const isCorrect = question && question.correct_answer === response.selectedAnswer;
      
      if (isCorrect) {
        correctCount++;
      }

      userResponses.push({
        id: userResponses.length + 1,
        user_id: userId,
        question_id: response.questionId,
        selected_answer: response.selectedAnswer || null,
        is_correct: isCorrect ? 1 : 0,
        created_at: new Date().toISOString()
      });
    });

    saveFile('user_responses.json', userResponses);

    // Record quiz attempt
    const attempts = getFile('quiz_attempts.json');
    attempts.push({
      id: attempts.length + 1,
      user_id: userId,
      category_id: parseInt(categoryId),
      score: correctCount,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString()
    });
    
    saveFile('quiz_attempts.json', attempts);

    res.json({
      score: correctCount,
      totalQuestions,
      percentage: Math.round((correctCount / totalQuestions) * 100)
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user results
router.get('/results', verifyToken, (req, res) => {
  try {
    const userId = req.userId;
    const attempts = getFile('quiz_attempts.json');
    const categories = getFile('categories.json');

    const results = attempts
      .filter(a => a.user_id === userId)
      .map(a => {
        const category = categories.find(c => c.id === a.category_id);
        return {
          id: a.id,
          category: category?.name || 'Unknown',
          score: a.score,
          total_questions: a.total_questions,
          percentage: parseFloat(((a.score * 100.0 / a.total_questions).toFixed(2))),
          completed_at: a.completed_at
        };
      })
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
