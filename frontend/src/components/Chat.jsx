import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../axiosinterceptor";
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

      minHeight: '100vh', 
      padding: '20px' 
    }}>
        <div className="container mt-5">
        <div style={{ border: '0px solid ', borderRadius: '5px', padding: '20px' }}>
          <h3 style={{color:'white'}}>Discussion-Form</h3>
          <br />
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Type your message" 
              value={chatMessage} 
              onChange={handleChatMessageChange} 
            />
            <button className="btn btn-primary mt-2" onClick={handleSendChatMessage}>📝 Ask Query</button>
          </div>
          <ul className="list-group">
          {chatHistory.map((message, index) => (
  <li key={index} className="list-group-item d-flex justify-content-between align-items-center"style={{ border:"2px solid black",marginTop:"10px",padding:'15 px'}}>
    <div>
    {message.senderName && (
        <>
          <strong>{message.senderName}</strong>: 
        </>
      )}
      {message.message}
      <ul className="list-group mt-2" >
        {message.comments.map((comment, commentIndex) => (
          <li key={`${index}_${commentIndex}`} className="list-group-item bg-light">
            {comment.text}
            {comment.senderName && (
              <strong className="ms-2 text-muted">-{comment.senderName}</strong>
            )}
        
          </li>
        ))}
                  </ul>
                </div>  
                <div>
                  <button className="btn btn-primary me-2" onClick={() => handleCommentButtonClick(index)}>
                    &#128172; Add Comment
                  </button>
                  {index === editIndex ? (
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editMessage.message} 
                        onChange={(event) => setEditMessage(event.target.value)} 
                      />
                      <button className="btn btn-success" onClick={() => handleSaveEdit(index)}>
                        &#128190; Save
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-secondary" onClick={() => handleEditMessage(index, message)}>
                      &#9998; Edit
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDeleteMessage(index)}>
                    &#128465; Delete
                  </button>
                </div>
                {showCommentField[index] && (
                  <div className="mt-2">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add a comment" 
                      value={commentMessage} 
                      onChange={handleCommentMessageChange} 
                    />
                    <button className="btn btn-primary mt-2" onClick={() => handleSendCommentMessage(index, commentMessage)}> &#10133; ADD</button>
                  </div>
                )}
                
              </li>
                  
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  );
};
export default Chat;








