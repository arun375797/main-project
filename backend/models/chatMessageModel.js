const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            senderName: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
