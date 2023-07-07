// Import the required packages and modules
const mongoose = require('mongoose');
const user = require('./user');
const room = require('./room');
const message = require('./message');
const feedback = require('./feedback');
const conversation = require('./conversation');
const context = require('./context');
const chat = require('./chat');


// *Imports ALL models into root directory app.js* 
const { user, room, message, feedback, conversation, context, chat } = require('./models');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://krsilveira:securedPassword123@cluster0.m5osamg.mongodb.net/', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a connection object
const db = mongoose.connection;

// Check for database connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export all the models
module.exports = {
  user,
  room,
  message,
  feedback,
  conversation,
  context,
  chat,
};
