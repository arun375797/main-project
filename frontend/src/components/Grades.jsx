import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Typography, Box } from '@mui/material';
import Rating from '@mui/material/Rating';

const Grades = () => {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null); // Changed variable name to match state variable
    const [error, setError] = useState(null);

    // Retrieve email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser');

    useEffect(() => {
        // Fetch user data
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/student/user?email=${userEmail}`);
                setUser(response.data);
                setUsername(response.data.name)

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUser();
    }, [userEmail]);



    useEffect(() => {

        // Fetch project data
        const fetchProject = async () => {

            if (user && user._id) {

                try {
                    const response = await axios.get(`http://localhost:5000/api/studentProjects/id/${user._id}`);
                    if (response.data.length > 0) {
                        setProjectTitle(response.data[0].title); // Set the project title
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

    return (
        <Box
            sx={{
                display: 'inline-block',
                margin: '2rem',
                padding: '1.1rem',
                maxWidth: '500px',
                borderRadius: '3px',
                border: '1px solid #bfbfbf',
                backgroundColor: '#efeded',
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.25)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
            }}
        >
            <Typography variant="h4" sx={{ margin: '0 0 1rem 0' }}>{projectTitle}</Typography>
            <Typography variant="h5" sx={{ margin: '0 0 0.5rem 0', color: '#757575' }}>{username}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem' }}>
                <Typography variant="h3" sx={{ fontSize: '2rem', marginRight: '0.5rem' }}>3/5</Typography>
                <Rating value={3} precision={0.1} readOnly />
            </Box>
            <Typography variant="body1" sx={{ lineHeight: '1.45' }}>
                "Loreg elit. Nemo quam eveniet harum perferendis facere blanditiis molestias sit omnis, fugit, amet enim error eius aperiam dolorum autem nam voluptatibus velit. Inventore!" – <small>John Green</small>
            </Typography>
        </Box>
    );
};

export default Grades;
