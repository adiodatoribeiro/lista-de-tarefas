document.getElementById('task-form').addEventListener('submit', addTask);

function removeAccentAndApplyLowerCase(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function addTask(e) {
    e.preventDefault();

    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    const allListItems = document.querySelectorAll('li');

    const allListItemsData = []

    allListItems.forEach((tag) => {
        allListItemsData.push(removeAccentAndApplyLowerCase(tag.textContent))
    })

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
    } else if (allListItemsData.includes(removeAccentAndApplyLowerCase(`${taskText}X`))) {
        alert('Tarefa já adicionada');
        taskInput.value = '';
        return
    } else {
        addTasktoDOM(taskText);
        taskInput.value = '';
    }
}

function addTasktoDOM(taskText, completed = false) {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    /*if (completed) {
        li.classList.add('completed');
    }*/

    listItem.addEventListener('click', toggleTaskCompletion);

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    listItem.appendChild(deleteButton);

    document.getElementById('task-list').appendChild(listItem);
}

function toggleTaskCompletion(e) {
    e.target.classList.toggle('completed');
}

function deleteTask(e) {
    const li = e.target.parentElement;
    li.remove();
}