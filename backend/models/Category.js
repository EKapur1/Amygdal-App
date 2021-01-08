const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tasks',
      default: undefined,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
