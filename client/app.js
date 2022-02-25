App = {

  contracts:[],
  web3Provider: "", // no hace falta agregarlo en javascript

  init: async() => {
    console.log("loaded");
    await App.loadEthereum();
    await App.loadAccounts();
    await App.loadContracts();
    App.render();
    await App.renderTasks();
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum; //Crea la propiedad
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      console.log("Necesitas descargar Metamask");
    }
  },

  loadAccounts: async()=>{
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"})
    App.account = accounts[0]
  },

  loadContracts: async () => {

    //traer el json
    const res = await fetch("TasksContract.json");
    const tasksContractJSON = await res.json();

    //Se convierte
    App.contracts.tasksContract = TruffleContract(tasksContractJSON)

    //Se conecta a metamask
    App.contracts.tasksContract.setProvider(App.web3Provider)

    //Se despliega
    App.taskContract = await App.contracts.tasksContract.deployed()

  },
 createTask: async (title, description)=>{
    const result = await App.taskContract.createTask(title, description,{
      from: App.account 
    })
  },
  render: ()=>{
    document.getElementById("account").innerText = App.account

  },
  
  renderTasks: async()=>{
   const result= await App.taskContract.taskCounter()
   const taskCounterNumber = result.toNumber();
 
  let html = ""
   for (let i=1; i<=taskCounterNumber; i++){
    const task = await App.taskContract.task(i)
    taskId = task[0]
    taskTitle = task[1]
    taskDescription = task[2]
    taskDone = task[3]
    taskCreate = task[4]

    let taskElement = `<div class="card bg-dark rounded-0 mb-2">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>${taskTitle}</span>
      <div class="form-check form-switch">
        <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${
          taskDone === true && "checked"
        }>
      </div>
    </div>
    <div class="card-body">
      <span>${taskDescription}</span>
      <span>${taskDone}</span>
      <p class="text-muted">Task was created ${new Date(
        taskCreate * 1000
      ).toLocaleString()}</p>
      </label>
    </div>
  </div>`;
  html += taskElement;
}

document.querySelector("#tasksList").innerHTML = html;
   
  },
  toggleDone: async (element) => {
    const taskId = element.dataset.id;
    await App.taskContract.toggleDone(taskId, {
      from: App.account,
    });
    window.location.reload();
  },
};

App.loadEthereum();
