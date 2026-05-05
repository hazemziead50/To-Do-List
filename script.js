import {Task} from "./modules/task.js"
import {TaskList} from "./modules/tasklist.js"
import {Storage} from "./modules/storage.js"

let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('taskInput');  
let taskContainer = document.querySelector('.todo-container'); 

    const taskList = new TaskList('.todo-container')
    const storage = new Storage('tasks')


    document.addEventListener('DOMContentLoaded',(e) => {

        const list = storage.getList()
        const taskElements =list.map(item => {
            const task = new Task(item)
            return task.create()
        })
        taskList.append(...taskElements)
    })

    addButton.addEventListener('click', e => {
        const taskText = taskInput.value.trim()
        if(taskText !== ''){
            const id = Math.random()
            const task = new Task({id, taskText, isChecked: false})
            const taskElement = task.create()
            taskList.append(taskElement)
            storage.save({id, taskText, isChecked: false})
            taskInput.value = ''
        } else {
            taskInput.placeholder = "الرجاء إدخال مهمة أولاً";
        }
    })

    taskContainer.addEventListener('click', e => {
        if(e.target.classList.contains('delete-btn')){
            const taskId = e.target.getAttribute('data-id')
            const taskElement = document.getElementById(taskId)
            taskElement.remove()
            storage.upDateDelete(taskId)
        }
    })
    taskContainer.addEventListener('click', e =>{
        if(e.target.type === 'checkbox'){
            const taskId = e.target.parentElement.getAttribute('id') 
            const li = e.target.parentElement.querySelector('li')

            if(e.target.checked){
                li.style.textDecoration = 'line-through'
                storage.updateTaskStatus(taskId, true)
            }else {
                li.style.textDecoration = 'none'
                storage.updateTaskStatus(taskId, false)
            }
        }
    })


