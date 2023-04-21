const mongoose = require('mongoose');

const setlistSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Setlist', setlistSchema);
