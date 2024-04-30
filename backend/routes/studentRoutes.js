const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const ChatMessage= require("../models/chatMessageModel");
const WeeklySubmission = require("../models/weeklySubmissionSchema");
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

router.post("/weekly-submission", async (req, res) => {
    try {
      const { data } = req.body;
      
      // Create a new weekly submission document
      const newSubmission = await WeeklySubmission.create({ data });
  
      // Respond with success message and the created submission
      res.status(201).json({ message: "Weekly submission created successfully", submission: newSubmission });
    } catch (error) {
      console.error("Error creating weekly submission:", error);
      res.status(500).json({ error: "Failed to create weekly submission" });
    }
  });





// Route to fetch all chat messages
router.get('/chat-messages', async (req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        res.status(200).json(chatMessages);
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        res.status(500).json({ error: "Failed to fetch chat messages" });
    }
});

// Route to add a new chat message
router.post('/chat-messages', async (req, res) => {
    try {
        const { message } = req.body;
        const newChatMessage = await ChatMessage.create({ message });
        res.status(201).json(newChatMessage);
    } catch (error) {
        console.error("Error creating chat message:", error);
        res.status(500).json({ error: "Failed to create chat message" });
    }
});

// Route to add a comment to a chat message
router.post('/chat-messages/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        const chatMessage = await ChatMessage.findById(id);
        if (!chatMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }
        chatMessage.comments.push(comment);
        await chatMessage.save();
        res.status(200).json(chatMessage);
    } catch (error) {
        console.error("Error adding comment to chat message:", error);
        res.status(500).json({ error: "Failed to add comment to chat message" });
    }
});




module.exports = router;