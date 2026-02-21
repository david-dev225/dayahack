const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const JWT_SECRET = 'your-secret-key-change-this';
const dataDir = path.join(__dirname, '../data');

function getUsers() {
  const file = path.join(dataDir, 'users.json');
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
}

function saveUsers(users) {
  const file = path.join(dataDir, 'users.json');
  fs.writeFileSync(file, JSON.stringify(users, null, 2));
}

// Register
router.post('/register', (req, res) => {
  try {
    const { email, username, fullname, password } = req.body;

    if (!email || !username || !fullname || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit avoir au moins 6 caractères' });
    }

    const users = getUsers();
    
    if (users.find(u => u.email === email || u.username === username)) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      id: users.length + 1,
      email,
      username,
      fullname,
      password: hashedPassword,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullname: user.fullname
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Get user info
router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Pas de token' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
});

module.exports = router;
