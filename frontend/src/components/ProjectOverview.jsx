import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from "../axiosinterceptor";





const ProjectOverview = () => {
   
    const [project, setProject] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState([]); // State to hold selected keys
    const keyColors = ["#D3D3D3 ", "#D3D3D3", " #D3D3D3 ", "#D3D3D3",  "#D3D3D3 ", "#D3D3D3"];

    // Retrieve email from sessionStorage
    const userEmail = sessionStorage.getItem('currentUser');
  

    useEffect(() => {
        // Fetch user data
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${userEmail}`);
                setUser(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };

        getUser();
    }, [userEmail]);

    useEffect(() => {
        // Fetch project data
        const fetchProject = async () => {
            if (user && user._id) {
                try {
                    const response = await axiosInstance.get(`http://localhost:5000/api/studentProjects/id/${user._id}`);
                    // Assuming the response is an array and contains a single project object
                    if (response.data.length > 0) {
                        setProject(response.data[0]); // Set the first project object in the array
                        console.log("user user user ", response.data[0].title);
                        setError(null);
                    } else {
                        setError('No project found');
                    }
                } catch (error) {
                    console.error('Error fetching project:', error);
                    setError('Error fetching project');
                }
            }
        };

        fetchProject();
    }, [user]);

    // Function to handle selection of keys
    const handleKeySelect = (key) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter((selectedKey) => selectedKey !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
        }
    };

    const projectsOtherData = {
        "Online Blood Bank Project": {
            "projectId": "P1",
            "title": "Online Blood Bank Project",
            "description": "This is an online blood bank management system that helps in managing various blood bank operations effectively. The project consists of a central depository containing various blood deposits available along with associated details. These details include blood type, storage area and date of storage. Maintenance and the monitoring of blood deposits become easy with the help of this system. The project is an online system that provides an option to check the availability of the required blood group within the blood bank. Moreover, the system also has added features such as patient name and contacts, blood booking and requirement of blood group is posted on the website to find available donors for a blood emergency.",
            "teamSize": 2,
            "duration": 3,
            "technologies": ".NET, MySQL"
        },
        "Space Shooter Combat Game": {
            "projectId": "P2",
            "title": "Space Shooter Combat Game",
            "description": "Space Shooter is an arcade game developed using Python as a programming language. Although built to be simplistic, the mechanics of this game are pretty dynamic. Moreover, the game also has engaging gameplay. The player starts the game with three lives and has to constantly shoot and dodge to save themselves from being wiped out by a constant oncoming barrage of asteroids. A hit from an asteroid causes the player’s health to decrease. While smaller asteroids deal lesser damage, larger asteroids will deal a heavier blow to your health bar. Once the player’s health bar runs out, they lose a life.",
            "teamSize": 2,
            "duration": 3,
            "technologies": "Python, MySQL"
        },
        "Online PDF to Text Converter": {
            "projectId": "P3",
            "title": "Online PDF to Text Converter",
            "description": "Reading anything demands our complete undivided attention making it nearly impossible for us to multitask. Moreover, staring at a screen for long periods also strains our eyes. This PDF to Text Converter and Translator developed using Python can instantly and accurately convert any PDF text into audio. Along with reading any PDF document out loud, this application can also translate and vocalize any text into up to five languages. Moreover, this system can also benefit visually impaired individuals and people with learning disabilities such as dyslexia.",
            "teamSize": 2,
            "duration": 3,
            "technologies": "Java ,MySQL"
        },
        "Carpool Ride Sharing App": {
            "projectId": "P4",
            "title": "Carpool Ride Sharing App",
            "description": "In such densely populated cities, carpooling or ride-sharing serves as the perfect alternative to taking your car out daily. Along with being a relatively cost-effective and frugal way of commuting, carpooling also benefits the environment by reducing the carbon footprint generated by every individual commuter. Despite, its numerous benefits, finding people to carpool with often proves to be quite a tedious affair. Due to this, effective execution of carpool proves to be a challenge. This Android carpooling system has been developed to help encourage carpooling by helping users “offer a ride” in their vehicle or “find a ride” with other users.",
            "teamSize": 2,
            "duration": 3,
            "technologies": "Android, Kotlin",
        },
        "Graphical Password": {
            "projectId": "P5",
            "title": "Graphical Password",
            "description": "Since conventional password schemes are vulnerable to shoulder surfing, many shoulder surfing resistant graphical password schemes have been proposed. However, as most users are more familiar with textual passwords than pure graphical passwords, text-based graphical password schemes have been proposed. Unfortunately, none of existing text-based shoulder surfing resistant graphical password schemes is both secure and efficient enough. In this paper, we propose an improved text-based shoulder surfing resistant graphical password scheme by using colours.",
            "teamSize": 2,
            "duration": 3,
            "technologies": "PHP,MySQl"
        },
        "Doctor Appointment Booking System": {
            "projectId": "P6",
            "title": "Doctor Appointment Booking System",
            "description": "The proposed project is a smart appointment booking system that provides patients or any user an easy way of booking a doctor’s appointment online. This is a web based application that overcomes the issue of managing and booking appointments according to user’s choice or demands. The task sometimes becomes very tedious for the compounder or doctor himself in manually allotting appointments for the users as per their availability. Hence this project offers an effective solution where users can view various booking slots available and select the preferred date and time.",
            "teamSize": 2,
            "duration": 3,
            "technologies": "Asp.net,MySQl",
        }
    };


// Inside the ProjectOverview component
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
         <br /> <br />
        <div style={{ flex: 3 }}>
            <Typography variant="h5" color={'white'}>PROJECT OVERVIEW</Typography>
            <br />
            <br />
            <div style={{ marginLeft: "100px" }}>
                {project && (
                    <div>
                        {Object.keys(project).map((key, index) => (
                            <Accordion
                                key={key}
                                expanded={selectedKeys.includes(key)}
                                onChange={() => handleKeySelect(key)}
                                sx={{ width: "100%", marginBottom: "10px", backgroundColor: keyColors[index % keyColors.length] }} // Different color for each key
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{ backgroundColor: keyColors[index % keyColors.length] }} // Color for accordion heading
                                >
                                  <Typography 
                                     variant="body1" 
                                     style={{ color: 'black', cursor: 'pointer', textDecoration: 'none' }}
                                      onMouseEnter={(e) => e.target.style.color = 'blue'}
                                     onMouseLeave={(e) => e.target.style.color = 'black'}
                               >
                                       {key.toUpperCase()}
                                       </Typography>


                                </AccordionSummary>
                                <AccordionDetails style={{ backgroundColor: 'white' }}> {/* White background for accordion details */}
                                    <Typography variant="body1" gutterBottom style={{ color: 'black', fontWeight: 'bold' }}>
                                        {project[key] in projectsOtherData ? projectsOtherData[project[key]].description : project[key]}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                        
                    </div>
                )}
                {error && <Typography>Error: {error}</Typography>}
            </div>
        </div>
        <div style={{ background: "red", flex: 1 }}>
            {/* Content for the right side */}
        </div>
    </div>
);

};

export default ProjectOverview;
