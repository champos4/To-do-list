<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$text = trim($data['text'] ?? '');

if (empty($text)) {
    http_response_code(400);
    echo json_encode(['error' => 'Task text is required']);
    exit;
}

$tasks = getTasks();
$newTask = [
    'id' => getNextId($tasks),
    'text' => $text,
    'completed' => false,
    'created_at' => date('Y-m-d H:i:s')
];

$tasks[] = $newTask;
saveTasks($tasks);

echo json_encode($newTask);
?> 