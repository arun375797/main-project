import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, Grid, Card, CardContent, Button } from '@material-ui/core';
import { Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosinterceptor';

import proImg1 from '../images/project6.jpg';
import proImg2 from '../images/project2.jpg';
import proImg3 from '../images/project3.jpg';
import proImg4 from '../images/project4.jpg';
import proImg5 from '../images/project5.jpg';
import proImg6 from '../images/project1.jpg';

const projectsOtherData = [
  { image: proImg1, link: '/mern' },
  { image: proImg2, link: '/demo' },
  { image: proImg3, link: '/demo' },
  { image: proImg4, link: '/demo' },
  { image: proImg5, link: '/demo' },
  { image: proImg6, link: '/demo' },
];
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 20,
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
    marginTop: 10,
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
  },
  titleTypography: {
    flexGrow: 1,
  },
});


const Studentdashboard = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser');
    console.log(userEmail)
    if (userEmail) {
      getUser(userEmail);
    }
  }, []); // Empty dependency array ensures useEffect runs only once after component mounts

  const getUser = async (email) => {
    try {
      const user = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${email}`);
      console.log(user.data)
      setUser(user.data);
      setError(null);
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message);
      setUser(null);
    }
  };
  // const decodedToken = jwt.decode(token);
  // const userId = decodedToken ? decodedToken.id : null;

  useEffect(() => {
    // Fetch projects from backend when component mounts
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/project/get');
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this effect runs only once, like componentDidMount

  const handleSelectProject = async (project, user) => {
    console.log('Selected project:', project.projectId);
    console.log('Selected project:', project.title);
    console.log('Selected project:', project._id);
    console.log('User logged in:', user.name);
    console.log('User logged in:', user._id);

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
      console.log('Project added to student:', response.data);
      navigate('/main');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };


  const tokenrelease = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('currentUser');
  }

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <a className="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="" style={{ height: "50px" }} />
          </a>
          {/* <Typography variant="h6" className={classes.titleTypography}>
                        Student Dashboard
                    </Typography> */}

          <Typography variant="h6" className={classes.titleTypography}>
            Welcome, User
            {/* {user.name} */}
          </Typography>

          <Link component={RouterLink} to="/dashboard" color="inherit" style={{ marginRight: '25px' }}>
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
                <Link component={RouterLink} to={projectsOtherData[index].link} className={classes.link}>
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

export default Studentdashboard;
