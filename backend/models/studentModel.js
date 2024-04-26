const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50 // Example minimum and maximum lengths
    },
    dob: {
        type: Date,
        required: true// dob must be in year-month-date format
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
        match: /^\S+@\S+\.\S+$/ // Example email format validation
    },
   
    password: {
        type: String,
        required: true,
        minlength: 6 // Example minimum length for password
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'] // Example enum validation for gender
    }
    // Additional fields can be added here
    // dateOfEnrollment: { type: Date }
});

// Hash the password before saving
const bcrypt = require('bcrypt');
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        // Generate a hash of the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Student', studentSchema);
