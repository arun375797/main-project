import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Box, List, ListItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axiosInstance from '../axiosinterceptor';

// Styled components for custom styling
const MainHr = styled('hr')({
    border: '3px solid #1A5772',
    borderRadius: '4px',
    width: '90%',
    marginBottom: '5px',
});

const SubHr = styled('hr')({
    border: '1px solid #71B4CC',
    borderRadius: '4px',
    width: '100%',
    margin: '5px 0px',
});

const Grades = () => {
    const [user, setUser] = useState(null);
    const [projectTitle, setProjectTitle] = useState(null);
    const [error, setError] = useState(null);

    // Retrieve email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser');

    useEffect(() => {
        // Fetch user data
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${userEmail}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (userEmail) {
            getUser();
        }
    }, [userEmail]);

    useEffect(() => {
        // Fetch project data
        const fetchProject = async () => {
            if (user && user._id) {
                try {
                    const response = await axiosInstance.get(`http://localhost:5000/api/studentProjects/id/${user._id}`);
                    if (response.data.length > 0) {
                        setProjectTitle(response.data[0].title);
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
        <Box sx={{ height:'100vh',display: 'flex', justifyContent: 'center',backgroundColor:"rgb(33 24 108)" }}>
            <Box sx={{ width: '80%' }}>
            <br />
            <div style={{border:'3px solid white',padding:'40px',borderRadius:"20px"}}>

                <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 'bold', color:'white' }}> Grade Card</Typography>
                <SubHr />
                <Typography variant="h6" align="left" gutterBottom style={{ fontWeight: 'bold', color:'white' }}>Student Name: {user && user.name} </Typography>
                <SubHr />
                <Typography variant="h6" align="left" gutterBottom style={{ fontWeight: 'bold', color:'white' }}>Student Project: {projectTitle} </Typography>
                <MainHr />
                <List>
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                        Application Process Assignment 1: {'8/10'}
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                    Application Process Assignment 2: {'8/10'}
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                    Intermediate Exam: {'8/20'}
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                    Viva: {'8/20'}
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                    Final Submission: {'8/20'} 
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', fontSize: '1.2rem' }} >
                    Final Exam: {'8/20'}
                    </ListItem>
                    <SubHr />
                    <ListItem style={{ backgroundColor: "#87CEEB", fontWeight: 'bold', fontSize: '2.2rem' }} >
                    Total Score: {'48/100'}
                    </ListItem>
                    <SubHr />
                </List>
            </div>

            </Box>
        </Box>
    );
};

export default Grades;
