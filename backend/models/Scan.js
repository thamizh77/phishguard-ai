const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', scanSchema);
