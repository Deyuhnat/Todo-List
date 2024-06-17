import React, { useState } from "react";
import Task from "./Task";

export const STATUS = {
  DONE: 1,
  PENDING: 2,
};

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState("");

  const [editTask, setEditTask] = useState(null);

  const [error, setError] = useState(null);

  const handleChangeNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = () => {
    if (!newTask) {
      setError("New task cannot be empty!");
      return;
    }

    setError(null);

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

  const handleUpdateTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task, index) => {
        if (task.id === editTask.id) {
          task.name = newTask;
        }
        return task;
      })
    );

    setEditTask(null);

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

  const handleEditTask = (id) => {
    const editTask = tasks.find((task) => task.id === id);

    setEditTask(editTask);

    setNewTask(editTask.name);
  };

  const handleDeleteTask = (id) => {
    if (editTask?.id === id) {
      setEditTask(null);
      setNewTask("");
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
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

            {editTask ? (
              <button onClick={handleUpdateTask} className="btn-add-task">
                update
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-add-task">
                +
              </button>
            )}
          </div>
          {error && <div className="error">{error} </div>}
          {tasks.length === 0 && (
            <div className="empty-list">
              Wow! you have complete all your tasks
            </div>
          )}
          <div className="todo-list">
            {tasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                onChangeStatus={handleUpdateStatus}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
