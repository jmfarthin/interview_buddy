const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User{
    username: String
}

type ChatResponse {
    text: String
}

type Query {
    chat: ChatResponse
}

type Mutation {
    promptChat(prompt: String!): ChatResponse
} 
`

module.exports = typeDefs;