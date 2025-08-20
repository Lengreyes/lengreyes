const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.query.user;
  const tasks = await Task.find({ createdBy: user });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, dueDate, createdBy } = req.body;
  const task = new Task({ title, description, dueDate, createdBy });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, completed }, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;