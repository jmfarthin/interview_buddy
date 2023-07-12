require('dotenv').config({path: __dirname + '/../.env'});

const callOpenAI = require("./openai");

const testMessages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Who won the world cup in 2018?" }
];

callOpenAI(testMessages)
    .then(response => console.log(response.data.choices[0].message.content))
    .catch(error => console.log(error));