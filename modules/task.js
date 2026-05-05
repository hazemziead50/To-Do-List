export class Task{
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