const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const studentProjectRoutes = require('./routes/studentProjectsRoutes');

require('./database/connection');

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(morgan('dev'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

// Routes
app.use('/api/student', studentRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/studentProjects', studentProjectRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });