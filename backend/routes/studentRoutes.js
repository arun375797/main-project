const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await Student.create(studentData);
        res.status(200).send({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).send({ error: "Failed to register student" });
    }
});



// route for login
router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            res.json({ message: 'Student not found' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, student.password);

        if (passwordMatch) {
            let payload = { email: email, pwd: password };
            let token = jwt.sign(payload, 'studentapp');
            res.send({ message: 'Login success', token: token });
        } else {
            res.json({ message: 'Login failed' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});




module.exports = router;
