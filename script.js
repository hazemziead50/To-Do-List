let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('taskInput');  
let taskContainer = document.querySelector('.todo-container'); 

addButton.addEventListener('click', e => {
    let task = taskInput.value.trim()
    if(task !== ''){
        
        let taskList = document.createElement('div')
        taskList.classList.add('task')
        let inputCheckBox = document.createElement('input');
        inputCheckBox.type = "checkbox"
        let li = document.createElement('li');
        li.textContent = task;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn')
        taskList.appendChild(li)
        taskList.appendChild(inputCheckBox)
        taskList.appendChild(deleteBtn)
        taskContainer.appendChild(taskList)
        taskInput.value = '';
    } else {
        taskInput.placeholder = "الرجاء إدخال مهمة أولاً";
    } 
})
 // Delete task
//use event delegation to handle delete button click event
taskContainer.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        let taskList = e.target.parentElement
        taskList.remove()
    }
})

// Mark task as completed
//use event delegation to handle checkbox change event
taskContainer.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
        
        let taskList = e.target.parentElement
        let li = taskList.querySelector('li');
        if (e.target.checked){
        li.style.textDecoration = 'line-through'
        }
    }
})
