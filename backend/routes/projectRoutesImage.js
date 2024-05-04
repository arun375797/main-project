const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            teamSize: req.body.teamSize,
            duration: req.body.duration,
            technologies: req.body.technologies,
            isActive: req.body.isActive,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/get', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/projects/:id', upload.single('image'), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        if (req.file) {
            project.image = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            };
        }
        Object.assign(project, req.body);
        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
