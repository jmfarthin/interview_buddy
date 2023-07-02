const callOpenAI = require('../util/openai')
require("dotenv").config()
const { ApolloError } = require('apollo-server-express');

const resolvers = {
    Mutation: {
        promptChat: async (parent, { prompt }) => {
            const response = await callOpenAI(prompt)
            console.log("response successful")
            // console.log(response)
            console.log(`===========================================`)
            console.log(`===========================================`)
            var text = response?.data?.choices[0].text
            if (!text) {
                console.log("My api failed!")
                throw new ApolloError("OpenAI call Failed")
            }

            // const addedTOChat = await MONGOMODEL.create()
            console.log(text);
            return text
        }
    }

};

module.exports = resolvers;