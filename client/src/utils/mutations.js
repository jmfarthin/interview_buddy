import { gql } from '@apollo/client';

export const PROMPT_CHAT = gql`
mutation promptChat($chatId: String!, $answer: String!) {
  promptChat(chatId: $chatId, answer: $answer) {
    gptMessage
  }
}
`

export const CREATE_CHAT = gql`
mutation createChat($jobTitle: String!, $jobLevel: String!, $jobFunction: String!, $jobTechnology: String) {
  createChat(jobTitle: $jobTitle, jobLevel: $jobLevel, jobFunction: $jobFunction, jobTechnology: $jobTechnology) {
    _id
    jobTitle
  }
}
`

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
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
}
`

export const ADD_USER = gql`
mutation addUser($firstname: String!, $email: String!, $password: String!) {
  addUser(firstname: $firstname, email: $email, password: $password) {
    token
    user {
      firstname
    }
  }
}
`