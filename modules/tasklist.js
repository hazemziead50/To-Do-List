export class TaskList{
        #container
        constructor(selector){
            this.#container = document.querySelector(selector)
        }
        append(...taskElement){
            this.#container.append(...taskElement)
        }

    }