let addButton = document.getElementById('add-btn');
let taskInput = document.getElementById('taskInput');  
let taskContainer = document.querySelector('.todo-container'); 

    class Task{
        constructor({id,taskText,isChecked}){
            this.id = id;
            this.taskText = taskText;
            this.isChecked = isChecked;
        }
        create(){
        let taskDiv = document.createElement('div')
        taskDiv.setAttribute('id',this.id)
        let inputCheckBox = document.createElement('input');
        let deleteBtn = document.createElement('button');
        let li = document.createElement('li');
        taskDiv.classList.add('task')
        inputCheckBox.type = "checkbox"
        inputCheckBox.checked = this.isChecked
        if(this.isChecked) {
            li.style.textDecoration = 'line-through'
        }
        li.textContent = this.taskText;
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn')
        deleteBtn.dataset.id = this.id
        taskDiv.append(li,inputCheckBox,deleteBtn)
        return taskDiv
        }
    }
    class TaskList{
        #container
        constructor(selector){
            this.#container = document.querySelector(selector)
        }
        append(...taskElement){
            this.#container.append(...taskElement)
        }

    }
    class Storage{
        #key
        constructor(key){
            this.#key = key
        }
        getList(){
            return JSON.parse(localStorage.getItem(this.#key)) || []
        }
        save(item){
            const parsed = JSON.parse(localStorage.getItem(this.#key)) || []
            parsed.push(item)
            localStorage.setItem(this.#key,JSON.stringify(parsed))
        }
        updateTaskStatus(taskID,isChecked){
            const list = storage.getList()
            const newList = list.map(task => {
                if(task.id == taskID){
                    task.isChecked = isChecked
                } 
                return task
            })
            localStorage.setItem('tasks',JSON.stringify(newList))
        }
        upDateDelete(taskId){
            const parsed = storage.getList()
            const newList = parsed.filter(task => task.id != taskId)
            localStorage.setItem('tasks',JSON.stringify(newList))
        }
    }

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
            console.log(taskId);
            
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


