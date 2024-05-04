const mongoose = require('mongoose');

// Define the student project schema
const studentProjectSchema = new mongoose.Schema({
    
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: String,
    
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true
    },
    email: {type:String,
        unique: true
    },
    name: String,
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
        required: true,
        default: Date.now // Set start date to current date by default
    },
    endDate: {
        type: Date
    },
    count: {
        type: Number,
        default: 0
    }
    // Additional fields can be added here
});

// Pre-save hook to auto-increment the count field and calculate the end date
studentProjectSchema.pre('save', async function (next) {
    try {
        // Check if this is a new document or an update
        if (this.isNew) {
            // Get the current count
            const count = await this.constructor.countDocuments();
            // Increment count by 1
            this.count = count + 1;
        }

        // Calculate end date based on start date and duration
        const endDate = new Date(this.startDate);
        endDate.setDate(endDate.getDate() + (30 * this.duration)); // Assuming each month has 30 days
        this.endDate = endDate;

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('StudentProject', studentProjectSchema);
