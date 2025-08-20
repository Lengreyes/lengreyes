const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = req.query.user;
  const events = await Event.find({ createdBy: user });
  res.json(events);
});

router.post('/', async (req, res) => {
  const { title, start, end, createdBy } = req.body;
  const event = new Event({ title, start, end, createdBy });
  await event.save();
  res.status(201).json(event);
});

module.exports = router;