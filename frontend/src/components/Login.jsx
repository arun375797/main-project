import React, { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" }); 
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const addHandler = () => {
    axios
      .post("http://localhost:5000/api/student/login", user)
      .then((res) => {
        if (res.data.message === "Login Success") {
         
       //* see here is an error   
      } else {
          navigate('/stdash');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#231a6f", 
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "35ch",
            borderRadius: "10px",
            "& input::placeholder": {
              color: "white",
            },
            border: "1px solid white",
            borderColor: "white",
          },
          bgcolor: "rgba(255, 255, 255, 0.2)",
          p: 4,
          borderRadius: "20px",
          textAlign: "center",
          height: "400px",
          width: "400px",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h4"
          style={{ color: "white", marginBottom: "20px", fontFamily: "Arial, sans-serif" }}
        >
          Login
        </Typography>
        <br />
        <div>
          <TextField
            id="outlined-required-email"
            label="Email"
            name="email"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            onChange={inputHandler}
          />
        </div><br />
        <div>
          <TextField
            id="outlined-required-password"
            label="Password"
            name="password"
            type="password"
            InputLabelProps={{ style: { color: "white" } }}
            inputProps={{ style: { color: "white" } }}
            onChange={inputHandler}
          />
        </div>
        <Button
          style={{ 
            background: '#231a6f',
            color: 'white',
            fontSize: '16px',
            fontFamily: "Arial, sans-serif",
            fontWeight: 'bold',
            borderRadius: '20px',
            padding: '10px 20px',
            marginTop: '20px',
          }}
          onClick={addHandler}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          style={{ marginTop: "20px", color: "white", fontFamily: "Arial, sans-serif" }}
        >
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" style={{ color: "white" }}>
            Signup
          </Link>
        </Typography>
      </Box>
    </div>
  );
}

export default Login;
