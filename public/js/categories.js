// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      document.getElementById('userGreeting').textContent = `Bienvenue, ${user.fullname}!`;
    }

    loadCategories();
    loadResults();

    // Add event listener for mixed quiz button
    const startMixedBtn = document.getElementById('startMixedBtn');
    if (startMixedBtn) {
      startMixedBtn.addEventListener('click', () => {
        startMixedQuiz();
      });
    }
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
});

// Load categories
async function loadCategories() {
  try {
    const token = localStorage.getItem('token');
    console.log('📌 Token:', token ? '✅ Existe' : '❌ Manquant');
    console.log('📌 Appel API: /api/quiz/categories');
    
    const response = await fetch('/api/quiz/categories', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('📌 Status réponse:', response.status);

    if (!response.ok) {
      console.error('❌ Erreur API:', response.status, response.statusText);
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();
    console.log('✅ Catégories chargées:', categories.length);
    displayCategories(categories);
  } catch (error) {
    console.error('Error loading categories:', error);
    showError('Erreur lors du chargement des catégories');
  }
}

// Display categories
function displayCategories(categories) {
  const container = document.getElementById('categoriesContainer');
  container.innerHTML = '';

  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'category-card';
    
    const icons = {
      'Web Development': '🌐',
      'Mobile Development': '📱',
      'Data Science': '📊',
      'DevOps': '⚙️',
      'Mixed': '🎯'
    };

    card.innerHTML = `
      <div class="category-header">
        ${icons[category.name] || '📚'}
      </div>
      <div class="category-body">
        <h3>${category.name}</h3>
        <p>${category.description || 'Testez vos compétences'}</p>
        <button class="btn btn-primary" onclick="startQuiz(${category.id}, '${category.name}')">
          Commencer
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Start quiz from category
function startQuiz(categoryId, categoryName) {
  localStorage.setItem('currentCategory', JSON.stringify({ id: categoryId, name: categoryName }));
  window.location.href = '/quiz';
}

// Start mixed quiz (all categories)
function startMixedQuiz() {
  localStorage.setItem('currentCategory', JSON.stringify({ id: null, name: 'Mix complet' }));
  window.location.href = '/quiz';
}

// Load results
async function loadResults() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/quiz/results', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }

    const results = await response.json();
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

  results.forEach(result => {
    const date = new Date(result.completed_at).toLocaleDateString('fr-FR');
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.innerHTML = `
      <h4>${result.category}</h4>
      <p>Date: <strong>${date}</strong></p>
      <p class="result-score">
        Score: ${result.score}/${result.total_questions} (${result.percentage}%)
      </p>
    `;
    resultsContainer.appendChild(resultItem);
  });

  resultsSection.style.display = 'block';
}

function showError(message) {
  alert(message);
}
