<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$text = trim($data['text'] ?? '');

if (!$id || empty($text)) {
    http_response_code(400);
    echo json_encode(['error' => 'Task ID and text are required']);
    exit;
}

$tasks = getTasks();
$taskIndex = array_search($id, array_column($tasks, 'id'));

if ($taskIndex === false) {
    http_response_code(404);
    echo json_encode(['error' => 'Task not found']);
    exit;
}

$tasks[$taskIndex]['text'] = $text;
saveTasks($tasks);

echo json_encode($tasks[$taskIndex]);
?> 