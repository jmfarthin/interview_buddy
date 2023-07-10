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