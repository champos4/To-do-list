<?php
header('Content-Type: application/json');
require_once 'config.php';

$tasks = getTasks();
echo json_encode($tasks);
?> 