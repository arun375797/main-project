import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@material-ui/core';

const ReadMore = () => {
    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/project/${projectId}`);
                setProjectData(response.data.project);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        fetchProjectData();
    }, [projectId]);

    return (
        <div style={{background:" #0f054c",minHeight:'100vh'}}>
            <br /><br /><br />
        <Box display="flex" justifyContent="center" marginTop="60px">
            <Card sx={{ width: '60%', margin: 'auto' }}>
                <CardContent>
                {projectData && (
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ backgroundColor: "#8a2be2", color: "#fff" }} // Purple
                            >
                                <Typography variant="h6">Title: {projectData.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>Description: {projectData.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                                sx={{ backgroundColor: "#3f51b5", color: "#fff" }} // Indigo
                            >
                                <Typography variant="h6">Team Size</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{projectData.teamSize}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                                sx={{ backgroundColor: "#4caf50", color: "#fff" }} // Green
                            >
                                <Typography variant="h6">Duration</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{projectData.duration}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4-content"
                                id="panel4-header"
                                sx={{ backgroundColor: "#ff9800", color: "#fff" }} // Orange
                            >
                                <Typography variant="h6">Technologies</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{projectData.technologies}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel5-content"
                                id="panel5-header"
                                sx={{ backgroundColor: "#f44336", color: "#fff" }} // Red
                            >
                                <Typography variant="h6">Active</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{projectData.isActive ? 'Yes' : 'No'}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </CardContent>
            </Card>
            </Box>
        </div>
    );
};

export default ReadMore;
