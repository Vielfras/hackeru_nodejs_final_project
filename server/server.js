// server.js 

// --------------=====================  DEPENDENCIES  =====================--------------
// 1st Party
const path = require('path');

// 3rd Party - Base
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

// 3rd Party - Extra
const chalk = require('chalk');

// Mine
const connectDB = require('./config/db');
const { logToFile, setupDevelopmentLogging } = require('./controllers/loggingController');


// --------------=====================  INIT  =====================--------------
const SERVER_MODE = process.env.NODE_ENV;
const { IP, PORT, LOG_FILE_PATH } = process.env;

// TODO - Move IP & PORT validation to seperate file
{
  const isValidIP = (ip) => {
    return true;
  };

  const isValidPort = (port) => {
    return true;
  };

  if (!IP || !isValidIP(IP)) {
    console.error(chalk.red('Error: Invalid or undefined IP address in the environment variables.'));
    console.error(chalk.red(`Invalid IP: ${IP}`));
    process.exit(1);
  }

  if (!PORT || !isValidPort(PORT)) {
    console.error(chalk.red('Error: Invalid or undefined port in the environment variables.'));
    console.error(chalk.red(`Invalid PORT: ${PORT}`));
    process.exit(1);
  }
}

const accessLogStream = logToFile(path.join(__dirname, LOG_FILE_PATH));

const app = express();


// --------------=====================  MIDDLEWARE  =====================--------------
app.use(cors());
app.use(express.json());

app.use(morgan('combined', { stream: accessLogStream }));
if (SERVER_MODE !== 'prod') {
  setupDevelopmentLogging(app);
}

app.use(express.static('static'));
app.use(express.static('public'));


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
