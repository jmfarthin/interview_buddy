const callOpenAI = require('../utils/openai')
require("dotenv").config()
const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Mutation: {
        promptChat: async (parent, { prompt, jobTitle, jobLevel, jobFunction, technologies }) => {
            const message = `{}`
            const response = await callOpenAI(prompt, jobTitle, jobLevel, jobFunction, technologies)
            console.log("response successful")
            // console.log(response)
            console.log(`===========================================`)
            console.log(`===========================================`)
            var data = response?.data?.choices[0].message
            var gptMessage = response?.data?.choices[0].message.content;
            if (!gptMessage) {
                console.log("My api failed!")
                throw new ApolloError("OpenAI call Failed")
            }

            // const addedTOChat = await MONGOMODEL.create()
            // const gptResponse = result.replace(`/\n/g`, "");
            console.log(data);
            console.log(gptMessage);
            return { gptMessage };
        },
        respondChat: async(parent, { response })
    }

};