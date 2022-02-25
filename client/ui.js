const taskForm = document.querySelector("#taskForm")

document.addEventListener("DOMContentLoaded", ()=>{
    App.init()
})

taskForm.addEventListener("submit", e =>{
    e.preventDefault()
    
    App.createTask(taskForm["title"].value, taskForm["description"]) // se puede acceder sin problemas por que ya fue añadido al objeto windows


})