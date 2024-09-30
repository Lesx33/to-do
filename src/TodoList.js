import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState('To-Do');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask !== '') {
      setTasks([...tasks, { id: tasks.length + 1, text: newTask, status: 'To-Do' }]);
      setNewTask('');
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  return (
    <div className="TodoList">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.text}</span>
            <button onClick={() => handleDelete(task.id)}>
              <i className="fas fa-trash-alt" />
            </button>
            <select value={task.status} onChange={(event) => handleStatusChange(task.id, event.target.value)}>
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;