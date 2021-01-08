const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
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
