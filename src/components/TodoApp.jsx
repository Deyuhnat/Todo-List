import React, { useState } from "react";
import Task from "./Task";

const STATUS = {
  DONE: 1,
  PENDING: 2,
};

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const handleChangeNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Math.random().toString(),
        name: newTask,
        status: STATUS.PENDING,
      },
    ]);

    setNewTask("");
  };

  return (
    <>
      <div className="todo-app">
        <div className="todo-box">
          <h1 className="title">Todo List</h1>
          <div className="create-box">
            <input
              type="text"
              value={newTask}
              onChange={handleChangeNewTask}
              name="name"
              placeholder="Add the task"
            />
            <button onClick={handleSubmit} className="btn-add-task">
              +
            </button>
          </div>
          <div className="todo-list">
            {tasks.map((task, index) => (
              <Task key={index} data={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
