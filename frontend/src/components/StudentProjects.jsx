import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, Grid, Card, CardContent, Button } from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';

import proImg1 from '../images/project6.jpg';
import proImg2 from '../images/project2.jpg';
import proImg3 from '../images/project3.jpg';
import proImg4 from '../images/project4.jpg';
import proImg5 from '../images/project5.jpg';
import proImg6 from '../images/project1.jpg';

const projectsOtherData = [
    { image: proImg1, link: '/readmore' },
    { image: proImg2, link: '/readmore' },
    { image: proImg3, link: '/readmore' },
    { image: proImg4, link: '/readmore' },
    { image: proImg5, link: '/readmore' },
    { image: proImg6, link: '/readmore' },
];

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: theme.spacing(2),
        backgroundColor: '#231a6f',
        color: '#fff',
        transition: 'transform 0.2s',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#0f054c',
        },
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: theme.spacing(1),
    },
    media: {
        height: 140,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    appBar: {
        backgroundColor: '#231a6f',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    titleTypography: {
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left',
        },
    },
    toolbar: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
}));

const StudentProjects = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userEmail = sessionStorage.getItem('currentUser');
        if (userEmail) {
            getUser(userEmail);
        }
    }, []);

    const getUser = async (email) => {
        try {
            const user = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${email}`);
            setUser(user.data);
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
            setUser(null);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:5000/api/project/get');
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleSelectProject = async (project, user) => {
        if (user.projectId) {
            alert("You have already selected a project");
        } else {
            try {
                const response = await axiosInstance.post('http://localhost:5000/api/studentProjects/add', {
                    projectId: project._id,
                    title: project.title,
                    studentId: user._id,
                    email: user.email,
                    name: user.name,
                    duration: project.duration,
                    teamSize: project.teamSize,
                });
                alert(`Project added to student: ${response.data.title}`);
                navigate('/main');
            } catch (error) {
                console.error('Error selecting project:', error);
                alert("You have already selected");
                navigate('/projects');
            }
        }
    };

    const tokenrelease = () => {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('currentUser');
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <a className="navbar-brand" href="index.html">
                        <img src="images/logo.png" alt="" style={{ height: "50px" }} />
                    </a>
                    <Typography variant="h6" className={classes.titleTypography}style={{ textAlign:'center' }}>
                        Welcome, {user && user.name.toUpperCase()}
                    </Typography>
                    <Link component={RouterLink} to="/main" color="inherit" style={{ marginRight: '25px' }}>
                        Project-Dashboard
                    </Link>
                    <Link component={RouterLink} to="/login" color="inherit" onClick={tokenrelease}>
                        Logout
                    </Link>
                </Toolbar>
            </AppBar>
            <br /><br />
            <Grid container spacing={3}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card className={classes.root}>
                            <img src={projectsOtherData[index].image} alt={project.title} className={classes.media} />
                            <CardContent>
                                <Typography className={classes.title} gutterBottom>
                                    {project.title}
                                </Typography>
                                <Typography className={classes.description}>{project.description}</Typography>
                                <Link
                                    component={RouterLink}
                                    to={`${projectsOtherData[index].link}/${project._id}`} // Add project ID to the URL
                                    className={classes.link}
                                >
                                    Read more
                                </Link>
                            </CardContent>
                        </Card>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSelectProject(project, user)}
                        >
                            Choose Project
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};



    export default StudentProjects;
