let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('taskInput');  
let taskContainer = document.querySelector('.todo-container'); 

    document.addEventListener('DOMContentLoaded', loadTasks) 
    

addButton.addEventListener('click', e => {
    let task = taskInput.value.trim()
    if(task !== ''){
        const id = Math.random()
        
        let taskElement = createTaskElement(id,task)
        taskContainer.appendChild(taskElement)
        saveTasks({id,task,isChecked:false})
        taskInput.value = ''
    } else {
        taskInput.placeholder = "الرجاء إدخال مهمة أولاً";
    } 
})

function loadTasks (){
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    const taskElements = storedTasks.map(task => createTaskElement(task.id,task.task,task.isChecked))
    taskContainer.append(...taskElements)
}

function createTaskElement(id,taskText, isChecked = false) {
    let taskDiv = document.createElement('div')
    taskDiv.setAttribute('id',id)
    let inputCheckBox = document.createElement('input');
    let deleteBtn = document.createElement('button');
    let li = document.createElement('li');
        taskDiv.classList.add('task')
        inputCheckBox.type = "checkbox"
        inputCheckBox.checked = isChecked
        if(isChecked) {
            li.style.textDecoration = 'line-through'
        }
        li.textContent = taskText;
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn')
        deleteBtn.dataset.id = id
        taskDiv.append(li,inputCheckBox,deleteBtn)
        
        return taskDiv
        
}


 // Delete task
taskContainer.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        const taskId = e.target.getAttribute('data-id')
        const taskElement = document.getElementById(taskId)
        taskElement.remove()
        removeFromStorage(taskId);
    }
})
//mark copmlete
taskContainer.addEventListener('click', e => {
    if (e.target.type === 'checkbox') {
        const taskId = e.target.parentElement.getAttribute('id')
        const li = e.target.parentElement.querySelector('li')
        if (e.target.checked) {
            li.style.textDecoration = 'line-through'
            updateTaskStatus(taskId, true)
        }else{
            li.style.textDecoration = 'none'
            updateTaskStatus(taskId, false)
        }
    }
})

function removeFromStorage(taskId) {
    let parsedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filterdTasks = parsedTasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(filterdTasks));
}
function updateTaskStatus(taskId, isChecked){
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    const updatedTasks = storedTasks.map(task =>{
        if(task.id == taskId){
            task.isChecked = isChecked
        }
        return task
    })
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
function saveTasks(taskElement){
    const parsedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    parsedTasks.push(taskElement)
    localStorage.setItem('tasks',JSON.stringify(parsedTasks))
    }


