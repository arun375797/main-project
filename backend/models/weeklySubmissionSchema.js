const mongoose = require('mongoose');

const weeklySubmissionSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
    // Additional fields can be added here
});
module.exports = mongoose.model('WeeklySubmission', weeklySubmissionSchema);