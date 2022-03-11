'use strict'

let toDoList = []

const filters = {
    searchText: '',
    hideCompleted: false
}

checkSaved()
renderTodos(toDoList, filters)


document.querySelector('#add-todo').addEventListener('submit', function (e){
    e.preventDefault()
    if (e.target.elements.newTodo.value.length > 1){
        toDoList.push({
            id: uuidv4(),
            Task: e.target.elements.newTodo.value,
            Completed: false
        })
        saveTodos()
    
        renderTodos(toDoList, filters)
    
        e.target.elements.newTodo.value = ''

    }
})
document.querySelector('#search').addEventListener('input', function(e){
    filters.searchText = e.target.value
    renderTodos(toDoList, filters)
})


document.querySelector('#completion-checkbox').addEventListener('change', function (e){
    filters.hideCompleted = e.target.checked
    renderTodos(toDoList, filters)
})

