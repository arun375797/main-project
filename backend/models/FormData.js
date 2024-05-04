const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('FormData', formDataSchema)