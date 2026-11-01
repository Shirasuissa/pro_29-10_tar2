// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)

// Step 2: click a task to toggle the "done" class

// Step 3: delete with the x button (one listener on the ul - event delegation)

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")

//step 1
const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const prioritySelect = document.getElementById("priority-select")
const taskList = document.getElementById("task-list")
const error = document.getElementById("error")
const left = document.getElementById("left")
const filters = document.getElementById("filters")
const clearDone = document.getElementById("clear-done")
const empty = document.getElementById("empty")

taskForm.addEventListener("submit", function(event) {
    event.preventDefault()
    const taskText = taskInput.value.trim()
    if(taskText==="") {
        error.textContent = "Please type a task"
        error.hidden = false
        return
    }
    error.hidden = true
    const li = document.createElement("li")
    li.classList.add("priority-" + prioritySelect.value)

    const textSpan = document.createElement("span")
    textSpan.textContent = taskText
    textSpan.classList.add("text")

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "x"
    deleteBtn.classList.add("delete")

    li.append(textSpan, deleteBtn)
    taskList.append(li)

    const activeFilter = filters.querySelector(".active").dataset.filter
    if (activeFilter === "done") {
    li.hidden = true
    }

    updateCounter();
    updateEmptyMessage()

    taskInput.value = ""
    taskInput.focus()
})

//step2
taskList.addEventListener("click", function(event) {
    const li = event.target.closest("li")
    if(!li) {return}

    //step3
    if(event.target.classList.contains("delete")) {
        li.remove()
        updateCounter()
        updateEmptyMessage()
        return
    }
    li.classList.toggle("done")
    updateCounter()
})

//step4
function updateCounter() {
    const activeTasks = taskList.querySelectorAll("li:not(.done)")
    left.textContent = activeTasks.length
}

//step5
filters.addEventListener("click", function(event) {
    if(event.target.tagName !== "BUTTON") {
        return
    }
    const filter = event.target.dataset.filter

    const filterButtons = filters.querySelectorAll("button")
    filterButtons.forEach(function(button) {
        button.classList.remove("active")
    })

    event.target.classList.add("active")

    const tasks = taskList.querySelectorAll("li")
    tasks.forEach(function(task) {
        if(filter === "all") {
            task.hidden = false
        }
        else if (filter === "active") {
            task.hidden = task.classList.contains("done")
        }
        else if (filter === "done") {
            task.hidden = !task.classList.contains("done")
        }
    })
})

//step6
clearDone.addEventListener("click", function() {
    const doneTasks = taskList.querySelectorAll("li.done")

    doneTasks.forEach(function(task) {
        task.remove()
    })
    updateCounter()
    updateEmptyMessage()
})

//step7
function updateEmptyMessage() {
    const tasks = taskList.querySelectorAll("li")
    if(tasks.length === 0)
        {empty.hidden = false}
    else
       {empty.hidden = true}
}