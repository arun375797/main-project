import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Mern from './Mern';
import Profile from './Profile';
import Projectdashboard from './Projectdashboard';
import Chat from './Chat'; 
import ProjectOverview from './ProjectOverview';
import Projectsubmit from './Projectsubmit';
import WeeklySubmissionForm from './WeeklySubmissionAccordion';
import QuizPage from './QuizPage';

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
                return <WeeklySubmissionForm />;    //To be chnaged
            case 'discuss': 
                return <Chat />;
            case 'prosub':
                return <Projectsubmit />;    //To be chnaged
            case 'viva':
                return <QuizPage />;    //To be chnaged
            // Add more cases for additional tools
            default:
                return null;
        }
    };

    return (
        
        <div>
            
        <div style={{ display: 'flex' }}>    
            <div style={{ width: '50px', background: "#0f054c", padding: '10px',minHeight:'100vh' }}>
                <button onClick={toggleToolbarVisibility} style={{ marginBottom: '10px', background: "#0f054c", border: 'none', width: '100%' }}>
                    <FontAwesomeIcon icon={faBars} style={{ color: '#ffffff' }} />
                </button>
            </div>
            {isToolbarVisible && (
                <div style={{ width: '250px', background: "#0f054c", padding: '10px' ,display:'flex',flexDirection:'column',gap:'70px',justifyContent:'center'}}>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('profile')}>Profile</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('overview')}>Project Overview</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('dashboard')}>Materials</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('weeksub')}>Weekly Submission</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('discuss')}>Discussion Forum</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('prosub')}>Project Submission</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: '#ffffff', color: '#0f054c', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleToolClick('viva')}>viva</button>
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
