const mongoose = require('mongoose');

const weeklySubmissionSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    projectData: {
        type: Object, // Adjust the type based on the structure of your project data
        required: true
    },
    comment: {
        type: String, // Assuming the comment is a string
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
    // Additional fields can be added here
});

module.exports = mongoose.model('WeeklySubmission', weeklySubmissionSchema);
