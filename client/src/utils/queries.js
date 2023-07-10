import { gql } from '@apollo/client';

export const ME = gql`
query me {
  me {
    _id
    firstname
    chats {
      _id
      jobTitle
      messages {
        content
        role
      }
    }
  }
}
`

export const GET_CHAT = gql`
query getChat($chatId: ID!) {
  getChat(chatId: $chatId) {
    _id
    jobTitle
    messages {
      content
      role
    }
  }
}
`