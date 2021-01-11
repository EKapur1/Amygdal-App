const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  text: {
    type: String,
    required: true,
  },
});

const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  tasks: [TaskSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
