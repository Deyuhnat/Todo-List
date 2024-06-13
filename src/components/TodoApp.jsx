import React, { useState } from "react";
import Task from "./Task";

export const STATUS = {
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
        id: Math.ceil(Math.random() * 1000000),
        name: newTask,
        status: STATUS.PENDING,
      },
    ]);

    setNewTask("");
  };

  const handleUpdateStatus = (e, id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) => {
        const newStatus = e.target.checked ? STATUS.DONE : STATUS.PENDING;

        if (task.id === id) {
          task.status = newStatus;
        }
        return task;
      })
    );
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
              <Task
                key={index}
                task={task}
                onChangeStatus={handleUpdateStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
