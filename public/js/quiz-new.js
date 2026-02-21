// Quiz Page - Load from embedded data
let questions = [];
let currentQuestionIndex = 0;
let responses = [];
let timePerQuestion = 15;
let timerId = null;
let categoryData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  categoryData = JSON.parse(sessionStorage.getItem('currentCategory'));
  if (!categoryData) {
    window.location.href = '/categories';
    return;
  }

  document.getElementById('categoryName').textContent = categoryData.name;
  loadQuestions();
});

// Load questions from embedded data
function loadQuestions() {
  try {
    if (categoryData.id === null) {
      // Mix complet - toutes les questions
      questions = QUIZ_DATA.questions;
    } else {
      // Une catégorie spécifique
      questions = QUIZ_DATA.questions.filter(q => q.category_id === categoryData.id);
    }

    if (questions.length === 0) {
      showError('Aucune question disponible');
      setTimeout(() => {
        window.location.href = '/categories';
      }, 2000);
      return;
    }

    displayQuestion();
    startTimer();
  } catch (error) {
    console.error('Error loading questions:', error);
    showError('Erreur lors du chargement des questions');
  }
}

// Display current question
function displayQuestion() {
  const container = document.getElementById('questionContainer');
  const question = questions[currentQuestionIndex];

  container.innerHTML = `
    <div class="question-container">
      <h3>${question.question_text}</h3>
      <div class="options">
        <label class="option">
          <input type="radio" name="answer" value="A" onchange="selectAnswer('A')">
          <span>A) ${question.option_a}</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="B" onchange="selectAnswer('B')">
          <span>B) ${question.option_b}</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="C" onchange="selectAnswer('C')">
          <span>C) ${question.option_c}</span>
        </label>
        <label class="option">
          <input type="radio" name="answer" value="D" onchange="selectAnswer('D')">
          <span>D) ${question.option_d}</span>
        </label>
      </div>
    </div>
  `;

  // Update progress
  document.getElementById('progressText').textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
  
  // Update progress bar
  const percentage = ((currentQuestionIndex) / questions.length) * 100;
  document.querySelector('.progress-fill').style.width = percentage + '%';

  // Reset timer display
  resetTimer();
}

// Select answer
function selectAnswer(answer) {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected) {
    responses[currentQuestionIndex] = answer;
  }
}

// Timer functions
function startTimer() {
  let timeLeft = timePerQuestion;
  
  timerId = setInterval(() => {
    timeLeft--;
    const timerDisplay = document.getElementById('timerDisplay');
    
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 5) {
      timerDisplay.classList.add('warning');
    }
    if (timeLeft <= 2) {
      timerDisplay.classList.add('danger');
    }
    
    if (timeLeft <= 0) {
      clearInterval(timerId);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  if (timerId) clearInterval(timerId);
  document.getElementById('timerDisplay').className = '';
  startTimer();
}

// Next question
function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    submitQuiz();
  }
}

// Previous question
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

// Submit quiz
function submitQuiz() {
  if (timerId) clearInterval(timerId);

  // Calculate score
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (responses[index] === question.correct_answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  
  // Save result to localStorage
  const result = {
    category: categoryData.name,
    score: correctCount,
    total: questions.length,
    percentage: percentage,
    date: new Date().toISOString()
  };

  const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
  results.unshift(result);
  localStorage.setItem('quizResults', JSON.stringify(results.slice(0, 10)));

  // Display result
  displayResult(correctCount, questions.length, percentage);
}

// Display result
function displayResult(score, total, percentage) {
  const container = document.getElementById('quizContainer');
  
  container.innerHTML = `
    <div class="result-screen">
      <h2>Résultats</h2>
      <div class="result-box">
        <p class="score-value">${score}/${total}</p>
        <p class="score-text">Bonnes réponses</p>
        <p class="percentage">${percentage}%</p>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <p style="color: var(--text-color); margin-bottom: 20px;">
          ${getResultMessage(percentage)}
        </p>
        <a href="/categories" class="btn btn-primary">Retour aux catégories</a>
      </div>
    </div>
  `;
}

function getResultMessage(percentage) {
  if (percentage >= 80) return "🎉 Excellent travail!";
  if (percentage >= 60) return "👍 Bien joué!";
  if (percentage >= 40) return "📚 À revoir...";
  return "💪 Continue ton entraînement!";
}

// Skip question button
function skipQuestion() {
  nextQuestion();
}

function showError(message) {
  alert(message);
}
