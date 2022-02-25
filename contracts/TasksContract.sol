// SPDX-License-Identifier: MIT

pragma solidity >=0.5.0 <0.9.0 ;

contract TasksContract {

    uint256 public taskCounter = 0;

    constructor(){ // Se ejecuta la primera vez que se ejecuta el contrato
        createTask("Mi primer tarea de ejemplo","tengo que hacer algo");
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskToggleDone(
    uint256 id,
    bool done
    );


    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

    mapping (uint256 => Task) public task;

    //_tittle el guion hace referencia a que son variables internas
    function createTask(string memory _title, string memory _description) public {

        taskCounter++;
        task[taskCounter]=Task(taskCounter,_title,_description,false, block.timestamp);
        emit TaskCreated(taskCounter,_title,_description,false, block.timestamp);
    }

    function toggleDone(uint256 _id) public{

        Task memory _task = task[_id];
        _task.done = !_task.done;
        task[_id] = _task;
        emit TaskToggleDone(_id,_task.done );
    }


}

