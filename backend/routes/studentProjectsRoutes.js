const express = require('express');
const router = express.Router();
const StudentProjects = require('../models/studentProjectsModel');

// Create a student project
router.post('/addProject', async (req, res) => {
    try {
        const studentProject = await StudentProjects.create(req.body);
        res.status(201).json({ studentProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all student projects
router.get('/getProjects', async (req, res) => {
    try {
        const studentProjects = await StudentProjects.find();
        res.json({ studentProjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read student project by ID
router.get('/:id', async (req, res) => {
    try {
        const studentProject = await StudentProjects.findById(req.params.id);
        res.json({ studentProject });
    } catch (error) {
        res.status(404).json({ error: 'Student project not found' });
    }
});

// Update a student project
router.put('/:id', async (req, res) => {
    try {
        const studentProject = await StudentProjects.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ studentProject });
    } catch (error) {
        res.status(404).json({ error: 'Student project not found' });
    }
});

// Delete a student project
router.delete('/:id', async (req, res) => {
    try {
        await StudentProjects.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Student project not found' });
    }
});

module.exports = router;
