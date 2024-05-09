const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");
const ChatMessage= require("../models/chatMessageModel");
const WeeklySubmission = require("../models/weeklySubmissionSchema");
const FormData = require("../models/FormData");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.use(express.json());
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
router.use(express.urlencoded({ extended: true }));

// route for sign up
router.post('/register', verifytoken, async (req, res) => {
    try {
        const studentData = req.body;
        const newStudent = await Student.create(studentData);
        res.status(200).send({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        console.error("Error registering student:", error);
        res.status(500).send({ error: "Failed to register student" });
    }
});
// // Authentication middleware
// function isAuthenticated(req, res, next) {
//     // Assuming the token is sent in the request headers
//     const token = req.headers.authorization;
//     if (!token) {
//         req.userId = null;
//         return next();
//     }

//     // Here you would typically verify the token
//     // and extract the user ID from it
//     try {
//         const decoded = jwt.verify(token, 'studentapp');
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// }

// // Route for fetching user details
// router.get('/user', isAuthenticated, async (req, res) => {
//     try {
//         if (!req.userId) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const student = await Student.findById(req.userId);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         res.json({ user: student });
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//         res.status(500).json({ error: "Failed to fetch user details" });
//     }
// });


router.get('/user', async (req, res) => {
    const { email } = req.query;

    try {
        // Query the database for a student with the provided email
        const user = await Student.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        // Handle errors
        console.error("Error finding user by email:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;






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
            res.send({ message: 'Login success', token: token ,email:email});
        } else {
            res.json({ message: 'Login failed' });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});
router.post('/weekly-submission', verifytoken , async (req, res) => {
    try {
        const { data, userName, projectData, comment } = req.body; // Destructure data, userName, projectData, and comment from request body
        const weeklySubmission = await WeeklySubmission.create({ data, userName, projectData, comment }); // Create a new document with data, userName, projectData, and comment
        res.status(201).json(weeklySubmission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





// Route to fetch all chat messages
router.get('/chat-messages', verifytoken, async (req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        res.status(200).json(chatMessages);
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        res.status(500).json({ error: "Failed to fetch chat messages" });
    }
});

// Route to add a new chat message
router.post('/chat-messages',verifytoken, async (req, res) => {
    try {
        const { message, sender } = req.body;
        const newChatMessage = await ChatMessage.create({ message, senderName: sender.name });
        res.status(201).json(newChatMessage);
    } catch (error) {
        console.error("Error creating chat message:", error);
        res.status(500).json({ error: "Failed to create chat message" });
    }
});
router.get('/chat-messages', verifytoken, async (req, res) => {
    try {
        const chatMessages = await ChatMessage.find();
        // Map over chatMessages and transform each message object to include sender's name
        const formattedMessages = chatMessages.map(message => {
            return {
                _id: message._id,
                message: message.message,
                senderName: message.senderName,
                comments: message.comments.map(comment => {
                    return {
                        text: comment.text,
                        senderName: comment.senderName
                    };
                }),
                createdAt: message.createdAt
            };
        });
        res.status(200).json(formattedMessages);
    } catch (error) {
        console.error("Error fetching chat messages:", error);
        res.status(500).json({ error: "Failed to fetch chat messages" });
    }
});

// Route to add a comment to a chat message
router.post('/chat-messages/:id/comments', verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, sender } = req.body;
        const chatMessage = await ChatMessage.findById(id);
        if (!chatMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }
        chatMessage.comments.push({ text: comment, senderName: sender.name });
        await chatMessage.save();
        res.status(200).json(chatMessage);
    } catch (error) {
        console.error("Error adding comment to chat message:", error);
        res.status(500).json({ error: "Failed to add comment to chat message" });
    }
});

// Route to delete a chat message by ID
router.delete('/chat-messages/:id', verifytoken,async (req, res) => {
    try {
        const { id } = req.params;
        // Find the chat message by ID and delete it
        const deletedMessage = await ChatMessage.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }
        res.status(200).json({ message: "Chat message deleted successfully" });
    } catch (error) {
        console.error("Error deleting chat message:", error);
        res.status(500).json({ error: "Failed to delete chat message" });
    }
});
// Route to update a chat message
router.put('/chat-messages/:id', verifytoken, async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const updatedMessage = await ChatMessage.findByIdAndUpdate(id, { message }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: "Chat message not found" });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error("Error updating chat message:", error);
        res.status(500).json({ error: "Failed to update chat message" });
    }
});

// routes submit
router.post('/projectsub', verifytoken, async (req, res) => {
    const formData = new FormData({
      link: req.body.link,
      comments: req.body.comments
    });
  
    try {
      const newFormData = await formData.save();
      res.status(201).json(newFormData);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;