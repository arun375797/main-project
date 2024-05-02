import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [showCommentField, setShowCommentField] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); // State variable to hold the index of the message being edited
  const [editMessage, setEditMessage] = useState(""); // State variable to hold the message content being edited
  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/student/chat-messages");
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
    setShowCommentField(showCommentField.map((value, i) => (i === index ? false : value)));
    setCommentMessage(""); // Reset commentMessage state
  };
  

  const handleCommentButtonClick = (index) => {
    setShowCommentField(showCommentField.map((value, i) => (i === index ? true : value)));
  };

  const handleDeleteMessage = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}`);
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory.splice(index, 1);
      setChatHistory(updatedChatHistory);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
    const handleEditMessage = (index, message) => {
      setEditIndex(index); // Set the index of the message being edited
      setEditMessage(message); // Set the current message to the edit message state
    };

  const handleSaveEdit = async (index) => {
    try {
      await axios.put(`http://localhost:5000/api/student/chat-messages/${chatHistory[index]._id}`, { message: editMessage });
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[index].message = editMessage; // Update the message content in the chat history
      setChatHistory(updatedChatHistory);
      setEditIndex(-1); // Reset edit index
      setEditMessage(""); // Reset edit message
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  return (
    <div className="container mt-5">
    <h3>Chat</h3>
    <div className="mb-3">
      <input 
        type="text" 
        className="form-control" 
        placeholder="Type your message" 
        value={chatMessage} 
        onChange={handleChatMessageChange} 
      />
      <button className="btn btn-primary mt-2" onClick={handleSendChatMessage}>Send Message</button>
    </div>
    <ul className="list-group  ">
      {chatHistory.map((message, index) => (
        <li key={index} className="list-group-item d-flex  justify-content-between align-items-center">
          <div>
            {message.message}
            <ul className="list-group mt-2 ">
              {message.comments.map((comment, commentIndex) => (
                <li key={`${index}_${commentIndex}`} className="list-group-item bg-light">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button className="btn btn-primary me-2" onClick={() => handleCommentButtonClick(index)}>Add Comment</button>
            {index === editIndex ? (
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value={editMessage.message} // Display message content in the input field
                  onChange={(event) => setEditMessage(event.target.value)} 
                />
                <button className="btn btn-success" onClick={() => handleSaveEdit(index)}>Save</button>
              </div>
            ) : (
              <button className="btn btn-secondary" onClick={() => handleEditMessage(index, message)}>Edit</button>
            )}
            <button className="btn btn-danger" onClick={() => handleDeleteMessage(index)}>Delete</button>
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
              <button className="btn btn-primary mt-2" onClick={() => handleSendCommentMessage(index, commentMessage)}>Comment</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  
  );
  
};

export default Chat;
