import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axiosInstance from "../axiosinterceptor";

const Mern = () => {

  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      //       Sunday: 0
      // Monday: 1
      // Tuesday: 2
      // Wednesday: 3
      // Thursday: 4
      // Friday: 5
      // Saturday: 6
      // const currentDay='Sun Apr 29 2024 21:43:20 GMT+0530 (India Standard Time)';
      // Check if it's Saturday (day 6) or Sunday (day 0)
      if (currentDay === 6 || currentDay === 0) {
        const response = await axiosInstance.post("http://localhost:5000/api/student/weekly-submission", { data: formData });
        console.log(response.data); // Log the response from the backend
      } else {
        alert("Weekly submission is only allowed on weekends."); // Inform the user that submission is only allowed on weekends
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div

      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Center vertically
        minHeight: "100vh", // Full height of the viewport
        background: "linear-gradient(130deg, #231a6f, #0f054c)", // Background gradient
      }}
    >
      {/* Content for the left side */}
      {/* <div style={{ background: "#0f054c", flex: 1 }}>
       
        <div style={{ height: "100vh", width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <Button color="secondary">Secondary</Button>
            <br />
          </div>

          <Button href="/chat">Discussion-Form</Button>
        </div>
      </div> */}

      <div style={{ flex: 3  }}>
      <Typography variant="h3" align="center" color="white">
      PROJECT-DASHBOARD

      </Typography>
        <br></br>
        <br />
        <div style={{ marginLeft: "100px"}}>
          <Accordion sx={{ width: "100%"  }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#8a2be2", color: "#fff" }} // Increase font size and add background color
            >
              Project Summary
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {" "}
                {/* Increase font size */}
                This is an online blood bank management system that helps in managing various blood bank operations effectively.
                The project consists of a central depository containing various blood deposits available along with associated details.
                These details include blood type, storage area and date of storage. Maintenance and the monitoring of blood deposits
                become easy with the help of this system. The project is an online system that provides an option to check the availability
                of the required blood group within the blood bank. Moreover, the system also has added features such as patient name and
                contacts, blood booking and requirement of blood group is posted on the website to find available donors for a blood
                emergency.This online system is developed on .net platform and supported by an Sql database to store blood and
                user specific details.
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#3f51b5", color: "#fff" }} // Increase font size and add background color
            >
              Project Overview Document
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {" "}
                {/* Increase font size */}
                <a href="https://docs.google.com/document/d/1NFIpLm62qxZioa0gjIQVBszXldxytYklehKvAbrPyy4/edit?usp=sharing">Detailed documentation of the project must be provided in the pdf or document Format.
                </a>
              </div>
            </AccordionDetails>
            <AccordionActions>
              <Button>Cancel</Button>
              <Button>Agree</Button>
            </AccordionActions>
          </Accordion>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#4caf50", color: "#fff" }} // Increase font size and add background color
            >
              Technologies Used
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                React, Node.js, Express, MongoDB
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#ff9800", color: "#fff" }} // Increase font size and add background color
            >
              Team Size
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {" "}
                {/* Increase font size */}
                A group of 4 or 5 Members
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#f44336", color: "#fff" }} // Increase font size and add background color
            >
              Duration
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {" "}
                {/* Increase font size */}
                Three to five months.
              </div>
            </AccordionDetails>
          </Accordion>






          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#03a9f4", color: "#fff" }} // Increase font size and add background color
            >
              Reference materials
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {" "}
                {/* Increase font size */}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </div>
            </AccordionDetails>
          </Accordion>



          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#f44336", color: "#fff" }} // Increase font size and add background color
            >
              Weekly Submission
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={formData}
                    onChange={handleChange}
                  />
                  <Button variant="outlined" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Box>
              </div>
            </AccordionDetails>
          </Accordion>

        </div>
      </div>
      <div style={{ background: "red", flex: 1 }}>
        {/* Content for the right side */}
      </div>
    </div>
  );
};

export default Mern;