<?php
// api/register.php
header('Content-Type: application/json');
require_once '../config/Database.php';

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

$fullname = $conn->real_escape_string($data['fullname'] ?? '');
$email = $conn->real_escape_string($data['email'] ?? '');
$username = $conn->real_escape_string($data['username'] ?? '');
$password = $data['password'] ?? '';

// Validation
if (empty($fullname) || empty($email) || empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Tous les champs sont requis']);
    exit;
}

if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['message' => 'Le mot de passe doit avoir au moins 6 caractères']);
    exit;
}

// Vérifier si l'utilisateur existe
$result = $conn->query("SELECT id FROM users WHERE email = '$email' OR username = '$username'");
if ($result->num_rows > 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Utilisateur déjà existant']);
    exit;
}

// Hash du mot de passe
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insérer l'utilisateur
$sql = "INSERT INTO users (email, username, fullname, password) 
        VALUES ('$email', '$username', '$fullname', '$hashedPassword')";

if ($conn->query($sql) === TRUE) {
    http_response_code(201);
    echo json_encode(['message' => 'Inscription réussie']);
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Erreur lors de l\'inscription']);
}

$conn->close();
?>
