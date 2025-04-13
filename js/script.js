let userInput = document.getElementById('itemInput')
let addButton = document.getElementById('addButton')
let clearButton = document.getElementById('clearButton')
let todoContainer = document.getElementById('todoList')

window.addEventListener('load',()=>{
    Container.render()
})

class Todo{
    static id=0
    static todoList=[]
    constructor(input){
        this.todo={
            'id':Todo.id,
            'todo':input.value,
            'status':'',
    }
        Todo.id++
        Todo.todoList.push(this.todo)
}
    store(){
        if(localStorage.getItem('todos')){
            let todos=JSON.parse(localStorage.getItem('todos'))
            todos.push(this.todo);
            localStorage.setItem('todos',JSON.stringify(todos))

        }else{
            localStorage.setItem('todos',JSON.stringify(Todo.todoList))
        }
    }
    static complete(id) {
        let todos = JSON.parse(localStorage.getItem('todos'))
        let item = todos.find(obj => obj.id == id)
        
        if (item) {
            item.status = item.status === 'todo-completed' ? '' : 'todo-completed'
            localStorage.setItem('todos', JSON.stringify(todos))
            Container.render()
        }
    }
    static remove(id){
        let todos=JSON.parse(localStorage.getItem('todos'))
        todos=todos.filter(item => item.id != id)
        localStorage.setItem('todos', JSON.stringify(todos))
        Container.render()
    }
}




class Container{
    static render(){
        if(localStorage.getItem('todos')){
            todoContainer.innerHTML=''
            let todos=JSON.parse(localStorage.getItem('todos'))
            todos.forEach(todo =>{
                this.txt=`
                <li class="completed well">
                    <label class=${todo.status}>${todo.todo}</label>
                    <button class="btn btn-success" onclick=taskComplete(${todo.id})>Complete</button>
                    <button class="btn btn-danger" onclick=taskRemove(${todo.id})>Remove</button>
                </li>
            `
            todoContainer.insertAdjacentHTML('beforeend',this.txt)
            })

        }
    }
}


addButton.addEventListener('click',()=>{
    if (userInput.value!=""){
        let newTodo=new Todo(userInput)
        newTodo.store()
        Container.render()
    }
})


function taskComplete(id){
    Todo.complete(id)
}


function taskRemove(id){
    Todo.remove(id)
}