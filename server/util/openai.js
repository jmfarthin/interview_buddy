const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const configuration = new Configuration({
    organization: "org-HLyFww84hKRmCnPZPzuIVfut",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const callOpenAI = async (prompt) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            max_tokens: 7,
            temperature: 0.5,
        });
        return response

    } catch (error) {
        console.log(error)
        throw new Error("Failed to call OpenAI API");
    }
};

module.exports = callOpenAI;