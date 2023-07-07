const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  framework: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  settings: {
    type: Object,
    default: {},
  },
  integrations: [
    {
      platform: {
        type: String,
        required: true,
      },
      apiKey: {
        type: String,
        required: true,
      },
      // Add other integration-specific fields as needed
    },
  ],
});

const Bot = mongoose.model('Bot', botSchema);

module.exports = Bot;

