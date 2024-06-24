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
const isValidIP = (ip) => {
  return true;
};

const isValidPort = (port) => {
  return true;
};

if (!IP || !isValidIP(IP)) {
  console.error(chalk.red('Error: Invalid or undefined IP address in the environment variables.'));
  process.exit(1);
}

if (!PORT || !isValidPort(PORT)) {
  console.error(chalk.red('Error: Invalid or undefined port in the environment variables.'));
  process.exit(1);
}
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
  app.listen(PORT, IP, () => {
    console.log(chalk.bold.bgGreenBright(`Server is listening for requests on http://${IP}:${PORT}`));
  });
}).catch((error) => {
  console.error(chalk.bold.bgRedBright(`Failed to connect to the database: ${error.message}`));
});