import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import axiosInstance from "../axiosinterceptor";

const Demo = () => {
  const [selectedProject, setSelectedProject] = useState("project1");
  const [formData, setFormData] = useState("");
  const [lastSubmissionDate, setLastSubmissionDate] = useState(null);
  const handleChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const handleChanges = (e) => {
    setFormData(e.target.value);
  };
  const isSameWeek = (date1, date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const firstWeek = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate() - firstDate.getDay()
    );
    const secondWeek = new Date(
      secondDate.getFullYear(),
      secondDate.getMonth(),
      secondDate.getDate() - secondDate.getDay()
    );
    return firstWeek.getTime() === secondWeek.getTime();
  };
  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

      // Check if it's Saturday (day 6) or Sunday (day 0)
      if (currentDay === 6 || currentDay === 0) {
        // Check if the last submission date is within the same week as the current date
        if (lastSubmissionDate && isSameWeek(lastSubmissionDate, currentDate)) {
          alert(
            "You have already submitted this week. You can submit again next week."
          );
        } else {
          const response = await axiosInstance.post(
            "http://localhost:5000/api/student/weekly-submission",
            { data: formData }
          );
          console.log(response.data); // Log the response from the backend
          // Update the last submission date after successful submission
          setLastSubmissionDate(currentDate);
        }
      } else {
        alert("Weekly submission is only allowed on weekends."); // Inform the user that submission is only allowed on weekends
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const projects = {
    project1: {
      title: "Project 1",
      summary: "This is the summary for Project 1.",
      overview: "This is the overview for Project 1.",
      technologies: "React, Node.js, Express, MongoDB",
      teamSize: "4 developers",
      duration: "6 months",
      referenceMaterials: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    project2: {
      title: "Project 2",
      summary: "This is the summary for Project 2.",
      overview: "This is the overview for Project 2.",
      technologies: "Angular, Firebase",
      teamSize: "3 developers",
      duration: "4 months",
      referenceMaterials: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    },
    project3: {
      title: "Project 3",
      summary: "This is the summary for Project 3.",
      overview: "This is the overview for Project 3.",
      technologies: "Angular, Firebase",
      teamSize: "3 developers",
      duration: "4 months",
      referenceMaterials: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
    project4: {
      title: "Project 4",
      summary: "This is the summary for Project 4.",
      overview: "This is the overview for Project 4.",
      technologies: "Angular, Firebase",
      teamSize: "3 developers",
      duration: "4 months",
      referenceMaterials: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
    project5: {
      title: "Project 5",
      summary: "This is the summary for Project 5.",
      overview: "This is the overview for Project 5.",
      technologies: "Angular, Firebase",
      teamSize: "3 developers",
      duration: "4 months",
      referenceMaterials: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
      },
    project6: {
      title: "Project 6",
      summary: "This is the summary for Project 6.",
      overview: "This is the overview for Project 6.",
      technologies: "Angular, Firebase",
      teamSize: "3 developers",
      duration: "4 months",
      referenceMaterials: "Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(130deg, #231a6f, #0f054c)",
      }}
    >
      <div style={{ background: "#0f054c", flex: 1 }}>
        <div style={{ height: "100vh", width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
            <Select
              value={selectedProject}
              onChange={handleChange}
              style={{ marginBottom: "20px", color: "#fff" }}
            >
              {Object.keys(projects).map((projectKey) => (
                <MenuItem key={projectKey} value={projectKey}>{projects[projectKey].title}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div style={{ flex: 3 }}>
        <div style={{ marginLeft: "100px" }}>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-summary-content"
              id="project-summary-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#8a2be2", color: "#fff" }}
            >
              Project Summary
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].summary}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-overview-content"
              id="project-overview-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#3f51b5", color: "#fff" }}
            >
              Project Overview Document
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].overview}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-technologies-content"
              id="project-technologies-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#4caf50", color: "#fff" }}
            >
              Technologies Used
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].technologies}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-team-size-content"
              id="project-team-size-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#ff9800", color: "#fff" }}
            >
              Team Size
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].teamSize}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-duration-content"
              id="project-duration-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#f44336", color: "#fff" }}
            >
              Duration
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].duration}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ width: "100%", marginBottom: "20px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="project-reference-materials-content"
              id="project-reference-materials-header"
              sx={{ fontSize: "1.2rem", backgroundColor: "#03a9f4", color: "#fff" }}
            >
              Reference Materials
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ fontSize: "1.2rem" }}>
                {projects[selectedProject].referenceMaterials}
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                fontSize: "1.2rem",
                backgroundColor: "#f44336",
                color: "#fff",
              }} // Increase font size and add background color
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
                    onChange={handleChanges}
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
      <div style={{ background: "red", flex: 1 }}></div>
    </div>
  );
};

export default Demo;
