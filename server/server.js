// Require
require('dotenv').config();

// 1st Party
const fs = require('fs');
const path = require('path');

// 3rd Party - Base
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

// 3rd Party - Extra
const chalk = require('chalk');

// Mine
const connectDB = require('./config/db');


// --------------=====================  INIT  =====================-------------- 
const { IP, PORT } = process.env;
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/log.log'), { flags: 'a' })

const app = express();


// --------------=====================  MIDDLEWARE  =====================-------------- 
app.use(cors());
app.use(express.json());
// app.use(morgan('dev'));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.static('static'));

// --------------=====================  ROUTES  =====================-------------- 
app.use('/api/cards', require('./routes/cardsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));



// --------------=====================  RUN SERVER  =====================-------------- 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening for requests on http://${IP}:${PORT}`)
  });
});