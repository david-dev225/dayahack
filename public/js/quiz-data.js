// Quiz Data - Embedded questions for training
const QUIZ_DATA = {
  categories: [
    { id: 1, name: "Web Development", icon: "🌐", description: "HTML, CSS, JavaScript, React, Vue" },
    { id: 2, name: "Mobile Development", icon: "📱", description: "React Native, Flutter, iOS, Android" },
    { id: 3, name: "AI & Machine Learning", icon: "🤖", description: "ML, Deep Learning, NLP, TensorFlow" },
    { id: 4, name: "Cloud & DevOps", icon: "☁️", description: "AWS, Docker, Kubernetes, CI/CD" },
    { id: 5, name: "Data Science", icon: "📊", description: "Python, SQL, Data Analysis, Visualization" },
    { id: 6, name: "Cybersecurity", icon: "🔒", description: "Security, Encryption, Network, Protocols" }
  ],
  questions: [
    // Web Development (Q1-Q10)
    { id: 1, category_id: 1, question_text: "Quel est le rôle principal de HTML?", option_a: "Ajouter des styles", option_b: "Structurer le contenu", option_c: "Gérer les événements", option_d: "Créer des animations", correct_answer: "B" },
    { id: 2, category_id: 1, question_text: "Que signifie CSS?", option_a: "Computer Style Sheets", option_b: "Cascading Style Sheets", option_c: "Creative Style Sheets", option_d: "Content Style Sheets", correct_answer: "B" },
    { id: 3, category_id: 1, question_text: "Quel langage est utilisé pour la programmation côté client?", option_a: "Python", option_b: "Java", option_c: "JavaScript", option_d: "PHP", correct_answer: "C" },
    { id: 4, category_id: 1, question_text: "Qu'est-ce que React?", option_a: "Un framework backend", option_b: "Une librairie JavaScript pour UI", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 5, category_id: 1, question_text: "Quel est le fichier de configuration npm?", option_a: "config.json", option_b: "package.json", option_c: "app.json", option_d: "settings.json", correct_answer: "B" },
    { id: 6, category_id: 1, question_text: "Que fait le flexbox en CSS?", option_a: "Crée des animations", option_b: "Organise les éléments horizontalement/verticalement", option_c: "Ajoute des ombres", option_d: "Change les couleurs", correct_answer: "B" },
    { id: 7, category_id: 1, question_text: "Qu'est-ce que Vue?", option_a: "Un langage de programmation", option_b: "Un framework JavaScript", option_c: "Une base de données", option_d: "Un serveur", correct_answer: "B" },
    { id: 8, category_id: 1, question_text: "Quelle balise HTML définit un paragraphe?", option_a: "<p>", option_b: "<para>", option_c: "<text>", option_d: "<paragraph>", correct_answer: "A" },
    { id: 9, category_id: 1, question_text: "Qu'est-ce que le DOM?", option_a: "Domain Object Model", option_b: "Document Object Model", option_c: "Data Object Model", option_d: "Dynamic Object Model", correct_answer: "B" },
    { id: 10, category_id: 1, question_text: "Quelle propriété CSS centre un élément?", option_a: "align-center", option_b: "center", option_c: "margin: auto", option_d: "text-align: center", correct_answer: "C" },
    
    // Mobile Development (Q11-Q20)
    { id: 11, category_id: 2, question_text: "Qu'est-ce que React Native?", option_a: "Un framework pour web uniquement", option_b: "Un framework pour apps mobiles", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 12, category_id: 2, question_text: "Quel langage utilise Flutter?", option_a: "JavaScript", option_b: "Python", option_c: "Dart", option_d: "Kotlin", correct_answer: "C" },
    { id: 13, category_id: 2, question_text: "Qu'est-ce qu'Android Studio?", option_a: "Un langage de programmation", option_b: "Un IDE pour développement Android", option_c: "Un design tool", option_d: "Un serveur web", correct_answer: "B" },
    { id: 14, category_id: 2, question_text: "Quel est le langage principal pour iOS?", option_a: "Swift", option_b: "Kotlin", option_c: "Java", option_d: "Dart", correct_answer: "A" },
    { id: 15, category_id: 2, question_text: "Qu'est-ce qu'une APK?", option_a: "Application Package pour Android", option_b: "Application Program Kit", option_c: "Application Protocol Key", option_d: "Application Processing Kit", correct_answer: "A" },
    { id: 16, category_id: 2, question_text: "Qu'est-ce que Xcode?", option_a: "Un éditeur de code", option_b: "L'IDE officiel d'Apple pour iOS", option_c: "Un framework mobile", option_d: "Un langage de programmation", correct_answer: "B" },
    { id: 17, category_id: 2, question_text: "Qu'est-ce que Gradle dans Android?", option_a: "Un IDE", option_b: "Un système de build", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 18, category_id: 2, question_text: "Qu'est-ce que Firebase?", option_a: "Un langage de programmation", option_b: "Une plateforme backend pour apps mobiles", option_c: "Un serveur web", option_d: "Un design tool", correct_answer: "B" },
    { id: 19, category_id: 2, question_text: "Quel est le format d'écran le plus courant sur iOS?", option_a: "720x1280", option_b: "1080x1920", option_c: "Varie selon le modèle", option_d: "Fixed à 800x600", correct_answer: "C" },
    { id: 20, category_id: 2, question_text: "Qu'est-ce qu'une lifecycle d'une activité Android?", option_a: "Un processus de compilation", option_b: "Les différents états d'une activité (onCreate, onStart, etc)", option_c: "Un système de sécurité", option_d: "Un module de stockage", correct_answer: "B" },
    
    // AI & Machine Learning (Q21-Q30)
    { id: 21, category_id: 3, question_text: "Qu'est-ce que le Machine Learning?", option_a: "Apprendre des machines à penser", option_b: "Permettre aux machines d'apprendre sans être programmées explicitement", option_c: "Construire des ordinateurs", option_d: "Écrire du code", correct_answer: "B" },
    { id: 22, category_id: 3, question_text: "Quel est le framework ML le plus populaire?", option_a: "Vue.js", option_b: "TensorFlow", option_c: "Django", option_d: "Laravel", correct_answer: "B" },
    { id: 23, category_id: 3, question_text: "Qu'est-ce que le Deep Learning?", option_a: "Apprendre en profondeur", option_b: "Les réseaux de neurones avec plusieurs couches", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 24, category_id: 3, question_text: "Qu'est-ce que PyTorch?", option_a: "Un port en Python", option_b: "Une librairie de ML en Python", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 25, category_id: 3, question_text: "Qu'est-ce que le NLP?", option_a: "Natural Language Processing", option_b: "Nested Language Protocol", option_c: "Network Language Pattern", option_d: "Numerical Language Processor", correct_answer: "A" },
    { id: 26, category_id: 3, question_text: "Qu'est-ce qu'une confusion matrix?", option_a: "Une matrice complexe", option_b: "Un outil pour évaluer la performance d'un modèle", option_c: "Une équation mathématique", option_d: "Un type de réseau de neurones", correct_answer: "B" },
    { id: 27, category_id: 3, question_text: "Qu'est-ce que l'overfitting?", option_a: "Trop de données", option_b: "Quand un modèle apprend trop bien les données d'entraînement", option_c: "Un type d'erreur", option_d: "Un algorithme", correct_answer: "B" },
    { id: 28, category_id: 3, question_text: "Qu'est-ce que la validation croisée?", option_a: "Valider en diagonale", option_b: "Une technique pour évaluer la performance d'un modèle", option_c: "Valider deux fois", option_d: "Une équation mathématique", correct_answer: "B" },
    { id: 29, category_id: 3, question_text: "Qu'est-ce qu'une RNN?", option_a: "Real Neural Network", option_b: "Recurrent Neural Network", option_c: "Recursive Network Node", option_d: "Rapid Neural Networking", correct_answer: "B" },
    { id: 30, category_id: 3, question_text: "Qu'est-ce qu'une CNN?", option_a: "Convolutional Neural Network", option_b: "Computer Neural Network", option_c: "Connected Neural Node", option_d: "Cascading Network Node", correct_answer: "A" },
    
    // Cloud & DevOps (Q31-Q40)
    { id: 31, category_id: 4, question_text: "Qu'est-ce que Docker?", option_a: "Un outil de shipping", option_b: "Un conteneur logiciel pour isoler les applications", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 32, category_id: 4, question_text: "Qu'est-ce que Kubernetes?", option_a: "Un conteneur", option_b: "Un outil d'orchestration de conteneurs", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 33, category_id: 4, question_text: "Qu'est-ce que AWS?", option_a: "Advanced Web Services", option_b: "Amazon Web Services", option_c: "Automated Web System", option_d: "Application Web Server", correct_answer: "B" },
    { id: 34, category_id: 4, question_text: "Qu'est-ce que CI/CD?", option_a: "Code Inspection / Code Delivery", option_b: "Continuous Integration / Continuous Deployment", option_c: "Computer Interface / Computing Device", option_d: "Code Integration / Code Development", correct_answer: "B" },
    { id: 35, category_id: 4, question_text: "Qu'est-ce que GitHub Actions?", option_a: "Un outil de design", option_b: "Un service de CI/CD", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 36, category_id: 4, question_text: "Qu'est-ce que Jenkins?", option_a: "Un langage de programmation", option_b: "Un outil d'automatisation CI/CD", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 37, category_id: 4, question_text: "Qu'est-ce qu'un Dockerfile?", option_a: "Un fichier CSV", option_b: "Un fichier qui définit comment construire une image Docker", option_c: "Un fichier de configuration", option_d: "Un fichier texte", correct_answer: "B" },
    { id: 38, category_id: 4, question_text: "Qu'est-ce que Terraform?", option_a: "Un langage de programmation", option_b: "Un outil d'Infrastructure as Code", option_c: "Un conteneur", option_d: "Une base de données", correct_answer: "B" },
    { id: 39, category_id: 4, question_text: "Qu'est-ce qu'un Pod dans Kubernetes?", option_a: "Un conteneur Docker", option_b: "La plus petite unité déployable dans Kubernetes", option_c: "Un cluster", option_d: "Un service", correct_answer: "B" },
    { id: 40, category_id: 4, question_text: "Qu'est-ce que GitLab CI?", option_a: "Un outil de versioning", option_b: "Un service CI/CD intégré à GitLab", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    
    // Data Science (Q41-Q50)
    { id: 41, category_id: 5, question_text: "Quel langage est le plus utilisé en Data Science?", option_a: "Java", option_b: "Python", option_c: "C++", option_d: "JavaScript", correct_answer: "B" },
    { id: 42, category_id: 5, question_text: "Qu'est-ce que Pandas?", option_a: "Un animal adorable", option_b: "Une librairie Python pour l'analyse de données", option_c: "Un framework web", option_d: "Un langage de programmation", correct_answer: "B" },
    { id: 43, category_id: 5, question_text: "Qu'est-ce que NumPy?", option_a: "Un nombre numérique", option_b: "Une librairie Python pour le calcul numérique", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 44, category_id: 5, question_text: "Qu'est-ce que Matplotlib?", option_a: "Une matrice de données", option_b: "Une librairie de visualisation de données", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 45, category_id: 5, question_text: "Qu'est-ce que SQL?", option_a: "Structured Query langage pour bases de données", option_b: "Simple Query Logic", option_c: "System Query Language", option_d: "Sequential Query Logic", correct_answer: "A" },
    { id: 46, category_id: 5, question_text: "Qu'est-ce qu'une requête SELECT?", option_a: "Sélectionne des colonnes de une table", option_b: "Sélectionne des lignes d'une table", option_c: "Supprime des données", option_d: "Insère des données", correct_answer: "B" },
    { id: 47, category_id: 5, question_text: "Qu'est-ce qu'une jointure SQL?", option_a: "Combine des lignes de plusieurs tables", option_b: "Supprime des données", option_c: "Crée une nouvelle table", option_d: "Sauvegarde les données", correct_answer: "A" },
    { id: 48, category_id: 5, question_text: "Qu'est-ce que Jupyter?", option_a: "Un langage de programmation", option_b: "Un environnement interactif pour Python", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 49, category_id: 5, question_text: "Qu'est-ce que Tableau?", option_a: "Un meuble", option_b: "Un outil de visualisation de données", option_c: "Un langage de programmation", option_d: "Une base de données", correct_answer: "B" },
    { id: 50, category_id: 5, question_text: "Qu'est-ce que la nettoyage de données?", option_a: "A literal cleaning", option_b: "Le processus de préparation et correction des données", option_c: "Supprimer une base de données", option_d: "Créer une nouvelle table", correct_answer: "B" },
    
    // Cybersecurity (Q51-Q60)
    { id: 51, category_id: 6, question_text: "Qu'est-ce qu'un firewall?", option_a: "Un mur de feu réel", option_b: "Un système de sécurité réseau", option_c: "Un serveur web", option_d: "Une base de données", correct_answer: "B" },
    { id: 52, category_id: 6, question_text: "Qu'est-ce que le SSL/TLS?", option_a: "Secure Socket Layer / Transport Layer Security", option_b: "Simple System Logic / Trusted Layer System", option_c: "Secure Source Language / Trusted Logic System", option_d: "System Security Link / Transport Link Security", correct_answer: "A" },
    { id: 53, category_id: 6, question_text: "Qu'est-ce qu'un VPN?", option_a: "Virtual Private Network", option_b: "Very Private Network", option_c: "Virtual Public Network", option_d: "Verified Private Node", correct_answer: "A" },
    { id: 54, category_id: 6, question_text: "Qu'est-ce qu'une attaque DDoS?", option_a: "Distributed Denial of Service", option_b: "Direct Denial of Service", option_c: "Digital Defense of System", option_d: "Data Denial of Service", correct_answer: "A" },
    { id: 55, category_id: 6, question_text: "Qu'est-ce que l'authentification à deux facteurs?", option_a: "Deux mots de passe", option_b: "Un mot de passe et un code", option_c: "Deux codes", option_d: "Pas nécessaire", correct_answer: "B" },
    { id: 56, category_id: 6, question_text: "Qu'est-ce qu'une faille de sécurité?", option_a: "Un problème de matériel", option_b: "Une vulnérabilité qui peut être exploitée", option_c: "Un problème de réseau", option_d: "Un problème de puissance", correct_answer: "B" },
    { id: 57, category_id: 6, question_text: "Qu'est-ce que le phishing?", option_a: "Un sport de pêche", option_b: "Une attaque pour voler des informations", option_c: "Un protocole réseau", option_d: "Un systèmes de sécurité", correct_answer: "B" },
    { id: 58, category_id: 6, question_text: "Qu'est-ce qu'une clé privée?", option_a: "Une clé à usage privé", option_b: "Une clé mathématique secrète utilisée en cryptographie", option_c: "Une clé de maison", option_d: "Une clé d'accès simple", correct_answer: "B" },
    { id: 59, category_id: 6, question_text: "Qu'est-ce qu'un certificat SSL?", option_a: "Un diplôme", option_b: "Un document qui authentifie une identité en ligne", option_c: "Un permis de conduire", option_d: "Un contrat", correct_answer: "B" },
    { id: 60, category_id: 6, question_text: "Qu'est-ce que le ransomware?", option_a: "Un logiciel malveillant qui chiffre des fichiers", option_b: "Un type d'antivirus", option_c: "Un protocole de communication", option_d: "Un système de sauvegarde", correct_answer: "A" }
  ]
};

// Make available globally
window.QUIZ_DATA = QUIZ_DATA;
