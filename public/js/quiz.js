let questions = [];
let currentQuestionIndex = 0;
let responses = [];
let timePerQuestion = 15;
let timerId = null;
let categoryData = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  categoryData = JSON.parse(localStorage.getItem('currentCategory'));
  if (!categoryData) {
    window.location.href = '/categories';
    return;
  }

  document.getElementById('categoryName').textContent = categoryData.name;
  loadQuestions();
});

// Load questions
async function loadQuestions() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/quiz/category/${categoryData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    questions = await response.json();
    if (questions.length === 0) {
      showError('Aucune question disponible pour cette catégorie');
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

// Display question
function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    submitQuiz();
    return;
  }

  const question = questions[currentQuestionIndex];
  const questionNumber = currentQuestionIndex + 1;

  document.getElementById('questionCounter').textContent = `Question ${questionNumber}/${questions.length}`;
  document.getElementById('questionText').textContent = question.question_text;
  
  document.getElementById('optionA').textContent = question.option_a;
  document.getElementById('optionB').textContent = question.option_b;
  document.getElementById('optionC').textContent = question.option_c;
  document.getElementById('optionD').textContent = question.option_d;

  // Clear previous selection
  document.querySelectorAll('input[name="answer"]').forEach(input => {
    input.checked = false;
  });

  // Update progress bar
  const progress = ((questionNumber) / questions.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';

  resetTimer();
}

// Timer functions
function resetTimer() {
  let timeLeft = timePerQuestion;
  updateTimerDisplay(timeLeft);

  if (timerId) clearInterval(timerId);

  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerId);
      goToNextQuestion();
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = seconds;

  if (seconds <= 5) {
    timerDisplay.classList.remove('warning');
    timerDisplay.classList.add('danger');
  } else if (seconds <= 10) {
    timerDisplay.classList.add('warning');
    timerDisplay.classList.remove('danger');
  } else {
    timerDisplay.classList.remove('warning', 'danger');
  }
}

// Next question
function goToNextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  
  // Store response
  responses.push({
    questionId: questions[currentQuestionIndex].id,
    selectedAnswer: selectedAnswer ? selectedAnswer.value : null
  });

  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    submitQuiz();
  } else {
    displayQuestion();
  }
}

// Next button click
document.getElementById('nextBtn').addEventListener('click', goToNextQuestion);

// Submit quiz
async function submitQuiz() {
  if (timerId) clearInterval(timerId);

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        categoryId: categoryData.id,
        responses: responses
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit quiz');
    }

    const result = await response.json();
    showResult(result);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    showError('Erreur lors de la soumission du quiz');
  }
}

// Show result
function showResult(result) {
  document.getElementById('questionContainer').style.display = 'none';
  const resultScreen = document.getElementById('resultScreen');
  resultScreen.style.display = 'block';

  document.getElementById('scoreValue').textContent = result.score;
  document.getElementById('totalQuestions').textContent = result.totalQuestions;
  document.getElementById('percentageValue').textContent = result.percentage + '%';
}

// Error display
function showError(message) {
  const container = document.getElementById('quizContent');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  container.insertBefore(errorDiv, container.firstChild);
}
