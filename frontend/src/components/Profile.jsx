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
        const userEmail = sessionStorage.getItem('currentUser');
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
        <div style={{ backgroundColor: '#231a6f', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom style={{ color: '#ffffff', marginBottom: '20px' }}>
                    Welcome to your profile {user && user.name.toUpperCase()} !!!
                </Typography>
                <Card sx={{ backgroundColor: '#0f054c', color: 'white', width: 700, marginBottom: '20px', borderRadius: '20px' }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom style={{ color: '#ffffff', marginBottom: '20px' }}>
                            P R O F I L E
                        </Typography>
                        
                    </CardContent>
                </Card>
                <Card sx={{ backgroundColor: '#2d1d94', color: 'white', width: 700, borderRadius: '20px' }}>
                    <CardContent>
                        {user ? (
                            <>
                                <img src={getIcon(user.gender)} alt="User Icon" style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 20 }} />

                                <Typography variant="h5" component="h2" gutterBottom style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    Name :  {user.name.toUpperCase()}
                                </Typography>
                                <Typography variant="body1" component="p" gutterBottom style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Email : {user.email}
                                </Typography>
                                <Typography variant="body1" component="p" gutterBottom style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Date of Birth : {user.dob}
                                </Typography>

                                <Typography variant="body1" component="p" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Gender : {user.gender}
                                </Typography>
                                <Typography variant="body1" component="p" gutterBottom style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    Mobile Number : {user.mobileNumber}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="body1" component="p" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                Loading...
                            </Typography>
                        )}
                        {error && <Typography variant="body1" component="p" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Error: {error}</Typography>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
