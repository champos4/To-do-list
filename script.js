document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    let tasks = [];

    // Load tasks on page load
    loadTasks();

    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });

    // Functions
    async function loadTasks() {
        try {
            const response = await fetch('api/get_tasks.php');
            tasks = await response.json();
            renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;

        try {
            const response = await fetch('api/add_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            const newTask = await response.json();
            tasks.push(newTask);
            taskInput.value = '';
            renderTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async function toggleTask(id) {
        try {
            const response = await fetch('api/toggle_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            const updatedTask = await response.json();
            tasks = tasks.map(task => task.id === id ? updatedTask : task);
            renderTasks();
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    }

    async function deleteTask(id) {
        try {
            await fetch('api/delete_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async function editTask(id, newText) {
        try {
            const response = await fetch('api/edit_task.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, text: newText })
            });

            const updatedTask = await response.json();
            tasks = tasks.map(task => task.id === id ? updatedTask : task);
            renderTasks();
        } catch (error) {
            console.error('Error editing task:', error);
        }
    }

    function renderTasks() {
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
        });

        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;

            // Event Listeners for task actions
            const checkbox = li.querySelector('.task-checkbox');
            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            const taskText = li.querySelector('.task-text');

            checkbox.addEventListener('change', () => toggleTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            editBtn.addEventListener('click', () => {
                const currentText = taskText.textContent;
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'edit-input';
                input.value = currentText;
                
                taskText.replaceWith(input);
                input.focus();

                const saveEdit = () => {
                    const newText = input.value.trim();
                    if (newText && newText !== currentText) {
                        editTask(task.id, newText);
                    } else {
                        renderTasks();
                    }
                };

                input.addEventListener('blur', saveEdit);
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') saveEdit();
                });
            });

            taskList.appendChild(li);
        });
    }
}); 