const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const callOpenAI = async (messages) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 100,
        });
        return response

    } catch (error) {
        console.log(error)
        throw new Error("Failed to call OpenAI API");
    }
};

module.exports = callOpenAI;