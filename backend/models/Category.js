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
      categoryName: {
        type: String,
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
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = mongoose.model('category', CategorySchema);
