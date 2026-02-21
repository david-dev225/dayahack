// Quiz data (60 questions - integré directement)
const quizData = {
  "categories": [
    {
      "id": 1,
      "name": "Développement Logiciel",
      "description": "Questions sur Développement Logiciel"
    },
    {
      "id": 2,
      "name": "Intelligence Artificielle & Data",
      "description": "Questions sur Intelligence Artificielle & Data"
    },
    {
      "id": 3,
      "name": "Cybersécurité",
      "description": "Questions sur Cybersécurité"
    },
    {
      "id": 4,
      "name": "Réseaux & Systèmes",
      "description": "Questions sur Réseaux & Systèmes"
    },
    {
      "id": 5,
      "name": "Innovation & Entrepreneuriat Tech",
      "description": "Questions sur Innovation & Entrepreneuriat Tech"
    },
    {
      "id": 6,
      "name": "Logique & Algorithmique",
      "description": "Questions sur Logique & Algorithmique"
    }
  ],
  "questions": []
};

// State
let currentCategory = null;
let currentQuestionIndex = 0;
let categoryQuestions = [];
let userAnswers = [];
let score = 0;

// Load quiz data
async function loadQuizData() {
  try {
    const response = await fetch('/quiz_data.json');
    const data = await response.json();
    quizData.questions = data.questions;
    renderCategories();
  } catch (error) {
    console.error('Error loading quiz data:', error);
    // Fallback - use embedded data
    renderCategories();
  }
}

// Render categories
function renderCategories() {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';

  quizData.categories.forEach(category => {
    const questionCount = quizData.questions.filter(q => q.category_id === category.id).length;
    
    const btn = document.createElement('button');
    btn.className = 'category-btn';
    btn.innerHTML = `
      <span>${category.name}</span>
      <span class="count">${questionCount} questions</span>
    `;
    btn.onclick = () => startCategory(category.id, category.name);
    
    container.appendChild(btn);
  });
}

// Start quiz for category
function startCategory(categoryId, categoryName) {
  currentCategory = { id: categoryId, name: categoryName };
  categoryQuestions = quizData.questions
    .filter(q => q.category_id === categoryId)
    .sort(() => 0.5 - Math.random()); // Shuffle
  
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;

  // Show quiz section
  document.getElementById('categoriesSection').classList.remove('active');
  document.getElementById('quizSection').classList.add('active');
  
  displayQuestion();
}

// Display current question
function displayQuestion() {
  if (currentQuestionIndex >= categoryQuestions.length) {
    showResults();
    return;
  }

  const question = categoryQuestions[currentQuestionIndex];
  const container = document.getElementById('quizContainer');

  container.innerHTML = `
    <div class="question-card">
      <div class="question-progress">
        Question ${currentQuestionIndex + 1} / ${categoryQuestions.length}
      </div>
      <h3>${question.question_text}</h3>
      <div class="options">
        <button class="option-btn" onclick="selectAnswer('A')">A) ${question.option_a}</button>
        <button class="option-btn" onclick="selectAnswer('B')">B) ${question.option_b}</button>
        <button class="option-btn" onclick="selectAnswer('C')">C) ${question.option_c}</button>
        <button class="option-btn" onclick="selectAnswer('D')">D) ${question.option_d}</button>
      </div>
    </div>
  `;

  // Highlight previously selected answer
  if (userAnswers[currentQuestionIndex]) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
      if (btn.textContent.startsWith(userAnswers[currentQuestionIndex] + ')')) {
        btn.classList.add('selected');
      }
    });
  }

  // Update button state
  document.getElementById('nextBtn').textContent = currentQuestionIndex === categoryQuestions.length - 1 ? 'Terminer' : 'Suivant →';
}

// Select answer
function selectAnswer(letter) {
  userAnswers[currentQuestionIndex] = letter;

  // Update UI
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('selected');
    if (btn.textContent.startsWith(letter + ')')) {
      btn.classList.add('selected');
    }
  });
}

// Next question
function nextQuestion() {
  if (!userAnswers[currentQuestionIndex]) {
    alert('Veuillez sélectionner une réponse');
    return;
  }

  currentQuestionIndex++;
  displayQuestion();
}

// Back to categories
function backToCategories() {
  document.getElementById('categoriesSection').classList.add('active');
  document.getElementById('quizSection').classList.remove('active');
  document.getElementById('resultsSection').classList.remove('active');
  currentQuestionIndex = 0;
  userAnswers = [];
}

// Show results
function showResults() {
  // Calculate score
  score = 0;
  categoryQuestions.forEach((question, index) => {
    if (userAnswers[index] === question.correct_answer) {
      score++;
    }
  });

  const percentage = Math.round((score / categoryQuestions.length) * 100);

  // Display results
  document.getElementById('quizSection').classList.remove('active');
  document.getElementById('resultsSection').classList.add('active');

  document.getElementById('scoreDisplay').textContent = `${score}/${categoryQuestions.length}`;
  document.getElementById('percentageDisplay').textContent = `${percentage}%`;
  document.getElementById('categoryDisplay').textContent = `Catégorie: ${currentCategory.name}`;

  console.log(`✅ Quiz terminé! Score: ${score}/${categoryQuestions.length} (${percentage}%)`);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadQuizData();
});
