import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinterceptor";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [showCommentField, setShowCommentField] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); 
  const [editMessage, setEditMessage] = useState(""); 
  const userEmail = sessionStorage.getItem('currentUser');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  // Fetch user data on component mount
  useEffect(() => {
      const getUser = async () => {
          try {
              const response = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${userEmail}`);
              setUser(response.data);
              setError(null);
          } catch (error) {
              console.error('Error fetching user data:', error);
              setError('Error fetching user datas');
          }
      };

      getUser();
  }, [userEmail]);

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/student/chat-messages");
      setShowCommentField(new Array(response.data.length).fill(false));
      setChatHistory(response.data);
      
      // Fetch sender names for each message
      const chatMessages = response.data;
      for (let message of chatMessages) {
        const senderResponse = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${message.sender}`);
        message.senderName = senderResponse.data.name;
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };
  // Handle change in the chat message input field
  const handleChatMessageChange = (event) => {
    setChatMessage(event.target.value);
  };

  // Handle change in the comment message input field
  const handleCommentMessageChange = (event) => {
    setCommentMessage(event.target.value);
  };

  // Send a chat message
const handleSendChatMessage = async () => {
  try {
    const response = await axiosInstance.post("http://localhost:5000/api/student/chat-messages", { 
      message: chatMessage,
      sender: user  // Include the sender's information
    });
    setChatHistory([...chatHistory, response.data]);
    setShowCommentField([...showCommentField, false]);
    setChatMessage("");
  } catch (error) {
    console.error("Error sending chat message:", error);
  }
};

// Send a comment message
const handleSendCommentMessage = async (index, commentMessage) => {
  try {
    const response = await axiosInstance.post(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}/comments`, { 
      comment: commentMessage,
      sender: user  // Include the sender's information
    });
    const updatedChatHistory = [...chatHistory];
    updatedChatHistory[index] = response.data;
    setChatHistory(updatedChatHistory);
  } catch (error) {
    console.error("Error sending comment message:", error);
  }
  setShowCommentField(showCommentField.map((value, i) => (i === index ? false : value)));
  setCommentMessage(""); 
};

  const handleCommentButtonClick = (index) => {
    setShowCommentField(showCommentField.map((value, i) => (i === index ? true : value)));
  };

  const handleDeleteMessage = async (index) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}`);
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory.splice(index, 1);
      setChatHistory(updatedChatHistory);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  
  const handleEditMessage = (index, message) => {
    setEditIndex(index); 
    setEditMessage(message); 
  };

  const handleSaveEdit = async (index) => {
    try {
      await axiosInstance.put(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}`, { message: editMessage });
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[index].message = editMessage; 
      setChatHistory(updatedChatHistory);
      setEditIndex(-1); 
      setEditMessage(""); 
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return(
    <div style={{ 
      background: "linear-gradient(130deg, #231a6f, #0f054c)",
    }}>
        <div style={{padding:"20px"}}>
        <div style={{ border: '0px solid ', borderRadius: '5px'}}>
          <Typography variant="h5" style={{color:'white',marginBottom:'20px'}}>Discussion-Form</Typography>
        
          <div style={{padding:'20px'}} >
            <TextField
              variant="outlined"
              placeholder="Type your message"
              value={chatMessage} 
              onChange={handleChatMessageChange} 
              fullWidth
              sx={{backgroundColor:'white',border: '1px solid ',borderRadius: '5px'}}
            />
            <Button variant="contained" onClick={handleSendChatMessage} style={{marginTop: '10px'}}>📝 Ask Query</Button>
          </div>
          <List sx={{}} >
            {chatHistory.map((message, index) => (
              <ListItem  key={index} style={{ border: "2px solid black",paddingTop: "10px", padding: '10px'}}>
                <div style={{  backgroundColor:'white',width:'100%',padding:'10px' }}>
                  {message.senderName && (
                    <>
                      <Typography variant="subtitle1" style={{fontWeight: 'bold', marginBottom: '5px'}}>
                        {message.senderName}:
                      </Typography>
                    </>
                  )}
                  <ListItemText style={{}} primary={message.message} />
                  <List style={{}}>
                    {message.comments.map((comment, commentIndex) => (
                      <ListItem key={`${index}_${commentIndex}`} style={{ backgroundColor: 'lightgray' }}>
                        <ListItemText primary={comment.text} />
                        {comment.senderName && (
                          <ListItemText secondary={`-${comment.senderName}`} />
                        )}
                      </ListItem>
                    ))}
                  </List>
                  {/* edited from here */}
                  <Box sx={{}}>
                  <Box sx={{display: window.innerWidth <= 768 ?  'grid' : 'flex', gap:1,justifyContent:'center'}}>
                  <Button variant="contained" onClick={() => handleCommentButtonClick(index)}>💬 Add comment</Button>
                  {index === editIndex ? (
                    <div style={{ marginTop: '10px' }}>
                      <TextField
                        variant="outlined"
                        value={editMessage.message}
                        onChange={(event) => setEditMessage(event.target.value)} 
                        style={{ marginRight: '5px' }}
                      />
                      <Button variant="contained" onClick={() => handleSaveEdit(index)} style={{ backgroundColor: 'green' }}>💾 Save</Button>
                    </div>
                  ) : (
                    <Button variant="contained" onClick={() => handleEditMessage(index, message)} style={{ backgroundColor: 'green' }}>✏️ Edit</Button>
                  )}
                  <Button variant="contained" onClick={() => handleDeleteMessage(index)} style={{ backgroundColor: 'red' }}>🗑️ Delete</Button>
                </Box>
                </Box>
                {showCommentField[index] && (
                  <div style={{ marginTop: '10px',width:'100%',  }}>
                    <TextField
                      variant="outlined"
                      placeholder="Add a comment"
                      value={commentMessage} 
                      onChange={handleCommentMessageChange} 
                      style={{ marginRight: '5px' }}
                    />
                    <Button variant="contained" onClick={() => handleSendCommentMessage(index, commentMessage)} style={{ backgroundColor: 'blue' }}>➡️ ADD</Button>
                  </div>
                )}
                </div>

              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Chat;
