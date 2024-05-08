const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');
const jwt = require('jsonwebtoken');


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
// Create a project
router.post('/add',verifytoken, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ project });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all projects
router.get('/get', verifytoken, async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.json({ project });
    } catch (error) {
        res.status(404).json({ error: 'Project not found' });
    }
});

// Update a project
router.put('/:id', verifytoken, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ project });
    } catch (error) {
        res.status(404).json({ error: 'Project not found' });
    }
});

// Delete a project
router.delete('/:id', verifytoken, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Project not found' });
    }
});

module.exports = router;
