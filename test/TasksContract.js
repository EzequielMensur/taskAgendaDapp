const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed(); // el this envia la variable al scope
  });

  it("migrate deployed successufully", async () => {
    const address = this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get tasks list", async () => {
    const taskCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.task(taskCounter);

    assert.equal(task.id.toNumber(), taskCounter);
    assert.equal(task.title, "Mi primer tarea de ejemplo");
    assert.equal(task.description, "tengo que hacer algo");
    assert.equal(task.done, false);
    assert.equal(taskCounter, 1);
  });

  it("task created successufully", async () => {
    const result = await this.tasksContract.createTask(
      "some task",
      "description two"
    );
    const taskEvent = result.logs[0].args;

    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "some task");
    assert.equal(taskEvent.description, "description two");
    assert.equal(taskEvent.done, false);
  });

  it("task toggle done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;

    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  });
});
