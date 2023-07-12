import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription OnMessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      _id
      role
      content
    }
  }
`;