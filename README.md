# Todo List Application

A simple and modern Todo List application built with HTML, CSS, JavaScript, and PHP. The application features a clean user 
interface and persistent storage using JSON file-based storage.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Filter tasks (All/Active/Completed)
- Persistent storage using JSON file
- Modern and responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- PHP
- JSON for data storage

## Setup Instructions

1. Clone the repository:
```bash
git clone <https://github.com/champos4/To-do-list/tree/main>
cd todo-list
```

2. Make sure you have PHP installed on your system.

3. Start a PHP development server:
```bash
php -S localhost:8000
```

4. Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
todo-list/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # Frontend JavaScript
├── api/               # Backend PHP files
│   ├── config.php     # Configuration and helper functions
│   ├── get_tasks.php  # Get all tasks
│   ├── add_task.php   # Add new task
│   ├── edit_task.php  # Edit existing task
│   ├── delete_task.php # Delete task
│   └── toggle_task.php # Toggle task completion
└── README.md          # Project documentation
```

## API Endpoints

- `GET /api/get_tasks.php` - Get all tasks
- `POST /api/add_task.php` - Add a new task
- `POST /api/edit_task.php` - Edit an existing task
- `POST /api/delete_task.php` - Delete a task
- `POST /api/toggle_task.php` - Toggle task completion status

## Contributing

Feel free to submit issues and enhancement requests! 