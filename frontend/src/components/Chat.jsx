import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, List, ListItem, ListItemText, Button, Box, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: 'auto',
    padding: 24,
  },
  messageItem: {
    marginBottom: 16,
  },
  commentBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
  },
  commentTextField: {
    marginLeft: 16,
  },
  commentContainer: {
    marginTop: 8,
  },
});

const Chat = () => {
  const classes = useStyles();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [showCommentField, setShowCommentField] = useState([]); // Array to track whether to show the comment text field for each message

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/student/chat-messages");
      // Initialize showCommentField array with false values for each message
      setShowCommentField(new Array(response.data.length).fill(false));
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleChatMessageChange = (event) => {
    setChatMessage(event.target.value);
  };

  const handleCommentMessageChange = (event) => {
    setCommentMessage(event.target.value);
  };

  const handleSendChatMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/student/chat-messages", { message: chatMessage });
      setChatHistory([...chatHistory, response.data]);
      // Add false value to showCommentField array for the new message
      setShowCommentField([...showCommentField, false]);
      setChatMessage("");
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  };

  const handleSendCommentMessage = async (index, commentMessage) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}/comments`, { comment: commentMessage });
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[index] = response.data;
      setChatHistory(updatedChatHistory);
    } catch (error) {
      console.error("Error sending comment message:", error);
    }
    // Set the corresponding index in showCommentField to false
    setShowCommentField(showCommentField.map((value, i) => (i === index ? false : value)));
  };

  const handleCommentButtonClick = (index) => {
    // Set the corresponding index in showCommentField to true
    setShowCommentField(showCommentField.map((value, i) => (i === index ? true : value)));
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h5" gutterBottom>Chat</Typography>
      <TextField 
        id="chatMessage" 
        label="Type your message" 
        variant="outlined" 
        value={chatMessage} 
        onChange={handleChatMessageChange} 
        fullWidth
        className={classes.messageItem}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSendChatMessage} 
        endIcon={<SendIcon />}
        style={{ marginTop: 16 }}
      >
        Send Message
      </Button>

      <List style={{ marginTop: 24 }}>
        {chatHistory.map((message, index) => (
          <ListItem key={index} className={classes.messageItem}>
            <ListItemText primary={message.message} />
            <List>
              {message.comments.map((comment, commentIndex) => (
                <ListItem key={`${index}_${commentIndex}`} style={{ marginLeft: 16 }}>
                  <ListItemText primary={`Comment: ${comment}`} />
                </ListItem>
              ))}
            </List>
            {showCommentField[index] && (
              <Box className={classes.commentContainer}>
                <Box className={classes.commentBox}>
                  <TextField 
                    id={`commentMessage${index}`} 
                    label="Add a comment" 
                    variant="outlined" 
                    value={commentMessage} 
                    onChange={handleCommentMessageChange} 
                    className={classes.commentTextField}
                  />
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleSendCommentMessage(index, commentMessage)}
                    endIcon={<CommentIcon />}
                    style={{ marginLeft: 16 }}
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            )}
            {!showCommentField[index] && (
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleCommentButtonClick(index)} 
                endIcon={<CommentIcon />}
                style={{ marginTop: 16 }}
              >
                Add Comment
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Chat;
