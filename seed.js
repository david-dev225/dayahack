const db = require('./config/database');

const sampleQuestions = [
  // Web Development
  {
    categoryId: 1,
    questions: [
      {
        text: 'Quel est le rôle principal de HTML?',
        a: 'Ajouter des styles',
        b: 'Structurer le contenu',
        c: 'Gérer les événements',
        d: 'Créer des animations',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que CSS signifie?',
        a: 'Computer Style Sheets',
        b: 'Cascading Style Sheets',
        c: 'Creative Style Sheets',
        d: 'Content Style Sheets',
        correct: 'B'
      },
      {
        text: 'Quel langage est utilisé pour la programmation côté client?',
        a: 'Python',
        b: 'Java',
        c: 'JavaScript',
        d: 'PHP',
        correct: 'C'
      },
      {
        text: 'Qu\'est-ce qu\'un framework JavaScript populaire?',
        a: 'Django',
        b: 'React',
        c: 'Laravel',
        d: 'Flask',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le responsive design?',
        a: 'Un site qui change la couleur',
        b: 'Un site qui s\'adapte à différentes tailles d\'écran',
        c: 'Un site rapide',
        d: 'Un site avec animations',
        correct: 'B'
      },
      {
        text: 'Quel est l\'élément racine en HTML5?',
        a: '<body>',
        b: '<head>',
        c: '<html>',
        d: '<root>',
        correct: 'C'
      },
      {
        text: 'Qu\'est-ce que ECMAScript?',
        a: 'Un serveur web',
        b: 'Un navigateur',
        c: 'La norme pour JavaScript',
        d: 'Une base de données',
        correct: 'C'
      },
      {
        text: 'Quel sélecteur CSS sélectionne tous les éléments?',
        a: '.all',
        b: '*',
        c: 'all',
        d: '#all',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le box-model en CSS?',
        a: 'Un type de boîte',
        b: 'Un modèle qui décrit comment les éléments occupent l\'espace',
        c: 'Un sélecteur',
        d: 'Une propriété de couleur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que JSON?',
        a: 'Un langage de programmation',
        b: 'Un format de données léger',
        c: 'Un serveur',
        d: 'Un framework',
        correct: 'B'
      },
      {
        text: 'Quel est l\'avantage principal d\'utiliser des frameworks?',
        a: 'Réduire le code boilerplate',
        b: 'Augmenter la taille du site',
        c: 'Ralentir le développement',
        d: 'Compliquer le code',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce que le REST API?',
        a: 'Une architecture pour les services web',
        b: 'Un langage de programmation',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce qu\'une fonction anonyme?',
        a: 'Une fonction sans nom',
        b: 'Une fonction cachée',
        c: 'Une fonction privée',
        d: 'Une fonction statique',
        correct: 'A'
      },
      {
        text: 'Quel est le type de contenu MIME pour JSON?',
        a: 'text/json',
        b: 'application/json',
        c: 'data/json',
        d: 'object/json',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le callback en JavaScript?',
        a: 'Une fonction passée comme argument',
        b: 'Une variable globale',
        c: 'Un événement souris',
        d: 'Un type de boucle',
        correct: 'A'
      }
    ]
  },
  // Mobile Development
  {
    categoryId: 2,
    questions: [
      {
        text: 'Qu\'est-ce qu\'Android?',
        a: 'Un système d\'exploitation mobile',
        b: 'Une application',
        c: 'Un langage de programmation',
        d: 'Un navigateur',
        correct: 'A'
      },
      {
        text: 'Quel langage est utilisé pour développer des applications iOS?',
        a: 'Java',
        b: 'Kotlin',
        c: 'Swift',
        d: 'C++',
        correct: 'C'
      },
      {
        text: 'Qu\'est-ce qu\'une Activity en Android?',
        a: 'Une classe qui représente une activité',
        b: 'Un composant qui fournit l\'interface utilisateur',
        c: 'Un service de notification',
        d: 'Un gestionnaire de permissions',
        correct: 'B'
      },
      {
        text: 'Quel est le manifest principal en Android?',
        a: 'build.gradle',
        b: 'AndroidManifest.xml',
        c: 'manifest.json',
        d: 'package.xml',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Flutter?',
        a: 'Un langage de programmation',
        b: 'Un éditeur de texte',
        c: 'Un framework pour développer des applications mobiles',
        d: 'Un serveur web',
        correct: 'C'
      },
      {
        text: 'Quel framework React Native requiert?',
        a: 'HTML et CSS',
        b: 'JavaScript et React',
        c: 'Java et XML',
        d: 'Swift et Objective-C',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une Fragment en Android?',
        a: 'Une partie d\'une Activity',
        b: 'Un service',
        c: 'Une base de données',
        d: 'Un fichier de configuration',
        correct: 'A'
      },
      {
        text: 'Quel est le principal avantage du Cross-platform?',
        a: 'Meilleure performance',
        b: 'Un seul codebase pour plusieurs plateformes',
        c: 'Interface native',
        d: 'Plus de mémoire',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que une View en Android?',
        a: 'Un composant d\'interface utilisateur',
        b: 'Un fichier XML',
        c: 'Une activité',
        d: 'Un service',
        correct: 'A'
      },
      {
        text: 'Quel est le format principal pour les interfaces en Android?',
        a: 'JSON',
        b: 'CSS',
        c: 'XML',
        d: 'YAML',
        correct: 'C'
      },
      {
        text: 'Qu\'est-ce qu\'une notification push?',
        a: 'Un message pop-up',
        b: 'Un message envoyé à l\'appareil',
        c: 'Un événement clavier',
        d: 'Un périphérique',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Kotlin?',
        a: 'Un système d\'exploitation',
        b: 'Un langage de programmation pour Android',
        c: 'Un framework web',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Quel est le principal avantage de Swift?',
        a: 'C\'est lent',
        b: 'C\'est sûr et moderne',
        c: 'C\'est difficile à apprendre',
        d: 'C\'est ancien',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une API Android?',
        a: 'Une application pour téléphones',
        b: 'Un ensemble de règles et d\'outils',
        c: 'Un service web',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Quel IDE est principalement utilisé pour le développement Android?',
        a: 'Visual Studio',
        b: 'Android Studio',
        c: 'PyCharm',
        d: 'WebStorm',
        correct: 'B'
      }
    ]
  },
  // Data Science
  {
    categoryId: 3,
    questions: [
      {
        text: 'Qu\'est-ce que le machine learning?',
        a: 'Un serveur',
        b: 'Une technique pour apprendre à partir de données',
        c: 'Un langage de programmation',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Quel langage est principalement utilisé pour la science des données?',
        a: 'JavaScript',
        b: 'Python',
        c: 'Ruby',
        d: 'Go',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que pandas?',
        a: 'Une bibliothèque Python pour l\'analyse de données',
        b: 'Un éditeur de texte',
        c: 'Un navigateur',
        d: 'Un serveur',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce qu\'un dataset?',
        a: 'Un ensemble de données',
        b: 'Un algorithme',
        c: 'Un graphique',
        d: 'Un modèle',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce que NumPy?',
        a: 'Un framework web',
        b: 'Une bibliothèque pour le calcul numérique',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le deep learning?',
        a: 'Un type de machine learning avec réseaux de neurones',
        b: 'Un langage de programmation',
        c: 'Un serveur web',
        d: 'Une base de données',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce qu\'une matrice en science des données?',
        a: 'Un film',
        b: 'Une array bidimensionnelle',
        c: 'Un serveur',
        d: 'Un langage',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que sklearn?',
        a: 'Un éditeur',
        b: 'Une bibliothèque Python pour le machine learning',
        c: 'Un jeu vidéo',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'un modèle prédictif?',
        a: 'Un modèle 3D',
        b: 'Un modèle qui prédit des valeurs futures',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que la régression linéaire?',
        a: 'Une ligne droite',
        b: 'Un algorithme de machine learning',
        c: 'Un graphique',
        d: 'Une équation',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une classification?',
        a: 'Organiser les données en catégories',
        b: 'Un serveur',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce que TensorFlow?',
        a: 'Un serveur',
        b: 'Une bibliothèque pour le deep learning',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une feature?',
        a: 'Une caractéristique d\'une donnée',
        b: 'Un serveur',
        c: 'Un langage',
        d: 'Une base de données',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce que le overfitting?',
        a: 'Quand un modèle est trop bon',
        b: 'Quand un modèle s\'adapte trop aux données d\'entraînement',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que la validation croisée?',
        a: 'Une technique d\'évaluation de modèles',
        b: 'Un serveur',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'A'
      }
    ]
  },
  // DevOps
  {
    categoryId: 4,
    questions: [
      {
        text: 'Qu\'est-ce que DevOps?',
        a: 'Une méthodologie combinant développement et opérations',
        b: 'Un langage de programmation',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'A'
      },
      {
        text: 'Qu\'est-ce que Docker?',
        a: 'Un langage de programmation',
        b: 'Une plateforme de containerisation',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'un container?',
        a: 'Un emballage',
        b: 'Une unité légère et isolée pour exécuter une application',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Kubernetes?',
        a: 'Un langage',
        b: 'Une plateforme d\'orchestration de containers',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que CI/CD?',
        a: 'Un langage',
        b: 'Continuous Integration/Continuous Deployment',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Git?',
        a: 'Un serveur',
        b: 'Un système de contrôle de version',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une image Docker?',
        a: 'Une photo',
        b: 'Un modèle pour créer des containers',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'un Jenkins?',
        a: 'Un langage',
        b: 'Un outil d\'automatisation CI/CD',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que l\'infrastructure as code?',
        a: 'Un serveur',
        b: 'Gérer l\'infrastructure via du code',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le monitoring?',
        a: 'Regarder quelque chose',
        b: 'Surveiller les performances et la santé du système',
        c: 'Un serveur',
        d: 'Une base de données',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Ansible?',
        a: 'Un langage',
        b: 'Un outil d\'automatisation IT',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que Terraform?',
        a: 'Un langage',
        b: 'Un outil pour l\'infrastructure as code',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'un conteneur?',
        a: 'Un serveur',
        b: 'Un environnement isolé pour une application',
        c: 'Une base de données',
        d: 'Un langage',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce qu\'une API Gateway?',
        a: 'Un langage',
        b: 'Un point d\'entrée pour les API',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      },
      {
        text: 'Qu\'est-ce que le load balancing?',
        a: 'Un langage',
        b: 'Distribuer le trafic entre plusieurs serveurs',
        c: 'Une base de données',
        d: 'Un serveur',
        correct: 'B'
      }
    ]
  }
];

// Insert sample questions
async function seedDatabase() {
  try {
    for (const category of sampleQuestions) {
      for (const q of category.questions) {
        await db.run(
          `INSERT INTO questions (category_id, question_text, option_a, option_b, option_c, option_d, correct_answer)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [category.categoryId, q.text, q.a, q.b, q.c, q.d, q.correct]
        );
      }
    }
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
