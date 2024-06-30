require('dotenv').config();
const mongoose = require('mongoose');


const server_mode = process.env.NODE_ENV;  

const KNOWN_MODES = {
  DEV : 'dev',
  PROD : 'prod',
};

let uri;
if (KNOWN_MODES.PROD === server_mode) {
  uri = process.env.MONGODB_URI_PROD
  console.log('Environment set to PRODUCTION mode');
} else {
  uri = process.env.MONGODB_URI_DEV
  console.log('Environment set to DEVELOPMENT mode');
}

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');

  } catch (err) {
    console.log('Error connecting to MongoDB', err.message)
    process.exit(1)
  }
};


module.exports = connectDB;