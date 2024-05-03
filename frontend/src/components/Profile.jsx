import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material'; // Import Material-UI components
import MaleIcon from '../images/male_icon.png'; // Import male user icon image
import FemaleIcon from '../images/female_icon.png'; // Import female user icon image
import DefaultUserIcon from '../images/user_icon.png'; // Import default user icon image

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve email from sessionStorage
        const userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            getUser(userEmail);
        }
    }, []); // Empty dependency array ensures useEffect runs only once after component mounts

    const getUser = async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/student/user?email=${email}`);
            setUser(response.data);
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
            setUser(null);
        }
    };

    const getIcon = (gender) => {
        if (gender === 'Male') {
            return MaleIcon;
        } else if (gender === 'Female') {
            return FemaleIcon;
        } else {
            return DefaultUserIcon;
        }
    };

    return (
        <Card sx={{ backgroundColor: 'blue', color: 'white', maxWidth: 400 }}>
            <CardContent>
                {user ? (
                    <>
                        <img src={getIcon(user.gender)} alt="User Icon" style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 20 }} />
                        <Typography variant="h5" component="h2" gutterBottom>
                            Welcome, User {user.name}
                        </Typography>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {user.name}
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Email: {user.email}
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Date of Birth: {user.dob}
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Mobile Number: {user.mobileNumber}
                        </Typography>
                        <Typography variant="body1" component="p">
                            Gender: {user.gender}
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body1" component="p">
                        Loading...
                    </Typography>
                )}
                {error && <Typography variant="body1" component="p">Error: {error}</Typography>}
            </CardContent>
        </Card>
    );
};

export default Profile;
