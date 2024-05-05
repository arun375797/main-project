import React, { useState } from 'react';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('profile')}>Profile</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('overview')}>Project Overview</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('dashboard')}>Materials</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('weeksub')}>Weekly Submission</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('discuss')}>Discussion Forum</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('prosub')}>Project Submission</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('viva')}>Viva</button>
                        <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('grade')}>Grade Card</button>
                        
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
                                padding: '10px' // Example padding
                            }}
                        >
                            Logout
                        </Link>
                        {/* Add more buttons for additional tools */}
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
