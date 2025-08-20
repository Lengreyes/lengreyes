const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: Date,
  createdBy: { type: String, required: true }
});

module.exports = mongoose.model('Event', EventSchema);