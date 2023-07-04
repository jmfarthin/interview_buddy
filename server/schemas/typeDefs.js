const { gql } = require('apollo-server-express');

const typeDefs = gql`

type ChatResponse {
    gptMessage: String
}

type Query {
    chat: ChatResponse
}

type Mutation {
    promptChat(prompt: String!, jobTitle: String!, jobLevel: String!, jobFunction: String!, technologies: String): ChatResponse
} 
`

module.exports = typeDefs;