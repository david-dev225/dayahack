// Categories Page - Load from embedded data
document.addEventListener('DOMContentLoaded', () => {
  // Wait for QUIZ_DATA to be loaded
  if (typeof QUIZ_DATA !== 'undefined') {
    loadCategories();
    loadResults();
    setupEventListeners();
  } else {
    console.error('QUIZ_DATA not loaded yet, retrying...');
    setTimeout(() => {
      if (typeof QUIZ_DATA !== 'undefined') {
        loadCategories();
        loadResults();
        setupEventListeners();
      } else {
        console.error('QUIZ_DATA still not available');
        alert('Erreur: Les données du quiz n\'ont pas pu être chargées');
      }
    }, 500);
  }
});

function setupEventListeners() {
  const startMixedBtn = document.getElementById('startMixedBtn');
  if (startMixedBtn) {
    startMixedBtn.addEventListener('click', () => {
      startMixedQuiz();
    });
  }
}

// Load and display categories
function loadCategories() {
  try {
    if (typeof QUIZ_DATA === 'undefined') {
      console.error('QUIZ_DATA is not defined');
      return;
    }
    const categories = QUIZ_DATA.categories;
    console.log('Categories loaded:', categories.length);
    displayCategories(categories);
  } catch (error) {
    console.error('Error loading categories:', error);
    showError('Erreur lors du chargement des catégories');
  }
}

// Display categories in grid
function displayCategories(categories) {
  console.log('displayCategories called with', categories.length, 'categories');
  const container = document.getElementById('categoriesContainer');
  
  if (!container) {
    console.error('Container #categoriesContainer not found');
    return;
  }
  
  console.log('Container found, clearing and populating');
  container.innerHTML = '';

  categories.forEach(category => {
    console.log('Creating card for category:', category.name);
    const card = document.createElement('div');
    card.className = 'category-card';
    
    const questionsCount = QUIZ_DATA.questions.filter(q => q.category_id === category.id).length;

    card.innerHTML = `
      <div class="category-header">
        ${category.icon}
      </div>
      <div class="category-body">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
        <p style="font-size: 0.85em; color: var(--primary-color); margin: 10px 0;">📚 ${questionsCount} questions</p>
        <button class="btn btn-primary" onclick="startQuiz(${category.id}, '${category.name}')">
          Entraîner
        </button>
      </div>
    `;

    container.appendChild(card);
  });
  
  console.log('All categories displayed');
}

// Start category quiz
function startQuiz(categoryId, categoryName) {
  sessionStorage.setItem('currentCategory', JSON.stringify({ id: categoryId, name: categoryName }));
  window.location.href = '/quiz';
}

// Start mixed quiz (all categories)
function startMixedQuiz() {
  sessionStorage.setItem('currentCategory', JSON.stringify({ id: null, name: 'Mix complet' }));
  window.location.href = '/quiz';
}

// Load results from localStorage
function loadResults() {
  try {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    if (results.length > 0) {
      displayResults(results);
    }
  } catch (error) {
    console.error('Error loading results:', error);
  }
}

// Display results
function displayResults(results) {
  const resultsSection = document.getElementById('resultsSection');
  const resultsContainer = document.getElementById('resultsContainer');
  
  resultsContainer.innerHTML = '';

  results.slice(0, 5).forEach(result => {
    const date = new Date(result.date).toLocaleDateString('fr-FR');
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
      <h4>${result.category}</h4>
      <p>Date: <strong>${date}</strong></p>
      <p class="result-score">
        Score: ${result.score}/${result.total} (${result.percentage}%)
      </p>
    `;
    resultsContainer.appendChild(resultItem);
  });

  if (results.length > 0) {
    resultsSection.style.display = 'block';
  }
}

function showError(message) {
  alert(message);
}
