// Require
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

// Initialize express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('static'));

// Routes
app.use('/api/cards', require('./routes/cardsRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/auth' , require('./routes/authRoutes'));

// It is important to first connect to the database,
// and only THEN start listening for requests.
// This will prevent possible nasty bugs when running your app in shared\public cloud environments.

const { PORT } = process.env;

// Connect to database
connectDB().then(()=>{
  // Run server
  app.listen(PORT, ()=> console.log(`Server is listening for requests on http://127.0.0.1:${PORT}`))
});