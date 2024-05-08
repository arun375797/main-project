const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const StudentProject = require('../models/studentProjectModel');


function verifytoken(req,res,next){
    const token = req.headers.token;
    try {
        if(!token) throw 'unauthorized access';
        let payload = jwt.verify(token,'studentapp');
        if(!payload)throw 'unauthorized access';
       // res.send(200).send(payload)
        next()
    } catch (error) {
      res.status(401).send('caught in error')
    }
    }
// Create a student project
router.post('/add', verifytoken, async (req, res) => {
    try {
        const studentProject = await StudentProject.create(req.body);
        res.status(201).json(studentProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all student projects
router.get('/get', async (req, res) => {
    try {
        const studentProjects = await StudentProject.find();
        res.json(studentProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific student project by ID
router.get('/:id', verifytoken, async (req, res) => {
    try {
        const studentProject = await StudentProject.findById(req.params.id);
        if (!studentProject) {
            return res.status(404).json({ message: 'Student project not found' });
        }
        res.json(studentProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get student projects by email
router.get('/email/:email', verifytoken, async (req, res) => {
    const studentEmail = req.params.email;
    console.log("Requested Student Email:", studentEmail);

    try {
        const studentProjects = await StudentProject.find({ studentEmail });
        console.log("Retrieved Student Projects:", studentProjects);

        if (!studentProjects || studentProjects.length === 0) {
            return res.status(404).json({ message: 'Student projects not found for the given email' });
        }
        res.json(studentProjects);
    } catch (err) {
        console.error("Error retrieving student projects:", err);
        res.status(500).json({ message: 'Error retrieving student projects' });
    }
});

router.get('/id/:studentId', verifytoken, async (req, res) => {
    const studentId = req.params.studentId;
    console.log("Requested Student ID:", studentId);

    try {
        const studentProjects = await StudentProject.find({ studentId });
        console.log("Retrieved Student Projects:", studentProjects);

        if (!studentProjects || studentProjects.length === 0) {
            return res.status(404).json({ message: 'Student projects not found for the given ID' });
        }
        res.json(studentProjects);
    } catch (err) {
        console.error("Error retrieving student projects:", err);
        res.status(500).json({ message: 'Error retrieving student projects' });
    }
});



// Update a student project
router.patch('/:id', verifytoken, async (req, res) => {
    try {
        const studentProject = await StudentProject.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!studentProject) {
            return res.status(404).json({ message: 'Student project not found' });
        }
        res.json(studentProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a student project
router.delete('/:id', verifytoken,async (req, res) => {
    try {
        const studentProject = await StudentProject.findByIdAndRemove(req.params.id);
        if (!studentProject) {
            return res.status(404).json({ message: 'Student project not found' });
        }
        res.json({ message: 'Student project deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
