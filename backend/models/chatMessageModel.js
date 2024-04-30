// chatMessageModel.js
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    comments: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
