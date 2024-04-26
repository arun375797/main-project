import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const Mern = () => {
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
      <div style={{ background: "#0f054c", flex: 1 }}>
        {/* Content for the left side */}
        <div style={{ height: "100vh", width: "300px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
            {" "}
            <Button color="secondary">Secondary</Button>
          </div>
        </div>
      </div>
      <div style={{ flex: 3 }}>
        <div style={{marginLeft:'100px' }}>

            
          <Accordion defaultExpanded sx={{ width: "100%"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
              sx={{ fontSize: "1.2rem" }} // Increase font size
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
              sx={{ fontSize: "1.2rem" }} // Increase font size
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
              sx={{ fontSize: "1.2rem" }} // Increase font size
            >
              Accordion 1
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
              sx={{ fontSize: "1.2rem" }} // Increase font size
            >
              Accordion 1
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
              sx={{ fontSize: "1.2rem" }} // Increase font size
            >
              Accordion 1
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






          {/* Repeat similar styling for other Accordions */}

        </div>
      </div>
      <div style={{ background: "red", flex: 1 }}>
        {/* Content for the right side */}
      </div>
    </div>
  );
};

export default Mern;
