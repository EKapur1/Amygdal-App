const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskList: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tasks = mongoose.model('tasks', TaskSchema);
