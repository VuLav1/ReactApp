import React, { useState } from 'react';
// import { supabase } from './lib/help/supabaseClient'

interface Task {
  label: string;
  status: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<string>('');

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTaskLabel(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTaskStatus(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTaskLabel || !newTaskStatus) return;
    const newTask = {
      label: newTaskLabel,
      status: newTaskStatus
    };
    setTasks([...tasks, newTask]);
    setNewTaskLabel('');
    setNewTaskStatus('');
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task label..."
          value={newTaskLabel}
          onChange={handleLabelChange}
        />
        <input
          type="text"
          placeholder="Task status..."
          value={newTaskStatus}
          onChange={handleStatusChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{task.label}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
