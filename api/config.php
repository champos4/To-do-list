<?php
// Database configuration
define('DB_FILE', __DIR__ . '/tasks.json');

// Create tasks.json if it doesn't exist
if (!file_exists(DB_FILE)) {
    file_put_contents(DB_FILE, json_encode([]));
}

// Helper function to get all tasks
function getTasks() {
    $tasks = json_decode(file_get_contents(DB_FILE), true) ?? [];
    return $tasks;
}

// Helper function to save tasks
function saveTasks($tasks) {
    file_put_contents(DB_FILE, json_encode($tasks, JSON_PRETTY_PRINT));
}

// Helper function to get next task ID
function getNextId($tasks) {
    if (empty($tasks)) return 1;
    return max(array_column($tasks, 'id')) + 1;
}
?> 