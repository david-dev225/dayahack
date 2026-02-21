document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    showError('Les mots de passe ne correspondent pas');
    return;
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname,
        email,
        username,
        password
      })
    });

    const data = await response.json();

    if (response.ok) {
      showSuccess('Inscription réussie! Redirection en cours...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      showError(data.message || 'Erreur lors de l\'inscription');
    }
  } catch (error) {
    console.error('Error:', error);
    showError('Erreur serveur');
  }
});

function showError(message) {
  const errorDiv = document.getElementById('errorMessage');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
  errorDiv.scrollIntoView({ behavior: 'smooth' });
}

function showSuccess(message) {
  const successDiv = document.getElementById('successMessage');
  successDiv.textContent = message;
  successDiv.style.display = 'block';
  successDiv.scrollIntoView({ behavior: 'smooth' });
}
