import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, CardMedia, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'; // Importing Link from react-router-dom
import proImg1 from '../images/project6.jpg'; 
import proImg2 from '../images/project2.jpg';
import proImg3 from '../images/project3.jpg';
import proImg4 from '../images/project4.jpg';
import proImg5 from '../images/project5.jpg';
import proImg6 from '../images/project1.jpg';

const projects = [
  { id: 1, title: 'Doctor Appoinment Booking System', description: 'Description of Project 1', image: proImg1, link: '/mern' },
  { id: 2, title: 'Space Shooter Game', description: 'Description of Project 2', image: proImg2, link: '/demo' },
  { id: 3, title: 'Pdf To Audio Conerter', description: 'Description of Project 3', image: proImg3, link: '/demo' },
  { id: 4, title: 'Online Blood Bank Application', description: 'Description of Project 4', image: proImg4, link: '/demo' },
  { id: 5, title: 'Graphical password Application', description: 'Description of Project 5', image: proImg5, link: '/demo' },
  { id: 6, title: 'Spy camera Application', description: 'Description of Project 1', image: proImg6, link: '/demo' },
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
});

const Projectdashboard = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={project.image}
              title={project.title}
            />
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                {project.title}
              </Typography>
              <Typography className={classes.description}>
                {project.description}
              </Typography>
              <Link component={RouterLink} to={project.link} className={classes.link}>
                Read More
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Projectdashboard;
