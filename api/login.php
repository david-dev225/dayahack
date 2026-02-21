<?php
// api/login.php
header('Content-Type: application/json');
session_start();
require_once '../config/Database.php';

$db = new Database();
$conn = $db->connect();

$data = json_decode(file_get_contents("php://input"), true);

$email = $conn->real_escape_string($data['email'] ?? '');
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['message' => 'Email et mot de passe requis']);
    exit;
}

$result = $conn->query("SELECT * FROM users WHERE email = '$email'");

if ($result->num_rows === 0) {
    http_response_code(400);
    echo json_encode(['message' => 'Identifiants invalides']);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Identifiants invalides']);
    exit;
}

// Créer une session
$_SESSION['user_id'] = $user['id'];
$_SESSION['email'] = $user['email'];
$_SESSION['username'] = $user['username'];
$_SESSION['fullname'] = $user['fullname'];

// Créer un token simple basé sur session
$token = bin2hex(random_bytes(32));
$_SESSION['token'] = $token;

http_response_code(200);
echo json_encode([
    'message' => 'Connexion réussie',
    'token' => $token,
    'user' => [
        'id' => $user['id'],
        'email' => $user['email'],
        'username' => $user['username'],
        'fullname' => $user['fullname']
    ]
]);

$conn->close();
?>
