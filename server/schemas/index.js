const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');
const User = require('./user');
const Room = require('./room');
const Message = require('./message');
const Feedback = require('./feedback');
const Conversation = require('./conversation');
const Context = require('./context');
const Chat = require('./chat');


// *Imports ALL models into App.js* 
const { User, Room, Message, Feedback, Conversation, Context, Chat } = require('./models');

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://krsilveira:securedPassword123@cluster0.m5osamg.mongodb.net/', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a connection object
const db = mongoose.connection;

// Check for database connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = { typeDefs, resolvers, User, Room, Message, Feedback, Conversation, Context, Chat};