import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Button, Grid, Radio, RadioGroup, FormControlLabel, TextField, IconButton, InputAdornment, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    gender: '',
    showPassword: false, // Add showPassword state
    password: '', // Initialize password state
  });
  
  const inputHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    console.log(users);
  };

  const togglePasswordVisibility = () => {
    setUsers({ ...users, showPassword: !users.showPassword });
  };
  
  const addHandler = () => {
    //console.log("clicked", users);
    axios.post("http://localhost:5000/api/student/register", users)
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert(`User registration failed ${err}`)
        navigate('/signup');
        
      });
  };

  return (
    <div style={{ backgroundColor: '#107A7C', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" style={{ padding: '20px', border: '2px solid white' }}>
        <Typography variant='h5' align='center' sx={{ border: '1px solid white', padding: '10px', color: '#fff' }}>S I G N U P</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Name' fullWidth name="name" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <RadioGroup aria-label="gender" name="gender" value={users.gender} onChange={inputHandler} style={{ flexDirection: 'row' }}>
              <FormControlLabel value="Male" control={<Radio sx={{ color: '#fff' }} />} label="Male" sx={{ color: '#fff' }} />
              <FormControlLabel value="Female" control={<Radio sx={{ color: '#fff' }} />} label="Female" sx={{ color: '#fff' }} />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Date of Birth (YYYY-MM-DD)' fullWidth name="dob" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Mobile No' fullWidth name="mobileNumber" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Email' fullWidth name="email" onChange={inputHandler} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' }}}}/>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant='outlined' fullWidth sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' }}}}>
              <TextField
                label='Password'
                type={users.showPassword ? 'text' : 'password'}
                fullWidth
                name="password"
                onChange={inputHandler}
                value={users.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {users.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#00bbf0',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#001F3F',
                }
              }}
              onClick={addHandler}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid>
            <Typography sx={{ border: '1px solid white', padding: '10px', textAlign: 'center', marginTop: '10px' }}>
              <Link to={'/login'} style={{ textDecoration: 'none', color: '#fff' }}>Alredy registered ? login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
