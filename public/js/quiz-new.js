// Quiz Page - Load from embedded data
let questions = [];
let currentQuestionIndex = 0;
let responses = [];
let timePerQuestion = 15;
let timerId = null;
let categoryData = null;
let isQuizActive = true;
let isTransitioning = false;

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

  // Réinitialiser et démarrer le timer pour la nouvelle question
  resetTimer();
  
  // Marquer la transition comme complète
  isTransitioning = false;
}

// Select answer
function selectAnswer(answer) {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (selected) {
    responses[currentQuestionIndex] = answer;
  }
}

// Submit current question (user clicks Validate button)
function submitCurrentQuestion() {
  if (!isQuizActive || isTransitioning) {
    return;
  }

  const selected = document.querySelector('input[name="answer"]:checked');
  
  if (!selected) {
    showError('⚠️ Veuillez sélectionner une réponse');
    return;
  }

  const answer = selected.value;
  responses[currentQuestionIndex] = answer;
  
  // Stop timer and move to next question
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  
  nextQuestion();
}

// Timer functions
function startTimer() {
  // Arrêter tout timer précédent
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  let timeLeft = timePerQuestion;
  const timerDisplay = document.getElementById('timerDisplay');
  
  // Réinitialiser l'affichage
  timerDisplay.className = 'timer-display';
  timerDisplay.textContent = timeLeft;
  
  timerId = setInterval(() => {
    timeLeft--;
    
    if (!isQuizActive) {
      clearInterval(timerId);
      timerId = null;
      return;
    }
    
    timerDisplay.textContent = timeLeft;
    timerDisplay.className = 'timer-display';
    
    if (timeLeft <= 5 && timeLeft > 0) {
      timerDisplay.classList.add('warning');
    }
    if (timeLeft <= 2 && timeLeft > 0) {
      timerDisplay.classList.remove('warning');
      timerDisplay.classList.add('danger');
    }
    
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      if (isQuizActive && !isTransitioning) {
        nextQuestion();
      }
    }
  }, 1000);
}

function resetTimer() {
  // Arrêter complètement le timer précédent
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  startTimer();
}

// Next question
function nextQuestion() {
  // Empêcher les appels multiples pendant la transition
  if (isTransitioning || !isQuizActive) {
    return;
  }
  
  isTransitioning = true;
  
  // Arrêter complètement le chronomètre
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    isTransitioning = false;
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
  // Arrêter complètement le quiz
  isQuizActive = false;
  
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

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
  if (!isQuizActive || isTransitioning) {
    return;
  }
  
  // Arrêter le chronomètre et passer à la question suivante
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  
  nextQuestion();
}

function showError(message) {
  alert(message);
}
