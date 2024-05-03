const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100 // Example minimum and maximum lengths
    },
    description: {
        type: String,
        required: true
    },
    teamSize: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    technologies: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
    // , image: {
    //     data: Buffer, // Image data
    //     contentType: String // Image content type (e.g., 'image/jpeg', 'image/png')
    // }
});

module.exports = mongoose.model('Project', projectSchema);
