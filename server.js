const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize data directory and files
function initializeDataFiles() {
  const dataDir = path.join(__dirname, 'data');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // Initialize users.json
  if (!fs.existsSync(path.join(dataDir, 'users.json'))) {
    fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify([], null, 2));
  }

  // Initialize categories.json
  if (!fs.existsSync(path.join(dataDir, 'categories.json'))) {
    const categories = [
      { id: 1, name: 'Web Development', description: 'Questions sur le développement web' },
      { id: 2, name: 'Mobile Development', description: 'Questions sur le développement mobile' },
      { id: 3, name: 'Data Science', description: 'Questions sur la science des données' },
      { id: 4, name: 'DevOps', description: 'Questions sur DevOps et infrastructure' },
      { id: 5, name: 'Mixed', description: 'Questions mixtes de toutes les catégories' }
    ];
    fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));
  }

  // Initialize questions.json
  if (!fs.existsSync(path.join(dataDir, 'questions.json'))) {
    try {
      const seedPath = path.join(dataDir, '../data/seed.json');
      if (fs.existsSync(seedPath)) {
        const questions = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
        fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify(questions, null, 2));
      } else {
        console.log('⚠️ seed.json not found, using empty questions array');
        fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error('❌ Error loading seed.json:', error.message);
      fs.writeFileSync(path.join(dataDir, 'questions.json'), JSON.stringify([], null, 2));
    }
  }

  // Initialize quiz_attempts.json
  if (!fs.existsSync(path.join(dataDir, 'quiz_attempts.json'))) {
    fs.writeFileSync(path.join(dataDir, 'quiz_attempts.json'), JSON.stringify([], null, 2));
  }

  // Initialize user_responses.json
  if (!fs.existsSync(path.join(dataDir, 'user_responses.json'))) {
    fs.writeFileSync(path.join(dataDir, 'user_responses.json'), JSON.stringify([], null, 2));
  }
}

initializeDataFiles();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'categories.html'));
});

app.get('/quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'quiz.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
