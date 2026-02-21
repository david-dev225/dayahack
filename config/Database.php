<?php
// config/Database.php
class Database {
    private $host = 'localhost';
    private $db_name = 'dayahack';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function connect() {
        $this->conn = new mysqli($this->host, $this->username, $this->password);

        if ($this->conn->connect_error) {
            die('Erreur de connexion: ' . $this->conn->connect_error);
        }

        // Créer la base de données si elle n'existe pas
        $this->conn->query("CREATE DATABASE IF NOT EXISTS {$this->db_name}");
        $this->conn->select_db($this->db_name);

        return $this->conn;
    }

    public function initDatabase() {
        $conn = $this->connect();

        // Table users
        $conn->query("CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            fullname VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");

        // Table categories
        $conn->query("CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            icon VARCHAR(50)
        )");

        // Table questions
        $conn->query("CREATE TABLE IF NOT EXISTS questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_id INT NOT NULL,
            question_text TEXT NOT NULL,
            option_a TEXT NOT NULL,
            option_b TEXT NOT NULL,
            option_c TEXT NOT NULL,
            option_d TEXT NOT NULL,
            correct_answer VARCHAR(1) NOT NULL,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )");

        // Table user_responses
        $conn->query("CREATE TABLE IF NOT EXISTS user_responses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            question_id INT NOT NULL,
            selected_answer VARCHAR(1),
            is_correct BOOLEAN,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (question_id) REFERENCES questions(id)
        )");

        // Table quiz_attempts
        $conn->query("CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            category_id INT NOT NULL,
            score INT,
            total_questions INT,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )");

        // Insérer les catégories
        $categories = [
            ['Web Development', 'Questions sur le développement web'],
            ['Mobile Development', 'Questions sur le développement mobile'],
            ['Data Science', 'Questions sur la science des données'],
            ['DevOps', 'Questions sur DevOps et infrastructure'],
            ['Mixed', 'Questions mixtes de toutes les catégories']
        ];

        foreach ($categories as $cat) {
            $conn->query("INSERT IGNORE INTO categories (name, description) VALUES ('{$cat[0]}', '{$cat[1]}')");
        }

        return $conn;
    }
}
?>
