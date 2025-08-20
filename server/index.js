const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/executive-assistant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/files', require('./routes/files'));
app.use('/api/events', require('./routes/events'));

app.listen(5000, () => console.log('Server started on port 5000'));