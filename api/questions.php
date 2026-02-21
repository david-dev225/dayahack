<?php
// api/questions.php
header('Content-Type: application/json');
session_start();
require_once '../config/Database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Non authentifié']);
    exit;
}

$categoryId = $_GET['category_id'] ?? 0;

$db = new Database();
$conn = $db->connect();

if ($categoryId == 5) {
    // Mixed - questions aléatoires
    $result = $conn->query("SELECT id, category_id, question_text, option_a, option_b, option_c, option_d 
                            FROM questions ORDER BY RAND() LIMIT 15");
} else {
    // Catégorie spécifique
    $categoryId = intval($categoryId);
    $result = $conn->query("SELECT id, category_id, question_text, option_a, option_b, option_c, option_d 
                            FROM questions WHERE category_id = $categoryId LIMIT 15");
}

$questions = [];
while ($row = $result->fetch_assoc()) {
    $questions[] = $row;
}

echo json_encode($questions);
$conn->close();
?>
