# DayaHack - Plateforme de Pré-sélection Hackathon

## 📋 Description

DayaHack est une plateforme de pré-sélection pour le hackathon DayaHack 2026. Elle permet aux participants de :

- ✅ S'inscrire avec un formulaire simple
- ✅ Se connecter à leur compte
- ✅ Accéder à différentes catégories de quiz
- ✅ Répondre à des questions avec un chronomètre (15 secondes par question)
- ✅ Voir les résultats instantanément
- ✅ Consulter l'historique de leurs tentatives

## 🎯 Catégories disponibles

1. **Web Development** - Questions sur HTML, CSS, JavaScript, etc.
2. **Mobile Development** - Questions sur Android, iOS, React Native, etc.
3. **Data Science** - Questions sur Machine Learning, Python, etc.
4. **DevOps** - Questions sur Docker, Kubernetes, CI/CD, etc.
5. **Mixed** - Questions aléatoires de toutes les catégories

Chaque quiz contient **15 questions** avec **15 secondes par question**.

## 🚀 Installation et Utilisation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

### Installation

```bash
cd "Dayasoft preselection"
npm install
```

### Configuration

Créer un fichier `.env` (déjà fourni) :

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-this-in-production
```

### Initialiser la base de données avec des exemples

```bash
node seed.js
```

### Démarrer le serveur

```bash
npm start
```

Le serveur sera accessible à `http://localhost:5000`

### Mode développement (avec auto-reload)

```bash
npm run dev
```

## 📚 Structure du projet

```
Dayasoft preselection/
├── public/
│   ├── index.html           # Page d'accueil
│   ├── register.html        # Page d'inscription
│   ├── login.html           # Page de connexion
│   ├── categories.html      # Page des catégories
│   ├── quiz.html            # Page du quiz
│   ├── css/
│   │   └── style.css        # CSS global
│   └── js/
│       ├── register.js      # Logic d'inscription
│       ├── login.js         # Logic de connexion
│       ├── categories.js    # Logic des catégories
│       └── quiz.js          # Logic du quiz avec timer
├── config/
│   └── database.js          # Configuration SQLite
├── routes/
│   ├── auth.js              # Routes d'authentification
│   └── quiz.js              # Routes du quiz
├── server.js                # Serveur principal
├── seed.js                  # Script de remplissage de la BD
├── package.json             # Dépendances
├── .env                     # Variables d'environnement
└── data/
    └── dayahack.db          # Base de données SQLite
```

## 🔐 Authentification

- Les utilisateurs doivent créer un compte avant de pouvoir accéder aux quiz
- Les mots de passe sont hashés avec bcrypt
- Les tokens JWT sont utilisés pour sécuriser les routes protégées
- Les tokens expirent après 7 jours

## 💾 Base de données

### Schéma

**users** - Utilisateurs inscrits

- id, email, username, fullname, password, created_at

**categories** - Catégories de quiz

- id, name, description, icon

**questions** - Questions du quiz

- id, category_id, question_text, option_a, option_b, option_c, option_d, correct_answer

**user_responses** - Réponses des utilisateurs

- id, user_id, question_id, selected_answer, is_correct, created_at

**quiz_attempts** - Historique des tentatives

- id, user_id, category_id, score, total_questions, completed_at

## 🎮 Utilisation

1. **Accès initial** : Allez à `http://localhost:5000`
2. **Inscription** : Cliquez sur "S'inscrire" et remplissez le formulaire
3. **Connexion** : Utilisez vos identifiants
4. **Sélection catégorie** : Choisissez une catégorie de quiz
5. **Quiz** : Répondez aux 15 questions avec 15 secondes par question
6. **Résultats** : Consultez votre score et l'historique

## ⏱️ Système de chronomètre

- **15 secondes** par question
- **Orange** : Les 5 dernières secondes
- **Rouge** : Les 3 dernières secondes
- Passage automatique à la question suivante après expiration du temps

## 📊 API Endpoints

### Authentification

- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/auth/user` - Infos utilisateur

### Quiz

- `GET /api/quiz/categories` - Lister les catégories
- `GET /api/quiz/category/:id` - Questions d'une catégorie
- `POST /api/quiz/submit` - Soumettre les réponses
- `GET /api/quiz/results` - Historique des résultats

## 🛠️ Technologie utilisée

- **Backend** : Node.js + Express.js
- **Frontend** : HTML5 + CSS3 + JavaScript Vanilla
- **Database** : SQLite3
- **Authentification** : JWT + bcryptjs
- **Validation** : express-validator

## 📝 Notes importantes

- Les données de la base de données sont stockées dans `data/dayahack.db`
- Le script `seed.js` crée 4 catégories avec 15 questions chacune
- Les tokens JWT contiennent l'ID utilisateur et l'email
- Les réponses sont enregistrées pour chaque question

## 🚀 Prochaines étapes (Optional)

- Ajouter plus de questions
- Implémenter un système de classement
- Ajouter des certificats de réussite
- Intégrer un système de points
- Ajouter un panel d'administration

## 📧 Support

Pour toute question ou problème, veuillez contacter l'équipe DayaHack.
