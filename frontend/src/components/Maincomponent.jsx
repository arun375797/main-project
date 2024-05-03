import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Studentdashboard from './Studentdashboard';
import StudentProjects from './StudentProjects';
import Mern from './Mern';

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
            case 'dashboard':
                return <Studentdashboard />;
            case 'tool1':
                return <StudentProjects />;
            case 'tool2':
                return <Mern />;
            // Add more cases for additional tools
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50px', backgroundColor: 'blueviolet', padding: '10px' }}>
                <button onClick={toggleToolbarVisibility} style={{ marginBottom: '10px', background: 'none', border: 'none', width: '100%' }}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            {isToolbarVisible && (
                <div style={{ width: '200px', backgroundColor: 'blueviolet', padding: '10px' }}>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: 'white' }} onClick={() => handleToolClick('dashboard')}>Dashboard</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: 'white' }} onClick={() => handleToolClick('tool1')}>Tool 1</button>
                    <button style={{ display: 'block', width: '100%', marginBottom: '5px', backgroundColor: 'white' }} onClick={() => handleToolClick('tool2')}>Tool 2</button>
                    {/* Add more buttons for additional tools */}
                </div>
            )}
            <div style={{ flex: 1, padding: '10px' }}>
                {renderToolComponent()}
            </div>
        </div>
    );
};

export default MainComponent;
