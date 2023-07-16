const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User{
   _id: ID
   firstname: String
   email: String
   password: String
   chats: [Chat]
}

type Chat{
    _id: ID
    jobTitle: String
    messages: [Message]
}

type Message{
    _id: ID
    role: String
    content: String
}

type GptResponse {
    gptMessage: String
}

type Auth {
    token: ID!
    user: User
  }

type Query {
    gptResponse: GptResponse
    me: User
    chat(chatId: ID!): Chat 
}

type Mutation {
    addUser(firstname: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    promptChat(chatId: String!, answer: String!): GptResponse
    createChat(jobTitle: String!, jobLevel: String!, jobFunction: String!, jobTechnology: String): Chat
    generateAudio(textInput: String!): String
} 
`

module.exports = typeDefs;