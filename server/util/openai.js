const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const callOpenAI = async (prompt, jobTitle, jobLevel, jobFunction, technologies) => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system", content: `You are Sam, an interviewer. Your current candidate is interviewing 
            for the ${jobLevel} ${jobTitle} role,
             which pertains to the ${jobFunction} field. 
             Include questions about these technologies: ${technologies}. 
             Please keep questions brief and wait for a response before asking the next question.`
            },
            { role: "user", content: `Hi, my name is ${prompt}, I'm here for the interview.` },],
            max_tokens: 100,
        });
        return response

    } catch (error) {
        console.log(error)
        throw new Error("Failed to call OpenAI API");
    }
};

module.exports = callOpenAI;