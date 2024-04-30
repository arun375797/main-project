import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Link, Grid, Card, CardContent, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import proImg1 from '../images/project6.jpg'; 
import proImg2 from '../images/project2.jpg';
import proImg3 from '../images/project3.jpg';
import proImg4 from '../images/project4.jpg';
import proImg5 from '../images/project5.jpg';
import proImg6 from '../images/project1.jpg';

const projects = [
  { id: 1, title: 'Doctor Appointment Booking System', description: 'Description of Project 1', image: proImg1, link: '/mern' },
  { id: 2, title: 'Space Shooter Game', description: 'Description of Project 2', image: proImg2, link: '/demo' },
  { id: 3, title: 'Pdf To Audio Converter', description: 'Description of Project 3', image: proImg3, link: '/demo' },
  { id: 4, title: 'Online Blood Bank Application', description: 'Description of Project 4', image: proImg4, link: '/demo' },
  { id: 5, title: 'Graphical Password Application', description: 'Description of Project 5', image: proImg5, link: '/demo' },
  { id: 6, title: 'Spy Camera Application', description: 'Description of Project 6', image: proImg6, link: '/demo' },
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

const Projectdashboard = () => {
  const classes = useStyles();
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };
  const tokenrelease=()=>{
    sessionStorage.removeItem('userToken');
  }
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <a className="navbar-brand" href="index.html">
            <img src="images/logo.png" alt="" style={{ height: "50px" }} />
          </a>
          <Typography variant="h6" className={classes.titleTypography}>
            Student Dashboard
          </Typography>
          <Link component={RouterLink} to="/dashboard" color="inherit" style={{ marginRight: '25px' }}>
            Project-Dashboard
          </Link>
          <Link component={RouterLink} to="/login" color="inherit"
           onClick={tokenrelease}
          >
            Logout
          </Link>
        </Toolbar>
      </AppBar>
      <br /><br />
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card className={classes.root}>
              <img src={project.image} alt={project.title} className={classes.media} />
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  {project.title}
                </Typography>
                <Typography className={classes.description}>
                  {project.description}
                </Typography>
                <Link component={RouterLink} to={project.link} className={classes.link}>
                  Read more
                </Link>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              color="primary"
              disabled={selectedProjectId !== null && selectedProjectId !== project.id}
              onClick={() => handleSelectProject(project.id)}
            >
              Choose Project
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Projectdashboard;