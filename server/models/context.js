const mongoose = require('mongoose');

const contextSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  contextData: {
    type: String,
    required: true,
  },
});

const Context = mongoose.model('Context', contextSchema);

module.exports = Context;
