<?php
// api/categories.php
header('Content-Type: application/json');
session_start();
require_once '../config/Database.php';

// Vérifier l'authentification
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Non authentifié']);
    exit;
}

$db = new Database();
$conn = $db->connect();

$result = $conn->query("SELECT id, name, description FROM categories");
$categories = [];

while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

echo json_encode($categories);
$conn->close();
?>
