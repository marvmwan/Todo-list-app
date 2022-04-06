'use strict'

// Check local storage for todos
function checkSaved(){
    const todosJSON = localStorage.getItem('todos')
    
    try {
        if (todosJSON){
            toDoList = JSON.parse(todosJSON)
        } else {
            toDoList = []
        }
    } catch {
        toDoList = []
    }
    
}

// Save todos to local storage
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(toDoList))
}


// Clear notes section in html
function clearNotes(){
    document.querySelector("#todos").innerHTML = ""
}

// Clear status update
function clearStatus(){
    document.querySelector("#status").innerHTML = ""
}

// Create status update for # of incomplete todos
function createStatusDOM(IncompleteTodos){
    const statusUpdate = document.createElement('h3')
    statusUpdate.textContent = `You have ${IncompleteTodos.length} todos left`
    return statusUpdate
}

// Removes todo from todo array
function removeTodo(todoID){
    const todoIndex = toDoList.findIndex((todo) => todo.id === todoID)

    if (todoIndex > -1){
        toDoList.splice(todoIndex, 1)
    }
}

function changeCompleteness(todoID){
    const todo = toDoList.find((todo) => todo.id === todoID)

    if (todo){
        todo.Completed = !todo.Completed
    }
}

// Generate todo DOM
function generateTodoDOM(todo){
    const todoBox = document.createElement('div')
    todoBox.classList.add('d-flex','align-items-center', 'my-4', 'border', 'border-1', 'rounded', 'rounded-3','p-2', 'px-3', 'bg-light')

    // Creates checkbox that toggles the completeness of the todo
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.classList.add('form-check-input')
    todoBox.appendChild(checkbox)

    checkbox.checked = todo.Completed;

    checkbox.addEventListener('change', function(){
        changeCompleteness(todo.id)
        saveTodos()
        renderTodos(toDoList, filters)
    })
    
    // Creates the todo text
    let item = document.createElement('span')
    item.textContent = todo.Task
    item.classList.add('fs-3', 'mx-3', 'flex-fill')
    todoBox.appendChild(item)

    // Creates the delete button for the todo
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger')

    deleteButton.textContent = 'Delete'
    todoBox.appendChild(deleteButton)
    deleteButton.addEventListener('click', function (){
        removeTodo(todo.id)
        saveTodos()
        renderTodos(toDoList, filters)
    })

    // Appends the the todo element to the end of the #todos div
    document.querySelector('#todos').appendChild(todoBox)
    

}

// Filter todos from text box input
function filterTodos(todos, filters){
    return todos.filter((todos) => todos.Task.toLowerCase().includes(filters.searchText.toLowerCase()))
}

// Create array of incomplete todos from filtered list
function IncompleteTodos(listOfTodos){
    return listOfTodos.filter((todos) => !todos.Completed)
}


// function clears list of todos, then renders the new list of todos
function renderTodos (todos, filters){
    clearNotes()
    const filtered = filterTodos(todos,filters)
    const incomplete = IncompleteTodos(filtered)
    clearStatus()
    document.querySelector('#status').appendChild(createStatusDOM(incomplete))

    

    if (filters.hideCompleted){
        incomplete.forEach(todo => {
            generateTodoDOM(todo) 
        })
    } else {
        filtered.forEach(todo => {
            generateTodoDOM(todo)
        })
    }
}