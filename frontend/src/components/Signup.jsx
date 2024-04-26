import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Button, Grid, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    gender: ''
  });
  
  const inputHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    console.log(users);
  };
  
  const addHandler = () => {
    console.log("clicked", users);
    axios.post("http://localhost:5000/api/student/register", users)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ 
        // background: "linear-gradient(to right, var( #231a6f), var(#0f054c))", 
        background: "#0f054c", 
      color: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Container maxWidth="sm" style={{ padding: '40px', border: '2px solid white', borderRadius: '20px' }}>
        <Typography variant='h5' align='center' sx={{ border: '1px solid white', padding: '10px', borderRadius: '10px' }}>SIGNUP FORM</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Name' fullWidth name="name" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <RadioGroup aria-label="gender" name="gender" value={users.gender} onChange={inputHandler} style={{ flexDirection: 'row' }}>
              <FormControlLabel value="Male" control={<Radio sx={{ color: 'white' }} />} label="Male" sx={{ color: 'white' }} />
              <FormControlLabel value="Female" control={<Radio sx={{ color: 'white' }} />} label="Female" sx={{ color: 'white' }} />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Date of Birth' fullWidth name="dob" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Mobile No' fullWidth name="mobileNumber" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Email' fullWidth name="email" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Password' type='password' fullWidth name="password" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <Button variant='contained' sx={{ backgroundColor: '#231a6f', color: 'white', borderRadius: '20px', padding: '10px 20px' }} onClick={addHandler}>Sign Up</Button>
          </Grid>
          <Grid>
            <Typography sx={{ border: '1px solid white', padding: '10px', textAlign: 'center', marginTop: '10px', borderRadius: '10px' }}>
              <Link to={'/login'} style={{ textDecoration: 'none', color: 'white' }}>Back to login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
