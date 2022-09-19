function addToDoActivity(toDoElement) {
    const todoListID = document.getElementById("todo-list")
    const liElement = document.createElement("li")
    const inputElement = document.createElement("input")
    const labelElement = document.createElement("label")

    inputElement.setAttribute("type", "checkbox")
    inputElement.setAttribute("name", "checkbox_" + toDoElement.id)
    inputElement.setAttribute("id", "checkbox_" + toDoElement.id)

    labelElement.setAttribute("for", "checkbox_" + toDoElement.id)
    inputElement.checked = toDoElement.completed
    if (toDoElement.completed) {
        labelElement.setAttribute("class", "completed")
    }
    labelElement.innerText = toDoElement.title
    liElement.appendChild(inputElement)
    liElement.appendChild(labelElement)
    todoListID.appendChild(liElement)

    inputElement.addEventListener("change", (event) => {
        toDoElement.completed = inputElement.checked
        if (inputElement.checked) {
            labelElement.setAttribute("class", "completed")
        } else {
            labelElement.classList.remove("completed")
        }
        fetch("http://localhost:3000/todos/" + toDoElement.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: toDoElement.title, completed: toDoElement.completed, })
        })
    })
}

function fetchAndRead() {
    fetch("http://localhost:3000/todos")
        .then( answer => {
            return answer.json()
        })
        .then((todos) => {
            todos.forEach((todoItem) => { addToDoActivity(todoItem) })
        })
}

function readData() {
    const todoListID = document.getElementById("todo-list")
    todoListID.innerHTML = ""
    fetchAndRead()
}

function fetchAndPost(valueInputField) {
    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: valueInputField,
            completed: false
        })
    })
        .then(function () {
            readData()
        })
}

function init() {
    readData()
    const todoForm = document.querySelector("form")

    todoForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const valueInputField = todoForm.querySelector("input").value
        if (valueInputField.length > 0) {
            fetchAndPost(valueInputField)
        }
    })
}



init()