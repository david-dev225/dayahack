const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true
  },
  description: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', categorySchema);
