const { Schema, model, default: mongoose } = require('mongoose');
const OpenAI = require('openai-api');
const config = require('./config');

// Kevins API key
const openai = new OpenAI('config.openaiApiKey');


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

async function generateResponse(input) {
    try {
        const response = await openai.complete({
            engine: 'text-davinci-003',     // ChatGPT model 
            prompt: input,
            maxTokens: 100,     // maximum length of the generated response
            n: 1, // number of responses to generate
            stop: '\n', // Specify the stop sequence to end the response
        });

        return response.choices[0].text.trim();
    } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error generating response:', error);
        throw error;
    }
}

module.exports = {
    Chat,
    generateResponse
};