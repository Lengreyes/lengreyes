import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const user = localStorage.getItem('userEmail');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks?user=${user}`).then(res => setTasks(res.data));
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { ...form, createdBy: user });
    const res = await axios.get(`http://localhost:5000/api/tasks?user=${user}`);
    setTasks(res.data);
    setForm({ title: '', description: '', dueDate: '' });
  };

  const handleComplete = async (id, completed) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
    const res = await axios.get(`http://localhost:5000/api/tasks?user=${user}`);
    setTasks(res.data);
  };

  return (
    <div className="container">
      <h2>Tasks</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
        <button type="submit">Add Task</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ marginBottom: '1em', background: '#f0f4fa', padding: '1em', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</strong>
              <div>{task.description}</div>
              <div><small>Due: {task.dueDate?.slice(0,10)}</small></div>
            </div>
            <button onClick={() => handleComplete(task._id, task.completed)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;