const { Schema, model, default: mongoose } = require('mongoose');


const messageSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const chatSchema = new Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;