const mongoose = require('mongoose');

const studentProjectsSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Project model
        ref: 'Project',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Student model
        ref: 'Student',
        required: true
    },
    teamMembers: [{
        email: {
            type: String,
            required: true,
            match: /^\S+@\S+\.\S+$/ // Example email format validation
        },
        name: {
            type: String,
            required: true
        }
    }],
    duration: {
        type: Number,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
    // Additional fields can be added here
});

module.exports = mongoose.model('StudentProjects', studentProjectsSchema);
