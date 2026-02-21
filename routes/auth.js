const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, username, fullname, password } = req.body;

    if (!email || !username || !fullname || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit avoir au moins 6 caractères' });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      email,
      username,
      fullname,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
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
