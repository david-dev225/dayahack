<?php
// api/results.php
header('Content-Type: application/json');
session_start();
require_once '../config/Database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Non authentifié']);
    exit;
}

$userId = $_SESSION['user_id'];
$db = new Database();
$conn = $db->connect();

$result = $conn->query("SELECT qa.id, c.name as category, qa.score, qa.total_questions,
                       ROUND((qa.score * 100.0 / qa.total_questions), 2) as percentage,
                       qa.completed_at
                       FROM quiz_attempts qa
                       JOIN categories c ON qa.category_id = c.id
                       WHERE qa.user_id = $userId
                       ORDER BY qa.completed_at DESC");

$results = [];
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo json_encode($results);
$conn->close();
?>
