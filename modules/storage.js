export class Storage{
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
            const list = this.getList()
            const newList = list.map(task => {
                if(task.id == taskID){
                    task.isChecked = isChecked
                } 
                return task
            })
            localStorage.setItem(this.#key,JSON.stringify(newList))
        }
        upDateDelete(taskId){
            const parsed = this.getList()
            const newList = parsed.filter(task => task.id != taskId)
            localStorage.setItem(this.#key,JSON.stringify(newList))
        }
    }