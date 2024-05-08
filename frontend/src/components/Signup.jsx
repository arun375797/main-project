import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Container, Button, Grid, Radio, RadioGroup, FormControlLabel, TextField, IconButton, InputAdornment, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    name: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    dob: '',
    mobileNumber: '',
    email: '',
    password: '',
  });

  const inputHandler = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error when input changes
  };

  const togglePasswordVisibility = () => {
    setUsers({ ...users, showPassword: !users.showPassword });
  };

  const validateInputs = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate name
    if (!users.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Validate gender
    if (!users.gender) {
      newErrors.gender = 'Gender is required';
      valid = false;
    }

    // Validate dob
    if (!users.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
      valid = false;
    }

    // Validate mobileNumber
    if (!users.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(users.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile Number should contain exactly 10 digits';
      valid = false;
    }

    // Validate email
    if (!users.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(users.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Validate password
    if (!users.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(users.password)) {
      newErrors.password = 'Password must be at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const addHandler = () => {
    if (validateInputs()) {
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
    }
  };

  return (
    <div style={{ backgroundColor: '#107A7C', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm" style={{ padding: '20px', border: '2px solid white' }}>
        <Typography variant='h5' align='center' sx={{ border: '1px solid white', padding: '10px', color: '#fff' }}>S I G N U P</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Name' fullWidth name="name" onChange={inputHandler} error={!!errors.name} helperText={errors.name} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' } } }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <RadioGroup aria-label="gender" name="gender" value={users.gender} onChange={inputHandler} style={{ flexDirection: 'row' }}>
              <FormControlLabel value="Male" control={<Radio sx={{ color: '#fff' }} />} label="Male" sx={{ color: '#fff' }} />
              <FormControlLabel value="Female" control={<Radio sx={{ color: '#fff' }} />} label="Female" sx={{ color: '#fff' }} />
            </RadioGroup>
            {errors.gender && <Typography variant="body2" color="error">{errors.gender}</Typography>}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Date of Birth (YYYY-MM-DD)' fullWidth name="dob" onChange={inputHandler} error={!!errors.dob} helperText={errors.dob} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' } } }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Mobile No' fullWidth name="mobileNumber" onChange={inputHandler} error={!!errors.mobileNumber} helperText={errors.mobileNumber} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' } } }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField variant='outlined' label='Email' fullWidth name="email" onChange={inputHandler} error={!!errors.email} helperText={errors.email} sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' } } }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl variant='outlined' fullWidth sx={{ '& .MuiInputLabel-root': { color: '#fff' }, '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#fff' } } }}>
              <TextField
                label='Password'
                type={users.showPassword ? 'text' : 'password'}
                fullWidth
                name="password"
                onChange={inputHandler}
                value={users.password}
                error={!!errors.password}
                helperText={errors.password}
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
              <Link to={'/login'} style={{ textDecoration: 'none', color: '#fff' }}>Already registered? Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
