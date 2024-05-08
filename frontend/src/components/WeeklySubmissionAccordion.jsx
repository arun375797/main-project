import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import axiosInstance from '../axiosinterceptor';

const WeeklySubmissionForm = () => {
    const [formData, setFormData] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [lastSubmissionDate, setLastSubmissionDate] = useState(null);
    const [user, setUser] = useState(null);
    const [project, setProject] = useState(null);

    useEffect(() => {
        // Fetch user details when component mounts
        const fetchUser = async () => {
            const userEmail = sessionStorage.getItem("currentUser");
            if (userEmail) {
                try {
                    const response = await axiosInstance.get(
                        `http://localhost:5000/api/student/user?email=${userEmail}`
                    );
                    setUser(response.data);
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        // Fetch project data
        const fetchProject = async () => {
            if (user && user._id) {
                try {
                    const response = await axiosInstance.get(`http://localhost:5000/api/studentProjects/id/${user._id}`);
                    // Assuming the response is an array and contains a single project object
                    if (response.data.length > 0) {
                        setProject(response.data[0]); // Set the first project object in the array
                        setError(null);
                    } else {
                        setError('No project found');
                    }
                } catch (error) {
                    console.error('Error fetching project:', error);
                    setError('Error fetching project');
                }
            }
        };
        fetchProject();
    }, [user]);

    const handleChanges = (e) => {
        setFormData(e.target.value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const isSameWeek = (date1, date2) => {
        const firstDate = new Date(date1);
        const secondDate = new Date(date2);
        const firstWeek = new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            firstDate.getDate() - firstDate.getDay()
        );
        const secondWeek = new Date(
            secondDate.getFullYear(),
            secondDate.getMonth(),
            secondDate.getDate() - secondDate.getDay()
        );
        return firstWeek.getTime() === secondWeek.getTime();
    };

    const handleSubmit = async () => {
        try {
            const currentDate = new Date();
            const currentDay = currentDate.getDay();
            if (currentDay === 6     || currentDay === 0) {
                if (lastSubmissionDate && isSameWeek(lastSubmissionDate, currentDate)) {
                    alert(
                        "You have already submitted this week. You can submit again next week."
                    );
                } else {
                    const response = await axiosInstance.post(
                        "http://localhost:5000/api/student/weekly-submission",
                        {
                            data: formData,
                            userName: user ? user.name : "", // Include user's name in the submission
                            projectData: project, // Include project data
                            comment: comment // Include the comment
                        }
                    );
                    console.log(response.data);
                    alert("you have sucessfully submitted the submission")
                    setLastSubmissionDate(currentDate);
                }
            } else {
                alert("Weekly submission is only allowed on weekends.");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };
    

    return (
        <div style={{
            background: "linear-gradient(130deg, #231a6f, #0f054c)",
            minHeight: '100vh', 
            padding: '100px'
        }}>
            <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                Weekly Submission
            </Typography>
            <br />
            <div style={{ marginBottom: "30px", width: "100%" }}>
                <TextField
                    id="outlined-basic"
                    label="Link"
                    variant="outlined"
                    value={formData}
                    onChange={handleChanges}
                    fullWidth
                    InputLabelProps={{ style: { color: 'black' } }} // Added style for label
                    InputProps={{ style: { color: 'black', background: 'white' } }} // Added style for input text and background
                />
            </div>
            <div style={{ marginBottom: "30px", width: "100%" }}>
                <TextField
                    id="outlined-comment"
                    label="Comment"
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                    fullWidth
                    InputLabelProps={{ style: { color: 'black' } }} // Added style for label
                    InputProps={{ style: { color: 'black', background: 'white' } }} // Added style for input text and background
                />
            </div>
            <div style={{ width: "100%" }}>
                <Button variant="contained" onClick={handleSubmit} fullWidth >
                    Submit
                </Button>
            </div>
        </div>
        



    )
};

export default WeeklySubmissionForm;
