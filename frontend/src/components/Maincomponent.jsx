import React, { useState, useEffect } from 'react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Profile from './Profile';
import Projectdashboard from './Projectdashboard';
import Chat from './Chat';
import ProjectOverview from './ProjectOverview';
import Projectsubmit from './Projectsubmit';
import WeeklySubmissionForm from './WeeklySubmissionAccordion';
import QuizPage from './QuizPage';
import Grades from './Grades';

const MainComponent = () => {
    const [activeTool, setActiveTool] = useState('dashboard'); // Initial active tool
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    console.log('what is the value',matches);

    useEffect(()=>{
        if (matches) {
            setIsToolbarVisible(true)
        }else{
            setIsToolbarVisible(false)
        }
    },[matches])


    const handleToolClick = (tool) => {
        setActiveTool(tool);
    };

    const toggleToolbarVisibility = () => {
        setIsToolbarVisible(!isToolbarVisible);
    };

    const renderToolComponent = () => {
        switch (activeTool) {
            case 'profile':
                return <Profile />;
            case 'dashboard':
                return <Projectdashboard />;
            case 'overview':
                return <ProjectOverview />;
            case 'weeksub':
                return <WeeklySubmissionForm />; //To be changed
            case 'discuss':
                return <Chat />;
            case 'prosub':
                return <Projectsubmit />; //To be changed
            case 'viva':
                return <QuizPage />; //To be changed
            case 'grade':
                return <Grades />; //To be changed
            // Add more cases for additional tools
            default:
                return null;
        }
    };

    const tokenRelease = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('currentUser');
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50px', background: "#0f054c", padding: '10px' }}>
                    <button onClick={toggleToolbarVisibility} style={{ marginBottom: '10px', background: "#0f054c", border: 'none', width: '100%' }}>
                        <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
                    </button>
                </div>
                {isToolbarVisible && (
                   <div style={{ width: '250px', background: "#0f054c", padding: '10px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                   <button
                       style={{
                           display: 'block',
                           width: '100%',
                           marginBottom: '5px',
                           backgroundColor: '#ffffff',
                           color: '#0f054c',
                           padding: '10px',
                           borderRadius: '5px',
                           cursor: 'pointer',
                           transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
                       }}
                       onClick={() => handleToolClick('profile')}
                       onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
                       onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
                   >
                       Profile
                   </button>
                   <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('overview')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
        Project Overview
    </button>     
    <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('dashboard')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
       Material
    </button>      <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('weeksub')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
       Weekly Submission
    </button>     

    <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('discuss')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
       DIscussion Forum
    </button>     


    <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('prosub')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
       Project Submission
    </button>     
    <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            border: '3px solid  #000000.', // Border added

            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('viva')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
        Viva
    </button>              
    <button
        style={{
            display: 'block',
            width: '100%',
            marginBottom: '5px',
            backgroundColor: '#ffffff',
            color: '#0f054c',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onClick={() => handleToolClick('grade')}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; }} // Change background color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = '#ffffff'; }} // Revert back to original background color
    >
       Grades
    </button>       
    <Link
        component={RouterLink}
        to="/login"
        color="inherit"
        onClick={tokenRelease}
        style={{
            display: 'inline-block',
            borderRadius: '5px',
            backgroundColor: 'white',
            width: '230px', // Example width
            padding: '10px', // Example padding
            textAlign: 'center',
            textDecoration: 'none',
            color: '#0f054c',
            transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out', // Transition for smooth hover effect
        }}
        onMouseEnter={(e) => { e.target.style.backgroundColor = '#107A7C'; e.target.style.color = '#ffffff'; }} // Change background color and text color on hover
        onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#0f054c'; }} // Revert back to original background color and text color
    >
        Logout
    </Link>
</div>
                )}
                <div style={{ flex: 1, padding: '10px' }}>
                    {renderToolComponent()}
                </div>
            </div>
        </div>
    );
};

export default MainComponent;
