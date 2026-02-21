<?php
// api/submit_quiz.php
header('Content-Type: application/json');
session_start();
require_once '../config/Database.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Non authentifié']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$categoryId = intval($data['categoryId'] ?? 0);
$responses = $data['responses'] ?? [];
$userId = $_SESSION['user_id'];

$db = new Database();
$conn = $db->connect();

$correctCount = 0;
$totalQuestions = count($responses);

foreach ($responses as $response) {
    $questionId = intval($response['questionId']);
    $selectedAnswer = $conn->real_escape_string($response['selectedAnswer'] ?? '');
    
    // Récupérer la bonne réponse
    $result = $conn->query("SELECT correct_answer FROM questions WHERE id = $questionId");
    $question = $result->fetch_assoc();
    
    $isCorrect = ($question['correct_answer'] === $selectedAnswer) ? 1 : 0;
    if ($isCorrect) {
        $correctCount++;
    }
    
    // Enregistrer la réponse
    $conn->query("INSERT INTO user_responses (user_id, question_id, selected_answer, is_correct) 
                  VALUES ($userId, $questionId, '$selectedAnswer', $isCorrect)");
}

// Enregistrer la tentative
$conn->query("INSERT INTO quiz_attempts (user_id, category_id, score, total_questions) 
              VALUES ($userId, $categoryId, $correctCount, $totalQuestions)");

$percentage = round(($correctCount / $totalQuestions) * 100);

echo json_encode([
    'score' => $correctCount,
    'totalQuestions' => $totalQuestions,
    'percentage' => $percentage
]);

$conn->close();
?>
